// Builds library database documents for the three identities into brand-assets/db/*.json
const fs = require("fs"), path = require("path");
const OUT = path.join(__dirname, "db"); fs.mkdirSync(OUT, { recursive: true });
let t = Date.parse("2026-11-17T10:00:00.000Z");
const ts = () => new Date(t += 1000).toISOString();
const now = "2026-11-17T12:00:00.000Z";
const writes = [];
const put = (collection, id, data) => { const p = path.join(OUT, `${collection.replace(/\//g, "_")}__${id}.json`); fs.writeFileSync(p, JSON.stringify(data, null, 1)); writes.push({ collection, id, file: path.relative(process.cwd(), p).replace(/\\/g, "/") }); };
const size = (dir, f) => fs.statSync(path.join(__dirname, dir, f)).size;
const ct = f => ({ svg: "image/svg+xml", otf: "font/otf", ttf: "font/ttf", png: "image/png", pdf: "application/pdf" })[f.split(".").pop()];
function files(brand, dir, list) {
  list.forEach(([id, file, assetId, category, title, variant, note], i) => put(`brands/${brand}/files`, id, {
    title, category, variant: variant || "", note: note || "", assetId, filename: file, ext: file.split(".").pop().toLowerCase(),
    contentType: ct(file), sizeBytes: size(dir, file), createdAt: ts() }));
}
const photoDont = ["إظهار الوجه بأي وضوح تام", "نقاب بفتحة واسعة — ضيقة جداً فقط", "أيادٍ مكشوفة — تُغطّى دائماً", "ملابس ضيقة أو ألوان براقة مبهرجة", "محتوى مختلط بين الجنسين", "صور Stock مصطنعة أو غريبة الطابع", "ثياب أطفال أكبر من سنّهم"];
const logoDont = ["تدوير الشعار بأي زاوية", "تمديد الشعار أو ضغط نسبه", "تغيير أي لون من ألوان الشعار", "إضافة ظل أو توهج أو Stroke للشعار", "وضع الشعار على خلفية مزدحمة مشابهة لألوانه", "تصغير الشعار عن 30px رقمياً / 20mm مطبوعاً"];
const imgPrompt = "وصف مرجعي لتوليد الصور أو البحث عنها:\nviewed from behind · no face visible · loose non-form-fitting clothing · hands covered · soft natural lighting · cool tones";
const sizes = "- المقاسات: 1080×1350 بوست طولي (Instagram · Facebook · كاروسيل) · 1200×1200 مربع (LinkedIn · Telegram · X · WhatsApp) · 1080×1920 ستوري وريلز · 1920×1080 (YouTube · غلاف فيديو · شرائح).\n- القاعدة الذهبية 2026: المنصات تفضّل المحتوى الرأسي، ابدأ بـ 1080×1350 (4:5).";
const social = "- شعار الجهة أعلى اليسار دائماً بحجم ثابت لا يُصغّر عن 30px.\n- هامش آمن 5% من كل جانب لا يوضع فيه محتوى أساسي.\n- الصورة لا تتجاوز 60% من مساحة التصميم.\n- الزخرفة والباترن بشفافية 5% إلى 10% فقط.\n- شريط سفلي كحلي بأيقونات التواصل وajacadd.com بحجم مقروء.";

