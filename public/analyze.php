<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/auth.php';
$pageTitle = 'Image Analysis Gauges';
$pageDescription = 'Analyze an image in your browser with 21 professional gauges for histograms, waveforms, exposure, color, sharpness, noise, contrast, and dynamic range.';
$savedAnalyses = [];
$savedPage = max(1, (int)($_GET['saved_page'] ?? 1));
$savedPerPage = 6;
$savedTotal = 0;
$savedPageCount = 0;
$savedUser = current_user();
if ($savedUser) {
    $countStmt = $pdo->prepare('SELECT COUNT(*) FROM uploads WHERE user_id = :user_id');
    $countStmt->execute([':user_id' => $savedUser['id']]);
    $savedTotal = (int)$countStmt->fetchColumn();
    $savedPageCount = max(1, (int)ceil($savedTotal / $savedPerPage));
    $savedPage = min($savedPage, $savedPageCount);
    $savedStmt = $pdo->prepare('
      SELECT u.id, u.filename, u.original_name, u.filesize, u.width, u.height, u.mime_type, u.created_at, ar.gauge_data
      FROM uploads u
      LEFT JOIN analysis_results ar ON ar.upload_id = u.id
      WHERE u.user_id = :user_id
      ORDER BY u.created_at DESC
      LIMIT :limit OFFSET :offset
    ');
    $savedStmt->bindValue(':user_id', $savedUser['id'], PDO::PARAM_INT);
    $savedStmt->bindValue(':limit', $savedPerPage, PDO::PARAM_INT);
    $savedStmt->bindValue(':offset', ($savedPage - 1) * $savedPerPage, PDO::PARAM_INT);
    $savedStmt->execute();
    $savedAnalyses = $savedStmt->fetchAll(PDO::FETCH_ASSOC);
}
require_once __DIR__ . '/../includes/header.php';

$gaugeGroups = [
  'Tone and color' => ['Histogram', 'RGB Histogram', 'Luma Histogram', 'Color Distribution', 'Cumulative Histogram'],
  'Scopes and exposure' => ['Waveform Monitor', 'RGB Parade', 'Vectorscope', 'False Color', 'Zebra Pattern', 'Clipping Detection'],
  'Focus and detail' => ['Focus Peaking', 'Sharpness (Laplacian)', 'Blur Detection', 'Edge Detection', 'Gradient / Saliency Map'],
  'Signal and frequency' => ['Noise Map (High-Freq)', 'SNR', 'Contrast', 'Dynamic Range', 'FFT / Frequency Spectrum'],
];
$upcomingGaugeGroups = [
  'Composition guides' => ['Rule of Thirds Grid', 'Golden Ratio Grid', 'Horizon Level', 'Safe Area Guides', 'Perspective Grid'],
  'Profiles and curves' => ['Intensity Profile', 'RGB Channel Profile', 'Gamma Curve', 'Tone Curve', 'Entropy Measurement'],
  'Advanced vision' => ['Depth Map', 'Optical Flow Visualization', 'Heat Map', 'Edge-Density Map', 'Wavelet Analysis'],
  'Expanded scopes' => ['YCbCr Parade', 'IRE Meter', 'Exposure Meter', 'Chroma Waveform', 'Power Spectrum'],
];
?>

<section class="bg-slate-950 text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
    <?php render_breadcrumbs(true); ?>
    <div class="grid lg:grid-cols-[1.1fr_.9fr] gap-10 items-end">
      <div>
        <h1 class="mt-4 text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.02]">See what your image is really doing.</h1>
        <p class="mt-5 max-w-2xl text-lg leading-8 text-slate-300">A browser-based image measurement workspace for photographers, designers, filmmakers, archivists, and anyone who needs more than a visual guess.</p>
        <a href="#image-upload" class="mt-7 inline-flex items-center rounded-xl bg-brand-500 px-5 py-3 font-bold text-white hover:bg-brand-400 transition">Upload an image <span class="ml-2" aria-hidden="true">-></span></a>
      </div>
      <div class="grid grid-cols-4 gap-px overflow-hidden rounded-2xl border border-slate-800 bg-slate-800">
        <div class="bg-slate-950 p-3"><p class="text-3xl font-extrabold text-white">21</p><p class="mt-1 text-xs text-slate-400">gauges</p></div>
        <div class="bg-slate-950 p-3"><p class="text-3xl font-extrabold text-orange-400">0</p><p class="mt-1 text-xs text-slate-400">server analysis</p></div>
        <div class="bg-slate-950 p-3"><p class="text-3xl font-extrabold text-brand-400">PDF</p><p class="mt-1 text-xs text-slate-400">report export</p></div>
        <div class="bg-slate-950 p-3"><p class="text-3xl font-extrabold text-emerald-400">20</p><p class="mt-1 text-xs text-slate-400">upcoming gauges</p></div>
      </div>
    </div>
  </div>
</section>

<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
  <div class="grid lg:grid-cols-[.8fr_1.2fr] gap-10 items-start mb-12">
    <div><p class="text-sm font-bold uppercase tracking-[0.18em] text-brand-600">What it measures</p><h2 class="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">A technical readout, not a filter.</h2></div>
    <div class="space-y-4 text-slate-600 leading-7"><p>Image Gauges turns one image into a set of visual and numeric readouts. Inspect tonal balance, RGB behavior, exposure risk, color relationships, detail, noise, contrast, and frequency content in one pass.</p><p>Simple measurements use the full-resolution image. Compute-heavy analysis is performed on a smaller working copy so the experience stays responsive in the browser.</p></div>
  </div>
  <div class="grid md:grid-cols-3 gap-4 mb-14">
    <div class="rounded-2xl border border-slate-200 bg-white p-5"><span class="text-xs font-bold uppercase tracking-wider text-brand-600">01 / Load</span><h3 class="mt-3 font-bold text-slate-900">Choose an image</h3><p class="mt-2 text-sm leading-6 text-slate-500">Drag and drop or browse for a JPG, PNG, or WEBP up to 15MB.</p></div>
    <div class="rounded-2xl border border-slate-200 bg-white p-5"><span class="text-xs font-bold uppercase tracking-wider text-brand-600">02 / Inspect</span><h3 class="mt-3 font-bold text-slate-900">Run all gauges</h3><p class="mt-2 text-sm leading-6 text-slate-500">See scopes, maps, meters, and summary values generated instantly in your browser.</p></div>
    <div class="rounded-2xl border border-slate-200 bg-white p-5"><span class="text-xs font-bold uppercase tracking-wider text-brand-600">03 / Keep</span><h3 class="mt-3 font-bold text-slate-900">Save or export</h3><p class="mt-2 text-sm leading-6 text-slate-500">Save the image and numeric result to your account or download a PDF report.</p></div>
  </div>

  <?php if ($savedUser): ?>
    <section id="saved-analyses" class="mb-12 scroll-mt-24">
      <div class="flex items-end justify-between gap-4 flex-wrap mb-5">
        <div><p class="text-sm font-bold uppercase tracking-[0.18em] text-brand-600">Your workspace</p><h2 class="mt-2 text-2xl font-extrabold text-slate-900">Saved analyses</h2><p class="mt-2 text-sm text-slate-500">Select a previous analysis to restore its image and graphs.</p></div>
        <?php if ($savedTotal): ?><span class="text-sm text-slate-500"><?= $savedTotal ?> saved <?= $savedTotal === 1 ? 'analysis' : 'analyses' ?></span><?php endif; ?>
      </div>
      <?php if (!$savedAnalyses): ?>
        <div class="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-8 text-center text-sm text-slate-500">Your saved analyses will appear here after you save an image.</div>
      <?php else: ?>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <?php foreach ($savedAnalyses as $saved): ?>
            <?php $savedGaugeData = json_decode($saved['gauge_data'] ?? '{}', true) ?: []; ?>
            <button type="button" class="saved-analysis-card overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm hover:border-brand-400 hover:shadow-md transition" data-saved-analysis='<?= htmlspecialchars(json_encode([
                'image_url' => public_url('../uploads/' . $saved['filename']),
                'original_name' => $saved['original_name'],
                'filesize' => (int)$saved['filesize'],
                'mime_type' => $saved['mime_type'],
                'width' => (int)$saved['width'],
                'height' => (int)$saved['height'],
                'gauge_data' => $savedGaugeData,
            ], JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP), ENT_QUOTES, 'UTF-8') ?>'>
              <img src="<?= htmlspecialchars(public_url('../uploads/' . $saved['filename'])) ?>" alt="<?= htmlspecialchars($saved['original_name']) ?>" class="h-36 w-full object-cover bg-slate-100">
              <span class="block p-4"><span class="block truncate font-bold text-slate-900"><?= htmlspecialchars($saved['original_name']) ?></span><span class="mt-1 block text-xs text-slate-500"><?= (int)$saved['width'] ?>×<?= (int)$saved['height'] ?> · <?= htmlspecialchars(date('M j, Y', strtotime($saved['created_at']))) ?></span><span class="mt-3 block text-xs font-semibold text-brand-700">Open analysis -&gt;</span></span>
            </button>
          <?php endforeach; ?>
        </div>
        <?php if ($savedPageCount > 1): ?>
          <nav class="mt-5 flex items-center justify-center gap-2" aria-label="Saved analyses pages">
            <?php if ($savedPage > 1): ?><a href="?saved_page=<?= $savedPage - 1 ?>#saved-analyses" class="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">Previous</a><?php endif; ?>
            <span class="px-3 text-sm text-slate-500">Page <?= $savedPage ?> of <?= $savedPageCount ?></span>
            <?php if ($savedPage < $savedPageCount): ?><a href="?saved_page=<?= $savedPage + 1 ?>#saved-analyses" class="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">Next</a><?php endif; ?>
          </nav>
        <?php endif; ?>
      <?php endif; ?>
    </section>
  <?php endif; ?>

  <div id="image-upload" class="mb-5 flex items-end justify-between gap-4 flex-wrap"><div><p class="text-sm font-bold uppercase tracking-[0.18em] text-brand-600">Try it now</p><h2 class="mt-2 text-2xl font-extrabold text-slate-900">Analyze an image</h2></div><p class="text-sm text-slate-500">Your image stays local until you choose Save.</p></div>
  <div id="processStatus" class="fixed bottom-4 left-4 right-4 z-50 hidden items-center gap-3 rounded-xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700 shadow-xl sm:left-auto sm:w-96" role="status" aria-live="polite"><svg class="h-4 w-4 shrink-0 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" class="opacity-25" stroke="currentColor" stroke-width="3"></circle><path d="M21 12a9 9 0 0 1-9 9" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path></svg><span id="processStatusText"></span></div>
  <div class="scroll-mt-24">
    <div id="dropZone" class="rounded-2xl border-2 border-dashed border-brand-200 bg-brand-50/50 p-10 text-center cursor-pointer hover:border-brand-400 transition">
    <input type="file" id="fileInput" accept="image/*" class="hidden">
    <svg class="mx-auto h-10 w-10 text-brand-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg>
    <p class="font-semibold text-brand-700">Click to upload or drag & drop</p>
    <p class="text-sm text-slate-500 mt-1">PNG, JPG, WEBP — up to 15MB</p>
    </div>
  </div>

  <div id="previewWrap" class="hidden max-w-2xl mx-auto mt-8 text-center">
    <img id="previewImg" class="max-h-72 mx-auto rounded-xl shadow-md" />
    <p id="imgMeta" class="text-sm text-slate-500 mt-2"></p>
    <div class="flex justify-center gap-3 mt-3">
      <button id="saveBtn" class="rounded-lg bg-slate-100 px-5 py-2 text-slate-700 font-semibold hover:bg-slate-200 transition">Save to my account</button>
      <button id="downloadBtn" class="hidden rounded-lg bg-emerald-100 px-5 py-2 text-emerald-700 font-semibold hover:bg-emerald-200 transition">Download PDF report</button>
    </div>
    <p id="saveMsg" class="text-sm mt-2"></p>
    <p id="reportMsg" class="text-sm mt-2"></p>
  </div>

  <div id="summaryWrap" class="hidden max-w-3xl mx-auto mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
    <div class="rounded-xl bg-white border border-slate-100 p-4"><p class="text-xs text-slate-500">Sharpness</p><p id="sSharp" class="text-lg font-bold text-brand-700">—</p></div>
    <div class="rounded-xl bg-white border border-slate-100 p-4"><p class="text-xs text-slate-500">Noise (RMS)</p><p id="sNoise" class="text-lg font-bold text-brand-700">—</p></div>
    <div class="rounded-xl bg-white border border-slate-100 p-4"><p class="text-xs text-slate-500">SNR</p><p id="sSnr" class="text-lg font-bold text-brand-700">—</p></div>
    <div class="rounded-xl bg-white border border-slate-100 p-4"><p class="text-xs text-slate-500">Dynamic Range</p><p id="sDr" class="text-lg font-bold text-brand-700">—</p></div>
  </div>

  <div id="gaugesGrid" class="hidden mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"></div>
