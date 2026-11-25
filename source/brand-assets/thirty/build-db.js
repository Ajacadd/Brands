// Builds the library documents for the program «ثلاثون شهرًا» from its PDF guide.
const fs = require("fs"), path = require("path");
const OUT = path.join(__dirname, "db"); fs.mkdirSync(OUT, { recursive: true });
const now = "2026-11-18T09:00:00.000Z"; let t = Date.parse("2026-11-18T08:00:00.000Z");
const ts = () => new Date(t += 1000).toISOString();
const writes = [];
const put = (collection, id, data) => { const f = path.join(OUT, `${collection.replace(/\//g, "_")}__${id}.json`); fs.writeFileSync(f, JSON.stringify(data, null, 1)); writes.push({ op: "set", collection, doc_id: id, file_path: path.relative(process.cwd(), f).replace(/\\/g, "/") }); };
const size = f => fs.statSync(path.join(__dirname, f)).size;

put("brands", "pthirty", {
  name: "ثلاثون شهرًا", nameEn: "", kind: "program", order: 3,
  summary: "برنامج «ثلاثون شهرًا» من أكاديمية هندسة الأجيال.\nالشعار اللفظي: «أمومة بوعي وطمأنينة».\nتجمع الهوية بين الوقار (الكحلي العميق) والدفء الأنثوي (الوردي الناعم).",
  coverAsset: "aa7adfd7a5f81b4df5500b6a3edeb735", driveFolder: "",
  colors: [
    { hex: "#023373", name: "الكحلي العميق", role: "أساسي", cmyk: "100, 80, 0, 35", pantone: "" },
    { hex: "#F280AA", name: "الوردي الناعم", role: "أساسي", cmyk: "0, 47, 30, 5", pantone: "" },
    { hex: "#FDB5C8", name: "وردي فاتح", role: "مساعد", cmyk: "0, 37, 5, 0", pantone: "" },
    { hex: "#FC739F", name: "عناصر تفاعلية", role: "مساعد", cmyk: "0, 54, 37, 1", pantone: "" },
    { hex: "#5BD7FB", name: "تنبيهات", role: "تنبيه", cmyk: "64, 14, 0, 2", pantone: "" },
    { hex: "#FFD3E4", name: "وردي فاتح جداً", role: "مساعد", cmyk: "0, 22, 0, 0", pantone: "" },
    { hex: "#F4F4F7", name: "خلفيات", role: "خلفية", cmyk: "3, 2, 1, 0", pantone: "" },
    { hex: "#FDF2E3", name: "خلفيات مساعدة", role: "خلفية", cmyk: "0, 4, 10, 0", pantone: "" },
    { hex: "#6D6E71", name: "نصوص ثانوية", role: "نصوص", cmyk: "4, 3, 0, 56", pantone: "" },
    { hex: "#B1B3B6", name: "فواصل خفية", role: "مساعد", cmyk: "3, 2, 0, 29", pantone: "" }],
  gradients: [
    { name: "تدرج الكحلي الرئيسي", use: "خلفيات رئيسية", from: "#011A4A", to: "#023373", angle: 135 },
    { name: "تدرج الكحلي الواسع", use: "خلفيات شرائح", from: "#023373", to: "#1A5FA3", angle: 135 },
    { name: "تدرج الوردي", use: "لمسات أنثوية", from: "#F280AA", to: "#FDB5C8", angle: 135 },
    { name: "وردي داكن", use: "CTA وإعلانات", from: "#F280AA", to: "#FC739F", angle: 135 },
    { name: "تدرج فاتح", use: "خلفيات بطاقات", from: "#38B5DA", to: "#F2EFE2", angle: 135 }],
  fonts: [
    { name: "Thmanyah Serif Display", role: "العناوين", weights: "Display للعناوين الرئيسية · Medium للعناوين الفرعية", usage: "الخط الرئيسي (خط ثمانية): Display للعناوين الرئيسية 28–120pt على الأغلفة والبوسترات والبانرات، وThmanyah Serif Medium للعناوين الفرعية 18–26pt.", driveUrl: "", google: false, assetId: "", filename: "", contentType: "" },
    { name: "Somar Rounded", role: "النصوص", weights: "Regular · Medium", usage: "الخط الثانوي (سومر المدوّر): Regular لكل النصوص الطويلة 12–22pt، وMedium للنصوص الثانوية التكميلية 8–12pt.", driveUrl: "", google: false, assetId: "", filename: "", contentType: "" }],
  rules: {
    digital: "- الحد الأدنى للشعار 100px على الشاشات.\n- المساحة الآمنة حول الشعار تبقى خالية تماماً من أي عناصر جرافيكية أو نصوص.\n- المقاسات: 1080×1350 بوست طولي (Instagram · Facebook · كاروسيل) · 1200×1200 (LinkedIn · Telegram · X · WhatsApp) · 1080×1920 ستوري وريلز · 1920×1080 (YouTube · غلاف · فيديو · شرائح).\n- القاعدة الذهبية 2026: المنصات تفضّل المحتوى الرأسي، ابدئي بـ 1080×1350 (4:5) لمساحة أكبر في الفيد وأداء أعلى.",
    print: "- الحد الأدنى للشعار 25mm في المطبوعات.\n- اعتمد قيم CMYK المذكورة لكل لون.\n- التسلسل الطباعي: Thmanyah Serif Display 28–120pt للعناوين الرئيسية · Thmanyah Serif Medium 18–26pt لعناوين الأقسام والمحاضرات والوحدات · Somar Rounded Regular 12–22pt للشرح والوصف والمحتوى · Somar Rounded Medium 8–12pt للنصوص الثانوية.",
    dos: ["الشعار الملوّن الكامل على الخلفيات الفاتحة: الأبيض، الكريمي، الرمادي الفاتح — الحالة الافتراضية الأولى", "الشعار الأبيض الكامل على الخلفيات الداكنة حصراً: الكحلي، السيان الداكن، الوردي الداكن", "الشعار داخل مربع كحلي على الصور والخلفيات المعقدة", "الكحلي للعناوين الرئيسية والعناصر المحورية والخلفيات ذات الحضور البصري القوي", "الوردي لإبراز العناصر الثانوية والعناوين الفرعية والعناصر التفاعلية ولمسة دافئة", "ألوان متناسقة وهادئة تعكس الطابع الأكاديمي والشرعي", "الصور: الزوايا الخلفية الكاملة أو الجانبية غير المباشرة", "الصور: الحجاب منسدل من الرأس إلى الكتف، واليدان مغطّاتان", "الصور: بيئة طبيعية أو منزلية، ظلال وانعكاسات رمزية جميلة، وعناصر مثل وردة وكتاب وبيت وشمعة", "الصور: درجات باردة هادئة بلا تشبّع مبالغ فيه، وتقليل الأسود في ألوان الملابس"].join("\n"),
    donts: ["تدوير الشعار بأي زاوية", "تمديد الشعار أو ضغط نسبه", "تغيير أي لون من ألوان الشعار", "إضافة ظل أو توهج أو Stroke للشعار", "وضع الشعار على خلفية مزدحمة مشابهة لألوانه", "تصغير الشعار عن الحد الأدنى (25mm مطبوعاً)", "الألوان الزاهية والمبهرة في الخلفيات والنصوص", "إظهار الوجه بأي وضوح تام", "نقاب بفتحة واسعة — ضيقة جداً فقط", "أيادٍ مكشوفة — تُغطّى دائماً", "ملابس ضيقة أو ألوان براقة مبهرجة", "محتوى مختلط بين الجنسين", "صور Stock مصطنعة أو غربية الطابع", "ثياب أطفال أكبر من سنّهم"].join("\n"),
    voice: "الشعار اللفظي: «أمومة بوعي وطمأنينة».\nالخطاب للأم بصيغة المؤنث، بطابع أكاديمي وشرعي هادئ.\nالموقع: ajacadd.com" },
  prompt: "وصف مرجعي لتوليد الصور أو البحث عنها:\nviewed from behind · no face visible · loose non-form-fitting · hands covered · soft natural lighting · cool tones",
  createdAt: now, updatedAt: now });

