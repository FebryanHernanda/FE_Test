# Frontend Test – Sistem Monitoring Lalu Lintas & Transaksi Tol

Frontend application untuk menampilkan **data operasional lalu lintas** dan **master data gerbang**.  
Fokus aplikasi ini adalah **rekap & perhitungan volume transaksi**, bukan perhitungan pendapatan.

---

## ✨ Features

- Dashboard operasional (KPI & visualisasi lalu lintas)
- Laporan Lalu Lintas Harian (filter, search, pagination)
- Master Data Gerbang (CRUD)
- Konsisten menggunakan feature-based architecture
- Siap integrasi backend

---

## 🛠️ Tech Stack

**Core:**
- React 19 + TypeScript
- Vite

**UI & Styling:**
- Material UI v7 (+ Icons, X Date Pickers)
- Tailwind CSS v4
- Recharts

**State & Data Fetching:**
- TanStack Query v5
- Axios

**Forms & Validation:**
- React Hook Form
- Zod

**Utilities:**
- Day.js
- React Router v7

---

## 🚀 How to Run (Local)

### 1. Clone Repository

```bash
git clone https://github.com/FebryanHernanda/FE_Test.git
cd FE_Test
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment

Buat file `.env` di root project:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

Pastikan backend sudah berjalan di port yang sesuai.

### 4. Run Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di:

http://localhost:5173


---

## 📦 Build for Production

```bash
npm run build
npm run preview
```


---

## 🔗 Backend Source

Backend API yang digunakan pada project ini:

👉 https://github.com/faoziyarisma/tect-test-front-end

Aplikasi frontend hanya menggunakan endpoint yang tersedia tanpa memodifikasi backend.

---


## 🖼️ Screenshots


![Dashboard](./screenshots/dashboard.png)
![Laporan Lalin](./screenshots/laporan-lalin.png)
![Master Gerbang](./screenshots/master-gerbang.png)
