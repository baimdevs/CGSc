# baimstore — Direktori Video Edukasi YouTube

**baimstore** adalah aplikasi web direktori & portal belajar interaktif berbasis HTML, CSS, dan Vanilla JavaScript. Aplikasi ini dirancang untuk mengorganisir, memantau, dan menyimpan video edukasi YouTube dengan pengalaman pengguna (UX) yang modern dan intuitif.

## 🚀 Fitur Utama

- ⚡ **Auto-Fetch Informasi Video (YouTube oEmbed API)**: Cukup masukkan link YouTube, sistem akan secara otomatis mengambil judul dan thumbnail video tanpa memerlukan API Key.
- 📺 **Interactive YouTube Embedded Player**: Putar video langsung di dalam modal player interaktif tanpa berpindah halaman. Audio otomatis terhenti saat modal ditutup.
- 💾 **LocalStorage Integration**: Seluruh daftar video, status belajar, dan preferensi tersimpan secara permanen di peramban (browser).
- 🏷️ **Filter & Pencarian Pintar**:
  - Filter berdasarkan kategori materi (Pemrograman, Matematika & Sains, Bahasa, Desain, Bisnis, Self-Dev, dll).
  - Filter berdasarkan status pembelajaran (*Belum Selesai* / *Selesai Ditonton*).
  - Pencarian waktu nyata (Live Search) untuk judul, catatan, dan nama channel/kategori.
  - Opsi pengurutan (Terbaru, Terlama, A-Z, Z-A, dan Status Selesai).
- 📊 **Tracker Progress Belajar**: Visualisasi persentase penyelesaian materi edukasi dan jumlah video yang sudah ditonton.
- 🔲 **Tampilan Grid & List**: Sakelar ubah mode layout grid / list secara fleksibel.
- 🌙 **Dark & Light Mode**: Desain modern dengan skema warna gelap default (indigo/cyan accent, glassmorphism) dan sakelar tema terang.
- ⌨️ **Pintasan papan ketik (Keyboard Shortcuts)**: Tekan `/` untuk fokus pencarian dan `Esc` untuk menutup modal.

## 📁 Struktur Berkas

```
/
├── index.html   # Struktur utama halaman web dan modal
├── style.css    # Design system, variabel CSS, tema, layout grid/list, & animasi
├── script.js    # Logika oEmbed API, operasi CRUD, LocalStorage, filter, & event listener
└── README.md    # Dokumentasi proyek baimstore
```

## 🛠️ Teknologi yang Digunakan

- **HTML5** (Elemen semantik, Accessibility)
- **CSS3** (Vanilla CSS, CSS Grid, Flexbox, CSS Custom Properties, Animations)
- **Vanilla JavaScript (ES6+)** (DOM Manipulation, Async Fetch oEmbed, LocalStorage API)
- **FontAwesome 6** (Ikonografi UI)
- **Google Fonts** (Plus Jakarta Sans)