/* ---------------- Academy (master) ---------------- */
put("brands", "master", {
  name: "أكاديمية هندسة الأجيال", nameEn: "", kind: "master", order: 0,
  summary: "أكاديمية نوعية تعنى بتوفير برامج علمية متكاملة لتلبية نداء الأنوثة والأمومة والأسرة على ضوء الكتاب والسنّة وخطى سلف الأمّة.\nالرؤية: أمهات رائدات يبنين جيلاً واعياً مصلحاً.\nالشعار اللفظي: «لأن الأم تصنع الأمة».",
  coverAsset: "2d50c00db451008d1a427d618cfbe42d", driveFolder: "",
  colors: [
    { hex: "#003375", name: "كحلي · Navy", role: "أساسي", cmyk: "100, 80, 0, 35", pantone: "" },
    { hex: "#F280AA", name: "وردي · Pink", role: "أساسي", cmyk: "0, 47, 30, 5", pantone: "" },
    { hex: "#38B5DA", name: "سيان · Cyan", role: "أساسي", cmyk: "74, 17, 0, 15", pantone: "" },
    { hex: "#FC739F", name: "وردي تنبيهات", role: "تنبيه", cmyk: "0, 54, 37, 1", pantone: "" },
    { hex: "#5BD7FB", name: "سيان تفاعلي", role: "مساعد", cmyk: "64, 14, 0, 2", pantone: "" },
    { hex: "#FFD3E4", name: "وردي فاتح", role: "مساعد", cmyk: "0, 22, 0, 0", pantone: "" },
    { hex: "#FDB5C8", name: "وردي نصوص ثانوية", role: "نصوص", cmyk: "0, 37, 5, 0", pantone: "" },
    { hex: "#FDF2E3", name: "كريمي خلفيات", role: "خلفية", cmyk: "0, 4, 10, 0", pantone: "" },
    { hex: "#F4F4F7", name: "رمادي خلفيات", role: "خلفية", cmyk: "3, 2, 1, 0", pantone: "" },
    { hex: "#6D6E71", name: "رمادي نصوص", role: "نصوص", cmyk: "4, 3, 0, 56", pantone: "" },
    { hex: "#B1B3B6", name: "رمادي فواصل", role: "مساعد", cmyk: "3, 2, 0, 29", pantone: "" }],
  fonts: [
    { name: "Alexandria", role: "العناوين", weights: "Medium 500 · ExtraBold 800 (من 9 أوزان)", usage: "الخط الرئيسي، مزاوج مع اللاتيني Montserrat. Bold للعناوين الرئيسية 28–120pt، وMedium للعناوين الفرعية 18–26pt.", driveUrl: "", google: true, assetId: "", filename: "", contentType: "" },
    { name: "Somar Sans", role: "النصوص", weights: "Light 300 · Regular 400 · Medium 500 · SemiBold 600 · Bold 700 · ExtraBold 800", usage: "الخط الثانوي للنصوص الطويلة والعناوين الفرعية. Medium للنصوص 12–22pt وللثانوية 8–12pt. كل الأوزان في «ملفات الخطوط».", driveUrl: "", google: false, assetId: "44659f855c27442067d6a6ba9024c4cb", filename: "SomarSans-Medium.otf", contentType: "font/otf" }],
  rules: {
    digital: "- الحد الأدنى للشعار 30px على الشاشات.\n- اترك حول الشعار مساحة آمنة خالية تماماً من العناصر والنصوص.\n" + social + "\n" + sizes + "\n- التدرجات المعتمدة: كحلي رئيسي #011A4A→#023373 · كحلي واسع #023373→#1A5FA3 · وردي #F280AA→#FDB5C8 · وردي داكن #F280AA→#FC739F · فاتح #38B5DA→#F2EFE2.\n- الأيقونات: أسلوب خطي، سمك موحد، أطراف دائرية؛ كحلي للرئيسية، وردي للتفاعلية، سيان للمساندة.",
    print: "- الحد الأدنى للشعار 20mm مطبوعاً.\n- الشعار الكحلي الكامل على الأبيض فقط، للمراسلات الرسمية والطباعة أحادية اللون.\n- اعتمد قيم CMYK المذكورة لكل لون.\n- التسلسل الطباعي: Alexandria Bold للعناوين الرئيسية 28–120pt (الأغلفة والبوسترات) · Alexandria Medium للعناوين الفرعية 18–26pt (الأقسام والدورات والمحاضرات) · Somar Medium للنصوص 12–22pt · Somar Medium للنصوص الثانوية 8–12pt.",
    dos: ["الشعار الملوّن على الخلفيات الفاتحة (الحالة الأولى)", "الشعار الأبيض على الخلفيات الداكنة حصراً: الكحلي والسيان والوردي", "على الصور والخلفيات المعقدة يوضع الشعار داخل مربع كحلي", "الكحلي للعناوين الرئيسية والعناصر المحورية والخلفيات القوية", "الوردي للعناوين الفرعية والعناصر التفاعلية ولمسة الدفء", "السيان للعناصر المساندة والأيقونات، ودرجاته الفاتحة للخلفيات الهادئة", "الباترن بشفافية 5% إلى 10% فقط", "الصور: زوايا خلفية كاملة أو جانبية غير مباشرة", "الصور: اليدان مغطاتان وتحملان كتاباً، في بيئة طبيعية أو منزلية بظلال جميلة", "عناصر الصور: وردة، كتاب، بيت، شمعة", "ألوان الملابس في الصور (تقليل الأسود): #003375، #1D4430، #4A2259، #2E3F54، #3D2B1F"].join("\n"),
    donts: logoDont.concat(photoDont).join("\n"),
    voice: "الخطاب موجّه للمرأة المسلمة والأم بصيغة المؤنث.\nالشعار اللفظي: «لأن الأم تصنع الأمة».\nالرسالة: تأهيل المرأة المسلمة للقيام بدورها الرسالي كأمّ، وتمكينها من العلوم المؤهلة لصناعة الأجيال، بإشراف متخصصين، من خلال برامج ومبادرات علمية وتربوية.\nالموقع: ajacadd.com" },
  prompt: imgPrompt, createdAt: "2026-11-17T00:00:00.000Z", updatedAt: now });