</section>

<section class="border-y border-slate-100 bg-slate-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
    <div class="max-w-2xl mb-8"><p class="text-sm font-bold uppercase tracking-[0.18em] text-brand-600">The full gauge set</p><h2 class="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">Everything included today.</h2><p class="mt-3 leading-7 text-slate-600">Each group answers a different question about the same image. Use one view or compare several together.</p></div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <?php foreach ($gaugeGroups as $group => $gauges): ?><div class="rounded-2xl border border-slate-200 bg-white p-5"><h3 class="font-bold text-slate-900"><?= htmlspecialchars($group) ?></h3><ul class="mt-4 space-y-2"><?php foreach ($gauges as $gauge): ?><li class="flex items-start gap-2 text-sm text-slate-600"><span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"></span><?= htmlspecialchars($gauge) ?></li><?php endforeach; ?></ul></div><?php endforeach; ?>
    </div>
  </div>
</section>

<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
  <div class="flex items-end justify-between gap-6 mb-8 flex-wrap"><div><p class="text-sm font-bold uppercase tracking-[0.18em] text-brand-600">Coming next</p><h2 class="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">More gauges are on the way.</h2></div><span class="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">Planned features</span></div>
  <p class="max-w-3xl text-slate-600 leading-7 mb-8">The current 21 gauges cover the core readout. Upcoming tools will add composition guidance, tonal profiles, advanced vision maps, and deeper broadcast-style scopes.</p>
  <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <?php foreach ($upcomingGaugeGroups as $group => $gauges): ?><div class="rounded-2xl border border-slate-200 bg-white p-5"><h3 class="font-bold text-slate-900"><?= htmlspecialchars($group) ?></h3><ul class="mt-4 space-y-2"><?php foreach ($gauges as $gauge): ?><li class="flex items-start gap-2 text-sm text-slate-500"><span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400"></span><?= htmlspecialchars($gauge) ?></li><?php endforeach; ?></ul></div><?php endforeach; ?>
  </div>
