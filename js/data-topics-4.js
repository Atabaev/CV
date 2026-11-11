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
        heading: { uz: "16.1. Konvolyutsiya Qatlami, Vazn Ulashish va Chiqish O'lchami", en: "16.1. Convolutional Layer, Weight Sharing & Output Dimensions" },
        bodyHtml: {
          uz: "<p><strong>Konvolyutsiya qatlami</strong> o'qitiladigan $3\\times 3$ yoki $5\\times 5$ filtrlarni tasvir bo'ylab siljitib <em>faollashuv xaritalari (feature maps)</em> hosil qiladi. <strong>Vazn ulashish (weight sharing)</strong> parametrlar sonini keskin kamaytiradi va <em>tarjima-invariantlik (translation equivariance)</em> beradi.</p><p><strong>Ierarxiya:</strong> dastlabki qatlamlar chekka/rang, o'rta qatlamlar tekstura/shakl, chuqur qatlamlar obyekt qismlarini o'rganadi. Kengaytmalar: <strong>Dilatatsiyalangan (atrous)</strong> conv (parametr qo'shmay <em>receptive field</em> ni kengaytiradi) va <strong>Depthwise Separable</strong> conv (MobileNet asosi).</p>",
          en: "<p>A <strong>Conv layer</strong> slides learnable kernels to produce <em>feature maps</em>. <strong>Weight sharing</strong> drastically slashes parameters and enforces translation equivariance. Special variants include <strong>Dilated (atrous) conv</strong> (expanding receptive field without extra params) and <strong>Depthwise Separable conv</strong> (MobileNet).</p>"
        },
        latex: "O = \\left\\lfloor \\frac{I - K + 2P}{S} \\right\\rfloor + 1",
        widget: 'cnn-shape'
      },
      {
        heading: { uz: "16.2. Pooling Qatlamlari va ReLU Aktivatsiyasi", en: "16.2. Pooling Layers & ReLU / Vanishing Gradient" },
        bodyHtml: {
          uz: "<p><strong>Max Pooling (2×2, stride=2)</strong> o'lchamni yarmiga kamaytirib eng kuchli faollashuvni saqlaydi (parametr qo'shmaydi!). <strong>Global Average Pooling (GAP)</strong> zamonaviy tarmoqlarda katta FC qatlamlarni almashtiradi.</p><p><strong>Aktivatsiya:</strong> Sigmoid va tanh da <em>yo'qolib boruvchi gradient (vanishing gradient)</em> kuzatiladi. <strong>ReLU</strong> $f(x)=\\max(0,x)$ musbat sohada gradient=1 berib bu muammoni hal qildi; <em>dying ReLU</em> uchun <strong>Leaky ReLU</strong> ($\\max(\\alpha x, x)$) va <strong>GELU</strong> ishlatiladi.</p>",
          en: "<p><strong>Max Pooling (2×2, stride 2)</strong> halves spatial size while retaining dominant activations (zero learnable weights). <strong>Global Average Pooling</strong> replaces heavy FC layers in modern backbones.</p><p><strong>ReLU</strong> $f(x)=\\max(0,x)$ cures the <em>vanishing gradient</em> problem of sigmoid/tanh; <strong>Leaky ReLU</strong> and <strong>GELU</strong> prevent <em>dying ReLU</em> neurons.</p>"
        }
      }
    ],
    slides: [
      { title: { uz: "M16: CNN Arxitekturasi (Conv, Pooling, ReLU)", en: "M16: CNN Architecture (Conv, Pooling, ReLU)" }, subtitle: { uz: "KOK1506 · COMP4423 L7 · CS231n", en: "KOK1506 · COMP4423 L7 · CS231n" }, points: { uz: ["Konvolyutsiya: vazn ulashish, stride S, padding P, receptive field", "Chiqish o'lchami: O = floor((I - K + 2P) / S) + 1", "Max Pooling vs Average Pooling vs Strided Conv", "Sigmoid (vanishing gradient) → ReLU / Leaky ReLU / GELU"], en: ["Convolution: weight sharing, stride S, padding P, receptive field", "Output size formula: O = floor((I - K + 2P) / S) + 1", "Max Pooling vs Average Pooling vs Strided Conv", "Sigmoid (vanishing gradient) → ReLU / Leaky ReLU / GELU"] } },
      { title: { uz: "Interaktiv CNN Chiqish O'lchami Kalkulyatori", en: "Interactive CNN Output Shape Calculator" }, widget: 'cnn-shape' }
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
        heading: { uz: "17.1. To'liq Bog'langan Qatlamlar va Softmax Funksiyasi", en: "17.1. Fully Connected Layers & Softmax Probabilities" },
        bodyHtml: {
          uz: "<p>Konvolyutsiya xususiyat xaritasi 1D vektorga tekislanib (<code>flatten</code>) <strong>FC (Fully Connected)</strong> qatlamga beriladi. Ammo FC qatlamlar juda ko'p parametr yegani uchun ResNet/GoogLeNet da <em>Global Average Pooling</em> afzal ko'riladi.</p><p><strong>Softmax</strong> xom chiqish qiymatlarini (<strong>logitlar</strong>) yig'indisi 1 ga teng ehtimollik taqsimotiga o'tkazadi. PyTorch da <code>nn.CrossEntropyLoss()</code> log-sum-exp barqarorligi uchun Softmax va log-yo'qotishni ichki birlashtiradi.</p>",
          en: "<p>After flattening feature maps, <strong>FC layers</strong> aggregate global evidence (replaced by <em>Global Average Pooling</em> in ResNet). <strong>Softmax</strong> turns raw <strong>logits</strong> into probabilities summing to 1. PyTorch's <code>nn.CrossEntropyLoss()</code> fuses LogSoftmax + NLLLoss for numerical stability.</p>"
        },
        latex: "p_i = \\text{softmax}(z_i) = \\frac{e^{z_i}}{\\sum_j e^{z_j}}",
        widget: 'softmax-sim'
      },
      {
        heading: { uz: "17.2. O'qitish Tsikli va Overfittingga Qarshi Regularizatsiya", en: "17.2. Training Loop & Regularization Techniques" },
        bodyHtml: {
          uz: "<p>Standart PyTorch tsikli: <code>zero_grad() → forward → loss → backward() → step()</code>. <strong>Learning rate</strong> juda katta bo'lsa tebranadi/portlaydi, kichik bo'lsa sekinlashadi.</p><p><strong>Regularizatsiya:</strong> <strong>Dropout</strong> (tasodifiy 50% neyronni o'chirish), <strong>Weight Decay (L2)</strong>, <strong>Batch Normalization</strong> (mini-batch bo'yicha normallash), <strong>Data Augmentation</strong> va <strong>Early Stopping</strong> (val loss ko'tarila boshlaganda to'xtatish).</p>",
          en: "<p>PyTorch training step: <code>zero_grad() → forward → loss → backward() → step()</code>. Fight overfitting with <strong>Dropout</strong>, <strong>L2 Weight Decay</strong>, <strong>Batch Normalization</strong>, <strong>Data Augmentation</strong>, and <strong>Early Stopping</strong>.</p>"
        }
      }
    ],
    slides: [
      { title: { uz: "M17: CNN O'qitish va Regularizatsiya", en: "M17: Training CNNs & Regularization" }, subtitle: { uz: "KOK1506 · PyTorch · D2L", en: "KOK1506 · PyTorch · D2L" }, points: { uz: ["FC qatlam (flatten) vs Global Average Pooling", "Softmax: logitlarni ehtimollikka aylantirish + CrossEntropyLoss", "Adam / SGD + Learning Rate Schedule", "Dropout, Weight Decay (L2), Batch Norm, Early Stopping"], en: ["FC layers vs Global Average Pooling", "Softmax logits → probabilities + CrossEntropyLoss", "Adam / SGD + Learning Rate Schedules", "Dropout, Weight Decay (L2), Batch Norm, Early Stopping"] } },
      { title: { uz: "Interaktiv Softmax Logitlar Simulatori", en: "Interactive Softmax Probability Simulator" }, widget: 'softmax-sim' },
      { title: { uz: "Sonli Misol: Softmax z = [2.0, 1.0, 0.1]", en: "Worked Example: Softmax z = [2.0, 1.0, 0.1]" }, latex: "e^{2}=7.389,\\ e^{1}=2.718,\\ e^{0.1}=1.105,\\ \\Sigma=11.212 \\implies p=[0.659,\\ 0.242,\\ 0.099]", points: { uz: ["Tekshiruv: 0.659 + 0.242 + 0.099 = 1.000"], en: ["Check: 0.659 + 0.242 + 0.099 = 1.000"] } }
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
        heading: { uz: "18.1. Evolyutsiya: LeNet-5 → AlexNet → VGG → GoogLeNet", en: "18.1. Evolution: LeNet-5 → AlexNet → VGG → GoogLeNet" },
        bodyHtml: {
          uz: "<p><strong>LeNet-5 (1998, LeCun):</strong> 60K parametrli qo'lyozma raqamlar tarmog'i — zamonaviy CNN larning bobosi. <strong>AlexNet (2012):</strong> 8 qatlam, 60M parametr, ReLU + Dropout + 2 GPU → ImageNet top-5 xatosini 26% dan 15% ga tushirdi.</p><p><strong>VGG-16/19 (2014):</strong> Faqat kichik <strong>3×3 filtrlar</strong> zanjiri (ikkita 3×3 = bitta 5×5 maydon, ammo kamroq parametr va qo'shimcha ReLU), jami 138M parametr. <strong>GoogLeNet (2014):</strong> 1×1, 3×3, 5×5 parallel Inception modullari.</p>",
          en: "<p><strong>LeNet-5 (1998):</strong> 60K params, pioneered Conv+Pool+FC for digit recognition. <strong>AlexNet (2012):</strong> 8 layers, 60M params, ReLU + Dropout + multi-GPU crushed ImageNet error from 26% to 15%.</p><p><strong>VGG-16 (2014):</strong> Stacked <strong>3×3 filters</strong> (two 3×3s match a 5×5 receptive field with fewer weights & more nonlinearity), 138M params. <strong>GoogLeNet:</strong> Parallel 1×1/3×3/5×5 Inception branches.</p>"
        }
      },
      {
        heading: { uz: "18.2. ResNet (2015): Degradatsiya Muammosi va Qoldiq Bog'lanishlar", en: "18.2. ResNet (2015): Degradation Problem & Skip Connections" },
        bodyHtml: {
          uz: "<p>20+ qatlamli oddiy tarmoqlarda <strong>degradatsiya muammosi</strong> yuz berdi: o'qitish xatosi ortib ketdi (overfitting emas, optimizatsiya qiyinligi!). <strong>ResNet (Kaiming He, 2015)</strong> har blok chiqishiga kirishni qo'shdi: $y = F(x) + x$.</p><p>Bu gradientga to'g'ridan-to'g'ri 'tezyurar yo'l' berib 152+ qatlamni o'qitdi; ResNet-50/101/152 da 1×1→3×3→1×1 <strong>bottleneck</strong> bloki ishlatiladi. Keyinchalik <strong>SENet</strong> (kanal attention) va <strong>EfficientNet</strong> (compound scaling) yaratildi.</p>",
          en: "<p>Plain nets deeper than ~20 layers suffer <strong>degradation</strong> (higher training error due to optimization difficulty). <strong>ResNet (2015)</strong> introduced identity <strong>skip connections</strong> $y = F(x) + x$, creating an unimpeded gradient highway for 152+ layers using 1×1→3×3→1×1 <strong>bottleneck</strong> blocks.</p>"
        },
        latex: "y = \\mathcal{F}(x, \\{W_i\\}) + x",
        widget: 'resnet-skip'
      }
    ],
    slides: [
      { title: { uz: "M18: Zamonaviy CNN Arxitekturalari", en: "M18: Modern CNN Architectures" }, subtitle: { uz: "KOK1506 · COMP4423 L7 · D2L", en: "KOK1506 · COMP4423 L7 · D2L" }, points: { uz: ["LeNet-5 (1998, 60K) → AlexNet (2012, ReLU+GPU, 60M)", "VGG-16 (2014): 2 ta 3×3 = 1 ta 5×5 maydon (138M)", "GoogLeNet (Inception) & EfficientNet (Compound Scaling)", "ResNet (2015): y = F(x) + x bilan degradatsiya yechimi & Bottleneck"], en: ["LeNet-5 (1998) → AlexNet (2012, ReLU+GPU)", "VGG-16: stacked 3×3 filters", "GoogLeNet (Inception) & EfficientNet (Compound Scaling)", "ResNet (2015): y = F(x) + x skip connections & Bottleneck"] } },
      { title: { uz: "Interaktiv ResNet Skip Connection Taqqoslagichi", en: "Interactive ResNet Skip Connection Explorer" }, widget: 'resnet-skip' },
      { title: { uz: "Sonli Taqqoslash: Conv vs FC Parametrlar Soni", en: "Parameter Efficiency: Conv vs FC" }, points: { uz: ["224×224×3 kirish → 4096 neyronli FC qatlam = 616.57 MILLION parametr!", "3×3×3 kirish, 64 filtrli Conv qatlam = atigi 1,792 parametr (344,000× kam!)"], en: ["224×224×3 → 4096 FC layer = 616.57 MILLION weights!", "3×3×3 → 64 Conv layer = only 1,792 weights (344,000× fewer!)"] } }
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
        heading: { uz: "19.1. R-CNN → Fast R-CNN → Faster R-CNN Evolyutsiyasi", en: "19.1. R-CNN → Fast R-CNN → Faster R-CNN Evolution" },
        bodyHtml: {
          uz: "<p><strong>R-CNN (2014):</strong> Selective Search bilan ~2000 ta mintaqa taklifi olib, har birini alohida CNN dan o'tkazardi — juda sekin (~47 s/tasvir). <strong>Fast R-CNN (2015):</strong> Butun tasvirni CNN dan faqat <em>bir marta</em> o'tkazib, umumiy xususiyat xaritasidan <strong>RoI Pooling</strong> orqali kesib oladi (100× tezroq).</p><p><strong>Faster R-CNN (2015):</strong> Sekin Selective Search ni ham tarmoq ichidagi <strong>Region Proposal Network (RPN)</strong> ga almashtirdi — endi to'liq <em>end-to-end</em> 2-bosqichli detektor!</p>",
          en: "<p><strong>R-CNN (2014)</strong> ran CNN 2,000 times per image (painfully slow). <strong>Fast R-CNN (2015)</strong> runs CNN <em>once</em> and crops proposals via <strong>RoI Pooling</strong>. <strong>Faster R-CNN (2015)</strong> replaces Selective Search with a learned <strong>Region Proposal Network (RPN)</strong> using <strong>anchor boxes</strong>, forming an end-to-end two-stage detector.</p>"
        }
      },
      {
        heading: { uz: "19.2. Obyekt Aniqlash Qiyinchiliklari: FPN, Focal Loss, IoU va DETR", en: "19.2. Detection Challenges: FPN, Focal Loss, IoU & DETR" },
        bodyHtml: {
          uz: "<p><strong>1) Turli masshtablar:</strong> <strong>Feature Pyramid Network (FPN)</strong> past va yuqori qatlamlarni birlashtirib kichik va katta obyektlarni birdek aniqlaydi. <strong>2) Sinf nomutanosibligi:</strong> Minglab fon ankorlarini bosish uchun <strong>Focal Loss</strong> qo'llaniladi. <strong>3) To'silish:</strong> <em>Soft-NMS</em>. <strong>Zamonaviy:</strong> <em>Anchor-free (FCOS/CenterNet)</em> va NMS siz <em>DETR (Detection Transformer)</em>.</p>",
          en: "<p><strong>Scale variance:</strong> solved by <strong>FPN</strong>. <strong>Foreground-background imbalance:</strong> mitigated by <strong>Focal Loss</strong>. <strong>Occlusion:</strong> handled via <em>Soft-NMS</em>. Modern alternatives include anchor-free (CenterNet/FCOS) and NMS-free <em>DETR</em>.</p>"
        },
        latex: "\\text{IoU} = \\frac{\\text{Area}(A \\cap B)}{\\text{Area}(A \\cup B)}",
        widget: 'iou-sim'
      }
    ],
    slides: [
      { title: { uz: "M19: Chuqur Obyekt Aniqlash (R-CNN Oilasi)", en: "M19: Deep Object Detection (R-CNN Family)" }, subtitle: { uz: "KOK1506 · COMP4423 L10 · CV Recipes", en: "KOK1506 · COMP4423 L10 · CV Recipes" }, points: { uz: ["R-CNN (2000 CNN chaqiruv) → Fast R-CNN (1 CNN + RoI Pool) → Faster R-CNN (RPN)", "RPN & Ankor qutilar (masalan, 3 o'lcham × 3 nisbat = 9 ankor)", "FPN (turli masshtab), Focal Loss (fon muvozanati), Soft-NMS", "IoU va COCO mAP@[0.5:0.95] baholash"], en: ["R-CNN → Fast R-CNN (shared CNN + RoI Pool) → Faster R-CNN (RPN)", "RPN & Anchor Boxes (e.g., 3 scales × 3 ratios = 9 anchors)", "FPN, Focal Loss, Soft-NMS & DETR", "IoU and COCO mAP@[0.5:0.95] evaluation"] } },
      { title: { uz: "Interaktiv IoU (Intersection over Union) Simulatori", en: "Interactive IoU Simulator" }, widget: 'iou-sim' }
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
        heading: { uz: "20.1. YOLO (You Only Look Once) Ishlash Prinsipi", en: "20.1. YOLO Single-Stage Grid Principle" },
        bodyHtml: {
          uz: "<p><strong>YOLO (Redmon, 2016)</strong> alohida mintaqa taklifi bosqichisiz tasvirga bir marta qarab, $S\\times S$ kataklar to'rida barcha bounding box va sinf ehtimolliklarini bir vaqtda regressiya qiladi. Obyekt markazi tushgan katakcha shu obyektga mas'ul bo'ladi; yakunda <strong>NMS</strong> ortiqcha qutilarni tozalaydi.</p><p><strong>Evolyutsiya:</strong> YOLOv2 (anchor + BatchNorm), YOLOv3 (Darknet-53 + 3 masshtabli FPN), YOLOv4/v5 (<strong>Mosaic augmentation</strong>, PyTorch), YOLOv8+ (<strong>anchor-free</strong>, tezkor nano/small/medium/large/xlarge modellari).</p>",
          en: "<p><strong>YOLO (2016)</strong> divides the image into an $S\\times S$ grid and predicts boxes + class scores in a single forward pass—the grid cell containing the object center is responsible, followed by <strong>NMS</strong>.</p><p><strong>Evolution:</strong> v2 (anchors, BN), v3 (FPN at 3 scales), v4/v5 (<strong>Mosaic augmentation</strong>, PyTorch), v8+ (<strong>anchor-free</strong>, scalable n/s/m/l/x sizes).</p>"
        },
        callout: {
          type: 'info',
          uz: "<strong>Sonli misol (YOLO 7×7 grid):</strong> 448×448 tasvirda har katak $448/7 = 64\\times 64$ px. Markazi $(300, 150)$ bo'lgan obyekt uchun: ustun $= \\lfloor 300/64 \\rfloor = 4$, qator $= \\lfloor 150/64 \\rfloor = 2$. Demak $(2, 4)$ katakcha mas'ul!",
          en: "<strong>Worked Example (7×7 grid on 448×448):</strong> Each cell is $64\\times 64$ px. Center $(300, 150)$ maps to col $= \\lfloor 300/64 \\rfloor = 4$, row $= \\lfloor 150/64 \\rfloor = 2$."
        }
      },
      {
        heading: { uz: "20.2. Real Vaqt Samaradorligi: Quantization, Pruning & Edge", en: "20.2. Real-Time Efficiency: Quantization, Pruning & Edge AI" },
        bodyHtml: {
          uz: "<p>Real vaqt tizimlari kamida <strong>24–30 FPS</strong> talab qiladi; end-to-end tezlikda (pre-processing + inference + NMS + chizish) ham <strong>latency</strong> (kechikish) va <strong>throughput</strong> o'lchanadi.</p><p><strong>Tezlashtirish texnikalari:</strong> <strong>Quantization</strong> (FP32 → FP16/INT8), <strong>Pruning</strong> (foydasiz vaznlarni qirqish), hamda <strong>ONNX Runtime / NVIDIA TensorRT</strong> ga eksport (Jetson / Raspberry Pi kabi edge qurilmalar uchun).</p>",
          en: "<p>Real-time vision targets <strong>24–30+ FPS</strong> end-to-end (I/O + pre + inference + NMS). Deploy efficiently on edge hardware (Jetson, mobile) using <strong>Quantization</strong> (FP32→INT8), <strong>Pruning</strong>, and <strong>ONNX / TensorRT</strong> engines.</p>"
        }
      }
    ],
    slides: [
      { title: { uz: "M20: Real Vaqtda YOLO Tizimlari", en: "M20: Real-Time YOLO Detection" }, subtitle: { uz: "KOK1506 · COMP4423 L10 · Ultralytics", en: "KOK1506 · COMP4423 L10 · Ultralytics" }, points: { uz: ["Bir bosqichli (single-stage) arxitektura: S×S grid regressiya", "YOLOv1 → v3 (FPN) → v5 (Mosaic) → v8 (Anchor-free)", "End-to-end FPS ≥ 24–30, Latency vs Throughput", "Edge optimizatsiya: Quantization (INT8), Pruning, ONNX/TensorRT"], en: ["Single-stage architecture: S×S grid regression", "YOLOv1 → v3 (FPN) → v5 (Mosaic) → v8 (Anchor-free)", "End-to-end FPS ≥ 24–30, Latency vs Throughput", "Edge optimization: Quantization (INT8), Pruning, ONNX/TensorRT"] } }
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
