# Ruang Kerja PsyCap 🧠💼

> **Prototipe Aplikasi Web untuk Evaluasi dan Pengembangan Modal Psikologis (*Psychological Capital* / PsyCap) di Tempat Kerja.**

Ruang Kerja PsyCap dirancang untuk membantu profesional, tim, dan organisasi mengukur, memantau, dan memperkuat kapasitas mental kerja secara objektif. Pengukuran pada aplikasi ini mengacu pada instrumen ilmiah **PCQ-12 (*Psychological Capital Questionnaire 12*)** yang dikembangkan oleh Fred Luthans, Bruce Avolio, dkk.

---

## 🌟 Landasan Konseptual: 4 Pilar HERO

Modal psikologis (*psychological capital*) bukan sifat kepribadian yang kaku (*fixed traits*), melainkan kapasitas psikologis dinamis (*state-like*) yang dapat dilatih dan ditingkatkan secara terencana lewat kejelasan peran kerja, latihan mikro, dan refleksi berkala.

Instrumen PCQ-12 mengukur empat dimensi utama (**HERO**):

1. **Hope (Harapan & Arah Kerja)**  
   Kemauan dan kejelian memetakan jalur alternatif (*pathways*) ketika target atau rencana kerja menghadapi jalan buntu.
2. **Efficacy (Keyakinan Diri)**  
   Keyakinan atas kapasitas diri dalam mengerahkan motivasi, kemampuan kognitif, dan langkah nyata guna menuntaskan tantangan kerja yang kompleks.
3. **Resilience (Daya Bangkit)**  
   Kapasitas memulihkan stabilitas emosional, beradaptasi, dan kembali fokus pascaguncangan beban tugas, kritik, maupun kegagalan kerja.
4. **Optimism (Optimisme Realistis)**  
   Penilaian positif yang realistis terhadap proses kerja saat ini serta prospek karier pada masa mendatang.

---

## ✨ Fitur Aplikasi

- **⚡ Asesmen Mandiri PCQ-12 (3 Menit)**  
  Dua belas butir pernyataan berbasis skala Likert 1–6 dengan perhitungan skor otomatis per dimensi, penyesuaian butir berkebalikan (*reverse-coded*), serta pintasan papan ketik (angka 1–6 dan panah).
- **👤 Registrasi Akun Lokal Cepat**  
  Alur pembuatan akun ringkas setelah asesmen selesai untuk menyimpan riwayat hasil evaluasi langsung di peramban tanpa konfigurasi basis data peladen yang rumit.
- **📊 Dasbor Analitik Interaktif**  
  - **Bagan Radar**: Visualisasi sebaran keseimbangan empat dimensi HERO.
  - **Bagan Tren Garis**: Pemantauan dinamika perkembangan skor antarperiode evaluasi (*Pre-Training* dan evaluasi lanjutan).
  - **Pengelompokan Tingkat Capaian**: Kategorisasi status kesiapan mental kerja (*Kuat*, *Berkembang*, dan *Perlu Dukungan*).
  - **Rekomendasi Prioritas**: Saran aksi terfokus yang diturunkan langsung dari dimensi dengan skor terendah.
- **📚 Akademi & Modul Mikro**  
  Bahan pembelajaran mandiri berdurasi 5–8 menit per pilar yang terintegrasi dengan perolehan poin gamifikasi.
- **📋 Penyelarasan Konteks Kerja (Jobdesc, SOP & KPI)**  
  Sarana peninjauan kejelasan tanggung jawab kerja guna menekan ambiguitas peran, dilengkapi pencatatan kesepakatan internal tim.
- **💬 Pendampingan & Konsultasi Coach Kerja**  
  Simulasi dialog terarah bersama psikolog kerja, saran pemantik diskusi harian, dan formulir masukan pengguna.
- **🏆 Gamifikasi Poin dan Tingkatan**  
  Pemberian poin pada setiap penuntasan asesmen, penyelesaian modul, dan kontribusi catatan tim guna menjaga kesinambungan kebiasaan refleksi.

---

## 🎨 Palet Warna dan Tata Letak

Desain antarmuka menerapkan prinsip rasio warna 60-30-10 dengan tipografi editorial yang nyaman di mata untuk pemakaian berdurasi panjang:

- **Warna Dasar Kanvas (60%): `#F6F5F1` (Warm Alabaster)** — Latar lembut pencegah silau layar.
- **Warna Pendamping Harmonis (30%): `#E6E3DA` (Warm Pebble)** & `#DCD7CC` (Garis Batas) — Warna greige tonal untuk modul kartu, pembatas visual, dan bilah navigasi samping.
- **Warna Aksen Penegas (10%): `#4A6B5D` (Muted Forest Sage)** — Hijau botani teduh untuk tombol aksi utama, indikator kemajuan, dan penanda status aktif.

---

## 🛠️ Tumpukan Teknologi

- **Kerangka Kerja**: [React 19](https://react.dev/)
- **Pembangun Bundel**: [Vite 8](https://vitejs.dev/)
- **Tata Letak & Gaya**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Visualisasi Data**: [Recharts 3](https://recharts.org/)
- **Ikon Antarmuka**: [Lucide React](https://lucide.dev/)
- **Pemeriksa Kode**: [Oxlint](https://oxc.rs/)

---

## 🚀 Petunjuk Menjalankan Proyek

### 1. Prasyarat Lingkungan
Pastikan komputer telah terpasang [Node.js](https://nodejs.org/) (versi 18 ke atas).

### 2. Pemasangan Dependensi
Buka terminal pada direktori proyek, lalu jalankan:
```bash
npm install
```

### 3. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka tautan lokal yang tampil di terminal (umumnya `http://localhost:5173`).

### 4. Kompilasi Produksi
```bash
npm run build
```
Berkas siap rilis akan disimpan di dalam direktori `dist/`.

### 5. Pemeriksaan Mutu Kode
```bash
npm run lint
```

---

## ⚖️ Hak Cipta dan Atribusi

Instrumen PCQ-12 (*Psychological Capital Questionnaire*) dilindungi hak cipta oleh pemegang lisensi resmi ([Mind Garden, Inc.](https://www.mindgarden.com/)). Penggunaan instrumen ini dalam implementasi skala komersial maupun riset formal memerlukan izin lisensi resmi. Repositori ini dikembangkan murni sebagai purwarupa (*prototype*) konsep rekayasa produk teknologi psikologi kerja.
