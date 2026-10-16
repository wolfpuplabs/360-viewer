import { put } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: false, // Wajib dinonaktifkan agar bisa menerima stream file besar (video)
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const filename = req.query.filename || 'video.mp4';
    
    // Upload stream langsung ke Vercel Blob
    const blob = await put(filename, req, {
      access: 'public',
    });

    return res.status(200).json(blob);
  } catch (error) {
    console.error('Blob upload error:', error);
    return res.status(500).json({
      error: error?.message || 'Unknown Vercel Blob error',
      code: error?.code || null,
    });
  }
}
