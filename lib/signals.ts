import fs from 'fs';
import path from 'path';
import type { Signal } from '@/components/SignalsGrid';

const MANUAL_PATH = path.join(process.cwd(), 'content/signals.json');
const LIVE_PATH = path.join(process.cwd(), 'content/signals-live.json');

function readJsonSafe(filePath: string): Signal[] {
  try {
    if (!fs.existsSync(filePath)) return [];
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getAllSignals(): Signal[] {
  const manual = readJsonSafe(MANUAL_PATH);
  const live = readJsonSafe(LIVE_PATH);
  // live news first (most recent), then hand-curated ones
  return [...live, ...manual];
}
