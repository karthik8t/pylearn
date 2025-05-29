import path from 'path'
// Helper function for MIME types
export default function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.gif': return 'image/gif';
    case '.svg': return 'image/svg+xml';
    case '.ico': return 'image/x-icon'; // Favicons, etc.
    // Add more types as needed
    default:
      console.warn(`[Main Process] Unknown MIME type for extension: ${ext}, defaulting to application/octet-stream`);
      return 'application/octet-stream'; // Fallback
  }
}
