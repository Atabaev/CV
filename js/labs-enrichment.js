// 80-Minute Lab Enrichment for A1–A22: Theory Recap, Common Pitfalls, 3-Step Guided Scaffolding & Oral Defense Q&A
(function () {
  const ENRICH = {
    1: {
      theoryRecap: {
        uz: "<p>OpenCV tasvirni <code>NumPy ndarray</code> ko'rinishida <code>(H, W, C)</code> shaklda yuklaydi — rangli kanallar standart RGB emas, balki <strong>BGR (Blue-Green-Red)</strong> tartibida saqlanadi. Pikselga murojaat <code>img[y, x]</code> (birinchi satr <code>y</code>, ikkinchi ustun <code>x</code>) ko'rinishida bajariladi.</p><p><strong>Asosiy maqsad:</strong> Muhitni sozlash (Colab/Jupyter), sintetik va real tasvirlarni o'qish, kanallarni tekshirish hamda matritsa kesimlari (<em>slicing</em>) ustida for-tsiklidan 100× tezroq vektorlashtirilgan amallar bajarish.</p>",
        en: "<p>OpenCV loads images as <code>NumPy ndarray</code> tensors shaped <code>(H, W, C)</code> in <strong>BGR</strong> channel order. Pixel indexing uses <code>img[y, x]</code> (row/height first, column/width second).</p><p>Vectorized NumPy slicing runs 100× faster than pure Python loops for modifying regions.</p>"
      },
      pitfalls: {
        uz: [
          "cv2.imread('noto_gri_yol.jpg') xato tashlamaydi — None qaytaradi! Doim if img is None tekshiruvini yozing.",
          "Matplotlib bilan chizganda ranglar teskari chiqmasligi uchun cv2.cvtColor(img, cv2.COLOR_BGR2RGB) qo'llang.",
          "Google Colab da cv2.imshow() bloklanadi — uning o'rniga plt.imshow() yoki cv2_imshow() ishlating."
        ],
        en: [
          "cv2.imread() silently returns None if the file path is missing — always assert img is not None.",
          "Convert BGR → RGB before calling matplotlib.pyplot.imshow(), otherwise reds and blues swap.",
          "Use matplotlib instead of cv2.imshow() in headless Google Colab / Jupyter environments."
        ]
      },
      guidedSteps: [
        {
          title: { uz: "1-qadam: Muhitni tekshirish va test tasvir yaratish (10 min)", en: "Step 1: Verify OpenCV & Generate Test Canvas (10 min)" },
          desc: { uz: "cv2 va numpy versiyalarini chiqaring, fayl bo'lmasa ham ishlaydigan 300×400 gradient+shakl tasvirini yarating.", en: "Check library versions and generate a deterministic 300×400 synthetic canvas." },
          code: `import cv2, numpy as np\nprint("OpenCV:", cv2.__version__, "| NumPy:", np.__version__)\nimg = np.zeros((300, 400, 3), dtype=np.uint8)\ncv2.rectangle(img, (40, 40), (180, 160), (0, 200, 255), -1)\ncv2.circle(img, (290, 150), 55, (0, 0, 255), -1)\ncv2.imwrite("a1_demo.png", img)\nprint("Shape (H,W,C):", img.shape, "| dtype:", img.dtype)`,
          expected: { uz: "Shape (H,W,C): (300, 400, 3) | dtype: uint8", en: "Shape (H,W,C): (300, 400, 3) | dtype: uint8" }
        },
        {
          title: { uz: "2-qadam: Vektorli kesim (Slicing) va BGR→Grayscale (10 min)", en: "Step 2: Region Slicing & Grayscale Conversion (10 min)" },
          desc: { uz: "Tasvir markazidagi pikselning [B, G, R] qiymatini o'qing, ROI mintaqani nusxalang va kulrangga o'tkazing.", en: "Inspect center [B, G, R] values, slice an ROI patch, and convert to grayscale." },
          code: `H, W, C = img.shape\nprint("Center BGR:", img[H // 2, W // 2])\nroi = img[40:160, 40:180].copy()\ngray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)\nassert gray.shape == (H, W)\nprint("Mean per BGR channel:", np.round(img.mean(axis=(0, 1)), 2))`,
          expected: { uz: "gray.shape == (300, 400), BGR o'rtacha qiymatlari chiqadi.", en: "Prints center BGR vector and 3 channel averages." }
        },
        {
          title: { uz: "3-qadam: Yonma-yon vizualizatsiya & Format hajmi (10 min)", en: "Step 3: Side-by-Side Visualization & Memory Check (10 min)" },
          desc: { uz: "Grayscale tasvirni 3 kanalga keltirib asl tasvir bilan np.hstack() orqali bitta oynaga jamlang.", en: "Concatenate RGB and grayscale panels cleanly with np.hstack()." },
          code: `gray_3ch = cv2.cvtColor(gray, cv2.COLOR_GRAY2BGR)\ncombo = np.hstack([img, gray_3ch])\ncv2.imwrite("a1_side_by_side.png", combo)\nprint("Combined size (W=800):", combo.shape, "| Raw bytes:", img.nbytes)`,
          expected: { uz: "a1_side_by_side.png (300, 800, 3) yaratiladi.", en: "Saves a1_side_by_side.png with shape (300, 800, 3)." }
        }
      ],
      vivaQuestions: [
        { q: { uz: "OpenCV da (300, 400, 3) shakldagi tasvirning 100-qator, 250-ustun pikseliga qanday murojaat qilinadi?", en: "How do you index row 100, column 250 on a (300, 400, 3) OpenCV array?" }, a: { uz: "img[100, 250] — birinchi indeks y (satr), ikkinchisi x (ustun). U [B, G, R] uchlik vektorini beradi.", en: "img[100, 250] (row y first, col x second), returning [B, G, R]." } },
        { q: { uz: "Nima uchun img[y, x] = img[y, x] + 100 amali uint8 da xato berishi mumkin?", en: "Why can img[y, x] + 100 corrupt bright pixels in uint8 arrays?" }, a: { uz: "uint8 255 dan oshsa modulo 256 bo'lib 0 ga o'ralib ketadi (masalan 200+100=44). cv2.add() ishlatish shart.", en: "uint8 arithmetic wraps modulo 256 (e.g., 200+100=44); use cv2.add()." } },
        { q: { uz: "Grayscale tasvirni rangli tasvir bilan np.hstack qilishdan oldin nega GRAY2BGR chaqiriladi?", en: "Why convert grayscale with GRAY2BGR before calling np.hstack with a color image?" }, a: { uz: "Rangli tasvir (H, W, 3), kulrang esa (H, W) o'lchamda — o'lchamlar (ndim) mos kelmasa NumPy ValueError beradi.", en: "Color arrays are 3D (H,W,3) while grayscale is 2D (H,W); np.hstack requires matching dimensions." } }
      ]
    },
    2: {
      theoryRecap: {
        uz: "<p>Raqamli tasvirning fazoviy o'lchami <code>H×W</code> va bit chuqurligi <code>b</code> (2^b daraja) fayl hajmini va gradient silliqligini belgilaydi. BMP siqishsiz, PNG yo'qotishsiz (DEFLATE + Alpha), JPEG esa 8×8 DCT yo'qotishli siqish ishlatadi.</p>",
        en: "<p>Spatial dimensions and bit depth (2^b levels) govern memory footprint and tonal smoothness. BMP is uncompressed, PNG is lossless DEFLATE (+Alpha), and JPEG uses lossy 8×8 DCT.</p>"
      },
      pitfalls: {
        uz: [
          "cv2.split() ni katta video tsiklda chaqirish sekin — tezlik uchun NumPy slicing b = img[:,:,0] afzal.",
          "Bit-chuqurlikni kamaytirganda integer bo'lish (//) dan foydalanib, so'ng step ga ko'paytiring.",
          "JPEG sifatini 10 ga tushirganda PSNR < 28 dB tushishi va 8×8 bloklanish chiqishini tekshiring."
        ],
        en: [
          "Avoid cv2.split() inside tight video loops; use fast zero-copy NumPy slices img[:,:,c].",
          "Perform integer floor division before multiplying step size when quantizing bit depths.",
          "Verify low JPEG quality (<20) produces visible 8×8 DCT blocking and drops PSNR."
        ]
      },
      guidedSteps: [
        {
          title: { uz: "1-qadam: RGB kanallarni ajratish va yagona kanal vizualizatsiyasi", en: "Step 1: Channel Splitting & Single-Channel Visualization" },
          desc: { uz: "B, G, R kanallarini ajratib faqat Qizil kanal ko'rinadigan rangli tasvir yig'ing.", en: "Split BGR channels and reconstruct a red-only RGB visualization." },
          code: `import cv2, os, numpy as np\nimg = np.zeros((200, 300, 3), np.uint8)\nfor x in range(300): img[:, x] = [x % 256, (255 - x) % 256, int(x * 255 / 300)]\nB, G, R = cv2.split(img)\nzeros = np.zeros_like(B)\nred_only = cv2.merge([zeros, zeros, R])\nprint("Red channel max:", R.max(), "| Shape:", red_only.shape)`,
          expected: { uz: "Faqat qizil komponentli (200, 300, 3) tasvir olinadi.", en: "Produces a (200, 300, 3) red-only image." }
        },
        {
          title: { uz: "2-qadam: Bit chuqurlik kvantlashi (8→4→2 bit) va PSNR", en: "Step 2: Bit-Depth Quantization & PSNR Drop" },
          desc: { uz: "256 darajadan 16 (4-bit) va 4 (2-bit) darajaga tushirib PSNR ni hisoblang.", en: "Quantize 8-bit gradients down to 4-bit and 2-bit and log PSNR." },
          code: `for bits in [6, 4, 2]:\n    levels = 2 ** bits\n    step = 256 // levels\n    q = ((img // step) * step).astype(np.uint8)\n    print(f"{bits}-bit ({levels:2d} levels) -> PSNR = {cv2.PSNR(img, q):.2f} dB")`,
          expected: { uz: "Bit kamaygan sayin PSNR ~38 dB → ~25 dB → ~13 dB ga tushadi.", en: "PSNR drops monotonically as bit depth shrinks." }
        },
        {
          title: { uz: "3-qadam: BMP, PNG va JPEG formatlari hajmini solishtirish", en: "Step 3: Compare BMP, PNG & JPEG File Sizes + Quality" },
          desc: { uz: "Bir xil tasvirni 4 formatda yozib bayt hajmi va PSNR ni jadvalda chiqaring.", en: "Write identical images as BMP, PNG, JPEG-90, and JPEG-15 and measure sizes & PSNR." },
          code: `configs = [('bmp', []), ('png', []), ('jpg', [cv2.IMWRITE_JPEG_QUALITY, 90]), ('jpg', [cv2.IMWRITE_JPEG_QUALITY, 15])]\nfor i, (ext, flag) in enumerate(configs):\n    fn = f"a2_out_{i}.{ext}"\n    cv2.imwrite(fn, img, flag)\n    reloaded = cv2.imread(fn)\n    print(f"{fn:14s} | {os.path.getsize(fn):6d} B | PSNR={cv2.PSNR(img, reloaded):.2f} dB")`,
          expected: { uz: "BMP/PNG eng katta (cheksiz PSNR), JPEG-15 eng kichik (past PSNR).", en: "BMP/PNG retain inf/high PSNR while JPEG-15 shrinks heavily with visible loss." }
        }
      ],
      vivaQuestions: [
        { q: { uz: "Posterizatsiya (banding) effekti qachon paydo bo'ladi?", en: "When does posterization (contour banding) appear?" }, a: { uz: "Bit chuqurligi kamayganda (masalan 8-bitdan 3–4 bitga tushganda) silliq yorqinlik gradienti zinapoyaga aylanadi.", en: "When bit depth drops too low (e.g. ≤4 bits), smooth gradients quantize into flat steps." } },
        { q: { uz: "Nima uchun PNG saqlangandan keyin qayta o'qilganda PSNR = 100+ dB (cheksiz) chiqadi?", en: "Why does PNG reload with infinite PSNR?" }, a: { uz: "PNG yo'qotishsiz DEFLATE siqish ishlatadi — qayta tiklangan piksellar 100% asl qiymatga teng (MSE=0).", en: "PNG uses lossless DEFLATE compression, guaranteeing zero MSE upon decoding." } },
        { q: { uz: "Alpha (shaffoflik) kanali qaysi formatda saqlanadi?", en: "Which standard format among JPEG, BMP, and PNG supports alpha transparency?" }, a: { uz: "PNG (RGBA 4 kanalli format).", en: "PNG supports a 4th alpha channel (RGBA)." } }
      ]
    },
    3: {
      theoryRecap: {
        uz: "<p>RGB modelida yorqinlik va rang aralashib ketgan. <strong>HSV (Hue, Saturation, Value)</strong> va <strong>CIELAB</strong> rang tonini yorqinlikdan ajratadi. OpenCV da <code>uint8</code> sig'ishi uchun <strong>Hue [0, 179]</strong> oralig'ida kodlanadi.</p>",
        en: "<p>RGB couples illumination with hue. Converting to <strong>HSV</strong> or <strong>CIELAB</strong> isolates chrominance. Remember OpenCV stores 8-bit <strong>Hue in [0, 179]</strong>!</p>"
      },
      pitfalls: {
        uz: [
          "OpenCV Hue 0..360° emas, 0..179 oralig'ida! Qizil rang uchun [0..10] VA [170..179] ni bitwise_or qiling.",
          "Past yorug'lik (V < 40) yoki oq/kulrang joylar (S < 50) ko'pincha soxta rang beradi — S_min va V_min ni 50+ qoying.",
          "cv2.inRange maskasidan keyin mayda nuqtalarni olib tashlash uchun MORPH_OPEN qo'llang."
        ],
        en: [
          "OpenCV halves Hue to [0, 179]; wrap Red by OR-ing [0..10] and [170..179].",
          "Enforce minimum Saturation & Value (≥50) so shadows and gray walls don't leak into color masks.",
          "Clean noisy mask speckles with morphological opening (MORPH_OPEN)."
        ]
      },
      guidedSteps: [
        {
          title: { uz: "1-qadam: Rangli shakllar sahnasi & BGR→HSV/LAB konvertatsiya", en: "Step 1: Build Multi-Color Scene & Convert to HSV/LAB" },
          desc: { uz: "Qizil, yashil va ko'k obyektli tasvir yasab HSV/LAB shakllarini tekshiring.", en: "Synthesize red/green/blue shapes and inspect converted HSV & LAB arrays." },
          code: `import cv2, numpy as np\nimg = np.full((240, 320, 3), 240, np.uint8)\ncv2.circle(img, (80, 120), 40, (20, 20, 230), -1)   # Qizil (BGR)\ncv2.circle(img, (160, 120), 40, (20, 200, 20), -1)  # Yashil\ncv2.circle(img, (240, 120), 40, (230, 50, 20), -1)  # Ko'k\nhsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)\nlab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)\nprint("Center Green HSV:", hsv[120, 160], "| LAB:", lab[120, 160])`,
          expected: { uz: "Yashil doira markazi HSV da H≈60 atrofida chiqadi.", en: "Green circle center reports Hue ~60 in OpenCV scale." }
        },
        {
          title: { uz: "2-qadam: O'ralgan Qizil Rang Maskasi & Morfologik Tozalash", en: "Step 2: Wrapped Red Masking & Morphological Cleanup" },
          desc: { uz: "0..10 va 170..179 qizil diapazonlarini birlashtirib maska oling.", en: "Combine lower & upper Red Hue ranges and denoise with MORPH_OPEN." },
          code: `m1 = cv2.inRange(hsv, np.array([0, 80, 80]), np.array([10, 255, 255]))\nm2 = cv2.inRange(hsv, np.array([170, 80, 80]), np.array([179, 255, 255]))\nred_mask = cv2.morphologyEx(cv2.bitwise_or(m1, m2), cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))\nisolated = cv2.bitwise_and(img, img, mask=red_mask)\nprint("Red pixel area:", int(cv2.countNonZero(red_mask)))`,
          expected: { uz: "Taxminan π×40² ≈ 5026 ta qizil piksel ajratiladi.", en: "Isolates ~5,026 pixels matching π×40²." }
        },
        {
          title: { uz: "3-qadam: Konturlar, Bounding Box va Markaz (x, y) Topish", en: "Step 3: Contours, Centroid & Bounding Box Localization" },
          desc: { uz: "Maskadan konturlarni topib obyekt markazini momentlar bilan hisoblang.", en: "Extract contours and compute object centroid via spatial moments." },
          code: `cnts, _ = cv2.findContours(red_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)\nfor c in cnts:\n    M = cv2.moments(c)\n    if M["m00"] > 0:\n        cx, cy = int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"])\n        print(f"Detected Red Centroid: ({cx}, {cy}), BBox={cv2.boundingRect(c)}")`,
          expected: { uz: "Detected Red Centroid: (80, 120) atrofida chiqadi.", en: "Outputs centroid (80, 120) and tight bounding box." }
        }
      ],
      vivaQuestions: [
        { q: { uz: "Nima uchun OpenCV da qizil rang bitta inRange() ga sig'maydi?", en: "Why does pure Red require two inRange() masks in OpenCV HSV?" }, a: { uz: "Qizil 0° va 360° (OpenCV da 0 va 179) tutashuvida joylashgan, shuning uchun [0..10] va [170..179] birlashtiriladi.", en: "Red wraps across the 0/180 boundary, splitting between [0..10] and [170..179]." } },
        { q: { uz: "CIELAB rang fazosi qaysi vazifalarda HSV dan ustun?", en: "When does CIELAB outperform HSV?" }, a: { uz: "Ikki rang orasidagi inson idrokiga mos Yevklid farqini (ΔE) o'lchash va sanoatda rang mosligini tekshirishda.", en: "Measuring perceptually uniform Euclidean color distances ΔE in color matching." } },
        { q: { uz: "S (Saturation) = 0 bo'lgan oq yoki kulrang pikselni qanday chiqarib tashlaysiz?", en: "How do you reject white/gray glare from an HSV color mask?" }, a: { uz: "Pastki chegarada S_min (masalan 70–100) belgilash orqali past to'yinganlikdagi piksellar rad etiladi.", en: "Raise the lower Saturation threshold S_min (e.g. 70–100)." } }
      ]
    },
    4: {
      theoryRecap: {
        uz: "<p>Chiziqli filtrlash $I * K$ svyortkasiga tayanadi. <strong>Mean filtr</strong> barcha qo'shnilarga $1/k^2$ vazn beradi va chekkalarni kuchli xiralashtiradi; <strong>Gauss filtri</strong> $\\sigma$ bilan markazga og'irlik beradi va ajraluvchanlik tufayli $O(2N)$ tezlikda ishlaydi. <code>cv2.addWeighted</code> orqali <strong>Unsharp Masking</strong> chekkalarni keskinlashtiradi.</p>",
        en: "<p>Linear filtering computes spatial convolution $I * K$. <strong>Mean blur</strong> smears edges equally, whereas separable <strong>Gaussian blur</strong> weights distance smoothly in $O(2N)$ ops. <strong>Unsharp masking</strong> boosts crispness via $I + \\alpha(I - G_\\sigma * I)$.</p>"
      },
      pitfalls: {
        uz: [
          "cv2.GaussianBlur(img, (k, k), 0) da k albatta musbat TOQ son (3, 5, 7...) bo'lishi shart!",
          "Custom yadro koeffitsiyentlari yig'indisini 1.0 ga normallamasaniz tasvir qorayib yoki oqarib ketadi.",
          "PSNR hisoblashdan oldin shovqinli rasm va tozalangan rasmning shape va dtype bir xilligini tekshiring."
        ],
        en: [
          "Gaussian kernel sizes (k, k) must strictly be positive ODD integers (3, 5, 7...).",
          "Always normalize smoothing kernels to sum to 1.0 so brightness doesn't drift.",
          "Verify matching shape & uint8 dtype before passing arrays into cv2.PSNR()."
        ]
      },
      guidedSteps: [
        {
          title: { uz: "1-qadam: Gauss shovqinli test tasvirini yaratish", en: "Step 1: Add Controlled Gaussian Noise to Test Image" },
          desc: { uz: "Geometrik shaklli toza tasvirga σ=18 li Gauss shovqini qo'shib boshlang'ich PSNR ni o'lchang.", en: "Add Gaussian noise (σ=18) to a clean geometric image and measure baseline PSNR." },
          code: `import cv2, time, numpy as np\nclean = np.full((240, 320, 3), 100, np.uint8)\ncv2.rectangle(clean, (60, 50), (260, 190), (220, 220, 220), -1)\nrng = np.random.default_rng(1)\nnoisy = np.clip(clean.astype(np.float32) + rng.normal(0, 18, clean.shape), 0, 255).astype(np.uint8)\nprint("Noisy baseline PSNR:", round(cv2.PSNR(clean, noisy), 2), "dB")`,
          expected: { uz: "Boshlang'ich Noisy PSNR ~23 dB atrofida chiqadi.", en: "Baseline noisy PSNR reads ~23 dB." }
        },
        {
          title: { uz: "2-qadam: Mean vs Gauss Filtrlari va PSNR Taqqoslash", en: "Step 2: Mean vs Gaussian Filter Benchmark" },
          desc: { uz: "k=3, 5, 9 uchun Mean va Gauss filtrlarini qo'llab PSNR hamda vaqtni solishtiring.", en: "Compare Mean and Gaussian blurs across k=3, 5, 9 by PSNR & execution speed." },
          code: `for k in [3, 5, 9]:\n    m_out = cv2.blur(noisy, (k, k))\n    g_out = cv2.GaussianBlur(noisy, (k, k), 0)\n    print(f"k={k} | Mean PSNR={cv2.PSNR(clean, m_out):.2f} dB | Gauss PSNR={cv2.PSNR(clean, g_out):.2f} dB")`,
          expected: { uz: "Gauss filtri chekkalarni yaxshiroq saqlab yuqoriroq PSNR ko'rsatadi.", en: "Gaussian achieves higher PSNR than box blur while keeping corners cleaner." }
        },
        {
          title: { uz: "3-qadam: Unsharp Masking bilan O'tkirlashtirish", en: "Step 3: Edge Sharpening via Unsharp Masking" },
          desc: { uz: "cv2.addWeighted() yordamida silliqlangan tasvirni ayirib chekkalarni keskinlashtiring.", en: "Apply Unsharp Masking via cv2.addWeighted() to accentuate edges." },
          code: `blurred = cv2.GaussianBlur(clean, (5, 5), 1.5)\nsharp = cv2.addWeighted(clean, 1.5, blurred, -0.5, 0)\ncv2.imwrite("a4_unsharp.png", np.hstack([clean, blurred, sharp]))\nprint("Saved comparison panel (240, 960, 3)")`,
          expected: { uz: "a4_unsharp.png saqlanadi: asl, xira va o'tkirlashtirilgan natija.", en: "Saves clean, blurred, and sharpened panels side by side." }
        }
      ],
      vivaQuestions: [
        { q: { uz: "Nima uchun Gauss filtri Mean filtrdan sifatliroq silliqlash beradi?", en: "Why does Gaussian blur look cleaner than Mean blur?" }, a: { uz: "Gauss markazga katta vazn berib, chastota sohasida halqasimon (ringing) artefakt qoldirmaydi.", en: "Gaussian decays weights smoothly by distance and avoids frequency ringing." } },
        { q: { uz: "Ajraluvchanlik (separability) tufayli 7×7 filtr necha barobar tezlashadi?", en: "How much faster is a separable 7×7 pass vs direct 2D?" }, a: { uz: "49 ta ko'paytirish o'rniga 7+7=14 amal — 3.5× tezlashadi.", en: "14 ops instead of 49 ops → 3.5× theoretical speedup." } },
        { q: { uz: "Unsharp masking formulasidagi manfiy -0.5 vazni nimani anglatadi?", en: "What does the -0.5 weight accomplish in addWeighted(I, 1.5, blur, -0.5, 0)?" }, a: { uz: "1.5·I - 0.5·blur = I + 0.5·(I - blur), ya'ni yuqori chastotali chekka detallarini 0.5 koeffitsiyent bilan kuchaytirib qo'shadi.", en: "It equals I + 0.5*(I - blur), adding amplified high-frequency detail back to I." } }
      ]
    },
    5: {
      theoryRecap: {
        uz: "<p><strong>Median filtri</strong> saralash (<em>order statistic</em>) asosida ishlab, salt-and-pepper (0 va 255) shovqinini izsiz olib tashlaydi. <strong>Bilateral filtr</strong> esa fazoviy $\\sigma_s$ va yorqinlik $\\sigma_r$ vaznlarini ko'paytirib, chekkalarni xiralashtirmasdan Gauss shovqinini tozalaydi.</p>",
        en: "<p>The <strong>Median filter</strong> ranks window values to completely reject 0/255 impulse spikes. The <strong>Bilateral filter</strong> multiplies spatial ($\\sigma_s$) and intensity-range ($\\sigma_r$) kernels to denoise smoothly without blurring step edges.</p>"
      },
      pitfalls: {
        uz: [
          "cv2.medianBlur(img, k) da k faqat TOQ son (3, 5, 7) bo'lishi kerak — juft son xato beradi.",
          "Bilateral filtrdagi katta d (masalan d=25) CPU da juda sekin ishlaydi; real vaqtda d=5..9 ishlating.",
          "Aralash shovqinda avval Gauss/Bilateral qo'llasangiz 255 nuqtalar yoyilib ketadi — avval Median qo'llang!"
        ],
        en: [
          "cv2.medianBlur kernel size k must be an odd integer >= 3.",
          "Large diameter d in cv2.bilateralFilter slows CPU significantly; keep d=5..9.",
          "Always run Median BEFORE Bilateral/Gaussian on mixed noise so spikes don't smear."
        ]
      },
      guidedSteps: [
        {
          title: { uz: "1-qadam: Salt-and-Pepper shovqin generatori", en: "Step 1: Inject Synthetic Salt-and-Pepper Noise" },
          desc: { uz: "Tasvirning 8% piksellarini tasodifiy 0 (murch) va 255 (tuz) ga aylantiring.", en: "Corrupt 8% of pixels with random 0 (pepper) and 255 (salt) impulses." },
          code: `import cv2, time, numpy as np\nclean = np.zeros((240, 320), np.uint8); cv2.rectangle(clean, (60, 40), (260, 200), 210, -1)\nnoisy = clean.copy(); rng = np.random.default_rng(7)\np_map = rng.random(clean.shape)\nnoisy[p_map < 0.04] = 255; noisy[(p_map >= 0.04) & (p_map < 0.08)] = 0\nprint("Corrupted PSNR:", round(cv2.PSNR(clean, noisy), 2), "dB")`,
          expected: { uz: "8% shovqin bilan PSNR ~16 dB gacha tushadi.", en: "Corrupted PSNR drops near ~16 dB." }
        },
        {
          title: { uz: "2-qadam: Gauss vs Median Tozalash Samaradorligi", en: "Step 2: Gaussian vs Median Restoration Comparison" },
          desc: { uz: "Shovqinli rasmga GaussianBlur(5×5) va medianBlur(5) qo'llab PSNR farqini ko'ring.", en: "Compare PSNR recovery between 5×5 Gaussian and 5×5 Median filters." },
          code: `g5 = cv2.GaussianBlur(noisy, (5, 5), 1.5)\nm5 = cv2.medianBlur(noisy, 5)\nprint(f"Gaussian PSNR={cv2.PSNR(clean, g5):.2f} dB | Median PSNR={cv2.PSNR(clean, m5):.2f} dB")`,
          expected: { uz: "Median filtri Gauss dan +10–15 dB yuqori PSNR beradi!", en: "Median beats Gaussian by 10+ dB and keeps crisp rectangle corners!" }
        },
        {
          title: { uz: "3-qadam: Bilateral Filtr & Tezlik O'lchovi", en: "Step 3: Bilateral Filtering & Runtime Profiling" },
          desc: { uz: "Turli sigmaColor va d qiymatlari bilan Bilateral filtrning sifat va tezligini o'lchang.", en: "Measure PSNR & millisecond latency across Bilateral d and sigmaColor settings." },
          code: `t0 = time.perf_counter()\nbil = cv2.bilateralFilter(clean, d=9, sigmaColor=75, sigmaSpace=75)\nprint(f"Bilateral d=9 took {(time.perf_counter()-t0)*1000:.2f} ms")`,
          expected: { uz: "Ishlash vaqti (ms) va chekkalarning saqlanishi qayd etiladi.", en: "Logs Bilateral runtime in milliseconds." }
        }
      ],
      vivaQuestions: [
        { q: { uz: "Bilateral filtrdagi sigmaColor (σ_r) parametri qanday vazifani bajaradi?", en: "What does sigmaColor (σ_r) control in cv2.bilateralFilter?" }, a: { uz: "Qanday yorqinlik farqidan keyin qo'shni piksel chekka narigi tomonida deb hisoblanishini belgilaydi.", en: "Controls intensity similarity sensitivity so pixels across a sharp edge get near-zero weight." } },
        { q: { uz: "Nima uchun Median filtri tasvirda yangi kulrang tuslar yaratmaydi?", en: "Why does Median filtering never invent intermediate gray values?" }, a: { uz: "U faqat qo'shni oynadagi mavjud piksellarni saralab o'rtadagi elementni oladi.", en: "It selects an existing rank-ordered pixel from the window rather than averaging." } },
        { q: { uz: "Bilateral filtr juda sekin bo'lsa uning o'rniga O(N) vaqtli qaysi filtr qo'llaniladi?", en: "What O(N) alternative mimics edge-preserving Bilateral smoothing much faster?" }, a: { uz: "Guided Filter (He et al.).", en: "The linear-time Guided Filter." } }
      ]
    },
    6: {
      theoryRecap: {
        uz: "<p><strong>Sobel va Prewitt</strong> birinchi tartibli fazoviy hosilalarni (gradient $G_x, G_y$) hisoblaydi. <strong>Canny (1986)</strong> algoritmi esa 5 bosqich (Gauss → Sobel → NMS → Double Thresh → Hysteresis) orqali 1 piksel qalinlikdagi toza konturlar chiqaradi.</p>",
        en: "<p><strong>Sobel/Prewitt</strong> approximate 2D derivatives $G_x, G_y$. <strong>Canny (1986)</strong> extracts 1-pixel thin contours via Gaussian blur, Sobel gradients, NMS, double thresholds, and hysteresis tracking.</p>"
      },
      pitfalls: {
        uz: [
          "cv2.Sobel(gray, cv2.CV_8U, 1, 0) manfiy hosilalarni 0 qilib yo'qotadi — doimo ddepth=cv2.CV_64F ishlating!",
          "Canny ga berishdan oldin shovqinli rasmni GaussianBlur bilan silliqlang, aks holda minglab soxta chekkalar chiqadi.",
          "T_high : T_low nisbatini taxminan 2:1 yoki 3:1 oralig'ida saqlang."
        ],
        en: [
          "Never use cv2.CV_8U inside cv2.Sobel(); negative gradients clip to zero. Use cv2.CV_64F!",
          "Smooth noisy images before Canny to suppress false gradient peaks.",
          "Maintain a 2:1 or 3:1 T_high:T_low hysteresis threshold ratio."
        ]
      },
      guidedSteps: [
        {
          title: { uz: "1-qadam: CV_64F bilan Sobel Gx, Gy va Gradient Kattaligi", en: "Step 1: Compute Sobel Gx, Gy & Magnitude in CV_64F" },
          desc: { uz: "O'ng va chap chekkalarni ikkalasini ham saqlash uchun float64 Sobel gradientlarini hisoblang.", en: "Compute float64 Sobel derivatives to preserve both positive and negative edges." },
          code: `import cv2, numpy as np\ngray = np.zeros((200, 260), np.uint8)\ncv2.rectangle(gray, (60, 40), (200, 160), 220, -1)\ngx = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)\ngy = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)\nmag = cv2.magnitude(gx, gy)\nprint(f"Gx range: [{gx.min():.0f}, {gx.max():.0f}] | Max |grad|={mag.max():.1f}")`,
          expected: { uz: "Gx [-880, +880] manfiy va musbat qiymatlar saqlanadi.", en: "Gx covers [-880, +880], retaining both rectangle walls." }
        },
        {
          title: { uz: "2-qadam: Qo'lda 3×3 Prewitt Yadro Bilan Taqqoslash", en: "Step 2: Custom Prewitt Kernel vs Sobel" },
          desc: { uz: "Prewitt X yadrosini filter2D bilan qo'llab shovqinga sezgirligini Sobel bilan solishtiring.", en: "Run custom Prewitt kernels via filter2D and compare against Sobel." },
          code: `kx_pre = np.array([[-1,0,1],[-1,0,1],[-1,0,1]], np.float32)\ngrad_pre = np.abs(cv2.filter2D(gray.astype(np.float32), -1, kx_pre))\nprint("Prewitt max:", grad_pre.max(), "| Sobel max:", np.abs(gx).max())`,
          expected: { uz: "Sobel markaziy ±2 vazn sababli kuchliroq silliq javob beradi.", en: "Sobel produces a smoother, stronger peak due to center ±2 weighting." }
        },
        {
          title: { uz: "3-qadam: Auto-Canny va Chegara Zichligini O'lchash", en: "Step 3: Median Auto-Canny & Edge Density Ratio" },
          desc: { uz: "Mediana asosida avtomatik (T_low, T_high) topib Canny chekka piksellar ulushini chiqaring.", en: "Compute median-based automatic Canny thresholds and count edge density." },
          code: `blur = cv2.GaussianBlur(gray, (5, 5), 1.0)\nv = np.median(blur) or 100\nt_low, t_high = int(max(0, 0.67 * v)), int(min(255, 1.33 * v))\nedges = cv2.Canny(blur, t_low, t_high)\nprint(f"Auto T=({t_low},{t_high}) -> Edge px={cv2.countNonZero(edges)} ({100*cv2.countNonZero(edges)/edges.size:.2f}%)")`,
          expected: { uz: "1-piksel qalinlikdagi toza to'rtburchak konturi ajratiladi.", en: "Outputs 1-pixel thin perimeter count and density percentage." }
        }
      ],
      vivaQuestions: [
        { q: { uz: "Canny algoritmidagi Non-Maximum Suppression (NMS) bosqichi nima qiladi?", en: "What is the role of NMS inside Canny edge detection?" }, a: { uz: "Gradient yo'nalishi bo'ylab eng katta lokal qiymatni qoldirib, qalin gradient chiziqlarini 1 piksel qalinlikka keltiradi.", en: "Suppresses non-peak pixels orthogonal to the edge normal, thinning ridges to 1 pixel." } },
        { q: { uz: "cv2.Sobel() da CV_64F o'rniga CV_8U bersak nima buziladi?", en: "What breaks when passing cv2.CV_8U into cv2.Sobel()?" }, a: { uz: "Oqdan qoraga o'tishda hosila manfiy chiqadi va uint8 da 0 ga kesilib chekkaning yarmi yo'qoladi.", en: "Bright-to-dark transitions yield negative gradients that uint8 silently truncates to 0." } },
        { q: { uz: "Gisterezis (hysteresis) chegaralashda T_low < M < T_high piksel qachon saqlanadi?", en: "When does hysteresis keep a weak edge pixel (T_low <= M < T_high)?" }, a: { uz: "Faqat M >= T_high kuchli chekka pikseliga 8-qo'shnilik zanjiri bilan ulangan bo'lsa.", en: "Only when connected (8-neighborhood) to a strong edge contour (M >= T_high)." } }
      ]
    },
    7: {
      theoryRecap: {
        uz: "<p><strong>Harris</strong> struktur tenzor $M$ orqali aylanishga invariant burchak topadi (lekin masshtabga emas). <strong>SIFT</strong> (128 float, L2) va <strong>ORB</strong> (256 bit binar, Hamming) esa ham burchak, ham masshtab va yorug'likka barqaror deskriptor beradi. Mosliklar <strong>Lowe nisbat testi</strong> ($d_1 &lt; 0.75 d_2$) bilan filtrlanadi.</p>",
        en: "<p><strong>Harris</strong> finds rotation-invariant corners (not scale-invariant). <strong>SIFT</strong> (128-D float, L2) and <strong>ORB</strong> (256-bit binary, Hamming) extract scale/rotation-invariant descriptors, filtered via <strong>Lowe's ratio test</strong> ($d_1 &lt; 0.75 d_2$).</p>"
      },
      pitfalls: {
        uz: [
          "ORB uchun BFMatcher(cv2.NORM_HAMMING), SIFT uchun BFMatcher(cv2.NORM_L2) ishlatish shart!",
          "crossCheck=True va knnMatch(k=2) ni birga ishlatib bo'lmaydi — Ratio Test uchun crossCheck=False bo'lsin.",
          "cv2.cornerHarris() float32 kulrang tasvir kutadi!"
        ],
        en: [
          "Match binary ORB with NORM_HAMMING and float SIFT with NORM_L2.",
          "Set crossCheck=False when calling knnMatch(k=2) for Lowe's Ratio Test.",
          "cv2.cornerHarris requires a np.float32 grayscale input array."
        ]
      },
      guidedSteps: [
        {
          title: { uz: "1-qadam: Harris Burchak Detektori (float32 & Threshold)", en: "Step 1: Harris Corner Response R Calculation" },
          desc: { uz: "Shaxmat/to'rtburchak tasvirida cornerHarris chaqirib R > 0.01*R.max() burchaklarni toping.", en: "Run cv2.cornerHarris on float32 grayscale and threshold R > 0.01 * R.max()." },
          code: `import cv2, time, numpy as np\nimg1 = np.zeros((240, 240), np.uint8)\ncv2.rectangle(img1, (50, 50), (180, 170), 220, -1)\ncv2.rectangle(img1, (90, 90), (140, 130), 60, -1)\ndst = cv2.cornerHarris(np.float32(img1), blockSize=2, ksize=3, k=0.04)\nprint("Detected Harris corner pixels:", int(np.sum(dst > 0.01 * dst.max())))`,
          expected: { uz: "8 ta to'rtburchak burchak atrofidagi piksellar aniqlanadi.", en: "Detects pixels around the 8 rectangle corners." }
        },
        {
          title: { uz: "2-qadam: Aylantirilgan Tasvir & ORB + Lowe Nisbat Testi", en: "Step 2: Rotated View & ORB + Lowe Ratio Matching" },
          desc: { uz: "Tasvirni 25° burib masshtablab, ORB bilan kalit nuqtalarni knnMatch(k=2) orqali moslang.", en: "Rotate & scale the test image, extract ORB descriptors, and apply 0.75 Ratio Test." },
          code: `M = cv2.getRotationMatrix2D((120, 120), 25, 0.9)\nimg2 = cv2.warpAffine(img1, M, (240, 240))\norb = cv2.ORB_create(nfeatures=500)\nkp1, des1 = orb.detectAndCompute(img1, None)\nkp2, des2 = orb.detectAndCompute(img2, None)\nbf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=False)\npairs = bf.knnMatch(des1, des2, k=2)\ngood = [m for pr in pairs if len(pr)==2 for m, n in [pr] if m.distance < 0.75 * n.distance]\nprint(f"Keypoints: {len(kp1)} / {len(kp2)} | Good matches: {len(good)}")`,
          expected: { uz: "Aylanishga qaramay ishonchli mosliklar topiladi.", en: "Finds robust matches invariant to rotation and scaling." }
        },
        {
          title: { uz: "3-qadam: SIFT vs ORB Tezlik Benchmarki", en: "Step 3: SIFT vs ORB Runtime Benchmark" },
          desc: { uz: "Bir xil tasvirda cv2.SIFT_create() va cv2.ORB_create() ishlash vaqtini ms da solishtiring.", en: "Benchmark SIFT vs ORB keypoint extraction time in milliseconds." },
          code: `sift = cv2.SIFT_create()\nt0 = time.perf_counter(); kps, dess = sift.detectAndCompute(img1, None); t_sift = (time.perf_counter()-t0)*1000\nt0 = time.perf_counter(); kpo, deso = orb.detectAndCompute(img1, None); t_orb = (time.perf_counter()-t0)*1000\nprint(f"SIFT: {t_sift:.2f} ms ({len(kps)} kps) | ORB: {t_orb:.2f} ms ({len(kpo)} kps)")`,
          expected: { uz: "ORB SIFT dan sezilarli darajada tezroq chiqadi.", en: "ORB typically runs several times faster than SIFT." }
        }
      ],
      vivaQuestions: [
        { q: { uz: "Harris detektorida λ1 katta, λ2 ≈ 0 bo'lsa bu qanday geometrik shakl?", en: "In Harris tensor M, if λ1 is large and λ2 ≈ 0, what feature is it?" }, a: { uz: "Chekka (Edge) — faqat bitta yo'nalishda yorqinlik o'zgaradi.", en: "An edge (intensity changes in only one orthogonal direction)." } },
        { q: { uz: "SIFT va ORB deskriptor o'lchami hamda masofa metrikasidagi farq nima?", en: "Compare SIFT vs ORB descriptor type and distance metric." }, a: { uz: "SIFT — 128 ta float (L2 Yevklid masofasi); ORB — 256 bit binar (tezkor Hamming XOR).", en: "SIFT uses 128 floats (L2); ORB uses 256-bit binary strings (Hamming)." } },
        { q: { uz: "Lowe nisbat testidagi 0.75 chegarasi 0.99 qilib qo'yilsa nima bo'ladi?", en: "What happens if Lowe's ratio threshold is raised from 0.75 to 0.99?" }, a: { uz: "Noaniq va takroriy tekstura mosliklari (ko'plab outlierlar) ham o'tib ketadi.", en: "Ambiguous repetitive mismatches pass through, increasing outlier contamination." } }
      ]
    },
    8: {
      theoryRecap: {
        uz: "<p><strong>Hough Transformatsiyasi</strong> chekka piksellarini $(r, \\theta)$ yoki $(a, b, r)$ parametr fazosida ovoz to'plash orqali uzuk chiziq va doiralarni topadi. <strong>RANSAC</strong> esa minimal $s$ nuqtalar yordamida outlierlar ichidan to'g'ri modelni ajratib oladi.</p>",
        en: "<p><strong>Hough Transforms</strong> vote in polar $(\\rho, \\theta)$ or 3D $(a,b,r)$ parameter space to find lines/circles. <strong>RANSAC</strong> robustly estimates geometric models despite high outlier ratios.</p>"
      },
      pitfalls: {
        uz: [
          "HoughLinesP dan oldin Canny bilan yupqa 1-piksel chekka oling; qalin chekkalar minglab ortiqcha chiziq beradi.",
          "HoughCircles da param2 juda kichik bo'lsa tasvirda o'nlab soxta doiralar chiqadi!",
          "RANSAC reprojection threshold odatda 3.0–5.0 piksel oralig'ida bo'ladi."
        ],
        en: [
          "Feed thin 1-px Canny edges into HoughLinesP rather than thick thresholded blobs.",
          "Setting param2 too low in HoughCircles floods output with false circles.",
          "Typical pixel reprojection thresholds in findHomography(..., cv2.RANSAC) are 3–5 px."
        ]
      },
      guidedSteps: [
        {
          title: { uz: "1-qadam: Canny + HoughLinesP Bilan Yo'l Chiziqlarini Aniqlash", en: "Step 1: Lane/Line Segment Detection via HoughLinesP" },
          desc: { uz: "Shovqinli tasvirda chiziq chizing, Canny + HoughLinesP bilan segmentlarni qaytaring.", en: "Draw noisy lines and extract finite segments using Canny + HoughLinesP." },
          code: `import cv2, math, numpy as np\ncanvas = np.zeros((240, 320), np.uint8)\ncv2.line(canvas, (30, 220), (140, 80), 255, 2)\ncv2.line(canvas, (290, 220), (180, 80), 255, 2)\nedges = cv2.Canny(canvas, 50, 150)\nlines = cv2.HoughLinesP(edges, 1, np.pi/180, threshold=30, minLineLength=40, maxLineGap=10)\nprint("HoughLinesP segments found:", 0 if lines is None else len(lines))`,
          expected: { uz: "2 ta yo'l chizig'i kesmasi aniqlanadi.", en: "Detects the 2 drawn lane line segments." }
        },
        {
          title: { uz: "2-qadam: HoughCircles Bilan Doiralar Topish", en: "Step 2: Circle Detection via HOUGH_GRADIENT" },
          desc: { uz: "Gauss blur dan keyin cv2.HoughCircles yordamida markaz va radiuslarni aniqlang.", en: "Smooth image and locate circle centers & radii with cv2.HoughCircles." },
          code: `c_img = np.zeros((240, 320), np.uint8)\ncv2.circle(c_img, (90, 110), 30, 220, -1); cv2.circle(c_img, (220, 130), 42, 200, -1)\nblur_c = cv2.GaussianBlur(c_img, (9, 9), 2)\ncircles = cv2.HoughCircles(blur_c, cv2.HOUGH_GRADIENT, dp=1.2, minDist=50, param1=100, param2=25, minRadius=15, maxRadius=60)\nprint("Detected circles (x,y,r):", np.round(circles[0], 1) if circles is not None else None)`,
          expected: { uz: "(90, 110, 30) va (220, 130, 42) atrofidagi doiralar chiqadi.", en: "Reports circles near (90,110,30) and (220,130,42)." }
        },
        {
          title: { uz: "3-qadam: RANSAC Iteratsiyalar Soni N Kalkulyatori & Outlier Sinovi", en: "Step 3: RANSAC Iteration Calculator & Outlier Tolerance" },
          desc: { uz: "e = [0.2, 0.4, 0.6] va s = [2, 4] uchun kerakli RANSAC iteratsiyalar sonini hisoblang.", en: "Compute required RANSAC iterations N for e in [0.2, 0.4, 0.6] and s in [2, 4]." },
          code: `p = 0.99\nfor s in [2, 4]:\n    for e in [0.2, 0.4, 0.6]:\n        N = math.ceil(math.log(1 - p) / math.log(1 - (1 - e)**s))\n        print(f"s={s}, outlier e={e:.1f} -> required N={N}")`,
          expected: { uz: "s=4, e=0.6 da N=178 iteratsiyagacha o'sishi ko'rinadi.", en: "Demonstrates exponential growth up to N=178 at s=4, e=0.6." }
        }
      ],
      vivaQuestions: [
        { q: { uz: "Hough transformatsiyasi vertikal chiziqni nega qutb (ρ, θ) koordinatalarida topadi?", en: "Why does Hough use polar (ρ, θ) instead of y = mx + b?" }, a: { uz: "Vertikal chiziqda burchak koeffitsienti m = ∞ bo'lib ketadi; ρ = x cosθ + y sinθ da esa parametrlar chekli qoladi.", en: "Slope m diverges to infinity on vertical lines, whereas (ρ, θ) remains bounded." } },
        { q: { uz: "RANSAC topilgan eng yaxshi gipotezadan keyin yakunda nima bajaradi?", en: "What is the final refinement step after RANSAC identifies the max inlier set?" }, a: { uz: "Aniqlangan BARCHA inlierlar ustida model parametrlarini eng kichik kvadratlar usulida qayta aniqroq baholaydi.", en: "Refits the model via least squares over all consensus inliers." } },
        { q: { uz: "Oddiy HoughLines va HoughLinesP orasidagi farq nima?", en: "How does HoughLines differ from HoughLinesP?" }, a: { uz: "HoughLines cheksiz to'g'ri chiziq (ρ, θ) beradi; HoughLinesP aniq boshlanish/tugash nuqtali (x1,y1,x2,y2) kesmalar qaytaradi.", en: "HoughLines returns infinite (ρ, θ) lines; HoughLinesP returns finite segments (x1,y1,x2,y2)." } }
      ]
    },
    9: {
      theoryRecap: {
        uz: "<p><strong>Panorama yig'ish (Image Stitching)</strong> quvuri: Kalit nuqtalar (SIFT/ORB) → Ratio Test → <strong>RANSAC bilan 3×3 Gomografiya H (8 DOF, min 4 nuqta)</strong> → <strong>Teskari xaritalash (warpPerspective)</strong> → <strong>Blending</strong> (Feathering yoki Multi-Band Laplacian).</p>",
        en: "<p><strong>Image Stitching Pipeline:</strong> Detect Features → Ratio Match → <strong>RANSAC Homography H (3×3, 8 DOF, ≥4 pairs)</strong> → <strong>Inverse Warp</strong> → <strong>Feather/Multi-Band Blending</strong>.</p>"
      },
      pitfalls: {
        uz: [
          "dst = cv2.warpPerspective(img, H, (W, H)) da chiqish kanvas o'lchamini (W1+W2, H) kengroq qo'ying, aks holda o'ng qism kesiladi.",
          "Manfiy koordinatalarga warp bo'lsa, oldidan siljish matritsasi T @ H ko'paytiring.",
          "Kamera yon tomonga siljib rasm olinsa (parallaks) bitta H chokda ikkilanish beradi."
        ],
        en: [
          "Size the output canvas in warpPerspective wide enough (e.g. w1+w2) or warped pixels clip off-screen.",
          "Pre-multiply H by translation matrix T if warped corners go negative.",
          "Translating the camera center in 3D creates parallax seams that a single H cannot fix."
        ]
      },
      guidedSteps: [
        {
          title: { uz: "1-qadam: Mos Nuqtalardan findHomography + RANSAC Bilan H Topish", en: "Step 1: Compute Planar Homography H with RANSAC" },
          desc: { uz: "O'xshash 2 tasvirda ORB/RANSAC yordamida H matritsasini va inlierlar sonini toping.", en: "Extract ORB matches on overlapping synthetic views and estimate H via RANSAC." },
          code: `import cv2, numpy as np\nimg1 = np.zeros((200, 260, 3), np.uint8)\ncv2.rectangle(img1, (40, 40), (200, 160), (0, 210, 255), 3); cv2.putText(img1, "ASTI CV", (65, 110), 0, 0.9, (255,255,255), 2)\nsrc = np.float32([[40,40],[200,40],[200,160],[40,160]])\ndst = np.float32([[55,50],[220,30],[210,170],[35,155]])\nH, _ = cv2.findHomography(src, dst, cv2.RANSAC, 5.0)\nprint("H matrix:\\n", np.round(H, 4))`,
          expected: { uz: "3×3 normallangan (h33 = 1.0) H matritsasi chiqadi.", en: "Outputs normalized 3×3 Homography matrix." }
        },
        {
          title: { uz: "2-qadam: Perspektiv Warp va H⁻¹ Teskari Tekshiruvi", en: "Step 2: Perspective Warping & Inverse Mapping Check" },
          desc: { uz: "Tasvirni warpPerspective bilan burib, bir nuqtaning H·p proyeksiyasini tekshiring.", en: "Warp the image with warpPerspective and verify homogeneous point projection H·p." },
          code: `warped = cv2.warpPerspective(img1, H, (280, 200), flags=cv2.INTER_LINEAR)\np = np.array([40.0, 40.0, 1.0])\np_proj = H @ p; p_proj /= p_proj[2]\nprint("Projected (40,40) ->", np.round(p_proj[:2], 1), "| Target:", dst[0])`,
          expected: { uz: "Proyeksiya nuqtasi [55.0, 50.0] ga aniq tushadi.", en: "Projected corner hits target [55.0, 50.0] cleanly." }
        },
        {
          title: { uz: "3-qadam: Chiziqli Alpha Feathering Blending", en: "Step 3: Linear Alpha Feathering Across Overlap" },
          desc: { uz: "Ustma-ust tushgan sohada chiziqli α gradient maskasi bilan ikkita tasvirni silliq birlashtiring.", en: "Blend overlapping warped views smoothly using a linear alpha ramp." },
          code: `alpha = np.linspace(1.0, 0.0, 60, dtype=np.float32)[None, :, None]\nleft_patch = img1[:, 140:200].astype(np.float32)\nright_patch = warped[:, 140:200].astype(np.float32)\nblended = (alpha * left_patch + (1 - alpha) * right_patch).astype(np.uint8)\nprint("Feathering overlap shape:", blended.shape)`,
          expected: { uz: "60 piksel kenglikdagi chiziqli silliq chok bloki yaratiladi.", en: "Produces a seamless 60-px feathered overlap strip." }
        }
      ],
      vivaQuestions: [
        { q: { uz: "3×3 Gomografiya matritsasi nechta erkin parametrga ega va kamida nechta nuqta juftligi kerak?", en: "How many DOF does a 3×3 Homography have, and what is the minimum number of point pairs?" }, a: { uz: "8 ta erkin parametr (DOF), shuning uchun kamida 4 ta kollinear bo'lmagan nuqta juftligi kerak.", en: "8 DOF, requiring at least 4 non-collinear point pairs." } },
        { q: { uz: "Teskari xaritalash (inverse warping) bo'lmaganida chiqish rasmi qanday buziladi?", en: "Why does forward warping fail compared to inverse warping?" }, a: { uz: "Butun piksellar kasr koordinataga tushib, chiqish tasvirida ko'plab qora bo'sh teshiklar (holes) qolib ketadi.", en: "Input integer pixels map sparsely, leaving black holes in the output image." } },
        { q: { uz: "Ko'p tasvirli panoramalarda qaysi blending usuli ekspozitsiya farqini eng yaxshi yashiradi?", en: "Which blending method best hides exposure seams across panoramic stitches?" }, a: { uz: "Ko'p masshtabli (Multi-band / Laplacian Pyramid) blending.", en: "Multi-band (Laplacian pyramid) blending." } }
      ]
    },
    10: {
      theoryRecap: {
        uz: "<p><strong>Pinhole kamera</strong> 3D $(X,Y,Z)$ nuqtani $\\lambda[u, v, 1]^\\top = K[R|t][X,Y,Z,1]^\\top$ orqali 2D pikselga tushiradi. Bunda $K$ — fokal masofa $(f_x, f_y)$ va markaz $(c_x, c_y)$, $[R|t]$ esa kameraning 3D fazodagi burilishi va siljishi.</p>",
        en: "<p>The <strong>pinhole projection</strong> maps 3D world coordinates via $\\lambda[u, v, 1]^\\top = K[R|t][X,Y,Z,1]^\\top$, combining camera extrinsics $[R|t]$ and intrinsics $K$.</p>"
      },
      pitfalls: {
        uz: [
          "Proyeksiya tenglamasidan chiqqan [x', y', w'] vektorni oxirgi komponent w' (= Z) ga BO'LISHNI unutmang!",
          "3D burilishda kichik X/Y/Z burchaklari uchun cv2.Rodrigues() aylanish vektorini 3×3 R matritsaga aylantiradi.",
          "Z <= 0 (kamera orqasidagi nuqtalar) tekshirilmasa teskari tasvir chizilib qoladi."
        ],
        en: [
          "Remember perspective divide by the 3rd homogeneous coordinate w (depth Z)!",
          "Use cv2.Rodrigues() to convert 3D axis-angle rotation vectors into 3×3 matrices R.",
          "Filter points with Z <= 0 behind the camera before projecting."
        ]
      },
      guidedSteps: [
        {
          title: { uz: "1-qadam: Qo'lda P = K[R|t] Matritsasini Tuzish & Proyeksiya", en: "Step 1: Manual Homogeneous Projection P = K[R|t]" },
          desc: { uz: "3D kub uchlarini K[R|t] orqali 2D tasvir tekisligiga tushirib ko'ring.", en: "Project 3D cube vertices manually using P = K[R|t] and perspective divide." },
          code: `import cv2, numpy as np\nK = np.array([[800., 0, 320.], [0, 800., 240.], [0, 0, 1.]])\nR = np.eye(3); t = np.array([[0.], [0.], [5.0]])  # 5 metr oldinda\nP = K @ np.hstack([R, t])\ncube = np.array([[-1,-1,-1,1],[1,-1,-1,1],[1,1,-1,1],[-1,1,-1,1]], dtype=float).T\nhom = P @ cube; uv = (hom[:2] / hom[2]).T\nprint("Manual projected 2D corners:\\n", np.round(uv, 1))`,
          expected: { uz: "4 ta burchak (120..520, 40..440) piksel tekisligiga tushadi.", en: "Projects the 4 front corners symmetrically around (320, 240)." }
        },
        {
          title: { uz: "2-qadam: cv2.projectPoints() Bilan Tekshiruv", en: "Step 2: Verify Against cv2.projectPoints()" },
          desc: { uz: "Qo'lda hisoblangan (u, v) ni OpenCV cv2.projectPoints natijasi bilan taqqoslang.", en: "Compare manual homogeneous projections against cv2.projectPoints." },
          code: `rvec, _ = cv2.Rodrigues(R)\npts_cv, _ = cv2.projectPoints(cube[:3].T, rvec, t, K, None)\ndiff = np.abs(pts_cv.reshape(-1, 2) - uv).max()\nprint("Max error Manual vs OpenCV:", diff)`,
          expected: { uz: "Max error < 1e-10 (100% mos!).", en: "Max discrepancy < 1e-10 pixels." }
        },
        {
          title: { uz: "3-qadam: Chuqurlik Z O'zgarishini (Foreshortening) Chizish", en: "Step 3: Observe Perspective Foreshortening Across Depth Z" },
          desc: { uz: "Z = 2m dan 20m gacha oshganda kub qirrasining pikseldagi kichrayishini o'lchang.", en: "Measure projected pixel edge length as depth Z grows from 2m to 20m." },
          code: `for Z in [2.0, 5.0, 10.0, 20.0]:\n    px_width = 800.0 * (2.0 / Z)  # 2 metrli qirra kengligi\n    print(f"Z={Z:4.1f} m -> projected width = {px_width:6.1f} px")`,
          expected: { uz: "Z 2× oshganda piksel kengligi 2× kamayadi (1/Z).", en: "Projected width halves whenever depth Z doubles." }
        }
      ],
      vivaQuestions: [
        { q: { uz: "Gomogen koordinatalar (X, Y, Z, 1)ᵀ nima uchun 3D→2D proyeksiyada qo'llaniladi?", en: "Why use homogeneous coordinates (X, Y, Z, 1)ᵀ in camera geometry?" }, a: { uz: "Siljish (+t) va perspektiv bo'lish (÷Z) amallarini yagona 3×4 chiziqli matritsa ko'paytmasiga birlashtirish uchun.", en: "Unifies translation and projective scaling into a single linear 3×4 matrix multiplication." } },
        { q: { uz: "Ichki parametrlar matritsasi K dagi (cx, cy) nimani bildiradi?", en: "What do (cx, cy) represent inside camera intrinsic matrix K?" }, a: { uz: "Optik o'qning tasvir tekisligi bilan kesishgan asosiy nuqta (principal point, odatda rasm markazi) koordinatalari.", en: "The principal point where the optical axis pierces the image plane (typically ~W/2, ~H/2)." } },
        { q: { uz: "Kalibrlangan E (Essential) va kalibrlanmagan F (Fundamental) matritsa orasidagi farq nima?", en: "Distinguish Essential matrix E from Fundamental matrix F." }, a: { uz: "E ichki matritsa K ma'lum bo'lganda normallangan koordinatada ishlaydi (5 DOF); F esa to'g'ridan-to'g'ri piksel koordinatalarida (rank=2, 7 DOF).", en: "E operates in calibrated normalized coordinates (5 DOF); F operates directly in pixel coordinates (7 DOF)." } }
      ]
    },
    11: {
      theoryRecap: {
        uz: "<p><strong>Zhang kalibrlash usuli</strong> shaxmat taxtasining bir necha burchakdan olingan tasvirlaridan ichki $K$ va radial ($k_1, k_2, k_3$) / tangensial ($p_1, p_2$) distorsiyani topadi. <strong>Stereo ko'rishda</strong> esa rektifikatsiya qilingan ikki tasvirdan disparitet $d$ topilib, $Z = fB/d$ bilan chuqurlik hisoblanadi.</p>",
        en: "<p><strong>Zhang calibration</strong> recovers intrinsics $K$ and lens distortion from chessboard views. <strong>Stereo vision</strong> computes disparity $d$ along rectified horizontal scanlines to triangulate depth $Z = fB/d$.</p>"
      },
      pitfalls: {
        uz: [
          "findChessboardCorners(gray, (cols, rows)) da taxtadagi ICHKI burchaklar soni beriladi (8×8 katakli shaxmat = (7, 7)!).",
          "StereoSGBM disparitetni 16 ga ko'paytirib fixed-point qaytaradi — metrga o'tishda 16.0 ga bo'lishni unutmang!",
          "Shaxmat taxtasini faqat kamera oldida tekis tutmang — kadr chetlari va 30° burilishlar kiriting."
        ],
        en: [
          "Pass INNER corner count (e.g. (7,7) for an 8×8 board) into cv2.findChessboardCorners.",
          "Divide StereoSGBM int16 output by 16.0 to get true floating-point disparity in pixels!",
          "Capture tilted & corner-covering chessboard frames to estimate radial distortion accurately."
        ]
      },
      guidedSteps: [
        {
          title: { uz: "1-qadam: Sintetik Shaxmat Taxtasi Yaratish & Burchaklarni Topish", en: "Step 1: Generate Chessboard & Detect Subpixel Corners" },
          desc: { uz: "7×5 ichki burchakli shaxmat taxtasini yaratib findChessboardCorners + cornerSubPix ni sinang.", en: "Synthesize a chessboard pattern and locate corners at subpixel precision." },
          code: `import cv2, numpy as np\ncb = np.zeros((240, 320), np.uint8)\nsz = 30\nfor r in range(6):\n    for c in range(8):\n        if (r + c) % 2 == 0: cb[30+r*sz:30+(r+1)*sz, 40+c*sz:40+(c+1)*sz] = 255\nfound, corners = cv2.findChessboardCorners(cb, (7, 5), None)\nprint("Chessboard found:", found, "| Corners:", 0 if corners is None else len(corners))`,
          expected: { uz: "Chessboard found: True | Corners: 35 chiqadi.", en: "Detects all 35 inner corners (7×5)." }
        },
        {
          title: { uz: "2-qadam: Barrel Distorsiya Simulatsiyasi va LUT Undistort", en: "Step 2: Simulate Barrel Distortion & Remap Undistortion" },
          desc: { uz: "k1=-0.35 bilan barrel distorsiya hosil qilib initUndistortRectifyMap + remap bilan tuzating.", en: "Apply radial distortion parameters and rectify frames quickly using cv2.remap." },
          code: `K = np.array([[500., 0, 160.], [0, 500., 120.], [0, 0, 1.]])\ndist = np.array([-0.35, 0.1, 0.0, 0.0, 0.0])\nundist = cv2.undistort(cb, K, dist)\nmap1, map2 = cv2.initUndistortRectifyMap(K, dist, None, K, (320, 240), cv2.CV_16SC2)\nfast_undist = cv2.remap(cb, map1, map2, cv2.INTER_LINEAR)\nprint("Fast remap error vs undistort:", np.abs(undist.astype(int) - fast_undist.astype(int)).mean().round(2))`,
          expected: { uz: "Tezkor remap natijasi undistort bilan deyarli bir xil chiqadi.", en: "Fast LUT remap closely matches full undistort." }
        },
        {
          title: { uz: "3-qadam: StereoBM / SGBM Disparitet va Z = f·B / d Chuqurlik", en: "Step 3: StereoSGBM Disparity & Depth Triangulation" },
          desc: { uz: "Siljigan stereo juftlikda StereoSGBM bilan disparitet toping va chuqurlikni metrda hisoblang.", en: "Compute disparity on a shifted stereo pair and convert to metric depth Z." },
          code: `left = cb.copy()\nright = np.roll(left, -18, axis=1)  # haqiqiy siljish d = 18 px\nsgbm = cv2.StereoSGBM_create(minDisparity=0, numDisparities=32, blockSize=5)\ndisp = sgbm.compute(left, right).astype(np.float32) / 16.0\nvalid = disp[disp > 1]\nf, B = 800.0, 0.12\nprint(f"Median disp={np.median(valid):.1f} px -> Z={(f*B/np.median(valid)):.2f} m (Expected {f*B/18:.2f} m)")`,
          expected: { uz: "Median disparitet ~18 px, chuqurlik ~5.33 m chiqadi.", en: "Median disparity matches ~18 px (~5.33 m depth)." }
        }
      ],
      vivaQuestions: [
        { q: { uz: "StereoSGBM.compute() qaytargan qiymatni nima uchun 16.0 ga bo'lamiz?", en: "Why divide OpenCV StereoSGBM output by 16.0?" }, a: { uz: "OpenCV aniqlikni saqlash uchun subpiksel disparitetni 4 kasr bit (×16) bilan 16-bit butun son sifatida saqlaydi.", en: "OpenCV encodes fixed-point disparities with 4 fractional bits (scaled by 16)." } },
        { q: { uz: "Bochkasimon (barrel) distorsiyani tuzatish uchun k1 koeffitsienti qanday ishorali bo'ladi?", en: "What sign does k1 typically have for Barrel distortion?" }, a: { uz: "Manfiy (k1 < 0) — burchaklar markazga nisbatan siqilgan bo'ladi; pincushion da esa musbat.", en: "Negative (k1 < 0) for wide-angle barrel distortion; positive for pincushion." } },
        { q: { uz: "Z = f·B/d formulasiga ko'ra kamera uzoqlashganda aniqlik nega yomonlashadi?", en: "Why does stereo depth accuracy drop sharply at long range?" }, a: { uz: "ΔZ ≈ Z²/(f·B)·Δd — xato masofaning kvadratiga proporsional ortadi.", en: "Because ΔZ grows quadratically with Z²." } }
      ]
    },
    12: {
      theoryRecap: {
        uz: "<p><strong>Viola-Jones (2001)</strong> Haar xususiyatlari + <strong>Integral tasvir O(1)</strong> + AdaBoost kaskadini birlashtiradi. Piyodalarni aniqlashda esa <strong>HOG + Chiziqli SVM</strong> (64×128 oyna = 3780 belgi) klassik standartdir.</p>",
        en: "<p><strong>Viola-Jones (2001)</strong> fuses Haar features + <strong>O(1) Integral Image</strong> + AdaBoost cascades, while <strong>HOG + Linear SVM</strong> detects pedestrians via 3,780-D silhouette vectors.</p>"
      },
      pitfalls: {
        uz: [
          "cv2.integral(gray) chiqish matritsasi (H+1, W+1) o'lchamda (0-qator va 0-ustun qo'shilgan) bo'ladi!",
          "CascadeClassifier ga grayscale tasvir va scaleFactor > 1.0 (masalan 1.1) berilishi shart.",
          "minNeighbors=0 qo'ysangiz bir yuz ustida 30+ ortiqcha ramka chiqadi."
        ],
        en: [
          "cv2.integral(gray) returns shape (H+1, W+1) with zero top row/left col padding.",
          "Always feed grayscale images and scaleFactor > 1.0 (e.g. 1.1) to detectMultiScale().",
          "Setting minNeighbors=0 outputs dozens of duplicate overlapping detections per face."
        ]
      },
      guidedSteps: [
        {
          title: { uz: "1-qadam: cv2.integral() bilan O(1) To'rtburchak Yig'indisi", en: "Step 1: Constant-Time Box Sum via Integral Image" },
          desc: { uz: "Istalgan (y1:y2, x1:x2) soha yig'indisini oddiy NumPy sum() bilan tekshiring.", en: "Verify O(1) 4-lookup integral image sums against direct np.sum()." },
          code: `import cv2, numpy as np\nimg = np.arange(1, 26, dtype=np.uint8).reshape(5, 5)\nII = cv2.integral(img)\ny1, y2, x1, x2 = 1, 4, 2, 5\nfast_sum = II[y2, x2] - II[y1, x2] - II[y2, x1] + II[y1, x1]\nprint("Direct:", int(img[y1:y2, x1:x2].sum()), "| Integral O(1):", int(fast_sum))`,
          expected: { uz: "Direct va Integral O(1) qiymatlari 100% teng chiqadi.", en: "Direct sum equals O(1) integral sum exactly." }
        },
        {
          title: { uz: "2-qadam: Haar Cascade Yuz Detektori Parametrlari", en: "Step 2: Run Haar Cascade with Tuned scaleFactor" },
          desc: { uz: "Haar yuz kaskadini yuklab, minNeighbors ni 2 dan 6 gacha o'zgartirish natijasini solishtiring.", en: "Load OpenCV Haar cascade and sweep minNeighbors values." },
          code: `clf = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')\nblank = np.full((240, 320), 128, np.uint8)\nfor mn in [2, 5]:\n    faces = clf.detectMultiScale(blank, scaleFactor=1.1, minNeighbors=mn, minSize=(30, 30))\n    print(f"minNeighbors={mn} -> faces={len(faces)}")`,
          expected: { uz: "Kaskad XML muvaffaqiyatli yuklanib ishlaydi.", en: "Loads Haar XML cleanly and reports detections." }
        },
        {
          title: { uz: "3-qadam: HOG + Default People Detector", en: "Step 3: Initialize 3,780-D HOG Pedestrian Detector" },
          desc: { uz: "cv2.HOGDescriptor() yordamida HOG belgi uzunligi va detectMultiScale tezligini tekshiring.", en: "Inspect cv2.HOGDescriptor() feature size and run multi-scale inference." },
          code: `hog = cv2.HOGDescriptor(); hog.setSVMDetector(cv2.HOGDescriptor_getDefaultPeopleDetector())\nprint("HOG descriptor size:", hog.getDescriptorSize())`,
          expected: { uz: "HOG descriptor size: 3780 chiqadi.", en: "Prints 3780 features matching 64×128 HOG math." }
        }
      ],
      vivaQuestions: [
        { q: { uz: "Integral tasvir nega Viola-Jones tezligining asosi hisoblanadi?", en: "Why is the Integral Image crucial for Viola-Jones real-time speed?" }, a: { uz: "Istalgan kattalikdagi Haar to'rtburchak farqini O(W·H) loop siz, atigi 4 ta qo'shish/ayirish O(1) da hisoblaydi.", en: "Evaluates arbitrary-size Haar boxes in O(1) constant time (4 lookups)." } },
        { q: { uz: "scaleFactor=1.05 va 1.40 orasidagi tezlik/aniqlik farqi qanday?", en: "Compare scaleFactor=1.05 vs 1.40 in detectMultiScale()." }, a: { uz: "1.05 ko'proq masshtabni tekshiradi (yuqori aniqlik, lekin sekinroq); 1.40 tezroq, ammo oraliq o'lchamdagi yuzlarni o'tkazib yuboradi.", en: "1.05 scans finer pyramid scales (higher recall, slower); 1.40 is faster but misses intermediate sizes." } },
        { q: { uz: "Haar kaskad qaysi holatlarda RetinaFace/YOLO dan yutqazadi?", en: "Where do Haar cascades fail compared to YOLO-Face?" }, a: { uz: "Yon/burilgan yuzlar, niqob/to'silish va keskin soya sharoitida.", en: "Profile poses, rotations, masks/occlusion, and harsh shadows." } }
      ]
    },
    13: {
      theoryRecap: {
        uz: "<p>O'zgaruvchan sonli SIFT deskriptorlarini <strong>Bag of Visual Words (BoVW)</strong> $K$-bin gistogrammasiga aylantiramiz. Klassifikatordan keyin Chalkashlik Matritsasi ($TP, FP, FN, TN$) orqali <strong>Precision, Recall, F1 va ROC-AUC</strong> baholanadi.</p>",
        en: "<p><strong>Bag of Visual Words (BoVW)</strong> pools variable keypoint descriptors into fixed $K$-bin histograms, evaluated via Confusion Matrix metrics: <strong>Precision, Recall, F1 &amp; ROC-AUC</strong>.</p>"
      },
      pitfalls: {
        uz: [
          "StandardScaler va k-Means lug'atini FAQAT X_train ustida fit() qiling — X_test da aslo fit() qilmang (data leakage!).",
          "Nomutanosib sinflarda faqat Accuracy ga qaramang; classification_report() da F1-macro va PR-AUC ni tekshiring.",
          "StratifiedKFold ishlatingki, har foldda sinflar nisbati bir xil saqlansin."
        ],
        en: [
          "Fit BoVW k-means vocabulary and StandardScaler on X_train ONLY to prevent data leakage.",
          "Never trust Accuracy alone on skewed sets; report macro-F1 and Precision-Recall curves.",
          "Use StratifiedKFold so minority classes appear consistently in every fold."
        ]
      },
      guidedSteps: [
        {
          title: { uz: "1-qadam: k-Means bilan K=32 Vizual So'zlar Lug'ati (BoVW)", en: "Step 1: Build K=32 Visual Vocabulary (BoVW)" },
          desc: { uz: "Sintetik 128D deskriptorlardan k-Means klasterlar qurib rasmlarni K-bin gistogrammaga aylantiring.", en: "Cluster synthetic descriptors via KMeans and build L2-normalized BoVW histograms." },
          code: `from sklearn.cluster import KMeans\nimport numpy as np\nrng = np.random.default_rng(0)\ndesc_train = rng.normal(size=(300, 128))\nvocab = KMeans(n_clusters=16, n_init=5, random_state=0).fit(desc_train)\n# Bitta rasm uchun 20 ta deskriptordan gistogramma:\nimg_desc = rng.normal(size=(20, 128))\nwords = vocab.predict(img_desc)\nhist, _ = np.histogram(words, bins=np.arange(17))\nhist = hist / np.linalg.norm(hist)\nprint("BoVW histogram L2 norm:", round(np.linalg.norm(hist), 3), "| len:", len(hist))`,
          expected: { uz: "Har rasm uzunligi 16 ga teng L2 normallangan vektorga aylanadi.", en: "Encodes variable descriptors into an L2-unit 16-bin histogram." }
        },
        {
          title: { uz: "2-qadam: Stratifikatsiyalangan Bo'linish & Confusion Matrix", en: "Step 2: Stratified Split & Confusion Matrix Metrics" },
          desc: { uz: "Chalkashlik matritsasidan Precision, Recall, F1 va Accuracy ni avtomatik hisoblang.", en: "Compute Confusion Matrix and Precision/Recall/F1 with scikit-learn." },
          code: `from sklearn.metrics import confusion_matrix, precision_recall_fscore_support\ny_true = np.array([1]*45 + [0]*55)\ny_pred = np.array([1]*40 + [0]*5 + [1]*10 + [0]*45)\np, r, f1, _ = precision_recall_fscore_support(y_true, y_pred, average='binary')\nprint("CM:\\n", confusion_matrix(y_true, y_pred))\nprint(f"Prec={p:.3f}, Recall={r:.3f}, F1={f1:.3f}")`,
          expected: { uz: "Prec=0.800, Recall=0.889, F1=0.842 chiqadi.", en: "Verifies Prec=0.800, Recall=0.889, F1=0.842." }
        },
        {
          title: { uz: "3-qadam: 5-Fold Cross Validation Barqarorligi", en: "Step 3: 5-Fold Stratified Cross Validation" },
          desc: { uz: "StratifiedKFold bilan o'rtacha aniqlik va standart og'ishni hisoblang.", en: "Run 5-Fold Stratified Cross Validation and inspect mean ± std." },
          code: `from sklearn.model_selection import StratifiedKFold, cross_val_score\nfrom sklearn.linear_model import LogisticRegression\nX_toy = np.vstack([rng.normal(0, 1, (50, 8)), rng.normal(1.2, 1, (50, 8))])\ny_toy = np.array([0]*50 + [1]*50)\nscores = cross_val_score(LogisticRegression(), X_toy, y_toy, cv=StratifiedKFold(5))\nprint(f"5-Fold CV Accuracy: {scores.mean():.3f} ± {scores.std():.3f}")`,
          expected: { uz: "5 ta fold bo'yicha o'rtacha aniqlik va ± og'ish chiqadi.", en: "Reports mean CV accuracy and fold-to-fold variance." }
        }
      ],
      vivaQuestions: [
        { q: { uz: "BoVW da lug'at hajmi K juda kichik (K=4) yoki juda katta (K=50,000) bo'lsa nima yuz beradi?", en: "What happens if BoVW codebook size K is too small vs too large?" }, a: { uz: "Juda kichik K har xil shakllarni bitta so'zga qo'shib yuboradi (underfitting); juda katta K esa siyrak vektor va overfitting beradi.", en: "Too small merges distinct features (underfit); too large creates sparse, overfitted histograms." } },
        { q: { uz: "Nima uchun Data Leakage test aniqligini sun'iy oshirib yuboradi?", en: "Why does data leakage inflate test scores artificially?" }, a: { uz: "Test namunalari haqidagi statistik ma'lumot (mean/std/klasterlar) o'qitish bosqichiga sizib kirib, model ko'rmagan ma'lumotni oldindan 'bilib' oladi.", en: "Statistics from test data leak into preprocessing/training, falsely boosting offline metrics." } },
        { q: { uz: "Precision=1.0, Recall=0.20 chiqqan model qanday xatti-harakat qilyapti?", en: "Describe the behavior of a model with Precision=1.0 and Recall=0.20." }, a: { uz: "Model juda ehtiyotkor — faqat eng aniq 20% musbatlarni topib, qolgan 80% haqiqiy obyektlarni o'tkazib yubormoqda.", en: "Overly conservative: predicts positive rarely with zero false alarms, missing 80% of real positives." } }
      ]
    },
    14: {
      theoryRecap: {
        uz: "<p><strong>k-NN</strong> test nuqtasiga eng yaqin $k$ ta qo'shni bo'yicha ovoz beradi (feature scaling majburiy!). <strong>SVM</strong> maksimal marjali gipertekislik quradi; chiziqli ajralmaydigan nuqtalarda <strong>RBF Kernel ($C, \\gamma$)</strong> silliq egri chegara yaratadi.</p>",
        en: "<p><strong>k-NN</strong> classifies by distance voting (requires scaling!). <strong>SVM</strong> maximizes class margin using Support Vectors, with <strong>RBF kernels ($C, \\gamma$)</strong> modeling smooth non-linear boundaries.</p>"
      },
      pitfalls: {
        uz: [
          "StandardScaler() ni sklearn.pipeline.make_pipeline() ichiga qo'ymasangiz katta shkaladagi belgi (0..10000) kichik shkalani (0..1) bosib ketadi!",
          "k-NN da k juft bo'lsa ikki sinfda teng ovoz (tie) chiqishi mumkin — toq k (3, 5, 7) tanlang.",
          "SVM da C va gamma ni bir vaqtning o'zida juda katta (C=1000, gamma=100) qo'ysangiz qattiq overfitting bo'ladi."
        ],
        en: [
          "Always wrap StandardScaler inside sklearn Pipeline before k-NN or SVM!",
          "Choose odd values of k (3, 5, 7) for binary k-NN to avoid vote ties.",
          "Extreme C and gamma together cause severe RBF SVM overfitting."
        ]
      },
      guidedSteps: [
        {
          title: { uz: "1-qadam: StandardScaler + k-NN da k=1..15 Tuning", en: "Step 1: k-NN Hyperparameter Sweep with Scaling" },
          desc: { uz: "make_moons chiziqli ajralmaydigan datasetda k=[1, 3, 5, 11] uchun aniqlikni tekshiring.", en: "Evaluate k=[1, 3, 5, 11] with StandardScaler on synthetic non-linear moons data." },
          code: `from sklearn.datasets import make_moons\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.neighbors import KNeighborsClassifier\nX, y = make_moons(n_samples=300, noise=0.25, random_state=42)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, stratify=y, random_state=42)\nfor k in [1, 3, 5, 11]:\n    acc = make_pipeline(StandardScaler(), KNeighborsClassifier(k)).fit(X_tr, y_tr).score(X_te, y_te)\n    print(f"k={k:2d} -> Test Acc = {acc:.3f}")`,
          expected: { uz: "k=5..11 shovqinda k=1 dan barqarorroq test aniqligini ko'rsatadi.", en: "Moderate k=5..11 generalizes better than noisy k=1." }
        },
        {
          title: { uz: "2-qadam: Linear vs RBF SVM va Tayanch Vektorlar Soni", en: "Step 2: Compare Linear vs RBF Kernel SVM" },
          desc: { uz: "Bir xil ma'lumotda linear, poly va rbf yadrolarini solishtiring.", en: "Compare Linear, Polynomial, and RBF SVM kernels on make_moons." },
          code: `from sklearn.svm import SVC\nfor kern in ['linear', 'poly', 'rbf']:\n    pipe = make_pipeline(StandardScaler(), SVC(kernel=kern, C=1.0)).fit(X_tr, y_tr)\n    print(f"Kernel={kern:6s} -> Acc={pipe.score(X_te, y_te):.3f} | Support Vectors={pipe[-1].n_support_}")`,
          expected: { uz: "RBF kernel chiziqli ajralmaydigan oy shaklda Linear dan ancha yuqori oladi.", en: "RBF beats Linear cleanly on non-linear moons data." }
        },
        {
          title: { uz: "3-qadam: GridSearchCV Bilan Optimal (C, gamma) Topish", en: "Step 3: Tune RBF (C, gamma) via GridSearchCV" },
          desc: { uz: "C va gamma to'rida eng yaxshi CV natijani beruvchi SVM parametrlarini toping.", en: "Search C and gamma combinations cleanly using GridSearchCV." },
          code: `from sklearn.model_selection import GridSearchCV\ngrid = GridSearchCV(make_pipeline(StandardScaler(), SVC(kernel='rbf')), {'svc__C': [0.1, 1, 10], 'svc__gamma': [0.1, 1, 5]}, cv=5).fit(X_tr, y_tr)\nprint("Best params:", grid.best_params_, "| Test Acc:", round(grid.score(X_te, y_te), 3))`,
          expected: { uz: "Eng yaxshi (C, gamma) juftligi va test aniqligi chiqadi.", en: "Reports best CV hyperparameters and final test accuracy." }
        }
      ],
      vivaQuestions: [
        { q: { uz: "k-NN da xususiyatlarni normallashtirish (StandardScaler) unutib qo'yilsa nima bo'ladi?", en: "What happens to k-NN if one feature is in [0..10000] and another in [0..1] without scaling?" }, a: { uz: "Katta shkalali belgi Yevklid masofasini to'liq egallab oladi, kichik shkalali belgi e'tiborsiz qoladi.", en: "The large-scale feature completely dominates Euclidean distances, muting other features." } },
        { q: { uz: "SVM dagi qaysi nuqtalar olib tashlansa ham ajratuvchi gipertekislik o'zgarmaydi?", en: "Which training samples can be removed without changing a trained SVM hyperplane?" }, a: { uz: "Marjadan tashqarida yotgan, tayanch vektor bo'lmagan barcha oddiy nuqtalar!", en: "All non-support vectors lying strictly outside the margin." } },
        { q: { uz: "RBF yadrosida gamma juda kichik (0.001) bo'lganda chegara qanday shaklga kiradi?", en: "What happens to an RBF SVM boundary as gamma becomes very small?" }, a: { uz: "Har nuqtaning ta'siri butun fazoga yoyilib, chegara deyarli chiziqli tekislikka yaqinlashadi (underfitting xavfi).", en: "The wide Gaussian radius flattens the boundary toward a near-linear underfit." } }
      ]
    },
    15: {
      theoryRecap: {
        uz: "<p>PyTorch da chuqur o'qitish uchun tasvirlar <code>Dataset</code> va <code>DataLoader</code> orqali <strong>NCHW float32</strong> mini-batchlarga yig'iladi. <strong>Data Augmentation</strong> (<code>RandomHorizontalFlip</code>, <code>ColorJitter</code>) tasvir xilma-xilligini oshirib overfittingni kamaytiradi.</p>",
        en: "<p>PyTorch vision training wraps images in <code>Dataset</code> + <code>DataLoader</code> yielding <strong>NCHW float32</strong> mini-batches, leveraging label-preserving <strong>Data Augmentation</strong> to fight overfitting.</p>"
      },
      pitfalls: {
        uz: [
          "ToTensor() [0..255] uint8 HWC tasvirni [0.0..1.0] float32 CHW ga o'tkazadi — qo'lda yana /255 bo'lmang!",
          "Validatsiya / Test DataLoader ga RandomHorizontalFlip yoki ColorJitter QO'YILMAYDI (faqat Resize + Normalize!).",
          "Train DataLoader da shuffle=True, Val/Test da shuffle=False bo'lishi kerak."
        ],
        en: [
          "T.ToTensor() already divides uint8 pixels by 255 — do NOT divide by 255 again!",
          "Validation & Test transforms must remain deterministic (no random flips/crops).",
          "Keep shuffle=True on training DataLoader and shuffle=False on val/test."
        ]
      },
      guidedSteps: [
        {
          title: { uz: "1-qadam: Custom PyTorch Dataset Sinfini Yozish", en: "Step 1: Build a Custom PyTorch Tensor Dataset" },
          desc: { uz: "__len__ va __getitem__ metodli SyntheticCVDataset yarating va bitta namunani tekshiring.", en: "Implement __len__ and __getitem__ in a custom PyTorch Dataset." },
          code: `import torch\nfrom torch.utils.data import Dataset, DataLoader, random_split\nclass SyntheticCVDataset(Dataset):\n    def __init__(self, n=120, n_cls=3):\n        self.x = torch.rand(n, 3, 32, 32)\n        self.y = torch.arange(n) % n_cls\n    def __len__(self): return len(self.x)\n    def __getitem__(self, idx): return self.x[idx], self.y[idx]\nds = SyntheticCVDataset()\nprint("Dataset len:", len(ds), "| Sample0 shape:", ds[0][0].shape, "label:", ds[0][1].item())`,
          expected: { uz: "Sample0 shape: torch.Size([3, 32, 32]) chiqadi.", en: "Returns CHW tensor (3, 32, 32) and integer class label." }
        },
        {
          title: { uz: "2-qadam: 80/20 random_split & Mini-Batch DataLoader", en: "Step 2: 80/20 Split & Shuffled Mini-Batch DataLoader" },
          desc: { uz: "Datasetni 80% Train va 20% Val ga bo'lib batch_size=16 bilan iteratsiya qiling.", en: "Split 80/20 via random_split and verify DataLoader batch shapes." },
          code: `train_ds, val_ds = random_split(ds, [96, 24], generator=torch.Generator().manual_seed(42))\ntrain_loader = DataLoader(train_ds, batch_size=16, shuffle=True)\nxb, yb = next(iter(train_loader))\nprint("Batch X shape:", tuple(xb.shape), "| Total batches:", len(train_loader))`,
          expected: { uz: "Batch X shape: (16, 3, 32, 32) | Total batches: 6.", en: "Confirms 6 mini-batches of shape (16, 3, 32, 32)." }
        },
        {
          title: { uz: "3-qadam: Augmentatsiya & WeightedRandomSampler (Nomutanosiblik)", en: "Step 3: Class Imbalance Weighting with WeightedRandomSampler" },
          desc: { uz: "Sinf nomutanosibligida kam uchraydigan sinfga kattaroq tortish vazni berishni ko'ring.", en: "Balance skewed class counts via sample weights." },
          code: `counts = torch.tensor([90.0, 10.0])  # 90% vs 10% nomutanosib sinflar\nclass_weights = 1.0 / counts\nprint("Inverse class weights for loss/sampler:", class_weights.tolist())`,
          expected: { uz: "Kam sinf (10%) uchun 9× kattaroq vazn beriladi.", en: "Assigns 9× higher weight to the minority class." }
        }
      ],
      vivaQuestions: [
        { q: { uz: "DataLoader da num_workers > 0 va pin_memory=True nima beradi?", en: "What do num_workers > 0 and pin_memory=True improve in PyTorch?" }, a: { uz: "CPU da rasmlarni parallel yuklab/augmentatsiya qilib, GPU bo'sh kutib qolmasligini ta'minlaydi.", en: "Parallelize CPU decoding/augmentation and accelerate host-to-GPU transfers." } },
        { q: { uz: "Validation to'plamida nima uchun RandomHorizontalFlip qo'llanmaydi?", en: "Why shouldn't Validation sets use random data augmentation?" }, a: { uz: "Har safar har xil tasvir tekshirilsa validation aniqligi o'ynab ketadi va epoxalararo taqqoslash buziladi.", en: "Deterministic evaluation is required to compare validation scores fairly across epochs." } },
        { q: { uz: "OpenCV (H, W, 3) numpy massivini PyTorch (1, 3, H, W) tensorga qanday o'giramiz?", en: "How do you convert an OpenCV (H, W, 3) array into a PyTorch (1, 3, H, W) tensor?" }, a: { uz: "torch.from_numpy(img[:,:,::-1].copy()).permute(2,0,1).unsqueeze(0).float() / 255.0.", en: "Flip BGR→RGB, permute HWC→CHW, unsqueeze batch dim, cast float/255." } }
      ]
    },
    16: {
      theoryRecap: {
        uz: "<p><code>nn.Conv2d</code> va <code>nn.MaxPool2d</code> yordamida noldan CNN qurishda chiqish o'lchami $O = \\lfloor(I - K + 2P)/S\\rfloor + 1$ formulasi asosida nazorat qilinadi. <code>nn.AdaptiveAvgPool2d((1,1))</code> har qanday kirish o'lchamini tekis vektorga keltiradi.</p>",
        en: "<p>Building CNNs from scratch tracks tensor dimensions via $O = \\lfloor(I - K + 2P)/S\\rfloor + 1$. Pairing <code>nn.AdaptiveAvgPool2d(1)</code> decouples classifier heads from fixed input sizes.</p>"
      },
      pitfalls: {
        uz: [
          "Conv2d dan Linear ga o'tayotganda o'lcham mos kelmasa RuntimeError: mat1 and mat2 shapes cannot be multiplied chiqadi — AdaptiveAvgPool2d((1,1)) bilan xalos bo'ling!",
          "Conv2d -> BatchNorm2d qo'yilganda bias=False qilish parametrlarni tejaydi.",
          "Forward ichida shape xatolarini tutish uchun har blokdan keyin x.shape ni chop eting."
        ],
        en: [
          "Avoid Flatten() shape mismatches across resolutions by using nn.AdaptiveAvgPool2d((1,1)).",
          "Set bias=False on Conv2d immediately followed by BatchNorm2d.",
          "Trace intermediate layer tensor shapes with a dummy forward pass before training."
        ]
      },
      guidedSteps: [
        {
          title: { uz: "1-qadam: MiniCNN Arxitekturasini Yozish", en: "Step 1: Define a 3-Block MiniCNN Class" },
          desc: { uz: "2 ta Conv+BatchNorm+ReLU+MaxPool bloki va AdaptiveAvgPool li MiniCNN yozing.", en: "Implement MiniCNN with Conv-BN-ReLU-MaxPool blocks and AdaptiveAvgPool." },
          code: `import torch, torch.nn as nn\nclass MiniCNN(nn.Module):\n    def __init__(self, num_classes=4):\n        super().__init__()\n        self.features = nn.Sequential(\n            nn.Conv2d(3, 16, 3, padding=1), nn.BatchNorm2d(16), nn.ReLU(), nn.MaxPool2d(2),\n            nn.Conv2d(16, 32, 3, padding=1), nn.BatchNorm2d(32), nn.ReLU(), nn.MaxPool2d(2),\n            nn.AdaptiveAvgPool2d((1, 1))\n        )\n        self.classifier = nn.Linear(32, num_classes)\n    def forward(self, x):\n        return self.classifier(self.features(x).flatten(1))\nmodel = MiniCNN()\nprint("Params:", sum(p.numel() for p in model.parameters()))`,
          expected: { uz: "Parametrlar soni (~4.9K) hisoblab chiqariladi.", en: "Logs compact MiniCNN parameter count (~4.9K)." }
        },
        {
          title: { uz: "2-qadam: Turli O'lchamlarda Qatlam Shakllarini Kuzatish", en: "Step 2: Trace Intermediate Tensor Shapes" },
          desc: { uz: "Kirish (2, 3, 32, 32) va (2, 3, 64, 64) berilganda har bir qatlam shaklini tekshiring.", en: "Verify AdaptiveAvgPool handles both 32×32 and 64×64 inputs cleanly." },
          code: `for sz in [32, 64]:\n    out = model(torch.randn(2, 3, sz, sz))\n    print(f"Input {sz}x{sz} -> Logits shape: {tuple(out.shape)}")`,
          expected: { uz: "Har ikkalasi ham (2, 4) logit chiqaradi!", en: "Both resolutions cleanly produce (2, 4) logits!" }
        },
        {
          title: { uz: "3-qadam: Dilated vs Oddiy Conv Receptive Field Tekshiruvi", en: "Step 3: Test Dilated Conv2d with Zero Extra Weights" },
          desc: { uz: "dilation=2 bo'lgan 3×3 Conv ning parametr soni oddiy 3×3 bilan bir xilligini tasdiqlang.", en: "Verify dilation=2 uses identical parameter count to dilation=1 while expanding FOV." },
          code: `c1 = nn.Conv2d(16, 32, 3, padding=1, dilation=1)\nc2 = nn.Conv2d(16, 32, 3, padding=2, dilation=2)\nprint("Regular params:", sum(p.numel() for p in c1.parameters()), "| Dilated(2):", sum(p.numel() for p in c2.parameters()))`,
          expected: { uz: "Ikkalasi ham 4,640 ta parametr chiqaradi!", en: "Both report 4,640 parameters while dilation=2 covers 5×5 FOV." }
        }
      ],
      vivaQuestions: [
        { q: { uz: "3×3, padding=1, stride=1 qatlamda kirish H×W nega o'zgarmaydi?", en: "Why does 3×3 conv with padding=1, stride=1 preserve input H×W?" }, a: { uz: "O = (I - 3 + 2·1)/1 + 1 = I.", en: "Because (I - 3 + 2)/1 + 1 = I." } },
        { q: { uz: "nn.AdaptiveAvgPool2d((1,1)) oddiy Flatten() dan nimasi bilan xavfsizroq?", en: "Why is AdaptiveAvgPool2d(1) safer than raw Flatten()?" }, a: { uz: "Har qanday H×W rasm kelganda ham chiziqli qatlamga aniq C o'lchamli vektor beradi (shape crash bermaydi) va overfittingni kamaytiradi.", en: "Handles any spatial resolution without shape mismatches and dramatically reduces FC weights." } },
        { q: { uz: "MaxPool2d(2) da qancha o'qitiladigan parametr bor?", en: "How many trainable parameters does MaxPool2d(2) contain?" }, a: { uz: "0 ta.", en: "Zero." } }
      ]
    },
    17: {
      theoryRecap: {
        uz: "<p>PyTorch da to'liq o'qitish tsikli: <code>zero_grad() → forward → CrossEntropyLoss → backward() → step()</code>. Overfittingni jilovlash uchun <strong>Dropout</strong>, <strong>AdamW (Weight Decay)</strong>, <strong>Learning Rate Scheduler</strong> va <strong>Early Stopping</strong> qo'llaniladi.</p>",
        en: "<p>The PyTorch optimization cycle pairs raw logits + <code>CrossEntropyLoss</code> with <strong>AdamW</strong>, <strong>Dropout</strong>, <strong>LR schedulers</strong>, and validation-monitored <strong>Early Stopping</strong>.</p>"
      },
      pitfalls: {
        uz: [
          "optimizer.zero_grad() unutilsa gradientlar har batchda qo'shilib ketib model buziladi!",
          "Validatsiya loopida model.eval() va torch.no_grad() ni unutmang; keyingi epoxa boshida model.train() ga qaytaring!",
          "CrossEntropyLoss ga Softmax ehtimolliklari emas, xom logitlar uzatilishi shart."
        ],
        en: [
          "Never omit optimizer.zero_grad(), otherwise gradients accumulate infinitely across batches.",
          "Switch model.eval() + torch.no_grad() for validation, then restore model.train() next epoch.",
          "Pass raw logits—never Softmax outputs—into nn.CrossEntropyLoss()."
        ]
      },
      guidedSteps: [
        {
          title: { uz: "1-qadam: To'liq Train + Validation Siklini Ishga Tushirish", en: "Step 1: Run Complete Train & Validation Epochs" },
          desc: { uz: "MiniCNN ni sintetik ajraluvchi datasetda 8 epoxa o'qitib loss pasayishini kuzating.", en: "Train MiniCNN for 8 epochs on synthetic separable image classes and track loss/acc." },
          code: `import torch, torch.nn as nn\nX = torch.cat([torch.randn(60, 3, 16, 16) + 0.6, torch.randn(60, 3, 16, 16) - 0.6])\nY = torch.tensor([0]*60 + [1]*60)\nnet = nn.Sequential(nn.Conv2d(3, 8, 3, padding=1), nn.ReLU(), nn.AdaptiveAvgPool2d(1), nn.Flatten(), nn.Dropout(0.2), nn.Linear(8, 2))\nopt = torch.optim.AdamW(net.parameters(), lr=0.02, weight_decay=1e-2)\ncrit = nn.CrossEntropyLoss()\nfor ep in range(1, 9):\n    net.train(); opt.zero_grad(); loss = crit(net(X), Y); loss.backward(); opt.step()\n    net.eval()\n    with torch.no_grad(): acc = (net(X).argmax(1) == Y).float().mean().item()\n    print(f"Epoch {ep}: Loss={loss.item():.3f} | Acc={acc:.3f}")`,
          expected: { uz: "Loss ~0.70 dan <0.10 gacha tushib, Acc ~1.00 ga chiqadi.", en: "Loss drops steadily toward <0.10 with ~1.00 accuracy." }
        },
        {
          title: { uz: "2-qadam: CosineAnnealingLR Scheduler Qo'shish", en: "Step 2: Decay Learning Rate via CosineAnnealingLR" },
          desc: { uz: "Har epoxada o'qitish tezligining silliq pasayishini scheduler.get_last_lr() bilan chop eting.", en: "Attach CosineAnnealingLR and log smooth learning-rate decay per epoch." },
          code: `sched = torch.optim.lr_scheduler.CosineAnnealingLR(opt, T_max=8)\nfor ep in range(8):\n    sched.step()\nprint("Final decayed LR:", round(sched.get_last_lr()[0], 6))`,
          expected: { uz: "Oxirgi epoxada LR silliq nolga yaqinlashadi.", en: "Smoothly anneals LR down near zero." }
        },
        {
          title: { uz: "3-qadam: Best-Checkpoint Saqlash (Early Stopping Asosi)", en: "Step 3: Save Best Validation Checkpoint (torch.save)" },
          desc: { uz: "Faqat eng past val_loss yoki eng yuqori val_acc chiqqanda state_dict() saqlash.", en: "Save best model weights via state_dict() whenever validation improves." },
          code: `best_acc = 0.0\nif acc > best_acc:\n    best_acc = acc; torch.save(net.state_dict(), "best_a17.pt")\nprint("Saved best_a17.pt | best_acc:", best_acc)`,
          expected: { uz: "best_a17.pt vaznlar fayli saqlanadi.", en: "Persists best_a17.pt model checkpoint." }
        }
      ],
      vivaQuestions: [
        { q: { uz: "model.train() va model.eval() qaysi ikkita qatlam xulqini o'zgartiradi?", en: "Which two PyTorch layers behave differently between model.train() and model.eval()?" }, a: { uz: "Dropout (eval da o'chiriladi) va BatchNorm2d (eval da yig'ilgan running_mean/var ishlatadi).", en: "Dropout (disabled in eval) and BatchNorm (uses stored running mean/variance)." } },
        { q: { uz: "Learning rate juda katta tanlansa Loss egri chizig'ida qanday belgi ko'rinadi?", en: "What symptom appears in the loss curve if the learning rate is too high?" }, a: { uz: "Loss kamayish o'rniga keskin sakraydi yoki NaN (cheksizlik) ga portlaydi.", en: "Loss oscillates wildly or diverges to NaN." } },
        { q: { uz: "Early Stopping nimani anglatadi?", en: "What is Early Stopping?" }, a: { uz: "Train loss tushayotgan bo'lsa ham Validation loss o'sa boshlaganda o'qitishni to'xtatib, eng yaxshi checkpointni saqlash.", en: "Halting training and keeping the lowest-val-loss checkpoint before overfitting degrades generalization." } }
      ]
    },
    18: {
      theoryRecap: {
        uz: "<p><strong>Transfer Learning:</strong> ImageNet (1.2M rasm) da o'qitilgan <strong>ResNet / MobileNet / EfficientNet</strong> tayyor vaznlarini yuklab, oxirgi <code>fc</code>/<code>classifier</code> boshini yangi sinflar soniga moslash orqali 500 ta rasmda ham ≥90% aniqlikka tez erishish mumkin.</p>",
        en: "<p><strong>Transfer Learning</strong> loads pretrained ImageNet weights (ResNet, MobileNet, EfficientNet), freezes early universal edge/texture extractors, and fine-tunes the final head on small custom datasets.</p>"
      },
      pitfalls: {
        uz: [
          "ImageNet pretrained modellariga kirishda albatta mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225] normallash shart!",
          "Backbone muzlatilganda optimizer ga faqat model.fc.parameters() (yoki requires_grad=True lar) ni bering.",
          "Yangi boshni o'qitgandan so'ng (1-faza), oxirgi blokni kichik LR (1e-4) bilan ochib fine-tuning (2-faza) qiling."
        ],
        en: [
          "Always apply standard ImageNet RGB mean/std normalization for pretrained backbones.",
          "Pass only trainable parameters (filter(lambda p: p.requires_grad, ...)) to your optimizer.",
          "Warm up the new head first, then unfreeze deeper blocks with a 10× smaller LR."
        ]
      },
      guidedSteps: [
        {
          title: { uz: "1-qadam: ResNet-18 Backbone Yuklash & Boshini Almashtirish", en: "Step 1: Load ResNet-18 & Replace Classification Head" },
          desc: { uz: "ResNet-18 ni yuklab (yoki weights=None demo), barcha parametrlarni muzlating va model.fc ni 5 sinfga o'zgartiring.", en: "Instantiate ResNet-18, freeze backbone weights, and attach a 5-class Linear head." },
          code: `import torch, torch.nn as nn, torchvision.models as models\n# Oflayn muhitda weights=None bilan struktura tekshirish (darsda weights='DEFAULT')\nm = models.resnet18(weights=None)\nfor p in m.parameters(): p.requires_grad = False\nm.fc = nn.Linear(m.fc.in_features, 5)\ntrainable = sum(p.numel() for p in m.parameters() if p.requires_grad)\ntotal = sum(p.numel() for p in m.parameters())\nprint(f"Total params: {total:,} | Trainable head only: {trainable:,}")`,
          expected: { uz: "11.17M jami parametrdan atigi 2,565 tasi o'qitiladigan qilib ajratiladi.", en: "Freezes 11.17M weights, leaving 2,565 trainable head weights." }
        },
        {
          title: { uz: "2-qadam: MobileNetV2 vs ResNet-18 Tezlik & Hajm Taqqoslash", en: "Step 2: Compare ResNet-18 vs MobileNetV2 Parameter Footprint" },
          desc: { uz: "Ikkala modelning parametr soni va CPU forward latency (ms) ni o'lchang.", en: "Measure parameters & CPU latency for ResNet-18 vs MobileNetV2." },
          code: `import time\nmn = models.mobilenet_v2(weights=None).eval()\nx = torch.randn(1, 3, 224, 224)\nfor name, mod in [('ResNet18', m.eval()), ('MobileNetV2', mn)]:\n    t0 = time.perf_counter()\n    with torch.no_grad(): _ = mod(x)\n    print(f"{name:12s}: {sum(p.numel() for p in mod.parameters()):10,d} params | {(time.perf_counter()-t0)*1000:.1f} ms")`,
          expected: { uz: "MobileNetV2 ~3× kam parametr va kamroq FLOPs ko'rsatadi.", en: "MobileNetV2 reports ~3× fewer parameters." }
        },
        {
          title: { uz: "3-qadam: Qisman Muzlatishdan Chiqarish (Layer4 Fine-Tuning)", en: "Step 3: Partial Unfreezing of Deep Layer4 + Differential LR" },
          desc: { uz: "Oxirgi konvolyutsiya bloki layer4 ni ochib, boshga nisbatan 10× kichik LR bilan optimizer tuzing.", en: "Unfreeze layer4 with differential learning rates (1e-4 backbone, 1e-3 head)." },
          code: `for p in m.layer4.parameters(): p.requires_grad = True\nopt = torch.optim.AdamW([{'params': m.layer4.parameters(), 'lr': 1e-4}, {'params': m.fc.parameters(), 'lr': 1e-3}])\nprint("Fine-tuning parameter groups:", len(opt.param_groups))`,
          expected: { uz: "2 guruhli differential LR optimizeri yaratiladi.", en: "Configures 2-group differential LR AdamW optimizer." }
        }
      ],
      vivaQuestions: [
        { q: { uz: "Nima uchun dastlabki qatlamlarni muzlatib (freeze), oxirgi qatlamlarni fine-tune qilamiz?", en: "Why freeze early CNN layers while fine-tuning deeper layers?" }, a: { uz: "Dastlabki qatlamlar barcha rasmlarga umumiy chekka/Gabor filtrlarni o'rganadi; chuqur qatlamlar esa yangi vazifa obyektlariga moslashadi.", en: "Early layers capture universal edges/textures; deep layers specialize to task-specific objects." } },
        { q: { uz: "MobileNetV2 dagi Depthwise Separable konvolyutsiyaning afzalligi nima?", en: "Why is MobileNetV2 so lightweight?" }, a: { uz: "Standart 3×3 konvolyutsiyani fazoviy (depthwise) va 1×1 (pointwise) qismlarga ajratib hisoblashni ~8–9× kamaytiradi.", en: "Factorizing spatial + 1×1 convolutions cuts computation by ~8–9×." } },
        { q: { uz: "Transfer Learning da Learning Rate nega noldan o'qitishdagidan 10× kichik tanlanadi?", en: "Why use a 10× smaller learning rate when fine-tuning pretrained weights?" }, a: { uz: "ImageNet da orttirilgan qimmatli tayyor filtrlarni birinchi epoxalardayoq buzib tashlamaslik uchun.", en: "To avoid destroying valuable pretrained features with large initial gradient steps." } }
      ]
    },
    19: {
      theoryRecap: {
        uz: "<p><strong>Faster R-CNN</strong> ikki bosqichda (RPN → RoIHead) har obyekt uchun <code>boxes [x1,y1,x2,y2]</code>, <code>labels</code> va <code>scores</code> qaytaradi. Sifat <strong>IoU</strong> va <strong>NMS</strong> bilan nazorat qilinadi.</p>",
        en: "<p>Two-stage <strong>Faster R-CNN</strong> runs RPN + RoI heads to emit <code>boxes [x1,y1,x2,y2]</code>, <code>labels</code>, and <code>scores</code>, evaluated by <strong>IoU</strong> and pruned via <strong>NMS</strong>.</p>"
      },
      pitfalls: {
        uz: [
          "TorchVision Faster R-CNN 0..255 uint8 emas, [0.0..1.0] float32 CHW tensorlar ro'yxatini ([img_tensor]) qabul qiladi!",
          "Deteksiya chiqishi bir nechta takror qutilar bermasligi uchun score_thresh (masalan >0.7) bilan filtrlang.",
          "CPU da 1080p rasm Faster R-CNN da 1–3 soniya oladi; tez test uchun 480×640 yoki GPU ishlating."
        ],
        en: [
          "TorchVision Faster R-CNN expects a Python list of [0.0..1.0] float32 CHW tensors.",
          "Filter raw predictions by score confidence (e.g., > 0.7) to remove low-confidence noise.",
          "Resize large images or move tensors to CUDA for smooth inference latency."
        ]
      },
      guidedSteps: [
        {
          title: { uz: "1-qadam: TorchVision ops.box_iou() & NMS Amaliyoti", en: "Step 1: Compute Pairwise IoU & NMS Filtering" },
          desc: { uz: "Ustma-ust tushuvchi bashorat qutilari orasida IoU hisoblab torchvision.ops.nms() ni sinang.", en: "Calculate pairwise box IoU and prune overlapping predictions via torchvision.ops.nms." },
          code: `import torch, torchvision.ops as ops\nboxes = torch.tensor([[10.,10.,60.,60.], [14.,14.,62.,62.], [120.,120.,180.,180.]])\nscores = torch.tensor([0.92, 0.75, 0.88])\nkeep = ops.nms(boxes, scores, iou_threshold=0.5)\nprint("Pairwise IoU(0,1):", round(ops.box_iou(boxes[:1], boxes[1:2]).item(), 3), "| Kept indices:", keep.tolist())`,
          expected: { uz: "1-quti (0.75) 0-quti (0.92) bilan kuchli kesishgani uchun o'chiriladi → [0, 2].", en: "Suppresses box 1, keeping indices [0, 2]." }
        },
        {
          title: { uz: "2-qadam: Faster R-CNN Chiqish Strukturasi & Confidence Filtri", en: "Step 2: Parse Faster R-CNN Dictionary Outputs" },
          desc: { uz: "Model chiqishini score >= 0.7 bo'yicha saralash va chizish shablonini yozing.", en: "Write clean confidence + label filtering over Faster R-CNN prediction dicts." },
          code: `sample_out = {'boxes': boxes, 'scores': scores, 'labels': torch.tensor([1, 1, 3])}\nconf_mask = sample_out['scores'] >= 0.80\nprint("Filtered high-conf boxes:", sample_out['boxes'][conf_mask].shape, "labels:", sample_out['labels'][conf_mask].tolist())`,
          expected: { uz: "0.80 dan yuqori 2 ta ishonchli quti qoladi.", en: "Retains the 2 boxes above 0.80 confidence." }
        },
        {
          title: { uz: "3-qadam: Precision@IoU=0.5 Baholash Skripti", en: "Step 3: Implement TP / FP Matching at IoU >= 0.5" },
          desc: { uz: "Ground truth qutilari bilan IoU >= 0.5 taqqoslab TP va FP ni hisoblang.", en: "Match predictions against Ground Truth boxes using IoU >= 0.50 criterion." },
          code: `gt = torch.tensor([[12., 12., 58., 58.], [200., 200., 250., 250.]])\niou_mat = ops.box_iou(boxes[keep], gt)\nmax_iou, _ = iou_mat.max(dim=1)\nprint("IoUs vs GT:", max_iou.round(decimals=3).tolist(), "| TP@0.5:", int((max_iou >= 0.5).sum()))`,
          expected: { uz: "1 ta TP@0.5 va 1 ta FP aniqlanadi.", en: "Identifies 1 TP@0.5 and 1 FP cleanly." }
        }
      ],
      vivaQuestions: [
        { q: { uz: "Faster R-CNN da RPN va RoI boshi nima bilan farqlanadi?", en: "What separates the RPN stage from the RoI head in Faster R-CNN?" }, a: { uz: "RPN faqat 'obyekt bormi/yo'qmi' va taxminiy qutilarni taklif qiladi; RoI boshi esa aniq 80 ta sinfga ajratadi.", en: "RPN outputs class-agnostic object proposals; RoI head classifies specific categories & refines boxes." } },
        { q: { uz: "COCO mAP@[0.5:0.95] da IoU=0.75 ning roli nima?", en: "Why does COCO evaluate up to IoU=0.95 instead of stopping at 0.50?" }, a: { uz: "Quti chegarasi obyektga qanchalik zich va aniq tushganini (tight localization) jazolash uchun.", en: "To reward tight, precise bounding box localization rather than loose overlaps." } },
        { q: { uz: "Soft-NMS oddiy NMS dan nimasi bilan afzal?", en: "Why use Soft-NMS over hard NMS?" }, a: { uz: "Ustma-ust tushgan qo'shni obyektlarni butunlay o'chirmasdan, ularning score ini pasaytirib gavjum sahnalarda Recall ni oshiradi.", en: "Decays overlapping scores rather than deleting neighboring detections, raising recall in crowds." } }
      ]
    },
    20: {
      theoryRecap: {
        uz: "<p><strong>YOLOv8 / YOLO</strong> bir bosqichli real vaqt detektoridir. <code>conf</code> (ishonchlilik) va <code>iou</code> (NMS chegarasi) parametrlari aniqlik va tezlik muvozanatini belgilaydi; <strong>ONNX / TensorRT</strong> bilan edge tezligi oshiriladi.</p>",
        en: "<p><strong>YOLOv8</strong> performs single-stage real-time detection. Tuning <code>conf</code> and NMS <code>iou</code> balances precision vs recall, while <strong>ONNX / FP16</strong> accelerates edge deployment.</p>"
      },
      pitfalls: {
        uz: [
          "ultralytics YOLO BGR numpy massivni ham qabul qiladi, lekin imgsz 32 ga karrali (320, 640) bo'lishi kerak.",
          "FPS ni o'lchaganda birinchi kadr 'warm-up' (CUDA initsializatsiyasi) sekin chiqadi — 10+ kadr o'rtachasini oling.",
          "Video oqimida cap.release() chaqirishni unutmang!"
        ],
        en: [
          "Ensure imgsz is a multiple of 32 (e.g., 320, 640) matching YOLO pyramid strides.",
          "Skip the first warm-up frame when benchmarking GPU/CPU FPS.",
          "Always release cv2.VideoCapture handles cleanly after video loops."
        ]
      },
      guidedSteps: [
        {
          title: { uz: "1-qadam: YOLO Grid Indeksi va Normallash (cx, cy, w, h)", en: "Step 1: YOLO Grid Cell & Normalized Label Math" },
          desc: { uz: "Piksel koordinatalari (xmin, ymin, xmax, ymax) ni YOLO [cls, cx, cy, w, h] ∈ [0,1] formatiga o'tkazing.", en: "Convert pixel boxes into normalized YOLO txt format [cls, cx, cy, w, h]." },
          code: `W_img, H_img = 640, 480\nx1, y1, x2, y2 = 160, 120, 320, 300\ncx, cy = ((x1 + x2) / 2) / W_img, ((y1 + y2) / 2) / H_img\nbw, bh = (x2 - x1) / W_img, (y2 - y1) / H_img\nprint(f"YOLO label: 0 {cx:.4f} {cy:.4f} {bw:.4f} {bh:.4f} | Grid80 cell: ({int(cx*80)}, {int(cy*80)})")`,
          expected: { uz: "Normallangan [0..1] qiymatlar va 80×80 grid katak koordinatasi chiqadi.", en: "Outputs normalized coords and 80×80 stride-8 grid cell index." }
        },
        {
          title: { uz: "2-qadam: Ultralytics YOLOv8 Inferensiya & FPS O'lchovi", en: "Step 2: Run YOLOv8 Inference & End-to-End FPS" },
          desc: { uz: "YOLOv8n (yoki sintetik benchmark) bilan conf va sinf filtrlash (classes=[0, 2]) ni sinang.", en: "Configure YOLOv8 prediction with confidence threshold and class filter." },
          code: `import time, numpy as np\n# Real muhitda: model = YOLO('yolov8n.pt'); res = model.predict(frame, conf=0.35, classes=[0, 2])\n# End-to-end FPS hisoblash formulasi:\nt_pre, t_inf, t_nms = 2.1, 8.4, 1.5  # ms\ntot = t_pre + t_inf + t_nms\nprint(f"Total frame latency = {tot:.1f} ms -> True FPS = {1000/tot:.1f}")`,
          expected: { uz: "12.0 ms latency → 83.3 FPS hisoblab beriladi.", en: "Reports 83.3 true end-to-end FPS." }
        },
        {
          title: { uz: "3-qadam: FP32 vs FP16 / ONNX Model Hajmi Taqqoslash", en: "Step 3: Estimate Quantization Compression (FP32 → FP16/INT8)" },
          desc: { uz: "3.2M parametrli YOLOv8n modelining FP32, FP16 va INT8 xotira hajmini MB da hisoblang.", en: "Calculate YOLOv8n RAM sizes under FP32, FP16, and INT8 precisions." },
          code: `params = 3_200_000\nfor name, bits in [('FP32', 32), ('FP16', 16), ('INT8', 8)]:\n    print(f"{name}: {params * bits / 8 / 1e6:.2f} MB")`,
          expected: { uz: "FP32=12.8 MB → FP16=6.4 MB → INT8=3.2 MB (4× kichrayish).", en: "Demonstrates 4× memory reduction from 12.8 MB to 3.2 MB." }
        }
      ],
      vivaQuestions: [
        { q: { uz: "YOLOv8 da conf chegarasi 0.25 dan 0.75 ga ko'tarilsa Precision va Recall qanday o'zgaradi?", en: "How do Precision and Recall shift when raising YOLO conf from 0.25 to 0.75?" }, a: { uz: "Precision ortadi (kamroq yolg'on quti), lekin Recall kamayadi (ba'zi qiyin obyektlar tushib qoladi).", en: "Precision rises (fewer false positives) while Recall drops (misses borderline objects)." } },
        { q: { uz: "Nima uchun YOLOv8 da endi anchor qutilar (Anchor-free) kerak emas?", en: "Why does YOLOv8 use anchor-free heads?" }, a: { uz: "Har nuqta to'g'ridan-to'g'ri markazdan 4 chetgacha masofani (l,t,r,b) bashorat qiladi — datasetga qarab k-means ankor tanlash shart emas.", en: "Predicts distances to box edges directly without dataset-specific anchor tuning." } },
        { q: { uz: "YOLOv8n va YOLOv8x modellari qaysi mezonlarda farq qiladi?", en: "Compare YOLOv8n (nano) vs YOLOv8x (extra-large)." }, a: { uz: "Nano (3.2M) edge/real-vaqt uchun eng tez; XLarge (68M) eng yuqori mAP beradi lekin kuchli GPU talab qiladi.", en: "Nano optimizes edge speed (3.2M params); XLarge maximizes mAP on heavy GPUs (68M)." } }
      ]
    },
    21: {
      theoryRecap: {
        uz: "<p><strong>Semantik segmentatsiya</strong> (DeepLabV3 / FCN) har bir piksel uchun <code>[C, H, W]</code> logitlar xaritasini chiqaradi; <code>argmax(dim=1)</code> bilan piksel sinfi olinadi. Sifat sinflar bo'yicha o'rtachalangan <strong>mIoU</strong> bilan o'lchanadi.</p>",
        en: "<p><strong>Semantic segmentation</strong> models (DeepLabV3/FCN) output <code>[C, H, W]</code> per-pixel logits; <code>argmax(dim=1)</code> produces class maps scored via <strong>mIoU</strong>.</p>"
      },
      pitfalls: {
        uz: [
          "Maskalarni resize qilganda ASLO INTER_NEAREST dan boshqa usul (INTER_LINEAR) ishlatmang — sinf raqamlari buziladi!",
          "DeepLabV3 TorchVision da oddiy tensor emas, lug'at qaytaradi: out['out']!",
          "mIoU hisoblashda tasvirda umuman uchramagan sinflar uchun nolga bo'lishdan (1e-6 eps) saqlaning."
        ],
        en: [
          "Always resize discrete label masks using INTER_NEAREST to prevent bogus intermediate IDs.",
          "TorchVision DeepLabV3 returns a dict — index out['out'] for segmentation logits.",
          "Guard against 0/0 divisions when an image lacks one of the dataset classes."
        ]
      },
      guidedSteps: [
        {
          title: { uz: "1-qadam: Rangli Segmentatsiya Xaritasi va Alpha Overlay", en: "Step 1: Colorize Class Mask & Alpha Blend Overlay" },
          desc: { uz: "Piksel sinf ID laridan rangli maska yasab, asl tasvir ustiga cv2.addWeighted bilan qo'ying.", en: "Map integer class IDs to a RGB palette and overlay using cv2.addWeighted." },
          code: `import cv2, numpy as np\nimg = np.full((200, 240, 3), 60, np.uint8)\nmask = np.zeros((200, 240), np.uint8); mask[50:150, 70:170] = 1\npalette = np.array([[0,0,0], [0,220,255]], dtype=np.uint8)\ncolor_mask = palette[mask]\noverlay = cv2.addWeighted(img, 0.6, color_mask, 0.4, 0)\nprint("Overlay shape:", overlay.shape, "| Foreground px:", int((mask==1).sum()))`,
          expected: { uz: "Shaffof cyan qoplamali (200, 240, 3) overlay yaratiladi.", en: "Blends semantic mask cleanly over the input canvas." }
        },
        {
          title: { uz: "2-qadam: Piksel Darajasida mIoU Hisoblash Funksiyasi", en: "Step 2: Exact Multi-Class mIoU Implementation" },
          desc: { uz: "Bashorat va GT maskalari uchun har bir sinf IoU sini hamda o'rtacha mIoU ni hisoblang.", en: "Implement per-class IoU & mIoU over discrete 2D prediction/GT arrays." },
          code: `gt = np.zeros((10, 10), int); gt[2:7, 2:7] = 1\npred = np.zeros((10, 10), int); pred[3:8, 3:8] = 1\nious = []\nfor cls in [0, 1]:\n    inter = np.logical_and(pred == cls, gt == cls).sum()\n    union = np.logical_or(pred == cls, gt == cls).sum()\n    ious.append(inter / union)\n    print(f"Class {cls}: inter={inter}, union={union}, IoU={inter/union:.3f}")\nprint("mIoU:", round(float(np.mean(ious)), 3))`,
          expected: { uz: "Obyekt va fon sinflari uchun IoU hamda mIoU chiqadi.", en: "Reports per-class IoUs and balanced mIoU." }
        },
        {
          title: { uz: "3-qadam: INTER_NEAREST vs INTER_LINEAR Maska Buzilish Testi", en: "Step 3: Observe Ghost Labels from INTER_LINEAR Mask Resizing" },
          desc: { uz: "0 va 2 qiymatli maskani INTER_LINEAR da kichraytirib soxta 1 paydo bo'lishini isbotlang.", en: "Verify INTER_LINEAR invents bogus ID=1 along borders between class 0 and class 2." },
          code: `m2 = np.zeros((20, 20), np.uint8); m2[:, 10:] = 2\nbad = cv2.resize(m2, (10, 10), interpolation=cv2.INTER_LINEAR)\ngood = cv2.resize(m2, (10, 10), interpolation=cv2.INTER_NEAREST)\nprint("LINEAR unique IDs (BUG!):", np.unique(bad), "| NEAREST unique IDs:", np.unique(good))`,
          expected: { uz: "LINEAR da soxta [0, 1, 2] chiqadi; NEAREST da toza [0, 2]!", en: "LINEAR produces bogus class 1; NEAREST cleanly preserves [0, 2]." }
        }
      ],
      vivaQuestions: [
        { q: { uz: "DeepLabV3 modelidagi ASPP (Atrous Spatial Pyramid Pooling) nima beradi?", en: "What does ASPP contribute to DeepLabV3?" }, a: { uz: "Turli dilatatsiya tezliklarida parallel filtrlar qo'llab kichik va katta obyekt kontekstini birga tutadi.", en: "Captures multi-scale spatial context via parallel dilated convolutions." } },
        { q: { uz: "Nima uchun Pixel Accuracy ko'cha segmentatsiyasida aldamchi metrika bo'lishi mumkin?", en: "Why can Pixel Accuracy deceive on street segmentation?" }, a: { uz: "Osmon va yo'l piksellarning 80%+ ini tashkil qilgani uchun kichik piyoda/belgilar umuman topilmasa ham Pixel Acc ~85% chiqaveradi.", en: "Dominant road/sky classes inflate Pixel Accuracy even when rare pedestrians score 0% IoU." } },
        { q: { uz: "Panoptik segmentatsiyada 'stuff' va 'things' nima?", en: "Define 'stuff' vs 'things' in panoptic segmentation." }, a: { uz: "Stuff — sanalmaydigan fon/tekstura (osmon, maysa, yo'l); Things — sanaladigan alohida obyektlar (mashina, odam).", en: "Stuff = uncountable amorphous regions (sky/road); Things = countable object instances." } }
      ]
    },
    22: {
      theoryRecap: {
        uz: "<p><strong>Mask R-CNN</strong> instans segmentatsiyasi har bir obyekt uchun alohida yumshoq $[0,1]$ maska chiqaradi (<code>mask &gt; 0.5</code> bilan binarlanadi). <strong>U-Net</strong> esa tibbiy tasvirlarda skip-concatenate va <strong>Dice koeffitsienti</strong> bilan ishlaydi.</p>",
        en: "<p><strong>Mask R-CNN</strong> predicts soft $[0,1]$ instance masks (thresholded at <code>0.5</code>), while <strong>U-Net</strong> fuses encoder-decoder skips for crisp biomedical boundaries scored by <strong>Dice</strong>.</p>"
      },
      pitfalls: {
        uz: [
          "Mask R-CNN chiqishidagi masks tensorining shakli [N, 1, H, W] — squeeze(1) qilib 2D ga oling va > threshold bilan binarlang!",
          "U-Net skip connection da Encoder o'lchami Decoder bilan toq piksel farq qilsa Padding yoki CenterCrop qiling.",
          "Dice Loss hisoblaganda denominator=0 bo'lmasligi uchun smooth=1e-6 qo'shing."
        ],
        en: [
          "Mask R-CNN emits [N, 1, H, W] soft probabilities — squeeze(1) and threshold (> 0.5).",
          "Ensure U-Net encoder/decoder spatial dims match before torch.cat(..., dim=1).",
          "Add smoothing epsilon (1e-6) in Dice Loss denominators."
        ]
      },
      guidedSteps: [
        {
          title: { uz: "1-qadam: Yumshoq Maska Threshold (> 0.5) & Instans Ranglash", en: "Step 1: Threshold Soft Instance Masks & Colorize Instances" },
          desc: { uz: "2 ta instansning yumshoq ehtimollik maskasini > 0.5 da binarlab alohida rangga bo'yang.", en: "Threshold soft probabilities > 0.5 and assign unique instance colors." },
          code: `import numpy as np\nH, W = 120, 160\nsoft_masks = np.zeros((2, H, W), dtype=np.float32)\nsoft_masks[0, 20:80, 20:80] = 0.85; soft_masks[1, 40:100, 70:140] = 0.72\nfor i in range(2):\n    bin_m = soft_masks[i] > 0.5\n    print(f"Instance {i+1} area at T=0.5: {int(bin_m.sum())} px")`,
          expected: { uz: "Har bir instans uchun alohida maydon va binar maska olinadi.", en: "Computes separate instance pixel counts cleanly." }
        },
        {
          title: { uz: "2-qadam: Dice Loss & Dice vs IoU Konvertatsiyasini Yozish", en: "Step 2: Implement Differentiable Soft Dice Loss" },
          desc: { uz: "PyTorch da sigmoid ehtimolliklari ustida Soft Dice Loss funksiyasini yozib tekshiring.", en: "Implement differentiable Soft Dice Loss in PyTorch and verify Dice vs IoU." },
          code: `import torch\ndef dice_coeff(pred_bin, gt_bin, eps=1e-6):\n    inter = (pred_bin & gt_bin).sum().float()\n    return (2 * inter + eps) / (pred_bin.sum() + gt_bin.sum() + eps)\np = torch.zeros(10, 10, dtype=torch.bool); p[:9, :10] = True   # 90 px\ng = torch.zeros(10, 10, dtype=torch.bool); g[0:10, :10] = True  # 100 px\nA = torch.zeros(10, 10, dtype=torch.bool); A[:9, :10] = True  # 90 px\nB = torch.zeros(10, 10, dtype=torch.bool); B[:10, :10] = True # 100 px\nd = dice_coeff(A, B).item(); iou = d / (2 - d)\nprint(f"Dice={d:.3f} | IoU={iou:.3f}")`,
          expected: { uz: "Dice=0.947, IoU=0.900 (Dice > IoU) natija chiqadi.", en: "Verifies exact mathematical conversion between Dice and IoU." }
        },
        {
          title: { uz: "3-qadam: U-Net Skip Concatenate Shaklini Tekshirish", en: "Step 3: Verify U-Net Channel Concatenation Dimensions" },
          desc: { uz: "Encoder [1, 128, 32, 32] va Decoder Upsample [1, 128, 32, 32] ni torch.cat bilan birlashtiring.", en: "Test channel-wise concatenation of encoder and upsampled decoder feature maps." },
          code: `enc = torch.randn(1, 128, 32, 32); dec = torch.randn(1, 128, 32, 32)\ncat = torch.cat([dec, enc], dim=1)\nconv = torch.nn.Conv2d(256, 128, 3, padding=1)\nprint("Skip fused:", tuple(cat.shape), "-> Conv out:", tuple(conv(cat).shape))`,
          expected: { uz: "Skip fused (1, 256, 32, 32) → Conv out (1, 128, 32, 32).", en: "Fuses 128+128 channels cleanly back into 128." }
        }
      ],
      vivaQuestions: [
        { q: { uz: "RoI Pooling dan RoI Align ga o'tish instans segmentatsiyani nega keskin yaxshiladi?", en: "Why did RoI Align boost Mask R-CNN segmentation accuracy over RoI Pooling?" }, a: { uz: "RoI Pooling dagi yaxlitlash (quantization) maska chegarasini 1–2 piksel siljitar edi; RoI Align bilineyar interpolyatsiya bilan aniq subpiksel namuna oladi.", en: "RoI Align removes integer rounding shifts using bilinear interpolation." } },
        { q: { uz: "U-Net va ResNet skip-connection lari qaysi amal bilan farq qiladi?", en: "How do U-Net skip connections differ operationally from ResNet skips?" }, a: { uz: "ResNet qo'shadi (x + F(x)), U-Net kanallar bo'ylab ulaydi (concatenate).", en: "ResNet sums tensors elementwise; U-Net concatenates them along the channel axis." } },
        { q: { uz: "Agar maska thresholdi 0.5 dan 0.9 ga ko'tarilsa obyekt maydoni qanday o'zgaradi?", en: "What happens to predicted mask area if threshold increases from 0.5 to 0.9?" }, a: { uz: "Faqat juda ishonchli ichki piksellar qolib, chegara piksellari tushib qoladi va maska maydoni kichrayadi.", en: "Uncertain boundary pixels drop out, shrinking the segmented mask area." } }
      ]
    }
  };

  if (Array.isArray(window.CV_LABS)) {
    window.CV_LABS.forEach((lab) => {
      if (ENRICH[lab.id]) Object.assign(lab, ENRICH[lab.id]);
    });
  }
  window.CV_LAB_ENRICH = ENRICH;
})();
