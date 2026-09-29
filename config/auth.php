<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

function current_user(): ?array {
    return $_SESSION['user'] ?? null;
}

function public_url(string $path = ''): string {
    $scriptPath = parse_url($_SERVER['SCRIPT_NAME'] ?? '', PHP_URL_PATH) ?: '';
    $base = rtrim(str_replace('\\', '/', dirname($scriptPath)), '/');
    foreach (['/admin', '/api'] as $internalPath) {
        if (substr($base, -strlen($internalPath)) === $internalPath) {
            $base = substr($base, 0, -strlen($internalPath));
            break;
        }
    }
    if ($base === '/') {
        $base = '';
    }

    return $base . ($path === '' ? '' : '/' . ltrim($path, '/'));
}

function require_login(): void {
    if (!current_user()) {
        header('Location: ' . public_url('login.php'));
        exit;
    }
}

function require_admin(): void {
    $u = current_user();
    if (!$u || $u['role'] !== 'admin') {
        header('Location: ' . public_url('login.php'));
        exit;
    }
}