files("master", "academy", [
  ["fa01", "logo-primary.svg", "2d50c00db451008d1a427d618cfbe42d", "logo", "الشعار الأساسي", "ملوّن · للخلفيات الفاتحة (الحالة الأولى)"],
  ["fa02", "logo-with-slogan.svg", "c4a04a62bee0056710d8e037bc0cef72", "logo", "الشعار مع السلوجان", "لأن الأم تصنع الأمة"],
  ["fa03", "logo-white.svg", "a20dee2efa90eb3ec644af27ee4d7049", "logo", "الشعار الأبيض", "للخلفيات الداكنة فقط"],
  ["fa04", "stamp.svg", "2ed9b82db8705ca9f43433be84ece027", "logo", "الختم", "Stamp"],
  ["fa05", "favicon.svg", "60413dc35a97d966e9c761784fc863ee", "logo", "الأيقونة · Favicon", "أيقونة المواقع والتطبيقات"],
  ["fa06", "el-pattern.svg", "cae5058e3b3d27bbd0f4c247110d028f", "element", "الباترن", "خطوط فاتحة · تُعرض على الكحلي", "بشفافية 5% إلى 10% فقط لئلا يطغى على المحتوى"],
  ["fa07", "el-ornament.svg", "87e797396a381563ef504b490663c332", "element", "الزخرفة", "SVG"],
  ["fa08", "el-ha-glyph.svg", "9b6b9c97f2c0cd5d2cf23868299f293e", "element", "حرف الهاء", "عنصر جرافيكي"],
  ["fa09", "el-seen-glyph.svg", "af38e1007581a7b0e45f020a92560949", "element", "حرف السين", "عنصر جرافيكي"],
  ["fa10", "el-squares.svg", "4ccdda2a02a45b4da65844c67f2dfa68", "element", "المربعات", "عنصر جرافيكي"],
  ["fa11", "el-slogan.svg", "5a7f72f472b16650c3625e9aadc633af", "element", "السلوجان", "«لأن الأم تصنع الأمة» · فاتح للخلفيات الداكنة"],
  ...[["Light", 300, "3deea33c4641b370714b9a2a1b7df593"], ["Regular", 400, "c7f9821699ef3b466eb4bfeef79e1d36"], ["Medium", 500, "44659f855c27442067d6a6ba9024c4cb"], ["SemiBold", 600, "0862cfa70cbe1d8460a9e5d90b6976d8"], ["Bold", 700, "725445088e42b1790a8d77621b0ce7e0"], ["ExtraBold", 800, "e7dd7a7e9a39872f9584737a274b23ec"]]
    .map(([w, n, id], i) => [`fa${12 + i}`, `SomarSans-${w}.otf`, id, "font", `Somar Sans ${w}`, `الوزن ${n}`])]);

