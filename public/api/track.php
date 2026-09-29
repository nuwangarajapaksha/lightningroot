<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/auth.php';

header('Content-Type: application/json');

$event = $_POST['event'] ?? '';
$allowedEvents = ['page_view', 'gauge_run', 'report_download'];
if (!in_array($event, $allowedEvents, true)) {
    http_response_code(400);
    echo json_encode(['success' => false]);
    exit;
}

$user = current_user();
$visitorId = $_COOKIE['lr_visitor'] ?? '';
if (!preg_match('/^[a-f0-9]{32}$/', $visitorId)) {
    $visitorId = bin2hex(random_bytes(16));
    setcookie('lr_visitor', $visitorId, [
        'expires' => time() + (60 * 60 * 24 * 365),
        'path' => '/',
        'httponly' => true,
        'samesite' => 'Lax',
        'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
    ]);
}

log_activity($pdo, $user['id'] ?? null, $event, [
    'visitor_id' => $visitorId,
    'page' => substr((string)($_POST['page'] ?? ''), 0, 180),
]);

echo json_encode(['success' => true]);
