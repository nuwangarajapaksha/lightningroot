<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/auth.php';
require_admin();

$uploads = $pdo->query('
  SELECT u.id, u.filename, u.original_name, u.width, u.height, u.filesize, u.created_at,
         us.name AS user_name, ar.gauge_data
  FROM uploads u
  LEFT JOIN users us ON us.id = u.user_id
  LEFT JOIN analysis_results ar ON ar.upload_id = u.id
  ORDER BY u.created_at DESC LIMIT 100
')->fetchAll(PDO::FETCH_ASSOC);

$pageTitle = 'Manage Uploads';
require_once __DIR__ . '/../../includes/header.php';
?>
<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
  <?php render_breadcrumbs(); ?>
  <div class="flex items-center justify-between mb-8 flex-wrap gap-3">
    <h1 class="text-2xl font-bold text-slate-900">Uploads (<?= count($uploads) ?>)</h1>
    <nav class="flex gap-2 text-sm">
      <a href="<?= htmlspecialchars(public_url('admin/index.php')) ?>" class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200">Overview</a>
      <a href="<?= htmlspecialchars(public_url('admin/users.php')) ?>" class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200">Users</a>
      <a href="<?= htmlspecialchars(public_url('admin/uploads.php')) ?>" class="px-3 py-1.5 rounded-lg bg-brand-600 text-white font-medium">Uploads</a>
    </nav>
  </div>
  <div class="rounded-xl border border-slate-100 overflow-x-auto">
    <table class="w-full text-sm min-w-[800px]">
      <thead class="bg-slate-50 text-slate-500 text-left">
        <tr><th class="p-3">Preview</th><th class="p-3">File</th><th class="p-3">User</th><th class="p-3">Size</th><th class="p-3">Sharpness</th><th class="p-3">SNR (dB)</th><th class="p-3">Date</th></tr>
      </thead>
      <tbody>
        <?php foreach ($uploads as $up): $g = json_decode($up['gauge_data'] ?? '{}', true); ?>
        <tr class="border-t border-slate-100">
          <td class="p-3"><img src="/uploads/<?= htmlspecialchars($up['filename']) ?>" class="h-10 w-10 object-cover rounded-md"></td>
          <td class="p-3 font-medium text-slate-800"><?= htmlspecialchars($up['original_name']) ?></td>
          <td class="p-3 text-slate-500"><?= htmlspecialchars($up['user_name'] ?? '—') ?></td>
          <td class="p-3 text-slate-500"><?= $up['width'] ?>×<?= $up['height'] ?> · <?= round($up['filesize']/1024) ?>KB</td>
          <td class="p-3 text-slate-500"><?= isset($g['sharpness_variance']) ? number_format($g['sharpness_variance'],1) : '—' ?></td>
          <td class="p-3 text-slate-500"><?= isset($g['snr_db']) ? number_format($g['snr_db'],1) : '—' ?></td>
          <td class="p-3 text-slate-500"><?= htmlspecialchars(date('M j, Y', strtotime($up['created_at']))) ?></td>
        </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  </div>
</section>
<?php require_once __DIR__ . '/../../includes/footer.php'; ?>
