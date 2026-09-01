import path from 'path';
import os from 'os';

// Picks a writable base directory for local dev stores.
// Locally we write inside the project folder so you can see .data / .emails / .uploads.
// On serverless hosts (e.g. Vercel) the project dir is read-only — only the OS temp
// dir is writable — so we fall back there. Temp storage is ephemeral, which is fine
// for a live demo: submissions still validate, persist for the request, return a
// reference ID, and trigger the confirmation screen.
export function writableDir(name: string): string {
  const serverless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NETLIFY;
  const base = serverless ? path.join(os.tmpdir(), 'scalepoint') : process.cwd();
  return path.join(base, name);
}
