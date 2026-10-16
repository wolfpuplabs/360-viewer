import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
  // Gunakan request.nextUrl.searchParams bawaan Next.js yang aman
  // Ini menghindari peringatan url.parse()
  const searchParams = request.nextUrl.searchParams;
  const filename = searchParams.get('filename') || 'video.mp4';

  try {
    const blob = await put(filename, request.body, {
      access: 'public',
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error('Blob upload error:', error);
    return NextResponse.json({ error: 'Upload gagal' }, { status: 500 });
  }
}
