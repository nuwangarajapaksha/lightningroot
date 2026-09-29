<?php
$pageTitle = 'Document and Image Tools';
$pageDescription = 'LightningRoot is building a practical workspace for image gauges, file conversion, document scanning, editing, captions, subtitles, and APIs. Try the browser-based Image Gauges today.';
require_once __DIR__ . '/../includes/header.php';

$services = [
  ['Image Analysis Gauges', 'Live now', 'Measure exposure, color, sharpness, noise, contrast, frequency, and more directly in your browser.', 'analyze.php', 'bg-brand-600'],
  ['File Conversion', 'Coming soon', 'Move between common document and image formats with clear, dependable output.', null, 'bg-slate-800'],
  ['Document Scanning', 'Coming soon', 'Turn scans into organized, searchable digital documents.', null, 'bg-slate-800'],
  ['Image and PDF Editing', 'Coming soon', 'Make practical edits, pages, crops, and exports in one focused workspace.', null, 'bg-slate-800'],
  ['Subtitles and Captions', 'Coming soon', 'Prepare accessible captions and subtitles for the content you create.', null, 'bg-slate-800'],
  ['API Access', 'Coming soon', 'Connect LightningRoot capabilities to your own tools and workflows.', null, 'bg-slate-800'],
];
$liveServices = count(array_filter($services, static fn (array $service): bool => $service[1] === 'Live now'));
$upcomingServices = count($services) - $liveServices;
?>

