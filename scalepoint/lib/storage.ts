import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { config } from './config';
import { writableDir } from './paths';

// Persistence layer (spec §14, §18). Submissions are stored BEFORE email is triggered,
// and each returns a unique submission ID for internal traceability.
//
// Dev driver: append-only JSON files under ./.data (gitignored, private).
// Production seam: implement the same interface against Postgres/Supabase and set
// STORAGE_DRIVER=postgres + DATABASE_URL.

export type SubmissionType =
  | 'executive_application'
  | 'executive_profile'
  | 'employer_requirement'
  | 'contact_enquiry';

export type StoredSubmission = {
  id: string;
  type: SubmissionType;
  createdAt: string;
  status: 'received';
  data: Record<string, unknown>;
};

export interface Storage {
  save(type: SubmissionType, data: Record<string, unknown>): Promise<StoredSubmission>;
}

const DATA_DIR = writableDir('.data');

const shortId = () => {
  const t = Date.now().toString(36).toUpperCase().slice(-5);
  const r = randomUUID().replace(/-/g, '').slice(0, 4).toUpperCase();
  return `${t}-${r}`;
};

class DevJsonStorage implements Storage {
  async save(type: SubmissionType, data: Record<string, unknown>) {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const record: StoredSubmission = {
      id: shortId(),
      type,
      createdAt: new Date().toISOString(),
      status: 'received',
      data,
    };
    const file = path.join(DATA_DIR, `${type}.jsonl`);
    await fs.appendFile(file, JSON.stringify(record) + '\n', 'utf8');
    return record;
  }
}

// Placeholder for the production driver so the seam is explicit.
class PostgresStorage implements Storage {
  async save(): Promise<StoredSubmission> {
    throw new Error(
      'STORAGE_DRIVER=postgres selected but the Postgres adapter is not implemented. ' +
        'Provide DATABASE_URL and implement PostgresStorage.save().',
    );
  }
}

let instance: Storage | null = null;
export function getStorage(): Storage {
  if (instance) return instance;
  instance = config.storageDriver === 'postgres' ? new PostgresStorage() : new DevJsonStorage();
  return instance;
}
