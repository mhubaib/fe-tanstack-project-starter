# Frontend TanStack Project Starter

Boilerplate frontend modern dan _production-ready_ berbasis **TanStack Start**, **TanStack Router**, **React 19**, **Tailwind CSS v4**, dan komponen **Shadcn UI**. Proyek ini dilengkapi alur autentikasi lengkap, sistem proteksi rute, manajemen form berbasis Zod, dan integrasi API client Axios.

---

## Fitur Utama

- **Modern Fullstack/SSR Ready**: Didukung oleh TanStack Start (`@tanstack/react-start`) dan Vite 8.
- **File-based Routing & Guards**: TanStack Router (`@tanstack/react-router`) dengan tata kelola rute otomatis dan _route protection_ (`beforeLoad`).
- **Alur Autentikasi Lengkap**:
  - **Masuk (Login)**: Dilengkapi fitur _Remember Me_ (cookie 30 hari).
  - **Daftar (Register)**: Validasi formulir lengkap dengan konfirmasi kata sandi.
  - **Lupa Kata Sandi**: Pengiriman tautan reset ke email pengguna.
  - **Reset Kata Sandi**: Penggantian kata sandi dengan verifikasi token.
  - **Verifikasi OTP**: Input 6-digit OTP (`InputOTP`) yang terhubung langsung via _search parameters_ URL (`?email=...&purpose=...`) dengan timer kirim ulang (_resend countdown_).
- **Protected Routes**: Rute privat dibungkus di layout `_authenticated` dengan pengalihan otomatis ke `/login` jika belum memiliki token valid.
- **Tailwind CSS v4 & Shadcn UI**: Sistem desain modern menggunakan CSS variables, Base UI primitives (`@base-ui/react`), Tabler Icons (`@tabler/icons-react`), dan animasi transisi halus.
- **Form Management & Validation**: Menggunakan React Hook Form dengan validasi skema Zod v4 (`@hookform/resolvers/zod`).
- **HTTP Client & Mock Fallback**: Axios client dengan interceptor token Bearer otomatis, penanganan status 401 Unauthorized global, serta simulasi _Dev Mode Fallback_ untuk kebutuhan pengujian offline.
- **State Management**: Zustand v5 yang terintegrasi dengan cookie untuk persistensi sesi login.

---

## Tech Stack

