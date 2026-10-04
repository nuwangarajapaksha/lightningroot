<?php
require_once __DIR__ . '/../config/auth.php';
$u = current_user();

$publicUrl = public_url();
$pageDescription = $pageDescription ?? 'LightningRoot is building practical browser-based tools for images and documents, starting with professional Image Analysis Gauges.';
$pageCanonical = $pageCanonical ?? ($publicUrl . ($_SERVER['REQUEST_URI'] ?? '/'));
$pageCanonical = strtok($pageCanonical, '?');
$currentScript = str_replace('\\', '/', $_SERVER['SCRIPT_NAME'] ?? '');
$currentPage = basename($currentScript);
$isAdminPage = strpos($currentScript, '/admin/') !== false;
$breadcrumbItems = [['label' => 'Home', 'url' => (!$isAdminPage && $currentPage === 'index.php') ? null : public_url('index.php')]];
if ($isAdminPage) {
  $breadcrumbItems[] = ['label' => 'Admin Panel', 'url' => $currentPage === 'index.php' ? null : public_url('admin/index.php')];
  if ($currentPage !== 'index.php') {
    $breadcrumbItems[] = ['label' => $pageTitle ?? 'Admin', 'url' => null];
  }
} elseif ($currentPage !== 'index.php') {
  $breadcrumbItems[] = ['label' => $pageTitle ?? 'Page', 'url' => null];
}

function render_breadcrumbs(bool $dark = false): void {
  global $breadcrumbItems;
  $mutedClass = $dark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-brand-600';
  $currentClass = $dark ? 'text-brand-200' : 'text-brand-700';
  echo '<nav class="mb-6" aria-label="Breadcrumb"><ol class="flex items-center gap-2 overflow-x-auto whitespace-nowrap text-sm">';
  foreach ($breadcrumbItems as $index => $item) {
    if ($index > 0) {
      echo '<li class="' . ($dark ? 'text-slate-600' : 'text-slate-300') . '" aria-hidden="true">/</li>';
    }
    if ($item['url'] === null) {
      echo '<li><span class="font-semibold ' . $currentClass . '" aria-current="page">' . htmlspecialchars($item['label']) . '</span></li>';
    } else {
      echo '<li><a href="' . htmlspecialchars($item['url']) . '" class="' . $mutedClass . ' transition">' . htmlspecialchars($item['label']) . '</a></li>';
    }
  }
  echo '</ol></nav>';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?= isset($pageTitle) ? htmlspecialchars($pageTitle) . ' — LightningRoot' : 'LightningRoot — Document and Image Tools' ?></title>
<meta name="description" content="<?= htmlspecialchars($pageDescription) ?>">
<link rel="canonical" href="<?= htmlspecialchars($pageCanonical) ?>">
<meta property="og:type" content="website">
<meta property="og:title" content="<?= htmlspecialchars(($pageTitle ?? 'LightningRoot') . ' — LightningRoot') ?>">
<meta property="og:description" content="<?= htmlspecialchars($pageDescription) ?>">
<meta property="og:url" content="<?= htmlspecialchars($pageCanonical) ?>">
<meta name="twitter:card" content="summary">
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          brand: {
            50:'#eef6ff',100:'#d9ecff',200:'#bcdcff',300:'#8ec4ff',
            400:'#59a3ff',500:'#3480ff',600:'#1e5ef5',700:'#1748d6',
            800:'#193dac',900:'#193887',950:'#132458'
          }
        },
        fontFamily: { sans: ['Inter','ui-sans-serif','system-ui','sans-serif'] }
      }
    }
  }
