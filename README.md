<<<<<<< HEAD
# 💍 Website Undangan Digital Premium

Website undangan pernikahan digital yang modern, elegan, dan sangat interaktif dengan animasi cinematic yang memukau.

## ✨ Fitur Utama

### 🎬 Animasi Premium
- **Opening Cinematic** - Animasi pembukaan dengan efek fade, zoom, dan blur
- **Parallax Scrolling** - Efek parallax pada hero section
- **Scroll-Triggered Animations** - Animasi muncul saat scroll menggunakan Framer Motion
- **Text Reveal Animation** - Animasi teks yang menarik
- **3D Button Hover Effects** - Tombol interaktif dengan efek 3D
- **Floating Particles** - Partikel melayang untuk efek luxury
- **Smooth Page Transitions** - Transisi halaman yang mulus

### 📋 Sections Lengkap
1. **Landing Page** - Halaman pembuka dengan animasi cinematic
2. **Hero Section** - Nama pengantin dengan parallax effect
3. **Countdown Timer** - Hitung mundur dinamis real-time
4. **Event Details** - Detail acara dengan tombol maps & calendar
5. **Photo Gallery** - Galeri foto dengan Swiper slider & lightbox zoom
6. **Love Story** - Timeline cerita cinta dengan animasi
7. **Location Map** - Google Maps terintegrasi
8. **RSVP Form** - Form konfirmasi kehadiran
9. **Wishes Section** - Tampilan ucapan dari tamu
10. **Footer** - Share buttons, QR code, dan informasi

### 🎁 Premium Features
- ✅ **Background Music** - Auto-play dengan kontrol play/pause
- ✅ **QR Code Generator** - QR code undangan yang bisa di-scan
- ✅ **WhatsApp Share** - Tombol share ke WhatsApp
- ✅ **Save to Calendar** - Download file .ics untuk kalender
- ✅ **Guest Personalization** - Nama tamu dari parameter `?to=NamaTamu`
- ✅ **Dark Mode Support** - Tema gelap otomatis (opsional)

## 🚀 Tech Stack

- **Framework**: Next.js 15 + TypeScript
- **Styling**: Tailwind CSS 4.1
- **Animations**: Framer Motion + GSAP
- **Gallery**: Swiper.js
- **Countdown**: react-countdown
- **QR Code**: qrcode.react
- **Icons**: React Icons

## 📦 Instalasi

### 1. Install Dependencies

```bash
cd wedding-invitation
npm install
```

### 2. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 🎨 Cara Customize

### Edit Data Pernikahan

Buka file **`data/wedding-data.ts`** dan edit informasi berikut:

```typescript
export const weddingData: WeddingData = {
  couple: {
    bride: {
      fullName: 'Nama Lengkap Mempelai Wanita',
      shortName: 'Nama Panggilan',
      instagram: '@instagram_handle',
      parents: 'Putri dari Bapak ... & Ibu ...',
    },
    groom: {
      fullName: 'Nama Lengkap Mempelai Pria',
      shortName: 'Nama Panggilan',
      instagram: '@instagram_handle', 
      parents: 'Putra dari Bapak ... & Ibu ...',
    },
  },
  events: [
    {
      name: 'Akad Nikah',
      date: '2026-06-15',  // Format: YYYY-MM-DD
      time: '08:00 - 10:00 WIB',
      location: {
        name: 'Nama Tempat',
        address: 'Alamat Lengkap',
        googleMapsUrl: 'Link Google Maps',
        embedUrl: 'Link Embed Google Maps',
      },
    },
    // Tambahkan event lain di sini
  ],
  // ... edit bagian lainnya
};
```

### Ganti Foto Gallery

1. Simpan foto-foto Anda di folder **`public/images/gallery/`**
2. Update bagian `gallery` di `data/wedding-data.ts`:

```typescript
gallery: [
  { id: 1, url: '/images/gallery/foto1.jpg', caption: 'Caption' },
  { id: 2, url: '/images/gallery/foto2.jpg', caption: 'Caption' },
  // ... tambahkan lebih banyak
],
```

### Ganti Warna Tema

Edit file **`tailwind.config.ts`** untuk mengubah skema warna:

```typescript
colors: {
  gold: {
    // Custom gold palette
    500: '#e6b800',
    // ... sesuaikan warna lainnya
  },
  // Custom colors lainnya
},
```

### Ganti Musik Background

1. Simpan file musik Anda (format .mp3) di **`public/music/`**
2. Update di `data/wedding-data.ts`:

```typescript
music: {
  url: '/music/nama-file.mp3',
  title: 'Judul Lagu',
  artist: 'Nama Artist',
},
```

### Edit Metadata SEO

Buka **`app/layout.tsx`** dan edit metadata:

```typescript
export const metadata: Metadata = {
  title: 'Nama Pengantin - Wedding Invitation',
  description: 'Deskripsi undangan Anda',
  // ... edit metadata lainnya
};
```

## 🌐 Deployment

### Deploy ke Vercel (Recommended)

1. Push code Anda ke GitHub
2. Kunjungi [vercel.com](https://vercel.com)
3. Import repository GitHub Anda
4. Klik Deploy
5. ✨ Website Anda sudah online!

**URL akan seperti**: `https://nama-project.vercel.app`

### Personalisasi Link untuk Tamu

Kirim undangan dengan parameter `?to=NamaTamu`:
```
https://nama-project.vercel.app?to=Budi%20Santoso
```

## 📱 Responsive Design

Website ini sudah **100% mobile-friendly** dan tampil sempurna di:
- 📱 iPhone & Android
- 💻 Laptop & Desktop  
- 📟 Tablet

## 🎯 Optimasi Performa

- ⚡ Lighthouse Score 90+
- 🎬 Animasi smooth 60fps
- 🖼️ Lazy loading untuk gambar
- 📦 Code splitting otomatis dari Next.js

## 📝 Troubleshooting

### Musik Tidak Auto-Play?
Browser modern memblokir auto-play. Pastikan user klik tombol "Open Invitation" terlebih dahulu.

### Animasi Terasa Lambat?
Pastikan ukuran gambar sudah dioptimasi (max 500KB per foto).

### Error saat npm install?
Coba hapus folder `node_modules` dan `package-lock.json`, lalu run:
```bash
npm install --legacy-peer-deps
```

## 💡 Tips

- 🎨 Gunakan foto berkualitas tinggi (minimal 1920×1080px)
- 🎵 Pilih musik dengan volume yang tidak terlalu keras
- ⏰ Test countdown timer dengan mengubah tanggal acara
- 📱 Test di berbagai device sebelum deploy
- 🔗 Gunakan link shortener untuk WhatsApp (bit.ly, dll)

## 📄 License

Free to use for personal wedding invitations.

## 💌 Support

Jika ada pertanyaan atau butuh bantuan, silakan buat issue di repository ini.

---

**Made with ❤️ for your special day**

🎉 Selamat menikah! 🎉
=======
# wedding-invitation
>>>>>>> 63cff98454746f5125eccd618fdf0d1360bdca33
