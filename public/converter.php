<?php
$pageTitle = 'File Converter';
$pageDescription = 'Convert and compress common image, PDF, document, audio, video, archive, and spreadsheet formats in your browser.';
header('Cross-Origin-Opener-Policy: same-origin');
header('Cross-Origin-Embedder-Policy: credentialless');
require_once __DIR__ . '/../includes/header.php';

$converterGroups = [
  'Images' => [
    'Resize and re-encode images, create PDFs from selected images, or export PDF pages as images in a ZIP.',
    'JPEG · PNG · GIF · WebP · TIFF · PDF · PDF pages to ZIP',
  ],
  'Documents' => [
    'Convert supported text, source-code, markup, DOCX, PDF, and RTF documents. All accepted document types can also be packaged with adjustable ZIP compression.',
    'Text and code · HTML · RTF · DOCX · PDF · PDF pages to ZIP · ZIP compression',
  ],
  'Audio and video' => [
    'Convert audio and video in-browser where the bundled FFmpeg codecs support decoding and encoding. Unsupported audio export formats are marked unavailable in the selector.',
    'Audio upload: MP3 · WAV · FLAC · AAC · OGG · WMA · AIFF · MIDI · and more · Audio export: MP3 · WAV · FLAC · AAC · M4A · OGG · Opus · AIFF · and more · Video export availability shown in Video',
  ],
  'ZIP archives' => [
    'Bundle selected files into a ZIP archive or recompress an existing ZIP file.',
    'ZIP create · ZIP recompress',
  ],
  'Spreadsheet and data' => [
    'Move tabular data between CSV, JSON, and Excel workbooks using the first worksheet.',
    'CSV · JSON · XLS · XLSX',
  ],
];
$upcomingConverters = [
  'Office documents' => 'Convert and preserve layout across DOCX, ODT, RTF, and PDF.',
  'Vector graphics' => 'Export SVG and vector artwork to additional print-ready formats.',
  'More media formats' => 'Add animated image exports, additional codecs, and media presets.',
  'PDF workflows' => 'Combine, split, rotate, and reorder existing PDF pages.',
];
?>

<section class="bg-slate-950 text-white">
  <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
    <?php render_breadcrumbs(true); ?>
    <div class="grid items-end gap-10 lg:grid-cols-[1.1fr_.9fr]">
      <div>
        <h1 class="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">Change the format. Keep control of the file.</h1>
        <p class="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Convert common image, document, media, archive, and spreadsheet files in your browser. Preview image dimensions and output size before downloading.</p>
        <div class="mt-7 flex flex-wrap gap-3">
          <a href="#converter-workspace" class="inline-flex items-center rounded-xl bg-brand-500 px-5 py-3 font-bold text-white transition hover:bg-brand-400">Convert a file <span class="ml-2" aria-hidden="true">-&gt;</span></a>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-slate-800 bg-slate-800 sm:grid-cols-4 lg:grid-cols-2">
        <div class="bg-slate-950 p-4"><p class="text-3xl font-extrabold text-white">6</p><p class="mt-1 text-xs text-slate-400">file families</p></div>
        <div class="bg-slate-950 p-4"><p class="text-3xl font-extrabold text-orange-400">0</p><p class="mt-1 text-xs text-slate-400">file uploads</p></div>
        <div class="bg-slate-950 p-4"><p class="text-3xl font-extrabold text-brand-300">Live</p><p class="mt-1 text-xs text-slate-400">image output preview</p></div>
        <div class="bg-slate-950 p-4"><p class="text-3xl font-extrabold text-emerald-400">Local</p><p class="mt-1 text-xs text-slate-400">browser conversion</p></div>
      </div>
    </div>
  </div>