/* ---------------- صانعة الأجيال 3 ---------------- */
put("brands", "psanea3", {
  name: "صانعة الأجيال 3", nameEn: "Sanat Al-Ajyal 3", kind: "program", order: 1,
  summary: "النسخة الثالثة من دورة صانعة الأجيال. هوية تجمع الوقار الأكاديمي (الكحلي العميق) والدفء الأنثوي (الوردي الناعم) والانفتاح والحداثة (السيان)، بطابع أكاديمي وشرعي هادئ.",
  coverAsset: "f5b0e4b9441becfc61d781cb74bd665b", driveFolder: "",
  colors: [
    { hex: "#223970", name: "الكحلي العميق", role: "أساسي", cmyk: "100, 88, 28, 14", pantone: "" },
    { hex: "#F386AE", name: "الوردي الناعم", role: "أساسي", cmyk: "0, 60, 5, 0", pantone: "" },
    { hex: "#FDB5C8", name: "وردي فاتح", role: "مساعد", cmyk: "0, 37, 5, 0", pantone: "" },
    { hex: "#FC739F", name: "عناصر تفاعلية", role: "مساعد", cmyk: "0, 54, 37, 1", pantone: "" },
    { hex: "#5BD7FB", name: "تنبيهات", role: "تنبيه", cmyk: "64, 14, 0, 2", pantone: "" },
    { hex: "#FFD3E4", name: "وردي فاتح جداً", role: "مساعد", cmyk: "0, 22, 0, 0", pantone: "" },
    { hex: "#F4F4F7", name: "خلفيات", role: "خلفية", cmyk: "3, 2, 1, 0", pantone: "" },
    { hex: "#FDF2E3", name: "خلفيات مساعدة", role: "خلفية", cmyk: "0, 4, 10, 0", pantone: "" },
    { hex: "#6D6E71", name: "نصوص ثانوية", role: "نصوص", cmyk: "4, 3, 0, 56", pantone: "" },
    { hex: "#B1B3B6", name: "فواصل خفية", role: "مساعد", cmyk: "3, 2, 0, 29", pantone: "" }],
  fonts: [
    { name: "Thmanyah Sans", role: "العناوين", weights: "Light 300 · Regular 400 · Medium 500 · Bold 700 · Black 900", usage: "الخط الرئيسي (إصدار ثمانية): Bold للعناوين الرئيسية 28–120pt، وMedium للعناوين الفرعية 18–26pt. كل الأوزان في «ملفات الخطوط».", driveUrl: "", google: false, assetId: "802655375ffeb8bc6f308938d51a1910", filename: "thmanyahsans-Bold.otf", contentType: "font/otf" },
    { name: "Alexandria", role: "النصوص", weights: "Regular 400 · Medium 500 · SemiBold 600 · Bold 700", usage: "الخط الثانوي: Regular للنصوص الطويلة 12–22pt، وللنصوص الثانوية 8–12pt.", driveUrl: "", google: true, assetId: "beb69e1e0ce12579331aa8fe38d8741a", filename: "Alexandria-Regular.ttf", contentType: "font/ttf" }],
  rules: {
    digital: "- الحد الأدنى للشعار 30px على الشاشات.\n- المساحة الآمنة: وحدة القياس x = عرض الرمز الدائري، تُترك خالية تماماً من الجهات الأربع.\n" + social + "\n" + sizes + "\n- التدرجات: كحلي رئيسي #011A4A→#023373 (خلفيات رئيسية) · كحلي واسع #1A5FA3→#023373 (خلفيات شرائح) · وردي #F280AA→#FDB5C8 (لمسات أنثوية) · وردي داكن #F280AA→#FC739F (CTA وإعلانات) · فاتح #38B5DA→#F2EFE2 (خلفيات بطاقات).\n- الصورة الرئيسية للحملة 1672×941px (16:9): مساحة سماوية هادئة على اليمين مخصصة للشعار والعناوين.",
    print: "- الحد الأدنى للشعار 20mm في المطبوعات.\n- الكحلي الكامل على الأبيض فقط، في المراسلات الرسمية والطباعة أحادية اللون.\n- الختم للشهادات والمطبوعات.\n- اعتمد قيم CMYK المذكورة لكل لون.\n- التسلسل: Thmanyah Sans Bold 28–120pt للعناوين الرئيسية (أغلفة وبوسترات وبانرات) · Thmanyah Sans Medium 18–26pt للعناوين الفرعية (الأقسام والدورات والمستويات) · Alexandria Regular 12–22pt للنصوص · Alexandria 8–12pt للنصوص الثانوية.",
    dos: ["الملوّن الكامل على الخلفيات الفاتحة (الأبيض، الكريمي، الرمادي الفاتح) — الحالة الافتراضية", "الأبيض الكامل على الخلفيات الداكنة حصراً: الكحلي، السيان الداكن، الوردي الداكن", "الشعار داخل مربع كحلي على الصور والخلفيات المعقدة", "الكحلي للعناوين الرئيسية والنصوص البارزة والخلفيات ذات الحضور القوي", "الوردي لإبراز الرسائل والكلمات المفتاحية والعناصر التفاعلية بنسب مدروسة", "ألوان متناسقة وهادئة تعكس الطابع الأكاديمي والشرعي", "البساطة والوضوح والاتزان البصري، وإبراز المحتوى قبل الزخرفة", "الصور: زوايا خلفية كاملة أو جانبية غير مباشرة، اليدان مغطّاتان تحملان كتاباً، بيئة طبيعية أو منزلية", "الصور: درجات باردة هادئة بلا تشبّع مبالغ فيه، وعناصر رمزية (وردة، كتاب، بيت، شمعة)", "ألوان الملابس (تقليل الأسود): #023373، #1B4332، #4A235A، #2C3E50، #3D2B1F"].join("\n"),
    donts: logoDont.concat(["الألوان الزاهية والمبهرة في الخلفيات والنصوص"], photoDont).join("\n"),
    voice: "الخطاب للمرأة المسلمة بصيغة المؤنث، بطابع دعوي وتربوي.\nيجب أن يشعر المتلقي أن التصميم تابع للأكاديمية.\nالموقع: ajacadd.com" },
  prompt: imgPrompt + "\n\nمتغيرات CSS المعتمدة: --color-navy: #223970; --color-pink: #F386AE; --font-heading: 'Thmanyah Sans'; --font-body: 'Alexandria'.",
  createdAt: now, updatedAt: now });
