import { NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DIR = path.join(process.cwd(), "src", "data");
const FILE = path.join(DIR, "exits.json");

async function ensureFile() {
  await mkdir(DIR, { recursive: true });
  try {
    await readFile(FILE, "utf8");
  } catch {
    await writeFile(FILE, "[]", "utf8");
  }
}

async function readAll() {
  await ensureFile();
  const raw = await readFile(FILE, "utf8");
  return JSON.parse(raw) as any[];
}

async function writeAll(list: any[]) {
  await ensureFile();
  await writeFile(FILE, JSON.stringify(list, null, 2), "utf8");
}

export async function GET() {
  const exits = await readAll();
  return NextResponse.json(exits);
}

export async function POST(req: Request) {
  const body = await req.json();

  const exits = await readAll();
  const id = body.id || `exit-${crypto.randomUUID()}`;

  const newExit = {
    id,
    name: body.name ?? "New Exit",
    location: body.location ?? "",
    distance: body.distance ?? "",
    direction: body.direction ?? "",
    estimatedTime: body.estimatedTime ?? "",
    status: body.status ?? "Open",
  };

  exits.push(newExit);
  await writeAll(exits);

  return NextResponse.json(newExit, { status: 201 });
}
