# Kompyuterli Ko'rish (`KOK1506`) — Interaktiv O'quv Portali / Interactive Learning Portal

Andijon Davlat Texnika Instituti (ADTI) · 60610500 Sun'iy intellekt · 6 ECTS · 180 soat (46M · 44A · 90MT)

## Imkoniyatlar / Features
- **23 Majburiy Ma'ruza (`M1–M23`) + Zamonaviy Bob (`B1`)**: To'liq o'zbek va ingliz tillarida (`O'zbekcha` ↔ `English`), KaTeX formulalar, 21 ta interaktiv SVG/DOM diagramma (`CV_WIDGETS`) va Reveal.js 5.1.0 slaydlar (`slides.html`).
- **22 Amaliy Laboratoriya (`A1–A22`) × 40 Talaba Varianti (`labs.html`)**: Har bir talaba o'z tartib raqamini (`#1–#40`) tanlab, shaxsiy parametrlar jadvali hamda **tayyor `.ipynb` Jupyter/Colab notebook** faylini yuklab oladi. Repositorydagi [`Amaliy4.ipynb`](Amaliy4.ipynb) ham bevosita saqlangan.
- **7 ta Brauzerda Jonli CV Laboratoriyasi + 3 Tarqatma (`practice.html`)**: Piksel/RGB inspektori, HSV rang niqoblash, 3×3 konvolyutsiya va Median denoiser + PSNR, Sobel chegaralar, Pinhole & Stereo chuqurlik, Conv2D & Softmax, IoU/Dice & Adashish matritsasi (o'z rasmingizni yuklash imkoniyati bilan).
- **203 ta Rasmiy Test Banki va Mashqlar (`quiz.html`)**: Tezkor 20-savollik aralash imtihon, to'liq 203-savollik yakuniy nazorat marafoni, qidiruv/filtrli test banki hamda har bir modul uchun MCQ + Moslashtirish + Bo'shliqni to'ldirish.
- **Mustaqil ta'lim (`MT1–MT9`) & 75+ Izohli Lug'at**: Xalqaro sillabuslar (`lookwei/COMP4423`, `microsoft/computervision-recipes`, `jbhuang0604/awesome-computer-vision`, Szeliski Ch.1–14, Stanford CS131, UC Berkeley CS180) havolalari bilan boyitilgan.

## Mahalliy ishga tushirish / Local Preview
Zero-build static site (GitHub Pages ready via `.nojekyll`):
```bash
python -m http.server 8000
```
So'ng brauzerda `http://localhost:8000` ni oching.
