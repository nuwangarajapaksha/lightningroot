<?php
require_once __DIR__ . '/env.php';
require_once __DIR__ . '/logger.php';

// LightningRoot — PostgreSQL connection
// Update these with your real credentials (or use environment variables in production).
try {
    $DB_HOST = required_env('DB_HOST');
    $DB_PORT = required_env('DB_PORT');
    $DB_NAME = required_env('DB_NAME');
    $DB_USER = required_env('DB_USER');
    $DB_PASS = required_env('DB_PASS');
} catch (RuntimeException $e) {
    app_log('error', 'Database configuration is incomplete', ['error' => $e->getMessage()]);
    http_response_code(500);
    die('Database configuration is incomplete.');
}

try {
    $pdo = new PDO(
        "pgsql:host=$DB_HOST;port=$DB_PORT;dbname=$DB_NAME",
        $DB_USER,
        $DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    app_log('error', 'Database connection failed', ['exception' => $e->getMessage()]);
    http_response_code(500);
    die('Database connection failed. Please try again later.');
}

// Keep existing installations compatible with account activation controls.
try {
    $pdo->exec("ALTER TABLE users ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'active'");
} catch (PDOException $e) {
    app_log('error', 'Could not ensure user status column exists', ['exception' => $e->getMessage()]);
    http_response_code(500);
    die('Database migration failed. Please try again later.');
}

// Simple activity logger used across the site
function log_activity(PDO $pdo, ?int $userId, string $action, array $meta = []): void {
    $stmt = $pdo->prepare('INSERT INTO activity_log (user_id, action, meta, ip_address) VALUES (:uid, :action, :meta, :ip)');
    $stmt->execute([
        ':uid' => $userId,
        ':action' => $action,
        ':meta' => json_encode($meta),
        ':ip' => $_SERVER['REMOTE_ADDR'] ?? null,
    ]);
}