| Kategori                 | Teknologi                                                                                                                                                                  |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework & Core**     | [React 19](https://react.dev/), [TanStack Start](https://tanstack.com/start), [Vite 8](https://vitejs.dev/)                                                                |
| **Routing**              | [TanStack Router](https://tanstack.com/router) (File-based)                                                                                                                |
| **Styling**              | [Tailwind CSS v4](https://tailwindcss.com/), [Fontsource Inter](https://fontsource.org/fonts/inter)                                                                        |
| **Komponen UI**          | [Shadcn UI](https://ui.shadcn.com/) / [@base-ui/react](https://base-ui.com/), [Tabler Icons](https://tabler.io/icons)                                                      |
| **Form & Validasi**      | [React Hook Form](https://react-hook-form.com/), [Zod v4](https://zod.dev/)                                                                                                |
| **State Management**     | [Zustand v5](https://zustand-demo.pmnd.rs/)                                                                                                                                |
| **Data Fetching / HTTP** | [TanStack React Query v5](https://tanstack.com/query), [Axios](https://axios-http.com/)                                                                                    |
| **Code Quality**         | [ESLint 9](https://eslint.org/), [Prettier 3](https://prettier.io/), [Husky](https://typicode.github.io/husky/), [Lint-Staged](https://github.com/lint-staged/lint-staged) |

---

## Struktur Direktori

```text
src/
├── components/           # Komponen UI global & dapat digunakan kembali
│   ├── dialogs/          # Komponen dialog konfirmasi & modal
│   ├── forms/            # Komponen form khusus (PasswordInput, FormError, dsb.)
│   ├── layouts/          # Tata letak halaman (AuthLayout, AppLayout)
│   └── ui/               # Komponen primitif Shadcn UI (Button, Input, Label, OTP, dsb.)
├── features/             # Modul fungsional berdasarkan fitur
│   ├── auth/             # Fitur autentikasi (login, register, OTP, reset password)
│   │   ├── api/          # Endpoint API & mock fallback autentikasi
│   │   ├── hooks/        # Custom hook useAuth
│   │   ├── stores/       # Store Zustand (auth session & cookies)
│   │   └── ...           # Sub-komponen form tiap alur autentikasi
│   └── errors/           # Halaman penanganan error (404, 500)
├── hooks/                # Custom React hooks umum (useDebounce, dsb.)
├── lib/                  # Utilitas sistem, cookies, dan konfigurasi API client
├── routes/               # Struktur file-based routing TanStack Router
│   ├── (auth)/           # Rute publik autentikasi (/login, /register, /verify-otp, dsb.)
│   ├── _authenticated/   # Rute terproteksi (/dashboard)
│   ├── __root.tsx        # Root shell layout & HTML wrapper
│   └── index.tsx         # Landing page / halaman utama
├── styles.css            # Konfigurasi Tailwind CSS v4 & theme variables
└── types/                # Definisi TypeScript interface & skema Zod
```

---

## Memulai Project

### Prasyarat

- **Node.js**: Versi 22 atau lebih baru
- **Package Manager**: [pnpm](https://pnpm.io/) (disarankan)

### Instalasi

1. Clone repositori ini ke komputer lokal Anda:

   ```bash
   git clone <repository-url>
   cd fe-tanstact-project-starter
   ```

2. Pasang seluruh dependensi:

   ```bash
   pnpm install
   ```

3. Jalankan server pengembangan (_development server_):
   ```bash
   pnpm dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000`.

---

## Skrip yang Tersedia

Berikut adalah perintah-perintah yang dapat dijalankan melalui terminal:

| Perintah       | Deskripsi                                                     |
| :------------- | :------------------------------------------------------------ |
| `pnpm dev`     | Menjalankan development server pada port 3000                 |
| `pnpm build`   | Membangun bundle aplikasi untuk tahap produksi                |
| `pnpm preview` | Menjalankan preview lokal dari hasil build produksi           |
| `pnpm lint`    | Menjalankan ESLint untuk memeriksa kualitas kode              |
| `pnpm format`  | Memformat kode dengan Prettier dan menjalankan ESLint autofix |
| `pnpm check`   | Memeriksa kepatuhan format kode menggunakan Prettier          |

---

## Konfigurasi Environment

Aplikasi ini dapat dikonfigurasikan menggunakan variabel environment berikut (dapat diletakkan di file `.env`):

```env
# URL dasar backend API (default: '/api')
VITE_API_BASE_URL=http://localhost:8000/api
```

> **Catatan Pengujian Offline (Dev Mode):** Jika backend belum aktif atau URL backend tidak dapat diakses, modul autentikasi (`src/features/auth/api/auth-api.ts`) secara otomatis menyediakan simulasi fallback agar alur UI tetap dapat dicoba secara lancar.

---

## Panduan Penggunaan & Alur Rute

### 1. Menambahkan Halaman Baru

Tambahkan file baru di dalam folder `src/routes/`. TanStack Router akan secara otomatis mendeteksi dan memperbarui `src/routeTree.gen.ts`.

- Untuk halaman terproteksi, tambahkan file di bawah folder `src/routes/_authenticated/`.
- Untuk halaman bebas akses, letakkan langsung di `src/routes/` atau kelompokkan dengan route group seperti `(auth)`.

### 2. Alur Halaman Verifikasi OTP

Halaman verifikasi OTP (`/verify-otp`) menerima parameter pencarian (_search params_):

- `email`: Alamat email pengguna tujuan OTP (misal: `?email=user@example.com`).
- `purpose`: Tujuan verifikasi, dapat bernilai:
  - `email-verification` (default)
  - `login` (2FA)
  - `reset-password`

Contoh navigasi dari kode:

```tsx
navigate({
  to: '/verify-otp',
  search: {
    email: 'user@example.com',
    purpose: 'email-verification',
  },
})
```

---

## Kontribusi (Contribution)

Kontribusi untuk perbaikan bug, penambahan fitur, atau penyempurnaan sangat diapresiasi! Ikuti langkah-langkah berikut untuk berkontribusi:

1. **Fork** repositori ini.
2. Buat branch fitur baru:
   ```bash
   git checkout -b feature/nama-fitur
   ```
3. Lakukan perubahan kode dan pastikan seluruh pengecekan lint serta format berhasil:
   ```bash
   pnpm format
   pnpm lint
   ```
4. Commit perubahan Anda dengan pesan commit yang jelas dan deskriptif:
   ```bash
   git commit -m "feat: deskripsi perubahan..."
   ```
5. Push branch Anda ke repository remote:
   ```bash
   git push origin feature/nama-fitur
   ```
6. Buka **Pull Request** (PR) ke branch utama (`main`).

---

## Bantuan & Dukungan (Support)

Jika Anda menemui kendala, menemukan bug, atau memiliki pertanyaan seputar proyek ini:

- **Laporkan Bug / Saran Fitur**: Buat tiket baru melalui halaman **Issues**.
- **Diskusi & Pertanyaan**: Buka topik diskusi baru melalui tab **Discussions** atau hubungi pengelola proyek.
- ⭐ **Dukungan**: Jika starter template ini membantu proyek Anda, dukung pengembangannya dengan memberikan bintang (_star_) pada repositori ini!
