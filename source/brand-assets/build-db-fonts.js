// Links the newly uploaded Thmanyah Serif Display / IBM Plex Sans Arabic files to their identities.
const fs = require("fs"), path = require("path");
const OUT = path.join(__dirname, "db4"); fs.mkdirSync(OUT, { recursive: true });
let t = Date.parse("2026-11-18T13:00:00.000Z"); const ts = () => new Date(t += 1000).toISOString();
const writes = [];
const put = (op, collection, id, data, ver) => { const f = path.join(OUT, `${collection.replace(/\//g, "_")}__${id}.json`); fs.writeFileSync(f, JSON.stringify(data, null, 1));
  const w = { op, collection, doc_id: id, file_path: path.relative(process.cwd(), f).replace(/\\/g, "/") }; if (ver) w.if_version = ver; writes.push(w); };
const W = { Light: 300, Regular: 400, Medium: 500, Bold: 700, Black: 900 };
const SERIF = {
  pthirty: { dir: "fonts-thirty", prefix: "fts", ids: { Light: "36a95a18982f0da81005d1178d5523a9", Regular: "a20d6d4c3d6c8463668c146ae024fd5c", Medium: "010b429c1fa1c507013762d19d51a3b2", Bold: "d598934d86f463a2c07a523576014229", Black: "bf2d3c594e06ec2f3f65ad5913f94048" } },
  jraheeq: { dir: "fonts-raheeq", prefix: "frs", ids: { Light: "3cef84f815f062a426f8f8b665e0d7cf", Regular: "bc2b640addbdc4a9120cf87129eff016", Medium: "493a8d1375c91fa0b324dcf37f9d1e12", Bold: "b940f27d909b9b9b854b45af71a44947", Black: "4611ae3e79cff3ac569505ece29735f9" } } };
for (const [brand, s] of Object.entries(SERIF)) {
  const doc = JSON.parse(fs.readFileSync(path.join(__dirname, "dbcheck", "brands", brand + ".json"), "utf8"));
  const data = doc.data || doc; const ver = doc.version;
  const fonts = (data.fonts || []).map(f => f.name === "Thmanyah Serif Display"
    ? { ...f, weights: "Light 300 · Regular 400 · Medium 500 · Bold 700 · Black 900", assetId: s.ids.Regular, filename: "thmanyahserifdisplay-Regular.otf", contentType: "font/otf" } : f);
  put("update", "brands", brand, { fonts, updatedAt: "2026-11-18T13:00:00.000Z" }, ver);
  Object.entries(s.ids).forEach(([w, id], i) => { const file = `thmanyahserifdisplay-${w}.otf`;
    put("set", `brands/${brand}/files`, `${s.prefix}${i + 1}`, { title: `Thmanyah Serif Display ${w}`, category: "font", variant: `الوزن ${W[w]} · خط العناوين`, note: "", assetId: id, filename: file, ext: "otf", contentType: "font/otf", sizeBytes: fs.statSync(path.join(__dirname, s.dir, file)).size, createdAt: ts() }); });
}
[["Medium", 500, "20095b01129529776fed077696c51ac2"], ["Bold", 700, "fe0eda2c7d4207021d6cd74d91bfd5d6"]].forEach(([w, n, id], i) => { const file = `IBMPlexSansArabic-${w}.ttf`;
  put("set", "brands/praqiyat/files", `fkp${i + 1}`, { title: `IBM Plex Sans Arabic ${w}`, category: "font", variant: `الوزن ${n}`, note: "الوزن Thin المعتمد للعناوين متاح مجاناً من Google Fonts", assetId: id, filename: file, ext: "ttf", contentType: "font/ttf", sizeBytes: fs.statSync(path.join(__dirname, "fonts-raqiyat", file)).size, createdAt: ts() }); });
fs.writeFileSync(path.join(OUT, "_writes.json"), JSON.stringify(writes));
console.log(JSON.stringify(writes));
