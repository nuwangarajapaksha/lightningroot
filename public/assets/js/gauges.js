/**
 * LightningRoot Gauges Engine
 * All analysis runs client-side on canvas ImageData — no image data leaves the browser.
 */
const Gauges = (() => {

  // ---------- helpers ----------
  function toGrayscale(data) {
    const n = data.length / 4;
    const gray = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const o = i * 4;
      gray[i] = 0.2126 * data[o] + 0.7152 * data[o + 1] + 0.0722 * data[o + 2];
    }
    return gray;
  }

  function downscale(img, maxDim) {
    const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
    const w = Math.max(1, Math.round(img.width * scale));
    const h = Math.max(1, Math.round(img.height * scale));
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    c.getContext('2d').drawImage(img, 0, 0, w, h);
    return c.getContext('2d').getImageData(0, 0, w, h);
  }

  function clearCanvas(canvas, bg = '#0b1220') {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return ctx;
  }

  function rgbToYCbCr(r, g, b) {
    const y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const cb = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b;
    const cr = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b;
    return [y, cb, cr];
  }

  function sobel(gray, w, h) {
    const gx = [-1,0,1,-2,0,2,-1,0,1];
    const gy = [-1,-2,-1,0,0,0,1,2,1];
    const mag = new Float32Array(w * h);
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        let sx = 0, sy = 0, k = 0;
        for (let j = -1; j <= 1; j++) {
          for (let i = -1; i <= 1; i++) {
            const v = gray[(y + j) * w + (x + i)];
            sx += v * gx[k]; sy += v * gy[k]; k++;
          }
        }
        mag[y * w + x] = Math.sqrt(sx * sx + sy * sy);
      }
    }
    return mag;
  }

  function laplacianVariance(gray, w, h) {
    const k = [0,1,0,1,-4,1,0,1,0];
    let sum = 0, sumSq = 0, count = 0;
    const lap = new Float32Array(w * h);
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        let v = 0, idx = 0;
        for (let j = -1; j <= 1; j++)
          for (let i = -1; i <= 1; i++) { v += gray[(y+j)*w+(x+i)] * k[idx]; idx++; }
        lap[y*w+x] = v;
        sum += v; sumSq += v*v; count++;
      }
    }
    const mean = sum / count;
    const variance = sumSq / count - mean * mean;
    return { variance, lap };
  }

  function boxBlur(gray, w, h, radius) {
    const out = new Float32Array(w * h);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let sum = 0, cnt = 0;
        for (let j = -radius; j <= radius; j++) {
          const yy = y + j; if (yy < 0 || yy >= h) continue;
          for (let i = -radius; i <= radius; i++) {
            const xx = x + i; if (xx < 0 || xx >= w) continue;
            sum += gray[yy*w+xx]; cnt++;
          }
        }
        out[y*w+x] = sum / cnt;
      }
    }
    return out;
  }

  function heatColor(v) { // v in [0,1] -> blue..green..yellow..red
    const stops = [[0,0,80],[0,120,255],[0,220,150],[240,230,20],[255,60,20]];
    const pos = v * (stops.length - 1);
    const i = Math.min(stops.length - 2, Math.floor(pos));
    const f = pos - i;
    const a = stops[i], b = stops[i+1];
    return [a[0]+(b[0]-a[0])*f, a[1]+(b[1]-a[1])*f, a[2]+(b[2]-a[2])*f];
  }

  // ---------- 1-3: Histograms ----------
  function drawHistogram(canvas, imgData, mode) { // mode: 'combined' | 'rgb' | 'luma'
    const ctx = clearCanvas(canvas);
    const { data } = imgData;
    const binsR = new Uint32Array(256), binsG = new Uint32Array(256), binsB = new Uint32Array(256), binsL = new Uint32Array(256);
    for (let i = 0; i < data.length; i += 4) {
      binsR[data[i]]++; binsG[data[i+1]]++; binsB[data[i+2]]++;
      binsL[Math.round(0.2126*data[i]+0.7152*data[i+1]+0.0722*data[i+2])]++;
    }
    const w = canvas.width, h = canvas.height;
    const draw = (bins, color) => {
      const max = Math.max(...bins);
      ctx.strokeStyle = color; ctx.fillStyle = color + '55';
      ctx.beginPath(); ctx.moveTo(0, h);
      for (let i = 0; i < 256; i++) {
        const x = (i/255) * w, y = h - (bins[i]/max) * h;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h); ctx.closePath(); ctx.fill(); ctx.stroke();
    };
    if (mode === 'luma') draw(binsL, '#e2e8f0');
    else if (mode === 'rgb') { draw(binsR,'#ff4d4d'); draw(binsG,'#4dff88'); draw(binsB,'#4d9dff'); }
    else draw(binsL, '#3480ff');
    return { binsR, binsG, binsB, binsL };
  }

  // ---------- 4-8: Waveform / Parade ----------
  function drawWaveform(canvas, imgData, mode) { // mode: 'luma' | 'rgb' | 'parade'
    const ctx = clearCanvas(canvas);
    const { data, width, height } = imgData;
    const cw = canvas.width, ch = canvas.height;
    const plot = (getVal, color, xOffset, xScale) => {
      ctx.fillStyle = color;
      const step = Math.max(1, Math.floor(width / cw));
      for (let x = 0; x < width; x += step) {
        for (let y = 0; y < height; y += Math.max(1, Math.floor(height/200))) {
          const o = (y*width+x)*4;
          const val = getVal(data[o], data[o+1], data[o+2]);
          const px = xOffset + (x/width) * xScale;
          const py = ch - (val/255) * ch;
          ctx.fillRect(px, py, 1, 1);
        }
      }
    };
    ctx.globalAlpha = 0.65;
    if (mode === 'luma') {
      plot((r,g,b)=>0.2126*r+0.7152*g+0.0722*b, '#9fd3ff', 0, cw);
    } else if (mode === 'rgb') {
      plot((r)=>r,'rgba(255,80,80,0.9)',0,cw);
      plot((r,g)=>g,'rgba(80,255,140,0.9)',0,cw);
      plot((r,g,b)=>b,'rgba(80,160,255,0.9)',0,cw);
    } else if (mode === 'parade') {
      const third = cw/3;
      plot((r)=>r,'#ff5050',0,third);
      plot((r,g)=>g,'#50ff8c',third,third);
      plot((r,g,b)=>b,'#50a0ff',third*2,third);
      ctx.globalAlpha=1; ctx.strokeStyle='#334155';
      ctx.beginPath(); ctx.moveTo(third,0); ctx.lineTo(third,ch);
      ctx.moveTo(third*2,0); ctx.lineTo(third*2,ch); ctx.stroke();
    } else if (mode === 'yc') {
      plot((r,g,b)=>{const [y]=rgbToYCbCr(r,g,b); return y;}, '#e2e8f0', 0, cw);
    }
    ctx.globalAlpha = 1;
  }

  // ---------- 11-12: Vectorscope ----------
  function drawVectorscope(canvas, imgData) {
    const ctx = clearCanvas(canvas);
    const { data, width, height } = imgData;
    const cx = canvas.width/2, cy = canvas.height/2;
    const scale = Math.min(cx,cy) / 128;
    ctx.strokeStyle = '#1e293b';
    ctx.beginPath(); ctx.arc(cx,cy,Math.min(cx,cy)*0.98,0,Math.PI*2); ctx.stroke();
    ctx.fillStyle = 'rgba(89,163,255,0.55)';
    const stepX = Math.max(1, Math.floor(width/150)), stepY = Math.max(1, Math.floor(height/150));
    for (let y=0;y<height;y+=stepY) {
      for (let x=0;x<width;x+=stepX) {
        const o=(y*width+x)*4;
        const [,cb,cr] = rgbToYCbCr(data[o],data[o+1],data[o+2]);
        const px = cx + (cb-128)*scale;
        const py = cy - (cr-128)*scale;
        ctx.fillRect(px,py,1.4,1.4);
      }
    }
  }

  // ---------- 15: False Color ----------
  function drawFalseColor(canvas, imgData) {
    const { data, width, height } = imgData;
    canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext('2d');
    const out = ctx.createImageData(width, height);
    // IRE-style bands: 0-9%=blue,10-24%=cyan/purple,25-40%=green,41-59%=gray,60-79%=yellow,80-94%=orange,95-100%=red, 100%=white
    for (let i=0;i<data.length;i+=4) {
      const luma = (0.2126*data[i]+0.7152*data[i+1]+0.0722*data[i+2])/255*100;
      let c;
      if (luma>=100) c=[255,255,255];
      else if (luma>=95) c=[255,0,0];
      else if (luma>=80) c=[255,140,0];
      else if (luma>=60) c=[255,255,0];
      else if (luma>=41) c=[120,120,120];
      else if (luma>=25) c=[0,180,0];
      else if (luma>=10) c=[150,0,180];
      else c=[0,0,120];
      out.data[i]=c[0]; out.data[i+1]=c[1]; out.data[i+2]=c[2]; out.data[i+3]=255;
    }
    ctx.putImageData(out,0,0);
  }

  // ---------- 14: Zebra ----------
  function drawZebra(canvas, imgData, threshold=95) {
    const { data, width, height } = imgData;
    canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.putImageData(imgData, 0, 0);
    const out = ctx.getImageData(0,0,width,height);
    for (let y=0;y<height;y++) {
      for (let x=0;x<width;x++) {
        const o=(y*width+x)*4;
        const luma = (0.2126*out.data[o]+0.7152*out.data[o+1]+0.0722*out.data[o+2])/255*100;
        if (luma >= threshold && ((x+y)%8<4)) {
          out.data[o]=0; out.data[o+1]=0; out.data[o+2]=0;
        }
      }
    }
    ctx.putImageData(out,0,0);
  }

  // ---------- 9/21: Clipping detection ----------
  function drawClipping(canvas, imgData) {
    const { data, width, height } = imgData;
    canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext('2d');
    const out = new ImageData(new Uint8ClampedArray(data), width, height);
    let clippedHi=0, clippedLo=0, total=width*height;
    for (let i=0;i<data.length;i+=4) {
      const r=data[i],g=data[i+1],b=data[i+2];
      if (r>=253&&g>=253&&b>=253){out.data[i]=255;out.data[i+1]=0;out.data[i+2]=0;clippedHi++;}
      else if (r<=2&&g<=2&&b<=2){out.data[i]=0;out.data[i+1]=140;out.data[i+2]=255;clippedLo++;}
    }
    ctx.putImageData(out,0,0);
    return { highlightsClippedPct: (clippedHi/total*100), shadowsClippedPct: (clippedLo/total*100) };
  }

  // ---------- 10/22: Focus peaking ----------
  function drawFocusPeaking(canvas, imgData, threshold=60) {
    const small = imgData; // caller passes downscaled data for perf if large
    const { width, height, data } = small;
    const gray = toGrayscale(data);
    const mag = sobel(gray, width, height);
    canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext('2d');
    const out = new ImageData(new Uint8ClampedArray(data), width, height);
    for (let i=0;i<mag.length;i++) {
      if (mag[i] > threshold) {
        const o=i*4;
        out.data[o]=255; out.data[o+1]=40; out.data[o+2]=220;
      }
    }
    ctx.putImageData(out,0,0);
  }

  // ---------- 24/25: Sharpness (Laplacian variance) ----------
  function computeSharpness(imgData) {
    const gray = toGrayscale(imgData.data);
    const { variance } = laplacianVariance(gray, imgData.width, imgData.height);
    return variance; // higher = sharper
  }

  // ---------- 26: Blur detection (uses sharpness threshold) ----------
  function computeBlur(sharpnessVariance) {
    const isBlurry = sharpnessVariance < 80; // heuristic threshold, tuneable
    return { isBlurry, variance: sharpnessVariance };
  }

  // ---------- 29/30: Noise + SNR ----------
  function computeNoiseAndSNR(imgData) {
    const gray = toGrayscale(imgData.data);
    const { width, height } = imgData;
    const blurred = boxBlur(gray, width, height, 2);
    let noiseSumSq = 0, signalSum = 0;
    for (let i=0;i<gray.length;i++) {
      const diff = gray[i]-blurred[i];
      noiseSumSq += diff*diff;
      signalSum += gray[i];
    }
    const noiseRMS = Math.sqrt(noiseSumSq/gray.length);
    const meanSignal = signalSum/gray.length;
    const snrDb = noiseRMS > 0 ? 20*Math.log10(meanSignal/noiseRMS) : 99;
    return { noiseRMS, snrDb, meanSignal };
  }

  // ---------- 53: Contrast ----------
  function computeContrast(imgData) {
    const gray = toGrayscale(imgData.data);
    let sum=0; for (const v of gray) sum+=v;
    const mean = sum/gray.length;
    let sq=0; for (const v of gray) sq += (v-mean)*(v-mean);
    const std = Math.sqrt(sq/gray.length);
    return { stdDev: std, michelson: null, mean };
  }

  // ---------- 54: Dynamic range (approx stops) ----------
  function computeDynamicRange(imgData) {
    const gray = toGrayscale(imgData.data);
    let min=255, max=0;
    for (const v of gray) { if (v<min) min=v; if (v>max) max=v; }
    const safeMin = Math.max(min, 1);
    const stops = Math.log2(Math.max(max,1)/safeMin);
    return { min, max, stops };
  }

  // ---------- 45: Color distribution (overlay of channel means/spread) ----------
  function drawColorDistribution(canvas, hist) {
    const ctx = clearCanvas(canvas);
    const w=canvas.width, h=canvas.height;
    const drawLine = (bins,color) => {
      const max = Math.max(...bins);
      ctx.strokeStyle=color; ctx.lineWidth=2; ctx.beginPath();
      for (let i=0;i<256;i++){const x=(i/255)*w, y=h-(bins[i]/max)*h*0.9;
        i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);}
      ctx.stroke();
    };
    drawLine(hist.binsR,'#ff5050'); drawLine(hist.binsG,'#50ff8c'); drawLine(hist.binsB,'#50a0ff');
  }

  // ---------- 50/51: Cumulative Histogram / CDF ----------
  function drawCumulativeHistogram(canvas, binsL) {
    const ctx = clearCanvas(canvas);
    const w=canvas.width, h=canvas.height;
    const total = binsL.reduce((a,b)=>a+b,0);
    let running=0;
    ctx.strokeStyle='#59a3ff'; ctx.lineWidth=2; ctx.beginPath();
    for (let i=0;i<256;i++){
      running += binsL[i];
      const x=(i/255)*w, y=h-(running/total)*h;
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.stroke();
  }

  // ---------- 59-62: FFT / frequency spectrum (DFT magnitude, downsized) ----------
  function drawFrequencySpectrum(canvas, imgData) {
    // Use a modest size DFT for performance (O(N^4) naive) -> cap at 64x64
    const maxSize = 64;
    const scale = Math.min(1, maxSize/Math.max(imgData.width, imgData.height));
    const w = Math.max(8, Math.round(imgData.width*scale));
    const h = Math.max(8, Math.round(imgData.height*scale));
    const c = document.createElement('canvas'); c.width=w; c.height=h;
    const tmp = c.getContext('2d');
    tmp.drawImage(canvasFromImageData(imgData), 0, 0, w, h);
    const small = tmp.getImageData(0,0,w,h);
    const gray = toGrayscale(small.data);

    // 2D DFT magnitude (naive, small size only)
    const mag = new Float32Array(w*h);
    for (let v=0; v<h; v++) {
      for (let u=0; u<w; u++) {
        let re=0, im=0;
        for (let y=0;y<h;y++) {
          for (let x=0;x<w;x++) {
            const angle = -2*Math.PI*((u*x)/w + (v*y)/h);
            const val = gray[y*w+x];
            re += val*Math.cos(angle);
            im += val*Math.sin(angle);
          }
        }
        mag[v*w+u] = Math.sqrt(re*re+im*im);
      }
    }
    // log scale + fftshift for display
    let maxM = 0;
    for (let i=0;i<mag.length;i++){mag[i]=Math.log(1+mag[i]); if(mag[i]>maxM)maxM=mag[i];}
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    const out = ctx.createImageData(w,h);
    for (let v=0; v<h; v++) {
      for (let u=0; u<w; u++) {
        const su = (u+Math.floor(w/2))%w, sv=(v+Math.floor(h/2))%h; // shift DC to center
        const val = mag[v*w+u]/maxM;
        const o = (sv*w+su)*4;
        out.data[o]=out.data[o+1]=out.data[o+2]=Math.round(val*255);
        out.data[o+3]=255;
      }
    }
    ctx.putImageData(out,0,0);
  }

  function canvasFromImageData(imgData) {
    const c = document.createElement('canvas');
    c.width = imgData.width; c.height = imgData.height;
    c.getContext('2d').putImageData(imgData,0,0);
    return c;
  }

  // ---------- 64/65: Edge detection + Gradient map ----------
  function drawEdges(canvas, imgData, colored=false) {
    const { width, height, data } = imgData;
    const gray = toGrayscale(data);
    const mag = sobel(gray, width, height);
    let maxM=0; for (const v of mag) if (v>maxM) maxM=v;
    canvas.width=width; canvas.height=height;
    const ctx = canvas.getContext('2d');
    const out = ctx.createImageData(width,height);
    for (let i=0;i<mag.length;i++) {
      const o=i*4;
      const v = mag[i]/(maxM||1);
      if (colored) {
        const [r,g,b] = heatColor(v);
        out.data[o]=r; out.data[o+1]=g; out.data[o+2]=b;
      } else {
        out.data[o]=out.data[o+1]=out.data[o+2]=Math.round(v*255);
      }
      out.data[o+3]=255;
    }
    ctx.putImageData(out,0,0);
    return mag;
  }

  // ---------- 67: Saliency map (center-surround contrast approximation) ----------
  function drawSaliency(canvas, imgData) {
    const { width, height, data } = imgData;
    const gray = toGrayscale(data);
    const fine = boxBlur(gray, width, height, 1);
    const coarse = boxBlur(gray, width, height, 8);
    const sal = new Float32Array(width*height);
    let maxS=0;
    for (let i=0;i<sal.length;i++) { sal[i]=Math.abs(fine[i]-coarse[i]); if (sal[i]>maxS) maxS=sal[i]; }
    canvas.width=width; canvas.height=height;
    const ctx = canvas.getContext('2d');
    const out = ctx.createImageData(width,height);
    for (let i=0;i<sal.length;i++) {
      const v = sal[i]/(maxS||1);
      const [r,g,b]=heatColor(v);
      const o=i*4; out.data[o]=r; out.data[o+1]=g; out.data[o+2]=b; out.data[o+3]=255;
    }
    ctx.putImageData(out,0,0);
  }

  return {
    downscale, drawHistogram, drawWaveform, drawVectorscope, drawFalseColor, drawZebra,
    drawClipping, drawFocusPeaking, computeSharpness, computeBlur, computeNoiseAndSNR,
    computeContrast, computeDynamicRange, drawColorDistribution, drawCumulativeHistogram,
    drawFrequencySpectrum, drawEdges, drawSaliency, canvasFromImageData
  };
})();
