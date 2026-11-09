import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const BASELINE_VIEWS = 5417;
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "views.json");

// In-memory fallback
let memoryViews = BASELINE_VIEWS;

function getStoredViews(): number {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(
        DATA_FILE,
        JSON.stringify({ views: BASELINE_VIEWS, lastUpdated: new Date().toISOString() }, null, 2),
        "utf-8"
      );
      return BASELINE_VIEWS;
    }
    const content = fs.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(content);
    if (typeof parsed.views === "number" && parsed.views >= BASELINE_VIEWS) {
      memoryViews = parsed.views;
      return parsed.views;
    }
    return BASELINE_VIEWS;
  } catch (err) {
    console.error("Error reading views.json:", err);
    return memoryViews;
  }
}

function incrementStoredViews(): number {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const current = getStoredViews();
    const next = current + 1;
    memoryViews = next;
    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify({ views: next, lastUpdated: new Date().toISOString() }, null, 2),
      "utf-8"
    );
    return next;
  } catch (err) {
    console.error("Error writing views.json:", err);
    memoryViews += 1;
    return memoryViews;
  }
}

export async function GET() {
  const views = getStoredViews();
  return NextResponse.json({
    views,
    formatted: views.toLocaleString("en-US"),
  });
}

export async function POST() {
  const views = incrementStoredViews();
  return NextResponse.json({
    views,
    formatted: views.toLocaleString("en-US"),
  });
}

