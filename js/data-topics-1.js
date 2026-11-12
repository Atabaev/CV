// M1–M5: Full 80-Minute Lectures (Rich Theory, Derivations, Worked Numerical Examples, Live Python & 15–18 Slides Each)
window.CV_TOPICS = window.CV_TOPICS || [];

window.CV_TOPICS.push(
  // ==================== M1 ====================
  {
    id: 1,
    code: 'M1',
    labId: 1,
    hours: 2,
    keywords: ['Computer Vision', 'Inverse Problem', 'Invariance', 'David Marr', 'AlexNet', 'ViT', 'CLIP', 'COMP4423', 'Szeliski'],
    title: {
      uz: "Kompyuterli ko'rishga kirish va rivojlanish tarixi",
      en: "Introduction to Computer Vision & Historical Evolution"
    },
    description: {
      uz: "Kompyuterli ko'rish teskari masala sifatida, invariantlik muammosi, 1966 MIT Summer Vision dan David Marr, SIFT/HOG, AlexNet va ViT/CLIP gacha rivojlanish, 3-bosqichli SI quvuri va 30 FPS muhandislik murosalari.",
      en: "CV as an inverse problem, the invariance challenge, milestones from 1966 MIT Summer Vision to David Marr, SIFT/HOG, AlexNet & ViT/CLIP, the 3-stage pipeline, and 30 FPS engineering trade-offs."
    },
    refs: [
      { label: "COMP4423 L1: Intro & Setup", url: "https://github.com/lookwei/COMP4423" },
      { label: "Szeliski Ch. 1: Introduction", url: "https://szeliski.org/Book/" },
      { label: "Stanford CS131 Syllabus", url: "https://cs131.stanford.edu/" },
      { label: "Awesome CV: Courses & Books", url: "https://github.com/jbhuang0604/awesome-computer-vision" }
    ],
    sections: [
      {
        heading: { uz: "1.1. Kompyuterli ko'rish, Teskari Masala va Asosiy Vazifalar", en: "1.1. Computer Vision, The Inverse Problem & Core Tasks" },
        bodyHtml: {
          uz: "<p><strong>Kompyuterli ko'rish (Computer Vision, CV)</strong> — kompyuter tizimlariga raqamli tasvir va videolarni tahlil qilish, sahnadagi obyektlarning shakli, harakati va o'zaro joylashuvini tushunish hamda semantik xulosalar chiqarish imkonini beruvchi sun'iy intellekt sohasidir. Inson ko'rish tizimi buni tabiiy ravishda bajarsa-da, kompyuter uchun tasvir shunchaki <strong>sonlar matritsasi</strong> ($H \\times W \\times C$) bo'lib, undan ma'no ajratib olish <strong>teskari masala (inverse problem)</strong> sanaladi: kompyuter grafikasi 3D sahna, yorug'lik va kamera modelidan 2D tasvir yaratsa (to'g'ri masala), CV aksincha 2D piksellardan 3D tuzilma va ma'noni tiklaydi.</p><p><strong>5 ta asosiy CV vazifasi:</strong> (1) <em>Image Classification</em> — butun tasvirga bitta sinf yorlig'i berish; (2) <em>Object Detection</em> — obyekt sinfi + chegaralovchi to'rtburchak (bounding box); (3) <em>Semantic &amp; Instance Segmentation</em> — har bir pikselni sinfga va alohida obyektga bog'lash; (4) <em>Object Tracking</em> — video kadrlarida obyekt trayektoriyasini kuzatish; (5) <em>3D Reconstruction</em> — bir yoki bir nechta tasvirdan fazoviy geometriya tiklash.</p>",
          en: "<p><strong>Computer Vision (CV)</strong> enables machines to extract geometry, motion, and semantics from digital images and video. While human vision feels effortless, machines only observe a numeric tensor ($H \\times W \\times C$), making CV an ill-posed <strong>inverse problem</strong>: Computer Graphics renders 3D scenes into 2D images (forward problem), whereas CV recovers 3D structure and meaning from 2D pixels.</p><p><strong>Five Core Tasks:</strong> Image Classification, Object Detection (class + box), Semantic/Instance Segmentation (pixel masks), Video Object Tracking, and 3D Reconstruction.</p>"
        },
        table: {
          headers: { uz: ["Mezon", "Kompyuter Grafikasi", "Kompyuterli Ko'rish"], en: ["Criterion", "Computer Graphics", "Computer Vision"] },
          rows: {
            uz: [
              ["Masala yo'nalishi", "To'g'ri masala (Forward)", "Teskari masala (Inverse, ill-posed)"],
              ["Kirish ma'lumoti", "3D geometriya, material, yorug'lik", "2D/video piksellar matritsasi (uint8 / float32)"],
              ["Chiqish natijasi", "Sintetik 2D tasvir", "Sinflar, Box, Maskalar, 3D chuqurlik/xarita"]
            ],
            en: [
              ["Direction", "Forward rendering", "Inverse estimation (ill-posed)"],
              ["Input", "3D meshes, materials, lights", "2D pixel matrices (uint8 / float32)"],
              ["Output", "Rendered 2D image", "Labels, boxes, masks, 3D point clouds"]
            ]
          }
        }
      },
      {
        heading: { uz: "1.2. Invariantlik Muammosi va Interdisiplinar Tabiat", en: "1.2. The Invariance Problem & Interdisciplinary Foundations" },
        bodyHtml: {
          uz: "<p>Kompyuterli ko'rishning fundamental murakkabligi <strong>invariantlik muammosi (invariance problem)</strong> bilan bog'liq: bir xil jismoniy obyekt yoritilganlik, kamera burchagi (viewpoint), masshtab (scale), deformatsiya, fokus xiraligi va qisman to'silish (<em>occlusion</em>) o'zgarganda mutlaqo boshqa piksel qiymatlari matritsasini beradi. Masalan, 1920×1080×3 Full-HD kadrda <strong>6,220,800 ta</strong> xom son mavjud — oddiy soya tushishi minglab sonlarni siljitib yuboradi, shu bois <code>if-else</code> qoidalari ishlamaydi.</p><p>CV bir vaqtning o'zida <strong>Fizika</strong> (optika, yorug'lik aks etishi), <strong>Matematika</strong> (chiziqli algebra, proyeksiv geometriya, optimallashtirish), <strong>Informatika</strong> (algoritmlar, GPU parallel hisoblash) va <strong>Neyrofiziologiya</strong> (ko'rish po'stlog'i V1–V4 iyerarxiyasi) kesishmasida shakllangan.</p>",
          en: "<p>The central hurdle in CV is the <strong>invariance problem</strong>: an identical object yields dramatically different pixel arrays under changing illumination, viewpoint, scale, non-rigid deformation, motion blur, and partial occlusion. A 1920×1080×3 frame contains <strong>6,220,800 raw integers</strong>, making brittle <code>if-else</code> heuristics hopeless.</p><p>CV bridges <strong>Physics</strong> (optics &amp; radiometry), <strong>Mathematics</strong> (linear algebra, projective geometry, probability), <strong>CS</strong> (GPU parallel computing), and <strong>Neuroscience</strong> (V1–V4 hierarchical cortex).</p>"
        },
        callout: {
          type: 'warn',
          uz: "<strong>Yodda tuting:</strong> Yaxshi CV algoritmi foydali <em>o'zgarishlarga</em> sezgir (masalan, mushuk vs it), lekin keraksiz omillarga (yorug'lik, kamera burchagi, shovqin) nisbatan <strong>invariant</strong> bo'lishi kerak.",
          en: "<strong>Core Principle:</strong> A strong CV representation must remain sensitive to semantic class differences while staying invariant to nuisance factors like lighting, pose, and background clutter."
        }
      },
      {
        heading: { uz: "1.3. Sohaning Rivojlanish Bosqichlari (1966–2026)", en: "1.3. Historical Evolution of Computer Vision (1966–2026)" },
        bodyHtml: {
          uz: "<p><strong>1966:</strong> MIT dagi mashhur <em>Summer Vision Project</em> (Seymour Papert) bir yozda ko'rish tizimi qurishni maqsad qilib, muammoning naqadar chuqurligini ochib berdi.<br><strong>1970–1980-yillar:</strong> <strong>David Marr</strong> 3 bosqichli ko'rish nazariyasini (<em>Primal Sketch → 2.5D Sketch → 3D Model</em>) ilgari surdi; Sobel va <strong>Canny (1986)</strong> chekka detektorlari hamda Lucas-Kanade (1981) optik oqimi yaratildi.<br><strong>1999–2005:</strong> Qo'lda loyihalashtirilgan lokal deskriptorlar — <strong>SIFT (Lowe, 1999)</strong>, <strong>Viola-Jones (2001)</strong> real vaqtli yuz aniqlash va <strong>HOG (Dalal-Triggs, 2005)</strong> SVM bilan yetakchilik qildi.<br><strong>2012–2019:</strong> <strong>AlexNet (2012)</strong> ImageNet Top-5 xatoligini ~26% dan ~15.3% gacha pasaytirib <em>Deep Learning</em> davrini boshladi; VGG, ResNet, Faster R-CNN, YOLO, Mask R-CNN paydo bo'ldi.<br><strong>2020–2026:</strong> <strong>Vision Transformer (ViT)</strong>, <strong>CLIP / VLM</strong> (matn + tasvir), <strong>SAM</strong> va 3D Gaussian Splatting / Diffusion modellari sohaning zamonaviy cho'qqisini egalladi.</p>",
          en: "<p><strong>1966:</strong> MIT <em>Summer Vision Project</em> underestimated vision complexity.<br><strong>1970s–80s:</strong> <strong>David Marr</strong> proposed <em>Primal → 2.5D → 3D</em> representation stages alongside Canny (1986) edges and Lucas-Kanade optical flow.<br><strong>1999–2005:</strong> Hand-crafted features &amp; classical ML dominated: <strong>SIFT (1999)</strong>, <strong>Viola-Jones (2001)</strong>, <strong>HOG + SVM (2005)</strong>.<br><strong>2012–2019:</strong> <strong>AlexNet (2012)</strong> slashed ImageNet Top-5 error from ~26% to 15.3%, launching VGG, ResNet, Faster R-CNN, YOLO, and U-Net.<br><strong>2020–2026:</strong> <strong>Vision Transformers (ViT)</strong>, multimodal <strong>CLIP / VLMs</strong>, SAM, Diffusion, and Neural 3D lead the frontier.</p>"
        },
        widget: 'cv-pipeline'
      },
      {
        heading: { uz: "1.4. 3-Bosqichli Vizual SI Quvuri va Muhandislik Hisob-kitobi", en: "1.4. 3-Stage Visual Pipeline & Engineering Trade-Off Calculation" },
        bodyHtml: {
          uz: "<p>An'anaviy tizimlarda uchta alohida modul ketma-ket ishlaydi: <strong>(1) Preprocessing</strong> (shovqin tozalash, resize, normallashtirish) → <strong>(2) Feature Extraction</strong> (chekkalar, SIFT/HOG) → <strong>(3) Decision Making</strong> (SVM/k-NN). Chuqur neyron tarmoqlarda esa 2 va 3-bosqichlar birlashib <strong>end-to-end</strong> o'qitiladi.</p><p><strong>Amaliy muhandislik misoli (30 FPS konveyer tizimi):</strong> Zavod konveyerida sekundiga 30 ta detal o'tadi. Har bir kadrni qayta ishlash byudjeti: $\\Delta t_{\\max} = \\frac{1000\\text{ ms}}{30} = 33.3\\text{ ms}$. Agar kamera + preprocessing 5 ms va qaror uzatish 3 ms olsa, neyron tarmoq inferensiyasiga atigi <strong>25.3 ms</strong> qoladi! Shu sababli 2-bosqichli og'ir <em>Faster R-CNN</em> (~90 ms = 11 FPS) o'rniga 1-bosqichli <em>YOLO-nano/small</em> (~8 ms = 125 FPS) tanlanadi.</p>",
          en: "<p>Classical CV pipelines separate <strong>Preprocessing → Feature Extraction → Classifier</strong>, whereas Deep Learning learns feature extractors and classifiers jointly <strong>end-to-end</strong>.</p><p><strong>Real-Time Engineering Budget (30 FPS Conveyor):</strong> Frame budget is $\\Delta t_{\\max} = \\frac{1000\\text{ ms}}{30} = 33.3\\text{ ms}$. Subtracting 5 ms capture/resize and 3 ms PLC signaling leaves <strong>25.3 ms</strong> for inference—favoring single-stage <em>YOLO</em> (~8 ms) over two-stage <em>Faster R-CNN</em> (~90 ms).</p>"
        },
        latex: "\\text{FPS}_{\\max} = \\frac{1000\\text{ ms}}{t_{\\text{pre}} + t_{\\text{model}} + t_{\\text{post}}}, \\quad \\text{Tensor Size} = H \\times W \\times C",
        code: `import cv2, time, numpy as np

# 1. Tasvir o'lchami va xotira byudjetini tekshirish
img = np.random.randint(0, 256, (1080, 1920, 3), dtype=np.uint8)
print("Shape:", img.shape, "| Raw bytes:", img.nbytes, f"({img.nbytes/1e6:.2f} MB)")

# 2. 30 FPS byudjeti doirasida preprocessing tezligini o'lchash
t0 = time.perf_counter()
small = cv2.resize(img, (640, 640), interpolation=cv2.INTER_LINEAR)
rgb = cv2.cvtColor(small, cv2.COLOR_BGR2RGB).astype(np.float32) / 255.0
dt_ms = (time.perf_counter() - t0) * 1000
print(f"Preprocess latency: {dt_ms:.2f} ms (30 FPS budget = 33.33 ms)")`
      },
      {
        heading: { uz: "1.5. Dataset Muammolari, Augmentatsiya va Algoritmik Adolat", en: "1.5. Dataset Engineering, Class Imbalance & AI Ethics" },
        bodyHtml: {
          uz: "<p>Model sifatining 70%+ qismi ma'lumotlar to'plamiga bog'liq: <strong>ImageNet</strong> (1.2M tasvir, 1000 sinf), <strong>COCO</strong> (330K tasvir, 80 sinf), <strong>Pascal VOC</strong>. Amaliy loyihalarda uchta asosiy xavf mavjud: (1) <em>Class Imbalance</em> — nuqsonli detallar sog'lomlardan 100× kam bo'lsa model hamma narsani 'sog'lom' deb belgilaydi; (2) <em>Label Noise</em> — noto'g'ri annotatsiya; (3) <em>Algoritmik adolat va maxfiylik</em> — biometrik tizimlarda barcha demografik guruhlarda teng aniqlik va shaxsiy ma'lumotlarni himoyalash.</p>",
          en: "<p>Model performance hinges on dataset quality (ImageNet, COCO, MVTec AD). Key pitfalls include <strong>Class Imbalance</strong> (rare defects ignored), <strong>Label Noise</strong>, overfitting prevented by <strong>Data Augmentation</strong>, and <strong>Algorithmic Fairness &amp; Privacy</strong> in biometric surveillance.</p>"
        },
        discussion: {
          q: { uz: "Konveyer nuqsonlarini aniqlashda 99% detallar sog'lom, 1% nuqsonli bo'lsa: faqat Accuracy=99% chiqqan model foydalimi?", en: "If 99% of factory parts are clean and 1% are defective, is a model with 99% Accuracy good enough?" },
          a: { uz: "Yo'q! Hammasini 'sog'lom' deb aytadigan ahmoqona model ham 99% Accuracy beradi, lekin 100% nuqsonni o'tkazib yuboradi (Recall=0). Bunda Precision, Recall, F1 va PR-AUC ishlatish va oversampling/focal loss qo'llash shart.", en: "No! A trivial classifier predicting 'clean' always scores 99% Accuracy with 0% defect Recall. We must evaluate Precision/Recall/F1 and use focal loss or balanced sampling." }
        }
      }
    ],
    slides: [
      { title: { uz: "1.1. Kompyuterli Ko'rish Nima?", en: "1.1. What is Computer Vision?" }, points: { uz: ["Tasvir va videodan ma'noli semantik axborot ajratish fani", "Kompyuter uchun tasvir: H × W × C sonlar matritsasi", "Kompyuter Grafikasi (To'g'ri masala): 3D → 2D", "Kompyuterli Ko'rish (Teskari masala): 2D → 3D & Semantika"], en: ["Extracting high-level semantic meaning from pixels", "To machines, an image is just a H × W × C matrix", "Computer Graphics (Forward): 3D scene → 2D pixels", "Computer Vision (Inverse): 2D pixels → 3D & meaning"] } },
      { title: { uz: "Grafika vs Ko'rish: Taqqoslash", en: "Graphics vs Vision Comparison" }, table: { headers: { uz: ["Mezon", "Kompyuter Grafikasi", "Kompyuterli Ko'rish"], en: ["Dimension", "Computer Graphics", "Computer Vision"] }, rows: { uz: [["Masala turi", "To'g'ri masala (Forward)", "Teskari masala (Inverse)"], ["Kirish", "3D model, yorug'lik, kamera", "2D piksellar matritsasi (H×W×3)"], ["Chiqish", "2D sintetik tasvir", "Sinflar, Box, Maska, 3D struktura"]], en: [["Problem Type", "Forward problem", "Inverse problem"], ["Input", "3D scene, lighting, camera", "2D pixel array (H×W×3)"], ["Output", "2D rendered image", "Labels, Boxes, Masks, 3D geometry"]] } } },
      { title: { uz: "CV ning 5 ta Asosiy Vazifasi", en: "5 Core Computer Vision Tasks" }, points: { uz: ["1. Image Classification: 'Bu mushuk' (butun rasmga 1 yorliq)", "2. Object Detection: Sinf + Bounding Box (x, y, w, h)", "3. Semantic Segmentation: Har bir pikselga sinf yorlig'i", "4. Instance Segmentation: Har bir alohida obyektga maska", "5. Tracking & 3D Reconstruction: Vaqt va chuqurlik tahlili"], en: ["1. Classification: Global label per image", "2. Detection: Class + Bounding Box localization", "3. Semantic Segmentation: Per-pixel class labels", "4. Instance Segmentation: Pixel mask per individual object", "5. Video Tracking & 3D Reconstruction"] } },
      { title: { uz: "Asosiy Qiyinchilik: Invariantlik Muammosi", en: "Core Challenge: The Invariance Problem" }, points: { uz: ["Yoritilganlik o'zgarishi va soyalar piksel sonlarini keskin siljitadi", "Nuqtai nazar (Viewpoint) va perspektiv buzilishlar", "Masshtab o'zgarishi (yaqin vs uzoq obyektlar)", "Qisman to'silish (Occlusion) va deformatsiya", "Shovqin va harakat xiraligi (Motion blur)"], en: ["Illumination & shadows alter all raw intensities", "Viewpoint & foreshortening distortions", "Scale variation across camera distances", "Partial occlusion & non-rigid deformation", "Sensor noise & motion blur"] } },
      { title: { uz: "Tarixiy Evolyutsiya (1966–2026)", en: "Historical Milestones (1966–2026)" }, points: { uz: ["1966: MIT Summer Vision Project (boshlanish)", "1970–86: David Marr (2.5D eskiz), Lucas-Kanade, Canny chekkalari", "1999–2005: SIFT (1999), Viola-Jones yuz (2001), HOG+SVM (2005)", "2012: AlexNet (ImageNet xatosi 26% → 15.3%) — Deep Learning boom", "2020–26: ResNet, YOLO, U-Net → ViT, CLIP, SAM, Diffusion, 3D"], en: ["1966: MIT Summer Vision Project", "1970–86: David Marr, Lucas-Kanade flow, Canny (1986)", "1999–2005: SIFT, Viola-Jones (2001), HOG+SVM (2005)", "2012: AlexNet (26% → 15.3% error) ignites Deep Learning", "2020–26: ViT, CLIP VLMs, SAM, Diffusion & Neural 3D"] } },
      { title: { uz: "Interaktiv Vizual SI Quvuri", en: "Interactive Visual AI Pipeline" }, widget: 'cv-pipeline' },
      { title: { uz: "Klassik Quvur vs End-to-End Deep Learning", en: "Classical Pipeline vs End-to-End Deep Learning" }, table: { headers: { uz: ["Bosqich", "Klassik CV", "Chuqur O'qitish (CNN/ViT)"], en: ["Stage", "Classical CV", "Deep Learning (CNN/ViT)"] }, rows: { uz: [["Preprocessing", "Gauss, Resize, HSV", "Resize, Mean/Std Normalize"], ["Features", "Qo'lda (SIFT, HOG, Canny)", "Avtomatik o'rganilgan (Conv/Attention)"], ["Decision", "SVM, k-NN, Random Forest", "Softmax / MLP boshi (end-to-end)"], ["Ma'lumot talabi", "Kam (100–1000 rasm)", "Katta (10K–1M+ rasm yoki Transfer Learning)"]], en: [["Preprocessing", "Gaussian, Resize, HSV", "Resize, Normalization"], ["Features", "Hand-crafted (SIFT, HOG)", "Learned end-to-end layers"], ["Decision", "SVM, k-NN", "Linear/Softmax Head"], ["Data Needed", "Small (100s)", "Large or Transfer Learning"]] } } },
      { title: { uz: "Sonli Misol: 30 FPS Real-Vaqt Byudjeti", en: "Worked Example: 30 FPS Latency Budget" }, latex: "\\Delta t_{\\max} = \\frac{1000\\text{ ms}}{30\\text{ FPS}} = 33.33\\text{ ms/kadr}", points: { uz: ["Kamera o'qish + Resize/Normalize: ~5.0 ms", "PLC / Tizimga signal uzatish: ~3.0 ms", "Neyron tarmoq uchun qolgan vaqt: 33.3 - 8.0 = 25.3 ms", "Faster R-CNN (~90 ms = 11 FPS) yaramaydi → YOLO (~8 ms) tanlanadi!"], en: ["Capture + Preprocessing: ~5.0 ms", "Postprocess + PLC output: ~3.0 ms", "Model budget left: 33.3 - 8.0 = 25.3 ms", "Faster R-CNN (~90 ms) fails → choose YOLO (~8 ms = 125 FPS)!"] } },
      { title: { uz: "Python Profilaktika: Full-HD Hajm va Latency", en: "Python Code Walkthrough: Frame Memory & Latency" }, code: `import cv2, time, numpy as np
img = np.random.randint(0, 256, (1080, 1920, 3), dtype=np.uint8)
print("Shape:", img.shape, "MB:", img.nbytes / 1e6)  # 6.22 MB
t0 = time.perf_counter()
inp = cv2.cvtColor(cv2.resize(img, (640, 640)), cv2.COLOR_BGR2RGB)
print(f"Preprocess: {(time.perf_counter()-t0)*1000:.2f} ms")` },
      { title: { uz: "Dataset, Augmentatsiya va Etika", en: "Datasets, Augmentation & Algorithmic Fairness" }, points: { uz: ["ImageNet (1.2M), COCO (330K), MVTec AD (sanoat nuqsonlari)", "Class Imbalance: 99% sog'lom vs 1% nuqson → Accuracy aldashi mumkin!", "Data Augmentation: flip, crop, color jitter → overfittingga qarshi", "Etika: yuzni tanishda shaxsiy daxlsizlik va demografik adolat"], en: ["ImageNet, COCO, MVTec AD benchmarks", "Class Imbalance: 99% clean makes raw Accuracy misleading", "Data Augmentation prevents overfitting on small sets", "Ethics: privacy, consent & demographic fairness"] } },
      { title: { uz: "Guruh Muhokamasi: 99% Accuracy Tuzog'i", en: "Group Discussion: The 99% Accuracy Trap" }, discussion: { q: { uz: "Zavodda 1% detallarda yoriq bor. Model barcha detallarni 'yaroqli' desa Accuracy 99% chiqadi. Qanday xato va qaysi metrika kerak?", en: "If 1% of parts are defective, a dummy model predicting 'pass' scores 99% Accuracy. What failed and how do we measure properly?" }, a: { uz: "Nuqsonli sinf bo'yicha Recall=0%. Accuracy o'rniga F1-score, PR-AUC va sinfga vaznli Focal Loss ishlatish shart.", en: "Defect Recall is 0%! Use Precision, Recall, F1-score, PR-AUC, and class-weighted or Focal Loss." } } }
    ],
    glossary: [
      { uz: "teskari masala", en: "inverse problem", defUz: "2D piksellardan sahnaning 3D tuzilmasi va semantik ma'nosini tiklash", defEn: "Recovering 3D scene properties and semantics from 2D pixel projections" },
      { uz: "invariantlik", en: "invariance", defUz: "Yoritilganlik, masshtab va burchak o'zgarganda belgining saqlanib qolishi", defEn: "Stability of features under illumination, scale, or viewpoint changes" },
      { uz: "end-to-end o'qitish", en: "end-to-end learning", defUz: "Xususiyat ajratish va qaror chiqarishni bitta tarmoqda birga o'qitish", defEn: "Jointly training feature extraction and decision head in one network" },
      { uz: "kadr tezligi (FPS)", en: "frames per second", defUz: "Tizim bir soniyada qayta ishlay oladigan tasvirlar soni", defEn: "Number of frames a vision pipeline processes each second" }
    ],
    quiz: [
      { q: { uz: "Kompyuterli ko'rish nima uchun 'teskari masala' (inverse problem) hisoblanadi?", en: "Why is Computer Vision considered an 'inverse problem'?" }, options: [{ label: 'A', uz: "Chunki u 3D modeldan 2D tasvir yaratadi", en: "Because it renders 3D scenes to 2D" }, { label: 'B', uz: "Chunki u 2D piksellar matritsasidan 3D sahna va semantik ma'noni tiklaydi", en: "Because it reconstructs 3D structure and semantics from 2D pixels" }, { label: 'C', uz: "Chunki u faqat kulrang tasvir bilan ishlaydi", en: "Because it uses grayscale images only" }, { label: 'D', uz: "Chunki matritsa o'lchami manfiy bo'ladi", en: "Because pixel matrices are negative" }], answer: 'B', explanation: { uz: "Kompyuter grafikasi 3D→2D to'g'ri masalani, CV esa 2D→3D/semantika teskari masalani yechadi.", en: "Computer graphics solves 3D→2D (forward); CV solves 2D→3D/semantics (inverse)." } },
      { q: { uz: "2012-yilda chuqur o'qitish (Deep Learning) inqilobini boshlab bergan mashhur CNN modeli qaysi?", en: "Which 2012 CNN architecture sparked the Deep Learning revolution in CV?" }, options: [{ label: 'A', uz: "Viola-Jones", en: "Viola-Jones" }, { label: 'B', uz: "SIFT", en: "SIFT" }, { label: 'C', uz: "AlexNet", en: "AlexNet" }, { label: 'D', uz: "Canny", en: "Canny" }], answer: 'C', explanation: { uz: "AlexNet 2012-yilda ImageNet musobaqasida xatolikni keskin kamaytirib tarixiy burilish yasadi.", en: "AlexNet dramatically won ImageNet 2012, launching deep learning in CV." } },
      { q: { uz: "30 FPS real vaqtli tizimda har bir kadrga maksimal qancha vaqt byudjeti to'g'ri keladi?", en: "What is the maximum per-frame latency budget for a 30 FPS real-time system?" }, options: [{ label: 'A', uz: "33.3 millisekund", en: "33.3 milliseconds" }, { label: 'B', uz: "100 millisekund", en: "100 milliseconds" }, { label: 'C', uz: "1 millisekund", en: "1 millisecond" }, { label: 'D', uz: "300 millisekund", en: "300 milliseconds" }], answer: 'A', explanation: { uz: "1000 ms / 30 FPS ≈ 33.33 ms/kadr.", en: "1000 ms / 30 FPS ≈ 33.33 ms per frame." } },
      { q: { uz: "Bir xil obyekt yoritilganlik, burchak va masshtab o'zgarganda ham tanilishi qaysi muammoga kiradi?", en: "Recognizing an object across varying light, scale, and pose addresses which challenge?" }, options: [{ label: 'A', uz: "Overfitting", en: "Overfitting" }, { label: 'B', uz: "Invariantlik muammosi (Invariance)", en: "The Invariance Problem" }, { label: 'C', uz: "Aliasing", en: "Aliasing" }, { label: 'D', uz: "Quantization", en: "Quantization" }], answer: 'B', explanation: { uz: "Invariantlik — keraksiz geometrik/yorug'lik o'zgarishlariga barqarorlik demakdir.", en: "Invariance keeps predictions stable under lighting, scale, and pose variations." } }
    ],
    matching: [
      { left: { uz: "David Marr (1970-80)", en: "David Marr (1970s–80s)" }, right: { uz: "Primal → 2.5D → 3D bosqichli tasvir nazariyasi", en: "Staged Primal → 2.5D → 3D vision theory" } },
      { left: { uz: "SIFT / HOG", en: "SIFT / HOG" }, right: { uz: "Qo'lda yaratilgan lokal xususiyat deskriptorlari", en: "Hand-crafted feature descriptors" } },
      { left: { uz: "AlexNet (2012)", en: "AlexNet (2012)" }, right: { uz: "ImageNet g'olibi va Chuqur o'qitish burilishi", en: "ImageNet breakthrough starting deep learning" } },
      { left: { uz: "ViT / CLIP", en: "ViT / CLIP" }, right: { uz: "Zamonaviy transformer va ko'p modalli modellar", en: "Modern transformer & vision-language models" } }
    ],
    fillGap: [
      { text: { uz: "2D tasvirdan 3D tuzilma va ma'no tiklagani uchun CV ___ masala hisoblanadi.", en: "Recovering 3D structure from 2D pixels makes CV an ___ problem." }, answer: ['teskari', 'inverse'] },
      { text: { uz: "30 FPS talab qiluvchi konveyer tizimida bitta kadr uchun maksimal vaqt byudjeti ___ millisekund.", en: "At 30 FPS, the per-frame time budget is ___ milliseconds." }, answer: ['33', '33.3'] },
      { text: { uz: "1966-yilda kompyuterli ko'rish tarixini boshlab bergan loyiha MIT ___ deb ataladi.", en: "The 1966 MIT project that kicked off CV is the ___ Vision Project." }, answer: ['Summer Vision Project', 'Summer'] }
    ]
  },

  // ==================== M2 ====================
  {
    id: 2,
    code: 'M2',
    labId: 2,
    hours: 2,
    keywords: ['Pixel', 'Sampling', 'Quantization', 'Bit Depth', 'Nyquist', 'JPEG', 'PNG', 'BMP', 'PSNR', 'SSIM'],
    title: {
      uz: "Raqamli tasvirlar va ularni tasvirlash usullari",
      en: "Digital Images, Sampling, Quantization & Formats"
    },
    description: {
      uz: "f(x,y) matritsa modeli, fazoviy diskretizatsiya va kvantlash, Nikvist-Shennon va aliasing, bit chuqurligi (posterizatsiya), BMP vs JPEG (8×8 DCT) vs PNG (DEFLATE + Alpha) va PSNR/SSIM.",
      en: "2D f(x,y) matrix representation, spatial sampling & quantization, Nyquist aliasing, bit depth & posterization, BMP vs JPEG (8×8 DCT) vs PNG (DEFLATE + Alpha), and PSNR/SSIM."
    },
    refs: [
      { label: "COMP4423 L2: Image Representation", url: "https://github.com/lookwei/COMP4423" },
      { label: "Szeliski Ch. 2.3: Digital Camera Pipeline", url: "https://szeliski.org/Book/" },
      { label: "OpenCV Image I/O Docs", url: "https://docs.opencv.org" }
    ],
    sections: [
      {
        heading: { uz: "2.1. Uzluksiz Sahnadan Matritsaga: Diskretizatsiya va Kvantlash", en: "2.1. Continuous Light to Matrix: Sampling & Quantization" },
        bodyHtml: {
          uz: "<p>Jismoniy dunyodagi yorug'lik uzluksiz $f(x, y)$ funksiyadir. Kompyuterda saqlash uchun ikki amal bajariladi: (1) <strong>Fazoviy diskretizatsiya (Sampling)</strong> — uzluksiz fazoni $M \\times N$ to'r (<em>grid</em>) nuqtalariga (piksellarga) bo'lish; (2) <strong>Kvantlash (Quantization)</strong> — har bir piksel yorqinligini $2^b$ ta chekli darajaga yaxlitlash (odatda $b=8$ bit → $[0, 255]$).</p><p><strong>Nyquist–Shannon teoremasi &amp; Aliasing:</strong> Agar diskretlash chastotasi signalning maksimal chastotasidan kamida $2\\times$ katta bo'lmasa ($f_s &lt; 2f_{\\max}$), mayda chiziqli naqshlarda soxta past chastotali to'lqinlar — <strong>aliasing (Moiré effekti)</strong> paydo bo'ladi! Kamera sensorlarida (CCD vs CMOS) CMOS kam energiya va yuqori tezlik tufayli ustunlik qiladi.</p>",
          en: "<p>Digitizing continuous light $f(x,y)$ requires <strong>Sampling</strong> onto an $M \\times N$ pixel grid and <strong>Quantization</strong> into $2^b$ discrete intensity levels ($b=8 \\Rightarrow 0..255$).</p><p><strong>Nyquist &amp; Aliasing:</strong> Sampling below $2f_{\\max}$ introduces fake Moiré patterns (aliasing). Modern cameras favor fast, low-power CMOS sensors over CCDs.</p>"
        },
        widget: 'pixel-matrix'
      },
      {
        heading: { uz: "2.2. Bit Chuqurligi, Dinamik Diapazon va Posterizatsiya", en: "2.2. Bit Depth, Dynamic Range & Posterization" },
        bodyHtml: {
          uz: "<p><strong>Bit chuqurligi ($b$)</strong> — bitta kanalda nechta yorqinlik gradatsiyasini kodlash mumkinligini belgilaydi ($2^b$). Standart 8-bitli RGB tasvir $2^8 \\times 2^8 \\times 2^8 = 2^{24} \\approx 16.7\\text{ million}$ rang beradi (3 bayt/piksel). Tibbiy rentgen/MRT va HDR fotografiyada nozik kontrastlarni yo'qotmaslik uchun <strong>12–16 bit</strong> ishlatiladi.</p><p>Agar bit chuqurligi juda past tushirilsa (masalan, 8-bit → 3-bit = 8 daraja), silliq osmon gradientlari zinapoyaga o'xshash tekis bo'laklarga ajralib qoladi — bu <strong>posterizatsiya (banding)</strong> deyiladi.</p>",
          en: "<p><strong>Bit depth $b$</strong> encodes $2^b$ intensity levels per channel. 8-bit RGB provides $2^{24} \\approx 16.7$M colors (3 bytes/pixel), whereas medical X-ray/MRI and RAW HDR imaging use <strong>12–16 bits</strong> for higher dynamic range.</p><p>Reducing bit depth (e.g. 8-bit → 3-bit) causes false contour bands called <strong>posterization</strong>.</p>"
        },
        latex: "\\text{Levels} = 2^b, \\quad \\text{Uncompressed Bytes} = H \\times W \\times C \\times \\frac{b}{8}"
      },
      {
        heading: { uz: "2.3. BMP vs JPEG vs PNG Formatlari va PSNR / SSIM Metrikalari", en: "2.3. BMP vs JPEG vs PNG Formats & PSNR / SSIM" },
        bodyHtml: {
          uz: "<p><strong>BMP:</strong> Siqishsiz xom matritsa — 100% sifat, tezkor I/O, lekin ulkan fayl.<br><strong>JPEG:</strong> Yo'qotishli (lossy) siqish — tasvir <strong>8×8 bloklarga</strong> bo'linib Diskret Kosinus O'zgartirish (<strong>DCT</strong>) orqali yuqori chastotalar kvantlanadi; hajm 10–20× kichrayadi, ammo past sifatda <em>blocking</em> artefaktlari chiqadi (CV datasetida sifatsiz JPEG kichik detallarni buzadi!).<br><strong>PNG:</strong> Yo'qotishsiz (<em>DEFLATE</em>), 4-chi <strong>Alpha (shaffoflik)</strong> kanalini qo'llaydi.<br><strong>WebP / AVIF:</strong> Ham lossy, ham lossless qo'llab-quvvatlovchi zamonaviy veb formatlar.</p><p>Sifatni o'lchash: <strong>PSNR (dB)</strong> piksel kvadrat xatosi MSE ga asoslanadi (odatda ≥ 30 dB yaxshi); <strong>SSIM ∈ [0, 1]</strong> esa inson ko'ziga mos tuzilmaviy o'xshashlikni o'lchaydi.</p>",
          en: "<p><strong>BMP:</strong> Uncompressed raw array. <strong>JPEG:</strong> Lossy 8×8 <strong>DCT</strong> compression shrinking photos 10–20× but introducing blocking artifacts at low quality. <strong>PNG:</strong> Lossless DEFLATE with <strong>Alpha transparency</strong>. <strong>WebP/AVIF:</strong> Modern dual-mode formats.</p><p>Quality metrics: <strong>PSNR (dB)</strong> measures log-ratio of max signal to MSE (≥30 dB is good); <strong>SSIM ∈ [0,1]</strong> captures structural similarity matching human vision.</p>"
        },
        latex: "\\text{MSE}=\\frac{1}{MN}\\sum_{x,y}(I-\\hat{I})^2, \\quad \\text{PSNR}=10\\log_{10}\\!\\left(\\frac{255^2}{\\text{MSE}}\\right)\\text{ dB}"
      },
      {
        heading: { uz: "2.4. Sonli Hisoblash Misoli: Full-HD Xotira, 16-bit va JPEG PSNR", en: "2.4. Worked Numerical Example: Full-HD Bytes, 16-bit & PSNR" },
        bodyHtml: {
          uz: "<p><strong>Masala 1 (Fayl hajmi):</strong> Full-HD $1920 \\times 1080$, 8-bit RGB tasvirning xom hajmini toping:<br>• Piksellar soni: $1920 \\times 1080 = 2,073,600$ piksel.<br>• 8-bit RGB = 3 bayt/piksel → $2,073,600 \\times 3 = 6,220,800\\text{ bayt} \\approx \\mathbf{5.93\\text{ MiB}}$.<br>• Agar 16-bit tibbiy rangli tasvirga o'tsak: $6,220,800 \\times 2 \\approx \\mathbf{11.86\\text{ MiB}}$ (2× o'sish).<br>• Agar 30 FPS video oqimi bo'lsa: $5.93 \\times 30 = \\mathbf{177.9\\text{ MB/s}}$ (siqishsiz video kanalni to'ldirib yuboradi!).</p><p><strong>Masala 2 (PSNR):</strong> Agar JPEG (quality=30) dan keyin piksellar o'rtacha kvadrat xatosi $\\text{MSE} = 65.025$ chiqsa: $\\text{PSNR} = 10 \\log_{10}(255^2 / 65.025) = 10 \\log_{10}(65025 / 65.025) = 10 \\log_{10}(1000) = \\mathbf{30.0\\text{ dB}}$.</p>",
          en: "<p><strong>Problem 1 (Memory):</strong> For 8-bit Full-HD ($1920\\times 1080 \\times 3$): $2,073,600 \\times 3 = 6,220,800\\text{ bytes} \\approx \\mathbf{5.93\\text{ MiB}}$. At 16-bit: $\\mathbf{11.86\\text{ MiB}}$. Uncompressed 30 FPS video demands $\\mathbf{177.9\\text{ MB/s}}$!</p><p><strong>Problem 2 (PSNR):</strong> If compressed MSE $= 65.025$, then $\\text{PSNR} = 10\\log_{10}(65025 / 65.025) = 10\\log_{10}(1000) = \\mathbf{30.0\\text{ dB}}$.</p>"
        },
        code: `import cv2, os, numpy as np

# Sintetik 240x320 tasvir va bit-chuqurlik kvantlashi (posterizatsiya)
img = np.tile(np.linspace(0, 255, 320, dtype=np.uint8), (240, 1))
L = 8  # 3-bit = 8 ta yorqinlik darajasi
step = 256 // L
quantized = (img // step) * step

mse = np.mean((img.astype(np.float32) - quantized.astype(np.float32)) ** 2)
psnr = cv2.PSNR(img, quantized)
print(f"3-bit (L=8): MSE={mse:.2f}, PSNR={psnr:.2f} dB")

# Format hajmlarini taqqoslash
cv2.imwrite('tmp_bmp.bmp', img)
cv2.imwrite('tmp_png.png', img)
cv2.imwrite('tmp_jpg50.jpg', img, [cv2.IMWRITE_JPEG_QUALITY, 50])
print("BMP:", os.path.getsize('tmp_bmp.bmp'), "| PNG:", os.path.getsize('tmp_png.png'), "| JPG50:", os.path.getsize('tmp_jpg50.jpg'))`
      },
      {
        heading: { uz: "2.5. Amaliy Xatolar: uint8 Overflow, OpenCV BGR vs Matplotlib RGB", en: "2.5. Common Pitfalls: uint8 Overflow & BGR vs RGB" },
        bodyHtml: {
          uz: "<p><strong>1-xato (uint8 modulo overflow):</strong> NumPy da <code>np.uint8(200) + np.uint8(100)</code> qiymati <code>255</code> emas, balki <code>44</code> (300 mod 256) bo'lib qoladi! Doimo <code>cv2.add()</code> yoki <code>np.clip(arr.astype(np.int32)+val, 0, 255).astype(np.uint8)</code> ishlating.<br><strong>2-xato (Indekslash tartibi):</strong> OpenCV da <code>img[row, col] = img[y, x]</code>, ya'ni birinchi y (balandlik), ikkinchi x (kenglik).</p>",
          en: "<p><strong>Pitfall 1 (uint8 wrap-around):</strong> In NumPy, <code>np.uint8(200) + 100 == 44</code>! Always use <code>cv2.add()</code> or cast to <code>float32/int32</code> + <code>np.clip</code>.<br><strong>Pitfall 2 (Axis Order):</strong> <code>img[y, x]</code> indexes row (height) first, then column (width), while OpenCV <code>cv2.resize(img, (W, H))</code> takes width first!</p>"
        },
        discussion: {
          q: { uz: "Logotiplar va OCR matn rasmlarini datasetda saqlashda JPEG o'rniga nega PNG afzal?", en: "Why is PNG preferred over JPEG for storing OCR text images and segmentation masks?" },
          a: { uz: "JPEG 8×8 DCT kvantlash keskin qirralar va harflar atrofida xiralik/halqa (mosquito noise) va rang surilishini keltirib chiqaradi; maskalarda esa piksel ID qiymatlarini (0, 1, 2...) buzadi. PNG yo'qotishsiz saqlaydi.", en: "JPEG 8×8 DCT creates ringing artifacts around crisp text and corrupts integer segmentation mask IDs (e.g., 1 becomes 2). PNG preserves exact pixel values losslessly." }
        }
      }
    ],
    slides: [
      { title: { uz: "2.1. Uzluksiz Sahnadan Raqamli Matritsaga", en: "2.1. From Continuous Light to Pixel Matrices" }, points: { uz: ["Uzluksiz yorug'lik funksiyasi f(x, y) — sensor tekisligidagi intensivlik", "1-bosqich — Diskretizatsiya (Sampling): M × N to'r (grid) nuqtalari", "2-bosqich — Kvantlash (Quantization): 2^b ta butun daraja (8-bit = 0..255)", "Sensorlar: CCD vs zamonaviy tezkor CMOS"], en: ["Continuous light intensity f(x, y) on sensor plane", "Stage 1 — Spatial Sampling onto M × N grid", "Stage 2 — Intensity Quantization into 2^b levels (8-bit = 0..255)", "Sensors: CCD vs fast low-power CMOS"] } },
      { title: { uz: "Interaktiv Piksel Matritsasi va Sampling", en: "Interactive Pixel Matrix Explorer" }, widget: 'pixel-matrix' },
      { title: { uz: "Nikvist-Shennon Teoremasi va Aliasing", en: "Nyquist–Shannon Theorem & Aliasing" }, latex: "f_s \\ge 2 f_{\\max} \\quad (\\text{aks holda Moiré / Aliasing})", points: { uz: ["To'r yoki mayda chiziqli kiyimlarda paydo bo'ladigan soxta to'lqin naqshlari", "Kamera ichidagi anti-aliasing (low-pass) optik filtri buni kamaytiradi", "Tasvir kichraytirganda (downsampling) avval Gauss silliqlash shart!"], en: ["Under-sampling high frequencies creates fake Moiré waves", "Optical anti-aliasing filters suppress frequencies above Nyquist", "Always apply Gaussian blur before downsampling images!"] } },
      { title: { uz: "Bit Chuqurligi (Bit Depth) va Posterizatsiya", en: "Bit Depth, Dynamic Range & Posterization" }, table: { headers: { uz: ["Bit Chuqurligi", "Darajalar (2^b)", "Qo'llanilishi"], en: ["Bit Depth", "Levels (2^b)", "Typical Use Case"] }, rows: { uz: [["1-bit (Binar)", "2 (0/255)", "Skaner matn, morfologik maskalar"], ["4-bit", "16", "Posterizatsiya / banding ko'rinishi"], ["8-bit RGB", "16.7M rang (24 bit/px)", "Standart CV, JPEG/PNG, Web"], ["12–16 bit", "4096–65536 / kanal", "Tibbiy Rentgen/MRT, HDR, Astronomiya"]], en: [["1-bit (Binary)", "2", "OCR scans, binary masks"], ["4-bit", "16", "Visible banding / posterization"], ["8-bit RGB", "16.7M colors", "Standard displays, CV, JPEG/PNG"], ["12–16 bit", "4096–65536 / channel", "Medical X-ray/MRI, HDR RAW"]] } } },
      { title: { uz: "Tasvir Formatlari: BMP vs JPEG vs PNG vs WebP", en: "Image Formats: BMP vs JPEG vs PNG vs WebP" }, table: { headers: { uz: ["Format", "Siqish", "Afzallik & Kamchilik"], en: ["Format", "Compression", "Trade-offs"] }, rows: { uz: [["BMP", "Yo'q (Raw)", "100% sifat, tezkor, lekin ulkan hajm (5.9 MB)"], ["JPEG", "Yo'qotishli (8×8 DCT)", "10–20× kichik, lekin blocking artefaktlar"], ["PNG", "Yo'qotishsiz (DEFLATE)", "Aniq matn/maska + Alpha kanal, katta hajm"], ["WebP/AVIF", "Lossy & Lossless", "Kichik veb hajm + Alpha kanal"]], en: [["BMP", "None (Raw)", "100% faithful, huge size"], ["JPEG", "Lossy (8×8 DCT)", "10–20× smaller, blocking artifacts"], ["PNG", "Lossless (DEFLATE)", "Masks/text + Alpha transparency"], ["WebP/AVIF", "Hybrid", "Superior compression + Alpha"]] } } },
      { title: { uz: "Sifatni Miqdoriy Baholash: MSE, PSNR va SSIM", en: "Quantitative Quality: MSE, PSNR & SSIM" }, latex: "\\text{MSE}=\\frac{1}{MN}\\sum(I-\\hat{I})^2, \\quad \\text{PSNR}=10\\log_{10}\\!\\left(\\frac{255^2}{\\text{MSE}}\\right)", points: { uz: ["PSNR > 40 dB: a'lo; 30–40 dB: yaxshi; < 25 dB: sezilarli buzilish", "SSIM ∈ [0, 1]: yorqinlik, kontrast va strukturaviy o'xshashlik", "PSNR faqat piksel farqiga qaraydi, SSIM inson ko'ziga yaqinroq"], en: ["PSNR > 40 dB: near lossless; 30–40 dB: good; < 25 dB: degraded", "SSIM ∈ [0, 1] tracks luminance, contrast & structure", "SSIM aligns better with human perception than MSE/PSNR"] } },
      { title: { uz: "Sonli Misol (Doskada): Full-HD Hajm va PSNR", en: "Worked Example: Full-HD Memory & PSNR" }, points: { uz: ["Berilgan: 1920 × 1080, 8-bit RGB tasvir", "1. Piksellar: 1920 × 1080 = 2,073,600 piksel", "2. Hajm (8-bit RGB): 2,073,600 × 3 = 6,220,800 B ≈ 5.93 MiB", "3. 16-bitda: 11.86 MiB | 30 FPS siqilmagan oqim: 177.9 MB/s", "4. Agar MSE = 65.025 bo'lsa: PSNR = 10·log10(65025/65.025) = 30.0 dB"], en: ["Given: 1920 × 1080, 8-bit RGB image", "1. Pixels: 1920 × 1080 = 2,073,600", "2. Size (8-bit RGB): × 3 bytes = 6,220,800 B ≈ 5.93 MiB", "3. 16-bit: 11.86 MiB | Raw 30 FPS stream: 177.9 MB/s", "4. If MSE = 65.025 → PSNR = 10·log10(1000) = 30.0 dB"] } },
      { title: { uz: "Python Kod Tahlili: Kvantlash va PSNR", en: "Python Code Walkthrough: Quantization & PSNR" }, code: `import cv2, numpy as np
img = np.tile(np.linspace(0, 255, 320, dtype=np.uint8), (240, 1))
L = 8  # 3-bit = 8 daraja
q_img = (img // (256 // L)) * (256 // L)
print("PSNR:", round(cv2.PSNR(img, q_img), 2), "dB")
# XATO: np.uint8(200) + 100 == 44 (overflow!)
# TO'G'RI: cv2.add(img, 50) yoki np.clip` },
      { title: { uz: "Amaliy Xatolar: uint8 Overflow va (y, x) Tartibi", en: "Common Coding Pitfalls: Overflow & (y, x) Indexing" }, points: { uz: ["NumPy uint8 qo'shishda 255 dan oshsa 0 ga aylanib ketadi (wrap-around)!", "Yechim: cv2.add(a, b) yoki float32 ga o'tib np.clip(..., 0, 255)", "img.shape = (H, W, C) → img[y, x] (birinchi qator y!)", "cv2.resize(img, (W, H)) esa kenglik W ni birinchi qabul qiladi!"], en: ["NumPy uint8 arithmetic wraps around modulo 256!", "Fix: use cv2.add() or float32 + np.clip(0, 255)", "img[y, x] indexes Height first, whereas cv2.resize takes (Width, Height)!"] } },
      { title: { uz: "Muhokama: Segmentatsiya Maskasi uchun Format", en: "Discussion: Best Format for Segmentation Masks" }, discussion: { q: { uz: "Semantik segmentatsiya datasetida piksellarga sinf ID lari (0=fon, 1=mashina, 2=odam) yozilgan. Nima uchun uni .jpg emas, .png qilish shart?", en: "In semantic segmentation masks storing class IDs (0, 1, 2), why must you save as PNG instead of JPEG?" }, a: { uz: "JPEG yo'qotishli siqish bo'lib, piksellar chegarasida 1 ni 1.4 → 2 ga o'zgartirib, yolg'on sinflar hosil qiladi. PNG yo'qotishsiz saqlab har bir sinf ID sini 100% aniq qoldiradi.", en: "Lossy JPEG compression interpolates pixel IDs along boundaries (turning class 1 into 2 or 3). PNG is lossless and preserves exact integer labels." } } }
    ],
    glossary: [
      { uz: "diskretizatsiya (sampling)", en: "sampling", defUz: "Uzluksiz tasvir fazosini M×N piksel to'riga bo'lish", defEn: "Discretizing spatial coordinates onto an M×N pixel grid" },
      { uz: "kvantlash (quantization)", en: "quantization", defUz: "Piksel intensivligini chekli sonli (masalan 256) darajalarga yaxlitlash", defEn: "Mapping continuous intensity to discrete bit-depth levels" },
      { uz: "aliasing (Moiré)", en: "aliasing", defUz: "Nikvist chegarasidan past chastotada sampllashda chiqadigan soxta naqsh", defEn: "Moire distortion caused by sampling below the Nyquist rate" },
      { uz: "posterizatsiya", en: "posterization", defUz: "Past bit-chuqurlik tufayli gradientning zinapoyasimon bo'linishi", defEn: "Visible color banding due to insufficient bit depth" },
      { uz: "PSNR", en: "Peak Signal-to-Noise Ratio", defUz: "Asl va qayta ishlangan tasvir sifatini dB da baholash", defEn: "Logarithmic reconstruction quality metric in decibels (dB)" }
    ],
    quiz: [
      { q: { uz: "Full-HD (1920×1080) o'lchamli, 8-bitli, 3 kanalli (RGB) siqilmagan tasvir xotirada qancha joy egallaydi?", en: "How much uncompressed memory does an 8-bit 1920×1080 RGB image require?" }, options: [{ label: 'A', uz: "Taxminan 2.0 MB", en: "Approx. 2.0 MB" }, { label: 'B', uz: "Taxminan 5.93 MiB (6.22 MB)", en: "Approx. 5.93 MiB (6.22 MB)" }, { label: 'C', uz: "Taxminan 24 MB", en: "Approx. 24 MB" }, { label: 'D', uz: "Taxminan 128 KB", en: "Approx. 128 KB" }], answer: 'B', explanation: { uz: "1920 × 1080 × 3 = 6,220,800 bayt ≈ 5.93 MiB.", en: "1920 × 1080 × 3 = 6,220,800 bytes ≈ 5.93 MiB." } },
      { q: { uz: "Qaysi tasvir formati alfa-kanal (shaffoflik) ni qo'llab-quvvatlaydi va yo'qotishsiz siqish (DEFLATE) ishlatadi?", en: "Which format uses lossless DEFLATE compression and supports an alpha transparency channel?" }, options: [{ label: 'A', uz: "JPEG", en: "JPEG" }, { label: 'B', uz: "BMP", en: "BMP" }, { label: 'C', uz: "PNG", en: "PNG" }, { label: 'D', uz: "RAW", en: "RAW" }], answer: 'C', explanation: { uz: "PNG yo'qotishsiz DEFLATE siqishi va RGBA alfa shaffofligini qo'llab-quvvatlaydi.", en: "PNG combines lossless DEFLATE compression with alpha transparency." } },
      { q: { uz: "8-bitdan 4-bitga (16 darajaga) kvantlash tushirilganda gradientlarda qaysi vizual nuqson paydo bo'ladi?", en: "Which artifact appears in smooth gradients when quantizing from 8-bit down to 4-bit?" }, options: [{ label: 'A', uz: "Blurring", en: "Blurring" }, { label: 'B', uz: "Posterizatsiya (Banding)", en: "Posterization (Banding)" }, { label: 'C', uz: "Salt-and-pepper", en: "Salt-and-pepper noise" }, { label: 'D', uz: "Parallax", en: "Parallax error" }], answer: 'B', explanation: { uz: "Darajalar kamayganda silliq o'tishlar zinapoyaga (posterizatsiya) bo'linadi.", en: "Too few intensity steps create visible contour bands (posterization)." } },
      { q: { uz: "JPEG formati tasvirni qanday bloklarga bo'lib qaysi matematik o'zgartirishni qo'llaydi?", en: "JPEG divides images into blocks of what size and uses which transform?" }, options: [{ label: 'A', uz: "8×8 blok va DCT (Diskret Kosinus)", en: "8×8 blocks with Discrete Cosine Transform (DCT)" }, { label: 'B', uz: "3×3 blok va Sobel", en: "3×3 blocks with Sobel" }, { label: 'C', uz: "16×16 blok va SIFT", en: "16×16 blocks with SIFT" }, { label: 'D', uz: "4×4 blok va Median", en: "4×4 blocks with Median" }], answer: 'A', explanation: { uz: "JPEG 8×8 bloklarda DCT qo'llab yuqori chastotalarni kvantlaydi.", en: "JPEG applies 8×8 DCT followed by high-frequency quantization." } }
    ],
    matching: [
      { left: { uz: "Sampling (Diskretizatsiya)", en: "Sampling" }, right: { uz: "Fazoni M×N piksel to'riga bo'lish", en: "Dividing spatial space into M×N grid" } },
      { left: { uz: "Quantization (Kvantlash)", en: "Quantization" }, right: { uz: "Yorqinlikni 2^b darajaga yaxlitlash", en: "Rounding intensity into 2^b discrete levels" } },
      { left: { uz: "JPEG", en: "JPEG" }, right: { uz: "8×8 DCT asosidagi yo'qotishli siqish", en: "Lossy 8×8 DCT photo compression" } },
      { left: { uz: "PNG", en: "PNG" }, right: { uz: "Yo'qotishsiz DEFLATE va alfa kanal", en: "Lossless DEFLATE with Alpha channel" } }
    ],
    fillGap: [
      { text: { uz: "Uzluksiz fazoviy tasvirni M×N to'r nuqtalariga bo'lish jarayoni ___ deyiladi.", en: "Dividing continuous spatial coordinates into an M×N pixel grid is called ___." }, answer: ['diskretizatsiya', 'sampling'] },
      { text: { uz: "8-bitli uch kanalli (RGB) tasvir jami 2^24 ≈ ___ million rangni ifodalaydi.", en: "An 8-bit 3-channel RGB image can represent roughly ___ million colors." }, answer: ['16.7', '16,7', '16.77'] },
      { text: { uz: "Past chastotada sampllash natijasida paydo bo'ladigan soxta naqshlar ___ hodisasi deyiladi.", en: "Moiré artifacts caused by under-sampling high frequencies are called ___." }, answer: ['aliasing'] }
    ]
  },

  // ==================== M3 ====================
  {
    id: 3,
    code: 'M3',
    labId: 3,
    hours: 2,
    keywords: ['RGB', 'BGR', 'HSV', 'HSL', 'YCbCr', 'CIELAB', 'Trichromatic', 'Bayer', 'Color Masking'],
    title: {
      uz: "Raqamli tasvirlarda rang modellari",
      en: "Color Spaces, Conversions & Color Masking"
    },
    description: {
      uz: "Trixromatik nazariya, Bayer filtri, RGB/BGR vs Grayscale, HSV ([0..179] OpenCV), HSL, YCbCr (chroma subsampling), CIELAB perseptual masofasi, RGB→HSV sonli hisoblash va color masking.",
      en: "Trichromatic cones, Bayer CFA, RGB/BGR vs Grayscale, HSV (H ∈ [0..179] in OpenCV), HSL, YCbCr subsampling, CIELAB perceptual uniformity, RGB→HSV worked calculation, and color masking."
    },
    refs: [
      { label: "COMP4423 L2: Color Spaces", url: "https://github.com/lookwei/COMP4423" },
      { label: "Szeliski Ch. 2.3: Color", url: "https://szeliski.org/Book/" },
      { label: "OpenCV Color Spaces Tutorial", url: "https://docs.opencv.org" }
    ],
    sections: [
      {
        heading: { uz: "3.1. Trixromatik Nazariya, Bayer Filtri va RGB vs Grayscale", en: "3.1. Trichromatic Vision, Bayer CFA & RGB vs Grayscale" },
        bodyHtml: {
          uz: "<p><strong>Trixromatik nazariya:</strong> Inson ko'z to'rida qizil, yashil va ko'k to'lqin uzunliklariga sezgir uch xil kolbacha mavjud — shuning uchun istalgan ko'rinuvchi rang uchta kanal ($R, G, B$) chiziqli kombinatsiyasi bilan beriladi. Raqamli kameralarda sensor oldiga <strong>Bayer filtri (RGGB)</strong> qo'yiladi (50% yashil piksel — chunki inson ko'zi yashilga eng sezgir!). Shu sababli kulrang konvertatsiya formulasida yashil vazni eng katta: $Y = 0.299R + 0.587G + 0.114B$.</p><p><strong>RGB cheklovi:</strong> Unda yorqinlik (<em>luminance</em>) va rang toni (<em>chrominance</em>) barcha uch kanalga aralashib ketgan — soya tushsa R, G, B hammasi pasayadi!</p>",
          en: "<p><strong>Trichromatic Theory:</strong> Human cone cells peak at Red, Green, and Blue wavelengths, explaining 3-channel color encoding. Camera sensors use an RGGB <strong>Bayer CFA</strong> (50% green photosites!), mirroring grayscale luminance weights: $Y = 0.299R + 0.587G + 0.114B$.</p><p><strong>RGB Coupling Limitation:</strong> Shadows or brightness shifts change all three R, G, B channels simultaneously.</p>"
        },
        widget: 'color-space'
      },
      {
        heading: { uz: "3.2. HSV, HSL, YCbCr va CIELAB Rang Fazolari", en: "3.2. HSV, HSL, YCbCr & CIELAB Color Spaces" },
        bodyHtml: {
          uz: "<p><strong>HSV (Hue, Saturation, Value):</strong> Rang tonini (0°–360°) yorqinlikdan ajratadi. <em>Muhim texnik tafsilot:</em> OpenCV 8-bit sig'ishi uchun Hue diapazonini 2 ga bo'lib <code>H ∈ [0, 179]</code> saqlaydi (qizil 0°/360° da o'ralgani uchun <code>[0..10]</code> va <code>[170..179]</code> ikki maska birlashtiriladi!).</p><p><strong>YCbCr:</strong> Yorqinlik $Y$ va rang farqlari $(C_b, C_r)$ ni ajratadi. Inson ko'zi $C_b, C_r$ ga kamroq sezgir bo'lgani uchun JPEG/MPEG/H.264 <strong>chroma subsampling (4:2:0)</strong> bilan faylni 2× gacha tejaydi.<br><strong>CIELAB ($L^*a^*b^*$):</strong> Perseptual bir tekis fazo — $\\Delta E = \\sqrt{\\Delta L^2 + \\Delta a^2 + \\Delta b^2}$ Yevklid masofasi inson ko'zi sezadigan rang farqiga proporsional (sanoat sifat nazoratida ishlatiladi).</p>",
          en: "<p><strong>HSV:</strong> Decouples Hue from illumination. <em>OpenCV Detail:</em> Hue is halved to <code>[0, 179]</code> in <code>uint8</code> (red wraps around 0/180, requiring two ranges).<br><strong>YCbCr:</strong> Separates luma $Y$ from chroma $C_b/C_r$ for JPEG/H.264 <strong>chroma subsampling</strong>.<br><strong>CIELAB:</strong> Perceptually uniform space where Euclidean $\\Delta E$ aligns with human color difference sensitivity.</p>"
        },
        latex: "Y = 0.299R + 0.587G + 0.114B, \\quad \\Delta E_{ab}^* = \\sqrt{(L_2-L_1)^2 + (a_2-a_1)^2 + (b_2-b_1)^2}"
      },
      {
        heading: { uz: "3.3. Sonli Misol (Doskada): RGB (200, 100, 50) → HSV Konvertatsiyasi", en: "3.3. Worked Numerical Example: RGB (200, 100, 50) → HSV" },
        bodyHtml: {
          uz: "<p><strong>Berilgan:</strong> Piksel $(R, G, B) = (200, 100, 50)$.<br><strong>1-qadam:</strong> $[0, 1]$ ga normallash: $R' = 200/255 \\approx 0.784$, $G' = 100/255 \\approx 0.392$, $B' = 50/255 \\approx 0.196$.<br><strong>2-qadam:</strong> $C_{\\max} = R' = 0.784$, $C_{\\min} = B' = 0.196$, $\\Delta = C_{\\max} - C_{\\min} = 0.588$.<br><strong>3-qadam (Value &amp; Saturation):</strong> $V = C_{\\max} = \\mathbf{78.4\\%}$, $S = \\Delta / C_{\\max} = 0.588 / 0.784 = \\mathbf{75.0\\%}$.<br><strong>4-qadam (Hue):</strong> $C_{\\max} = R'$ bo'lgani uchun $H = 60^\\circ \\times \\left(\\frac{G' - B'}{\\Delta}\\right) = 60^\\circ \\times \\frac{0.392 - 0.196}{0.588} = 60^\\circ \\times \\frac{1}{3} = \\mathbf{20^\\circ}$ (apelsin rangi). OpenCV <code>uint8</code> da: $H_{cv} = 20/2 = \\mathbf{10}$, $S_{cv} \\approx \\mathbf{191}$, $V_{cv} = \\mathbf{200}$!</p>",
          en: "<p><strong>Given:</strong> $(R, G, B) = (200, 100, 50)$.<br>1. Normalize: $R'=0.784, G'=0.392, B'=0.196$.<br>2. $C_{\\max}=0.784, C_{\\min}=0.196, \\Delta=0.588$.<br>3. $V = \\mathbf{78.4\\%}$, $S = 0.588/0.784 = \\mathbf{75\\%}$.<br>4. $H = 60^\\circ \\times (0.196/0.588) = \\mathbf{20^\\circ}$ (orange) → in OpenCV <code>uint8</code>: $(H_{cv}=10, S_{cv}=191, V_{cv}=200)$.</p>"
        },
        latex: "V = C_{\\max}, \\quad S = \\frac{\\Delta}{C_{\\max}}, \\quad H = 60^\\circ \\times \\left(\\frac{G'-B'}{\\Delta} \\bmod 6\\right) \\;\\;(\\text{agar } C_{\\max}=R')"
      },
      {
        heading: { uz: "3.4. Rang Bo'yicha Obyekt Ajratish (Color Masking) & Kod Tahlili", en: "3.4. Color Masking Pipeline & OpenCV Code Walkthrough" },
        bodyHtml: {
          uz: "<p>Svetofor, futbol to'pi yoki yashil ekin (NDVI/sport tahlili) obyektlarini ajratish quvuri: <code>BGR → HSV → cv2.inRange → Morfologik tozalash (Opening/Closing) → cv2.bitwise_and → cv2.findContours</code>. Qizil rang uchun doimo ikki maska <code>mask1 | mask2</code> ni birlashtiring!</p>",
          en: "<p>Color masking pipeline: <code>BGR → HSV → cv2.inRange → Morphology (Open/Close) → cv2.bitwise_and → cv2.findContours</code>. Remember to combine two Hue ranges for wrapped Red!</p>"
        },
        code: `import cv2, numpy as np

# BGR tasvirni HSV ga o'tkazish va qizil obyektni ajratish
img_bgr = cv2.imread('traffic_light.jpg')
if img_bgr is None:
    img_bgr = np.zeros((200, 200, 3), dtype=np.uint8)
    cv2.circle(img_bgr, (100, 100), 40, (20, 30, 220), -1)  # BGR qizil

hsv = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2HSV)
mask1 = cv2.inRange(hsv, np.array([0, 100, 80]), np.array([10, 255, 255]))
mask2 = cv2.inRange(hsv, np.array([170, 100, 80]), np.array([179, 255, 255]))
mask = cv2.bitwise_or(mask1, mask2)

# Morfologik tozalash va kontur topish
kernel = np.ones((5, 5), np.uint8)
clean_mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
result = cv2.bitwise_and(img_bgr, img_bgr, mask=clean_mask)
print("Ajratilgan qizil piksellar:", int(cv2.countNonZero(clean_mask)))`
      },
      {
        heading: { uz: "3.5. Keys-Tahlil: Soya, Yorug'lik va GrabCut", en: "3.5. Case Discussion: Illumination Drift & GrabCut" },
        bodyHtml: {
          uz: "<p>Oddiy HSV chegaralash kuchli soya yoki metall/oyna aks etishida (<em>specular highlight</em>, V=255, S≈0) uzilish beradi. Bunday hollarda oq balans (<em>White Balance</em>), LAB rang masofasi yoki rang + fazoviy ma'lumotni birlashtiruvchi <strong>GrabCut / Mean-Shift</strong> ishlatiladi.</p>",
          en: "<p>Fixed HSV bounds break under harsh shadows or white specular glares (V≈255, S≈0). Combine color thresholds with White Balancing, CIELAB distances, or spatial-color <strong>GrabCut / Mean-Shift</strong>.</p>"
        },
        discussion: {
          q: { uz: "OpenCV da qizil to'pni faqat H ∈ [0, 10] bilan ajratdingiz, lekin to'pning yarmi maskaga tushmadi. Sababi nima?", en: "Why might [0, 10] Hue miss half of a red ball in OpenCV HSV?" },
          a: { uz: "Qizil rang 0°/360° chegarasida joylashgan: to'q qizil piksellar H ∈ [170, 179] ga o'tib ketadi, shuningdek yaltiroq joylarda Saturation (S) juda past bo'ladi. [0..10] va [170..179] ni cv2.bitwise_or bilan birlashtirish kerak.", en: "Red straddles the 0°/360° boundary (wrapped around 170–179 in uint8), and specular highlights drop Saturation near 0. Merge [0..10] and [170..179] via bitwise_or." }
        }
      }
    ],
    slides: [
      { title: { uz: "3.1. Rang Fiziologiyasi va Bayer Filtri", en: "3.1. Human Cone Vision & Bayer Sensor" }, points: { uz: ["Trixromatik nazariya: Qizil (L), Yashil (M), Ko'k (S) kolbachalar", "Bayer CFA (RGGB): Yashil piksellar 2× ko'p (50%)", "RGB additiv model (displey) vs CMYK subtraktiv model (printer)", "Grayscale formula: Y = 0.299R + 0.587G + 0.114B"], en: ["Trichromatic cones: R, G, B photoreceptors", "Camera Bayer CFA uses 50% green photosites", "RGB (additive display) vs CMYK (subtractive print)", "Grayscale luminance: 0.299R + 0.587G + 0.114B"] } },
      { title: { uz: "RGB Modelining Kamchiligi: Yorug'lik Aralashuvi", en: "RGB Limitation: Coupled Luminance & Color" }, points: { uz: ["RGB da yorqinlik va rang toni uchala kanalga tarqalgan", "Soya tushsa R, G, B hammasi tushadi → chegara qoidalari buziladi", "RGB dagi Yevklid masofasi inson idrokiga mos kelmaydi", "Yechim: HSV / YCbCr / CIELAB rang fazolariga o'tish"], en: ["RGB couples brightness and hue in all 3 channels", "Shadows alter R, G, and B simultaneously", "Euclidean distance in RGB != perceived human difference", "Solution: convert to HSV, YCbCr, or CIELAB"] } },
      { title: { uz: "Interaktiv RGB ↔ HSV / Grayscale Konverteri", en: "Interactive RGB ↔ HSV / Grayscale Converter" }, widget: 'color-space' },
      { title: { uz: "HSV vs HSL vs YCbCr vs CIELAB", en: "HSV vs HSL vs YCbCr vs CIELAB" }, table: { headers: { uz: ["Model", "Komponentlar", "Asosiy afzalligi"], en: ["Space", "Channels", "Key Strength"] }, rows: { uz: [["RGB / BGR", "R, G, B", "OpenCV BGR tartibida o'qiydi!"], ["HSV", "H [0..179], S, V", "Rang toni yorqinlikdan alohida (Color Masking)"], ["YCbCr", "Y, Cb, Cr", "JPEG/H.264 chroma subsampling (4:2:0)"], ["CIELAB", "L*, a*, b*", "Yevklid masofasi ΔE inson ko'ziga mos"]], en: [["RGB / BGR", "R, G, B", "OpenCV loads in BGR order!"], ["HSV", "H [0..179], S, V", "Decoupled Hue for masking"], ["YCbCr", "Y, Cb, Cr", "JPEG/H.264 chroma subsampling"], ["CIELAB", "L*, a*, b*", "Perceptually uniform ΔE distance"]] } } },
      { title: { uz: "OpenCV Texnik Muhim Nuqta: H ∈ [0, 179]", en: "Critical OpenCV Quirk: Hue ∈ [0, 179]" }, points: { uz: ["Nazariy HSV da Hue ∈ [0°, 360°]", "360 soni 1 baytga (uint8 max 255) sig'maydi!", "OpenCV H ni 2 ga bo'lib [0, 179] oralig'ida saqlaydi", "Qizil rang 0 va 179 atrofida uziladi → 2 ta inRange maska kerak!"], en: ["Standard Hue spans [0°, 360°]", "360 overflows uint8 (max 255)", "OpenCV divides Hue by 2 → [0, 179]", "Red wraps around 0/179 → OR two masks together!"] } },
      { title: { uz: "Sonli Misol (Doskada): RGB(200,100,50) → HSV", en: "Worked Example: RGB(200,100,50) → HSV" }, latex: "R'=0.784,\\; G'=0.392,\\; B'=0.196 \\implies \\Delta = 0.588", points: { uz: ["1. C_max = 0.784, C_min = 0.196, Δ = 0.588", "2. V = C_max = 78.4%", "3. S = Δ / C_max = 0.588 / 0.784 = 75.0%", "4. H = 60° × ((0.392 - 0.196) / 0.588) = 20° (Apelsin)", "5. OpenCV uint8 da: H_cv = 10, S_cv = 191, V_cv = 200"], en: ["1. C_max = 0.784, C_min = 0.196, Δ = 0.588", "2. V = 78.4%, S = 0.588/0.784 = 75.0%", "3. H = 60° × (0.196/0.588) = 20° (Orange)", "4. OpenCV uint8: H_cv=10, S_cv=191, V_cv=200"] } },
      { title: { uz: "Color Masking To'liq Quvuri", en: "End-to-End Color Masking Pipeline" }, points: { uz: ["1. cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV)", "2. mask = cv2.inRange(hsv, lower, upper)", "3. Morfologik tozalash (MORPH_OPEN / CLOSE)", "4. result = cv2.bitwise_and(bgr, bgr, mask=mask)", "5. cv2.findContours → markaz va bounding box"], en: ["1. Convert BGR → HSV", "2. Threshold via cv2.inRange(hsv, lower, upper)", "3. Clean noise with morphology (Open/Close)", "4. Extract object via cv2.bitwise_and", "5. Locate bounding box with cv2.findContours"] } },
      { title: { uz: "Python Kod: Qizil Obyektni Ajratish", en: "Python Walkthrough: Wrapped Red Masking" }, code: `hsv = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2HSV)
m1 = cv2.inRange(hsv, (0, 100, 80), (10, 255, 255))
m2 = cv2.inRange(hsv, (170, 100, 80), (179, 255, 255))
mask = cv2.morphologyEx(cv2.bitwise_or(m1, m2),
                        cv2.MORPH_OPEN, np.ones((5,5), np.uint8))
out = cv2.bitwise_and(img_bgr, img_bgr, mask=mask)` },
      { title: { uz: "Keng Tarqalgan Xatolar va Maslahatlar", en: "Common Mistakes & Practical Tips" }, points: { uz: ["cv2.imread BGR yuklaydi, Matplotlib esa RGB kutadi (ko'k ↔ qizil almashadi!)", "Yechim: plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))", "CNN modellariga RGB kiradi — BGR berilsa aniqlik tushadi!", "Yoritilganlik o'zgarsa CIELAB yoki CLAHE yordam beradi"], en: ["OpenCV uses BGR while Matplotlib/PyTorch expect RGB!", "Convert via cv2.COLOR_BGR2RGB before plotting or CNN inference", "Shadows shift V strongly; white glare drops S near 0"] } },
      { title: { uz: "Muhokama: Svetofor vs Murakkab Fon", en: "Discussion: Color Masking vs GrabCut" }, discussion: { q: { uz: "Sport maydonida yashil maydon ustida yashil formali o'yinchilarni faqat HSV bilan ajratish mumkinmi?", en: "Why does pure HSV masking fail to separate green jerseys from green turf?" }, a: { uz: "Ikkalasi ham bir xil Hue diapazoniga tushadi! Bunda teksturaviy/fazoviy ma'lumot (GrabCut, fon ayirish yoki YOLO/Segmentatsiya CNN) talab qilinadi.", en: "Both share the same Hue band! Spatial/textural methods like GrabCut or deep segmentation (YOLO/U-Net) are needed." } } }
    ],
    glossary: [
      { uz: "rang toni (Hue)", en: "Hue", defUz: "0°–360° (OpenCV da 0–179) doiradagi asosiy rang tusi", defEn: "Dominant wavelength angle (0–179 in OpenCV)" },
      { uz: "ikonlik maska", en: "binary mask", defUz: "Tanlangan rang piksellari 255 (1), qolgani 0 bo'lgan xarita", defEn: "0/255 mask selecting target color pixels" },
      { uz: "chroma subsampling", en: "chroma subsampling", defUz: "Cb va Cr rang farqi kanallarini Y ga nisbatan pastroq o'lchamda siqish", defEn: "Downsampling Cb/Cr chroma channels relative to luma Y" },
      { uz: "Bayer filtri", en: "Bayer CFA", defUz: "Kamera sensorida piksellar ustiga qo'yiladigan RGGB rang mozaikasi", defEn: "RGGB color filter mosaic over camera sensor photosites" }
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
    keywords: ['Convolution', 'Kernel', 'Mean Filter', 'Gaussian Filter', 'Separable', 'Padding', 'FFT', 'Unsharp Masking'],
    title: {
      uz: "Tasvirlarga ishlov berishda chiziqli filtrlar",
      en: "Linear Image Filtering & 2D Convolution"
    },
    description: {
      uz: "Oldindan qayta ishlash quvuri, 2D svyortka vs korrelyatsiya, Mean va Gauss filtrlari, ajraluvchanlik O(2N), Padding shartlari, Chastota sohasi (FFT) va Unsharp Masking o'tkirlashtirish.",
      en: "Preprocessing pipelines, 2D convolution vs cross-correlation, Mean & Gaussian kernels, O(2N) separability, padding modes, FFT Convolution Theorem, and Unsharp Masking."
    },
    refs: [
      { label: "COMP4423 L3: Filters & Convolutions", url: "https://github.com/lookwei/COMP4423" },
      { label: "Szeliski Ch. 3.2: Linear Filtering", url: "https://szeliski.org/Book/" },
      { label: "UC Berkeley CS180: Spatial Filtering", url: "https://cal-cs180.github.io/fa25/" }
    ],
    sections: [
      {
        heading: { uz: "4.1. Oldindan Qayta Ishlash (Preprocessing) va Chiziqli Svyortka", en: "4.1. Preprocessing Pipelines & Linear 2D Convolution" },
        bodyHtml: {
          uz: "<p><strong>Garbage in, garbage out:</strong> Har qanday CV tizimi avval kirishni tozalaydi (<em>shovqin bostirish → resize → normallashtirish → kontrast</em>). Chiziqli filtrlash ikki fundamental xossaga bo'ysunadi: <strong>Superpozitsiya (Additivlik)</strong> va <strong>Gomogenlik</strong>.</p><p><strong>Svyortka vs Korrelyatsiya:</strong> Korrelyatsiya yadroni to'g'ridan-to'g'ri surib ko'paytiradi; <strong>Svyortka (Convolution)</strong> esa yadroni gorizontal va vertikal (180°) aylantirib qo'llaydi (simmetrik Mean va Gauss yadrolarida ikkalasi aynan bir xil!). Silliqlash yadrosining elementlari yig'indisi $\\sum K = 1$ bo'lishi umumiy yorqinlikni saqlaydi.</p>",
          en: "<p><strong>Garbage in, garbage out:</strong> Preprocessing pipelines clean and normalize inputs before feature extraction. Linear filters obey <strong>Additivity</strong> and <strong>Homogeneity</strong>.</p><p><strong>Convolution vs Cross-Correlation:</strong> Convolution flips the kernel 180° (identical to cross-correlation for symmetric kernels). Smoothing kernels sum to 1 to preserve DC brightness.</p>"
        },
        latex: "I_{\\text{new}}(x, y) = \\sum_{i=-a}^{a} \\sum_{j=-b}^{b} I(x-i, y-j)\\, K(i, j)",
        widget: 'conv-sim'
      },
      {
        heading: { uz: "4.2. Mean vs Gauss Filtri, σ Parametri va O(2N) Ajraluvchanlik", en: "4.2. Mean vs Gaussian Blur & Separable Complexity" },
        bodyHtml: {
          uz: "<p><strong>Mean (O'rtacha) filtr:</strong> Barcha piksellarga $1/k^2$ teng vazn beradi. Kamchiligi: chekkalarni kuchli xiralashtiradi va chastota sohasida yon loblar tufayli <em>halqasimon (ringing)</em> artefakt beradi.</p><p><strong>Gauss filtri:</strong> Markazga katta vazn berib, uzoqlashgan sari silliq kamayadi. Standart chetlanish $\\sigma$ silliqlash kuchini boshqaradi, yadro o'lchami esa odatda $k \\approx \\lceil 6\\sigma + 1 \\rceil$.<br><strong>Ajraluvchanlik (Separability):</strong> 2D Gauss matritsasi 1D vektorlarning tashqi ko'paytmasi ($G_{2D} = g_y g_x^T$) bo'lgani uchun $k\\times k$ svyortka ikkita $1\\times k$ va $k\\times 1$ bosqichga ajralib, murakkablikni $O(k^2)$ dan $O(2k)$ ga tushiradi ($15\\times 15$ da $225 \\to 30$, ya'ni <strong>7.5× tezroq</strong>!).</p>",
          en: "<p><strong>Mean Blur:</strong> Equal $1/k^2$ weights blur edges heavily and cause frequency ringing. <strong>Gaussian Blur:</strong> Distance-weighted kernel ($k \\approx \\lceil 6\\sigma+1\\rceil$) cleanly preserves smooth transitions.</p><p><strong>Separability ($O(k^2) \\to O(2k)$):</strong> Since $G_{2D} = g_y g_x^T$, a 15×15 pass runs 15 + 15 = 30 ops per pixel instead of 225 (<strong>7.5× speedup</strong>)!</p>"
        },
        latex: "G(x, y) = \\frac{1}{2\\pi\\sigma^2} \\exp\\!\\left(-\\frac{x^2 + y^2}{2\\sigma^2}\\right)"
      },
      {
        heading: { uz: "4.3. Chegara Shartlari (Padding), FFT Teoremasi va Unsharp Masking", en: "4.3. Border Padding, Convolution Theorem & Sharpening" },
        bodyHtml: {
          uz: "<p>Chegaradagi piksellar atrofida oyna tashqariga chiqmasligi uchun: <strong>Zero-padding</strong> (0 qo'shish — rasm cheti qorayadi), <strong>Replicate</strong> (chekka qiymatni cho'zish), <strong>Reflect</strong> (oynadeek aks ettirish — eng tabiiy natija).</p><p><strong>Svyortka teoremasi (FFT):</strong> Fazoviy sohadagi svyortka Furye (chastota) sohasida oddiy ko'paytirishdir: $I * K \\iff \\mathcal{F}(I) \\cdot \\mathcal{F}(K)$.<br><strong>Unsharp Masking:</strong> Asl tasvirdan xira versiyani ayirib yuqori chastotalarni ajratamiz va kuchaytirib qo'shamiz: $I_{\\text{sharp}} = I + \\alpha (I - G_\\sigma * I)$.</p>",
          en: "<p><strong>Padding Modes:</strong> Zero-padding darkens borders; Replicate repeats edge pixels; <strong>Reflect</strong> mirrors cleanly without edge steps.<br><strong>Convolution Theorem:</strong> $I * K \\iff \\mathcal{F}(I)\\cdot\\mathcal{F}(K)$.<br><strong>Unsharp Masking:</strong> Boosts details via $I_{\\text{sharp}} = I + \\alpha(I - G_\\sigma * I)$.</p>"
        },
        latex: "I_{\\text{sharp}} = (1 + \\alpha) I - \\alpha (G_\\sigma * I)"
      },
      {
        heading: { uz: "4.4. Sonli Hisoblash Misoli (Doskada): 3×3 Mean, Gauss va Sharpen", en: "4.4. Worked Numerical Example: 3×3 Mean, Gauss & Sharpen" },
        bodyHtml: {
          uz: "<p><strong>Masala 1 (Chiziqli gradient):</strong> $I = \\begin{bmatrix}10 & 20 & 30\\\\ 40 & 50 & 60\\\\ 70 & 80 & 90\\end{bmatrix}$.<br>• Mean ($1/9$): $(10+20+\\dots+90)/9 = 450/9 = \\mathbf{50}$.<br>• Gauss ($\\frac{1}{16}\\begin{bmatrix}1&2&1\\\\2&4&2\\\\1&2&1\\end{bmatrix}$): $(10+40+30+80+200+120+70+160+90)/16 = 800/16 = \\mathbf{50}$. Ikkalasi ham chiziqli gradient markazini o'zgarishsiz qoldiradi!</p><p><strong>Masala 2 (O'tkir chekkali oyna):</strong> Agar $I = \\begin{bmatrix}10 & 10 & 90\\\\ 10 & 10 & 90\\\\ 10 & 10 & 90\\end{bmatrix}$ bo'lsa:<br>• Mean: $(60 + 270)/9 = \\mathbf{36.7}$.<br>• Gauss: $(120 + 4\\times 90)/16 = 480/16 = \\mathbf{30.0}$.<br>• Markaziy piksel ($10$) ga Unsharp Masking ($\\alpha=1$): $I_{\\text{sharp}} = 10 + 1\\cdot(10 - 30) = -10 \\xrightarrow{\\text{clip}} \\mathbf{0}$ (chekka oldi kontrast keskin oshadi!).</p>",
          en: "<p><strong>Case 1 (Linear ramp $[[10,20,30],[40,50,60],[70,80,90]]$):</strong> Mean $= 450/9 = \\mathbf{50}$; Gauss $(1,2,1;2,4,2;1,2,1)/16 = 800/16 = \\mathbf{50}$.<br><strong>Case 2 (Step edge $[[10,10,90]\\times 3]$):</strong> Gauss blur gives $\\mathbf{30.0}$; Unsharp Mask ($\\alpha=1$) pushes center pixel $10 + (10 - 30) = -10 \\to \\mathbf{0}$, accentuating the boundary!</p>"
        },
        code: `import cv2, numpy as np

img = cv2.imread('rasm.jpg')
if img is None:
    img = np.random.randint(0, 255, (240, 320, 3), dtype=np.uint8)

blur_gauss = cv2.GaussianBlur(img, (7, 7), sigmaX=1.5)
# Unsharp Masking: (1 + alpha)*I - alpha*blur
sharp = cv2.addWeighted(img, 1.5, blur_gauss, -0.5, 0)

# Custom 3x3 Sharpen kernel bilan filter2D
k_sharp = np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]], dtype=np.float32)
sharp_k = cv2.filter2D(img, -1, k_sharp, borderType=cv2.BORDER_REFLECT)
print("Sharpened shapes:", sharp.shape, sharp_k.shape)`
      },
      {
        heading: { uz: "4.5. Gauss Piramidasi va Keys-Muhokama", en: "4.5. Gaussian Pyramids & Case Discussion" },
        bodyHtml: {
          uz: "<p>Tasvirni ketma-ket Gauss filtri bilan silliqlab 2× kichraytirish (<em>Gaussian Pyramid</em>: <code>cv2.pyrDown</code>) orqali SIFT, Haar va Feature Pyramid Network (FPN) kabi ko'p masshtabli detektorlar quriladi.</p>",
          en: "<p>Repeatedly smoothing with a Gaussian kernel and subsampling by 2 builds a <strong>Gaussian Pyramid</strong> (<code>cv2.pyrDown</code>)—the foundation of SIFT, optical flow, and multi-scale FPN detectors.</p>"
        },
        discussion: {
          q: { uz: "Nima uchun tasvirni 4× kichraytirishdan oldin albatta Gauss blur qo'llash kerak (oddiy piksel tashlab o'tish img[::4, ::4] o'rniga)?", en: "Why must you apply Gaussian blur before 4× downsampling instead of naive stride slicing img[::4, ::4]?" },
          a: { uz: "Naiv img[::4, ::4] Nikvist chastotasidan yuqori detallarni olib tashlamaydi, natijada yuzlab soxta chiziqlar (aliasing/Moiré) hosil bo'ladi. Gauss filtri yuqori chastotalarni kesib aliasing ni oldini oladi.", en: "Naive striding violates Nyquist sampling and produces jagged aliasing/Moiré artifacts. Gaussian pre-filtering removes frequencies above the new Nyquist limit." }
        }
      }
    ],
    slides: [
      { title: { uz: "4.1. Oldindan Qayta Ishlash (Preprocessing)", en: "4.1. Preprocessing Pipeline & Role" }, points: { uz: ["Tamoyil: Garbage in → Garbage out", "Bosqichlar: Shovqin tozalash → Resize → Normallashtirish → Kontrast", "Chiziqli filtrlar xossalari: Superpozitsiya va Gomogenlik", "Past yorug'likda Gistogramma tenglashtirish (HE / CLAHE)"], en: ["Principle: Garbage in → Garbage out", "Pipeline: Denoise → Resize → Normalize → Enhance contrast", "Linearity: Additivity & Homogeneity properties", "CLAHE boosts local contrast in dark scenes"] } },
      { title: { uz: "2D Svyortka (Convolution) vs Korrelyatsiya", en: "2D Convolution vs Cross-Correlation" }, latex: "(I * K)(x, y) = \\sum_{i=-a}^{a} \\sum_{j=-b}^{b} I(x-i, y-j)\\, K(i, j)", points: { uz: ["Korrelyatsiyada yadro to'g'ridan-to'g'ri qo'yiladi", "Svyortkada yadro 180° aylantiriladi (simmetrik yadroda natija bir xil)", "Silliqlash yadrosida Σ K(i,j) = 1 → yorqinlik o'zgarmaydi", "Chekka aniqlash yadrolarida Σ K(i,j) = 0 → tekis hududda nol"], en: ["Cross-correlation slides weights as-is; Convolution flips 180°", "Identical for symmetric filters (Mean, Gaussian)", "Smoothing weights sum to 1; derivative weights sum to 0"] } },
      { title: { uz: "Interaktiv 2D Svyortka (Kernel) Simulatori", en: "Interactive 2D Convolution Simulator" }, widget: 'conv-sim' },
      { title: { uz: "Mean (O'rtacha) vs Gauss Filtri", en: "Mean Blur vs Gaussian Blur" }, table: { headers: { uz: ["Xususiyat", "Mean Filtr (1/k²)", "Gauss Filtr (σ)"], en: ["Property", "Mean Filter", "Gaussian Filter"] }, rows: { uz: [["Vazn taqsimoti", "Barcha qo'shnilar teng", "Markaz eng katta, masofa bo'yicha kamayadi"], ["Chekka sifati", "Keskin xiralashtiradi", "Tabiiyroq silliqlash"], ["Chastota javobi", "Ringing (halqa) artefakti", "Silliq, ringing yo'q"], ["OpenCV API", "cv2.blur(img, (k, k))", "cv2.GaussianBlur(img, (k, k), sigmaX)"]], en: [["Weights", "Uniform 1/k²", "Bell curve G(x,y)"], ["Edges", "Heavy smearing", "Smoother roll-off"], ["Frequency", "Sidelobe ringing", "Smooth Gaussian FT"], ["OpenCV API", "cv2.blur()", "cv2.GaussianBlur()"]] } } },
      { title: { uz: "Gauss Taqsimoti va Ajraluvchanlik O(2N)", en: "Gaussian Kernel & O(2N) Separability" }, latex: "G(x,y)=\\frac{1}{2\\pi\\sigma^2}e^{-\\frac{x^2+y^2}{2\\sigma^2}}, \\quad G_{2D} = g_y \\cdot g_x^T", points: { uz: ["Yadro o'lchami amaliy qoida: k ≈ ⌈6σ + 1⌉ (toq son)", "Ajraluvchanlik: avval qator (1×k), so'ng ustun (k×1)", "15×15 yadroda: 225 amal o'rniga 15+15=30 amal → 7.5× tezroq!", "Katta σ → kuchli xiralashuv va Gauss piramidasi asosi"], en: ["Rule of thumb: odd kernel k ≈ ⌈6σ + 1⌉", "Separable 1D passes slash O(k²) → O(2k)", "15×15 filter drops from 225 ops to 30 ops (7.5× faster!)"] } },
      { title: { uz: "Chegara Shartlari (Border Padding) va FFT", en: "Border Padding Modes & Convolution Theorem" }, points: { uz: ["Zero-padding (BORDER_CONSTANT): chetlar qorayib qoladi", "Replicate (BORDER_REPLICATE): oxirgi piksel takrorlanadi", "Reflect (BORDER_REFLECT): oyna aks ettirish (eng sifatli)", "FFT Teoremasi: Fazoda I * K = Chastotada F(I) · F(K) (katta yadrolarda tez)"], en: ["Zero-padding darkens image borders", "Replicate repeats boundary pixels", "Reflect mirrors pixels cleanly without seams", "FFT Theorem: Spatial Conv = Frequency Multiplication"] } },
      { title: { uz: "Tasvirni O'tkirlashtirish: Unsharp Masking", en: "Image Sharpening: Unsharp Masking" }, latex: "I_{\\text{sharp}} = I + \\alpha\\,(I - G_\\sigma * I) = (1+\\alpha)I - \\alpha(G_\\sigma * I)", points: { uz: ["1. Asl I dan silliqlangan G*I ni ayiramiz → faqat yuqori chastotali chekkalar qoladi", "2. Detallarni α koeffitsiyent bilan kuchaytirib I ga qo'shamiz", "OpenCV da: cv2.addWeighted(img, 1.5, blurred, -0.5, 0)"], en: ["1. Subtract smooth image G*I from I to isolate high frequencies", "2. Amplify details by α and add back", "One-liner: cv2.addWeighted(img, 1.5, blurred, -0.5, 0)"] } },
      { title: { uz: "Sonli Misol (Doskada): 3×3 Mean vs Gauss", en: "Worked Example: 3×3 Mean vs Gauss" }, points: { uz: ["Chiziqli oyna I = [[10,20,30], [40,50,60], [70,80,90]]", "Mean: (10+20+...+90) / 9 = 450 / 9 = 50", "Gauss (1/16 × [[1,2,1],[2,4,2],[1,2,1]]): (10+40+30+80+200+120+70+160+90)/16 = 800/16 = 50", "Chekkali oyna [[10,10,90]×3] da: Gauss=30, Unsharp(α=1) → 10+(10-30)=-10→0!"], en: ["Linear patch [[10,20,30],[40,50,60],[70,80,90]] → Mean=50, Gauss=50", "Step edge [[10,10,90]×3] → Gauss=30, Unsharp(α=1) pushes 10 → 0 (higher contrast)"] } },
      { title: { uz: "Python Kod: GaussianBlur va Custom filter2D", en: "Python Walkthrough: Gaussian & Unsharp Mask" }, code: `blur = cv2.GaussianBlur(img, (7, 7), sigmaX=1.5)
sharp = cv2.addWeighted(img, 1.5, blur, -0.5, 0)
kernel = np.array([[0,-1,0], [-1,5,-1], [0,-1,0]], np.float32)
res = cv2.filter2D(img, -1, kernel, borderType=cv2.BORDER_REFLECT)` },
      { title: { uz: "Muhokama: Kichraytirishdan Oldin Blur", en: "Discussion: Pre-blur Before Downsampling" }, discussion: { q: { uz: "Tasvirni 4× kichraytirganda img[::4, ::4] qilish nima uchun xato va qanday tuzatamiz?", en: "Why does naive striding img[::4, ::4] look jagged, and how do we fix it?" }, a: { uz: "Nikvist chegarasidan yuqori chastotalar aliasing beradi. Avval Gauss blur qo'llab so'ng kichraytirish (cv2.pyrDown / INTER_AREA) shart.", en: "High frequencies wrap into Moiré aliasing. Apply Gaussian low-pass filtering (or cv2.INTER_AREA / pyrDown) first." } } }
    ],
    glossary: [
      { uz: "svyortka (konvolyutsiya)", en: "convolution", defUz: "Yadroni tasvir bo'ylab siljitib vaznli yig'indi olish", defEn: "Sliding weighted sum over image neighborhoods" },
      { uz: "ajraluvchan filtr", en: "separable filter", defUz: "2D amalni 1D gorizontal va 1D vertikal amalga ajratish", defEn: "Factorizing 2D kernel into two 1D passes" },
      { uz: "nolli to'ldirish", en: "zero-padding", defUz: "O'lcham saqlash uchun tasvir chetiga nollar qo'shish", defEn: "Adding border zeros to preserve output spatial size" },
      { uz: "unsharp masking", en: "unsharp masking", defUz: "Silliqlangan nusxani ayirib tasvir qirralarini o'tkirlashtirish", defEn: "Sharpening by adding high-frequency residuals back to the image" }
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
    keywords: ['Non-linear Filter', 'Median Filter', 'Salt and Pepper', 'Bilateral Filter', 'Guided Filter', 'Perona-Malik', 'ISP'],
    title: {
      uz: "Tasvirlarga ishlov berishda nochiziqli filtrlar",
      en: "Non-Linear & Edge-Preserving Filters (Median & Bilateral)"
    },
    description: {
      uz: "Nochiziqli statistik mustahkamlik, Median filtri va 'tuz-murch' (salt-and-pepper) shovqini, Bilateral filtr (σ_s, σ_r), Guided Filter O(N), Anizotrop diffuziya va ko'p bosqichli tozalash strategiyasi.",
      en: "Order-statistic robustness, Median filtering vs salt-and-pepper noise, Bilateral filter (σ_s, σ_r), O(N) Guided Filter, Anisotropic Diffusion, and mixed-noise denoising strategies."
    },
    refs: [
      { label: "COMP4423 L3: Noise Reduction", url: "https://github.com/lookwei/COMP4423" },
      { label: "Szeliski Ch. 3.3: Non-linear Filtering", url: "https://szeliski.org/Book/" },
      { label: "Awesome CV: Edge-Preserving Filtering", url: "https://github.com/jbhuang0604/awesome-computer-vision" }
    ],
    sections: [
      {
        heading: { uz: "5.1. Nima Uchun Chiziqli Filtrlar Yetarli Emas? Median Filtri", en: "5.1. Limits of Linear Filters & The Median Filter" },
        bodyHtml: {
          uz: "<p>Chiziqli filtrlar barcha qo'shnilarni o'rtachaga tortadi — natijada bitta ekstremal piksel (masalan, <code>255</code> oq nuqta) butun 3×3 oynaning o'rtachasini buzib yuboradi va chekkalarni ham xiralashtiradi. <strong>Nochiziqli filtrlar</strong> (Median, Min, Max) esa tartiblash (<em>order statistics</em>) orqali ishlaydi.</p><p><strong>Median filtri:</strong> $k\\times k$ oynadagi piksellar o'sish tartibida saralanib, o'rtadagi element olinadi. Bu <strong>Salt-and-Pepper (tuz va murch)</strong> impuls shovqinini izsiz yo'qotadi va tasvirda mavjud bo'lmagan aralash qiymat yaratmagani uchun chekkalarni aniq saqlaydi!</p>",
          en: "<p>Linear filters average every neighbor—so one extreme <code>255</code> outlier biases the output and smears sharp edges. <strong>Non-linear filters</strong> operate via sorting/ranking rather than dot products.</p><p><strong>Median Filter:</strong> Sorts the window and selects the middle intensity, eliminating <strong>salt-and-pepper impulse noise</strong> cleanly while keeping step edges sharp.</p>"
        },
        widget: 'denoise-sim'
      },
      {
        heading: { uz: "5.2. Bilateral Filtr, Guided Filter va Anizotrop Diffuziya", en: "5.2. Bilateral Filter, Guided Filter & Anisotropic Diffusion" },
        bodyHtml: {
          uz: "<p><strong>Bilateral filtr:</strong> Gauss filtrini ikkinchi — <strong>yorqinlik o'xshashligi ($\\sigma_r$)</strong> koeffitsiyenti bilan ko'paytiradi. Agar qo'shni piksel chekkaning narigi tomonida bo'lsa ($|I_p - I_q| \\gg \\sigma_r$), uning vazni $G_{\\sigma_r}(|I_p - I_q|) \\to 0$ bo'lib qoladi va chekka saqlanadi!</p><p><strong>Parametrlar:</strong> $\\sigma_s$ (<em>sigmaSpace</em>) — fazoviy oyna o'lchami; $\\sigma_r$ (<em>sigmaColor</em>) — qanday rang farqi chekka sanalishi ($\\sigma_r \\to \\infty$ da oddiy Gauss filtriga aylanadi!). Tezlik zarur bo'lganda $O(N)$ murakkablikdagi <strong>Guided Filter</strong> (He et al.) yoki gradientga moslashuvchi <strong>Perona-Malik anizotrop diffuziyasi</strong> qo'llaniladi.</p>",
          en: "<p><strong>Bilateral Filter:</strong> Multiplies spatial Gaussian ($\\sigma_s$) by intensity-range Gaussian ($\\sigma_r$). Across sharp boundaries ($|I_p - I_q| \\gg \\sigma_r$), weights collapse near zero, leaving edges crisp!</p><p>As $\\sigma_r \\to \\infty$, Bilateral degrades to standard Gaussian blur. For real-time speed, use the $O(N)$ <strong>Guided Filter</strong> or gradient-aware <strong>Perona-Malik anisotropic diffusion</strong>.</p>"
        },
        latex: "BF[I]_p = \\frac{1}{W_p} \\sum_{q \\in S} G_{\\sigma_s}(\\|p - q\\|)\\, G_{\\sigma_r}(|I_p - I_q|)\\, I_q"
      },
      {
        heading: { uz: "5.3. Sonli Misol (Doskada): Median vs Mean Impuls Shovqinida", en: "5.3. Worked Numerical Example: Median vs Mean on Outlier" },
        bodyHtml: {
          uz: "<p><strong>Berilgan 3×3 oyna:</strong> $I = \\begin{bmatrix}10 & 12 & 11\\\\ 13 & \\mathbf{255} & 14\\\\ 12 & 13 & 11\\end{bmatrix}$, markazdagi <code>255</code> — impuls shovqin nuqtasi.<br>• <strong>Mean filtr:</strong> $\\frac{10+12+11+13+255+14+12+13+11}{9} = \\frac{351}{9} = \\mathbf{39}$ (markazdagi haqiqiy ~12 qiymat 3× buzildi!).<br>• <strong>Median filtr:</strong> Barcha 9 elementni saralaymiz: $[10, 11, 11, 12, \\mathbf{12}, 13, 13, 14, 255]$. 5-chi (o'rta) element $= \\mathbf{12}$! Shovqin izsiz yo'qoldi!</p><p><strong>Chekkalarni saqlash sinovi:</strong> O'ng tomoni 100 bo'lgan chekkada $[10,10,10, 10,10,10, 100,100,100]$: Mean $40$ berib chekkani bulg'aydi, Median esa toza $\\mathbf{10}$ ni qaytaradi!</p>",
          en: "<p><strong>Window:</strong> $[[10,12,11],[13,\\mathbf{255},14],[12,13,11]]$.<br>• <strong>Mean:</strong> $351 / 9 = \\mathbf{39}$ (heavily skewed by outlier 255).<br>• <strong>Median:</strong> Sorted $[10,11,11,12,\\mathbf{12},13,13,14,255] \\implies \\mathbf{12}$ (cleanly recovered!).</p><p>On step edge $[10\\times 6, 100\\times 3]$, Mean smears to $40$, while Median outputs crisp $\\mathbf{10}$.</p>"
        },
        latex: "\\text{Sorted} = [10, 11, 11, 12, \\underline{\\mathbf{12}}, 13, 13, 14, 255] \\implies \\text{Median} = 12"
      },
      {
        heading: { uz: "5.4. Python / OpenCV Kod Tahlili va Keng Tarqalgan Xatolar", en: "5.4. Python Walkthrough: Median vs Bilateral Speed & PSNR" },
        bodyHtml: {
          uz: "<p><strong>Diqqat:</strong> <code>cv2.medianBlur(img, k)</code> da <code>k</code> faqat <strong>toq butun son ≥ 3</strong> bo'lishi shart (3, 5, 7...), aks holda OpenCV xato tashlaydi! Bilateral filtr esa $O(k^2)$ har piksel uchun <code>exp()</code> hisoblagani uchun katta $d$ qiymatlarida sekinlashadi — real vaqtda <code>d=5..9</code> yetarli.</p>",
          en: "<p><strong>Watch out:</strong> <code>cv2.medianBlur(img, k)</code> requires an <strong>odd integer k ≥ 3</strong>. <code>cv2.bilateralFilter</code> computes exponentials at each pixel, so keep <code>d=5..9</code> for interactive framerates.</p>"
        },
        code: `import cv2, time, numpy as np

clean = np.full((240, 320), 120, dtype=np.uint8)
clean[:, 160:] = 220  # Keskin vertikal chekka

# 5% salt-and-pepper shovqini qo'shish
noisy = clean.copy()
rng = np.random.default_rng(42)
mask_s = rng.random(clean.shape) < 0.025
mask_p = rng.random(clean.shape) < 0.025
noisy[mask_s], noisy[mask_p] = 255, 0

med = cv2.medianBlur(noisy, 3)
bil = cv2.bilateralFilter(clean, d=9, sigmaColor=75, sigmaSpace=75)
print(f"Noisy PSNR={cv2.PSNR(clean, noisy):.2f} dB -> Median PSNR={cv2.PSNR(clean, med):.2f} dB")`
      },
      {
        heading: { uz: "5.5. Aralash Shovqin Strategiyasi, ISP va DnCNN", en: "5.5. Hybrid Denoising Strategy, ISP & Denoising CNNs" },
        bodyHtml: {
          uz: "<p>Smartfon kameralarining ISP (<em>Image Signal Processing</em>) quvurida va tibbiy tasvirlashda odatda avval <strong>Median</strong> bilan impuls nuqtalar olinadi, so'ngra <strong>Bilateral / Guided Filter</strong> bilan Gauss shovqini silliqlanadi. Zamonaviy chuqur o'qitishda <strong>DnCNN</strong> tarmoqlari klassik chekka saqlash g'oyasini residual shovqin xaritasini o'rganish orqali davom ettiradi.</p>",
          en: "<p>Modern camera ISPs stack <strong>Median → Bilateral/Guided</strong> for mixed noise. Deep denoisers like <strong>DnCNN</strong> extend edge-preserving filtering by learning residual noise maps end-to-end.</p>"
        },
        discussion: {
          q: { uz: "Tasvirda ham salt-and-pepper (impuls), ham yuqori ISO Gauss shovqini bor. Avval Gauss, keyin Median qilsak bo'ladimi? Nima uchun tartib muhim?", en: "For mixed Gaussian + salt-and-pepper noise, why does Median → Bilateral work much better than Bilateral → Median?" },
          a: { uz: "Agar avval Gauss/Bilateral qo'llasak, yakka 255 impuls nuqtalari atrofiga yoyilib katta dog'ga aylanadi va 3×3 median uni olib tashlay olmaydi. Avval 3×3 Median impulsni tozalaydi, so'ng Bilateral qolgan Gauss shovqinini chekkalarni saqlab tekislaydi.", en: "Running Gaussian/Bilateral first smears sharp 255 impulses into wide blobs that a 3×3 median cannot eliminate. Median first erases isolated spikes cleanly, then Bilateral smooths residual Gaussian noise." }
        }
      }
    ],
    slides: [
      { title: { uz: "5.1. Chiziqli Filtrlar Cheklovi va Nochiziqli G'oya", en: "5.1. Why Non-Linear Filters Matter" }, points: { uz: ["Chiziqli filtrlar = vaznli yig'indi → ekstremal nuqtaga (outlier) sezgir", "Bitta 255 piksel Mean filtr natijasini keskin buzadi", "Nochiziqli filtrlar saralash (tartiblash) yoki shartli vaznga tayanadi", "Maqsad: Shovqinni tozalash + Keskin chekkalarni saqlash"], en: ["Linear weighted averages are ruined by extreme outliers", "A single 255 spike skews the entire Mean window", "Non-linear filters rely on sorting or intensity-aware weights", "Goal: Remove noise while preserving crisp edges"] } },
      { title: { uz: "Median Filtri va Statistik Mustahkamlik", en: "Median Filter & Outlier Robustness" }, points: { uz: ["k × k oynadagi qiymatlar o'sish tartibida saralanadi → o'rta element tanlanadi", "0 va 255 impuls ('salt-and-pepper') qiymatlar ro'yxat chetida qoladi", "Tasvirda mavjud bo'lmagan aralash rang yaratmaydi → chekkalar o'tkir!", "Kamchiligi: Saralash tufayli Mean dan sekinroq"], en: ["Sort neighborhood intensities and output middle value", "Extreme 0/255 spikes sit at list ends and are ignored", "Never invents blended gray values → preserves sharp steps"] } },
      { title: { uz: "Interaktiv Shovqin Tozalash: Mean vs Median", en: "Interactive Denoising: Mean vs Median" }, widget: 'denoise-sim' },
      { title: { uz: "Bilateral Filtr Formulasi va Parametrlari", en: "Bilateral Filter Equations & Parameters" }, latex: "BF[I]_p = \\frac{1}{W_p} \\sum_q G_{\\sigma_s}(\\|p-q\\|)\\, G_{\\sigma_r}(|I_p - I_q|)\\, I_q", points: { uz: ["σ_s (Spatial): yaqin piksellarga katta vazn (geometrik masofa)", "σ_r (Range/Color): o'xshash yorqinlikdagi piksellarga katta vazn", "Chekka narigi tomonida |I_p - I_q| katta → vazn ≈ 0 → chekka saqlanadi!", "Katta σ_r → oddiy Gauss filtriga yaqinlashadi"], en: ["σ_s: spatial proximity; σ_r: intensity similarity", "Across sharp edges, large |I_p - I_q| drives weight → 0", "Very large σ_r reduces Bilateral to ordinary Gaussian blur"] } },
      { title: { uz: "Tezkor Analoglar: Guided Filter & Anizotrop Diffuziya", en: "Fast Alternatives: Guided Filter & Anisotropic Diffusion" }, points: { uz: ["Bilateral O(N·k²) — real vaqtli HD videoda sekin", "Guided Filter (He et al.): chiziqli model asosida O(N) tezkor analog", "Perona-Malik anizotrop diffuziya: gradient katta joyda silliqlashni to'xtatadi", "Zamonaviy DnCNN: residual shovqinni neyron tarmoqda ayirish"], en: ["Bilateral is O(N·k²); Guided Filter runs in O(N) time", "Perona-Malik halts diffusion across high gradients", "Modern DnCNN learns residual noise removal end-to-end"] } },
      { title: { uz: "Filtrlar Taqqoslanmasi: Shovqin Modellariga Ko'ra", en: "Filter Selection by Noise Model" }, table: { headers: { uz: ["Shovqin / Vazifa", "Tavsiya etilgan Filtr", "Sabab"], en: ["Noise / Task", "Recommended Filter", "Why"] }, rows: { uz: [["Salt-and-Pepper (Impuls)", "Median (3×3 / 5×5)", "Ekstremal 0/255 ni izsiz o'chiradi"], ["Gauss + Chekka saqlash", "Bilateral / Guided", "σ_r chekka bo'ylab silliqlamaydi"], ["Aralash shovqin", "Median → Bilateral", "Avval impuls, keyin Gauss tozalanadi"], ["Tezkor tayyorlash", "Separable Gauss", "Eng yuqori O(2N) tezlik"]], en: [["Salt-and-Pepper", "Median (3×3)", "Eliminates isolated 0/255 spikes"], ["Gaussian + Sharp Edges", "Bilateral / Guided", "Range weight blocks across edges"], ["Mixed Noise", "Median → Bilateral", "Spikes removed before smoothing"], ["Fast pre-blur", "Separable Gaussian", "Fastest O(2N) runtime"]] } } },
      { title: { uz: "Sonli Misol (Doskada): Median vs Mean", en: "Worked Example: Median vs Mean" }, points: { uz: ["Oyna: [[10, 12, 11], [13, 255, 14], [12, 13, 11]] (255 = shovqin)", "Mean: (10+12+11+13+255+14+12+13+11)/9 = 351/9 = 39 (buzilgan!)", "Saralangan: [10, 11, 11, 12, 12, 13, 13, 14, 255]", "Median (5-element) = 12 (shovqin to'liq bartaraf etildi!)"], en: ["Window: [[10,12,11],[13,255,14],[12,13,11]] (255 = spike)", "Mean = 351/9 = 39 (distorted)", "Sorted = [10,11,11,12,12,13,13,14,255] → Median = 12!"] } },
      { title: { uz: "Python Kod: Median va Bilateral PSNR", en: "Python Walkthrough: Median & Bilateral PSNR" }, code: `med = cv2.medianBlur(noisy, 3)  # k toq bo'lishi shart!
bil = cv2.bilateralFilter(noisy, d=9, sigmaColor=75, sigmaSpace=75)
print("Median PSNR:", round(cv2.PSNR(clean, med), 2), "dB")
print("Bilateral PSNR:", round(cv2.PSNR(clean, bil), 2), "dB")` },
      { title: { uz: "Muhokama: Aralash Shovqinda Filtrlar Tartibi", en: "Discussion: Filter Ordering in Mixed Noise" }, discussion: { q: { uz: "Ham impuls (salt-and-pepper), ham Gauss shovqinli tasvirga avval Bilateral, keyin Median qo'llash nima uchun yomonroq?", en: "For mixed impulse + Gaussian noise, why should Median run BEFORE Bilateral/Gaussian?" }, a: { uz: "Avval silliqlasak yakka 255 piksel qo'shnilarga yoyilib dog' hosil qiladi; avval Median uni o'chiradi, so'ng Bilateral chekkalarni buzmay qolgan shovqinni tekislaydi.", en: "Smoothing first spreads spikes into multi-pixel blobs; Median first drops spikes cleanly, then Bilateral smooths Gaussian noise." } } }
    ],
    glossary: [
      { uz: "median filtri", en: "median filter", defUz: "Oyna qiymatlarini saralab o'rtadagi elementni oluvchi filtr", defEn: "Non-linear filter outputting the neighborhood median" },
      { uz: "bilateral filtr", en: "bilateral filter", defUz: "Fazoviy va yorqinlik masofasini hisobga oluvchi chekka saqlovchi filtr", defEn: "Edge-preserving filter using spatial & intensity weights" },
      { uz: "salt-and-pepper shovqini", en: "salt-and-pepper noise", defUz: "Tasvirda tasodifiy ekstremal oq (255) va qora (0) nuqtalar", defEn: "Sparse random 0 and 255 impulse pixels" },
      { uz: "guided filter", en: "guided filter", defUz: "Bilateral filtrning O(N) vaqtdagi chiziqli tezkor muqobili", defEn: "O(N) edge-preserving approximation using a guidance image" }
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
