// M16–M20: CNN Architecture, Training CNNs, Modern CNNs, Faster R-CNN, Real-Time YOLO
window.CV_TOPICS = window.CV_TOPICS || [];

window.CV_TOPICS.push(
  // ==================== M16 ====================
  {
    id: 16,
    code: 'M16',
    labId: 16,
    hours: 2,
    keywords: ['CNN', 'Convolution Layer', 'Pooling', 'ReLU', 'Leaky ReLU', 'Weight Sharing', 'Receptive Field', 'Dilated'],
    title: {
      uz: "Konvolyutsion neyron tarmoq (CNN) arxitekturasi",
      en: "Convolutional Neural Network (CNN) Architecture"
    },
    description: {
      uz: "Konvolyutsion qatlam (vazn ulashish, stride, padding, receptive field, dilated & depthwise separable conv), Max/Average pooling va ReLU/Leaky ReLU/GELU aktivatsiyalari.",
      en: "Conv layers (weight sharing, stride, padding, receptive field, dilated & depthwise separable conv), Max/Average pooling, and ReLU/Leaky ReLU/GELU activations."
    },
    refs: [
      { label: "COMP4423 L7: CNN Layers & Pooling", url: "https://github.com/lookwei/COMP4423" },
      { label: "Stanford CS231n: CNN Notes", url: "https://cs231n.github.io/" },
      { label: "D2L.ai Ch. 7: CNNs", url: "https://d2l.ai/" }
    ],
    sections: [
      {
        heading: { uz: "16.1. Konvolyutsiya Qatlami, Vazn Ulashish va Translation Equivariance", en: "16.1. Convolutional Layer, Weight Sharing & Equivariance" },
        bodyHtml: {
          uz: "<p><strong>Konvolyutsiya qatlami</strong> o'qitiladigan kichik $K\\times K$ filtrlarni kirish tasviri ustida siljitib <em>faollashuv xaritalari (feature maps)</em> yaratadi. Har bir filtr barcha piksellar uchun bir xil vaznlarni ulashadi (<strong>weight sharing</strong>) — natijada MLP ga nisbatan parametrlar minglab marta kamayadi va obyekt tasvir bo'ylab siljiganda ham faollashuv shunga mos siljiydi (<strong>translation equivariance</strong>).</p><p><strong>Iyerarxik o'rganish:</strong> 1-qatlam chekka va ranglarni; o'rta qatlamlar tekstura va shakl qismlarini (g'ildirak, ko'z); oxirgi qatlamlar butun obyektlarni taniydi! Qabul qilish maydonini (<strong>receptive field</strong>) parametr qo'shmasdan kengaytirish uchun <strong>Dilated (Atrous) Conv</strong>, mobil tezlik uchun <strong>Depthwise Separable Conv</strong> qo'llaniladi.</p>",
          en: "<p>A <strong>Conv layer</strong> slides learnable $K\\times K$ filters over 2D feature maps. <strong>Weight sharing</strong> cuts parameters dramatically compared to MLPs while enforcing <strong>translation equivariance</strong>.</p><p>Deep CNNs build hierarchies: edges → textures/parts → whole objects. Modern variants add <strong>Dilated (Atrous) conv</strong> to expand receptive fields without extra weights, and <strong>Depthwise Separable conv</strong> (MobileNet) for mobile speed.</p>"
        },
        latex: "O = \\left\\lfloor \\frac{I - K + 2P}{S} \\right\\rfloor + 1, \\qquad \\text{Params} = (K \\cdot K \\cdot C_{\\text{in}} + 1) \\cdot C_{\\text{out}}",
        widget: 'cnn-shape'
      },
      {
        heading: { uz: "16.2. Pooling Qatlamlari (Max, Avg, GAP) va Aktivatsiyalar (ReLU, GELU)", en: "16.2. Pooling Layers (Max, Avg, GAP) & Vanishing-Gradient Cures" },
        bodyHtml: {
          uz: "<p><strong>Pooling qatlamlari:</strong> 2×2 Max Pooling ($S=2$) o'lchamni 2× kichraytirib (4× kam piksel!), eng kuchli faollashuvni saqlaydi va <strong>0 ta o'qitiladigan parametrga</strong> ega! Zamonaviy tarmoqlarda tarmoq oxirida ulkan FC o'rniga <strong>Global Average Pooling (GAP)</strong> ishlatiladi (har kanalni bitta o'rtacha songa aylantiradi → overfittingni keskin kamaytiradi).</p><p><strong>Aktivatsiya funksiyalari:</strong> Chuqur tarmoqlarda Sigmoid/Tanh chetlarida hosila $0$ ga yaqinlashib <strong>yo'qolib boruvchi gradient (vanishing gradient)</strong> beradi. <strong>ReLU</strong> ($\\max(0, x)$) musbat sohada gradient=1 berib chuqur CNN larni o'qitishni ochdi; manfiy sohada neyron o'lib qolishiga (<em>dying ReLU</em>) qarshi <strong>Leaky ReLU</strong> va transformer/ConvNeXt da <strong>GELU</strong> ishlatiladi.</p>",
          en: "<p><strong>Max Pooling (2×2, stride 2)</strong> halves spatial size and builds local shift invariance with <strong>0 learnable parameters</strong>. Modern backbones use <strong>Global Average Pooling (GAP)</strong> instead of huge FC layers.</p><p><strong>ReLU</strong> ($\\max(0, x)$) prevents sigmoid/tanh vanishing gradients; <strong>Leaky ReLU</strong> and <strong>GELU</strong> avoid dead negative neurons (<em>dying ReLU</em>).</p>"
        }
      },
      {
        heading: { uz: "16.3. Sonli Hisoblash Misoli (Doskada): Chiqish Shakli, Parametrlar & MaxPool", en: "16.3. Worked Example: Conv2D Shape, Parameter Count & 2×2 MaxPool" },
        bodyHtml: {
          uz: "<p><strong>Masala 1 (4×4 faollashuv xaritasi → 2×2 Max Pooling, stride=2):</strong><br>Berilgan $F = \\begin{bmatrix}1&3&2&4\\\\ 5&6&1&2\\\\ 3&2&8&7\\\\ 1&0&4&5\\end{bmatrix}$. To'rtta $2\\times 2$ blokning maksimallari:<br>• Yuqori-chap $[1,3; 5,6] \\to \\mathbf{6}$; Yuqori-o'ng $[2,4; 1,2] \\to \\mathbf{4}$;<br>• Pastki-chap $[3,2; 1,0] \\to \\mathbf{3}$; Pastki-o'ng $[8,7; 4,5] \\to \\mathbf{8}$. Natija: $\\begin{bmatrix}6&4\\\\ 3&8\\end{bmatrix}$!</p><p><strong>Masala 2 (Conv2D o'lchami va parametrlar):</strong> Kirish $(32, 32, 3)$, $C_{\\text{out}} = 16$ ta $5\\times 5$ filtr, $P=0, S=1$.<br>• Chiqish o'lchami: $O = (32 - 5 + 0)/1 + 1 = \\mathbf{28 \\times 28 \\times 16}$.<br>• Parametrlar (bias bilan): $(5\\times 5\\times 3 + 1) \\times 16 = 76 \\times 16 = \\mathbf{1,216}$ ta!</p>",
          en: "<p><strong>1. 2×2 Max Pooling (stride 2) on $[[1,3,2,4],[5,6,1,2],[3,2,8,7],[1,0,4,5]]$:</strong> block maxima give $[[6, 4], [3, 8]]$.<br><strong>2. Conv2D Shape &amp; Params ($32\\times 32\\times 3 \\to 16$ filters of $5\\times 5$, $P=0,S=1$):</strong> Output $= (32-5+0)/1+1 = \\mathbf{28\\times 28\\times 16}$; Params $= (5\\cdot 5\\cdot 3 + 1)\\times 16 = \\mathbf{1,216}$.</p>"
        },
        latex: "\\text{MaxPool}_{2\\times 2}(F) = \\begin{bmatrix}6 & 4\\\\ 3 & 8\\end{bmatrix}, \\quad (5\\cdot 5\\cdot 3 + 1)\\cdot 16 = 1216"
      },
      {
        heading: { uz: "16.4. PyTorch CNN Moduli (nn.Conv2d, NCHW) & Xatolar", en: "16.4. PyTorch nn.Conv2d Walkthrough & Channel-First Pitfalls" },
        bodyHtml: {
          uz: "<p><strong>Diqqat (NCHW vs NHWC):</strong> OpenCV/NumPy tasvirni <code>(H, W, C)</code> saqlasa, PyTorch <code>(Batch, Channels, H, W)</code> kutadi! <code>nn.Linear</code> oldidan o'lchamni <code>nn.AdaptiveAvgPool2d((1,1))</code> bilan birxillashtirish ixtiyoriy rasm o'lchamida xato bermaslikni ta'minlaydi.</p>",
          en: "<p><strong>NCHW vs NHWC Pitfall:</strong> OpenCV arrays are <code>(H, W, C)</code> while PyTorch expects <code>(B, C, H, W)</code>. Pair <code>nn.AdaptiveAvgPool2d(1)</code> before <code>nn.Linear</code> so your CNN accepts arbitrary input resolutions.</p>"
        },
        code: `import torch, torch.nn as nn

conv = nn.Conv2d(in_channels=3, out_channels=16, kernel_size=5, stride=1, padding=0)
pool = nn.MaxPool2d(kernel_size=2, stride=2)
x = torch.randn(4, 3, 32, 32)  # (B, C, H, W)
y = pool(torch.relu(conv(x)))
print("Conv out:", tuple(conv(x).shape), "| Pool out:", tuple(y.shape))
print("Learnable weights+bias:", sum(p.numel() for p in conv.parameters()))  # 1216`
      },
      {
        heading: { uz: "16.5. Keys-Muhokama: MaxPool vs Strided Conv & Receptive Field", en: "16.5. Case Discussion: MaxPool vs Strided Conv" },
        bodyHtml: {
          uz: "<p>Zamonaviy arxitekturalarda (ResNet, ConvNeXt, YOLO) Max Pooling o'rniga ko'pincha <strong>stride=2 konvolyutsiya</strong> ishlatiladi — bu tarmoqqa kichraytirishni ham o'rganiladigan vaznlar bilan optimallashtirish imkonini beradi.</p>",
          en: "<p>Many modern CNNs replace fixed Max Pooling with learned <strong>stride-2 convolutions</strong>, letting gradients optimize downsampling directly.</p>"
        },
        discussion: {
          q: { uz: "28×28×64 xususiyat xaritasini 2×2 MaxPooling (S=2) dan o'tkazsak chiqish shakli va o'qitiladigan parametrlar soni qancha bo'ladi?", en: "What are the output shape and parameter count when passing a 28×28×64 tensor through 2×2 MaxPool (stride 2)?" },
          a: { uz: "Chiqish shakli 14×14×64 (har kanal mustaqil kichrayadi), o'qitiladigan parametrlar soni esa 0 ta! (Taqqoslash: 3×3 stride=2 Conv2D bilan 64 kanalda (3×3×64+1)×64 = 36,928 parametr bo'lar edi).", en: "Output shape is 14×14×64 with 0 learnable parameters! (By contrast, a 3×3 stride-2 conv uses (9×64+1)×64 = 36,928 parameters)." }
        }
      }
    ],
    slides: [
      { title: { uz: "16.1. Nima Uchun CNN? Vazn Ulashish & Mahalliy Bog'liqlik", en: "16.1. Why CNNs? Weight Sharing & Spatial Locality" }, points: { uz: ["Mahalliy bog'liqlik: piksel qo'shnilariga qaraydi (global FC o'rniga 3×3 oyna)", "Vazn ulashish (Weight Sharing): 1 filtr butun tasvirda → parametrlar 1000× kam!", "Tarjima ekvivariantlik: mushuk o'ngga siljisa feature map ham o'ngga siljiydi", "Iyerarxiya: 1-qatlam chekkalar → o'rta qismlar → chuqur obyektlar"], en: ["Local receptive fields preserve 2D geometry", "Weight sharing cuts weights 1000× vs dense MLPs", "Translation equivariance & hierarchical features (edges → parts → objects)"] } },
      { title: { uz: "Konvolyutsiya Chiqish O'lchami Formulasi", en: "Conv2D Output Shape & Parameter Formula" }, latex: "O = \\left\\lfloor \\frac{I - K + 2P}{S} \\right\\rfloor + 1, \\quad \\text{Params}=(K^2 C_{\\text{in}} + 1)\\cdot C_{\\text{out}}", points: { uz: ["I: kirish o'lchami | K: filtr (3×3, 5×5) | P: padding | S: stride", "Same padding (S=1 da O = I): P = (K - 1) / 2 (K=3 da P=1)", "Valid padding (P = 0): chiqish har qatlamda K-1 ga kichrayadi"], en: ["Same padding (P=(K-1)/2, S=1) preserves H×W", "Valid padding (P=0) shrinks output by K-1"] } },
      { title: { uz: "Interaktiv CNN Chiqish O'lchami Kalkulyatori", en: "Interactive CNN Output Shape Calculator" }, widget: 'cnn-shape' },
      { title: { uz: "Maxsus Konvolyutsiyalar: 1×1, Dilated & Depthwise", en: "Special Convolutions: 1×1, Dilated & Depthwise" }, table: { headers: { uz: ["Turi", "Asosiy vazifasi", "Qayerda mashhur"], en: ["Type", "Purpose", "Used In"] }, rows: { uz: [["1×1 Conv", "Kanallarni siqish / kengaytirish (parametr tejash)", "GoogLeNet, ResNet Bottleneck"], ["Dilated (Atrous)", "Parametr qo'shmay Receptive Field kengaytirish", "DeepLab segmentatsiya"], ["Depthwise Separable", "Hisoblashni 8–9× kamaytirish", "MobileNet, EfficientNet"]], en: [["1×1 Conv", "Channel mixing & projection", "ResNet Bottleneck, Inception"], ["Dilated (Atrous)", "Expand receptive field with 0 extra params", "DeepLab segmentation"], ["Depthwise Separable", "8–9× fewer FLOPs", "MobileNet, EfficientNet"]] } } },
      { title: { uz: "Pooling Qatlamlari (Max, Avg, Global Avg Pooling)", en: "Pooling Layers: MaxPool, AvgPool & GAP" }, points: { uz: ["Max Pooling (2×2, S=2): o'lchamni 2× kamaytirib eng kuchli belgini oladi", "O'qitiladigan parametrlar = 0 ta!", "Global Average Pooling (GAP): H×W×C → 1×1×C (FC qatlam overfittingini yo'qotadi!)"], en: ["2×2 MaxPool halves spatial dimensions with 0 parameters", "Global Average Pooling (GAP) compresses H×W×C → 1×1×C without FC bloat"] } },
      { title: { uz: "Aktivatsiyalar: Sigmoid Vanishing Gradient → ReLU / GELU", en: "Activations: Vanishing Gradient vs ReLU / GELU" }, points: { uz: ["Sigmoid/Tanh chetlarida hosila ≈ 0 → 10+ qatlamda gradient o'ladi!", "ReLU(x) = max(0, x): musbatda gradient=1 (tez va barqaror o'qitish)", "Dying ReLU (manfiy=0) → Leaky ReLU (αx) va GELU (ViT/ConvNeXt)"], en: ["Sigmoid/Tanh saturate (near-zero derivative) → vanishing gradient", "ReLU fixes positive gradient flow; Leaky ReLU / GELU avoid dying neurons"] } },
      { title: { uz: "Sonli Misol (Doskada): 2×2 MaxPool & Conv2D Params", en: "Worked Example: MaxPool Output & Conv Params" }, points: { uz: ["F = [[1,3,2,4], [5,6,1,2], [3,2,8,7], [1,0,4,5]] → 2×2 MaxPool (S=2): [[6, 4], [3, 8]]", "Conv2D: Kirish 32×32×3, K=5, C_out=16, P=0, S=1", "Chiqish: (32 - 5 + 0)/1 + 1 = 28 → (28, 28, 16)", "Parametrlar: (5×5×3 + 1) × 16 = 76 × 16 = 1,216 ta"], en: ["2×2 MaxPool of 4×4 matrix → [[6,4],[3,8]]", "32×32×3 → 16×(5×5) Conv (P=0,S=1) → shape (28,28,16), 1,216 params"] } },
      { title: { uz: "PyTorch Kod: nn.Conv2d, ReLU & AdaptiveAvgPool", en: "PyTorch Code: Conv2d + MaxPool + Shape Verification" }, code: `conv = nn.Conv2d(3, 16, kernel_size=5, stride=1, padding=0)
pool = nn.MaxPool2d(2, stride=2)
x = torch.randn(4, 3, 32, 32)  # (Batch, C, H, W)
out = pool(torch.relu(conv(x)))  # -> (4, 16, 14, 14)
print("Total weights:", sum(p.numel() for p in conv.parameters()))` },
      { title: { uz: "Muhokama: MaxPooling vs Stride=2 Konvolyutsiya", en: "Discussion: Fixed MaxPool vs Learned Strided Conv" }, discussion: { q: { uz: "28×28×64 tensor uchun MaxPool(2,2) va Conv2d(64,64,k=3,s=2,p=1) chiqish shakli bir xil (14×14×64), lekin qaysi farqlar bor?", en: "Both MaxPool(2) and Conv(k=3,s=2,p=1) yield 14×14×64. What is the key trade-off?" }, a: { uz: "MaxPool 0 parametr va 0 o'qitiladigan vazn bilan lokal siljish invariantligini beradi; Strided Conv esa 36,928 ta o'qitiladigan parametr qo'shib tarmoqqa kichraytirishni o'rgatish imkonini beradi.", en: "MaxPool adds 0 weights and fixed translation invariance; strided conv adds 36,928 learnable weights so the network optimizes spatial downsampling." } } }
    ],
    glossary: [
      { uz: "vazn ulashish", en: "weight sharing", defUz: "Bitta filtrni butun tasvir bo'ylab qayta ishlatish", defEn: "Applying identical kernel weights across all spatial positions" },
      { uz: "qabul qilish maydoni", en: "receptive field", defUz: "Chuqur neyron kirish tasvirida ko'radigan fazoviy hudud", defEn: "Region of the input image influencing a feature unit" },
      { uz: "ReLU", en: "ReLU", defUz: "f(x)=max(0,x) — chuqur CNN larda standart aktivatsiya", defEn: "Rectified Linear Unit f(x)=max(0,x)" }
    ],
    quiz: [
      { q: { uz: "I=28, K=3, P=1, S=1 bo'lganda konvolyutsiya qatlamining chiqish o'lchami O qancha?", en: "What is the Conv2D output size O for I=28, K=3, P=1, S=1?" }, options: [{ label: 'A', uz: "26×26", en: "26×26" }, { label: 'B', uz: "28×28", en: "28×28" }, { label: 'C', uz: "14×14", en: "14×14" }, { label: 'D', uz: "30×30", en: "30×30" }], answer: 'B', explanation: { uz: "O = (28 - 3 + 2×1)/1 + 1 = 28 (Same padding!).", en: "O = (28 - 3 + 2)/1 + 1 = 28 (Same padding)." } },
      { q: { uz: "Chuqur tarmoqlarda 'yo'qolib boruvchi gradient' (vanishing gradient) muammosi ko'proq qaysi funksiyada uchraydi?", en: "Which activation suffers most from vanishing gradients in deep networks?" }, options: [{ label: 'A', uz: "ReLU", en: "ReLU" }, { label: 'B', uz: "Sigmoid va Tanh", en: "Sigmoid and Tanh" }, { label: 'C', uz: "Leaky ReLU", en: "Leaky ReLU" }, { label: 'D', uz: "Linear", en: "Linear" }], answer: 'B', explanation: { uz: "Sigmoid/tanh to'yingan chetlarida hosila nolga yaqinlashib gradientni so'ndiradi.", en: "Saturating tails of sigmoid/tanh have near-zero derivatives." } },
      { q: { uz: "2×2 Max Pooling (stride=2) qatlamida nechta o'qitiladigan parametr (vazn) mavjud?", en: "How many learnable weights does a 2×2 Max Pooling layer have?" }, options: [{ label: 'A', uz: "0 ta", en: "0" }, { label: 'B', uz: "4 ta", en: "4" }, { label: 'C', uz: "16 ta", en: "16" }, { label: 'D', uz: "64 ta", en: "64" }], answer: 'A', explanation: { uz: "Pooling faqat maksimal yoki o'rtacha qiymat oladi — o'qitiladigan vazni yo'q.", en: "Pooling computes fixed max/mean operations with zero learnable parameters." } },
      { q: { uz: "Parametrlar sonini oshirmasdan qabul qilish maydonini (receptive field) kengaytiruvchi konvolyutsiya qaysi?", en: "Which convolution expands the receptive field without adding parameters?" }, options: [{ label: 'A', uz: "Dilatatsiyalangan (atrous) konvolyutsiya", en: "Dilated (atrous) convolution" }, { label: 'B', uz: "Fully connected", en: "Fully connected" }, { label: 'C', uz: "1×1 konvolyutsiya", en: "1×1 convolution" }, { label: 'D', uz: "Dropout", en: "Dropout" }], answer: 'A', explanation: { uz: "Dilated conv filtr elementlari orasiga bo'shliq qo'yib DeepLab kabi segmentatsiyada ishlatiladi.", en: "Dilated kernels insert spacing between taps, widely used in DeepLab." } }
    ],
    matching: [
      { left: { uz: "Vazn ulashish", en: "Weight sharing" }, right: { uz: "Parametrlarni keskin kamaytirish + tarjima ekvivariantlik", en: "Reduces params & provides translation equivariance" } },
      { left: { uz: "Max Pooling", en: "Max Pooling" }, right: { uz: "Fazoviy o'lchamni kichraytirib eng kuchli belgini saqlash", en: "Spatial downsampling keeping peak activations" } },
      { left: { uz: "ReLU", en: "ReLU" }, right: { uz: "Musbat sohada gradient=1, tez o'qitish", en: "Constant gradient 1 for x>0, cures vanishing gradient" } },
      { left: { uz: "Depthwise Separable", en: "Depthwise Separable" }, right: { uz: "MobileNet dagi tezkor yengil konvolyutsiya", en: "Lightweight factored conv powering MobileNet" } }
    ],
    fillGap: [
      { text: { uz: "ReLU funksiyasi f(x) = ___(0, x) ko'rinishida aniqlanadi.", en: "The ReLU activation is defined as f(x) = ___(0, x)." }, answer: ['max'] },
      { text: { uz: "Kirish o'lchamini saqlab qoluvchi padding turi ___ padding deyiladi.", en: "Padding that preserves input spatial dimensions is called ___ padding." }, answer: ['same'] },
      { text: { uz: "Chuqur neyronda manfiy kirishlarda gradient doim 0 bo'lib qolishi ___ ReLU muammosi deyiladi.", en: "Neurons stuck outputting zero gradient for negative inputs suffer from ___ ReLU." }, answer: ['dying', "o'layotgan"] }
    ]
  },

  // ==================== M17 ====================
  {
    id: 17,
    code: 'M17',
    labId: 17,
    hours: 2,
    keywords: ['Fully Connected', 'Softmax', 'Cross-Entropy', 'Dropout', 'Weight Decay', 'Batch Normalization', 'Early Stopping'],
    title: {
      uz: "CNN o'qitish jarayoni, Softmax va Regularizatsiya",
      en: "Training CNNs: Softmax, Loss Functions & Regularization"
    },
    description: {
      uz: "To'liq bog'langan (FC) qatlamlar vs Global Average Pooling, Softmax & Temperatura, CrossEntropyLoss, Learning Rate & Adam, Dropout, L2 Weight Decay, Batch Norm va Early Stopping.",
      en: "Fully Connected layers vs Global Average Pooling, Softmax & Temperature, CrossEntropyLoss, LR & Adam, Dropout, Weight Decay, Batch Norm, and Early Stopping."
    },
    refs: [
      { label: "D2L.ai Ch. 8: Training & Regularization", url: "https://d2l.ai/" },
      { label: "PyTorch CrossEntropyLoss Docs", url: "https://pytorch.org/docs" }
    ],
    sections: [
      {
        heading: { uz: "17.1. To'liq Bog'langan Qatlamlar, Logitlar va Softmax", en: "17.1. Fully Connected Layers, Logits & Softmax" },
        bodyHtml: {
          uz: "<p>Konvolyutsion xususiyat xaritasi 1D vektorga tekislanib (<code>flatten</code>) yoki <em>Global Average Pooling</em> orqali <strong>FC (Linear)</strong> tasniflash boshiga uzatiladi. Oxirgi qatlam har bir $i$-sinf uchun xom ballar — <strong>logitlar $z_i$</strong> ni chiqaradi.</p><p><strong>Softmax</strong> logitlarni $\\sum p_i = 1$ ehtimollik taqsimotiga o'giradi. Eksponensial funksiya katta farqlarni kuchaytiradi; <em>temperatura $T$</em> bilan yumshatish ($z_i / T$) bilim distillyatsiyasi va CLIP da qo'llaniladi. <em>Sonli barqarorlik qoidasi:</em> hisoblashda $e^{z_i - \\max(z)}$ qilinadi!</p>",
          en: "<p>Conv feature maps are pooled via <em>Flatten</em> or <em>GAP</em> into a linear classification head producing raw scores called <strong>logits ($z_i$)</strong>.</p><p><strong>Softmax</strong> normalizes logits into probabilities summing to 1 (temperature $T$ tunes sharpness; shift by $\\max(z)$ for numerical stability).</p>"
        },
        latex: "p_i = \\text{softmax}(z_i) = \\frac{e^{z_i - \\max(z)}}{\\sum_j e^{z_j - \\max(z)}}, \\quad \\mathcal{L}_{CE} = -\\log(p_y)",
        widget: 'softmax-sim'
      },
      {
        heading: { uz: "17.2. Cross-Entropy Loss, Learning Rate & Adam Optimizatori", en: "17.2. Cross-Entropy Loss, Learning Rate Schedules & Adam" },
        bodyHtml: {
          uz: "<p><strong>Cross-Entropy Loss ($-\\log p_{\\text{true}}$):</strong> To'g'ri sinf ehtimolligi $p=0.9$ bo'lsa yo'qotish kichik ($0.105$), lekin model ishonch bilan xato qilsa ($p=0.01$), yo'qotish $4.605$ ga sakrab kuchli tuzatish gradientini beradi! PyTorch <code>nn.CrossEntropyLoss()</code> ichida LogSoftmax mavjud → <strong>tarmoq oxiriga Softmax qo'ymang!</strong></p><p><strong>O'qitish tezligi ($\\eta$, Learning Rate):</strong> Eng muhim giperparametr! Katta LR lossni tebratib yuboradi, kichik LR sekinlashadi → <strong>Warmup + Cosine Annealing</strong> jadvali va <strong>AdamW</strong> qo'llaniladi.</p>",
          en: "<p><strong>Cross-Entropy Loss ($-\\log p_{\\text{true}}$)</strong> heavily penalizes confident mistakes. Never append a separate Softmax before PyTorch <code>nn.CrossEntropyLoss()</code>! Pair <strong>AdamW</strong> with <strong>Warmup + Cosine Annealing</strong> LR schedules.</p>"
        }
      },
      {
        heading: { uz: "17.3. Overfittingga Qarshi Regularizatsiya: Dropout, BatchNorm, Weight Decay", en: "17.3. Fighting Overfitting: Dropout, BatchNorm & Early Stopping" },
        bodyHtml: {
          uz: "<p>• <strong>Dropout ($p=0.2..0.5$):</strong> O'qitishda tasodifiy neyronlarni 0 qilib, bir nechta kichik tarmoq ansambliga o'xshash umumlashtirish beradi (<code>model.eval()</code> da o'chiriladi!).<br>• <strong>Batch Normalization:</strong> Mini-batch bo'yicha o'rtacha $\\mu_B$ va dispersiya $\\sigma_B^2$ bilan normallashtirib yuqori LR bilan tez o'qitishga ruxsat beradi.<br>• <strong>L2 Weight Decay, Label Smoothing &amp; Early Stopping:</strong> Train loss tushib, Validation loss ko'tarila boshlagan nuqtada eng yaxshi model saqlanadi.</p>",
          en: "<p>• <strong>Dropout:</strong> Randomly drops activations during training (disabled automatically by <code>model.eval()</code>).<br>• <strong>BatchNorm:</strong> Normalizes batch activations using running stats during eval.<br>• <strong>Weight Decay, Label Smoothing &amp; Early Stopping:</strong> Stop when validation loss starts climbing while train loss drops.</p>"
        }
      },
      {
        heading: { uz: "17.4. Sonli Misol (Doskada): Softmax Ehtimolligi va Cross-Entropy Loss", en: "17.4. Worked Example: Softmax Probs & Cross-Entropy Loss" },
        bodyHtml: {
          uz: "<p><strong>Berilgan 3 sinfli logitlar:</strong> $z = [2.0,\\ 1.0,\\ 0.1]$ (haqiqiy sinf = 0-indeks 'Mushuk').<br>1. Eksponensiallar: $e^{2.0} \\approx 7.389$, $e^{1.0} \\approx 2.718$, $e^{0.1} \\approx 1.105$.<br>2. Yig'indi: $\\Sigma = 7.389 + 2.718 + 1.105 = \\mathbf{11.212}$.<br>3. Ehtimolliklar: $p_0 = 7.389/11.212 = \\mathbf{0.659}$ (65.9%), $p_1 = 2.718/11.212 = \\mathbf{0.242}$, $p_2 = 1.105/11.212 = \\mathbf{0.099}$ (Tekshiruv: yig'indi $= 1.000$).<br>4. Cross-Entropy Loss: $\\mathcal{L} = -\\ln(0.659) = \\mathbf{0.417}$!</p>",
          en: "<p><strong>Given logits $z=[2.0, 1.0, 0.1]$, true class 0:</strong><br>Exponentials: $[7.389, 2.718, 1.105]$, Sum $= 11.212 \\implies p = [\\mathbf{0.659}, \\mathbf{0.242}, \\mathbf{0.099}]$.<br>Cross-Entropy Loss $= -\\ln(0.659) = \\mathbf{0.417}$.</p>"
        },
        code: `import torch, torch.nn as nn

logits = torch.tensor([[2.0, 1.0, 0.1]], requires_grad=True)
target = torch.tensor([0])

probs = torch.softmax(logits, dim=1)
loss_fn = nn.CrossEntropyLoss()  # LogSoftmax + NLLLoss birga!
loss = loss_fn(logits, target)
loss.backward()
print("Probs:", probs.detach().numpy().round(3), "| CE Loss:", round(loss.item(), 3))`
      },
      {
        heading: { uz: "17.5. Eval Tuzog'i: model.eval() va torch.no_grad()", en: "17.5. Critical PyTorch Pitfall: Forgetting model.eval()" },
        bodyHtml: {
          uz: "<p>Agar test/inferensiya paytida <code>model.eval()</code> chaqirilmasa, <strong>Dropout</strong> piksellarni tasodifiy tashlab har safar har xil bashorat beradi, <strong>BatchNorm</strong> esa 1-rasmli batchda dispersiya buzilib aniqlikni tushiradi! <code>with torch.no_grad():</code> bilan xotira va tezlikni tejang.</p>",
          en: "<p>Forgetting <code>model.eval()</code> leaves Dropout active (random predictions!) and forces BatchNorm to normalize across batch-size-1 statistics. Always pair <code>model.eval()</code> with <code>with torch.no_grad():</code> during validation/inference.</p>"
        },
        discussion: {
          q: { uz: "O'qitish tugagach bitta rasmni test qilsangiz, bir xil rasmga har safar turlicha natija chiqayapti. Kodda qaysi 2 ta qatorni unutgansiz?", en: "Why might your trained PyTorch CNN output slightly different predictions every time you evaluate the exact same test image?" },
          a: { uz: "model.eval() chaqirilmagani uchun Dropout hali ham o'qitish rejimida tasodifiy neyronlarni o'chirmoqda va BatchNorm batch statistikasi o'rniga running_mean/var ishlatmayapti!", en: "You forgot model.eval()! Dropout is still stochastically zeroing activations and BatchNorm uses batch stats instead of running averages." }
        }
      }
    ],
    slides: [
      { title: { uz: "17.1. To'liq Bog'langan (FC) Qatlam vs GAP", en: "17.1. FC Classification Head vs Global Average Pooling" }, points: { uz: ["Conv xaritalarni 1D vektorga tekislash (Flatten) → FC (Linear) qatlam", "FC ning muammosi: 512×7×7 → 4096 = 102M+ parametr (og'ir & overfit)", "GAP (Global Average Pooling): H×W ni 1×1 ga o'rtachalash → 0 parametr!", "Chiqish qatlami xom ballari = Logitlar z"], en: ["Flatten conv map → Linear FC head emits raw logits z", "GAP averages H×W → 1×1 per channel, avoiding massive FC overfitting"] } },
      { title: { uz: "Softmax & Cross-Entropy Loss", en: "Softmax Probabilities & Cross-Entropy Loss" }, latex: "p_i = \\frac{e^{z_i}}{\\sum_j e^{z_j}}, \\qquad \\mathcal{L}_{CE} = -\\log(p_{\\text{true}})", points: { uz: ["Softmax istalgan haqiqiy sonlarni [0, 1] ehtimollikka (Σ=1) aylantiradi", "Cross-Entropy xato ishonchni logarifmik qattiq jazolaydi", "PyTorch nn.CrossEntropyLoss() xom logit qabul qiladi — alohida Softmax QO'YMANG!"], en: ["Softmax normalizes logits to probabilities summing to 1", "Cross-Entropy penalizes confident wrong predictions strongly", "PyTorch CrossEntropyLoss expects raw logits — NO trailing Softmax!"] } },
      { title: { uz: "Interaktiv Softmax Logitlar Simulatori", en: "Interactive Softmax Probability Simulator" }, widget: 'softmax-sim' },
      { title: { uz: "Sonli Misol (Doskada): Softmax z = [2.0, 1.0, 0.1]", en: "Worked Example: Softmax & Cross-Entropy Loss" }, points: { uz: ["e^2.0 = 7.389, e^1.0 = 2.718, e^0.1 = 1.105 → Σ = 11.212", "p0 = 7.389 / 11.212 = 0.659 (65.9%)", "p1 = 0.242 (24.2%), p2 = 0.099 (9.9%) — jami = 1.000", "Agar 0-sinf rost bo'lsa: CE Loss = -ln(0.659) = 0.417"], en: ["Sum exp = 11.212 → probs = [0.659, 0.242, 0.099]", "Cross-Entropy Loss = -ln(0.659) = 0.417"] } },
      { title: { uz: "O'qitish Tsikli & Learning Rate Strategiyalari", en: "Training Loop & Learning Rate Schedules" }, points: { uz: ["5 qadam: zero_grad() → forward → loss → backward() → step()", "LR juda katta → loss NaN/tebranish; LR juda kichik → tiqilib qoladi", "Warmup + Cosine Annealing LR + Gradient Clipping (portlashga qarshi)", "Optimizatorlar: SGD+Momentum (yuqori aniqlik) vs AdamW (tez boshlanish)"], en: ["Loop: zero_grad → forward → loss → backward → step", "Warmup + Cosine Annealing LR + Gradient Clipping", "SGD+Momentum vs AdamW weight decay"] } },
      { title: { uz: "Overfittingga Qarshi 5 Qurol (Regularizatsiya)", en: "5 Weapons Against Overfitting (Regularization)" }, table: { headers: { uz: ["Usul", "Mexanizmi", "Qayerda"], en: ["Method", "Mechanism", "Notes"] }, rows: { uz: [["Dropout", "p ehtimol bilan neyronlarni 0 ga o'chirish", "FC / Attention boshlarida"], ["BatchNorm", "Batch bo'yicha normallash (μ=0, σ=1)", "Har Conv dan keyin"], ["Weight Decay (L2)", "Katta vaznlarni jazolash λ‖W‖²", "AdamW / SGD ichida"], ["Data Augmentation", "Flip, Crop, MixUp, CutMix", "DataLoader da"], ["Early Stopping", "Val loss o'sa boshlaganda to'xtash", "Training loopda"]], en: [["Dropout", "Zero random activations at rate p", "FC & heads (off in eval)"], ["BatchNorm", "Normalize activations per mini-batch", "After Conv layers"], ["Weight Decay (L2)", "Penalize large weights λ‖W‖²", "Optimizer"], ["Augmentation", "Flip, Crop, MixUp, CutMix", "Train pipeline"], ["Early Stopping", "Halt at min validation loss", "Checkpoint saving"]] } } },
      { title: { uz: "PyTorch Kod: To'liq Train/Eval & CrossEntropy", en: "PyTorch Walkthrough: Logits Loss & Eval Mode" }, code: `criterion = nn.CrossEntropyLoss(label_smoothing=0.1)
optimizer = torch.optim.AdamW(model.parameters(), lr=3e-4, weight_decay=1e-2)
# Train: optimizer.zero_grad(); loss = criterion(model(x), y); loss.backward(); optimizer.step()
model.eval()
with torch.no_grad():
    probs = torch.softmax(model(test_x), dim=1)` },
      { title: { uz: "Muhokama: Testda Nega Natija O'zgarib Qoladi?", en: "Discussion: Random Predictions at Inference Time" }, discussion: { q: { uz: "O'qitilgan modelni bitta rasm ustida 2 marta ishlatganda har xil javob chiqmoqda. Qaysi muhim PyTorch metodi chaqirilmagan?", en: "Why would calling model(img) twice on the same image return different probabilities?" }, a: { uz: "model.eval() chaqirilmagan! Shuning uchun Dropout har chaqiruvda tasodifiy neyronlarni o'chirib turibdi va BatchNorm ishlamayapti.", en: "Missing model.eval()! Dropout stays stochastically active and BatchNorm uses single-sample batch stats." } } }
    ],
    glossary: [
      { uz: "logitlar", en: "logits", defUz: "Softmax dan oldingi cheklanmagan xom neyron chiqishlari", defEn: "Unnormalized raw network scores prior to Softmax" },
      { uz: "Dropout", en: "Dropout", defUz: "Overfittingni oldini olish uchun o'qitishda tasodifiy neyronlarni o'chirish", defEn: "Randomly zeroing activations during training to prevent co-adaptation" },
      { uz: "Batch Normalization", en: "Batch Normalization", defUz: "Mini-batch bo'yicha aktivatsiyalarni normallashtirib o'qitishni barqarorlash", defEn: "Normalizing layer activations per batch for faster, stable convergence" }
    ],
    quiz: [
      { q: { uz: "Logitlar z=[2.0, 1.0, 0.1] uchun Softmax ning 1-sinf ehtimolligi taxminan qancha?", en: "For logits z=[2.0, 1.0, 0.1], what is the Softmax probability of class 1?" }, options: [{ label: 'A', uz: "0.242", en: "0.242" }, { label: 'B', uz: "0.659 (65.9%)", en: "0.659 (65.9%)" }, { label: 'C', uz: "0.900", en: "0.900" }, { label: 'D', uz: "0.333", en: "0.333" }], answer: 'B', explanation: { uz: "e^2 / (e^2 + e^1 + e^0.1) = 7.389 / 11.212 ≈ 0.659.", en: "7.389 / 11.212 ≈ 0.659." } },
      { q: { uz: "PyTorch da nn.CrossEntropyLoss() qo'llanganda tarmoq oxiriga alohida Softmax qo'yish kerakmi?", en: "When using PyTorch nn.CrossEntropyLoss(), should you add a Softmax layer to the model output?" }, options: [{ label: 'A', uz: "Yo'q, CrossEntropyLoss ichida LogSoftmax bor — xom logitlar uzatiladi", en: "No, CrossEntropyLoss includes LogSoftmax internally — pass raw logits" }, { label: 'B', uz: "Ha, albatta", en: "Yes, always" }, { label: 'C', uz: "Faqat ReLU qo'yiladi", en: "Use ReLU" }, { label: 'D', uz: "Faqat binary da", en: "Binary only" }], answer: 'A', explanation: { uz: "Ikki marta softmax qo'llash sonli beqarorlik va gradient buzilishiga olib keladi.", en: "Passing raw logits avoids double-softmax numerical instability." } },
      { q: { uz: "Dropout regularizatsiyasi o'qitishda qanday ishlaydi?", en: "How does Dropout prevent overfitting during training?" }, options: [{ label: 'A', uz: "Har iteratsiyada tasodifiy foiz neyronlarni vaqtincha o'chirib, bog'liqlikni kamaytiradi", en: "Randomly zeroes a fraction of neurons each step so features don't co-adapt" }, { label: 'B', uz: "Tasvirlarni o'chiradi", en: "Deletes images" }, { label: 'C', uz: "LR ni 10x oshiradi", en: "Multiplies LR by 10" }, { label: 'D', uz: "Yadro o'lchamini kengaytiradi", en: "Expands kernel" }], answer: 'A', explanation: { uz: "Dropout neyronlarning o'zaro haddan tashqari moslashuvini oldini oladi.", en: "Dropout acts like training an ensemble of thinned subnetworks." } },
      { q: { uz: "Validation to'plamidagi yo'qotish o'sishni boshlaganda o'qitishni to'xtatish usuli nima deyiladi?", en: "Stopping training as soon as validation loss starts rising is called?" }, options: [{ label: 'A', uz: "Early Stopping", en: "Early Stopping" }, { label: 'B', uz: "Weight Decay", en: "Weight Decay" }, { label: 'C', uz: "Gradient Clipping", en: "Gradient Clipping" }, { label: 'D', uz: "Knowledge Distillation", en: "Knowledge Distillation" }], answer: 'A', explanation: { uz: "Early stopping overfitting boshlangan nuqtada eng yaxshi umumlashtirish holatini saqlaydi.", en: "Early stopping saves weights at peak validation generalization." } }
    ],
    matching: [
      { left: { uz: "Softmax", en: "Softmax" }, right: { uz: "Logitlarni yig'indisi 1 ehtimollikka aylantirish", en: "Converts logits into normalized probabilities" } },
      { left: { uz: "Dropout", en: "Dropout" }, right: { uz: "O'qitishda tasodifiy neyronlarni o'chirish", en: "Randomly drops activations to reduce overfitting" } },
      { left: { uz: "BatchNorm", en: "BatchNorm" }, right: { uz: "Mini-batch aktivatsiyalarini normallashtirish", en: "Normalizes layer inputs per mini-batch" } },
      { left: { uz: "Gradient Clipping", en: "Gradient Clipping" }, right: { uz: "Portlab ketuvchi gradientni cheklash", en: "Caps exploding gradients above a threshold" } }
    ],
    fillGap: [
      { text: { uz: "PyTorch o'qitish tsiklida har batch boshida eski gradientlarni tozalash uchun optimizer.___() chaqiriladi.", en: "At each training step in PyTorch, old gradients are cleared via optimizer.___()." }, answer: ['zero_grad'] },
      { text: { uz: "Ko'p sinfli klassifikatsiyada standart yo'qotish funksiyasi ___ hisoblanadi.", en: "The standard multi-class classification loss paired with Softmax is ___." }, answer: ['Cross-Entropy', 'kross-entropiya', 'CrossEntropyLoss'] },
      { text: { uz: "Bilim distillyatsiyasida Softmax ehtimolliklarini yumshatish uchun ___ parametri ishlatiladi.", en: "In knowledge distillation, Softmax sharpness is tuned via the ___ parameter." }, answer: ['temperatura', 'temperature', 'T'] }
    ]
  },

  // ==================== M18 ====================
  {
    id: 18,
    code: 'M18',
    labId: 18,
    hours: 2,
    keywords: ['LeNet', 'AlexNet', 'VGG', 'GoogLeNet', 'Inception', 'ResNet', 'Skip Connection', 'EfficientNet', 'Transfer Learning'],
    title: {
      uz: "Zamonaviy CNN arxitekturalari (LeNet, AlexNet, VGG, ResNet)",
      en: "Modern CNN Architectures: LeNet, AlexNet, VGG, ResNet & EfficientNet"
    },
    description: {
      uz: "LeNet-5 (1998), AlexNet (2012), VGG (3×3 filtrlar falsafasi), GoogLeNet/Inception, ResNet qoldiq bloklari (degradatsiya muammosi, bottleneck) va EfficientNet/SENet.",
      en: "LeNet-5 (1998), AlexNet (2012), VGG (3×3 philosophy), GoogLeNet/Inception, ResNet skip connections & bottleneck blocks, SENet, and EfficientNet."
    },
    refs: [
      { label: "COMP4423 L7: AlexNet, VGG & ResNet", url: "https://github.com/lookwei/COMP4423" },
      { label: "MS CV Recipes: Transfer Learning", url: "https://github.com/microsoft/computervision-recipes" },
      { label: "D2L.ai Ch. 8: Modern CNNs", url: "https://d2l.ai/" }
    ],
    sections: [
      {
        heading: { uz: "18.1. Klassik Evolyutsiya: LeNet-5 → AlexNet → VGG → GoogLeNet", en: "18.1. CNN Evolution: LeNet-5 → AlexNet → VGG → GoogLeNet" },
        bodyHtml: {
          uz: "<p>• <strong>LeNet-5 (1998, Yann LeCun):</strong> 60K parametr, 5×5 Conv + AvgPool + Tanh — AQSH bank cheklarini o'qigan ilk sanoat CNN.<br>• <strong>AlexNet (2012, Krizhevsky et al.):</strong> 60M parametr, 8 qatlam, <strong>ReLU + Dropout + Data Augmentation + 2 GPU</strong> — ImageNet Top-5 xatoligini 26.2% dan 15.3% ga tushirdi.<br>• <strong>VGG-16/19 (2014, Oxford):</strong> Yagona dizayn — faqat <strong>3×3 Conv ($P=1$) + 2×2 MaxPool</strong>! 138M parametr (ko'pi FC qatlamlarda).<br>• <strong>GoogLeNet / Inception (2014):</strong> 1×1, 3×3, 5×5 filtrlarni parallel qo'llab, <strong>1×1 bottleneck</strong> orqali parametrni atigi 6.8M gacha tushirdi!</p>",
          en: "<p>• <strong>LeNet-5 (1998):</strong> 60K params, pioneered Conv+Pool+FC on digits.<br>• <strong>AlexNet (2012):</strong> 60M params, ReLU + Dropout + GPUs slashed ImageNet error from 26.2% to 15.3%.<br>• <strong>VGG-16 (2014):</strong> Clean homogeneous <strong>3×3 Conv</strong> stack (138M params).<br>• <strong>GoogLeNet (2014):</strong> Multi-branch Inception blocks with 1×1 reduction (only 6.8M params).</p>"
        }
      },
      {
        heading: { uz: "18.2. ResNet (2015): Degradatsiya Muammosi & Qoldiq Bog'lanishlar", en: "18.2. ResNet (2015): Degradation Problem & Skip Connections" },
        bodyHtml: {
          uz: "<p>VGG da chuqurlikni 19 dan 56 qatlamga oshirganda kutilmagan <strong>degradatsiya muammosi</strong> yuz berdi: hatto <em>o'qitish xatosi (training error)</em> ham ortib ketdi (bu overfitting emas, chunki 56-qatlamli tarmoq identiklik funksiyasini ham o'rganishga qiynaladi!).<br><strong>ResNet (Kaiming He, 2015):</strong> Kirishni to'g'ridan-to'g'ri chiqishga qo'shish: $y = \\mathcal{F}(x) + x$. Natijada gradient orqaga $\\frac{\\partial y}{\\partial x} = \\frac{\\partial \\mathcal{F}}{\\partial x} + 1$ ko'rinishida hech so'nmasdan oqadi — 152 qatlam ImageNet da 3.57% xatolik berdi!</p><p><strong>ResNet-50+ Bottleneck:</strong> $1\\times 1$ (256→64 siqish) → $3\\times 3$ (64→64) → $1\\times 1$ (64→256 tiklash). Keyingi bosqichlar: <strong>DenseNet</strong> (concat), <strong>SENet</strong> (channel attention), <strong>EfficientNet</strong> (compound scaling) va <strong>ConvNeXt</strong>.</p>",
          en: "<p>Simply stacking 56 plain layers causes <strong>degradation</strong>: training error rises above 20 layers! <strong>ResNet (2015)</strong> added identity <strong>skip connections</strong> $y = \\mathcal{F}(x) + x$, ensuring gradient term $+1$ flows cleanly back through 152+ layers! ResNet-50 uses <strong>1×1→3×3→1×1 bottleneck</strong> blocks.</p>"
        },
        latex: "y = \\mathcal{F}(x, \\{W_i\\}) + x \\implies \\frac{\\partial \\mathcal{L}}{\\partial x} = \\frac{\\partial \\mathcal{L}}{\\partial y}\\left(\\frac{\\partial \\mathcal{F}}{\\partial x} + I\\right)",
        widget: 'resnet-skip'
      },
      {
        heading: { uz: "18.3. Sonli Misol (Doskada): 2×(3×3) vs 1×(5×5) va Conv vs FC", en: "18.3. Worked Example: VGG 3×3 Savings & Conv vs FC Params" },
        bodyHtml: {
          uz: "<p><strong>Masala 1 (VGG 3×3 falsafasi, $C$ kanalli):</strong><br>• Bitta $5\\times 5$ qatlam parametr soni: $5\\cdot 5\\cdot C\\cdot C = \\mathbf{25 C^2}$ (1 ta ReLU).<br>• Ikkita $3\\times 3$ qatlam bir xil $5\\times 5$ ko'rish maydoni beradi, lekin parametrlari: $2 \\times (3\\cdot 3\\cdot C\\cdot C) = \\mathbf{18 C^2}$ (<strong>28% kam</strong> + 2 ta ReLU!).<br><strong>Masala 2 (Conv vs FC parametrlar):</strong><br>• $3\\times 3$, $C_{\\text{in}}=3, C_{\\text{out}}=64$ Conv qatlami: $(3\\cdot 3\\cdot 3 + 1)\\times 64 = 28\\times 64 = \\mathbf{1,792}$ ta.<br>• Taqqoslash: $224\\times 224\\times 3$ ni $4096$ FC ga ulash $= \\mathbf{616,562,688}$ ta (<strong>344,000× ko'p!</strong>).</p>",
          en: "<p><strong>1. VGG Receptive Field Savings ($C$ channels):</strong> One 5×5 layer uses $25C^2$ weights vs two stacked 3×3 layers taking $18C^2$ (<strong>28% fewer</strong> + twice the nonlinearity).<br><strong>2. Conv vs FC:</strong> First 3×3→64 conv takes $(27+1)\\times 64 = \\mathbf{1,792}$ params vs $224^2\\cdot 3 \\times 4096 = \\mathbf{616.5\\text{M}}$ for dense FC!</p>"
        }
      },
      {
        heading: { uz: "18.4. Transfer Learning: TorchVision ResNet-50 Fine-Tuning Kodi", en: "18.4. Transfer Learning: Pretrained ResNet Fine-Tuning in PyTorch" },
        bodyHtml: {
          uz: "<p>Kichik datasetlarda (500–5000 rasm, masalan <em>PlantVillage</em> barg kasalliklari) noldan CNN o'qitilmaydi! ImageNet da o'qitilgan <strong>ResNet / EfficientNet / MobileNet</strong> olinib, bosh qatlami yangi sinflar soniga almashtiriladi (<strong>Transfer Learning</strong>).</p>",
          en: "<p>On small custom datasets (500–5,000 images), never train from scratch: load pretrained ImageNet weights from <code>torchvision.models</code> and replace the final <code>model.fc</code> classifier head (<strong>Transfer Learning</strong>).</p>"
        },
        code: `import torch, torch.nn as nn
import torchvision.models as models

# Pretrained ResNet-18 ni yuklash va 5 ta sinfga moslash
model = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)
for param in model.parameters():
    param.requires_grad = False  # Feature extractor ni muzlatish

model.fc = nn.Linear(model.fc.in_features, 5)  # Faqat boshni o'qitish!
trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
print("Yangi FC trainable params:", trainable)  # 512*5 + 5 = 2565`
      },
      {
        heading: { uz: "18.5. Muhokama: Mobil Ilova uchun VGG-16 vs MobileNetV3 vs ResNet-50", en: "18.5. Discussion: Choosing Backbones for Edge vs Server" },
        bodyHtml: {
          uz: "<p>Smartfon / Raspberry Pi uchun 138M parametrli VGG-16 (~528 MB!) mutlaqo yaramaydi → Depthwise Separable <strong>MobileNetV3 / EfficientNet-B0</strong> (~4–5M parametr) tanlanadi.</p>",
          en: "<p>VGG-16 (~528 MB, 138M weights) never fits embedded edge budgets; deploy <strong>MobileNetV3</strong> or <strong>EfficientNet-B0</strong> (~4–5M params).</p>"
        },
        discussion: {
          q: { uz: "Agar sizga Raspberry Pi 4 da qishloq xo'jaligi barg kasalliklarini oflayn aniqlash kerak bo'lsa, VGG-16, ResNet-152 va MobileNetV3 dan qaysi birini tanlaysiz va nega?", en: "To classify crop leaf diseases offline on a Raspberry Pi 4, which backbone should you deploy: VGG-16, ResNet-152, or MobileNetV3?" },
          a: { uz: "MobileNetV3: Depthwise Separable konvolyutsiya tufayli ResNet-152 dan 15–20× kam FLOPs va atigi ~5 MB xotira egallaydi, Transfer Learning bilan esa ≥95% aniqlikka erishadi.", en: "MobileNetV3: Depthwise separable convolutions run 15–20× faster in ~5 MB while achieving >95% accuracy with ImageNet transfer learning." }
        }
      }
    ],
    slides: [
      { title: { uz: "18.1. CNN Arxitekturalari Evolyutsiyasi (1998–2024)", en: "18.1. Landmark CNN Timeline (1998–2024)" }, table: { headers: { uz: ["Model", "Yil", "Parametr", "Asosiy Yangilik"], en: ["Model", "Year", "Params", "Key Innovation"] }, rows: { uz: [["LeNet-5", "1998", "60K", "Ilk Conv+Pool zanjiri (MNIST)"], ["AlexNet", "2012", "60M", "ReLU + Dropout + GPU → DL portlashi"], ["VGG-16", "2014", "138M", "Bir xil 3×3 Conv bloklari falsafasi"], ["GoogLeNet", "2014", "6.8M", "Parallel Inception + 1×1 bottleneck"], ["ResNet-50", "2015", "25.6M", "Skip Connections (y=F(x)+x), 152 qatlam"]], en: [["LeNet-5", "1998", "60K", "Pioneering Conv+Pool pipeline"], ["AlexNet", "2012", "60M", "ReLU + Dropout + Multi-GPU"], ["VGG-16", "2014", "138M", "Uniform stacked 3×3 kernels"], ["GoogLeNet", "2014", "6.8M", "Inception multi-branch + 1×1 bottleneck"], ["ResNet-50", "2015", "25.6M", "Identity skip shortcuts enabling depth"]] } } },
      { title: { uz: "VGG Falsafasi: Ikkita 3×3 vs Bitta 5×5", en: "VGG Insight: Two 3×3s Beat One 5×5" }, points: { uz: ["Ikkita 3×3 qatlamning qabul qilish maydoni (Receptive Field) bitta 5×5 ga teng", "Parametrlar (C=1): 2×(3×3) = 18 vs 1×(5×5) = 25 → 28% tejamkorlik!", "Ikki marta ReLU qo'llanadi → qaror funksiyasi kuchliroq nochiziqli"], en: ["Two stacked 3×3 layers match one 5×5 receptive field", "28% fewer parameters (18C² vs 25C²) + extra ReLU nonlinearity"] } },
      { title: { uz: "ResNet: Degradatsiya Muammosi & y = F(x) + x", en: "ResNet: Degradation Problem & Skip Highways" }, latex: "y = \\mathcal{F}(x) + x \\implies \\frac{\\partial y}{\\partial x} = \\frac{\\partial \\mathcal{F}}{\\partial x} + 1", points: { uz: ["56-qatlamli oddiy tarmoq 20-qatlamdan yomonroq o'qitiladi (degradatsiya)", "Skip connection qatlamga faqat qoldiq F(x) = y - x ni o'rganishni osonlashtiradi", "Backprop da '+1' tufayli gradient hech qachon 0 ga so'nmaydi!", "ResNet-50 Bottleneck: 1×1 siqish → 3×3 → 1×1 kengaytirish"], en: ["Deep plain nets fail optimization (degradation), not overfitting", "Skip connections pass gradient term +1 unimpeded through 152 layers", "Bottleneck 1×1 → 3×3 → 1×1 minimizes 3×3 FLOPs"] } },
      { title: { uz: "Interaktiv ResNet Skip Connection Taqqoslagichi", en: "Interactive ResNet Skip Connection Explorer" }, widget: 'resnet-skip' },
      { title: { uz: "GoogLeNet Inception, SENet, EfficientNet & ConvNeXt", en: "Beyond ResNet: Inception, SENet & EfficientNet" }, points: { uz: ["DenseNet: oldingi barcha qatlamlarni birlashtirish (concat)", "SENet: Squeeze-and-Excitation — kanallarga e'tibor (Channel Attention)", "EfficientNet: Depth + Width + Resolution ni birga kengaytirish (Compound Scaling)", "ConvNeXt (2022): ViT g'oyalari (7×7 Depthwise, GELU, LayerNorm) bilan yangilangan CNN"], en: ["DenseNet concatenates features across depths", "SENet reweights channels dynamically (Squeeze & Excitation)", "EfficientNet balances depth/width/resolution via compound scaling"] } },
      { title: { uz: "Sonli Misol: Conv vs FC Parametrlar Soni", en: "Worked Example: Parameter Explosion in VGG FC" }, points: { uz: ["1-qatlam Conv (3×3, C_in=3, C_out=64): (3×3×3 + 1)×64 = 1,792 parametr", "VGG-16 FC-1 (512×7×7 = 25,088 → 4096 neyron): 102.7 MILLION parametr!", "Demak VGG-16 ning 90% xotirasi faqat oxirgi FC qatlamlarda yotadi → GAP kerak!"], en: ["Conv1 (3×3, 3→64): only 1,792 weights", "VGG-16 FC1 (25,088→4096): 102.7 MILLION weights (90% of VGG! → replaced by GAP in ResNet)"] } },
      { title: { uz: "Transfer Learning: Pretrained ResNet-18 Fine-Tuning", en: "Transfer Learning Code: Freezing & Replacing Head" }, code: `model = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)
for p in model.parameters():
    p.requires_grad = False  # Backbone ni muzlatish
model.fc = nn.Linear(model.fc.in_features, 5)  # 5 sinf uchun yangi bosh` },
      { title: { uz: "Muhokama: Edge / Raspberry Pi uchun Model Tanlash", en: "Discussion: Selecting Backbones Under Edge Constraints" }, discussion: { q: { uz: "Barg kasalliklarini Raspberry Pi da real vaqtda aniqlash uchun VGG-16 va MobileNetV3 dan qaysi birini olasiz?", en: "Why choose MobileNetV3 over VGG-16 for an offline Raspberry Pi crop disease detector?" }, a: { uz: "MobileNetV3 (~5 MB, Depthwise Separable) 20× tezroq va Transfer Learning bilan yuqori aniqlik beradi; VGG-16 (~528 MB) CPU da o'ta sekin.", en: "MobileNetV3 (~5 MB) runs ~20× faster on CPU than 528 MB VGG-16 while hitting high accuracy via transfer learning." } } }
    ],
    glossary: [
      { uz: "degradatsiya muammosi", en: "degradation problem", defUz: "Juda chuqur oddiy tarmoqlarda o'qitish xatosining o'zi ortib ketishi", defEn: "Training error rising in overly deep plain networks" },
      { uz: "qoldiq bog'lanish", en: "skip connection", defUz: "ResNet da y = F(x) + x orqali gradientni to'g'ri uzatish", defEn: "Identity shortcut y = F(x) + x aiding gradient flow" },
      { uz: "bottleneck bloki", en: "bottleneck block", defUz: "Kanallarni kamaytirib-kengaytiruvchi 1×1 → 3×3 → 1×1 bloki", defEn: "1×1 → 3×3 → 1×1 channel-compressing residual block" }
    ],
    quiz: [
      { q: { uz: "ResNet modelidagi qoldiq bog'lanishlar (skip connections) qaysi muammoni hal qildi?", en: "Which problem did ResNet's skip connections solve?" }, options: [{ label: 'A', uz: "Chuqur tarmoqlardagi degradatsiya va gradient so'nishini", en: "Deep network degradation and vanishing gradients" }, { label: 'B', uz: "RGB→HSV o'tkazishni", en: "RGB→HSV conversion" }, { label: 'C', uz: "JPEG siqishni", en: "JPEG compression" }, { label: 'D', uz: "Shaxmat taxtasi kalibrlashni", en: "Chessboard calibration" }], answer: 'A', explanation: { uz: "y = F(x) + x orqali gradient orqaga to'siqsiz oqadi va 152+ qatlam o'qitiladi.", en: "Identity shortcuts create an unimpeded gradient path for 152+ layers." } },
      { q: { uz: "VGG modelida bitta 5×5 filtr o'rniga ikkita ketma-ket 3×3 filtr ishlatishning afzalligi nima?", en: "Why does VGG stack two 3×3 filters instead of one 5×5 filter?" }, options: [{ label: 'A', uz: "Bir xil 5×5 qabul qilish maydonini kamroq parametr (18 vs 25) va ko'proq ReLU bilan beradi", en: "Same 5×5 receptive field with fewer parameters (18 vs 25) & extra nonlinearity" }, { label: 'B', uz: "Poolingni o'chiradi", en: "Removes pooling" }, { label: 'C', uz: "Faqat 1 ta kanal ishlatadi", en: "1 channel only" }, { label: 'D', uz: "Softmax ni almashtiradi", en: "Replaces Softmax" }], answer: 'A', explanation: { uz: "2×(3×3) = 18 < 25 parametr va orada qo'shimcha ReLU qatlami mavjud.", en: "Two 3×3 layers use 28% fewer weights per channel and add a ReLU layer." } },
      { q: { uz: "1998-yilda Yann LeCun tomonidan qo'lda yozilgan raqamlarni tanish uchun yaratilgan model qaysi?", en: "Which 1998 CNN by Yann LeCun pioneered handwritten digit recognition?" }, options: [{ label: 'A', uz: "LeNet-5", en: "LeNet-5" }, { label: 'B', uz: "AlexNet", en: "AlexNet" }, { label: 'C', uz: "ResNet-50", en: "ResNet-50" }, { label: 'D', uz: "YOLOv8", en: "YOLOv8" }], answer: 'A', explanation: { uz: "LeNet-5 bank cheklarini o'qishda qo'llanilgan ilk muvaffaqiyatli CNN edi.", en: "LeNet-5 was deployed commercially for bank check digit reading." } },
      { q: { uz: "ResNet-50 dagi 'bottleneck' bloki qanday konvolyutsiya qatlamlaridan tuzilgan?", en: "What layers make up a ResNet-50 bottleneck block?" }, options: [{ label: 'A', uz: "1×1 → 3×3 → 1×1", en: "1×1 → 3×3 → 1×1" }, { label: 'B', uz: "7×7 → 7×7", en: "7×7 → 7×7" }, { label: 'C', uz: "5×5 → MaxPool", en: "5×5 → MaxPool" }, { label: 'D', uz: "Faqat FC", en: "FC only" }], answer: 'A', explanation: { uz: "Avval 1×1 kanallarni siqadi, 3×3 asosiy svyortkani bajaradi, oxirgi 1×1 tiklaydi.", en: "1×1 reduces channels, 3×3 processes features, 1×1 restores channel depth." } }
    ],
    matching: [
      { left: { uz: "LeNet-5 (1998)", en: "LeNet-5 (1998)" }, right: { uz: "Ilk amaliy CNN (60K parametr, MNIST)", en: "First practical CNN for digit recognition" } },
      { left: { uz: "AlexNet (2012)", en: "AlexNet (2012)" }, right: { uz: "ReLU + Dropout + 2 GPU bilan ImageNet g'olibi", en: "ImageNet breakthrough with ReLU & GPUs" } },
      { left: { uz: "VGG-16 (2014)", en: "VGG-16 (2014)" }, right: { uz: "Bir xil 3×3 konvolyutsiya bloklari (138M)", en: "Uniform stacked 3×3 conv architecture" } },
      { left: { uz: "ResNet (2015)", en: "ResNet (2015)" }, right: { uz: "y = F(x) + x qoldiq bog'lanishlar (152 qatlam)", en: "Identity skip connections enabling 152+ layers" } }
    ],
    fillGap: [
      { text: { uz: "ResNet qoldiq blokining asosiy tenglamasi y = F(x) + ___ ko'rinishida yoziladi.", en: "The core ResNet residual block equation is y = F(x) + ___." }, answer: ['x'] },
      { text: { uz: "EfficientNet chuqurlik, kenglik va rasm o'lchamini birga moslovchi ___ scaling usulini taklif qildi.", en: "EfficientNet scales depth, width, and resolution jointly via ___ scaling." }, answer: ['compound'] },
      { text: { uz: "SENet har bir xususiyat kanaliga dinamik vazn beruvchi ___ attention mexanizmini kiritdi.", en: "SENet introduced ___ attention to reweight feature channels dynamically." }, answer: ['channel', 'kanal'] }
    ]
  },

  // ==================== M19 ====================
  {
    id: 19,
    code: 'M19',
    labId: 19,
    hours: 2,
    keywords: ['R-CNN', 'Fast R-CNN', 'Faster R-CNN', 'RPN', 'Anchor Boxes', 'RoI Pooling', 'FPN', 'Focal Loss', 'IoU'],
    title: {
      uz: "Chuqur o'qitish asosida obyektlarni aniqlash (R-CNN oilasi)",
      en: "Deep Object Detection: R-CNN, Fast R-CNN & Faster R-CNN"
    },
    description: {
      uz: "R-CNN (Selective Search) → Fast R-CNN (RoI Pooling) → Faster R-CNN (RPN + Anchor qutilar), FPN (turli masshtab), Focal Loss, IoU va DETR / Anchor-free.",
      en: "R-CNN → Fast R-CNN (RoI Pooling) → Faster R-CNN (RPN & Anchors), Feature Pyramid Network (FPN), Focal Loss, IoU, Soft-NMS, and DETR."
    },
    refs: [
      { label: "COMP4423 L10: Detection & R-CNN", url: "https://github.com/lookwei/COMP4423" },
      { label: "MS CV Recipes: Object Detection", url: "https://github.com/microsoft/computervision-recipes" },
      { label: "Awesome CV: Object Detection", url: "https://github.com/jbhuang0604/awesome-computer-vision" }
    ],
    sections: [
      {
        heading: { uz: "19.1. Ikki Bosqichli Detektorlar: R-CNN → Fast R-CNN → Faster R-CNN", en: "19.1. Two-Stage Detectors: R-CNN → Fast R-CNN → Faster R-CNN" },
        bodyHtml: {
          uz: "<p>• <strong>R-CNN (Girshick, 2014):</strong> Selective Search bilan ~2000 ta nomzod qirqim olib, har birini alohida CNN dan o'tkazardi (~47 s/rasm — o'ta sekin!).<br>• <strong>Fast R-CNN (2015):</strong> Butun tasvirni CNN dan atigi <em>bir marta</em> o'tkazib, umumiy xaritadan <strong>RoI Pooling</strong> orqali mintaqalarni kesib oldi (~100× tezroq).<br>• <strong>Faster R-CNN (Ren et al., 2015):</strong> Sekin Selective Search ni tarmoq ichidagi <strong>RPN (Region Proposal Network)</strong> bilan almashtirdi — har piksel pozitsiyasida turli o'lcham va nisbatli <strong>Ankor qutilar (Anchor Boxes)</strong> obyekt bor-yo'qligini tekshiradi!</p>",
          en: "<p>• <strong>R-CNN (2014):</strong> Selective Search ~2,000 crops passed individually through CNN (~47 s/img).<br>• <strong>Fast R-CNN (2015):</strong> Single backbone forward pass + <strong>RoI Pooling</strong> (~100× faster).<br>• <strong>Faster R-CNN (2015):</strong> Replaces Selective Search with learned <strong>RPN</strong> evaluating multi-scale/aspect <strong>Anchor Boxes</strong> end-to-end!</p>"
        }
      },
      {
        heading: { uz: "19.2. Obyekt Aniqlash Qiyinchiliklari: FPN, RoIAlign, Focal Loss & DETR", en: "19.2. Core Detection Tricks: FPN, RoIAlign, Focal Loss & DETR" },
        bodyHtml: {
          uz: "<p>1) <strong>Masshtab farqi:</strong> <strong>FPN (Feature Pyramid Network)</strong> chuqur semantik xaritalarni yuqori aniqlikdagi sayoz xaritalar bilan birlashtirib kichik obyektlarni ham yaxshi taniydi.<br>2) <strong>RoIAlign:</strong> Kvantlash yaxlitlashsiz aniq bilineyar interpolyatsiya.<br>3) <strong>Sinf nomutanosibligi:</strong> 100,000+ fon ankorlarining gradientni bosib ketmasligi uchun <strong>Focal Loss</strong> $(1-p_t)^\\gamma \\log(p_t)$ qo'llaniladi.<br>4) <strong>NMS siz aniqlash:</strong> Bipartite matching li transformer <strong>DETR (Carion et al.)</strong>!</p>",
          en: "<p><strong>FPN</strong> fuses high-res spatial maps with rich semantics for tiny objects. <strong>RoIAlign</strong> eliminates quantization misalignment. <strong>Focal Loss</strong> down-weights easy background anchors. Modern <strong>DETR</strong> predicts sets directly with transformers—no anchors or NMS needed!</p>"
        },
        latex: "\\text{IoU} = \\frac{\\text{Area}(A \\cap B)}{\\text{Area}(A \\cup B)}, \\quad \\text{mAP} = \\frac{1}{C}\\sum_{c=1}^{C} \\text{AP}_c",
        widget: 'iou-sim'
      },
      {
        heading: { uz: "19.3. Sonli Misol (Doskada): IoU va Bbox Regressiya", en: "19.3. Worked Example: Exact IoU Box Overlap" },
        bodyHtml: {
          uz: "<p><strong>Berilgan:</strong> Haqiqiy quti $A = [x_1=0, y_1=0, x_2=4, y_2=4]$ (maydon $= 4\\times 4 = 16$), Bashorat $B = [x_1=2, y_1=2, x_2=6, y_2=6]$ (maydon $= 4\\times 4 = 16$).<br>1. Kesishma koordinatalari: $x_{\\text{left}} = \\max(0, 2) = 2,\\ y_{\\text{top}} = \\max(0, 2) = 2$; $x_{\\text{right}} = \\min(4, 6) = 4,\\ y_{\\text{bottom}} = \\min(4, 6) = 4$.<br>2. Kesishma maydoni: $(4 - 2) \\times (4 - 2) = 2\\times 2 = \\mathbf{4}$.<br>3. Birlashma maydoni: $16 + 16 - 4 = \\mathbf{28}$.<br>4. $\\text{IoU} = 4 / 28 = 1/7 \\approx \\mathbf{0.143}$ (14.3% — bu $\\text{IoU} &lt; 0.5$ bo'lgani uchun <em>False Positive</em> hisoblanadi!).</p>",
          en: "<p><strong>Given:</strong> GT $A=[0,0,4,4]$ (area 16), Pred $B=[2,2,6,6]$ (area 16).<br>1. Intersection box: $[\\max(0,2),\\max(0,2),\\min(4,6),\\min(4,6)] = [2,2,4,4] \\implies$ Area $= \\mathbf{4}$.<br>2. Union $= 16 + 16 - 4 = \\mathbf{28}$.<br>3. $\\text{IoU} = 4/28 \\approx \\mathbf{0.143}$ (False Positive at 0.50 threshold!).</p>"
        },
        code: `import torch, torchvision.ops as ops
from torchvision.models.detection import fasterrcnn_resnet50_fpn, FasterRCNN_ResNet50_FPN_Weights

box_a = torch.tensor([[0.0, 0.0, 4.0, 4.0]])
box_b = torch.tensor([[2.0, 2.0, 6.0, 6.0]])
print("IoU(A, B):", round(ops.box_iou(box_a, box_b).item(), 4))  # 0.1429

# Pretrained Faster R-CNN + ResNet50 FPN inference misoli
det = fasterrcnn_resnet50_fpn(weights=FasterRCNN_ResNet50_FPN_Weights.DEFAULT).eval()
with torch.no_grad():
    out = det([torch.rand(3, 320, 480)])[0]
print("Outputs keys:", list(out.keys()))  # ['boxes', 'labels', 'scores']`
      },
      {
        heading: { uz: "19.4. Keys-Muhokama: COCO mAP@[0.5:0.95] vs PASCAL mAP@0.5", en: "19.4. Discussion: COCO Strict mAP@[0.5:0.95] & Soft-NMS" },
        bodyHtml: {
          uz: "<p>PASCAL VOC faqat $\\text{IoU} \\ge 0.5$ ni tekshirsa, COCO <strong>10 ta chegarada</strong> ($0.50, 0.55, \\dots, 0.95$) o'rtacha mAP oladi — bu aniq chegarali qutini talab qiladi. Zich to'plangan obyektlarda (olomon, javondagi mahsulot) oddiy NMS qo'shni haqiqiy obyektni o'chirib yuboradi → <strong>Soft-NMS</strong> ishonch ballini asta pasaytirib saqlab qoladi.</p>",
          en: "<p>COCO averages AP across 10 IoU thresholds from 0.50 to 0.95, rewarding tight box localization. In dense crowds, <strong>Soft-NMS</strong> decays overlapping confidence scores smoothly instead of deleting neighboring objects.</p>"
        },
        discussion: {
          q: { uz: "Odamlar gavjum bozor tasvirida yonma-yon turgan 2 ta piyodaning bounding box lari IoU=0.62 bilan ustma-ust tushsa, threshold=0.5 bo'lgan oddiy NMS nima qiladi va yechim nima?", en: "If two pedestrians standing side-by-side overlap with IoU=0.62, what does standard NMS (threshold=0.5) do and how can we fix it?" },
          a: { uz: "Oddiy NMS ikkinchi odamning qutisini bitta obyekt deb o'ylab o'chirib yuboradi (FN!). Yechim: Soft-NMS qo'llash yoki NMS threshold ni 0.65–0.70 ga ko'tarish (yoki NMS-siz DETR).", en: "Standard NMS deletes the lower-scoring pedestrian box as a duplicate! Fix via Soft-NMS, higher IoU NMS threshold (0.65+), or NMS-free DETR." }
        }
      }
    ],
    slides: [
      { title: { uz: "19.1. R-CNN → Fast R-CNN → Faster R-CNN", en: "19.1. Evolution of Two-Stage Object Detectors" }, table: { headers: { uz: ["Model", "Mintaqa Taklifi", "CNN Chaqiruvi", "Tezlik"], en: ["Model", "Proposals", "Backbone Runs", "Speed"] }, rows: { uz: [["R-CNN (2014)", "Selective Search (CPU)", "~2,000 / rasm", "~47 s/rasm"], ["Fast R-CNN (2015)", "Selective Search", "1 / rasm + RoI Pool", "~2 s/rasm"], ["Faster R-CNN (2015)", "Ichki RPN tarmog'i", "1 / rasm (End-to-End)", "~0.1–0.2 s/rasm"]], en: [["R-CNN (2014)", "Selective Search", "2,000 per image", "~47 s/img"], ["Fast R-CNN (2015)", "Selective Search", "1 per image + RoI Pool", "~2 s/img"], ["Faster R-CNN (2015)", "Learned RPN", "1 end-to-end", "~0.1–0.2 s/img"]] } } },
      { title: { uz: "RPN (Region Proposal Network) & Anchor Boxes", en: "Region Proposal Network (RPN) & Anchor Boxes" }, points: { uz: ["Har feature map nuqtasida k ta (masalan 3 o'lcham × 3 nisbat = 9) ankor quti", "2 ta bosh: (a) Obyekt vs Fon tasnifi; (b) Bounding box (dx, dy, dw, dh) regressiyasi", "RoIAlign (Mask R-CNN da): butun son yaxlitlashsiz aniq bilineyar qirqish"], en: ["At each cell, evaluate k anchors (3 scales × 3 aspect ratios)", "Two heads: objectness score + bbox delta regression (dx, dy, dw, dh)", "RoIAlign removes integer rounding quantization errors"] } },
      { title: { uz: "FPN, Focal Loss va DETR (Transformer Detection)", en: "FPN, Focal Loss & Anchor/NMS-Free DETR" }, points: { uz: ["FPN (Feature Pyramid Network): sayoz yuqori aniqlik + chuqur semantika → kichik obyektlar!", "Focal Loss: FL = -(1 - p_t)^γ log(p_t) — oson fon ankorlari jarimasini kamaytiradi", "DETR: Bipartite Hungarian matching + Transformer (Ankor va NMS siz!)"], en: ["FPN fuses top-down semantics with high-res bottom layers for tiny objects", "Focal Loss down-weights easy negatives under severe anchor imbalance", "DETR eliminates anchors & NMS via set prediction"] } },
      { title: { uz: "IoU (Intersection over Union) & mAP Baholash", en: "IoU & COCO mAP Evaluation" }, latex: "\\text{IoU} = \\frac{|A \\cap B|}{|A \\cup B|}, \\qquad \\text{COCO mAP@[0.5:0.95]}", points: { uz: ["IoU ≥ 0.5 → True Positive (TP@0.5), aks holda False Positive (FP)", "AP: Precision-Recall egri chizig'i ostidagi maydon; mAP: sinflar bo'yicha o'rtacha", "COCO 10 ta IoU (0.50, 0.55, ..., 0.95) da qat'iy lokalizatsiyani tekshiradi"], en: ["IoU ≥ 0.5 marks True Positive; AP integrates Precision-Recall curve", "COCO averages mAP across 10 IoU thresholds (0.50..0.95)"] } },
      { title: { uz: "Interaktiv IoU (Intersection over Union) Simulatori", en: "Interactive IoU Simulator" }, widget: 'iou-sim' },
      { title: { uz: "Sonli Misol (Doskada): Box A & B IoU Hisoblash", en: "Worked Example: Exact Box IoU Calculation" }, points: { uz: ["Box A = [0, 0, 4, 4] (maydon = 16); Box B = [2, 2, 6, 6] (maydon = 16)", "Kesishma: [max(0,2), max(0,2), min(4,6), min(4,6)] = [2, 2, 4, 4]", "Kesishma maydoni = (4-2)×(4-2) = 4", "Birlashma = 16 + 16 - 4 = 28 → IoU = 4/28 ≈ 0.143 (FP!)"], en: ["A=[0,0,4,4] (area 16), B=[2,2,6,6] (area 16)", "Intersection [2,2,4,4] = 4, Union = 28 → IoU = 4/28 ≈ 0.143!"] } },
      { title: { uz: "PyTorch / TorchVision Kod: box_iou & Faster R-CNN", en: "PyTorch Code: torchvision.ops.box_iou & Faster R-CNN" }, code: `import torch, torchvision.ops as ops
box_a = torch.tensor([[0., 0., 4., 4.]])
box_b = torch.tensor([[2., 2., 6., 6.]])
print("IoU:", ops.box_iou(box_a, box_b).item())  # 0.1429
# NMS chaqiruvi:
keep = ops.nms(boxes, scores, iou_threshold=0.5)` },
      { title: { uz: "Muhokama: Gavjum Olomonda Standart NMS Muammosi", en: "Discussion: Standard NMS vs Soft-NMS in Crowds" }, discussion: { q: { uz: "Yonma-yon turgan 2 odam IoU=0.62 bilan ustma-ust tushsa, IoU=0.50 chegarali NMS nima xato qiladi?", en: "What failure happens when two adjacent pedestrians overlap at IoU=0.62 under standard NMS (0.50)?" }, a: { uz: "NMS pastroq balli ikkinchi odam qutisini to'liq o'chirib yuboradi! Soft-NMS ishonchni asta kamaytirib ikkalasini ham saqlashi mumkin.", en: "Hard NMS deletes the second valid pedestrian box! Soft-NMS smoothly decays scores or DETR avoids NMS altogether." } } }
    ],
    glossary: [
      { uz: "RPN", en: "Region Proposal Network", defUz: "Xususiyat xaritasidan nomzod bounding box taklif qiluvchi mini-tarmoq", defEn: "Conv subnetwork proposing candidate object regions via anchors" },
      { uz: "ankor qutilar", en: "anchor boxes", defUz: "Har bir pozitsiyada oldindan berilgan turli o'lcham/nisbatdagi ramkalar", defEn: "Predefined multi-scale/aspect reference boxes at each grid cell" },
      { uz: "IoU", en: "Intersection over Union", defUz: "Kesishma maydonining birlashma maydoniga nisbati", defEn: "Ratio of overlap area to union area between two boxes" }
    ],
    quiz: [
      { q: { uz: "R-CNN dan Fast R-CNN ga o'tishda tezlik qanday qilib yuzlab marta oshirildi?", en: "How did Fast R-CNN achieve >100× speedup over R-CNN?" }, options: [{ label: 'A', uz: "Butun tasvirni CNN dan faqat 1 marta o'tkazib, umumiy xaritadan RoI Pooling bilan kesib olish orqali", en: "Running the CNN once per image and extracting proposals via RoI Pooling" }, { label: 'B', uz: "CNN ni olib tashlab", en: "Removing CNN" }, { label: 'C', uz: "Faqat kulrang rasm ishlatib", en: "Grayscale only" }, { label: 'D', uz: "Haar kaskad bilan", en: "Using Haar" }], answer: 'A', explanation: { uz: "2000 ta mintaqa CNN hisobini o'zaro baham ko'radi (feature sharing).", en: "Sharing backbone conv computation across all ~2000 RoIs." } },
      { q: { uz: "Faster R-CNN da Selective Search o'rnini bosgan tarmoq qanday ataladi?", en: "Which network replaced Selective Search in Faster R-CNN?" }, options: [{ label: 'A', uz: "Region Proposal Network (RPN)", en: "Region Proposal Network (RPN)" }, { label: 'B', uz: "U-Net", en: "U-Net" }, { label: 'C', uz: "PCA", en: "PCA" }, { label: 'D', uz: "KNN", en: "KNN" }], answer: 'A', explanation: { uz: "RPN xususiyat xaritasidan ankorlar yordamida nomzod qutilarni o'zi taklif qiladi.", en: "RPN generates object proposals end-to-end inside the CNN." } },
      { q: { uz: "Box A=[0,0,4,4] va Box B=[2,2,6,6] bo'lsa, IoU qiymati nechaga teng?", en: "What is the IoU between Box A=[0,0,4,4] and Box B=[2,2,6,6]?" }, options: [{ label: 'A', uz: "0.500", en: "0.500" }, { label: 'B', uz: "0.143 (4/28)", en: "0.143 (4/28)" }, { label: 'C', uz: "0.250", en: "0.250" }, { label: 'D', uz: "0.750", en: "0.750" }], answer: 'B', explanation: { uz: "Kesishish = 2×2 = 4; Birlashma = 16 + 16 - 4 = 28 → IoU = 4/28 ≈ 0.143.", en: "Intersection = 4, Union = 16 + 16 - 4 = 28 → IoU = 4/28 ≈ 0.143." } },
      { q: { uz: "Obyekt aniqlashda minglab fon ankorlari (class imbalance) muammosini yumshatuvchi maxsus yo'qotish funksiyasi qaysi?", en: "Which loss function addresses foreground-background class imbalance in dense object detectors?" }, options: [{ label: 'A', uz: "Focal Loss", en: "Focal Loss" }, { label: 'B', uz: "MSE", en: "MSE" }, { label: 'C', uz: "PSNR", en: "PSNR" }, { label: 'D', uz: "Hough Loss", en: "Hough Loss" }], answer: 'A', explanation: { uz: "Focal Loss oson fon misollarning vaznini kamaytirib qiyin obyektlarga e'tibor beradi.", en: "Focal Loss down-weights easy negatives so training focuses on hard examples." } }
    ],
    matching: [
      { left: { uz: "Fast R-CNN", en: "Fast R-CNN" }, right: { uz: "Yagona CNN + RoI Pooling", en: "Shared conv feature map + RoI Pooling" } },
      { left: { uz: "Faster R-CNN", en: "Faster R-CNN" }, right: { uz: "RPN bilan to'liq end-to-end 2-bosqichli aniqlash", en: "End-to-end 2-stage detection with RPN" } },
      { left: { uz: "FPN", en: "FPN" }, right: { uz: "Ko'p masshtabli obyektlarni piramida orqali aniqlash", en: "Multi-scale feature pyramid fusion" } },
      { left: { uz: "DETR", en: "DETR" }, right: { uz: "Transformer asosidagi NMS-siz to'plam bashorati", en: "NMS-free transformer set prediction" } }
    ],
    fillGap: [
      { text: { uz: "Faster R-CNN birinchi bosqichda takliflarni yaratuvchi tarmoq ___ deb ataladi.", en: "Faster R-CNN's first-stage proposal generator is the ___." }, answer: ['RPN', 'Region Proposal Network'] },
      { text: { uz: "Obyekt aniqlashda bir nechta ioU chegaralarida Precision-Recall o'rtacha maydoni ___ metrikasini beradi.", en: "Mean Average Precision across classes and IoU thresholds is abbreviated ___." }, answer: ['mAP'] },
      { text: { uz: "Obyekt chegaralovchi to'rtburchak ingliz tilida ___ box deb ataladi.", en: "The rectangular box enclosing a detected object is a ___ box." }, answer: ['bounding'] }
    ]
  },

  // ==================== M20 ====================
  {
    id: 20,
    code: 'M20',
    labId: 20,
    hours: 2,
    keywords: ['YOLO', 'Single-Stage', 'Grid', 'YOLOv8', 'SSD', 'FPS', 'Quantization', 'Pruning', 'TensorRT', 'Edge Devices'],
    title: {
      uz: "Real vaqtda obyekt aniqlash tizimlari (YOLO oilasi)",
      en: "Real-Time Object Detection: YOLO Family & Edge Deployment"
    },
    description: {
      uz: "Bir bosqichli (single-stage) YOLO S×S grid prinsipi, YOLOv1 → YOLOv8 evolyutsiyasi (Mosaic, FPN, Anchor-free), SSD, mAP vs FPS, Quantization/Pruning va TensorRT/ONNX.",
      en: "Single-stage YOLO S×S grid regression, YOLOv1–v8 evolution (Mosaic, FPN, Anchor-free), SSD, mAP vs FPS, Quantization/Pruning, and TensorRT/ONNX edge optimization."
    },
    refs: [
      { label: "COMP4423 L10: YOLO Detection", url: "https://github.com/lookwei/COMP4423" },
      { label: "MS CV Recipes: Fast Detection & Deployment", url: "https://github.com/microsoft/computervision-recipes" },
      { label: "Ultralytics YOLOv8 Docs", url: "https://docs.ultralytics.com" }
    ],
    sections: [
      {
        heading: { uz: "20.1. Bir Bosqichli YOLO Prinsipi: S×S To'r va Regressiya", en: "20.1. Single-Stage YOLO Principle: S×S Grid Regression" },
        bodyHtml: {
          uz: "<p>Faster R-CNN RPN va tasniflash boshini ketma-ket ishlatib yuqori aniqlik bersa-da, real vaqtda sekinlik qiladi. <strong>YOLO (You Only Look Once, Redmon 2016)</strong> tasvirni bitta forward pass da $S\\times S$ katakchalar to'riga bo'ladi: har bir katakcha o'z ichiga markazi tushgan obyektning $(x, y, w, h, \\text{conf}, C_1\\dots C_K)$ vektorini bevosita regressiya qiladi, so'ngra <strong>NMS</strong> qo'llaniladi.</p><p><strong>Bir bosqichli hamkorlari:</strong> <em>SSD (Single Shot MultiBox Detector)</em> ko'p qatlamli xaritalardan to'g'ridan-to'g'ri box chiqaradi; <em>RetinaNet</em> esa Focal Loss bilan bir bosqichli aniqlash aniqligini R-CNN ga tenglashtirdi.</p>",
          en: "<p>While two-stage Faster R-CNN excels at precision, <strong>YOLO (2016)</strong> turns detection into a single regression over an $S\\times S$ grid: each cell whose bounds contain an object's center predicts $(x,y,w,h,\\text{conf}, \\text{classes})$ in one shot, followed by <strong>NMS</strong>.</p>"
        },
        latex: "\\text{Score} = P(\\text{Object}) \\cdot \\text{IoU}_{\\text{pred}}^{\\text{truth}}, \\qquad \\text{Tensor} = S \\times S \\times (B\\cdot 5 + C)"
      },
      {
        heading: { uz: "20.2. YOLOv1 → YOLOv8/v11 Evolyutsiyasi (Mosaic, FPN, Anchor-Free)", en: "20.2. YOLO Evolution: v1 to v8/v11 (Mosaic, FPN & Anchor-Free)" },
        bodyHtml: {
          uz: "<p>• <strong>YOLOv1 (2016):</strong> Kichik va to'p obyektlarda qiynalgan (katak boshiga 2 quti).<br>• <strong>YOLOv2–v3:</strong> BatchNorm, Anchor Boxes, Darknet-53 va 3 masshtabli FPN.<br>• <strong>YOLOv4–v5:</strong> PyTorch ekotizimi, <strong>Mosaic augmentation</strong> (4 rasm birga → kichik obyektlarga kuchli!) va CSPDarknet.<br>• <strong>YOLOv8 / v11:</strong> <strong>Anchor-free</strong> bosh (ankor giperparametrlari yo'q!), C2f/C3k2 modullari va <code>n/s/m/l/x</code> o'lchamlar (detection + instance segmentation + pose).</p>",
          en: "<p>From YOLOv1 (2 boxes/cell) → v3 (3-scale FPN) → v5 (<strong>Mosaic augmentation</strong> + PyTorch) → <strong>v8/v11</strong> (<strong>anchor-free</strong> split heads supporting detection, segmentation &amp; pose across nano-to-xlarge scales).</p>"
        }
      },
      {
        heading: { uz: "20.3. Sonli Misol (Doskada): YOLO Grid Katakchasi va Chiqish Tensori", en: "20.3. Worked Example: YOLO Grid Cell Assignment & Tensor Size" },
        bodyHtml: {
          uz: "<p><strong>Berilgan:</strong> Kirish o'lchami $448 \\times 448$ px, to'r $S = 7 \\times 7$, $B = 2$ ta bounding box/katak, $C = 20$ ta PASCAL VOC sinfi.<br>1. Bitta katakcha o'lchami: $448 / 7 = \\mathbf{64 \\times 64\\text{ piksel}}$.<br>2. Obyekt markazi $(x_c=300, y_c=150)$ px bo'lsin. Qaysi katak javobgar?<br>• Ustun indeksi: $\\lfloor 300 / 64 \\rfloor = \\mathbf{4}$ ($0..6$ oralig'ida).<br>• Qator indeksi: $\\lfloor 150 / 64 \\rfloor = \\mathbf{2}$.<br>• Katak ichidagi nisbiy siljish: $x_{\\text{rel}} = (300 - 4\\times 64)/64 = 44/64 = \\mathbf{0.6875}$, $y_{\\text{rel}} = (150 - 128)/64 = \\mathbf{0.3438}$.<br>3. Chiqish tensori o'lchami: $7 \\times 7 \\times (2\\times 5 + 20) = \\mathbf{7 \\times 7 \\times 30}$!</p>",
          en: "<p><strong>Given $448\\times 448$ image, $S=7\\times 7$, $B=2$, $C=20$:</strong><br>Cell size $= 64\\times 64$ px. Center $(300, 150)$ belongs to col $= \\lfloor 300/64\\rfloor = \\mathbf{4}$, row $= \\lfloor 150/64\\rfloor = \\mathbf{2}$, with normalized local offset $(0.6875, 0.3438)$. Output tensor is $7\\times 7\\times (2\\cdot 5 + 20) = \\mathbf{7\\times 7\\times 30}$!</p>"
        }
      },
      {
        heading: { uz: "20.4. Real-Vaqt Optimizatsiya: Quantization, Pruning & TensorRT Kodi", en: "20.4. Edge Optimization: INT8 Quantization, Pruning & ONNX/TensorRT" },
        bodyHtml: {
          uz: "<p>Edge qurilmalarda (NVIDIA Jetson, Raspberry Pi, dronlar) 30+ FPS ga erishish uchun: <strong>Quantization</strong> (FP32 → FP16/INT8 — 2–4× tezlik va 4× kichik model), <strong>Structured Pruning</strong> (kam foydali kanallarni qirqish), <strong>Knowledge Distillation</strong> va <strong>ONNX Runtime / TensorRT</strong> eksporti ishlatiladi.</p>",
          en: "<p>Accelerate edge deployment via <strong>FP16/INT8 Quantization</strong> (2–4× speedup), <strong>Pruning</strong>, <strong>Knowledge Distillation</strong>, and compiling models via <strong>ONNX / TensorRT</strong>.</p>"
        },
        code: `# Ultralytics YOLOv8 tezkor o'qitish, baholash va ONNX/TensorRT eksporti
# pip install ultralytics
from ultralytics import YOLO

# model = YOLO("yolov8n.pt")  # eng yengil nano model (3.2M params)
# results = model.predict("road.jpg", conf=0.35, iou=0.5, imgsz=640)
# model.export(format="onnx", half=True)  # Edge deploy uchun FP16 ONNX eksport
print("YOLOv8n Grid strides: [8, 16, 32] -> 640px da 80x80, 40x40, 20x20!")`
      },
      {
        heading: { uz: "20.5. Keys-Muhokama: End-to-End FPS vs Model Latency Tuzog'i", en: "20.5. Discussion: Model FPS vs End-to-End Pipeline Latency" },
        bodyHtml: {
          uz: "<p>Ko'pchilik faqat GPU inferensiyasini o'lchab '100 FPS!' deydi, lekin real tizimda video dekodlash + resize + CPU-GPU ko'chirish + <strong>NMS</strong> + chizish qo'shilganda umumiy FPS 25 ga tushishi mumkin. Doimo <strong>end-to-end latency</strong> ni o'lchang!</p>",
          en: "<p>Always benchmark <strong>end-to-end latency</strong> (capture + resize + H2D copy + forward + NMS + rendering), not raw GPU forward-pass timing alone!</p>"
        },
        discussion: {
          q: { uz: "Agar GPU da YOLOv8n 5 ms ishlasa-yu, har kadrda 1000 ta ortiqcha qutiga CPU da NMS 25 ms vaqt olsa va kamera dekodlash 10 ms bo'lsa, tizim necha FPS ishlaydi?", en: "If GPU forward takes 5 ms, CPU NMS takes 25 ms, and decoding takes 10 ms, what is the true end-to-end FPS?" },
          a: { uz: "Umumiy vaqt = 5 + 25 + 10 = 40 ms → Haqiqiy tezlik = 1000 / 40 = 25 FPS (200 FPS emas!). Demak NMS ni ham GPU da yoki TensorRT EfficientNMS plaginida bajarish shart.", en: "Total latency = 40 ms → true speed = 1000/40 = 25 FPS! Move NMS/pre-processing onto GPU via TensorRT EfficientNMS." }
        }
      }
    ],
    slides: [
      { title: { uz: "20.1. Bir Bosqichli vs Ikki Bosqichli Detektorlar", en: "20.1. Two-Stage (Faster R-CNN) vs Single-Stage (YOLO)" }, table: { headers: { uz: ["Mezon", "Faster R-CNN", "YOLO (Bir bosqichli)"], en: ["Aspect", "Faster R-CNN", "YOLO (Single-Stage)"] }, rows: { uz: [["Bosqichlar", "RPN takliflar → RoI bosh", "Yagona to'g'ridan-to'g'ri forward pass"], ["Tezlik", "~5–15 FPS (sekinroq)", "~30–140+ FPS (real-vaqt)"], ["Kichik obyektlar", "Juda yuqori (FPN+RoIAlign)", "Yaxshi (FPN/Mosaic bilan v5–v8)"]], en: [["Pipeline", "RPN Proposals → RoI Head", "Single unified forward pass"], ["Speed", "~5–15 FPS", "30–140+ FPS (Real-time)"], ["Tiny Objects", "Very strong", "Strong with FPN + Mosaic"]] } } },
      { title: { uz: "YOLO S×S Grid Mexanizmi", en: "How YOLO's S×S Grid Regression Works" }, latex: "\\text{Tensor} = S \\times S \\times (B \\cdot 5 + C)", points: { uz: ["1. Kirish S×S katakchalar to'riga bo'linadi", "2. Har katakcha markazi unga tushgan obyektni bashorat qiladi", "3. Har katak B ta quti (x, y, w, h, conf) + C ta sinf ehtimolini chiqaradi", "4. Yakunda barcha qutilar ustida NMS qo'llanilib takrorlar o'chiriladi"], en: ["Grid cell owning the object's center predicts (x,y,w,h,conf) & class probs", "Merged via Non-Maximum Suppression (NMS) at the end"] } },
      { title: { uz: "Sonli Misol (Doskada): 7×7 Grid & 448×448", en: "Worked Example: Grid Assignment & Tensor Shape" }, points: { uz: ["Rasm 448×448, S=7×7 → har katak = 448/7 = 64×64 piksel", "Obyekt markazi (300, 150) px:", "Ustun = ⌊300 / 64⌋ = 4; Qator = ⌊150 / 64⌋ = 2", "B=2, C=20 da chiqish tensori = 7 × 7 × (2×5 + 20) = 7 × 7 × 30"], en: ["448×448 with 7×7 grid → 64×64 cells", "Center (300,150) → col 4, row 2 | Output tensor = 7×7×30"] } },
      { title: { uz: "YOLOv1 dan YOLOv8/v11 gacha Evolyutsiya", en: "YOLO Evolution (v1 → v3 → v5 → v8/v11)" }, points: { uz: ["YOLOv1 (2016): Bitta 7×7 grid, kichik obyektlarda cheklangan", "YOLOv3 (2018): 3 xil masshtab (FPN — 80×80, 40×40, 20×20)", "YOLOv4/v5: Mosaic (4 rasm birga), PyTorch, tezkor CSPDarknet", "YOLOv8/v11: Anchor-free bosh (qo'lda ankor sozlash shart emas!)"], en: ["v1: single 7×7 grid; v3: 3-scale FPN; v4/v5: Mosaic + PyTorch", "v8/v11: Anchor-free decoupled heads for detect, segment & pose"] } },
      { title: { uz: "Edge AI Tezlashtirish: Quantization, Pruning & TensorRT", en: "Deploying on Edge Devices: INT8, Pruning & TensorRT" }, points: { uz: ["Quantization (FP32 → FP16 / INT8): hajm 4× kichik, tezlik 2–4× yuqori!", "Pruning: foydasiz kanal/filtrlarni kesib FLOPs ni kamaytirish", "Knowledge Distillation: katta teacher → yengil student", "ONNX Runtime / NVIDIA TensorRT (Jetson Orin, Raspberry Pi, mobil NPU)"], en: ["FP32 → INT8 Quantization cuts memory 4× and boosts throughput 2–4×", "Pruning & Distillation slim models cleanly; export via ONNX / TensorRT"] } },
      { title: { uz: "Ultralytics YOLOv8 Kod & ONNX Eksporti", en: "Python Code: YOLOv8 Inference & FP16 ONNX Export" }, code: `from ultralytics import YOLO
model = YOLO("yolov8n.pt")  # 3.2M parametr
results = model.predict("traffic.jpg", conf=0.35, iou=0.5, imgsz=640)
model.export(format="onnx", half=True)  # Edge inferensiya uchun` },
      { title: { uz: "End-to-End Latency Byudjeti & Muhokama", en: "Discussion: Model Time vs End-to-End System FPS" }, discussion: { q: { uz: "GPU da model 5 ms ishlasa-yu, CPU da NMS 25 ms va dekodlash 10 ms olsa, tizim necha FPS beradi?", en: "If GPU forward takes 5 ms, CPU NMS 25 ms, and decoding 10 ms, what is the actual pipeline FPS?" }, a: { uz: "Jami 40 ms → 1000/40 = 25 FPS! Shuning uchun pre-processing va NMS ni ham GPU/TensorRT ga o'tkazish zarur.", en: "Total 40 ms → 25 FPS! Accelerate preprocessing and NMS on GPU/TensorRT too." } } }
    ],
    glossary: [
      { uz: "bir bosqichli detektor", en: "single-stage detector", defUz: "RPN siz to'g'ridan-to'g'ri bir forward pass da aniqlovchi model (YOLO, SSD)", defEn: "Detector predicting boxes & classes in one pass without RPN" },
      { uz: "kvantlash (model)", en: "quantization", defUz: "FP32 vaznlarni tezlashtirish uchun FP16/INT8 ga o'tkazish", defEn: "Reducing weight precision from FP32 to INT8/FP16 for speedup" },
      { uz: "kechikish (latency)", en: "latency", defUz: "Bitta kadrni to'liq qayta ishlashga ketadigan vaqt (ms)", defEn: "End-to-end time (ms) to process a single frame" }
    ],
    quiz: [
      { q: { uz: "YOLO algoritmi nima uchun 'bir bosqichli' (single-stage) aniqlovchi deb ataladi?", en: "Why is YOLO called a 'single-stage' object detector?" }, options: [{ label: 'A', uz: "Alohida RPN/mintaqa taklifi bosqichisiz bitta CNN o'tishda box va sinfni chiqaradi", en: "Predicts boxes and classes in a single CNN pass without a separate proposal stage" }, { label: 'B', uz: "Faqat bitta rasm qabul qiladi", en: "One image only" }, { label: 'C', uz: "Faqat 1 ta obyekt topadi", en: "One object only" }, { label: 'D', uz: "1 qatlamli CNN", en: "1-layer CNN" }], answer: 'A', explanation: { uz: "Tasvirga bir marta qarab (You Only Look Once) S×S to'rda hamma bashorat birga olinadi.", en: "Regresses all grid predictions jointly in one network forward pass." } },
      { q: { uz: "448×448 tasvirda S=7×7 grid ishlatilsa, markazi (300, 150) nuqtada bo'lgan obyekt qaysi katakka (qator, ustun) tushadi?", en: "On a 448×448 image with a 7×7 grid, which (row, col) owns center (300, 150)?" }, options: [{ label: 'A', uz: "(4, 2)", en: "(4, 2)" }, { label: 'B', uz: "(2, 4)", en: "(2, 4)" }, { label: 'C', uz: "(3, 3)", en: "(3, 3)" }, { label: 'D', uz: "(0, 1)", en: "(0, 1)" }], answer: 'B', explanation: { uz: "Katak = 64×64 px. Qator = floor(150/64) = 2; Ustun = floor(300/64) = 4.", en: "Cell size = 64. Row = floor(150/64) = 2, Col = floor(300/64) = 4." } },
      { q: { uz: "To'rtta o'qitish rasmini bitta rasmga qo'shib kichik obyektlarni aniqlashni yaxshilovchi YOLO augmentatsiyasi qaysi?", en: "Which YOLO augmentation combines 4 training images into one to boost small-object detection?" }, options: [{ label: 'A', uz: "Mosaic augmentation", en: "Mosaic augmentation" }, { label: 'B', uz: "Grayscale flip", en: "Grayscale flip" }, { label: 'C', uz: "Median blur", en: "Median blur" }, { label: 'D', uz: "Canny", en: "Canny" }], answer: 'A', explanation: { uz: "Mosaic 4 ta tasvirni birlashtirib turli masshtab va kontekst beradi.", en: "Mosaic tiles 4 images together, enriching scale & background diversity." } },
      { q: { uz: "Edge qurilmalarda YOLO tezligini oshirish uchun vaznlarni FP32 dan INT8 ga tushirish texnikasi nima deyiladi?", en: "Converting FP32 weights to INT8 to speed up edge inference is called?" }, options: [{ label: 'A', uz: "Quantization", en: "Quantization" }, { label: 'B', uz: "Rektifikatsiya", en: "Rectification" }, { label: 'C', uz: "Feathering", en: "Feathering" }, { label: 'D', uz: "Backpropagation", en: "Backpropagation" }], answer: 'A', explanation: { uz: "Model quantization xotira va hisoblash vaqtini keskin kamaytiradi.", en: "Quantization compresses precision to INT8/FP16 for fast inference." } }
    ],
    matching: [
      { left: { uz: "YOLO", en: "YOLO" }, right: { uz: "Bir bosqichli real-vaqt S×S grid detektori", en: "Single-stage real-time S×S grid detector" } },
      { left: { uz: "Mosaic Augmentation", en: "Mosaic Augmentation" }, right: { uz: "4 tasvirni birlashtirib kichik obyektlarni o'rgatish", en: "4-image tiling boosting small-object detection" } },
      { left: { uz: "Pruning", en: "Pruning" }, right: { uz: "Kam ta'sirli vazn/neyronlarni olib tashlash", en: "Removing redundant weights/channels" } },
      { left: { uz: "TensorRT / ONNX", en: "TensorRT / ONNX" }, right: { uz: "Ishlab chiqarish/Edge tezlatish formatlari", en: "Optimized deployment inference runtimes" } }
    ],
    fillGap: [
      { text: { uz: "YOLO qisqartmasi ___ Only Look Once degan ma'noni anglatadi.", en: "YOLO stands for ___ Only Look Once." }, answer: ['You'] },
      { text: { uz: "Inson ko'zi videoni uzluksiz idrok etishi va real vaqt tizimi uchun kamida 24–___ FPS talab qilinadi.", en: "Smooth real-time video perception typically targets at least 24–___ FPS." }, answer: ['30'] },
      { text: { uz: "YOLOv8 kabi zamonaviy versiyalar qo'lda ankor sozlashni yo'qotuvchi ___-free yondashuvdan foydalanadi.", en: "Modern YOLO versions like YOLOv8 use an ___-free detection head." }, answer: ['anchor'] }
    ]
  }
);
