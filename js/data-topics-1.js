// M1–M5: Foundations, Digital Images, Color Spaces, Linear & Non-Linear Filters
window.CV_TOPICS = window.CV_TOPICS || [];

window.CV_TOPICS.push(
  // ==================== M1 ====================
  {
    id: 1,
    code: 'M1',
    labId: 1,
    hours: 2,
    keywords: ['Computer Vision', 'Inverse Problem', 'Invariance', 'AlexNet', 'ViT', 'COMP4423', 'Szeliski'],
    title: {
      uz: "Kompyuterli ko'rishga kirish va rivojlanish tarixi",
      en: "Introduction to Computer Vision & Historical Evolution"
    },
    description: {
      uz: "Kompyuterli ko'rish teskari masala sifatida, invariantlik muammosi, 1966 MIT Summer Vision dan AlexNet va ViT gacha rivojlanish, tibbiyot, transport va sanoatdagi qo'llanilishi.",
      en: "CV as an inverse problem, the invariance challenge, evolution from 1966 MIT Summer Vision to AlexNet & ViT, and applications in medicine, autonomy, and industry."
    },
    refs: [
      { label: "COMP4423 L1: Intro & Setup", url: "https://github.com/lookwei/COMP4423" },
      { label: "Szeliski Ch. 1: Introduction", url: "https://szeliski.org/Book/" },
      { label: "Stanford CS131 Syllabus", url: "https://cs131.stanford.edu/" },
      { label: "Awesome CV: Courses & Books", url: "https://github.com/jbhuang0604/awesome-computer-vision" }
    ],
    sections: [
      {
        heading: { uz: "1.1. Kompyuterli ko'rish, Sun'iy intellekt va Teskari Masala", en: "1.1. Computer Vision, AI & The Inverse Problem" },
        bodyHtml: {
          uz: "<p><strong>Kompyuterli ko'rish (Computer Vision, CV)</strong> — kompyuter tizimlariga raqamli tasvir va videolarni tahlil qilish, tushunish va semantik xulosalar chiqarish qobiliyatini beruvchi sun'iy intellekt sohasidir. Kompyuter uchun tasvir shunchaki <strong>piksellar matritsasi</strong> bo'lib, undan ma'no ajratib olish <strong>teskari masala (inverse problem)</strong> hisoblanadi: kompyuter grafikasi 3D sahnadan 2D tasvir yaratsa (to'g'ri masala), CV 2D tasvirdan 3D tuzilma va ma'noni tiklaydi.</p><p><strong>Asosiy vazifalar:</strong> Tasvir klassifikatsiyasi (bitta sinf), Obyektlarni aniqlash (sinf + bounding box), Semantik va Instans segmentatsiya (piksel darajasida), Obyektlarni kuzatish (tracking) va 3D rekonstruksiya.</p>",
          en: "<p><strong>Computer Vision (CV)</strong> enables machines to extract semantic meaning from digital images and video. To a computer, an image is a raw <strong>matrix of pixel intensities</strong>, making CV a classic <strong>inverse problem</strong>: while computer graphics renders 3D scenes into 2D images (forward problem), CV recovers 3D geometry and semantics from 2D projections.</p><p><strong>Core Tasks:</strong> Image Classification, Object Detection (box + class), Semantic &amp; Instance Segmentation, Object Tracking, and 3D Reconstruction.</p>"
        },
        callout: {
          type: 'warn',
          uz: "<strong>Invariantlik muammosi:</strong> Bir xil obyekt turli yoritilganlik, masshtab, burchak, fokus va qisman to'silish (occlusion) sharoitida mutlaqo boshqa piksel qiymatlarini beradi. Zamonaviy algoritmlar aynan shu o'zgarishlarga barqaror (invariant) xususiyatlar izlaydi.",
          en: "<strong>The Invariance Problem:</strong> The exact same object produces vastly different pixel matrices under varying illumination, scale, viewpoint, blur, and partial occlusion. Robust CV features must remain invariant to these variations."
        }
      },
      {
        heading: { uz: "1.2. Sohaning rivojlanish bosqichlari (1966–2026)", en: "1.2. Historical Milestones (1966–2026)" },
        bodyHtml: {
          uz: "<p>1966-yilda MIT dagi <strong>Summer Vision Project</strong> sohaning boshlanishi sanaladi. 1970–80-yillarda <strong>David Marr</strong> 2.5D eskiz va bosqichma-bosqich qayta ishlash nazariyasini yaratdi; Sobel va Canny (1986) operatorlari paydo bo'ldi.</p><p>1999–2005-yillarda qo'lda loyihalashtirilgan deskriptorlar — <strong>SIFT (1999)</strong>, <strong>Viola-Jones (2001)</strong> real vaqtli yuz aniqlash va <strong>HOG (2005)</strong> yetakchilik qildi. 2012-yilda <strong>AlexNet</strong> ImageNet musobaqasida xatolikni ~26% dan ~15% gacha tushirib <strong>Chuqur o'qitish (Deep Learning)</strong> inqilobini boshladi. Bugungi kunda <strong>Vision Transformer (ViT)</strong>, o'z-o'zini nazorat qiluvchi o'qitish, <strong>CLIP / VLM</strong> va diffuziya modellari yetakchilik qilmoqda.</p>",
          en: "<p>Starting with MIT's 1966 <strong>Summer Vision Project</strong>, <strong>David Marr</strong> (1970s–80s) formalized representational stages (primal → 2.5D → 3D), followed by Canny edges (1986). Hand-crafted descriptors like <strong>SIFT (1999)</strong>, <strong>Viola-Jones (2001)</strong>, and <strong>HOG (2005)</strong> dominated the 2000s.</p><p>In 2012, <strong>AlexNet</strong> slashed ImageNet error from ~26% to ~15%, igniting the <strong>Deep Learning</strong> era (VGG, ResNet, Faster R-CNN, YOLO). Today, <strong>Vision Transformers (ViT)</strong>, multimodal Vision-Language Models (<strong>CLIP</strong>), and generative diffusion lead the field.</p>"
        },
        widget: 'cv-pipeline'
      },
      {
        heading: { uz: "1.3. Vizual SI quvuri va Muhandislik murosalari", en: "1.3. Visual AI Pipeline & Engineering Trade-offs" },
        bodyHtml: {
          uz: "<p>Vizual ma'lumotlarni tahlil qilish 3 asosiy bosqichdan iborat: <strong>1) Dastlabki qayta ishlash (Preprocessing)</strong>, <strong>2) Xususiyatlarni ajratib olish (Feature extraction)</strong>, <strong>3) Qaror qabul qilish (Decision making)</strong>. Chuqur neyron tarmoqlarda bu 3 bosqich <em>end-to-end</em> tarzda birgalikda o'qitiladi.</p><p><strong>Amaliy tahlil:</strong> Konveyerda 30 FPS (≤33 ms/kadr) tezlikda nuqson aniqlash uchun og'ir 2-bosqichli <em>Faster R-CNN</em> o'rniga 1-bosqichli <em>YOLO</em> tanlanadi — bu <strong>Aniqlik (Accuracy)</strong>, <strong>Tezlik (FPS)</strong> va <strong>Hisoblash resurslari</strong> o'rtasidagi muhandislik murosasidir. Shuningdek, <em>class imbalance</em>, <em>data augmentation</em> va <em>algoritmik adolat</em> muhim rol o'ynaydi.</p>",
          en: "<p>Visual pipelines consist of: <strong>(1) Preprocessing</strong>, <strong>(2) Feature Extraction</strong>, and <strong>(3) Decision Making</strong>—unified end-to-end in deep networks.</p><p><strong>Engineering Case:</strong> For a 30 FPS (≤33 ms/frame) conveyor defect inspection line, a single-stage <em>YOLO</em> detector is preferred over heavier two-stage <em>Faster R-CNN</em>—illustrating the core trade-off between <strong>Accuracy</strong>, <strong>FPS / Latency</strong>, and compute budget.</p>"
        },
        discussion: {
          q: { uz: "Nima uchun 1920×1080 rangli tasvirda qoidaga asoslangan (if-else) dasturlash samarasiz?", en: "Why do hand-written if-else rules fail on a 1920×1080 color image?" },
          a: { uz: "1920×1080×3 ≈ 6.2 million piksel qiymatiga ega. Yorug'lik, burchak yoki soya biroz o'zgarsa barcha sonlar o'zgaradi (invariantlik muammosi); shuning uchun statistik/ML va CNN usullari zarur.", en: "It has ~6.2 million raw values that shift drastically under lighting, viewpoint, or occlusion changes (invariance problem), requiring statistical/deep learning." }
        }
      }
    ],
    slides: [
      { title: { uz: "M1: Kompyuterli ko'rishga kirish", en: "M1: Introduction to Computer Vision" }, subtitle: { uz: "KOK1506 · Szeliski Ch. 1 · COMP4423 L1", en: "KOK1506 · Szeliski Ch. 1 · COMP4423 L1" }, points: { uz: ["Teskari masala (Inverse Problem): 2D → 3D & Semantika", "Invariantlik muammosi (yorug'lik, masshtab, burchak, to'silish)", "Tarix: 1966 MIT → Marr → SIFT/Viola-Jones → 2012 AlexNet → ViT/CLIP", "Aniqlik vs FPS vs Hisoblash resurslari murosasi"], en: ["Inverse problem: recovering 3D & semantics from 2D pixels", "The invariance challenge (lighting, scale, pose, occlusion)", "Timeline: 1966 MIT → Marr → SIFT/Viola-Jones → 2012 AlexNet → ViT", "Accuracy vs Real-time FPS vs Compute trade-off"] } },
      { title: { uz: "Kompyuter Grafikasi vs Kompyuterli Ko'rish", en: "Computer Graphics vs Computer Vision" }, table: { headers: { uz: ["Mezon", "Kompyuter Grafikasi", "Kompyuterli Ko'rish"], en: ["Dimension", "Computer Graphics", "Computer Vision"] }, rows: { uz: [["Masala turi", "To'g'ri masala (Forward)", "Teskari masala (Inverse)"], ["Kirish", "3D model, yorug'lik, kamera", "2D piksellar matritsasi (H×W×3)"], ["Chiqish", "2D sintetik tasvir", "Sinflar, Box, Maska, 3D struktura"]], en: [["Problem Type", "Forward problem", "Inverse problem"], ["Input", "3D scene, lighting, camera", "2D pixel array (H×W×3)"], ["Output", "2D rendered image", "Labels, Boxes, Masks, 3D geometry"]] } } },
      { title: { uz: "Interaktiv Vizual SI Quvuri", en: "Interactive Visual AI Pipeline" }, widget: 'cv-pipeline' },
      { title: { uz: "Sohaning Burilish Nuqtalari", en: "Landmark Milestones" }, points: { uz: ["1966: MIT Summer Vision Project", "1986: John Canny chekka detektori", "1999/2005: SIFT (Lowe) & HOG (Dalal-Triggs)", "2001: Viola-Jones real vaqtli yuz aniqlash", "2012: AlexNet (ImageNet) → Deep Learning inqilobi", "2020+: Vision Transformer (ViT), CLIP, Diffusion"], en: ["1966: MIT Summer Vision Project", "1986: Canny Edge Detector", "1999/2005: SIFT & HOG hand-crafted features", "2001: Viola-Jones real-time face detection", "2012: AlexNet wins ImageNet → Deep Learning boom", "2020+: ViT, CLIP, Diffusion Models"] } },
      { title: { uz: "Muhokama: Konveyerda Nuqson Aniqlash", en: "Case Study: 30 FPS Conveyor Inspection" }, discussion: { q: { uz: "30 FPS (≤33 ms/kadr) talabida Faster R-CNN va YOLO dan qaysi birini tanlaysiz?", en: "At 30 FPS (≤33 ms/frame), would you deploy Faster R-CNN or YOLO?" }, a: { uz: "YOLO (bir bosqichli) tanlanadi, chunki u bir marta forward pass bilan real vaqtda 30+ FPS tezlik beradi.", en: "YOLO (single-stage) fits real-time 30+ FPS constraints in a single forward pass." } } }
    ],
    glossary: [
      { uz: "teskari masala", en: "inverse problem", defUz: "2D piksellardan 3D sahna va semantikani tiklash", defEn: "Recovering 3D scene & semantics from 2D pixels" },
      { uz: "invariantlik", en: "invariance", defUz: "Yorug'lik, masshtab va burilishga nisbatan barqarorlik", defEn: "Stability across lighting, scale & viewpoint changes" },
      { uz: "kadrlar tezligi (FPS)", en: "frame rate (FPS)", defUz: "Soniyasiga qayta ishlanadigan kadrlar soni", defEn: "Frames processed per second in real-time video" }
    ],
    quiz: [
      { q: { uz: "Nima uchun kompyuterli ko'rish 'teskari masala' (inverse problem) hisoblanadi?", en: "Why is Computer Vision considered an 'inverse problem'?" }, options: [{ label: 'A', uz: "3D modeldan 2D rasm yaratadi", en: "It renders 2D images from 3D models" }, { label: 'B', uz: "2D tasvirdan 3D va semantik ma'lumotlarni tiklaydi", en: "It recovers 3D & semantic info from 2D images" }, { label: 'C', uz: "Piksellarni teskari o'qiydi", en: "It reads pixels backward" }, { label: 'D', uz: "Faqat kulrang tasvirda ishlaydi", en: "It only uses grayscale images" }], answer: 'B', explanation: { uz: "Grafika 3D→2D (to'g'ri masala), CV esa 2D→3D/semantika (teskari masala).", en: "Graphics goes 3D→2D; CV goes 2D→3D/semantics." } },
      { q: { uz: "2012-yilda ImageNet musobaqasida g'olib chiqib chuqur o'qitish burilishini boshlagan model qaysi?", en: "Which 2012 ImageNet winner sparked the Deep Learning revolution in CV?" }, options: [{ label: 'A', uz: "Viola-Jones", en: "Viola-Jones" }, { label: 'B', uz: "SIFT", en: "SIFT" }, { label: 'C', uz: "AlexNet", en: "AlexNet" }, { label: 'D', uz: "HOG", en: "HOG" }], answer: 'C', explanation: { uz: "AlexNet 2012-yilda ImageNet xatosini keskin kamaytirib CNN davrini boshladi.", en: "AlexNet slashed ImageNet top-5 error in 2012." } },
      { q: { uz: "1966-yilda MIT da o'tkazilgan qaysi loyiha CV tarixining boshlanishi sifatida tilga olinadi?", en: "Which 1966 MIT project is cited as the dawn of Computer Vision?" }, options: [{ label: 'A', uz: "ImageNet Project", en: "ImageNet Project" }, { label: 'B', uz: "Summer Vision Project", en: "Summer Vision Project" }, { label: 'C', uz: "OpenCV Project", en: "OpenCV Project" }, { label: 'D', uz: "COCO Challenge", en: "COCO Challenge" }], answer: 'B', explanation: { uz: "1966-yilgi MIT Summer Vision Project sohaning ilk rasmiy tashabbuslaridan biridir.", en: "The 1966 MIT Summer Vision Project initiated CV research." } },
      { q: { uz: "Bir xil obyektning turli yorug'lik, burchak va masshtabda turlicha piksel berishi qanday muammo deyiladi?", en: "What is the challenge where the same object yields different pixels under lighting/pose/scale shifts?" }, options: [{ label: 'A', uz: "Diskretlash", en: "Sampling" }, { label: 'B', uz: "Invariantlik muammosi", en: "Invariance problem" }, { label: 'C', uz: "Gisterezis", en: "Hysteresis" }, { label: 'D', uz: "Posterizatsiya", en: "Posterization" }], answer: 'B', explanation: { uz: "Bu hodisa invariantlik muammosi (invariance problem) deb ataladi.", en: "This core challenge is known as the invariance problem." } }
    ],
    matching: [
      { left: { uz: "David Marr (1970-80)", en: "David Marr (1970s-80s)" }, right: { uz: "2.5D eskiz va bosqichli ko'rish nazariyasi", en: "Primal/2.5D/3D computational vision theory" } },
      { left: { uz: "AlexNet (2012)", en: "AlexNet (2012)" }, right: { uz: "ImageNet da chuqur CNN inqilobini boshladi", en: "Launched Deep CNN era on ImageNet" } },
      { left: { uz: "Viola-Jones (2001)", en: "Viola-Jones (2001)" }, right: { uz: "Real vaqtda klassik yuz aniqlash", en: "First practical real-time face detector" } },
      { left: { uz: "SIFT / HOG", en: "SIFT / HOG" }, right: { uz: "Qo'lda loyihalashtirilgan lokal/global deskriptorlar", en: "Hand-crafted feature descriptors" } }
    ],
    fillGap: [
      { text: { uz: "Kompyuterli ko'rish 2D tasvirdan 3D va semantik ma'lumotni tiklagani uchun ___ masala hisoblanadi.", en: "Computer Vision is an ___ problem because it recovers 3D/semantics from 2D pixels." }, answer: ['teskari', 'inverse'] },
      { text: { uz: "2012-yilda ImageNet musobaqasida g'olib chiqqan chuqur CNN modeli ___ deb ataladi.", en: "The 2012 ImageNet-winning deep CNN architecture is ___." }, answer: ['AlexNet'] },
      { text: { uz: "Real vaqtda ishlash tezligi odatda kadr/soniya ya'ni ___ birligida o'lchanadi.", en: "Real-time processing speed is measured in frames per second, abbreviated as ___." }, answer: ['FPS'] }
    ]
  },

  // ==================== M2 ====================
  {
    id: 2,
    code: 'M2',
    labId: 2,
    hours: 2,
    keywords: ['Pixel', 'Sampling', 'Quantization', 'Bit Depth', 'JPEG', 'PNG', 'BMP', 'PSNR', 'SSIM'],
    title: {
      uz: "Raqamli tasvirlar va ularni ifodalash usullari",
      en: "Digital Images, Representation & Formats"
    },
    description: {
      uz: "Diskretizatsiya va kvantlash, piksel matritsasi (H×W×C), bit chuqurligi va posterizatsiya, BMP/JPEG (DCT)/PNG/WebP formatlari, PSNR va SSIM metrikalari.",
      en: "Sampling & quantization, pixel tensors (H×W×C), bit depth & posterization, BMP/JPEG (DCT)/PNG/WebP formats, and PSNR/SSIM quality metrics."
    },
    refs: [
      { label: "COMP4423 L2: Image Processing I", url: "https://github.com/lookwei/COMP4423" },
      { label: "Szeliski Ch. 2: Image Formation", url: "https://szeliski.org/Book/" },
      { label: "Amaliy4.ipynb (Atabaev/CV)", url: "Amaliy4.ipynb" }
    ],
    sections: [
      {
        heading: { uz: "2.1. Diskretizatsiya, Kvantlash va Piksel Matritsasi", en: "2.1. Sampling, Quantization & Pixel Arrays" },
        bodyHtml: {
          uz: "<p>Uzluksiz yorug'lik funksiyasi $f(x, y)$ kompyuterda ikki bosqichda raqamlashtiriladi: <strong>1) Diskretizatsiya (Sampling)</strong> — fazoviy koordinatalarni $M \\times N$ to'rga bo'lish (Nikvist-Shennon teoremasi buzilsa <em>aliasing</em> yuzaga keladi); <strong>2) Kvantlash (Quantization)</strong> — yorqinlikni chekli darajalarga ($2^b$) aylantirish.</p><p>8-bitli kulrang tasvir 0..255 oralig'ida 256 sathga ega. Rangli RGB tasvirda har bir piksel 3 bayt (24 bit = 16.7 mln rang) egallaydi. OpenCV da tasvir <code>(H, W, 3)</code> shaklida va <strong>BGR</strong> tartibida saqlanadi!</p>",
          en: "<p>Continuous intensity $f(x, y)$ is digitized via: <strong>(1) Sampling</strong> onto an $M \\times N$ spatial grid (violating Nyquist causes <em>aliasing</em>), and <strong>(2) Quantization</strong> into $2^b$ discrete levels.</p><p>An 8-bit grayscale pixel holds 0..255 (256 levels); 24-bit RGB uses 3 bytes/pixel (16.7M colors). In OpenCV, arrays have shape <code>(H, W, 3)</code> in <strong>BGR</strong> order.</p>"
        },
        latex: "V_{\\text{bytes}} = \\frac{W \\cdot H \\cdot d_{\\text{bits}}}{8}, \\quad \\text{1920}\\times\\text{1080}\\times\\text{24-bit} = 6\\,220\\,800\\text{ B} \\approx 5.93\\text{ MB}",
        widget: 'pixel-matrix'
      },
      {
        heading: { uz: "2.2. Tasvir Formatlari: BMP, JPEG, PNG va WebP", en: "2.2. Image Formats: BMP, JPEG, PNG & WebP" },
        bodyHtml: {
          uz: "<p><strong>BMP:</strong> Siqishsiz (xom) saqlaydi — juda tez va sifat to'liq, lekin hajmi katta. <strong>JPEG:</strong> 8×8 bloklarda <em>Diskret Kosinus O'zgartirishi (DCT)</em> ga asoslangan yo'qotishli (lossy) siqish; fotolarni 10–20× kichraytiradi, ammo past sifatda <em>blocking</em> artefaktlari chiqadi. <strong>PNG:</strong> DEFLATE algoritmili yo'qotishsiz (lossless) siqish va <em>alfa-kanal (shaffoflik)</em> qo'llab-quvvatlaydi.</p>",
          en: "<p><strong>BMP:</strong> Uncompressed raw bitmap (huge size, zero loss). <strong>JPEG:</strong> Lossy compression via 8×8 <em>Discrete Cosine Transform (DCT)</em>—great for photos (10–20× smaller), introduces blocking artifacts at low quality. <strong>PNG:</strong> Lossless DEFLATE compression with <em>alpha transparency</em>, ideal for UI, text, and masks.</p>"
        },
        table: {
          headers: { uz: ["Format", "Siqish turi", "Alfa-kanal", "Eng mos sohasi"], en: ["Format", "Compression", "Alpha", "Best Use Case"] },
          rows: {
            uz: [
              ["BMP / RAW", "Siqishsiz", "Yo'q", "Sensor xom ma'lumot, tezkor bufer"],
              ["JPEG", "Yo'qotishli (DCT 8×8)", "Yo'q", "Fotografiya, tabiiy tasvirlar"],
              ["PNG", "Yo'qotishsiz (DEFLATE)", "Bor", "Maskalar, logotip, matn, skrinshot"],
              ["TIFF / WebP", "Ikkala rejim", "Bor", "Poligrafiya (TIFF), Zamonaviy veb (WebP)"]
            ],
            en: [
              ["BMP / RAW", "Uncompressed", "No", "Raw sensor captures, fast I/O"],
              ["JPEG", "Lossy (8×8 DCT)", "No", "Natural photographs"],
              ["PNG", "Lossless (DEFLATE)", "Yes", "Segmentation masks, UI, text"],
              ["TIFF / WebP", "Lossless & Lossy", "Yes", "Publishing (TIFF), Modern Web (WebP)"]
            ]
          }
        }
      },
      {
        heading: { uz: "2.3. Bit Chuqurligi, Dinamik Diapazon va Sifat Metrikalari", en: "2.3. Bit Depth, Dynamic Range & PSNR / SSIM" },
        bodyHtml: {
          uz: "<p><strong>Bit chuqurligi</strong> pasaysa (masalan, 4-bit = 16 daraja), silliq gradient o'rniga keskin zinapoya chiziqlari — <strong>posterizatsiya (banding)</strong> paydo bo'ladi. Tibbiyotda (MRT/Rentgen) va HDR da 12–16 bitli tasvirlar qo'llaniladi.</p><p>Sifatni miqdoriy baholash uchun <strong>PSNR</strong> (Peak Signal-to-Noise Ratio, dB da) va inson idrokiga yaqin <strong>SSIM</strong> (Structural Similarity Index, [0, 1]) ishlatiladi.</p>",
          en: "<p>Lowering bit depth (e.g., 4-bit = 16 levels) causes visible contour bands known as <strong>posterization (banding)</strong>. Medical imaging (MRI/X-Ray) and HDR use 12–16+ bits for high dynamic range.</p><p>Objective quality is measured via <strong>PSNR</strong> (dB, based on MSE) and <strong>SSIM</strong> (Structural Similarity Index, [0, 1]).</p>"
        },
        latex: "\\text{PSNR} = 10 \\cdot \\log_{10}\\left(\\frac{\\text{MAX}_I^2}{\\text{MSE}}\\right)"
      }
    ],
    slides: [
      { title: { uz: "M2: Raqamli tasvirlar va Formatlar", en: "M2: Digital Images & Formats" }, subtitle: { uz: "KOK1506 · Szeliski Ch. 2 · COMP4423 L2", en: "KOK1506 · Szeliski Ch. 2 · COMP4423 L2" }, points: { uz: ["Diskretizatsiya (Sampling) vs Kvantlash (Quantization)", "Piksel matritsasi (H×W×C) va OpenCV BGR tartibi", "BMP vs JPEG (DCT) vs PNG (DEFLATE + Alpha)", "Bit chuqurligi, posterizatsiya, PSNR va SSIM"], en: ["Sampling vs Quantization & Nyquist aliasing", "Pixel array (H×W×C) and OpenCV BGR order", "BMP vs JPEG (DCT) vs PNG (Lossless + Alpha)", "Bit depth, posterization, PSNR & SSIM"] } },
      { title: { uz: "Interaktiv Bit Chuqurligi va Hajm Simulatori", en: "Interactive Bit-Depth & Memory Lab" }, widget: 'pixel-matrix' },
      { title: { uz: "Sonli Misol: 1920×1080 Hajmi", en: "Worked Example: Full HD Image Size" }, latex: "V = \\frac{1920 \\times 1080 \\times 24}{8} = 6\\,220\\,800\\text{ B} \\approx 5.93\\text{ MB}", points: { uz: ["8-bit RGB = 3 bayt/piksel (24 bit)", "16-bit RGB (6 bayt/piksel) → hajm 2× oshadi: ~11.86 MB"], en: ["8-bit RGB = 3 bytes/pixel (24 bits)", "16-bit RGB doubles footprint to ~11.86 MB"] } },
      { title: { uz: "Formatlar Jadvali (BMP / JPEG / PNG)", en: "Image Formats Comparison" }, table: { headers: { uz: ["Format", "Siqish", "Alfa", "Kamchiligi"], en: ["Format", "Compression", "Alpha", "Trade-off"] }, rows: { uz: [["BMP", "Yo'q", "Yo'q", "Juda katta fayl hajmi"], ["JPEG", "Lossy (DCT)", "Yo'q", "Blocking artefaktlari"], ["PNG", "Lossless", "Bor", "Fotolarda JPEG dan kattaroq"]], en: [["BMP", "None", "No", "Huge file size"], ["JPEG", "Lossy (DCT)", "No", "8×8 blocking artifacts"], ["PNG", "Lossless", "Yes", "Larger than JPEG for photos"]] } } }
    ],
    glossary: [
      { uz: "diskretlash", en: "sampling", defUz: "Uzluksiz fazoni M×N piksellar to'riga bo'lish", defEn: "Discretizing continuous space into an M×N grid" },
      { uz: "kvantlash", en: "quantization", defUz: "Yorqinlikni chekli diskret darajalarga keltirish", defEn: "Mapping continuous intensity to discrete levels" },
      { uz: "posterizatsiya", en: "posterization", defUz: "Kam bit chuqurligida rang o'tishlarida zinapoya paydo bo'lishi", defEn: "Visible intensity banding from low bit depth" }
    ],
    quiz: [
      { q: { uz: "JPEG formatidagi yo'qotishli siqish qaysi matematik o'zgartirishga asoslanadi?", en: "Which mathematical transform underlies lossy JPEG compression?" }, options: [{ label: 'A', uz: "DEFLATE", en: "DEFLATE" }, { label: 'B', uz: "Diskret Kosinus O'zgartirishi (DCT)", en: "Discrete Cosine Transform (DCT)" }, { label: 'C', uz: "Sobel operatori", en: "Sobel operator" }, { label: 'D', uz: "Hough almashtirishi", en: "Hough transform" }], answer: 'B', explanation: { uz: "JPEG 8×8 bloklarda DCT qo'llab yuqori chastotalarni kvantlaydi.", en: "JPEG applies 8×8 block DCT and quantizes high frequencies." } },
      { q: { uz: "1920×1080 o'lchamli, 8-bitli RGB tasvirning siqilmagan hajmi taxminan qancha?", en: "Approximate uncompressed size of a 1920×1080 8-bit RGB image?" }, options: [{ label: 'A', uz: "0.5 MB", en: "0.5 MB" }, { label: 'B', uz: "5.93 MB (~6 MB)", en: "5.93 MB (~6 MB)" }, { label: 'C', uz: "24 MB", en: "24 MB" }, { label: 'D', uz: "60 MB", en: "60 MB" }], answer: 'B', explanation: { uz: "1920 × 1080 × 3 bayt = 6,220,800 bayt ≈ 5.93 MB.", en: "1920 × 1080 × 3 bytes = 6,220,800 bytes ≈ 5.93 MB." } },
      { q: { uz: "Shaffof (transparent) fonni yo'qotishsiz (lossless) saqlash uchun eng mos format qaysi?", en: "Which format supports lossless compression with alpha transparency?" }, options: [{ label: 'A', uz: "JPEG", en: "JPEG" }, { label: 'B', uz: "BMP", en: "BMP" }, { label: 'C', uz: "PNG", en: "PNG" }, { label: 'D', uz: "RAW", en: "RAW" }], answer: 'C', explanation: { uz: "PNG DEFLATE orqali yo'qotishsiz siqadi va alfa-kanalni saqlaydi.", en: "PNG uses lossless DEFLATE and supports an alpha channel." } },
      { q: { uz: "OpenCV da rangli tasvir kanallari qanday tartibda saqlanadi?", en: "In what channel order does OpenCV store color images?" }, options: [{ label: 'A', uz: "RGB", en: "RGB" }, { label: 'B', uz: "BGR", en: "BGR" }, { label: 'C', uz: "HSV", en: "HSV" }, { label: 'D', uz: "CMYK", en: "CMYK" }], answer: 'B', explanation: { uz: "OpenCV tarixiy sabablarga ko'ra BGR (Blue-Green-Red) tartibidan foydalanadi.", en: "OpenCV stores 3-channel color images in BGR order." } }
    ],
    matching: [
      { left: { uz: "JPEG", en: "JPEG" }, right: { uz: "8×8 DCT ga asoslangan yo'qotishli siqish", en: "Lossy compression using 8×8 DCT" } },
      { left: { uz: "PNG", en: "PNG" }, right: { uz: "Yo'qotishsiz siqish va alfa-shaffoflik", en: "Lossless DEFLATE with alpha channel" } },
      { left: { uz: "BMP", en: "BMP" }, right: { uz: "Siqishsiz xom piksel matritsasi", en: "Uncompressed raw bitmap storage" } },
      { left: { uz: "PSNR / SSIM", en: "PSNR / SSIM" }, right: { uz: "Tasvir sifatini miqdoriy baholash", en: "Quantitative image quality metrics" } }
    ],
    fillGap: [
      { text: { uz: "Bit chuqurligi yetarli bo'lmaganda gradientda zinapoya effekti paydo bo'lishi ___ deyiladi.", en: "Intensity banding caused by insufficient bit depth is called ___." }, answer: ['posterizatsiya', 'posterization'] },
      { text: { uz: "Standart 24-bitli RGB tasvir jami ___ millionga yaqin rangni ifodalaydi.", en: "Standard 24-bit RGB represents ~___ million colors." }, answer: ['16.7', '16,7'] },
      { text: { uz: "Tasvirni fazoviy koordinata to'riga bo'lish jarayoni ___ deb ataladi.", en: "Discretizing continuous spatial coordinates onto a grid is ___." }, answer: ['diskretizatsiya', 'diskretlash', 'sampling'] }
    ]
  },

  // ==================== M3 ====================
  {
    id: 3,
    code: 'M3',
    labId: 3,
    hours: 2,
    keywords: ['RGB', 'HSV', 'Grayscale', 'YCbCr', 'CIELAB', 'Color Masking', 'inRange'],
    title: {
      uz: "Raqamli tasvirlarda rang modellari (RGB, HSV, LAB, YCbCr)",
      en: "Color Spaces, Conversions & Color Masking"
    },
    description: {
      uz: "Additiv RGB va trixromatik nazariya, HSV/HSL, YCbCr (video siqish), perseptual CIELAB va HSV fazosida rang bo'yicha maska yaratish.",
      en: "Additive RGB & trichromatic theory, HSV/HSL, YCbCr chroma subsampling, perceptual CIELAB, and HSV color masking."
    },
    refs: [
      { label: "COMP4423 L2: Color & Manipulations", url: "https://github.com/lookwei/COMP4423" },
      { label: "Szeliski Ch. 2.3: Color", url: "https://szeliski.org/Book/" },
      { label: "OpenCV Color Spaces Tutorial", url: "https://docs.opencv.org" }
    ],
    sections: [
      {
        heading: { uz: "3.1. RGB, Grayscale va Trixromatik Nazariya", en: "3.1. RGB, Grayscale & Trichromatic Theory" },
        bodyHtml: {
          uz: "<p><strong>RGB</strong> — inson ko'zidagi uch xil kolbachaga (Qizil, Yashil, Ko'k) mos keluvchi <em>additiv</em> model. Ammo RGB da yorqinlik (luminance) va rang (chrominance) uchala kanalga aralashib ketgan bo'ladi — yorug'lik o'zgarsa R, G, B hammasi o'zgaradi.</p><p>Kulrangga o'tishda inson ko'zi yashilga eng sezgir bo'lgani uchun: $Y = 0.299R + 0.587G + 0.114B$.</p>",
          en: "<p><strong>RGB</strong> is an <em>additive</em> color model grounded in human trichromatic cone receptors. However, RGB couples luminance and chrominance across all three channels, making it sensitive to shadows and illumination changes.</p><p>Grayscale luminance weights green highest: $Y = 0.299R + 0.587G + 0.114B$.</p>"
        },
        widget: 'color-space'
      },
      {
        heading: { uz: "3.2. HSV, YCbCr va CIELAB Rang Fazolari", en: "3.2. HSV, YCbCr & CIELAB Color Spaces" },
        bodyHtml: {
          uz: "<p><strong>HSV (Hue, Saturation, Value):</strong> Rang toni (Hue, 0°–360°) yorqinlikdan (Value) ajratilgan. <em>OpenCV da 8-bit sig'ishi uchun Hue [0, 179] oralig'ida saqlanadi!</em> Qizil rang 0°/360° da joylashgani uchun [0,10] va [170,179] ikki diapazonda olinadi.</p><p><strong>YCbCr:</strong> Yorqinlik (Y) ni rang farqlaridan (Cb, Cr) ajratadi — JPEG/H.264 da Cb/Cr siqiladi (<em>chroma subsampling</em>). <strong>CIELAB (L*a*b*):</strong> Perseptual bir tekis fazo — Yevklid masofasi inson ko'zi sezadigan rang farqiga proporsional.</p>",
          en: "<p><strong>HSV:</strong> Separates Hue (0°–360°) from brightness (Value). <em>In OpenCV, 8-bit Hue is halved to [0, 179]!</em> Red wraps around 0°/180°, requiring two ranges.</p><p><strong>YCbCr:</strong> Separates luma Y from chroma Cb/Cr for JPEG/H.264 chroma subsampling. <strong>CIELAB:</strong> Perceptually uniform space where Euclidean distance matches human color difference.</p>"
        },
        callout: {
          type: 'info',
          uz: "<strong>Sonli misol (RGB → HSV):</strong> Piksel $(200, 100, 50)$ → normallash: $(0.784, 0.392, 0.196)$. $C_{\\max}=0.784, C_{\\min}=0.196, \\Delta=0.588$. Shunda $V=78.4\\%,\\ S=0.588/0.784=75\\%,\\ H=60°\\times((0.392-0.196)/0.588)=20°$ (apelsin/to'q sariq).",
          en: "<strong>Worked Example (RGB → HSV):</strong> $(200, 100, 50)$ normalizes to $(0.784, 0.392, 0.196)$. $V=78.4\\%$, $S=75\\%$, $H=20°$ (orange)."
        }
      },
      {
        heading: { uz: "3.3. Rang Bo'yicha Obyektni Ajratish (Color Masking)", en: "3.3. Color Masking & Segmentation Pipeline" },
        bodyHtml: {
          uz: "<p>Jarayon: <code>BGR → HSV</code> → <code>cv2.inRange(hsv, lower, upper)</code> → morfologik tozalash (erosion/dilation) → <code>cv2.bitwise_and()</code> → <code>cv2.findContours()</code>. Svetofor, sport to'plari va sanoat rang nazoratida keng qo'llaniladi.</p>",
          en: "<p>Pipeline: <code>BGR → HSV</code> → <code>cv2.inRange(hsv, lower, upper)</code> → morphological cleanup → <code>cv2.bitwise_and()</code> → <code>cv2.findContours()</code>.</p>"
        }
      }
    ],
    slides: [
      { title: { uz: "M3: Rang Modellari (RGB, HSV, LAB, YCbCr)", en: "M3: Color Spaces & Color Masking" }, subtitle: { uz: "KOK1506 · Szeliski Ch. 2.3", en: "KOK1506 · Szeliski Ch. 2.3" }, points: { uz: ["RGB (additiv) vs CMYK (subtraktiv)", "Grayscale: Y = 0.299R + 0.587G + 0.114B", "HSV: Hue [0..179] OpenCV da", "YCbCr (video/JPEG) va CIELAB (perseptual masofa)", "cv2.inRange + bitwise_and bilan color masking"], en: ["RGB (additive) vs CMYK (subtractive)", "Grayscale weighting: 0.587 for Green", "HSV: Hue halved to [0..179] in OpenCV", "YCbCr (chroma subsampling) & CIELAB", "Color masking via cv2.inRange"] } },
      { title: { uz: "Interaktiv RGB ↔ HSV / Grayscale Konverteri", en: "Interactive RGB ↔ HSV / Grayscale Converter" }, widget: 'color-space' },
      { title: { uz: "Rang Fazolari Taqqoslanmasi", en: "Color Spaces Comparison" }, table: { headers: { uz: ["Model", "Komponentlar", "Asosiy afzalligi"], en: ["Space", "Channels", "Key Strength"] }, rows: { uz: [["RGB", "R, G, B", "Displey va CNN kirishi uchun standart"], ["HSV", "H, S, V", "Rang toni yorqinlikdan ajratilgan (segmentatsiya)"], ["YCbCr", "Y, Cb, Cr", "Video/JPEG siqish (chroma subsampling)"], ["CIELAB", "L*, a*, b*", "Yevklid masofasi inson ko'ziga mos"]], en: [["RGB", "R, G, B", "Standard display & CNN input"], ["HSV", "H, S, V", "Separates Hue from illumination"], ["YCbCr", "Y, Cb, Cr", "JPEG/H.264 chroma subsampling"], ["CIELAB", "L*, a*, b*", "Perceptually uniform color distance"]] } } }
    ],
    glossary: [
      { uz: "rang toni (Hue)", en: "Hue", defUz: "0°–360° (OpenCV da 0–179) doiradagi asosiy rang tusi", defEn: "Dominant wavelength angle (0–179 in OpenCV)" },
      { uz: "ikonlik maska", en: "binary mask", defUz: "Tanlangan rang piksellari 255 (1), qolgani 0 bo'lgan xarita", defEn: "0/255 mask selecting target color pixels" }
    ],
    quiz: [
      { q: { uz: "OpenCV da HSV modelining Hue kanali 8-bitli saqlash uchun qaysi diapazonga tushirilgan?", en: "What range does OpenCV use for 8-bit HSV Hue?" }, options: [{ label: 'A', uz: "0 dan 360 gacha", en: "0 to 360" }, { label: 'B', uz: "0 dan 179 gacha", en: "0 to 179" }, { label: 'C', uz: "0 dan 255 gacha", en: "0 to 255" }, { label: 'D', uz: "-128 dan 127 gacha", en: "-128 to 127" }], answer: 'B', explanation: { uz: "360° qiymat 1 baytga (255) sig'magani uchun OpenCV H ni 2 ga bo'lib [0, 179] saqlaydi.", en: "OpenCV divides 0–360° by 2 to fit uint8 [0, 179]." } },
      { q: { uz: "RGB → Grayscale formulasida (0.299R + 0.587G + 0.114B) nima uchun Yashil (G) eng katta vaznga ega?", en: "Why does Green have the largest weight (0.587) in Grayscale conversion?" }, options: [{ label: 'A', uz: "Yashil kam joy egallaydi", en: "Green uses less memory" }, { label: 'B', uz: "Inson ko'zi yashil to'lqin uzunligiga eng sezgir", en: "Human eyes are most sensitive to green light" }, { label: 'C', uz: "Sensorlarda yashil yo'q", en: "Sensors lack green" }, { label: 'D', uz: "Tasodifiy tanlangan", en: "Arbitrary choice" }], answer: 'B', explanation: { uz: "Inson ko'zi yashil spektrdagi yorug'lik o'zgarishlariga eng sezgir.", en: "Human luminance perception peaks in the green spectrum." } },
      { q: { uz: "Qaysi rang fazosida ikkita rang orasidagi Yevklid masofasi inson idrokiga eng mos keladi?", en: "In which color space does Euclidean distance match human perceptual difference?" }, options: [{ label: 'A', uz: "RGB", en: "RGB" }, { label: 'B', uz: "CIELAB (LAB)", en: "CIELAB (LAB)" }, { label: 'C', uz: "BMP", en: "BMP" }, { label: 'D', uz: "Grayscale", en: "Grayscale" }], answer: 'B', explanation: { uz: "CIELAB perseptual bir tekis (perceptually uniform) fazodir.", en: "CIELAB is designed to be perceptually uniform." } },
      { q: { uz: "Video siqishda (JPEG, H.264) qaysi model yorqinlik Y va rang farqlari Cb/Cr ni ajratadi?", en: "Which color model separates luma Y and chroma Cb/Cr in video compression?" }, options: [{ label: 'A', uz: "YCbCr", en: "YCbCr" }, { label: 'B', uz: "CMYK", en: "CMYK" }, { label: 'C', uz: "HSV", en: "HSV" }, { label: 'D', uz: "RGB", en: "RGB" }], answer: 'A', explanation: { uz: "YCbCr Cb va Cr ni kamroq aniqlikda saqlash (chroma subsampling) imkonini beradi.", en: "YCbCr enables chroma subsampling on Cb and Cr." } }
    ],
    matching: [
      { left: { uz: "HSV", en: "HSV" }, right: { uz: "Rang bo'yicha maskalash uchun qulay (H alohida)", en: "Separates Hue from Value for color masking" } },
      { left: { uz: "YCbCr", en: "YCbCr" }, right: { uz: "JPEG/MPEG siqishda chroma subsampling", en: "Video/JPEG compression luma-chroma split" } },
      { left: { uz: "CIELAB", en: "CIELAB" }, right: { uz: "Inson ko'ziga mos Yevklid rang masofasi", en: "Perceptually uniform color distance" } },
      { left: { uz: "CMYK", en: "CMYK" }, right: { uz: "Printer va poligrafiya uchun subtraktiv model", en: "Subtractive ink model for printing" } }
    ],
    fillGap: [
      { text: { uz: "OpenCV da cv2.cvtColor(..., cv2.COLOR_BGR2HSV) dan so'ng Hue qiymati ___ dan 179 gacha bo'ladi.", en: "In OpenCV HSV, Hue values span from 0 to ___." }, answer: ['0', '179'] },
      { text: { uz: "HSV da to'yinganlik (Saturation) 0 ga teng bo'lsa, rang ___ tusda bo'ladi.", en: "When Saturation equals 0 in HSV, the resulting color is ___." }, answer: ['kulrang', 'gray', 'grey'] },
      { text: { uz: "Ma'lum rang diapazonidan ikkilik maska olish uchun OpenCV da ___ funksiyasi ishlatiladi.", en: "To threshold a color range into a binary mask in OpenCV, use cv2.___." }, answer: ['inRange'] }
    ]
  },

  // ==================== M4 ====================
  {
    id: 4,
    code: 'M4',
    labId: 4,
    hours: 2,
    keywords: ['Convolution', 'Kernel', 'Mean Filter', 'Gaussian Filter', 'Separable', 'Padding', 'Unsharp Masking'],
    title: {
      uz: "Tasvirlarga ishlov berishda chiziqli filtrlar",
      en: "Linear Image Filtering & 2D Convolution"
    },
    description: {
      uz: "Dastlabki qayta ishlash, 2D svyortka (convolution) vs korrelyatsiya, Mean va Gauss filtrlari, ajraluvchan filtrlar O(2N), chegara shartlari (padding) va unsharp masking.",
      en: "Preprocessing, 2D convolution vs cross-correlation, Mean & Gaussian smoothing, separable O(2N) kernels, border padding, and unsharp masking."
    },
    refs: [
      { label: "COMP4423 L3: Filters & Convolutions", url: "https://github.com/lookwei/COMP4423" },
      { label: "Szeliski Ch. 3.2: Linear Filtering", url: "https://szeliski.org/Book/" },
      { label: "UC Berkeley CS180: Spatial Filtering", url: "https://cal-cs180.github.io/fa25/" }
    ],
    sections: [
      {
        heading: { uz: "4.1. Svyortka (Convolution) va Chiziqli Filtrlar", en: "4.1. 2D Convolution & Cross-Correlation" },
        bodyHtml: {
          uz: "<p><strong>Chiziqli filtrlash</strong> tasvirning har bir pikselini uning qo'shnilari va <strong>filtr yadrosi (kernel)</strong> elementlarining vaznli yig'indisi bilan almashtiradi. Svyortka yadroni 180° aylantirib qo'llaydi (simmetrik yadrolarda korrelyatsiya bilan bir xil natija beradi).</p><p>Yadro koeffitsiyentlari yig'indisi 1 ga teng bo'lishi tasvirning umumiy yorqinligini saqlab qoladi. Chegara piksellar uchun <em>zero-padding</em>, <em>reflect</em> yoki <em>replicate</em> usullari qo'llaniladi.</p>",
          en: "<p><strong>Linear filtering</strong> computes a weighted sum of neighborhood pixels using a <strong>kernel</strong>. Convolution flips the kernel 180° (identical to cross-correlation for symmetric kernels). Kernel weights summing to 1 preserve overall image brightness.</p>"
        },
        latex: "I_{\\text{new}}(x, y) = \\sum_{i=-a}^{a} \\sum_{j=-b}^{b} I(x+i, y+j)\\, K(i, j)",
        widget: 'conv-sim'
      },
      {
        heading: { uz: "4.2. Mean vs Gauss Filtri va Ajraluvchanlik", en: "4.2. Mean vs Gaussian Blur & Separability" },
        bodyHtml: {
          uz: "<p><strong>Mean (O'rtacha) filtr:</strong> Yadroning barcha elementlari $1/N$ teng vaznga ega — oson, ammo chekkalarni kuchli xiralashtiradi va chastota sohasida <em>ringing</em> artefakt berishi mumkin.</p><p><strong>Gauss filtri:</strong> Markaziy pikselga eng katta vazn berib, $\\sigma$ (standart chetlanish) orqali silliqlashni boshqaradi. Yadro o'lchami odatda $\\lceil 6\\sigma + 1 \\rceil$. Muhim afzalligi — <strong>ajraluvchanlik (separable)</strong>: $N\\times N$ 2D svyortka ikkita 1D svyortkaga ajralib, murakkablikni $O(N^2)$ dan $O(2N)$ ga tushiradi!</p>",
          en: "<p><strong>Mean filter:</strong> Uniform $1/N$ weights blur edges heavily and cause frequency ringing. <strong>Gaussian filter:</strong> Smoothly decays weights by distance via $\\sigma$ (kernel size $\\approx \\lceil 6\\sigma+1\\rceil$). Crucially, it is <strong>separable</strong>, reducing complexity from $O(N^2)$ to $O(2N)$.</p>"
        },
        latex: "G(x, y) = \\frac{1}{2\\pi\\sigma^2} \\exp\\!\\left(-\\frac{x^2 + y^2}{2\\sigma^2}\\right)"
      },
      {
        heading: { uz: "4.3. Chastota Sohasi (FFT) va Unsharp Masking", en: "4.3. Frequency Domain (FFT) & Unsharp Masking" },
        bodyHtml: {
          uz: "<p>Svyortka teoremasiga ko'ra fazoviy sohadagi svyortka Furye (chastota) sohasida oddiy ko'paytirishga aylanadi. Silliqlash — past chastotalarni o'tkazuvchi (low-pass) filtr. Tasvirni <strong>o'tkirlashtirish (unsharp masking)</strong> uchun esa asl tasvirdan silliqlangan versiya ayirilib, qoldiq detallar asl tasvirga qo'shiladi: $I_{\\text{sharp}} = I + k(I - G_\\sigma * I)$.</p>",
          en: "<p>By the Convolution Theorem, spatial convolution equals frequency multiplication (low-pass = smoothing). <strong>Unsharp masking</strong> boosts crispness via $I_{\\text{sharp}} = I + k(I - G_\\sigma * I)$.</p>"
        }
      }
    ],
    slides: [
      { title: { uz: "M4: Chiziqli Filtrlar va Svyortka", en: "M4: Linear Filters & Convolution" }, subtitle: { uz: "KOK1506 · Szeliski Ch. 3.2 · COMP4423 L3", en: "KOK1506 · Szeliski Ch. 3.2 · COMP4423 L3" }, points: { uz: ["2D Svyortka vs Korrelyatsiya (180° burilish)", "Mean filtr ($1/k^2$) vs Gauss filtri ($\\sigma$)", "Ajraluvchan filtrlar: $O(N^2) \\to O(2N)$ tezlashuv", "Unsharp Masking va Chastota sohasi (FFT)"], en: ["2D Convolution vs Cross-Correlation", "Mean ($1/k^2$) vs Gaussian ($\\sigma$) smoothing", "Separable kernels: $O(N^2) \\to O(2N)$ speedup", "Unsharp Masking & Frequency Domain (FFT)"] } },
      { title: { uz: "Interaktiv 2D Svyortka (Kernel) Simulatori", en: "Interactive 2D Convolution Simulator" }, widget: 'conv-sim' },
      { title: { uz: "Gauss Taqsimoti va Ajraluvchanlik", en: "Gaussian Kernel & Separability" }, latex: "G(x,y)=\\frac{1}{2\\pi\\sigma^2}e^{-\\frac{x^2+y^2}{2\\sigma^2}}, \\quad \\text{Yadro} \\approx \\lceil 6\\sigma + 1 \\rceil", points: { uz: ["Kichik σ (0.5–1): yengil shovqin tozalash", "Katta σ (3–5): kuchli xiralashtirish, Gauss piramidasi asosi", "9×9 yadroda 81 ta amal o'rniga 9+9=18 ta amal (4.5× tez!)"], en: ["Small σ: subtle denoising; Large σ: strong blur", "Separable 9×9 runs 9+9=18 ops instead of 81 (4.5× faster)"] } }
    ],
    glossary: [
      { uz: "svyortka (konvolyutsiya)", en: "convolution", defUz: "Yadroni tasvir bo'ylab siljitib vaznli yig'indi olish", defEn: "Sliding weighted sum over image neighborhoods" },
      { uz: "ajraluvchan filtr", en: "separable filter", defUz: "2D amalni 1D gorizontal va 1D vertikal amalga ajratish", defEn: "Factorizing 2D kernel into two 1D passes" },
      { uz: "nolli to'ldirish", en: "zero-padding", defUz: "O'lcham saqlash uchun tasvir chetiga nollar qo'shish", defEn: "Adding border zeros to preserve output spatial size" }
    ],
    quiz: [
      { q: { uz: "Mean (o'rtacha) filtrining asosiy kamchiligi nimada?", en: "What is the main drawback of a Mean (box) filter?" }, options: [{ label: 'A', uz: "Hisoblash o'ta murakkab", en: "Too complex to compute" }, { label: 'B', uz: "Chekka va nozik detallarni xiralashtirib yuboradi", en: "It blurs sharp edges and fine details" }, { label: 'C', uz: "Fayl hajmini oshiradi", en: "Increases file size" }, { label: 'D', uz: "Faqat binar rasmda ishlaydi", en: "Works on binary images only" }], answer: 'B', explanation: { uz: "Barcha piksellarga bir xil 1/N vazn berilgani uchun chekkalar ham silliqlanib xiralashadi.", en: "Equal weights across the window smear sharp edge transitions." } },
      { q: { uz: "Ajraluvchan (separable) 9×9 Gauss filtrining hisoblash murakkabligi necha amaldan nechaga kamayadi?", en: "How does separability reduce operations for a 9×9 Gaussian kernel?" }, options: [{ label: 'A', uz: "81 dan 18 ga (O(N²) → O(2N))", en: "From 81 to 18 (O(N²) → O(2N))" }, { label: 'B', uz: "81 dan 9 ga", en: "From 81 to 9" }, { label: 'C', uz: "O'zgarmaydi", en: "No reduction" }, { label: 'D', uz: "18 dan 81 ga oshadi", en: "Increases 18 to 81" }], answer: 'A', explanation: { uz: "2D svyortka ikkita 1D (9+9=18) svyortkaga ajraladi.", en: "Two 1D passes take 9 + 9 = 18 ops instead of 9×9 = 81." } },
      { q: { uz: "Silliqlash yadrosi koeffitsiyentlari yig'indisi nima uchun 1 ga tenglashtiriladi?", en: "Why do smoothing kernel weights sum to 1?" }, options: [{ label: 'A', uz: "Tasvirni kattalashtirish uchun", en: "To enlarge the image" }, { label: 'B', uz: "Tasvirning umumiy yorqinlik darajasini o'zgartirmaslik uchun", en: "To preserve overall image brightness" }, { label: 'C', uz: "Chekkalarni o'chirish uchun", en: "To erase edges" }, { label: 'D', uz: "Paddingni yo'qotish uchun", en: "To remove padding" }], answer: 'B', explanation: { uz: "Yig'indi 1 bo'lsa tekis hududlarning o'rtacha intensivligi saqlanadi.", en: "Unit sum keeps constant intensity regions unchanged." } },
      { q: { uz: "Svyortka va o'zaro korrelyatsiya (cross-correlation) orasidagi asosiy farq nima?", en: "What is the main difference between convolution and cross-correlation?" }, options: [{ label: 'A', uz: "Svyortkada filtr 180° ga ag'dariladi", en: "Convolution flips the kernel 180°" }, { label: 'B', uz: "Korrelyatsiya faqat 1D da ishlaydi", en: "Correlation is 1D only" }, { label: 'C', uz: "Farqi yo'q", en: "No difference" }, { label: 'D', uz: "Svyortka faqat rangli tasvirda ishlaydi", en: "Convolution is color-only" }], answer: 'A', explanation: { uz: "Svyortka amalda yadroni gorizontal va vertikal 180° aylantiradi.", en: "Convolution flips the kernel both horizontally and vertically." } }
    ],
    matching: [
      { left: { uz: "Mean filtr", en: "Mean filter" }, right: { uz: "Barcha vaznlari teng (1/N) oddiy silliqlash", en: "Equal-weight box smoothing" } },
      { left: { uz: "Gauss filtri", en: "Gaussian filter" }, right: { uz: "σ parametrli markazga og'irlik beruvchi ajraluvchi filtr", en: "Separable distance-weighted smoothing via σ" } },
      { left: { uz: "Zero-padding", en: "Zero-padding" }, right: { uz: "Chekka piksellar atrofiga 0 qo'shish", en: "Border zeros preserving output dimensions" } },
      { left: { uz: "Unsharp masking", en: "Unsharp masking" }, right: { uz: "Asl tasvirdan xirasini ayirib o'tkirlashtirish", en: "Sharpening via subtracting blurred version" } }
    ],
    fillGap: [
      { text: { uz: "Gauss filtrida silliqlash kuchini boshqaruvchi standart chetlanish parametri ___ harfi bilan belgilanadi.", en: "The standard deviation parameter controlling Gaussian blur strength is ___." }, answer: ['sigma', 'σ'] },
      { text: { uz: "Svyortka teoremasiga ko'ra fazoviy svyortka Furye (chastota) sohasida ___ amaliga aylanadi.", en: "By the Convolution Theorem, spatial convolution becomes ___ in the frequency domain." }, answer: ["ko'paytirish", 'multiplication'] },
      { text: { uz: "3×3 birlik matritsaning barcha elementlari 1/9 bo'lsa, u ___ filtrini hosil qiladi.", en: "A 3×3 kernel with all entries equal to 1/9 implements a ___ filter." }, answer: ['mean', "o'rtacha", 'box'] }
    ]
  },

  // ==================== M5 ====================
  {
    id: 5,
    code: 'M5',
    labId: 5,
    hours: 2,
    keywords: ['Non-linear Filter', 'Median Filter', 'Salt and Pepper', 'Bilateral Filter', 'Guided Filter', 'Edge-preserving'],
    title: {
      uz: "Tasvirlarga ishlov berishda nochiziqli filtrlar",
      en: "Non-Linear & Edge-Preserving Filters (Median & Bilateral)"
    },
    description: {
      uz: "Nochiziqli filtrlar, Median filtri va 'tuz-murch' (salt-and-pepper) impuls shovqinini tozalash, Bilateral filtr (σ_s, σ_r) va chekkalarni saqlash muvozanati.",
      en: "Non-linear filtering, Median filter against salt-and-pepper impulse noise, Bilateral filter (σ_s, σ_r) & Guided filter for edge-preserving smoothing."
    },
    refs: [
      { label: "COMP4423 L3: Noise Reduction", url: "https://github.com/lookwei/COMP4423" },
      { label: "Szeliski Ch. 3.3: Non-linear Filtering", url: "https://szeliski.org/Book/" },
      { label: "Awesome CV: Edge-Preserving Filtering", url: "https://github.com/jbhuang0604/awesome-computer-vision" }
    ],
    sections: [
      {
        heading: { uz: "5.1. Median Filtri va Statistik Mustahkamlik", en: "5.1. Median Filter & Salt-and-Pepper Denoising" },
        bodyHtml: {
          uz: "<p><strong>Median filtri</strong> oyna ichidagi barcha piksellarni saralab, o'rtadagi elementni (medianani) tanlaydi. Bu usul <strong>impuls ('salt-and-pepper') shovqinini</strong> deyarli izsiz yo'qotadi, chunki ekstremal 0 yoki 255 qiymatlar saralangan qator chetida qoladi va medianaga ta'sir qilmaydi.</p><p>Bundan tashqari, median filtri tasvirda mavjud bo'lmagan 'aralash' qiymat yaratmagani uchun chekkalarni Gauss/Mean filtriga nisbatan ancha yaxshi saqlaydi.</p>",
          en: "<p>The <strong>Median filter</strong> sorts neighborhood intensities and outputs the middle value. It eliminates <strong>salt-and-pepper (impulse) noise</strong> without smearing edges because extreme 0/255 outliers sit at the ends of the sorted list and never affect the median.</p>"
        },
        widget: 'denoise-sim'
      },
      {
        heading: { uz: "5.2. Bilateral Filtr: Chekkalarni Saqlab Silliqlash", en: "5.2. Bilateral Filter: Edge-Preserving Smoothing" },
        bodyHtml: {
          uz: "<p><strong>Bilateral filtr</strong> Gauss filtrini ikki mezon bilan boyitadi: <strong>fazoviy yaqinlik ($\sigma_s$)</strong> va <strong>yorqinlik o'xshashligi ($\sigma_r$)</strong>. Agar qo'shni piksel chekkaning narigi tomonida bo'lsa (yorqinligi keskin farq qilsa), uning vazni $G_{\\sigma_r}(|I_p - I_q|)$ tufayli nolga yaqinlashadi va chekka buzilmaydi!</p><p>Hisoblash tezligini oshirish uchun real vaqtli tizimlarda <strong>Guided Filter</strong> (chiziqli modelga asoslangan tezkor analog) qo'llaniladi.</p>",
          en: "<p>The <strong>Bilateral filter</strong> multiplies a spatial Gaussian ($\\sigma_s$) by a range Gaussian ($\\sigma_r$) on intensity difference. Pixels across a sharp edge receive near-zero weight, preserving crisp boundaries. For faster real-time execution, <strong>Guided Filtering</strong> provides an $O(N)$ linear approximation.</p>"
        },
        latex: "BF[I]_p = \\frac{1}{W_p} \\sum_{q \\in S} G_{\\sigma_s}(\\|p - q\\|)\\, G_{\\sigma_r}(|I_p - I_q|)\\, I_q"
      },
      {
        heading: { uz: "5.3. Shovqin Turiga Qarab Filtr Tanlash Strategiyasi", en: "5.3. Choosing Filters by Noise Model" },
        bodyHtml: {
          uz: "<p>Impuls (salt-and-pepper) shovqini uchun — <strong>Median</strong>; Gauss shovqini bilan chekkalarni saqlash uchun — <strong>Bilateral</strong> yoki <strong>Anizotrop diffuziya (Perona-Malik)</strong>; aralash shovqinlarda avval Median, so'ngra Bilateral/Gauss ketma-ket qo'llaniladi.</p>",
          en: "<p>Use <strong>Median</strong> for impulse noise, <strong>Bilateral / Guided / Anisotropic Diffusion</strong> for edge-preserving Gaussian denoising, and a sequential <strong>Median → Bilateral</strong> pipeline for mixed noise.</p>"
        }
      }
    ],
    slides: [
      { title: { uz: "M5: Nochiziqli Filtrlar (Median & Bilateral)", en: "M5: Non-Linear Filters (Median & Bilateral)" }, subtitle: { uz: "KOK1506 · Szeliski Ch. 3.3", en: "KOK1506 · Szeliski Ch. 3.3" }, points: { uz: ["Median filtri: saralash orqali salt-and-pepper shovqinini yo'qotish", "Bilateral filtr: fazoviy ($\\sigma_s$) × yorqinlik ($\\sigma_r$) vaznlari", "Guided Filter va Perona-Malik anizotrop diffuziyasi", "Chekkalarni saqlab shovqinni kamaytirish strategiyasi"], en: ["Median filter: robust against salt-and-pepper outliers", "Bilateral filter: spatial ($\\sigma_s$) × intensity range ($\\sigma_r$)", "Guided Filter & Perona-Malik anisotropic diffusion", "Sequential Median → Bilateral pipelines"] } },
      { title: { uz: "Interaktiv Shovqin Tozalash: Mean vs Median", en: "Interactive Denoising: Mean vs Median" }, widget: 'denoise-sim' },
      { title: { uz: "Bilateral Filtr Formulasi", en: "Bilateral Filter Formulation" }, latex: "BF[I]_p = \\frac{1}{W_p} \\sum_q G_{\\sigma_s}(\\|p-q\\|)\\, G_{\\sigma_r}(|I_p - I_q|)\\, I_q", points: { uz: ["Kichik σ_r → chekkalar juda keskin saqlanadi", "Katta σ_r → oddiy Gauss filtriga yaqinlashadi"], en: ["Small σ_r → strong edge preservation", "Large σ_r → approaches standard Gaussian blur"] } }
    ],
    glossary: [
      { uz: "median filtri", en: "median filter", defUz: "Oyna qiymatlarini saralab o'rtadagi elementni oluvchi filtr", defEn: "Non-linear filter outputting the neighborhood median" },
      { uz: "bilateral filtr", en: "bilateral filter", defUz: "Fazoviy va yorqinlik masofasini hisobga oluvchi chekka saqlovchi filtr", defEn: "Edge-preserving filter using spatial & intensity weights" },
      { uz: "salt-and-pepper shovqini", en: "salt-and-pepper noise", defUz: "Tasvirda tasodifiy ekstremal oq (255) va qora (0) nuqtalar", defEn: "Sparse random 0 and 255 impulse pixels" }
    ],
    quiz: [
      { q: { uz: "Tasvirdagi 'tuz va murch' (salt-and-pepper) shovqinini chekkalarni saqlab tozalashda qaysi filtr eng samarali?", en: "Which filter is best at removing salt-and-pepper noise while preserving edges?" }, options: [{ label: 'A', uz: "Mean filtri", en: "Mean filter" }, { label: 'B', uz: "Median filtri", en: "Median filter" }, { label: 'C', uz: "Min filtri", en: "Min filter" }, { label: 'D', uz: "Max filtri", en: "Max filter" }], answer: 'B', explanation: { uz: "Ekstremal 0 va 255 qiymatlar saralashda chetga chiqib, mediana qiymatiga ta'sir qilmaydi.", en: "Extreme 0/255 values lie at the ends of the sorted window and do not affect the median." } },
      { q: { uz: "Bilateral filtr oddiy Gauss filtridan qaysi xususiyati bilan farq qiladi?", en: "How does a Bilateral filter differ from a standard Gaussian filter?" }, options: [{ label: 'A', uz: "Faqat 1D signallarda ishlaydi", en: "Works on 1D signals only" }, { label: 'B', uz: "Fazoviy masofadan tashqari piksellar yorqinligi farqini ham hisobga oladi", en: "It weights by intensity difference in addition to spatial distance" }, { label: 'C', uz: "Tasvir o'lchamini kichraytiradi", en: "Downsamples the image" }, { label: 'D', uz: "Chekkalarni o'chirib yuboradi", en: "Erases all edges" }], answer: 'B', explanation: { uz: "Yorqinlik farqi katta bo'lgan chekka narigi tomonidagi piksellarga kichik vazn beradi.", en: "Its range kernel suppresses weights across large intensity jumps (edges)." } },
      { q: { uz: "3×3 oynada [8, 10, 11, 15, 18, 22, 23, 26, 255] qiymatlarining Median filtri natijasi nechaga teng?", en: "What is the 3×3 Median filter output for sorted values [8, 10, 11, 15, 18, 22, 23, 26, 255]?" }, options: [{ label: 'A', uz: "15", en: "15" }, { label: 'B', uz: "18", en: "18" }, { label: 'C', uz: "43.1", en: "43.1" }, { label: 'D', uz: "255", en: "255" }], answer: 'B', explanation: { uz: "9 ta saralangan elementning 5-chi (o'rta) qiymati 18 ga teng.", en: "The 5th element of 9 sorted values is 18." } },
      { q: { uz: "Bilateral filtrdagi σ_r (range sigma) juda katta tanlansa filtr nimaga yaqinlashadi?", en: "When σ_r is very large in a Bilateral filter, what does it converge to?" }, options: [{ label: 'A', uz: "Median filtrga", en: "Median filter" }, { label: 'B', uz: "Oddiy Gauss filtriga", en: "Standard Gaussian filter" }, { label: 'C', uz: "Sobel operatoriga", en: "Sobel operator" }, { label: 'D', uz: "Canny detektoriga", en: "Canny detector" }], answer: 'B', explanation: { uz: "Katta σ_r barcha yorqinlik farqlariga ~1 vazn berib, oddiy Gauss filtriga aylanadi.", en: "Large σ_r makes the range kernel ~1 everywhere, reducing to Gaussian blur." } }
    ],
    matching: [
      { left: { uz: "Median filtri", en: "Median filter" }, right: { uz: "Salt-and-pepper shovqinini izsiz tozalaydi", en: "Removes impulse salt-and-pepper outliers" } },
      { left: { uz: "Bilateral filtr", en: "Bilateral filter" }, right: { uz: "Chekkalarni saqlab Gauss silliqlash (σ_s, σ_r)", en: "Edge-preserving smoothing via spatial & range σ" } },
      { left: { uz: "Guided Filter", en: "Guided Filter" }, right: { uz: "Bilateral filtrning tezkor O(N) analogi", en: "Fast linear-time approximation to bilateral" } },
      { left: { uz: "Mean filtr", en: "Mean filter" }, right: { uz: "Outlier 255 bo'lsa natijani keskin buzadi", en: "Severely skewed by impulse 255 outliers" } }
    ],
    fillGap: [
      { text: { uz: "Tasvirda tasodifiy 0 va 255 piksellar paydo bo'lishi ___ shovqini deb ataladi.", en: "Random 0 and 255 impulse pixels in an image are called ___ noise." }, answer: ['salt-and-pepper', 'impuls', 'tuz va murch'] },
      { text: { uz: "Bilateral filtrda qanday yorqinlik farqi chekka hisoblanishini ___ parametri boshqaradi.", en: "In Bilateral filtering, intensity similarity sensitivity is controlled by ___." }, answer: ['sigmaColor', 'σ_r', 'sigma_r'] },
      { text: { uz: "Median, Min va Max filtrlari ___ filtrlar turkumiga kiradi.", en: "Median, Min, and Max belong to the class of ___ filters." }, answer: ['nochiziqli', 'non-linear', 'nonlinear'] }
    ]
  }
);
