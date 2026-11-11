// Interactive Vanilla-JS Canvas/SVG Widgets for Computer Vision Lectures & Slides (KOK1506)
(function () {
  function getLang() {
    return window.CV_APP ? window.CV_APP.getLang() : 'uz';
  }

  function renderWidget(container, widgetId) {
    if (!container || !widgetId) return;
    const lang = getLang();
    const builders = {
      'cv-pipeline': buildCvPipelineWidget,
      'pixel-matrix': buildPixelMatrixWidget,
      'color-space': buildColorSpaceWidget,
      'conv-sim': buildConvSimWidget,
      'denoise-sim': buildDenoiseSimWidget,
      'edge-canny': buildEdgeCannyWidget,
      'harris-sim': buildHarrisWidget,
      'ransac-sim': buildRansacWidget,
      'homography-sim': buildHomographyWidget,
      'pinhole-sim': buildPinholeWidget,
      'stereo-sim': buildStereoWidget,
      'integral-sim': buildIntegralWidget,
      'cm-metrics': buildCmMetricsWidget,
      'knn-svm': buildKnnSvmWidget,
      'cnn-shape': buildCnnShapeWidget,
      'softmax-sim': buildSoftmaxWidget,
      'resnet-skip': buildResnetWidget,
      'iou-sim': buildIouWidget,
      'seg-dice': buildSegDiceWidget,
      'optflow-sim': buildOptFlowWidget,
      'vit-patch': buildVitPatchWidget
    };
    const fn = builders[widgetId];
    if (fn) fn(container, lang);
  }

  function boxStyle() {
    return 'background:var(--sw-panel, #0f172a);border:1px solid var(--sw-border, #334155);border-radius:14px;padding:16px 18px;color:var(--sw-text, #e2e8f0);text-align:left;font-size:16px;';
  }

  function btnStyle(active) {
    return `padding:6px 12px;border-radius:8px;border:1px solid ${active ? '#06b6d4' : 'var(--sw-border, #334155)'};background:${active ? '#06b6d4' : 'var(--sw-btn, #1e293b)'};color:${active ? '#06101e' : 'var(--sw-text, #e2e8f0)'};font-weight:700;font-size:14px;cursor:pointer;`;
  }

  // 1. CV Pipeline & Paradigm Explorer (M1)
  function buildCvPipelineWidget(el, lang) {
    const stages = [
      { n: 1, uz: 'Dastlabki ishlov (Preprocessing)', en: 'Preprocessing', dUz: "Shovqinni kamaytirish (Gauss/Median), o'lchamni normallashtirish (224×224), rang fazosini o'zgartirish (RGB→HSV).", dEn: 'Noise suppression (Gaussian/Median), resizing (224×224), and color space conversion (RGB→HSV).' },
      { n: 2, uz: 'Xususiyat ajratish (Features)', en: 'Feature Extraction', dUz: "Klassik: Canny chekkalar, Harris burchaklar, SIFT/ORB/HOG. Chuqur o'qitish: CNN qatlamlari avtomatik xususiyat xaritalarini o'rganadi.", dEn: 'Classical: Canny edges, Harris corners, SIFT/ORB/HOG. Deep Learning: CNN layers learn hierarchical feature maps automatically.' },
      { n: 3, uz: 'Qaror qabul qilish (Decision)', en: 'Decision Making', dUz: 'Klassifikatsiya (SVM/k-NN/Softmax), Obyekt aniqlash (Faster R-CNN/YOLO), Segmentatsiya (U-Net/Mask R-CNN), Kuzatuv (DeepSORT).', dEn: 'Classification (SVM/k-NN/Softmax), Detection (Faster R-CNN/YOLO), Segmentation (U-Net/Mask R-CNN), Tracking (DeepSORT).' },
      { n: 4, uz: 'Baholash (Metrics & Trade-off)', en: 'Evaluation & Trade-off', dUz: "Aniqlik (Accuracy, mAP, mIoU, Dice) va Real vaqt tezligi (FPS ≥ 24–30, latency ms) o'rtasidagi muvozanat.", dEn: 'Balancing accuracy (mAP, mIoU, Dice) against real-time speed (FPS ≥ 24–30, latency in ms).' }
    ];
    let active = 0;
    function draw() {
      const s = stages[active];
      el.innerHTML = `<div style="${boxStyle()}">
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;">
          ${stages.map((st, i) => `<button type="button" data-idx="${i}" style="${btnStyle(i === active)}">${st.n}. ${st[lang]}</button>`).join('')}
        </div>
        <div style="background:var(--sw-sub, #162033);border-left:4px solid #06b6d4;padding:12px;border-radius:0 8px 8px 0;">
          <strong style="color:#22d3ee;">${s.n}. ${s[lang]}</strong>
          <p style="margin:6px 0 0;line-height:1.5;">${lang === 'uz' ? s.dUz : s.dEn}</p>
        </div>
      </div>`;
      el.querySelectorAll('[data-idx]').forEach((b) => { b.onclick = () => { active = Number(b.dataset.idx); draw(); }; });
    }
    draw();
  }

  // 2. Pixel Matrix & Bit-Depth Quantization (M2)
  function buildPixelMatrixWidget(el, lang) {
    let bits = 8;
    const base = [15, 48, 92, 140, 195, 240];
    function draw() {
      const levels = Math.pow(2, bits);
      const step = 256 / levels;
      const quant = base.map((v) => Math.min(255, Math.floor(v / step) * step));
      const size1080 = ((1920 * 1080 * 3 * bits) / 8 / (1024 * 1024)).toFixed(2);
      el.innerHTML = `<div style="${boxStyle()}">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px;">
          <span><strong>${lang === 'uz' ? 'Bit chuqurligi:' : 'Bit Depth:'}</strong> ${bits}-bit (${levels} ${lang === 'uz' ? 'daraja' : 'levels'})</span>
          <div style="display:flex;gap:5px;">
            ${[8, 4, 2, 1].map((b) => `<button type="button" data-bit="${b}" style="${btnStyle(bits === b)}">${b}-bit</button>`).join('')}
          </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:6px;margin:10px 0;">
          ${quant.map((v, idx) => `<div style="background:rgb(${v},${v},${v});color:${v > 128 ? '#090f1d' : '#f1f5f9'};padding:10px 4px;border-radius:6px;text-align:center;font-family:monospace;font-size:13px;border:1px solid #334155;">${base[idx]}→<b>${Math.round(v)}</b></div>`).join('')}
        </div>
        <div style="font-size:13px;color:#94a3b8;">
          1920×1080 RGB ${lang === 'uz' ? 'xom hajmi:' : 'raw memory:'} <strong style="color:#22d3ee;">${size1080} MB</strong>
          ${bits <= 2 ? (lang === 'uz' ? ' · ⚠️ Posterizatsiya (banding) kuchli!' : ' · ⚠️ Severe posterization (banding)!') : ''}
        </div>
      </div>`;
      el.querySelectorAll('[data-bit]').forEach((b) => { b.onclick = () => { bits = Number(b.dataset.bit); draw(); }; });
    }
    draw();
  }

  // 3. RGB -> HSV / Grayscale / YCbCr Converter (M3)
  function buildColorSpaceWidget(el, lang) {
    let r = 200, g = 100, b = 50;
    function toHsv(R, G, B) {
      const rp = R / 255, gp = G / 255, bp = B / 255;
      const cmax = Math.max(rp, gp, bp), cmin = Math.min(rp, gp, bp), d = cmax - cmin;
      let h = 0;
      if (d > 0) {
        if (cmax === rp) h = 60 * (((gp - bp) / d) % 6);
        else if (cmax === gp) h = 60 * ((bp - rp) / d + 2);
        else h = 60 * ((rp - gp) / d + 4);
      }
      if (h < 0) h += 360;
      const s = cmax === 0 ? 0 : (d / cmax) * 100;
      const v = cmax * 100;
      return { h: Math.round(h), hCv: Math.round(h / 2), s: s.toFixed(1), v: v.toFixed(1) };
    }
    function update() {
      const hsv = toHsv(r, g, b);
      const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
      const y = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
      const cb = Math.round(128 - 0.1687 * r - 0.3313 * g + 0.5 * b);
      const cr = Math.round(128 + 0.5 * r - 0.4187 * g - 0.0813 * b);
      const sw = el.querySelector('#cs-swatch');
      const out = el.querySelector('#cs-out');
      if (sw) sw.style.background = `rgb(${r},${g},${b})`;
      if (out) {
        out.innerHTML = `
          <div><strong>RGB:</strong> (${r}, ${g}, ${b}) · <strong>OpenCV BGR:</strong> [${b}, ${g}, ${r}]</div>
          <div><strong>Grayscale:</strong> Y = 0.299R + 0.587G + 0.114B = <span style="color:#22d3ee;">${gray}</span></div>
          <div><strong>HSV:</strong> H=${hsv.h}° (OpenCV: <b>${hsv.hCv}</b>/179), S=${hsv.s}%, V=${hsv.v}%</div>
          <div><strong>YCbCr:</strong> Y=${y}, Cb=${cb}, Cr=${cr}</div>`;
      }
    }
    el.innerHTML = `<div style="${boxStyle()}">
      <div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap;">
        <div id="cs-swatch" style="width:70px;height:70px;border-radius:12px;border:2px solid #475569;flex-shrink:0;"></div>
        <div style="flex:1;min-width:200px;display:grid;gap:4px;font-size:13px;">
          <label>R: <span id="lbl-r">${r}</span> <input type="range" id="sl-r" min="0" max="255" value="${r}" style="width:100%;"></label>
          <label>G: <span id="lbl-g">${g}</span> <input type="range" id="sl-g" min="0" max="255" value="${g}" style="width:100%;"></label>
          <label>B: <span id="lbl-b">${b}</span> <input type="range" id="sl-b" min="0" max="255" value="${b}" style="width:100%;"></label>
        </div>
      </div>
      <div id="cs-out" style="margin-top:10px;padding:10px;background:var(--sw-sub,#162033);border-radius:8px;font-size:13.5px;line-height:1.55;"></div>
    </div>`;
    ['r', 'g', 'b'].forEach((ch) => {
      el.querySelector('#sl-' + ch).oninput = (e) => {
        const val = Number(e.target.value);
        if (ch === 'r') r = val; if (ch === 'g') g = val; if (ch === 'b') b = val;
        el.querySelector('#lbl-' + ch).textContent = val;
        update();
      };
    });
    update();
  }

  // 4. 2D Convolution Kernel Simulator (M4)
  function buildConvSimWidget(el, lang) {
    const img = [
      [10, 10, 90, 90, 90],
      [10, 20, 80, 90, 90],
      [10, 20, 80, 90, 90],
      [10, 10, 90, 90, 90],
      [10, 10, 90, 90, 90]
    ];
    const kernels = {
      mean: { name: 'Mean 3×3', div: 9, k: [[1, 1, 1], [1, 1, 1], [1, 1, 1]] },
      gauss: { name: 'Gauss 3×3', div: 16, k: [[1, 2, 1], [2, 4, 2], [1, 2, 1]] },
      sobelX: { name: 'Sobel Gx', div: 1, k: [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]] },
      sharpen: { name: 'Sharpen', div: 1, k: [[0, -1, 0], [-1, 5, -1], [0, -1, 0]] }
    };
    let mode = 'sobelX';
    function draw() {
      const ker = kernels[mode];
      let sum = 0;
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) sum += img[i + 1][j + 1] * ker.k[i][j];
      const out = (sum / ker.div).toFixed(1);
      el.innerHTML = `<div style="${boxStyle()}">
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;">
          ${Object.keys(kernels).map((m) => `<button type="button" data-km="${m}" style="${btnStyle(m === mode)}">${kernels[m].name}</button>`).join('')}
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:14px;align-items:center;">
          <div>
            <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">3×3 ${lang === 'uz' ? 'Oyna' : 'Patch'}</div>
            <table style="border-collapse:collapse;font-family:monospace;font-size:13px;">
              ${[1, 2, 3].map((r) => `<tr>${[1, 2, 3].map((c) => `<td style="border:1px solid #334155;padding:5px 8px;background:#162033;">${img[r][c]}</td>`).join('')}</tr>`).join('')}
            </table>
          </div>
          <span style="font-size:20px;color:#22d3ee;">∗</span>
          <div>
            <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">Kernel ${ker.div > 1 ? `(÷${ker.div})` : ''}</div>
            <table style="border-collapse:collapse;font-family:monospace;font-size:13px;">
              ${ker.k.map((row) => `<tr>${row.map((v) => `<td style="border:1px solid #06b6d4;padding:5px 8px;color:#22d3ee;">${v}</td>`).join('')}</tr>`).join('')}
            </table>
          </div>
          <span style="font-size:20px;color:#22d3ee;">=</span>
          <div style="background:var(--sw-sub,#162033);padding:10px 14px;border-radius:10px;border:1px solid #06b6d4;">
            <div style="font-size:12px;color:#94a3b8;">${lang === 'uz' ? 'Markaziy chiqish:' : 'Center Output:'}</div>
            <div style="font-size:22px;font-weight:800;color:#22d3ee;font-family:monospace;">${out}</div>
          </div>
        </div>
      </div>`;
      el.querySelectorAll('[data-km]').forEach((b) => { b.onclick = () => { mode = b.dataset.km; draw(); }; });
    }
    draw();
  }

  // 5. Median vs Mean on Salt-and-Pepper Noise (M5)
  function buildDenoiseSimWidget(el, lang) {
    let outlier = 255;
    function draw() {
      const patch = [[10, 12, 11], [13, outlier, 14], [12, 13, 11]];
      const flat = patch.flat().sort((a, b) => a - b);
      const meanVal = (flat.reduce((a, b) => a + b, 0) / 9).toFixed(1);
      const medVal = flat[4];
      el.innerHTML = `<div style="${boxStyle()}">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px;">
          <span><strong>${lang === 'uz' ? 'Markaziy piksel (shovqin):' : 'Center Pixel (impulse):'}</strong> ${outlier}</span>
          <div style="display:flex;gap:6px;">
            <button type="button" data-ov="255" style="${btnStyle(outlier === 255)}">Salt (255)</button>
            <button type="button" data-ov="0" style="${btnStyle(outlier === 0)}">Pepper (0)</button>
            <button type="button" data-ov="12" style="${btnStyle(outlier === 12)}">${lang === 'uz' ? 'Toza (12)' : 'Clean (12)'}</button>
          </div>
        </div>
        <div style="font-size:13px;margin-bottom:8px;"><strong>Sorted:</strong> [${flat.map((v, i) => i === 4 ? `<span style="color:#10b981;font-weight:800;">${v}</span>` : v).join(', ')}]</div>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <div style="flex:1;background:var(--sw-sub,#162033);padding:10px;border-radius:8px;">
            <div style="font-size:12px;color:#94a3b8;">Mean 3×3</div>
            <div style="font-size:19px;font-weight:800;color:${outlier === 12 ? '#10b981' : '#f87171'};">${meanVal}</div>
          </div>
          <div style="flex:1;background:var(--sw-sub,#162033);padding:10px;border-radius:8px;border:1px solid #10b981;">
            <div style="font-size:12px;color:#94a3b8;">Median 3×3</div>
            <div style="font-size:19px;font-weight:800;color:#10b981;">${medVal}</div>
          </div>
        </div>
      </div>`;
      el.querySelectorAll('[data-ov]').forEach((b) => { b.onclick = () => { outlier = Number(b.dataset.ov); draw(); }; });
    }
    draw();
  }

  // 6. Canny 5-Stage Explorer (M6)
  function buildEdgeCannyWidget(el, lang) {
    const stages = [
      { n: 1, uz: 'Gauss silliqlash', en: 'Gaussian Smooth', dUz: "Yuqori chastotali shovqinni bostirish (σ odatda 1.0–1.4).", dEn: 'Suppress high-frequency noise before derivatives (σ ≈ 1.0–1.4).' },
      { n: 2, uz: 'Gradient (Sobel)', en: 'Sobel Gradient', dUz: "|∇f|=√(Gx²+Gy²) va yo'nalish θ=arctan(Gy/Gx) hisoblanadi.", dEn: 'Compute magnitude |∇f|=√(Gx²+Gy²) and orientation θ.' },
      { n: 3, uz: 'NMS (Bostirish)', en: 'Non-Max Suppression', dUz: "Gradient yo'nalishi bo'yicha faqat lokal maksimum saqlanadi → 1-piksel yupqa chekka.", dEn: 'Keep only local maxima along gradient direction → 1-px thin edges.' },
      { n: 4, uz: 'Ikkilangan Chegara', en: 'Double Threshold', dUz: "G>T_high → Kuchli; T_low≤G≤T_high → Zaif; G<T_low → O'chiriladi (1:2 yoki 1:3).", dEn: 'Strong (>T_high), Weak (between T_low & T_high), Non-edge (<T_low).' },
      { n: 5, uz: 'Gisterezis', en: 'Hysteresis Tracking', dUz: "Zaif chekkalar faqat kuchli chekkaga 8-qo'shnichilik bilan ulangan bo'lsa saqlanadi.", dEn: 'Keep weak edges only if 8-connected to a strong edge pixel.' }
    ];
    let idx = 0;
    function draw() {
      const s = stages[idx];
      el.innerHTML = `<div style="${boxStyle()}">
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;">
          ${stages.map((st, i) => `<button type="button" data-c="${i}" style="${btnStyle(i === idx)}">${st.n}. ${st[lang]}</button>`).join('')}
        </div>
        <div style="background:var(--sw-sub,#162033);padding:11px;border-left:4px solid #06b6d4;border-radius:0 8px 8px 0;">
          <strong>${s.n}. ${s[lang]}</strong>
          <p style="margin:5px 0 0;font-size:14px;">${lang === 'uz' ? s.dUz : s.dEn}</p>
        </div>
      </div>`;
      el.querySelectorAll('[data-c]').forEach((b) => { b.onclick = () => { idx = Number(b.dataset.c); draw(); }; });
    }
    draw();
  }

  // 7. Harris Corner Eigenvalue Explorer (M7)
  function buildHarrisWidget(el, lang) {
    let l1 = 32, l2 = 32;
    function update() {
      const k = 0.04;
      const R = l1 * l2 - k * Math.pow(l1 + l2, 2);
      let clsUz = 'Tekis mintaqa (Flat)', clsEn = 'Flat Region', col = '#94a3b8';
      if (R > 150) { clsUz = 'Burchak nuqtasi (Corner)'; clsEn = 'Corner Point'; col = '#10b981'; }
      else if (R < -20) { clsUz = 'Chekka (Edge)'; clsEn = 'Edge Region'; col = '#f59e0b'; }
      el.querySelector('#har-out').innerHTML = `
        <div>det(M)=λ₁λ₂ = <b>${l1 * l2}</b> · trace(M)=λ₁+λ₂ = <b>${l1 + l2}</b></div>
        <div>R = det(M) − 0.04·trace(M)² = <b style="color:${col};font-size:18px;">${R.toFixed(1)}</b> → <b style="color:${col};">${lang === 'uz' ? clsUz : clsEn}</b></div>`;
    }
    el.innerHTML = `<div style="${boxStyle()}">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:13px;">
        <label>λ₁: <span id="hl1">${l1}</span><input type="range" id="hr1" min="0" max="50" value="${l1}" style="width:100%;"></label>
        <label>λ₂: <span id="hl2">${l2}</span><input type="range" id="hr2" min="0" max="50" value="${l2}" style="width:100%;"></label>
      </div>
      <div id="har-out" style="margin-top:8px;padding:10px;background:var(--sw-sub,#162033);border-radius:8px;font-size:14px;"></div>
    </div>`;
    el.querySelector('#hr1').oninput = (e) => { l1 = Number(e.target.value); el.querySelector('#hl1').textContent = l1; update(); };
    el.querySelector('#hr2').oninput = (e) => { l2 = Number(e.target.value); el.querySelector('#hl2').textContent = l2; update(); };
    update();
  }

  // 8. RANSAC Iteration Calculator (M8)
  function buildRansacWidget(el, lang) {
    let e = 0.4, s = 4;
    function update() {
      const p = 0.99;
      const inlierProb = Math.pow(1 - e, s);
      const N = inlierProb > 0.0001 ? Math.ceil(Math.log(1 - p) / Math.log(1 - inlierProb)) : 99999;
      el.querySelector('#ran-out').innerHTML = `
        <div>(1 − e)ˢ = (${(1 - e).toFixed(2)})<sup>${s}</sup> = <b>${inlierProb.toFixed(4)}</b></div>
        <div>${lang === 'uz' ? 'Zarur iteratsiyalar (p=99%):' : 'Required Iterations (p=99%):'} <b style="color:#22d3ee;font-size:20px;">N = ${N}</b></div>`;
    }
    el.innerHTML = `<div style="${boxStyle()}">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:13px;">
        <label>${lang === 'uz' ? 'Outlier nisbati e:' : 'Outlier ratio e:'} <span id="re-lbl">${e}</span>
          <input type="range" id="re-sl" min="0.1" max="0.8" step="0.05" value="${e}" style="width:100%;">
        </label>
        <label>${lang === 'uz' ? 'Minimal nuqtalar s:' : 'Minimal sample s:'}
          <select id="rs-sel" style="width:100%;padding:4px;border-radius:6px;background:var(--sw-btn,#1e293b);color:var(--sw-text,#e2e8f0);border:1px solid #334155;">
            <option value="2">s=2 (2D Line)</option>
            <option value="4" selected>s=4 (Homography)</option>
            <option value="8">s=8 (Fundamental Matrix)</option>
          </select>
        </label>
      </div>
      <div id="ran-out" style="margin-top:8px;padding:10px;background:var(--sw-sub,#162033);border-radius:8px;font-size:14px;"></div>
    </div>`;
    el.querySelector('#re-sl').oninput = (ev) => { e = Number(ev.target.value); el.querySelector('#re-lbl').textContent = e; update(); };
    el.querySelector('#rs-sel').onchange = (ev) => { s = Number(ev.target.value); update(); };
    update();
  }

  // 9. Panorama Stitching & Blending Explorer (M9)
  function buildHomographyWidget(el, lang) {
    const modes = [
      { id: 'direct', uz: 'Oddiy Warp (Chok ko\'rinadi)', en: 'Direct Paste (Visible Seam)', descUz: 'Ikkinchi tasvir ustiga to\'g\'ri yoziladi — ekspozitsiya farqi keskin chiziq qoldiradi.', descEn: 'Direct overwrite leaves harsh brightness seams at boundaries.' },
      { id: 'feather', uz: 'Feathering (Chiziqli o\'tish)', en: 'Linear Feathering', descUz: 'Ustma-ust mintaqada masofaga proporsional α-vazn bilan silliq birlashtiradi; harakat bo\'lsa ghosting paydo bo\'ladi.', descEn: 'Distance-weighted linear alpha ramp smooths seam; moving objects cause ghosting.' },
      { id: 'multiband', uz: 'Ko\'p masshtabli (Laplacian)', en: 'Multi-band (Laplacian Pyramid)', descUz: 'Past chastotalarni keng, yuqori chastotalarni tor mintaqada birlashtirib eng tabiiy panorama beradi.', descEn: 'Blends low frequencies widely and high frequencies narrowly for seamless output.' }
    ];
    let active = 'multiband';
    function draw() {
      const m = modes.find((x) => x.id === active);
      el.innerHTML = `<div style="${boxStyle()}">
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;">
          ${modes.map((x) => `<button type="button" data-hm="${x.id}" style="${btnStyle(x.id === active)}">${x[lang]}</button>`).join('')}
        </div>
        <div style="background:var(--sw-sub,#162033);padding:10px;border-radius:8px;font-size:14px;">
          <strong>${m[lang]}:</strong> ${lang === 'uz' ? m.descUz : m.descEn}
        </div>
      </div>`;
      el.querySelectorAll('[data-hm]').forEach((b) => { b.onclick = () => { active = b.dataset.hm; draw(); }; });
    }
    draw();
  }

  // 10. Pinhole 3D -> 2D Projection Simulator (M10)
  function buildPinholeWidget(el, lang) {
    let f = 50, X = 2, Z = 10;
    function update() {
      const x = (f * (X / Z)).toFixed(2);
      el.querySelector('#pin-out').innerHTML = `x = f · (X / Z) = ${f} × (${X} / ${Z}) = <b style="color:#22d3ee;font-size:18px;">${x} mm</b>`;
    }
    el.innerHTML = `<div style="${boxStyle()}">
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;font-size:13px;">
        <label>f (mm): <span id="pf-v">${f}</span><input type="range" id="pf" min="20" max="100" value="${f}" style="width:100%;"></label>
        <label>X (m): <span id="px-v">${X}</span><input type="range" id="px" min="1" max="10" value="${X}" style="width:100%;"></label>
        <label>Z (m): <span id="pz-v">${Z}</span><input type="range" id="pz" min="2" max="25" value="${Z}" style="width:100%;"></label>
      </div>
      <div id="pin-out" style="margin-top:8px;padding:10px;background:var(--sw-sub,#162033);border-radius:8px;font-size:14px;"></div>
    </div>`;
    el.querySelector('#pf').oninput = (e) => { f = Number(e.target.value); el.querySelector('#pf-v').textContent = f; update(); };
    el.querySelector('#px').oninput = (e) => { X = Number(e.target.value); el.querySelector('#px-v').textContent = X; update(); };
    el.querySelector('#pz').oninput = (e) => { Z = Number(e.target.value); el.querySelector('#pz-v').textContent = Z; update(); };
    update();
  }

  // 11. Stereo Vision Disparity -> Depth Calculator (M11)
  function buildStereoWidget(el, lang) {
    let f = 1000, B = 0.1, d = 50;
    function update() {
      const Z = ((f * B) / d).toFixed(2);
      el.querySelector('#st-out').innerHTML = `Z = (f · B) / d = (${f} × ${B.toFixed(2)}) / ${d} = <b style="color:#10b981;font-size:19px;">${Z} m</b>`;
    }
    el.innerHTML = `<div style="${boxStyle()}">
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;font-size:13px;">
        <label>f (px): <span id="sf-v">${f}</span><input type="range" id="sf" min="500" max="1500" step="50" value="${f}" style="width:100%;"></label>
        <label>B (m): <span id="sb-v">${B}</span><input type="range" id="sb" min="0.05" max="0.5" step="0.05" value="${B}" style="width:100%;"></label>
        <label>d (px): <span id="sd-v">${d}</span><input type="range" id="sd" min="5" max="150" step="5" value="${d}" style="width:100%;"></label>
      </div>
      <div id="st-out" style="margin-top:8px;padding:10px;background:var(--sw-sub,#162033);border-radius:8px;font-size:14px;"></div>
    </div>`;
    el.querySelector('#sf').oninput = (e) => { f = Number(e.target.value); el.querySelector('#sf-v').textContent = f; update(); };
    el.querySelector('#sb').oninput = (e) => { B = Number(e.target.value); el.querySelector('#sb-v').textContent = B; update(); };
    el.querySelector('#sd').oninput = (e) => { d = Number(e.target.value); el.querySelector('#sd-v').textContent = d; update(); };
    update();
  }

  // 12. Integral Image O(1) Sum Explorer (M12)
  function buildIntegralWidget(el, lang) {
    const I = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    const II = [[1, 3, 6], [5, 12, 21], [12, 27, 45]];
    const sumBr = II[2][2] - II[0][2] - II[2][0] + II[0][0];
    el.innerHTML = `<div style="${boxStyle()}">
      <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:center;">
        <div>
          <div style="font-size:12px;color:#94a3b8;">Input I (3×3)</div>
          <table style="border-collapse:collapse;font-family:monospace;font-size:13px;">
            ${I.map((r, ri) => `<tr>${r.map((v, ci) => `<td style="border:1px solid #334155;padding:5px 9px;${ri >= 1 && ci >= 1 ? 'background:rgba(6,182,212,0.2);color:#22d3ee;' : ''}">${v}</td>`).join('')}</tr>`).join('')}
          </table>
        </div>
        <div>
          <div style="font-size:12px;color:#94a3b8;">Integral Image II</div>
          <table style="border-collapse:collapse;font-family:monospace;font-size:13px;">
            ${II.map((r) => `<tr>${r.map((v) => `<td style="border:1px solid #334155;padding:5px 9px;">${v}</td>`).join('')}</tr>`).join('')}
          </table>
        </div>
        <div style="flex:1;min-width:200px;background:var(--sw-sub,#162033);padding:10px;border-radius:8px;font-size:13.5px;">
          <strong>${lang === 'uz' ? 'Pastki-o\'ng 2×2 yig\'indisi (O(1)):' : 'Bottom-Right 2×2 Sum in O(1):'}</strong><br>
          <code>II(2,2) − II(0,2) − II(2,0) + II(0,0)</code><br>
          = 45 − 6 − 12 + 1 = <b style="color:#10b981;font-size:17px;">${sumBr}</b> (5+6+8+9=${sumBr})
        </div>
      </div>
    </div>`;
  }

  // 13. Confusion Matrix & Precision/Recall/F1 (M13)
  function buildCmMetricsWidget(el, lang) {
    let tp = 40, fp = 10, fn = 5, tn = 45;
    function update() {
      const prec = tp + fp ? tp / (tp + fp) : 0;
      const rec = tp + fn ? tp / (tp + fn) : 0;
      const f1 = prec + rec ? (2 * prec * rec) / (prec + rec) : 0;
      const acc = (tp + tn + fp + fn) ? (tp + tn) / (tp + tn + fp + fn) : 0;
      el.querySelector('#cm-w-out').innerHTML = `
        Accuracy=<b>${(acc * 100).toFixed(1)}%</b> · Precision=<b>${prec.toFixed(3)}</b> · Recall=<b>${rec.toFixed(3)}</b> · <span style="color:#22d3ee;">F1=<b>${f1.toFixed(3)}</b></span>`;
    }
    el.innerHTML = `<div style="${boxStyle()}">
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;font-size:13px;">
        <label>TP: <input type="number" id="w-tp" value="${tp}" min="0" style="width:100%;padding:4px;border-radius:6px;background:var(--sw-btn,#1e293b);color:var(--sw-text,#e2e8f0);border:1px solid #334155;"></label>
        <label>FP: <input type="number" id="w-fp" value="${fp}" min="0" style="width:100%;padding:4px;border-radius:6px;background:var(--sw-btn,#1e293b);color:var(--sw-text,#e2e8f0);border:1px solid #334155;"></label>
        <label>FN: <input type="number" id="w-fn" value="${fn}" min="0" style="width:100%;padding:4px;border-radius:6px;background:var(--sw-btn,#1e293b);color:var(--sw-text,#e2e8f0);border:1px solid #334155;"></label>
        <label>TN: <input type="number" id="w-tn" value="${tn}" min="0" style="width:100%;padding:4px;border-radius:6px;background:var(--sw-btn,#1e293b);color:var(--sw-text,#e2e8f0);border:1px solid #334155;"></label>
      </div>
      <div id="cm-w-out" style="margin-top:8px;padding:10px;background:var(--sw-sub,#162033);border-radius:8px;font-size:14px;"></div>
    </div>`;
    ['tp', 'fp', 'fn', 'tn'].forEach((id) => {
      el.querySelector('#w-' + id).oninput = (e) => {
        const v = Math.max(0, Number(e.target.value) || 0);
        if (id === 'tp') tp = v; if (id === 'fp') fp = v; if (id === 'fn') fn = v; if (id === 'tn') tn = v;
        update();
      };
    });
    update();
  }

  // 14. k-NN & SVM Margin Explorer (M14)
  function buildKnnSvmWidget(el, lang) {
    let mode = 'knn';
    function draw() {
      const info = mode === 'knn'
        ? (lang === 'uz' ? "k-NN (Lazy learning): Yangi nuqta Q(2,2) uchun eng yaqin 3 qo'shni A(1,2), B(2,3), E(2,1) masofasi 1.0 → 1-sinf!" : 'k-NN (Lazy): 3 nearest neighbors to Q(2,2) are A,B,E at distance 1.0 → Class 1!')
        : (lang === 'uz' ? "SVM + Kernel Trick: Chiziqli ajralmaydigan nuqtalarni RBF yadrosi K(x,y)=exp(-γ‖x-y‖²) yordamida yuqori fazoda maksimal marja bilan ajratadi." : 'SVM + RBF Kernel: Maps non-linearly separable data via K(x,y)=exp(-γ‖x-y‖²) to separate with maximum margin.');
      el.innerHTML = `<div style="${boxStyle()}">
        <div style="display:flex;gap:6px;margin-bottom:10px;">
          <button type="button" data-ks="knn" style="${btnStyle(mode === 'knn')}">k-NN (k=3)</button>
          <button type="button" data-ks="svm" style="${btnStyle(mode === 'svm')}">SVM & Kernel Trick</button>
        </div>
        <div style="background:var(--sw-sub,#162033);padding:10px;border-radius:8px;font-size:14px;">${info}</div>
      </div>`;
      el.querySelectorAll('[data-ks]').forEach((b) => { b.onclick = () => { mode = b.dataset.ks; draw(); }; });
    }
    draw();
  }

  // 15. CNN Output Shape & Parameter Explorer (M16)
  function buildCnnShapeWidget(el, lang) {
    let I = 28, K = 3, P = 1, S = 1;
    function update() {
      const O = Math.floor((I - K + 2 * P) / S) + 1;
      el.querySelector('#cnn-out').innerHTML = `O = ⌊(${I} − ${K} + 2·${P}) / ${S}⌋ + 1 = <b style="color:#22d3ee;font-size:18px;">${O} × ${O}</b>`;
    }
    el.innerHTML = `<div style="${boxStyle()}">
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;font-size:13px;">
        <label>I: <input type="number" id="ci" value="${I}" min="4" max="512" style="width:100%;padding:4px;border-radius:6px;background:var(--sw-btn,#1e293b);color:var(--sw-text,#e2e8f0);border:1px solid #334155;"></label>
        <label>K: <input type="number" id="ck" value="${K}" min="1" max="11" style="width:100%;padding:4px;border-radius:6px;background:var(--sw-btn,#1e293b);color:var(--sw-text,#e2e8f0);border:1px solid #334155;"></label>
        <label>P: <input type="number" id="cp" value="${P}" min="0" max="5" style="width:100%;padding:4px;border-radius:6px;background:var(--sw-btn,#1e293b);color:var(--sw-text,#e2e8f0);border:1px solid #334155;"></label>
        <label>S: <input type="number" id="cs" value="${S}" min="1" max="4" style="width:100%;padding:4px;border-radius:6px;background:var(--sw-btn,#1e293b);color:var(--sw-text,#e2e8f0);border:1px solid #334155;"></label>
      </div>
      <div id="cnn-out" style="margin-top:8px;padding:10px;background:var(--sw-sub,#162033);border-radius:8px;font-size:14px;"></div>
    </div>`;
    ['ci', 'ck', 'cp', 'cs'].forEach((id) => {
      el.querySelector('#' + id).oninput = (e) => {
        const v = Number(e.target.value) || 0;
        if (id === 'ci') I = Math.max(1, v); if (id === 'ck') K = Math.max(1, v);
        if (id === 'cp') P = Math.max(0, v); if (id === 'cs') S = Math.max(1, v);
        update();
      };
    });
    update();
  }

  // 16. Softmax Probability Explorer (M17)
  function buildSoftmaxWidget(el, lang) {
    let z = [2.0, 1.0, 0.1];
    function update() {
      const exps = z.map((v) => Math.exp(v));
      const sum = exps.reduce((a, b) => a + b, 0);
      const probs = exps.map((e) => e / sum);
      el.querySelector('#sm-out').innerHTML = probs.map((p, i) => `
        <div style="margin-bottom:5px;">
          <div style="display:flex;justify-content:space-between;font-size:13px;"><span>Sinf ${i + 1} (z=${z[i].toFixed(1)})</span><b>${(p * 100).toFixed(1)}%</b></div>
          <div style="height:8px;background:#1e293b;border-radius:4px;overflow:hidden;"><div style="width:${(p * 100).toFixed(1)}%;height:100%;background:#06b6d4;"></div></div>
        </div>`).join('');
    }
    el.innerHTML = `<div style="${boxStyle()}">
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;font-size:13px;margin-bottom:8px;">
        <label>z₁: <input type="range" id="sz0" min="-2" max="5" step="0.1" value="${z[0]}" style="width:100%;"></label>
        <label>z₂: <input type="range" id="sz1" min="-2" max="5" step="0.1" value="${z[1]}" style="width:100%;"></label>
        <label>z₃: <input type="range" id="sz2" min="-2" max="5" step="0.1" value="${z[2]}" style="width:100%;"></label>
      </div>
      <div id="sm-out" style="background:var(--sw-sub,#162033);padding:10px;border-radius:8px;"></div>
    </div>`;
    [0, 1, 2].forEach((i) => {
      el.querySelector('#sz' + i).oninput = (e) => { z[i] = Number(e.target.value); update(); };
    });
    update();
  }

  // 17. ResNet Residual Block Explorer (M18)
  function buildResnetWidget(el, lang) {
    let skip = true;
    function draw() {
      el.innerHTML = `<div style="${boxStyle()}">
        <div style="display:flex;gap:8px;margin-bottom:10px;">
          <button type="button" data-rn="1" style="${btnStyle(skip)}">ResNet: y = F(x) + x</button>
          <button type="button" data-rn="0" style="${btnStyle(!skip)}">Plain CNN: y = F(x)</button>
        </div>
        <div style="background:var(--sw-sub,#162033);padding:10px;border-radius:8px;font-size:14px;">
          ${skip
            ? (lang === 'uz' ? "✅ Skip connection tufayli ∂y/∂x = ∂F/∂x + 1 → gradient to'g'ridan-to'g'ri orqaga oqadi (152 qatlamgacha oson o'qitiladi!)." : "✅ Skip connection yields ∂y/∂x = ∂F/∂x + 1 → uninterrupted gradient highway for 152+ layers!")
            : (lang === 'uz' ? "⚠️ 20+ qatlamda gradientlar so'nadi va degradatsiya muammosi yuzaga keladi (o'qitish xatosi ortadi)." : "⚠️ Beyond ~20 layers, plain nets suffer degradation (higher training error).")}
        </div>
      </div>`;
      el.querySelectorAll('[data-rn]').forEach((b) => { b.onclick = () => { skip = b.dataset.rn === '1'; draw(); }; });
    }
    draw();
  }

  // 18. IoU Overlap & YOLO Grid Explorer (M19/M20)
  function buildIouWidget(el, lang) {
    let shift = 2;
    function update() {
      const x1 = Math.max(0, shift), y1 = Math.max(0, shift);
      const x2 = Math.min(4, shift + 4), y2 = Math.min(4, shift + 4);
      const inter = Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
      const union = 16 + 16 - inter;
      const iou = inter / union;
      const pass = iou >= 0.5;
      el.querySelector('#iou-w-out').innerHTML = `
        Intersection=<b>${inter.toFixed(1)}</b> · Union=<b>${union.toFixed(1)}</b> · <b style="color:${pass ? '#10b981' : '#f87171'};font-size:18px;">IoU = ${iou.toFixed(3)}</b> (${pass ? 'TP ✓ ≥ 0.5' : 'FP ✗ < 0.5'})`;
    }
    el.innerHTML = `<div style="${boxStyle()}">
      <label style="font-size:13px;">${lang === 'uz' ? 'Bashorat qutisi siljishi (Δ):' : 'Predicted Box Offset (Δ):'} <span id="io-lbl">${shift}</span>
        <input type="range" id="io-sl" min="0" max="4" step="0.5" value="${shift}" style="width:100%;">
      </label>
      <div id="iou-w-out" style="margin-top:8px;padding:10px;background:var(--sw-sub,#162033);border-radius:8px;font-size:14px;"></div>
    </div>`;
    el.querySelector('#io-sl').oninput = (e) => { shift = Number(e.target.value); el.querySelector('#io-lbl').textContent = shift; update(); };
    update();
  }

  // 19. Dice vs IoU Segmentation Calculator (M21/M22)
  function buildSegDiceWidget(el, lang) {
    let inter = 80;
    function update() {
      const A = 90, B = 100;
      const dice = (2 * inter) / (A + B);
      const iou = inter / (A + B - inter);
      el.querySelector('#sd-w-out').innerHTML = `
        Dice = 2·${inter}/(${A}+${B}) = <b style="color:#22d3ee;">${dice.toFixed(3)}</b> · IoU = ${inter}/(${A}+${B}-${inter}) = <b style="color:#10b981;">${iou.toFixed(3)}</b>`;
    }
    el.innerHTML = `<div style="${boxStyle()}">
      <label style="font-size:13px;">|A ∩ B| (px, |A|=90, |B|=100): <span id="sd-lbl">${inter}</span>
        <input type="range" id="sd-sl" min="10" max="90" step="5" value="${inter}" style="width:100%;">
      </label>
      <div id="sd-w-out" style="margin-top:8px;padding:10px;background:var(--sw-sub,#162033);border-radius:8px;font-size:14px;"></div>
    </div>`;
    el.querySelector('#sd-sl').oninput = (e) => { inter = Number(e.target.value); el.querySelector('#sd-lbl').textContent = inter; update(); };
    update();
  }

  // 20. Lucas-Kanade Optical Flow Constraint Solver (M23)
  function buildOptFlowWidget(el, lang) {
    el.innerHTML = `<div style="${boxStyle()}">
      <div style="font-size:14px;line-height:1.55;">
        <strong>Lucas-Kanade (2 piksel misoli):</strong><br>
        1-piksel: <code>2u + 1v = 3</code> &nbsp;|&nbsp; 2-piksel: <code>1u + 2v = 3</code><br>
        ${lang === 'uz' ? 'Yechim (Aperture muammosini yengish):' : 'Solution (Solving Aperture Problem):'} <b style="color:#10b981;">(u, v) = (1, 1) px/frame</b>
      </div>
    </div>`;
  }

  // 21. ViT Patch Tokenizer (B1)
  function buildVitPatchWidget(el, lang) {
    let pSize = 16;
    function update() {
      const n = Math.pow(224 / pSize, 2);
      el.querySelector('#vit-out').innerHTML = `224×224 ÷ (${pSize}×${pSize}) = <b style="color:#c084fc;font-size:18px;">${n} patch tokens</b> + 1 [CLS] = <b>${n + 1}</b>`;
    }
    el.innerHTML = `<div style="${boxStyle()}">
      <div style="display:flex;gap:6px;margin-bottom:8px;">
        ${[16, 14, 32].map((p) => `<button type="button" data-vp="${p}" style="${btnStyle(p === pSize)}">Patch ${p}×${p}</button>`).join('')}
      </div>
      <div id="vit-out" style="background:var(--sw-sub,#162033);padding:10px;border-radius:8px;font-size:14px;"></div>
    </div>`;
    el.querySelectorAll('[data-vp]').forEach((b) => {
      b.onclick = () => {
        pSize = Number(b.dataset.vp);
        el.querySelectorAll('[data-vp]').forEach((x) => x.style.cssText = btnStyle(Number(x.dataset.vp) === pSize));
        update();
      };
    });
    update();
  }

  window.CV_WIDGETS = { renderWidget };
})();
