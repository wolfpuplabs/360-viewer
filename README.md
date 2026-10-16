# Orbit 360 Viewer + Vercel Blob

## Files
- `index.html`: full viewer page with upload, public share links, and URL-serialized annotations.
- `api/upload.js`: Vercel serverless endpoint that authorizes direct-to-Blob browser uploads.
- `package.json`: Vercel Blob SDK dependency.

## Setup
1. Copy these files into the root of the `wolfpuplabs/360-viewer` repository. Keep `api/upload.js` inside an `api` folder.
2. In Vercel, open Storage → Blob Store `360-viewer-blob` → Settings / Environment Variables (or the project's Environment Variables screen) and add `BLOB_READ_WRITE_TOKEN` using the token for this Blob Store. If Vercel offers a Connect Store / Add Integration flow, connect the Blob Store to the project so the token is added automatically.
3. Redeploy the project after adding the variable.
4. Open the deployed site, choose a video, and click **Upload & buka video**. After upload, use **Bagikan** to copy/share the link.

## Notes
- The HTML alone cannot safely upload to Blob using a secret token; the `/api/upload` endpoint is required.
- Video URLs are public. Anyone who has the shared link can view the video.
- Share links store the video URL and annotations in query parameters. Very many annotations can make a long URL; use a database-backed share ID for larger projects.
- This is a static HTML + Vercel serverless function setup. Vercel's Node.js function runtime supports `api/upload.js`.
