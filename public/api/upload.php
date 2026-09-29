<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/auth.php';
header('Content-Type: application/json');

function upload_error(string $message, int $status = 400, array $context = []): never {
    http_response_code($status);
    app_log($status >= 500 ? 'error' : 'warning', $message, $context);
    echo json_encode([
        'success' => false,
        'message' => $status >= 500 ? 'The upload could not be saved. Please try again later.' : $message,
        'request_id' => app_request_id(),
    ]);
    exit;
}

$user = current_user();
if (!$user) {
    upload_error('Please log in to save results.', 401, ['reason' => 'unauthenticated']);
}

if (empty($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    upload_error('Invalid image upload', 400, ['upload_error' => $_FILES['image']['error'] ?? null]);
}

$allowed = ['image/jpeg', 'image/png', 'image/webp'];
$file = $_FILES['image'];
if (!in_array($file['type'], $allowed) || $file['size'] > 15 * 1024 * 1024) {
    upload_error('Rejected image upload', 400, ['mime_type' => $file['type'], 'size' => $file['size']]);
}

$uploadDir = __DIR__ . '/../../uploads/';
if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
$safeName = bin2hex(random_bytes(16)) . '.' . strtolower($ext);
$destination = $uploadDir . $safeName;

if (!move_uploaded_file($file['tmp_name'], $destination)) {
    upload_error('Could not move uploaded file', 500, ['user_id' => $user['id']]);
}

try {
    [$width, $height] = @getimagesize($destination) ?: [null, null];

$stmt = $pdo->prepare('INSERT INTO uploads (user_id, filename, original_name, filesize, width, height, mime_type)
                        VALUES (:uid,:fn,:on,:fs,:w,:h,:mt) RETURNING id');
$stmt->execute([
    ':uid' => $user['id'],
    ':fn' => $safeName,
    ':on' => $file['name'],
    ':fs' => $file['size'],
    ':w' => $width,
    ':h' => $height,
    ':mt' => $file['type'],
]);
$uploadId = $stmt->fetchColumn();

$gaugeData = $_POST['gauge_data'] ?? '{}';
json_decode($gaugeData); // validate
if (json_last_error() !== JSON_ERROR_NONE) $gaugeData = '{}';

$pdo->prepare('INSERT INTO analysis_results (upload_id, gauge_data) VALUES (:uid, :data)')
    ->execute([':uid' => $uploadId, ':data' => $gaugeData]);

log_activity($pdo, $user['id'], 'upload', ['upload_id' => $uploadId]);

echo json_encode(['success' => true, 'upload_id' => $uploadId]);
} catch (Throwable $e) {
    app_log('error', 'Upload processing failed', [
        'user_id' => $user['id'],
        'filename' => $file['name'] ?? null,
        'exception' => $e->getMessage(),
    ]);
    if (isset($destination) && is_file($destination)) {
        unlink($destination);
    }
    upload_error('Upload processing failed', 500);
}
