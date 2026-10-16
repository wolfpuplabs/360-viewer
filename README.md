# Orbit 360 Viewer — Vercel Blob

## Isi paket
- `index.html`: letakkan di root repository sebagai halaman utama.
- `api/upload.js`: endpoint upload untuk Vercel Blob.
- `package.json`: dependensi SDK Blob.

## Pasang di GitHub
1. Ekstrak ZIP.
2. Ganti `index.html` di root repository dengan versi HTML Orbit yang sudah kamu siapkan di percakapan.
3. Tambahkan folder `api` beserta `upload.js` ke root repository.
4. Tambahkan `package.json` di root repository (gabungkan dependensinya jika sudah ada `package.json`).
5. Commit/push ke GitHub lalu tunggu deployment Vercel.

## Vercel
- Hubungkan Blob Store `360-viewer-blob` ke project `360-viewer`.
- Pastikan environment variables Blob tersedia untuk Production dan Preview. Biasanya koneksi Blob otomatis membuat `BLOB_READ_WRITE_TOKEN` (serta variabel store terkait).
- Jangan menaruh token rahasia di `index.html`.
- Tes terlebih dahulu dengan video kecil MP4.

## Catatan
Endpoint menerima upload video MP4, WebM, atau QuickTime hingga 500 MB. Upload langsung dari browser menggunakan `@vercel/blob/client` dan `handleUploadUrl: '/api/upload'`.
