const fs = require('fs');
const path = require('path');

const root = 'D:\\projects';
const ignored = [
  'node_modules', '.next', '.git', '.gemini', 'brain', 'dist', 'build',
  '.system_generated', '.user_uploaded', 'activityTracker', 'package-lock.json',
  '.turbo', 'cache', 'scratch', '.gitkeep'
];

let latest = null;

function scan(dir, depth = 0) {
  if (depth > 4) return;
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (ignored.some(ig => entry.name.toLowerCase().includes(ig.toLowerCase()))) continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scan(fullPath, depth + 1);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (['.tsx', '.ts', '.jsx', '.js', '.py', '.rs', '.go', '.html', '.css', '.json'].includes(ext)) {
          const stat = fs.statSync(fullPath);
          if (!latest || stat.mtimeMs > latest.mtime) {
            latest = {
              fullPath,
              name: entry.name,
              ext: ext.replace('.', ''),
              mtime: stat.mtimeMs,
              size: stat.size
            };
          }
        }
      }
    }
  } catch (e) {}
}

scan(root);

if (latest) {
  const content = fs.readFileSync(latest.fullPath, 'utf8');
  const lines = content.split('\n').length;
  const rel = path.relative(root, latest.fullPath).replace(/\\/g, '/');
  const project = rel.split('/')[0];
  console.log(JSON.stringify({
    editor: "Antigravity IDE / VS Code",
    project,
    file: latest.name,
    relativePath: rel,
    extension: latest.ext,
    lines,
    size: (latest.size / 1024).toFixed(1) + ' KB',
    lastModified: latest.mtime,
    timeStr: new Date(latest.mtime).toLocaleString(),
    status: Date.now() - latest.mtime < 1000 * 60 * 30 ? 'active' : 'idle'
  }, null, 2));
}