</section>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
  <div class="mb-8 grid items-start gap-8 lg:grid-cols-[.8fr_1.2fr]">
    <div><p class="text-sm font-bold uppercase tracking-[0.18em] text-brand-600">How it works</p><h2 class="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">A clear path from source to output.</h2></div>
    <p class="leading-7 text-slate-600">Choose a converter, set the output format, then tune the available quality or compression controls. For images, LightningRoot shows the updated preview and actual encoded size before you convert.</p>
  </div>
  <div class="mb-12 grid gap-4 md:grid-cols-3">
    <article class="rounded-xl border border-slate-200 bg-white p-5"><span class="text-xs font-bold uppercase tracking-wider text-brand-600">01 / Select</span><h3 class="mt-3 font-bold text-slate-900">Choose a file family</h3><p class="mt-2 text-sm leading-6 text-slate-500">Pick images, documents (including PDF), audio, video, ZIP, or spreadsheet and data files.</p></article>
    <article class="rounded-xl border border-slate-200 bg-white p-5"><span class="text-xs font-bold uppercase tracking-wider text-brand-600">02 / Adjust</span><h3 class="mt-3 font-bold text-slate-900">Set format and size</h3><p class="mt-2 text-sm leading-6 text-slate-500">Choose an output format and use the available quality, width, bitrate, or compression controls.</p></article>
    <article class="rounded-xl border border-slate-200 bg-white p-5"><span class="text-xs font-bold uppercase tracking-wider text-brand-600">03 / Convert</span><h3 class="mt-3 font-bold text-slate-900">Review and download</h3><p class="mt-2 text-sm leading-6 text-slate-500">Review image output details before conversion, then download the result to your device.</p></article>
  </div>

  <section id="converter-workspace" class="scroll-mt-24">
    <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div><p class="text-sm font-bold uppercase tracking-[0.18em] text-brand-600">Try it now</p><h2 class="mt-2 text-2xl font-extrabold text-slate-900">Convert a file</h2></div>
      <p class="text-sm text-slate-500">Files stay on this device. Some conversions can increase file size.</p>
    </div>
  <div class="mb-7 flex flex-wrap gap-2" role="tablist" aria-label="Converter type">
    <?php foreach ([
      'image' => 'Images',
      'document' => 'Documents',
      'audio' => 'Audio',
      'video' => 'Video',
      'archive' => 'ZIP',
      'data' => 'Spreadsheet / data',
    ] as $type => $label): ?>
      <button type="button" class="converter-tab rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-brand-300 hover:text-brand-700" data-type="<?= htmlspecialchars($type) ?>" role="tab" aria-selected="false"><?= htmlspecialchars($label) ?></button>
    <?php endforeach; ?>
  </div>

  <div class="mb-6 rounded-xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5">
    <h3 class="text-sm font-bold text-amber-900">Before you convert</h3>
    <p id="formatNotes" class="mt-2 text-sm leading-6 text-amber-900/80"></p>
    <p class="mt-4 border-t border-amber-200 pt-3 text-xs leading-5 text-amber-900/75">Results depend on the source and settings. Some conversions may increase file size. ZIP compression is available for document files but may not reduce already-compressed formats. PDF pages are rasterized, and document styling may not be preserved.</p>
  </div>

  <div class="min-w-0">
    <div id="fileDrop" class="cursor-pointer rounded-xl border-2 border-dashed border-brand-200 bg-brand-50/50 px-5 py-10 text-center transition hover:border-brand-400">
      <input id="fileInput" class="hidden" type="file">
      <svg class="mx-auto mb-3 h-9 w-9 text-brand-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 16V4m0 0L7 9m5-5 5 5M4 16.5v2A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5v-2"/></svg>
      <p class="font-bold text-slate-800">Drop files here or browse</p>
      <p id="acceptedFormats" class="mt-1 text-sm text-slate-500">JPG, JPEG, JPE, JFIF, PNG, GIF, WebP, BMP, TIF, TIFF, HEIC, HEIF, AVIF, ICO, CUR, EPS, PDF, SVG, AI, CDR, WMF, EMF, JXL, EXR, DNG, and RAW. Decoding depends on browser/format support.</p>
    </div>

    <div id="filePreview" class="mt-4 hidden grid gap-4">
      <article class="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div class="border-b border-slate-100 px-4 py-3">
          <p class="text-xs font-bold uppercase tracking-wider text-slate-500">Original</p>
          <p id="sourceFileName" class="mt-1 break-all font-bold text-slate-900"></p>
        </div>
        <div class="flex min-h-48 items-center justify-center bg-slate-100 p-4">
          <img id="sourcePreview" class="hidden max-h-48 max-w-full object-contain" alt="Selected file preview">
          <video id="sourceVideoPreview" class="hidden max-h-64 max-w-full" controls playsinline preload="metadata" aria-label="Original video preview"></video>
          <audio id="sourceAudioPreview" class="hidden w-full max-w-md" controls preload="metadata" aria-label="Original audio preview"></audio>
          <div id="sourceDocumentPreview" class="hidden max-h-64 w-full overflow-auto rounded-lg bg-white p-4 text-left text-sm text-slate-700"></div>
          <span id="sourceFileBadge" class="rounded-md bg-white px-4 py-3 text-sm font-bold uppercase text-slate-600 shadow-sm"></span>
        </div>
        <div class="p-4">
          <dl class="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            <div><dt class="text-xs text-slate-500">File type</dt><dd id="sourceFileType" class="mt-0.5 font-semibold text-slate-700"></dd></div>
            <div><dt class="text-xs text-slate-500">File size</dt><dd id="sourceFileSize" class="mt-0.5 font-semibold text-slate-700"></dd></div>
            <div id="sourceQualityRow" class="hidden"><dt id="sourceFileQualityLabel" class="text-xs text-slate-500">Quality</dt><dd id="sourceFileQuality" class="mt-0.5 font-semibold text-slate-700"></dd></div>
            <div id="sourceAspectRatioRow" class="hidden"><dt class="text-xs text-slate-500">Aspect ratio</dt><dd id="sourceFileAspectRatio" class="mt-0.5 font-semibold text-slate-700"></dd></div>
            <div id="sourceDurationRow" class="hidden"><dt class="text-xs text-slate-500">Duration</dt><dd id="sourceFileDuration" class="mt-0.5 font-semibold text-slate-700"></dd></div>
            <div class="col-span-2"><dt id="sourceFileDimensionsLabel" class="text-xs text-slate-500">Dimensions</dt><dd id="sourceFileDimensions" class="mt-0.5 font-semibold text-slate-700"></dd></div>
          </dl>
        </div>
      </article>
      <article id="resizePreview" class="hidden overflow-hidden rounded-xl border border-brand-200 bg-white">
        <div class="border-b border-brand-100 px-4 py-3">
          <p class="text-xs font-bold uppercase tracking-wider text-brand-700">Output preview</p>
          <p id="outputPreviewName" class="mt-1 break-all font-bold text-slate-900"></p>
        </div>
        <div class="flex min-h-48 items-center justify-center bg-slate-100 p-4">
          <img id="convertedPreview" class="max-h-48 max-w-full object-contain" alt="Converted file preview">
          <div id="convertedVideoFrame" class="hidden w-full max-w-xl overflow-hidden rounded-lg bg-black">
            <video id="convertedVideoPreview" class="block w-full object-cover" muted loop playsinline preload="metadata" aria-label="Video output preview"></video>
          </div>
          <audio id="convertedAudioPreview" class="hidden w-full max-w-md" controls preload="metadata" aria-label="Audio output preview"></audio>
          <p id="outputAudioPreviewNote" class="hidden max-w-md rounded-lg border border-brand-200 bg-white px-5 py-4 text-sm text-brand-800">Player lets you listen to the source audio. The selected output format and bitrate are applied when you convert.</p>
          <p id="outputAudioOnlyNotice" class="hidden rounded-lg border border-brand-200 bg-white px-5 py-4 text-sm font-semibold text-brand-800">Audio-only output · the video track will be removed.</p>
          <div id="outputDocumentPreview" class="hidden max-h-64 w-full overflow-auto rounded-lg bg-white p-4 text-left text-sm text-slate-700"></div>
        </div>
        <div class="p-4">
          <dl class="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            <div><dt class="text-xs text-slate-500">File type</dt><dd id="outputPreviewType" class="mt-0.5 font-semibold text-slate-700"></dd></div>
            <div><dt class="text-xs text-slate-500">File size</dt><dd id="outputPreviewSize" class="mt-0.5 font-semibold text-slate-700"></dd></div>
            <div><dt id="outputQualityLabel" class="text-xs text-slate-500">Quality</dt><dd id="outputPreviewQuality" class="mt-0.5 font-semibold text-slate-700"></dd></div>
            <div id="outputAspectRatioRow"><dt class="text-xs text-slate-500">Aspect ratio</dt><dd id="outputPreviewAspectRatio" class="mt-0.5 font-semibold text-slate-700"></dd></div>
            <div id="outputDurationRow" class="hidden"><dt class="text-xs text-slate-500">Duration</dt><dd id="outputPreviewDuration" class="mt-0.5 font-semibold text-slate-700"></dd></div>
            <div id="outputPreviewDimensionsRow" class="col-span-2"><dt id="outputPreviewDimensionsLabel" class="text-xs text-slate-500">Dimensions</dt><dd id="outputPreviewDimensions" class="mt-0.5 font-semibold text-slate-700"></dd></div>
          </dl>
        </div>
      </article>
    </div>

    <div id="outputPanel" class="mt-6 hidden rounded-lg border border-emerald-200 bg-emerald-50 p-4">
      <div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div class="min-w-0"><p class="font-bold text-emerald-900">Conversion complete</p><p id="outputDetails" class="mt-1 break-all text-sm text-emerald-800"></p></div>
        <a id="downloadLink" class="shrink-0 rounded-lg bg-emerald-700 px-4 py-2.5 text-center text-sm font-bold text-white hover:bg-emerald-800" download>Download</a>
      </div>
    </div>

    <div class="mt-8 space-y-5">
      <label class="block text-sm font-semibold text-slate-700">
        <span class="mb-2 flex flex-wrap items-center justify-between gap-2">
          <span>Convert to</span>
          <span class="flex flex-wrap items-center gap-1 text-xs font-medium text-emerald-700"><span>Export types:</span><span id="outputFormatHints" class="inline-flex flex-wrap gap-1"></span></span>
        </span>
        <select id="outputFormat" class="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"></select>
      </label>
      <div id="imageSizingControls" class="hidden grid gap-5 sm:grid-cols-2">
          <label class="block text-sm font-semibold text-slate-700">Aspect ratio
            <select id="imageAspectRatio" class="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800">
              <option value="original">Original</option>
              <option value="1:1">Square (1:1)</option>
              <option value="4:3">Landscape (4:3)</option>
              <option value="3:2">Landscape (3:2)</option>
              <option value="16:9">Widescreen (16:9)</option>
              <option value="3:4">Portrait (3:4)</option>
              <option value="2:3">Portrait (2:3)</option>
              <option value="9:16">Story (9:16)</option>
            </select>
          </label>
          <label class="block text-sm font-semibold text-slate-700">Output dimensions
            <select id="imageDimensions" class="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800" disabled>
              <option value="">Upload an image to choose dimensions</option>
            </select>
          </label>
          <p class="text-xs leading-5 text-slate-500 sm:col-span-2">Dimensions are offered for the selected aspect ratio. Changing the ratio center-crops the image; resizing never enlarges it beyond its original longest edge.</p>
        </div>
      <div id="videoSizingControls" class="hidden grid gap-5 sm:grid-cols-2">
        <label class="block text-sm font-semibold text-slate-700">Video aspect ratio
          <select id="videoAspectRatio" class="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800">
            <option value="original">Original</option>
            <option value="1:1">Square (1:1)</option>
            <option value="4:3">Landscape (4:3)</option>
            <option value="3:2">Landscape (3:2)</option>
            <option value="16:9">Widescreen (16:9)</option>
            <option value="3:4">Portrait (3:4)</option>
            <option value="2:3">Portrait (2:3)</option>
            <option value="9:16">Story (9:16)</option>
          </select>
        </label>
        <label class="block text-sm font-semibold text-slate-700">Video dimensions
          <select id="videoDimensions" class="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800" disabled>
            <option value="">Upload a video to choose dimensions</option>
          </select>
        </label>
        <p class="text-xs leading-5 text-slate-500 sm:col-span-2">Changing the aspect ratio center-crops the frame. Available sizes are based on your source video and will not upscale it. The output bitrate and estimated file size also adjust for the selected dimensions.</p>
      </div>
      <div id="documentControls" class="hidden rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h3 class="text-sm font-bold text-slate-800">Document layout</h3>
        <div class="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label class="block text-sm font-semibold text-slate-700">Font
            <select id="documentFont" class="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm">
              <option value="Arial">Arial</option><option value="Calibri" selected>Calibri</option><option value="Georgia">Georgia</option><option value="Times New Roman">Times New Roman</option>
            </select>
          </label>
          <label class="block text-sm font-semibold text-slate-700">Font size
            <select id="documentFontSize" class="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm">
              <option value="10">10 pt</option><option value="11">11 pt</option><option value="12" selected>12 pt</option><option value="14">14 pt</option>
            </select>
          </label>
          <label class="block text-sm font-semibold text-slate-700">Page size
            <select id="documentPageSize" class="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm">
              <option value="letter" selected>US Letter</option><option value="a4">A4</option>
            </select>
          </label>
          <label class="block text-sm font-semibold text-slate-700">Margins
            <select id="documentMargins" class="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm">
              <option value="normal" selected>Normal</option><option value="narrow">Narrow</option><option value="wide">Wide</option>
            </select>
          </label>
          <label class="block text-sm font-semibold text-slate-700 sm:col-span-2">Headings in generated DOCX
            <select id="documentHeadings" class="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm">
              <option value="plain" selected>Keep lines as paragraphs</option><option value="markdown">Detect Markdown headings (# Heading)</option>
            </select>
          </label>
          <label class="block text-sm font-semibold text-slate-700 sm:col-span-2">DOCX file-size quality: <span id="documentCompressionValue" class="font-bold">6</span>/9
            <input id="documentCompression" class="mt-3 block w-full accent-brand-600" type="range" min="1" max="9" step="1" value="6">
            <span class="mt-1 block text-xs font-normal text-slate-500">Higher compression can make DOCX files smaller; it does not change the document’s visual quality.</span>
          </label>
        </div>
        <p class="mt-3 text-xs leading-5 text-slate-500">Layout controls apply when exporting to DOCX. Source formatting is simplified to text; the preview updates before conversion.</p>
      </div>
      <label id="qualityControl" class="hidden text-sm font-semibold text-slate-700"><span id="qualityLabel">Image quality if re-encoded</span>
          <input id="qualityRange" class="mt-3 block w-full accent-brand-600" type="range" min="40" max="100" value="82">
          <span id="qualityValue" class="mt-1 block text-xs font-medium text-slate-500">82%</span>
        </label>
      <label id="resizeControl" class="hidden text-sm font-semibold text-slate-700"><span id="resizeLabel">Maximum width (pixels)</span>
          <input id="resizeWidth" class="mt-2 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-normal" type="number" min="160" max="8192" step="1" value="1920">
        </label>
      <label id="compressionControl" class="hidden text-sm font-semibold text-slate-700">Compression level
          <select id="compressionLevel" class="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800"><option value="1">Fast</option><option value="5" selected>Balanced</option><option value="9">Smallest file</option></select>
        </label>
      <p id="pdfQualityHint" class="hidden text-xs leading-5 text-slate-500">For PDF inputs, quality and maximum page width apply to Compressed PDF and PDF page exports; PNG page exports are lossless. Compression level applies when the selected output is a ZIP archive.</p>
      <label id="bitrateControl" class="hidden block text-sm font-semibold text-slate-700"><span id="mediaBitrateLabel">Media bitrate</span>
        <select id="mediaBitrate" class="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800"><option value="96">96 kbps / compact</option><option value="160" selected>160 kbps / balanced</option><option value="256">256 kbps / high quality</option></select>
      </label>
      <label id="videoAudioBitrateControl" class="hidden block text-sm font-semibold text-slate-700">Video audio bitrate
        <select id="videoAudioBitrate" class="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800"><option value="64">64 kbps / smallest</option><option value="80">80 kbps</option><option value="96">96 kbps / compact</option><option value="112">112 kbps</option><option value="128" selected>128 kbps / balanced</option><option value="160">160 kbps</option><option value="192">192 kbps / high quality</option><option value="224">224 kbps</option><option value="256">256 kbps</option><option value="320">320 kbps / maximum</option><option value="384">384 kbps</option><option value="512">512 kbps</option></select>
      </label>
      <div class="flex flex-wrap items-center gap-4">
        <button id="convertBtn" type="button" class="rounded-lg bg-brand-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50" disabled>Convert file</button>
      </div>
    </div>
  </div>
</section>
</section>

<section class="border-y border-slate-100 bg-slate-50">
  <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
    <div class="mb-8 max-w-3xl">
      <p class="text-sm font-bold uppercase tracking-[0.18em] text-brand-600">Available converters</p>
      <h2 class="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">Useful file paths, ready now.</h2>
      <p class="mt-3 leading-7 text-slate-600">Each converter handles a focused set of formats. Choose a family above to see its accepted files and output options.</p>
    </div>
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <?php foreach ($converterGroups as $group => [$description, $formats]): ?>
        <article class="flex min-h-48 flex-col rounded-xl border border-slate-200 bg-white p-5">
          <div class="flex items-center justify-between gap-3"><h3 class="font-bold text-slate-900"><?= htmlspecialchars($group) ?></h3><span class="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">Live</span></div>
          <p class="mt-3 text-sm leading-6 text-slate-600"><?= htmlspecialchars($description) ?></p>
          <p class="mt-auto pt-4 text-xs font-semibold leading-5 text-slate-500"><?= htmlspecialchars($formats) ?></p>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
  <div class="mb-8 flex flex-wrap items-end justify-between gap-5">
    <div><p class="text-sm font-bold uppercase tracking-[0.18em] text-brand-600">Coming next</p><h2 class="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">More file workflows are on the way.</h2></div>
    <span class="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">Planned features</span>
  </div>
  <p class="mb-8 max-w-3xl leading-7 text-slate-600">The live tools cover common everyday conversions. Upcoming additions will focus on preserving richer document layouts, expanding media choices, and giving you more control over PDF pages.</p>
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <?php foreach ($upcomingConverters as $name => $description): ?>
      <article class="min-h-40 rounded-xl border border-slate-200 bg-white p-5"><span class="text-xs font-bold uppercase tracking-wider text-amber-700">Planned</span><h3 class="mt-3 font-bold text-slate-900"><?= htmlspecialchars($name) ?></h3><p class="mt-2 text-sm leading-6 text-slate-500"><?= htmlspecialchars($description) ?></p></article>
    <?php endforeach; ?>
  </div>
</section>

<section class="border-y border-slate-100 bg-slate-50">
  <div class="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
    <div class="mb-8 text-center"><p class="text-sm font-bold uppercase tracking-[0.18em] text-brand-600">Good to know</p><h2 class="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">File conversion, explained.</h2></div>
    <div class="divide-y divide-slate-200 border-y border-slate-200">
      <details class="group py-5" open><summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900">Are my files uploaded?<span class="text-brand-600 transition group-open:rotate-45 text-xl">+</span></summary><p class="mt-3 text-sm leading-6 text-slate-600">No. Files are processed locally in your browser. Conversion libraries are downloaded from public CDNs when needed; your selected file is not sent to LightningRoot's server.</p></details>
      <details class="group py-5"><summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900">Will every conversion make the file smaller?<span class="text-brand-600 transition group-open:rotate-45 text-xl">+</span></summary><p class="mt-3 text-sm leading-6 text-slate-600">No. Results depend on the source format and chosen settings. The image preview shows the actual encoded output size before you convert, and the download summary reports whether the result is larger or smaller.</p></details>
      <details class="group py-5"><summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900">Does PDF conversion preserve selectable text?<span class="text-brand-600 transition group-open:rotate-45 text-xl">+</span></summary><p class="mt-3 text-sm leading-6 text-slate-600">PDF compression and page export render each page as an image, so text, links, and vector content are not preserved. Image-to-PDF creates image-based pages.</p></details>
      <details class="group py-5"><summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900">What happens to document formatting?<span class="text-brand-600 transition group-open:rotate-45 text-xl">+</span></summary><p class="mt-3 text-sm leading-6 text-slate-600">DOCX exports can set font, font size, page size, margins, Markdown heading detection, and compression. Source page layout, tables, images, and advanced styles are simplified when converting to text and may not carry across formats.</p></details>
      <details class="group py-5"><summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900">Are there browser conversion limits?<span class="text-brand-600 transition group-open:rotate-45 text-xl">+</span></summary><p class="mt-3 text-sm leading-6 text-slate-600">Audio and video use a large FFmpeg browser engine on first use and may need considerable memory. Media files are limited to 200 MB; PDF files are limited to 100 MB and 100 pages.</p></details>
    </div>
  </div>
</section>

<div id="converterStatus" class="fixed bottom-4 left-4 right-4 z-50 hidden items-center gap-3 rounded-xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700 shadow-xl sm:left-auto sm:w-96" role="status" aria-live="polite">
  <svg class="h-4 w-4 shrink-0 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" class="opacity-25" stroke="currentColor" stroke-width="3"></circle><path d="M21 12a9 9 0 0 1-9 9" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path></svg>
  <span id="converterStatusText"></span>
</div>

<script src="<?= htmlspecialchars(public_url('assets/js/converter.js')) ?>"></script>
<?php require_once __DIR__ . '/../includes/footer.php'; ?>