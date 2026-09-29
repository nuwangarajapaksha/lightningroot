<?php
function app_request_id(): string {
    static $requestId;
    return $requestId ??= bin2hex(random_bytes(8));
}

function app_log(string $level, string $message, array $context = []): void {
    $logDir = __DIR__ . '/../storage/logs';
    if (!is_dir($logDir) && !mkdir($logDir, 0750, true) && !is_dir($logDir)) {
        error_log("[$level] $message");
        return;
    }

    $entry = [
        'timestamp' => gmdate('c'),
        'level' => strtoupper($level),
        'message' => $message,
        'request_id' => app_request_id(),
        'method' => $_SERVER['REQUEST_METHOD'] ?? null,
        'uri' => $_SERVER['REQUEST_URI'] ?? null,
        'ip' => $_SERVER['REMOTE_ADDR'] ?? null,
        'context' => $context,
    ];

    $line = json_encode($entry, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    if ($line !== false) {
        error_log($line . PHP_EOL, 3, $logDir . '/app.log');
    }
}