</script>
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" crossorigin="anonymous">
<style>
  body{font-family:'Inter',sans-serif;}
  .gauge-canvas{background:#0b1220;border-radius:0.5rem;}
</style>
</head>
<body class="bg-white text-slate-800 antialiased">

<header class="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100 shadow-sm">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <a href="<?= htmlspecialchars($publicUrl) ?>/index.php" class="flex items-center gap-2">
        <span class="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white font-bold">⚡</span>
        <span class="text-xl font-extrabold text-brand-900">Lightning<span class="text-brand-600">Root</span></span>
      </a>

      <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
        <a href="<?= htmlspecialchars($publicUrl) ?>/index.php" class="hover:text-brand-600 transition">Home</a>
        <a href="<?= htmlspecialchars($publicUrl) ?>/converter.php" class="hover:text-brand-600 transition">File Converter</a>
        <a href="<?= htmlspecialchars($publicUrl) ?>/analyze.php" class="hover:text-brand-600 transition">Image Gauges</a>
        <a href="<?= htmlspecialchars($publicUrl) ?>/about.php" class="hover:text-brand-600 transition">About</a>
      </nav>

      <div class="hidden md:flex items-center gap-3">
        <?php if ($u): ?>
          <?php if ($u['role'] === 'admin'): ?>
            <a href="<?= htmlspecialchars($publicUrl) ?>/admin/index.php" class="text-sm font-semibold text-brand-700 hover:text-brand-900">Admin Panel</a>
          <?php endif; ?>
          <span class="text-sm text-slate-500">Hi, <?= htmlspecialchars($u['name']) ?></span>
          <a href="<?= htmlspecialchars($publicUrl) ?>/logout.php" class="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition">Log out</a>
        <?php else: ?>
          <a href="<?= htmlspecialchars($publicUrl) ?>/login.php" class="text-sm font-semibold text-slate-600 hover:text-brand-600">Log in</a>
          <a href="<?= htmlspecialchars($publicUrl) ?>/register.php" class="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition shadow-sm">Sign up free</a>
        <?php endif; ?>
      </div>

      <button id="mobileMenuBtn" class="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100">
        <svg id="iconOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        <svg id="iconClose" class="h-6 w-6 hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  </div>

  <div id="mobileMenu" class="hidden md:hidden border-t border-slate-100 bg-white">
    <div class="px-4 py-3 space-y-1 text-sm font-medium">
      <a href="<?= htmlspecialchars($publicUrl) ?>/index.php" class="block rounded-lg px-3 py-2 hover:bg-brand-50 text-slate-700">Home</a>
      <a href="<?= htmlspecialchars($publicUrl) ?>/converter.php" class="block rounded-lg px-3 py-2 hover:bg-brand-50 text-slate-700">File Converter</a>
      <a href="<?= htmlspecialchars($publicUrl) ?>/analyze.php" class="block rounded-lg px-3 py-2 hover:bg-brand-50 text-slate-700">Image Gauges</a>
      <a href="<?= htmlspecialchars($publicUrl) ?>/about.php" class="block rounded-lg px-3 py-2 hover:bg-brand-50 text-slate-700">About</a>
      <div class="border-t border-slate-100 my-2"></div>
      <?php if ($u): ?>
        <?php if ($u['role'] === 'admin'): ?>
          <a href="<?= htmlspecialchars($publicUrl) ?>/admin/index.php" class="block rounded-lg px-3 py-2 hover:bg-brand-50 text-brand-700 font-semibold">Admin Panel</a>
        <?php endif; ?>
        <a href="<?= htmlspecialchars($publicUrl) ?>/logout.php" class="block rounded-lg px-3 py-2 hover:bg-brand-50 text-slate-700">Log out</a>
      <?php else: ?>
        <a href="<?= htmlspecialchars($publicUrl) ?>/login.php" class="block rounded-lg px-3 py-2 hover:bg-brand-50 text-slate-700">Log in</a>
        <a href="<?= htmlspecialchars($publicUrl) ?>/register.php" class="block rounded-lg px-3 py-2 bg-brand-600 text-white font-semibold">Sign up free</a>
      <?php endif; ?>
    </div>
  </div>
</header>
<script>
  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  const iconOpen = document.getElementById('iconOpen');
  const iconClose = document.getElementById('iconClose');
  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    iconOpen.classList.toggle('hidden');
    iconClose.classList.toggle('hidden');
  });
</script>
<script>
  window.trackLightningEvent = (event) => {
    const data = new URLSearchParams({event, page: window.location.pathname});
    fetch('<?= htmlspecialchars(public_url('api/track.php')) ?>', {method: 'POST', body: data, keepalive: true}).catch(() => {});
  };
  window.trackLightningEvent('page_view');
</script>
<main>
