<?php
require_once __DIR__ . '/../config/auth.php';
$_SESSION = [];
session_destroy();
header('Location: ' . public_url('index.php'));
exit;