files("psanea3", "sanea3", [
  ["fs01", "logo-primary.svg", "f5b0e4b9441becfc61d781cb74bd665b", "logo", "الشعار الأساسي", "رأسي مع الشعار اللفظي · ملوّن"],
  ["fs02", "logo-primary-notag.svg", "d8933f3d1ee4884f0ec01ae0f55e98f6", "logo", "الأساسي بدون شعار لفظي", "رأسي مختصر · ملوّن"],
  ["fs03", "logo-wide.svg", "b38c8297613d702444cc435a3f1405a9", "logo", "الشعار العريض", "أفقي مع الشعار اللفظي · ملوّن"],
  ["fs04", "logo-wide-notag.svg", "62ac046e6a8cc081eb1ab85b8aacc583", "logo", "العريض بدون شعار لفظي", "أفقي مختصر · ملوّن"],
  ["fs05", "logo-primary-white.svg", "30b11b18e5f8f1a8a09745f53e498382", "logo", "الشعار الأساسي — أبيض", "للخلفيات الداكنة حصراً"],
  ["fs06", "logo-wide-white.svg", "d1c3b176ac7bc27595d87f789820eb15", "logo", "الشعار العريض — أبيض", "للخلفيات الداكنة حصراً"],
  ["fs07", "logo-favicon.svg", "6b4977228f6eda3c13071b87f6b50244", "logo", "الرمز · Favicon", "أيقونة التطبيقات والمواقع"],
  ["fs08", "logo-stamp.svg", "8e273aa01de59cd9535ac7df7560bd16", "logo", "الختم", "للشهادات والمطبوعات"],
  ["fs09", "key-visual.png", "8b27894677da127521721956216e1336", "image", "الصورة الرئيسية للحملة", "1672 × 941 px · 16:9", "مساحة سماوية هادئة على اليمين للشعار والعناوين"],
  ["fs10", "sanat-alajyal-3_brand-guide.pdf", "0b6397458ea6f5ede088557dcc733da9", "guide", "دليل الهوية البصرية — صانعة الأجيال 3", "PDF"],
  ...[["Light", 300, "347f0f0f7c113dca1ef1b1243f6bb958"], ["Regular", 400, "afed8a39132290d5bb4add912712d929"], ["Medium", 500, "2e5ceba7f6261389f81f2196db6449c7"], ["Bold", 700, "802655375ffeb8bc6f308938d51a1910"], ["Black", 900, "8bb5d787be5e879b6c5ae6a0b064bd3b"]]
    .map(([w, n, id], i) => [`fs${11 + i}`, `thmanyahsans-${w}.otf`, id, "font", `Thmanyah Sans ${w}`, `الوزن ${n} · الخط الرئيسي`]),
  ...[["Regular", 400, "beb69e1e0ce12579331aa8fe38d8741a"], ["Medium", 500, "c377ea55249b21dd12f8f37c8a674d6f"], ["SemiBold", 600, "24da50867dcc9217c276c568f65101b8"], ["Bold", 700, "e72399e7e124a7b7a8919e9efe85e148"]]
    .map(([w, n, id], i) => [`fs${16 + i}`, `Alexandria-${w}.ttf`, id, "font", `Alexandria ${w}`, `الوزن ${n} · الخط الثانوي`])]);