<script type="application/ld+json">
<?= json_encode([
  '@context' => 'https://schema.org',
  '@type' => 'WebSite',
  'name' => 'LightningRoot',
  'description' => $pageDescription,
  'url' => public_url('index.php'),
], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) ?>
</script>

  <section class="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-white text-slate-900">
    <div class="absolute inset-y-0 right-0 hidden w-1/2 bg-brand-50/60 lg:block"></div>
    <div class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <?php render_breadcrumbs(); ?>
      <div class="grid lg:grid-cols-[.9fr_1.1fr] gap-8 lg:gap-14 items-center">
        <div class="max-w-xl">
          <p class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-700"><span class="h-2 w-2 rounded-full bg-emerald-500"></span> LightningRoot platform</p>
          <h1 class="mt-5 text-4xl sm:text-6xl font-extrabold tracking-[-0.04em] leading-[.98] text-slate-950">Make every file<br><span class="text-brand-600">more legible.</span></h1>
          <p class="mt-5 max-w-lg text-base sm:text-lg leading-7 text-slate-600">A growing workspace for understanding, transforming, and publishing images and documents. Start with 21 browser-based Image Analysis Gauges.</p>
          <div class="mt-7 flex flex-col sm:flex-row gap-3">
            <a href="<?= htmlspecialchars(public_url('analyze.php')) ?>#image-upload" class="inline-flex justify-center items-center rounded-xl bg-brand-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-brand-600/20 hover:bg-brand-700 transition">Explore Image Gauges</a>
          </div>
          <div class="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-slate-500"><span class="inline-flex items-center gap-2"><i class="h-2 w-2 rounded-full bg-emerald-500"></i>Live in browser</span><span class="inline-flex items-center gap-2"><i class="h-2 w-2 rounded-full bg-brand-500"></i>No setup</span><span class="inline-flex items-center gap-2"><i class="h-2 w-2 rounded-full bg-slate-300"></i>More tools ahead</span></div>
        </div>

        <div class="relative flex items-center justify-center lg:justify-end">
          <div class="relative w-full max-w-md rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 shadow-[0_20px_55px_-24px_rgba(30,94,245,.35)]">
            <div class="flex items-center justify-between"><div><p class="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-600">Your file desk</p><h2 class="mt-1 text-lg font-extrabold text-slate-900">Work flows outward.</h2></div><span class="rounded-full bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-500 shadow-sm">Workspace</span></div>
            <div class="relative mt-4 min-h-[238px] overflow-hidden rounded-xl bg-[#dbeafe] p-4">
              <div class="absolute -right-10 -top-16 h-48 w-48 rounded-full border-[22px] border-white/50"></div><div class="absolute -bottom-20 -left-12 h-44 w-44 rounded-full bg-brand-300/40"></div>
              <div class="absolute left-5 top-7 h-40 w-[72%] rotate-[-6deg] rounded-xl border border-slate-200 bg-white p-3 shadow-lg"><div class="flex items-center gap-2"><span class="h-7 w-7 rounded-md bg-brand-100"></span><div class="space-y-1"><span class="block h-1.5 w-24 rounded-full bg-slate-200"></span><span class="block h-1.5 w-16 rounded-full bg-slate-100"></span></div></div><div class="mt-4 h-16 rounded-lg bg-gradient-to-br from-brand-200 via-brand-500 to-slate-900"><div class="ml-4 pt-4 h-2 w-16 rounded-full bg-white/50"></div><div class="ml-auto mr-4 mt-5 h-7 w-7 rounded-full bg-amber-300/80"></div></div><div class="mt-3 flex gap-2"><span class="h-2 w-20 rounded-full bg-slate-100"></span><span class="h-2 w-10 rounded-full bg-slate-100"></span></div></div>
              <div class="absolute bottom-5 right-4 w-44 rotate-[5deg] rounded-xl border border-brand-200 bg-white p-3 shadow-xl"><div class="flex items-center justify-between"><span class="text-[9px] font-bold uppercase tracking-wider text-brand-600">Live analysis</span><span class="h-2 w-2 rounded-full bg-emerald-500"></span></div><div class="mt-3 flex items-end gap-1 h-12"><?php foreach ([22, 34, 18, 42, 31, 49, 27, 38, 25, 45, 33] as $height): ?><span class="flex-1 rounded-t-sm bg-brand-400" style="height: <?= $height ?>%"></span><?php endforeach; ?></div><div class="mt-2 flex justify-between text-[9px] font-semibold text-slate-400"><span>Image gauges</span><span>21 tools</span></div></div>
            </div>
            <div class="mt-3 flex flex-wrap gap-1.5"><?php foreach ($services as $service): ?><span class="rounded-full border border-slate-200 bg-white px-2 py-1 text-[9px] font-bold text-slate-500"><?= htmlspecialchars($service[0]) ?></span><?php endforeach; ?></div>
          </div>
          <div class="absolute -bottom-3 left-2 hidden rounded-xl border border-brand-100 bg-white px-4 py-3 shadow-lg sm:block lg:left-0"><p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">The long view</p><p class="mt-1 text-sm font-bold text-slate-800">One file. Many useful outcomes.</p></div>
        </div>
      </div>
    </div>
  </section>

  <section class="border-y border-slate-800 bg-slate-950 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div class="flex items-end justify-between gap-6 mb-8 flex-wrap"><div><p class="text-xs font-bold uppercase tracking-[0.22em] text-brand-300">Platform status / 2026</p><h2 class="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight">The toolkit, at a glance.</h2></div><p class="max-w-sm text-sm leading-6 text-slate-400">One service is ready today. The rest are being shaped into focused, useful tools.</p></div>
      <div class="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/70">
        <table class="w-full min-w-[760px] text-left">
          <caption class="sr-only">LightningRoot platform service snapshot</caption>
          <thead class="border-b border-slate-800 text-[10px] uppercase tracking-[0.18em] text-slate-500"><tr><th class="px-6 py-4 font-bold">Metric</th><th class="px-6 py-4 font-bold">Now</th><th class="px-6 py-4 font-bold">Next</th><th class="px-6 py-4 font-bold">Total scope</th><th class="px-6 py-4 font-bold">Signal</th></tr></thead>
          <tbody>
            <tr class="divide-x divide-slate-800"><td class="px-6 py-6"><p class="text-sm font-bold text-white">Service lines</p><p class="mt-1 text-xs text-slate-500">The LightningRoot platform</p></td><td class="px-6 py-6"><span class="text-4xl font-extrabold text-emerald-400"><?= $liveServices ?></span><span class="ml-2 text-xs text-slate-400">live</span></td><td class="px-6 py-6"><span class="text-4xl font-extrabold text-amber-300"><?= $upcomingServices ?></span><span class="ml-2 text-xs text-slate-400">upcoming</span></td><td class="px-6 py-6"><span class="text-4xl font-extrabold text-brand-300"><?= count($services) ?></span><span class="ml-2 text-xs text-slate-400">mapped</span></td><td class="px-6 py-6"><div class="h-2 min-w-28 rounded-full bg-slate-800"><div class="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-brand-400" style="width: <?= round(($liveServices / max(count($services), 1)) * 100) ?>%"></div></div><p class="mt-2 text-xs font-semibold text-slate-400"><?= round(($liveServices / max(count($services), 1)) * 100) ?>% shipped</p></td></tr>
            <tr class="border-t border-slate-800 divide-x divide-slate-800"><td class="px-6 py-5"><p class="text-sm font-bold text-white">Capabilities</p><p class="mt-1 text-xs text-slate-500">What is available to use</p></td><td class="px-6 py-5"><span class="text-3xl font-extrabold text-brand-300">21</span><span class="ml-2 text-xs text-slate-400">image gauges</span></td><td class="px-6 py-5"><span class="text-3xl font-extrabold text-slate-300">48+</span><span class="ml-2 text-xs text-slate-400">planned tools</span></td><td class="px-6 py-5"><span class="text-3xl font-extrabold text-white">69+</span><span class="ml-2 text-xs text-slate-400">long-term</span></td><td class="px-6 py-5 text-sm font-semibold text-emerald-300">Browser-first</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div class="grid lg:grid-cols-[.8fr_1.2fr] gap-12 items-start">
      <div><p class="text-sm font-bold uppercase tracking-[0.18em] text-brand-600">The idea</p><h2 class="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">One home for useful file work.</h2></div>
      <div class="space-y-5 text-slate-600 leading-7"><p>Most file workflows are scattered across specialist apps, one-off converters, and tools that make simple tasks feel heavy. LightningRoot is being designed as a calm, connected place for the work around a file.</p><p>Each service will earn its own focused page, clear inputs and outputs, and search-friendly documentation. For now, Image Gauges is the first complete experience.</p></div>
    </div>
  </section>

  <section class="bg-slate-50 border-y border-slate-100" id="services">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="flex items-end justify-between gap-6 mb-10 flex-wrap"><div><p class="text-sm font-bold uppercase tracking-[0.18em] text-brand-600">Service map</p><h2 class="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">What LightningRoot is becoming</h2></div><p class="max-w-md text-sm leading-6 text-slate-500">Only one service is live today. The others are intentionally staged so every new page can be useful, fast, and discoverable.</p></div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <?php foreach ($services as $service): $isLive = $service[1] === 'Live now'; ?>
          <article class="relative flex min-h-56 flex-col rounded-2xl border <?= $isLive ? 'border-brand-200 bg-white shadow-lg shadow-brand-100/60' : 'border-slate-200 bg-white/70' ?> p-6">
            <div class="flex items-center justify-between gap-3"><span class="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider <?= $isLive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500' ?>"><?= htmlspecialchars($service[1]) ?></span><?php if ($isLive): ?><span class="h-2.5 w-2.5 rounded-full bg-emerald-500"></span><?php endif; ?></div>
            <h3 class="mt-5 text-xl font-bold text-slate-900"><?= htmlspecialchars($service[0]) ?></h3><p class="mt-2 text-sm leading-6 text-slate-500"><?= htmlspecialchars($service[2]) ?></p>
            <?php if ($isLive): ?><a href="<?= htmlspecialchars(public_url($service[3])) ?>" class="mt-auto pt-5 text-sm font-bold text-brand-600 hover:text-brand-800">Open the live tool <span aria-hidden="true">-></span></a><?php else: ?><p class="mt-auto pt-5 text-xs font-semibold text-slate-400">Planned as a dedicated service page</p><?php endif; ?>
          </article>
        <?php endforeach; ?>
      </div>
    </div>
  </section>
  
  <section class="bg-brand-600 text-white"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"><div><h2 class="text-2xl sm:text-3xl font-extrabold">Start with the part that is ready.</h2><p class="mt-2 text-brand-100">No installation. No server-side image analysis. Just open an image and inspect it.</p></div><a href="<?= htmlspecialchars(public_url('analyze.php')) ?>#image-upload" class="shrink-0 rounded-xl bg-white px-5 py-3 font-bold text-brand-700 hover:bg-brand-50 transition">Try Image Gauges</a></div></section>
<?php require_once __DIR__ . '/../includes/footer.php'; ?>
