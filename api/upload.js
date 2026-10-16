import { handleUpload } from '@vercel/blob/client';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const jsonResponse = await handleUpload({
      body: request.body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        // Keep uploads limited to video files and cap size at 500 MB.
        const contentType = clientPayload ? JSON.parse(clientPayload).contentType : '';
        if (contentType && !contentType.startsWith('video/')) {
          throw new Error('Only video uploads are allowed');
        }
        return {
          allowedContentTypes: ['video/mp4', 'video/webm', 'video/quicktime'],
          maximumSizeInBytes: 500 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async ({ blob }) => {
        // Optional: persist blob metadata in a database if you add one later.
        console.log('Video uploaded:', blob.pathname);
      },
    });
    return response.status(200).json(jsonResponse);
  } catch (error) {
    console.error('Blob upload error:', error);
    return response.status(400).json({ error: error.message || 'Upload failed' });
  }
}
