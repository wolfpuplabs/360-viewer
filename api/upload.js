import { handleUpload } from '@vercel/blob/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const jsonResponse = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async (pathname, clientPayload) => ({
        allowedContentTypes: ['video/mp4', 'video/webm', 'application/octet-stream'],
        addRandomSuffix: true,
        tokenPayload: clientPayload || undefined,
      }),
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('Video upload completed:', blob.pathname);
      },
    });

    return res.status(200).json(jsonResponse);
  } catch (error) {
    console.error('Blob upload handler error:', error);
    return res.status(400).json({ error: error?.message || 'Upload authorization failed' });
  }
}
