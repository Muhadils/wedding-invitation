# 📝 Panduan Customization Website Undangan

Panduan step-by-step untuk customize website undangan Anda tanpa perlu pengetahuan coding!

## 📋 Daftar Isi
1. [Mengganti Nama Pengantin](#1-mengganti-nama-pengantin)
2. [Mengubah Tanggal & Waktu Acara](#2-mengubah-tanggal--waktu-acara)
3. [Mengganti Lokasi Acara](#3-mengganti-lokasi-acara)
4. [Upload Foto Gallery](#4-upload-foto-gallery)
5. [Mengubah Kisah Cinta](#5-mengubah-kisah-cinta)
6. [Mengganti Warna Tema](#6-mengganti-warna-tema)
7. [Ganti Musik Background](#7-ganti-musik-background)

---

## 1. Mengganti Nama Pengantin

📂 **File**: `data/wedding-data.ts`

### Langkah:
1. Buka file `data/wedding-data.ts`
2. Cari bagian `couple`
3. Edit nama-nama berikut:

```typescript
couple: {
  bride: {
    fullName: 'Ganti dengan Nama Lengkap Mempelai Wanita',
    shortName: 'Ganti dengan Nama Panggilan',
    instagram: '@username_instagram',  // Opsional
    parents: 'Putri dari Bapak [Nama Ayah] & Ibu [Nama Ibu]',
  },
  groom: {
    fullName: 'Ganti dengan Nama Lengkap Mempelai Pria',
    shortName: 'Ganti dengan Nama Panggilan',
    instagram: '@username_instagram',  // Opsional
    parents: 'Putra dari Bapak [Nama Ayah] & Ibu [Nama Ibu]',
  },
},
```

4. **Save** file (Ctrl + S)

---

## 2. Mengubah Tanggal & Waktu Acara

📂 **File**: `data/wedding-data.ts`

### Langkah:
1. Cari bagian `events`
2. Edit tanggal dan waktu:

```typescript
events: [
  {
    name: 'Akad Nikah',  // Bisa diganti: Pemberkatan, Holy Matrimony, dll
    date: '2026-06-15',  // ⚠️ PENTING: Format YYYY-MM-DD (Tahun-Bulan-Hari)
    time: '08:00 - 10:00 WIB',  // Sesuaikan jam acara
    location: {
      // ... (lihat bagian berikutnya)
    },
  },
  {
    name: 'Resepsi',
    date: '2026-06-15',
    time: '18:00 - 21:00 WIB',
    // ...
  },
],
```

💡 **Tips**: 
- Gunakan kalkulator online untuk convert tanggal ke format YYYY-MM-DD
- Contoh: 15 Juni 2026 = `2026-06-15`

---

## 3. Mengganti Lokasi Acara

📂 **File**: `data/wedding-data.ts`

### Langkah:
1. Cari bagian `location` di dalam `events`
2. Edit informasi lokasi:

```typescript
location: {
  name: 'Nama Gedung/Gereja/Masjid',
  address: 'Alamat lengkap dengan kode pos',
  googleMapsUrl: 'LINK GOOGLE MAPS DI SINI',
  embedUrl: 'LINK EMBED GOOGLE MAPS DI SINI',
},
```

### Cara Mendapatkan Link Google Maps:

**A. Google Maps URL (untuk tombol "Buka di Google Maps")**
1. Buka [Google Maps](https://maps.google.com)
2. Cari lokasi acara Anda
3. Klik **Share** / **Bagikan**
4. Copy link yang muncul
5. Paste ke `googleMapsUrl`

**B. Embed URL (untuk peta yang tampil di website)**
1. Di Google Maps, cari lokasi acara
2. Klik **Share** → **Embed a map**
3. Copy kode HTML yang muncul
4. Cari bagian `src="......"`, copy URL di dalamnya
5. Paste ke `embedUrl`

Contoh:
```html
<!-- Dari kode ini: -->
<iframe src="https://www.google.com/maps/embed?pb=!1m18!...." ...>

<!-- Copy bagian ini: -->
https://www.google.com/maps/embed?pb=!1m18!....
```

---

## 4. Upload Foto Gallery

### Langkah:

**A. Siapkan Foto**
- Minimal 6 foto
- Ukuran recommended: 1920×1080px
- Format: JPG atau PNG
- Rename dengan nama simple: `foto1.jpg`, `foto2.jpg`, dst

**B. Upload Foto**
1. Buka folder `public/images/gallery/`
2. Hapus foto lama (photo1.jpg sampai photo6.jpg)
3. Copy paste foto baru Anda
4. Rename sesuai urutan: `photo1.jpg`, `photo2.jpg`, dst

**C. Update Data**
📂 **File**: `data/wedding-data.ts`

```typescript
gallery: [
  { id: 1, url: '/images/gallery/photo1.jpg', caption: 'Pre-wedding di taman' },
  { id: 2, url: '/images/gallery/photo2.jpg', caption: 'Momen romantis' },
  { id: 3, url: '/images/gallery/photo3.jpg', caption: 'Foto bersama keluarga' },
  { id: 4, url: '/images/gallery/photo4.jpg', caption: 'Di gedung mewah' },
  { id: 5, url: '/images/gallery/photo5.jpg', caption: 'Sunset di pantai' },
  { id: 6, url: '/images/gallery/photo6.jpg', caption: 'Candid moment' },
  // Tambahkan lebih banyak jika mau
],
```

💡 **Tips**: Caption bersifat opsional, bisa dihapus jika tidak perlu

---

## 5. Mengubah Kisah Cinta

📂 **File**: `data/wedding-data.ts`

### Langkah:
1. Cari bagian `loveStory`
2. Edit atau tambah timeline:

```typescript
loveStory: [
  {
    year: '2020',  // Tahun kejadian
    title: 'Pertama Kali Bertemu',  // Judul moment
    description: 'Ceritakan bagaimana kalian bertemu pertama kali...',
  },
  {
    year: '2021',
    title: 'Menjadi Lebih Dekat',
    description: 'Ceritakan momen ketika hubungan semakin serius...',
  },
  {
    year: '2023',
    title: 'Lamaran',
    description: 'Ceritakan momen lamaran yang romantis...',
  },
  {
    year: '2026',
    title: 'Menikah',
    description: 'Akhirnya kami akan menikah dan memulai hidup baru bersama!',
  },
  // Bisa tambah atau kurangi sesuai kebutuhan
],
```

---

## 6. Mengganti Warna Tema

📂 **File**: `tailwind.config.ts`

### Tema Preset:

#### **Gold Luxury (Default)**
Sudah terpasang, tidak perlu diubah.

#### **Pastel Pink Theme**
Ganti bagian `colors` dengan:

```typescript
colors: {
  gold: {
    50: '#fff5f7',
    100: '#ffe4e9',
    200: '#ffc9d4',
    300: '#ff9eb3',
    400: '#ff85a2',
    500: '#ff6b91',  // Main color
    600: '#e05580',
    700: '#c0406f',
    800: '#a02b5e',
    900: '#80164d',
  },
  navy: {
    // Biarkan sama atau ganti ke warna komplementer
  },
  cream: {
    // Biarkan sama
  },
},
```

#### **Emerald Green Theme**
```typescript
colors: {
  gold: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',  // Main color
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  // dst...
},
```

💡 **Tips**: Gunakan [Tailwind Color Generator](https://uicolors.app/create) untuk membuat palette custom

---

## 7. Ganti Musik Background

### Langkah:

**A. Siapkan File Musik**
- Format: MP3 (recommended)
- Durasi: 2-3 menit (akan di-loop)
- Ukuran: Maksimal 5MB
- Volume: Jangan terlalu keras

**B. Upload Musik**
1. Buka folder `public/music/`
2. Copy paste file musik Anda
3. Rename jadi `background-music.mp3`

**C. Update Data**
📂 **File**: `data/wedding-data.ts`

```typescript
music: {
  url: '/music/background-music.mp3',
  title: 'Perfect',  // Judul lagu
  artist: 'Ed Sheeran',  // Nama artist
},
```

💡 **Saran Lagu Populer**:
- Perfect - Ed Sheeran
- A Thousand Years - Christina Perri
- All of Me - John Legend
- Marry You - Bruno Mars
- Thinking Out Loud - Ed Sheeran

---

## ✅ Checklist Sebelum Deploy

- [ ] Semua nama sudah benar
- [ ] Tanggal dan waktu sudah sesuai
- [ ] Link Google Maps sudah di-test
- [ ] Foto sudah di-upload semua
- [ ] Musik background berfungsi
- [ ] Test di HP & laptop
- [ ] Test countdown timer
- [ ] Test WhatsApp share button

---

## 🆘 Butuh Bantuan?

Jika ada yang tidak jelas, hubungi developer atau buat issue di GitHub repository.

---

**Happy Customizing! 🎉**
