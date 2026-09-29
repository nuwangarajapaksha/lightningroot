<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/auth.php';
require_once __DIR__ . '/../../config/mailer.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ' . public_url('index.php#contact-form'));
    exit;
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

if (!empty($_POST['website'] ?? '') || $name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $message === '') {
    header('Location: ' . public_url('index.php?contact=error#contact-form'));
    exit;
}

$sent = false;
$mailError = null;
try {
    $mailResult = send_contact_emails($name, $email, $message);
    $sent = true;
} catch (Throwable $e) {
    $mailError = $e->getMessage();
}

$user = current_user();
log_activity($pdo, $user['id'] ?? null, 'contact_message', [
    'name' => $name,
    'email' => $email,
    'sent' => $sent,
    'auto_reply' => $mailResult['auto_reply'] ?? false,
]);

if (!$sent) {
    app_log('error', 'Contact email could not be sent', ['email' => $email, 'error' => $mailError]);
}

header('Location: ' . public_url('index.php?contact=' . ($sent ? 'sent' : 'error') . '#contact-form'));
exit;
