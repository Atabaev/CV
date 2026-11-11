/**
 * practice-engine.js — Interactive Browser CV Playgrounds & Handout Cheat Sheets
 * Exports window.CV_PRACTICE_ENGINE
 */
(function () {
  const { getLang, t, CHEATSHEETS } = window.CV_APP;

  function escHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderMathIfReady(el) {
    if (!el || typeof window.renderMathInElement !== 'function') return;
    try {
      window.renderMathInElement(el, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true }
        ],
        throwOnError: false
      });
    } catch (_) {}
  }

  /* Built-in synthetic CV test image generator (240x180) so playgrounds work offline immediately */
  function paintSyntheticScene(ctx, w, h, variant) {
    ctx.clearRect(0, 0, w, h);
    if (variant === 'checker') {
      const sz = 24;
      for (let y = 0; y < h; y += sz) {
        for (let x = 0; x < w; x += sz) {
          ctx.fillStyle = ((x / sz + y / sz) % 2 === 0) ? '#f8fafc' : '#0f172a';
          ctx.fillRect(x, y, sz, sz);
        }
      }
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(w * 0.72, h * 0.35, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(w * 0.14, h * 0.56, 56, 36);
      return;
    }

    // Gradient sky + shapes scene (default)
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(0.55, '#1e3a5f');
    grad.addColorStop(1, '#334155');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Sun / cyan circle
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(46, 44, 24, 0, Math.PI * 2);
    ctx.fill();

    // Red triangle (stop sign style)
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(130, 32);
    ctx.lineTo(174, 108);
    ctx.lineTo(86, 108);
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    // Green rectangle
    ctx.fillStyle = '#10b981';
    ctx.fillRect(182, 42, 46, 76);

    // Cyan hexagon / plate
    ctx.fillStyle = '#06b6d4';
    ctx.fillRect(22, 118, 128, 42);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('CV-2026', 44, 145);

    // High-contrast circle
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.arc(195, 145, 20, 0, Math.PI * 2);
    ctx.fill();
  }

  function rgbToHsv(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const d = max - min;
    let h = 0;
    if (d !== 0) {
      if (max === r) h = ((g - b) / d) % 6;
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h *= 60;
      if (h < 0) h += 360;
    }
    const s = max === 0 ? 0 : (d / max) * 255;
    const v = max * 255;
    // OpenCV scale: H in 0..179, S in 0..255, V in 0..255
    return [Math.round(h / 2), Math.round(s), Math.round(v)];
  }

  function initPracticePage() {
    const root = document.getElementById('practice-root');
    if (!root) return;

    const W = 240, H = 180;
    let activeTab = 'lab1'; // 'lab1'..'lab7' | 'cheatsheets'
    let customImgData = null; // ImageData at W x H
    let sceneMode = 'shapes';

    function getSourceImageData(ctx) {
      if (customImgData) return new ImageData(new Uint8ClampedArray(customImgData.data), W, H);
      paintSyntheticScene(ctx, W, H, sceneMode);
      return ctx.getImageData(0, 0, W, H);
    }

    function drawShell() {
      const l = getLang();
      const tabs = [
        { id: 'lab1', uz: '1. Piksel, RGB & Kvantlash', en: '1. Pixel, RGB & Quantizer' },
        { id: 'lab2', uz: '2. RGB ↔ HSV Niqoblash', en: '2. RGB ↔ HSV Masking' },
        { id: 'lab3', uz: '3. 2D Konvolyutsiya & Shovqin', en: '3. 2D Conv & Denoising' },
        { id: 'lab4', uz: '4. Sobel Gx/Gy Chegaralar', en: '4. Sobel Edge Detector' },
        { id: 'lab5', uz: '5. Pinhole 3D→2D & Stereo', en: '5. Pinhole & Stereo Depth' },
        { id: 'lab6', uz: '6. CNN Chiqish & Softmax', en: '6. CNN Shape & Softmax' },
        { id: 'lab7', uz: '7. IoU, Dice & Adashish matritsasi', en: '7. IoU, Dice & Confusion Matrix' },
        { id: 'cheatsheets', uz: '📋 Tarqatma Materiallar (1–3)', en: '📋 Handout Cheat Sheets (1–3)' }
      ];

      root.innerHTML = `
        <div class="container" style="padding-top:1.75rem;padding-bottom:3rem;">
          <div class="page-hero" style="margin-bottom:1.25rem;">
            <span class="badge badge-accent">HTML5 Canvas · Live Browser CV</span>
            <h1 style="margin:0.35rem 0;">${t('practiceHeroTitle')}</h1>
            <p class="muted" style="max-width:760px;">${t('practiceHeroDesc')}</p>
          </div>

          <div class="card" style="padding:0.9rem 1rem;margin-bottom:1.15rem;display:flex;justify-content:space-between;align-items:center;gap:0.75rem;flex-wrap:wrap;">
            <div style="display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap;">
              <strong style="font-size:0.9rem;">${l === 'uz' ? 'Kirish tasviri:' : 'Input Image:'}</strong>
              <button type="button" class="btn btn-sm ${!customImgData && sceneMode === 'shapes' ? 'btn-primary' : 'btn-outline'}" data-scene="shapes">${l === 'uz' ? 'Geometrik sahna' : 'Geometric Scene'}</button>
              <button type="button" class="btn btn-sm ${!customImgData && sceneMode === 'checker' ? 'btn-primary' : 'btn-outline'}" data-scene="checker">${l === 'uz' ? 'Shaxmat kalibrlash' : 'Calibration Grid'}</button>
            </div>
            <label class="btn btn-sm btn-outline" style="cursor:pointer;">
              📁 ${l === 'uz' ? 'O‘z rasmingizni yuklash' : 'Upload Own Image'}
              <input type="file" id="cv-upload-input" accept="image/*" style="display:none;">
            </label>
          </div>

          <div class="practice-tabs" style="display:flex;gap:0.45rem;flex-wrap:wrap;margin-bottom:1.25rem;">
            ${tabs.map((tb) => `
              <button type="button" class="btn btn-sm ${activeTab === tb.id ? 'btn-primary' : 'btn-outline'}" data-tab="${tb.id}">
                ${escHtml(tb[l] || tb.uz)}
              </button>`).join('')}
          </div>

          <div id="practice-stage"></div>
        </div>`;

      root.querySelectorAll('[data-scene]').forEach((btn) => {
        btn.addEventListener('click', () => {
          customImgData = null;
          sceneMode = btn.dataset.scene;
          drawShell();
        });
      });

      root.querySelectorAll('[data-tab]').forEach((btn) => {
        btn.addEventListener('click', () => {
          activeTab = btn.dataset.tab;
          drawShell();
        });
      });

      const fileInp = document.getElementById('cv-upload-input');
      if (fileInp) {
        fileInp.addEventListener('change', (e) => {
          const f = e.target.files && e.target.files[0];
          if (!f) return;
          const img = new Image();
          img.onload = () => {
            const off = document.createElement('canvas');
            off.width = W; off.height = H;
            const octx = off.getContext('2d');
            octx.drawImage(img, 0, 0, W, H);
            customImgData = octx.getImageData(0, 0, W, H);
            URL.revokeObjectURL(img.src);
            renderStage();
          };
          img.src = URL.createObjectURL(f);
        });
      }

      renderStage();
    }

    function renderStage() {
      const stage = document.getElementById('practice-stage');
      if (!stage) return;
      const l = getLang();

      if (activeTab === 'lab1') renderLab1(stage, l);
      else if (activeTab === 'lab2') renderLab2(stage, l);
      else if (activeTab === 'lab3') renderLab3(stage, l);
      else if (activeTab === 'lab4') renderLab4(stage, l);
      else if (activeTab === 'lab5') renderLab5(stage, l);
      else if (activeTab === 'lab6') renderLab6(stage, l);
      else if (activeTab === 'lab7') renderLab7(stage, l);
      else if (activeTab === 'cheatsheets') renderCheatsheets(stage, l);

      renderMathIfReady(stage);
    }

    /* ── LAB 1: Pixel Inspector, RGB Channel Split & Bit-Depth Quantizer ── */
    function renderLab1(stage, l) {
      stage.innerHTML = `
        <div class="card" style="padding:1.25rem;">
          <h2 style="margin-top:0;">${l === 'uz' ? '1-Lab: Piksel Inspektori, RGB Kanallar va Bit-Chuqurlik Kvantlashi' : 'Lab 1: Pixel Inspector, RGB Channel Split & Bit-Depth Quantizer'}</h2>
          <p class="muted">${l === 'uz' ? "Tasvir ustiga kursor olib boring: (x, y) koordinatalari, [R, G, B] va OpenCV [H, S, V] qiymatlari hamda bit-chuqurlik (1–8 bit) pasayganda konturlash effekti kuzating." : "Hover over the source image to inspect (x, y) coordinates, [R, G, B] & OpenCV [H, S, V] values, and observe posterization when reducing bit depth (1–8 bits)."}</p>
          <div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:center;margin-bottom:1rem;">
            <label><strong>${l === 'uz' ? 'Kanal rejimi:' : 'Channel Mode:'}</strong>
              <select id="l1-chan">
                <option value="rgb">RGB (${l === 'uz' ? 'Asl' : 'Original'})</option>
                <option value="r">R (${l === 'uz' ? 'Qizil' : 'Red'})</option>
                <option value="g">G (${l === 'uz' ? 'Yashil' : 'Green'})</option>
                <option value="b">B (${l === 'uz' ? 'Ko‘k' : 'Blue'})</option>
                <option value="gray">Grayscale (0.299R+0.587G+0.114B)</option>
              </select>
            </label>
            <label><strong>${l === 'uz' ? 'Bit chuqurligi:' : 'Bit Depth:'}</strong>
              <input type="range" id="l1-bits" min="1" max="8" value="8">
              <span id="l1-bits-val" class="badge badge-accent">8 bit (256)</span>
            </label>
          </div>
          <div class="cv-canvas-grid">
            <div>
              <div style="font-weight:600;margin-bottom:0.35rem;">${l === 'uz' ? 'Asl tasvir (kursorni olib boring)' : 'Source Image (hover to inspect)'}</div>
              <canvas id="l1-src" width="${W}" height="${H}" style="border-radius:8px;border:1px solid var(--border);cursor:crosshair;max-width:100%;"></canvas>
            </div>
            <div>
              <div style="font-weight:600;margin-bottom:0.35rem;">${l === 'uz' ? 'Qayta ishlangan natija' : 'Processed Output'}</div>
              <canvas id="l1-out" width="${W}" height="${H}" style="border-radius:8px;border:1px solid var(--border);max-width:100%;"></canvas>
            </div>
          </div>
          <div id="l1-inspector" class="card" style="margin-top:0.85rem;padding:0.75rem 1rem;background:var(--bg-subtle);font-family:var(--font-mono);font-size:0.88rem;">
            ${l === 'uz' ? 'Kursorni tasvir ustiga olib boring...' : 'Move mouse over source canvas...'}
          </div>
        </div>`;

      const srcC = document.getElementById('l1-src');
      const outC = document.getElementById('l1-out');
      const sctx = srcC.getContext('2d');
      const octx = outC.getContext('2d');
      const srcData = getSourceImageData(sctx);
      sctx.putImageData(srcData, 0, 0);

      function update() {
        const chan = document.getElementById('l1-chan').value;
        const bits = Number(document.getElementById('l1-bits').value);
        const levels = Math.pow(2, bits);
        document.getElementById('l1-bits-val').textContent = `${bits} bit (${levels})`;

        const d = new Uint8ClampedArray(srcData.data);
        const step = levels > 1 ? 255 / (levels - 1) : 255;
        const q = (val) => levels === 256 ? val : Math.round(Math.round((val / 255) * (levels - 1)) * step);

        for (let i = 0; i < d.length; i += 4) {
          let r = q(d[i]), g = q(d[i + 1]), b = q(d[i + 2]);
          if (chan === 'r') { g = 0; b = 0; }
          else if (chan === 'g') { r = 0; b = 0; }
          else if (chan === 'b') { r = 0; g = 0; }
          else if (chan === 'gray') {
            const y = q(Math.round(0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]));
            r = g = b = y;
          }
          d[i] = r; d[i + 1] = g; d[i + 2] = b;
        }
        octx.putImageData(new ImageData(d, W, H), 0, 0);
      }

      srcC.addEventListener('mousemove', (e) => {
        const rect = srcC.getBoundingClientRect();
        const x = Math.max(0, Math.min(W - 1, Math.floor(((e.clientX - rect.left) / rect.width) * W)));
        const y = Math.max(0, Math.min(H - 1, Math.floor(((e.clientY - rect.top) / rect.height) * H)));
        const idx = (y * W + x) * 4;
        const r = srcData.data[idx], g = srcData.data[idx + 1], b = srcData.data[idx + 2];
        const [h, s, v] = rgbToHsv(r, g, b);
        const insp = document.getElementById('l1-inspector');
        insp.innerHTML = `<span style="display:inline-block;width:14px;height:14px;border-radius:3px;vertical-align:middle;margin-right:8px;background:rgb(${r},${g},${b});border:1px solid #fff;"></span>(row=${y}, col=${x}) | RGB=[${r}, ${g}, ${b}] | BGR=[${b}, ${g}, ${r}] | HSV_cv=[${h}, ${s}, ${v}]`;
      });

      document.getElementById('l1-chan').addEventListener('change', update);
      document.getElementById('l1-bits').addEventListener('input', update);
      update();
    }

    /* ── LAB 2: RGB <-> HSV Color Masking ── */
    function renderLab2(stage, l) {
      stage.innerHTML = `
        <div class="card" style="padding:1.25rem;">
          <h2 style="margin-top:0;">${l === 'uz' ? '2-Lab: Jonli HSV Rang Fazo Niqoblash (inRange)' : 'Lab 2: Live HSV Color Space Masking (inRange)'}</h2>
          <p class="muted">${l === 'uz' ? "OpenCV da H ∈ [0..179], S ∈ [0..255], V ∈ [0..255]. Slayderlarni surib faqat kerakli rang ob'ektini ajrating." : "In OpenCV, H ∈ [0..179], S ∈ [0..255], V ∈ [0..255]. Adjust sliders to isolate target colored objects."}</p>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:0.75rem;margin-bottom:1rem;">
            <label>H min: <span id="hmin-v">80</span><input type="range" id="hmin" min="0" max="179" value="80" style="width:100%;"></label>
            <label>H max: <span id="hmax-v">105</span><input type="range" id="hmax" min="0" max="179" value="105" style="width:100%;"></label>
            <label>S min: <span id="smin-v">80</span><input type="range" id="smin" min="0" max="255" value="80" style="width:100%;"></label>
            <label>V min: <span id="vmin-v">80</span><input type="range" id="vmin" min="0" max="255" value="80" style="width:100%;"></label>
          </div>
          <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1rem;">
            <button type="button" class="btn btn-sm btn-outline" data-preset="cyan">Cyan (80..105)</button>
            <button type="button" class="btn btn-sm btn-outline" data-preset="red">${l === 'uz' ? 'Qizil' : 'Red'} (0..12)</button>
            <button type="button" class="btn btn-sm btn-outline" data-preset="green">${l === 'uz' ? 'Yashil' : 'Green'} (60..90)</button>
            <button type="button" class="btn btn-sm btn-outline" data-preset="yellow">${l === 'uz' ? 'Sariq' : 'Yellow'} (20..35)</button>
          </div>
          <div class="cv-canvas-grid">
            <div><div style="font-weight:600;margin-bottom:0.35rem;">${l === 'uz' ? 'Asl tasvir' : 'Source'}</div><canvas id="l2-src" width="${W}" height="${H}" style="border-radius:8px;border:1px solid var(--border);max-width:100%;"></canvas></div>
            <div><div style="font-weight:600;margin-bottom:0.35rem;">${l === 'uz' ? 'Binar Niqob (Mask)' : 'Binary Mask'}</div><canvas id="l2-mask" width="${W}" height="${H}" style="border-radius:8px;border:1px solid var(--border);max-width:100%;"></canvas></div>
            <div><div style="font-weight:600;margin-bottom:0.35rem;">bitwise_and</div><canvas id="l2-res" width="${W}" height="${H}" style="border-radius:8px;border:1px solid var(--border);max-width:100%;"></canvas></div>
          </div>
          <div id="l2-stats" class="badge badge-accent" style="margin-top:0.8rem;"></div>
        </div>`;

      const srcC = document.getElementById('l2-src'), mC = document.getElementById('l2-mask'), rC = document.getElementById('l2-res');
      const sctx = srcC.getContext('2d'), mctx = mC.getContext('2d'), rctx = rC.getContext('2d');
      const srcData = getSourceImageData(sctx);
      sctx.putImageData(srcData, 0, 0);

      function update() {
        const hmin = Number(document.getElementById('hmin').value);
        const hmax = Number(document.getElementById('hmax').value);
        const smin = Number(document.getElementById('smin').value);
        const vmin = Number(document.getElementById('vmin').value);
        document.getElementById('hmin-v').textContent = hmin;
        document.getElementById('hmax-v').textContent = hmax;
        document.getElementById('smin-v').textContent = smin;
        document.getElementById('vmin-v').textContent = vmin;

        const mData = new Uint8ClampedArray(srcData.data.length);
        const rData = new Uint8ClampedArray(srcData.data.length);
        let hits = 0;
        for (let i = 0; i < srcData.data.length; i += 4) {
          const r = srcData.data[i], g = srcData.data[i + 1], b = srcData.data[i + 2];
          const [h, s, v] = rgbToHsv(r, g, b);
          const okH = hmin <= hmax ? (h >= hmin && h <= hmax) : (h >= hmin || h <= hmax);
          const hit = okH && s >= smin && v >= vmin;
          if (hit) hits++;
          const mv = hit ? 255 : 0;
          mData[i] = mv; mData[i + 1] = mv; mData[i + 2] = mv; mData[i + 3] = 255;
          rData[i] = hit ? r : 15; rData[i + 1] = hit ? g : 23; rData[i + 2] = hit ? b : 42; rData[i + 3] = 255;
        }
        mctx.putImageData(new ImageData(mData, W, H), 0, 0);
        rctx.putImageData(new ImageData(rData, W, H), 0, 0);
        const pct = ((hits / (W * H)) * 100).toFixed(1);
        document.getElementById('l2-stats').textContent = `${l === 'uz' ? 'Ajratilgan piksellar' : 'Matched pixels'}: ${hits} / ${W * H} (${pct}%)`;
      }

      ['hmin', 'hmax', 'smin', 'vmin'].forEach((id) => document.getElementById(id).addEventListener('input', update));
      stage.querySelectorAll('[data-preset]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const p = btn.dataset.preset;
          const map = { cyan: [80, 105, 80, 80], red: [0, 12, 120, 80], green: [60, 90, 80, 60], yellow: [20, 35, 100, 100] };
          const [a, b, c, d] = map[p];
          document.getElementById('hmin').value = a;
          document.getElementById('hmax').value = b;
          document.getElementById('smin').value = c;
          document.getElementById('vmin').value = d;
          update();
        });
      });
      update();
    }

    /* ── LAB 3: 2D Convolution Kernel Editor + Median Denoising & PSNR ── */
    function renderLab3(stage, l) {
      let kernel = [0, -1, 0, -1, 5, -1, 0, -1, 0];
      let noiseAmt = 0;
      let useMedian = false;

      stage.innerHTML = `
        <div class="card" style="padding:1.25rem;">
          <h2 style="margin-top:0;">${l === 'uz' ? '3-Lab: Jonli 3×3 Konvolyutsiya Yadro Muharriri va Median Filtrlash' : 'Lab 3: Live 3×3 Convolution Kernel & Median Denoising'}</h2>
          <div style="display:grid;grid-template-columns:auto 1fr;gap:1.25rem;align-items:start;margin-bottom:1rem;">
            <div>
              <div style="font-weight:600;margin-bottom:0.4rem;">3×3 Kernel</div>
              <div class="kernel-grid-3x3" id="l3-grid">
                ${kernel.map((v, i) => `<input type="number" step="0.1" class="k-inp" data-ki="${i}" value="${v}">`).join('')}
              </div>
              <div id="l3-ksum" class="muted" style="font-size:0.82rem;margin-top:0.35rem;">Sum = 1</div>
            </div>
            <div>
              <div style="display:flex;gap:0.45rem;flex-wrap:wrap;margin-bottom:0.75rem;">
                <button type="button" class="btn btn-sm btn-outline" data-kp="identity">Identity</button>
                <button type="button" class="btn btn-sm btn-outline" data-kp="blur">Box Blur (1/9)</button>
                <button type="button" class="btn btn-sm btn-outline" data-kp="gauss">Gaussian (1/16)</button>
                <button type="button" class="btn btn-sm btn-outline" data-kp="sharpen">Sharpen</button>
                <button type="button" class="btn btn-sm btn-outline" data-kp="laplacian">Laplacian</button>
                <button type="button" class="btn btn-sm btn-outline" data-kp="emboss">Emboss</button>
              </div>
              <div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:center;">
                <label><strong>Salt & Pepper %:</strong> <span id="l3-nv">0%</span>
                  <input type="range" id="l3-noise" min="0" max="25" value="0">
                </label>
                <label style="display:flex;align-items:center;gap:0.4rem;cursor:pointer;">
                  <input type="checkbox" id="l3-median">
                  <span>${l === 'uz' ? '3×3 Median Filtrni qo‘llash (kernel o‘rniga)' : 'Apply 3×3 Median Filter (instead of linear kernel)'}</span>
                </label>
              </div>
            </div>
          </div>
          <div class="cv-canvas-grid">
            <div><div style="font-weight:600;margin-bottom:0.35rem;">${l === 'uz' ? 'Kirish (shovqin bilan)' : 'Input (with noise)'}</div><canvas id="l3-src" width="${W}" height="${H}" style="border-radius:8px;border:1px solid var(--border);max-width:100%;"></canvas></div>
            <div><div style="font-weight:600;margin-bottom:0.35rem;">${l === 'uz' ? 'Filtrlangan natija' : 'Filtered Output'}</div><canvas id="l3-out" width="${W}" height="${H}" style="border-radius:8px;border:1px solid var(--border);max-width:100%;"></canvas></div>
          </div>
          <div id="l3-metrics" class="badge badge-accent" style="margin-top:0.85rem;"></div>
        </div>`;

      const srcC = document.getElementById('l3-src'), outC = document.getElementById('l3-out');
      const sctx = srcC.getContext('2d'), octx = outC.getContext('2d');
      const cleanData = getSourceImageData(sctx);

      function run() {
        const inputs = stage.querySelectorAll('.k-inp');
        kernel = Array.from(inputs).map((el) => parseFloat(el.value) || 0);
        const kSum = kernel.reduce((a, b) => a + b, 0);
        document.getElementById('l3-ksum').textContent = `Sum = ${kSum.toFixed(2)}`;
        document.getElementById('l3-nv').textContent = `${noiseAmt}%`;

        // Build noisy input deterministically per noiseAmt
        const noisy = new Uint8ClampedArray(cleanData.data);
        if (noiseAmt > 0) {
          let seed = 1337;
          const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
          for (let i = 0; i < noisy.length; i += 4) {
            const p = rand() * 100;
            if (p < noiseAmt) {
              const val = rand() < 0.5 ? 0 : 255;
              noisy[i] = val; noisy[i + 1] = val; noisy[i + 2] = val;
            }
          }
        }
        sctx.putImageData(new ImageData(noisy, W, H), 0, 0);

        const out = new Uint8ClampedArray(noisy.length);
        for (let y = 0; y < H; y++) {
          for (let x = 0; x < W; x++) {
            const idx = (y * W + x) * 4;
            if (useMedian) {
              for (let c = 0; c < 3; c++) {
                const win = [];
                for (let dy = -1; dy <= 1; dy++) {
                  for (let dx = -1; dx <= 1; dx++) {
                    const yy = Math.max(0, Math.min(H - 1, y + dy));
                    const xx = Math.max(0, Math.min(W - 1, x + dx));
                    win.push(noisy[(yy * W + xx) * 4 + c]);
                  }
                }
                win.sort((a, b) => a - b);
                out[idx + c] = win[4];
              }
            } else {
              for (let c = 0; c < 3; c++) {
                let acc = 0, ki = 0;
                for (let dy = -1; dy <= 1; dy++) {
                  for (let dx = -1; dx <= 1; dx++) {
                    const yy = Math.max(0, Math.min(H - 1, y + dy));
                    const xx = Math.max(0, Math.min(W - 1, x + dx));
                    acc += noisy[(yy * W + xx) * 4 + c] * kernel[ki++];
                  }
                }
                out[idx + c] = Math.max(0, Math.min(255, Math.round(acc)));
              }
            }
            out[idx + 3] = 255;
          }
        }
        octx.putImageData(new ImageData(out, W, H), 0, 0);

        // Compute MSE and PSNR against cleanData
        let mse = 0;
        for (let i = 0; i < out.length; i += 4) {
          for (let c = 0; c < 3; c++) {
            const diff = out[i + c] - cleanData.data[i + c];
            mse += diff * diff;
          }
        }
        mse /= (W * H * 3);
        const psnr = mse === 0 ? '∞' : (10 * Math.log10((255 * 255) / mse)).toFixed(2);
        document.getElementById('l3-metrics').textContent = `MSE vs Clean: ${mse.toFixed(1)} | PSNR: ${psnr} dB`;
      }

      stage.querySelectorAll('.k-inp').forEach((inp) => inp.addEventListener('input', run));
      document.getElementById('l3-noise').addEventListener('input', (e) => { noiseAmt = Number(e.target.value); run(); });
      document.getElementById('l3-median').addEventListener('change', (e) => { useMedian = e.target.checked; run(); });
      stage.querySelectorAll('[data-kp]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const presets = {
            identity: [0, 0, 0, 0, 1, 0, 0, 0, 0],
            blur: Array(9).fill(+(1 / 9).toFixed(3)),
            gauss: [0.0625, 0.125, 0.0625, 0.125, 0.25, 0.125, 0.0625, 0.125, 0.0625],
            sharpen: [0, -1, 0, -1, 5, -1, 0, -1, 0],
            laplacian: [0, 1, 0, 1, -4, 1, 0, 1, 0],
            emboss: [-2, -1, 0, -1, 1, 1, 0, 1, 2]
          };
          const p = presets[btn.dataset.kp];
          stage.querySelectorAll('.k-inp').forEach((el, i) => { el.value = p[i]; });
          document.getElementById('l3-median').checked = false;
          useMedian = false;
          run();
        });
      });
      run();
    }

    /* ── LAB 4: Sobel Gx/Gy Magnitude & Threshold Edge Detector ── */
    function renderLab4(stage, l) {
      stage.innerHTML = `
        <div class="card" style="padding:1.25rem;">
          <h2 style="margin-top:0;">${l === 'uz' ? '4-Lab: Sobel Gradient Gx, Gy va Chegara Aniqlash' : 'Lab 4: Sobel Gx, Gy Magnitude & Threshold Edge Detector'}</h2>
          <div style="display:flex;gap:1.25rem;flex-wrap:wrap;align-items:center;margin-bottom:1rem;">
            <label><strong>${l === 'uz' ? 'Chegara chegarasi (Threshold):' : 'Magnitude Threshold:'}</strong>
              <input type="range" id="l4-th" min="10" max="240" value="80">
              <span id="l4-thv" class="badge badge-accent">80</span>
            </label>
            <label style="display:flex;align-items:center;gap:0.4rem;cursor:pointer;">
              <input type="checkbox" id="l4-blur" checked>
              <span>${l === 'uz' ? '3×3 Gauss silliqlash (shovqinni kamaytirish)' : 'Pre-smooth with 3×3 Gaussian'}</span>
            </label>
          </div>
          <div class="cv-canvas-grid">
            <div><div style="font-weight:600;margin-bottom:0.35rem;">Grayscale</div><canvas id="l4-gray" width="${W}" height="${H}" style="border-radius:8px;border:1px solid var(--border);max-width:100%;"></canvas></div>
            <div><div style="font-weight:600;margin-bottom:0.35rem;">|Gx| + |Gy| Magnitude</div><canvas id="l4-mag" width="${W}" height="${H}" style="border-radius:8px;border:1px solid var(--border);max-width:100%;"></canvas></div>
            <div><div style="font-weight:600;margin-bottom:0.35rem;">Binary Edges (> T)</div><canvas id="l4-edge" width="${W}" height="${H}" style="border-radius:8px;border:1px solid var(--border);max-width:100%;"></canvas></div>
          </div>
          <div id="l4-stats" class="badge badge-accent" style="margin-top:0.85rem;"></div>
        </div>`;

      const gC = document.getElementById('l4-gray'), mC = document.getElementById('l4-mag'), eC = document.getElementById('l4-edge');
      const gctx = gC.getContext('2d'), mctx = mC.getContext('2d'), ectx = eC.getContext('2d');
      const srcData = getSourceImageData(gctx);

      const gray = new Float32Array(W * H);
      for (let i = 0; i < W * H; i++) {
        gray[i] = 0.299 * srcData.data[i * 4] + 0.587 * srcData.data[i * 4 + 1] + 0.114 * srcData.data[i * 4 + 2];
      }

      function update() {
        const th = Number(document.getElementById('l4-th').value);
        const doBlur = document.getElementById('l4-blur').checked;
        document.getElementById('l4-thv').textContent = th;

        const base = new Float32Array(W * H);
        if (doBlur) {
          const gk = [1, 2, 1, 2, 4, 2, 1, 2, 1];
          for (let y = 0; y < H; y++) {
            for (let x = 0; x < W; x++) {
              let acc = 0, ki = 0;
              for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                  const yy = Math.max(0, Math.min(H - 1, y + dy));
                  const xx = Math.max(0, Math.min(W - 1, x + dx));
                  acc += gray[yy * W + xx] * gk[ki++];
                }
              }
              base[y * W + x] = acc / 16;
            }
          }
        } else {
          base.set(gray);
        }

        const gImg = new Uint8ClampedArray(W * H * 4);
        const mImg = new Uint8ClampedArray(W * H * 4);
        const eImg = new Uint8ClampedArray(W * H * 4);
        const kx = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
        const ky = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
        let edgePx = 0;

        for (let y = 0; y < H; y++) {
          for (let x = 0; x < W; x++) {
            let gx = 0, gy = 0, ki = 0;
            for (let dy = -1; dy <= 1; dy++) {
              for (let dx = -1; dx <= 1; dx++) {
                const yy = Math.max(0, Math.min(H - 1, y + dy));
                const xx = Math.max(0, Math.min(W - 1, x + dx));
                const p = base[yy * W + xx];
                gx += p * kx[ki];
                gy += p * ky[ki];
                ki++;
              }
            }
            const mag = Math.min(255, Math.round(Math.hypot(gx, gy)));
            const isEdge = mag >= th ? 255 : 0;
            if (isEdge) edgePx++;
            const o = (y * W + x) * 4;
            const gv = Math.round(base[y * W + x]);
            gImg[o] = gv; gImg[o + 1] = gv; gImg[o + 2] = gv; gImg[o + 3] = 255;
            mImg[o] = mag; mImg[o + 1] = mag; mImg[o + 2] = mag; mImg[o + 3] = 255;
            eImg[o] = isEdge ? 6 : 15; eImg[o + 1] = isEdge ? 182 : 23; eImg[o + 2] = isEdge ? 212 : 42; eImg[o + 3] = 255;
          }
        }
        gctx.putImageData(new ImageData(gImg, W, H), 0, 0);
        mctx.putImageData(new ImageData(mImg, W, H), 0, 0);
        ectx.putImageData(new ImageData(eImg, W, H), 0, 0);
        document.getElementById('l4-stats').textContent = `${l === 'uz' ? 'Chegara piksellari' : 'Edge pixels'}: ${edgePx} (${((edgePx / (W * H)) * 100).toFixed(1)}%)`;
      }

      document.getElementById('l4-th').addEventListener('input', update);
      document.getElementById('l4-blur').addEventListener('change', update);
      update();
    }

    /* ── LAB 5: Pinhole 3D->2D & Stereo Disparity ── */
    function renderLab5(stage, l) {
      stage.innerHTML = `
        <div class="card" style="padding:1.25rem;">
          <h2 style="margin-top:0;">${l === 'uz' ? '5-Lab: Pinhole Kamera Proyeksiyasi (3D→2D) va Stereo Chuqurlik Z = fB/d' : 'Lab 5: Pinhole Camera Projection & Stereo Depth Z = fB/d'}</h2>
          <p class="muted">$$u = f \\frac{X}{Z} + c_x, \\quad v = f \\frac{Y}{Z} + c_y, \\quad Z = \\frac{f \\cdot B}{d}$$</p>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(175px,1fr));gap:0.75rem;margin-bottom:1rem;">
            <label>Focal $f$ (px): <strong id="l5-fv">600</strong><input type="range" id="l5-f" min="200" max="1400" value="600" style="width:100%;"></label>
            <label>Baseline $B$ (m): <strong id="l5-bv">0.12</strong><input type="range" id="l5-b" min="0.05" max="0.50" step="0.01" value="0.12" style="width:100%;"></label>
            <label>Disparity $d$ (px): <strong id="l5-dv">18</strong><input type="range" id="l5-d" min="2" max="90" value="18" style="width:100%;"></label>
            <label>Object $X$ (m): <strong id="l5-xv">0.5</strong><input type="range" id="l5-x" min="-2.0" max="2.0" step="0.1" value="0.5" style="width:100%;"></label>
          </div>
          <canvas id="l5-canvas" width="520" height="220" style="width:100%;max-width:540px;border-radius:10px;border:1px solid var(--border);background:#0f172a;"></canvas>
          <div id="l5-out" class="card" style="margin-top:0.85rem;padding:0.85rem 1rem;background:var(--bg-subtle);font-family:var(--font-mono);"></div>
        </div>`;

      const cv = document.getElementById('l5-canvas');
      const ctx = cv.getContext('2d');

      function update() {
        const f = Number(document.getElementById('l5-f').value);
        const B = Number(document.getElementById('l5-b').value);
        const d = Number(document.getElementById('l5-d').value);
        const X = Number(document.getElementById('l5-x').value);
        document.getElementById('l5-fv').textContent = f;
        document.getElementById('l5-bv').textContent = B.toFixed(2);
        document.getElementById('l5-dv').textContent = d;
        document.getElementById('l5-xv').textContent = X.toFixed(1);

        const Z = (f * B) / d;
        const cx = 320, cy = 240;
        const u = f * (X / Z) + cx;

        ctx.clearRect(0, 0, cv.width, cv.height);
        // Plot Z = f*B / disp curve for disp in [4..90]
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1;
        for (let g = 40; g < 220; g += 40) {
          ctx.beginPath(); ctx.moveTo(40, g); ctx.lineTo(500, g); ctx.stroke();
        }
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let px = 4; px <= 90; px += 2) {
          const zVal = Math.min(25, (f * B) / px);
          const xPlot = 40 + ((px - 4) / 86) * 450;
          const yPlot = 195 - (zVal / 25) * 165;
          if (px === 4) ctx.moveTo(xPlot, yPlot);
          else ctx.lineTo(xPlot, yPlot);
        }
        ctx.stroke();

        // Current point
        const xCur = 40 + ((d - 4) / 86) * 450;
        const yCur = 195 - (Math.min(25, Z) / 25) * 165;
        ctx.fillStyle = '#facc15';
        ctx.beginPath(); ctx.arc(xCur, yCur, 6, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = '#e2e8f0';
        ctx.font = '12px monospace';
        ctx.fillText(`Depth Z(d) curve — d=${d}px => Z=${Z.toFixed(2)}m`, 46, 22);
        ctx.fillText('Disparity d (4 -> 90 px)', 190, 212);

        document.getElementById('l5-out').innerHTML =
          `Z = (${f} × ${B.toFixed(2)}) / ${d} = <strong>${Z.toFixed(3)} m</strong> &nbsp;|&nbsp; Projected pixel u (cx=320): <strong>${u.toFixed(1)} px</strong>`;
      }

      ['l5-f', 'l5-b', 'l5-d', 'l5-x'].forEach((id) => document.getElementById(id).addEventListener('input', update));
      update();
    }

    /* ── LAB 6: CNN Output Shape & Softmax Explorer ── */
    function renderLab6(stage, l) {
      stage.innerHTML = `
        <div class="card" style="padding:1.25rem;">
          <h2 style="margin-top:0;">${l === 'uz' ? '6-Lab: Conv2D Chiqish O‘lchami, Parametrlar va Softmax Kalkulyatori' : 'Lab 6: Conv2D Output Shape, Parameters & Softmax Calculator'}</h2>
          <p class="muted">$$O = \\left\\lfloor \\frac{W - K + 2P}{S} \\right\\rfloor + 1, \\quad \\text{Params} = (K^2 \\cdot C_{in} + 1) \\cdot C_{out}$$</p>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:0.75rem;margin-bottom:1rem;">
            <label>W (input): <input type="number" id="c-w" value="224" min="4" max="2048" style="width:100%;"></label>
            <label>C_in: <input type="number" id="c-cin" value="3" min="1" max="2048" style="width:100%;"></label>
            <label>K (kernel): <input type="number" id="c-k" value="3" min="1" max="15" style="width:100%;"></label>
            <label>P (padding): <input type="number" id="c-p" value="1" min="0" max="10" style="width:100%;"></label>
            <label>S (stride): <input type="number" id="c-s" value="1" min="1" max="8" style="width:100%;"></label>
            <label>C_out (filters): <input type="number" id="c-cout" value="64" min="1" max="2048" style="width:100%;"></label>
          </div>
          <div id="l6-cnn-out" class="card" style="padding:0.9rem 1rem;background:var(--bg-subtle);font-family:var(--font-mono);margin-bottom:1.25rem;"></div>

          <h3>Softmax Explorer ($z_1, z_2, z_3$)</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:0.75rem;margin-bottom:0.75rem;">
            <label>Logit z1 (Cat): <strong id="z1v">2.5</strong><input type="range" id="z1" min="-5" max="8" step="0.1" value="2.5" style="width:100%;"></label>
            <label>Logit z2 (Dog): <strong id="z2v">1.2</strong><input type="range" id="z2" min="-5" max="8" step="0.1" value="1.2" style="width:100%;"></label>
            <label>Logit z3 (Car): <strong id="z3v">-0.4</strong><input type="range" id="z3" min="-5" max="8" step="0.1" value="-0.4" style="width:100%;"></label>
          </div>
          <div id="l6-soft-out"></div>
        </div>`;

      function update() {
        const Wv = Math.max(1, Number(document.getElementById('c-w').value));
        const Cin = Math.max(1, Number(document.getElementById('c-cin').value));
        const K = Math.max(1, Number(document.getElementById('c-k').value));
        const P = Math.max(0, Number(document.getElementById('c-p').value));
        const S = Math.max(1, Number(document.getElementById('c-s').value));
        const Cout = Math.max(1, Number(document.getElementById('c-cout').value));

        const O = Math.floor((Wv - K + 2 * P) / S) + 1;
        const params = (K * K * Cin + 1) * Cout;
        document.getElementById('l6-cnn-out').innerHTML =
          `Output Tensor Shape: <strong>(${Cout}, ${O}, ${O})</strong> &nbsp;|&nbsp; Parameters (with bias): <strong>${params.toLocaleString()}</strong>`;

        const z = [Number(document.getElementById('z1').value), Number(document.getElementById('z2').value), Number(document.getElementById('z3').value)];
        ['z1v', 'z2v', 'z3v'].forEach((id, i) => { document.getElementById(id).textContent = z[i].toFixed(1); });
        const maxZ = Math.max(...z);
        const exps = z.map((v) => Math.exp(v - maxZ));
        const sumE = exps.reduce((a, b) => a + b, 0);
        const probs = exps.map((e) => (e / sumE) * 100);
        const names = ['Cat', 'Dog', 'Car'];
        document.getElementById('l6-soft-out').innerHTML = probs.map((p, i) => `
          <div style="margin-bottom:0.45rem;">
            <div style="display:flex;justify-content:space-between;font-size:0.88rem;"><span>${names[i]}</span><strong>${p.toFixed(1)}%</strong></div>
            <div style="height:10px;border-radius:99px;background:var(--bg-subtle);overflow:hidden;">
              <div style="height:100%;width:${p.toFixed(1)}%;background:var(--accent);"></div>
            </div>
          </div>`).join('');
      }

      ['c-w', 'c-cin', 'c-k', 'c-p', 'c-s', 'c-cout', 'z1', 'z2', 'z3'].forEach((id) => document.getElementById(id).addEventListener('input', update));
      update();
    }

    /* ── LAB 7: Interactive IoU, Dice & Confusion Matrix ── */
    function renderLab7(stage, l) {
      stage.innerHTML = `
        <div class="card" style="padding:1.25rem;">
          <h2 style="margin-top:0;">${l === 'uz' ? '7-Lab: Interaktiv IoU / Dice Kalkulyatori va Adashish Matritsasi' : 'Lab 7: Interactive IoU / Dice Canvas & Confusion Matrix'}</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.25rem;align-items:start;">
            <div>
              <canvas id="l7-canvas" width="280" height="220" style="width:100%;max-width:300px;border-radius:10px;border:1px solid var(--border);background:#0f172a;"></canvas>
              <div style="display:grid;gap:0.45rem;margin-top:0.65rem;">
                <label>Pred X: <input type="range" id="b-x" min="10" max="160" value="95" style="width:100%;"></label>
                <label>Pred Y: <input type="range" id="b-y" min="10" max="110" value="65" style="width:100%;"></label>
                <label>Pred W: <input type="range" id="b-w" min="30" max="140" value="95" style="width:100%;"></label>
              </div>
              <div id="l7-iou-res" class="badge badge-accent" style="margin-top:0.6rem;"></div>
            </div>
            <div>
              <h3 style="margin-top:0;">${l === 'uz' ? 'Adashish Matritsasi (Confusion Matrix)' : 'Confusion Matrix Metrics'}</h3>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.6rem;margin-bottom:0.85rem;">
                <label>TP: <input type="number" id="cm-tp" value="85" min="0" style="width:100%;"></label>
                <label>FP: <input type="number" id="cm-fp" value="15" min="0" style="width:100%;"></label>
                <label>FN: <input type="number" id="cm-fn" value="10" min="0" style="width:100%;"></label>
                <label>TN: <input type="number" id="cm-tn" value="90" min="0" style="width:100%;"></label>
              </div>
              <div id="l7-cm-out" class="card" style="padding:0.9rem;background:var(--bg-subtle);font-family:var(--font-mono);font-size:0.88rem;line-height:1.7;"></div>
            </div>
          </div>
        </div>`;

      const cv = document.getElementById('l7-canvas');
      const ctx = cv.getContext('2d');
      const gt = { x: 60, y: 45, w: 100, h: 90 };

      function update() {
        const px = Number(document.getElementById('b-x').value);
        const py = Number(document.getElementById('b-y').value);
        const pw = Number(document.getElementById('b-w').value);
        const ph = 90;

        ctx.clearRect(0, 0, cv.width, cv.height);
        ctx.fillStyle = 'rgba(16,185,129,0.28)';
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.fillRect(gt.x, gt.y, gt.w, gt.h);
        ctx.strokeRect(gt.x, gt.y, gt.w, gt.h);

        ctx.fillStyle = 'rgba(6,182,212,0.28)';
        ctx.strokeStyle = '#06b6d4';
        ctx.fillRect(px, py, pw, ph);
        ctx.strokeRect(px, py, pw, ph);

        const ix1 = Math.max(gt.x, px), iy1 = Math.max(gt.y, py);
        const ix2 = Math.min(gt.x + gt.w, px + pw), iy2 = Math.min(gt.y + gt.h, py + ph);
        const inter = Math.max(0, ix2 - ix1) * Math.max(0, iy2 - iy1);
        if (inter > 0) {
          ctx.fillStyle = 'rgba(250,204,21,0.45)';
          ctx.fillRect(ix1, iy1, ix2 - ix1, iy2 - iy1);
        }
        const union = gt.w * gt.h + pw * ph - inter;
        const iou = union > 0 ? inter / union : 0;
        const dice = (gt.w * gt.h + pw * ph) > 0 ? (2 * inter) / (gt.w * gt.h + pw * ph) : 0;

        ctx.fillStyle = '#e2e8f0';
        ctx.font = '12px monospace';
        ctx.fillText('GT (Green)', gt.x, gt.y - 6);
        ctx.fillText('Pred (Cyan)', px, py + ph + 14);
        document.getElementById('l7-iou-res').textContent = `IoU = ${iou.toFixed(3)} (${iou >= 0.5 ? 'TP@0.5' : 'FP@0.5'}) | Dice = ${dice.toFixed(3)}`;

        const tp = Math.max(0, Number(document.getElementById('cm-tp').value));
        const fp = Math.max(0, Number(document.getElementById('cm-fp').value));
        const fn = Math.max(0, Number(document.getElementById('cm-fn').value));
        const tn = Math.max(0, Number(document.getElementById('cm-tn').value));
        const tot = Math.max(1, tp + fp + fn + tn);
        const acc = (tp + tn) / tot;
        const prec = tp + fp > 0 ? tp / (tp + fp) : 0;
        const rec = tp + fn > 0 ? tp / (tp + fn) : 0;
        const f1 = prec + rec > 0 ? (2 * prec * rec) / (prec + rec) : 0;
        document.getElementById('l7-cm-out').innerHTML =
          `Accuracy  = ${(acc * 100).toFixed(1)}%<br>` +
          `Precision = ${(prec * 100).toFixed(1)}%<br>` +
          `Recall    = ${(rec * 100).toFixed(1)}%<br>` +
          `F1-Score  = ${(f1 * 100).toFixed(1)}%`;
      }

      ['b-x', 'b-y', 'b-w', 'cm-tp', 'cm-fp', 'cm-fn', 'cm-tn'].forEach((id) => document.getElementById(id).addEventListener('input', update));
      update();
    }

    /* ── HANDOUT CHEAT SHEETS (1–3 Tarqatma) ── */
    function renderCheatsheets(stage, l) {
      const cs = CHEATSHEETS[l] || CHEATSHEETS.uz;
      stage.innerHTML = `
        <div style="display:grid;gap:1.15rem;">
          <div class="card" style="padding:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:0.75rem;flex-wrap:wrap;">
              <h2 style="margin:0;">${escHtml(cs.sheet1Title)}</h2>
              <button type="button" class="btn btn-outline btn-sm" id="copy-sheet1">📋 Copy Python</button>
            </div>
            <pre style="margin-top:0.85rem;padding:1rem;border-radius:10px;background:#0f172a;color:#e2e8f0;overflow:auto;"><code>${escHtml(cs.sheet1Code)}</code></pre>
          </div>

          <div class="card" style="padding:1.25rem;">
            <h2 style="margin-top:0;">${escHtml(cs.sheet2Title)}</h2>
            <div class="table-wrap">
              <table class="data-table">
                <thead><tr><th>${l === 'uz' ? 'Mavzu' : 'Topic'}</th><th>Formula</th><th>${l === 'uz' ? 'Izoh' : 'Notes'}</th></tr></thead>
                <tbody>
                  ${cs.formulas.map((f) => `<tr><td><strong>${escHtml(f.name)}</strong></td><td>$${f.tex}$</td><td>${escHtml(f.desc)}</td></tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <div class="card" style="padding:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:0.75rem;flex-wrap:wrap;">
              <h2 style="margin:0;">${escHtml(cs.reportTitle)}</h2>
              <button type="button" class="btn btn-outline btn-sm" id="copy-sheet3">📋 Copy Template</button>
            </div>
            <pre style="margin-top:0.85rem;padding:1rem;border-radius:10px;background:var(--bg-subtle);overflow:auto;white-space:pre-wrap;">${escHtml(cs.reportText)}</pre>
          </div>
        </div>`;

      document.getElementById('copy-sheet1').addEventListener('click', () => {
        navigator.clipboard && navigator.clipboard.writeText(cs.sheet1Code);
      });
      document.getElementById('copy-sheet3').addEventListener('click', () => {
        navigator.clipboard && navigator.clipboard.writeText(cs.reportText);
      });
    }

    drawShell();
    window.addEventListener('cv:langchange', drawShell);
  }

  window.CV_PRACTICE_ENGINE = { initPracticePage };
})();
