import fs from "fs";
import path from "path";

export interface ActivityData {
  editor: string;
  project: string;
  file: string;
  relativePath: string;
  extension: string;
  language: string;
  lines: number;
  size: string;
  workspace: string;
  branch: string;
  lastActive: number;
  status: "active" | "idle";
  statusText: string;
}

const IGNORED_NAMES = new Set([
  "activitytracker.ts",
  "activitytracker.js",
  "find_recent.js",
  "darshon-presence-agent.js",
  "darshon-presence-agent.ts",
  "start-agent.bat",
  "config.json",
  "agent.js",
  "package-lock.json",
  "package.json",
  "tsconfig.json",
  "build-manifest.json",
  ".gitkeep",
  ".cursorrules",
  "license",
  "readme.md",
]);

const IGNORED_PATHS = [
  "node_modules",
  ".next",
  ".git",
  ".gemini",
  "brain",
  "scratch",
  ".system_generated",
  ".user_uploaded",
  "darshon-agent",
  "agent",
  "scripts",
  "dist",
  "build",
  ".turbo",
  "cache",
];

const EXT_LANGUAGE_MAP: Record<string, string> = {
  tsx: "TypeScript (React 19)",
  ts: "TypeScript",
  jsx: "JavaScript (React)",
  js: "JavaScript (Node.js)",
  css: "Tailwind CSS v4",
  py: "Python 3",
  rs: "Rust",
  go: "Go",
  html: "HTML5",
  json: "JSON Config",
  c: "C",
  cpp: "C++",
};

export function getLatestWorkspaceActivity(): ActivityData {
  const jahidHasanRoot = path.resolve(process.cwd(), ".."); // D:\projects\Jahid_Hasan
  const projectsRoot = path.resolve(jahidHasanRoot, ".."); // D:\projects

  let latestFile = "";
  let latestMtime = 0;
  let detectedRoot = jahidHasanRoot;

  function scanDirectory(dir: string, currentRoot: string, depth = 0) {
    if (depth > 4) return;
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const lowerName = entry.name.toLowerCase();

        // Skip ignored directories & files
        if (IGNORED_PATHS.some((ig) => lowerName === ig || lowerName.includes(ig))) {
          continue;
        }
        if (IGNORED_NAMES.has(lowerName)) {
          continue;
        }

        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          scanDirectory(fullPath, currentRoot, depth + 1);
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name).toLowerCase().replace(".", "");
          if (EXT_LANGUAGE_MAP[ext]) {
            const stat = fs.statSync(fullPath);
            if (stat.mtimeMs > latestMtime) {
              latestMtime = stat.mtimeMs;
              latestFile = fullPath;
              detectedRoot = currentRoot;
            }
          }
        }
      }
    } catch {
      // Ignore directory access restrictions
    }
  }

  // Scan current workspace first
  scanDirectory(jahidHasanRoot, jahidHasanRoot, 0);

  // Fallback defaults if no files found or if unwanted files detected
  if (!latestFile || latestFile.includes("agent") || latestFile.includes("scratch")) {
    return {
      editor: "Visual Studio Code",
      project: "darshon_portfolio",
      file: "validator.ts",
      relativePath: "validator.ts",
      extension: "ts",
      language: "TypeScript",
      lines: 248,
      size: "8.4 KB",
      workspace: "Jahid_Hasan",
      branch: "main",
      lastActive: Date.now(),
      status: "active",
      statusText: "In Jahid_Hasan - 0 problems found",
    };
  }

  // Calculate real file stats
  let lineCount = 0;
  let fileSize = "0 KB";
  try {
    const content = fs.readFileSync(latestFile, "utf-8");
    lineCount = content.split("\n").length;
    const stat = fs.statSync(latestFile);
    fileSize = `${(stat.size / 1024).toFixed(1)} KB`;
  } catch {
    lineCount = 145;
    fileSize = "5.6 KB";
  }

  // Parse project name and relative path
  const rel = path.relative(detectedRoot, latestFile).replace(/\\/g, "/");
  const parts = rel.split("/");
  let projectName = "darshon_portfolio";

  if (parts.length > 1) {
    if (parts[0] === "darshon_portfolio" || parts[0] === "portfolio" || parts[0] === "razebot_copy") {
      projectName = parts[0];
    } else if (parts[0] === "src") {
      projectName = "darshon_portfolio";
    } else {
      projectName = parts[0];
    }
  }

  const fileName = path.basename(latestFile);
  const ext = path.extname(latestFile).replace(".", "").toLowerCase();
  const language = EXT_LANGUAGE_MAP[ext] || "Source Code";

  const now = Date.now();
  const timeDiff = now - latestMtime;
  const isRecent = timeDiff < 1000 * 60 * 25; // Active within last 25 mins

  return {
    editor: "Antigravity IDE / VS Code",
    project: projectName,
    file: fileName,
    relativePath: rel,
    extension: ext,
    language,
    lines: lineCount,
    size: fileSize,
    workspace: "Jahid_Hasan",
    branch: "main",
    lastActive: Math.floor(latestMtime),
    status: isRecent ? "active" : "idle",
    statusText: isRecent
      ? "Editing & Building in Real-Time"
      : "Saved // Synced Workspace",
  };
}
