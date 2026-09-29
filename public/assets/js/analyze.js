const GAUGE_DEFS = [
  { id:'histogram', title:'Histogram' },
  { id:'rgbhist', title:'RGB Histogram' },
  { id:'lumahist', title:'Luma Histogram' },
  { id:'waveform', title:'Waveform Monitor' },
  { id:'parade', title:'RGB Parade' },
  { id:'vectorscope', title:'Vectorscope' },
  { id:'falsecolor', title:'False Color' },
  { id:'zebra', title:'Zebra Pattern' },
  { id:'clipping', title:'Clipping Detection' },
  { id:'peaking', title:'Focus Peaking' },
  { id:'sharpness', title:'Sharpness (Laplacian)' },
  { id:'blur', title:'Blur Detection' },
  { id:'noise', title:'Noise Map (High-Freq)' },
  { id:'snr', title:'SNR' },
  { id:'contrast', title:'Contrast' },
  { id:'dynrange', title:'Dynamic Range' },
  { id:'colordist', title:'Color Distribution' },
  { id:'cumhist', title:'Cumulative Histogram' },
  { id:'fft', title:'FFT / Frequency Spectrum' },
  { id:'edges', title:'Edge Detection' },
  { id:'saliency', title:'Gradient / Saliency Map' },
];

let currentFile = null;
let currentImg = null;
let lastSummary = null;
let isSavedAnalysis = false;

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const previewWrap = document.getElementById('previewWrap');
const previewImg = document.getElementById('previewImg');
const imgMeta = document.getElementById('imgMeta');
const gaugesGrid = document.getElementById('gaugesGrid');
const summaryWrap = document.getElementById('summaryWrap');
const downloadBtn = document.getElementById('downloadBtn');
const reportMsg = document.getElementById('reportMsg');
const processStatus = document.getElementById('processStatus');
const processStatusText = document.getElementById('processStatusText');
const processStatusSpinner = processStatus.querySelector('svg');
const saveBtn = document.getElementById('saveBtn');
let processStatusTimer = null;

function setProcessStatus(message, visible = true) {
  clearTimeout(processStatusTimer);
  processStatusText.textContent = message;
  processStatus.classList.toggle('hidden', !visible);
  processStatus.classList.toggle('flex', visible);
  processStatus.classList.remove('border-emerald-100', 'bg-emerald-50', 'text-emerald-700', 'border-red-100', 'bg-red-50', 'text-red-700');
  processStatus.classList.add('border-brand-100', 'bg-brand-50', 'text-brand-700');
  processStatusSpinner.classList.toggle('hidden', !visible);
  if (visible) {
    processStatusTimer = setTimeout(() => {
      if (processStatusSpinner.classList.contains('hidden')) {
        processStatus.classList.add('hidden');
        processStatus.classList.remove('flex');
      }
    }, 3500);
  }
}

dropZone.addEventListener('click', () => fileInput.click());
dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('border-brand-500'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('border-brand-500'));
dropZone.addEventListener('drop', e => {
  e.preventDefault(); dropZone.classList.remove('border-brand-500');
  if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
});
fileInput.addEventListener('change', e => { if (e.target.files.length) handleFile(e.target.files[0]); });

function handleFile(file) {
  if (!file.type.startsWith('image/')) { alert('Please choose an image file.'); return; }
  setProcessStatus('Reading your image...');
  isSavedAnalysis = false;
  saveBtn.classList.remove('hidden');
  saveBtn.disabled = false;
  saveBtn.textContent = 'Save to my account';
  document.getElementById('saveMsg').textContent = '';
  currentFile = file;
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    currentImg = img;
    previewImg.src = url;
    imgMeta.textContent = `${file.name} — ${img.width}×${img.height}px — ${(file.size/1024).toFixed(1)} KB`;
    previewWrap.classList.remove('hidden');
    buildGaugeGrid();
    runAllGauges();
  };
  img.src = url;
}

