// M11–M15: Camera Calibration & Stereo, Classical Detection, Classification & Metrics, k-NN/SVM, Deep Learning Intro
window.CV_TOPICS = window.CV_TOPICS || [];

window.CV_TOPICS.push(
  // ==================== M11 ====================
  {
    id: 11,
    code: 'M11',
    labId: 11,
    hours: 2,
    keywords: ['Camera Calibration', 'Zhang', 'Distortion', 'Barrel', 'Pincushion', 'Stereo Vision', 'Disparity', 'Rectification'],
    title: {
      uz: "Kamerani kalibrlash, Distorsiya va Stereo ko'rish",
      en: "Camera Calibration, Lens Distortion & Stereo Depth"
    },
    description: {
      uz: "Zhang shaxmat taxtasi kalibrlash usuli, qayta proyeksiya xatosi, radial (barrel/pincushion) va tangensial distorsiya, stereo rektifikatsiya va Z = f·B / d chuqurlik.",
      en: "Zhang's chessboard calibration, reprojection error, radial (barrel/pincushion) & tangential distortion, stereo rectification, and Z = f·B / d depth."
    },
    refs: [
      { label: "Szeliski Ch. 11 & 12: Calibration & Stereo", url: "https://szeliski.org/Book/" },
      { label: "Awesome CV: Stereo & Calibration Benchmarks", url: "https://github.com/jbhuang0604/awesome-computer-vision" },
      { label: "OpenCV Camera Calibration Docs", url: "https://docs.opencv.org" }
    ],
    sections: [
      {
        heading: { uz: "11.1. Zhang Usuli va Linza Distorsiyasini To'g'irlash", en: "11.1. Zhang's Calibration & Lens Distortion Correction" },
        bodyHtml: {
          uz: "<p><strong>Zhengyou Zhang (2000)</strong> usulida ma'lum o'lchamli <strong>shaxmat taxtasi (chessboard)</strong> 10–20 xil burchakda suratga olinadi, burchaklar subpiksel aniqlikda topilib Levenberg-Marquardt bilan $K$ va distorsiya koeffitsientlari baholanadi. Sifat <strong>qayta proyeksiya xatosi</strong> (reprojection error &lt; 1 px) bilan tekshiriladi.</p><p><strong>Distorsiya:</strong> <em>Radial</em> ($k_1, k_2, k_3$: keng burchakda <strong>bochkasimon / barrel</strong>, teleobyektivda <strong>yostiqsimon / pincushion</strong>) va <em>Tangensial</em> ($p_1, p_2$ — linza va sensor parallel emasligi). Tezkor video to'g'irlash uchun <code>cv2.remap()</code> ishlatiladi.</p>",
          en: "<p><strong>Zhang's planar method (2000)</strong> photographs a known chessboard from 10–20 viewpoints to solve for $K$ and distortion via Levenberg-Marquardt. Quality is checked via <strong>reprojection error</strong> (&lt; 1 px).</p><p><strong>Distortion:</strong> <em>Radial</em> ($k_1, k_2, k_3$: <strong>barrel</strong> on wide lenses, <strong>pincushion</strong> on telephoto) and <em>Tangential</em> ($p_1, p_2$). Real-time video uses precomputed maps with <code>cv2.remap()</code>.</p>"
        },
        latex: "x_{\\text{dist}} = x(1 + k_1 r^2 + k_2 r^4 + k_3 r^6)"
      },
      {
        heading: { uz: "11.2. Stereo Ko'rish, Rektifikatsiya va Chuqurlik (Z = fB/d)", en: "11.2. Stereo Vision, Rectification & Disparity Depth" },
        bodyHtml: {
          uz: "<p>Ikkita kalibrlangan kamera (baza masofasi $B$) bir xil sahnani kuzatganda nuqtaning gorizontal piksel siljishi <strong>disparitet ($d$)</strong> deyiladi. <strong>Rektifikatsiya</strong> epipolyar chiziqlarni gorizontal bir qatorga keltirib, 2D qidiruvni 1D ga soddalashtiradi. Sifatli moslashtirish uchun <em>Block Matching</em> yoki <em>SGM (Semi-Global Matching)</em> qo'llaniladi.</p>",
          en: "<p>With two calibrated cameras separated by baseline $B$, the horizontal pixel shift of a 3D point is <strong>disparity ($d$)</strong>. <strong>Rectification</strong> aligns epipolar lines horizontally so matching reduces to 1D search via <em>Block Matching</em> or <em>SGM</em>.</p>"
        },
        latex: "Z = \\frac{f \\cdot B}{d}",
        widget: 'stereo-sim'
      }
    ],
    slides: [
      { title: { uz: "M11: Kamera Kalibrlash va Stereo Chuqurlik", en: "M11: Camera Calibration & Stereo Vision" }, subtitle: { uz: "KOK1506 · Szeliski Ch. 11–12", en: "KOK1506 · Szeliski Ch. 11–12" }, points: { uz: ["Zhang usuli: shaxmat taxtasi (10–20 tasvir) → K, dist, reprojection error < 1 px", "Radial distorsiya (barrel vs pincushion) & tangensial (p1, p2)", "Stereo rektifikatsiya: 2D qidiruv → 1D gorizontal epipolyar chiziq", "Chuqurlik formulasi: Z = (f · B) / d (disparitetga teskari proporsional)"], en: ["Zhang's method: 10–20 chessboard views → K, distortion, error < 1 px", "Radial (barrel vs pincushion) & tangential distortion (p1, p2)", "Stereo rectification: 2D search → 1D horizontal epipolar scanline", "Depth formula: Z = (f · B) / d (inversely proportional to disparity)"] } },
      { title: { uz: "Interaktiv Stereo Chuqurlik Simulatori", en: "Interactive Stereo Depth Calculator" }, widget: 'stereo-sim' }
    ],
    glossary: [
      { uz: "kalibrlash", en: "camera calibration", defUz: "Shaxmat taxtasi yordamida K va distorsiyani baholash", defEn: "Estimating intrinsics K and lens distortion via chessboard" },
      { uz: "disparitet", en: "disparity", defUz: "Chap va o'ng stereo tasvirlarda mos pikselning gorizontal siljishi", defEn: "Horizontal shift between stereo correspondence pixels" },
      { uz: "rektifikatsiya", en: "rectification", defUz: "Epipolyar chiziqlarni gorizontal parallel holatga keltirish", defEn: "Warping stereo pairs so epipolar lines are horizontal" }
    ],
    quiz: [
      { q: { uz: "f=1000 px, baza B=0.1 m va disparitet d=50 px bo'lsa, obyektgacha bo'lgan chuqurlik Z qancha?", en: "Given f=1000 px, baseline B=0.1 m, disparity d=50 px, what is depth Z?" }, options: [{ label: 'A', uz: "1 metr", en: "1 m" }, { label: 'B', uz: "2 metr", en: "2 m" }, { label: 'C', uz: "5 metr", en: "5 m" }, { label: 'D', uz: "10 metr", en: "10 m" }], answer: 'B', explanation: { uz: "Z = (1000 × 0.1) / 50 = 100 / 50 = 2 metr.", en: "Z = (1000 × 0.1) / 50 = 2 meters." } },
      { q: { uz: "Keng burchakli ob'ektivlarda to'g'ri chiziqlarning tashqariga bochkasimon egilishi qanday ataladi?", en: "Outward curving of straight lines in wide-angle lenses is called?" }, options: [{ label: 'A', uz: "Yostiqsimon (Pincushion)", en: "Pincushion distortion" }, { label: 'B', uz: "Bochkasimon (Barrel) radial distorsiya", en: "Barrel radial distortion" }, { label: 'C', uz: "Tangensial siljish", en: "Tangential distortion" }, { label: 'D', uz: "Parallaks", en: "Parallax" }], answer: 'B', explanation: { uz: "Keng burchakli linzalarda bochkasimon (barrel), teleobyektivda yostiqsimon (pincushion) uchraydi.", en: "Wide lenses exhibit barrel distortion; telephoto exhibits pincushion." } },
      { q: { uz: "Stereo tizimda obyekt uzoqlashgani (Z ortgani) sari disparitet d qanday o'zgaradi?", en: "In stereo vision, how does disparity d change as depth Z increases?" }, options: [{ label: 'A', uz: "Ortadi", en: "Increases" }, { label: 'B', uz: "Kamayadi (teskari proporsional)", en: "Decreases (inversely proportional)" }, { label: 'C', uz: "O'zgarmaydi", en: "Constant" }, { label: 'D', uz: "Manfiy bo'ladi", en: "Becomes negative" }], answer: 'B', explanation: { uz: "d = f·B / Z bo'lgani uchun masofa ortsa disparitet kamayadi.", en: "Since d = f·B / Z, farther objects have smaller disparity." } },
      { q: { uz: "Yaxshi kalibrlangan kamera uchun qayta proyeksiya xatosi (reprojection error) odatda qancha bo'lishi kerak?", en: "What reprojection error indicates a well-calibrated camera?" }, options: [{ label: 'A', uz: "10–20 piksel", en: "10–20 px" }, { label: 'B', uz: "< 1 piksel", en: "< 1 pixel" }, { label: 'C', uz: "50 piksel", en: "50 px" }, { label: 'D', uz: "100 piksel", en: "100 px" }], answer: 'B', explanation: { uz: "Sifatli kalibrlashda reprojection error 1 pikseldan kam chiqishi kerak.", en: "Good calibration achieves sub-pixel (< 1 px) reprojection error." } }
    ],
    matching: [
      { left: { uz: "Zhang usuli", en: "Zhang's Method" }, right: { uz: "Shaxmat taxtasi bilan tekislik kalibrlash", en: "Planar chessboard camera calibration" } },
      { left: { uz: "Barrel distorsiya", en: "Barrel Distortion" }, right: { uz: "Keng burchakli linzalarda tashqariga egilish", en: "Wide-angle outward radial bulging" } },
      { left: { uz: "Rektifikatsiya", en: "Rectification" }, right: { uz: "Epipolyar chiziqlarni gorizontal tekislash", en: "Aligning stereo scanlines horizontally" } },
      { left: { uz: "SGM", en: "Semi-Global Matching" }, right: { uz: "Global silliqlik bilan zich disparitet xaritasi", en: "Smooth dense stereo disparity estimation" } }
    ],
    fillGap: [
      { text: { uz: "Stereo ko'rishda chuqurlik formulasi Z = (f · B) / ___ ko'rinishida yoziladi.", en: "In stereo vision, depth is Z = (f · B) / ___." }, answer: ['d', 'disparitet', 'disparity'] },
      { text: { uz: "Ikkita kamera optik markazlari orasidagi masofa B ___ masofasi deb ataladi.", en: "The distance B between two stereo camera centers is the ___." }, answer: ['baza', 'baseline'] },
      { text: { uz: "OpenCV da oldindan hisoblangan xarita orqali tezkor distorsiya to'g'irlash cv2.___ bilan bajariladi.", en: "Fast distortion correction using precomputed maps uses cv2.___." }, answer: ['remap'] }
    ]
  },

  // ==================== M12 ====================
  {
    id: 12,
    code: 'M12',
    labId: 12,
    hours: 2,
    keywords: ['Viola-Jones', 'Haar Cascade', 'Integral Image', 'AdaBoost', 'Sliding Window', 'HOG', 'DPM', 'NMS'],
    title: {
      uz: "Obyektlarni aniqlashning klassik usullari (Haar, Viola-Jones, HOG)",
      en: "Classical Object Detection: Viola-Jones, Haar Cascades & HOG"
    },
    description: {
      uz: "Sirpanuvchi oyna va tasvir piramidasi, Viola-Jones algoritmi (Haar xususiyatlari, Integral tasvir O(1), AdaBoost, Kaskad), HOG+SVM, DPM va Hard Negative Mining.",
      en: "Sliding window & image pyramids, Viola-Jones (Haar features, O(1) Integral Image, AdaBoost, Cascade), HOG+SVM, DPM, and Hard Negative Mining."
    },
    refs: [
      { label: "Szeliski Ch. 6.3: Face & Pedestrian Detection", url: "https://szeliski.org/Book/" },
      { label: "OpenCV Haar Cascades Tutorial", url: "https://docs.opencv.org" }
    ],
    sections: [
      {
        heading: { uz: "12.1. Sirpanuvchi Oyna, Tasvir Piramidasi va NMS", en: "12.1. Sliding Window, Image Pyramids & NMS" },
        bodyHtml: {
          uz: "<p>Klassik obyekt aniqlashda turli masshtabdagi tasvir piramidasi bo'ylab <strong>sirpanuvchi oyna (sliding window)</strong> yurgiziladi va har bir oyna HOG+SVM bilan baholanadi. Bir obyekt atrofida ko'p oyna chiqmasligi uchun yakunda <strong>Non-Maximum Suppression (NMS)</strong> qo'llaniladi. Qattiq salbiy namunalarni qayta o'qitish <em>Hard Negative Mining</em> deyiladi.</p>",
          en: "<p>Classical detectors scan a <strong>sliding window</strong> across an <strong>image pyramid</strong> (e.g., HOG+SVM or DPM), then merge overlapping detections via <strong>Non-Maximum Suppression (NMS)</strong>. Training iteratively adds false positives via <em>Hard Negative Mining</em>.</p>"
        }
      },
      {
        heading: { uz: "12.2. Viola-Jones (2001): Integral Tasvir, AdaBoost va Kaskad", en: "12.2. Viola-Jones (2001): Integral Image, AdaBoost & Cascade" },
        bodyHtml: {
          uz: "<p><strong>Viola-Jones</strong> real vaqtda yuz aniqlashni uchta yangilik bilan mumkin qildi: 1) <strong>Haar-o'xshash xususiyatlar</strong> (yorug'-qorong'i to'rtburchak farqlari); 2) <strong>Integral tasvir</strong> — istalgan o'lchamli to'rtburchak yig'indisini atigi 4 ta amal bilan <strong>$O(1)$ konstant vaqtda</strong> hisoblash; 3) <strong>AdaBoost</strong> bilan eng informativ xususiyatlarni tanlash va <strong>Kaskad</strong> tuzilmasi orqali fon oynalarini dastlabki bosqichlardayoq tez rad etish.</p>",
          en: "<p><strong>Viola-Jones</strong> enabled real-time face detection via: (1) <strong>Haar-like features</strong>, (2) <strong>Integral Image</strong> computing any rectangle sum in <strong>$O(1)$ constant time</strong> (4 array lookups), and (3) <strong>AdaBoost Cascade</strong> rejecting background windows in early stages.</p>"
        },
        widget: 'integral-sim'
      }
    ],
    slides: [
      { title: { uz: "M12: Klassik Obyekt Aniqlash (Viola-Jones & HOG)", en: "M12: Classical Object Detection" }, subtitle: { uz: "KOK1506 · Szeliski Ch. 6.3", en: "KOK1506 · Szeliski Ch. 6.3" }, points: { uz: ["Sirpanuvchi oyna + tasvir piramidasi + NMS", "Viola-Jones 3 ustuni: Haar + Integral Image O(1) + AdaBoost Cascade", "HOG + SVM (piyoda aniqlash) va Deformable Part Model (DPM)", "Cheklovi: faqat frontal yuzlar, burchak/to'silishda sezgir"], en: ["Sliding window + image pyramid + NMS", "Viola-Jones pillars: Haar + Integral Image O(1) + AdaBoost Cascade", "HOG + SVM pedestrians & DPM", "Limitation: frontal pose bias, sensitive to occlusion"] } },
      { title: { uz: "Interaktiv Integral Tasvir O(1) Hisoblash", en: "Interactive Integral Image O(1) Sum" }, widget: 'integral-sim' }
    ],
    glossary: [
      { uz: "integral tasvir", en: "integral image", defUz: "Istalgan to'rtburchak yig'indisini 4 amalda O(1) hisoblovchi jadval", defEn: "Prefix-sum table computing any box sum in 4 ops O(1)" },
      { uz: "kaskad klassifikator", en: "cascade classifier", defUz: "Aniq bo'lmagan fon oynalarini erta bosqichda rad etuvchi zanjir", defEn: "Multi-stage filter rejecting background windows early" }
    ],
    quiz: [
      { q: { uz: "Viola-Jones algoritmida Integral tasvir (integral image) nima uchun kerak?", en: "Why does Viola-Jones use an Integral Image?" }, options: [{ label: 'A', uz: "To'rtburchak mintaqa piksellari yig'indisini o'lchamdan qat'i nazar O(1) vaqtda (4 amalda) hisoblash uchun", en: "To compute any rectangular pixel sum in O(1) constant time (4 lookups)" }, { label: 'B', uz: "HSV ga o'tkazish uchun", en: "HSV conversion" }, { label: 'C', uz: "Tasvirni siqish uchun", en: "Compression" }, { label: 'D', uz: "CNN o'qitish uchun", en: "Training CNNs" }], answer: 'A', explanation: { uz: "Integral tasvir Haar xususiyatlarini istalgan masshtabda konstant vaqtda hisoblash imkonini beradi.", en: "Sum = II(br) - II(tr) - II(bl) + II(tl) takes O(1) regardless of box size." } },
      { q: { uz: "Viola-Jones da minglab nomzod Haar xususiyatlaridan eng yaxshilarini tanlashda qaysi algoritm ishlatiladi?", en: "Which algorithm selects the most informative Haar features in Viola-Jones?" }, options: [{ label: 'A', uz: "K-Means", en: "K-Means" }, { label: 'B', uz: "AdaBoost", en: "AdaBoost" }, { label: 'C', uz: "Canny", en: "Canny" }, { label: 'D', uz: "RANSAC", en: "RANSAC" }], answer: 'B', explanation: { uz: "AdaBoost zaif Haar klassifikatorlaridan kuchli bosqichli kaskad tuzadi.", en: "AdaBoost selects weighted weak Haar classifiers into cascade stages." } },
      { q: { uz: "Viola-Jones yuz aniqlash algoritmining asosiy amaliy cheklovi qaysi?", en: "What is a major practical limitation of Viola-Jones Haar cascades?" }, options: [{ label: 'A', uz: "Asosan frontal yuzlarni yaxshi aniqlaydi; qattiq burilish va to'silishda aniqligi pasayadi", en: "Mostly frontal faces; accuracy drops on profile/tilted/occluded faces" }, { label: 'B', uz: "GPU talab qiladi", en: "Requires GPU" }, { label: 'C', uz: "Faqat 4K da ishlaydi", en: "4K only" }, { label: 'D', uz: "Video oqimida ishlamaydi", en: "Doesn't run on video" }], answer: 'A', explanation: { uz: "Haar to'rtburchak andozalari qat'iy geometriyali bo'lgani uchun profil/aylangan yuzlarda qiynaladi.", en: "Axis-aligned Haar rectangles struggle under out-of-plane rotation or occlusion." } },
      { q: { uz: "detectMultiScale() funksiyasida minNeighbors parametri nimani boshqaradi?", en: "In detectMultiScale(), what does minNeighbors control?" }, options: [{ label: 'A', uz: "Bir aniqlashni tasdiqlash uchun necha qo'shni oyna rozi bo'lishi kerakligini (yolg'on musbat filtri)", en: "Minimum overlapping candidate boxes to confirm a detection (false-positive filter)" }, { label: 'B', uz: "RGB kanallar sonini", en: "RGB channels" }, { label: 'C', uz: "JPEG sifatini", en: "JPEG quality" }, { label: 'D', uz: "Sigmoid qiyalikni", en: "Sigmoid slope" }], answer: 'A', explanation: { uz: "Katta minNeighbors kamroq yolg'on aniqlash beradi.", en: "Higher minNeighbors reduces false positives at the cost of recall." } }
    ],
    matching: [
      { left: { uz: "Integral tasvir", en: "Integral Image" }, right: { uz: "4 ta qo'shish/ayirish bilan O(1) to'rtburchak yig'indisi", en: "Constant-time O(1) rectangular sum" } },
      { left: { uz: "AdaBoost", en: "AdaBoost" }, right: { uz: "Eng muhim Haar xususiyatlarini tanlab birlashtirish", en: "Selects & weights informative weak classifiers" } },
      { left: { uz: "Kaskad", en: "Cascade" }, right: { uz: "Fon oynalarini erta bosqichda tez rad etish", en: "Rejects non-face windows in early stages" } },
      { left: { uz: "Hard Negative Mining", en: "Hard Negative Mining" }, right: { uz: "Xato musbat chiqqan qiyin fon namunalarini qayta o'qitish", en: "Retraining on high-scoring false-positive patches" } }
    ],
    fillGap: [
      { text: { uz: "Haar xususiyatlarini konstant vaqtda hisoblash uchun ___ tasvir tuzilmasi qo'llaniladi.", en: "Haar features are computed in O(1) time using an ___ image." }, answer: ['integral'] },
      { text: { uz: "Sirpanuvchi oynada bitta obyekt uchun chiqqan ortiqcha qutilarni olib tashlash usuli ___ deyiladi.", en: "Suppressing duplicate overlapping detection boxes is called ___." }, answer: ['NMS', 'Non-Maximum Suppression'] },
      { text: { uz: "Piyoda aniqlashda (Dalal & Triggs) klassik standart sifatida ___ + SVM juftligi ishlatilgan.", en: "Dalal & Triggs' classic pedestrian detector paired ___ features with SVM." }, answer: ['HOG'] }
    ]
  },

  // ==================== M13 ====================
  {
    id: 13,
    code: 'M13',
    labId: 13,
    hours: 2,
    keywords: ['Classification', 'BoVW', 'LBP', 'Train/Val/Test', 'Confusion Matrix', 'Precision', 'Recall', 'F1', 'ROC-AUC'],
    title: {
      uz: "Tasvirlarni tasniflash va Baholash metrikalari (BoVW, F1, ROC-AUC)",
      en: "Image Classification, BoVW & Evaluation Metrics"
    },
    description: {
      uz: "Bag of Visual Words (SIFT + k-Means), LBP tekstura, Train/Val/Test & k-Fold CV, Chalkashlik matritsasi, Accuracy vs Precision/Recall/F1 va Precision-Recall vs ROC-AUC.",
      en: "Bag of Visual Words (SIFT + k-Means), LBP texture, Train/Val/Test & k-Fold CV, Confusion Matrix, Accuracy trap, Precision/Recall/F1 & ROC-AUC."
    },
    refs: [
      { label: "COMP4423 L5: BoVW & Image Retrieval", url: "https://github.com/lookwei/COMP4423" },
      { label: "Szeliski Ch. 6: Recognition", url: "https://szeliski.org/Book/" },
      { label: "MS CV Recipes: Classification Metrics", url: "https://github.com/microsoft/computervision-recipes" }
    ],
    sections: [
      {
        heading: { uz: "13.1. Xususiyat Tayyorlash: BoVW, LBP va Normalizatsiya", en: "13.1. Preparing Features: BoVW, LBP & Normalization" },
        bodyHtml: {
          uz: "<p>HOG doimiy uzunlikdagi vektor bersa, SIFT har rasmda turlicha sondagi nuqtalar beradi. Buni doimiy uzunlikka keltirish uchun <strong>Bag of Visual Words (BoVW)</strong> usuli barcha SIFT deskriptorlarini <em>k-means</em> orqali $K$ ta 'vizual so'z'ga klasterlaydi va gistogramma quradi. Tekstura uchun esa 8-qo'shnini markaz bilan solishtiruvchi tezkor <strong>LBP (Local Binary Patterns)</strong> ishlatiladi.</p><p>Datasetni <strong>Train (70–80%)</strong>, <strong>Validation (10–15%)</strong> va <strong>Test (10–15%)</strong> qismlarga stratifikatsiya bilan ajratish shart.</p>",
          en: "<p>Because SIFT yields variable numbers of keypoints per image, <strong>Bag of Visual Words (BoVW)</strong> clusters descriptors via <em>k-means</em> into $K$ visual words and forms a fixed histogram. <strong>LBP</strong> encodes local texture in 8 bits. Always split datasets into stratified <strong>Train / Validation / Test</strong> sets.</p>"
        }
      },
      {
        heading: { uz: "13.2. Chalkashlik Matritsasi, Precision, Recall, F1 va ROC-AUC", en: "13.2. Confusion Matrix, Precision, Recall, F1 & ROC-AUC" },
        bodyHtml: {
          uz: "<p>Nomutanosib (imbalanced) ma'lumotlarda oddiy <em>Accuracy</em> chalg'ituvchi bo'ladi (95% manfiy bo'lsa, hamma narsani manfiy degan model 95% oladi). Shu sababli <strong>Precision</strong> ($TP/(TP+FP)$), <strong>Recall</strong> ($TP/(TP+FN)$) va <strong>F1-ball</strong> qo'llaniladi. Kuchli nomutanosiblikda <em>Precision-Recall</em> egri chizig'i ROC dan informativroq.</p>",
          en: "<p>With class imbalance, <em>Accuracy</em> misleads. Use <strong>Precision</strong> ($TP/(TP+FP)$), <strong>Recall</strong> ($TP/(TP+FN)$), and <strong>F1-score</strong>. Under heavy skew, Precision-Recall curves are more informative than ROC.</p>"
        },
        latex: "F_1 = 2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}",
        widget: 'cm-metrics'
      }
    ],
    slides: [
      { title: { uz: "M13: Tasniflash va Baholash Metrikalari", en: "M13: Classification & Evaluation Metrics" }, subtitle: { uz: "KOK1506 · COMP4423 L5–L6", en: "KOK1506 · COMP4423 L5–L6" }, points: { uz: ["BoVW: o'zgaruvchan SIFT → k-means → doimiy uzunlikli gistogramma", "Train / Validation / Test bo'linishi va k-Fold Cross-Validation", "Nomutanosib sinflarda Accuracy tuzog'i", "Precision, Recall, F1-ball va ROC-AUC"], en: ["BoVW: variable SIFT → k-means → fixed-length histogram", "Train / Validation / Test splits & k-Fold CV", "Accuracy paradox on imbalanced datasets", "Precision, Recall, F1 & ROC-AUC"] } },
      { title: { uz: "Interaktiv Chalkashlik Matritsasi Kalkulyatori", en: "Interactive Confusion Matrix Calculator" }, widget: 'cm-metrics' }
    ],
    glossary: [
      { uz: "Bag of Visual Words (BoVW)", en: "Bag of Visual Words", defUz: "Lokal deskriptorlarni klasterlab doimiy gistogramma vektor yasash", defEn: "Quantizing local features into visual-word histograms" },
      { uz: "chalkashlik matritsasi", en: "confusion matrix", defUz: "TP, FP, FN, TN natijalari jadvali", defEn: "Table contrasting true vs predicted classes (TP, FP, FN, TN)" },
      { uz: "F1-ball", en: "F1-score", defUz: "Precision va Recall garmonik o'rtachasi", defEn: "Harmonic mean of Precision and Recall" }
    ],
    quiz: [
      { q: { uz: "BoVW (Bag of Visual Words) usuli nima uchun SIFT dan keyin qo'llaniladi?", en: "Why apply Bag of Visual Words (BoVW) after extracting SIFT descriptors?" }, options: [{ label: 'A', uz: "Turli sondagi kalit nuqtalardan klassifikator uchun doimiy uzunlikdagi vektor olish uchun", en: "To convert variable numbers of keypoints into a fixed-length vector" }, { label: 'B', uz: "Tasvirni silliqlash uchun", en: "For blurring" }, { label: 'C', uz: "Chekka topish uchun", en: "For edge detection" }, { label: 'D', uz: "3D proyeksiya uchun", en: "For 3D projection" }], answer: 'A', explanation: { uz: "Klassik SVM/k-NN barcha tasvirlardan bir xil o'lchamli vektor talab qiladi.", en: "Classifiers like SVM require fixed-dimensional feature vectors per image." } },
      { q: { uz: "TP=40, FP=10, FN=5, TN=45 bo'lsa, Precision va Recall mos ravishda nechaga teng?", en: "Given TP=40, FP=10, FN=5, TN=45, what are Precision and Recall?" }, options: [{ label: 'A', uz: "Precision=0.80, Recall=0.889", en: "Precision=0.80, Recall=0.889" }, { label: 'B', uz: "Precision=0.889, Recall=0.80", en: "Precision=0.889, Recall=0.80" }, { label: 'C', uz: "Precision=0.50, Recall=0.50", en: "Precision=0.50, Recall=0.50" }, { label: 'D', uz: "Precision=0.90, Recall=0.85", en: "Precision=0.90, Recall=0.85" }], answer: 'A', explanation: { uz: "Precision = 40/(40+10) = 0.80; Recall = 40/(40+5) ≈ 0.889.", en: "Precision = 40/50 = 0.80; Recall = 40/45 ≈ 0.889." } },
      { q: { uz: "Tibbiy tashxisda kasal bemorni o'tkazib yuborish (FN) xavfli bo'lsa, qaysi metrikani oshirish muhim?", en: "In medical screening where missing sick patients (FN) is critical, which metric is prioritized?" }, options: [{ label: 'A', uz: "Recall (To'liqlik)", en: "Recall" }, { label: 'B', uz: "Fayl hajmi", en: "File size" }, { label: 'C', uz: "Stride", en: "Stride" }, { label: 'D', uz: "Dropout", en: "Dropout" }], answer: 'A', explanation: { uz: "Recall = TP/(TP+FN) — barcha haqiqiy kasallarning necha foizi topilganini o'lchaydi.", en: "Recall = TP/(TP+FN) penalizes missed positive cases." } },
      { q: { uz: "Giperparametrlarni sozlash va eng yaxshi modelni tanlash uchun qaysi to'plam ishlatiladi?", en: "Which split is used for hyperparameter tuning and model selection?" }, options: [{ label: 'A', uz: "Test to'plami", en: "Test set" }, { label: 'B', uz: "Validation (tekshirish) to'plami", en: "Validation set" }, { label: 'C', uz: "Faqat Train to'plami", en: "Training set only" }, { label: 'D', uz: "Hech biri", en: "None" }], answer: 'B', explanation: { uz: "Test to'plami faqat eng oxirida xolis yakuniy baho uchun saqlanadi.", en: "Validation tunes hyperparameters; Test remains untouched until final evaluation." } }
    ],
    matching: [
      { left: { uz: "Precision", en: "Precision" }, right: { uz: "TP / (TP + FP) — musbat bashoratlar ishonchliligi", en: "TP / (TP + FP) — positive predictive accuracy" } },
      { left: { uz: "Recall", en: "Recall" }, right: { uz: "TP / (TP + FN) — haqiqiy musbatlarni qamrab olish", en: "TP / (TP + FN) — sensitivity / coverage" } },
      { left: { uz: "LBP", en: "LBP" }, right: { uz: "8-bitli mahalliy tekstura kodi", en: "Fast 8-bit local binary texture pattern" } },
      { left: { uz: "Stratifikatsiya", en: "Stratification" }, right: { uz: "Train/Test da sinf nisbatlarini saqlash", en: "Preserving class proportions across splits" } }
    ],
    fillGap: [
      { text: { uz: "Precision va Recall ning garmonik o'rtachasi ___ deb ataladi.", en: "The harmonic mean of Precision and Recall is the ___ score." }, answer: ['F1', 'F1-ball', 'F1-score'] },
      { text: { uz: "Kichik datasetda modelni xolis baholash uchun ___ cross-validation ishlatiladi.", en: "On small datasets, ___ cross-validation evaluates generalization reliably." }, answer: ['k-fold'] },
      { text: { uz: "SIFT deskriptorlarini k-means bilan klasterlab gistogramma tuzish usuli ___ deyiladi.", en: "Quantizing SIFT features via k-means into histograms is called ___." }, answer: ['BoVW', 'Bag of Visual Words'] }
    ]
  },

  // ==================== M14 ====================
  {
    id: 14,
    code: 'M14',
    labId: 14,
    hours: 2,
    keywords: ['k-NN', 'SVM', 'Margin', 'Support Vectors', 'Kernel Trick', 'RBF', 'Curse of Dimensionality'],
    title: {
      uz: "Klassik mashinali o'qitish tasniflovchilari (k-NN, SVM, Kernel Trick)",
      en: "Classical ML Classifiers: k-NN, SVM & Kernel Trick"
    },
    description: {
      uz: "k-NN (lazy learning, k tanlovi, o'lchamlilik la'nati), SVM (maksimal marja, tayanch vektorlar, yumshoq marja C) va Kernel Trick (Linear, Poly, RBF γ).",
      en: "k-NN (lazy learning, curse of dimensionality), SVM (maximum margin, support vectors, soft margin C), and the Kernel Trick (Linear, Poly, RBF γ)."
    },
    refs: [
      { label: "COMP4423 L6: Image Classification (k-NN & SVM)", url: "https://github.com/lookwei/COMP4423" },
      { label: "Szeliski Ch. 5.1–5.2: Classic ML", url: "https://szeliski.org/Book/" }
    ],
    sections: [
      {
        heading: { uz: "14.1. k-NN (k-Eng Yaqin Qo'shni) Algoritmi", en: "14.1. k-Nearest Neighbors (k-NN)" },
        bodyHtml: {
          uz: "<p><strong>k-NN</strong> — <em>dangasa o'qitish (lazy learning)</em> algoritmi: alohida o'qitish bosqichi yo'q, barcha hisoblash bashorat (inference) paytida bo'ladi. Kichik $k$ ($k=1$) shovqinga sezgir (overfitting), katta $k$ chegarani haddan tashqari silliqlaydi (underfitting).</p><p><strong>Cheklovlar:</strong> Xususiyatlar albatta normallashtirilishi kerak va yuqori o'lchamli fazoda masofalar yaqinlashib ketadi (<em>curse of dimensionality</em>).</p>",
          en: "<p><strong>k-NN</strong> is a <em>lazy learner</em> storing training samples and computing distances at inference. Small $k$ overfits noise; large $k$ underfits boundaries. Always normalize features and beware the <em>curse of dimensionality</em>.</p>"
        }
      },
      {
        heading: { uz: "14.2. SVM (Support Vector Machines) va Kernel Trick", en: "14.2. Support Vector Machines & Kernel Trick" },
        bodyHtml: {
          uz: "<p><strong>SVM</strong> sinflarni ajratuvchi <strong>maksimal marjali (maximum margin)</strong> gipertekislikni $w\\cdot x + b = 0$ topadi — bu qavariq (convex) optimallashtirish bo'lib, lokal minimum muammosi yo'q. <strong>$C$ parametri</strong> yumshoq marja xato jarimasini boshqaradi.</p><p><strong>Kernel Trick:</strong> Chiziqli ajralmaydigan nuqtalarni aniq yuqori fazoga o'tkazmasdan, skalyar ko'paytmani $K(x,y)$ orqali hisoblaydi. Eng kuchlisi — <strong>RBF (Gauss) yadrosi</strong> ($\\gamma$ ta'sir radiusini boshqaradi).</p>",
          en: "<p><strong>SVM</strong> finds the <strong>maximum-margin</strong> hyperplane $w\\cdot x + b = 0$ (convex optimization, global optimum). Soft-margin <strong>$C$</strong> balances margin width vs misclassification penalty.</p><p>The <strong>Kernel Trick</strong> computes inner products in high/infinite-dimensional spaces implicitly via $K(x,y)$, notably the <strong>RBF kernel</strong> controlled by $\\gamma$.</p>"
        },
        latex: "K_{\\text{RBF}}(x, y) = \\exp\\!\\left(-\\gamma \\|x - y\\|^2\\right)",
        widget: 'knn-svm'
      }
    ],
    slides: [
      { title: { uz: "M14: Klassik ML Tasniflovchilari (k-NN & SVM)", en: "M14: k-NN, SVM & Kernel Trick" }, subtitle: { uz: "KOK1506 · COMP4423 L6", en: "KOK1506 · COMP4423 L6" }, points: { uz: ["k-NN: lazy learning, KD-tree, curse of dimensionality", "SVM: maksimal marja, tayanch vektorlar, qavariq optimallashtirish", "Yumshoq marja C parametri (katta C → kichik marja, kam xato)", "Kernel Trick: Linear, Poly, RBF exp(-γ‖x-y‖²)"], en: ["k-NN: lazy learning, KD-tree, curse of dimensionality", "SVM: maximum margin, support vectors, convex optimization", "Soft-margin C trade-off", "Kernel Trick: Linear, Poly & RBF exp(-γ‖x-y‖²)"] } },
      { title: { uz: "Interaktiv k-NN vs SVM Yordamchi Paneli", en: "Interactive k-NN vs SVM Explorer" }, widget: 'knn-svm' }
    ],
    glossary: [
      { uz: "dangasa o'qitish", en: "lazy learning", defUz: "O'qitishni kechiktirib, barcha hisobni test paytida bajarish (k-NN)", defEn: "Deferring computation until query time (k-NN)" },
      { uz: "tayanch vektorlar", en: "support vectors", defUz: "Ajratuvchi gipertekislik marjasini belgilovchi eng yaqin nuqtalar", defEn: "Critical training samples lying on the margin boundaries" },
      { uz: "Kernel trick", en: "Kernel trick", defUz: "Yuqori fazodagi skalyar ko'paytmani K(x,y) orqali to'g'ridan-to'g'ri hisoblash", defEn: "Implicitly mapping into higher dimensions via kernel K(x,y)" }
    ],
    quiz: [
      { q: { uz: "k-NN algoritmi nima sababdan 'dangasa o'qitish' (lazy learning) deb ataladi?", en: "Why is k-NN called a 'lazy learning' algorithm?" }, options: [{ label: 'A', uz: "O'qitishda model qurmaydi, ma'lumotni saqlab barcha hisobni bashorat paytida bajaradi", en: "No explicit training phase; defers distance computation to inference" }, { label: 'B', uz: "Juda kam xotira ishlatadi", en: "Uses almost zero RAM" }, { label: 'C', uz: "Gradient tushish ishlatadi", en: "Uses gradient descent" }, { label: 'D', uz: "Faqat 2 sinfda ishlaydi", en: "Binary only" }], answer: 'A', explanation: { uz: "k-NN barcha o'qitish nuqtalarini xotirada ushlab, yangi nuqta kelganda masofa hisoblaydi.", en: "k-NN memorizes training examples and computes distances only at test time." } },
      { q: { uz: "SVM da optimal ajratuvchi gipertekislik nimani maksimallashtiradi?", en: "What does the optimal SVM hyperplane maximize?" }, options: [{ label: 'A', uz: "Parametrlar sonini", en: "Parameter count" }, { label: 'B', uz: "Sinflarning eng yaqin nuqtalari (tayanch vektorlar) orasidagi marjani (margin)", en: "The margin to the nearest support vectors of both classes" }, { label: 'C', uz: "Shovqinni", en: "Noise" }, { label: 'D', uz: "Batch o'lchamini", en: "Batch size" }], answer: 'B', explanation: { uz: "Maksimal marja yangi test ma'lumotlarida yaxshiroq umumlashtirish beradi.", en: "Maximizing the margin improves generalization robustness." } },
      { q: { uz: "RBF kernel K(x,y) = exp(-γ‖x-y‖²) dagi γ parametri juda katta bo'lsa nima yuz beradi?", en: "In an RBF SVM, what happens when γ is set very large?" }, options: [{ label: 'A', uz: "Har nuqta faqat o'ziga juda yaqinlarga ta'sir qilib overfitting xavfi ortadi", en: "Narrow influence radius around points leads to complex boundaries & overfitting" }, { label: 'B', uz: "Chiziqli modelga aylanadi", en: "Becomes linear" }, { label: 'C', uz: "Barcha xatolar nol bo'ladi", en: "Zero test error" }, { label: 'D', uz: "k=1 bo'ladi", en: "Becomes k=1" }], answer: 'A', explanation: { uz: "Katta γ ta'sir radiusini toraytirib murakkab, o'quv ma'lumotiga yopishgan chegara chizadi.", en: "Large γ shrinks Gaussian radius, overfitting individual training points." } },
      { q: { uz: "Yuqori o'lchamli fazoda barcha nuqtalar orasidagi masofa bir-biriga yaqinlashib qolishi qanday muammo deyiladi?", en: "Distance concentration in high-dimensional spaces affecting k-NN is called?" }, options: [{ label: 'A', uz: "O'lchamlilik la'nati (Curse of dimensionality)", en: "Curse of dimensionality" }, { label: 'B', uz: "Vanishing gradient", en: "Vanishing gradient" }, { label: 'C', uz: "Posterizatsiya", en: "Posterization" }, { label: 'D', uz: "Gisterezis", en: "Hysteresis" }], answer: 'A', explanation: { uz: "Shu sababli k-NN dan oldin PCA bilan o'lcham kamaytirish foydali.", en: "High dimensions blur nearest vs farthest distances; PCA helps mitigate this." } }
    ],
    matching: [
      { left: { uz: "k-NN (k=1)", en: "k-NN (k=1)" }, right: { uz: "Shovqinga sezgir, overfitting xavfi yuqori", en: "Sensitive to noise, prone to overfitting" } },
      { left: { uz: "SVM C parametri", en: "SVM C parameter" }, right: { uz: "Xato jarimasi va marja kengligi murosasi", en: "Controls soft-margin error penalty vs width" } },
      { left: { uz: "RBF Kernel", en: "RBF Kernel" }, right: { uz: "Cheksiz o'lchamli fazoda chiziqli bo'lmagan ajratish", en: "Smooth non-linear boundary via Gaussians" } },
      { left: { uz: "One-vs-Rest", en: "One-vs-Rest" }, right: { uz: "Ikkilik SVM ni ko'p sinfli vazifaga kengaytirish", en: "Multi-class strategy using binary SVMs" } }
    ],
    fillGap: [
      { text: { uz: "SVM da ajratuvchi tekislik o'rnini belgilovchi eng yaqin chegara nuqtalari ___ vektorlar deyiladi.", en: "Points closest to the SVM decision boundary defining the margin are ___ vectors." }, answer: ['tayanch', 'support'] },
      { text: { uz: "Chiziqli ajralmaydigan ma'lumotlarni yuqori fazoga o'tkazish usuli ___ trick deyiladi.", en: "Implicitly mapping non-linear data to high dimensions is the ___ trick." }, answer: ['kernel'] },
      { text: { uz: "k-NN dan foydalanishdan oldin turli shkaladagi xususiyatlarni albatta ___ qilish shart.", en: "Before applying k-NN, features at different scales must be ___." }, answer: ['normallashtirish', 'normalize', 'normalizatsiya'] }
    ]
  },

  // ==================== M15 ====================
  {
    id: 15,
    code: 'M15',
    labId: 15,
    hours: 2,
    keywords: ['Deep Learning', 'Neural Network', 'Backpropagation', 'SGD', 'Adam', 'Dataset', 'Data Augmentation', 'End-to-End'],
    title: {
      uz: "Kompyuterli ko'rishda chuqur o'qitish va Dataset tayyorlash",
      en: "Deep Learning Foundations for CV & Dataset Engineering"
    },
    description: {
      uz: "Sun'iy neyron va aktivatsiya funksiyalari, Universal yaqinlashish, Backpropagation & SGD/Adam, End-to-End o'qitish, Dataset yig'ish, annotatsiya turlari va Data Augmentation.",
      en: "Artificial neurons & activations, Universal Approximation, Backpropagation & SGD/Adam, End-to-End learning, dataset curation, annotation types, and Data Augmentation."
    },
    refs: [
      { label: "COMP4423 L7: ML to Deep Learning", url: "https://github.com/lookwei/COMP4423" },
      { label: "MS CV Recipes: Data Prep & Classification", url: "https://github.com/microsoft/computervision-recipes" },
      { label: "D2L.ai: Deep Learning Foundations", url: "https://d2l.ai/" }
    ],
    sections: [
      {
        heading: { uz: "15.1. Neyron Tarmoqlar, Aktivatsiya va Backpropagation", en: "15.1. Neural Networks, Nonlinearity & Backpropagation" },
        bodyHtml: {
          uz: "<p>Sun'iy neyron $y = f(\\sum w_i x_i + b)$ amalni bajaradi. Chiziqli bo'lmagan aktivatsiya bo'lmasa, 100 qatlam ham bitta chiziqli transformatsiyaga teng bo'lib qoladi. <strong>Teskari tarqalish (backpropagation)</strong> zanjir qoidasi bilan gradientlarni hisoblaydi va mini-batch <strong>SGD / Adam</strong> vaznlarni yangilaydi.</p><p><strong>Xavier / He initsializatsiyasi</strong> simmetriya muammosini oldini oladi. <strong>End-to-end o'qitish</strong> qo'lda xususiyat yasashni (HOG/SIFT) avtomatik o'rganishga almashtirdi.</p>",
          en: "<p>Each neuron computes $y = f(\\sum w_i x_i + b)$. Without nonlinear activations, stacked layers collapse to a single linear transform. <strong>Backpropagation</strong> computes gradients via the chain rule for mini-batch <strong>SGD / Adam</strong> updates.</p><p><strong>Xavier/He initialization</strong> breaks symmetry. <strong>End-to-end learning</strong> replaces hand-crafted features with learned visual representations.</p>"
        },
        callout: {
          type: 'info',
          uz: "<strong>Sonli misol (Forward pass):</strong> $x_1=1, x_2=2,\\ w_1=0.5, w_2=-0.3, b=0.1 \\implies z = 0.5(1) - 0.3(2) + 0.1 = 0.0 \\implies \\sigma(0) = 1/(1+e^0) = 0.50$.",
          en: "<strong>Worked Example:</strong> $z = 0.5(1) - 0.3(2) + 0.1 = 0.0 \\implies \\sigma(0) = 0.50$."
        }
      },
      {
        heading: { uz: "15.2. Dataset Yig'ish, Annotatsiya va Data Augmentation", en: "15.2. Dataset Curation, Annotation & Data Augmentation" },
        bodyHtml: {
          uz: "<p><strong>Annotatsiya turlari:</strong> Klassifikatsiya (tasvir yorlig'i), Obyekt aniqlash (bounding box + sinf), Segmentatsiya (piksel maskasi). Ma'lumotlar <strong>Train (70–80%) / Val (10–15%) / Test (10–15%)</strong> ga stratifikatsiya bilan ajratiladi va har epoxada aralashtiriladi (shuffling).</p><p><strong>Data Augmentation:</strong> Tasvirni gorizontal aylantirish (flip), kesish (crop), burish (rotation), rang o'zgartirish (ColorJitter) overfittingni kamaytiradi. Katta to'plamlarda WebDataset/TFRecord disk I/O ni tezlashtiradi.</p>",
          en: "<p><strong>Annotations:</strong> Image labels (classification), bounding boxes (detection), pixel masks (segmentation). Split stratified into <strong>Train / Val / Test</strong> and shuffle every epoch.</p><p><strong>Data Augmentation</strong> (flips, crops, rotations, color jitter) combats overfitting and class imbalance.</p>"
        }
      }
    ],
    slides: [
      { title: { uz: "M15: Chuqur O'qitish va Dataset Tayyorlash", en: "M15: Deep Learning & Dataset Engineering" }, subtitle: { uz: "KOK1506 · COMP4423 L7 · D2L", en: "KOK1506 · COMP4423 L7 · D2L" }, points: { uz: ["Neyron modeli y = f(Σwx + b) va nochiziqli aktivatsiya zarurati", "Backpropagation (chain rule) va Mini-batch SGD / Adam", "Nima uchun oddiy FC tarmoqlar 224×224×3 tasvirga samarasiz?", "Dataset: Annotatsiya turlari, Shuffling, Class Imbalance & Augmentation"], en: ["Neuron model & why nonlinearity is essential", "Backpropagation + Mini-batch SGD / Adam", "Why flat Fully-Connected layers fail on 224×224×3 images", "Dataset annotation, shuffling, class imbalance & Data Augmentation"] } }
    ],
    glossary: [
      { uz: "backpropagation", en: "backpropagation", defUz: "Zanjir qoidasi orqali yo'qotish gradientini barcha vaznlarga tarqatish", defEn: "Computing parameter gradients backwards via the chain rule" },
      { uz: "annotatsiya", en: "annotation", defUz: "Tasvirga sinf, bounding box yoki piksel maska yorlig'ini belgilash", defEn: "Labeling images with classes, boxes, or pixel masks" },
      { uz: "ma'lumotlarni ko'paytirish", en: "data augmentation", defUz: "Flip, crop, rotation bilan sun'iy yangi namunalar yaratish", defEn: "Synthesizing diverse views via flips, crops & color jitter" }
    ],
    quiz: [
      { q: { uz: "Sun'iy neyron tarmoqda aktivatsiya funksiyasi bo'lmasa nima yuz beradi?", en: "What happens if a multi-layer neural network has no nonlinear activation function?" }, options: [{ label: 'A', uz: "Qancha ko'p qatlam qo'shilmasin, tarmoq bitta chiziqli funksiyaga teng bo'lib qoladi", en: "Any depth collapses to a single linear transformation" }, { label: 'B', uz: "Tarmoq juda aqlli bo'ladi", en: "Becomes more expressive" }, { label: 'C', uz: "GPU kerak bo'lmaydi", en: "No GPU needed" }, { label: 'D', uz: "Overfitting kamayadi", en: "Reduces overfitting" }], answer: 'A', explanation: { uz: "Chiziqli funksiyalar kompozitsiyasi yana chiziqli funksiya beradi.", en: "Compositions of linear layers remain strictly linear." } },
      { q: { uz: "Nima uchun oddiy to'liq bog'langan (FC) tarmoqlar katta tasvirlar (masalan, 224×224×3) uchun samarasiz?", en: "Why are plain Fully-Connected (FC) networks inefficient for raw 224×224×3 images?" }, options: [{ label: 'A', uz: "Fazoviy tuzilmani yo'qotadi va birinchi qatlamdayoq yuz millionlab parametr talab qiladi", en: "Flattening destroys 2D spatial structure and explodes parameter count" }, { label: 'B', uz: "RGB ni o'qimaydi", en: "Cannot read RGB" }, { label: 'C', uz: "Adam bilan ishlamaydi", en: "Incompatible with Adam" }, { label: 'D', uz: "Sigmoid ishlatolmaydi", en: "Cannot use sigmoid" }], answer: 'A', explanation: { uz: "150,528 kirishni 4096 neyronga ulashning o'zi 616M+ parametr talab qiladi.", en: "Connecting 150,528 pixels to 4,096 neurons takes >616M weights in layer 1 alone." } },
      { q: { uz: "Har bir epoxadan oldin o'qitish ma'lumotlarini tasodifiy aralashtirish (shuffling) nima uchun kerak?", en: "Why shuffle training batches before every epoch?" }, options: [{ label: 'A', uz: "Mini-batch gradient tushish bir sinf ketidan kelishi sababli beqaror bo'lib qolmasligi uchun", en: "Prevents ordered-class mini-batches from skewing gradient updates" }, { label: 'B', uz: "Faylni JPEG qilish uchun", en: "JPEG encoding" }, { label: 'C', uz: "Test aniqligini yashirish uchun", en: "Hide test accuracy" }, { label: 'D', uz: "Shart emas", en: "Unnecessary" }], answer: 'A', explanation: { uz: "Tartibli batchlar gradientni bir tomonga og'dirib yuboradi.", en: "Sorted batches introduce severe gradient bias per step." } },
      { q: { uz: "x1=1, x2=2, w1=0.5, w2=-0.3, b=0.1 bo'lsa, Sigmoid neyronining chiqishi qancha?", en: "With x1=1, x2=2, w1=0.5, w2=-0.3, b=0.1, what is the Sigmoid neuron output?" }, options: [{ label: 'A', uz: "0.0", en: "0.0" }, { label: 'B', uz: "0.5", en: "0.5" }, { label: 'C', uz: "1.0", en: "1.0" }, { label: 'D', uz: "0.73", en: "0.73" }], answer: 'B', explanation: { uz: "z = 0.5 - 0.6 + 0.1 = 0 → σ(0) = 1 / (1 + e^0) = 0.5.", en: "z = 0.0, and σ(0) = 1/(1+1) = 0.5." } }
    ],
    matching: [
      { left: { uz: "Backpropagation", en: "Backpropagation" }, right: { uz: "Zanjir qoidasi bilan gradient hisoblash", en: "Chain-rule gradient computation" } },
      { left: { uz: "He / Xavier Init", en: "He / Xavier Init" }, right: { uz: "Simmetriyani buzib barqaror gradient boshlash", en: "Symmetry-breaking variance-scaled weight init" } },
      { left: { uz: "Data Augmentation", en: "Data Augmentation" }, right: { uz: "Flip, crop va rang o'zgartirish bilan overfittingni kamaytirish", en: "Synthetic transforms reducing overfitting" } },
      { left: { uz: "PyTorch DataLoader", en: "PyTorch DataLoader" }, right: { uz: "Mini-batch, shuffling va parallel yuklash", en: "Automated mini-batching, shuffling & workers" } }
    ],
    fillGap: [
      { text: { uz: "Xom tasvirdan yakuniy qarorgacha barcha qatlamlarni birgalikda o'qitish ___ o'qitish deyiladi.", en: "Training feature extraction and classification jointly from raw pixels is ___ learning." }, answer: ['end-to-end'] },
      { text: { uz: "Butun o'qitish to'plami bo'ylab bir marta to'liq o'tish bitta ___ deb ataladi.", en: "One complete pass through the entire training dataset is an ___." }, answer: ['epoxa', 'epoch'] },
      { text: { uz: "PyTorch da datasetdan mini-batch shakllantiruvchi klass ___ deyiladi.", en: "In PyTorch, mini-batches and shuffling are handled by ___." }, answer: ['DataLoader'] }
    ]
  }
);
