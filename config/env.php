<?php
function load_project_env(): void {
    static $loaded = false;
    if ($loaded) {
        return;
    }
    $loaded = true;

    $envFile = __DIR__ . '/../.env';
    if (!is_readable($envFile)) {
        return;
    }

    $values = parse_ini_file($envFile, false, INI_SCANNER_RAW);
    if ($values === false) {
        return;
    }

    foreach ($values as $key => $value) {
        if (is_string($key) && is_string($value) && getenv($key) === false) {
            putenv($key . '=' . $value);
        }
    }
}

load_project_env();

function required_env(string $key): string {
    $value = getenv($key);
    if ($value === false || trim($value) === '') {
        throw new RuntimeException("Required environment variable is missing: $key");
    }

    return trim($value);
}
