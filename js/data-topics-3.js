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
        heading: { uz: "11.1. Kamera Kalibrlash (Zhang Usuli) va Qayta Proyeksiya Xatosi", en: "11.1. Zhang's Calibration & Reprojection Error" },
        bodyHtml: {
          uz: "<p>Ishlab chiqarishdan chiqqan har bir ob'ektivda fokus masofasi $f_x, f_y$ va optik markaz $(c_x, c_y)$ biroz farq qiladi, linza esa tasvirni egadi. <strong>Zhengyou Zhang (2000)</strong> usuli ma'lum kvadrat o'lchamli <strong>shaxmat taxtasini (chessboard)</strong> 10–20 xil burchakda suratga olib, <code>cv2.findChessboardCorners</code> + subpiksel <code>cornerSubPix</code> bilan burchaklarni topadi va Levenberg–Marquardt bilan $K$, distorsiya va tashqi $[R_i | t_i]$ ni birga optimallashtiradi.</p><p>Kalibrlash sifati <strong>o'rtacha qayta proyeksiya xatosi (reprojection error)</strong> bilan tekshiriladi — u <strong>&lt; 0.5–1.0 piksel</strong> bo'lishi shart!</p>",
          en: "<p>Every physical lens varies slightly in focal length $(f_x, f_y)$, principal point $(c_x, c_y)$, and optical distortion. <strong>Zhang's method (2000)</strong> captures 10–20 views of a planar chessboard, refines corners via <code>cornerSubPix</code>, and solves jointly for $K$, distortion, and extrinsics $[R_i|t_i]$ via Levenberg–Marquardt.</p><p>Calibration accuracy is verified by RMS <strong>reprojection error</strong>, aiming for <strong>&lt; 0.5–1.0 px</strong>.</p>"
        },
        latex: "\\min_{K, d, R_i, t_i} \\sum_{i,j} \\left\\| m_{ij} - \\hat{m}(K, d, R_i, t_i, M_j) \\right\\|^2"
      },
      {
        heading: { uz: "11.2. Linza Distorsiyasi: Radial (Barrel/Pincushion) & Tangensial", en: "11.2. Lens Distortion: Radial (Barrel/Pincushion) & Tangential" },
        bodyHtml: {
          uz: "<p>• <strong>Radial distorsiya ($k_1, k_2, k_3$):</strong> Markazdan masofa $r^2 = x^2 + y^2$ ortgani sari kuchayadi. Keng burchakli GoPro/xavfsizlik kameralarida to'g'ri devorlar tashqariga bo'rtib chiqadi (<strong>Bochkasimon / Barrel</strong>, $k_1 &lt; 0$); teleob'ektivlarda esa ichkariga botadi (<strong>Yostiqsimon / Pincushion</strong>, $k_1 &gt; 0$).<br>• <strong>Tangensial distorsiya ($p_1, p_2$):</strong> Linza va CMOS sensor tekisliklari qat'iy parallel emasligidan kelib chiqadi (<em>Brown–Conrady modeli</em>).<br><strong>Tezkor video to'g'irlash:</strong> Har kadrda <code>cv2.undistort()</code> o'rniga bir marta <code>initUndistortRectifyMap()</code> hisoblab, video oqimida tezkor <code>cv2.remap()</code> ishlating!</p>",
          en: "<p>• <strong>Radial Distortion ($k_1, k_2, k_3$):</strong> Scales with radius $r^2 = x^2 + y^2$ — causing outward <strong>Barrel</strong> ($k_1 &lt; 0$) on wide lenses and inward <strong>Pincushion</strong> ($k_1 &gt; 0$) on telephoto lenses.<br>• <strong>Tangential Distortion ($p_1, p_2$):</strong> Caused by lens-to-sensor tilt (Brown–Conrady model). For real-time video, precompute LUTs via <code>initUndistortRectifyMap()</code> and apply fast <code>cv2.remap()</code>!</p>"
        },
        latex: "x_{\\text{dist}} = x(1 + k_1 r^2 + k_2 r^4 + k_3 r^6) + 2 p_1 x y + p_2(r^2 + 2 x^2)"
      },
      {
        heading: { uz: "11.3. Stereo Ko'rish, Rektifikatsiya va Chuqurlik (Z = fB/d)", en: "11.3. Stereo Vision, Epipolar Rectification & Depth" },
        bodyHtml: {
          uz: "<p>Baza masofasi $B$ bilan ajratilgan ikki kalibrlangan kamera nuqtani chap rasmda $u_L$, o'ngda $u_R$ ga tushiradi. Ular orasidagi siljish <strong>disparitet $d = u_L - u_R$</strong> deyiladi. <strong>Stereo Rektifikatsiya</strong> epipolyar chiziqlarni gorizontal qatorlarga tekislab, 2D qidiruvni bitta gorizontal qatordagi tezkor 1D qidiruvga aylantiradi! Zich xarita uchun <em>Block Matching (StereoBM)</em> yoki silliqroq <em>Semi-Global Matching (SGM)</em> va zamonaviy <em>RAFT-Stereo</em> qo'llaniladi.</p>",
          en: "<p>Two cameras separated by baseline $B$ observe a horizontal disparity $d = u_L - u_R$. <strong>Stereo Rectification</strong> warps both views so epipolar lines become horizontal scanlines, collapsing 2D search into 1D! Dense disparity uses <em>Block Matching</em>, <em>Semi-Global Matching (SGM)</em>, or deep <em>RAFT-Stereo</em>.</p>"
        },
        latex: "Z = \\frac{f \\cdot B}{d}, \\qquad \\Delta Z \\approx \\frac{Z^2}{f \\cdot B}\\, \\Delta d",
        widget: 'stereo-sim'
      },
      {
        heading: { uz: "11.4. Sonli Misol (Doskada): Stereo Chuqurlik va Xato O'sishi ΔZ", en: "11.4. Worked Example: Stereo Depth & Quadratic Depth Error" },
        bodyHtml: {
          uz: "<p><strong>Berilgan:</strong> Stereo kamera fokal masofasi $f=1000\\text{ px}$, baza $B=0.10\\text{ m}$ (10 sm), o'lchangan disparitet $d=50\\text{ px}$ (aniqlik $\\Delta d = 1\\text{ px}$).<br>1. Chuqurlik: $Z = \\frac{1000 \\times 0.10}{50} = \\frac{100}{50} = \\mathbf{2.0\\text{ metr}}$.<br>2. Xato tahlili ($Z=2\\text{ m}$ da): $\\Delta Z \\approx \\frac{2^2}{1000 \\times 0.1} \\cdot 1 = \\frac{4}{100} = \\mathbf{0.04\\text{ m} = 4\\text{ sm}}$!<br>3. Endi mashina $Z = \\mathbf{20\\text{ m}}$ uzoqlikda ($d=5\\text{ px}$) bo'lsin: $\\Delta Z \\approx \\frac{20^2}{100} \\cdot 1 = \\mathbf{4.0\\text{ metr}}$ xato! Shu sababli avtonom transportda uzoq masofa uchun baza $B$ kattalashtiriladi yoki LiDAR qo'shiladi!</p>",
          en: "<p><strong>Given:</strong> $f=1000\\text{ px}$, $B=0.10\\text{ m}$, $d=50\\text{ px}$ with $\\Delta d = 1\\text{ px}$.<br>1. Depth: $Z = (1000 \\times 0.10) / 50 = \\mathbf{2.0\\text{ m}}$.<br>2. Error at $2\\text{ m}$: $\\Delta Z \\approx \\frac{4}{100} = \\mathbf{4\\text{ cm}}$.<br>3. At $20\\text{ m}$ ($d=5\\text{ px}$): $\\Delta Z \\approx \\frac{400}{100} = \\mathbf{4.0\\text{ m}}$! Quadratic error explains why highway autonomy needs wide baselines or LiDAR.</p>"
        },
        code: `import cv2, numpy as np

# 1. Undistort LUT bilan tezkor remap misoli
K = np.array([[800., 0, 160.], [0, 800., 120.], [0, 0, 1.]])
dist = np.array([-0.35, 0.12, 0.0, 0.0, 0.0])  # Barrel k1 < 0
map1, map2 = cv2.initUndistortRectifyMap(K, dist, None, K, (320, 240), cv2.CV_16SC2)
frame = np.zeros((240, 320, 3), np.uint8)
clean = cv2.remap(frame, map1, map2, cv2.INTER_LINEAR)

# 2. Stereo chuqurlik jadvali
f, B = 1000.0, 0.12
for d in [10, 25, 50, 100]:
    print(f"disparity={d:3d} px -> Z={f*B/d:.2f} m, dZ/dd={((f*B/d)**2)/(f*B):.3f} m/px")`
      },
      {
        heading: { uz: "11.5. Keys-Muhokama: Kalibrlashda Shaxmat Taxtasini To'g'ri Tutish", en: "11.5. Case Discussion: Chessboard Coverage & Stereo SGM Failures" },
        bodyHtml: {
          uz: "<p>Kalibrlashda barcha rasmlarni kamera markazida bir xil tekislikda olish katta xato beradi — taxtani <strong>turli burchaklarda og'dirish (30–45°) va kadrning barcha burchaklariga</strong> olib borish shart (radial $k_1, k_2$ aynan chetlarda bilinadi!). Stereo SGM esa tekis oq devor va shisha sirtlarda moslik topolmaydi.</p>",
          en: "<p>Holding a chessboard flat in the image center fails to constrain $f_x, f_y$ and radial $k_1, k_2$. Tilt 30–45° and cover corners! Stereo matching struggles on textureless walls and transparent/reflective glass.</p>"
        },
        discussion: {
          q: { uz: "Avtomobil bamperidagi stereo kameralar orasidagi baza B=0.10 m dan B=0.40 m ga oshirilsa, uzoq obyektlardagi chuqurlik aniqligi qanday o'zgaradi?", en: "If you widen a car's stereo baseline from B=0.10 m to B=0.40 m, how does far-range depth error ΔZ change?" },
          a: { uz: "ΔZ ≈ Z² / (f·B) formulaga ko'ra baza 4× oshganda bir xil piksel xatosi Δd uchun metr xatosi ΔZ to'g'ridan-to'g'ri 4 barobar KAMAYADI! (Kamchiligi: juda yaqin obyektlarda ko'rish maydoni ustma-ust tushmay qoladi).", en: "Because ΔZ ≈ Z²/(f·B), widening B by 4× cuts depth error ΔZ by 4× at any distance Z (trade-off: reduced near-field stereo overlap)." }
        }
      }
    ],
    slides: [
      { title: { uz: "11.1. Nima Uchun Kamera Kalibrlash Shart?", en: "11.1. Why Calibrate Cameras? (Zhang's Method)" }, points: { uz: ["Real linza ideal pinhole emas: fokus va optik markaz zavoddan siljigan bo'ladi", "Zhang (2000) usuli: ma'lum o'lchamli shaxmat taxtasini 10–20 burchakdan suratga olish", "cv2.findChessboardCorners + cornerSubPix → cv2.calibrateCamera()", "Mezon: Qayta proyeksiya xatosi (Reprojection Error) < 0.5–1.0 piksel!"], en: ["Real lenses deviate from ideal pinholes & warp straight lines", "Zhang's planar method: 10–20 chessboard views at varied tilts & corners", "Solve via cornerSubPix + calibrateCamera(); target RMS error < 1 px"] } },
      { title: { uz: "Radial & Tangensial Linza Distorsiyasi", en: "Radial (Barrel/Pincushion) & Tangential Distortion" }, latex: "x_{\\text{dist}} = x(1 + k_1 r^2 + k_2 r^4 + k_3 r^6) + 2 p_1 xy + p_2(r^2+2x^2)", points: { uz: ["Bochkasimon (Barrel, k1 < 0): keng burchakli linzalarda chiziqlar tashqariga egiladi", "Yostiqsimon (Pincushion, k1 > 0): teleobyektivda chiziqlar ichkariga tortiladi", "Tangensial (p1, p2): linza va sensor parallel emasligi tufayli", "Real-vaqt video uchun: bir marta LUT hisoblab, cv2.remap() ishlatish!"], en: ["Barrel (k1<0): wide-angle outward bulge; Pincushion (k1>0): telephoto pinch", "Tangential (p1, p2): tilted lens-sensor assembly", "Use initUndistortRectifyMap + cv2.remap() for fast real-time video"] } },
      { title: { uz: "Stereo Ko'rish va Epipolyar Rektifikatsiya", en: "Stereo Geometry & Epipolar Rectification" }, points: { uz: ["Ikkita kamera B baza masofasi bilan ajratilgan", "Disparitet d = u_L - u_R (yaqin obyekt → katta d; uzoq → kichik d)", "Stereo Rektifikatsiya: epipolyar chiziqlarni gorizontal qatorga tekislash", "2D moslashtirish 1D qator bo'ylab tezkor qidiruvga aylanadi!"], en: ["Two cameras separated by baseline B measure disparity d = u_L - u_R", "Closer objects → larger disparity d", "Rectification aligns scanlines horizontally (2D → 1D search!)"] } },
      { title: { uz: "Interaktiv Stereo Chuqurlik Simulatori", en: "Interactive Stereo Depth Calculator" }, widget: 'stereo-sim' },
      { title: { uz: "Chuqurlik Formulasi va Kvadratik Xato ΔZ", en: "Stereo Depth & Quadratic Range Error" }, latex: "Z = \\frac{f \\cdot B}{d}, \\qquad \\Delta Z \\approx \\frac{Z^2}{f \\cdot B}\\,\\Delta d", points: { uz: ["Stereo aniqligi masofa Z ning KVADRATIGA proporsional yomonlashadi!", "Zich disparitet algoritmlari: StereoBM (tez) vs StereoSGM (silliq) vs RAFT-Stereo"], en: ["Depth uncertainty grows quadratically with Z²!", "Dense disparity: fast Block Matching vs Semi-Global Matching (SGM)"] } },
      { title: { uz: "Sonli Misol (Doskada): Z va ΔZ Xatosi", en: "Worked Example: Stereo Z & Error at 2m vs 20m" }, points: { uz: ["f = 1000 px, B = 0.10 m, xato Δd = 1 px", "1. d = 50 px da: Z = (1000 × 0.10) / 50 = 2.0 m", "2. 2 m da xato: ΔZ ≈ 2² / 100 = 0.04 m (4 sm)", "3. 20 m da (d = 5 px): ΔZ ≈ 20² / 100 = 4.0 metr xato!"], en: ["f=1000px, B=0.10m, Δd=1px", "At d=50px: Z = 2.0m, error ΔZ = 4cm; at 20m (d=5px): ΔZ = 4.0 meters!"] } },
      { title: { uz: "Python Kod: Tezkor Undistort (remap) & Depth", en: "Python Walkthrough: Fast Undistort Remap & Stereo" }, code: `map1, map2 = cv2.initUndistortRectifyMap(K, dist, None, K, (W, H), cv2.CV_16SC2)
undistorted = cv2.remap(frame, map1, map2, cv2.INTER_LINEAR)
sgbm = cv2.StereoSGBM_create(minDisparity=0, numDisparities=64, blockSize=5)
disp = sgbm.compute(grayL, grayR).astype(np.float32) / 16.0
depth_m = (f * B) / np.maximum(disp, 1e-3)` },
      { title: { uz: "Muhokama: Stereo Baza Kengligi va Ko'rlik Zonasi", en: "Discussion: Widening Stereo Baseline vs Blind Spot" }, discussion: { q: { uz: "Avtonom mashinada uzoqdagi xavfni aniq ko'rish uchun baza B ni 4× oshirsak nima yaxshilanadi va nima yomonlashadi?", en: "If you widen a stereo baseline 4× to improve far depth accuracy, what trade-off appears nearby?" }, a: { uz: "Uzoqdagi ΔZ xato 4× kamayadi, ammo maksimal disparitet ko'payib juda yaqin obyektlar chap/o'ng kameralarning umumiy maydonidan chiqib ketadi (minimum masofa ortadi).", en: "Far depth error drops 4×, but minimum measurable distance increases and near disparity range explodes." } } }
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
        heading: { uz: "12.1. Sirpanuvchi Oyna (Sliding Window), Piramida va NMS", en: "12.1. Sliding Window, Image Pyramids & NMS" },
        bodyHtml: {
          uz: "<p>Tasvir klassifikatsiyasi 'nima bor?' deb so'rasa, obyekt aniqlash 'nima va <strong>qayerda</strong>?' deydi. Klassik usullarda turli o'lchamdagi obyektlarni topish uchun tasvir piramidasi (<code>scaleFactor</code> = 1.1–1.25) bo'ylab <strong>sirpanuvchi oyna</strong> yurgiziladi. Bitta yuz/piyoda ustida o'nlab qo'shni oynalar faollashgani uchun yakunda <strong>Non-Maximum Suppression (NMS)</strong> faqat eng yuqori ishonchli qutini qoldiradi.</p><p>Detektorni kuchaytirish uchun dastlabki model fon ustida xato topgan qiyin namunalarni (<em>False Positives</em>) to'plab qayta o'qitish — <strong>Hard Negative Mining</strong> qo'llaniladi.</p>",
          en: "<p>Object detection localizes both <em>what</em> and <em>where</em>. Classical detectors scan a <strong>sliding window</strong> over a multi-scale <strong>image pyramid</strong>, suppress duplicate overlapping windows via <strong>Non-Maximum Suppression (NMS)</strong>, and refine accuracy with <strong>Hard Negative Mining</strong>.</p>"
        }
      },
      {
        heading: { uz: "12.2. Viola-Jones (2001): Haar, Integral Tasvir O(1), AdaBoost & Kaskad", en: "12.2. Viola-Jones (2001): Haar, O(1) Integral Image & Cascade" },
        bodyHtml: {
          uz: "<p>Viola va Jones (2001) real vaqtda CPU da 15+ FPS yuz aniqlashni uchta kashfiyot bilan ta'minladi:<br>1) <strong>Haar xususiyatlari:</strong> Ko'z sohasi yonoqdan qorong'iroq, burun ko'prigi yorqinroq kabi oq/qora to'rtburchaklar yig'indi farqi.<br>2) <strong>Integral tasvir $II(y, x)$:</strong> Har bir nuqtagacha bo'lgan piksellar yig'indisini oldindan saqlab, istalgan o'lchamli to'rtburchak yig'indisini atigi <strong>4 ta massiv murojaati — $O(1)$ konstant vaqtda</strong> hisoblash!<br>3) <strong>AdaBoost + Kaskad:</strong> 160,000+ Haar belgisidan eng kuchlilarini tanlab 38-bosqichli kaskad qurish — dastlabki 2–3 belgi 90% fon oynalarini bir necha mikrosekundda rad etadi!</p>",
          en: "<p><strong>Viola-Jones (2001)</strong> achieved real-time CPU face detection via three pillars: (1) <strong>Haar rectangle features</strong>; (2) <strong>Integral Image</strong> evaluating any rectangle sum in <strong>4 array lookups O(1)</strong>; and (3) an <strong>AdaBoost Cascade</strong> discarding background patches within the first few checks.</p>"
        },
        latex: "\\text{Sum}(D) = II(4) + II(1) - II(2) - II(3) \\quad \\text{(doim 4 ta amal, } O(1)\\text{!)}",
        widget: 'integral-sim'
      },
      {
        heading: { uz: "12.3. HOG + SVM (Piyoda Aniqlash) va DPM", en: "12.3. HOG + SVM Pedestrians & Deformable Part Models" },
        bodyHtml: {
          uz: "<p><strong>HOG (Dalal &amp; Triggs, 2005):</strong> 64×128 oynani 8×8 pikselli kataklarga bo'lib, har katakda 9 ta gradient burchagi (0°–180°) gistogrammasini quradi va 2×2 bloklarda L2 normallaydi → <strong>3780-o'lchamli vektor</strong> + chiziqli <strong>SVM</strong>. Piyoda aniqlashda kiyim rangidan mustaqil siluetni tutadi! Keyinroq <strong>DPM (Felzenszwalb)</strong> obyekt qismlarini (bosh, qo'l, oyoq) prujinali model sifatida modellashtirdi.</p>",
          en: "<p><strong>HOG (2005):</strong> Pools 9 orientation bins inside 8×8 cells across 2×2 L2-normalized blocks in a 64×128 window (<strong>3,780-D descriptor</strong> + Linear SVM), capturing illumination-invariant silhouettes. <strong>DPM</strong> extended this with spring-connected deformable parts.</p>"
        }
      },
      {
        heading: { uz: "12.4. Sonli Misol (Doskada): Integral Tasvirdan O(1) To'rtburchak Yig'indisi", en: "12.4. Worked Example: O(1) Integral Image Query & HOG Dims" },
        bodyHtml: {
          uz: "<p><strong>Masala 1 (Integral tasvir):</strong> 3×3 tasvir $I = \\begin{bmatrix}1&2&3\\\\4&5&6\\\\7&8&9\\end{bmatrix}$ berilgan.<br>• Integral jadval (1-indeksli 0-qator/ustun bilan): $II = \\begin{bmatrix}0&0&0&0\\\\ 0&1&3&6\\\\ 0&5&12&21\\\\ 0&12&27&45\\end{bmatrix}$.<br>• Pastki o'ng $2\\times 2$ kvadrat $[5,6;\\ 8,9]$ yig'indisini to'g'ridan-to'g'ri tekshirsak: $5+6+8+9 = \\mathbf{28}$.<br>• Integral jadvaldan 4 amalda: $II(3,3) - II(1,3) - II(3,1) + II(1,1) = 45 - 6 - 12 + 1 = \\mathbf{28}$! 1000×1000 tasvirda ham xuddi shunday atigi 4 amal!</p><p><strong>Masala 2 (HOG vektor o'lchami):</strong> 64×128 oynada 8×8 katak = $8 \\times 16$ katak; 2×2 blok qadami 1 katak = $(8-1)\\times(16-1) = 7 \\times 15 = 105$ blok; har blokda $4\\text{ katak} \\times 9\\text{ bin} = 36$ son $\\implies 105 \\times 36 = \\mathbf{3780\\text{ ta belgi}}$!</p>",
          en: "<p><strong>Integral Image ($I=[[1,2,3],[4,5,6],[7,8,9]]$):</strong> Bottom-right 2×2 sum $= 45 - 6 - 12 + 1 = \\mathbf{28}$ in 4 ops ($5+6+8+9=28$).<br><strong>HOG 64×128:</strong> $7\\times 15 = 105$ overlapping 2×2 blocks × 4 cells × 9 bins $= \\mathbf{3,780}$ features.</p>"
        },
        code: `import cv2, numpy as np

I = np.array([[1,2,3],[4,5,6],[7,8,9]], dtype=np.uint8)
II = cv2.integral(I)  # (H+1, W+1) nol chegarali jadval
# Pastki o'ng 2x2 [y=1..3, x=1..3]:
box_sum = II[3, 3] - II[1, 3] - II[3, 1] + II[1, 1]
print("Direct sum:", I[1:3, 1:3].sum(), "| O(1) Integral:", int(box_sum))

# HOG + Default Pedestrian Detector
hog = cv2.HOGDescriptor()
hog.setSVMDetector(cv2.HOGDescriptor_getDefaultPeopleDetector())
print("HOG vector len:", hog.getDescriptorSize())  # 3780`
      },
      {
        heading: { uz: "12.5. Haar Kaskad Cheklovlari & Chuqur Detektorlarga O'tish", en: "12.5. Haar Limitations & Transition to Deep Detectors" },
        bodyHtml: {
          uz: "<p>Haar kaskadlari juda tez bo'lsa-da: (1) yon (profil) yoki qiyshiq burilgan yuzlarda ishlamaydi; (2) niqob yoki quyosh ko'zoynakda (<em>occlusion</em>) keskin sinadi; (3) faqat yuz kabi qattiq shakllarga mos. Shu bois zamonaviy tizimlarda <strong>MTCNN / RetinaFace / YOLOv8-face</strong> ishlatiladi.</p>",
          en: "<p>While fast on CPU, Haar cascades fail on non-frontal faces, heavy occlusion (masks/sunglasses), and variable lighting—leading modern systems to adopt <strong>RetinaFace / YOLO / DETR</strong>.</p>"
        },
        discussion: {
          q: { uz: "cv2.CascadeClassifier.detectMultiScale() da minNeighbors=1 qilsak nima bo'ladi va minNeighbors=10 qilsak nima bo'ladi?", en: "What happens in cv2.CascadeClassifier.detectMultiScale() if you set minNeighbors=1 vs minNeighbors=10?" },
          a: { uz: "minNeighbors=1 ko'plab soxta yuzlarni (False Positive — daraxt, stul, devor naqshlarini) chiqarib yuboradi. minNeighbors=10 esa juda qattiq filtr qo'yib soxta aniqlashni yo'qotadi, lekin haqiqiy kichik/qiyshiq yuzlarni ham o'tkazib yuborishi mumkin (Recall pasayadi).", en: "minNeighbors=1 floods the output with false positives (chairs/posters). minNeighbors=10 yields clean detections but drops Recall on angled or faint faces." }
        }
      }
    ],
    slides: [
      { title: { uz: "12.1. Sirpanuvchi Oyna, Tasvir Piramidasi va NMS", en: "12.1. Sliding Window, Pyramids & NMS" }, points: { uz: ["Turli o'lchamdagi obyektlarni topish: Tasvir piramidasi (scaleFactor=1.1–1.25)", "Sirpanuvchi oyna har bir koordinata va masshtabni tekshiradi", "Muammo: Bitta yuz ustida 10–30 ta qo'shni to'rtburchak chiqadi", "Yechim: Non-Maximum Suppression (NMS) & minNeighbors"], en: ["Multi-scale detection via Image Pyramids + Sliding Window", "Multiple overlapping hits around the same face are pruned by NMS", "Hard Negative Mining retrains on high-scoring false positives"] } },
      { title: { uz: "Viola-Jones (2001) Uchta Tayanchi", en: "Three Pillars of Viola-Jones (2001)" }, points: { uz: ["1. Haar-o'xshash xususiyatlar (ko'z chizig'i vs yonoq, burun ko'prigi)", "2. Integral tasvir — har qanday o'lchamdagi yig'indini 4 amalda O(1) hisoblash", "3. AdaBoost + 38-bosqichli Kaskad — 90% fonni bir necha mikrosekundda rad etish", "Tarixiy ahamiyati: Birinchi real-vaqt CPU yuz detektori (15+ FPS)"], en: ["1. Rectangular Haar-like intensity contrast features", "2. Integral Image evaluating any box in O(1) constant time", "3. AdaBoost Cascade discarding background windows immediately", "Landmark: First real-time CPU face detector (15+ FPS)"] } },
      { title: { uz: "Interaktiv Integral Tasvir O(1) Simulatori", en: "Interactive Integral Image O(1) Sum" }, widget: 'integral-sim' },
      { title: { uz: "Sonli Misol (Doskada): Integral Tasvir & HOG 3780-D", en: "Worked Example: O(1) Integral Sum & HOG Size" }, latex: "\\text{Sum}(D) = II(3,3) - II(1,3) - II(3,1) + II(1,1) = 45 - 6 - 12 + 1 = 28", points: { uz: ["I = [[1,2,3],[4,5,6],[7,8,9]] → pastki o'ng 2×2: 5+6+8+9 = 28", "HOG (64×128 oyna): 7×15 blok × 4 katak × 9 burchak = 3,780 ta belgi!"], en: ["Direct 2×2 sum 5+6+8+9 = 28 matches 45-6-12+1 = 28 in O(1)", "HOG 64×128 window = 7×15 blocks × 4 cells × 9 bins = 3,780 features!"] } },
      { title: { uz: "AdaBoost va Kaskadning Tezlik Siri", en: "Why the Cascade Runs So Fast" }, points: { uz: ["50,000 oynadan 99.9% i fon — hammasini og'ir modeldan o'tkazish isrof!", "1-bosqich (2 ta Haar xususiyat): 50% fonni birdan rad etadi", "2-bosqich (10 ta xususiyat): qolgan 80% fonni rad etadi", "Faqat yuzga o'xshagan 0.1% oynalar oxirgi chuqur bosqichgacha boradi!"], en: ["99.9% of windows are background — evaluating full classifier everywhere is wasteful", "Stage 1 (2 features) rejects 50% instantly; later stages verify subtle details", "Average checks per window < 10 Haar features!"] } },
      { title: { uz: "HOG + SVM (2005) va DPM", en: "HOG + SVM (Dalal-Triggs 2005) & DPM" }, points: { uz: ["8×8 pikselli katakda 9 ta gradient burchagi (0°–180°)", "2×2 katakli blokda L2 normalizatsiya → yorug'lik/soya o'zgarishiga chidamli", "Chiziqli SVM bilan piyodalar siluetini aniqlashda 10 yil standart bo'lgan"], en: ["9 orientation bins per 8×8 cell, L2-normalized over overlapping 2×2 blocks", "Illumination-robust pedestrian silhouette detection for a decade"] } },
      { title: { uz: "Python Kod: Integral Tasvir, Haar Kaskad & HOG", en: "Python Walkthrough: cv2.integral & CascadeClassifier" }, code: `II = cv2.integral(gray)  # O(1) jadval
face_clf = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
faces = face_clf.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)
hog = cv2.HOGDescriptor()
print("HOG Descriptor Dim:", hog.getDescriptorSize())  # 3780` },
      { title: { uz: "Haar Kaskad Cheklovlari & Zamonaviy Muqobillar", en: "Haar Limitations & Modern Alternatives" }, table: { headers: { uz: ["Mezon", "Haar Cascade (2001)", "YOLO-Face / RetinaFace"], en: ["Criterion", "Haar Cascade", "YOLO-Face / RetinaFace"] }, rows: { uz: [["Profil / Qiyshiq yuz", "Juda zaif", "A'lo (har burchakda)"], ["To'silish (Niqob/Ko'zoynak)", "Tez sinadi", "Barqaror"], ["Resurs / GPU", "Faqat CPU, kichik RAM", "GPU da tezkor, kuchli mAP"]], en: [["Profile / Tilted", "Fails", "Robust across poses"], ["Masks / Occlusion", "Fails", "Handles occlusion cleanly"], ["Hardware", "CPU-only, tiny footprint", "GPU/NPU accelerated, SOTA accuracy"]] } } },
      { title: { uz: "Muhokama: minNeighbors Parametri Murosasi", en: "Discussion: Tuning minNeighbors Trade-off" }, discussion: { q: { uz: "detectMultiScale() da minNeighbors=1 va minNeighbors=10 qiymatlari Precision/Recall ga qanday ta'sir qiladi?", en: "How does minNeighbors=1 vs minNeighbors=10 affect Precision and Recall?" }, a: { uz: "minNeighbors=1: yuqori Recall, juda past Precision (ko'p soxta qutilar). minNeighbors=10: yuqori Precision, lekin ko'p haqiqiy kichik/qiyshiq yuzlar tashlab ketiladi.", en: "minNeighbors=1 gives high Recall but noisy false positives; minNeighbors=10 raises Precision at the cost of missed faces." } } }
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
        heading: { uz: "13.1. Xususiyat Tayyorlash: BoVW, LBP va Normalizatsiya", en: "13.1. Feature Engineering: BoVW, LBP & Normalization" },
        bodyHtml: {
          uz: "<p>Klassik ML tasniflovchilari (SVM, k-NN, Random Forest) barcha tasvirlardan <strong>qat'iy bir xil o'lchamli vektor</strong> talab qiladi. HOG/Gistogramma shunday doimiy vektor bersa, SIFT har rasmda turlicha sondagi kalit nuqtalar chiqaradi! Buni yechish uchun <strong>Bag of Visual Words (BoVW)</strong> barcha SIFT deskriptorlarini <em>k-means</em> orqali $K$ ta 'vizual so'z'ga klasterlaydi va har bir rasmdagi chastota gistogrammasini ($\\mathbb{R}^K$) tuzadi (TF-IDF vaznlash bilan yaxshilanadi).</p><p><strong>LBP (Local Binary Patterns):</strong> Markaziy pikselni 8 ta qo'shnisi bilan solishtirib 8-bit tekstura kodi yasaydi — tibbiy to'qima va material nuqsonlarida tezkor!</p>",
          en: "<p>Classical classifiers require fixed-size feature vectors. Because SIFT yields variable numbers of keypoints per image, <strong>Bag of Visual Words (BoVW)</strong> clusters all descriptors via <em>k-means</em> into $K$ visual words and represents each image as a $K$-bin normalized histogram (optionally TF-IDF weighted). <strong>LBP</strong> compares each center pixel with 8 neighbors for fast texture histograms.</p>"
        }
      },
      {
        heading: { uz: "13.2. Ma'lumotlarni Ajratish (Train/Val/Test) va Data Leakage Xavfi", en: "13.2. Train/Val/Test Splits, k-Fold CV & Data Leakage" },
        bodyHtml: {
          uz: "<p><strong>Stratifikatsiyalangan ajratish:</strong> 70–80% Train, 10–15% Validation (giperparametrlarni tanlash), 10–15% Test (faqat yakuniy xolis baholash!). Kichik datasetlarda <strong>k-Fold Cross-Validation</strong> ($k=5$ yoki $10$) o'rtacha va standart chetlanishni beradi.</p><p><strong>Data Leakage (Ma'lumot sizib chiqishi) tuzog'i:</strong> Agar <code>StandardScaler</code> yoki <code>PCA</code> ni ajratishdan <em>oldin</em> butun datasetga fit qilsangiz, yoki videodagi ketma-ket kadrlarni aralashtirib Train va Test ga qo'ysangiz, test aniqligi soxta 99% chiqib, real hayotda model sinadi!</p>",
          en: "<p>Use stratified <strong>Train / Validation / Test</strong> splits (70/15/15) or <strong>k-Fold Cross-Validation</strong> on small sets. <strong>Beware Data Leakage:</strong> never fit scalers/PCA/oversampling before splitting, and never scatter adjacent frames from the same video or patient across Train and Test!</p>"
        }
      },
      {
        heading: { uz: "13.3. Chalkashlik Matritsasi, Accuracy Tuzog'i, Precision, Recall, F1 & ROC", en: "13.3. Confusion Matrix, Accuracy Trap, Precision/Recall/F1 & ROC-AUC" },
        bodyHtml: {
          uz: "<p><strong>Accuracy tuzog'i:</strong> 98% sog'lom va 2% nuqsonli detallar bo'lsa, hamma narsani 'sog'lom' deydigan ahmoqona model 98% Accuracy oladi! Shu bois har bir sinf uchun alohida <strong>Precision</strong> (bashorat ishonchliligi), <strong>Recall</strong> (topib olish to'liqligi), garmonik o'rtacha <strong>F1-score</strong> hamda nomutanosib sinflarda ROC-AUC dan ko'ra sezgirroq bo'lgan <strong>Precision–Recall AUC</strong> qo'llaniladi.</p>",
          en: "<p>Under heavy class skew, <em>Accuracy</em> misleads. Evaluate <strong>Precision</strong> ($TP/(TP+FP)$), <strong>Recall</strong> ($TP/(TP+FN)$), their harmonic mean <strong>F1-score</strong>, and <strong>PR-AUC / ROC-AUC</strong> across confidence thresholds.</p>"
        },
        latex: "\\text{Prec}=\\frac{TP}{TP+FP},\\ \\text{Rec}=\\frac{TP}{TP+FN},\\ F_1=\\frac{2\\cdot\\text{Prec}\\cdot\\text{Rec}}{\\text{Prec}+\\text{Rec}}",
        widget: 'cm-metrics'
      },
      {
        heading: { uz: "13.4. Sonli Hisoblash Misoli (Doskada) va Scikit-Learn Kodi", en: "13.4. Worked Numerical Example & Scikit-Learn Pipeline" },
        bodyHtml: {
          uz: "<p><strong>Berilgan chalkashlik matritsasi:</strong> $TP = 40,\\ FP = 10,\\ FN = 5,\\ TN = 45$ (jami $N=100$ tasvir).<br>• $\\text{Accuracy} = (40 + 45)/100 = 85/100 = \\mathbf{0.85\\ (85\\%)}$.<br>• $\\text{Precision} = 40 / (40 + 10) = 40/50 = \\mathbf{0.80\\ (80\\%)}$.<br>• $\\text{Recall} = 40 / (40 + 5) = 40/45 \\approx \\mathbf{0.889\\ (88.9\\%)}$.<br>• $F_1 = 2 \\cdot \\frac{0.80 \\times 0.889}{0.80 + 0.889} = \\frac{1.422}{1.689} \\approx \\mathbf{0.842\\ (84.2\\%)}$.</p>",
          en: "<p><strong>Given $TP=40, FP=10, FN=5, TN=45$:</strong><br>Accuracy $= 85/100 = \\mathbf{85\\%}$; Precision $= 40/50 = \\mathbf{80\\%}$; Recall $= 40/45 = \\mathbf{88.9\\%}$; $F_1 = 2(0.80)(0.889)/(1.689) = \\mathbf{84.2\\%}$.</p>"
        },
        code: `from sklearn.metrics import classification_report, confusion_matrix
from sklearn.model_selection import StratifiedKFold
import numpy as np

# Namuna y_true va y_pred (TP=40, FP=10, FN=5, TN=45)
y_true = np.array([1]*45 + [0]*55)
y_pred = np.array([1]*40 + [0]*5 + [1]*10 + [0]*45)
print("Confusion Matrix:\\n", confusion_matrix(y_true, y_pred))
print(classification_report(y_true, y_pred, target_names=['Clean', 'Defect'], digits=3))`
      },
      {
        heading: { uz: "13.5. Keys-Muhokama: Tibbiy Tashxis vs Spam Filtr Metrikasi", en: "13.5. Discussion: Prioritizing Recall vs Precision in Real Systems" },
        bodyHtml: {
          uz: "<p>Chegaraviy ehtimollik (threshold) tanlovi vazifa narxiga bog'liq: saraton skriningida kasalni o'tkazib yuborish ($FN$) o'limga olib kelishi mumkin → <strong>Recall</strong> ustuvor; avtomatik jarima kameralarida begunoh haydovchiga jarima yozish ($FP$) jiddiy shikoyat keltiradi → <strong>Precision</strong> ustuvor!</p>",
          en: "<p>Decision threshold tuning depends on error costs: cancer screening minimizes missed positives ($FN \\to$ maximize <strong>Recall</strong>), while automated traffic fines minimize false citations ($FP \\to$ maximize <strong>Precision</strong>).</p>"
        },
        discussion: {
          q: { uz: "Agar sizga 95% Accuracy bergan modelda saraton sinfi uchun Recall=20% chiqsa, bu modelni shifoxonaga qo'yish mumkinmi?", en: "If an AI medical model achieves 95% overall Accuracy but only 20% Recall on cancer cases, is it safe to deploy?" },
          a: { uz: "Mutlaqo yo'q! Bu model bemorlarning 80% kasalligini aniqlamasdan sog'lom deb chiqarib yuborayapti (juda ko'p FN). Tibbiyotda yuqori Recall + Precision-Recall muvozanati majburiy.", en: "Never! It misses 80% of actual cancer cases (catastrophic FN rate). Clinical triage demands high Recall calibrated against Precision-Recall trade-offs." }
        }
      }
    ],
    slides: [
      { title: { uz: "13.1. Tasvirdan Doimiy Uzunlikdagi Vektor Yasash", en: "13.1. From Raw Features to Fixed-Length Vectors" }, points: { uz: ["SIFT muammosi: A rasmda 320 ta, B rasmda 890 ta nuqta → klassifikatorga sig'maydi!", "BoVW (Bag of Visual Words): Barcha SIFT larni K-means bilan K ta 'vizual so'z'ga klasterlash", "Har tasvir — K o'lchamli vizual so'zlar chastota gistogrammasi", "LBP (Local Binary Patterns): 3×3 markaz vs 8 qo'shni → 256-bin tekstura vektori"], en: ["SIFT emits variable counts per image; SVM/k-NN demand fixed dimensions", "BoVW clusters descriptors via k-means into K visual words → K-bin histogram", "LBP compares 8 neighbors to center pixel for fast 256-bin texture histograms"] } },
      { title: { uz: "Train / Val / Test Ajratish va Data Leakage Tuzog'i", en: "Train / Val / Test Splits & Data Leakage" }, points: { uz: ["Train (70–80%): model vaznlarini o'qitish", "Validation (10–15%): giperparametrlarni (C, k, lr) tanlash va early stopping", "Test (10–15%): FAQAT oxirgi himoyadan oldin 1 marta ishlatiladi!", "Data Leakage: video kadrlarini aralashtirmang va Scaler/PCA ni faqat Train da fit qiling!"], en: ["Train (70-80%), Validation (tuning), Test (strictly final unbiased check)", "Use Stratified k-Fold CV when data < 2000 samples", "Prevent Data Leakage: fit scalers/PCA on Train only, group by video/patient!"] } },
      { title: { uz: "Chalkashlik Matritsasi & Metrikalar Formulasi", en: "Confusion Matrix & Core Evaluation Metrics" }, latex: "\\text{Precision}=\\frac{TP}{TP+FP},\\quad \\text{Recall}=\\frac{TP}{TP+FN},\\quad F_1 = \\frac{2\\cdot P\\cdot R}{P+R}", points: { uz: ["TP: to'g'ri topilgan musbat | FP: yolg'on trevoga (Type I)", "FN: o'tkazib yuborilgan (Type II) | TN: to'g'ri manfiy", "Precision — topilganlarning necha foizi rost; Recall — rostlardan necha foizi topildi"], en: ["TP/TN = correct; FP = false alarm; FN = missed target", "Precision = prediction purity; Recall = sensitivity/coverage"] } },
      { title: { uz: "Interaktiv Chalkashlik Matritsasi Kalkulyatori", en: "Interactive Confusion Matrix Calculator" }, widget: 'cm-metrics' },
      { title: { uz: "Sonli Misol (Doskada): Precision, Recall va F1", en: "Worked Example: Confusion Matrix Arithmetic" }, points: { uz: ["Berilgan: TP = 40, FP = 10, FN = 5, TN = 45 (N = 100)", "Accuracy = (40 + 45) / 100 = 85.0%", "Precision = 40 / (40 + 10) = 0.800 (80.0%)", "Recall = 40 / (40 + 5) = 40/45 ≈ 0.889 (88.9%)", "F1 = 2 × (0.800 × 0.889) / (0.800 + 0.889) = 0.842 (84.2%)"], en: ["TP=40, FP=10, FN=5, TN=45 → Accuracy = 85%", "Precision = 40/50 = 0.800; Recall = 40/45 ≈ 0.889; F1 ≈ 0.842"] } },
      { title: { uz: "ROC-AUC vs Precision-Recall AUC", en: "ROC-AUC vs Precision-Recall Curves" }, table: { headers: { uz: ["Mezon", "ROC-AUC (TPR vs FPR)", "PR-AUC (Precision vs Recall)"], en: ["Aspect", "ROC-AUC", "PR-AUC"] }, rows: { uz: [["Nomutanosiblik (1:99)", "Haddan tashqari optimistik ko'rinadi", "Juda sezgir va haqqoniy!"], ["Asosiy fokus", "Barcha thresholdlarda umumiy ajratish", "Kam uchraydigan musbat sinf sifati"], ["Tasodifiy bazaviy daraja", "Doim 0.50", "Musbat sinf ulushiga teng (masalan 0.02)"]], en: [["Heavy Imbalance (1:99)", "Looks overly optimistic", "Honest & sensitive to FPs"], ["Focus", "Overall ranking across thresholds", "Minority positive class quality"], ["Random Baseline", "Always 0.50", "Equals positive prevalence"]] } } },
      { title: { uz: "Python Kod: StratifiedKFold va Classification Report", en: "Python Walkthrough: Stratified Splits & Metrics" }, code: `from sklearn.metrics import classification_report, confusion_matrix
from sklearn.model_selection import train_test_split
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y)
# StandardScaler faqat X_tr da fit qilinadi!
print(confusion_matrix(y_true, y_pred))
print(classification_report(y_true, y_pred, digits=3))` },
      { title: { uz: "Muhokama: Shifoxona vs Avto-Radar Chegarasi", en: "Discussion: Recall Priority vs Precision Priority" }, discussion: { q: { uz: "Qaysi amaliy tizimda Recall ni maksimal qilish shart va qaysisida Precision ni?", en: "In which real-world CV systems should Recall dominate over Precision, and vice-versa?" }, a: { uz: "Tibbiy saraton/sil skriningi va temir yo'l to'siqlarini aniqlashda Recall (FN juda xavfli). Avtomatik yo'l qoidabuzarlik jarimasi va spam filtrda Precision (FP muammoli).", en: "Cancer screening & obstacle detection prioritize Recall (FN is dangerous); automated traffic tickets prioritize Precision (FP hurts innocent people)." } } }
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
        heading: { uz: "14.1. k-NN (Lazy Learning), Masofalar va O'lchamlilik La'nati", en: "14.1. k-NN (Lazy Learning), Distances & Curse of Dimensionality" },
        bodyHtml: {
          uz: "<p><strong>k-Nearest Neighbors (k-NN):</strong> O'qitish bosqichida hech qanday parametr optimallashtirmaydi (<em>non-parametric, lazy learning</em>) — barcha hisoblash test nuqtasi kelganda eng yaqin $k$ ta qo'shnini topishda bajariladi ($O(N \\cdot d)$). Kichik $k$ ($k=1$) bitta shovqin nuqta atrofiga orolcha chizib <strong>overfitting</strong> beradi; juda katta $k$ sinf chegaralarini silliqlab <strong>underfitting</strong> qiladi.</p><p><strong>Muhim talablar:</strong> (1) Xususiyatlarni <code>StandardScaler</code> bilan normallashtirish shart; (2) $d &gt; 100$ bo'lganda barcha nuqtalar orasidagi masofa tenglashib ketadi (<strong>Curse of Dimensionality</strong>) → avval PCA qo'llash foydali.</p>",
          en: "<p><strong>k-NN</strong> is a non-parametric <em>lazy learner</em> storing training samples and voting across the $k$ closest neighbors at inference ($O(Nd)$). Small $k=1$ overfits noise; oversized $k$ underfits boundaries.</p><p>Always standardize features first, and mitigate the high-dimensional <strong>Curse of Dimensionality</strong> via PCA or learned embeddings.</p>"
        },
        latex: "d_{L_2}(x, y) = \\sqrt{\\sum_{i=1}^D (x_i - y_i)^2}, \\quad d_{\\cos}(x, y) = 1 - \\frac{x \\cdot y}{\\|x\\|\\|y\\|}"
      },
      {
        heading: { uz: "14.2. SVM (Maksimal Marja, Yumshoq Marja C) & Kernel Trick", en: "14.2. Support Vector Machines (Max Margin, Soft C) & Kernel Trick" },
        bodyHtml: {
          uz: "<p><strong>SVM (Vapnik &amp; Cortes):</strong> Ikkita sinf orasidan maksimal kenglikdagi ($\\frac{2}{\\|w\\|}$) ajratuvchi gipertekislik $w^\\top x + b = 0$ topadi. Faqat chegaraga eng yaqin nuqtalar — <strong>Tayanch Vektorlar (Support Vectors)</strong> tekislik o'rnini belgilaydi. Qavariq (convex) optimallashtirish bo'lgani uchun global minimum kafolatlanadi!</p><p><strong>Yumshoq marja ($C$) va Kernel Trick:</strong> Katta $C$ xatolarni qattiq jazolaydi (tor marja, overfitting xavfi); kichik $C$ kengroq marjaga ruxsat beradi. Chiziqli ajralmaydigan nuqtalar uchun <strong>Kernel Trick</strong> aniq $\\phi(x)$ fazosiga o'tmasdan skalyar ko'paytmani $K(x,y)$ orqali hisoblaydi (eng mashhuri — <strong>RBF</strong>, $\\gamma$ bilan boshqariladi).</p>",
          en: "<p><strong>SVM</strong> maximizes the geometric margin $\\frac{2}{\\|w\\|}$ between classes; only boundary <strong>Support Vectors</strong> define the hyperplane (convex optimization = unique global optimum). Soft-margin <strong>$C$</strong> balances margin width vs training errors.</p><p>The <strong>Kernel Trick</strong> computes high-dimensional inner products directly via $K(x,y)$ — notably the <strong>RBF kernel</strong> parameterized by $\\gamma$.</p>"
        },
        latex: "\\min_{w,b}\\ \\frac{1}{2}\\|w\\|^2 + C\\sum_i \\xi_i, \\quad K_{\\text{RBF}}(x, y) = \\exp\\!\\left(-\\gamma \\|x - y\\|^2\\right)",
        widget: 'knn-svm'
      },
      {
        heading: { uz: "14.3. Sonli Misol (Doskada): k-NN (k=3) & SVM Marja Kengligi", en: "14.3. Worked Numerical Example: k-NN (k=3) & SVM Margin" },
        bodyHtml: {
          uz: "<p><strong>Masala 1 (k-NN, $k=3$):</strong> O'qitish nuqtalari: $A(1,2), B(2,3), E(2,1) \\in \\text{Sinf 1}$; $C(6,7), D(7,8) \\in \\text{Sinf 2}$. Yangi nuqta $Q(2, 2)$ ni tasniflang.<br>• $d(Q,A) = \\sqrt{(2-1)^2+(2-2)^2} = \\mathbf{1.0}$ (Sinf 1)<br>• $d(Q,B) = \\sqrt{0^2+1^2} = \\mathbf{1.0}$ (Sinf 1)<br>• $d(Q,E) = \\sqrt{0^2+1^2} = \\mathbf{1.0}$ (Sinf 1)<br>• $d(Q,C) = \\sqrt{16+25} \\approx \\mathbf{6.4}$ (Sinf 2)<br>Eng yaqin 3 ta qo'shni ($A, B, E$) hammasi 1-sinfdan $\\implies$ $Q$ <strong>Sinf 1</strong>!</p><p><strong>Masala 2 (SVM marja):</strong> Agar $w = [3, 4]^\\top$ bo'lsa, $\\|w\\| = \\sqrt{3^2+4^2} = 5$, demak ajratuvchi yo'lak kengligi $= \\frac{2}{\\|w\\|} = \\frac{2}{5} = \\mathbf{0.40}$.</p>",
          en: "<p><strong>k-NN ($k=3$):</strong> Train Class 1: $A(1,2), B(2,3), E(2,1)$; Class 2: $C(6,7), D(7,8)$. Query $Q(2,2)$ gives distances $1.0$ to $A, B, E$ (all Class 1) vs $6.4$ to $C \\implies$ predicts <strong>Class 1</strong>.<br><strong>SVM Margin:</strong> With $w=[3,4]^\\top$, $\\|w\\|=5 \\implies \\text{margin} = 2/5 = \\mathbf{0.40}$.</p>"
        },
        code: `from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
import numpy as np

X = np.array([[1,2],[2,3],[2,1],[6,7],[7,8]], dtype=float)
y = np.array([0, 0, 0, 1, 1])

knn = make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=3)).fit(X, y)
svm = make_pipeline(StandardScaler(), SVC(kernel='rbf', C=1.0, gamma='scale')).fit(X, y)
print("k-NN Q(2,2):", knn.predict([[2,2]])[0], "| SVM Q(2,2):", svm.predict([[2,2]])[0])`
      },
      {
        heading: { uz: "14.4. Ko'p Sinfli Strategiyalar (OvR vs OvO) & Random Forest", en: "14.4. Multi-Class Strategies (OvR / OvO) & Decision Ensembles" },
        bodyHtml: {
          uz: "<p>Asl SVM faqat ikkilik (binary) model. $K$ ta sinf uchun: <strong>One-vs-Rest (OvR)</strong> ($K$ ta SVM quradi) yoki <strong>One-vs-One (OvO)</strong> ($K(K-1)/2$ ta SVM — <code>sklearn.SVC</code> standarti). Bundan tashqari, HOG/LBP ustida <strong>Random Forest / XGBoost</strong> ham klassik CV da kuchli raqib bo'lgan.</p>",
          en: "<p>Extend binary SVM to $K$ classes via <strong>One-vs-Rest ($K$ classifiers)</strong> or <strong>One-vs-One ($K(K-1)/2$ pairwise classifiers)</strong>. Tabular CV features also pair well with Random Forests.</p>"
        },
        discussion: {
          q: { uz: "ImageNet kabi 1,000,000 rasm va 1,000 sinfda nega RBF-SVM dan ko'ra Softmax neyron tarmoq tezroq va afzal?", en: "Why do neural networks with Softmax beat RBF-SVM on 1M-image datasets like ImageNet?" },
          a: { uz: "RBF-SVM o'qitish vaqti O(N²..N³) ga ko'payadi va xotirada N×N yadro matritsasi (10^12 element!) sig'maydi; mini-batch SGD bilan Softmax esa O(N) chiziqli vaqtda ishlaydi hamda xususiyatlarni birga o'rganadi.", en: "Kernel SVM scales quadratically/cubically O(N²..N³) in samples and cannot store a 1M×1M Gram matrix, whereas mini-batch SGD scales linearly O(N) per epoch while learning features jointly." }
        }
      }
    ],
    slides: [
      { title: { uz: "14.1. k-NN: Dangasa O'qitish (Lazy Learning)", en: "14.1. k-Nearest Neighbors (Lazy Learning)" }, points: { uz: ["O'qitish bosqichi = O(1) (faqat ma'lumotni eslab qolish)", "Bashorat bosqichi = O(N·d) (barcha train nuqtalarga masofa hisoblash!)", "k = 1: shovqinga sezgir (Overfitting) | k katta: haddan tashqari silliq (Underfitting)", "Majburiy qoidalar: StandardScaler + yuqori o'lchamda PCA (Curse of Dimensionality)"], en: ["Zero training phase; O(N·d) distance scan at inference time", "k=1 overfits noise; large k underfits boundaries", "Must normalize features & guard against high-dim curse of dimensionality"] } },
      { title: { uz: "SVM: Maksimal Marja va Tayanch Vektorlar", en: "SVM: Maximum-Margin Hyperplane & Support Vectors" }, latex: "\\min_{w,b} \\frac{1}{2}\\|w\\|^2 + C\\sum_i \\xi_i \\quad \\text{s.t. } y_i(w^\\top x_i + b) \\ge 1 - \\xi_i", points: { uz: ["Marja kengligi = 2 / ‖w‖ — qancha keng bo'lsa, umumlashtirish shuncha yaxshi", "Qavariq (Convex) masala → lokal minimum yo'q!", "Faqat chegara bo'yidagi Tayanch Vektorlar yechimni belgilaydi", "C parametri: katta C → tor marja (overfit xavfi); kichik C → keng marja"], en: ["Margin = 2/‖w‖; convex optimization guarantees global optimum", "Only Support Vectors determine the hyperplane", "Soft-margin C trades margin width for training accuracy"] } },
      { title: { uz: "Kernel Trick: Chiziqli Ajralmaydigan Ma'lumotlar", en: "The Kernel Trick: Non-Linear Boundaries" }, latex: "K_{\\text{RBF}}(x, y) = \\exp\\!\\left(-\\gamma\\|x - y\\|^2\\right)", points: { uz: ["2D da aylana shaklidagi sinflar to'g'ri chiziq bilan ajralmaydi", "φ(x) yuqori fazoga o'tkazish o'rniga K(x, y) = φ(x)·φ(y) to'g'ridan-to'g'ri hisoblanadi", "RBF (Gauss) yadrosi: γ katta → tor 'orollar' (overfit); γ kichik → silliq chegara"], en: ["Maps non-linear data implicitly without computing explicit φ(x) coordinates", "RBF kernel γ controls neighborhood radius (large γ → tight islands/overfit)"] } },
      { title: { uz: "Interaktiv k-NN vs SVM Yordamchi Paneli", en: "Interactive k-NN vs SVM Explorer" }, widget: 'knn-svm' },
      { title: { uz: "Sonli Misol (Doskada): k-NN (k=3) & SVM Marja", en: "Worked Example: k-NN Query & Margin Width" }, points: { uz: ["Sinf 1: A(1,2), B(2,3), E(2,1) | Sinf 2: C(6,7), D(7,8)", "Yangi nuqta Q(2, 2): d(Q,A)=1, d(Q,B)=1, d(Q,E)=1 vs d(Q,C)=6.4", "Eng yaqin 3 ta qo'shni (A, B, E) → Sinf 1!", "SVM: agar w=[3, 4]ᵀ bo'lsa, ‖w‖ = 5 → marja = 2 / 5 = 0.40"], en: ["Class 1: A(1,2), B(2,3), E(2,1); Class 2: C(6,7), D(7,8)", "Query Q(2,2): 3 nearest neighbors (A, B, E at d=1) → Class 1!", "SVM w=[3,4] → margin = 2/‖w‖ = 2/5 = 0.40"] } },
      { title: { uz: "k-NN vs SVM vs Random Forest Taqqoslanmasi", en: "k-NN vs SVM vs Random Forest Comparison" }, table: { headers: { uz: ["Mezon", "k-NN", "Linear / RBF SVM", "Random Forest"], en: ["Criterion", "k-NN", "SVM (RBF)", "Random Forest"] }, rows: { uz: [["O'qitish vaqti", "O(1) (yo'q)", "O(N²..N³)", "O(N log N · trees)"], ["Bashorat tezligi", "Sekin O(N·d)", "Tez (tayanch vektorlar soni)", "Juda tez"], ["Normallash talabi", "Majburiy!", "Majburiy!", "Shart emas (daraxt)"]], en: [["Training", "None", "O(N²..N³)", "Fast O(N log N)"], ["Inference", "Slow O(Nd)", "Fast (depends on #SV)", "Very fast"], ["Feature Scaling", "Mandatory", "Mandatory", "Scale invariant"]] } } },
      { title: { uz: "Python Kod: StandardScaler Pipeline + k-NN & SVC", en: "Python Walkthrough: Scaling Pipeline for k-NN & SVM" }, code: `from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
model = make_pipeline(StandardScaler(), SVC(kernel='rbf', C=10, gamma='scale'))
model.fit(X_train, y_train)` },
      { title: { uz: "Muhokama: 1 Million Rasmda RBF-SVM vs Deep CNN", en: "Discussion: Scaling Beyond Classical ML" }, discussion: { q: { uz: "ImageNet (1.2M rasm, 1000 sinf) da RBF-SVM nega o'qitib bo'lmaydi?", en: "Why is kernel RBF-SVM impractical on 1.2M-image ImageNet?" }, a: { uz: "Yadro matritsasi 1.2M × 1.2M element = terabaytlab RAM va O(N³) vaqt talab qiladi; mini-batch SGD li neyron tarmoq esa O(N) vaqtda GPU da o'qitiladi.", en: "A 1.2M×1.2M Gram matrix explodes memory/time O(N²..N³), while mini-batch CNNs scale linearly O(N) on GPUs." } } }
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
        heading: { uz: "15.1. Neyron Tarmoq, Aktivatsiyalar va MLP Cheklovi Tasvirda", en: "15.1. Artificial Neurons, Activations & Why MLPs Fail on Images" },
        bodyHtml: {
          uz: "<p>Sun'iy neyron kirishlarning vaznli yig'indisini hisoblab ($z = w^\\top x + b$), nochiziqli aktivatsiyadan o'tkazadi ($a = \\sigma(z)$ yoki $\\text{ReLU}(z) = \\max(0, z)$). <strong>Universal yaqinlashish teoremasi</strong> bitta yashirin qatlamli tarmoq yetarli neyron bilan har qanday uzluksiz funksiyani yaqinlashtira olishini isbotlaydi, lekin amalda chuqur qatlamlar iyerarxik belgilarni kamroq parametrda o'rganadi.</p><p><strong>Nega oddiy MLP 224×224×3 tasvirga yaramaydi?</strong> Tasvirni tekislash ($150,528$ element) 2D qo'shnilikni buzadi va bitta $4096$-neyronli qatlamning o'zida $150,528 \\times 4096 \\approx \\mathbf{616\\text{ million}}$ parametr hosil bo'ladi!</p>",
          en: "<p>A neuron computes $a = \\phi(w^\\top x + b)$ using nonlinear activations like Sigmoid or ReLU (stacked linear layers without nonlinearity collapse to a single linear matrix!).</p><p><strong>Why plain MLPs fail on raw images:</strong> flattening a 224×224×3 photo destroys 2D spatial proximity and consumes $150,528 \\times 4096 \\approx \\mathbf{616\\text{M weights}}$ in layer 1 alone!</p>"
        },
        latex: "y = \\phi\\!\\left(\\sum_{i=1}^n w_i x_i + b\\right), \\quad \\text{ReLU}(z)=\\max(0, z)"
      },
      {
        heading: { uz: "15.2. Backpropagation (Zanjir Qoidasi) & SGD / Adam", en: "15.2. Backpropagation (Chain Rule) & Mini-Batch Optimization" },
        bodyHtml: {
          uz: "<p>O'qitish 4 bosqichli tsikl: (1) <strong>Forward pass</strong> — bashorat va Loss $L$ hisoblash; (2) <strong>Backward pass (Backpropagation)</strong> — zanjir qoidasi bilan $\\frac{\\partial L}{\\partial w_i} = \\frac{\\partial L}{\\partial a}\\frac{\\partial a}{\\partial z}\\frac{\\partial z}{\\partial w_i}$; (3) <strong>Optimizer step</strong> — SGD + Momentum yoki adaptiv <strong>Adam</strong>; (4) <code>optimizer.zero_grad()</code>!</p><p>Boshlang'ich vaznlarni nolga tenglash simmetriya tufayli o'qitishni to'xtatib qo'yadi → ReLU uchun <strong>He initialization</strong> ($\\mathcal{N}(0, 2/n_{\\text{in}})$) qo'llaniladi.</p>",
          en: "<p>Training cycles 4 steps: Forward loss $L$ → Backward chain-rule gradients → Optimizer step (SGD+Momentum / Adam) → <code>zero_grad()</code>. Never zero-init weights (breaks symmetry!); use <strong>He initialization</strong> for ReLU layers.</p>"
        },
        latex: "w_{\\text{new}} = w_{\\text{old}} - \\eta\\,\\frac{\\partial L}{\\partial w}"
      },
      {
        heading: { uz: "15.3. Sonli Misol (Doskada): Forward Pass & 1-Qadam Backprop", en: "15.3. Worked Numerical Example: Forward Pass & Gradient Update" },
        bodyHtml: {
          uz: "<p><strong>Berilgan:</strong> Kirishlar $x_1 = 1.0,\\ x_2 = 2.0$, vaznlar $w_1 = 0.5,\\ w_2 = -0.3$, siljish $b = 0.1$, haqiqiy nishon $y = 1.0$, $\\eta = 0.5$.<br>1. <strong>Forward:</strong> $z = 0.5(1) + (-0.3)(2) + 0.1 = \\mathbf{0.0}$. Sigmoid: $\\hat{y} = \\sigma(0) = \\frac{1}{1+e^0} = \\mathbf{0.50}$.<br>2. <strong>Kvadratik xato (MSE $\\frac{1}{2}(\\hat{y}-y)^2$):</strong> $L = 0.5(0.5 - 1)^2 = \\mathbf{0.125}$.<br>3. <strong>Gradient ($\sigma'(0) = 0.5(1-0.5) = 0.25$):</strong> $\\frac{\\partial L}{\\partial z} = (\\hat{y}-y)\\sigma'(z) = (-0.5)(0.25) = \\mathbf{-0.125}$.<br>4. <strong>Vazn yangilanishi:</strong> $\\frac{\\partial L}{\\partial w_1} = (-0.125)(1.0) = -0.125 \\implies w_1^{\\text{new}} = 0.5 - 0.5(-0.125) = \\mathbf{0.5625}$ (bashorat 1 ga yaqinlashdi!).</p>",
          en: "<p><strong>Given:</strong> $x=(1, 2), w=(0.5, -0.3), b=0.1, y=1, \\eta=0.5$.<br>1. Forward: $z = 0.0 \\implies \\hat{y}=\\sigma(0)=\\mathbf{0.50}$, Loss $L=\\frac{1}{2}(0.5-1)^2=\\mathbf{0.125}$.<br>2. Backward: $\\partial L/\\partial z = (-0.5)(0.25) = -0.125$; $\\partial L/\\partial w_1 = -0.125$.<br>3. Update: $w_1^{\\text{new}} = 0.5 - 0.5(-0.125) = \\mathbf{0.5625}$!</p>"
        },
        latex: "z=0 \\implies \\hat{y}=0.5,\\quad \\frac{\\partial L}{\\partial w_1} = -0.125 \\implies w_1^{\\text{new}} = 0.5625"
      },
      {
        heading: { uz: "15.4. Dataset Engineering, Annotatsiya Formatlari va Augmentation", en: "15.4. Dataset Engineering, Annotation Formats & Augmentation" },
        bodyHtml: {
          uz: "<p>Chuqur o'qitishda sifatli annotatsiya hal qiluvchi: <strong>COCO JSON</strong> (poligon/bbox), <strong>YOLO TXT</strong> (<code>class cx cy w h</code> normallangan 0..1), <strong>Pascal VOC XML</strong>. O'qitishda har epoxada <code>shuffle=True</code> qilinadi (aks holda sinf tartibi gradientni buzadi!). Kam sonli datasetlarda <strong>Data Augmentation</strong> (Albumentations/TorchVision: flip, crop, ColorJitter) overfittingni keskin kamaytiradi.</p>",
          en: "<p>Standard CV annotation formats: <strong>COCO JSON</strong>, <strong>YOLO TXT</strong> (normalized <code>class cx cy w h</code>), and <strong>VOC XML</strong>. Always enable <code>shuffle=True</code> on training DataLoaders and use <strong>Data Augmentation</strong> to prevent overfitting.</p>"
        },
        code: `import torch, torchvision.transforms as T

# PyTorch standard ImageNet preprocessing + Data Augmentation quvuri
train_tf = T.Compose([
    T.RandomResizedCrop(224),
    T.RandomHorizontalFlip(p=0.5),
    T.ColorJitter(brightness=0.2, contrast=0.2),
    T.ToTensor(),  # [0..255] HWC -> [0.0..1.0] CHW
    T.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])
x = torch.randn(4, 3, 224, 224)  # Mini-batch (B, C, H, W)
print("Batch shape (B,C,H,W):", tuple(x.shape))`
      },
      {
        heading: { uz: "15.5. Muhokama: Annotatsiya Sifati va Augmentatsiya Xatosi", en: "15.5. Discussion: Dangerous Augmentations & Label Noise" },
        bodyHtml: {
          uz: "<p><strong>Ehtiyot bo'ling:</strong> Raqamlarni tanishda (MNIST: 6 vs 9) vertikal/180° aylantirish (<code>VerticalFlip</code>) 6 ni 9 ga aylantirib yuboradi! Avtonom haydashda gorizontal ag'darish 'chapga burilish' belgisini 'o'ngga burilish' ga o'zgartirishi mumkin!</p>",
          en: "<p><strong>Label-Preserving Rule:</strong> Never apply vertical flips to digits (turning 6 into 9), nor horizontal flips to directional road signs (turning 'Left Only' into 'Right Only') without updating the label!</p>"
        },
        discussion: {
          q: { uz: "Yo'l belgilarini (chapga burilish, o'ngga burilish, STOP) tanish datasetida RandomHorizontalFlip qo'llash nima uchun xato?", en: "Why is RandomHorizontalFlip dangerous when training a road-sign classifier?" },
          a: { uz: "'Chapga burilish' belgisini gorizontal aks ettirsak, tasvir 'O'ngga burilish' bo'lib qoladi, lekin yorliq 'Chapga' ligicha qoladi (label corruption)! Shuning uchun augmentatsiyalar semantik ma'noni saqlashi shart.", en: "Flipping a 'Turn Left' arrow makes it visually identical to 'Turn Right' while keeping the old label, poisoning supervision." }
        }
      }
    ],
    slides: [
      { title: { uz: "15.1. Klassik CV dan Chuqur O'qitishga (End-to-End)", en: "15.1. From Hand-Crafted Features to End-to-End Learning" }, points: { uz: ["Klassik CV: SIFT/HOG qo'lda yasaladi → alohida SVM o'qitiladi", "Deep Learning: Preprocessing + Xususiyat + Klassifikator birga o'qitiladi", "Sun'iy neyron: y = φ(Σ w_i x_i + b)", "Chiziqli bo'lmagan aktivatsiya (ReLU) bo'lmasa 100 qatlam ham 1 qatlamga teng!"], en: ["Classical: manual SIFT/HOG → separate SVM", "Deep Learning: jointly learns hierarchy + classifier end-to-end", "Without nonlinear ReLU/GELU, deep stacks collapse to a single linear matrix"] } },
      { title: { uz: "Nima Uchun Oddiy FC (MLP) Tasvirlar Uchun Yaramaydi?", en: "Why Plain Fully-Connected MLPs Fail on Images" }, points: { uz: ["224×224×3 tasvirni tekislash → 150,528 kirish (2D qo'shnilik yo'qoladi!)", "1-qatlamda 4096 neyron → 150,528 × 4,096 = 616.5 MILLION parametr!", "Overfitting muammosi va shift/tarjima invariantligi yo'q", "Yechim: Keyingi dars M16 — Konvolyutsion Neyron Tarmoqlar (CNN)!"], en: ["Flattening 224×224×3 breaks 2D local geometry", "Just 1 hidden layer of 4096 neurons requires 616.5 MILLION weights!", "Severe overfitting & zero translation invariance → leads to CNNs (M16)!"] } },
      { title: { uz: "Backpropagation (Zanjir Qoidasi) & Optimizatorlar", en: "Backpropagation (Chain Rule) & Optimizers" }, latex: "w_{\\text{new}} = w_{\\text{old}} - \\eta\\,\\frac{\\partial L}{\\partial w}, \\quad \\frac{\\partial L}{\\partial w} = \\frac{\\partial L}{\\partial a}\\frac{\\partial a}{\\partial z}\\frac{\\partial z}{\\partial w}", points: { uz: ["Forward pass: bashorat va Yo'qotish (Loss) hisoblash", "Backward pass: zanjir qoidasi bilan barcha gradientlar", "Initsializatsiya: Nolga tenglamang! ReLU uchun He Init; Sigmoid uchun Xavier", "Mini-batch SGD + Momentum vs Adam adaptiv optimizatori"], en: ["Forward → Loss → Chain-rule Backward → Step", "Never zero-init weights; use He Init for ReLU", "Mini-batch SGD+Momentum vs adaptive Adam"] } },
      { title: { uz: "Sonli Misol (Doskada): 1-Neyron Forward & Backprop", en: "Worked Example: Single Neuron Forward & Backprop" }, points: { uz: ["x=(1, 2), w=(0.5, -0.3), b=0.1, haqiqiy y=1, η=0.5", "1. Forward: z = 0.5(1) - 0.3(2) + 0.1 = 0.0 → ŷ = σ(0) = 0.50", "2. MSE Loss: L = 0.5(0.5 - 1)² = 0.125", "3. Gradient: ∂L/∂z = (0.5 - 1) × 0.25 = -0.125; ∂L/∂w1 = -0.125", "4. Yangilash: w1_new = 0.5 - 0.5(-0.125) = 0.5625 (ŷ endi 1 ga yaqinlashadi!)"], en: ["z=0 → ŷ=σ(0)=0.50, Loss=0.125", "∂L/∂z = (-0.5)(0.25) = -0.125 → w1_new = 0.5 - 0.5(-0.125) = 0.5625"] } },
      { title: { uz: "Dataset Muhandisligi: Annotatsiya & Shuffling", en: "Dataset Engineering: Annotation Formats & Shuffling" }, table: { headers: { uz: ["Format", "Tuzilishi", "Asosiy sohasi"], en: ["Format", "Structure", "Used By"] }, rows: { uz: [["COCO JSON", "Yagona JSON, bbox [x,y,w,h] + poligonlar", "Faster R-CNN, Mask R-CNN, DETR"], ["YOLO TXT", "Har rasmga .txt: cls cx cy w h ∈ [0,1]", "Ultralytics YOLOv5/v8/v11"], ["Pascal VOC XML", "Har rasmga .xml: xmin, ymin, xmax, ymax", "Klassik detektorlar"]], en: [["COCO JSON", "Single JSON with bbox [x,y,w,h] & polygons", "Detectron2, MMDetection, DETR"], ["YOLO TXT", "Normalized cls cx cy w h per image", "Ultralytics YOLO"], ["Pascal VOC XML", "Absolute xmin, ymin, xmax, ymax XML", "Classic benchmarks"]] } } },
      { title: { uz: "Data Augmentation va PyTorch Pipeline Kodi", en: "Data Augmentation & PyTorch Transform Pipeline" }, code: `train_tf = T.Compose([
    T.RandomResizedCrop(224),
    T.RandomHorizontalFlip(p=0.5),
    T.ColorJitter(brightness=0.2, contrast=0.2),
    T.ToTensor(),  # HWC uint8 -> CHW float [0,1]
    T.Normalize([0.485,0.456,0.406], [0.229,0.224,0.225])
])` },
      { title: { uz: "Muhokama: Semantikani Buzuvchi Augmentatsiya", en: "Discussion: When Does Augmentation Corrupt Labels?" }, discussion: { q: { uz: "Yo'l belgilari ('Chapga burilish') va raqamlar ('6 vs 9') datasetida qaysi augmentatsiyalarni taqiqlash kerak?", en: "Which geometric augmentations must be forbidden for 'Turn Left' road signs and digit '6 vs 9' datasets?" }, a: { uz: "Yo'l belgilarida HorizontalFlip ('Chapga'ni 'O'ngga' qiladi!), 6 vs 9 da esa 180° aylanish va VerticalFlip taqiqlanadi!", en: "Forbid HorizontalFlip on directional signs and 180° rotation / VerticalFlip on 6 vs 9 digits because they invert the ground-truth label!" } } }
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