async function openSavedAnalysis(data) {
  setProcessStatus('Loading saved analysis...');
  isSavedAnalysis = true;
  saveBtn.classList.remove('hidden');
  saveBtn.disabled = true;
  saveBtn.textContent = 'Saved';
  document.getElementById('saveMsg').textContent = 'This image is already saved to your account.';
  document.getElementById('saveMsg').className = 'text-sm mt-2 text-slate-500';
  currentFile = {
    name: data.original_name,
    size: data.filesize,
    type: data.mime_type || 'image/jpeg'
  };

  const img = new Image();
  img.onload = async () => {
    currentImg = img;
    previewImg.src = data.image_url;
    imgMeta.textContent = `${data.original_name} — ${data.width}×${data.height}px — ${(data.filesize / 1024).toFixed(1)} KB`;
    previewWrap.classList.remove('hidden');
    buildGaugeGrid();
    await runAllGauges();
    document.getElementById('image-upload').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  img.onerror = () => {
    setProcessStatus('Could not load this saved image.');
    processStatus.classList.remove('border-brand-100', 'bg-brand-50', 'text-brand-700');
    processStatus.classList.add('border-red-100', 'bg-red-50', 'text-red-700');
  };
  img.src = data.image_url;
}

document.querySelectorAll('.saved-analysis-card').forEach(card => {
  card.addEventListener('click', () => {
    try {
      openSavedAnalysis(JSON.parse(card.dataset.savedAnalysis));
    } catch (error) {
      console.error('Could not open saved analysis:', error);
      setProcessStatus('Could not open this saved analysis.');
    }
  });
});

function buildGaugeGrid() {
  gaugesGrid.innerHTML = '';
  GAUGE_DEFS.forEach(g => {
    const card = document.createElement('div');
    card.className = 'rounded-xl border border-slate-100 p-4 bg-white shadow-sm';
    card.innerHTML = `<h3 class="font-semibold text-slate-800 mb-2 text-sm">${g.title}</h3>
      <canvas id="gauge_${g.id}" width="360" height="200" class="gauge-canvas w-full"></canvas>
      <p id="meta_${g.id}" class="text-xs text-slate-500 mt-2"></p>`;
    gaugesGrid.appendChild(card);
  });
  gaugesGrid.classList.remove('hidden');
}

document.getElementById('runBtn')?.addEventListener('click', runAllGauges);

async function runAllGauges() {
  if (!currentImg) return;
  setProcessStatus('Analyzing image with 21 gauges...');
  await new Promise(requestAnimationFrame);
  window.trackLightningEvent?.('gauge_run');
  // Full-res data for pixel-accurate gauges
  const fullCanvas = document.createElement('canvas');
  fullCanvas.width = currentImg.width; fullCanvas.height = currentImg.height;
  fullCanvas.getContext('2d').drawImage(currentImg, 0, 0);
  const fullData = fullCanvas.getContext('2d').getImageData(0, 0, currentImg.width, currentImg.height);

  // Downscaled data for compute-heavy gauges (sobel, laplacian, fft, saliency)
  const small = Gauges.downscale(currentImg, 400);

  const hist = Gauges.drawHistogram(document.getElementById('gauge_histogram'), fullData, 'combined');
  Gauges.drawHistogram(document.getElementById('gauge_rgbhist'), fullData, 'rgb');
  Gauges.drawHistogram(document.getElementById('gauge_lumahist'), fullData, 'luma');
  Gauges.drawWaveform(document.getElementById('gauge_waveform'), fullData, 'luma');
  Gauges.drawWaveform(document.getElementById('gauge_parade'), fullData, 'parade');
  Gauges.drawVectorscope(document.getElementById('gauge_vectorscope'), small);
  Gauges.drawFalseColor(fitCanvas('falsecolor'), small);
  Gauges.drawZebra(fitCanvas('zebra'), small, 95);
  const clip = Gauges.drawClipping(fitCanvas('clipping'), small);
  document.getElementById('meta_clipping').textContent =
    `Highlights clipped: ${clip.highlightsClippedPct.toFixed(2)}% · Shadows clipped: ${clip.shadowsClippedPct.toFixed(2)}%`;
  Gauges.drawFocusPeaking(fitCanvas('peaking'), small, 60);

  const sharpness = Gauges.computeSharpness(small);
  document.getElementById('meta_sharpness').textContent = `Laplacian variance: ${sharpness.toFixed(1)} (higher = sharper)`;
  drawBarGauge(document.getElementById('gauge_sharpness'), sharpness, 500, 'Sharpness');

  const blur = Gauges.computeBlur(sharpness);
  document.getElementById('meta_blur').textContent = blur.isBlurry ? 'Likely blurry' : 'Looks sharp';
  drawStatusGauge(document.getElementById('gauge_blur'), !blur.isBlurry, blur.isBlurry ? 'BLURRY' : 'SHARP');

  const ns = Gauges.computeNoiseAndSNR(small);
  document.getElementById('meta_noise').textContent = `Noise RMS: ${ns.noiseRMS.toFixed(2)}`;
  drawBarGauge(document.getElementById('gauge_noise'), ns.noiseRMS, 30, 'Noise RMS', true);
  document.getElementById('meta_snr').textContent = `${ns.snrDb.toFixed(1)} dB`;
  drawBarGauge(document.getElementById('gauge_snr'), ns.snrDb, 40, 'SNR (dB)');

  const contrast = Gauges.computeContrast(small);
  document.getElementById('meta_contrast').textContent = `Std dev: ${contrast.stdDev.toFixed(1)}`;
  drawBarGauge(document.getElementById('gauge_contrast'), contrast.stdDev, 80, 'Contrast');

  const dr = Gauges.computeDynamicRange(small);
  document.getElementById('meta_dynrange').textContent = `~${dr.stops.toFixed(2)} stops (min ${dr.min}, max ${dr.max})`;
  drawBarGauge(document.getElementById('gauge_dynrange'), dr.stops, 10, 'Stops');

  Gauges.drawColorDistribution(document.getElementById('gauge_colordist'), hist);
  Gauges.drawCumulativeHistogram(document.getElementById('gauge_cumhist'), hist.binsL);
  Gauges.drawFrequencySpectrum(fitCanvas('fft'), small);
  Gauges.drawEdges(fitCanvas('edges'), small, false);
  Gauges.drawSaliency(fitCanvas('saliency'), small);

  // Summary cards
  document.getElementById('sSharp').textContent = sharpness.toFixed(0);
  document.getElementById('sNoise').textContent = ns.noiseRMS.toFixed(2);
  document.getElementById('sSnr').textContent = ns.snrDb.toFixed(1) + ' dB';
  document.getElementById('sDr').textContent = dr.stops.toFixed(2) + ' stops';
  summaryWrap.classList.remove('hidden');

  lastSummary = {
    sharpness_variance: sharpness,
    is_blurry: blur.isBlurry,
    noise_rms: ns.noiseRMS,
    snr_db: ns.snrDb,
    contrast_stddev: contrast.stdDev,
    dynamic_range_stops: dr.stops,
    highlights_clipped_pct: clip.highlightsClippedPct,
    shadows_clipped_pct: clip.shadowsClippedPct,
    image_width: currentImg.width,
    image_height: currentImg.height
  };
  downloadBtn.classList.remove('hidden');
  setProcessStatus('Analysis complete. Your results are ready.');
  processStatus.classList.remove('border-brand-100', 'bg-brand-50', 'text-brand-700');
  processStatus.classList.add('border-emerald-100', 'bg-emerald-50', 'text-emerald-700');
  processStatus.querySelector('svg').classList.add('hidden');
}

function fitCanvas(id) {
  return document.getElementById('gauge_' + id);
}

function drawBarGauge(canvas, value, maxValue, label, invert=false) {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0b1220'; ctx.fillRect(0,0,canvas.width,canvas.height);
  const pct = Math.max(0, Math.min(1, value / maxValue));
  const barW = canvas.width - 40;
  ctx.strokeStyle = '#334155'; ctx.strokeRect(20, canvas.height/2 - 15, barW, 30);
  const color = invert ? (pct < 0.4 ? '#4dff88' : pct < 0.7 ? '#ffd24d' : '#ff4d4d')
                       : (pct > 0.6 ? '#4dff88' : pct > 0.3 ? '#ffd24d' : '#ff4d4d');
  ctx.fillStyle = color;
  ctx.fillRect(20, canvas.height/2 - 15, barW*pct, 30);
  ctx.fillStyle = '#e2e8f0'; ctx.font = '13px Inter, sans-serif'; ctx.textAlign='center';
  ctx.fillText(`${label}: ${value.toFixed(1)}`, canvas.width/2, canvas.height/2 + 45);
}

function drawStatusGauge(canvas, ok, text) {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0b1220'; ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = ok ? '#4dff88' : '#ff4d4d';
  ctx.beginPath(); ctx.arc(canvas.width/2, canvas.height/2 - 10, 40, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#0b1220'; ctx.font = 'bold 14px Inter, sans-serif'; ctx.textAlign='center';
  ctx.fillText(text, canvas.width/2, canvas.height/2 - 5);
}

downloadBtn.addEventListener('click', async () => {
  if (!currentFile || !lastSummary) {
    reportMsg.textContent = 'Choose an image and wait for the gauges to finish first.';
    reportMsg.className = 'text-sm mt-2 text-amber-600 font-medium';
    return;
  }
  window.trackLightningEvent?.('report_download');

  if (!window.jspdf || !window.jspdf.jsPDF) {
    reportMsg.textContent = 'The PDF library could not be loaded. Check your internet connection and try again.';
    reportMsg.className = 'text-sm mt-2 text-red-600 font-medium';
    return;
  }

  reportMsg.textContent = '';
  setProcessStatus('Generating your PDF report...');
  processStatus.classList.remove('border-emerald-100', 'bg-emerald-50', 'text-emerald-700');
  processStatus.classList.add('border-brand-100', 'bg-brand-50', 'text-brand-700');
  processStatus.querySelector('svg').classList.remove('hidden');
  downloadBtn.disabled = true;
  downloadBtn.textContent = 'Preparing PDF...';
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 14;
    const contentWidth = pageWidth - margin * 2;
    const generatedAt = new Date().toLocaleString();

    doc.setTextColor(23, 72, 214);
    doc.setFontSize(20);
    doc.text('LightningRoot Image Analysis Report', margin, 20);
    doc.setTextColor(80, 90, 105);
    doc.setFontSize(9);
    doc.text(`Generated: ${generatedAt}`, margin, 27);
    doc.text(`File: ${currentFile.name}`, margin, 33);
    doc.text(`Type: ${currentFile.type || 'unknown'} | Size: ${(currentFile.size / 1024).toFixed(1)} KB`, margin, 39);
    doc.text(`Dimensions: ${currentImg.width} x ${currentImg.height} pixels`, margin, 45);

    const imageCanvas = document.createElement('canvas');
    imageCanvas.width = currentImg.width;
    imageCanvas.height = currentImg.height;
    imageCanvas.getContext('2d').drawImage(currentImg, 0, 0);
    const imageData = imageCanvas.toDataURL('image/jpeg', 0.92);
    const imageRatio = currentImg.height / currentImg.width;
    const imageWidth = Math.min(contentWidth, 180);
    const imageHeight = Math.min(imageWidth * imageRatio, 105);
    doc.addImage(imageData, 'JPEG', margin, 52, imageWidth, imageHeight, undefined, 'FAST');

    let y = 52 + imageHeight + 14;
    doc.setTextColor(23, 72, 214);
    doc.setFontSize(14);
    doc.text('Measurements', margin, y);
    y += 8;
    doc.setTextColor(40, 45, 55);
    doc.setFontSize(10);
    Object.entries(lastSummary).forEach(([key, value]) => {
      const displayValue = typeof value === 'number' ? value.toFixed(3) : String(value);
      doc.text(`${key.replaceAll('_', ' ')}: ${displayValue}`, margin, y);
      y += 5;
      if (y > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
    });

    GAUGE_DEFS.forEach((gauge, index) => {
      if (index % 2 === 0) {
        doc.addPage();
        doc.setTextColor(23, 72, 214);
        doc.setFontSize(14);
        doc.text('Gauge Visualizations', margin, 18);
      }
      const canvas = document.getElementById(`gauge_${gauge.id}`);
      const meta = document.getElementById(`meta_${gauge.id}`)?.textContent || '';
      const rowY = index % 2 === 0 ? 26 : 139;
      const canvasWidth = contentWidth;
      const canvasHeight = canvasWidth * (canvas.height / canvas.width);
      doc.setTextColor(40, 45, 55);
      doc.setFontSize(11);
      doc.text(gauge.title, margin, rowY);
      doc.setFontSize(8);
      doc.setTextColor(90, 95, 105);
      doc.text(meta, margin, rowY + 5);
      doc.addImage(canvas.toDataURL('image/png'), 'PNG', margin, rowY + 8, canvasWidth, Math.min(canvasHeight, 92), undefined, 'FAST');
    });

    const baseName = currentFile.name.replace(/\.[^/.]+$/, '').replace(/[^a-z0-9_-]+/gi, '-');
    doc.save(`${baseName || 'image'}-analysis-report.pdf`);
    setProcessStatus('PDF report downloaded.');
    processStatus.classList.remove('border-brand-100', 'bg-brand-50', 'text-brand-700');
    processStatus.classList.add('border-emerald-100', 'bg-emerald-50', 'text-emerald-700');
    processStatus.querySelector('svg').classList.add('hidden');
  } catch (error) {
    console.error('Could not create PDF report:', error);
    reportMsg.textContent = `PDF export failed: ${error.message || 'Please try again.'}`;
    reportMsg.className = 'text-sm mt-2 text-red-600 font-medium';
    setProcessStatus('PDF export failed. Please try again.');
    processStatus.classList.remove('border-brand-100', 'bg-brand-50', 'text-brand-700');
    processStatus.classList.add('border-red-100', 'bg-red-50', 'text-red-700');
    processStatus.querySelector('svg').classList.add('hidden');
  } finally {
    downloadBtn.disabled = false;
    downloadBtn.textContent = 'Download PDF report';
  }
});

document.getElementById('saveBtn').addEventListener('click', async () => {
  const msg = document.getElementById('saveMsg');
  if (isSavedAnalysis) {
    msg.textContent = 'Saved analyses cannot be saved again.';
    msg.className = 'text-sm mt-2 text-slate-500';
    return;
  }
  if (!currentFile) {
    msg.textContent = 'Choose an image before saving.';
    msg.className = 'text-sm mt-2 text-amber-600 font-medium';
    return;
  }
  if (!lastSummary) await runAllGauges();
  msg.textContent = 'Saving…'; msg.className = 'text-sm mt-2 text-slate-500';
  setProcessStatus('Saving image and analysis to your account...');
  processStatus.classList.remove('border-emerald-100', 'bg-emerald-50', 'text-emerald-700');
  processStatus.classList.add('border-brand-100', 'bg-brand-50', 'text-brand-700');
  processStatus.querySelector('svg').classList.remove('hidden');
  saveBtn.disabled = true;
  saveBtn.textContent = 'Saving...';
  const fd = new FormData();
  fd.append('image', currentFile);
  fd.append('gauge_data', JSON.stringify(lastSummary));
  try {
    const res = await fetch(window.lightningRootUploadUrl || 'api/upload.php', { method: 'POST', body: fd, credentials: 'same-origin' });
    const responseText = await res.text();
    let json;

    try {
      json = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Save request returned a non-JSON response:', {
        status: res.status,
        statusText: res.statusText,
        body: responseText
      });
      throw new Error(`Server returned HTTP ${res.status} with an invalid response.`);
    }

    if (!res.ok) {
      console.error('Save request failed:', { status: res.status, response: json });
      const requestId = json.request_id ? ` (Request ID: ${json.request_id})` : '';
      if (res.status === 401) {
        msg.textContent = '';
        msg.append(document.createTextNode(json.message || 'Please log in to save results.'));
        if (window.lightningRootLoginUrl) {
          const loginLink = document.createElement('a');
          loginLink.className = 'font-semibold text-brand-600 underline ml-1';
          loginLink.href = window.lightningRootLoginUrl;
          loginLink.textContent = 'Log in';
          msg.append(loginLink);
        }
        msg.className = 'text-sm mt-2 text-red-600 font-medium';
        return;
      }
      throw new Error((json.message || `Server returned HTTP ${res.status}`) + requestId);
    }

    if (json.success) {
      isSavedAnalysis = true;
      msg.textContent = 'Saved to your account ✓';
      msg.className = 'text-sm mt-2 text-emerald-600 font-medium';
      setProcessStatus('Saved successfully to your account.');
      processStatus.classList.remove('border-brand-100', 'bg-brand-50', 'text-brand-700');
      processStatus.classList.add('border-emerald-100', 'bg-emerald-50', 'text-emerald-700');
      processStatus.querySelector('svg').classList.add('hidden');
    } else {
      console.error('Save request was rejected:', json);
      msg.textContent = json.message || 'Please log in to save results.';
      msg.className = 'text-sm mt-2 text-red-600 font-medium';
    }
  } catch (e) {
    console.error('Save request error:', e);
    msg.textContent = `Save failed: ${e.message}`;
    msg.className = 'text-sm mt-2 text-red-600 font-medium';
    setProcessStatus('Save failed. Please try again.');
    processStatus.classList.remove('border-brand-100', 'bg-brand-50', 'text-brand-700');
    processStatus.classList.add('border-red-100', 'bg-red-50', 'text-red-700');
    processStatus.querySelector('svg').classList.add('hidden');
  } finally {
    saveBtn.disabled = isSavedAnalysis;
    saveBtn.textContent = isSavedAnalysis ? 'Saved' : 'Save to my account';
  }
});