</section>

<section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
  <div class="text-center mb-8"><p class="text-sm font-bold uppercase tracking-[0.18em] text-brand-600">Good to know</p><h2 class="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">Image Gauges, explained.</h2></div>
  <div class="divide-y divide-slate-200 border-y border-slate-200">
    <details class="group py-5" open><summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900">Is my image uploaded to a server?<span class="text-brand-600 transition group-open:rotate-45 text-xl">+</span></summary><p class="mt-3 max-w-3xl text-sm leading-6 text-slate-600">No. Gauge calculations run in your browser using canvas. The image is only sent to the server when you choose Save to my account, which stores the file and numeric summary.</p></details>
    <details class="group py-5"><summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900">What file types and sizes are supported?<span class="text-brand-600 transition group-open:rotate-45 text-xl">+</span></summary><p class="mt-3 max-w-3xl text-sm leading-6 text-slate-600">The current save workflow accepts JPG, PNG, and WEBP images up to 15MB. The browser preview accepts image files and the gauges run locally.</p></details>
    <details class="group py-5"><summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900">Do I need an account?<span class="text-brand-600 transition group-open:rotate-45 text-xl">+</span></summary><p class="mt-3 max-w-3xl text-sm leading-6 text-slate-600">No account is needed to inspect an image or download a PDF report. You need an account only when you want to save the image and result for later access.</p></details>
    <details class="group py-5"><summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900">What do the numbers mean?<span class="text-brand-600 transition group-open:rotate-45 text-xl">+</span></summary><p class="mt-3 max-w-3xl text-sm leading-6 text-slate-600">The gauges are diagnostic indicators, not absolute quality grades. Compare related images, inspect patterns across scopes, and use the readouts to support your own creative or technical judgment.</p></details>
  </div>
</section>

<script>
  window.lightningRootUploadUrl = <?= json_encode(public_url('api/upload.php')) ?>;
  window.lightningRootLoginUrl = <?= json_encode(public_url('login.php')) ?>;
</script>
<script src="<?= htmlspecialchars(public_url('assets/js/gauges.js')) ?>"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="<?= htmlspecialchars(public_url('assets/js/analyze.js')) ?>"></script>

<?php require_once __DIR__ . '/../includes/footer.php'; ?>
