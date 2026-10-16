
import { handleUpload } from '@vercel/blob/client';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const result = await handleUpload({
      request,
      body: request.body,

      onBeforeGenerateToken: async (pathname, clientPayload) => {
        return {
          allowedContentTypes: [
            'video/mp4',
            'video/webm',
            'video/quicktime'
          ],
          maximumSizeInBytes: 500 * 1024 * 1024,
          addRandomSuffix: true
        };
      },

      onUploadCompleted: async ({ blob }) => {
        console.log('Video uploaded:', blob.pathname, blob.url);
      }
    });

    return response.status(200).json(result);
  } catch (error) {
    console.error('Blob upload error:', error);
    return response.status(400).json({
      error: error.message || 'Upload failed'
    });
  }
}
