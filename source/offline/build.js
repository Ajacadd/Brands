// Builds a standalone, single-file copy of the identity library: page + all data + every file embedded as data URIs.
// usage: node offline/build.js   (run from the session folder)
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, ".."), DB = path.join(__dirname, "db", "brands");
const DIRS = { master: ["academy"], psanea3: ["sanea3"], pconsult: ["consult"], pthirty: ["thirty/out", "thirty", "fonts-thirty"],
  jqurra: ["qurra"], jraheeq: ["raheeq", "fonts-raheeq"], praqiyat: ["raqiyat", "fonts-raqiyat"] };
const readDoc = f => { const j = JSON.parse(fs.readFileSync(f, "utf8")); return j.data || j; };

const brands = [], files = {}, assetPath = {}, assetType = {};
for (const f of fs.readdirSync(DB).filter(n => n.endsWith(".json"))) {
  const id = f.replace(/\.json$/, ""); brands.push({ id, data: readDoc(path.join(DB, f)) });
  const fd = path.join(DB, id, "files"); files[id] = [];
  if (fs.existsSync(fd)) for (const g of fs.readdirSync(fd).filter(n => n.endsWith(".json"))) {
    const d = readDoc(path.join(fd, g)); files[id].push({ id: g.replace(/\.json$/, ""), data: d });
    if (d.assetId && d.filename && !assetPath[d.assetId]) {
      const hit = (DIRS[id] || []).map(dir => path.join(ROOT, "brand-assets", dir, d.filename)).find(p => fs.existsSync(p));
      if (hit) { assetPath[d.assetId] = hit; assetType[d.assetId] = d.contentType; } else console.warn("missing local file:", id, d.filename);
    }
  }
}
// every asset id the page can reference: file rows, covers, font links, page chrome
const want = new Set(Object.keys(assetPath));
for (const b of brands) { if (b.data.coverAsset) want.add(b.data.coverAsset); (b.data.fonts || []).forEach(f => f.assetId && want.add(f.assetId)); }
let page = fs.readFileSync(path.join(ROOT, "brand-library.html"), "utf8");
(page.match(/\/_blob\/([0-9a-f]{32})/g) || []).forEach(m => want.add(m.slice(7)));
// --site: write a GitHub Pages folder (index.html + assets/) instead of one file with everything embedded
const SITE = process.argv.includes("--site");
const SITE_DIR = path.join(ROOT, "github-repo");
if (SITE) { fs.rmSync(path.join(SITE_DIR, "assets"), { recursive: true, force: true }); fs.mkdirSync(path.join(SITE_DIR, "assets"), { recursive: true }); }
const assets = {}; let bytes = 0; const missing = [];
for (const id of want) { const p = assetPath[id]; if (!p) { missing.push(id); continue; } const buf = fs.readFileSync(p); bytes += buf.length;
  if (SITE) { const name = `${id}${path.extname(p).toLowerCase()}`; fs.writeFileSync(path.join(SITE_DIR, "assets", name), buf); assets[id] = `assets/${name}`; }
  else assets[id] = `data:${assetType[id] || "application/octet-stream"};base64,${buf.toString("base64")}`; }
page = page.replace(/\/_blob\/([0-9a-f]{32})/g, (m, id) => assets[id] || m);

const OFFLINE = { exportedAt: new Date().toISOString(), brands, files, assets };
const head = `<!doctype html><html lang="ar"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<style>:root{color-scheme:light}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style></head><body>`;
const data = `<script>window.OFFLINE=${JSON.stringify(OFFLINE).replace(/<\/script/gi, "<\\/script")};</script>\n`;
page = page.replace('<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip', data + '<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip');
if (SITE) fs.writeFileSync(path.join(SITE_DIR, ".nojekyll"), "");
const out = SITE ? path.join(SITE_DIR, "index.html") : path.join(ROOT, "مكتبة هوية الأجيال.html");
fs.writeFileSync(out, head + page + "\n</body></html>");
console.log("brands", brands.length, "| files", Object.values(files).reduce((a, l) => a + l.length, 0), "| assets", Object.keys(assets).length, "| raw MB", (bytes / 1048576).toFixed(1), "| html MB", (fs.statSync(out).size / 1048576).toFixed(1));
if (missing.length) console.log("NOT EMBEDDED:", missing.join(", "));
