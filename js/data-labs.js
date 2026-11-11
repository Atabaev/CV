// All 22 Practical Labs (A1–A22) aligned 1-to-1 with KOK1506 O'UM + 40-Variant Parameter Generator
window.CV_LABS = [
  {
    id: 1, code: 'A1', topicId: 1,
    title: { uz: "OpenCV muhitini sozlash va tasvir bilan ishlash", en: "Setting Up OpenCV & Pixel Array Manipulation" },
    objective: { uz: "OpenCV va NumPy o'rnatish, tasvirni o'qish/ko'rsatish/saqlash hamda piksel qiymatlariga to'g'ridan-to'g'ri murojaat qilish.", en: "Install OpenCV/NumPy, load/display/save images, and directly index BGR pixel arrays." },
    formulas: ["img.shape = (H, W, C)", "img[y, x] = [B, G, R] ∈ [0, 255]", "cv2.imread(path, cv2.IMREAD_COLOR | IMREAD_GRAYSCALE)"],
    colabUrl: "https://github.com/lookwei/COMP4423",
    pythonCode: `import cv2
import numpy as np

# Tasvirni o'qish (BGR formatda)
img = cv2.imread('rasm.jpg', cv2.IMREAD_COLOR)
if img is None:
    img = np.zeros((240, 320, 3), dtype=np.uint8)  # fallback demo

H, W, C = img.shape
print(f"Balandlik={H}, Kenglik={W}, Kanallar={C}")

# Markaziy piksel BGR qiymati va 10x10 qizil kvadrat
cy, cx = H // 2, W // 2
print("Markaziy piksel (BGR):", img[cy, cx])
img[cy-5:cy+5, cx-5:cx+5] = [0, 0, 255]

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
cv2.imwrite('natija_a1.jpg', img)
cv2.imwrite('natija_a1_gray.jpg', gray)`,
    commonTask: { uz: "Ixtiyoriy rangli tasvirni yuklang, (H, W, C) o'lchamini chiqaring, kulrang formatga o'tkazing va asl hamda kulrang tasvirni yonma-yon ko'rsating.", en: "Load a color image, print (H, W, C), convert to grayscale, and display both side-by-side." },
    tasks: [
      {
        title: { uz: "1-topshiriq: Piksel mintaqasini rang bilan bo'yash", en: "Task 1: Color a Pixel Region" },
        tplUz: "Tasvirning yuqori chap burchagidan {W}×{H} piksellik mintaqani {RANG} rangga bo'yang (BGR tartibida) va saqlang.",
        tplEn: "Paint the top-left {W}×{H} region in {RANG} (BGR order) and save the image.",
        rows: [
          { W: 30, H: 20, RANG: "qizil (0,0,255)" }, { W: 35, H: 24, RANG: "yashil (0,255,0)" },
          { W: 40, H: 28, RANG: "ko'k (255,0,0)" }, { W: 45, H: 32, RANG: "sariq (0,255,255)" },
          { W: 50, H: 36, RANG: "binafsha (255,0,255)" }, { W: 55, H: 40, RANG: "och ko'k (255,255,0)" },
          { W: 60, H: 44, RANG: "qizil (0,0,255)" }, { W: 65, H: 48, RANG: "yashil (0,255,0)" },
          { W: 70, H: 52, RANG: "ko'k (255,0,0)" }, { W: 75, H: 56, RANG: "sariq (0,255,255)" }
        ]
      },
      {
        title: { uz: "2-topshiriq: Piksel statistikasi", en: "Task 2: Region Channel Mean" },
        tplUz: "Tasvirning [{Y1}:{Y2}, {X1}:{X2}] mintaqasida har bir kanal (B, G, R) bo'yicha o'rtacha qiymatni np.mean bilan hisoblang.",
        tplEn: "Compute per-channel (B, G, R) means inside slice [{Y1}:{Y2}, {X1}:{X2}] using np.mean.",
        rows: [
          { Y1: 10, Y2: 60, X1: 15, X2: 80 }, { Y1: 13, Y2: 65, X1: 19, X2: 86 },
          { Y1: 16, Y2: 70, X1: 23, X2: 92 }, { Y1: 19, Y2: 75, X1: 27, X2: 98 },
          { Y1: 22, Y2: 80, X1: 31, X2: 104 }, { Y1: 25, Y2: 85, X1: 35, X2: 110 },
          { Y1: 28, Y2: 90, X1: 39, X2: 116 }, { Y1: 31, Y2: 95, X1: 43, X2: 122 },
          { Y1: 34, Y2: 100, X1: 47, X2: 128 }, { Y1: 37, Y2: 105, X1: 51, X2: 134 }
        ]
      },
      {
        title: { uz: "3-topshiriq: Qo'lda diagonal chiziq chizish", en: "Task 3: Manual Diagonal Line" },
        tplUz: "cv2.line ishlatmasdan for tsikli bilan (0,0) dan ({XEND},{YEND}) gacha {QALINLIK} px qalinlikda {RANG} chiziq chizing.",
        tplEn: "Without cv2.line, draw a {QALINLIK}-px {RANG} line from (0,0) to ({XEND},{YEND}) via pixel loop.",
        rows: [
          { XEND: 100, YEND: 80, QALINLIK: 1, RANG: "oq (255,255,255)" }, { XEND: 108, YEND: 86, QALINLIK: 2, RANG: "qora (0,0,0)" },
          { XEND: 116, YEND: 92, QALINLIK: 3, RANG: "qizil (0,0,255)" }, { XEND: 124, YEND: 98, QALINLIK: 4, RANG: "yashil (0,255,0)" },
          { XEND: 132, YEND: 104, QALINLIK: 1, RANG: "oq (255,255,255)" }, { XEND: 140, YEND: 110, QALINLIK: 2, RANG: "qora (0,0,0)" },
          { XEND: 148, YEND: 116, QALINLIK: 3, RANG: "qizil (0,0,255)" }, { XEND: 156, YEND: 122, QALINLIK: 4, RANG: "yashil (0,255,0)" },
          { XEND: 164, YEND: 128, QALINLIK: 1, RANG: "oq (255,255,255)" }, { XEND: 172, YEND: 134, QALINLIK: 2, RANG: "qora (0,0,0)" }
        ]
      },
      {
        title: { uz: "4-topshiriq (uyga): Format hajmlarini solishtirish", en: "Task 4 (Home): Format File-Size Comparison" },
        tplUz: "Yuklangan tasvirni {FORMAT} formatida saqlang va asl fayl hajmi bilan foiz nisbatida solishtiring.",
        tplEn: "Save the image as {FORMAT} and compare file size (%) against the original.",
        rows: [
          { FORMAT: "PNG" }, { FORMAT: "JPEG (sifat=90)" }, { FORMAT: "JPEG (sifat=50)" }, { FORMAT: "BMP" }, { FORMAT: "JPEG (sifat=10)" },
          { FORMAT: "PNG" }, { FORMAT: "JPEG (sifat=90)" }, { FORMAT: "JPEG (sifat=50)" }, { FORMAT: "BMP" }, { FORMAT: "JPEG (sifat=10)" }
        ]
      }
    ]
  },
  {
    id: 2, code: 'A2', topicId: 2,
    title: { uz: "Tasvir formatlari va piksel amaliyoti (Split/Merge, Bit-depth)", en: "Image Formats, Bit Depth & Channel Split/Merge" },
    objective: { uz: "BMP/JPEG/PNG konvertatsiyasi, bit chuqurligini kamaytirib posterizatsiyani kuzatish va kanallarni split/merge qilish.", en: "Convert BMP/JPEG/PNG, reduce bit depth to observe banding, and split/merge channels." },
    formulas: ["B, G, R = cv2.split(img)", "cv2.merge([B, G, R])", "img_low = (img // (256 // L)) * (256 // L)"],
    pythonCode: `import cv2, os, numpy as np

img = cv2.imread('rasm.jpg')
B, G, R = cv2.split(img)
zero = np.zeros_like(B)
cv2.imwrite('faqat_qizil.jpg', cv2.merge([zero, zero, R]))

# 8-bitdan 4-bitga (L=16 daraja) kamaytirish
L = 16
step = 256 // L
img_low = (img // step) * step
cv2.imwrite('4bit_natija.png', img_low.astype(np.uint8))

cv2.imwrite('out_q90.jpg', img, [cv2.IMWRITE_JPEG_QUALITY, 90])
cv2.imwrite('out_q10.jpg', img, [cv2.IMWRITE_JPEG_QUALITY, 10])
print("PNG:", os.path.getsize('4bit_natija.png'), "Q10:", os.path.getsize('out_q10.jpg'))`,
    commonTask: { uz: "Tasvirni PNG, JPEG(90) va JPEG(10) formatlarida saqlang, os.path.getsize bilan hajmlarini jadvalga yozing.", en: "Save as PNG, JPEG(90), JPEG(10) and tabulate file sizes via os.path.getsize." },
    tasks: [
      { title: { uz: "1-topshiriq: Kanalni kuchaytirish", en: "Task 1: Channel Gain" }, tplUz: "{KANAL} kanalini {KOEF} ga ko'paytiring (np.clip(0,255)) va rang o'zgarishini ko'rsating.", tplEn: "Scale {KANAL} channel by {KOEF} with np.clip(0,255) and visualize.", rows: [{ KANAL: "Qizil (R)", KOEF: 1.1 }, { KANAL: "Yashil (G)", KOEF: 1.15 }, { KANAL: "Ko'k (B)", KOEF: 1.2 }, { KANAL: "Qizil (R)", KOEF: 1.25 }, { KANAL: "Yashil (G)", KOEF: 1.3 }, { KANAL: "Ko'k (B)", KOEF: 1.35 }, { KANAL: "Qizil (R)", KOEF: 1.4 }, { KANAL: "Yashil (G)", KOEF: 1.45 }, { KANAL: "Ko'k (B)", KOEF: 1.5 }, { KANAL: "Qizil (R)", KOEF: 1.55 }] },
      { title: { uz: "2-topshiriq: Bit chuqurligini kamaytirish", en: "Task 2: Bit-Depth Quantization" }, tplUz: "Bit chuqurligini 8 bitdan L={DARAJA} darajaga kamaytiring va zinapoya (banding) effektini tahlil qiling.", tplEn: "Quantize pixel intensities to L={DARAJA} levels and describe banding artifacts.", rows: [{ DARAJA: 2 }, { DARAJA: 4 }, { DARAJA: 8 }, { DARAJA: 16 }, { DARAJA: 32 }, { DARAJA: 64 }, { DARAJA: 2 }, { DARAJA: 4 }, { DARAJA: 8 }, { DARAJA: 16 }] },
      { title: { uz: "3-topshiriq: JPEG sifat darajasi", en: "Task 3: JPEG Quality Artifact Check" }, tplUz: "JPEG sifat={SIFAT} bilan saqlang, hajmi va blocking artefaktlarini tasvirlang.", tplEn: "Save JPEG at quality={SIFAT}, record size and blocking artifacts.", rows: [{ SIFAT: 5 }, { SIFAT: 12 }, { SIFAT: 19 }, { SIFAT: 26 }, { SIFAT: 33 }, { SIFAT: 40 }, { SIFAT: 47 }, { SIFAT: 54 }, { SIFAT: 61 }, { SIFAT: 68 }] },
      { title: { uz: "4-topshiriq (uyga): Kanallarni almashtirish", en: "Task 4 (Home): Channel Swap" }, tplUz: "Tasvirning {K1} va {K2} kanallarini split→merge orqali almashtirib natijani izohlang.", tplEn: "Swap channels {K1} and {K2} via split/merge and explain the color shift.", rows: [{ K1: "R", K2: "G" }, { K1: "G", K2: "B" }, { K1: "B", K2: "R" }, { K1: "R", K2: "G" }, { K1: "G", K2: "B" }, { K1: "B", K2: "R" }, { K1: "R", K2: "G" }, { K1: "G", K2: "B" }, { K1: "B", K2: "R" }, { K1: "R", K2: "G" }] }
    ]
  },
  {
    id: 3, code: 'A3', topicId: 3,
    title: { uz: "Ranglar palitrasini almashtirish (RGB → HSV/LAB, Maska)", en: "Color Space Conversion & HSV Color Masking" },
    objective: { uz: "BGR tasvirni HSV va LAB fazolariga o'tkazish, inRange bilan maska yaratish va konturlar orqali obyekt markazini topish.", en: "Convert BGR to HSV/LAB, build binary color masks with cv2.inRange, and extract contours." },
    formulas: ["hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)", "mask = cv2.inRange(hsv, lower, upper)", "res = cv2.bitwise_and(img, img, mask=mask)"],
    pythonCode: `import cv2, numpy as np

img = cv2.imread('rasm.jpg')
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
lower = np.array([20, 100, 100])
upper = np.array([35, 255, 255])
mask = cv2.inRange(hsv, lower, upper)
result = cv2.bitwise_and(img, img, mask=mask)
print("Ajratilgan piksellar:", cv2.countNonZero(mask))`,
    commonTask: { uz: "Tasvirni HSV va LAB fazolariga o'tkazing va uchalasini (BGR, HSV, LAB) solishtiring.", en: "Convert an image to HSV and LAB and compare all three visually." },
    tasks: [
      { title: { uz: "1-topshiriq: Hue oralig'i bo'yicha maska", en: "Task 1: HSV Hue Masking" }, tplUz: "{RANG} rangli obyektlarni Hue [{HMIN}, {HMAX}] diapazonida ajratib oling.", tplEn: "Segment {RANG} objects using Hue range [{HMIN}, {HMAX}].", rows: [{ RANG: "qizil/sariq", HMIN: 15, HMAX: 35 }, { RANG: "yashil", HMIN: 25, HMAX: 45 }, { RANG: "yashil/ko'k", HMIN: 35, HMAX: 55 }, { RANG: "yashil", HMIN: 45, HMAX: 65 }, { RANG: "och yashil", HMIN: 55, HMAX: 75 }, { RANG: "siyan", HMIN: 65, HMAX: 85 }, { RANG: "siyan/ko'k", HMIN: 75, HMAX: 95 }, { RANG: "ko'k", HMIN: 85, HMAX: 105 }, { RANG: "to'q ko'k", HMIN: 95, HMAX: 115 }, { RANG: "binafsha", HMIN: 105, HMAX: 125 }] },
      { title: { uz: "2-topshiriq: Morfologik tozalash", en: "Task 2: Morphological Opening" }, tplUz: "Maskaga {YADRO}×{YADRO} yadro bilan erroziya va dilatatsiya (MORPH_OPEN) qo'llang.", tplEn: "Apply morphological opening with a {YADRO}×{YADRO} kernel to clean mask noise.", rows: [{ YADRO: 3 }, { YADRO: 5 }, { YADRO: 7 }, { YADRO: 9 }, { YADRO: 3 }, { YADRO: 5 }, { YADRO: 7 }, { YADRO: 9 }, { YADRO: 3 }, { YADRO: 5 }] },
      { title: { uz: "3-topshiriq: Konturlar va Markaz", en: "Task 3: Top-N Contours & Centroids" }, tplUz: "cv2.findContours() bilan eng katta {SON} ta konturning markazini (moments) topib belgilang.", tplEn: "Find the largest {SON} contours via cv2.findContours() and mark their centroids.", rows: [{ SON: 1 }, { SON: 2 }, { SON: 3 }, { SON: 4 }, { SON: 5 }, { SON: 1 }, { SON: 2 }, { SON: 3 }, { SON: 4 }, { SON: 5 }] },
      { title: { uz: "4-topshiriq (uyga): LAB vs RGB masofa", en: "Task 4 (Home): LAB vs RGB Distance" }, tplUz: "BGR {RANG1} va {RANG2} piksellari orasidagi LAB hamda RGB Yevklid masofasini solishtiring.", tplEn: "Compare Euclidean distance between BGR {RANG1} and {RANG2} in LAB vs RGB.", rows: [{ RANG1: "(255,0,0)", RANG2: "(200,50,50)" }, { RANG1: "(0,255,0)", RANG2: "(50,200,50)" }, { RANG1: "(0,0,255)", RANG2: "(50,50,200)" }, { RANG1: "(255,255,0)", RANG2: "(200,200,50)" }, { RANG1: "(255,0,0)", RANG2: "(200,50,50)" }, { RANG1: "(0,255,0)", RANG2: "(50,200,50)" }, { RANG1: "(0,0,255)", RANG2: "(50,50,200)" }, { RANG1: "(255,255,0)", RANG2: "(200,200,50)" }, { RANG1: "(255,0,0)", RANG2: "(200,50,50)" }, { RANG1: "(0,255,0)", RANG2: "(50,200,50)" }] }
    ]
  },
  {
    id: 4, code: 'A4', topicId: 4,
    title: { uz: "Chiziqli filtrlarni qo'llash (Mean, Gauss, Unsharp Masking)", en: "Linear Filtering: Mean, Gaussian & Unsharp Masking" },
    objective: { uz: "Turli yadro o'lchamida Mean va Gauss filtrlarini qo'llash va shovqinli tasvirda PSNR ni o'lchash.", en: "Apply Mean and Gaussian kernels across sizes and benchmark denoising via PSNR." },
    formulas: ["cv2.blur(img, (k, k))", "cv2.GaussianBlur(img, (k, k), sigmaX)", "cv2.PSNR(clean, filtered)"],
    colabUrl: "Amaliy4.ipynb",
    pythonCode: `import cv2, numpy as np

img = cv2.imread('rasm.jpg').astype(np.float32)
noise = np.random.normal(0, 15, img.shape).astype(np.float32)
noisy = np.clip(img + noise, 0, 255).astype(np.uint8)
img_u8 = img.astype(np.uint8)

for k in [3, 5, 9]:
    mean_res = cv2.blur(noisy, (k, k))
    gauss_res = cv2.GaussianBlur(noisy, (k, k), 0)
    print(f"k={k}: Mean PSNR={cv2.PSNR(img_u8, mean_res):.2f} dB, Gauss PSNR={cv2.PSNR(img_u8, gauss_res):.2f} dB")`,
    commonTask: { uz: "σ=15 Gauss shovqinli tasvirni 3×3, 5×5 va 9×9 Mean/Gauss filtrlaridan o'tkazib PSNR jadvalini tuzing.", en: "Denoise a σ=15 Gaussian noisy image using 3×3, 5×5, 9×9 Mean/Gaussian filters and tabulate PSNR." },
    tasks: [
      { title: { uz: "1-topshiriq: Yadro va Sigma ta'siri", en: "Task 1: Kernel Size & Sigma" }, tplUz: "{YADRO}×{YADRO} o'lchamli Gauss filtrini sigma={SIGMA} bilan qo'llang.", tplEn: "Apply a {YADRO}×{YADRO} Gaussian filter with sigma={SIGMA}.", rows: [{ YADRO: 3, SIGMA: 0.8 }, { YADRO: 5, SIGMA: 1.1 }, { YADRO: 7, SIGMA: 1.4 }, { YADRO: 9, SIGMA: 1.7 }, { YADRO: 11, SIGMA: 2.0 }, { YADRO: 13, SIGMA: 2.3 }, { YADRO: 3, SIGMA: 2.6 }, { YADRO: 5, SIGMA: 2.9 }, { YADRO: 7, SIGMA: 3.2 }, { YADRO: 9, SIGMA: 3.5 }] },
      { title: { uz: "2-topshiriq: Shovqin darajasi vs PSNR", en: "Task 2: Noise Level vs PSNR" }, tplUz: "σ_shovqin={SHOVQIN} li Gauss shovqini qo'shib 5×5 Gauss bilan tozalang va PSNR ni o'lchang.", tplEn: "Add Gaussian noise σ={SHOVQIN}, denoise with 5×5 Gaussian, and compute PSNR.", rows: [{ SHOVQIN: 5 }, { SHOVQIN: 8 }, { SHOVQIN: 11 }, { SHOVQIN: 14 }, { SHOVQIN: 17 }, { SHOVQIN: 20 }, { SHOVQIN: 23 }, { SHOVQIN: 26 }, { SHOVQIN: 29 }, { SHOVQIN: 32 }] },
      { title: { uz: "3-topshiriq: Mean vs Gauss chekkalar", en: "Task 3: Mean vs Gaussian Edges" }, tplUz: "{YADRO}×{YADRO} Mean va Gauss filtrlarini yonma-yon ko'rsatib chekkalar farqini yozing.", tplEn: "Compare {YADRO}×{YADRO} Mean and Gaussian blur side-by-side on edges.", rows: [{ YADRO: 5 }, { YADRO: 7 }, { YADRO: 9 }, { YADRO: 11 }, { YADRO: 5 }, { YADRO: 7 }, { YADRO: 9 }, { YADRO: 11 }, { YADRO: 5 }, { YADRO: 7 }] },
      { title: { uz: "4-topshiriq (uyga): Unsharp Masking", en: "Task 4 (Home): Unsharp Masking" }, tplUz: "σ={SIGMA} bilan xiralashtirib, aslidan ayirib {KOEF} koeffitsient bilan qo'shing (sharpening).", tplEn: "Blur with σ={SIGMA}, subtract from original, and add back with weight {KOEF}.", rows: [{ SIGMA: 1.0, KOEF: 0.5 }, { SIGMA: 1.2, KOEF: 0.65 }, { SIGMA: 1.4, KOEF: 0.8 }, { SIGMA: 1.6, KOEF: 0.95 }, { SIGMA: 1.8, KOEF: 1.1 }, { SIGMA: 2.0, KOEF: 1.25 }, { SIGMA: 2.2, KOEF: 1.4 }, { SIGMA: 2.4, KOEF: 1.55 }, { SIGMA: 2.6, KOEF: 1.7 }, { SIGMA: 2.8, KOEF: 1.85 }] }
    ]
  },
  {
    id: 5, code: 'A5', topicId: 5,
    title: { uz: "Nochiziqli filtrlarni qo'llash (Median & Bilateral)", en: "Non-Linear Filtering: Median & Bilateral" },
    objective: { uz: "Median filtri bilan salt-and-pepper shovqinini tozalash va Bilateral filtr bilan chekkalarni saqlash.", en: "Eliminate salt-and-pepper noise with Median blur and preserve edges via Bilateral filtering." },
    formulas: ["cv2.medianBlur(img, ksize)", "cv2.bilateralFilter(img, d, sigmaColor, sigmaSpace)"],
    pythonCode: `import cv2, numpy as np

img = cv2.imread('rasm.jpg')
noisy = img.copy()
h, w = img.shape[:2]
for _ in range(int(0.05 * h * w)):
    y, x = np.random.randint(0, h), np.random.randint(0, w)
    noisy[y, x] = 255 if np.random.rand() > 0.5 else 0

med = cv2.medianBlur(noisy, 5)
bil = cv2.bilateralFilter(noisy, d=9, sigmaColor=75, sigmaSpace=75)
print('PSNR Median:', cv2.PSNR(img, med), 'PSNR Bilateral:', cv2.PSNR(img, bil))`,
    commonTask: { uz: "5% salt-and-pepper shovqinli tasvirni Median (k=5) va Bilateral (d=9) bilan tozalab PSNR ni solishtiring.", en: "Clean 5% salt-and-pepper noise with Median (k=5) & Bilateral (d=9) and compare PSNR." },
    tasks: [
      { title: { uz: "1-topshiriq: Median yadro o'lchami", en: "Task 1: Median Kernel Size" }, tplUz: "{SHOVQIN}% salt-and-pepper shovqinini {YADRO}×{YADRO} median filtr bilan tozalang.", tplEn: "Remove {SHOVQIN}% salt-and-pepper noise using a {YADRO}×{YADRO} median filter.", rows: [{ SHOVQIN: 2, YADRO: 3 }, { SHOVQIN: 3, YADRO: 5 }, { SHOVQIN: 4, YADRO: 7 }, { SHOVQIN: 5, YADRO: 9 }, { SHOVQIN: 6, YADRO: 3 }, { SHOVQIN: 7, YADRO: 5 }, { SHOVQIN: 8, YADRO: 7 }, { SHOVQIN: 9, YADRO: 9 }, { SHOVQIN: 10, YADRO: 3 }, { SHOVQIN: 11, YADRO: 5 }] },
      { title: { uz: "2-topshiriq: Bilateral parametrlar", en: "Task 2: Bilateral Parameters" }, tplUz: "sigmaColor={SC}, sigmaSpace={SS} bilan bilateral filtr qo'llab chekkalar saqlanishini baholang.", tplEn: "Run bilateralFilter with sigmaColor={SC}, sigmaSpace={SS} and evaluate edge retention.", rows: [{ SC: 30, SS: 30 }, { SC: 45, SS: 45 }, { SC: 60, SS: 60 }, { SC: 75, SS: 75 }, { SC: 90, SS: 90 }, { SC: 105, SS: 105 }, { SC: 120, SS: 120 }, { SC: 135, SS: 135 }, { SC: 150, SS: 150 }, { SC: 165, SS: 165 }] },
      { title: { uz: "3-topshiriq: Gauss vs Median", en: "Task 3: Gaussian vs Median" }, tplUz: "{SHOVQIN}% salt-and-pepper shovqinida 5×5 Gauss va 5×5 Median PSNR larini solishtiring.", tplEn: "Compare 5×5 Gaussian vs 5×5 Median PSNR under {SHOVQIN}% salt-and-pepper noise.", rows: [{ SHOVQIN: 3 }, { SHOVQIN: 5 }, { SHOVQIN: 7 }, { SHOVQIN: 9 }, { SHOVQIN: 11 }, { SHOVQIN: 13 }, { SHOVQIN: 15 }, { SHOVQIN: 17 }, { SHOVQIN: 19 }, { SHOVQIN: 21 }] },
      { title: { uz: "4-topshiriq (uyga): Ketma-ket filtrlash", en: "Task 4 (Home): Sequential Denoising" }, tplUz: "Avval {YADRO}×{YADRO} median, keyin bilateral (d=9) qo'llab yakka filtr natijasi bilan solishtiring.", tplEn: "Chain {YADRO}×{YADRO} median followed by bilateral (d=9) and compare.", rows: [{ YADRO: 3 }, { YADRO: 5 }, { YADRO: 7 }, { YADRO: 3 }, { YADRO: 5 }, { YADRO: 7 }, { YADRO: 3 }, { YADRO: 5 }, { YADRO: 7 }, { YADRO: 3 }] }
    ]
  },
  {
    id: 6, code: 'A6', topicId: 6,
    title: { uz: "Chekka aniqlash algoritmlari (Sobel, Prewitt, Canny)", en: "Edge Detection Practice: Sobel, Prewitt & Canny" },
    objective: { uz: "Sobel/Prewitt gradientlarini hisoblash va Canny parametrlarini (T_low, T_high) sozlash.", en: "Compute Sobel/Prewitt gradients and tune Canny thresholds." },
    formulas: ["Gx = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)", "mag = np.sqrt(Gx**2 + Gy**2)", "edges = cv2.Canny(gray, T_low, T_high)"],
    pythonCode: `import cv2, numpy as np

gray = cv2.imread('rasm.jpg', cv2.IMREAD_GRAYSCALE)
Gx = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)
Gy = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)
mag = np.uint8(255 * np.sqrt(Gx**2 + Gy**2) / (np.sqrt(Gx**2 + Gy**2).max() + 1e-6))

e_soft = cv2.Canny(gray, 50, 100)
e_hard = cv2.Canny(gray, 150, 250)
print("Soft edges:", cv2.countNonZero(e_soft), "Hard edges:", cv2.countNonZero(e_hard))`,
    commonTask: { uz: "Sobel gradient kattaligi va Canny (50, 150) natijasini yonma-yon ko'rsatib farqini yozing.", en: "Display Sobel gradient magnitude alongside Canny (50, 150) and explain." },
    tasks: [
      { title: { uz: "1-topshiriq: Canny thresholdlar", en: "Task 1: Canny Thresholds" }, tplUz: "Canny(T_low={TLOW}, T_high={THIGH}) bilan qo'llang va chekka piksellar sonini hisoblang.", tplEn: "Run Canny(T_low={TLOW}, T_high={THIGH}) and count edge pixels.", rows: [{ TLOW: 30, THIGH: 100 }, { TLOW: 38, THIGH: 115 }, { TLOW: 46, THIGH: 130 }, { TLOW: 54, THIGH: 145 }, { TLOW: 62, THIGH: 160 }, { TLOW: 70, THIGH: 175 }, { TLOW: 78, THIGH: 190 }, { TLOW: 86, THIGH: 205 }, { TLOW: 94, THIGH: 220 }, { TLOW: 102, THIGH: 235 }] },
      { title: { uz: "2-topshiriq: Sobel yadro o'lchami", en: "Task 2: Sobel ksize" }, tplUz: "Sobel operatorini ksize={KSIZE} bilan qo'llab chekka qalinligini tavsiflang.", tplEn: "Run Sobel with ksize={KSIZE} and describe edge thickness/smoothing.", rows: [{ KSIZE: 1 }, { KSIZE: 3 }, { KSIZE: 5 }, { KSIZE: 7 }, { KSIZE: 1 }, { KSIZE: 3 }, { KSIZE: 5 }, { KSIZE: 7 }, { KSIZE: 1 }, { KSIZE: 3 }] },
      { title: { uz: "3-topshiriq: Oldindan Gauss silliqlash", en: "Task 3: Pre-Canny Gaussian Blur" }, tplUz: "Canny dan oldin σ={SIGMA} Gauss silliqlash qo'llab chekka piksellar soniga ta'sirini o'lchang.", tplEn: "Pre-blur with Gaussian σ={SIGMA} before Canny and measure edge pixel reduction.", rows: [{ SIGMA: 0.5 }, { SIGMA: 0.9 }, { SIGMA: 1.3 }, { SIGMA: 1.7 }, { SIGMA: 2.1 }, { SIGMA: 2.5 }, { SIGMA: 2.9 }, { SIGMA: 3.3 }, { SIGMA: 3.7 }, { SIGMA: 4.1 }] },
      { title: { uz: "4-topshiriq (uyga): Qo'lda Prewitt vs Sobel", en: "Task 4 (Home): Prewitt vs Sobel" }, tplUz: "Prewitt yadrosini cv2.filter2D bilan qo'llab {OLCHAM}×{OLCHAM} mintaqada Sobel bilan solishtiring.", tplEn: "Implement Prewitt via cv2.filter2D and compare against Sobel in a {OLCHAM}×{OLCHAM} crop.", rows: [{ OLCHAM: 50 }, { OLCHAM: 80 }, { OLCHAM: 100 }, { OLCHAM: 120 }, { OLCHAM: 50 }, { OLCHAM: 80 }, { OLCHAM: 100 }, { OLCHAM: 120 }, { OLCHAM: 50 }, { OLCHAM: 80 }] }
    ]
  },
  {
    id: 7, code: 'A7', topicId: 7,
    title: { uz: "Xususiyat nuqtalarini aniqlash va moslashtirish (Harris, ORB, SIFT)", en: "Keypoint Detection & Feature Matching (Harris, ORB, SIFT)" },
    objective: { uz: "Harris burchak detektori, ORB/SIFT deskriptorlari va BFMatcher + Lowe ratio testini bajarish.", en: "Run Harris corners, extract ORB/SIFT descriptors, and match features with Lowe's ratio test." },
    formulas: ["R = cv2.cornerHarris(gray, blockSize, ksize, k)", "kp, des = orb.detectAndCompute(gray, None)", "d1 / d2 < ratio"],
    colabUrl: "https://github.com/lookwei/COMP4423",
    pythonCode: `import cv2

img1 = cv2.imread('rasm1.jpg', cv2.IMREAD_GRAYSCALE)
img2 = cv2.imread('rasm2.jpg', cv2.IMREAD_GRAYSCALE)
orb = cv2.ORB_create(nfeatures=500)
kp1, des1 = orb.detectAndCompute(img1, None)
kp2, des2 = orb.detectAndCompute(img2, None)

bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
matches = sorted(bf.match(des1, des2), key=lambda m: m.distance)
out = cv2.drawMatches(img1, kp1, img2, kp2, matches[:30], None, flags=2)
cv2.imwrite('matches_a7.jpg', out)`,
    commonTask: { uz: "Bir obyektning ikkita rakursidagi rasmda ORB kalit nuqtalarini topib eng yaxshi 20 ta moslikni chizing.", en: "Extract ORB keypoints on two views of an object and draw the top 20 matches." },
    tasks: [
      { title: { uz: "1-topshiriq: Harris parametrlari", en: "Task 1: Harris Parameters" }, tplUz: "cv2.cornerHarris ni blockSize={BS}, k={K} bilan qo'llab R > 0.01·R.max() burchaklar sonini toping.", tplEn: "Run cornerHarris with blockSize={BS}, k={K} and count corners above 0.01·R.max().", rows: [{ BS: 2, K: 0.04 }, { BS: 3, K: 0.045 }, { BS: 4, K: 0.05 }, { BS: 5, K: 0.055 }, { BS: 2, K: 0.06 }, { BS: 3, K: 0.065 }, { BS: 4, K: 0.07 }, { BS: 5, K: 0.075 }, { BS: 2, K: 0.08 }, { BS: 3, K: 0.085 }] },
      { title: { uz: "2-topshiriq: ORB kalit nuqtalar soni", en: "Task 2: ORB nfeatures" }, tplUz: "ORB ni nfeatures={N} bilan ishga tushirib taqsimotini tavsiflang.", tplEn: "Configure ORB(nfeatures={N}) and inspect keypoint spatial distribution.", rows: [{ N: 100 }, { N: 150 }, { N: 200 }, { N: 250 }, { N: 300 }, { N: 350 }, { N: 400 }, { N: 450 }, { N: 500 }, { N: 550 }] },
      { title: { uz: "3-topshiriq: Lowe nisbat testi", en: "Task 3: Lowe Ratio Test" }, tplUz: "knnMatch(k=2) bilan Lowe nisbat chegarasini {NISBAT} qilib qo'llang va qolgan mosliklar sonini hisoblang.", tplEn: "Apply Lowe's ratio test with threshold={NISBAT} on knnMatch(k=2).", rows: [{ NISBAT: 0.65 }, { NISBAT: 0.7 }, { NISBAT: 0.75 }, { NISBAT: 0.8 }, { NISBAT: 0.85 }, { NISBAT: 0.9 }, { NISBAT: 0.95 }, { NISBAT: 1.0 }, { NISBAT: 1.05 }, { NISBAT: 1.1 }] },
      { title: { uz: "4-topshiriq (uyga): SIFT vs ORB tezligi", en: "Task 4 (Home): SIFT vs ORB Benchmark" }, tplUz: "SIFT va ORB ishlash vaqtini {TAKROR} marta o'lchab o'rtachasini va mosliklar sonini solishtiring.", tplEn: "Benchmark SIFT vs ORB runtime averaged over {TAKROR} runs and compare match counts.", rows: [{ TAKROR: 3 }, { TAKROR: 5 }, { TAKROR: 7 }, { TAKROR: 9 }, { TAKROR: 11 }, { TAKROR: 13 }, { TAKROR: 15 }, { TAKROR: 17 }, { TAKROR: 19 }, { TAKROR: 21 }] }
    ]
  },
  {
    id: 8, code: 'A8', topicId: 8,
    title: { uz: "Robust moslashtirish amaliyoti (Hough & RANSAC)", en: "Robust Model Fitting: Hough Transform & RANSAC" },
    objective: { uz: "HoughLinesP/HoughCircles bilan shakl topish va RANSAC yordamida outlierlarni filtrlash.", en: "Detect lines/circles via Hough Transform and filter outlier matches via RANSAC." },
    formulas: ["cv2.HoughLinesP(edges, 1, np.pi/180, th, minLineLength, maxLineGap)", "H, mask = cv2.findHomography(pts1, pts2, cv2.RANSAC, thr)"],
    pythonCode: `import cv2, numpy as np

img = cv2.imread('yol.jpg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
edges = cv2.Canny(gray, 50, 150)
lines = cv2.HoughLinesP(edges, 1, np.pi/180, threshold=80, minLineLength=50, maxLineGap=10)
if lines is not None:
    for l in lines:
        x1, y1, x2, y2 = l[0]
        cv2.line(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
cv2.imwrite('hough_a8.jpg', img)`,
    commonTask: { uz: "Yo'l yoki bino tasvirida Canny + HoughLinesP bilan to'g'ri chiziqlarni aniqlab tasvirga chizing.", en: "Run Canny + HoughLinesP on a road/building image and overlay detected lines." },
    tasks: [
      { title: { uz: "1-topshiriq: HoughLinesP parametrlari", en: "Task 1: HoughLinesP Thresholds" }, tplUz: "HoughLinesP ni threshold={TH}, minLineLength={MLL} bilan ishga tushirib chiziqlar sonini toping.", tplEn: "Run HoughLinesP with threshold={TH}, minLineLength={MLL} and count lines.", rows: [{ TH: 50, MLL: 30 }, { TH: 60, MLL: 40 }, { TH: 70, MLL: 50 }, { TH: 80, MLL: 60 }, { TH: 90, MLL: 70 }, { TH: 100, MLL: 80 }, { TH: 110, MLL: 90 }, { TH: 120, MLL: 100 }, { TH: 130, MLL: 110 }, { TH: 140, MLL: 120 }] },
      { title: { uz: "2-topshiriq: HoughCircles doira aniqlash", en: "Task 2: HoughCircles Detection" }, tplUz: "HoughCircles ni minRadius={RMIN}, maxRadius={RMAX} bilan qo'llab dumaloq obyektlarni toping.", tplEn: "Detect circular objects using HoughCircles with minRadius={RMIN}, maxRadius={RMAX}.", rows: [{ RMIN: 10, RMAX: 60 }, { RMIN: 15, RMAX: 70 }, { RMIN: 20, RMAX: 80 }, { RMIN: 25, RMAX: 90 }, { RMIN: 30, RMAX: 100 }, { RMIN: 35, RMAX: 110 }, { RMIN: 40, RMAX: 120 }, { RMIN: 45, RMAX: 130 }, { RMIN: 50, RMAX: 140 }, { RMIN: 55, RMAX: 150 }] },
      { title: { uz: "3-topshiriq: RANSAC reprojection threshold", en: "Task 3: RANSAC Reprojection Threshold" }, tplUz: "findHomography ni ransacReprojThreshold={THR} bilan qo'llab inlierlar sonini solishtiring.", tplEn: "Compare inlier counts in findHomography with ransacReprojThreshold={THR}.", rows: [{ THR: 2 }, { THR: 3 }, { THR: 4 }, { THR: 5 }, { THR: 6 }, { THR: 7 }, { THR: 8 }, { THR: 9 }, { THR: 10 }, { THR: 11 }] },
      { title: { uz: "4-topshiriq (uyga): Qo'lda RANSAC chiziq", en: "Task 4 (Home): Scratch 2D Line RANSAC" }, tplUz: "Sintetik 2D nuqtalarda (inlier parametrlari={INLIER} nuqta + tasodifiy outlierlar) qo'lda RANSAC chiziq tenglamasini yozing.", tplEn: "Implement 2D line RANSAC from scratch on synthetic points ({INLIER} inliers + outliers).", rows: [{ INLIER: 50 }, { INLIER: 60 }, { INLIER: 70 }, { INLIER: 80 }, { INLIER: 90 }, { INLIER: 100 }, { INLIER: 110 }, { INLIER: 120 }, { INLIER: 130 }, { INLIER: 140 }] }
    ]
  },
  {
    id: 9, code: 'A9', topicId: 9,
    title: { uz: "Panorama yaratish amaliyoti (Homografiya & Warping)", en: "Image Stitching & Panorama Creation" },
    objective: { uz: "Feature matching + RANSAC orqali H hisoblash, warpPerspective bilan birlashtirish va cv2.Stitcher bilan solishtirish.", en: "Compute homography via ORB + RANSAC, warp images into a panorama, and compare with cv2.Stitcher." },
    formulas: ["H, mask = cv2.findHomography(src, dst, cv2.RANSAC, 5.0)", "warped = cv2.warpPerspective(img2, H, (w1+w2, max(h1,h2)))"],
    pythonCode: `import cv2, numpy as np

img1, img2 = cv2.imread('chap.jpg'), cv2.imread('ong.jpg')
orb = cv2.ORB_create(2000)
kp1, des1 = orb.detectAndCompute(img1, None)
kp2, des2 = orb.detectAndCompute(img2, None)
matches = cv2.BFMatcher(cv2.NORM_HAMMING).knnMatch(des1, des2, k=2)
good = [m for m, n in matches if m.distance < 0.75 * n.distance]

src = np.float32([kp2[m.trainIdx].pt for m in good]).reshape(-1, 1, 2)
dst = np.float32([kp1[m.queryIdx].pt for m in good]).reshape(-1, 1, 2)
H, mask = cv2.findHomography(src, dst, cv2.RANSAC, 5.0)
h1, w1 = img1.shape[:2]; h2, w2 = img2.shape[:2]
res = cv2.warpPerspective(img2, H, (w1 + w2, max(h1, h2)))
res[0:h1, 0:w1] = img1
cv2.imwrite('panorama.jpg', res)`,
    commonTask: { uz: "Taxminan 30% ustma-ust tushuvchi ikki tasvirdan ORB + RANSAC orqali oddiy panorama yig'ing.", en: "Stitch two ~30% overlapping photos using ORB + RANSAC homography." },
    tasks: [
      { title: { uz: "1-topshiriq: Ustma-ust tushish foizi", en: "Task 1: Overlap Ratio" }, tplUz: "Taxminan {OVERLAP}% ustma-ust tushuvchi (yoki ko'p qamrovli) tasvirdan panorama yig'ib inlierlarni o'lchang.", tplEn: "Stitch images with ~{OVERLAP}% target overlap/coverage and record inliers.", rows: [{ OVERLAP: 20 }, { OVERLAP: 30 }, { OVERLAP: 40 }, { OVERLAP: 50 }, { OVERLAP: 60 }, { OVERLAP: 70 }, { OVERLAP: 80 }, { OVERLAP: 90 }, { OVERLAP: 100 }, { OVERLAP: 110 }] },
      { title: { uz: "2-topshiriq: cv2.Stitcher bilan solishtirish", en: "Task 2: Compare vs cv2.Stitcher" }, tplUz: "Qo'lda yig'ilgan panoramani cv2.Stitcher_create() bilan '{METRIK}' bo'yicha solishtiring.", tplEn: "Compare your manual stitcher vs cv2.Stitcher_create() on '{METRIK}'.", rows: [{ METRIK: "vizual sifat" }, { METRIK: "ishlash vaqti" }, { METRIK: "chok chizig'i sifat" }, { METRIK: "vizual sifat" }, { METRIK: "ishlash vaqti" }, { METRIK: "chok chizig'i sifat" }, { METRIK: "vizual sifat" }, { METRIK: "ishlash vaqti" }, { METRIK: "chok chizig'i sifat" }, { METRIK: "vizual sifat" }] },
      { title: { uz: "3-topshiriq: Ko'p tasvirli panorama", en: "Task 3: Multi-Image Panorama" }, tplUz: "{SON} ta ketma-ket ustma-ust tushuvchi tasvirdan to'liq panorama yig'ing.", tplEn: "Stitch a full panorama from {SON} consecutive overlapping images.", rows: [{ SON: 3 }, { SON: 4 }, { SON: 5 }, { SON: 3 }, { SON: 4 }, { SON: 5 }, { SON: 3 }, { SON: 4 }, { SON: 5 }, { SON: 3 }] },
      { title: { uz: "4-topshiriq (uyga): Feathering blending", en: "Task 4 (Home): Feather Blending" }, tplUz: "Chok chizig'i atrofida {KENGLIK} px kenglikda chiziqli alpha feathering blending qo'llang.", tplEn: "Apply linear alpha feathering over a {KENGLIK}-pixel seam band.", rows: [{ KENGLIK: 20 }, { KENGLIK: 30 }, { KENGLIK: 40 }, { KENGLIK: 50 }, { KENGLIK: 60 }, { KENGLIK: 70 }, { KENGLIK: 80 }, { KENGLIK: 90 }, { KENGLIK: 100 }, { KENGLIK: 110 }] }
    ]
  },
  {
    id: 10, code: 'A10', topicId: 10,
    title: { uz: "Kamera modeli hisob-kitoblari (Pinhole 3D → 2D)", en: "Pinhole Camera Model & 3D → 2D Projection" },
    objective: { uz: "P=K[R|t] proyeksiya matritsasini tuzish, 3D nuqtani 2D pikselga proyeksiyalash va qo'lda tekshirish.", en: "Build P=K[R|t], project 3D points to 2D pixels, and verify by hand." },
    formulas: ["P = K @ np.hstack([R, t.reshape(3,1)])", "[u, v, w]ᵀ = P @ [X, Y, Z, 1]ᵀ", "pixel = (u/w, v/w)"],
    pythonCode: `import numpy as np

fx, fy, cx, cy = 800, 800, 320, 240
K = np.array([[fx, 0, cx], [0, fy, cy], [0, 0, 1]])
R = np.eye(3); t = np.zeros((3, 1))
P = K @ np.hstack([R, t])

X = np.array([2, 1, 10, 1])
proj = P @ X
u, v = proj[0] / proj[2], proj[1] / proj[2]
print(f"Piksel: u={u:.1f}, v={v:.1f} | Tekshiruv: {fx*2/10 + cx}")`,
    commonTask: { uz: "fx=fy=800, cx=320, cy=240 uchun (1, 2, 8) 3D nuqtasini 2D pikselga proyeksiyalang va qo'lda tekshiring.", en: "Project (1, 2, 8) using fx=fy=800, cx=320, cy=240 and verify manually." },
    tasks: [
      { title: { uz: "1-topshiriq: Fokal masofa ta'siri", en: "Task 1: Focal Length Scaling" }, tplUz: "f={F} px bo'lganda (1, 1, {Z}) 3D nuqtaning proyeksiyasini hisoblang.", tplEn: "Compute the 2D projection of (1, 1, {Z}) for f={F} px.", rows: [{ F: 500, Z: 5 }, { F: 550, Z: 7 }, { F: 600, Z: 9 }, { F: 650, Z: 11 }, { F: 700, Z: 13 }, { F: 750, Z: 15 }, { F: 800, Z: 17 }, { F: 850, Z: 19 }, { F: 900, Z: 21 }, { F: 950, Z: 23 }] },
      { title: { uz: "2-topshiriq: Masofa va o'lcham nisbati", en: "Task 2: Depth Foreshortening" }, tplUz: "(X,Y)=({X},{Y}) nuqtani Z={Z1} va Z={Z2} masofalarda proyeksiyalab nisbatini tahlil qiling.", tplEn: "Project (X,Y)=({X},{Y}) at depths Z={Z1} and Z={Z2} and analyze the ratio.", rows: [{ X: 2, Y: 1, Z1: 5, Z2: 15 }, { X: 3, Y: 2, Z1: 7, Z2: 18 }, { X: 4, Y: 3, Z1: 9, Z2: 21 }, { X: 5, Y: 4, Z1: 11, Z2: 24 }, { X: 6, Y: 5, Z1: 13, Z2: 27 }, { X: 7, Y: 6, Z1: 15, Z2: 30 }, { X: 8, Y: 7, Z1: 17, Z2: 33 }, { X: 9, Y: 8, Z1: 19, Z2: 36 }, { X: 10, Y: 9, Z1: 21, Z2: 39 }, { X: 11, Y: 10, Z1: 23, Z2: 42 }] },
      { title: { uz: "3-topshiriq: Y o'qi atrofida aylanish", en: "Task 3: Yaw Rotation Projection" }, tplUz: "Kamera Y o'qi atrofida {BURCHAK}° aylantirilganda R matritsasi orqali (1,0,10) proyeksiyasini toping.", tplEn: "Rotate camera by {BURCHAK}° around Y-axis and project (1,0,10).", rows: [{ BURCHAK: 5 }, { BURCHAK: 10 }, { BURCHAK: 15 }, { BURCHAK: 20 }, { BURCHAK: 25 }, { BURCHAK: 30 }, { BURCHAK: 35 }, { BURCHAK: 40 }, { BURCHAK: 45 }, { BURCHAK: 50 }] },
      { title: { uz: "4-topshiriq (uyga): Asosiy nuqta siljishi", en: "Task 4 (Home): Principal Point Offset" }, tplUz: "cx={CX}, cy={CY} bo'lganda (0,0,10) nuqta qayerga proyeksiyalanishini hisoblang va izohlang.", tplEn: "Compute projection of (0,0,10) when cx={CX}, cy={CY} and explain.", rows: [{ CX: 300, CY: 220 }, { CX: 320, CY: 235 }, { CX: 340, CY: 250 }, { CX: 360, CY: 265 }, { CX: 380, CY: 280 }, { CX: 400, CY: 295 }, { CX: 420, CY: 310 }, { CX: 440, CY: 325 }, { CX: 460, CY: 340 }, { CX: 480, CY: 355 }] }
    ]
  },
  {
    id: 11, code: 'A11', topicId: 11,
    title: { uz: "Kamerani kalibrlash amaliyoti (Chessboard & Undistort)", en: "Camera Calibration & Undistortion Lab" },
    objective: { uz: "Shaxmat taxtasi burchaklarini topish, K va distorsiya koeffitsientlarini hisoblash hamda distorsiyani to'g'irlash.", en: "Detect chessboard corners, calibrate K and distortion coefficients, and undistort images." },
    formulas: ["ret, corners = cv2.findChessboardCorners(gray, (nx, ny))", "ret, K, dist, rvecs, tvecs = cv2.calibrateCamera(...)", "cv2.undistort(img, K, dist)"],
    pythonCode: `import cv2, numpy as np, glob

nx, ny = 9, 6
objp = np.zeros((nx*ny, 3), np.float32)
objp[:, :2] = np.mgrid[0:nx, 0:ny].T.reshape(-1, 2)
objpoints, imgpoints = [], []

for fname in glob.glob('chessboard_*.jpg'):
    img = cv2.imread(fname)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    ret, corners = cv2.findChessboardCorners(gray, (nx, ny))
    if ret:
        objpoints.append(objp)
        imgpoints.append(corners)

ret, K, dist, rvecs, tvecs = cv2.calibrateCamera(objpoints, imgpoints, gray.shape[::-1], None, None)
print("K:\n", K, "\nDistortion:", dist.ravel())`,
    commonTask: { uz: "Kamida 10 ta shaxmat taxtasi tasviridan kamerani kalibrlab K, dist va undistorted natijani chiqaring.", en: "Calibrate using ≥10 chessboard images, print K & distortion, and save an undistorted image." },
    tasks: [
      { title: { uz: "1-topshiriq: Kalibrlash tasvirlari soni", en: "Task 1: Calibration Image Count" }, tplUz: "{SON} ta tasvirdan kalibrlab qayta proyeksiya xatosini (reprojection error) o'lchang.", tplEn: "Calibrate with {SON} images and measure mean reprojection error.", rows: [{ SON: 5 }, { SON: 8 }, { SON: 11 }, { SON: 14 }, { SON: 17 }, { SON: 20 }, { SON: 23 }, { SON: 26 }, { SON: 29 }, { SON: 32 }] },
      { title: { uz: "2-topshiriq: Distorsiya modeli", en: "Task 2: Distortion Model Complexity" }, tplUz: "{NECHTA} ta distorsiya koeffitsienti bilan kalibrlab natijalarni solishtiring.", tplEn: "Calibrate using {NECHTA} distortion parameters and compare results.", rows: [{ NECHTA: "2 (k1,k2)" }, { NECHTA: "5 (to'liq)" }, { NECHTA: "2 (k1,k2)" }, { NECHTA: "5 (to'liq)" }, { NECHTA: "2 (k1,k2)" }, { NECHTA: "5 (to'liq)" }, { NECHTA: "2 (k1,k2)" }, { NECHTA: "5 (to'liq)" }, { NECHTA: "2 (k1,k2)" }, { NECHTA: "5 (to'liq)" }] },
      { title: { uz: "3-topshiriq: Taxta o'lchami", en: "Task 3: Board Dimensions" }, tplUz: "Ichki burchaklar sonini ({NX}×{NY}) deb olib objp tuzing va kalibrlang.", tplEn: "Build objp for inner corners ({NX}×{NY}) and run calibration.", rows: [{ NX: 7, NY: 5 }, { NX: 8, NY: 6 }, { NX: 9, NY: 7 }, { NX: 10, NY: 8 }, { NX: 11, NY: 9 }, { NX: 12, NY: 10 }, { NX: 13, NY: 11 }, { NX: 14, NY: 12 }, { NX: 15, NY: 13 }, { NX: 16, NY: 14 }] },
      { title: { uz: "4-topshiriq (uyga): cv2.remap tezligi", en: "Task 4 (Home): cv2.remap Speedup" }, tplUz: "initUndistortRectifyMap + {SON} marta cv2.remap() chaqirib cv2.undistort() bilan tezligini solishtiring.", tplEn: "Compare {SON} calls of precomputed cv2.remap() vs cv2.undistort() runtime.", rows: [{ SON: 50 }, { SON: 75 }, { SON: 100 }, { SON: 125 }, { SON: 150 }, { SON: 175 }, { SON: 200 }, { SON: 225 }, { SON: 250 }, { SON: 275 }] }
    ]
  },
  {
    id: 12, code: 'A12', topicId: 12,
    title: { uz: "Yuzni aniqlash amaliyoti (Haar Cascade, Real-time FPS)", en: "Real-Time Face Detection with Haar Cascades" },
    objective: { uz: "Haar Cascade yuklash, video/tasvirda yuzni real vaqtda aniqlash va scaleFactor / minNeighbors sozlash.", en: "Load Haar Cascades, detect faces in real time, and tune scaleFactor & minNeighbors." },
    formulas: ["faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)", "FPS = 1 / (t_end - t_start)"],
    pythonCode: `import cv2, time

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
cap = cv2.VideoCapture(0)
while True:
    t0 = time.time()
    ret, frame = cap.read()
    if not ret: break
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.1, 5, minSize=(30, 30))
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
    fps = 1 / max(time.time() - t0, 1e-6)
    cv2.putText(frame, f'FPS: {fps:.1f}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
    cv2.imshow('Face Detection', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'): break
cap.release(); cv2.destroyAllWindows()`,
    commonTask: { uz: "Veb-kameradan real vaqtda Haar Cascade bilan yuzlarni aniqlab, o'rtacha FPS ni chiqaring.", en: "Run webcam Haar Cascade face detection and report average FPS." },
    tasks: [
      { title: { uz: "1-topshiriq: scaleFactor sozlash", en: "Task 1: scaleFactor Tuning" }, tplUz: "detectMultiScale ni scaleFactor={SF} bilan sinab FPS va aniqlik ta'sirini baholang.", tplEn: "Test detectMultiScale with scaleFactor={SF} and measure speed vs accuracy.", rows: [{ SF: 1.05 }, { SF: 1.08 }, { SF: 1.11 }, { SF: 1.14 }, { SF: 1.17 }, { SF: 1.2 }, { SF: 1.23 }, { SF: 1.26 }, { SF: 1.29 }, { SF: 1.32 }] },
      { title: { uz: "2-topshiriq: minNeighbors sozlash", en: "Task 2: minNeighbors Tuning" }, tplUz: "minNeighbors={MN} qiymatida yolg'on musbat (false positive) sonini kuzating.", tplEn: "Observe false positive counts at minNeighbors={MN}.", rows: [{ MN: 2 }, { MN: 3 }, { MN: 4 }, { MN: 5 }, { MN: 6 }, { MN: 7 }, { MN: 8 }, { MN: 9 }, { MN: 10 }, { MN: 11 }] },
      { title: { uz: "3-topshiriq: Ko'z aniqlash qo'shish", en: "Task 3: Nested Eye Detection" }, tplUz: "haarcascade_eye.xml yordamida har bir yuz ichida ko'zlarni minSize=({MINSIZE},{MINSIZE}) bilan toping.", tplEn: "Detect eyes inside face ROIs using haarcascade_eye.xml with minSize=({MINSIZE},{MINSIZE}).", rows: [{ MINSIZE: 15 }, { MINSIZE: 20 }, { MINSIZE: 25 }, { MINSIZE: 30 }, { MINSIZE: 35 }, { MINSIZE: 40 }, { MINSIZE: 45 }, { MINSIZE: 50 }, { MINSIZE: 55 }, { MINSIZE: 60 }] },
      { title: { uz: "4-topshiriq (uyga): Statik tasvirlar testi", en: "Task 4 (Home): Multi-Image Benchmark" }, tplUz: "Turli yoritilganlik va burchakdagi {SON} ta rasmda yuzlar sonini aniqlab jadvalga yozing.", tplEn: "Test Haar Cascade across {SON} varied photos and tabulate detected face counts.", rows: [{ SON: 5 }, { SON: 7 }, { SON: 9 }, { SON: 11 }, { SON: 13 }, { SON: 15 }, { SON: 17 }, { SON: 19 }, { SON: 21 }, { SON: 23 }] }
    ]
  },
  {
    id: 13, code: 'A13', topicId: 13,
    title: { uz: "Xususiyatlarni klassifikatorga tayyorlash (HOG & Metrikalar)", en: "Feature Preparation (HOG) & Classification Metrics" },
    objective: { uz: "HOG deskriptorlarini chiqarish, train/test stratifikatsiyali bo'lish va Precision/Recall/F1 hisoblash.", en: "Extract HOG descriptors, perform stratified train/test split, and compute Precision/Recall/F1." },
    formulas: ["hog = cv2.HOGDescriptor((64,128),(16,16),(8,8),(8,8),9)", "train_test_split(X, y, test_size=0.2, stratify=y)", "f1_score(y_true, y_pred)"],
    pythonCode: `import cv2, numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import precision_score, recall_score, f1_score

hog = cv2.HOGDescriptor((64,128), (16,16), (8,8), (8,8), 9)
# Namuna sintetik dataset (haqiqiy fayllar o'rnida)
X = np.array([hog.compute(np.random.randint(0, 255, (128, 64), dtype=np.uint8)).flatten() for _ in range(40)])
y = np.array([0]*20 + [1]*20)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)
print("Train:", X_train.shape, "Test:", X_test.shape)`,
    commonTask: { uz: "Ikki sinfli datasetdan HOG vektorlari olib 80/20 nisbatda train/test ga bo'ling va shakllarini chiqaring.", en: "Extract HOG vectors for a 2-class dataset, split 80/20, and print shapes." },
    tasks: [
      { title: { uz: "1-topshiriq: Train/Test nisbati", en: "Task 1: Train/Test Split Ratio" }, tplUz: "test_size={TS} bilan bo'lib, bu nisbatning aniqlikka nazariy ta'sirini tahlil qiling.", tplEn: "Split with test_size={TS} and analyze impact on classifier generalization.", rows: [{ TS: 0.15 }, { TS: 0.2 }, { TS: 0.25 }, { TS: 0.3 }, { TS: 0.35 }, { TS: 0.4 }, { TS: 0.45 }, { TS: 0.5 }, { TS: 0.55 }, { TS: 0.6 }] },
      { title: { uz: "2-topshiriq: HOG cellSize", en: "Task 2: HOG cellSize" }, tplUz: "HOG ni cellSize=({CELL},{CELL}) bilan hisoblab vektor uzunligi qanday o'zgarishini toping.", tplEn: "Compute HOG with cellSize=({CELL},{CELL}) and record feature vector dimension.", rows: [{ CELL: 4 }, { CELL: 8 }, { CELL: 16 }, { CELL: 4 }, { CELL: 8 }, { CELL: 16 }, { CELL: 4 }, { CELL: 8 }, { CELL: 16 }, { CELL: 4 }] },
      { title: { uz: "3-topshiriq: Qo'lda vs sklearn metrikalar", en: "Task 3: Manual vs sklearn Metrics" }, tplUz: "TP={TP}, FP={FP}, FN={FN}, TN={TN} dan Precision, Recall va F1 ni qo'lda hamda sklearn da solishtiring.", tplEn: "Compute Precision, Recall, F1 by hand & sklearn for TP={TP}, FP={FP}, FN={FN}, TN={TN}.", rows: [{ TP: 30, FP: 8, FN: 6, TN: 35 }, { TP: 35, FP: 10, FN: 8, TN: 40 }, { TP: 40, FP: 12, FN: 10, TN: 45 }, { TP: 45, FP: 14, FN: 12, TN: 50 }, { TP: 50, FP: 16, FN: 14, TN: 55 }, { TP: 55, FP: 18, FN: 16, TN: 60 }, { TP: 60, FP: 20, FN: 18, TN: 65 }, { TP: 65, FP: 22, FN: 20, TN: 70 }, { TP: 70, FP: 24, FN: 22, TN: 75 }, { TP: 75, FP: 26, FN: 24, TN: 80 }] },
      { title: { uz: "4-topshiriq (uyga): Stratifikatsiya ta'siri", en: "Task 4 (Home): Stratified Split Check" }, tplUz: "{SINFLAR} sinfli nomutanosib to'plamda stratify=y bilan va usiz taqsimotni solishtiring.", tplEn: "Compare class distributions with and without stratify=y on a {SINFLAR}-class imbalanced set.", rows: [{ SINFLAR: 2 }, { SINFLAR: 3 }, { SINFLAR: 4 }, { SINFLAR: 5 }, { SINFLAR: 6 }, { SINFLAR: 7 }, { SINFLAR: 8 }, { SINFLAR: 9 }, { SINFLAR: 10 }, { SINFLAR: 11 }] }
    ]
  },
  {
    id: 14, code: 'A14', topicId: 14,
    title: { uz: "Klassik ML klassifikatorlarini qo'llash (k-NN & SVM)", en: "Classical ML Classifiers: k-NN & SVM on HOG Features" },
    objective: { uz: "HOG xususiyatlari ustida k-NN va turli kernelli SVM ni o'qitish hamda confusion matrix bilan baholash.", en: "Train k-NN and multi-kernel SVMs on HOG features and evaluate via Confusion Matrix." },
    formulas: ["knn = KNeighborsClassifier(n_neighbors=k)", "svm = SVC(kernel='rbf', C=1.0)", "cm = confusion_matrix(y_test, y_pred)"],
    colabUrl: "https://github.com/lookwei/COMP4423",
    pythonCode: `from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, confusion_matrix

knn = KNeighborsClassifier(n_neighbors=5).fit(X_train, y_train)
svm_lin = SVC(kernel='linear', C=1.0).fit(X_train, y_train)
svm_rbf = SVC(kernel='rbf', C=1.0, gamma='scale').fit(X_train, y_train)

print("KNN:", accuracy_score(y_test, knn.predict(X_test)))
print("SVM Linear:", accuracy_score(y_test, svm_lin.predict(X_test)))
print("SVM RBF:\n", confusion_matrix(y_test, svm_rbf.predict(X_test)))`,
    commonTask: { uz: "HOG xususiyatlarida KNN (k=5) va SVM (RBF) ni o'qitib aniqlik va confusion matrix ni solishtiring.", en: "Train k-NN (k=5) & RBF SVM on HOG features and compare accuracy & confusion matrices." },
    tasks: [
      { title: { uz: "1-topshiriq: k qiymatini sozlash", en: "Task 1: Tune k in k-NN" }, tplUz: "KNN ni k={K} bilan sinab, aniqlik o'zgarishini kuzating.", tplEn: "Evaluate k-NN with k={K} and analyze validation accuracy.", rows: [{ K: 1 }, { K: 2 }, { K: 3 }, { K: 4 }, { K: 5 }, { K: 6 }, { K: 7 }, { K: 8 }, { K: 9 }, { K: 10 }] },
      { title: { uz: "2-topshiriq: SVM kernel taqqoslash", en: "Task 2: SVM Kernel Comparison" }, tplUz: "SVM ni {KERNEL} kernel bilan o'qitib linear kernelga nisbatan solishtiring.", tplEn: "Train SVM with {KERNEL} kernel and compare against linear kernel.", rows: [{ KERNEL: "linear" }, { KERNEL: "rbf" }, { KERNEL: "poly (degree=2)" }, { KERNEL: "poly (degree=3)" }, { KERNEL: "linear" }, { KERNEL: "rbf" }, { KERNEL: "poly (degree=2)" }, { KERNEL: "poly (degree=3)" }, { KERNEL: "linear" }, { KERNEL: "rbf" }] },
      { title: { uz: "3-topshiriq: SVM C regularizatsiyasi", en: "Task 3: SVM Soft-Margin C" }, tplUz: "SVM (RBF) ni C={C} bilan o'qitib train/test aniqligiga ta'sirini tahlil qiling.", tplEn: "Train RBF SVM with C={C} and analyze train vs test accuracy.", rows: [{ C: 0.1 }, { C: 0.6 }, { C: 1.1 }, { C: 1.6 }, { C: 2.1 }, { C: 2.6 }, { C: 3.1 }, { C: 3.6 }, { C: 4.1 }, { C: 4.6 }] },
      { title: { uz: "4-topshiriq (uyga): Cross-Validation", en: "Task 4 (Home): k-Fold Cross-Validation" }, tplUz: "cross_val_score bilan {FOLD}-fold CV o'tkazib o'rtacha aniqlik va std ni toping.", tplEn: "Run {FOLD}-fold cross_val_score and report mean accuracy ± std.", rows: [{ FOLD: 3 }, { FOLD: 4 }, { FOLD: 5 }, { FOLD: 6 }, { FOLD: 7 }, { FOLD: 8 }, { FOLD: 9 }, { FOLD: 10 }, { FOLD: 3 }, { FOLD: 4 }] }
    ]
  },
  {
    id: 15, code: 'A15', topicId: 15,
    title: { uz: "Dataset tayyorlash amaliyoti (PyTorch Dataset & Augmentation)", en: "PyTorch Dataset, DataLoader & Data Augmentation" },
    objective: { uz: "Maxsus PyTorch Dataset/DataLoader yaratish va torchvision.transforms bilan augmentatsiya qo'llash.", en: "Implement custom PyTorch Dataset/DataLoader and apply torchvision data augmentation." },
    formulas: ["class MyDataset(Dataset): __len__, __getitem__", "DataLoader(ds, batch_size=B, shuffle=True)", "transforms.Compose([...])"],
    colabUrl: "https://github.com/microsoft/computervision-recipes",
    pythonCode: `import torch
from torch.utils.data import Dataset, DataLoader
from torchvision import transforms
from PIL import Image
import os

class LeafDataset(Dataset):
    def __init__(self, root, transform=None):
        self.paths, self.labels = [], []
        for label, cls in enumerate(['sog', 'kasal']):
            folder = os.path.join(root, cls)
            if os.path.isdir(folder):
                for f in os.listdir(folder):
                    self.paths.append(os.path.join(folder, f))
                    self.labels.append(label)
        self.transform = transform
    def __len__(self): return len(self.paths)
    def __getitem__(self, idx):
        img = Image.open(self.paths[idx]).convert('RGB')
        return (self.transform(img) if self.transform else img), self.labels[idx]

tfm = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.RandomHorizontalFlip(0.5),
    transforms.RandomRotation(15),
    transforms.ToTensor()
])`,
    commonTask: { uz: "2 sinfli tasvirlar papkasi uchun Dataset yozing, Flip/Rotation qo'shib batch_size=8 DataLoader shaklini chiqaring.", en: "Write a 2-class Dataset with Flip/Rotation transforms and print DataLoader (batch_size=8) shape." },
    tasks: [
      { title: { uz: "1-topshiriq: Batch sonini hisoblash", en: "Task 1: Batches per Epoch" }, tplUz: "batch_size={BS}, dataset hajmi={HAJM} bo'lganda 1 epoxada nechta batch hosil bo'lishini hisoblang.", tplEn: "Compute batches per epoch for batch_size={BS} and dataset size={HAJM}.", rows: [{ BS: 4, HAJM: 200 }, { BS: 8, HAJM: 240 }, { BS: 16, HAJM: 280 }, { BS: 32, HAJM: 320 }, { BS: 4, HAJM: 360 }, { BS: 8, HAJM: 400 }, { BS: 16, HAJM: 440 }, { BS: 32, HAJM: 480 }, { BS: 4, HAJM: 520 }, { BS: 8, HAJM: 560 }] },
      { title: { uz: "2-topshiriq: Augmentatsiya kombinatsiyasi", en: "Task 2: Augmentation Grid" }, tplUz: "Compose ichiga {AMAL} qo'shib bir rasmdan {SON} ta turlicha natija chiqaring.", tplEn: "Add {AMAL} to Compose and visualize {SON} augmented samples.", rows: [{ AMAL: "ColorJitter(brightness=0.3)", SON: 4 }, { AMAL: "RandomRotation(30)", SON: 6 }, { AMAL: "RandomResizedCrop(200)", SON: 8 }, { AMAL: "RandomVerticalFlip(0.5)", SON: 10 }, { AMAL: "ColorJitter(brightness=0.3)", SON: 12 }, { AMAL: "RandomRotation(30)", SON: 14 }, { AMAL: "RandomResizedCrop(200)", SON: 16 }, { AMAL: "RandomVerticalFlip(0.5)", SON: 18 }, { AMAL: "ColorJitter(brightness=0.3)", SON: 20 }, { AMAL: "RandomRotation(30)", SON: 22 }] },
      { title: { uz: "3-topshiriq: Train/Val random_split", en: "Task 3: Train/Val Split" }, tplUz: "random_split bilan datasetni {TRAIN}%/{VAL}% nisbatda bo'ling (eslatma: ≥100% bo'lsa 85/15 standartini qo'llab izohlang).", tplEn: "Split dataset {TRAIN}%/{VAL}% via random_split (clamp/note if ≥100%).", rows: [{ TRAIN: 70, VAL: 30 }, { TRAIN: 75, VAL: 25 }, { TRAIN: 80, VAL: 20 }, { TRAIN: 85, VAL: 15 }, { TRAIN: 90, VAL: 10 }, { TRAIN: 95, VAL: 5 }, { TRAIN: "80 (O'UM:100)", VAL: "20 (0)" }, { TRAIN: "85 (O'UM:105)", VAL: "15 (-5)" }, { TRAIN: "80 (O'UM:110)", VAL: "20 (-10)" }, { TRAIN: "85 (O'UM:115)", VAL: "15 (-15)" }] },
      { title: { uz: "4-topshiriq (uyga): Sinflar nomutanosibligi", en: "Task 4 (Home): Class Imbalance Check" }, tplUz: "Sinf nomutanosibligi {FOIZ}% dan oshsa qaysi usul (oversampling/class weight) qo'llashni asoslang.", tplEn: "Justify oversampling/class weighting if class imbalance exceeds {FOIZ}%.", rows: [{ FOIZ: 20 }, { FOIZ: 30 }, { FOIZ: 40 }, { FOIZ: 50 }, { FOIZ: 60 }, { FOIZ: 70 }, { FOIZ: 80 }, { FOIZ: 90 }, { FOIZ: 100 }, { FOIZ: 110 }] }
    ]
  },
  {
    id: 16, code: 'A16', topicId: 16,
    title: { uz: "Sodda CNN qurish (PyTorch nn.Conv2d & MaxPool2d)", en: "Building a Simple CNN from Scratch in PyTorch" },
    objective: { uz: "nn.Conv2d, nn.MaxPool2d va ReLU qatlamlarini yozish hamda chiqish tenzori shaklini tekshirish.", en: "Write nn.Conv2d, nn.MaxPool2d, ReLU layers and verify tensor shapes on MNIST." },
    formulas: ["O = floor((I - K + 2*P) / S) + 1", "nn.Conv2d(in_c, out_c, k, padding=p)", "nn.MaxPool2d(2, 2)"],
    colabUrl: "https://github.com/lookwei/COMP4423",
    pythonCode: `import torch, torch.nn as nn, torch.nn.functional as F

class SimpleCNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(1, 16, kernel_size=3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.conv2 = nn.Conv2d(16, 32, kernel_size=3, padding=1)
        self.fc = nn.Linear(32 * 7 * 7, 10)
    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        return self.fc(x.view(x.size(0), -1))

model = SimpleCNN()
print("Chiqish:", model(torch.randn(4, 1, 28, 28)).shape)
print("Parametrlar:", sum(p.numel() for p in model.parameters()))`,
    commonTask: { uz: "MNIST uchun 2 ta Conv+Pool qatlamli SimpleCNN yozib [4, 1, 28, 28] tenzorda sinang.", en: "Implement 2-layer SimpleCNN for MNIST and verify [4, 10] output shape." },
    tasks: [
      { title: { uz: "1-topshiriq: Filtrlar soni va parametrlar", en: "Task 1: out_channels & Params" }, tplUz: "Birinchi conv qatlamda out_channels={OUT} bo'lganda jami parametrlar sonini qo'lda va kodda hisoblang.", tplEn: "Compute total parameters manually and in code when conv1 out_channels={OUT}.", rows: [{ OUT: 8 }, { OUT: 16 }, { OUT: 32 }, { OUT: 64 }, { OUT: 8 }, { OUT: 16 }, { OUT: 32 }, { OUT: 64 }, { OUT: 8 }, { OUT: 16 }] },
      { title: { uz: "2-topshiriq: Yadro va padding", en: "Task 2: Kernel & Padding Shape" }, tplUz: "kernel_size={K}, padding={P} bilan chiqish o'lchamini O formula va kod orqali tekshiring.", tplEn: "Verify output spatial size for kernel_size={K}, padding={P} via formula & PyTorch.", rows: [{ K: 3, P: 0 }, { K: 5, P: 1 }, { K: 7, P: 2 }, { K: 3, P: 0 }, { K: 5, P: 1 }, { K: 7, P: 2 }, { K: 3, P: 0 }, { K: 5, P: 1 }, { K: 7, P: 2 }, { K: 3, P: 0 }] },
      { title: { uz: "3-topshiriq: Uchinchi Conv qatlam", en: "Task 3: Add 3rd Conv Layer" }, tplUz: "Uchinchi conv qatlam (out_channels={OUT3}) qo'shib FC qatlam kirish o'lchamini qayta hisoblang.", tplEn: "Add a 3rd Conv2d (out_channels={OUT3}) and recompute nn.Linear input dimension.", rows: [{ OUT3: 32 }, { OUT3: 64 }, { OUT3: 128 }, { OUT3: 32 }, { OUT3: 64 }, { OUT3: 128 }, { OUT3: 32 }, { OUT3: 64 }, { OUT3: 128 }, { OUT3: 32 }] },
      { title: { uz: "4-topshiriq (uyga): AvgPool2d solishtiruvi", en: "Task 4 (Home): MaxPool vs AvgPool" }, tplUz: "{SON} ta tasodifiy tenzorda MaxPool2d va AvgPool2d chiqish qiymatlari farqini solishtiring.", tplEn: "Compare MaxPool2d vs AvgPool2d outputs across {SON} random tensors.", rows: [{ SON: 3 }, { SON: 5 }, { SON: 7 }, { SON: 9 }, { SON: 11 }, { SON: 13 }, { SON: 15 }, { SON: 17 }, { SON: 19 }, { SON: 21 }] }
    ]
  },
  {
    id: 17, code: 'A17', topicId: 17,
    title: { uz: "CNN ni o'qitish jarayoni (Loss, Optimizer & Loss Curve)", en: "Training a CNN: Loss, Optimizers & Loss Curve" },
    objective: { uz: "CrossEntropyLoss, Adam/SGD optimizatorlarini sozlash va epoxalar bo'yicha loss curve chizish.", en: "Configure CrossEntropyLoss & optimizers and plot training/validation loss curves." },
    formulas: ["criterion = nn.CrossEntropyLoss()", "optimizer.zero_grad(); loss.backward(); optimizer.step()"],
    pythonCode: `import torch, torch.nn as nn, matplotlib.pyplot as plt

criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
loss_history = []

for epoch in range(5):
    total_loss = 0.0
    for images, labels in train_loader:
        optimizer.zero_grad()
        loss = criterion(model(images), labels)
        loss.backward()
        optimizer.step()
        total_loss += loss.item()
    avg = total_loss / len(train_loader)
    loss_history.append(avg)
    print(f"Epoxa {epoch+1}: loss={avg:.4f}")`,
    commonTask: { uz: "SimpleCNN ni 5 epoxa Adam (lr=0.001) bilan o'qitib loss curve grafigini saqlang.", en: "Train SimpleCNN for 5 epochs with Adam (lr=0.001) and plot the loss curve." },
    tasks: [
      { title: { uz: "1-topshiriq: Learning rate va epoxa", en: "Task 1: LR & Epochs" }, tplUz: "lr={LR} bilan {EPOXA} epoxa o'qitib egri chiziq barqarorligini tavsiflang.", tplEn: "Train for {EPOXA} epochs at lr={LR} and describe convergence smoothness.", rows: [{ LR: 0.1, EPOXA: 5 }, { LR: 0.01, EPOXA: 7 }, { LR: 0.001, EPOXA: 9 }, { LR: 0.0001, EPOXA: 11 }, { LR: 0.1, EPOXA: 13 }, { LR: 0.01, EPOXA: 15 }, { LR: 0.001, EPOXA: 17 }, { LR: 0.0001, EPOXA: 19 }, { LR: 0.1, EPOXA: 21 }, { LR: 0.01, EPOXA: 23 }] },
      { title: { uz: "2-topshiriq: Optimizatorlar solishtiruvi", en: "Task 2: Optimizer Benchmark" }, tplUz: "{OPTIM} optimizatori bilan o'qitib Adam bilan yaqinlashish tezligini solishtiring.", tplEn: "Train using {OPTIM} and compare convergence speed against Adam.", rows: [{ OPTIM: "SGD (lr=0.01)" }, { OPTIM: "SGD+momentum (0.9)" }, { OPTIM: "RMSprop" }, { OPTIM: "Adam" }, { OPTIM: "SGD (lr=0.01)" }, { OPTIM: "SGD+momentum (0.9)" }, { OPTIM: "RMSprop" }, { OPTIM: "Adam" }, { OPTIM: "SGD (lr=0.01)" }, { OPTIM: "SGD+momentum (0.9)" }] },
      { title: { uz: "3-topshiriq: Batch o'lchami barqarorligi", en: "Task 3: Batch Size Noise" }, tplUz: "batch_size={BS} bilan o'qitib loss curve dagi tebranish darajasini solishtiring.", tplEn: "Train with batch_size={BS} and observe loss curve variance.", rows: [{ BS: 4 }, { BS: 16 }, { BS: 64 }, { BS: 256 }, { BS: 4 }, { BS: 16 }, { BS: 64 }, { BS: 256 }, { BS: 4 }, { BS: 16 }] },
      { title: { uz: "4-topshiriq (uyga): Overfitting tahlili", en: "Task 4 (Home): Validation Overfitting" }, tplUz: "{EPOXA} epoxa davomida validation aniqligini kuzatib overfitting belgisini tahlil qiling.", tplEn: "Track validation accuracy over {EPOXA} epochs and detect overfitting onset.", rows: [{ EPOXA: 10 }, { EPOXA: 15 }, { EPOXA: 20 }, { EPOXA: 25 }, { EPOXA: 30 }, { EPOXA: 35 }, { EPOXA: 40 }, { EPOXA: 45 }, { EPOXA: 50 }, { EPOXA: 55 }] }
    ]
  },
  {
    id: 18, code: 'A18', topicId: 18,
    title: { uz: "Tayyor modellar bilan ishlash (Transfer Learning & Fine-Tuning)", en: "Transfer Learning & Fine-Tuning (ResNet / VGG / MobileNet)" },
    objective: { uz: "ImageNet pretrained modelini yuklash, qatlamlarni muzlatish va oxirgi qatlamni o'z sinflariga moslash.", en: "Load ImageNet-pretrained backbones, freeze weights, and fine-tune the classifier head." },
    formulas: ["model = models.resnet18(weights='IMAGENET1K_V1')", "param.requires_grad = False", "model.fc = nn.Linear(in_f, num_classes)"],
    colabUrl: "https://github.com/microsoft/computervision-recipes",
    pythonCode: `import torch.nn as nn, torchvision.models as models, torch

model = models.resnet18(weights='IMAGENET1K_V1')
for p in model.parameters():
    p.requires_grad = False

model.fc = nn.Linear(model.fc.in_features, 2)
trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
total = sum(p.numel() for p in model.parameters())
print(f"O'qitiladigan: {trainable} / Jami: {total}")`,
    commonTask: { uz: "Pretrained ResNet18 qatlamlarini muzlatib faqat oxirgi FC qatlamini 2 sinfga 3 epoxa o'qiting.", en: "Freeze ResNet18 backbone, replace model.fc for 2 classes, and fine-tune for 3 epochs." },
    tasks: [
      { title: { uz: "1-topshiriq: Baza arxitektura", en: "Task 1: Backbone Selection" }, tplUz: "{MODEL} modelini yuklab oxirgi qatlamini {SINF} sinfga moslang va parametrlar sonini hisoblang.", tplEn: "Adapt {MODEL} head for {SINF} classes and count trainable vs total parameters.", rows: [{ MODEL: "resnet18", SINF: 2 }, { MODEL: "resnet34", SINF: 3 }, { MODEL: "vgg16", SINF: 4 }, { MODEL: "mobilenet_v2", SINF: 5 }, { MODEL: "resnet18", SINF: 6 }, { MODEL: "resnet34", SINF: 7 }, { MODEL: "vgg16", SINF: 8 }, { MODEL: "mobilenet_v2", SINF: 9 }, { MODEL: "resnet18", SINF: 10 }, { MODEL: "resnet34", SINF: 11 }] },
      { title: { uz: "2-topshiriq: To'liq fine-tuning", en: "Task 2: Full Fine-Tuning" }, tplUz: "Butun tarmoqni muzlatmasdan lr={LR} bilan {EPOXA} epoxa o'qiting.", tplEn: "Unfreeze all layers and fine-tune at lr={LR} for {EPOXA} epochs.", rows: [{ LR: 0.0001, EPOXA: 3 }, { LR: 0.00005, EPOXA: 4 }, { LR: 0.00001, EPOXA: 5 }, { LR: 0.0001, EPOXA: 6 }, { LR: 0.00005, EPOXA: 7 }, { LR: 0.00001, EPOXA: 8 }, { LR: 0.0001, EPOXA: 9 }, { LR: 0.00005, EPOXA: 10 }, { LR: 0.00001, EPOXA: 11 }, { LR: 0.0001, EPOXA: 12 }] },
      { title: { uz: "3-topshiriq: Qisman muzlatish", en: "Task 3: Partial Unfreezing" }, tplUz: "Oxirgi {QATLAM} ta blokni muzlatmasdan qoldirib to'liq muzlatilgan holat bilan solishtiring.", tplEn: "Unfreeze only the last {QATLAM} backbone stage(s) and compare accuracy.", rows: [{ QATLAM: 1 }, { QATLAM: 2 }, { QATLAM: 3 }, { QATLAM: 1 }, { QATLAM: 2 }, { QATLAM: 3 }, { QATLAM: 1 }, { QATLAM: 2 }, { QATLAM: 3 }, { QATLAM: 1 }] },
      { title: { uz: "4-topshiriq (uyga): Dataset hajmi ulushi", en: "Task 4 (Home): Low-Data Transfer" }, tplUz: "Datasetning {FOIZ}% qismi bilan transfer learningni sinab to'liq natija bilan solishtiring (100%+ bo'lsa augmentation bilan kengaytiring).", tplEn: "Test transfer learning on {FOIZ}% data (augment if >100%) vs baseline.", rows: [{ FOIZ: 20 }, { FOIZ: 40 }, { FOIZ: 60 }, { FOIZ: 80 }, { FOIZ: 100 }, { FOIZ: "100+Aug (O'UM:120)" }, { FOIZ: "100+Aug (O'UM:140)" }, { FOIZ: "100+Aug (O'UM:160)" }, { FOIZ: "100+Aug (O'UM:180)" }, { FOIZ: "100+Aug (O'UM:200)" }] }
    ]
  },
  {
    id: 19, code: 'A19', topicId: 19,
    title: { uz: "Obyektlarni aniqlash amaliyoti (Faster R-CNN)", en: "Deep Object Detection Lab: Faster R-CNN" },
    objective: { uz: "Pretrained Faster R-CNN modelidan bounding box, label va score chiqarish hamda confidence filtrlash.", en: "Run pretrained Faster R-CNN inference and filter bounding boxes by confidence & NMS." },
    formulas: ["model = fasterrcnn_resnet50_fpn(weights='COCO_V1')", "keep = scores > conf_thresh"],
    colabUrl: "https://github.com/microsoft/computervision-recipes",
    pythonCode: `import torch, cv2
from torchvision.models.detection import fasterrcnn_resnet50_fpn
from torchvision.transforms import functional as F

model = fasterrcnn_resnet50_fpn(weights='COCO_V1').eval()
img = cv2.imread('sahna.jpg')
tensor = F.to_tensor(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))

with torch.no_grad():
    pred = model([tensor])[0]

for box, score, label in zip(pred['boxes'], pred['scores'], pred['labels']):
    if score > 0.7:
        x1, y1, x2, y2 = box.int().tolist()
        cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
cv2.imwrite('faster_rcnn_a19.jpg', img)`,
    commonTask: { uz: "Kamida 3 ta obyektli tasvirda Faster R-CNN bilan confidence > 0.7 qutilarni chizing.", en: "Run Faster R-CNN on a ≥3-object scene and draw boxes with score > 0.7." },
    tasks: [
      { title: { uz: "1-topshiriq: Confidence chegarasi", en: "Task 1: Confidence Threshold" }, tplUz: "confidence_threshold={THR} bilan filtrlab aniqlangan obyektlar sonini solishtiring (≤0.95 real oraliqda tekshiring).", tplEn: "Filter predictions at confidence_threshold={THR} and compare counts.", rows: [{ THR: 0.3 }, { THR: 0.4 }, { THR: 0.5 }, { THR: 0.6 }, { THR: 0.7 }, { THR: 0.8 }, { THR: 0.9 }, { THR: "0.95 (O'UM:1.0)" }, { THR: "0.85 (O'UM:1.1)" }, { THR: "0.92 (O'UM:1.2)" }] },
      { title: { uz: "2-topshiriq: box_nms_thresh sozlash", en: "Task 2: NMS Threshold" }, tplUz: "box_nms_thresh={NMS} bilan model yaratib ustma-ust qutilar sonini kuzating (0<NMS≤1).", tplEn: "Instantiate Faster R-CNN with box_nms_thresh={NMS} and inspect overlapping boxes.", rows: [{ NMS: 0.3 }, { NMS: 0.45 }, { NMS: 0.6 }, { NMS: 0.75 }, { NMS: 0.9 }, { NMS: "0.95 (O'UM:1.05)" }, { NMS: "0.85 (O'UM:1.2)" }, { NMS: "0.70 (O'UM:1.35)" }, { NMS: "0.50 (O'UM:1.5)" }, { NMS: "0.40 (O'UM:1.65)" }] },
      { title: { uz: "3-topshiriq: Sinf filtri", en: "Task 3: Class Filter" }, tplUz: "Faqat COCO label ID = {SINF} obyektlarini ajratib chizing.", tplEn: "Filter and draw only detections matching COCO ID {SINF}.", rows: [{ SINF: "1 (odam)" }, { SINF: "3 (mashina)" }, { SINF: "17 (mushuk)" }, { SINF: "18 (it)" }, { SINF: "1 (odam)" }, { SINF: "3 (mashina)" }, { SINF: "17 (mushuk)" }, { SINF: "18 (it)" }, { SINF: "1 (odam)" }, { SINF: "3 (mashina)" }] },
      { title: { uz: "4-topshiriq (uyga): Inference FPS", en: "Task 4 (Home): Inference Speed" }, tplUz: "{SON} ta tasvirda o'rtacha inference vaqtini va FPS ni o'lchang.", tplEn: "Benchmark average inference time and FPS across {SON} images.", rows: [{ SON: 5 }, { SON: 10 }, { SON: 15 }, { SON: 20 }, { SON: 25 }, { SON: 30 }, { SON: 35 }, { SON: 40 }, { SON: 45 }, { SON: 50 }] }
    ]
  },
  {
    id: 20, code: 'A20', topicId: 20,
    title: { uz: "Real vaqtda YOLO bilan ishlash (YOLOv8 & FPS)", en: "Real-Time Video Detection with YOLOv8" },
    objective: { uz: "Pretrained YOLO modelini yuklash, video oqimida obyekt aniqlash va end-to-end FPS o'lchash.", en: "Run Ultralytics YOLOv8 on live video and benchmark end-to-end FPS." },
    formulas: ["from ultralytics import YOLO; model = YOLO('yolov8n.pt')", "results = model(frame, conf=0.5)", "FPS = 1 / (t_end - t_start)"],
    colabUrl: "https://github.com/lookwei/COMP4423",
    pythonCode: `import cv2, time
from ultralytics import YOLO

model = YOLO('yolov8n.pt')
cap = cv2.VideoCapture(0)
while True:
    t0 = time.time()
    ret, frame = cap.read()
    if not ret: break
    res = model(frame, conf=0.5, verbose=False)
    ann = res[0].plot()
    fps = 1 / max(time.time() - t0, 1e-6)
    cv2.putText(ann, f'FPS: {fps:.1f}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
    cv2.imshow('YOLOv8', ann)
    if cv2.waitKey(1) & 0xFF == ord('q'): break
cap.release(); cv2.destroyAllWindows()`,
    commonTask: { uz: "YOLOv8n bilan veb-kamerada obyektlarni aniqlab, o'rtacha end-to-end FPS ni yozib oling.", en: "Run YOLOv8n on webcam feed and log average end-to-end FPS." },
    tasks: [
      { title: { uz: "1-topshiriq: Confidence chegarasi", en: "Task 1: YOLO conf" }, tplUz: "conf={CONF} bilan sinab aniqlangan obyektlar sonini solishtiring.", tplEn: "Run YOLO with conf={CONF} and compare detection counts.", rows: [{ CONF: 0.25 }, { CONF: 0.35 }, { CONF: 0.45 }, { CONF: 0.55 }, { CONF: 0.65 }, { CONF: 0.75 }, { CONF: 0.85 }, { CONF: 0.95 }, { CONF: "0.90 (O'UM:1.05)" }, { CONF: "0.80 (O'UM:1.15)" }] },
      { title: { uz: "2-topshiriq: Model o'lchamlari", en: "Task 2: Model Size vs FPS" }, tplUz: "{MODEL} modelini yuklab yolov8n bilan FPS va aniqlikni solishtiring.", tplEn: "Benchmark {MODEL} vs yolov8n for FPS and accuracy.", rows: [{ MODEL: "yolov8s.pt" }, { MODEL: "yolov8m.pt" }, { MODEL: "yolov8l.pt" }, { MODEL: "yolov8s.pt" }, { MODEL: "yolov8m.pt" }, { MODEL: "yolov8l.pt" }, { MODEL: "yolov8s.pt" }, { MODEL: "yolov8m.pt" }, { MODEL: "yolov8l.pt" }, { MODEL: "yolov8s.pt" }] },
      { title: { uz: "3-topshiriq: Sinf cheklash", en: "Task 3: Target Class Filter" }, tplUz: "classes=[{CLASS_ID}] parametri bilan faqat bitta sinfni aniqlang.", tplEn: "Restrict YOLO inference to classes=[{CLASS_ID}].", rows: [{ CLASS_ID: "0 (odam)" }, { CLASS_ID: "2 (mashina)" }, { CLASS_ID: "67 (telefon)" }, { CLASS_ID: "0 (odam)" }, { CLASS_ID: "2 (mashina)" }, { CLASS_ID: "67 (telefon)" }, { CLASS_ID: "0 (odam)" }, { CLASS_ID: "2 (mashina)" }, { CLASS_ID: "67 (telefon)" }, { CLASS_ID: "0 (odam)" }] },
      { title: { uz: "4-topshiriq (uyga): Video fayl statistikasi", en: "Task 4 (Home): Video File Analytics" }, tplUz: "{DAQIQA} daqiqalik videoda jami aniqlashlar soni va o'rtacha FPS ni hisobotga yozing.", tplEn: "Process a {DAQIQA}-minute video file and log total detections & avg FPS.", rows: [{ DAQIQA: 1 }, { DAQIQA: 2 }, { DAQIQA: 3 }, { DAQIQA: 4 }, { DAQIQA: 5 }, { DAQIQA: 6 }, { DAQIQA: 7 }, { DAQIQA: 8 }, { DAQIQA: 9 }, { DAQIQA: 10 }] }
    ]
  },
  {
    id: 21, code: 'A21', topicId: 21,
    title: { uz: "Semantik segmentatsiya amaliyoti (DeepLabV3)", en: "Semantic Segmentation Lab: DeepLabV3" },
    objective: { uz: "Pretrained DeepLabV3-ResNet50 orqali piksel sinf xaritasini olish va rangli maska bilan overlay qilish.", en: "Run pretrained DeepLabV3-ResNet50 to generate per-pixel masks and overlay visualizations." },
    formulas: ["out = model(img_tensor)['out'][0]", "seg_map = out.argmax(0).numpy()", "overlay = cv2.addWeighted(img, 0.6, color_mask, 0.4, 0)"],
    colabUrl: "https://github.com/microsoft/computervision-recipes",
    pythonCode: `import torch, numpy as np, cv2
from torchvision.models.segmentation import deeplabv3_resnet50
from torchvision.transforms import functional as F

model = deeplabv3_resnet50(weights='COCO_WITH_VOC_LABELS_V1').eval()
img = cv2.imread('sahna.jpg')
tensor = F.to_tensor(cv2.cvtColor(img, cv2.COLOR_BGR2RGB)).unsqueeze(0)

with torch.no_grad():
    seg_map = model(tensor)['out'][0].argmax(0).byte().numpy()

palette = np.random.RandomState(0).randint(0, 255, (21, 3), dtype=np.uint8)
overlay = cv2.addWeighted(img, 0.6, palette[seg_map], 0.4, 0)
cv2.imwrite('seg_a21.jpg', overlay)`,
    commonTask: { uz: "DeepLabV3 bilan tasvirni segmentatsiya qilib 40% shaffoflikdagi rangli maska overlay yarating.", en: "Segment an image with DeepLabV3 and blend a 40% color mask overlay." },
    tasks: [
      { title: { uz: "1-topshiriq: Overlay shaffofligi", en: "Task 1: Overlay Alpha" }, tplUz: "cv2.addWeighted da alpha={ALPHA} (≤1.0) bilan overlay yaratib natijani tavsiflang.", tplEn: "Create overlay with alpha={ALPHA} (clamp ≤1.0) and inspect visibility.", rows: [{ ALPHA: 0.4 }, { ALPHA: 0.55 }, { ALPHA: 0.7 }, { ALPHA: 0.85 }, { ALPHA: 1.0 }, { ALPHA: "0.65 (O'UM:1.15)" }, { ALPHA: "0.50 (O'UM:1.30)" }, { ALPHA: "0.45 (O'UM:1.45)" }, { ALPHA: "0.35 (O'UM:1.60)" }, { ALPHA: "0.25 (O'UM:1.75)" }] },
      { title: { uz: "2-topshiriq: Bitta sinfni kesib olish", en: "Task 2: Isolate Single Class" }, tplUz: "Sinf xaritasidan faqat {SINF} sinfiga mos piksellarni ajratib tasvirdan kesib oling.", tplEn: "Isolate binary mask for class {SINF} and crop foreground pixels.", rows: [{ SINF: "15 (odam)" }, { SINF: "8 (mushuk)" }, { SINF: "12 (it)" }, { SINF: "7 (mashina)" }, { SINF: "15 (odam)" }, { SINF: "8 (mushuk)" }, { SINF: "12 (it)" }, { SINF: "7 (mashina)" }, { SINF: "15 (odam)" }, { SINF: "8 (mushuk)" }] },
      { title: { uz: "3-topshiriq: mIoU qo'lda hisoblash", en: "Task 3: Manual mIoU" }, tplUz: "10×10 sintetik maskada {SINFLAR} ta sinf uchun mIoU ni qo'lda hisoblang.", tplEn: "Manually compute mIoU across {SINFLAR} classes on a 10×10 synthetic mask.", rows: [{ SINFLAR: 2 }, { SINFLAR: 3 }, { SINFLAR: 4 }, { SINFLAR: 5 }, { SINFLAR: 6 }, { SINFLAR: 7 }, { SINFLAR: 8 }, { SINFLAR: 9 }, { SINFLAR: 10 }, { SINFLAR: 11 }] },
      { title: { uz: "4-topshiriq (uyga): FCN vs DeepLabV3", en: "Task 4 (Home): FCN vs DeepLabV3" }, tplUz: "fcn_resnet50 va deeplabv3_resnet50 natijalarini '{METRIK}' bo'yicha solishtiring.", tplEn: "Compare fcn_resnet50 vs deeplabv3_resnet50 on '{METRIK}'.", rows: [{ METRIK: "chegara aniqligi" }, { METRIK: "ishlash vaqti" }, { METRIK: "sinflar to'g'riligi" }, { METRIK: "chegara aniqligi" }, { METRIK: "ishlash vaqti" }, { METRIK: "sinflar to'g'riligi" }, { METRIK: "chegara aniqligi" }, { METRIK: "ishlash vaqti" }, { METRIK: "sinflar to'g'riligi" }, { METRIK: "chegara aniqligi" }] }
    ]
  },
  {
    id: 22, code: 'A22', topicId: 22,
    title: { uz: "Instans segmentatsiya amaliyoti (Mask R-CNN)", en: "Instance Segmentation Lab: Mask R-CNN" },
    objective: { uz: "Pretrained Mask R-CNN bilan har bir obyekt uchun alohida piksel maskasi va bounding box chiqarish.", en: "Run Mask R-CNN to extract per-instance binary masks and bounding boxes." },
    formulas: ["model = maskrcnn_resnet50_fpn(weights='COCO_V1')", "binary_mask = (masks[i, 0] > 0.5).numpy()"],
    colabUrl: "https://github.com/lookwei/COMP4423",
    pythonCode: `import torch, numpy as np, cv2
from torchvision.models.detection import maskrcnn_resnet50_fpn
from torchvision.transforms import functional as F

model = maskrcnn_resnet50_fpn(weights='COCO_V1').eval()
img = cv2.imread('sahna.jpg')
tensor = F.to_tensor(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))

with torch.no_grad():
    pred = model([tensor])[0]

overlay = img.copy()
for i, score in enumerate(pred['scores']):
    if score > 0.7:
        m = (pred['masks'][i, 0] > 0.5).numpy()
        col = np.random.randint(0, 255, 3)
        overlay[m] = (0.5 * overlay[m] + 0.5 * col).astype(np.uint8)
cv2.imwrite('mask_rcnn_a22.jpg', overlay)`,
    commonTask: { uz: "Kamida 2 ta bir xil sinfdagi obyektga ega rasmda Mask R-CNN bilan har bir instansga alohida rangli maska chizing.", en: "Segment ≥2 instances of the same class using Mask R-CNN with distinct colors per instance." },
    tasks: [
      { title: { uz: "1-topshiriq: Maska threshold", en: "Task 1: Soft Mask Threshold" }, tplUz: "masks > {THR} chegarasi bilan maska chegaralari qanday o'zgarishini tahlil qiling (≤0.95 oraliqda).", tplEn: "Threshold soft masks at {THR} (≤0.95) and inspect boundary tightness.", rows: [{ THR: 0.3 }, { THR: 0.45 }, { THR: 0.6 }, { THR: 0.75 }, { THR: 0.9 }, { THR: "0.85 (O'UM:1.05)" }, { THR: "0.70 (O'UM:1.2)" }, { THR: "0.55 (O'UM:1.35)" }, { THR: "0.40 (O'UM:1.5)" }, { THR: "0.50 (O'UM:1.65)" }] },
      { title: { uz: "2-topshiriq: To'silgan instanslar", en: "Task 2: Occluded Instances" }, tplUz: "Qisman to'silgan kamida {SON} ta obyektli rasmda instanslar qanchalik ajralganini baholang.", tplEn: "Evaluate Mask R-CNN separation on ≥{SON} partially occluded objects.", rows: [{ SON: 2 }, { SON: 3 }, { SON: 4 }, { SON: 5 }, { SON: 6 }, { SON: 7 }, { SON: 8 }, { SON: 9 }, { SON: 10 }, { SON: 11 }] },
      { title: { uz: "3-topshiriq: Dice koeffitsienti", en: "Task 3: Dice Coefficient" }, tplUz: "Kesishish = {KESISH} px bo'lganda model va haqiqiy maska orasidagi Dice koeffitsientini hisoblang.", tplEn: "Compute Dice coefficient assuming |A ∩ B| = {KESISH} px.", rows: [{ KESISH: 70 }, { KESISH: 80 }, { KESISH: 90 }, { KESISH: 100 }, { KESISH: 110 }, { KESISH: 120 }, { KESISH: 130 }, { KESISH: 140 }, { KESISH: 150 }, { KESISH: 160 }] },
      { title: { uz: "4-topshiriq (uyga): Panoptik birlashtirish", en: "Task 4 (Home): Simple Panoptic View" }, tplUz: "Mask R-CNN va DeepLabV3 natijalarini {SINFLAR} ta sinf uchun yagona panoptik vizualizatsiyaga birlashtiring.", tplEn: "Merge Mask R-CNN + DeepLabV3 outputs across {SINFLAR} classes into a panoptic view.", rows: [{ SINFLAR: 2 }, { SINFLAR: 3 }, { SINFLAR: 4 }, { SINFLAR: 5 }, { SINFLAR: 6 }, { SINFLAR: 7 }, { SINFLAR: 8 }, { SINFLAR: 9 }, { SINFLAR: 10 }, { SINFLAR: 11 }] }
    ]
  }
];
