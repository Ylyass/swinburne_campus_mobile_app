import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const DIR = path.join(process.cwd(), "src", "data");

async function ensure() {
  await mkdir(DIR, { recursive: true });
}

export async function readJSON<T>(file: string, fallback: T): Promise<T> {
  await ensure();
  try {
    const raw = await readFile(path.join(DIR, file), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function writeJSON(file: string, data: unknown) {
  await ensure();
  await writeFile(
    path.join(DIR, file),
    JSON.stringify(data, null, 2),
    "utf8"
  );
}

export async function ensureFile(fp: string, seed: any) {
  await mkdir(DIR, { recursive: true });
  try { await readFile(fp, "utf8"); }
  catch { await writeFile(fp, JSON.stringify(seed, null, 2), "utf8"); }
}
