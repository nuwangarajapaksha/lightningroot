<?php
$pageTitle = 'About';
$pageDescription = 'Explore the LightningRoot roadmap: Image Analysis Gauges are live now, with document scanning, file conversion, editing, captions, subtitles, and API access planned.';
require_once __DIR__ . '/../includes/header.php';

$live = ['Image Analysis Gauges', 'Histogram','RGB Histogram','Luma Histogram','Waveform Monitor','RGB Parade','Vectorscope','False Color','Zebra Pattern','Clipping Detection','Focus Peaking','Sharpness Meter','Blur Detection','Noise Meter','SNR Meter','Contrast Meter','Dynamic Range Meter','Color Distribution','Cumulative Histogram','FFT / Frequency Spectrum','Edge Detection','Gradient / Saliency Map'];
$categories = [
  // 'Histograms & Distributions' => ['Histogram','RGB Histogram','Luma Histogram','2D Histogram','Joint Histogram','Cumulative Histogram','CDF','Grayscale Histogram','Color Histogram','Color Distribution'],
  // 'Waveform & Scopes' => ['Waveform Monitor','Luma Waveform','RGB Waveform','YC Waveform','RGB Parade','Parade','YCbCr Parade','Vectorscope','YUV Vectorscope','Chroma Waveform','IRE Meter','Exposure Meter'],
  // 'Exposure & Clipping' => ['Zebra Pattern','False Color','Clipping Warning','Highlight Warning','Shadow Warning','RGB Clipping Indicator'],
  // 'Sharpness & Focus' => ['Focus Peaking','Edge Detection','Sharpness Meter','Laplacian / Variance Sharpness','Blur Detection','MTF','Local Contrast Meter'],
  // 'Noise & Signal Quality' => ['Noise Meter','SNR','Noise Distribution'],
  // 'Composition Guides' => ['Grid','Rule of Thirds Grid','Golden Ratio Grid','Golden Spiral','Center Crosshair','Horizon Level','Aspect-Ratio Guides','Safe Area Guides','Crop Guides','Perspective Grid','Leading-Line Guides'],
  // 'Profiles & Curves' => ['Intensity Profile','Pixel-Value Plot','RGB Channel Profile','Gamma Curve','Tone Curve','Transfer Curve','Entropy Measurement','Contrast Measurement','Dynamic Range Measurement'],
  // 'Frequency Analysis' => ['Wavelet Analysis','FFT','Frequency Spectrum','Power Spectrum','Fourier Magnitude Spectrum'],
  // 'Maps & Vision' => ['Edge-Density Map','Gradient Magnitude','Heat Map','Saliency Map','Depth Map','Optical-Flow Visualization'],
  'Services' => ['Image Analysis Gauges', 'File Format Conversion','Document Scanning','Image Editing','PDF Tools','API Access'],
];
?>
<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
  <?php render_breadcrumbs(); ?>
  <div class="max-w-3xl mx-auto text-center mb-14">
    <h1 class="text-3xl font-bold text-slate-900 mb-4">About LightningRoot</h1>
    <p class="text-slate-600 leading-relaxed mb-4">LightningRoot.com is being built as a home for practical, fast document and image tools — starting with a full suite of professional-grade image analysis gauges, and growing to include scanning, file conversion, and editing services.</p>
    <p class="text-slate-600 leading-relaxed">Every gauge runs directly in your browser: nothing is uploaded unless you choose to save a result to your account, which helps keep your files private and analysis instant.</p>
  </div>

  <div class="max-w-3xl mx-auto mb-12">
    <h2 class="text-2xl font-bold text-slate-900 text-center mb-3">Capabilities and roadmap</h2>
    <p class="text-center text-slate-600">21 gauges are live today. The remaining tools below are planned as LightningRoot expands its analysis and document toolkit.</p>
  </div>

  <div class="space-y-10">
    <?php foreach ($categories as $category => $items): ?>
      <section>
        <h3 class="text-lg font-semibold text-brand-800 mb-4"><?= htmlspecialchars($category) ?></h3>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <?php foreach ($items as $item): $isLive = in_array($item, $live, true); ?>
            <div class="flex items-center justify-between rounded-lg border border-slate-100 px-4 py-3 bg-white">
              <span class="text-sm text-slate-700"><?= htmlspecialchars($item) ?></span>
              <?php if ($isLive): ?>
                <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Live</span>
              <?php else: ?>
                <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">Soon</span>
              <?php endif; ?>
            </div>
          <?php endforeach; ?>
        </div>
      </section>
    <?php endforeach; ?>
  </div>
</section>
<?php require_once __DIR__ . '/../includes/footer.php'; ?>