/* ---------------- فريق استشارات هندسة الأجيال ---------------- */
put("brands", "pconsult", {
  name: "فريق استشارات هندسة الأجيال", nameEn: "", kind: "program", order: 2,
  summary: "فريق الاستشارات الأسرية والتربوية في الأكاديمية. الشعار سقف بيت كحلي تتحاور تحته فقاعتان متشابكتان: الإصغاء (الكحلية) والإجابة (الوردية)، تعبيراً عن استشارة قائمة على الإصغاء والحوار. يرافقه الاسم: «فريق استشارات» بالوردي و«هندسة الأجيال» بالكحلي الأثقل وزناً.",
  coverAsset: "71d3d7aceaddf657c3ce9d345dfac83a", driveFolder: "",
  colors: [
    { hex: "#13355A", name: "الكحلي · Generations Navy", role: "أساسي", cmyk: "", pantone: "" },
    { hex: "#F27292", name: "الوردي · Dialogue Pink", role: "أساسي", cmyk: "", pantone: "" },
    { hex: "#1E4A7A", name: "كحلي متوسط", role: "مساعد", cmyk: "", pantone: "" },
    { hex: "#C94E70", name: "وردي داكن (CTA)", role: "مساعد", cmyk: "", pantone: "" },
    { hex: "#5BD7FB", name: "سماوي", role: "تنبيه", cmyk: "", pantone: "" },
    { hex: "#FDECF1", name: "وردي فاتح (خلفيات البطاقات)", role: "خلفية", cmyk: "", pantone: "" },
    { hex: "#FDF2E3", name: "كريمي", role: "خلفية", cmyk: "", pantone: "" },
    { hex: "#F4F4F7", name: "رمادي فاتح", role: "خلفية", cmyk: "", pantone: "" },
    { hex: "#6D6E71", name: "رمادي داكن", role: "نصوص", cmyk: "", pantone: "" },
    { hex: "#B1B3B6", name: "رمادي فواصل", role: "مساعد", cmyk: "", pantone: "" }],
  fonts: [
    { name: "Alexandria", role: "العناوين", weights: "Light 300 · Regular 400 · Medium 500 · SemiBold 600 · Bold 700 · ExtraBold 800", usage: "الخط الرئيسي: ExtraBold للعناوين الرئيسية 28–120pt، وSemiBold للعناوين الفرعية 18–26pt.", driveUrl: "", google: true, assetId: "", filename: "", contentType: "" },
    { name: "Somar Sans", role: "النصوص", weights: "Light 300 · Regular 400 · Medium 500 · SemiBold 600 · Bold 700 · ExtraBold 800", usage: "الخط الثانوي: Regular للنصوص الطويلة 12–22pt، وLight للنصوص الثانوية 8–12pt. لا يُستخدم أي خط آخر في مواد الهوية.", driveUrl: "", google: false, assetId: "eb561263d5706f8beda275e78b814190", filename: "SomarSans-Regular.otf", contentType: "font/otf" }],
  rules: {
    digital: "- الحد الأدنى للشعار 30px على الشاشات، والـ Favicon من 16 إلى 32px (الرمز فقط).\n- المساحة الآمنة x = نصف ارتفاع الرمز (البيت) على الجهات الأربع، وتُضاعف إلى 2x بجوار شعارات الشركاء.\n- الصيغ: الرأسي هو الأساسي، والعريض للترويسات والبانرات والتواقيع، والرمز وحده للأيقونات وصور الحسابات والـ Favicon.\n" + social + "\n" + sizes + "\n- نسب استخدام الألوان: كحلي 60% · محايد 25% · وردي 10% · سماوي 5%.\n- درجات الكحلي: 950 #081627 · 900 #0B1F36 · 800 #0F2A48 · 700 #13355A ★ · 600 #1E4A7A · 300 #8FA9C7 · 100 #E3EAF2.\n- درجات الوردي: 700 #C94E70 · 600 #E2607F · 500 #F27292 ★ · 400 #F693AC · 300 #F9B5C6 · 200 #FCD3DD · 100 #FDECF1.\n- التدرجات: الكحلي العميق #0B1F36→#13355A (الأغلفة) · الكحلي الواسع #13355A→#2F6299 (الشرائح) · الوردي #F27292→#F9B5C6 (البطاقات) · الوردي الداكن #C94E70→#F27292 (CTA) · الحواري #13355A→#F27292 (البانرات) · الفاتح #FDECF1→#F4F4F7 (خلفيات البطاقات).",
    print: "- الحد الأدنى لعرض الشعار 20mm في المطبوعات.\n- الكحلي الكامل على الأبيض فقط، للمراسلات الرسمية والطباعة أحادية اللون.\n- قيم CMYK هنا محسوبة تقريبياً من HEX؛ اعتمد قيمة المطبعة عند توفرها.\n- التسلسل: Alexandria ExtraBold 28–120pt للعناوين الرئيسية · Alexandria SemiBold 18–26pt لعناوين الأقسام والبرامج والجلسات · Somar Sans Regular 12–22pt للنصوص · Somar Sans Light 8–12pt للحواشي والتواريخ ومعلومات التواصل.",
    dos: ["الملوّن الكامل على الخلفيات الفاتحة: الأبيض، الكريمي، الرمادي الفاتح — الحالة الافتراضية", "المعكوس أو الأبيض على الخلفيات الداكنة حصراً: الكحلي، الوردي الداكن", "الشعار داخل مربع كحلي على الصور والخلفيات المعقدة", "الكحلي أساس بصري للعناوين والخلفيات القوية، والوردي لتوجيه الانتباه والكلمات المفتاحية", "البساطة والوضوح والاتزان البصري، وإبراز المحتوى قبل الزخرفة", "الالتزام بالمساحات البيضاء، وأيقونات بنفس الأسلوب البصري", "صور محتشمة تعبّر عن الأسرة والتربية والحوار بإضاءة طبيعية ودرجات باردة", "الصور: زوايا خلفية كاملة أو جانبية غير مباشرة، اليدان مغطّاتان تحملان كتاباً، بيئة طبيعية أو منزلية", "ألوان الملابس: درجات داكنة هادئة مع تقليل الأسود — #3B2A24، #3A3D44، #4A5A70، #4B3558، #2F4A3A، #1F2E4A"].join("\n"),
    donts: logoDont.concat(photoDont.map(x => x.replace("غريبة الطابع", "غربية الطابع"))).join("\n"),
    voice: "يجب أن يشعر المتلقي أن التصميم تابع لهندسة الأجيال قبل أن يقرأ الاسم.\nالطابع تربوي واستشاري دافئ، والخطاب بصيغة المؤنث.\nعبارة مرجعية: «نُصغي لنفهم، ونحاور لنبني أجيالًا واعية».\nالموقع: ajacadd.com" },
  prompt: imgPrompt, createdAt: now, updatedAt: now });
