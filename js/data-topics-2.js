// M6–M10: Edge Detection, Keypoints/Descriptors, Matching & RANSAC/Hough, Stitching, Projective Geometry
window.CV_TOPICS = window.CV_TOPICS || [];

window.CV_TOPICS.push(
  // ==================== M6 ====================
  {
    id: 6,
    code: 'M6',
    labId: 6,
    hours: 2,
    keywords: ['Edge Detection', 'Gradient', 'Sobel', 'Prewitt', 'Scharr', 'Canny', 'NMS', 'Hysteresis'],
    title: {
      uz: "Chekkalarni aniqlash usullari (Sobel, Prewitt, Canny)",
      en: "Edge Detection: Gradients, Sobel, Prewitt & Canny"
    },
    description: {
      uz: "Gradient vektori (kattalik va yo'nalish), Sobel vs Prewitt vs Scharr operatorlari, Canny algoritmining 5 bosqichi (NMS va gisterezis) va F1-baholash.",
      en: "Image gradients (magnitude & angle), Sobel vs Prewitt vs Scharr, the 5-stage Canny pipeline (NMS & hysteresis), and edge evaluation."
    },
    refs: [
      { label: "COMP4423 L3: Edge Filters", url: "https://github.com/lookwei/COMP4423" },
      { label: "Szeliski Ch. 4.2: Edges", url: "https://szeliski.org/Book/" },
      { label: "OpenCV Canny Tutorial", url: "https://docs.opencv.org" }
    ],
    sections: [
      {
        heading: { uz: "6.1. Chekka Tushunchasi va Gradient Operatorlari (Sobel, Prewitt, Scharr)", en: "6.1. Edge Intuition & Image Gradients (Sobel, Prewitt, Scharr)" },
        bodyHtml: {
          uz: "<p><strong>Chekka (edge)</strong> — tasvirda yorqinlik keskin o'zgaradigan piksel chegaralari (obyekt konturi, soya, tekstura o'tishi). Matematik jihatdan 1-tartibli hosilaning ekstremumi — <strong>gradient vektori</strong> $\\nabla f = [G_x, G_y]^\\top = [\\partial f/\\partial x,\\, \\partial f/\\partial y]^\\top$ maksimal bo'lgan nuqtalardir.</p><p><strong>Prewitt vs Sobel vs Scharr:</strong> <em>Prewitt</em> ($[-1, 0, 1]$) markaziy qatorga bir xil vazn beradi; <strong>Sobel</strong> markaziy qatorga $\\pm 2$ vazn ($[1, 2, 1]$ Gauss silliqlash + $[-1, 0, 1]$ hosila) berib shovqinga ancha chidamliroq bo'ladi; <strong>Scharr</strong> ($3\\times 3$ da $[-3,0,3;-10,0,10;-3,0,3]$) esa burchak simmetriyasini maksimal darajada yaxshilaydi. Barchasi ajraluvchan filtrlardir.</p>",
          en: "<p>An <strong>edge</strong> marks sharp intensity transitions along object boundaries, shadows, or surface discontinuities, corresponding mathematically to peaks in the 2D gradient $\\nabla f = [G_x, G_y]^\\top$.</p><p><strong>Prewitt vs Sobel vs Scharr:</strong> <em>Sobel</em> pairs Gaussian smoothing ($[1,2,1]$) with differentiation ($[-1,0,1]$), beating unsmoothed <em>Prewitt</em> under noise. <em>Scharr</em> optimizes 3×3 rotational isotropy.</p>"
        },
        latex: "|\\nabla f| = \\sqrt{G_x^2 + G_y^2} \\approx |G_x| + |G_y|, \\quad \\theta = \\operatorname{atan2}(G_y, G_x)"
      },
      {
        heading: { uz: "6.2. Ikkinchi Tartibli Hosila (Laplacian, LoG) va Canny 5-Bosqichi", en: "6.2. Laplacian / LoG & Canny 5-Stage Edge Pipeline" },
        bodyHtml: {
          uz: "<p><strong>Laplacian ($\\nabla^2 f = \\partial^2 f/\\partial x^2 + \\partial^2 f/\\partial y^2$):</strong> Ikkinchi hosila chekka markazida <strong>nol kesishish (zero-crossing)</strong> hosil qiladi, lekin shovqinga o'ta sezgir bo'lgani uchun avval Gauss qo'llanadi (<strong>LoG — Laplacian of Gaussian</strong>).</p><p><strong>John Canny (1986) 5 bosqichli algoritmi</strong> (3 mezon: yuqori aniqlash, aniq lokalizatsiya, bitta chekkaga bitta javob):<br>1) <em>Gauss silliqlash</em> ($\\sigma$); 2) <em>Sobel gradienti</em> ($|\\nabla f|, \\theta$); 3) <strong>NMS (Non-Maximum Suppression)</strong> — gradient yo'nalishi bo'ylab faqat lokal cho'qqini qoldirib chekkani 1 piksel qalinlikka keltiradi; 4) <strong>Ikkilangan chegara</strong> ($T_{\\text{high}} / T_{\\text{low}} \\approx 2:1 \\text{ yoki } 3:1$); 5) <strong>Gisterezis kuzatuvi</strong> — kuchli piksellar ($&gt; T_{\\text{high}}$) bilan 8-bog'langan zaif piksellarni ($T_{\\text{low}} \\dots T_{\\text{high}}$) saqlab qolish.</p>",
          en: "<p><strong>Laplacian / LoG:</strong> Second-order derivatives locate edges at zero-crossings but require Gaussian smoothing first (LoG) to tame noise.</p><p><strong>Canny (1986) 5 Stages:</strong> (1) Gaussian blur; (2) Sobel magnitude &amp; angle; (3) <strong>NMS</strong> thinning ridges to 1-pixel edges; (4) <strong>Double Thresholding</strong> ($T_{\\text{high}}:T_{\\text{low}} = 2:1..3:1$); (5) <strong>Hysteresis</strong> linking weak edges connected to strong contours.</p>"
        },
        widget: 'edge-canny'
      },
      {
        heading: { uz: "6.3. Sonli Hisoblash Misoli (Doskada): Sobel Gx, Gy va Burchak θ", en: "6.3. Worked Numerical Example: Sobel Gx, Gy & Orientation" },
        bodyHtml: {
          uz: "<p><strong>Berilgan 3×3 mintaqa:</strong> Chapda qorong'i (10), o'ngda yorug' (90) vertikal chekka: $I = \\begin{bmatrix}10 & 10 & 90\\\\ 10 & 10 & 90\\\\ 10 & 10 & 90\\end{bmatrix}$.<br>• <strong>Sobel $G_x$</strong> ($\\begin{bmatrix}-1&0&1\\\\-2&0&2\\\\-1&0&1\\end{bmatrix}$): $G_x = (-10+90) + (-20+180) + (-10+90) = 80 + 160 + 80 = \\mathbf{320}$.<br>• <strong>Sobel $G_y$</strong> ($\\begin{bmatrix}-1&-2&-1\\\\0&0&0\\\\1&2&1\\end{bmatrix}$): $(-10-20-90) + (10+20+90) = \\mathbf{0}$.<br>• <strong>Kattalik va Yo'nalish:</strong> $|\\nabla f| = \\sqrt{320^2 + 0^2} = \\mathbf{320}$, $\\theta = \\operatorname{atan2}(0, 320) = \\mathbf{0^\\circ}$ (gradient chiziqqa perpendikulyar gorizontal o'ngga yo'nalgan!).<br><em>Eslatma:</em> Agar chap taraf 90, o'ng taraf 10 bo'lsa $G_x = \\mathbf{-320}$ chiqadi — <code>uint8</code> da u <code>0</code> ga kesilib chekka yo'qoladi!</p>",
          en: "<p><strong>Given 3×3 vertical edge:</strong> $I = [[10,10,90],[10,10,90],[10,10,90]]$.<br>• <strong>Sobel $G_x$:</strong> $80 + 160 + 80 = \\mathbf{320}$.<br>• <strong>Sobel $G_y$:</strong> $(-120)+(120) = \\mathbf{0}$.<br>• <strong>Magnitude &amp; Angle:</strong> $|\\nabla f| = \\mathbf{320}$ at $\\theta = \\mathbf{0^\\circ}$ (normal to vertical edge!). Note that dark→bright vs bright→dark flips sign ($\\pm 320$).</p>"
        },
        latex: "G_x = 80+160+80 = 320, \\quad G_y = 0 \\implies |\\nabla f| = 320,\\; \\theta = 0^\\circ"
      },
      {
        heading: { uz: "6.4. Python Kod Tahlili: CV_64F Tuzog'i va Auto-Canny", en: "6.4. Python Walkthrough: CV_64F Pitfall & Median Auto-Canny" },
        bodyHtml: {
          uz: "<p><strong>Keng tarqalgan xato:</strong> <code>cv2.Sobel(gray, cv2.CV_8U, 1, 0)</code> ishlatilganda oq→qora o'tishlar manfiy bo'lib <code>0</code> ga tashlanadi va obyektning yarmi yo'qoladi! Doimo <code>cv2.CV_64F</code> olib, so'ngra <code>cv2.convertScaleAbs()</code> qo'llang. Canny uchun chegaralarni qo'lda tanlamaslik maqsadida mediana asosidagi <strong>Auto-Canny</strong> ($\pm 33\\%$) usuli keng qo'llaniladi.</p>",
          en: "<p><strong>Classic Bug:</strong> Passing <code>cv2.CV_8U</code> drops negative bright-to-dark gradients! Always compute gradients in <code>cv2.CV_64F</code> then take <code>np.absolute</code> / <code>cv2.convertScaleAbs()</code>.</p>"
        },
        code: `import cv2, numpy as np

gray = np.zeros((200, 200), dtype=np.uint8)
gray[:, 70:130] = 200  # Chap chekka (+), O'ng chekka (-)

# 1. TO'G'RI: CV_64F bilan har ikkala chekkani saqlash
gx = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)
gy = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)
mag = cv2.magnitude(gx, gy)

# 2. Auto-Canny (median thresholdlar bilan)
med = np.median(gray)
low, high = int(max(0, 0.67 * med)), int(min(255, 1.33 * med))
edges = cv2.Canny(cv2.GaussianBlur(gray, (5, 5), 1.0), low, high)
print(f"Max grad={mag.max():.1f}, Auto-Canny T=({low}, {high}), Edge px={cv2.countNonZero(edges)}")`
      },
      {
        heading: { uz: "6.5. Keys-Tahlil: Shovqinli Tasvir vs Silliqlangan Canny (F1 Baholash)", en: "6.5. Case Discussion: Edge Evaluation (Precision/Recall/F1) & HED" },
        bodyHtml: {
          uz: "<p>Chekka detektorlarining sifatini (BSDS500 benchmarkida) piksellar darajasida <strong>Precision, Recall va F1-score</strong> bilan baholaymiz. Shuningdek, klassik mahalliy gradientlar tekstura (o't-o'lan, g'isht) ichida ko'p soxta chekkalar bersa, zamonaviy chuqur o'qitish modellaridan <strong>HED (Holistically-Nested Edge Detection)</strong> semantik obyekt chegaralarini ajrata oladi.</p>",
          en: "<p>Edge quality on BSDS500 is evaluated using boundary <strong>Precision, Recall, and F1</strong>. While Sobel/Canny fire heavily on background textures, learned deep detectors like <strong>HED</strong> focus on true semantic object boundaries.</p>"
        },
        discussion: {
          q: { uz: "Agar sizda sanoat detali ustida kuchli silliq metall tirnalishlari bo'lsa, Sobel bilan Canny ga qaraganda yaxshiroq ajratish uchun T_low va T_high ni qanday sozlaysiz?", en: "In industrial metal surface inspection, if hairline scratches are broken up in Canny output, how should you adjust T_low and T_high?" },
          a: { uz: "T_low ni pasaytiramiz (masalan T_high / 3 gacha), shunda kuchli boshlang'ich qismlarga ulangan zaif tirnalish chiziqlari gisterezis orqali uzilmasdan saqlanib qoladi; shuningdek σ ni kichikroq (0.8–1.0) tanlaymiz.", en: "Lower T_low (e.g., down to T_high / 3) so hysteresis bridges faint hairline segments connected to strong cracks, and keep Gaussian σ modest (0.8–1.0) to avoid erasing thin scratches." }
        }
      }
    ],
    slides: [
      { title: { uz: "6.1. Chekka Nima va Gradient Vektori?", en: "6.1. What Is an Edge & Image Gradient?" }, points: { uz: ["Chekka — yorqinlik keskin o'zgaradigan fazoviy chegara", "1D da hosilaning ekstremumi; 2D da gradient ∇f = [Gx, Gy] kattaligi", "Gradient yo'nalishi θ chekka chizig'iga doimo PERPENDIKULYAR", "Foyda: Kadrdagi 90%+ ma'lumot siqilib faqat konturlar qoladi"], en: ["Edge = rapid intensity discontinuity (boundary, shadow, crease)", "2D Gradient ∇f = [∂f/∂x, ∂f/∂y] magnitude & orientation", "Gradient vector is always PERPENDICULAR to the edge contour"] } },
      { title: { uz: "Gradient Operatorlari: Prewitt vs Sobel vs Scharr", en: "Derivative Operators: Prewitt vs Sobel vs Scharr" }, latex: "G_x^{\\text{Sobel}}=\\begin{bmatrix}-1&0&1\\\\-2&0&2\\\\-1&0&1\\end{bmatrix}, \\quad G_x^{\\text{Scharr}}=\\begin{bmatrix}-3&0&3\\\\-10&0&10\\\\-3&0&3\\end{bmatrix}", points: { uz: ["Prewitt (±1): eng sodda, shovqinga nisbatan zaif", "Sobel ([1,2,1] × [-1,0,1]): ajraluvchan silliqlangan hosila", "Scharr (±3, ±10): 3×3 da diagonal/burchak simmetriyasi eng aniq"], en: ["Prewitt (±1): unsmoothed difference", "Sobel: Gaussian-weighted orthogonal smoothing reduces noise", "Scharr: superior 3×3 rotational symmetry"] } },
      { title: { uz: "Ikkinchi Hosila: Laplacian & LoG (Zero-Crossing)", en: "Second-Order Edges: Laplacian & LoG" }, latex: "\\nabla^2 f = \\frac{\\partial^2 f}{\\partial x^2} + \\frac{\\partial^2 f}{\\partial y^2}, \\quad K_{\\text{Lap}}=\\begin{bmatrix}0&1&0\\\\1&-4&1\\\\0&1&0\\end{bmatrix}", points: { uz: ["1-hosila cho'qqisi = 2-hosilaning nol kesishishi (Zero-Crossing)", "Izotropik (yo'nalishga bog'liq emas), lekin shovqinni 2× kuchaytiradi", "Yechim: LoG (Laplacian of Gaussian) — avval Gauss blur, keyin Laplacian"], en: ["1st-derivative peak = 2nd-derivative zero-crossing", "Isotropic, yet amplifies high-frequency noise strongly", "LoG smooths with Gaussian before taking Laplacian"] } },
      { title: { uz: "Canny Algoritmining 5 Bosqichi (1986)", en: "The 5-Stage Canny Edge Detector (1986)" }, points: { uz: ["1. Gauss silliqlash (σ) — soxta shovqin cho'qqilarini yo'qotish", "2. Sobel gradienti — kattalik M va burchak θ (0°, 45°, 90°, 135°)", "3. NMS (Non-Maximum Suppression) — qalin chekkani 1 piksel qilish", "4. Ikkilangan chegara (T_low, T_high ≈ 1:2..1:3)", "5. Gisterezis — kuchli chekkaga bog'langan zaif piksellarni ulash"], en: ["1. Gaussian Smoothing (σ) suppresses noise peaks", "2. Sobel Magnitude M & Quantized Direction θ", "3. Non-Maximum Suppression → 1-pixel thin edges", "4. Double Thresholding (Strong, Weak, Suppress)", "5. Hysteresis links Weak edges touching Strong contours"] } },
      { title: { uz: "Interaktiv Canny 5-Bosqich Steperi", en: "Interactive 5-Stage Canny Explorer" }, widget: 'edge-canny' },
      { title: { uz: "NMS va Gisterezis Mexanizmi Chuqurroq", en: "Deep Dive: NMS & Hysteresis Tracking" }, table: { headers: { uz: ["Qiymat diapazoni", "Toifa", "Gisterezis qarori"], en: ["Magnitude Range", "Category", "Hysteresis Action"] }, rows: { uz: [["M ≥ T_high", "Kuchli chekka (Strong)", "100% saqlanadi (255)"], ["T_low ≤ M < T_high", "Zaif chekka (Weak)", "Kuchliga 8-qo'shni bo'lsagina saqlanadi"], ["M < T_low", "Shovqin (Non-edge)", "To'liq o'chiriladi (0)"]], en: [["M ≥ T_high", "Strong Edge", "Always kept (255)"], ["T_low ≤ M < T_high", "Weak Edge", "Kept ONLY if connected to Strong edge"], ["M < T_low", "Non-edge", "Suppressed (0)"]] } } },
      { title: { uz: "Sonli Misol (Doskada): Sobel Gx, Gy va θ", en: "Worked Example: Sobel Gradient & Angle" }, points: { uz: ["3×3 mintaqa: chap ustunlar 10, o'ng ustun 90 (vertikal chekka)", "Gx = (-10+90) + (-20+180) + (-10+90) = 80 + 160 + 80 = +320", "Gy = (-10-20-90) + (10+20+90) = 0", "Kattalik |∇f| = √(320² + 0²) = 320, burchak θ = 0° (o'ngga!)"], en: ["Window: columns [10, 10, 90] × 3 rows", "Gx = 80 + 160 + 80 = +320, Gy = 0", "|∇f| = 320, θ = atan2(0, 320) = 0° (orthogonal to vertical edge!)"] } },
      { title: { uz: "Python Kod: CV_64F Xatosi vs To'g'ri Sobel/Canny", en: "Python Code: Avoiding CV_8U Gradient Clipping" }, code: `# XATO: cv2.Sobel(gray, cv2.CV_8U, 1, 0) manfiy chekkani 0 qiladi!
gx = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)
gy = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)
mag = np.uint8(np.clip(cv2.magnitude(gx, gy), 0, 255))
edges = cv2.Canny(cv2.GaussianBlur(gray, (5,5), 1.0), 50, 150)` },
      { title: { uz: "Chekkalarni Baholash (F1) va Klassik vs HED", en: "Edge Benchmarks (BSDS500 F1) & Deep HED" }, points: { uz: ["Chekka aniqlash piksel Precision, Recall va F1 bilan baholanadi", "Canny teksturali fonda (o't-o'lan) ham kuchli javob beradi", "HED (Holistically-Nested Edge Detection) faqat semantik obyekt chekkalarini ajratadi"], en: ["Evaluated on BSDS500 via boundary Precision, Recall & F1", "Canny fires on clutter textures; Deep HED learns semantic contours"] } },
      { title: { uz: "Muhokama: Tirnalishlarni Aniqlashda T_low / T_high", en: "Discussion: Tuning Hysteresis for Micro-Cracks" }, discussion: { q: { uz: "Metall sirtidagi ingichka yoriqlar Canny natijasida uzuk-uzuk chiqsa, σ va T_low parametrlarini qaysi tomonga o'zgartirasiz?", en: "If fine metal cracks look broken in Canny output, how do you tune σ and T_low?" }, a: { uz: "T_low ni pasaytiramiz (masalan T_high/3 gacha) — gisterezis zaif qismlarni bog'laydi; shuningdek σ ni kichraytiramiz (blur ingichka yoriqni o'chirmasligi uchun).", en: "Reduce T_low so hysteresis connects faint crack segments, and reduce Gaussian σ so thin cracks aren't blurred away." } } }
    ],
    glossary: [
      { uz: "gradiyent", en: "gradient", defUz: "Yorqinlik o'zgarish tezligi va yo'nalishi [Gx, Gy]", defEn: "Vector of directional intensity derivatives [Gx, Gy]" },
      { uz: "NMS", en: "Non-Maximum Suppression", defUz: "Gradient yo'nalishi bo'yicha faqat eng kuchli lokal pikselni qoldirish", defEn: "Thinning edges to 1-pixel width by keeping local maxima" },
      { uz: "gisterezis", en: "hysteresis", defUz: "Zaif chekkalarni kuchli chekkaga ulangan holdagina saqlash", defEn: "Linking weak edge segments connected to strong edges" }
    ],
    quiz: [
      { q: { uz: "Canny algoritmidagi Non-Maximum Suppression (NMS) bosqichi qanday natija beradi?", en: "What does Non-Maximum Suppression (NMS) accomplish in Canny edge detection?" }, options: [{ label: 'A', uz: "Tasvirni rangli qiladi", en: "Colorizes the image" }, { label: 'B', uz: "Qalin chekkalarni 1 piksel qalinlikdagi yupqa chiziqqa keltiradi", en: "Thins thick gradient ridges into 1-pixel edges" }, { label: 'C', uz: "Shovqin qo'shadi", en: "Adds Gaussian noise" }, { label: 'D', uz: "Tasvirni kichraytiradi", en: "Downsamples image" }], answer: 'B', explanation: { uz: "NMS gradient yo'nalishi bo'yicha faqat lokal maksimum piksellarni qoldiradi.", en: "NMS suppresses non-peak responses along the gradient normal." } },
      { q: { uz: "Canny algoritmida T_high va T_low nisbati odatda qanday tanlanadi?", en: "What is the standard T_high : T_low ratio in Canny edge detection?" }, options: [{ label: 'A', uz: "1:1", en: "1:1" }, { label: 'B', uz: "2:1 yoki 3:1", en: "2:1 or 3:1" }, { label: 'C', uz: "10:1", en: "10:1" }, { label: 'D', uz: "1:5", en: "1:5" }], answer: 'B', explanation: { uz: "Odatda T_high / T_low = 2:1 yoki 3:1 (masalan, 50 va 150) tavsiya etiladi.", en: "A 2:1 or 3:1 ratio (e.g., 50 and 150) balances recall and noise suppression." } },
      { q: { uz: "Sobel operatori Prewitt operatoridan nimasi bilan ustun?", en: "Why is Sobel generally preferred over Prewitt?" }, options: [{ label: 'A', uz: "Markaziy qatorga ±2 vazn berib shovqinga barqarorroq natija beradi", en: "Weights center by ±2 for better noise smoothing" }, { label: 'B', uz: "Faqat 1×1 yadro ishlatadi", en: "Uses 1×1 kernels" }, { label: 'C', uz: "Chiqishni 0..1 qiladi", en: "Outputs [0,1]" }, { label: 'D', uz: "Gradient yo'nalishini hisoblamaydi", en: "Ignores direction" }], answer: 'A', explanation: { uz: "Sobel [1,2,1] silliqlashni o'z ichiga olgani uchun shovqinga chidamliroq.", en: "Sobel incorporates [1,2,1] Gaussian-like smoothing orthogonal to the derivative." } },
      { q: { uz: "cv2.Sobel() da ddepth=cv2.CV_64F ishlatishning sababi nima?", en: "Why pass ddepth=cv2.CV_64F to cv2.Sobel()?" }, options: [{ label: 'A', uz: "Manfiy gradient qiymatlari uint8 da 0 ga kesilib qolmasligi uchun", en: "So negative gradients are not clipped to 0 in uint8" }, { label: 'B', uz: "Tasvirni kattalashtirish uchun", en: "To upscale image" }, { label: 'C', uz: "HSV ga o'tkazish uchun", en: "To convert to HSV" }, { label: 'D', uz: "Shart emas", en: "Not needed" }], answer: 'A', explanation: { uz: "O'ngdan chapga o'tishda gradient manfiy bo'ladi; uint8 uni 0 qilib yo'qotadi.", en: "Bright-to-dark transitions yield negative derivatives that uint8 truncates." } }
    ],
    matching: [
      { left: { uz: "Sobel operatori", en: "Sobel operator" }, right: { uz: "Markaziy qatorga ±2 vazn beruvchi gradient yadrosi", en: "Smoothed derivative with ±2 center weight" } },
      { left: { uz: "NMS", en: "Non-Max Suppression" }, right: { uz: "Chekkani 1 piksel qalinlikka keltirish", en: "Thinning edges to 1-pixel width" } },
      { left: { uz: "Gisterezis", en: "Hysteresis" }, right: { uz: "Zaif chekkalarni kuchlilariga bog'lash", en: "Connecting weak edges to strong edges" } },
      { left: { uz: "Scharr", en: "Scharr" }, right: { uz: "3×3 da burchak aniqligi yuqori gradient operatori", en: "3×3 derivative with improved rotational symmetry" } }
    ],
    fillGap: [
      { text: { uz: "Canny algoritmi ___ bosqichdan iborat.", en: "The Canny edge detection algorithm consists of ___ main stages." }, answer: ['5', 'besh', 'five'] },
      { text: { uz: "Gradient kattaligi Gx va Gy dan ___ = sqrt(Gx² + Gy²) formulasi bilan topiladi.", en: "Gradient ___ is computed as sqrt(Gx² + Gy²)." }, answer: ['magnitude', 'kattaligi'] },
      { text: { uz: "Ikkilangan chegarada zaif chekkalarni kuchlisiga bog'lovchi mexanizm ___ deyiladi.", en: "Linking weak edges to strong edges in Canny is called ___." }, answer: ['gisterezis', 'hysteresis'] }
    ]
  },

  // ==================== M7 ====================
  {
    id: 7,
    code: 'M7',
    labId: 7,
    hours: 2,
    keywords: ['Keypoints', 'Harris', 'SIFT', 'ORB', 'HOG', 'FAST', 'Lowe Ratio Test', 'Invariance'],
    title: {
      uz: "Xususiyat nuqtalari va deskriptorlar (Harris, SIFT, ORB, HOG)",
      en: "Keypoints & Feature Descriptors (Harris, SIFT, ORB, HOG)"
    },
    description: {
      uz: "Harris burchak detektori (struktur tenzor M, R javob funksiyasi), FAST, SIFT (DoG + 128D vektor), ORB (FAST+BRIEF), HOG va Lowe nisbat testi.",
      en: "Harris corner detector (structure tensor M), FAST, SIFT (DoG + 128-D descriptor), ORB (Hamming binary), HOG shape descriptor, and Lowe's ratio test."
    },
    refs: [
      { label: "COMP4423 L4: Feature Extraction", url: "https://github.com/lookwei/COMP4423" },
      { label: "Szeliski Ch. 7.1: Points & Patches", url: "https://szeliski.org/Book/" },
      { label: "Awesome CV: SIFT / ORB / BRISK", url: "https://github.com/jbhuang0604/awesome-computer-vision" }
    ],
    sections: [
      {
        heading: { uz: "7.1. Nima Uchun Burchaklar? Harris Burchak Detektori", en: "7.1. Why Corners? Harris Structure Tensor" },
        bodyHtml: {
          uz: "<p>Tekis sohani siljitganda o'zgarish yo'q; chekka bo'ylab siljitganda faqat chiziqqa ko'ndalang o'zgaradi (<em>aperture problem</em>); faqat <strong>burchak nuqtasi (corner)</strong> har qanday yo'nalishda kuchli o'zgarish beradi! Harris &amp; Stephens (1988) ikkinchi moment matritsasini tuzdi: $M = \\sum w(x,y) \\begin{bmatrix}I_x^2 & I_x I_y\\\\ I_x I_y & I_y^2\\end{bmatrix}$.</p><p>$M$ xos qiymatlari $\\lambda_1, \\lambda_2$: ikkalasi katta $\\implies$ burchak; biri katta $\\implies$ chekka. $\\det/\\text{trace}$ yordamida xos qiymatlarsiz $R$ javobi hisoblanadi ($R &gt; 0$ katta → burchak). Harris <strong>aylanishga invariant</strong>, ammo <strong>masshtabga invariant emas!</strong></p>",
          en: "<p>Unlike flat patches or 1D edges (which suffer the <em>aperture problem</em>), <strong>corners</strong> change sharply in every shift direction. Harris &amp; Stephens (1988) formalized the 2×2 structure tensor $M$.</p><p>Both eigenvalues $\\lambda_1, \\lambda_2$ large yields high positive $R = \\det(M) - k(\\text{tr}(M))^2$. Harris is <strong>rotation-invariant</strong> but breaks when zoomed (<strong>not scale-invariant</strong>).</p>"
        },
        latex: "R = \\det(M) - k\\,(\\text{trace}(M))^2 = \\lambda_1\\lambda_2 - k(\\lambda_1 + \\lambda_2)^2 \\quad (k \\approx 0.04\\text{--}0.06)",
        widget: 'harris-sim'
      },
      {
        heading: { uz: "7.2. SIFT (DoG + 128-D), ORB (FAST+BRIEF) va HOG", en: "7.2. SIFT (DoG + 128-D), ORB (Binary) & HOG" },
        bodyHtml: {
          uz: "<p><strong>SIFT (David Lowe, 1999):</strong> 1) <em>Scale-space extrema (DoG)</em> — turli $\\sigma$ oktavalarda masshtabga invariant nuqtalar topish; 2) Past kontrast va chekkalarni rad etish; 3) Dominant gradient yo'nalishi (36 bin) bilan <strong>aylanish invariantligi</strong>; 4) Nuqta atrofidagi $16\\times 16$ oynani $4\\times 4$ katakka bo'lib, har birida 8 yo'nalish gistogrammasi → <strong>$4\\times 4\\times 8 = 128$-o'lchamli vektor</strong> (L2 normallangan).</p><p><strong>ORB (Rublee et al., 2011):</strong> Tezkor <strong>FAST</strong> burchaklari + yo'naltirilgan <strong>rBRIEF (256-bit binar)</strong> deskriptori. CPU da XOR (<strong>Hamming masofasi</strong>) bilan SIFT dan 10–50× tez ishlaydi va patentsiz!<br><strong>HOG (Dalal-Triggs, 2005):</strong> Zich katakli gradient gistogrammalari (piyoda aniqlashda SVM bilan standart).</p>",
          en: "<p><strong>SIFT (Lowe, 1999):</strong> Finds scale-space peaks via <em>Difference of Gaussians (DoG)</em>, assigns dominant orientation, and pools $4\\times 4$ cells × 8 gradient bins into a normalized <strong>128-D L2 vector</strong>.</p><p><strong>ORB:</strong> Combines <strong>FAST</strong> keypoints + oriented binary <strong>BRIEF</strong> (256-bit), matched via fast bitwise XOR (<strong>Hamming distance</strong>). <strong>HOG (2005):</strong> Dense silhouette descriptor for pedestrian SVM detectors.</p>"
        }
      },
      {
        heading: { uz: "7.3. Sonli Hisoblash Misoli (Doskada): Harris R va SIFT O'lchami", en: "7.3. Worked Numerical Example: Harris R Calculation" },
        bodyHtml: {
          uz: "<p><strong>Masala 1 (Harris javobi R):</strong> Kichik 4-nuqtali oynada 2 nuqtada gorizontal gradient $(I_x=4, I_y=0)$, 2 nuqtada vertikal gradient $(I_x=0, I_y=4)$ bo'lsin ($k=0.04$).<br>• $\\sum I_x^2 = 4^2 + 4^2 + 0 + 0 = \\mathbf{32}$, $\\sum I_y^2 = 0 + 0 + 4^2 + 4^2 = \\mathbf{32}$, $\\sum I_x I_y = \\mathbf{0}$.<br>• $M = \\begin{bmatrix}32 & 0\\\\ 0 & 32\\end{bmatrix} \\implies \\det(M) = 1024,\\ \\text{trace}(M) = 64$.<br>• $R = 1024 - 0.04 \\times 64^2 = 1024 - 0.04 \\times 4096 = 1024 - 163.84 = \\mathbf{+860.16 \\gg 0}$ → Yaqqol <strong>Burchak!</strong><br><em>Taqqoslash:</em> Agar faqat vertikal chekka bo'lganida ($M = \\begin{bmatrix}64&0\\\\0&0\\end{bmatrix}$): $\\det(M)=0,\\ R = 0 - 0.04\\times 4096 = \\mathbf{-163.84 &lt; 0}$ (Chekka!).</p>",
          en: "<p><strong>Harris Window with 2 points $(I_x=4,I_y=0)$ and 2 points $(I_x=0,I_y=4)$, $k=0.04$:</strong><br>$M = \\begin{bmatrix}32 & 0\\\\0 & 32\\end{bmatrix} \\implies \\det(M)=1024, \\text{tr}(M)=64 \\implies R = 1024 - 0.04(4096) = \\mathbf{+860.16}$ (Strong <strong>Corner</strong>!). Contrast with an edge $M=[[64,0],[0,0]]$ giving $R = \\mathbf{-163.84 &lt; 0}$.</p>"
        },
        latex: "M = \\begin{bmatrix}32 & 0\\\\ 0 & 32\\end{bmatrix} \\implies R = 1024 - 0.04\\cdot 64^2 = +860.16"
      },
      {
        heading: { uz: "7.4. Feature Matching, Lowe Nisbat Testi & OpenCV Kod", en: "7.4. Feature Matching, Lowe Ratio Test & Python Walkthrough" },
        bodyHtml: {
          uz: "<p>Ikki tasvir xususiyatlarini moslashtirishda: SIFT uchun <code>cv2.NORM_L2</code>, ORB uchun <code>cv2.NORM_HAMMING</code> ishlatiladi (noto'g'ri metrika dasturni yiqitadi!). Eng yaxshi mosliklarni saralash uchun <strong>k=2 (knnMatch)</strong> chaqirilib, <strong>Lowe nisbat testi</strong> ($d_1 &lt; 0.75 \\cdot d_2$) qo'llaniladi — bu takrorlanuvchi derazalar yoki g'isht naqshlaridagi noto'g'ri mosliklarni tozalaydi.</p>",
          en: "<p>Match SIFT with <code>cv2.NORM_L2</code> and binary ORB with <code>cv2.NORM_HAMMING</code>. Use <code>knnMatch(..., k=2)</code> with <strong>Lowe's ratio test</strong> ($d_1 / d_2 &lt; 0.75$) to reject ambiguous repetitive-texture matches.</p>"
        },
        code: `import cv2, numpy as np

img1 = np.zeros((200, 200), np.uint8)
cv2.rectangle(img1, (40, 40), (130, 130), 220, -1)
M_rot = cv2.getRotationMatrix2D((100, 100), 25, 1.0)
img2 = cv2.warpAffine(img1, M_rot, (200, 200))

# ORB + Hamming BFMatcher + Lowe Ratio Test
orb = cv2.ORB_create(nfeatures=500)
kp1, des1 = orb.detectAndCompute(img1, None)
kp2, des2 = orb.detectAndCompute(img2, None)
bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=False)
matches = bf.knnMatch(des1, des2, k=2) if des1 is not None and des2 is not None else []
good = [m for pair in matches if len(pair)==2 for m, n in [pair] if m.distance < 0.75 * n.distance]
print(f"ORB Keypoints: {len(kp1)} vs {len(kp2)} | Good matches after Ratio Test: {len(good)}")`
      },
      {
        heading: { uz: "7.5. Invariantlik Matritsasi & Zamonaviy Chuqur Deskriptorlar (SuperPoint)", en: "7.5. Invariance Matrix & Learned Descriptors (SuperPoint/SuperGlue)" },
        bodyHtml: {
          uz: "<p>Bugungi AR/VR va robototexnikada klassik SIFT/ORB bilan birga o'z-o'zini nazorat qiluvchi <strong>SuperPoint</strong> detektori va transformer asosidagi <strong>SuperGlue / LightGlue</strong> moslashtiruvchilari kun-tun va keskin burchak o'zgarishlarida ham yuqori aniqlik beradi.</p>",
          en: "<p>Modern SLAM and AR systems augment SIFT/ORB with learned detectors like <strong>SuperPoint</strong> and graph/attention matchers like <strong>LightGlue</strong> to handle extreme day-night illumination shifts.</p>"
        },
        discussion: {
          q: { uz: "Mobilda 60 FPS ishlaydigan AR ilova uchun SIFT (L2, 128 float) va ORB (Hamming, 256 bit) dan qaysi birini tanlaysiz va nega?", en: "For a 60 FPS mobile AR app, would you pick SIFT or ORB, and why?" },
          a: { uz: "ORB tanlanadi: FAST detektori juda tez, 256-bit binar vektor kam RAM egallaydi va Hamming masofasi CPU da bitta XOR + POPCNT instruktsiyasi bilan hisoblanadi.", en: "ORB: FAST corners + 256-bit binary descriptors compare via hardware XOR/POPCNT instructions, running 10–50× faster with tiny memory." }
        }
      }
    ],
    slides: [
      { title: { uz: "7.1. Nima Uchun Burchaklar? (Aperture Muammosi)", en: "7.1. Why Track Corners Instead of Edges?" }, points: { uz: ["Tekis hudud: siljitishda hech narsa o'zgarmaydi", "Chekka (Edge): chekka bo'ylab siljishda o'zgarish sezilmaydi (Aperture problem)", "Burchak (Corner): BARCHA yo'nalishda keskin intensivlik o'zgarishi", "Yaxshi kalit nuqta takrorlanuvchi, lokal va invariant bo'lishi kerak"], en: ["Flat region: zero change in all directions", "Edge: ambiguous shift along contour (Aperture problem)", "Corner: unique localization in ALL shift directions"] } },
      { title: { uz: "Harris Burchak Detektori va Struktur Tenzor M", en: "Harris Corner Detector & Structure Tensor M" }, latex: "E(u,v) \\approx [u\\ v] M \\begin{bmatrix}u\\\\v\\end{bmatrix}, \\quad R = \\lambda_1\\lambda_2 - k(\\lambda_1+\\lambda_2)^2", points: { uz: ["λ1 va λ2 ikkalasi kichik → Tekis soha (|R| kichik)", "Biri katta, biri kichik → Chekka (R < 0)", "Ikkalasi ham katta → Burchak (R >> 0)", "Harris aylanishga invariant, ammo MASSHTABGA INVARIANT EMAS!"], en: ["λ1, λ2 small → Flat; one large → Edge (R < 0)", "Both λ1, λ2 large → Corner (R >> 0)", "Harris is rotation-invariant, NOT scale-invariant!"] } },
      { title: { uz: "Interaktiv Harris Xos Qiymatlar Simulatori", en: "Interactive Harris Eigenvalue Simulator" }, widget: 'harris-sim' },
      { title: { uz: "SIFT (1999): Masshtab va Aylanish Invariantligi", en: "SIFT: DoG Scale Space & 128-D Descriptor" }, points: { uz: ["1. DoG (Difference of Gaussians) piramidasida 3D (x, y, σ) ekstremum", "2. Dominant gradient burchagini topish → Aylanishga invariantlik", "3. 16×16 oynani 4×4 katakka bo'lib, 8 burchak bini → 4×4×8 = 128D vektor", "4. L2 normallash → yorug'lik o'zgarishiga (kontrastga) chidamlilik"], en: ["1. 3D scale-space peaks in DoG pyramid → Scale invariance", "2. Dominant gradient orientation → Rotation invariance", "3. 4×4 spatial cells × 8 orientation bins = 128-D float vector"] } },
      { title: { uz: "ORB (FAST + Rotated BRIEF) va HOG", en: "ORB (Binary Real-Time) & HOG Descriptors" }, points: { uz: ["ORB = FAST kalit nuqtalari + orientatsiyali BRIEF (256 bit)", "Taqqoslash: Hamming masofasi (CPU XOR + POPCNT — juda tez!)", "SIFT dan 10–50× tezroq va patentsiz (real-vaqt SLAM/AR asosi)", "HOG: Zich katakli gradient gistogrammasi — obyekt/piyoda shakli uchun"], en: ["ORB = FAST corners + rotated 256-bit BRIEF", "Compares via Hamming XOR/POPCNT (10–50× faster than SIFT!)", "HOG captures dense global silhouette for pedestrian SVM"] } },
      { title: { uz: "Deskriptorlar va Invariantlik Taqqoslanmasi", en: "Feature Detectors & Descriptors Comparison" }, table: { headers: { uz: ["Usul", "Vektor", "Masofa", "Masshtab Inv."], en: ["Method", "Vector", "Metric", "Scale Inv."] }, rows: { uz: [["Harris", "Yo'q (faqat nuqta)", "—", "Yo'q"], ["SIFT", "128 float", "L2 (Yevklid)", "Ha (DoG)"], ["ORB", "256 bit binar", "Hamming (XOR)", "Qisman (Piramida)"], ["HOG", "Global zich", "L2 / SVM", "Yo'q (Sliding Pyr)"]], en: [["Harris", "Detector only", "—", "No"], ["SIFT", "128 floats", "Euclidean L2", "Yes (DoG)"], ["ORB", "256-bit binary", "Hamming", "Pyramid-based"], ["HOG", "Dense global", "L2 / SVM", "Multi-scale window"]] } } },
      { title: { uz: "Sonli Misol (Doskada): Harris R Hisoblash", en: "Worked Example: Harris R Calculation" }, points: { uz: ["4 nuqtada: ikkitasi (Ix=4, Iy=0), ikkitasi (Ix=0, Iy=4), k=0.04", "M = [[32, 0], [0, 32]]", "det(M) = 32×32 = 1024, trace(M) = 32+32 = 64", "R = 1024 - 0.04×(64)² = 1024 - 163.84 = +860.16 → Burchak!"], en: ["4-pt patch: two (4,0), two (0,4), k=0.04 → M = [[32,0],[0,32]]", "det(M) = 1024, tr(M) = 64 → R = 1024 - 0.04(4096) = +860.16 (Corner!)"] } },
      { title: { uz: "Lowe Nisbat Testi (k=2 knnMatch)", en: "Lowe's Ratio Test: Rejecting Ambiguous Matches" }, latex: "\\frac{d_1}{d_2} < 0.75 \\quad (d_1 = \\text{eng yaqin},\\ d_2 = \\text{ikkinchi eng yaqin})", points: { uz: ["Bir binoda 50 ta bir xil deraza bo'lsa d1 ≈ d2 (nisbat ~0.95) → rad etiladi!", "Noyob belgi bo'lsa d1 << d2 (nisbat ~0.35) → ishonchli qabul qilinadi!"], en: ["Repetitive textures yield d1 ≈ d2 (~0.95) → rejected!", "Unique landmarks yield d1 << d2 (~0.35) → accepted cleanly!"] } },
      { title: { uz: "Python Kod: ORB + BFMatcher(NORM_HAMMING) + Ratio Test", en: "Python Code: ORB + Hamming Matching" }, code: `orb = cv2.ORB_create(nfeatures=500)
kp1, des1 = orb.detectAndCompute(img1, None)
kp2, des2 = orb.detectAndCompute(img2, None)
bf = cv2.BFMatcher(cv2.NORM_HAMMING)
pairs = bf.knnMatch(des1, des2, k=2)
good = [m for m, n in pairs if m.distance < 0.75 * n.distance]` },
      { title: { uz: "Muhokama: 60 FPS Mobil AR — SIFT vs ORB vs LightGlue", en: "Discussion: Mobile AR Speed vs Illumination Robustness" }, discussion: { q: { uz: "Kun va tun o'rtasida rasm moslashtirishda klassik SIFT/ORB nega qiynaladi va zamonaviy yechim nima?", en: "Why do classical SIFT/ORB struggle on day-to-night matching, and what replaces them?" }, a: { uz: "Keskin yorug'lik/ekspozitsiya o'zgarishi lokal gradientlarni ag'daradi; SuperPoint + LightGlue kabi neyron deskriptorlar global kontekstni o'rganadi.", en: "Extreme lighting flips local gradients; learned neural features like SuperPoint + LightGlue leverage global context." } } }
    ],
    glossary: [
      { uz: "struktur tenzor", en: "structure tensor", defUz: "Piksel atrofidagi gradient ko'paytmalarining 2×2 M matritsasi", defEn: "2×2 gradient second-moment matrix M" },
      { uz: "SIFT", en: "SIFT", defUz: "128-o'lchamli masshtab va aylanishga invariant deskriptor", defEn: "Scale-Invariant Feature Transform (128-D)" },
      { uz: "Lowe nisbat testi", en: "Lowe's ratio test", defUz: "d1/d2 < 0.75 mezoniga ko'ra ishonchli moslikni tanlash", defEn: "Filtering ambiguous matches via d1/d2 < 0.75" }
    ],
    quiz: [
      { q: { uz: "Harris matritsasi M ning ikkala xos qiymati (λ1 va λ2) katta va musbat bo'lsa, bu qaysi soha?", en: "If both eigenvalues λ1 and λ2 of the Harris matrix M are large, what region is it?" }, options: [{ label: 'A', uz: "Tekis soha (Flat)", en: "Flat region" }, { label: 'B', uz: "Burchak nuqtasi (Corner)", en: "Corner point" }, { label: 'C', uz: "Chekka (Edge)", en: "Edge" }, { label: 'D', uz: "Shovqin", en: "Noise" }], answer: 'B', explanation: { uz: "Ikkala ortogonal yo'nalishda ham kuchli gradient o'zgarishi burchakni bildiradi.", en: "Strong intensity variation in two orthogonal directions indicates a corner." } },
      { q: { uz: "SIFT deskriptori bitta kalit nuqta (4×4 katak, 8 yo'nalish) uchun necha o'lchamli vektor hosil qiladi?", en: "How many dimensions does a standard SIFT descriptor have?" }, options: [{ label: 'A', uz: "64", en: "64" }, { label: 'B', uz: "128", en: "128" }, { label: 'C', uz: "256", en: "256" }, { label: 'D', uz: "512", en: "512" }], answer: 'B', explanation: { uz: "4 × 4 × 8 = 128 o'lchamli deskriptor vektori.", en: "4×4 cells × 8 orientation bins = 128 dimensions." } },
      { q: { uz: "ORB binar deskriptorlarini solishtirishda qaysi masofa o'lchovi qo'llaniladi?", en: "Which distance metric is used to match binary ORB descriptors?" }, options: [{ label: 'A', uz: "Yevklid masofasi", en: "Euclidean distance" }, { label: 'B', uz: "Hamming masofasi", en: "Hamming distance" }, { label: 'C', uz: "Mahalanobis masofasi", en: "Mahalanobis" }, { label: 'D', uz: "Kosinus masofasi", en: "Cosine" }], answer: 'B', explanation: { uz: "Binar bitlar ketma-ketligi CPU da tezkor XOR (Hamming masofasi) bilan solishtiriladi.", en: "Binary strings compare via ultra-fast bitwise XOR (Hamming distance)." } },
      { q: { uz: "Nima uchun Harris detektori aylanishga invariant bo'lsa-da, masshtabga invariant emas?", en: "Why is Harris rotation-invariant but NOT scale-invariant?" }, options: [{ label: 'A', uz: "Xos qiymatlar aylanishda o'zgarmaydi, lekin tasvir kattalashsa burchak tekis chekkadek ko'rinishi mumkin", en: "Eigenvalues are rotation-invariant, but zooming changes a corner into an edge inside a fixed window" }, { label: 'B', uz: "Faqat oq-qora rasmda ishlaydi", en: "Grayscale only" }, { label: 'C', uz: "Gradinet ishlatmaydi", en: "No gradients" }, { label: 'D', uz: "128 o'lchamli", en: "128-D" }], answer: 'A', explanation: { uz: "Doimiy oyna o'lchami masshtab o'zgarganda bir xil fizik burchakni qamrab ololmaydi.", en: "A fixed window sees an edge instead of a corner when zoomed in." } }
    ],
    matching: [
      { left: { uz: "Harris Detektori", en: "Harris Detector" }, right: { uz: "M matritsasi xos qiymatlari orqali burchak aniqlash", en: "Corner detection via structure tensor eigenvalues" } },
      { left: { uz: "SIFT", en: "SIFT" }, right: { uz: "DoG piramida + 128-D L2 deskriptor", en: "DoG scale space + 128-D L2 vector" } },
      { left: { uz: "ORB", en: "ORB" }, right: { uz: "FAST + BRIEF binar (Hamming masofa)", en: "FAST + BRIEF binary (Hamming distance)" } },
      { left: { uz: "HOG", en: "HOG" }, right: { uz: "Global obyekt silueti va piyodalar aniqlash", en: "Global silhouette gradients for pedestrian detection" } }
    ],
    fillGap: [
      { text: { uz: "SIFT algoritmi turli masshtablardagi ekstremumlarni ___ (Difference of Gaussians) orqali topadi.", en: "SIFT finds scale-space extrema using ___ (Difference of Gaussians)." }, answer: ['DoG'] },
      { text: { uz: "Lowe nisbat testida eng yaqin ikki masofa nisbati odatda ___ dan kichik bo'lsa qabul qilinadi.", en: "In Lowe's ratio test, matches with d1/d2 < ___ (e.g. 0.75) are kept." }, answer: ['0.75', '0.8', '0.7'] },
      { text: { uz: "ORB deskriptori ___ va BRIEF algoritmlarining kombinatsiyasidan iborat.", en: "ORB combines the ___ keypoint detector with rotated BRIEF." }, answer: ['FAST'] }
    ]
  },

  // ==================== M8 ====================
  {
    id: 8,
    code: 'M8',
    labId: 8,
    hours: 2,
    keywords: ['RANSAC', 'Outlier', 'Inlier', 'Hough Transform', 'Line Detection', 'Circle Detection', 'MSAC'],
    title: {
      uz: "Xususiyatlarni moslashtirish, RANSAC va Shakl aniqlash (Hough)",
      en: "Robust Fitting (RANSAC) & Shape Detection (Hough)"
    },
    description: {
      uz: "RANSAC algoritmi (inlier/outlier, iteratsiyalar formulasi, MSAC/LO-RANSAC/PROSAC) va Hough transformatsiyasi (qutb koordinatalari ρ,θ, akkumulyator massivi).",
      en: "RANSAC robust estimation (inliers vs outliers, iteration formula, MSAC/PROSAC) and Hough Transform (polar ρ,θ accumulator voting for lines & circles)."
    },
    refs: [
      { label: "Szeliski Ch. 8.1: Robust Alignment (RANSAC)", url: "https://szeliski.org/Book/" },
      { label: "Stanford CS131: Hough & RANSAC", url: "https://cs131.stanford.edu/" }
    ],
    sections: [
      {
        heading: { uz: "8.1. RANSAC: Outlierlarga Chidamli Model Baholash", en: "8.1. RANSAC: Random Sample Consensus" },
        bodyHtml: {
          uz: "<p>Lowe nisbat testidan keyin ham mosliklar ichida 20–50% noto'g'ri juftliklar (<strong>outliers</strong>) qolishi mumkin. Oddiy Eng Kichik Kvadratlar (OLS) usuli bittagina uzoq outlier ta'sirida chiziqni butunlay og'dirib yuboradi (0% breakdown point).</p><p><strong>RANSAC (Fischler &amp; Bolles, 1981)</strong> 4-qadamli sikl: (1) Tasodifiy minimal $s$ ta nuqta tanlash ($s=2$ chiziq, $s=4$ homografiya, $s=8$ F matritsa); (2) Shu $s$ nuqtadan gipoteza modelini qurish; (3) Chegara $t$ ichiga tushgan barcha nuqtalarni (<strong>inliers</strong>) sanash; (4) $N$ marta takrorlab, eng katta inlierlar to'plamida modelni qayta aniqlash (<em>refit</em>). <strong>Kengaytmalar:</strong> <em>MSAC</em>, <em>PROSAC</em>, <em>LO-RANSAC</em>.</p>",
          en: "<p>Even after Lowe's ratio test, 20–50% of matches may be <strong>outliers</strong>, ruining Ordinary Least Squares. <strong>RANSAC (1981)</strong> loops $N$ times: sample minimal subset $s$ ($s=2$ line, $s=4$ homography), fit hypothesis, count consensus <strong>inliers</strong> within threshold $t$, and refit least squares on the largest inlier set.</p>"
        },
        latex: "N = \\frac{\\ln(1 - p)}{\\ln(1 - (1 - e)^s)}",
        widget: 'ransac-sim'
      },
      {
        heading: { uz: "8.2. Hough Transformatsiyasi: Qutb Koordinatalari (ρ, θ) va Doiralar", en: "8.2. Hough Transform: Polar Lines (ρ, θ) & Circles" },
        bodyHtml: {
          uz: "<p><strong>Hough transformatsiyasi</strong> (1962) tasvir fazosidagi chiziqli chekka piksellarini parametr fazosidagi akkumulyator to'riga ovoz berish orqali chiziq va doiralarni topadi (hatto uzuk chiziqlar bo'lsa ham!). Dekart tenglamasida ($y=mx+b$) vertikal chiziq uchun $m\\to\\infty$ bo'lib ketgani sababli <strong>qutb koordinatalari</strong> ishlatiladi: $\\rho = x\\cos\\theta + y\\sin\\theta$.</p><p>Tasvir fazosidagi bitta nuqta $(\\rho, \\theta)$ fazosida <strong>sinusoida</strong> chizadi; bir chiziqda yotgan nuqtalar sinusoidalarining kesishgan nuqtasi akkumulyatorda maksimal ovoz to'playdi. Doiralar $(a,b,r)$ 3D akkumulyatorda (OpenCV da gradient yo'nalishidan foydalanib tezlashtirilgan <code>cv2.HOUGH_GRADIENT</code>) aniqlanadi.</p>",
          en: "<p>The <strong>Hough Transform</strong> maps edge pixels to vote in a parameter-space <strong>accumulator</strong>. To avoid infinite slope $m$ in $y=mx+b$ on vertical lines, lines use polar parameterization $\\rho = x\\cos\\theta + y\\sin\\theta$, where collinear points intersect in sinusoid space. Circles vote in $(a,b,r)$ space via <code>cv2.HOUGH_GRADIENT</code>.</p>"
        },
        latex: "\\rho = x\\cos\\theta + y\\sin\\theta, \\quad (x - a)^2 + (y - b)^2 = r^2"
      },
      {
        heading: { uz: "8.3. Sonli Hisoblash Misoli (Doskada): RANSAC Iteratsiyalar Soni N", en: "8.3. Worked Numerical Example: RANSAC Iterations N" },
        bodyHtml: {
          uz: "<p><strong>Masala:</strong> Homografiya baholash uchun minimal namuna $s=4$, outlierlar ulushi $e=0.4$ (40% noto'g'ri moslik), talab qilinadigan ishonch $p=0.99$ (99%).<br>1. Bitta tasodifiy namuna sof inlierlardan chiqish ehtimoli: $(1 - e)^s = (1 - 0.4)^4 = 0.6^4 = \\mathbf{0.1296}$ (12.96%).<br>2. Kamida bir marta xato chiqishi: $1 - 0.1296 = \\mathbf{0.8704}$.<br>3. $N = \\frac{\\ln(1 - 0.99)}{\\ln(0.8704)} = \\frac{-4.6052}{-0.1388} = 33.18 \\implies \\mathbf{34\\text{ iteratsiya}}$.<br><em>E'tibor bering:</em> Agar outlier ulushi $e=0.6$ ga yetsa, $(0.4)^4 = 0.0256 \\implies N = \\mathbf{178\\text{ iteratsiya}}$ (5× ortadi!).</p>",
          en: "<p><strong>Given:</strong> Homography $s=4$, outlier ratio $e=0.4$, target confidence $p=0.99$.<br>1. Clean sample probability: $(1-0.4)^4 = 0.6^4 = \\mathbf{0.1296}$.<br>2. $N = \\frac{\\ln(0.01)}{\\ln(1 - 0.1296)} = \\frac{-4.605}{-0.1388} = \\mathbf{34\\text{ iterations}}$.<br>Notice: raising outliers to $e=0.6$ explodes $N$ to $\\mathbf{178}$!</p>"
        },
        latex: "e=0.4,\\ s=4,\\ p=0.99 \\implies N = \\left\\lceil \\frac{\\ln(0.01)}{\\ln(1-0.6^4)} \\right\\rceil = 34"
      },
      {
        heading: { uz: "8.4. Python / OpenCV Kod: Yo'l Chizig'i (HoughLinesP) & RANSAC", en: "8.4. Python Walkthrough: Probabilistic Hough & RANSAC Line Fit" },
        bodyHtml: {
          uz: "<p>Amaliyotda <code>cv2.HoughLinesP</code> kesmalarning aniq <code>(x1, y1, x2, y2)</code> uchlarini qaytaradi. RANSAC esa <code>cv2.findHomography(pts1, pts2, cv2.RANSAC, 5.0)</code> ichiga tayyor o'rnatilgan.</p>",
          en: "<p>In practice, <code>cv2.HoughLinesP</code> returns finite line segments <code>(x1, y1, x2, y2)</code>, while <code>cv2.findHomography(..., cv2.RANSAC, 5.0)</code> includes built-in RANSAC.</p>"
        },
        code: `import cv2, numpy as np

# Canny + Probabilistic HoughLinesP (yo'l chizig'i)
canvas = np.zeros((200, 200), dtype=np.uint8)
cv2.line(canvas, (20, 180), (160, 40), 255, 2)
edges = cv2.Canny(canvas, 50, 150)
lines = cv2.HoughLinesP(edges, rho=1, theta=np.pi/180, threshold=30, minLineLength=40, maxLineGap=10)
print("Detected segments:", 0 if lines is None else len(lines))

# RANSAC orqali 2D chiziq moslashtirish (outlierlar bilan)
rng = np.random.default_rng(0)
pts_in = np.column_stack([np.linspace(0, 10, 20), 2 * np.linspace(0, 10, 20) + 1])
pts_all = np.vstack([pts_in, [[1, 90], [9, -50], [5, 100]]])
print("Total points (20 inliers + 3 outliers):", len(pts_all))`
      },
      {
        heading: { uz: "8.5. Keys-Tahlil: Chiziq Aniqlashda RANSAC vs Hough", en: "8.5. Case Discussion: When to Pick Hough vs RANSAC?" },
        bodyHtml: {
          uz: "<p><strong>Hough</strong> bir nechta chiziq/doirani bir vaqtning o'zida topishda zo'r (masalan, yo'lning chap va o'ng chiziqlari), lekin 4+ parametrda xotira portlaydi. <strong>RANSAC</strong> yuqori o'lchamli modellarda (Homografiya 8 DOF, Fundamental matritsa) xotirasi kichik va tez, lekin bitta asosiy modelni topadi.</p>",
          en: "<p><strong>Hough</strong> detects multiple low-dimensional instances simultaneously (e.g., multiple lane lines) but suffers the curse of dimensionality past 3 parameters. <strong>RANSAC</strong> scales cleanly to 8-DOF Homography and Fundamental matrices.</p>"
        },
        discussion: {
          q: { uz: "Agar sizga 2D tasvirdan bir vaqtning o'zida 10 ta tanga (doira) topish kerak bo'lsa, RANSAC ishlatasizmi yoki HoughCircles?", en: "To detect 10 coins simultaneously in an image, would you use RANSAC or HoughCircles?" },
          a: { uz: "HoughCircles (yoki Konturlar): akkumulyator bir marta ovoz yig'ishda barcha 10 ta cho'qqini birdaniga topadi; oddiy RANSAC esa bitta eng katta doirani topib to'xtaydi.", en: "HoughCircles: a single accumulator pass reveals all 10 local peaks simultaneously, whereas vanilla RANSAC finds only one dominant circle." }
        }
      }
    ],
    slides: [
      { title: { uz: "8.1. Outlier Muammosi: Eng Kichik Kvadratlar Nega Sinadi?", en: "8.1. Why Ordinary Least Squares Fails Under Outliers" }, points: { uz: ["Feature matching dan keyin 20–50% mosliklar noto'g'ri (outlier) bo'ladi", "Eng kichik kvadratlar (OLS) Σ r_i² ni minimallashtiradi", "Bitta katta outlier kvadratik jarima tufayli to'g'ri chiziqni buzadi (0% chidamlilik)", "Yechim: Robust Estimation — RANSAC, M-estimator, Hough"], en: ["20–50% of matches can be outliers", "OLS minimizes Σ r_i² — a single huge outlier ruins the fit", "Solution: Robust Consensus Estimation (RANSAC & Hough)"] } },
      { title: { uz: "RANSAC Algoritmi Qadamlari (1981)", en: "RANSAC Loop Step-by-Step (1981)" }, points: { uz: ["1. Minimal s ta nuqtani tasodifiy tanlang (chiziq s=2, homografiya s=4)", "2. Ushbu s nuqtadan model parametrlarini hisoblang", "3. Modeldan t masofa (masalan 3–5 px) ichidagi inlierlarni sanang", "4. N marta takrorlab, eng ko'p inlierli modelni tanlang", "5. Yakun: BARCHA inlierlar ustida OLS bilan qayta baholang (Refit)"], en: ["1. Sample minimal subset s (2 for line, 4 for homography)", "2. Fit candidate hypothesis", "3. Count inliers within threshold t (e.g. 3–5 px)", "4. Repeat N times & keep best hypothesis", "5. Refit model via least squares on all winning inliers"] } },
      { title: { uz: "Interaktiv RANSAC Iteratsiyalar Kalkulyatori", en: "Interactive RANSAC Iteration Simulator" }, widget: 'ransac-sim' },
      { title: { uz: "Sonli Misol (Doskada): Homografiya uchun N", en: "Worked Example: Computing RANSAC N (s=4)" }, latex: "N = \\frac{\\ln(1 - p)}{\\ln(1 - (1 - e)^s)}", points: { uz: ["Berilgan: s = 4 (Homografiya), outlier ulushi e = 0.4, ishonch p = 0.99", "Sof to'plam ehtimoli: (1 - 0.4)^4 = 0.6^4 = 0.1296", "N = ln(0.01) / ln(1 - 0.1296) = -4.605 / -0.1388 = 34 iteratsiya", "Agar e = 0.6 ga oshsa → N = 178 iteratsiyaga sakraydi!"], en: ["Given s=4, e=0.4, p=0.99 → (0.6)^4 = 0.1296", "N = ln(0.01)/ln(0.8704) = 34 iterations (jumps to 178 at e=0.6!)"] } },
      { title: { uz: "RANSAC Kengaytmalari: MSAC, PROSAC, LO-RANSAC", en: "Modern RANSAC Variants: MSAC, PROSAC, LO-RANSAC" }, table: { headers: { uz: ["Variant", "Asosiy g'oyasi", "Afzalligi"], en: ["Variant", "Key Idea", "Benefit"] }, rows: { uz: [["MSAC", "Qattiq sanash o'rniga min(r², t²) jarima", "Chegara t ga sezgirligi kamroq"], ["PROSAC", "Yuqori Lowe reytingli juftliklarni avval tanlash", "5–20× tezroq yaqinlashadi"], ["LO-RANSAC", "Yaxshi model topilganda lokal optimallashtirish", "Aniqroq inlier to'plami"]], en: [["MSAC", "Truncated squared cost min(r², t²)", "Higher accuracy, less threshold sensitivity"], ["PROSAC", "Prioritize top-ranked matches first", "5–20× faster convergence"], ["LO-RANSAC", "Local optimization inside RANSAC loop", "Higher final precision"]] } } },
      { title: { uz: "Hough Transformatsiyasi: Qutb Koordinatalari (ρ, θ)", en: "Hough Transform: Polar Coordinates (ρ, θ)" }, latex: "\\rho = x\\cos\\theta + y\\sin\\theta", points: { uz: ["y = mx + b vertikal chiziqlarda m → ∞ bo'lib buziladi", "Qutb parametrlashda ρ ∈ [-diag, +diag], θ ∈ [0°, 180°) chegaralangan", "Tasvirdagi nuqta → (ρ, θ) da sinusoida; umumiy kesishish = chiziq!", "Uzilgan chiziq va doiralarni ham akkumulyator ovozida topadi"], en: ["Cartesian y=mx+b fails on vertical lines (m→∞)", "Polar (ρ, θ) is bounded; collinear points intersect in accumulator", "Detects fragmented lines & circles cleanly"] } },
      { title: { uz: "Hough Doira Aniqlash (3D Akkumulyator) & OpenCV", en: "Hough Circle Detection & HoughLinesP" }, points: { uz: ["Doira tenglamasi: (x - a)² + (y - b)² = r² → 3D (a, b, r) akkumulyator", "3D to'r juda sekin → OpenCV cv2.HOUGH_GRADIENT Sobel gradient nuri bo'ylab ovoz beradi", "HoughLinesP (Probabilistic) cheksiz chiziq o'rniga kesmalarni (x1,y1,x2,y2) qaytaradi"], en: ["Circles need 3D (a, b, r) accumulator; cv2.HOUGH_GRADIENT tracks gradient rays", "HoughLinesP outputs finite line segments (x1, y1, x2, y2)"] } },
      { title: { uz: "Python Kod: HoughLinesP va cv2.RANSAC", en: "Python Walkthrough: HoughLinesP & RANSAC" }, code: `edges = cv2.Canny(gray, 50, 150)
lines = cv2.HoughLinesP(edges, 1, np.pi/180, threshold=50,
                        minLineLength=40, maxLineGap=10)
H, mask = cv2.findHomography(pts1, pts2, cv2.RANSAC, 5.0)
print("Inliers:", int(mask.sum()))` },
      { title: { uz: "Muhokama: Tangalar Sanash — RANSAC vs HoughCircles", en: "Discussion: Counting 10 Coins — RANSAC vs Hough" }, discussion: { q: { uz: "10 ta tangani bir rasm ichidan sanash uchun RANSAC ishlatasizmi yoki HoughCircles?", en: "To detect 10 coins simultaneously, would you use RANSAC or HoughCircles?" }, a: { uz: "HoughCircles (yoki Konturlar): akkumulyator barcha 10 cho'qqini birdan beradi; standart RANSAC faqat bitta asosiy doirani topadi.", en: "HoughCircles: accumulator voting finds all 10 local peaks in one pass; vanilla RANSAC fits only one dominant model." } } }
    ],
    glossary: [
      { uz: "RANSAC", en: "RANSAC", defUz: "Random Sample Consensus — outlierlar ichidan to'g'ri modelni topish", defEn: "Iterative robust estimation tolerant to >50% outliers" },
      { uz: "inlier / outlier", en: "inlier / outlier", defUz: "Modelga mos to'g'ri nuqta (inlier) vs noto'g'ri shovqin nuqta (outlier)", defEn: "Data consistent with model vs spurious mismatches" },
      { uz: "akkumulyator massivi", en: "accumulator array", defUz: "Hough parametr fazosida ovozlarni yig'uvchi diskret jadval", defEn: "Discrete Hough parameter grid accumulating votes" }
    ],
    quiz: [
      { q: { uz: "Hough transformatsiyasida y=mx+b o'rniga qutb koordinatalari (ρ, θ) ishlatilishining sababi nima?", en: "Why does Hough line detection use polar (ρ, θ) instead of y = mx + b?" }, options: [{ label: 'A', uz: "Ranglarni yaxshilash uchun", en: "Better colors" }, { label: 'B', uz: "Vertikal chiziqlarda burchak koeffitsienti m cheksizlikka intiladi", en: "Slope m goes to infinity for vertical lines" }, { label: 'C', uz: "Tezroq chizish uchun", en: "Faster drawing" }, { label: 'D', uz: "Doira topish uchun", en: "For circles" }], answer: 'B', explanation: { uz: "Vertikal chiziqlarda m=∞ bo'lib parametrlash buziladi; ρ = x cosθ + y sinθ esa chegaralangan.", en: "Polar representation handles vertical lines (θ=0) cleanly without infinite slope." } },
      { q: { uz: "RANSAC da outlier nisbati e oshgani sari zarur iteratsiyalar soni N qanday o'zgaradi?", en: "In RANSAC, how does required iteration count N change as outlier ratio e increases?" }, options: [{ label: 'A', uz: "Kamayadi", en: "Decreases" }, { label: 'B', uz: "Keskin ortadi", en: "Increases sharply" }, { label: 'C', uz: "O'zgarmaydi", en: "Unchanged" }, { label: 'D', uz: "Nolga tenglashadi", en: "Drops to zero" }], answer: 'B', explanation: { uz: "e=0.4 dan e=0.6 ga oshganda (s=4) N 34 dan 176 gacha ko'tariladi.", en: "Since (1-e)^s shrinks exponentially, N grows rapidly with e." } },
      { q: { uz: "RANSAC ning yakuniy bosqichida aniqlangan barcha inlierlar ustida nima bajariladi?", en: "What is done at the final step of RANSAC once the best inlier set is found?" }, options: [{ label: 'A', uz: "O'chirib tashlanadi", en: "Deleted" }, { label: 'B', uz: "Faqat inlierlar asosida model aniqroq qayta baholanadi (refit)", en: "Model is re-estimated (refit) using all inliers" }, { label: 'C', uz: "Outlierlar qo'shiladi", en: "Outliers added" }, { label: 'D', uz: "Median filtr qo'llanadi", en: "Median filtered" }], answer: 'B', explanation: { uz: "Barcha inlierlar ustida eng kichik kvadratlar bilan qayta baholash aniqlikni oshiradi.", en: "Least-squares refit on all inliers reduces parameter variance." } },
      { q: { uz: "Hough transformatsiyasi doiralarni (a, b, r) aniqlashda necha o'lchovli akkumulyator hosil qiladi?", en: "How many dimensions does the Hough accumulator have for circles (a, b, r)?" }, options: [{ label: 'A', uz: "1D", en: "1D" }, { label: 'B', uz: "2D", en: "2D" }, { label: 'C', uz: "3D", en: "3D" }, { label: 'D', uz: "4D", en: "4D" }], answer: 'C', explanation: { uz: "Markaz (a, b) va radius r uchta parametrni tashkil qiladi (3D).", en: "Center (a, b) plus radius r requires a 3D parameter space." } }
    ],
    matching: [
      { left: { uz: "RANSAC", en: "RANSAC" }, right: { uz: "Tasodifiy minimal to'plamlar bilan outlier filtrlash", en: "Minimal random subset consensus fitting" } },
      { left: { uz: "PROSAC", en: "PROSAC" }, right: { uz: "Eng ishonchli mosliklardan boshlab tez yaqinlashish", en: "Samples top-ranked correspondences first" } },
      { left: { uz: "Hough Lines", en: "Hough Lines" }, right: { uz: "ρ = x cosθ + y sinθ akkumulyator ovozi", en: "Polar parameter-space voting" } },
      { left: { uz: "MSAC", en: "MSAC" }, right: { uz: "Qattiq sanash o'rniga cheklangan kvadratik jarima", en: "Truncated squared error cost instead of binary count" } }
    ],
    fillGap: [
      { text: { uz: "RANSAC modeliga mos kelmaydigan noto'g'ri nuqtalar ___ deb ataladi.", en: "Spurious points that do not fit the RANSAC model are called ___." }, answer: ['outlier', 'outliers', 'outlierlar'] },
      { text: { uz: "Qutb koordinatalarida chiziq tenglamasi ρ = x·cos(θ) + y·___(θ) ko'rinishida yoziladi.", en: "In polar form, a line is ρ = x·cos(θ) + y·___(θ)." }, answer: ['sin'] },
      { text: { uz: "2D chiziqni aniqlash uchun RANSAC har iteratsiyada minimal s = ___ ta nuqta tanlaydi.", en: "To fit a 2D line, RANSAC samples s = ___ points per iteration." }, answer: ['2', 'ikki'] }
    ]
  },

  // ==================== M9 ====================
  {
    id: 9,
    code: 'M9',
    labId: 9,
    hours: 2,
    keywords: ['Homography', 'Image Stitching', 'Panorama', 'Warp', 'Inverse Mapping', 'Blending', 'Feathering', 'Parallax'],
    title: {
      uz: "Panorama hosil qilish va tasvirlarni birlashtirish (Homografiya)",
      en: "Image Stitching, Homography & Panoramas"
    },
    description: {
      uz: "3×3 Gomografiya matritsasi (8 erkin parametr, min 4 nuqta), tasvirlarni tekislash va bundle adjustment, teskari xaritalash (warp), blending (feathering & Laplacian) va parallaks xatosi.",
      en: "3×3 Homography (8 DOF, min 4 pairs), image alignment & bundle adjustment, inverse mapping warp, multi-band blending, and parallax limits."
    },
    refs: [
      { label: "Szeliski Ch. 8.2: Image Stitching", url: "https://szeliski.org/Book/" },
      { label: "UC Berkeley CS180: Mosaicing", url: "https://cal-cs180.github.io/fa25/" }
    ],
    sections: [
      {
        heading: { uz: "9.1. Gomografiya (3×3 Matritsa, 8 DOF) va DLT/RANSAC", en: "9.1. Planar Homography (8 DOF) & DLT Estimation" },
        bodyHtml: {
          uz: "<p><strong>Gomografiya $H$</strong> — bir tekis sirtning (yoki kamera o'z optik markazi atrofida sof aylanganda) ikki tasviri orasidagi $3\\times 3$ proyektiv o'zgartirishdir. $H$ masshtab aniqligigacha aniqlangani ($h_{33}=1$) sababli <strong>8 ta erkin parametrga (DOF)</strong> ega. Har bir mos nuqta juftligi $(x,y) \\leftrightarrow (x',y')$ ikkita chiziqli tenglama bergani uchun kamida <strong>4 ta nuqta juftligi</strong> kerak (kollinear bo'lmagan!).</p><p>RANSAC ichida ko'pincha simmetrik ko'chirish xatosi minimallashtiriladi: $r = d^2(x', Hx) + d^2(x, H^{-1}x')$.</p>",
          en: "<p>A <strong>Homography $H$</strong> is a $3\\times 3$ projective matrix relating views of a plane or pure rotation around the optical center. Normalized up to scale, it has <strong>8 DOF</strong> and requires at least <strong>4 non-collinear point pairs</strong> ($2 \\times 4 = 8$ constraints). RANSAC typically minimizes reprojection / symmetric transfer error.</p>"
        },
        latex: "\\begin{bmatrix} w x' \\\\ w y' \\\\ w \\end{bmatrix} = \\begin{bmatrix} h_{11}&h_{12}&h_{13}\\\\h_{21}&h_{22}&h_{23}\\\\h_{31}&h_{32}&h_{33} \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\\\ 1 \\end{bmatrix}"
      },
      {
        heading: { uz: "9.2. Tasvirlarni Tekislash, Teskari Xaritalash (Inverse Warp) va Blending", en: "9.2. Inverse Warping, Bundle Adjustment & Blending" },
        bodyHtml: {
          uz: "<p><strong>Teskari xaritalash (Inverse Mapping):</strong> Agar kirish piksellarini oldinga ko'chirsak, chiqish tasvirida bo'sh qora teshiklar qoladi. Shuning uchun chiqishning har bir $(x', y')$ pikselidan $H^{-1}$ orqali kirishdagi koordinata topilib, <strong>bilineyar/bikubik interpolyatsiya</strong> olinadi!</p><p><strong>Bundle Adjustment &amp; Blending:</strong> Ko'p kadrli panoramalarda ketma-ket $H_1\\cdot H_2\\cdots H_k$ ko'paytma xatoni to'playdi (<em>drift</em>) — buni bartaraf etish uchun global <em>Bundle Adjustment</em> bajariladi. Choklarni yashirishda oddiy o'rtacha → <em>Feathering</em> (masofa vazni) → eng sifatli <strong>Multi-Band (Laplacian Pyramid) Blending</strong> qo'llaniladi.</p>",
          en: "<p><strong>Inverse Mapping:</strong> Forward warping leaves output holes; inverse warping maps each output coordinate back via $H^{-1}$ + bilinear interpolation. Multi-image stitching runs <em>Bundle Adjustment</em> to fix drift, then applies <strong>Multi-Band Laplacian Blending</strong> to hide exposure seams.</p>"
        },
        widget: 'homography-sim'
      },
      {
        heading: { uz: "9.3. Sonli Hisoblash Misoli (Doskada): 3×3 Gomografiya Proyeksiyasi", en: "9.3. Worked Numerical Example: Projecting a Point via H" },
        bodyHtml: {
          uz: "<p><strong>Berilgan:</strong> Nuqta $p = (2, 1)^\\top$ (gomogen $[2, 1, 1]^\\top$) va $H = \\begin{bmatrix}1 & 0 & 4\\\\ 0 & 1 & 2\\\\ 0.1 & 0 & 1\\end{bmatrix}$.<br>1. Matritsa ko'paytmasi: $\\tilde{p}' = H p = \\begin{bmatrix}1\\cdot 2 + 0 + 4\\\\ 0 + 1\\cdot 1 + 2\\\\ 0.1\\cdot 2 + 0 + 1\\end{bmatrix} = \\begin{bmatrix}6\\\\ 3\\\\ 1.2\\end{bmatrix}$.<br>2. Gomogen normallash ($w = 1.2$ ga bo'lish!): $x' = 6 / 1.2 = \\mathbf{5.0}$, $y' = 3 / 1.2 = \\mathbf{2.5}$!<br><em>Tekshiruv:</em> Agar $h_{31} = h_{32} = 0$ bo'lganida bu sof affin siljish $(6, 3)$ bo'lar edi — proyektiv $h_{31}=0.1$ istiqbol (perspektiv) siqilishini keltirib chiqardi.</p>",
          en: "<p><strong>Given:</strong> $p=(2,1,1)^\\top$ and $H = [[1,0,4],[0,1,2],[0.1,0,1]]$.<br>1. $Hp = [6,\\ 3,\\ 1.2]^\\top$.<br>2. Perspective divide by $w=1.2$: $(x', y') = (6/1.2,\\ 3/1.2) = \\mathbf{(5.0,\\ 2.5)}$.</p>"
        },
        latex: "H\\begin{bmatrix}2\\\\1\\\\1\\end{bmatrix} = \\begin{bmatrix}6\\\\3\\\\1.2\\end{bmatrix} \\xrightarrow{\\div 1.2} \\begin{bmatrix}5.0\\\\2.5\\end{bmatrix}"
      },
      {
        heading: { uz: "9.4. Python / OpenCV Kod: SIFT + RANSAC + Kanvasga Warp", en: "9.4. Python Walkthrough: Homography Alignment & Stitcher" },
        bodyHtml: {
          uz: "<p><code>cv2.warpPerspective(img1, H, (w1+w2, h))</code> ikkinchi tasvir bilan bitta kanvasga tushirishda manfiy koordinatalarni kesib tashlamaslik uchun siljish matritsasi $T$ bilan ko'paytiriladi (<code>T @ H</code>). Tayyor mahsulotda <code>cv2.Stitcher_create()</code> dan foydalanish mumkin.</p>",
          en: "<p>When using <code>cv2.warpPerspective</code>, pre-multiply by a translation matrix $T$ if warped corners fall at negative coordinates. OpenCV's <code>cv2.Stitcher_create()</code> automates matching, adjustment, and multi-band blending.</p>"
        },
        code: `import cv2, numpy as np

img = np.zeros((180, 240, 3), np.uint8)
cv2.rectangle(img, (50, 40), (190, 140), (0, 200, 255), 3)
src_pts = np.float32([[50,40], [190,40], [190,140], [50,140]])
dst_pts = np.float32([[65,50], [210,30], [200,155], [40,145]])

H, status = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC, 5.0)
warped = cv2.warpPerspective(img, H, (240, 180), flags=cv2.INTER_LINEAR)
print("Homography H(0,2):", round(H[0,2], 2), "| Warped shape:", warped.shape)`
      },
      {
        heading: { uz: "9.5. Parallaks Xatosi, Ghosting va Amaliy Cheklovlar", en: "9.5. Parallax Artifacts, Ghosting & Practical Limits" },
        bodyHtml: {
          uz: "<p>Gomografiya faqat kamera aylanishida yoki yassi tekislikda aniq. Agar qo'lingiz bilan kamerani yon tomonga siljitsangiz va sahnada ham yaqin daraxt, ham uzoq bino bo'lsa, <strong>parallaks</strong> tufayli ikkalasini bir $H$ bilan tekislab bo'lmaydi. Harakatlanuvchi obyektlar (odam, mashina) esa chokda <strong>ghosting</strong> (ikkilangan soya) beradi — bunga qarshi optimal <em>seam finding (Graph-Cut)</em> qo'llaniladi.</p>",
          en: "<p>A single 2D homography holds ONLY for planar scenes or pure optical-center rotation. Translating past 3D objects at varying depths creates <strong>parallax</strong> ghosting; moving foreground subjects are handled via <em>Graph-Cut seam carving</em>.</p>"
        },
        discussion: {
          q: { uz: "Smartfonda panorama olayotganda qo'lni aylantirish o'rniga qadam bosib yurib rasm olsangiz choklarda nima yuz beradi?", en: "What happens if you walk sideways while capturing a panorama instead of rotating around the phone lens?" },
          a: { uz: "Kamera markazi siljiydi → yaqin va uzoq obyektlar turlicha siljib PARALLAKS va ikkilanish (ghosting) xatosini keltirib chiqaradi, chunki bitta 3×3 H matritsa 3D chuqurlikni sig'dira olmaydi.", en: "Translating the camera center introduces 3D PARALLAX between foreground and background objects, causing double-edge ghosting that no 3×3 homography can resolve." }
        }
      }
    ],
    slides: [
      { title: { uz: "9.1. Panorama Yaratish Quvuri (Stitching Pipeline)", en: "9.1. Complete Image Stitching Pipeline" }, points: { uz: ["1. Xususiyatlarni topish (SIFT / ORB)", "2. Lowe Ratio Test bilan juftlash", "3. RANSAC orqali 3×3 Gomografiya H ni baholash", "4. Kanvasga Teskari Xaritalash (Inverse Warping)", "5. Multi-Band Laplacian Blending bilan choklarni yo'qotish"], en: ["1. Keypoints & Descriptors (SIFT/ORB)", "2. Matching + Lowe Ratio Test", "3. Robust Homography H via RANSAC", "4. Inverse Warping onto shared canvas", "5. Multi-Band Blending to erase seams"] } },
      { title: { uz: "3×3 Gomografiya Matritsasi (8 DOF)", en: "3×3 Planar Homography (8 Degrees of Freedom)" }, latex: "\\lambda \\begin{bmatrix} x' \\\\ y' \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} h_{11}&h_{12}&h_{13}\\\\h_{21}&h_{22}&h_{23}\\\\h_{31}&h_{32}&h_{33} \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\\\ 1 \\end{bmatrix}", points: { uz: ["9 ta element, masshtab (h33=1) bilan → 8 ta erkin parametr (DOF)", "1 juft nuqta = 2 tenglama → kamida 4 ta kollinear bo'lmagan nuqta shart!", "Qo'llanilishi: Panorama, Hujjat tekislash (Doc Scanner), AR stiker qo'yish"], en: ["9 entries up to scale → 8 DOF", "Needs minimum 4 non-collinear point pairs (4×2=8 eqs)", "Used in Panoramas, Document Warping & Planar AR"] } },
      { title: { uz: "Teskari Xaritalash (Inverse Warp) Nega Kerak?", en: "Forward vs Inverse Mapping in Warping" }, points: { uz: ["Oldinga (Forward): kirish piksellari butun koordinataga tushmay chiqishda teshiklar qoladi", "Teskari (Inverse): har bir chiqish (x', y') pikseli H⁻¹ orqali kirishga tushiriladi", "Kasr koordinatada Bilineyar/Bikubik interpolyatsiya — teshiksiz toza tasvir!"], en: ["Forward warp leaves ugly black output holes", "Inverse warp maps every output pixel back via H⁻¹ + bilinear interpolation → hole-free!"] } },
      { title: { uz: "Sonli Misol (Doskada): H Matritsasi Bilan Proyeksiya", en: "Worked Example: Projecting a Point via H" }, points: { uz: ["Nuqta (2, 1, 1)ᵀ va H = [[1, 0, 4], [0, 1, 2], [0.1, 0, 1]]", "1. Ko'paytma: x̃ = 2+4 = 6; ỹ = 1+2 = 3; w = 0.1(2)+1 = 1.2", "2. Gomogen bo'lish (÷ w): x' = 6/1.2 = 5.0, y' = 3/1.2 = 2.5", "h31 = 0.1 nol bo'lmagani uchun perspektiv siqilish yuz berdi!"], en: ["p=[2,1,1]ᵀ, H=[[1,0,4],[0,1,2],[0.1,0,1]] → Hp = [6, 3, 1.2]ᵀ", "Perspective divide by w=1.2 yields (5.0, 2.5)!"] } },
      { title: { uz: "Choklarni Yumshatish (Feathering vs Multi-Band)", en: "Seam Blending: Averaging vs Feathering vs Multi-Band" }, widget: 'homography-sim' },
      { title: { uz: "Bundle Adjustment & Parallaks Cheklovi", en: "Bundle Adjustment, Seam Finding & Parallax" }, points: { uz: ["Zanjirli xato (Drift): ketma-ket H1·H2·H3 ko'paytma oxirini egib yuboradi → Bundle Adjustment", "Parallaks: Kamera siljiganda 3D chuqurlik sabab bitta H yetmaydi", "Ghosting (harakatlanuvchi mashina/odam) → Graph-Cut minimal chok qidirish"], en: ["Chain drift fixed via global Bundle Adjustment", "Parallax breaks 2D homography under camera translation", "Graph-Cut seam optimization removes moving ghosting"] } },
      { title: { uz: "Python Kod: findHomography + warpPerspective", en: "Python Walkthrough: Homography & Warping" }, code: `H, mask = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC, 5.0)
warped = cv2.warpPerspective(img1, H, (w1 + w2, h1))
# Tayyor ko'p tasvirli panorama uchun:
stitcher = cv2.Stitcher_create()
status, pano = stitcher.stitch([img1, img2, img3])` },
      { title: { uz: "Muhokama: Qo'lda Panorama Olish Qoidasi", en: "Discussion: Why Rotate Around the Lens Center?" }, discussion: { q: { uz: "Smartfonda panorama olayotganda qo'lni aylantirish o'rniga yon tomonga yurib ketsangiz nima bo'ladi?", en: "What fails if you translate sideways instead of rotating your phone during panorama capture?" }, a: { uz: "Kamera siljishi yaqin va uzoq obyektlar orasida PARALLAKS va choklarda ikkilanish (ghosting) hosil qiladi.", en: "Translation produces 3D parallax between near/far objects that no single 3×3 homography can align." } } }
    ],
    glossary: [
      { uz: "gomografiya", en: "homography", defUz: "8 parametrli 3×3 proyektiv tekislik transformatsiyasi", defEn: "8-DOF 3×3 planar projective transformation" },
      { uz: "teskari xaritalash", en: "inverse mapping", defUz: "Chiqish pikselidan H⁻¹ orqali kirish koordinatasini topish", defEn: "Mapping output pixels back via H⁻¹ + interpolation" },
      { uz: "parallaks", en: "parallax", defUz: "Kamera siljishida yaqin va uzoq obyektlarning turlicha siljishi", defEn: "Apparent relative shift of objects at different depths under translation" }
    ],
    quiz: [
      { q: { uz: "3×3 gomografiya matritsasini hisoblash uchun tekislikda kamida nechta mos nuqta juftligi kerak?", en: "What is the minimum number of point pairs required to compute a 3×3 homography?" }, options: [{ label: 'A', uz: "2 ta", en: "2" }, { label: 'B', uz: "4 ta", en: "4" }, { label: 'C', uz: "6 ta", en: "6" }, { label: 'D', uz: "8 ta", en: "8" }], answer: 'B', explanation: { uz: "H matritsada 8 ta erkin parametr bor; har juftlik 2 tenglama beradi → 4×2 = 8.", en: "8 degrees of freedom ÷ 2 equations per point pair = 4 pairs." } },
      { q: { uz: "Tasvirlarni warp qilishda nima uchun teskari xaritalash (inverse mapping) afzal ko'riladi?", en: "Why is inverse mapping preferred when warping images?" }, options: [{ label: 'A', uz: "Chiqish tasvirida bo'shliqlar (holes) qolmasligi uchun", en: "To prevent holes/missing pixels in the output image" }, { label: 'B', uz: "Faylni JPEG qilish uchun", en: "To convert to JPEG" }, { label: 'C', uz: "RANSAC ni o'chirish uchun", en: "To bypass RANSAC" }, { label: 'D', uz: "Rangni o'zgartirish uchun", en: "To alter colors" }], answer: 'A', explanation: { uz: "Teskari xaritalash har bir chiqish pikseli uchun kirishdan interpolyatsiya qilib qiymat oladi.", en: "Every output pixel samples the input image via bilinear interpolation, leaving zero gaps." } },
      { q: { uz: "Kamera o'z o'qi atrofida aylanmasdan fazoda siljiganda panoramada qanday xato yuzaga keladi?", en: "What artifact occurs in homography stitching when the camera translates in a 3D scene?" }, options: [{ label: 'A', uz: "Parallaks xatosi (chokda ikkilanish)", en: "Parallax error (double edges at seams)" }, { label: 'B', uz: "Posterizatsiya", en: "Posterization" }, { label: 'C', uz: "Salt-and-pepper", en: "Salt-and-pepper" }, { label: 'D', uz: "Vanishing gradient", en: "Vanishing gradient" }], answer: 'A', explanation: { uz: "Yaqin va uzoq obyektlar turlicha siljiydi, bitta H matritsa buni modellashtira olmaydi.", en: "Depth differences cause parallax that a single 2D homography cannot align." } },
      { q: { uz: "Laplacian piramida asosidagi ko'p masshtabli (multi-band) blending nimani ta'minlaydi?", en: "What does multi-band (Laplacian) blending achieve in panoramas?" }, options: [{ label: 'A', uz: "Ekspozitsiya farqisiz sezilmas chok chizig'i", en: "Seamless transitions across exposure differences" }, { label: 'B', uz: "Tasvirni 2 barobar kichraytirish", en: "2x downsampling" }, { label: 'C', uz: "Faqat kulrang panorama", en: "Grayscale only" }, { label: 'D', uz: "Canny chekkalari", en: "Canny edges" }], answer: 'A', explanation: { uz: "Past va yuqori chastotalarni alohida kenglikda birlashtirib eng tabiiy chok beradi.", en: "Blends low frequencies smoothly and high frequencies sharply without ghosting." } }
    ],
    matching: [
      { left: { uz: "Gomografiya H", en: "Homography H" }, right: { uz: "8 erkin parametrli 3×3 proyektiv matritsa", en: "3×3 projective transform (8 DOF)" } },
      { left: { uz: "Bundle Adjustment", en: "Bundle Adjustment" }, right: { uz: "Ko'p tasvirli ketma-ket xato to'planishini (drift) kamaytirish", en: "Joint multi-image optimization preventing drift" } },
      { left: { uz: "Feathering", en: "Feathering" }, right: { uz: "Ustma-ust sohada chiziqli α-vaznli o'tish", en: "Linear distance-weighted alpha blending" } },
      { left: { uz: "Parallaks", en: "Parallax" }, right: { uz: "Kamera siljiganda 3D chuqurlik sabab chok buzilishi", en: "Seam misalignment from camera translation" } }
    ],
    fillGap: [
      { text: { uz: "3×3 gomografiya matritsasi masshtab normalizatsiyasidan keyin ___ ta erkin parametrga ega.", en: "A 3×3 homography matrix has ___ degrees of freedom." }, answer: ['8', 'sakkiz', 'eight'] },
      { text: { uz: "Panoramada ustma-ust tushuvchi tasvirlarda harakatlanuvchi obyekt ikki marta ko'rinishi ___ effekti deyiladi.", en: "Double-exposure artifacts of moving objects in blending are called ___." }, answer: ['ghosting'] },
      { text: { uz: "OpenCV da tayyor panorama yig'ish klassi cv2.___ deb nomlanadi.", en: "OpenCV's high-level panorama pipeline class is cv2.___." }, answer: ['Stitcher', 'Stitcher_create'] }
    ]
  },

  // ==================== M10 ====================
  {
    id: 10,
    code: 'M10',
    labId: 10,
    hours: 2,
    keywords: ['Pinhole Camera', 'Intrinsic Matrix', 'Extrinsic', 'Homogeneous Coordinates', 'Epipolar Geometry', 'Fundamental Matrix'],
    title: {
      uz: "Proyeksiv geometriya va kamera modeli (Pinhole, K, [R|t])",
      en: "Projective Geometry & Pinhole Camera Model"
    },
    description: {
      uz: "Pinhole kamera modeli, 3D→2D perspektiv proyeksiya, gomogen koordinatalar, ichki (K) va tashqi ([R|t]) parametrlar, Euler/kvaternionlar va epipolyar geometriya (E, F).",
      en: "Pinhole projection, homogeneous coordinates, intrinsic matrix K, extrinsic [R|t] (Euler & quaternions), and epipolar geometry (E, F matrices)."
    },
    refs: [
      { label: "Szeliski Ch. 2.1: Geometric Primitives & Cameras", url: "https://szeliski.org/Book/" },
      { label: "Stanford CS131: Camera Models", url: "https://cs131.stanford.edu/" },
      { label: "Awesome CV: Multiple View Geometry", url: "https://github.com/jbhuang0604/awesome-computer-vision" }
    ],
    sections: [
      {
        heading: { uz: "10.1. Pinhole Kamera Modeli va Perspektiv Proyeksiya", en: "10.1. Pinhole Camera Geometry & Perspective Projection" },
        bodyHtml: {
          uz: "<p><strong>Pinhole kamera</strong> kichik optik teshik (<em>camera obscura</em>) orqali 3D dunyo nuqtasi $P=(X,Y,Z)^\\top$ ni $f$ fokus masofadagi 2D tekislikka tushiradi. O'xshash uchburchaklar qoidasiga ko'ra: $x = f\\frac{X}{Z},\\ y = f\\frac{Y}{Z}$.</p><p><strong>Perspektiv xossalar:</strong> Uzoqdagi obyektlar ($Z$ katta) kichik ko'rinadi (<em>foreshortening</em>), parallel temir yo'l relslari cheksizlikda bitta <strong>yo'qolish nuqtasi (vanishing point)</strong> da uchrashadi.</p>",
          en: "<p>A <strong>pinhole camera</strong> projects 3D coordinates $(X, Y, Z)^\\top$ onto a focal plane at distance $f$ via similar triangles: $x = f(X/Z),\\ y = f(Y/Z)$.</p><p><strong>Perspective Effects:</strong> Objects shrink linearly with depth $Z$ (foreshortening), and parallel 3D lines meet at <strong>vanishing points</strong>.</p>"
        },
        latex: "x = f\\frac{X}{Z}, \\quad y = f\\frac{Y}{Z}",
        widget: 'pinhole-sim'
      },
      {
        heading: { uz: "10.2. Gomogen Koordinatalar, Ichki (K) va Tashqi [R|t] Matritsalar", en: "10.2. Homogeneous Coordinates, Intrinsics K & Extrinsics [R|t]" },
        bodyHtml: {
          uz: "<p>Bo'lish amalini ($\\div Z$) chiziqli matritsa ko'paytmasiga aylantirish uchun <strong>gomogen koordinatalar</strong> $(X,Y,Z,1)^\\top$ kiritiladi. Umumiy 3×4 kamera matritsasi $P = K[R \\mid t]$ uchta almashtirishni birlashtiradi:</p><p>• <strong>Tashqi parametrlar $[R \\mid t]$:</strong> Dunyo koordinatasidan kamera koordinatasiga o'tish ($R$ 3×3 ortogonal burilish, $t$ 3×1 siljish; burilishda <em>gimbal lock</em> dan qochish uchun <strong>kvaternionlar</strong> ishlatiladi).<br>• <strong>Ichki parametrlar $K$:</strong> Fokal masofa $(f_x, f_y)$ piksellarda va optik markaz $(c_x, c_y)$ (odatda tasvir o'rtasi $(W/2, H/2)$).</p>",
          en: "<p>Using <strong>homogeneous coordinates</strong> $(X,Y,Z,1)^\\top$ turns non-linear perspective division into one linear projection matrix $P = K[R \\mid t]$:</p><p>• <strong>Extrinsics $[R \\mid t]$:</strong> World-to-camera rigid pose (rotation via orthogonal $R$ or gimbal-lock-free <strong>quaternions</strong> + translation $t$).<br>• <strong>Intrinsics $K$:</strong> Pixel focal lengths $(f_x, f_y)$ and optical principal center $(c_x, c_y)$.</p>"
        },
        latex: "\\lambda \\begin{bmatrix} u \\\\ v \\\\ 1 \\end{bmatrix} = K [R \\mid t] \\begin{bmatrix} X \\\\ Y \\\\ Z \\\\ 1 \\end{bmatrix}, \\quad K = \\begin{bmatrix} f_x & s & c_x \\\\ 0 & f_y & c_y \\\\ 0 & 0 & 1 \\end{bmatrix}"
      },
      {
        heading: { uz: "10.3. Epipolyar Geometriya: Essential (E) va Fundamental (F) Matritsalar", en: "10.3. Epipolar Geometry: Essential E & Fundamental F" },
        bodyHtml: {
          uz: "<p>Ikki kamera bir xil 3D nuqta $P$ ni ko'rganda, $P$ va ikki kamera markazi $O_1, O_2$ yagona <strong>epipolyar tekislik</strong> hosil qiladi. Natijada 1-tasvirdagi nuqta uchun 2-tasvirdagi mos nuqtani butun 2D bo'ylab emas, faqat 1D <strong>epipolyar chiziq</strong> bo'ylab qidirish yetarli!</p><p>• <strong>Essential matritsa $E = [t]_\\times R$:</strong> Kalibrlangan ($K$ ma'lum), normallangan koordinatada ($\\text{rank}=2$, 5 DOF).<br>• <strong>Fundamental matritsa $F = K'^{-\\top} E K^{-1}$:</strong> Kalibrlanmagan ($\\text{rank}=2$, 7 DOF), klassik <strong>8-nuqta algoritmi</strong> + RANSAC bilan topiladi — SfM va Visual SLAM ning yuragi!</p>",
          en: "<p>Two views observing point $P$ share an <strong>epipolar plane</strong>, constraining corresponding matches in view 2 onto a 1D <strong>epipolar line</strong> ($x'^\\top F x = 0$). <strong>Essential Matrix $E=[t]_\\times R$</strong> assumes known $K$ (5 DOF); <strong>Fundamental Matrix $F$</strong> handles uncalibrated pixels ($\text{rank}=2$, 7 DOF) via the normalized 8-point algorithm.</p>"
        },
        latex: "x'^\\top F x = 0, \\quad \\operatorname{rank}(F) = 2, \\quad E = [t]_\\times R"
      },
      {
        heading: { uz: "10.4. Sonli Hisoblash Misoli (Doskada): 3D Nuqtani 2D Pikselga Proyeksiya", en: "10.4. Worked Numerical Example: 3D → 2D Pixel Projection" },
        bodyHtml: {
          uz: "<p><strong>Berilgan:</strong> Fokal masofa $f=50\\text{ mm}$ ($f_x=f_y=1000\\text{ px}$), tasvir markazi $(c_x, c_y)=(640, 360)$, 3D nuqta kamera koordinatasida $X=2\\text{ m}, Y=1\\text{ m}, Z=10\\text{ m}$.<br>1. Metrik tekislikda: $x = f\\frac{X}{Z} = 50\\cdot\\frac{2}{10} = \\mathbf{10\\text{ mm}}$, $y = 50\\cdot\\frac{1}{10} = \\mathbf{5\\text{ mm}}$.<br>2. Piksel koordinatalarida: $u = f_x\\frac{X}{Z} + c_x = 1000\\cdot\\frac{2}{10} + 640 = \\mathbf{840\\text{ px}}$; $v = 1000\\cdot\\frac{1}{10} + 360 = \\mathbf{460\\text{ px}}$.<br>3. Agar obyekt 2× uzoqlashsa ($Z = 20\\text{ m}$), piksel markazdan siljishi 2× kichrayadi: $u = 100 + 640 = \\mathbf{740\\text{ px}},\\ v = 50 + 360 = \\mathbf{410\\text{ px}}$!</p>",
          en: "<p><strong>Given:</strong> $f=50\\text{ mm}$ ($f_x=f_y=1000\\text{ px}$), $(c_x,c_y)=(640,360)$, point $(X=2, Y=1, Z=10)\\text{ m}$.<br>1. Metric plane: $x=50(2/10)=\\mathbf{10\\text{ mm}}, y=\\mathbf{5\\text{ mm}}$.<br>2. Pixels: $u = 1000(0.2)+640 = \\mathbf{840\\text{ px}},\\ v = 1000(0.1)+360 = \\mathbf{460\\text{ px}}$. Doubling $Z$ to $20\\text{ m}$ halves the offset from $(640,360)$ to $(740,410)$.</p>"
        },
        code: `import cv2, numpy as np

K = np.array([[1000.0, 0.0, 640.0],
              [0.0, 1000.0, 360.0],
              [0.0, 0.0, 1.0]])
rvec, tvec = np.zeros(3), np.zeros(3)
pts_3d = np.array([[2.0, 1.0, 10.0], [2.0, 1.0, 20.0]], dtype=np.float32)

# Qo'lda P = K[I|0] va OpenCV cv2.projectPoints solishtirish
proj_cv, _ = cv2.projectPoints(pts_3d, rvec, tvec, K, None)
print("Z=10m pixel:", proj_cv[0].ravel(), "| Z=20m pixel:", proj_cv[1].ravel())`
      },
      {
        heading: { uz: "10.5. Chuqurlik Noaniqligi & 3D Rekonstruksiya (SfM / SLAM)", en: "10.5. Depth Ambiguity & Structure from Motion" },
        bodyHtml: {
          uz: "<p>Bitta kameradan olingan 2D piksel $(u, v)$ ga cheksiz ko'p 3D nuqtalar $(\\lambda X, \\lambda Y, \\lambda Z)$ to'g'ri keladi (<em>scale / depth ambiguity</em> — shuning uchun odam rasmda minorani ushlab turgandek 'optik aldanish' qilish mumkin!). Haqiqiy 3D nuqtani tiklash uchun kamida 2 ta kamera (triangulyatsiya) yoki ma'lum obyekt o'lchami zarur.</p>",
          en: "<p>A single 2D ray throws away depth $\\lambda$ (<em>scale ambiguity</em> — enabling forced-perspective illusions!). Recovering true 3D coordinates requires two calibrated viewpoints (triangulation / SfM) or known object metric scale.</p>"
        },
        discussion: {
          q: { uz: "Nima uchun bitta oddiy monokulyar kameradan avtomobilning aniq metr masofasini qo'shimcha ma'lumotsiz topib bo'lmaydi?", en: "Why can't a single monocular camera determine exact metric distance in meters without prior scale knowledge?" },
          a: { uz: "Proyeksiya tenglamasi λ[u,v,1]ᵀ = K[R|t][X,Y,Z,1]ᵀ da (2X, 2Y, 2Z) — ya'ni 2× katta va 2× uzoqroq obyekt — aynan bir xil (u, v) pikselni beradi (masshtab noaniqligi).", en: "Because scaling world size and depth by λ (e.g., 2× larger car at 2× distance Z) projects to identical pixel coordinates (u, v)." }
        }
      }
    ],
    slides: [
      { title: { uz: "10.1. Pinhole Kamera Modeli va Perspektiv Proyeksiya", en: "10.1. Pinhole Camera Model & Foreshortening" }, latex: "x = f\\frac{X}{Z}, \\quad y = f\\frac{Y}{Z}", points: { uz: ["O'xshash uchburchaklar: tasvir koordinatasi chuqurlik Z ga teskari proporsional", "Uzoqdagi obyektlar kichrayadi; parallel chiziqlar yo'qolish nuqtasida uchrashadi", "Gomogen koordinatalar (X, Y, Z, 1)ᵀ bo'lish amalini chiziqli matritsaga aylantiradi"], en: ["Similar triangles: image coords shrink as 1/Z", "Parallel lines converge at vanishing points", "Homogeneous (X,Y,Z,1)ᵀ turns projection into matrix multiply"] } },
      { title: { uz: "Interaktiv Pinhole Proyeksiya Simulatori", en: "Interactive Pinhole Projection Lab" }, widget: 'pinhole-sim' },
      { title: { uz: "To'liq Proyeksiya Tenglamasi P = K [R | t]", en: "Full Projection Matrix P = K [R | t]" }, latex: "\\lambda\\begin{bmatrix}u\\\\v\\\\1\\end{bmatrix} = \\begin{bmatrix}f_x & s & c_x\\\\0 & f_y & c_y\\\\0 & 0 & 1\\end{bmatrix}[R\\mid t]\\begin{bmatrix}X\\\\Y\\\\Z\\\\1\\end{bmatrix}", points: { uz: ["K (3×3): ichki parametrlar — fokal (fx, fy) va asosiy nuqta (cx, cy)", "[R | t] (3×4): tashqi parametrlar — dunyodan kameraga burilish R va siljish t", "R ni ifodalash: Euler (gimbal lock xavfi!) vs Kvaternionlar (4D birlik vektor)"], en: ["K (3×3): Intrinsics (fx, fy, cx, cy)", "[R | t] (3×4): Extrinsics (rigid world-to-camera pose)", "Quaternions avoid Euler gimbal-lock singularities"] } },
      { title: { uz: "Sonli Misol (Doskada): 3D → 2D Proyeksiya", en: "Worked Example: 3D Point Projection" }, points: { uz: ["f = 50 mm (fx = fy = 1000 px), (cx, cy) = (640, 360), P = (2m, 1m, 10m)", "Metrik: x = 50 × (2/10) = 10 mm; y = 50 × (1/10) = 5 mm", "Piksel: u = 1000×(2/10) + 640 = 840 px; v = 1000×(1/10) + 360 = 460 px", "Agar Z = 20m bo'lsa → u = 740 px, v = 410 px (markazga 2× yaqinlashadi!)"], en: ["f=50mm (fx=1000px), center=(640,360), P=(2,1,10)m", "x=10mm, y=5mm → u=840px, v=460px; at Z=20m → u=740px, v=410px!"] } },
      { title: { uz: "Epipolyar Geometriya: Essential (E) & Fundamental (F)", en: "Epipolar Geometry: Essential E & Fundamental F" }, latex: "x'^\\top F x = 0, \\quad \\operatorname{rank}(F)=2, \\quad E = [t]_\\times R", points: { uz: ["2-tasvirdagi mos nuqtani butun 2D rasm emas, 1D epipolyar chiziqda qidiramiz!", "Essential E: kalibrlangan kamera (5 DOF)", "Fundamental F: kalibrlanmagan kamera (rank=2, 7 DOF, 8-nuqta algoritmi)", "SfM (Structure from Motion) va Visual SLAM ning geometrik poydevori"], en: ["Reduces 2D stereo search to a 1D epipolar line", "E = calibrated (5 DOF); F = uncalibrated (rank=2, 8-pt algorithm)", "Core geometry powering SfM & Visual SLAM"] } },
      { title: { uz: "Matritsalar Xulosasi: 2D Homografiya vs E vs F", en: "Comparison: Homography H vs Essential E vs Fundamental F" }, table: { headers: { uz: ["Matritsa", "DOF", "Min nuqta", "Qayerda ishlaydi"], en: ["Matrix", "DOF", "Min Pairs", "Domain"] }, rows: { uz: [["Homografiya H", "8", "4", "Yassi sirt yoki sof kamera aylanishi"], ["Essential E", "5", "5 (Nister)", "Kalibrlangan 3D sahna (K ma'lum)"], ["Fundamental F", "7", "8 (Longuet-Higgins)", "Kalibrlanmagan ixtiyoriy 3D sahna"]], en: [["Homography H", "8", "4", "Planar scenes or pure rotation"], ["Essential E", "5", "5", "Calibrated 3D scenes (known K)"], ["Fundamental F", "7", "8", "Uncalibrated 3D scenes"]] } } },
      { title: { uz: "Python Kod: K[R|t] va cv2.projectPoints Tekshiruvi", en: "Python Code: Manual Projection vs cv2.projectPoints" }, code: `K = np.array([[1000., 0, 640.], [0, 1000., 360.], [0, 0, 1.]])
pts_3d = np.array([[2.0, 1.0, 10.0], [2.0, 1.0, 20.0]], np.float32)
proj, _ = cv2.projectPoints(pts_3d, np.zeros(3), np.zeros(3), K, None)
print("Z=10m ->", proj[0].ravel(), "| Z=20m ->", proj[1].ravel())` },
      { title: { uz: "Muhokama: Monokulyar Kamera Masshtab Noaniqligi", en: "Discussion: Monocular Scale Ambiguity" }, discussion: { q: { uz: "Nima uchun bitta oddiy kameradan (qo'shimcha o'lchovsiz) mashinagacha bo'lgan aniq metr masofani tiklab bo'lmaydi?", en: "Why can't a single camera recover exact metric depth without prior object size?" }, a: { uz: "2× katta mashina 2× uzoqda tursa ham aynan bir xil (u, v) piksel tasvirini beradi (λ masshtab noaniqligi). Haqiqiy metr o'lchovi uchun stereo kamera, LiDAR yoki ma'lum o'lcham (masalan, yo'l eni/avto g'ildiragi) kerak.", en: "A car twice as large at twice the distance projects onto identical pixels (scale ambiguity λ). Metric depth needs stereo baseline, LiDAR, or known physical priors." } } }
    ],
    glossary: [
      { uz: "ichki parametrlar (K)", en: "intrinsic matrix K", defUz: "Fokal masofa va asosiy nuqtani o'z ichiga olgan 3×3 matritsa", defEn: "3×3 camera calibration matrix containing fx, fy, cx, cy" },
      { uz: "gomogen koordinatalar", en: "homogeneous coordinates", defUz: "(n+1) o'lchamli vektor orqali proyeksiyani chiziqlashtirish", defEn: "(n+1)-vector representation unifying projective transforms" },
      { uz: "fundamental matritsa F", en: "fundamental matrix F", defUz: "Kalibrlanmagan ikki kamera orasidagi rank=2 epipolyar matritsa", defEn: "Rank-2 3×3 matrix encoding uncalibrated epipolar geometry" }
    ],
    quiz: [
      { q: { uz: "Kameraning ichki parametrlar matritsasi K tarkibiga qaysi kattaliklar kiradi?", en: "Which parameters belong to the camera intrinsic matrix K?" }, options: [{ label: 'A', uz: "Aylanish R va siljish t", en: "Rotation R & translation t" }, { label: 'B', uz: "Fokal masofa (fx, fy) va asosiy nuqta (cx, cy)", en: "Focal lengths (fx, fy) and principal point (cx, cy)" }, { label: 'C', uz: "Disparitet va baza", en: "Disparity and baseline" }, { label: 'D', uz: "YOLO ankorlari", en: "YOLO anchors" }], answer: 'B', explanation: { uz: "K faqat kameraning ichki optik/sensor geometrik parametrlarini saqlaydi.", en: "K holds internal focal lengths and optical principal point offsets." } },
      { q: { uz: "f=50 mm bo'lganda (X=2m, Y=1m, Z=10m) nuqta tasvir tekisligida qayerga proyeksiyalanadi?", en: "With f=50 mm, where does (X=2m, Y=1m, Z=10m) project?" }, options: [{ label: 'A', uz: "(20 mm, 10 mm)", en: "(20 mm, 10 mm)" }, { label: 'B', uz: "(10 mm, 5 mm)", en: "(10 mm, 5 mm)" }, { label: 'C', uz: "(5 mm, 2.5 mm)", en: "(5 mm, 2.5 mm)" }, { label: 'D', uz: "(50 mm, 25 mm)", en: "(50 mm, 25 mm)" }], answer: 'B', explanation: { uz: "x = 50×(2/10) = 10 mm, y = 50×(1/10) = 5 mm.", en: "x = 50·(2/10) = 10 mm, y = 50·(1/10) = 5 mm." } },
      { q: { uz: "Fundamental matritsa F ning darajasi (rank) nechaga teng va uni topish uchun kamida nechta nuqta kerak?", en: "What is the rank of Fundamental matrix F and the minimum point pairs needed?" }, options: [{ label: 'A', uz: "Rank=3, 4 ta nuqta", en: "Rank=3, 4 points" }, { label: 'B', uz: "Rank=2, kamida 8 ta nuqta", en: "Rank=2, at least 8 points" }, { label: 'C', uz: "Rank=1, 2 ta nuqta", en: "Rank=1, 2 points" }, { label: 'D', uz: "Rank=2, 4 ta nuqta", en: "Rank=2, 4 points" }], answer: 'B', explanation: { uz: "F matritsa rank=2 ga ega va klassik 8-nuqta algoritmi bilan baholanadi.", en: "F is rank-2 and estimated via the 8-point algorithm." } },
      { q: { uz: "3D aylanishni ifodalashda Euler burchaklari o'rniga kvaternionlar nima uchun ishlatiladi?", en: "Why use quaternions instead of Euler angles for 3D rotations?" }, options: [{ label: 'A', uz: "Gimbal lock muammosini oldini olish va barqaror interpolyatsiya uchun", en: "To avoid gimbal lock and enable smooth interpolation" }, { label: 'B', uz: "2D chizish uchun", en: "For 2D drawing" }, { label: 'C', uz: "Distorsiyani oshirish uchun", en: "To add distortion" }, { label: 'D', uz: "RGB konvertatsiya uchun", en: "For RGB conversion" }], answer: 'A', explanation: { uz: "Kvaternionlar (4D birlik vektor) gimbal qulfi muammosisiz silliq aylanish beradi.", en: "Quaternions avoid gimbal-lock singularities." } }
    ],
    matching: [
      { left: { uz: "K matritsasi", en: "Intrinsic Matrix K" }, right: { uz: "Fokal masofa va asosiy nuqta (fx, fy, cx, cy)", en: "Focal length & principal point" } },
      { left: { uz: "[R | t]", en: "Extrinsic [R | t]" }, right: { uz: "Kameraning 3D dunyodagi burilishi va siljishi", en: "Camera 3D pose (rotation & translation)" } },
      { left: { uz: "Fundamental matritsa F", en: "Fundamental Matrix F" }, right: { uz: "Kalibrlanmagan ikki tasvir orasidagi epipolyar bog'liqlik", en: "Uncalibrated two-view epipolar constraint" } },
      { left: { uz: "Essensial matritsa E", en: "Essential Matrix E" }, right: { uz: "Kalibrlangan kameralarning nisbiy [R|t] bog'liqligi", en: "Calibrated relative pose constraint" } }
    ],
    fillGap: [
      { text: { uz: "Pinhole kamera modelida uzoqdagi obyektlar kichikroq ko'rinishi ___ proyeksiya xossasidir.", en: "Distant objects appearing smaller in a pinhole camera is due to ___ projection." }, answer: ['perspektiv', 'perspective'] },
      { text: { uz: "Bir tekislikdagi 3D nuqta va ikki kamera markazidan o'tuvchi tekislik ___ tekislik deyiladi.", en: "The plane through a 3D point and two camera centers is the ___ plane." }, answer: ['epipolyar', 'epipolar'] },
      { text: { uz: "To'liq proyeksiya matritsasi P = K · [ ___ | t ] ko'rinishida yoziladi.", en: "The full camera projection matrix is P = K · [ ___ | t ]." }, answer: ['R'] }
    ]
  }
);
