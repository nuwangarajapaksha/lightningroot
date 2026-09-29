<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/auth.php';
require_admin();

$totalUsers = $pdo->query('SELECT COUNT(*) FROM users')->fetchColumn();
$totalUploads = $pdo->query('SELECT COUNT(*) FROM uploads')->fetchColumn();
$uploadsToday = $pdo->query("SELECT COUNT(*) FROM uploads WHERE created_at::date = CURRENT_DATE")->fetchColumn();
$newUsersWeek = $pdo->query("SELECT COUNT(*) FROM users WHERE created_at > NOW() - INTERVAL '7 days'")->fetchColumn();
$activeUsers = $pdo->query("SELECT COUNT(*) FROM users WHERE status = 'active'")->fetchColumn();

$visitorStats = $pdo->query(" 
  SELECT
    COUNT(DISTINCT meta->>'visitor_id') FILTER (WHERE action = 'page_view') AS visitors,
    COUNT(DISTINCT meta->>'visitor_id') FILTER (WHERE action = 'page_view' AND user_id IS NULL) AS anonymous_visitors,
    COUNT(DISTINCT user_id) FILTER (WHERE action = 'page_view' AND user_id IS NOT NULL) AS registered_visitors
  FROM activity_log
  WHERE created_at >= NOW() - INTERVAL '30 days'
")->fetch(PDO::FETCH_ASSOC);
$gaugeRuns = (int)$pdo->query("SELECT COUNT(*) FROM activity_log WHERE action = 'gauge_run' AND created_at >= NOW() - INTERVAL '30 days'")->fetchColumn();
$savedAnalyses = (int)$pdo->query("SELECT COUNT(*) FROM analysis_results WHERE created_at >= NOW() - INTERVAL '30 days'")->fetchColumn();
$reportDownloads = (int)$pdo->query("SELECT COUNT(*) FROM activity_log WHERE action = 'report_download' AND created_at >= NOW() - INTERVAL '30 days'")->fetchColumn();
$saveRate = $gaugeRuns > 0 ? round(($savedAnalyses / $gaugeRuns) * 100, 1) : 0;

$usageRows = $pdo->query(" 
  SELECT to_char(d::date, 'Mon DD') AS day,
    COALESCE(SUM(CASE WHEN a.action = 'page_view' THEN 1 ELSE 0 END), 0) AS visits,
    COALESCE(SUM(CASE WHEN a.action = 'gauge_run' THEN 1 ELSE 0 END), 0) AS gauges,
    COALESCE(SUM(CASE WHEN a.action = 'upload' THEN 1 ELSE 0 END), 0) AS saves
  FROM generate_series(CURRENT_DATE - INTERVAL '13 days', CURRENT_DATE, INTERVAL '1 day') d
  LEFT JOIN activity_log a ON a.created_at::date = d::date
  GROUP BY d ORDER BY d
")->fetchAll(PDO::FETCH_ASSOC);

$eventRows = $pdo->query(" 
  SELECT action, COUNT(*) AS total FROM activity_log
  WHERE created_at >= NOW() - INTERVAL '30 days'
  GROUP BY action ORDER BY total DESC
")->fetchAll(PDO::FETCH_ASSOC);

$recentUsers = $pdo->query('SELECT id, name, email, role, created_at, last_login_at FROM users ORDER BY created_at DESC LIMIT 10')->fetchAll(PDO::FETCH_ASSOC);

$recentUploads = $pdo->query('
  SELECT u.id, u.original_name, u.width, u.height, u.created_at, us.name AS user_name, ar.gauge_data
  FROM uploads u
  LEFT JOIN users us ON us.id = u.user_id
  LEFT JOIN analysis_results ar ON ar.upload_id = u.id
  ORDER BY u.created_at DESC LIMIT 10
')->fetchAll(PDO::FETCH_ASSOC);

// Uploads per day for the last 14 days (for the chart)
$chartRows = $pdo->query("
  SELECT to_char(d::date,'Mon DD') AS day, COALESCE(cnt,0) AS cnt FROM
  generate_series(CURRENT_DATE - INTERVAL '13 days', CURRENT_DATE, INTERVAL '1 day') d
  LEFT JOIN (SELECT created_at::date AS dd, COUNT(*) AS cnt FROM uploads GROUP BY dd) t ON t.dd = d::date
  ORDER BY d
")->fetchAll(PDO::FETCH_ASSOC);

$pageTitle = 'Admin Dashboard';
require_once __DIR__ . '/../../includes/header.php';
?>
<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
  <?php render_breadcrumbs(); ?>
  <div class="flex items-center justify-between mb-8 flex-wrap gap-3">
    <h1 class="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
    <nav class="flex gap-2 text-sm">
      <a href="<?= htmlspecialchars(public_url('admin/index.php')) ?>" class="px-3 py-1.5 rounded-lg bg-brand-600 text-white font-medium">Overview</a>
      <a href="<?= htmlspecialchars(public_url('admin/users.php')) ?>" class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200">Users</a>
      <a href="<?= htmlspecialchars(public_url('admin/uploads.php')) ?>" class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200">Uploads</a>
    </nav>
  </div>

  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <div class="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm"><p class="text-xs font-semibold text-slate-500">Unique visitors</p><p class="mt-2 text-3xl font-extrabold text-slate-900"><?= (int)($visitorStats['visitors'] ?? 0) ?></p><p class="mt-1 text-xs text-slate-400">last 30 days</p></div>
    <div class="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm"><p class="text-xs font-semibold text-slate-500">Registered users</p><p class="mt-2 text-3xl font-extrabold text-brand-700"><?= (int)($visitorStats['registered_visitors'] ?? 0) ?></p><p class="mt-1 text-xs text-slate-400"><?= (int)$activeUsers ?> active accounts</p></div>
    <div class="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm"><p class="text-xs font-semibold text-slate-500">Anonymous visitors</p><p class="mt-2 text-3xl font-extrabold text-amber-600"><?= (int)($visitorStats['anonymous_visitors'] ?? 0) ?></p><p class="mt-1 text-xs text-slate-400">not signed in</p></div>
    <div class="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm"><p class="text-xs font-semibold text-slate-500">New accounts</p><p class="mt-2 text-3xl font-extrabold text-emerald-600"><?= (int)$newUsersWeek ?></p><p class="mt-1 text-xs text-slate-400">joined this week</p></div>
  </div>

  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
    <div class="rounded-2xl bg-brand-600 text-white p-5 shadow-sm"><p class="text-xs font-semibold text-brand-100">Gauge runs</p><p class="mt-2 text-3xl font-extrabold"><?= $gaugeRuns ?></p><p class="mt-1 text-xs text-brand-100">browser analyses</p></div>
    <div class="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm"><p class="text-xs font-semibold text-slate-500">Saved analyses</p><p class="mt-2 text-3xl font-extrabold text-slate-900"><?= $savedAnalyses ?></p><p class="mt-1 text-xs text-slate-400">stored with uploads</p></div>
    <div class="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm"><p class="text-xs font-semibold text-slate-500">Save rate</p><p class="mt-2 text-3xl font-extrabold text-emerald-600"><?= $saveRate ?>%</p><p class="mt-1 text-xs text-slate-400">runs that were saved</p></div>
    <div class="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm"><p class="text-xs font-semibold text-slate-500">PDF reports</p><p class="mt-2 text-3xl font-extrabold text-slate-900"><?= $reportDownloads ?></p><p class="mt-1 text-xs text-slate-400">downloaded this month</p></div>
  </div>

  <div class="rounded-2xl bg-white border border-slate-100 p-5 sm:p-6 mb-10 shadow-sm">
    <div class="flex items-center justify-between mb-4"><div><h2 class="font-bold text-slate-900">Site pulse</h2><p class="text-xs text-slate-500 mt-1">Visits, gauge runs, and saved results over the last 14 days</p></div><span class="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">Live telemetry</span></div>
    <canvas id="usageChart" height="90"></canvas>
  </div>

  <div class="grid lg:grid-cols-[1.35fr_.65fr] gap-8 mb-10">
    <div class="rounded-2xl bg-white border border-slate-100 p-5 sm:p-6 shadow-sm"><h2 class="font-bold text-slate-900">Audience split</h2><p class="text-xs text-slate-500 mt-1">Unique visitors who viewed the site in the last 30 days</p><div class="mt-5 h-4 rounded-full bg-slate-100 overflow-hidden flex"><div class="bg-brand-500" style="width: <?= (int)($visitorStats['visitors'] ?? 0) > 0 ? round(((int)$visitorStats['registered_visitors'] / (int)$visitorStats['visitors']) * 100, 2) : 0 ?>%"></div><div class="bg-amber-400" style="width: <?= (int)($visitorStats['visitors'] ?? 0) > 0 ? round(((int)$visitorStats['anonymous_visitors'] / (int)$visitorStats['visitors']) * 100, 2) : 0 ?>%"></div></div><div class="mt-4 flex gap-6 text-sm"><span class="flex items-center gap-2 text-slate-600"><i class="h-3 w-3 rounded-full bg-brand-500"></i>Registered <?= (int)($visitorStats['registered_visitors'] ?? 0) ?></span><span class="flex items-center gap-2 text-slate-600"><i class="h-3 w-3 rounded-full bg-amber-400"></i>Anonymous <?= (int)($visitorStats['anonymous_visitors'] ?? 0) ?></span></div></div>
    <div class="rounded-2xl bg-white border border-slate-100 p-5 sm:p-6 shadow-sm"><h2 class="font-bold text-slate-900">Event mix</h2><p class="text-xs text-slate-500 mt-1">What people did this month</p><div class="mt-4 space-y-3"><?php foreach ($eventRows as $event): ?><div class="flex items-center justify-between text-sm"><span class="text-slate-600"><?= htmlspecialchars(ucwords(str_replace('_', ' ', $event['action']))) ?></span><span class="font-bold text-slate-900"><?= (int)$event['total'] ?></span></div><?php endforeach; ?></div></div>
  </div>

  <div class="grid lg:grid-cols-2 gap-8">
    <div>
      <h2 class="font-semibold text-slate-800 mb-3">Recent Users</h2>
      <div class="rounded-xl border border-slate-100 overflow-hidden">
        <table class="w-full text-sm">
          <thead class="bg-slate-50 text-slate-500 text-left"><tr><th class="p-3">Name</th><th class="p-3">Email</th><th class="p-3">Role</th><th class="p-3">Joined</th></tr></thead>
          <tbody>
            <?php foreach ($recentUsers as $u): ?>
            <tr class="border-t border-slate-100">
              <td class="p-3 font-medium text-slate-800"><?= htmlspecialchars($u['name']) ?></td>
              <td class="p-3 text-slate-500"><?= htmlspecialchars($u['email']) ?></td>
              <td class="p-3"><span class="px-2 py-0.5 rounded-full text-xs <?= $u['role']==='admin'?'bg-brand-100 text-brand-700':'bg-slate-100 text-slate-600' ?>"><?= htmlspecialchars($u['role']) ?></span></td>
              <td class="p-3 text-slate-500"><?= htmlspecialchars(date('M j, Y', strtotime($u['created_at']))) ?></td>
            </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    </div>

    <div>
      <h2 class="font-semibold text-slate-800 mb-3">Recent Uploads & Analyses</h2>
      <div class="rounded-xl border border-slate-100 overflow-hidden">
        <table class="w-full text-sm">
          <thead class="bg-slate-50 text-slate-500 text-left"><tr><th class="p-3">File</th><th class="p-3">User</th><th class="p-3">Sharpness</th><th class="p-3">Date</th></tr></thead>
          <tbody>
            <?php foreach ($recentUploads as $up): $g = json_decode($up['gauge_data'] ?? '{}', true); ?>
            <tr class="border-t border-slate-100">
              <td class="p-3 font-medium text-slate-800"><?= htmlspecialchars($up['original_name']) ?></td>
              <td class="p-3 text-slate-500"><?= htmlspecialchars($up['user_name'] ?? '—') ?></td>
              <td class="p-3 text-slate-500"><?= isset($g['sharpness_variance']) ? number_format($g['sharpness_variance'],1) : '—' ?></td>
              <td class="p-3 text-slate-500"><?= htmlspecialchars(date('M j, Y', strtotime($up['created_at']))) ?></td>
            </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.4/chart.umd.min.js"></script>
<script>
  const ctx = document.getElementById('usageChart');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: <?= json_encode(array_column($usageRows,'day')) ?>,
      datasets: [{
        label: 'Visits',
        data: <?= json_encode(array_map('intval', array_column($usageRows,'visits'))) ?>,
        borderColor: '#1e5ef5',
        backgroundColor: 'rgba(30,94,245,0.08)',
        fill: true, tension: 0.35, borderWidth: 3
      }, {
        label: 'Gauge runs',
        data: <?= json_encode(array_map('intval', array_column($usageRows,'gauges'))) ?>,
        borderColor: '#f59e0b', backgroundColor: 'transparent', tension: 0.35, borderWidth: 2
      }, {
        label: 'Saved',
        data: <?= json_encode(array_map('intval', array_column($usageRows,'saves'))) ?>,
        borderColor: '#10b981', backgroundColor: 'transparent', tension: 0.35, borderWidth: 2
      }]
    },
    options: { plugins:{legend:{position:'bottom', labels:{usePointStyle:true, boxWidth:8}}}, scales:{y:{beginAtZero:true, ticks:{precision:0}}, x:{grid:{display:false}}}, interaction:{intersect:false, mode:'index'} }
  });
</script>

<?php require_once __DIR__ . '/../../includes/footer.php'; ?>
