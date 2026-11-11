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
        heading: { uz: "6.1. Gradientga Asoslangan Usullar: Sobel, Prewitt, Scharr", en: "6.1. Gradient Operators: Sobel, Prewitt & Scharr" },
        bodyHtml: {
          uz: "<p><strong>Chekka (edge)</strong> — yorqinlik keskin o'zgaradigan mintaqa bo'lib, matematik jihatdan tasvir gradienti $\\nabla f = [\\partial f/\\partial x,\\, \\partial f/\\partial y]$ katta bo'lgan nuqtalarga mos keladi.</p><p><strong>Sobel operatori</strong> markaziy qator/ustunga $\\pm 2$ vazn berib silliqlashni birlashtiradi va <strong>Prewitt</strong> ($\pm 1$) dan ko'ra shovqinga barqarorroq. <strong>Scharr</strong> 3×3 da burchak aniqligini yanada oshiradi. Ikkalasi ham ajraluvchan filtrdir.</p>",
          en: "<p>An <strong>edge</strong> corresponds to high image gradient magnitude $|\\nabla f|$. <strong>Sobel</strong> weights the center row/column by $\\pm 2$ (combining smoothing + derivative), making it more noise-resistant than <strong>Prewitt</strong> ($\\pm 1$). <strong>Scharr</strong> further improves 3×3 rotational symmetry.</p>"
        },
        latex: "|\\nabla f| = \\sqrt{G_x^2 + G_y^2}, \\quad \\theta = \\arctan\\!\\left(\\frac{G_y}{G_x}\\right)",
        callout: {
          type: 'info',
          uz: "<strong>Sonli misol:</strong> Vertikal chekka $I=[[10,10,90],[10,10,90],[10,10,90]]$ ga Sobel $G_x=[[-1,0,1],[-2,0,2],[-1,0,1]]$ qo'llansa: $G_x = 80+160+80 = 320$, $G_y=0 \\implies |\\nabla f|=320,\\ \\theta=0°$ (gorizontal gradient!).",
          en: "<strong>Worked Example:</strong> On vertical edge $I=[[10,10,90],[10,10,90],[10,10,90]]$, Sobel gives $G_x = 80+160+80 = 320$ and $G_y = 0$, yielding $|\\nabla f| = 320$ at $\\theta = 0°$."
        }
      },
      {
        heading: { uz: "6.2. Canny Algoritmining 5 Bosqichi", en: "6.2. The 5-Stage Canny Edge Detector (1986)" },
        bodyHtml: {
          uz: "<p>John Canny (1986) 3 ta mezonni (yaxshi aniqlash, aniq lokalizatsiya, yagona javob) qanoatlantiruvchi 5 bosqichli algoritm yaratdi: 1) Gauss silliqlash; 2) Sobel gradienti; 3) <strong>Maksimal bo'lmaganlarni bostirish (NMS)</strong> — chekkani 1-piksel qalinlikka keltiradi; 4) <strong>Ikkilangan chegara</strong> ($T_{\\text{high}}/T_{\\text{low}} \\approx 2:1$ yoki $3:1$); 5) <strong>Gisterezis</strong> — zaif chekkalarni kuchli chekkaga ulangan bo'lsagina saqlab qolish.</p>",
          en: "<p>Canny (1986) optimizes detection, localization, and single response in 5 steps: (1) Gaussian blur, (2) Sobel gradients, (3) <strong>Non-Maximum Suppression (NMS)</strong> for 1-px thin edges, (4) <strong>Double Thresholding</strong> ($T_{\\text{high}}:T_{\\text{low}} \\approx 2:1..3:1$), and (5) <strong>Hysteresis Tracking</strong> connecting weak edges to strong ones.</p>"
        },
        widget: 'edge-canny'
      }
    ],
    slides: [
      { title: { uz: "M6: Chekkalarni Aniqlash (Sobel, Prewitt, Canny)", en: "M6: Edge Detection (Sobel, Prewitt, Canny)" }, subtitle: { uz: "KOK1506 · Szeliski Ch. 4.2", en: "KOK1506 · Szeliski Ch. 4.2" }, points: { uz: ["Gradient kattaligi va yo'nalishi", "Sobel (±2 markaz) vs Prewitt (±1) vs Scharr", "Canny 5 bosqichi: Gauss → Sobel → NMS → Double Thresh → Hysteresis", "F1-ko'rsatkich bilan chekkalarni baholash"], en: ["Gradient magnitude & orientation", "Sobel (±2 center) vs Prewitt (±1) vs Scharr", "Canny 5 stages: Blur → Sobel → NMS → Double Thresh → Hysteresis", "Edge detection benchmark via F1 score"] } },
      { title: { uz: "Interaktiv Canny 5-Bosqich Steperi", en: "Interactive 5-Stage Canny Explorer" }, widget: 'edge-canny' },
      { title: { uz: "Sobel Operatorlari & Sonli Tekshiruv", en: "Sobel Kernels & Numerical Check" }, latex: "G_x=\\begin{bmatrix}-1&0&1\\\\-2&0&2\\\\-1&0&1\\end{bmatrix}, \\quad G_y=\\begin{bmatrix}-1&-2&-1\\\\0&0&0\\\\1&2&1\\end{bmatrix}", points: { uz: ["OpenCV da manfiy gradientlarni yo'qotmaslik uchun cv2.CV_64F ishlatiladi!"], en: ["Use cv2.CV_64F in OpenCV so negative gradients aren't clipped to 0!"] } }
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
        heading: { uz: "7.1. Harris Burchak Detektori va Struktur Tenzor", en: "7.1. Harris Corner Detector & Structure Tensor" },
        bodyHtml: {
          uz: "<p><strong>Burchak nuqtasi</strong> — kichik oynani istalgan yo'nalishda siljitganda yorqinlik keskin o'zgaradigan nuqta. Teylor yoyilmasi orqali $E(u,v) \\approx [u\\ v]\\,M\\,[u,v]^\\top$ kvadratik forma va 2×2 moment matritsasi $M$ olinadi.</p><p>$M$ ning xos qiymatlari $\\lambda_1, \\lambda_2$: ikkalasi kichik → tekis soha; biri katta → chekka; <strong>ikkalasi ham katta → burchak</strong>. Harris detektori <strong>aylanishga invariant</strong>, ammo <strong>masshtabga invariant emas!</strong></p>",
          en: "<p>A <strong>corner</strong> exhibits strong intensity change in every shift direction. Taylor expansion yields $E(u,v) \\approx [u\\ v]M[u,v]^\\top$. Both eigenvalues $\\lambda_1, \\lambda_2$ large indicates a corner. Harris is <strong>rotation-invariant</strong>, but <strong>not scale-invariant</strong>.</p>"
        },
        latex: "R = \\det(M) - k\\,(\\text{trace}(M))^2 = \\lambda_1\\lambda_2 - k(\\lambda_1 + \\lambda_2)^2 \\quad (k \\approx 0.04\\text{--}0.06)",
        widget: 'harris-sim'
      },
      {
        heading: { uz: "7.2. SIFT (128-D), ORB (Binar) va HOG Deskriptorlari", en: "7.2. SIFT (128-D), ORB (Binary) & HOG Descriptors" },
        bodyHtml: {
          uz: "<p><strong>SIFT (Lowe, 1999):</strong> <em>Difference of Gaussians (DoG)</em> piramidasi orqali masshtab-invariant nuqtalarni topadi, dominant orientatsiya bilan aylantirish invariantligini beradi va $4\\times 4$ katak × 8 yo'nalish = <strong>128 o'lchamli</strong> deskriptor tuzadi (L2 masofa).</p><p><strong>ORB:</strong> <strong>FAST</strong> detektori + burilgan <strong>BRIEF</strong> binar deskriptori (Hamming masofasi — SIFT dan o'nlab marta tez va patentsiz!). <strong>HOG (2005):</strong> Butun mintaqaning siluetini tavsiflaydi (piyoda aniqlashda SVM bilan standart).</p>",
          en: "<p><strong>SIFT (1999):</strong> Uses <em>Difference of Gaussians (DoG)</em> for scale invariance, dominant gradient orientation for rotation invariance, and a $4\\times 4\\times 8 = \\mathbf{128}$-dim vector (L2 distance).</p><p><strong>ORB:</strong> Combines <strong>FAST</strong> keypoints + rotated <strong>BRIEF</strong> binary descriptor (Hamming distance, ultra-fast & patent-free). <strong>HOG (2005):</strong> Captures global silhouette gradients for object/pedestrian detection.</p>"
        }
      },
      {
        heading: { uz: "7.3. Xususiyatlarni Moslashtirish va Lowe Nisbat Testi", en: "7.3. Feature Matching & Lowe's Ratio Test" },
        bodyHtml: {
          uz: "<p><code>BFMatcher</code> yoki tezkor taqribiy <code>FLANN / KD-tree</code> bilan eng yaqin 2 ta nomzod ($k=2$) topiladi. <strong>Lowe nisbat testi:</strong> agar $d_1 / d_2 < 0.75$ (odatda 0.7–0.8) bo'lsa moslik ishonchli qabul qilinadi, aks holda takrorlanuvchi teksturalardan keluvchi noaniq moslik rad etiladi.</p>",
          en: "<p>Using <code>BFMatcher</code> or <code>FLANN/KD-tree</code> ($k=2$), <strong>Lowe's ratio test</strong> accepts a match only if $d_1 / d_2 < 0.75$ (0.7–0.8), filtering out ambiguous matches on repetitive textures.</p>"
        }
      }
    ],
    slides: [
      { title: { uz: "M7: Xususiyat Nuqtalari va Deskriptorlar", en: "M7: Keypoints & Feature Descriptors" }, subtitle: { uz: "KOK1506 · Szeliski Ch. 7.1 · COMP4423 L4", en: "KOK1506 · Szeliski Ch. 7.1 · COMP4423 L4" }, points: { uz: ["Harris burchak detektori: struktur tenzor M va R javobi", "SIFT: DoG masshtab fazosi + 128-o'lchamli vektor (L2)", "ORB: FAST + Rotated BRIEF binar deskriptori (Hamming)", "HOG: siluet gistogrammasi", "Lowe nisbat testi: d1 / d2 < 0.75"], en: ["Harris Corner: structure tensor M & response R", "SIFT: DoG scale space + 128-D descriptor (L2)", "ORB: FAST + Rotated BRIEF binary (Hamming)", "HOG: global shape gradients", "Lowe Ratio Test: d1 / d2 < 0.75"] } },
      { title: { uz: "Interaktiv Harris Xos Qiymatlar Simulatori", en: "Interactive Harris Eigenvalue Simulator" }, widget: 'harris-sim' },
      { title: { uz: "Deskriptorlar Taqqoslanmasi", en: "Descriptors Comparison" }, table: { headers: { uz: ["Usul", "Deskriptor", "Masofa", "Xususiyati"], en: ["Method", "Vector", "Metric", "Strength"] }, rows: { uz: [["SIFT", "128 float", "Yevklid (L2)", "Masshtab & burilishga yuqori barqarorlik"], ["ORB", "256 bit binar", "Hamming", "Juda tez (XOR), patentsiz, real-vaqt"], ["HOG", "Global vektor", "SVM / L2", "Obyekt silueti va piyoda aniqlash"]], en: [["SIFT", "128 floats", "Euclidean (L2)", "High scale & rotation accuracy"], ["ORB", "256-bit binary", "Hamming", "Ultra-fast XOR, patent-free real-time"], ["HOG", "Global dense", "SVM / L2", "Silhouette shape for pedestrian detection"]] } } }
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
        heading: { uz: "8.1. RANSAC: Noto'g'ri Mosliklarga (Outlier) Chidamli Baholash", en: "8.1. RANSAC: Random Sample Consensus" },
        bodyHtml: {
          uz: "<p>Oddiy eng kichik kvadratlar usuli bittagina keskin <strong>outlier</strong> ta'sirida buziladi. <strong>RANSAC (Fischler &amp; Bolles, 1981)</strong> modelni qurish uchun minimal $s$ ta nuqtani tasodifiy tanlaydi (chiziq uchun $s=2$, homografiya uchun $s=4$), inlierlar sonini sanaydi va eng ko'p qo'llab-quvvatlangan modelni tanlaydi; oxirida barcha inlierlar ustida model qayta aniqlashtiriladi.</p><p><strong>Kengaytmalar:</strong> <em>LO-RANSAC</em> (lokal optimallashtirish), <em>PROSAC</em> (eng ishonchli mosliklardan boshlash), <em>MSAC / M-estimator</em> (yumshoq chegara).</p>",
          en: "<p>Least squares breaks with even a single outlier. <strong>RANSAC (1981)</strong> repeatedly samples minimal subsets of size $s$ ($s=2$ line, $s=4$ homography), counts consensus inliers within threshold $t$, and refits on all inliers of the winning hypothesis. Variants include <em>LO-RANSAC</em>, <em>PROSAC</em>, and <em>MSAC</em>.</p>"
        },
        latex: "N = \\frac{\\ln(1 - p)}{\\ln(1 - (1 - e)^s)}",
        widget: 'ransac-sim'
      },
      {
        heading: { uz: "8.2. Hough Transformatsiyasi: Chiziq va Doiralarni Topish", en: "8.2. Hough Transform: Parameter-Space Voting" },
        bodyHtml: {
          uz: "<p><strong>Hough transformatsiyasi (1962)</strong> tasvir nuqtalarini parametr fazosiga o'tkazib <strong>akkumulyator massivida ovoz beradi</strong>. Dekart tenglamasida ($y=mx+b$) vertikal chiziq uchun $m\\to\\infty$ bo'lgani sababli <strong>qutb koordinatalari</strong> ishlatiladi: $\\rho = x\\cos\\theta + y\\sin\\theta$.</p><p>Doiralarni aniqlashda $(a, b, r)$ 3D akkumulyator (yoki gradient yo'nalishi bilan tezlashtirilgan <code>cv2.HOUGH_GRADIENT</code>) qo'llaniladi. Yo'l chiziqlari, hujjat tekislash va sanoat o'lchovida keng ishlatiladi.</p>",
          en: "<p>The <strong>Hough Transform</strong> maps edge pixels into parameter space to vote in an <strong>accumulator array</strong>. To avoid infinite slope $m$ on vertical lines in $y=mx+b$, lines use polar form $\\rho = x\\cos\\theta + y\\sin\\theta$. Circles vote in 3D $(a, b, r)$ space.</p>"
        },
        latex: "\\rho = x\\cos\\theta + y\\sin\\theta"
      }
    ],
    slides: [
      { title: { uz: "M8: RANSAC va Hough Transformatsiyasi", en: "M8: RANSAC & Hough Transform" }, subtitle: { uz: "KOK1506 · Szeliski Ch. 8.1", en: "KOK1506 · Szeliski Ch. 8.1" }, points: { uz: ["Outlier vs Inlier: eng kichik kvadratlar nimaga sinadi?", "RANSAC algoritmi va iteratsiya formulasi N", "MSAC, PROSAC, LO-RANSAC kengaytmalari", "Hough transformatsiyasi: qutb (ρ, θ) va akkumulyator ovoz berishi"], en: ["Inliers vs Outliers: why least squares fails", "RANSAC loop & iteration count formula N", "MSAC, PROSAC & LO-RANSAC extensions", "Hough Transform: polar (ρ, θ) accumulator voting"] } },
      { title: { uz: "Interaktiv RANSAC Iteratsiyalar Kalkulyatori", en: "Interactive RANSAC Iteration Simulator" }, widget: 'ransac-sim' },
      { title: { uz: "Sonli Misol: Homografiya uchun RANSAC (s=4)", en: "Worked Example: RANSAC Iterations (s=4)" }, latex: "e=0.4,\\ s=4,\\ p=0.99 \\implies (1-0.4)^4=0.1296 \\implies N = \\left\\lceil\\frac{\\ln(0.01)}{\\ln(0.8704)}\\right\\rceil = 34", points: { uz: ["Outlier ulushi e=0.6 ga oshsa N = 176 gacha sakraydi!"], en: ["If outlier ratio rises to e=0.6, N jumps to 176 iterations!"] } }
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
        heading: { uz: "9.1. Gomografiya (3×3 Matritsa) va Transfer Xatosi", en: "9.1. Planar Homography (8 DOF) & Transfer Error" },
        bodyHtml: {
          uz: "<p><strong>Gomografiya $H$</strong> — bir tekis sirtni (yoki sof aylanuvchi kamera sahnasini) tasvirlovchi $3\\times 3$ proyektiv matritsa. Masshtab normalizatsiyasi sababli u <strong>8 ta erkin parametrga (DOF)</strong> ega, har bir mos nuqta juftligi 2 ta tenglama bergani uchun kamida <strong>4 ta nuqta juftligi</strong> kerak.</p><p>RANSAC da sifat ikki tomonlama <strong>ko'chirish xatosi</strong> bilan baholanadi: $r(x,x') = d^2(x', Hx) + d^2(x, H^{-1}x')$.</p>",
          en: "<p>A <strong>Homography $H$</strong> is a $3\\times 3$ projective matrix relating two views of a plane (or pure camera rotation). With <strong>8 DOF</strong>, it needs at least <strong>4 point correspondences</strong>. RANSAC often scores symmetric transfer error $d^2(x',Hx) + d^2(x,H^{-1}x')$.</p>"
        },
        latex: "\\begin{bmatrix} x' \\\\ y' \\\\ 1 \\end{bmatrix} \\sim H \\begin{bmatrix} x \\\\ y \\\\ 1 \\end{bmatrix}"
      },
      {
        heading: { uz: "9.2. Warping, Bundle Adjustment va Choklarni Yumshatish (Blending)", en: "9.2. Inverse Warping, Bundle Adjustment & Blending" },
        bodyHtml: {
          uz: "<p>Tasvirni warp qilishda chiqishda bo'shliqlar qolmasligi uchun <strong>teskari xaritalash (inverse mapping)</strong> + bilineyar interpolyatsiya qo'llaniladi. Ko'p tasvirli panoramada xatolar to'planishini (drift) yo'qotish uchun <em>Bundle Adjustment</em> bajariladi.</p><p><strong>Blending:</strong> <em>Feathering</em> (chegara bo'ylab silliq vazn), yoki eng sifatli <strong>ko'p masshtabli (Laplacian pyramid) blending</strong>. Eslatma: kamera fazoviy siljisa va sahnada chuqurlik farqi bo'lsa <strong>parallaks xatosi</strong> yuzaga keladi!</p>",
          en: "<p>Warping uses <strong>inverse mapping</strong> with bilinear interpolation to avoid output holes. Multi-image mosaics run <em>Bundle Adjustment</em> to prevent drift. <strong>Blending</strong> transitions from simple averaging to <em>feathering</em> and <strong>multi-band Laplacian pyramid blending</strong>. Note: camera translation with 3D depth creates <strong>parallax</strong> ghosting.</p>"
        },
        widget: 'homography-sim'
      }
    ],
    slides: [
      { title: { uz: "M9: Panorama va Gomografiya (Image Stitching)", en: "M9: Image Stitching & Homography" }, subtitle: { uz: "KOK1506 · Szeliski Ch. 8.2", en: "KOK1506 · Szeliski Ch. 8.2" }, points: { uz: ["Gomografiya H (3×3, 8 erkin parametr, min 4 nuqta)", "Pipeline: Keypoints → Ratio Test → RANSAC → Warp → Blending", "Teskari xaritalash (inverse mapping) bo'shliqlarsiz chiqish beradi", "Feathering vs Multi-band (Laplacian) blending va parallaks xatosi"], en: ["Homography H (3×3, 8 DOF, min 4 point pairs)", "Pipeline: Features → Ratio Test → RANSAC → Warp → Blend", "Inverse mapping avoids output holes", "Feathering vs Multi-band blending & Parallax limits"] } },
      { title: { uz: "Interaktiv Blending Taqqoslagichi", en: "Interactive Blending Comparison" }, widget: 'homography-sim' }
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
        heading: { uz: "10.1. Pinhole Modeli va 3D → 2D Proyeksiya", en: "10.1. Pinhole Camera Model & 3D → 2D Projection" },
        bodyHtml: {
          uz: "<p><strong>Pinhole kamera</strong> kichik teshik orqali 3D nuqta $P=(X,Y,Z)$ ni $f$ fokus masofadagi tasvir tekisligiga tushiradi: $x = f(X/Z),\\ y = f(Y/Z)$. Kameradan uzoqdagi obyekt ($Z$ katta) tasvirda kichik ko'rinadi.</p><p><strong>Gomogen koordinatalar</strong> $(X,Y,Z,1)^\\top$ yordamida aylanish, siljish va perspektiv proyeksiya bitta $3\\times 4$ matritsa $P = K[R|t]$ ko'paytmasiga birlashadi.</p>",
          en: "<p>The <strong>pinhole camera</strong> projects $P=(X,Y,Z)$ to $x = f(X/Z),\\ y = f(Y/Z)$—showing perspective foreshortening with depth $Z$. Using <strong>homogeneous coordinates</strong> $(X,Y,Z,1)^\\top$, rotation, translation, and intrinsics unify into one matrix product $P = K[R|t]$.</p>"
        },
        latex: "\\lambda \\begin{bmatrix} u \\\\ v \\\\ 1 \\end{bmatrix} = K [R \\mid t] \\begin{bmatrix} X \\\\ Y \\\\ Z \\\\ 1 \\end{bmatrix}, \\quad K = \\begin{bmatrix} f_x & 0 & c_x \\\\ 0 & f_y & c_y \\\\ 0 & 0 & 1 \\end{bmatrix}",
        widget: 'pinhole-sim'
      },
      {
        heading: { uz: "10.2. Ichki (K), Tashqi [R|t] va Epipolyar Geometriya", en: "10.2. Intrinsics, Extrinsics & Epipolar Geometry" },
        bodyHtml: {
          uz: "<p><strong>Ichki parametrlar $K$:</strong> fokus masofasi $(f_x, f_y)$ va asosiy nuqta $(c_x, c_y)$. <strong>Tashqi parametrlar $[R|t]$:</strong> $3\\times 3$ burilish (Euler pitch/yaw/roll yoki <em>gimbal lock</em> dan qochuvchi <strong>kvaternionlar</strong>) va $3\\times 1$ siljish $t$.</p><p><strong>Epipolyar geometriya:</strong> Ikki kamera orasida <strong>Essensial matritsa $E$</strong> (kalibrlangan) va <strong>Fundamental matritsa $F$</strong> (kalibrlanmagan, $\\text{rank}(F)=2$, min 8 nuqta) 2D qidiruvni 1D <em>epipolyar chiziq</em> ga tushiradi (SfM, SLAM asosi).</p>",
          en: "<p><strong>Intrinsics $K$:</strong> focal lengths $(f_x, f_y)$ and principal point $(c_x, c_y)$. <strong>Extrinsics $[R|t]$:</strong> 3D rotation (Euler or gimbal-lock-free <strong>quaternions</strong>) and translation $t$.</p><p><strong>Epipolar Geometry:</strong> <strong>Essential matrix $E$</strong> (calibrated) and <strong>Fundamental matrix $F$</strong> (uncalibrated, $\\text{rank}=2$, 8-point algorithm) constrain stereo matches onto 1D <em>epipolar lines</em>, powering SfM and SLAM.</p>"
        }
      }
    ],
    slides: [
      { title: { uz: "M10: Proyeksiv Geometriya va Kamera Modeli", en: "M10: Projective Geometry & Camera Model" }, subtitle: { uz: "KOK1506 · Szeliski Ch. 2.1", en: "KOK1506 · Szeliski Ch. 2.1" }, points: { uz: ["Pinhole proyeksiya: x = f·(X/Z), y = f·(Y/Z)", "Gomogen koordinatalar va P = K[R|t]", "Ichki matritsa K (fx, fy, cx, cy) vs Tashqi [R|t]", "Epipolyar geometriya: E va F (rank=2) matritsalari"], en: ["Pinhole projection: x = f·(X/Z), y = f·(Y/Z)", "Homogeneous coordinates & P = K[R|t]", "Intrinsics K (fx, fy, cx, cy) vs Extrinsics [R|t]", "Epipolar geometry: Essential E & Fundamental F (rank=2)"] } },
      { title: { uz: "Interaktiv Pinhole Proyeksiya Simulatori", en: "Interactive Pinhole Projection Lab" }, widget: 'pinhole-sim' },
      { title: { uz: "To'liq Proyeksiya Tenglamasi", en: "Full Perspective Projection Matrix" }, latex: "\\lambda\\begin{bmatrix}u\\\\v\\\\1\\end{bmatrix} = \\begin{bmatrix}f_x & 0 & c_x\\\\0 & f_y & c_y\\\\0 & 0 & 1\\end{bmatrix}[R\\mid t]\\begin{bmatrix}X\\\\Y\\\\Z\\\\1\\end{bmatrix}", points: { uz: ["Z ikki barobar oshsa (10m → 20m), proyeksiya koordinatalari 2× kichrayadi!"], en: ["Doubling depth Z (10m → 20m) halves projected image coordinates!"] } }
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
