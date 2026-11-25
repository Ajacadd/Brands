// Local helper: serves this folder and saves POSTed files to ./out (used to render/extract the PDF guide in the browser pane)
const http = require("http"), fs = require("fs"), path = require("path");
const root = __dirname, out = path.join(root, "out");
fs.mkdirSync(out, { recursive: true });
const types = { ".html": "text/html; charset=utf-8", ".pdf": "application/pdf", ".js": "text/javascript", ".png": "image/png", ".json": "application/json" };
http.createServer((req, res) => {
  const u = new URL(req.url, "http://localhost");
  if (req.method === "POST" && u.pathname === "/save") {
    const name = path.basename(u.searchParams.get("name") || "file.bin");
    const chunks = []; req.on("data", c => chunks.push(c));
    req.on("end", () => { fs.writeFileSync(path.join(out, name), Buffer.concat(chunks)); res.end("ok"); });
    return;
  }
  const p = path.join(root, decodeURIComponent(u.pathname === "/" ? "/view.html" : u.pathname));
  if (!p.startsWith(root) || !fs.existsSync(p)) { res.statusCode = 404; return res.end("nf"); }
  res.setHeader("Content-Type", types[path.extname(p)] || "application/octet-stream");
  fs.createReadStream(p).pipe(res);
}).listen(5178, () => console.log("http://localhost:5178"));
