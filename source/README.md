# مكتبة هوية الأجيال — الكود

مرجع فريق التصميم في أكاديمية هندسة الأجيال: الهوية الأم والبرامج والمشاريع والمنتجات، بشعاراتها وخطوطها وألوانها وتدرجاتها وضوابطها وبرومبت كل هوية.

الموقع المنشور: https://claude.ai/artifact/13QbyYCduMsp1NWf46wKSE

## الملفات

| الملف | الوظيفة |
|---|---|
| `brand-library.html` | كود صفحة الموقع. يقرأ البيانات من قاعدة بيانات الـ Artifact، ويعمل أيضًا في وضع مستقل إذا وُجد `window.OFFLINE`. |
| `offline/build.js` | يبني النسخة المستقلة «مكتبة هوية الأجيال.html» من البيانات المصدّرة في `offline/db` ومن ملفات `brand-assets`. |
| `offline/serve.js` | خادم محلي صغير لتجربة النسخة المستقلة على `http://localhost:5179`. |
| `brand-assets/build-db.js` | بيانات الأكاديمية وصانعة الأجيال 3 وفريق الاستشارات. |
| `brand-assets/thirty/build-db.js` | بيانات ثلاثون شهرًا. |
| `brand-assets/build-db-batch3.js` | بيانات قرة ورحيق الفطرة ودفعة الراقيات. |
| `brand-assets/add-gradients.js` | التدرجات اللونية للهويات الثلاث الأولى. |
| `brand-assets/build-db-fonts.js` | ربط خطوط Thmanyah Serif Display وIBM Plex بهوياتها. |
| `brand-assets/thirty/server.js` و `view.html` | أداة محلية لعرض أدلة PDF واستخراج الشعارات منها كصور PNG شفافة (pdf.js). |

## تحديث النسخة المستقلة

1. صدّر البيانات الحالية من الموقع إلى `offline/db/brands` (مجموعة `brands` ومجموعات `brands/<id>/files`).
2. ضع أي ملفات جديدة في مجلد الهوية داخل `brand-assets`، وأضف المجلد إلى `DIRS` في `offline/build.js` إن كانت هوية جديدة.
3. شغّل من المجلد الرئيسي:

```
node offline/build.js
```
