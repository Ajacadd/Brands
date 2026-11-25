// Adds each guide's approved gradients to its identity, and drops the old gradient line from the digital rules text.
const fs = require("fs"), path = require("path");
const G = {
  master: [ // academy guide: linear-gradient(135deg, a, b)
    ["تدرج الكحلي الرئيسي", "", "#011A4A", "#023373", 135],
    ["تدرج الكحلي الواسع", "", "#023373", "#1A5FA3", 135],
    ["تدرج الوردي", "", "#F280AA", "#FDB5C8", 135],
    ["وردي داكن", "", "#F280AA", "#FC739F", 135],
    ["تدرج فاتح", "", "#38B5DA", "#F2EFE2", 135]],
  psanea3: [ // صانعة الأجيال 3 guide: linear-gradient(90deg, a 0%, b 100%)
    ["تدرج الكحلي الرئيسي", "خلفيات رئيسية", "#011A4A", "#023373", 90],
    ["تدرج الكحلي الواسع", "خلفيات شرائح", "#1A5FA3", "#023373", 90],
    ["تدرج الوردي", "لمسات أنثوية", "#F280AA", "#FDB5C8", 90],
    ["وردي داكن", "CTA وإعلانات", "#F280AA", "#FC739F", 90],
    ["تدرج فاتح", "خلفيات بطاقات", "#38B5DA", "#F2EFE2", 90]],
  pconsult: [ // consulting team guide: linear-gradient(270deg, a, b)
    ["تدرج الكحلي العميق", "الأغلفة والخلفيات الرئيسية", "#0B1F36", "#13355A", 270],
    ["تدرج الكحلي الواسع", "خلفيات الشرائح والعروض", "#13355A", "#2F6299", 270],
    ["تدرج الوردي", "لمسات دافئة وبطاقات", "#F27292", "#F9B5C6", 270],
    ["الوردي الداكن", "أزرار CTA والإعلانات", "#C94E70", "#F27292", 270],
    ["التدرج الحواري", "الكحلي إلى الوردي — للبانرات", "#13355A", "#F27292", 270],
    ["تدرج فاتح", "خلفيات البطاقات", "#FDECF1", "#F4F4F7", 270]]
};
const dir = path.join(__dirname, "dbnow", "brands");
for (const id of Object.keys(G)) {
  const raw = JSON.parse(fs.readFileSync(path.join(dir, id + ".json"), "utf8"));
  const doc = raw.data || raw;
  const digital = String(doc.rules?.digital || "").split("\n").filter(l => !/^-\s*التدرجات/.test(l)).join("\n");
  const upd = { gradients: G[id].map(([name, use, from, to, angle]) => ({ name, use, from, to, angle })), rules: { digital }, updatedAt: "2026-11-17T15:00:00.000Z" };
  fs.writeFileSync(path.join(__dirname, "dbnow", id + ".update.json"), JSON.stringify(upd, null, 1));
  console.log(id, "gradients", upd.gradients.length, "| digital lines", digital.split("\n").length, "(was", String(doc.rules?.digital || "").split("\n").length + ")");
}
