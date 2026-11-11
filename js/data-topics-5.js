// M21–M23 + B1: Segmentation, U-Net & Mask R-CNN, Video/Optical Flow/Tracking/FaceRec, & Modern ViT/VLM/Generative CV
window.CV_TOPICS = window.CV_TOPICS || [];

window.CV_TOPICS.push(
  // ==================== M21 ====================
  {
    id: 21,
    code: 'M21',
    labId: 21,
    hours: 2,
    keywords: ['Semantic Segmentation', 'Instance Segmentation', 'Panoptic', 'FCN', 'DeepLab', 'ASPP', 'GrabCut', 'mIoU', 'Dice Loss'],
    title: {
      uz: "Tasvirlarni segmentatsiyalash usullari (Semantik va Instans)",
      en: "Image Segmentation: Semantic, Instance & Panoptic"
    },
    description: {
      uz: "Semantik vs Instans vs Panoptik segmentatsiya, FCN (Encoder-Decoder, skip connections), DeepLab (ASPP), GrabCut (Graph Cut + GMM), piksel tasniflash, Dice Loss va mIoU.",
      en: "Semantic vs Instance vs Panoptic segmentation, FCN (Encoder-Decoder), DeepLab (ASPP), GrabCut (Graph Cut + GMM), Dice Loss, and mIoU."
    },
    refs: [
      { label: "COMP4423 L10: Semantic & Instance Segmentation", url: "https://github.com/lookwei/COMP4423" },
      { label: "MS CV Recipes: Segmentation", url: "https://github.com/microsoft/computervision-recipes" },
      { label: "Szeliski Ch. 5.3–5.5: Segmentation", url: "https://szeliski.org/Book/" }
    ],
    sections: [
      {
        heading: { uz: "21.1. Semantik, Instans va Panoptik Segmentatsiya", en: "21.1. Semantic, Instance & Panoptic Segmentation" },
        bodyHtml: {
          uz: "<p><strong>Semantik segmentatsiya</strong> tasvirning <em>har bir pikseliga</em> sinf yorlig'ini beradi (masalan, barcha mashinalar bir xil 'avtomobil' sinfi). <strong>Instans segmentatsiya</strong> esa bir xil sinfning har bir alohida nusxasini (#1-mashina, #2-mashina) ajratadi. <strong>Panoptik segmentatsiya</strong> ikkalasini birlashtiradi ('osmon/yo'l' kabi fonga semantik, 'odam/mashina' kabi obyektlarga instans maska).</p><p><strong>FCN (2015):</strong> FC qatlamlarni 1×1 konvolyutsiyaga almashtirib, Encoder-Decoder va <em>transposed convolution</em> orqali asl o'lchamda piksel xaritasi chiqardi. <strong>DeepLab</strong> esa <em>dilated conv + ASPP</em> bilan kontekstni kengaytiradi. Klassik interaktiv usullardan <strong>GrabCut</strong> (Graph Cut + 5–8 komponentli GMM) MS Office da fon o'chirishda qo'llanilgan.</p>",
          en: "<p><strong>Semantic segmentation</strong> labels every pixel by class (no instance separation). <strong>Instance segmentation</strong> isolates each object mask. <strong>Panoptic segmentation</strong> unifies both ('stuff' + 'things').</p><p><strong>FCN (2015)</strong> replaced FC layers with 1×1 convolutions and transposed conv upsampling. <strong>DeepLab</strong> adds <em>ASPP</em> multi-scale dilated convolutions. Classical <strong>GrabCut</strong> uses Graph Cuts + Gaussian Mixtures (5–8 components).</p>"
        }
      },
      {
        heading: { uz: "21.2. Piksel Darajasida Tasniflash, Dice Loss va mIoU", en: "21.2. Pixel Classification, Dice Loss & mIoU" },
        bodyHtml: {
          uz: "<p>Har bir piksel mustaqil Softmax + Cross-Entropy bilan tasniflanadi. Ammo 'osmon/yo'l' piksellari ko'p bo'lib, 'piyoda' kam bo'lgani uchun (<strong>sinflar nomutanosibligi</strong>) oddiy piksel aniqligi (pixel accuracy) chalg'itadi! Shuning uchun <strong>Dice Loss</strong> va <strong>mIoU (mean Intersection over Union)</strong> ishlatiladi.</p><p><strong>Augmentatsiya eslatmasi:</strong> Tasvir kesilsa yoki aylantirilsa, uning segmentatsiya maskasi ham aynan bir xil transformatsiyaga uchratilishi shart!</p>",
          en: "<p>Because background pixels dominate small objects (extreme imbalance), plain pixel accuracy misleads. Use <strong>Dice Loss</strong> or weighted cross-entropy, and evaluate with <strong>mIoU</strong> (equal weight per class). Geometric augmentations must transform both image and mask identically!</p>"
        },
        latex: "\\text{mIoU} = \\frac{1}{C}\\sum_{c=1}^{C} \\frac{\\text{TP}_c}{\\text{TP}_c + \\text{FP}_c + \\text{FN}_c}",
        widget: 'seg-dice'
      }
    ],
    slides: [
      { title: { uz: "M21: Tasvirlarni Segmentatsiyalash", en: "M21: Semantic & Instance Segmentation" }, subtitle: { uz: "KOK1506 · COMP4423 L10 · CV Recipes", en: "KOK1506 · COMP4423 L10 · CV Recipes" }, points: { uz: ["Semantik (piksel sinfi) vs Instans (alohida obyekt) vs Panoptik", "FCN: 1×1 conv + Encoder-Decoder + Skip connections", "DeepLab (ASPP) va GrabCut (Graph Cut + GMM)", "Piksel tasniflashda sinf nomutanosibligi: Dice Loss & mIoU"], en: ["Semantic vs Instance vs Panoptic segmentation", "FCN: 1×1 conv + Encoder-Decoder + Skip connections", "DeepLab (ASPP) & GrabCut (Graph Cut + GMM)", "Class imbalance: Dice Loss & mIoU evaluation"] } },
      { title: { uz: "Interaktiv Dice vs IoU Kalkulyatori", en: "Interactive Dice vs IoU Calculator" }, widget: 'seg-dice' }
    ],
    glossary: [
      { uz: "semantik segmentatsiya", en: "semantic segmentation", defUz: "Har pikselni sinfga ajratish (alohida obyektlarni farqlamaydi)", defEn: "Per-pixel class labeling without instance separation" },
      { uz: "instans segmentatsiya", en: "instance segmentation", defUz: "Bir xil sinfdagi har bir obyekt nusxasiga alohida maska", defEn: "Distinct per-pixel mask for each object instance" },
      { uz: "mIoU", en: "mean IoU", defUz: "Barcha sinflar bo'yicha o'rtacha IoU ko'rsatkichi", defEn: "Class-averaged Intersection over Union metric" }
    ],
    quiz: [
      { q: { uz: "Semantik segmentatsiya va Instans segmentatsiya orasidagi asosiy farq nimada?", en: "What is the key difference between Semantic and Instance segmentation?" }, options: [{ label: 'A', uz: "Semantik faqat sinfni, Instans esa bir xil sinfning alohida nusxalarini ham ajratadi", en: "Semantic assigns class only; Instance separates individual objects of the same class" }, { label: 'B', uz: "Semantik faqat 1 sinfda ishlaydi", en: "Semantic is 1-class" }, { label: 'C', uz: "Instans faqat kulrang rasmda ishlaydi", en: "Grayscale only" }, { label: 'D', uz: "Farqi yo'q", en: "No difference" }], answer: 'A', explanation: { uz: "Masalan, 3 ta mashinani semantik bitta 'mashina' qiladi, instans esa 3 ta alohida maska beradi.", en: "Semantic merges 3 cars into one mask; Instance labels Car #1, #2, #3 separately." } },
      { q: { uz: "Obyekt sinfi IoU=0.80 va Fon sinfi IoU=0.944 bo'lsa, mIoU nechaga teng?", en: "If Object IoU=0.80 and Background IoU=0.944, what is mIoU?" }, options: [{ label: 'A', uz: "0.872", en: "0.872" }, { label: 'B', uz: "0.944", en: "0.944" }, { label: 'C', uz: "0.800", en: "0.800" }, { label: 'D', uz: "0.750", en: "0.750" }], answer: 'A', explanation: { uz: "mIoU = (0.80 + 0.944) / 2 = 0.872.", en: "mIoU averages per-class IoUs: (0.80 + 0.944) / 2 = 0.872." } },
      { q: { uz: "FCN (Fully Convolutional Network) klassifikatsiya CNN dan qaysi qatlamlarni almashtirib yaratilgan?", en: "How did FCN adapt classification CNNs for arbitrary-size segmentation?" }, options: [{ label: 'A', uz: "Yakuniy FC qatlamlarni 1×1 konvolyutsiya bilan almashtirib", en: "Replaced final FC layers with 1×1 convolutions" }, { label: 'B', uz: "ReLU ni olib tashlab", en: "Removed ReLU" }, { label: 'C', uz: "Sobel qo'shib", en: "Added Sobel" }, { label: 'D', uz: "k-NN qo'shib", en: "Added k-NN" }], answer: 'A', explanation: { uz: "1×1 konvolyutsiya fazoviy o'lchamni saqlab istalgan o'lchamli tasvirni qabul qiladi.", en: "1×1 convs preserve spatial grid and accept arbitrary input resolutions." } },
      { q: { uz: "GrabCut algoritmi fon va obyekt ranglarini modellashtirishda nimadan foydalanadi?", en: "How does GrabCut model foreground and background color distributions?" }, options: [{ label: 'A', uz: "5–8 komponentli Gauss aralashmasi (GMM) va graf kesish", en: "5–8 component Gaussian Mixture Models (GMM) + Graph Cut" }, { label: 'B', uz: "YOLO grid", en: "YOLO grid" }, { label: 'C', uz: "Viola-Jones", en: "Viola-Jones" }, { label: 'D', uz: "Hough", en: "Hough" }], answer: 'A', explanation: { uz: "GrabCut har tomon uchun GMM + iterativ Graph Cut qo'llaydi.", en: "GrabCut pairs GMM color modeling with iterative Graph Cut optimization." } }
    ],
    matching: [
      { left: { uz: "Semantik", en: "Semantic" }, right: { uz: "Har pikselga sinf (nusxalarsiz)", en: "Class per pixel, no instance IDs" } },
      { left: { uz: "Instans", en: "Instance" }, right: { uz: "Har bir obyekt nusxasiga alohida maska", en: "Separate mask for every object instance" } },
      { left: { uz: "Panoptik", en: "Panoptic" }, right: { uz: "Semantik + Instans birlashgan yaxlit chiqish", en: "Unified stuff + things segmentation" } },
      { left: { uz: "DeepLab ASPP", en: "DeepLab ASPP" }, right: { uz: "Turli masshtabli dilatatsiyalangan pooling", en: "Multi-scale atrous spatial pyramid pooling" } }
    ],
    fillGap: [
      { text: { uz: "Segmentatsiyada sinflar nomutanosibligini yumshatuvchi ustma-ust tushishga asoslangan loss ___ deyiladi.", en: "An overlap-based segmentation loss resilient to class imbalance is ___ Loss." }, answer: ['Dice'] },
      { text: { uz: "Semantik va instans segmentatsiyani birlashtiruvchi yondashuv ___ segmentatsiya deyiladi.", en: "Combining semantic and instance segmentation yields ___ segmentation." }, answer: ['panoptik', 'panoptic'] },
      { text: { uz: "FCN da past o'lchamli xaritani asl rasm o'lchamiga kengaytirish ___ deyiladi.", en: "Expanding low-res decoder feature maps back to input resolution is ___." }, answer: ['upsampling', 'deconvolution'] }
    ]
  },

  // ==================== M22 ====================
  {
    id: 22,
    code: 'M22',
    labId: 22,
    hours: 2,
    keywords: ['U-Net', 'Mask R-CNN', 'RoI Align', 'Skip Connections', 'nnU-Net', 'Medical Imaging', 'Dice Coefficient'],
    title: {
      uz: "Zamonaviy segmentatsiya modellari (U-Net, Mask R-CNN)",
      en: "Modern Segmentation Models: U-Net & Mask R-CNN"
    },
    description: {
      uz: "U-Net simmetrik U-shakl & zich skip-connectionlar (concatenate), nnU-Net, Mask R-CNN (RoI Align vs RoI Pooling, 3 boshli multi-task loss), tibbiy va sanoat segmentatsiyasi.",
      en: "U-Net encoder-decoder with concatenated skips, nnU-Net, Mask R-CNN (RoI Align vs RoI Pooling, 3-branch loss), and medical/industrial segmentation."
    },
    refs: [
      { label: "COMP4423 L10: U-Net & Mask R-CNN", url: "https://github.com/lookwei/COMP4423" },
      { label: "MS CV Recipes: UNet Segmentation", url: "https://github.com/microsoft/computervision-recipes" },
      { label: "Awesome Medical Imaging", url: "https://github.com/jbhuang0604/awesome-computer-vision" }
    ],
    sections: [
      {
        heading: { uz: "22.1. U-Net Arxitekturasi va Zich Skip Bog'lanishlar", en: "22.1. U-Net Architecture & Concatenated Skip Connections" },
        bodyHtml: {
          uz: "<p><strong>U-Net (Ronneberger et al., 2015)</strong> dastlab tibbiy hujayra tasvirlari uchun yaratilgan simmetrik 'U'-simon Encoder-Decoder tarmog'idir. Uning asosiy yangiligi — encoder ning har darajasidagi xususiyat xaritasini decoder ning mos darajasiga to'g'ridan-to'g'ri <strong>birlashtirish (concatenate)</strong>.</p><p>Elastik deformatsiya augmentatsiyasi bilan U-Net juda kam (hatto 30–50 ta) o'qitish tasvirida ham aniq chegara beradi! Kengaytmalari: <em>U-Net++</em>, <em>Attention U-Net</em>, <em>3D U-Net</em> va avtomatik sozlanuvchi <strong>nnU-Net (2021)</strong>.</p>",
          en: "<p><strong>U-Net (2015)</strong> is a symmetric U-shaped encoder-decoder built for biomedical segmentation. Concatenating encoder feature maps directly into matching decoder levels restores crisp spatial boundaries—achieving strong accuracy even on tiny datasets via elastic deformation augmentation. Extensions include <em>3D U-Net</em>, <em>Attention U-Net</em>, and self-configuring <strong>nnU-Net</strong>.</p>"
        }
      },
      {
        heading: { uz: "22.2. Mask R-CNN: RoI Align va Maska Boshi", en: "22.2. Mask R-CNN: RoI Align & Decoupled Mask Head" },
        bodyHtml: {
          uz: "<p><strong>Mask R-CNN (Kaiming He, 2017)</strong> Faster R-CNN ga uchinchi parallel <strong>FCN maska boshini</strong> qo'shadi ($L = L_{\\text{cls}} + L_{\\text{box}} + L_{\\text{mask}}$). Maska bashorati klassifikatsiyadan mustaqil (har sinf uchun alohida binar maska) amalga oshiriladi.</p><p><strong>RoI Align:</strong> RoI Pooling dagi koordinatalarni butun songa yaxlitlash (quantization) xatosini yo'qotib, <strong>bilineyar interpolyatsiya</strong> bilan subpiksel aniqlikda xususiyat kesib oladi! Tibbiyotda shifokorga yordamchi tizim va sanoatda nuqson maydonini o'lchashda qo'llaniladi.</p>",
          en: "<p><strong>Mask R-CNN (2017)</strong> adds a parallel <strong>FCN mask branch</strong> to Faster R-CNN ($L = L_{\\text{cls}} + L_{\\text{box}} + L_{\\text{mask}}$) predicting decoupled binary masks per class.</p><p><strong>RoI Align</strong> replaces quantized RoI Pooling with <strong>bilinear interpolation</strong> at exact floating-point coordinates, drastically improving pixel mask alignment.</p>"
        },
        latex: "\\text{Dice} = \\frac{2|A \\cap B|}{|A| + |B|}, \\quad \\text{IoU} = \\frac{\\text{Dice}}{2 - \\text{Dice}}"
      }
    ],
    slides: [
      { title: { uz: "M22: Zamonaviy Segmentatsiya (U-Net & Mask R-CNN)", en: "M22: U-Net & Mask R-CNN" }, subtitle: { uz: "KOK1506 · COMP4423 L10 · CV Recipes", en: "KOK1506 · COMP4423 L10 · CV Recipes" }, points: { uz: ["U-Net: Encoder-Decoder + zich Concatenate skip connections", "Kam ma'lumotda ham kuchli (elastik augmentatsiya, 3D U-Net, nnU-Net)", "Mask R-CNN: Faster R-CNN + FCN Mask Boshi", "RoI Align (bilineyar interpolyatsiya) vs RoI Pooling (yaxlitlash xatosi)"], en: ["U-Net: Symmetric Encoder-Decoder + concatenated skips", "Excels on small medical datasets (elastic aug, 3D U-Net, nnU-Net)", "Mask R-CNN: Faster R-CNN + decoupled FCN Mask Head", "RoI Align (bilinear interpolation) fixes RoI Pooling quantization"] } },
      { title: { uz: "Sonli Misol: Dice vs IoU", en: "Worked Example: Dice vs IoU" }, latex: "|A|=90,\\ |B|=100,\\ |A\\cap B|=80 \\implies \\text{Dice}=\\frac{160}{190}\\approx 0.842, \\quad \\text{IoU}=\\frac{80}{110}\\approx 0.727", points: { uz: ["Bir xil maska uchun Dice qiymati doimo IoU dan katta chiqadi!"], en: ["For any non-trivial mask, Dice is strictly higher than IoU!"] } }
    ],
    glossary: [
      { uz: "U-Net", en: "U-Net", defUz: "Encoder-decoder xaritalarini concatenate qiluvchi segmentatsiya tarmog'i", defEn: "U-shaped network concatenating encoder-decoder features" },
      { uz: "RoI Align", en: "RoI Align", defUz: "Yaxlitlashsiz bilineyar interpolyatsiyali subpiksel RoI ajratish", defEn: "Quantization-free bilinear feature extraction for Mask R-CNN" },
      { uz: "Dice koeffitsienti", en: "Dice coefficient", defUz: "2|A∩B|/(|A|+|B|) — tibbiy segmentatsiya baholash mezoni", defEn: "2|A∩B|/(|A|+|B|) F1-equivalent pixel overlap metric" }
    ],
    quiz: [
      { q: { uz: "U-Net da Encoder va Decoder orasidagi gorizontal skip connection lar qanday birlashtiriladi?", en: "How does U-Net combine encoder and decoder feature maps across skip connections?" }, options: [{ label: 'A', uz: "Kanallar bo'yicha to'g'ridan-to'g'ri birlashtirish (concatenate)", en: "Channel-wise concatenation" }, { label: 'B', uz: "Ko'paytirish", en: "Multiplication" }, { label: 'C', uz: "Max pooling", en: "Max pooling" }, { label: 'D', uz: "Dropout", en: "Dropout" }], answer: 'A', explanation: { uz: "Concatenate encoder dagi nozik fazoviy chegaralarni decoder ga to'liq yetkazadi.", en: "Concatenation preserves fine high-resolution localization cues for the decoder." } },
      { q: { uz: "Mask R-CNN da RoI Pooling o'rniga RoI Align qo'llanilishi qanday muammoni hal qildi?", en: "What flaw of RoI Pooling did RoI Align fix in Mask R-CNN?" }, options: [{ label: 'A', uz: "Koordinatalarni yaxlitlash (quantization) sababli piksel maskasi siljishini yo'qotdi", en: "Eliminated coordinate quantization misalignment via bilinear interpolation" }, { label: 'B', uz: "RPN ni o'chirdi", en: "Removed RPN" }, { label: 'C', uz: "YOLO ga aylantirdi", en: "Turned into YOLO" }, { label: 'D', uz: "BatchNorm qo'shdi", en: "Added BatchNorm" }], answer: 'A', explanation: { uz: "Bilineyar interpolyatsiya subpiksel aniqlikda maska chegaralarini tiklaydi.", en: "Exact bilinear sampling keeps pixel-level mask alignment sharp." } },
      { q: { uz: "|A|=90, |B|=100 va kesishma |A∩B|=80 bo'lsa, Dice koeffitsienti nechaga teng?", en: "If |A|=90, |B|=100, and |A∩B|=80, what is the Dice coefficient?" }, options: [{ label: 'A', uz: "0.727", en: "0.727" }, { label: 'B', uz: "0.842 (160/190)", en: "0.842 (160/190)" }, { label: 'C', uz: "0.900", en: "0.900" }, { label: 'D', uz: "0.500", en: "0.500" }], answer: 'B', explanation: { uz: "Dice = 2×80 / (90 + 100) = 160 / 190 ≈ 0.842 (IoU = 80/110 ≈ 0.727).", en: "Dice = 160/190 ≈ 0.842." } },
      { q: { uz: "Nima uchun tibbiy segmentatsiya tizimlari shifokor o'rnini bosuvchi emas, 'yordamchi tizim' sifatida quriladi?", en: "Why are medical segmentation models designed as clinical decision-support tools?" }, options: [{ label: 'A', uz: "Yuqori mas'uliyat darajasi sababli yakuniy tashxis mutaxassis tasdig'ini talab qiladi", en: "High clinical stakes require expert physician verification of outputs" }, { label: 'B', uz: "U-Net sekin", en: "U-Net is slow" }, { label: 'C', uz: "Dikom ocholmaydi", en: "Cannot read DICOM" }, { label: 'D', uz: "GPU yetishmaydi", en: "Lacks GPU" }], answer: 'A', explanation: { uz: "Noto'g'ri segmentatsiya davolash xatosiga olib kelishi mumkin, shuning uchun shifokor nazorati shart.", en: "Human-in-the-loop verification ensures clinical safety." } }
    ],
    matching: [
      { left: { uz: "U-Net", en: "U-Net" }, right: { uz: "Tibbiy tasvirlarda concatenate skip li simmetrik tarmoq", en: "Symmetric medical encoder-decoder with skips" } },
      { left: { uz: "Mask R-CNN", en: "Mask R-CNN" }, right: { uz: "Faster R-CNN + FCN maska boshi (instans)", en: "Faster R-CNN + parallel mask branch" } },
      { left: { uz: "RoI Align", en: "RoI Align" }, right: { uz: "Bilineyar interpolyatsiya bilan yaxlitlashsiz kesish", en: "Subpixel bilinear RoI feature sampling" } },
      { left: { uz: "nnU-Net", en: "nnU-Net" }, right: { uz: "Datasetga qarab gipermetrlarni avtomatik sozlovchi U-Net", en: "Self-configuring medical U-Net pipeline" } }
    ],
    fillGap: [
      { text: { uz: "Mask R-CNN modelida koordinata yaxlitlash xatosini yo'qotgan qatlam ___ deb ataladi.", en: "The layer in Mask R-CNN that eliminates RoI quantization error is ___." }, answer: ['RoI Align', 'RoIAlign'] },
      { text: { uz: "Mask R-CNN ni inson tana bo'g'imlarini topishga (pose estimation) moslash uchun har nuqtaga ___ xaritasi bashorat qilinadi.", en: "Extending Mask R-CNN to human pose estimation adds keypoint ___ prediction." }, answer: ['heatmap', 'issiqlik'] },
      { text: { uz: "Dice va IoU orasidagi aniq bog'liqlik: IoU = Dice / (2 − ___).", en: "The exact conversion between IoU and Dice is IoU = Dice / (2 − ___)." }, answer: ['Dice'] }
    ]
  },

  // ==================== M23 ====================
  {
    id: 23,
    code: 'M23',
    labId: null,
    hours: 2,
    keywords: ['Optical Flow', 'Lucas-Kanade', 'Horn-Schunck', 'RAFT', 'Object Tracking', 'Kalman Filter', 'DeepSORT', 'FaceNet', 'FAR', 'FRR'],
    title: {
      uz: "Video tahlili, Optik oqim, Obyekt kuzatuvi va Biometrika",
      en: "Video Analysis, Optical Flow, Object Tracking & Face Recognition"
    },
    description: {
      uz: "Optik oqim (yorqinlik doimiyligi, aperture muammosi, Lucas-Kanade vs Horn-Schunck vs RAFT), Tracking (SOT/MOT, Kalman filtri, Hungarian, DeepSORT, MOTA), FaceNet (Triplet Loss, FAR/FRR).",
      en: "Optical flow (brightness constancy, aperture problem, Lucas-Kanade, Horn-Schunck, RAFT), Tracking (Kalman, Hungarian, DeepSORT, MOTA), and Face Recognition (FaceNet Triplet Loss, FAR/FRR)."
    },
    refs: [
      { label: "MS CV Recipes: Tracking & Action Recognition", url: "https://github.com/microsoft/computervision-recipes" },
      { label: "Szeliski Ch. 9: Motion & Optical Flow", url: "https://szeliski.org/Book/" },
      { label: "Awesome CV: Tracking & Face Recognition", url: "https://github.com/jbhuang0604/awesome-computer-vision" }
    ],
    sections: [
      {
        heading: { uz: "23.1. Optik Oqim: Lucas-Kanade, Horn-Schunck va RAFT", en: "23.1. Optical Flow: Lucas-Kanade, Horn-Schunck & RAFT" },
        bodyHtml: {
          uz: "<p><strong>Optik oqim</strong> ketma-ket kadrlar orasida piksellarning ko'rinma harakat $(u, v)$ vektor maydonidir. Asosiy shart — <strong>yorqinlik doimiyligi</strong>: $I_x u + I_y v + I_t = 0$. Bitta tenglamada 2 noma'lum bo'lgani uchun <strong>aperture muammosi</strong> yuzaga keladi.</p><p><strong>Lucas-Kanade (siyrak):</strong> lokal oynadagi barcha piksellar bir xil $(u, v)$ ga ega deb eng kichik kvadratlar bilan yechadi. <strong>Horn-Schunck (zich):</strong> global silliqlik cheklovi qo'shadi. Zamonaviy chuqur tarmoqlar — <strong>FlowNet / RAFT</strong>.</p>",
          en: "<p><strong>Optical flow</strong> estimates 2D pixel motion $(u, v)$ under <strong>brightness constancy</strong>: $I_x u + I_y v + I_t = 0$. Two unknowns in one equation create the <strong>aperture problem</strong>. <strong>Lucas-Kanade</strong> solves locally over a patch (sparse); <strong>Horn-Schunck</strong> adds global smoothness (dense); deep models include <strong>RAFT</strong>.</p>"
        },
        latex: "I_x u + I_y v + I_t = 0",
        widget: 'optflow-sim'
      },
      {
        heading: { uz: "23.2. Obyekt Kuzatuvi (Kalman, DeepSORT) va Yuzni Tanish (FaceNet)", en: "23.2. Object Tracking (Kalman, DeepSORT) & Face Recognition" },
        bodyHtml: {
          uz: "<p><strong>MOT (Multiple Object Tracking)</strong> <em>tracking-by-detection</em> paradigmasida ishlaydi: YOLO aniqlaydi → <strong>Kalman filtri</strong> harakatni bashorat qiladi → <strong>Hungarian algoritmi</strong> IoU + CNN tashqi ko'rinish embeddingini (<strong>DeepSORT</strong>) bog'lab izchil ID beradi. Sifat <strong>MOTA</strong> va <strong>ID switch</strong> bilan o'lchanadi.</p><p><strong>Yuzni tanish (Face Recognition):</strong> Aniqlash → Tekislash → Embedding (<strong>FaceNet</strong> + <strong>Triplet Loss</strong>). Biometrik xavfsizlikda <strong>FAR</strong> (begonani kiritish) va <strong>FRR</strong> (egani rad etish) murosasi hamda maxfiylik etikasi hal qiluvchi ahamiyatga ega.</p>",
          en: "<p><strong>MOT</strong> follows <em>tracking-by-detection</em>: detector + <strong>Kalman Filter</strong> motion prediction + <strong>Hungarian</strong> assignment using IoU & appearance embeddings (<strong>DeepSORT</strong>), evaluated via <strong>MOTA</strong> & <strong>ID switches</strong>.</p><p><strong>Face Recognition:</strong> Detect → Align → Embed (<strong>FaceNet</strong> with <strong>Triplet Loss</strong>). Security balances <strong>FAR</strong> vs <strong>FRR</strong> alongside privacy ethics.</p>"
        }
      }
    ],
    slides: [
      { title: { uz: "M23: Video Tahlili, Tracking va Yuzni Tanish", en: "M23: Video Analysis, Tracking & Face Recognition" }, subtitle: { uz: "KOK1506 · Szeliski Ch. 9 · CV Recipes", en: "KOK1506 · Szeliski Ch. 9 · CV Recipes" }, points: { uz: ["Optik oqim: Ix·u + Iy·v + It = 0 va Aperture muammosi", "Lucas-Kanade (lokal, siyrak) vs Horn-Schunck (silliq, zich) vs RAFT", "Tracking-by-detection: YOLO + Kalman Filter + Hungarian + DeepSORT", "FaceNet (Triplet Loss embeddings) va biometrik FAR / FRR murosasi"], en: ["Optical Flow: Ix·u + Iy·v + It = 0 & Aperture Problem", "Lucas-Kanade (sparse) vs Horn-Schunck (dense) vs RAFT", "Tracking-by-detection: YOLO + Kalman + Hungarian + DeepSORT", "FaceNet (Triplet Loss) & Biometric FAR vs FRR"] } },
      { title: { uz: "Sonli Misol: Lucas-Kanade Optik Oqim", en: "Worked Example: Lucas-Kanade Solver" }, widget: 'optflow-sim' }
    ],
    glossary: [
      { uz: "optik oqim", en: "optical flow", defUz: "Ketma-ket kadrlar orasida piksellar ko'rinma harakat vektori maydoni", defEn: "Apparent 2D pixel velocity vector field between video frames" },
      { uz: "Kalman filtri", en: "Kalman filter", defUz: "Shovqinli kuzatuvlardan obyekt holati va tezligini optimal baholash", defEn: "Recursive state estimator tracking noisy object motion" },
      { uz: "Triplet Loss", en: "Triplet Loss", defUz: "Anchor, Positive va Negative vektorlar masofasini o'rgatuvchi loss", defEn: "Metric loss pulling same-person embeddings closer than negatives" }
    ],
    quiz: [
      { q: { uz: "Optik oqim tenglamasida (Ix·u + Iy·v + It = 0) bitta pikselda 2 noma'lum bo'lishi qanday muammo deyiladi?", en: "What is the ambiguity of solving 2 unknowns (u, v) from 1 optical flow equation per pixel?" }, options: [{ label: 'A', uz: "Aperture muammosi", en: "Aperture problem" }, { label: 'B', uz: "Gimbal lock", en: "Gimbal lock" }, { label: 'C', uz: "Degradatsiya", en: "Degradation" }, { label: 'D', uz: "Posterizatsiya", en: "Posterization" }], answer: 'A', explanation: { uz: "Lucas-Kanade mahalliy oyna ichidagi qo'shni piksellar bilan tizimni to'liq aniqlaydi.", en: "Lucas-Kanade resolves the aperture problem assuming constant flow across a local patch." } },
      { q: { uz: "DeepSORT algoritmi kadrlararo obyekt ID larini saqlashda Kalman filtriga qo'shimcha ravishda nimadan foydalanadi?", en: "Besides Kalman motion prediction, what does DeepSORT add to preserve object IDs?" }, options: [{ label: 'A', uz: "Chuqur CNN orqali olingan vizual ko'rinish (appearance) embeddingi", en: "Deep CNN visual appearance embeddings" }, { label: 'B', uz: "Faqat HSV rang", en: "HSV only" }, { label: 'C', uz: "JPEG sifat", en: "JPEG quality" }, { label: 'D', uz: "Hough doiralar", en: "Hough circles" }], answer: 'A', explanation: { uz: "Vizual embedding obyektlar vaqtincha to'silgandan keyin ham ID ni tiklashga yordam beradi.", en: "Appearance descriptors re-identify tracks after temporary occlusions." } },
      { q: { uz: "FaceNet modelida bir xil shaxs vektorlarini yaqinlashtirish va boshqalarni uzoqlashtirish uchun qaysi loss qo'llaniladi?", en: "Which loss trains FaceNet to cluster embeddings of the same identity?" }, options: [{ label: 'A', uz: "Triplet Loss", en: "Triplet Loss" }, { label: 'B', uz: "Dice Loss", en: "Dice Loss" }, { label: 'C', uz: "Focal Loss", en: "Focal Loss" }, { label: 'D', uz: "MSE", en: "MSE" }], answer: 'A', explanation: { uz: "Triplet Loss (Anchor, Positive, Negative) yuzlarning metrik fazosini shakllantiradi.", en: "Triplet Loss separates positive pairs from negative pairs by a margin." } },
      { q: { uz: "Bank yoki chegara nazorati biometrikasida begona shaxsni noto'g'ri tanib olish (FAR) qanday bo'lishi kerak?", en: "In high-security bank/border biometrics, how should False Acceptance Rate (FAR) be tuned?" }, options: [{ label: 'A', uz: "Minimal (imkon qadar nolga yaqin) saqlanishi kerak", en: "Minimized as close to zero as possible" }, { label: 'B', uz: "Maksimal 100%", en: "Maximized" }, { label: 'C', uz: "Ahamiyatsiz", en: "Irrelevant" }, { label: 'D', uz: "FRR dan katta", en: "Higher than FRR" }], answer: 'A', explanation: { uz: "Xavfsizlik tizimlarida begona odamni ruxsat etib yuborish (FAR) eng xavfli xatodir.", en: "Preventing unauthorized access requires minimizing FAR." } }
    ],
    matching: [
      { left: { uz: "Lucas-Kanade", en: "Lucas-Kanade" }, right: { uz: "Lokal oyna taxminiga asoslangan siyrak optik oqim", en: "Local patch least-squares sparse optical flow" } },
      { left: { uz: "Horn-Schunck", en: "Horn-Schunck" }, right: { uz: "Global silliqlik bilan zich optik oqim", en: "Global smoothness dense optical flow" } },
      { left: { uz: "Hungarian Algoritmi", en: "Hungarian Algorithm" }, right: { uz: "Kadrlararo deteksiyalarni optimal ID ga bog'lash", en: "Optimal bipartite assignment for MOT" } },
      { left: { uz: "FAR / FRR", en: "FAR / FRR" }, right: { uz: "Biometrikada yolg'on qabul / yolg'on rad darajalari", en: "False Acceptance vs False Rejection rates" } }
    ],
    fillGap: [
      { text: { uz: "Optik oqim tenglamasi ___ doimiyligi taxminiga tayanadi.", en: "Optical flow relies on the ___ constancy assumption." }, answer: ['yorqinlik', 'brightness'] },
      { text: { uz: "Video kuzatuvda obyekt identifikatorining noto'g'ri almashib ketishi ___ switch deyiladi.", en: "An identity swap between tracked trajectories is an ___ switch." }, answer: ['ID'] },
      { text: { uz: "Yuzni tanishda FaceNet har bir yuzni metrik fazodagi zich ___ vektoriga aylantiradi.", en: "FaceNet maps each aligned face into a compact metric ___ vector." }, answer: ['embedding'] }
    ]
  },

  // ==================== B1 (BONUS) ====================
  {
    id: 24,
    code: 'B1',
    labId: null,
    isBonus: true,
    hours: 2,
    keywords: ['Attention', 'CAM', 'Vision Transformer', 'ViT', 'CLIP', 'Multimodal', 'Diffusion', 'GAN', 'COMP4423'],
    title: {
      uz: "Bonus: Attention, Vision Transformer (ViT), CLIP va Generativ CV",
      en: "Bonus: Attention, Vision Transformers (ViT), CLIP & Generative CV"
    },
    description: {
      uz: "COMP4423 L9/L11/L12 va Awesome CV asosida: CAM/Grad-CAM izohlanuvchanligi, Self-Attention & ViT (patch tokenlar), CLIP ko'p modalli tizimlar va GAN/Diffuziya modellari.",
      en: "From COMP4423 L9/L11/L12 & Awesome CV: CAM/Grad-CAM interpretability, Self-Attention & ViT patches, CLIP vision-language models, and GAN/Diffusion synthesis."
    },
    refs: [
      { label: "COMP4423 L9: CAM, Attention & ViT", url: "https://github.com/lookwei/COMP4423" },
      { label: "COMP4423 L11–L12: Generative & Large Vision Models", url: "https://github.com/lookwei/COMP4423" },
      { label: "Awesome Visual Transformers & NeRF", url: "https://github.com/jbhuang0604/awesome-computer-vision" }
    ],
    sections: [
      {
        heading: { uz: "B1.1. Grad-CAM va Vision Transformer (ViT)", en: "B1.1. Grad-CAM Interpretability & Vision Transformers (ViT)" },
        bodyHtml: {
          uz: "<p><strong>Grad-CAM (Class Activation Mapping):</strong> CNN ning qaroriga tasvirning qaysi hududlari ta'sir qilganini issiqlik xaritasi (heatmap) ko'rinishida tushuntiradi. <strong>Vision Transformer (ViT, Dosovitskiy et al., 2020)</strong> esa konvolyutsiya o'rniga tasvirni $16\\times 16$ pikselli <strong>patch bo'laklarga</strong> ajratib, pozitsion kodlash va <strong>Self-Attention</strong> orqali global kontekstni modellashtiradi.</p>",
          en: "<p><strong>Grad-CAM</strong> visualizes CNN attention heatmaps for explainability. <strong>Vision Transformers (ViT)</strong> split images into fixed $16\\times 16$ <strong>patches</strong>, add positional embeddings, and apply global <strong>Self-Attention</strong> without convolutions.</p>"
        },
        latex: "\\text{Attention}(Q, K, V) = \\text{softmax}\\!\\left(\\frac{QK^\\top}{\\sqrt{d_k}}\\right) V",
        widget: 'vit-patch'
      },
      {
        heading: { uz: "B1.2. Multimodal (CLIP) va Generativ Modellar (GAN, Diffusion, NeRF)", en: "B1.2. Vision-Language (CLIP) & Generative CV (GAN, Diffusion, NeRF)" },
        bodyHtml: {
          uz: "<p><strong>CLIP (Contrastive Language-Image Pretraining):</strong> 400M tasvir-matn juftligida o'qitilib <em>zero-shot</em> tasniflash imkonini beradi. <strong>Generativ CV:</strong> <em>GAN</em> (Generator vs Discriminator raqobati), <em>Diffuziya modellari</em> (shovqindan bosqichma-bosqich U-Net/DiT denoising orqali fotorealistik sintez) va <em>NeRF / 3D Gaussian Splatting</em> (2D rasmlardan 3D sahna renderi).</p>",
          en: "<p><strong>CLIP</strong> aligns image and text embeddings contrastively for <em>zero-shot</em> recognition. <strong>Generative CV</strong> spans <em>GANs</em> (adversarial synthesis), <em>Diffusion Models</em> (iterative denoising), and <em>NeRF / 3D Gaussian Splatting</em> for novel-view synthesis.</p>"
        }
      }
    ],
    slides: [
      { title: { uz: "B1: ViT, Multimodal CLIP va Generativ CV", en: "B1: ViT, CLIP & Generative Vision" }, subtitle: { uz: "COMP4423 L9, L11, L12 · Awesome CV", en: "COMP4423 L9, L11, L12 · Awesome CV" }, points: { uz: ["Grad-CAM: CNN qarorlarini vizual tushuntirish", "Vision Transformer (ViT): 16×16 patchlar + Self-Attention", "CLIP & VLM: tasvir va matnni yagona fazoga joylashtirish (Zero-Shot)", "GAN, Diffuziya modellari va NeRF 3D rekonstruksiya"], en: ["Grad-CAM: explainable CNN heatmaps", "Vision Transformer (ViT): 16×16 patches + Self-Attention", "CLIP & VLMs: zero-shot vision-language alignment", "GANs, Diffusion Models & NeRF 3D rendering"] } },
      { title: { uz: "Interaktiv ViT Patch Tokenizer", en: "Interactive ViT Patch Tokenizer" }, widget: 'vit-patch' }
    ],
    glossary: [
      { uz: "Vision Transformer (ViT)", en: "Vision Transformer", defUz: "Tasvir patch bo'laklarini Self-Attention bilan qayta ishlovchi transformer", defEn: "Transformer processing image patches via self-attention" },
      { uz: "CLIP", en: "CLIP", defUz: "Tasvir va matnni kontrastiv o'qituvchi zero-shot ko'p modalli model", defEn: "Contrastive Language-Image Pretraining for zero-shot vision" },
      { uz: "diffuziya modeli", en: "diffusion model", defUz: "Tasodifiy shovqindan bosqichma-bosqich tasvir sintezlovchi model", defEn: "Generative model iteratively denoising random Gaussian noise" }
    ],
    quiz: [
      { q: { uz: "Vision Transformer (ViT) modelida 224×224 kirish tasviri 16×16 o'lchamli patchlarga bo'linsa nechta patch hosil bo'ladi?", en: "Splitting a 224×224 image into 16×16 patches in ViT produces how many patches?" }, options: [{ label: 'A', uz: "64", en: "64" }, { label: 'B', uz: "196 (14×14)", en: "196 (14×14)" }, { label: 'C', uz: "256", en: "256" }, { label: 'D', uz: "1024", en: "1024" }], answer: 'B', explanation: { uz: "(224/16)² = 14² = 196 ta patch (+1 [CLS] token = 197).", en: "(224/16)² = 14×14 = 196 patches." } },
      { q: { uz: "CNN ning tasniflash qaroriga tasvirning qaysi piksellari eng ko'p ta'sir qilganini ko'rsatuvchi usul qaysi?", en: "Which method visualizes spatial regions driving a CNN's classification decision?" }, options: [{ label: 'A', uz: "Grad-CAM", en: "Grad-CAM" }, { label: 'B', uz: "Median Blur", en: "Median Blur" }, { label: 'C', uz: "HoughLines", en: "HoughLines" }, { label: 'D', uz: "k-NN", en: "k-NN" }], answer: 'A', explanation: { uz: "Grad-CAM oxirgi konvolyutsiya qatlami gradientlaridan issiqlik xaritasi quradi.", en: "Grad-CAM weights final conv feature maps by class gradients." } },
      { q: { uz: "CLIP modeli oldindan ko'rilmagan yangi sinflarni qanday qilib o'qitishsiz taniy oladi (Zero-Shot)?", en: "How does CLIP perform zero-shot classification on unseen classes?" }, options: [{ label: 'A', uz: "Tasvir va matn tavsiflarini umumiy embedding fazosida kosinus o'xshashligi bilan solishtirib", en: "By matching image and text prompt embeddings in a shared contrastive space" }, { label: 'B', uz: "Haar kaskad bilan", en: "Haar cascades" }, { label: 'C', uz: "SIFT bilan", en: "SIFT" }, { label: 'D', uz: "Median filtr bilan", en: "Median filter" }], answer: 'A', explanation: { uz: "Kontrastiv o'qitish rasm va matn embeddinglarini moslashtiradi.", en: "Contrastive pretraining aligns image and text vectors." } }
    ],
    matching: [
      { left: { uz: "ViT", en: "ViT" }, right: { uz: "16×16 patchlar va Self-Attention", en: "Image patches + Self-Attention" } },
      { left: { uz: "Grad-CAM", en: "Grad-CAM" }, right: { uz: "CNN qarorini izohlovchi issiqlik xaritasi", en: "Visual heatmap explaining CNN predictions" } },
      { left: { uz: "CLIP", en: "CLIP" }, right: { uz: "Matn-tasvir kontrastiv zero-shot model", en: "Contrastive text-image zero-shot model" } },
      { left: { uz: "Diffusion", en: "Diffusion" }, right: { uz: "Shovqindan bosqichma-bosqich tasvir yaratish", en: "Iterative denoising image synthesis" } }
    ],
    fillGap: [
      { text: { uz: "ViT da konvolyutsiya o'rniga tasvir ___ bo'laklarga bo'linadi.", en: "ViT splits images into square ___ before linear projection." }, answer: ['patch', 'patches'] },
      { text: { uz: "GAN arxitekturasi Generator va ___ tarmoqlarining raqobatiga asoslanadi.", en: "GANs pit a Generator network against a ___ network." }, answer: ['Discriminator', 'diskriminator'] },
      { text: { uz: "Matn va tasvirni birgalikda tushunuvchi kontrastiv model ___ deyiladi.", en: "OpenAI's contrastive vision-language zero-shot model is ___." }, answer: ['CLIP'] }
    ]
  }
);
