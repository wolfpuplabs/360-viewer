
import { handleUpload } from '@vercel/blob/client';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({
      error: 'Method not allowed',
    });
  }

  try {
    const result = await handleUpload({
      body: request.body,
      request,

      onBeforeGenerateToken: async (pathname, clientPayload) => {
        let payload = {};

        if (clientPayload) {
          try {
            payload = JSON.parse(clientPayload);
          } catch {
            throw new Error('Invalid upload payload');
          }
        }

        const contentType = payload.contentType || '';

        if (!contentType.startsWith('video/')) {
          throw new Error('Please select a valid video file');
        }

        return {
          allowedContentTypes: [
            'video/mp4',
            'video/webm',
            'video/quicktime',
          ],
          maximumSizeInBytes: 500 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },

      onUploadCompleted: async ({ blob }) => {
        console.log('BLOB_UPLOAD_COMPLETED', {
          pathname: blob.pathname,
          url: blob.url,
        });
      },
    });

    console.log('BLOB_UPLOAD_TOKEN_CREATED');

    return response.status(200).json(result);
  } catch (error) {
    console.error('BLOB_UPLOAD_ERROR', error);

    return response.status(400).json({
      error: error.message || 'Upload failed',
    });
  }
}
