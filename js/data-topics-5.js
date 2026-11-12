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
        heading: { uz: "21.1. Semantik vs Instans vs Panoptik Segmentatsiya", en: "21.1. Semantic, Instance & Panoptic Segmentation" },
        bodyHtml: {
          uz: "<p>• <strong>Semantik segmentatsiya:</strong> Tasvirning <em>har bir pikseliga</em> sinf yorlig'i beriladi ($H\\times W \\to H\\times W$ sinf xaritasi). Ikki ta mashina yonma-yon tursa ikkalasi ham bir xil 'mashina' rangiga bo'yaladi.<br>• <strong>Instans segmentatsiya:</strong> Bitta sinfning har bir alohida obyektiga noyob maska beradi (1-mashina, 2-mashina).<br>• <strong>Panoptik segmentatsiya (Kirillov, 2019):</strong> Sanaladigan obyektlar (<em>things</em>: odam, avto) uchun instans maska + sanalmaydigan fonlar (<em>stuff</em>: yo'l, osmon) uchun semantik maskani yagona chiqishga birlashtiradi!</p>",
          en: "<p>• <strong>Semantic:</strong> Pixel-level class labeling without instance IDs.<br>• <strong>Instance:</strong> Separate binary mask for each object instance.<br>• <strong>Panoptic:</strong> Unifies amorphous background <em>stuff</em> (road, sky) with countable object <em>things</em> (cars, people).</p>"
        }
      },
      {
        heading: { uz: "21.2. FCN (Encoder–Decoder), DeepLab ASPP & Klassik GrabCut", en: "21.2. FCN Architecture, DeepLab ASPP & Interactive GrabCut" },
        bodyHtml: {
          uz: "<p><strong>FCN (Long et al., 2015):</strong> Klassifikatsiya CNN idagi oxirgi FC qatlamlarni <strong>1×1 konvolyutsiya</strong> ga almashtirib istalgan o'lchamli rasm qabul qiladi. Past o'lchamli xaritani asl o'lchamga ko'tarish uchun <em>Transposed Convolution (Deconvolution)</em> yoki Bilineyar Upsample + Skip-sum qo'llaniladi.<br><strong>DeepLab (Google):</strong> Obyektni kichraytirib kontekstni yo'qotmaslik uchun <strong>Dilated Conv + ASPP</strong> (bir necha kenglikdagi atrous filtrlar) va chegara aniqlovchi CRF dan foydalanadi.<br><strong>GrabCut (Rother et al., 2004):</strong> Foydalanuvchi chizgan to'rtburchak asosida fon/obyekt uchun <strong>5–8 komponentli GMM</strong> + <strong>Min-Cut/Max-Flow</strong> graf kesish bilan fonni ajratadi.</p>",
          en: "<p><strong>FCN (2015)</strong> swapped dense FC layers for <strong>1×1 convs</strong> + transposed-conv upsampling + skip fusion. <strong>DeepLab</strong> employs parallel dilated convolutions (<strong>ASPP</strong>) to capture multi-scale context without spatial collapse. Classical <strong>GrabCut</strong> iterates <strong>GMM</strong> color modeling + <strong>Graph Cut</strong> optimization.</p>"
        }
      },
      {
        heading: { uz: "21.3. Piksel Nomutanosibligi: Dice Loss, Focal Loss & mIoU", en: "21.3. Pixel Imbalance: Dice Loss, mIoU & Frequency Weighting" },
        bodyHtml: {
          uz: "<p>Ko'cha tasvirida piksellarning 45% i yo'l/bino, atigi 0.4% i esa yo'l belgisi bo'ladi! Oddiy <em>Pixel Accuracy</em> 95% chiqib, kichik belgini umuman topmasligi mumkin! Shuning uchun:<br>1) Har bir sinfga teng og'irlik beruvchi <strong>mIoU (mean IoU)</strong> metrikasi asosiy mezon sanaladi.<br>2) O'qitishda <strong>Weighted Cross-Entropy + Dice Loss</strong> juftligi kichik obyekt chegaralarini juda yaxshi tiklaydi.</p>",
          en: "<p>Because background regions dominate small classes, raw pixel accuracy misleads! Evaluate with class-balanced <strong>mIoU</strong> and train with combined <strong>Cross-Entropy + Dice Loss</strong>.</p>"
        },
        latex: "\\text{mIoU} = \\frac{1}{C}\\sum_{c=1}^{C}\\frac{\\text{TP}_c}{\\text{TP}_c + \\text{FP}_c + \\text{FN}_c}, \\qquad \\mathcal{L}_{\\text{Dice}} = 1 - \\frac{2\\sum p_i g_i}{\\sum p_i + \\sum g_i}",
        widget: 'seg-dice'
      },
      {
        heading: { uz: "21.4. Sonli Misol (Doskada): 2-Sinfli mIoU & OpenCV GrabCut Kodi", en: "21.4. Worked Example: 2-Class mIoU & OpenCV GrabCut" },
        bodyHtml: {
          uz: "<p><strong>Masala (2 sinf: Obyekt va Fon):</strong><br>• <strong>Obyekt sinfi:</strong> Kesishma ($TP_{\\text{obj}}) = 80$ px, Birlashma ($TP+FP+FN$) $= 100$ px $\\implies \\text{IoU}_{\\text{obj}} = 80 / 100 = \\mathbf{0.800}$.<br>• <strong>Fon sinfi:</strong> Kesishma $= 850$ px, Birlashma $= 900$ px $\\implies \\text{IoU}_{\\text{bg}} = 850 / 900 = \\mathbf{0.944}$.<br>• $\\text{mIoU} = \\frac{0.800 + 0.944}{2} = \\mathbf{0.872\\ (87.2\\%)}$! (<em>E'tibor:</em> Agar oddiy Pixel Accuracy hisoblansa $(80+850)/1000 = 93\\%$ chiqardi va obyekt xatosini yashirardi!).</p>",
          en: "<p><strong>Worked 2-Class Example:</strong> Object IoU $= 80/100 = \\mathbf{0.800}$; Background IoU $= 850/900 = \\mathbf{0.944} \\implies \\text{mIoU} = (0.800+0.944)/2 = \\mathbf{0.872}$ (compared to inflated 93% Pixel Accuracy!).</p>"
        },
        code: `import cv2, numpy as np

# OpenCV GrabCut interaktiv fon ajratish namunasi
img = np.zeros((200, 240, 3), np.uint8)
cv2.circle(img, (120, 100), 45, (40, 180, 220), -1)
mask = np.zeros(img.shape[:2], np.uint8)
bgModel = np.zeros((1, 65), np.float64)
fgModel = np.zeros((1, 65), np.float64)

rect = (60, 40, 120, 120)  # (x, y, w, h) obyektni o'ragan ramka
cv2.grabCut(img, mask, rect, bgModel, fgModel, iterCount=5, mode=cv2.GC_INIT_WITH_RECT)
fg_mask = np.where((mask == 2) | (mask == 0), 0, 1).astype(np.uint8)
print("Foreground pixels segmented:", int(fg_mask.sum()))`
      },
      {
        heading: { uz: "21.5. Keys-Muhokama: Maskani Birga Augmentatsiya Qilish Qoidasi", en: "21.5. Discussion: Synchronized Image + Mask Augmentation" },
        bodyHtml: {
          uz: "<p>Segmentatsiya datasetini augmentatsiya qilganda <strong>eng ko'p uchraydigan xato</strong>: rasmga tasodifiy gorizontal flip yoki burish berib, maskani o'zgartirmaslik — yoki maskaga <code>INTER_LINEAR</code> qo'llab sinf ID larni (1 va 2 o'rtasida 1.5!) buzib yuborish!</p>",
          en: "<p>Never augment the image without the identical spatial transform on its mask, and ALWAYS resize masks with <code>INTER_NEAREST</code> (bilinear interpolation invents bogus fractional class IDs!).</p>"
        },
        discussion: {
          q: { uz: "Segmentatsiya maskasini 512×512 dan 256×256 ga kichraytirganda cv2.INTER_LINEAR ishlatish nima uchun xato? Qaysi interpolyatsiya shart?", en: "Why must you NEVER use bilinear (cv2.INTER_LINEAR) resizing on ground-truth segmentation masks?" },
          a: { uz: "Maskada piksellar sinf raqami (0=fon, 1=yo'l, 2=avto) dir. INTER_LINEAR 0 bilan 2 chegarasida o'rtacha 1 ('yo'l'!) hosil qilib yolg'on halqa yaratadi! Maskalar uchun faqat cv2.INTER_NEAREST ishlatiladi.", en: "Bilinear interpolation averages integer class IDs (e.g., blending background=0 and car=2 into bogus road=1 halos!). Always use cv2.INTER_NEAREST for discrete label masks." }
        }
      }
    ],
    slides: [
      { title: { uz: "21.1. Segmentatsiyaning 3 Turi: Semantik, Instans, Panoptik", en: "21.1. Semantic vs Instance vs Panoptic Segmentation" }, table: { headers: { uz: ["Turi", "Nimani ajratadi?", "Misol model"], en: ["Task", "What It Separates", "Example Model"] }, rows: { uz: [["Semantik", "Har piksel sinfi (nusxalar birlashadi)", "FCN, DeepLabv3+, SegFormer"], ["Instans", "Har bir alohida obyekt (ID 1, 2, 3)", "Mask R-CNN, YOLOv8-seg"], ["Panoptik", "Things (instans) + Stuff (semantik fon)", "Mask2Former, Panoptic FPN"]], en: [["Semantic", "Per-pixel class (merges instances)", "FCN, DeepLabv3+, SegFormer"], ["Instance", "Separate pixel mask per object", "Mask R-CNN, YOLOv8-seg"], ["Panoptic", "Unified countable Things + Stuff", "Mask2Former, Panoptic FPN"]] } } },
      { title: { uz: "FCN (Fully Convolutional Network) & Upsampling", en: "FCN (2015): 1×1 Convs & Transposed Conv Decoder" }, points: { uz: ["Oxirgi FC qatlamlarni 1×1 konvolyutsiyaga almashtirish → ixtiyoriy H×W kirish!", "Encoder (kichraytiradi, kontekst) → Decoder (kattalashtiradi, lokalizatsiya)", "Transposed Conv (yoki Bilinear Upsample + Conv) + Skip addition", "Checkerboard artefaktlari: Bilinear Resize + 3×3 Conv toza natija beradi!"], en: ["1×1 convs convert classifiers to dense pixel maps", "Encoder-Decoder + Skip fusions; Bilinear Upsample + Conv avoids checkerboard artifacts"] } },
      { title: { uz: "DeepLab (ASPP) & Klassik GrabCut", en: "DeepLab ASPP & Classical GrabCut" }, points: { uz: ["DeepLab ASPP: turli dilatatsiya darajali (r=6, 12, 18) parallel filtrlar", "Kichik va katta obyektlar kontekstini o'lchamni yo'qotmasdan tutadi", "GrabCut: Foydalanuvchi ramkasi → 5–8 komponentli GMM + Graph Cut (Min-Cut)"], en: ["DeepLab ASPP stacks dilated rates (6,12,18) for multi-scale context", "GrabCut models foreground/background colors via GMMs + Graph Cut"] } },
      { title: { uz: "Sinf Nomutanosibligi: Pixel Acc Tuzog'i vs mIoU / Dice", en: "Pixel Accuracy Trap vs mIoU & Dice Loss" }, latex: "\\text{mIoU} = \\frac{1}{C}\\sum_{c=1}^{C} \\frac{\\text{TP}_c}{\\text{TP}_c + \\text{FP}_c + \\text{FN}_c}", points: { uz: ["90% yo'l/fon bo'lsa, kichik piyodani butunlay o'tkazib ham 90% Pixel Acc olinadi!", "mIoU har bir sinfga teng ovoz beradi (kichik sinf ham 50% ta'sir qiladi)", "Dice Loss: 1 - 2|P∩G| / (|P|+|G|) → kichik obyektlarni yaxshi o'qitadi"], en: ["90% background inflates Pixel Accuracy; mIoU weights every class equally", "Dice Loss directly optimizes mask overlap"] } },
      { title: { uz: "Interaktiv Dice vs IoU Kalkulyatori", en: "Interactive Dice vs IoU Calculator" }, widget: 'seg-dice' },
      { title: { uz: "Sonli Misol (Doskada): 2-Sinfli mIoU Hisoblash", en: "Worked Example: 2-Class mIoU Calculation" }, points: { uz: ["Obyekt: Kesishma=80, Birlashma=100 → IoU_obj = 80/100 = 0.800", "Fon: Kesishma=850, Birlashma=900 → IoU_bg = 850/900 = 0.944", "mIoU = (0.800 + 0.944) / 2 = 0.872 (87.2%)", "Eslatma: Pixel Accuracy esa (80+850)/1000 = 93.0% bo'lib yolg'on yuqori chiqar edi!"], en: ["IoU_obj = 80/100 = 0.800; IoU_bg = 850/900 = 0.944", "mIoU = (0.800+0.944)/2 = 0.872 (vs inflated 93% Pixel Acc!)"] } },
      { title: { uz: "Python Kod: OpenCV GrabCut & Mask Resize Qoidasi", en: "Python Walkthrough: GrabCut & Nearest-Neighbor Masks" }, code: `cv2.grabCut(img, mask, rect=(60,40,120,120),
            bgdModel=bg, fgdModel=fg, iterCount=5, mode=cv2.GC_INIT_WITH_RECT)
# Maskani o'zgartirganda FAQAT INTER_NEAREST ishlating:
mask_small = cv2.resize(mask, (256, 256), interpolation=cv2.INTER_NEAREST)` },
      { title: { uz: "Muhokama: Maskani Kichraytirganda INTER_LINEAR Xatosi", en: "Discussion: Why Bilinear Mask Resizing Creates Ghost Labels" }, discussion: { q: { uz: "0=fon, 1=yo'l, 2=mashina bo'lgan segmentatsiya maskasini cv2.INTER_LINEAR bilan kichraytirsak nima ro'y beradi?", en: "What bug appears when resizing a label mask (0=bg, 1=road, 2=car) with cv2.INTER_LINEAR?" }, a: { uz: "0 (fon) va 2 (mashina) chegara chizig'ida o'rtacha qiymat = 1 ('yo'l'!) paydo bo'lib, mashina atrofida soxta halqa hosil bo'ladi! Faqat INTER_NEAREST shart.", en: "Interpolating between background(0) and car(2) produces bogus road(1) halos around every car! Always use INTER_NEAREST." } } }
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
        heading: { uz: "22.1. U-Net Arxitekturasi: Simmetrik Encoder–Decoder & Concatenate", en: "22.1. U-Net: Symmetric Encoder–Decoder & Concatenated Skips" },
        bodyHtml: {
          uz: "<p><strong>U-Net (Ronneberger et al., 2015)</strong> dastlab biomeditsina hujayralarini ajratish uchun ishlab chiqilgan bo'lib, 'U' harfi shaklida simmetrik <strong>Qisuvchi (Encoder)</strong> va <strong>Kengaytiruvchi (Decoder)</strong> yo'llardan tuzilgan.</p><p><strong>Asosiy yangilik:</strong> ResNet skip-connection da xaritalarni <em>qo'shsa</em>, U-Net encoder dagi yuqori aniqlikdagi xaritalarni decoder ga kanallar bo'ylab <strong>to'g'ridan-to'g'ri ulaydi (concatenate)</strong>! Bu nozik tomirlar va o'sma chegaralarini yo'qotmaslik imkonini beradi. <strong>Elastik deformatsiya</strong> augmentatsiyasi bilan atigi 30–50 rasm bilan ham yuqori natija beradi! Zamonaviy vorislari: <em>Attention U-Net</em>, <em>3D U-Net</em>, <em>Swin-UNet</em> va <strong>nnU-Net</strong>.</p>",
          en: "<p><strong>U-Net (2015)</strong> features a symmetric contracting Encoder and expanding Decoder. Unlike ResNet addition, U-Net <strong>concatenates</strong> encoder maps directly to decoder levels, preserving razor-sharp boundaries even when trained on just 30–50 augmented medical scans. Modern successors include <em>3D U-Net</em>, <em>Attention U-Net</em>, and self-configuring <strong>nnU-Net</strong>.</p>"
        }
      },
      {
        heading: { uz: "22.2. Mask R-CNN: RoIAlign & 3-Boshli Multi-Task Loss", en: "22.2. Mask R-CNN: RoIAlign & Decoupled Parallel Mask Head" },
        bodyHtml: {
          uz: "<p><strong>Mask R-CNN (Kaiming He, 2017)</strong> Faster R-CNN ga uchinchi parallel <strong>FCN maska boshini</strong> qo'shadi: har bir RoI uchun bir vaqtda (1) sinf, (2) bounding box va (3) har bir sinf uchun alohida $28\\times 28$ binar maska bashorat qilinadi ($L = L_{\\text{cls}} + L_{\\text{box}} + L_{\\text{mask}}$).</p><p><strong>RoIAlign vs RoI Pooling:</strong> RoI Pooling kasr koordinatalarni <code>int()</code> bilan kesib (quantization) maska chegarasini 1–2 piksel siljitib yuborar edi! <strong>RoIAlign</strong> yaxlitlashsiz <strong>bilineyar interpolyatsiya</strong> bilan aniq namuna oladi → subpiksel aniqlik! Bundan tashqari, Mask R-CNN boshini almashtirib <strong>tana bo'g'imlari (Keypoint Pose Estimation)</strong> ham bajariladi.</p>",
          en: "<p><strong>Mask R-CNN (2017)</strong> extends Faster R-CNN with a parallel <strong>FCN mask head</strong> ($L = L_{\\text{cls}} + L_{\\text{box}} + L_{\\text{mask}}$), decoupling class competition from per-class binary masks.</p><p><strong>RoIAlign</strong> eliminates integer coordinate quantization in RoI Pooling via exact <strong>bilinear interpolation</strong>, boosting mask boundary AP sharply and generalizing cleanly to keypoint pose estimation.</p>"
        },
        latex: "\\text{Dice} = \\frac{2|A \\cap B|}{|A| + |B|}, \\qquad \\text{IoU} = \\frac{\\text{Dice}}{2 - \\text{Dice}}"
      },
      {
        heading: { uz: "22.3. Sonli Misol (Doskada): Dice Koeffitsienti vs IoU", en: "22.3. Worked Example: Comparing Dice vs IoU on the Same Mask" },
        bodyHtml: {
          uz: "<p><strong>Berilgan:</strong> Bashorat qilingan o'sma maskasi $|A| = 90$ px, haqiqiy shifokor maskasi $|B| = 100$ px, kesishmasi $|A \\cap B| = 80$ px.<br>1. <strong>Dice koeffitsienti:</strong> $\\text{Dice} = \\frac{2 \\times 80}{90 + 100} = \\frac{160}{190} \\approx \\mathbf{0.842\\ (84.2\\%)}$.<br>2. <strong>IoU (Jaccard):</strong> Birlashma $|A \\cup B| = 90 + 100 - 80 = 110 \\implies \\text{IoU} = \\frac{80}{110} \\approx \\mathbf{0.727\\ (72.7\\%)}$.<br>3. Formuladan tekshiruv: $\\frac{0.842}{2 - 0.842} = \\frac{0.842}{1.158} = \\mathbf{0.727}$! E'tibor bering: Dice doimo IoU dan kattaroq chiqadi!</p>",
          en: "<p><strong>Given $|A|=90, |B|=100, |A\\cap B|=80$:</strong><br>• $\\text{Dice} = \\frac{2\\cdot 80}{90+100} = \\frac{160}{190} \\approx \\mathbf{0.842}$.<br>• $\\text{IoU} = \\frac{80}{90+100-80} = \\frac{80}{110} \\approx \\mathbf{0.727}$. Note Dice is always strictly $\\ge$ IoU!</p>"
        },
        code: `import torch, torch.nn as nn

# Mini U-Net DoubleConv & Skip Concatenate bloki (PyTorch)
class DoubleConv(nn.Module):
    def __init__(self, c_in, c_out):
        super().__init__()
        self.net = nn.Sequential(
            nn.Conv2d(c_in, c_out, 3, padding=1), nn.BatchNorm2d(c_out), nn.ReLU(inplace=True),
            nn.Conv2d(c_out, c_out, 3, padding=1), nn.BatchNorm2d(c_out), nn.ReLU(inplace=True)
        )
    def forward(self, x): return self.net(x)

enc_feat = torch.randn(1, 64, 128, 128)  # Encoder xaritasi
dec_up   = torch.randn(1, 64, 128, 128)  # Upsample qilingan Decoder
fused    = torch.cat([dec_up, enc_feat], dim=1)  # Skip Concatenate -> 128 kanal!
out = DoubleConv(128, 64)(fused)
print("Fused shape:", tuple(fused.shape), "-> Refined:", tuple(out.shape))`
      },
      {
        heading: { uz: "22.4. Tibbiy & Sanoat Amaliyoti, Segment Anything (SAM) & Mas'uliyat", en: "22.4. Medical/Industrial Deployment, SAM & Human-in-the-Loop" },
        bodyHtml: {
          uz: "<p>Tibbiyotda (DICOM/MRT) va sanoatda (metall payvand/mikrochiplar) segmentatsiya nuqson maydonini aniq millimetrda o'lchaydi. Zamonaviy <strong>SAM (Segment Anything Model, Meta)</strong> nuqta yoki ramka prompti bilan ixtiyoriy yangi obyektni <em>zero-shot</em> segmentatsiya qiladi. Ammo tibbiyotda model shifokor o'rnini bosmaydi — yakuniy tasdiq doimo shifokorda qoladi.</p>",
          en: "<p>Clinical MRI/CT and industrial metrology rely on segmentation masks to quantify lesion volume or crack area. Foundation models like <strong>SAM</strong> enable zero-shot promptable segmentation, yet medical tools stay strictly human-in-the-loop.</p>"
        },
        discussion: {
          q: { uz: "Kasalxonada rentgendan o'pka tugunlarini ajratuvchi U-Net modeli Dice=0.92 oldi. Uni shifokorsiz avtomatik tashxisga qo'yish mumkinmi?", en: "A hospital U-Net achieves 0.92 Dice on lung nodules. Can it replace radiologists for automated final diagnosis?" },
          a: { uz: "Yo'q! Hatto Dice=0.92 da ham 8% xatolik yoki noyob patologiya (out-of-distribution) bo'lishi mumkin; model 'shifokorga yordamchi' (second reader / CAD) bo'lib, vaqtni 5× tejaydi, lekin javobgarlik shifokorda qoladi.", en: "No! Clinical safety requires human-in-the-loop verification against rare out-of-distribution cases; the AI accelerates screening as a computer-aided decision support tool." }
        }
      }
    ],
    slides: [
      { title: { uz: "22.1. U-Net Arxitekturasi (Ronneberger, 2015)", en: "22.1. U-Net: Symmetric Encoder-Decoder" }, points: { uz: ["Qisuvchi Encoder (kontekst) + Kengaytiruvchi Decoder (aniq joylashuv)", "Zich Skip Connections: Kanallar bo'yicha Concatenate (ResNet kabi qo'shish emas!)", "Encoder dagi nozik chekka ma'lumotlari to'g'ridan-to'g'ri decoderga o'tadi", "Elastik deformatsiya augmentatsiyasi → 30–50 ta tibbiy rasmda ham a'lo!"], en: ["Symmetric U-shape fuses deep context with high-res boundaries", "Channel concatenation preserves crisp spatial details", "Works even on tiny 30-image biomedical sets with elastic augmentation"] } },
      { title: { uz: "U-Net Vorislari: 3D U-Net, Attention U-Net & nnU-Net", en: "U-Net Evolution: 3D, Attention & Self-Configuring nnU-Net" }, points: { uz: ["3D U-Net: KT/MRT hajmiy skanlari (D×H×W) uchun 3×3×3 konvolyutsiya", "Attention U-Net: muhim organ sohasini kuchaytirib fonni bostirish", "nnU-Net (No New Net, 2021): GPU xotira va datasetga qarab arxitekturani avtomatik tuzadi!"], en: ["3D U-Net handles volumetric CT/MRI scans", "Attention U-Net suppresses irrelevant background skip signals", "nnU-Net automatically configures preprocessing & topology per dataset"] } },
      { title: { uz: "Mask R-CNN (2017): Instans Segmentatsiya", en: "Mask R-CNN: Parallel FCN Mask Head" }, points: { uz: ["Faster R-CNN + 3-chi parallel FCN Mask Boshi", "Multi-task Loss: L = L_cls + L_box + L_mask", "Klassifikatsiya va maska ajratilgan (decoupled): har sinf uchun binar sigmoid maska", "Moslashuvchan: 3-boshni almashtirib odam skeletini (Keypoint Pose) ham topadi!"], en: ["Extends Faster R-CNN with decoupled per-class FCN mask branch", "Total loss: L_cls + L_box + L_mask; easily adapts to human pose estimation"] } },
      { title: { uz: "RoI Pooling vs RoI Align (Subpiksel Aniqlik)", en: "Why RoI Align Replaced RoI Pooling" }, table: { headers: { uz: ["Xususiyat", "RoI Pooling (Fast R-CNN)", "RoI Align (Mask R-CNN)"], en: ["Feature", "RoI Pooling", "RoI Align"] }, rows: { uz: [["Koordinata ishlovi", "int() bilan yaxlitlash (quantization)", "Yaxlitlashsiz haqiqiy float koordinata"], ["Qiymat olish", "Max Pool", "4 ta aniq nuqtada Bilineyar interpolyatsiya"], ["Ta'siri", "Qutilarda sezilmaydi, maskani siljitadi", "Maska AP ni 10–50% gacha oshiradi!"]], en: [["Coordinates", "Hard integer quantization", "Exact continuous floating-point bins"], ["Sampling", "Max pooling", "Bilinear interpolation at 4 points"], ["Impact", "Misaligns pixel masks", "Dramatically boosts Mask AP precision!"]] } } },
      { title: { uz: "Sonli Misol (Doskada): Dice vs IoU", en: "Worked Example: Dice Coefficient vs IoU" }, latex: "\\text{Dice}=\\frac{2|A\\cap B|}{|A|+|B|}=\\frac{160}{190}\\approx 0.842,\\quad \\text{IoU}=\\frac{80}{110}\\approx 0.727", points: { uz: ["|A|=90 px, |B|=100 px, kesishma |A∩B|=80 px", "Dice = 0.842, IoU = 0.727 — bir xil maska uchun Dice doimo kattaroq!"], en: ["For |A|=90, |B|=100, overlap=80 → Dice=0.842 vs IoU=0.727"] } },
      { title: { uz: "PyTorch Kod: U-Net Skip Concatenate & DoubleConv", en: "PyTorch Walkthrough: U-Net Skip Concatenate Block" }, code: `fused = torch.cat([dec_up, enc_feat], dim=1)  # (B, 64+64, H, W)
# torchvision Mask R-CNN chaqiruvi:
from torchvision.models.detection import maskrcnn_resnet50_fpn
model = maskrcnn_resnet50_fpn(weights="DEFAULT").eval()` },
      { title: { uz: "Segment Anything (SAM) & Tibbiy Mas'uliyat Muhokamasi", en: "Discussion: Foundation SAM & Clinical Safety" }, discussion: { q: { uz: "Dice=0.92 olgan U-Net tibbiy tasvir modelini nima uchun yakka o'zi mustaqil tashxis qo'yishga qo'yib bo'lmaydi?", en: "Why shouldn't a 0.92-Dice U-Net make final clinical diagnoses without physician oversight?" }, a: { uz: "Klinik amaliyotda 8% xatolik va noyob (OOD) patologiyalar xavfi mavjud — AI tezkor yordamchi vosita bo'lib, yakuniy qarorni shifokor tasdiqlaydi.", en: "High-stakes safety demands physician review for rare OOD cases; AI serves as clinical decision support." } } }
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
        heading: { uz: "23.1. Optik Oqim: Yorqinlik Doimiyligi, Lucas-Kanade & RAFT", en: "23.1. Optical Flow: Brightness Constancy, Lucas-Kanade & RAFT" },
        bodyHtml: {
          uz: "<p><strong>Optik oqim (Optical Flow)</strong> ketma-ket video kadrlari orasidagi piksellarning ko'rinma 2D tezlik $(u, v)$ maydonidir. Asosiy fizika sharti — <strong>yorqinlik doimiyligi</strong>: $I(x+u, y+v, t+1) = I(x, y, t) \\implies$ Teylor yoyilmasi bilan <strong>$I_x u + I_y v + I_t = 0$</strong>.</p><p>Bitta tenglamada 2 noma'lum $(u,v)$ bo'lgani uchun <strong>Aperture muammosi</strong> kelib chiqadi. <strong>Lucas-Kanade (1981)</strong> kichik oynadagi qo'shni piksellarda $(u,v)$ o'zgarmas deb siyrak (sparse) yechim oladi; <strong>Horn-Schunck</strong> global silliqlik qo'shib zich (dense) xarita beradi; zamonaviy chuqur tarmoqlar (<strong>FlowNet, RAFT</strong>) katta sakrashlarda ham ishlaydi.</p>",
          en: "<p><strong>Optical Flow</strong> estimates apparent 2D motion $(u,v)$ across frames via <strong>brightness constancy</strong>: $I_x u + I_y v + I_t = 0$. One equation for two unknowns causes the <strong>aperture problem</strong>. <strong>Lucas-Kanade</strong> fits patches via least squares (sparse); <strong>Horn-Schunck</strong> adds global smoothness (dense); deep <strong>RAFT</strong> handles large displacements.</p>"
        },
        latex: "I_x u + I_y v + I_t = 0, \\qquad (A^\\top A)\\begin{bmatrix}u\\\\v\\end{bmatrix} = -A^\\top b",
        widget: 'optflow-sim'
      },
      {
        heading: { uz: "23.2. Ko'p Obyektli Kuzatuv (MOT): Kalman, Hungarian & DeepSORT", en: "23.2. Multi-Object Tracking: Kalman, Hungarian & DeepSORT" },
        bodyHtml: {
          uz: "<p><strong>Tracking-by-Detection quvuri:</strong> (1) Har kadrda YOLO obyektlarni topadi; (2) <strong>Kalman filtri</strong> keyingi kadrda obyekt qayerda bo'lishini bashorat qiladi (va shovqinni tekislaydi); (3) <strong>Hungarian (Munkres) algoritmi</strong> IoU masofasi + CNN vizual ko'rinish (<em>Re-ID appearance embedding</em>) asosida <strong>DeepSORT / ByteTrack</strong> orqali eski ID larni yangi deteksiyalarga bog'laydi! Sifat <strong>MOTA</strong>, <strong>IDF1</strong> va <strong>ID Switch</strong> bilan o'lchanadi.</p>",
          en: "<p><strong>Tracking-by-Detection:</strong> YOLO detects objects → <strong>Kalman Filter</strong> predicts next-frame state → <strong>Hungarian Algorithm</strong> matches detections to tracks via IoU + CNN appearance embeddings (<strong>DeepSORT / ByteTrack</strong>). Evaluated by <strong>MOTA</strong>, <strong>IDF1</strong> &amp; <strong>ID Switches</strong>.</p>"
        },
        latex: "\\text{MOTA} = 1 - \\frac{\\sum_t (FN_t + FP_t + IDSW_t)}{\\sum_t GT_t}"
      },
      {
        heading: { uz: "23.3. Yuzni Tanish (FaceNet, ArcFace) va Biometrik FAR / FRR", en: "23.3. Face Recognition (FaceNet, ArcFace) & Biometrics FAR/FRR" },
        bodyHtml: {
          uz: "<p>Zamonaviy biometrik quvur: <strong>1) Aniqlash</strong> (MTCNN/RetinaFace) → <strong>2) Tekislash</strong> (5 landmark bo'yicha affin) → <strong>3) Embedding</strong> (<strong>FaceNet Triplet Loss</strong> yoki <strong>ArcFace</strong> orqali 128-D / 512-D birlik vektor) → <strong>4) Kosinus o'xshashligi</strong>!</p><p>Xavfsizlikda: <strong>FAR</strong> (yolg'on ruxsat — begona kirishi) vs <strong>FRR</strong> (yolg'on rad — egasini tanimaslik). Chegara ko'tarilsa FAR tushadi, FRR ortadi (kesishgan nuqta = <strong>EER</strong>).</p>",
          en: "<p>Pipeline: <strong>Detect → Align (5 landmarks) → Embed (FaceNet Triplet Loss / ArcFace 128D–512D) → Cosine Similarity</strong>. Security trades <strong>FAR</strong> (false accepts) against <strong>FRR</strong> (false rejects), meeting at the <strong>Equal Error Rate (EER)</strong>.</p>"
        }
      },
      {
        heading: { uz: "23.4. Sonli Misol (Doskada): Lucas-Kanade (u, v) va MOTA", en: "23.4. Worked Example: Lucas-Kanade Linear System & MOTA" },
        bodyHtml: {
          uz: "<p><strong>Masala 1 (Lucas-Kanade):</strong> Kichik oynada 2 nuqta: 1-nuqta $(I_x=2, I_y=1, I_t=-3)$ → $2u + v = 3$; 2-nuqta $(I_x=1, I_y=2, I_t=-3)$ → $u + 2v = 3$.<br>• Qo'shsak: $3u + 3v = 6 \\implies u + v = 2$. Ayirsak: $u - v = 0 \\implies u = v = \\mathbf{1.0\\text{ px/kadr}}$ (o'ng-pastga harakat!).<br><strong>Masala 2 (MOTA):</strong> 100 ta haqiqiy obyekt ($GT=100$) da $FN=5, FP=3, IDSW=2$ bo'lsa: $\\text{MOTA} = 1 - \\frac{5+3+2}{100} = 1 - 0.10 = \\mathbf{0.90\\ (90\\%)}$.</p>",
          en: "<p><strong>1. Lucas-Kanade:</strong> $2u+v=3$ and $u+2v=3 \\implies (u, v) = (\\mathbf{1.0, 1.0})\\text{ px/frame}$.<br><strong>2. MOTA:</strong> With $GT=100, FN=5, FP=3, IDSW=2$: $\\text{MOTA} = 1 - 10/100 = \\mathbf{90\\%}$.</p>"
        },
        code: `import cv2, numpy as np

# OpenCV Zich Optik Oqim (Farneback) va Siyrak (Lucas-Kanade) misoli
f1 = np.zeros((160, 160), np.uint8); cv2.circle(f1, (60, 60), 15, 255, -1)
f2 = np.zeros((160, 160), np.uint8); cv2.circle(f2, (64, 62), 15, 255, -1)

p0 = cv2.goodFeaturesToTrack(f1, maxCorners=10, qualityLevel=0.01, minDistance=7)
p1, st, err = cv2.calcOpticalFlowPyrLK(f1, f2, p0, None)
if p1 is not None:
    shifts = (p1[st == 1] - p0[st == 1]).mean(axis=0)
    print("Estimated LK mean flow (dx, dy):", np.round(shifts, 2))`
      },
      {
        heading: { uz: "23.5. Keys-Muhokama: Video Kuzatuvda Maxfiylik & DeepSORT To'silishi", en: "23.5. Discussion: Handling Long Occlusion & Biometric Privacy" },
        bodyHtml: {
          uz: "<p>Shahar kameralarida doimiy ID va yuz tanish shaxsiy daxlsizlik hamda ma'lumotlar xavfsizligi qonunlariga bo'ysunishi kerak (kadrni saqlamay faqat anonim shifrlangan embedding saqlash yoki blur).</p>",
          en: "<p>Public camera analytics must enforce privacy safeguards—preferring blurred faces or revocable encrypted embeddings over raw video storage.</p>"
        },
        discussion: {
          q: { uz: "Agar piyoda ustun orqasiga 20 kadrga to'liq kirib ketsa, faqat IoU ga tayanuvchi SORT algoritmi nima xato qiladi va DeepSORT qanday qutqaradi?", en: "If a pedestrian walks behind a pillar for 20 frames, what failure happens in IoU-only SORT and how does DeepSORT recover?" },
          a: { uz: "SORT 20 kadrda eski box bilan IoU=0 bo'lib qolgani uchun piyodaga YANGI ID beradi (ID Switch!). DeepSORT esa Kalman bashorati + CNN ko'rinish embeddingi (kiyim/rang vektori) kosinus o'xshashligi bilan piyoda chiqqanda ESKI ID ni qayta tiklaydi.", en: "IoU-only SORT drops the track and assigns a new ID (ID Switch). DeepSORT matches the CNN appearance embedding when the person re-emerges, preserving the original track ID." }
        }
      }
    ],
    slides: [
      { title: { uz: "23.1. Optik Oqim (Optical Flow) & Aperture Muammosi", en: "23.1. Optical Flow & Brightness Constancy" }, latex: "I(x+u, y+v, t+1) = I(x,y,t) \\implies I_x u + I_y v + I_t = 0", points: { uz: ["2 noma'lum (u, v) uchun 1 tenglama → Aperture muammosi!", "Lucas-Kanade: kichik oynada oqim doimiy → siyrak (sparse) yechim", "Horn-Schunck / Farneback: global silliqlik → zich (dense) oqim xaritasi", "RAFT: iterativ chuqur korrelyatsiya → katta tezkor harakatlarda ham aniq"], en: ["1 equation, 2 unknowns (u,v) → Aperture problem", "Lucas-Kanade (local sparse) vs Farneback/Horn-Schunck (dense) vs RAFT (deep)"] } },
      { title: { uz: "Sonli Misol: Lucas-Kanade Optik Oqim Yechimi", en: "Interactive Worked Example: Lucas-Kanade Solver" }, widget: 'optflow-sim' },
      { title: { uz: "Tracking-by-Detection: Kalman + Hungarian + DeepSORT", en: "Multi-Object Tracking: Kalman, Hungarian & DeepSORT" }, latex: "\\text{MOTA} = 1 - \\frac{\\sum (FN + FP + IDSW)}{\\sum GT}", points: { uz: ["1. Deteksiya: YOLO/Faster R-CNN qutilarni beradi", "2. Harakat Bashorati: Kalman filtri (pozitsiya + tezlik holati)", "3. Bog'lash (Association): Hungarian algoritmi (IoU + Visual Re-ID)", "SORT (faqat IoU) vs DeepSORT / ByteTrack (CNN Re-ID bilan kam ID switch!)"], en: ["Detector → Kalman motion prediction → Hungarian optimal matching", "DeepSORT fuses motion Mahalanobis distance with CNN Re-ID appearance"] } },
      { title: { uz: "Yuzni Tanish Quvuri: FaceNet (Triplet Loss) & ArcFace", en: "Face Recognition: Alignment, Triplet Loss & ArcFace" }, points: { uz: ["1. Aniqlash (RetinaFace) → 2. Tekislash (ko'z/burun bo'yicha affin)", "3. Embedding: rasm → R^128 yoki R^512 birlik vektor", "4. Triplet Loss: Anchor-Positive masofani kichraytirib, Negative ni uzoqlashtirish", "ArcFace: burchak marjasi bilan kosinus fazosida eng yuqori aniqlik"], en: ["Detect → 5-point Align → 128D/512D L2-normalized embedding", "Triplet Loss & ArcFace enforce tight intra-person clusters"] } },
      { title: { uz: "Biometrik Xavfsizlik: FAR vs FRR Murosasi", en: "Biometric Metrics: FAR vs FRR Trade-off" }, table: { headers: { uz: ["Metrika", "Ma'nosi", "Chegara oshsa (t↑)"], en: ["Metric", "Meaning", "As Threshold ↑"] }, rows: { uz: [["FAR (False Acceptance)", "Begona shaxsga ruxsat berish xatosi", "KESKIN KAMAYADI (xavfsiz!)"], ["FRR (False Rejection)", "Haqiqiy egasini rad etish xatosi", "ORTADI (noqulayroq)"], ["EER (Equal Error Rate)", "FAR = FRR tenglashgan muvozanat nuqtasi", "Qancha kichik, model shuncha zo'r"]], en: [["FAR", "Unauthorized impostor accepted", "DROPS sharply (stricter security)"], ["FRR", "Legitimate user rejected", "RISES"], ["EER", "Operating point where FAR == FRR", "Lower EER = better biometric model"]] } } },
      { title: { uz: "Python Kod: Pyramidal Lucas-Kanade (calcOpticalFlowPyrLK)", en: "Python Code: Sparse Optical Flow via PyrLK" }, code: `p0 = cv2.goodFeaturesToTrack(gray1, maxCorners=50, qualityLevel=0.01, minDistance=7)
p1, status, err = cv2.calcOpticalFlowPyrLK(gray1, gray2, p0, None)
dx, dy = (p1[status == 1] - p0[status == 1]).mean(axis=0)` },
      { title: { uz: "Muhokama: Ustun Orqasiga To'silish & Biometrik Etika", en: "Discussion: Surviving Occlusions & Privacy Ethics" }, discussion: { q: { uz: "Obyekt 20 kadrga to'silganda SORT nima uchun ID ni yo'qotadi va DeepSORT qanday tiklaydi?", en: "Why does SORT fail across a 20-frame occlusion, and how does DeepSORT recover?" }, a: { uz: "SORT faqat box IoU ga qaraydi (20 kadrdan keyin IoU=0). DeepSORT esa CNN vizual embeddingini saqlab, obyekt qayta ko'ringanda eski ID bilan bog'laydi.", en: "SORT relies purely on IoU overlap; DeepSORT matches cached CNN appearance vectors when the track reappears." } } }
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
        heading: { uz: "B1.1. Izohlanuvchi Ko'rish (CAM, Grad-CAM) & Saliency Maps", en: "B1.1. Explainable Vision: CAM & Grad-CAM" },
        bodyHtml: {
          uz: "<p>Tibbiyot va avtonom haydashda 'tarmoq qayeriga qarab qaror qildi?' degan savol hal qiluvchi. <strong>Grad-CAM</strong> maqsadli sinf logitining oxirgi konvolyutsiya xaritasi bo'yicha gradientlarini Global Average Pooling bilan vaznlab, <strong>issiqlik xaritasi (heatmap)</strong> quradi — masalan, model kasal o'pkani ko'rdimi yoki rasmdagi yorliq yozuvinimi (<em>shortcut learning</em>) tekshiradi!</p>",
          en: "<p>In high-stakes vision, <strong>Grad-CAM</strong> weights final conv maps by target-class gradients to highlight the pixels driving predictions—exposing spurious <em>shortcut learning</em> before deployment.</p>"
        }
      },
      {
        heading: { uz: "B1.2. Vision Transformer (ViT): Patch Tokenlar & Self-Attention", en: "B1.2. Vision Transformers (ViT): Patches & Global Self-Attention" },
        bodyHtml: {
          uz: "<p><strong>ViT (Dosovitskiy et al., 2020):</strong> Konvolyutsiyaning lokal 3×3 oynasidan voz kechib, tasvirni $16\\times 16$ pikselli <strong>patch bo'laklarga</strong> kesadi, ularni chiziqli proyeksiyalab <em>positional embedding</em> qo'shadi va <strong>Multi-Head Self-Attention (MSA)</strong> orqali birinchi qatlamdanoq tasvirning istalgan ikki burchagi orasidagi global bog'liqlikni modellashtiradi! Kompromiss: CNN dagi <em>inductive bias</em> yo'qligi uchun ViT juda katta dataset (JFT-300M/ImageNet-21k) yoki kuchli augmentatsiya/pretraining talab qiladi.</p>",
          en: "<p><strong>ViT (2020)</strong> splits images into $16\\times 16$ <strong>patches</strong>, adds positional encodings, and uses global <strong>Self-Attention</strong> from layer 1. Lacking CNN inductive biases, ViT shines with large-scale pretraining or <em>DINOv2 / MAE</em> self-supervision.</p>"
        },
        latex: "\\text{Attention}(Q, K, V) = \\text{softmax}\\!\\left(\\frac{QK^\\top}{\\sqrt{d_k}}\\right) V",
        widget: 'vit-patch'
      },
      {
        heading: { uz: "B1.3. Sonli Misol (Doskada): ViT Token Soni va Attention Matritsa Hajmi", en: "B1.3. Worked Example: ViT Patch Count & Quadratic Attention" },
        bodyHtml: {
          uz: "<p><strong>Berilgan:</strong> Kirish $224\\times 224\\times 3$, Patch $P = 16\\times 16$, model o'lchami $D = 768$.<br>1. Patchlar soni: $N = (224/16)^2 = 14 \\times 14 = \\mathbf{196}$ ta patch (+1 ta <code>[CLS]</code> token $= \\mathbf{197\\text{ token}}$).<br>2. Bitta patch xom o'lchami: $16 \\times 16 \\times 3 = \\mathbf{768}$ element!<br>3. Self-Attention xotirasi $N^2 = 197^2 \\approx 38,809$. Agar tasvir $1024\\times 1024$ ga oshsa ($N = 4097$), $N^2 \\approx \\mathbf{16.8\\text{ million}}$! Shu sababli yuqori aniqlikda <strong>Swin Transformer (oynali attention)</strong> ishlatiladi.</p>",
          en: "<p><strong>Given $224\\times 224\\times 3$, patch $P=16$, $D=768$:</strong><br>Patches $= (224/16)^2 = 14^2 = \\mathbf{196}$ (+1 <code>[CLS]</code> $= \\mathbf{197}$ tokens). Each raw patch holds $16\\times 16\\times 3 = \\mathbf{768}$ values. Attention scales as $O(N^2)$ — prompting hierarchical <strong>Swin Transformers</strong> at high resolutions.</p>"
        }
      },
      {
        heading: { uz: "B1.4. Multimodal CLIP, Segment Anything (SAM) va Generativ Diffusion/3D", en: "B1.4. Multimodal CLIP, Diffusion Synthesis & Neural 3D" },
        bodyHtml: {
          uz: "<p>• <strong>CLIP (OpenAI):</strong> 400M tasvir-matn juftligida kontrastiv o'qitish orqali 'mushuk rasmi' va 'a photo of a cat' matnini bitta kosinus fazosiga joylaydi → <strong>Zero-Shot Classification!</strong><br>• <strong>Generativ CV:</strong> <em>GAN</em> (Generator vs Discriminator o'yini), <em>Diffusion (DDPM / Stable Diffusion / DiT)</em> (sof Gauss shovqinidan U-Net/Transformer orqali bosqichma-bosqich shovqinni ayirib fotorealistik sintez) va <em>NeRF / 3D Gaussian Splatting</em> (2D kadrlardan real vaqt 3D render).</p>",
          en: "<p>• <strong>CLIP:</strong> Contrastive training on 400M image-text pairs enables <strong>Zero-Shot</strong> prompts.<br>• <strong>Generative CV:</strong> <em>GANs</em> (adversarial), <em>Diffusion (Stable Diffusion / DiT)</em> (iterative denoising), and <em>NeRF / 3D Gaussian Splatting</em> for 3D scene rendering.</p>"
        },
        code: `# ViT Patch Embedding va Attention shakli (PyTorch misoli)
import torch, torch.nn as nn
x = torch.randn(2, 3, 224, 224)
# Conv2d kernel=16, stride=16 exact 16x16 patch projection qiladi!
patch_proj = nn.Conv2d(3, 768, kernel_size=16, stride=16)
tokens = patch_proj(x).flatten(2).transpose(1, 2)  # (2, 196, 768)
print("ViT patch tokens shape (B, N, D):", tuple(tokens.shape))`
      },
      {
        heading: { uz: "B1.5. Keys-Muhokama: CNN vs ViT va Katta Vision Modellar Kelajagi", en: "B1.5. Discussion: Inductive Bias of CNNs vs ViT Scaling" },
        bodyHtml: {
          uz: "<p>300 ta tibbiy rasm ustida noldan o'qitishda <strong>CNN (ResNet/U-Net)</strong> tarjima ekvivariantligi tufayli g'alaba qozonadi; millionlab rasm va pretrained VLM/CLIP vazifalarida esa <strong>ViT</strong> yuqori masshtablanuvchanligi bilan yetakchilik qiladi.</p>",
          en: "<p>On 300 scans trained from scratch, CNNs win via built-in translation equivariance; with million-scale pretraining or multimodal prompts, ViT dominates.</p>"
        },
        discussion: {
          q: { uz: "Kichik 400 rasmli zavod nuqsonlari datasetida noldan o'qitishda nega ViT-Base ko'pincha ResNet-18 dan yomonroq natija beradi va buni qanday hal qilasiz?", en: "Why does ViT-Base trained from scratch often underperform ResNet-18 on a tiny 400-image defect dataset, and how do you fix it?" },
          a: { uz: "ViT da mahalliy konvolyutsiya inductive bias yo'q — 86M parametr 400 rasmda darhol overfit bo'ladi. Yechim: ImageNet-21k / DINOv2 / CLIP da pretrained ViT olib fine-tune qilish (Transfer Learning / LoRA)!", en: "ViT lacks CNN spatial inductive bias and overfits its 86M weights on 400 samples. Fix via pretrained weights (DINOv2 / CLIP / ImageNet-21k) with fine-tuning or LoRA!" }
        }
      }
    ],
    slides: [
      { title: { uz: "B1.1. Izohlanuvchi SI (XAI): CAM va Grad-CAM", en: "B1.1. Explainable Vision: Grad-CAM Heatmaps" }, points: { uz: ["Deep CNN lar 'qora quti' — model nimaga qarab qaror qildi?", "Grad-CAM: oxirgi Conv xaritasini sinf gradientlari bilan vaznlash", "Shortcut Learningni fosh qilish (masalan, rentgendagi shifoxona shtampiga qarash!)"], en: ["Open the black box via final-conv gradient heatmaps", "Catches spurious shortcut learning (like hospital text watermarks on X-rays!)"] } },
      { title: { uz: "Vision Transformer (ViT): Patchlar & Self-Attention", en: "Vision Transformers (ViT): Patches & Self-Attention" }, latex: "\\text{Attention}(Q,K,V) = \\text{softmax}\\!\\left(\\frac{QK^\\top}{\\sqrt{d_k}}\\right)V", points: { uz: ["Tasvir 16×16 patch bo'laklarga bo'linadi (svyortka yo'q!)", "Chiziqli proyeksiya + 1D Positional Embedding + [CLS] token", "Global kontekst: 1-qatlamdanoq rasmning chap va o'ng uchlari gaplashadi!"], en: ["Splits image into 16×16 patches + Positional Embeddings + [CLS] token", "Models global relationships across the whole image starting at Layer 1"] } },
      { title: { uz: "Interaktiv ViT Patch Tokenizer", en: "Interactive ViT Patch Tokenizer" }, widget: 'vit-patch' },
      { title: { uz: "Sonli Misol (Doskada): ViT Tokenlar & O(N²) Xotira", en: "Worked Example: ViT Patch Count & O(N²) Attention" }, points: { uz: ["224×224×3 tasvir, patch P = 16×16:", "Patchlar soni N = (224/16)² = 14² = 196 (+1 [CLS] = 197 token)", "Patch vektori = 16×16×3 = 768 o'lcham", "Attention matritsa: 197² ≈ 38K (224pxda) → 1024pxda 16.8M! (→ Swin Transformer)"], en: ["224×224, P=16 → 14×14 = 196 patches (+[CLS]=197)", "Attention matrix grows O(N²) → Swin Transformer uses shifted windows"] } },
      { title: { uz: "CLIP & VLM: Zero-Shot Matn-Tasvir Modellari", en: "CLIP & Vision-Language Models (Zero-Shot)" }, points: { uz: ["400 million rasm-matn juftligida Kontrastiv o'qitish (InfoNCE)", "Image Encoder (ViT/ResNet) + Text Encoder → umumiy R^512 fazo", "Zero-Shot: yangi sinfni nomini matn qilib ('nuqsonli detal') yozib tasniflash!"], en: ["Contrastive alignment on 400M image-text pairs", "Zero-shot classification using text prompts without retraining"] } },
      { title: { uz: "Generativ CV: GAN, Diffusion (DiT) va 3D NeRF/GS", en: "Generative Vision: GANs, Diffusion & 3D Gaussian Splatting" }, table: { headers: { uz: ["Oilasi", "Asosiy g'oyasi", "Afzalligi"], en: ["Family", "Mechanism", "Strength"] }, rows: { uz: [["GAN", "Generator vs Discriminator min-max o'yini", "1-qadamda tez sintez"], ["Diffusion (SD/DiT)", "Shovqinni bosqichma-bosqich ayirib tiklash", "Yuqori sifat va matn nazorati"], ["NeRF / 3DGS", "2D rasmlardan 3D radiatsiya / Gausslar", "Real-vaqt fotorealistik 3D sayohat"]], en: [["GAN", "Generator vs Discriminator game", "Fast 1-step sampling"], ["Diffusion", "Iterative denoising U-Net/DiT", "Top fidelity & text conditioning"], ["NeRF / 3DGS", "Volumetric / Gaussian 3D scene fields", "Real-time photorealistic 3D views"]] } } },
      { title: { uz: "PyTorch Kod: Conv2d bilan ViT Patch Embedding", en: "PyTorch Code: Exact 16×16 Patch Projection" }, code: `patch_proj = nn.Conv2d(3, 768, kernel_size=16, stride=16)
tokens = patch_proj(torch.randn(2, 3, 224, 224))
tokens = tokens.flatten(2).transpose(1, 2)  # (B=2, N=196, D=768)` },
      { title: { uz: "Muhokama: Kichik Datasetda CNN vs ViT", en: "Discussion: CNN Inductive Bias vs Pretrained ViT" }, discussion: { q: { uz: "400 ta rasm bilan noldan o'qitganda ViT nima uchun ResNet-18 dan yutqazadi va qanday tuzatamiz?", en: "Why does ViT from scratch lose to ResNet-18 on 400 images, and how is this solved?" }, a: { uz: "ViT da konvolyutsiyaning lokal inductive bias xossasi yo'q. DINOv2 / CLIP / ImageNet-21k pretrained ViT dan Transfer Learning yoki LoRA qo'llash kerak!", en: "ViT lacks spatial inductive biases; fine-tune pretrained DINOv2 / CLIP / ImageNet-21k checkpoints instead!" } } }
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
