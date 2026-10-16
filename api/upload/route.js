import { handleUpload } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Mengizinkan file video
        return {
          allowedContentTypes: ['video/mp4', 'video/webm', 'video/quicktime'],
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('Video berhasil diunggah:', blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
