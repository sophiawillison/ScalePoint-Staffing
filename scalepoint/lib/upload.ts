import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { config } from './config';
import { writableDir } from './paths';

// Secure file handling (spec §8, §17). Validates MIME + extension + size on the server.
// Dev driver stores to ./.uploads (private, gitignored) — never exposed as a public URL.
// Production seam: S3 / Supabase Storage with short-lived signed URLs for internal access.

const UPLOAD_DIR = writableDir('.uploads');

export type SavedFile = {
  storedPath: string; // internal path/key, never a public URL
  originalName: string;
  size: number;
  mime: string;
};

export type UploadError = { ok: false; message: string };
export type UploadOk = { ok: true; file: SavedFile };

function sanitize(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-120);
}

export async function saveUpload(file: File): Promise<UploadOk | UploadError> {
  const name = file.name ?? 'upload';
  const ext = path.extname(name).toLowerCase();
  const mime = file.type || 'application/octet-stream';

  if (file.size <= 0) return { ok: false, message: 'The file appears to be empty.' };
  if (file.size > config.maxUploadBytes) {
    const mb = Math.round(config.maxUploadBytes / (1024 * 1024));
    return { ok: false, message: `File exceeds the ${mb} MB limit.` };
  }
  const extOk = config.allowedUploadExt.includes(ext);
  const mimeOk = config.allowedUploadTypes.includes(mime) || mime === 'application/octet-stream';
  if (!extOk || !mimeOk) {
    return { ok: false, message: 'Unsupported file type. Please upload a PDF, DOC, or DOCX.' };
  }

  const buf = Buffer.from(await file.arrayBuffer());

  if (config.uploadDriver !== 'dev-local') {
    throw new Error(
      `UPLOAD_DRIVER=${config.uploadDriver} selected but that adapter is not implemented. ` +
        'Implement S3/Supabase upload in lib/upload.ts.',
    );
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const key = `${new Date().toISOString().slice(0, 10)}/${randomUUID()}${ext}`;
  const dest = path.join(UPLOAD_DIR, key);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, buf);

  return {
    ok: true,
    file: { storedPath: key, originalName: sanitize(name), size: file.size, mime },
  };
}
