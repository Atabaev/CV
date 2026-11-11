// Global i18n, theme, progress state & official KOK1506 Computer Vision syllabus metadata
(function () {
  const STORAGE_LANG = 'cv_course_lang';
  const STORAGE_THEME = 'cv_course_theme';
  const STORAGE_COMPLETED = 'cv_course_completed';
  const STORAGE_QUIZ_SCORES = 'cv_course_quiz_scores';
  const STORAGE_VARIANT = 'cv_student_variant';

  window.CV_TOPICS = window.CV_TOPICS || [];
  window.CV_LABS = window.CV_LABS || [];
  window.CV_TESTBANK = window.CV_TESTBANK || [];

  const UI_STRINGS = {
    uz: {
      brandTitle: "Kompyuterli Ko'rish",
      brandSub: "KOK1506 · ADTI · O'zbekcha & English",
      navHome: "Bosh sahifa",
      navSlides: "Slaydlar (Reveal.js)",
      navLabs: "Amaliy Lablar (A1–A22)",
      navPractice: "Interaktiv CV & Spravka",
      navQuiz: "203 Test & Mashqlar",
      heroPill: "KOK1506 — 6 ECTS — 5-semestr · 180 soat (46M · 44A · 90MT)",
      heroTitle1: "Kompyuterli Ko'rish",
      heroTitle2: "va Tasvirlar Tahlili",
      heroSubtitle: "Andijon Davlat Texnika Instituti 2026-yil o'quv dasturi va O'UM asosida: 23 ta ma'ruza (M1–M23), 22 ta Python/OpenCV/PyTorch amaliy mashg'uloti (A1–A22, har biri 40 variant bilan), Szeliski, HK PolyU COMP4423, Microsoft CV Recipes va 203 ta test banki.",
      heroMeta: "Tuzuvchilar: S. Ibragimov, O. Atabayev · Axborot texnologiyalari kafedrasi · 60610500 Sun'iy intellekt · 2026–2027",
      btnStartSlides: "🎬 M1 Slaydlarni ochish",
      btnOpenLabs: "🧪 Amaliy Lablar (A1–A22)",
      btnPractice: "🔬 Interaktiv CV Lab & Spravka",
      btnStartQuiz: "📝 203 Test Banki & Mashqlar",
      statTopics: "Majburiy Ma'ruza (M1–M23)",
      statLabs: "Amaliy Lab (A1–A22 · 40 var.)",
      statPractice: "Interaktiv Brauzer CV Lab",
      statQuestions: "Test & Interaktiv Mashqlar",
      progressLabel: "Majburiy dastur o'zlashtirish darajasi (M1–M23)",
      progressTopicsDone: "mavzu tugallandi",
      topicsHeading: "Majburiy Ma'ruzalar va Amaliy Mashg'ulotlar (M1–M23 / A1–A22)",
      bonusHeading: "Qo'shimcha Zamonaviy Bob (B1: ViT, Attention, VLM & Generativ CV)",
      searchPlaceholder: "Mavzu, A#, yoki kalit so'z bo'yicha qidirish...",
      hoursUnit: "soat",
      btnStudy: "📖 Ma'ruza (M)",
      btnSlides: "🎬 Slayd",
      btnLab: "🧪 Amaliy (A)",
      btnQuiz: "📝 Mashqlar",
      prereqTitle: "📋 Zarur boshlang'ich bilimlar va TN",
      prereqs: [
        "(DAS1110) Dasturlash 1, 2 (Python, NumPy asoslari)",
        "(EVS1406) Ehtimollik va statistika",
        "Asosiy kutubxonalar: OpenCV, PyTorch, TorchVision, Scikit-Learn, Ultralytics YOLO",
        "Ta'lim natijalari (TN1–TN10): Filtrlash, Xususiyatlar, 3D Geometriya, CNN, YOLO, Segmentatsiya va Tracking"
      ],
      rubricTitle: "🎯 Baholash mezoni (HEMIS — 100 ball)",
      rubricItems: [
        "Dastlabki baholash: 50 ball (Ma'ruza, Amaliy A1–A22, Mustaqil ta'lim 1–9)",
        "Asosiy baholash (Yakuniy nazorat): 50 ball (Yozma ish / 203-test bazasi)",
        "5 baho (A'lo): 90–100 ball | 4 baho (Yaxshi): 70–89.9 ball",
        "3 baho (Qoniqarli): 60–69.9 ball | 2 baho (Qoniqarsiz): 0–59.9 ball"
      ],
      indepTitle: "📚 Mustaqil ta'lim topshiriqlari (1–9, jami 90 soat)",
      indepNote: "Izoh: 1–3-topshiriqlar kichik guruhlarda hamkorlikda (kooperativ) bajariladi. Natijalar GitHub + hisobot (PDF) + himoya shaklida topshiriladi.",
      refsTitle: "📖 Asosiy adabiyotlar, Xalqaro sillabuslar va GitHub Repozitoriylar",
      glossaryTitleHome: "📖 To'liq Izohli Lug'at (Bob III · 175+ atama)",
      sidebarTopics: "Majburiy (M1–M23)",
      sidebarBonus: "Zamonaviy Bob (B1)",
      sidebarLabs: "Amaliy Lablar (A1–A22)",
      markDone: "✓ Mavzuni tugallangan deb belgilash",
      markedDone: "✅ Mavzu tugallangan",
      prevTopic: "← Oldingi mavzu",
      nextTopic: "Keyingi mavzu →",
      openSlidesFull: "🎬 Reveal.js Slaydlarni ochish",
      openLabPage: "🧪 Amaliy Lab sahifasi (A",
      labTitle: "💻 Amaliy mashg'ulot (Python / OpenCV / PyTorch)",
      copyCode: "Nusxalash",
      copied: "Nusxalandi!",
      glossaryTitle: "📖 Mavzuga oid asosiy atamalar (Glossary)",
      termCol: "Atama",
      defCol: "Ta'rif",
      quizTitle: "📝 1-qism: Test savollari (Multiple Choice)",
      quizSubtitle: "Savollar ma'ruza nazariyasi va rasmiy 203 ta test banki asosida tuzilgan.",
      matchTitle: "🔗 2-qism: Moslashtirish mashqi (Matching)",
      matchSubtitle: "Chap ustundagi tushunchani tanlang va o'ng ustundan uning mos ta'rifini bosing.",
      gapTitle: "✍️ 3-qism: Bo'shliqni to'ldiring (Fill in the Gap)",
      gapSubtitle: "Nazariya asosida bo'sh joylarga mos atama yoki qiymatni yozing va tekshiring.",
      checkGaps: "Tekshirish",
      scoreLabel: "Natija",
      resetQuiz: "Qayta boshlash",
      correctMsg: "To'g'ri!",
      wrongMsg: "Noto'g'ri. To'g'ri javob:",
      score: "Natija",
      checkAnswers: "Javoblarni tekshirish",
      tryAgain: "Qayta urinish",
      explanation: "Izoh",
      matchingInstruction: "Chap ustundan tushunchani tanlang, so'ngra o'ng ustundan uning mos ta'rifini bosing.",
      resetMatching: "Qayta aralashtirish",
      fillGapInstruction: "Nazariya asosida bo'sh joylarga mos atama yoki qiymatni yozing va tekshiring.",
      correctAnswer: "To'g'ri javob",
      quizArenaTitle: "203 Test Banki & Interaktiv Mashqlar Arenasi",
      quizArenaDesc: "Rasmiy 203 ta yakuniy nazorat savollari bazasi, aralash 20-savollik tezkor sinov hamda har bir M1–M23 va B1 bo'limi bo'yicha to'liq amaliy mashqlar.",
      part2Title: "Moslashtirish mashqi (Matching)",
      part3Title: "Bo'shliqni to'ldiring (Fill in the Gap)",
      practiceHeroTitle: "Interaktiv Brauzer CV Lab & Tarqatma Materiallar",
      practiceHeroDesc: "Hech qanday o'rnatishsiz brauzerning o'zida RGB/HSV, 3×3 konvolyutsiya, Sobel, Pinhole/Stereo, CNN, IoU/Dice laboratoriyalarini hamda 1–3 tarqatma spravkalarni sinab ko'ring.",
      footerText: "ADTI · KOK1506 Kompyuterli Ko'rish O'quv Platformasi (2026 O'UM, Szeliski, COMP4423 & Microsoft CV Recipes asosida)"
    },
    en: {
      brandTitle: "Computer Vision",
      brandSub: "KOK1506 · ASTI · Uzbek & English",
      navHome: "Home",
      navSlides: "Slides (Reveal.js)",
      navLabs: "Practical Labs (A1–A22)",
      navPractice: "Interactive CV & Sheets",
      navQuiz: "203 Test Bank & Drills",
      heroPill: "KOK1506 — 6 ECTS — Semester 5 · 180 hrs (46M · 44A · 90MT)",
      heroTitle1: "Computer Vision &",
      heroTitle2: "Visual Intelligence",
      heroSubtitle: "Aligned 1-to-1 with the 2026 ASTI KOK1506 Syllabus: 23 Lectures (M1–M23), 22 Python/OpenCV/PyTorch Practical Labs (A1–A22 with 40 student variants each), enriched with Szeliski, HK PolyU COMP4423, Microsoft CV Recipes, and the 203-question Exam Bank.",
      heroMeta: "Authors: S. Ibragimov, O. Atabayev · Dept. of Information Technologies · AI 60610500 · 2026–2027",
      btnStartSlides: "🎬 Launch M1 Slides",
      btnOpenLabs: "🧪 Practical Labs (A1–A22)",
      btnPractice: "🔬 Interactive CV Lab & Cheat Sheets",
      btnStartQuiz: "📝 203 Test Bank & Drills",
      statTopics: "Mandatory Lectures (M1–M23)",
      statLabs: "Practical Labs (A1–A22 · 40 var.)",
      statPractice: "Live Browser CV Simulators",
      statQuestions: "Test Bank & Exercises",
      progressLabel: "Mandatory Syllabus Progress (M1–M23)",
      progressTopicsDone: "topics completed",
      topicsHeading: "Mandatory Lectures & Practical Labs (M1–M23 / A1–A22)",
      bonusHeading: "Bonus Modern Chapter (B1: Attention, Vision Transformers, VLM & Generative CV)",
      searchPlaceholder: "Search topics, A#, or keywords...",
      hoursUnit: "hrs",
      btnStudy: "📖 Lecture (M)",
      btnSlides: "🎬 Slides",
      btnLab: "🧪 Lab (A)",
      btnQuiz: "📝 Exercises",
      prereqTitle: "📋 Prerequisites & Learning Outcomes",
      prereqs: [
        "(DAS1110) Programming 1 & 2 (Python, NumPy fundamentals)",
        "(EVS1406) Probability & Statistics",
        "Core Stack: OpenCV, PyTorch, TorchVision, Scikit-Learn, Ultralytics YOLO",
        "Outcomes (TN1–TN10): Filtering, Features, 3D Geometry, CNNs, YOLO, Segmentation & Video Tracking"
      ],
      rubricTitle: "🎯 Grading Criteria (HEMIS — 100 pts)",
      rubricItems: [
        "Initial Assessment (Dastlabki): 50 pts (Lectures, Practical A1–A22, Independent Projects 1–9)",
        "Final Assessment (Asosiy): 50 pts (Written / 203-Question Test Bank)",
        "Grade 5 (Excellent): 90–100 pts | Grade 4 (Good): 70–89.9 pts",
        "Grade 3 (Satisfactory): 60–69.9 pts | Grade 2 (Fail): 0–59.9 pts"
      ],
      indepTitle: "📚 Independent Study Projects (1–9, 90 hrs total)",
      indepNote: "Note: Projects 1–3 are cooperative small-group projects. Deliverables: GitHub repo + 3–5 page PDF report + live presentation.",
      refsTitle: "📖 Core Textbooks, Top-300 Syllabi & GitHub Repositories",
      glossaryTitleHome: "📖 Full Bilingual Glossary (Chapter III · 175+ terms)",
      sidebarTopics: "Mandatory (M1–M23)",
      sidebarBonus: "Modern Chapter (B1)",
      sidebarLabs: "Practical Labs (A1–A22)",
      markDone: "✓ Mark Topic as Completed",
      markedDone: "✅ Topic Completed",
      prevTopic: "← Previous",
      nextTopic: "Next →",
      openSlidesFull: "🎬 Open Reveal.js Slides",
      openLabPage: "🧪 Practical Lab Page (A",
      labTitle: "💻 Practical Lab (Python / OpenCV / PyTorch)",
      copyCode: "Copy Code",
      copied: "Copied!",
      glossaryTitle: "📖 Key Terminology (Glossary)",
      termCol: "Term",
      defCol: "Definition",
      quizTitle: "📝 Part 1: Multiple-Choice Quiz",
      quizSubtitle: "Questions grounded in lecture notes and the official 203-question test bank.",
      matchTitle: "🔗 Part 2: Matching Exercise",
      matchSubtitle: "Click an item on the left, then click its matching description on the right.",
      gapTitle: "✍️ Part 3: Fill in the Gap",
      gapSubtitle: "Type the missing concept or value from the lecture theory and click Check.",
      checkGaps: "Check Answers",
      scoreLabel: "Score",
      resetQuiz: "Reset",
      correctMsg: "Correct!",
      wrongMsg: "Incorrect. Correct answer:",
      score: "Score",
      checkAnswers: "Check Answers",
      tryAgain: "Try Again",
      explanation: "Explanation",
      matchingInstruction: "Click an item on the left, then click its matching definition on the right.",
      resetMatching: "Reset & Shuffle",
      fillGapInstruction: "Type the missing concept or value in each blank and check your score.",
      correctAnswer: "Correct answer",
      quizArenaTitle: "203 Test Bank & Interactive Drill Arena",
      quizArenaDesc: "Practice with the official 203-question KOK1506 exam bank, timed 20-question random drills, or topic-by-topic M1–M23 & B1 exercises.",
      part2Title: "Matching Exercise",
      part3Title: "Fill in the Gap",
      practiceHeroTitle: "Interactive Browser CV Labs & Handout Cheat Sheets",
      practiceHeroDesc: "Experiment live in your browser with RGB/HSV masking, 3×3 convolution kernels, Sobel edges, Pinhole/Stereo depth, CNN shapes, IoU/Dice, plus official Handout Sheets 1–3.",
      footerText: "ASTI · KOK1506 Computer Vision Learning Portal (2026 Syllabus, Szeliski, COMP4423 & Microsoft CV Recipes)"
    }
  };

  const INDEPENDENT_PROJECTS = [
    {
      id: 1, hrs: 10, group: true,
      uz: "Ishlab chiqarishda mahsulot nuqsonini aniqlash tizimi (Gauss/Bilateral + Canny/Otsu + SVM/k-NN/CNN, MVTec AD)",
      en: "Industrial Product Defect Detection (Gaussian/Bilateral + Canny/Otsu + SVM/CNN on MVTec AD)",
      deliverableUz: "Nuqsonni qizil hoshiya bilan belgilovchi Python skript + 3–5 betlik hisobot",
      deliverableEn: "Python defect localizer highlighting faulty regions + 3–5 page PDF report"
    },
    {
      id: 2, hrs: 10, group: true,
      uz: "Yuzni tanish asosida avtomatlashtirilgan davomat tizimi (Haar/MTCNN + FaceNet/dlib kosinus masofasi + CSV)",
      en: "Automated Face Recognition Attendance System (Haar/MTCNN + FaceNet/dlib embeddings + CSV log)",
      deliverableUz: "Veb-kamera davomat dasturi, yuzlar bazasi va avtomatik CSV davomat jurnali",
      deliverableEn: "Webcam attendance script, face embedding database & automated CSV journal"
    },
    {
      id: 3, hrs: 10, group: true,
      uz: "Avtomobil raqam belgisini aniqlash va o'qish — ANPR (Sobel + Morfologiya + Konturlar + Tesseract OCR)",
      en: "Automatic Number Plate Recognition — ANPR (Sobel + Morphology + Contours + Tesseract OCR)",
      deliverableUz: "Avtomobil rasmidan davlat raqamini matn ko'rinishida chiqaruvchi dasturiy prototip",
      deliverableEn: "Working ANPR prototype extracting license plate text into database"
    },
    {
      id: 4, hrs: 10, group: false,
      uz: "Qishloq xo'jaligi ekinlaridagi kasallikni tasvir orqali aniqlash (PlantVillage + ResNet-18/MobileNet-V2 Transfer Learning)",
      en: "Crop Leaf Disease Classification (PlantVillage + ResNet-18/MobileNet-V2 Transfer Learning)",
      deliverableUz: "Aniqligi ≥85% tasniflovchi model, Loss/Accuracy egri chiziqlari va Confusion Matrix",
      deliverableEn: "≥85% accuracy classifier, Loss/Accuracy curves & Confusion Matrix"
    },
    {
      id: 5, hrs: 10, group: false,
      uz: "Tibbiy tasvirlarni segmentatsiya qilish yordamchi tizimi (Chest X-Ray / teri lezyonlari + U-Net + BCE+Dice Loss)",
      en: "Medical Image Segmentation Assistant (Chest X-Ray / Skin Lesion + U-Net + BCE+Dice Loss)",
      deliverableUz: "Yarim-shaffof overlay maskali vizual segmentatsiya skripti va Dice hisoboti",
      deliverableEn: "Semi-transparent overlay segmentation pipeline & Dice coefficient evaluation"
    },
    {
      id: 6, hrs: 10, group: false,
      uz: "Real vaqtli transport harakatini kuzatish va hisoblash (YOLOv8 + ByteTrack/DeepSORT + virtual chiziq counter)",
      en: "Real-Time Traffic Tracking & Counting (YOLOv8 + ByteTrack/DeepSORT + virtual line counter)",
      deliverableUz: "Avtomobillarni ID raqam bilan kuzatib, chiziqdan o'tgan sonini hisoblovchi dastur",
      deliverableEn: "Multi-object traffic tracker assigning IDs & counting line crossings"
    },
    {
      id: 7, hrs: 10, group: false,
      uz: "Qo'l ishoralari orqali boshqariladigan interfeys (MediaPipe Hands + barmoq burchaklari + PyAutoGUI)",
      en: "Hand Gesture Controlled Interface (MediaPipe Hands keypoints + finger angles + PyAutoGUI)",
      deliverableUz: "Kamera oldida qo'l ishoralari bilan slayd yoki videoni boshqaruvchi interaktiv dastur",
      deliverableEn: "Real-time webcam gesture controller for slides/media navigation"
    },
    {
      id: 8, hrs: 10, group: false,
      uz: "Xavfsizlik kamerasi uchun intruz aniqlash tizimi (Background Subtraction MOG2/KNN + ROI kesishish + ALARM)",
      en: "Security Intrusion Detection System (MOG2/KNN Background Subtraction + ROI zone + ALARM)",
      deliverableUz: "Taqiqlangan hududga obyekt kirganda ALARM beruvchi va kadrni saqlovchi dastur",
      deliverableEn: "Motion detector triggering visual ALARM & frame snapshot on ROI breach"
    },
    {
      id: 9, hrs: 10, group: false,
      uz: "Dron/aerial tasvirlari asosida obyektlarni aniqlash va xaritalash (DOTA/VisDrone + YOLO/Faster R-CNN FPN + Heatmap)",
      en: "Drone/Aerial Object Detection & Mapping (DOTA/VisDrone + YOLO/FPN + Density Heatmap)",
      deliverableUz: "Aerotasvirlardagi bino/transport/daraxtlarni aniqlab, zichlik xaritasi tuzuvchi hisobot",
      deliverableEn: "Aerial detector counting targets & generating spatial density heatmap overlay"
    }
  ];

  const REFERENCES = [
    { label: "Tuhtabayev Q.A., Xo'jayev Sh.A. — Kompyuterli ko'rish (Toshkent, 2025, 220 b.)", url: null },
    { label: "Szeliski, R. — Computer Vision: Algorithms and Applications (2nd Ed., Springer, 2022) [Online Book]", url: "https://szeliski.org/Book/" },
    { label: "Caide Xiao — Mastering Computer Vision with PyTorch and Machine Learning (IOP Publishing, 2024)", url: null },
    { label: "HK PolyU COMP4423 — Computer Vision for Beginners (lookwei/COMP4423 GitHub: Slides, Colab & Videos)", url: "https://github.com/lookwei/COMP4423" },
    { label: "Microsoft Computer Vision Recipes — Best Practices, PyTorch Notebooks & Deployment", url: "https://github.com/microsoft/computervision-recipes" },
    { label: "Awesome Computer Vision — Curated Books, Courses, Papers, Software & Datasets (jbhuang0604)", url: "https://github.com/jbhuang0604/awesome-computer-vision" },
    { label: "Stanford CS131 — Computer Vision: Foundations and Applications", url: "https://cs131.stanford.edu/" },
    { label: "UC Berkeley CS180 — Intro to Computer Vision & Computational Photography (Torralba, Isola, Freeman)", url: "https://cal-cs180.github.io/fa25/" },
    { label: "Forsyth D.A., Ponce J. — Computer Vision: A Modern Approach (2nd Ed., Pearson)", url: null },
    { label: "Dive into Deep Learning (Zhang, Lipton et al., Cambridge Univ. Press, 2023)", url: "https://d2l.ai/" },
    { label: "OpenCV Official Documentation & PyTorch TorchVision Docs", url: "https://docs.opencv.org" },
    { label: "O'zR Prezidenti qaror/farmonlari: PQ-4996 (2021), PQ-358 (2024), PF-189 (2025), PQ-320 (2025)", url: null }
  ];

  // Full Official Bilingual Glossary (Chapter III of O'UM)
  const GLOSSARY_FULL = [
    { en: "image", uz: "tasvir", defUz: "Piksellardan tashkil topgan ikki o'lchamli yorug'lik ma'lumoti", defEn: "2D light intensity array composed of pixels" },
    { en: "pixel", uz: "piksel", defUz: "Tasvirning eng kichik elementi (picture element)", defEn: "Smallest addressable element of a digital image" },
    { en: "resolution", uz: "o'lcham / ajrata olish", defUz: "Tasvirdagi piksellar soni yoki tafsilotlar aniqligi", defEn: "Pixel dimensions or spatial detail clarity" },
    { en: "grayscale image", uz: "kulrang tasvir", defUz: "Har bir piksel faqat bitta yorqinlik qiymatiga ega tasvir", defEn: "Single-channel image storing luminance intensity only" },
    { en: "binary image", uz: "ikkilik tasvir", defUz: "Piksellari faqat 0 yoki 1 (qora yoki oq) bo'lgan tasvir", defEn: "Image with pixel values restricted to 0 or 1" },
    { en: "color space", uz: "rang fazosi", defUz: "Ranglarni sonlar bilan tasvirlash modeli", defEn: "Mathematical organization of colors as numeric tuples" },
    { en: "RGB", uz: "RGB (qizil-yashil-ko'k)", defUz: "Additiv rang modeli (OpenCV da BGR tartibida saqlanadi)", defEn: "Additive Red-Green-Blue model (stored as BGR in OpenCV)" },
    { en: "HSV", uz: "HSV (ohang-to'yinganlik-yorqinlik)", defUz: "Rang tonini yorqinlikdan ajratuvchi inson idrokiga yaqin model", defEn: "Hue-Saturation-Value cylindrical color model" },
    { en: "channel", uz: "kanal", defUz: "Tasvirning bitta rang komponenti (masalan, R, G, B)", defEn: "Single color/feature component plane of an image" },
    { en: "bit depth", uz: "bit chuqurligi", defUz: "Bitta piksel/kanal qiymatini saqlash uchun ishlatiladigan bitlar soni", defEn: "Number of bits used per pixel or channel" },
    { en: "intensity", uz: "intensivlik", defUz: "Pikselning yorug'lik darajasi", defEn: "Brightness or luminance value at a pixel" },
    { en: "dynamic range", uz: "dinamik diapazon", defUz: "Eng qorong'i va eng yorqin qiymatlar orasidagi nisbat", defEn: "Ratio between darkest and brightest measurable intensities" },
    { en: "sensor", uz: "datchik (CCD/CMOS)", defUz: "Yorug'likni elektr signalga aylantiruvchi element", defEn: "Light-sensitive array converting photons to electric signals" },
    { en: "focal length", uz: "fokus masofasi", defUz: "Linza optik markazidan tasvir tekisligigacha bo'lgan masofa", defEn: "Distance from optical center to the image plane" },
    { en: "aperture", uz: "diafragma", defUz: "Kameraga kiruvchi yorug'lik miqdorini boshqaruvchi teshik", defEn: "Opening controlling amount of light entering the camera" },
    { en: "pinhole camera", uz: "teshikli kamera", defUz: "Linzasiz, kichik teshikli klassik perspektiv kamera modeli", defEn: "Idealized lensless perspective camera model" },
    { en: "perspective projection", uz: "perspektiv proyeksiya", defUz: "3D nuqtalarni uzoqlikka teskari proporsional tarzda 2D ga tushirish", defEn: "Projecting 3D points to 2D inversely proportional to depth Z" },
    { en: "homogeneous coordinates", uz: "bir jinsli (gomogen) koordinatalar", defUz: "Proyeksiyani bitta matritsa ko'paytmasi bilan yozish uchun (n+1) yozuv", defEn: "Augmented coordinates enabling projective transforms via matrix multiply" },
    { en: "camera calibration", uz: "kamerani kalibrlash", defUz: "Ichki K va distorsiya parametrlarini shaxmat taxtasi orqali aniqlash", defEn: "Estimating intrinsic matrix K and distortion via planar target" },
    { en: "intrinsic parameters", uz: "ichki parametrlar", defUz: "Fokal masofa (fx, fy) va asosiy nuqta (cx, cy)", defEn: "Internal camera geometry: focal length and principal point" },
    { en: "extrinsic parameters", uz: "tashqi parametrlar", defUz: "Kameraning dunyo koordinatasidagi burilishi R va siljishi t", defEn: "3D camera pose [R|t] relative to world coordinates" },
    { en: "lens distortion", uz: "linza buzilishi (distorsiya)", defUz: "Radial (barrel/pincushion) va tangensial optik egilishlar", defEn: "Radial and tangential optical warping caused by real lenses" },
    { en: "sampling", uz: "diskretlash", defUz: "Uzluksiz fazoviy tasvirni diskret piksellar to'riga ajratish", defEn: "Discretizing continuous spatial coordinates onto a pixel grid" },
    { en: "quantization", uz: "kvantlash", defUz: "Uzluksiz yorqinlik qiymatlarini chekli sathlarga (0..255) keltirish", defEn: "Mapping continuous intensity values to discrete integer levels" },
    { en: "aliasing", uz: "alyasing", defUz: "Past diskretlash tufayli paydo bo'ladigan soxta moiré naqshlar", defEn: "Artifacts from sampling below Nyquist frequency" },
    { en: "histogram equalization", uz: "gistogrammani tenglashtirish", defUz: "Yorqinlik taqsimotini tekislab kontrastni oshirish usuli", defEn: "Redistributing intensities to enhance global contrast" },
    { en: "thresholding", uz: "bo'sag'a bo'yicha ajratish", defUz: "Pikselni chegara qiymatiga qarab ikkilash (masalan, Otsu usuli)", defEn: "Binarizing pixels using an intensity cutoff (e.g. Otsu)" },
    { en: "convolution", uz: "konvolyutsiya (svyortka)", defUz: "Yadroni tasvir bo'ylab siljitib vaznli yig'indi hisoblash", defEn: "Sliding a kernel over an image to compute weighted sums" },
    { en: "kernel", uz: "yadro (filtr matritsasi)", defUz: "Filtrdagi vaznlar kichik matritsasi (masalan, 3x3)", defEn: "Small weight matrix used in spatial filtering" },
    { en: "separable filter", uz: "ajraluvchi filtr", defUz: "2D filtrni ikkita 1D (qator + ustun) filtrga ajratish O(2N)", defEn: "Decomposing 2D kernel into two 1D passes reducing O(N²) to O(2N)" },
    { en: "Gaussian filter", uz: "Gauss filtri", defUz: "Vaznlari Gauss taqsimotiga mos keluvchi silliqlash filtri", defEn: "Linear smoothing filter weighted by 2D Gaussian distribution" },
    { en: "median filter", uz: "median filtri", defUz: "Qo'shni piksellar medianasini oluvchi nochiziqli filtr (salt-and-pepper)", defEn: "Non-linear filter replacing pixel with neighborhood median" },
    { en: "bilateral filter", uz: "bilateral filtr", defUz: "Fazoviy masofa va yorqinlik farqini hisobga olib chekkalarni saqlovchi filtr", defEn: "Edge-preserving smoothing combining spatial and range kernels" },
    { en: "Fourier transform", uz: "Furye almashtirishi", defUz: "Tasvirni fazoviy sohadan chastota sohasiga o'tkazish", defEn: "Converting spatial image into frequency domain components" },
    { en: "image pyramid", uz: "tasvir piramidasi", defUz: "Turli masshtablardagi kichraytirilgan tasvirlar ketma-ketligi", defEn: "Multi-scale representation via successive smoothing & downsampling" },
    { en: "morphological operation", uz: "morfologik amal", defUz: "Eroziya, dilatatsiya, ochish va yopish shakliy amallari", defEn: "Shape-based binary/grayscale operations (erosion, dilation)" },
    { en: "homography", uz: "gomografiya", defUz: "Tekislikning boshqa tekislikka 8 erkin parametrli 3x3 proyektiv o'tkazishi", defEn: "3x3 planar projective transformation (8 DOF, min 4 point pairs)" },
    { en: "image warping", uz: "tasvirni deformatsiyalash (warping)", defUz: "Teskari xaritalash + interpolyatsiya bilan tasvirni ko'chirish", defEn: "Geometrically remapping pixels using inverse mapping" },
    { en: "keypoint", uz: "kalit (xususiyat) nuqta", defUz: "Masshtab va burilishga chidamli takroriy aniqlanuvchi nuqta", defEn: "Repeatable, distinctive local point (corner/blob)" },
    { en: "descriptor", uz: "deskriptor", defUz: "Kalit nuqta atrofini ifodalovchi sonli vektor (SIFT-128D, ORB-binar)", defEn: "Feature vector encoding local appearance around a keypoint" },
    { en: "gradient", uz: "gradiyent", defUz: "Yorqinlik o'zgarishining yo'nalishi va kattaligi [∂f/∂x, ∂f/∂y]", defEn: "Vector of partial intensity derivatives indicating edge strength & angle" },
    { en: "Canny edge detector", uz: "Canny chekka aniqlagichi", defUz: "Gauss, Sobel, NMS, ikkilangan chegara va gisterezisli 5 bosqichli algoritm", defEn: "5-stage optimal edge detector with NMS and hysteresis thresholding" },
    { en: "non-maximum suppression", uz: "maksimal bo'lmaganlarni bostirish (NMS)", defUz: "Faqat lokal maksimum chekka yoki eng ishonchli qutini qoldirish", defEn: "Suppressing non-peak responses to thin edges or deduplicate boxes" },
    { en: "Harris corner detector", uz: "Harris burchak detektori", defUz: "Struktur tenzor M ning xos qiymatlari orqali burchak topish", defEn: "Corner detector analyzing eigenvalues of 2x2 gradient moment matrix" },
    { en: "SIFT", uz: "SIFT", defUz: "DoG va 128-o'lchamli deskriptorga asoslangan masshtab/aylanish invariant usul", defEn: "Scale-Invariant Feature Transform producing 128-D descriptors" },
    { en: "HOG", uz: "HOG (Yo'naltirilgan gradientlar gistogrammasi)", defUz: "Piyoda va siluetlarni aniqlash uchun katakcha/blok gradient gistogrammasi", defEn: "Histogram of Oriented Gradients capturing global object shape" },
    { en: "ORB", uz: "ORB", defUz: "FAST + Rotated BRIEF asosidagi tezkor, patentsiz binar deskriptor", defEn: "Fast, patent-free binary keypoint detector & descriptor (Hamming)" },
    { en: "ratio test", uz: "Lowe nisbat testi", defUz: "d1/d2 < 0.75 sharti bilan ikkilanuvchi mosliklarni rad etish", defEn: "Rejecting ambiguous feature matches where d1/d2 >= threshold" },
    { en: "RANSAC", uz: "RANSAC", defUz: "Outlierlar mavjud bo'lganda inlierlar orqali modelni mustahkam baholash", defEn: "Random Sample Consensus for robust model fitting with outliers" },
    { en: "Hough transform", uz: "Hough almashtirishi", defUz: "Akkumulyator massivida ovoz berish orqali chiziq (ρ,θ) va doira topish", defEn: "Voting in parameter space to detect lines, circles & shapes" },
    { en: "image stitching", uz: "tasvirlarni tikish (panorama)", defUz: "Feature matching + RANSAC homografiya + warp + blending", defEn: "Aligning and blending overlapping images into a panorama" },
    { en: "semantic segmentation", uz: "semantik segmentatsiya", defUz: "Har bir pikselga sinf yorlig'i berish (nusxalarni ajratmaydi)", defEn: "Classifying every pixel into semantic categories" },
    { en: "instance segmentation", uz: "instans segmentatsiya", defUz: "Har bir obyekt nusxasi uchun alohida piksel maskasi ajratish", defEn: "Detecting and segmenting each individual object instance" },
    { en: "optical flow", uz: "optik oqim", defUz: "Ketma-ket kadrlar orasidagi piksellar harakat vektori maydoni", defEn: "Apparent 2D motion field of pixels across consecutive video frames" },
    { en: "tracking", uz: "obyekt kuzatuvi (tracking)", defUz: "Kalman filtri va DeepSORT/ByteTrack orqali ID bilan kuzatish", defEn: "Following object trajectories and consistent IDs over video frames" },
    { en: "stereo vision", uz: "stereo ko'rish", defUz: "Ikki kameradan disparitet d orqali chuqurlik Z=fB/d ni topish", defEn: "Recovering 3D depth Z=fB/d from disparity between two views" },
    { en: "disparity", uz: "disparitet", defUz: "Chap va o'ng stereo tasvirlarda mos nuqtaning gorizontal piksel siljishi", defEn: "Horizontal pixel displacement of a 3D point across rectified stereo pair" },
    { en: "epipolar geometry", uz: "epipolyar geometriya", defUz: "Ikki kamera orasidagi Fundamental F va Essensial E matritsalar geometriyasi", defEn: "Two-view projective geometry reducing 2D correspondence to 1D lines" },
    { en: "CNN", uz: "Konvolyutsion neyron tarmoq (CNN)", defUz: "Vazn ulashish, pooling va ierarxik xususiyatlarga asoslangan tarmoq", defEn: "Convolutional Neural Network using weight sharing & hierarchical pooling" },
    { en: "ReLU", uz: "ReLU", defUz: "f(x)=max(0,x) — gradient yo'qolishini kamaytiruvchi aktivatsiya", defEn: "Rectified Linear Unit activation f(x)=max(0,x)" },
    { en: "softmax", uz: "Softmax", defUz: "Logitlarni yig'indisi 1 ga teng ehtimolliklarga aylantiruvchi funksiya", defEn: "Normalizing raw logits into a categorical probability distribution" },
    { en: "dropout", uz: "Dropout", defUz: "Overfittingni kamaytirish uchun o'qitishda tasodifiy neyronlarni o'chirish", defEn: "Regularization randomly zeroing activations during training" },
    { en: "batch normalization", uz: "Batch Normalization", defUz: "Mini-batch bo'yicha qatlam kirishlarini normallashtirib o'qitishni tezlatish", defEn: "Normalizing layer inputs per mini-batch to stabilize training" },
    { en: "data augmentation", uz: "ma'lumotlarni ko'paytirish", defUz: "Aylantirish, kesish, rang o'zgartirish orqali o'qitish to'plamini boyitish", defEn: "Synthesizing diverse training views via flips, crops & color jitter" },
    { en: "transfer learning", uz: "bilim ko'chirish (Transfer Learning)", defUz: "ImageNet da o'qitilgan ResNet/VGG modelini yangi vazifaga fine-tuning qilish", defEn: "Adapting pretrained backbone weights to a new target dataset" },
    { en: "ResNet", uz: "ResNet", defUz: "Skip connection (y=F(x)+x) orqali degradatsiya muammosini yechgan tarmoq", defEn: "Residual Network solving deep degradation via identity skip connections" },
    { en: "Faster R-CNN", uz: "Faster R-CNN", defUz: "RPN + RoI Pooling/Align asosidagi ikki bosqichli obyekt detektori", defEn: "Two-stage detector combining Region Proposal Network with Fast R-CNN" },
    { en: "YOLO", uz: "YOLO (You Only Look Once)", defUz: "Tasvirni S×S to'rga bo'lib real vaqtda aniqlovchi bir bosqichli detektor", defEn: "Single-stage real-time object detector regressing boxes on an S×S grid" },
    { en: "U-Net", uz: "U-Net", defUz: "Encoder-Decoder + zich skip connection li tibbiy segmentatsiya arxitekturasi", defEn: "Symmetric encoder-decoder with concatenated skips for segmentation" },
    { en: "Mask R-CNN", uz: "Mask R-CNN", defUz: "Faster R-CNN + RoI Align + piksel maska boshidan iborat instans segmentator", defEn: "Instance segmentation extending Faster R-CNN with RoI Align & mask branch" },
    { en: "IoU", uz: "IoU (Kesishma/Birlashma)", defUz: "Area(A∩B)/Area(A∪B) — bounding box va maska sifat o'lchovi", defEn: "Intersection over Union evaluating localization & mask overlap" },
    { en: "Dice", uz: "Dice koeffitsienti", defUz: "2|A∩B|/(|A|+|B|) — tibbiy segmentatsiya o'xshashlik metrikasi", defEn: "2|A∩B|/(|A|+|B|) overlap metric heavily used in medical segmentation" },
    { en: "mAP", uz: "mAP (mean Average Precision)", defUz: "Turli IoU va sinflar bo'yicha obyekt detektori aniqlik integral ko'rsatkichi", defEn: "Mean Average Precision across classes and IoU thresholds" },
    { en: "Vision Transformer (ViT)", uz: "Ko'rish transformeri (ViT)", defUz: "Tasvirni patch bo'laklarga bo'lib Self-Attention bilan ishlovchi model", defEn: "Transformer architecture processing image patches via self-attention" },
    { en: "HDR", uz: "HDR (Yuqori dinamik diapazon)", defUz: "Turli ekspozitsiyali tasvirlarni birlashtirib dinamik diapazonni kengaytirish", defEn: "Combining bracketed exposures for wide luminance capture" }
  ];

  const CHEATSHEETS = {
    uz: {
      sheet1Title: "1-Tarqatma: OpenCV & PyTorch Tezkor Spravka (Cheat Sheet)",
      sheet1Code: `# 1. Tasvir o'qish, kulrangga o'tkazish va saqlash
img = cv2.imread('fayl.jpg', cv2.IMREAD_COLOR)   # BGR tartibi!
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
H, W, C = img.shape                              # Satr(Y), Ustun(X), Kanal
pixel = img[y, x]                                # [B, G, R] ∈ [0, 255]

# 2. HSV rang fazosi va Color Masking (OpenCV da Hue ∈ [0, 179])
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
mask = cv2.inRange(hsv, lower_np, upper_np)
res = cv2.bitwise_and(img, img, mask=mask)

# 3. Chiziqli va Nochiziqli Filtrlash
mean_b = cv2.blur(img, (5, 5))
gauss_b = cv2.GaussianBlur(img, (5, 5), sigmaX=1.2)
med_b = cv2.medianBlur(img, 5)                   # Salt-and-pepper shovqinga qarshi
bilat_b = cv2.bilateralFilter(img, 9, 75, 75)    # Chekkalarni saqlab silliqlaydi

# 4. Chekka va Xususiyat Aniqlash
edges = cv2.Canny(gray, 50, 150)                 # T_low=50, T_high=150 (1:3)
orb = cv2.ORB_create(nfeatures=1000)
kp, des = orb.detectAndCompute(gray, None)
H_mat, inliers = cv2.findHomography(pts1, pts2, cv2.RANSAC, 5.0)`,
      formulas: [
        { name: "Pinhole Proyeksiya", tex: "x = f\\frac{X}{Z} + c_x, \\quad y = f\\frac{Y}{Z} + c_y", desc: "3D (X,Y,Z) nuqtani 2D tasvir tekisligiga proyeksiyalash" },
        { name: "Stereo Chuqurlik", tex: "Z = \\frac{f \\cdot B}{d}", desc: "B — bazaviy masofa, d — disparitet (piksellarda)" },
        { name: "CNN Chiqish O'lchami", tex: "O = \\left\\lfloor \\frac{I - K + 2P}{S} \\right\\rfloor + 1", desc: "I — kirish, K — yadro, P — padding, S — stride" },
        { name: "IoU (Intersection over Union)", tex: "\\text{IoU} = \\frac{\\text{Area}(A \\cap B)}{\\text{Area}(A \\cup B)}", desc: "Bounding box yoki maskalar ustma-ust tushish darajasi" },
        { name: "F1-ball", tex: "F_1 = \\frac{2 \\cdot \\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}", desc: "Precision va Recall garmonik o'rtachasi" },
        { name: "Softmax Funksiyasi", tex: "p_i = \\frac{e^{z_i}}{\\sum_j e^{z_j}}", desc: "Xom logitlarni ehtimollik taqsimotiga aylantirish" },
        { name: "Dice Koeffitsienti", tex: "\\text{Dice} = \\frac{2|A \\cap B|}{|A| + |B|}", desc: "Piksel segmentatsiya maskalari o'xshashligi (IoU = Dice/(2-Dice))" },
        { name: "RANSAC Iteratsiyalar Soni", tex: "N = \\frac{\\ln(1 - p)}{\\ln(1 - (1 - e)^s)}", desc: "p — ishonch (0.99), e — outlier ulushi, s — minimal namunalar" }
      ],
      reportTitle: "3-Tarqatma: Amaliy Ish Hisoboti Shablon Varag'i (ADTI)",
      reportText: `=======================================================================
           ANDIJON DAVLAT TEXNIKA INSTITUTI | "SUN'IY INTELLEKT" YO'NALISHI
              "KOMPYUTERLI KO'RISH" FANIDAN AMALIY ISH HISOBOTI VARAG'I
=======================================================================
Talaba F.I.SH.: ___________________________________________  Guruh: ________
Amaliy mashg'ulot raqami: A___    Mavzu: ____________________________________
Variant raqami: ___               Sana: "___" ___________ 2026-yil

1. TALABANING INDIVIDUAL VARIANT PARAMETRLARI:
   • Asosiy parametr 1 (yadro / threshold / lr): ___________________________
   • Asosiy parametr 2 (rang / sigma / epoxa):  ___________________________
   • Maqsadli sinf yoki test ma'lumotlari:      ___________________________

2. AMALIY KODNING ASOSIY QISMI (ENG MUHIM 3-5 QATOR):
   _______________________________________________________________________
   _______________________________________________________________________

3. NATIJALARNING MIQDORIY KO'RSATKICHLARI:
   • Hisoblash tezligi (FPS / vaqt):         _____________________________
   • Aniqlik (Accuracy / Precision / mIoU):  _____________________________
   • Shovqin darajasi / PSNR:                _____________________________

4. XULOSA VA TAHLIL (1-2 jumla bilan):
   _______________________________________________________________________
O'qituvchi bahosi: _______ ball           Imzo: ____________`
    },
    en: {
      sheet1Title: "Handout 1: OpenCV & PyTorch Quick Reference (Cheat Sheet)",
      sheet1Code: `# 1. Image I/O, Grayscale & Shape
img = cv2.imread('file.jpg', cv2.IMREAD_COLOR)   # BGR channel order!
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
H, W, C = img.shape                              # Rows(Y), Cols(X), Channels
pixel = img[y, x]                                # [B, G, R] ∈ [0, 255]

# 2. HSV Color Space & Color Masking (OpenCV Hue ∈ [0, 179])
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
mask = cv2.inRange(hsv, lower_np, upper_np)
res = cv2.bitwise_and(img, img, mask=mask)

# 3. Linear & Non-Linear Filtering
mean_b = cv2.blur(img, (5, 5))
gauss_b = cv2.GaussianBlur(img, (5, 5), sigmaX=1.2)
med_b = cv2.medianBlur(img, 5)                   # Removes salt-and-pepper noise
bilat_b = cv2.bilateralFilter(img, 9, 75, 75)    # Edge-preserving smoothing

# 4. Edge Detection & Feature Matching
edges = cv2.Canny(gray, 50, 150)                 # T_low=50, T_high=150 (1:3)
orb = cv2.ORB_create(nfeatures=1000)
kp, des = orb.detectAndCompute(gray, None)
H_mat, inliers = cv2.findHomography(pts1, pts2, cv2.RANSAC, 5.0)`,
      formulas: [
        { name: "Pinhole Projection", tex: "x = f\\frac{X}{Z} + c_x, \\quad y = f\\frac{Y}{Z} + c_y", desc: "Projecting 3D world point (X,Y,Z) to 2D pixel (x,y)" },
        { name: "Stereo Depth", tex: "Z = \\frac{f \\cdot B}{d}", desc: "B = camera baseline, d = horizontal pixel disparity" },
        { name: "CNN Output Size", tex: "O = \\left\\lfloor \\frac{I - K + 2P}{S} \\right\\rfloor + 1", desc: "I = input size, K = kernel, P = padding, S = stride" },
        { name: "IoU (Intersection over Union)", tex: "\\text{IoU} = \\frac{\\text{Area}(A \\cap B)}{\\text{Area}(A \\cup B)}", desc: "Overlap metric for object detection boxes & segmentation masks" },
        { name: "F1 Score", tex: "F_1 = \\frac{2 \\cdot \\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}", desc: "Harmonic mean of Precision and Recall" },
        { name: "Softmax Function", tex: "p_i = \\frac{e^{z_i}}{\\sum_j e^{z_j}}", desc: "Converts raw network logits to probability distribution" },
        { name: "Dice Coefficient", tex: "\\text{Dice} = \\frac{2|A \\cap B|}{|A| + |B|}", desc: "Segmentation overlap metric (IoU = Dice/(2-Dice))" },
        { name: "RANSAC Iterations", tex: "N = \\frac{\\ln(1 - p)}{\\ln(1 - (1 - e)^s)}", desc: "p = confidence (0.99), e = outlier ratio, s = minimal sample size" }
      ],
      reportTitle: "Handout 3: Practical Lab Report Sheet Template (ASTI)",
      reportText: `=======================================================================
           ANDIJAN STATE TECHNICAL INSTITUTE | "ARTIFICIAL INTELLIGENCE"
              "COMPUTER VISION" PRACTICAL LAB REPORT SHEET (KOK1506)
=======================================================================
Student Name: _____________________________________________  Group: ________
Lab Number: A___    Topic: _________________________________________________
Variant #: ___      Date: "___" ___________ 2026

1. INDIVIDUAL VARIANT PARAMETERS:
   • Parameter 1 (kernel / threshold / lr): ________________________________
   • Parameter 2 (color / sigma / epochs):  ________________________________
   • Target class or test dataset:          ________________________________

2. KEY CODE SNIPPET (3-5 CORE LINES):
   _______________________________________________________________________
   _______________________________________________________________________

3. QUANTITATIVE METRICS:
   • Speed (FPS / inference time):          ______________________________
   • Accuracy / Precision / mIoU:           ______________________________
   • Noise / PSNR (if applicable):          ______________________________

4. CONCLUSION & ANALYSIS (1-2 sentences):
   _______________________________________________________________________
Instructor Grade: _______ pts             Signature: ____________`
    }
  };

  const memoryStore = {};
  function readStore(key) {
    try { return localStorage.getItem(key); } catch (e) { return memoryStore[key] || null; }
  }
  function writeStore(key, val) {
    memoryStore[key] = val;
    try { localStorage.setItem(key, val); } catch (e) { /* ignore */ }
  }

  function getLang() {
    return readStore(STORAGE_LANG) === 'en' ? 'en' : 'uz';
  }
  function setLang(lang) {
    writeStore(STORAGE_LANG, lang === 'en' ? 'en' : 'uz');
    document.documentElement.lang = lang === 'en' ? 'en' : 'uz';
    window.dispatchEvent(new CustomEvent('cv:langchange', { detail: { lang } }));
  }
  function getTheme() {
    return readStore(STORAGE_THEME) === 'light' ? 'light' : 'dark';
  }
  function setTheme(theme) {
    const next = theme === 'light' ? 'light' : 'dark';
    writeStore(STORAGE_THEME, next);
    document.documentElement.setAttribute('data-theme', next);
  }
  function toggleTheme() {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
    renderChrome(window.CV_ACTIVE_NAV || 'home');
  }
  function getStudentVariant() {
    const v = Number(readStore(STORAGE_VARIANT));
    return v >= 1 && v <= 40 ? v : 1;
  }
  function setStudentVariant(v) {
    const n = Math.min(40, Math.max(1, Number(v) || 1));
    writeStore(STORAGE_VARIANT, String(n));
    return n;
  }
  function getCompletedTopics() {
    try {
      const raw = readStore(STORAGE_COMPLETED);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }
  function toggleTopicCompleted(topicId) {
    const list = getCompletedTopics();
    const idx = list.indexOf(topicId);
    if (idx >= 0) list.splice(idx, 1);
    else list.push(topicId);
    writeStore(STORAGE_COMPLETED, JSON.stringify(list));
    return list.includes(topicId);
  }
  function saveQuizScore(key, score, total) {
    try {
      const scores = JSON.parse(readStore(STORAGE_QUIZ_SCORES) || '{}');
      const prev = scores[key];
      if (!prev || score >= prev.score) {
        scores[key] = { score, total, updatedAt: new Date().toISOString() };
        writeStore(STORAGE_QUIZ_SCORES, JSON.stringify(scores));
      }
    } catch (e) { /* ignore */ }
  }
  function getQuizScores() {
    try { return JSON.parse(readStore(STORAGE_QUIZ_SCORES) || '{}'); } catch (e) { return {}; }
  }
  function t(key) {
    const lang = getLang();
    return (UI_STRINGS[lang] && UI_STRINGS[lang][key]) || UI_STRINGS.uz[key] || key;
  }

  function renderChrome(activeNav) {
    window.CV_ACTIVE_NAV = activeNav;
    const lang = getLang();
    const theme = getTheme();
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.lang = lang;

    const headerEl = document.getElementById('site-header');
    if (headerEl) {
      headerEl.innerHTML = `
        <div class="header-inner">
          <a href="index.html" class="brand">
            <span class="brand-badge">CV</span>
            <span>
              ${t('brandTitle')}
              <span class="brand-sub">${t('brandSub')}</span>
            </span>
          </a>
          <nav class="nav-links" aria-label="Main navigation">
            <a href="index.html" class="nav-link ${activeNav === 'home' ? 'active' : ''}">${t('navHome')}</a>
            <a href="slides.html?topic=1" class="nav-link ${activeNav === 'slides' ? 'active' : ''}">${t('navSlides')}</a>
            <a href="labs.html?id=1" class="nav-link ${activeNav === 'labs' ? 'active' : ''}">${t('navLabs')}</a>
            <a href="practice.html" class="nav-link ${activeNav === 'practice' ? 'active' : ''}">${t('navPractice')}</a>
            <a href="quiz.html" class="nav-link ${activeNav === 'quiz' ? 'active' : ''}">${t('navQuiz')}</a>
          </nav>
          <div class="header-controls">
            <div class="lang-toggle" role="group" aria-label="Language switch">
              <button type="button" class="lang-btn ${lang === 'uz' ? 'active' : ''}" data-set-lang="uz">O'Z</button>
              <button type="button" class="lang-btn ${lang === 'en' ? 'active' : ''}" data-set-lang="en">EN</button>
            </div>
            <button type="button" class="icon-btn" id="theme-toggle-btn" title="Theme">
              ${theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      `;

      headerEl.querySelectorAll('[data-set-lang]').forEach((btn) => {
        btn.addEventListener('click', () => {
          setLang(btn.getAttribute('data-set-lang'));
          renderChrome(activeNav);
        });
      });

      const themeBtn = document.getElementById('theme-toggle-btn');
      if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
    }

    const footerEl = document.getElementById('site-footer');
    if (footerEl) footerEl.innerHTML = `<div>${t('footerText')}</div>`;
  }

  window.CV_APP = {
    getLang, setLang, getTheme, toggleTheme,
    getStudentVariant, setStudentVariant,
    getCompletedTopics, toggleTopicCompleted,
    saveQuizScore, getQuizScores, t, renderChrome,
    INDEPENDENT_PROJECTS, REFERENCES, GLOSSARY_FULL, CHEATSHEETS
  };
})();
