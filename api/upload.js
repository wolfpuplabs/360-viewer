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
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        let contentType = '';
        try {
          if (clientPayload) contentType = JSON.parse(clientPayload).contentType || '';
        } catch {
          throw new Error('Invalid upload metadata');
        }
        if (contentType && !['video/mp4', 'video/webm', 'video/quicktime'].includes(contentType)) {
          throw new Error('Only MP4, WebM, and QuickTime videos are allowed');
        }
        return {
          allowedContentTypes: ['video/mp4', 'video/webm', 'video/quicktime'],
          maximumSizeInBytes: 500 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log('Video uploaded:', blob.pathname);
      },
    });
    return response.status(200).json(jsonResponse);
  } catch (error) {
    console.error('Blob upload error:', error);
    return response.status(400).json({ error: error?.message || 'Upload failed' });
  }
}
