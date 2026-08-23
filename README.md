# LiNO App SMAN 2 Brebes (Literasi dan Numerasi)

Aplikasi manajemen Literasi dan Numerasi terpadu untuk SMAN 2 Brebes. Aplikasi ini berbagi database (skema User) yang sama dengan E-Journal.



## 🚀 Panduan Instalasi & Update (Server)

Aplikasi ini berjalan secara penuh menggunakan lingkungan **Docker** (Next.js dan MySQL dari jaringan E-Journal).

### 1. Instalasi di Server Baru

Jika Anda memindahkan atau menginstal program ini ke server/VPS/Komputer baru, ikuti langkah berikut:

```bash
# 1. Kloning (Clone) atau salin folder project ke server
git clone https://github.com/arivanhi/lino-app.git lino-app
cd lino-app

# 2. Salin file environment (pastikan konfigurasi .env sesuai dengan server baru)
cp .env.example .env

# 3. Jalankan Docker Compose (build & jalankan di background)
docker compose up -d --build
```

### 2. Update Program (Server Lama)

Jika server sudah menyala dan Anda baru saja menerima *update* kodingan (seperti *Changelog* di atas), lakukan perintah berikut untuk menerapkan pembaruan:

```bash
# 1. Masuk ke folder project
cd lino-app

# 2. Tarik update terbaru dari repositori Git
git pull origin main

# 3. Bangun ulang (Rebuild) container aplikasi Next.js dan jalankan
docker compose up -d --build
```

*Catatan: Perintah `docker compose up -d --build` akan membangun ulang aplikasi secara otomatis dan mengeksekusi Prisma client generation di tahap build.*

---

## 🛠 Konfigurasi Tambahan

- **Port Aplikasi LiNO:** `http://localhost:3005` (Atau sesuai definisi di docker-compose.yml)
- **Timezone Server:** `Asia/Jakarta` (WIB)

Dikelola & Dikembangkan untuk SMAN 2 Brebes.

## 📝 Changelog (Pembaruan Terkini) 

### v1.2.0 - Pembaruan Fitur Dashboard, Siswa, Admin & Pimpinan (Kepsek)
- **Modul Dashboard & Siswa:**
  - Penambahan kolom/aksi (icon mata) untuk melihat soal pada tugas Literasi dan Numerasi.
  - Perbaikan letak *button* agar jaraknya tidak terlalu berjauhan.
  - Penambahan fitur Upload File PDF (Maks. 5MB) dengan dukungan fitur Drag & Drop untuk pengumpulan tugas.
  - File yang di-upload akan tersimpan rapi pada direktori `/uploads/jawaban_literasi/[kelasid]` dan `/uploads/jawaban_numerasi/[kelasid]`.
  - Pembatasan daftar siswa yang memiliki nilai numerasi <50 maksimal 5 baris di Dashboard Wali Kelas (sisanya bisa di-*scroll*).
- **Modul Admin & Pimpinan (Kepsek):**
  - Implementasi komponen `<ClassFilter />` dengan Tab Navigasi Kelas (Semua Kelas, X, XI, XII).
  - Implementasi *Search Bar* otomatis (debouncing) yang akan mencari kelas tanpa menekan tombol "Enter".
  - Sinkronisasi filter pencarian kelas dan tab menggunakan server-side render dan parameter URL.
  - Warna font tombol navigasi (Next/Prev) diubah menjadi abu-abu gelap agar lebih mudah terlihat.
  - Menu **Export Laporan PDF** (Literasi & Numerasi Pimpinan) kini memakai daftar *Checkbox* yang secara cerdas hanya menampilkan pilihan kelas sesuai Tab kelas yang sedang dibuka.
  - Perbaikan bug *pagination* laporan PDF dan bug referensi internal *Link is not defined*.

### v1.1.0 - Fitur Akun Koordinator
- **Penambahan Role & Manajemen Koordinator:**
  - Menambahkan dukungan untuk role `KOORDINATOR` pada sistem.
  - Admin/Waka kini dapat menambah, melihat, dan menghapus akun Koordinator dari menu "Akun Koordinator" di sidebar Admin.
  - Role Koordinator diarahkan ke panel admin tetapi tidak dapat melihat menu manajemen Akun Koordinator.
- **Perbaikan UI:**
  - Penyesuaian warna teks dan placeholder pada modal form tambah akun agar lebih jelas dibaca.
