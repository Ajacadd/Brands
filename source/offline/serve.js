// Serves the session folder so the standalone library can be checked in the browser pane.
const http = require("http"), fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (!p.startsWith(root) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.statusCode = 404; return res.end("nf"); }
  const types = { ".html": "text/html; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".pdf": "application/pdf", ".otf": "font/otf", ".ttf": "font/ttf", ".woff2": "font/woff2" };
  res.setHeader("Content-Type", types[path.extname(p).toLowerCase()] || "application/octet-stream");
  fs.createReadStream(p).pipe(res);
}).listen(5179, () => console.log("http://localhost:5179"));