const F = [
  ["ft01", "thirty-primary.png", "aa7adfd7a5f81b4df5500b6a3edeb735", "logo", "الشعار الأساسي", "رأسي مع الشعار اللفظي · ملوّن"],
  ["ft02", "thirty-wide.png", "804487e88bec9370290a108c45c78727", "logo", "الشعار العريض", "أفقي مع الشعار اللفظي · ملوّن"],
  ["ft03", "thirty-stacked-compact.png", "c61d28d5988542d4e7a84116bbead416", "logo", "الشعار الرأسي المضغوط", "للمساحات الضيقة · ملوّن"],
  ["ft04", "thirty-icon.png", "f2f1b2ae2f671d8454a86f301a040166", "logo", "الرمز «30»", "للأيقونات وصور الحسابات · ملوّن"],
  ["ft05", "thirty-primary-white.png", "2e6536428a80636ae618852d8d73f94e", "logo", "الشعار الأساسي — أبيض", "للخلفيات الداكنة حصراً", "نسخة أحادية مولّدة من الشعار الملوّن"],
  ["ft06", "thirty-wide-white.png", "b3957796a91e34d277345c7ae35f42a1", "logo", "الشعار العريض — أبيض", "للخلفيات الداكنة حصراً", "نسخة أحادية مولّدة من الشعار الملوّن"],
  ["ft07", "thirty-stacked-compact-white.png", "7b9672856523072e8d85d066b5fe677a", "logo", "الرأسي المضغوط — أبيض", "للخلفيات الداكنة حصراً", "نسخة أحادية مولّدة من الشعار الملوّن"],
  ["ft08", "thirty-icon-white.png", "badb34a288e15d01aac60e5290c626f8", "logo", "الرمز «30» — أبيض", "للخلفيات الداكنة حصراً", "نسخة أحادية مولّدة من الشعار الملوّن"],
  ["ft09", "thirty-guide-cover.png", "bfae5e845d9e8645a8928b908ccfbaae", "image", "غلاف دليل الهوية", "2020 × 1428 px", "الصورة الرئيسية للبرنامج كما في غلاف الدليل"],
  ["ft10", "thirty-months_brand-guide.pdf", "5a677228de90190beb2815442bb27b2b", "guide", "دليل الهوية البصرية — ثلاثون شهرًا", "PDF · 19 صفحة"]];
for (const [id, file, assetId, category, title, variant, note] of F) {
  const rel = file.endsWith(".pdf") ? file : "out/" + file;
  put("brands/pthirty/files", id, { title, category, variant, note: note || "", assetId, filename: file, ext: file.split(".").pop(),
    contentType: file.endsWith(".pdf") ? "application/pdf" : "image/png", sizeBytes: size(rel), createdAt: ts() });
}
fs.writeFileSync(path.join(OUT, "_writes.json"), JSON.stringify(writes));
console.log(writes.length, "docs");