const V = [["stacked-color", "الرأسي — ملوّن", "الصيغة الأساسية للخلفيات الفاتحة", "71d3d7aceaddf657c3ce9d345dfac83a"], ["stacked-reversed", "الرأسي — معكوس", "للخلفيات الكحلية والداكنة", "db63de404b104011061bde6390490572"], ["stacked-white", "الرأسي — أبيض", "أحادي اللون على الصور والألوان الداكنة", "20b6a1680abb229e19595be4aa074f52"], ["stacked-navy", "الرأسي — كحلي", "للمراسلات الرسمية والطباعة أحادية اللون", "7f418732afcd50933278ec12859a33ea"],
  ["wide-color", "العريض — ملوّن", "للترويسات والبانرات والتواقيع", "7788addcd3790415bfdb8dcce0dfe8a4"], ["wide-reversed", "العريض — معكوس", "للترويسات على الخلفيات الداكنة", "5096f313584362f3eb3d05beb3287f40"], ["wide-white", "العريض — أبيض", "أحادي اللون على الخلفيات الداكنة", "f54269a8aedbf4f29107c7fb4d828615"], ["wide-navy", "العريض — كحلي", "للطباعة أحادية اللون", "2e4cf76ed2cd15ddd51427e33293e8c0"],
  ["icon-color", "الرمز — ملوّن", "للأيقونات وصور الحسابات", "61f6a992cfb086a8e4997cf150d599da"], ["icon-reversed", "الرمز — معكوس", "للأيقونات على الكحلي", "ca3f8edbe202b3bd796c81135feaeff5"], ["icon-white", "الرمز — أبيض", "أحادي اللون على الخلفيات الداكنة", "094989828a8dbc6f84b262b61f8bed05"], ["icon-navy", "الرمز — كحلي", "أحادي اللون للطباعة", "92a8a20e4fec8ffdea21342695719aad"],
  ["favicon-light", "Favicon — فاتح", "أيقونة التبويب والتطبيق", "2a7af787aad60a87ef2c181bfc0743a8"], ["favicon-navy", "Favicon — كحلي", "أيقونة التطبيق على الخلفيات الفاتحة", "bcdae2aa22124f15e7bb466959a4a002"]];
files("pconsult", "consult", [
  ...V.map(([k, title, v, id], i) => [`fc${String(i + 1).padStart(2, "0")}`, `consult-${k}.svg`, id, "logo", title, v]),
  ...[["Light", 300, "1e04ab8c21920b588c25c63512e50730"], ["Regular", 400, "eb561263d5706f8beda275e78b814190"], ["Medium", 500, "13e13b8e9d97f841cb2359a54394824d"], ["SemiBold", 600, "1fd31585fe535149118a15b9820301a3"], ["Bold", 700, "92543eacee19b4d42c725350e10c4fc1"], ["ExtraBold", 800, "eb08f10700746daae39e396470280ff0"]]
    .map(([w, n, id], i) => [`fc${15 + i}`, `SomarSans-${w}.otf`, id, "font", `Somar Sans ${w}`, `الوزن ${n}`])]);

fs.writeFileSync(path.join(OUT, "_writes.json"), JSON.stringify(writes.map(w => ({ op: "set", collection: w.collection, doc_id: w.id, file_path: w.file }))));
console.log(writes.length, "docs");
