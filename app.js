/* مُعلّمي — تطبيق مستقل (PWA) — الإصدار 2 */
const html = htm.bind(React.createElement);
const h = React.createElement;
const { useState, useEffect, useRef } = React;

const C = {
  green:"#0E7C66", greenLt:"#2E9D7F", leaf:"#5BAA4E",
  gold:"#E0A92E", amber:"#F0B429", yellow:"#F4C430",
  blue:"#2E86C1", blueLt:"#3DA5E0", blueDp:"#1F6FA8",
  cream:"#FAF7F0", card:"#FFFFFF", ink:"#16302A", sub:"#62756E",
  line:"#ECE7DB", danger:"#D9534F", bg2:"#F2EEE3",
};

const ICONSET = {
  home:[["path",{d:"M3 11l9-7 9 7"}],["path",{d:"M5 10v10h14V10"}]],
  book:[["path",{d:"M12 6c-2-1.4-5-1.4-7 0v12c2-1.4 5-1.4 7 0"}],["path",{d:"M12 6c2-1.4 5-1.4 7 0v12c-2-1.4-5-1.4-7 0"}],["path",{d:"M12 6v12"}]],
  users:[["circle",{cx:9,cy:8,r:3}],["path",{d:"M3 20c0-3 3-5 6-5s6 2 6 5"}],["path",{d:"M16 5.5a3 3 0 0 1 0 5.5"}],["path",{d:"M21 20c0-2.2-1.5-4-4-4.5"}]],
  user:[["circle",{cx:12,cy:8,r:4}],["path",{d:"M4 21c0-4 4-6 8-6s8 2 8 6"}]],
  bulb:[["path",{d:"M9 18h6"}],["path",{d:"M10 21h4"}],["path",{d:"M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z"}]],
  chevL:[["path",{d:"M15 18l-6-6 6-6"}]],
  chevR:[["path",{d:"M9 18l6-6-6-6"}]],
  chevD:[["path",{d:"M6 9l6 6 6-6"}]],
  chevU:[["path",{d:"M18 15l-6-6-6 6"}]],
  plus:[["path",{d:"M12 5v14"}],["path",{d:"M5 12h14"}]],
  check:[["path",{d:"M20 6L9 17l-5-5"}]],
  circle:[["circle",{cx:12,cy:12,r:9}]],
  checkc:[["circle",{cx:12,cy:12,r:9}],["path",{d:"M8.5 12.5l2.5 2.5 4.5-5"}]],
  x:[["path",{d:"M6 6l12 12"}],["path",{d:"M18 6L6 18"}]],
  edit:[["path",{d:"M12 20h9"}],["path",{d:"M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"}]],
  trash:[["path",{d:"M3 6h18"}],["path",{d:"M8 6V4h8v2"}],["path",{d:"M6 6l1 14h10l1-14"}]],
  bell:[["path",{d:"M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"}],["path",{d:"M13.7 21a2 2 0 0 1-3.4 0"}]],
  search:[["circle",{cx:11,cy:11,r:7}],["path",{d:"M21 21l-4-4"}]],
  send:[["path",{d:"M22 2L11 13"}],["path",{d:"M22 2l-7 20-4-9-9-4z"}]],
  spark:[["path",{d:"M12 3l1.8 4.7L18.5 9l-4.7 1.3L12 15l-1.8-4.7L5.5 9l4.7-1.3z"}],["path",{d:"M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z"}]],
  cal:[["rect",{x:3,y:4,width:18,height:18,rx:3}],["path",{d:"M3 10h18"}],["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}]],
  cam:[["path",{d:"M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l2-3h8l2 3h3a2 2 0 0 1 2 2z"}],["circle",{cx:12,cy:13,r:4}]],
  target:[["circle",{cx:12,cy:12,r:9}],["circle",{cx:12,cy:12,r:5}],["circle",{cx:12,cy:12,r:1.5}]],
  award:[["circle",{cx:12,cy:8,r:6}],["path",{d:"M9 13l-2 8 5-3 5 3-2-8"}]],
  play:[["circle",{cx:12,cy:12,r:9}],["path",{d:"M10 8.5l6 3.5-6 3.5z"}]],
  pulse:[["path",{d:"M3 12h4l2-6 4 12 2-6h6"}]],
  bot:[["rect",{x:4,y:8,width:16,height:12,rx:3}],["path",{d:"M12 8V5"}],["circle",{cx:12,cy:4,r:1.2}],["path",{d:"M9 13.5h.01"}],["path",{d:"M15 13.5h.01"}],["path",{d:"M2 14h2"}],["path",{d:"M20 14h2"}]],
  list:[["path",{d:"M9 6h11"}],["path",{d:"M9 12h11"}],["path",{d:"M9 18h11"}],["path",{d:"M4 6l1 1 2-2"}],["path",{d:"M4 12l1 1 2-2"}],["path",{d:"M4 18l1 1 2-2"}]],
  map:[["path",{d:"M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z"}],["circle",{cx:12,cy:10,r:2.2}]],
  cap:[["path",{d:"M22 10L12 5 2 10l10 5 10-5z"}],["path",{d:"M6 12v5c0 1 3 3 6 3s6-2 6-3v-5"}]],
  link:[["path",{d:"M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5"}],["path",{d:"M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5"}]],
  palette:[["circle",{cx:12,cy:12,r:9}],["circle",{cx:8,cy:10,r:1}],["circle",{cx:12,cy:8,r:1}],["circle",{cx:16,cy:10,r:1}],["path",{d:"M12 21a3 3 0 0 1 0-6h1a2 2 0 0 0 2-2 4 4 0 0 1 4-4"}]],
  msg:[["path",{d:"M21 15a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z"}]],
  clock:[["circle",{cx:12,cy:12,r:9}],["path",{d:"M12 7v5l3 2"}]],
  cloud:[["path",{d:"M18 16a4 4 0 0 0-1-7.9A6 6 0 0 0 6 9a4 4 0 0 0-1 7"}],["path",{d:"M12 12v8"}],["path",{d:"M9 17l3 3 3-3"}]],
  cloudUp:[["path",{d:"M18 16a4 4 0 0 0-1-7.9A6 6 0 0 0 6 9a4 4 0 0 0-1 7"}],["path",{d:"M12 20v-8"}],["path",{d:"M9 15l3-3 3 3"}]],
  loader:[["path",{d:"M12 3a9 9 0 1 0 9 9"}]],
  expand:[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3"}]],
  share:[["circle",{cx:18,cy:5,r:3}],["circle",{cx:6,cy:12,r:3}],["circle",{cx:18,cy:19,r:3}],["path",{d:"M8.6 13.5l6.8 4"}],["path",{d:"M15.4 6.5l-6.8 4"}]],
  note:[["path",{d:"M4 4h16v12l-4 4H4z"}],["path",{d:"M16 20v-4h4"}],["path",{d:"M8 9h8"}],["path",{d:"M8 13h5"}]],
  team:[["circle",{cx:12,cy:7,r:3}],["path",{d:"M6 21c0-3 3-5 6-5s6 2 6 5"}],["circle",{cx:5,cy:9,r:2}],["circle",{cx:19,cy:9,r:2}]],
  gear:[["circle",{cx:12,cy:12,r:3.2}],["path",{d:"M12 3v3"}],["path",{d:"M12 18v3"}],["path",{d:"M3 12h3"}],["path",{d:"M18 12h3"}],["path",{d:"M5.5 5.5l2 2"}],["path",{d:"M16.5 16.5l2 2"}],["path",{d:"M18.5 5.5l-2 2"}],["path",{d:"M7.5 16.5l-2 2"}]],
};
function Icon({ n, s=20, c="currentColor", fill }){
  const arr = ICONSET[n]; if(!arr) return null;
  const kids = arr.map((it,i)=>h(it[0], Object.assign({key:i}, it[1])));
  return h("svg",{width:s,height:s,viewBox:"0 0 24 24",fill:fill||"none",stroke:c,strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"}, kids);
}

function rid(){ return Math.random().toString(36).slice(2,9); }
function L(t,p){ return { id:rid(), title:t, prepared:!!p, content:"", summary:"", dev:null }; }
const SUBJECT_SEED = [
  { id:"quran", name:"القرآن الكريم", emoji:"📖", color:C.green,
    objectives:["إتقان التلاوة وأحكام التجويد المبسّطة","حفظ المقرر مع الفهم لا التلقين","ربط الطفل بحبّ كتاب الله"],
    lessons:[L("آداب تلاوة القرآن",1),L("سورة الفاتحة: المعاني والوقفات",1),L("أحكام النون الساكنة (مبسّط)",0),L("مراجعة وتسميع جماعي",0)] },
  { id:"tafsir", name:"التفسير", emoji:"📘", color:C.greenLt,
    objectives:["فهم معاني السور القصيرة","استخراج الدروس والعِبر","تطبيق الآية في حياة الطفل"],
    lessons:[L("تفسير سورة الإخلاص",1),L("تفسير المعوّذتين",0),L("قصص في القرآن للأطفال",0)] },
  { id:"hadith", name:"الحديث الشريف", emoji:"📜", color:C.blue,
    objectives:["حفظ أحاديث مختارة مناسبة للسن","فهم معنى الحديث وتطبيقه","التعرّف على هدي النبي ﷺ"],
    lessons:[L("حديث: إنما الأعمال بالنيات",1),L("حديث: الرفق",1),L("حديث: المسلم من سلم الناس",0),L("أحاديث الأخلاق",0)] },
  { id:"fiqh", name:"الفقه", emoji:"⚖️", color:C.blueLt,
    objectives:["تعلّم الطهارة والوضوء عمليًا","إتقان أركان الصلاة","ربط الأحكام بالعبادة بحب"],
    lessons:[L("الطهارة وأنواع المياه",1),L("صفة الوضوء عمليًا",0),L("أركان الصلاة",0)] },
  { id:"aqeedah", name:"العقيدة", emoji:"⭐", color:C.blueDp,
    objectives:["ترسيخ توحيد الله بأسلوب محبّب","التعرّف على أركان الإيمان","بناء تصوّر سليم عن الله ورسوله"],
    lessons:[L("من هو ربّي؟",1),L("أركان الإيمان الستة",0),L("حبّ الله وحبّ رسوله",0)] },
  { id:"tazkiah", name:"التزكية", emoji:"💚", color:C.gold,
    objectives:["تهذيب النفس بالقيم الإيمانية","غرس الإخلاص والصدق","التعوّد على الأذكار"],
    lessons:[L("الصدق طريق الجنة",1),L("أذكار الصباح والمساء",0)] },
  { id:"seerah", name:"السيرة النبوية", emoji:"🕌", color:C.amber,
    objectives:["معرفة سيرة النبي ﷺ بأسلوب قصصي","استخلاص القدوة من حياته","محبّة آل البيت والصحابة"],
    lessons:[L("مولد النبي ﷺ ونشأته",1),L("بداية الوحي",0),L("أخلاق النبي ﷺ",0)] },
  { id:"qasas", name:"القصص", emoji:"📚", color:C.leaf,
    objectives:["تعليم القيم من خلال القصة","تنمية الخيال والاستماع","ربط القصة بسلوك الطفل"],
    lessons:[L("قصة سيدنا يوسف للأطفال",1),L("أصحاب الفيل",0)] },
  { id:"lugha", name:"اللغة العربية", emoji:"🔤", color:C.greenLt,
    objectives:["إتقان الحروف والقراءة","إثراء الحصيلة اللغوية","التعبير الشفهي السليم"],
    lessons:[L("الحروف ومخارجها",0),L("تكوين الكلمات",0)] },
  { id:"akhlaq", name:"الآداب والأخلاق", emoji:"🤝", color:C.blue,
    objectives:["غرس الآداب اليومية","احترام الكبير والرفق بالصغير","آداب الطعام والسلام"],
    lessons:[L("آداب السلام",1),L("برّ الوالدين",0)] },
];
const SUBJ_EMOJIS=["📖","📘","📜","⚖️","⭐","💚","🕌","📚","🔤","🤝","🌙","✨","🕋","📝","🧠","🌿"];
const SUBJ_COLORS=[C.green,C.greenLt,C.blue,C.blueLt,C.blueDp,C.gold,C.amber,C.leaf];
const METRICS = [
  { key:"comprehension", label:"الاستيعاب", color:C.green, hint:"فهم الدرس واستيعاب الفكرة" },
  { key:"response", label:"الاستجابة", color:C.blue, hint:"تجاوب الطفل مع الأسئلة والأنشطة" },
  { key:"participation", label:"المشاركة", color:C.greenLt, hint:"مبادرة الطفل بالمشاركة" },
  { key:"discipline", label:"الانضباط", color:C.gold, hint:"الالتزام بآداب الحلقة والهدوء" },
  { key:"memorization", label:"الحفظ", color:C.amber, hint:"إتقان الحفظ والتسميع" },
];

const RES_CATS=[
  { id:"modern", name:"طرق التدريس الحديثة", emoji:"🚀", color:C.green, items:[
    {t:"التعلّم باللعب",b:"اللعب أداة تعلّم قوية للأعمار 6–13. ادمج كل درس بنشاط حركي: تمثيل صفة الوضوء، بطاقات أركان الإيمان، سباق ترتيب خطوات الصلاة. الطفل يتذكّر ما فعله أضعاف ما سمعه."},
    {t:"رواية القصة لترسيخ القيم",b:"حوّل كل قيمة (الصدق، الرفق، الأمانة) إلى قصة لها بطل ومشكلة وحل. اطلب نهاية بديلة من الأطفال فهذا يثبّت القيمة ويطوّر تفكيرهم."},
    {t:"الخرائط الذهنية",b:"ارسم الفكرة في المنتصف وتتفرّع منها العناصر بألوان مختلفة. الدماغ يحفظ الصورة الملوّنة أسرع من النص، وهي ممتازة لمراجعة درس عقيدة أو سيرة."},
    {t:"التعلّم بالأقران",b:"اجعل طفلًا يشرح لزميله ما فهمه. التعليم المتبادل يرسّخ المعلومة عند الشارح ويقرّبها للمستمع بلغة الأطفال."},
    {t:"الصفّ المقلوب المبسّط",b:"كلّف الطفل بمهمة صغيرة قبل الحلقة (يسأل والده عن معنى كلمة)، ثم ابنِ الدرس على ما جمعه، فيشعر بالملكية تجاه التعلّم."},
    {t:"التعلّم متعدد الحواس",b:"اجمع السمع والبصر والحركة في الدرس الواحد: آية تُسمع، صورة تُرى، وإشارة باليد تُؤدى. كل حاسّة تضيف مسارًا جديدًا للذاكرة."},
    {t:"التلعيب (Gamification)",b:"نظام نقاط ونجوم وشارات أسبوعية يرفع الحماس والانضباط. اجعل التقدّم مرئيًا للطفل ليتحفّز للأفضل."},
    {t:"العصف الذهني",b:"اطرح سؤالًا مفتوحًا واجمع كل الإجابات دون تخطئة، ثم رتّبوها معًا. ينمّي الجرأة على المشاركة والتفكير الحر."},
    {t:"التعلّم بالمشروع",b:"مشروع صغير يمتد على أسابيع (لوحة عن أركان الإسلام مثلًا) يدمج عدة مهارات ويترك أثرًا طويل المدى."},
    {t:"التعلّم بالاكتشاف",b:"بدل إعطاء الحكم جاهزًا، وجّه الطفل بأسئلة حتى يصل للإجابة بنفسه. ما يكتشفه الطفل يبقى أرسخ."},
    {t:"المسرح والتمثيل",b:"تمثيل موقف من السيرة أو قصة قرآنية يجعل القيمة محسوسة ويطلق طاقة الأطفال في اتجاه نافع."},
    {t:"الوسائط الرقمية الهادفة",b:"مقطع قصير أو صورة معبّرة تختصر شرحًا طويلًا. اختر محتوى موثوقًا وقصيرًا واجعله مدخلًا للنقاش لا بديلًا عنه."},
    {t:"التغذية الراجعة الفورية",b:"صحّح الفهم لحظة حدوث الخطأ بلطف، فالمعلومة المصحّحة فورًا أسهل في الترسيخ من تصحيح متأخر."},
  ]},
  { id:"manage", name:"إدارة الحلقة والانضباط", emoji:"🧭", color:C.blue, items:[
    {t:"مدة تركيز الطفل",b:"متوسط الانتباه ≈ (العمر × دقيقتين). طفل 8 سنوات ≈ 16 دقيقة. قسّم الحصة لمقاطع 10–15 دقيقة بينها حركة."},
    {t:"اتفاق الحلقة",b:"ضعوا معًا 4–5 قواعد بسيطة بصياغة إيجابية («نرفع أيدينا قبل الكلام») وعلّقوها أمام الأطفال. القاعدة المتّفق عليها أسهل في الالتزام."},
    {t:"الروتين الثابت",b:"بداية ونهاية ثابتتان لكل حلقة (دعاء افتتاح، مراجعة، ثم الدرس) تعطي الطفل أمانًا وتقلّل الفوضى."},
    {t:"إشارات الهدوء",b:"اتفق على إشارة صامتة (رفع اليد، تصفيقة إيقاعية) لإعادة الانتباه بدل رفع الصوت."},
    {t:"توزيع الأدوار",b:"امنح كل طفل مسؤولية صغيرة (موزّع الأوراق، حارس الهدوء) فالمسؤولية تحوّل الطاقة إلى انضباط."},
    {t:"التعامل مع المقاطعة",b:"تجاهل المقاطعة البسيطة وامدح المنضبط بجوارها، فالأطفال يقلّدون ما يُكافأ لا ما يُعاقب."},
    {t:"الجلوس والتنظيم المكاني",b:"حلقة دائرية تجعل الجميع مرئيًا ومشاركًا. غيّر أماكن الأطفال أحيانًا لكسر التكتلات."},
    {t:"إدارة الوقت",b:"خصّص لكل نشاط وقتًا معلنًا واستخدم مؤقّتًا مرئيًا، فالحدّ الزمني يرفع التركيز ويمنع الترهّل."},
    {t:"الانتقالات السلسة",b:"الفجوات بين الأنشطة تولّد الفوضى. جهّز نشاطك التالي مسبقًا وانتقل بسرعة وبإشارة واضحة."},
    {t:"احتواء الطفل كثير الحركة",b:"وجّه طاقته بمهام حركية نافعة بدل كبتها، واجلسه قريبًا منك، وامنحه فترات وقوف قصيرة."},
    {t:"الحزم مع اللين",b:"كن ثابتًا على القاعدة وحانيًا مع الطفل. الحزم في السلوك لا في المشاعر."},
    {t:"إنهاء الحلقة بإيجابية",b:"اختم بتلخيص سريع وكلمة تشجيع وذكر لأفضل المواقف، ليغادر الطفل وهو متشوّق للقاء القادم."},
  ]},
  { id:"tarbiya", name:"التربية وبناء القيم", emoji:"🌱", color:C.gold, items:[
    {t:"التعزيز الإيجابي",b:"امدح السلوك المرغوب فور حدوثه بدل التركيز على الخطأ. لكل طفل هدف أسبوعي صغير قابل للتحقيق واحتفِ به."},
    {t:"القدوة قبل الكلمة",b:"الطفل يتعلّم بالملاحظة أكثر من التلقين. كن أنت النموذج الحيّ للقيمة التي تعلّمها."},
    {t:"غرس القيمة بالموقف",b:"استثمر المواقف العابرة في الحلقة (شجار، خسارة في لعبة) لتعليم الصبر والعفو عمليًا، فالموقف أبلغ من الدرس."},
    {t:"الحبّ أولًا",b:"الطفل يتقبّل من يحب. ابنِ علاقة دافئة قبل أن تطلب التزامًا، فالقلب باب العقل."},
    {t:"التدرّج في التكليف",b:"ابدأ بالأيسر ثم تدرّج. النجاح الصغير المتكرر يبني ثقة الطفل ودافعيّته."},
    {t:"ربط الدين بالفرح",b:"اجعل العبادة والقيم مقترنة بمشاعر إيجابية (مكافأة، ابتسامة، احتفاء) لا بالتخويف، ليحبّ الطفل دينه."},
    {t:"احترام شخصية الطفل",b:"لا تقارن طفلًا بآخر، وخاطب كلًّا بما يناسبه. التقدير يبني، والمقارنة تهدم."},
    {t:"تنمية الضمير الذاتي",b:"وجّه الطفل لمراقبة الله لا مراقبتك أنت، ليصبح منضبطًا حين تغيب عنه لا حين تراه فقط."},
    {t:"معالجة الخطأ بستر",b:"صحّح الخطأ على انفراد ما أمكن، فالستر يحفظ كرامة الطفل ويجعله أكثر تقبّلًا للنصح."},
    {t:"التربية بالحوار",b:"اسأل الطفل عن رأيه وسبب فعله قبل الحكم. الحوار يعلّمه التفكير ويشعره بالاحترام."},
    {t:"غرس حب الخير للناس",b:"شجّع المبادرات الجماعية (مساعدة زميل، مشروع خيري صغير) ليتحوّل الإيمان إلى سلوك اجتماعي."},
    {t:"الصبر على ثمرة التربية",b:"أثر التربية تراكمي وبطيء الظهور. داوم على الغرس ولا تستعجل الحصاد."},
  ]},
  { id:"tools", name:"وسائل وأنشطة عملية", emoji:"🎨", color:C.greenLt, items:[
    {t:"بطاقات تعليمية",b:"بطاقات مصوّرة للأحكام أو الأذكار للحفظ والمراجعة السريعة بأسلوب اللعب."},
    {t:"لوحة الإنجاز",b:"لوحة جماعية تُسجّل عليها نجوم كل طفل أسبوعيًا، تجعل التقدّم مرئيًا ومحفّزًا."},
    {t:"صندوق الأسئلة",b:"صندوق يضع فيه الأطفال أسئلتهم، تفتحه في نهاية الحلقة. يشجّع الفضول والجرأة."},
    {t:"الأناشيد التعليمية",b:"تحويل المعلومة (أركان الإسلام، الوضوء) إلى نشيد بإيقاع بسيط يسهّل الحفظ ويبهج الأطفال."},
    {t:"الرسم والتلوين الهادف",b:"اطلب رسم مشهد من القصة أو تلوين لوحة قيمة. الرسم يثبّت المعنى وينمّي التعبير."},
    {t:"الأركان التعليمية",b:"قسّم الحلقة لأركان (ركن قراءة، ركن نشاط، ركن حفظ) ينتقل بينها الأطفال، لكسر الملل."},
    {t:"المجسّمات والنماذج",b:"نموذج مبسّط (مجسّم الكعبة، خريطة رحلة) يقرّب المفاهيم المجرّدة لذهن الطفل."},
    {t:"الألعاب الجماعية",b:"ألعاب تعاونية تعلّم العمل الجماعي والقيم، وتفرّغ الطاقة في اتجاه منظّم."},
    {t:"يوميات الطفل",b:"دفتر صغير يسجّل فيه الطفل عملًا صالحًا فعله، يربط التعلّم بالتطبيق اليومي."},
    {t:"الوسائل المحسوسة",b:"استخدم أشياء ملموسة (ماء للوضوء، تمر للإفطار) فالتعلّم باللمس أبقى أثرًا."},
    {t:"المسابقات الخفيفة",b:"مسابقة سريعة في نهاية الدرس تراجع المعلومات بمتعة وتشدّ الانتباه."},
    {t:"ركن العرض",b:"اعرض أعمال الأطفال (رسومات، مشاريع) أمام المجموعة، فالتقدير العلني يرفع الدافعية."},
  ]},
  { id:"psych", name:"نفسية الطفل والتحفيز", emoji:"🧠", color:C.blueDp, items:[
    {t:"أثر الحركة على الحفظ",b:"ربط الحفظ بحركة (إشارة لكل آية، إيقاع خفيف) يفعّل ذاكرة إضافية ويقلّل الملل."},
    {t:"النوم والتغذية",b:"تركيز الطفل يتأثر بنومه وغذائه. راعِ توقيت الحلقة وابتعد عن أوقات الإرهاق والجوع."},
    {t:"الفروق الفردية",b:"لكل طفل وتيرته وأسلوبه. نوّع طرق العرض لتصل لكل الأنماط: السمعي والبصري والحركي."},
    {t:"الدافعية الداخلية",b:"الأهم أن يحبّ الطفل التعلّم لذاته. قلّل الاعتماد التدريجي على المكافأة المادية لصالح الفخر بالإنجاز."},
    {t:"الأمان النفسي",b:"الطفل الذي يأمن من السخرية يشارك أكثر. اجعل الخطأ فرصة تعلّم لا مصدر إحراج."},
    {t:"الانتباه المتقطّع",b:"غيّر نبرة صوتك والوسيلة كل بضع دقائق لإعادة شدّ الانتباه قبل أن يتشتّت."},
    {t:"تقدير المشاعر",b:"سمِّ مشاعر الطفل واعترف بها قبل توجيهه. الطفل المحتوى عاطفيًا أقدر على التعلّم."},
    {t:"بناء الثقة بالنفس",b:"كلّف الطفل بما يقدر عليه واحتفِ بنجاحه، فالثقة تتراكم من تجارب نجاح صغيرة."},
    {t:"إدارة الخجل",b:"ابدأ بالطفل الخجول بأسئلة سهلة مغلقة، ثم وسّع تدريجيًا. لا تجبره على ما يرهقه أمام الجمع."},
    {t:"التحفيز بالهدف",b:"اجعل لكل طفل هدفًا واضحًا يراه (حفظ سورة، إتقان وضوء) فالهدف المرئي يولّد المثابرة."},
    {t:"أثر الكلمة الطيبة",b:"كلمة تشجيع صادقة قد تغيّر علاقة الطفل بالعلم كله. لا تبخل بها."},
    {t:"الاحتفاء بالتقدّم لا الكمال",b:"قارن الطفل بنفسه أمس لا بغيره. ملاحظة التحسّن الشخصي أقوى محفّز وأعدل ميزان."},
  ]},
];
function resFlat(){ const o=[]; RES_CATS.forEach(c=>c.items.forEach(it=>o.push(Object.assign({cat:c.name,color:c.color},it)))); return o; }

const STATE_KEY="muallim_state_v1", SET_KEY="muallim_settings_v1";
function loadState(){ try{ const r=localStorage.getItem(STATE_KEY); return r?JSON.parse(r):null; }catch(e){ return null; } }
function saveState(s){ try{ localStorage.setItem(STATE_KEY, JSON.stringify(s)); }catch(e){} }
const GEM_KEY="AQ.Ab8RN6Lb0QRkYKeqk4JhBCG4uPO50Oufjibx-orM6RrRUmO_sw";
const SB_URL="https://ibjwiuirqgopmwfcucaf.supabase.co";
const SB_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliandpdWlycWdvcG13ZmN1Y2FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzOTYwNzgsImV4cCI6MjA5Njk3MjA3OH0.IiSgCtByKixdn8n5qpNWjCOuxLcFEbzoH-iNevua-v8";
const DEFAULT_SETTINGS={ provider:"gemini", models:{claude:"claude-haiku-4-5-20251001",openai:"gpt-4o-mini",gemini:"gemini-2.5-flash"}, keys:{claude:"",openai:"",gemini:GEM_KEY}, supabaseUrl:SB_URL, supabaseKey:SB_KEY };
function loadSettings(){
  const d=JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
  try{ const r=localStorage.getItem(SET_KEY); if(!r) return d;
    const s=JSON.parse(r);
    const out=Object.assign({},d,s);
    out.models=Object.assign({},d.models,s.models||{});
    out.keys={}; ["claude","openai","gemini"].forEach(k=>{ out.keys[k]=(s.keys&&s.keys[k])?s.keys[k]:d.keys[k]; });
    out.supabaseUrl=s.supabaseUrl||d.supabaseUrl;
    out.supabaseKey=s.supabaseKey||d.supabaseKey;
    if(!out.provider) out.provider=d.provider;
    return out;
  }catch(e){ return d; }
}
function sbRef(url){ try{ const m=(url||"").match(/https?:\/\/([^.]+)\.supabase/); return m?m[1]:""; }catch(e){ return ""; } }
function saveSettings(s){ try{ localStorage.setItem(SET_KEY, JSON.stringify(s)); }catch(e){} }

const PROVIDERS={
  gemini:{ name:"Gemini", by:"Google", emoji:"🟡", keyUrl:"https://aistudio.google.com/app/apikey", free:true, hint:"مجاني فعلًا — موصى به للأطفال" },
  claude:{ name:"Claude", by:"Anthropic", emoji:"🟢", keyUrl:"https://console.anthropic.com/settings/keys", free:false, hint:"الأعلى جودة — مدفوع" },
  openai:{ name:"ChatGPT", by:"OpenAI", emoji:"🔵", keyUrl:"https://platform.openai.com/api-keys", free:false, hint:"مدفوع — رصيد بسيط للحساب الجديد" },
};
const MODELS={
  gemini:[ {id:"gemini-2.5-flash",label:"2.5 Flash — مجاني وسريع (موصى به)"},{id:"gemini-2.5-flash-lite",label:"2.5 Flash-Lite — الأخف والأسرع (مجاني)"},{id:"gemini-2.5-pro",label:"2.5 Pro — الأقوى (مجاني بحدود)"} ],
  claude:[ {id:"claude-haiku-4-5-20251001",label:"Haiku 4.5 — الأرخص والأسرع"},{id:"claude-sonnet-4-6",label:"Sonnet 4.6 — متوازن"},{id:"claude-opus-4-8",label:"Opus 4.8 — الأقوى"} ],
  openai:[ {id:"gpt-4o-mini",label:"GPT-4o mini — الأرخص المتاح"},{id:"gpt-4.1-mini",label:"GPT-4.1 mini"},{id:"gpt-4.1-nano",label:"GPT-4.1 nano — الأرخص"} ],
};
function arabicErr(provider,msg){
  const m=(msg||"").toLowerCase();
  if(m.indexOf("api key")>=0||m.indexOf("api_key")>=0||m.indexOf("incorrect")>=0||m.indexOf("invalid")>=0||m.indexOf("unauthor")>=0||m.indexOf("permission")>=0||m.indexOf("401")>=0||m.indexOf("403")>=0)
    return "المفتاح غير صحيح أو غير مفعّل لهذا المحرّك. تأكّد أنك نسخت مفتاح "+PROVIDERS[provider].name+" الصحيح في الإعدادات.";
  if(m.indexOf("not found")>=0||m.indexOf("not supported")>=0||m.indexOf("does not exist")>=0||m.indexOf("model")>=0)
    return "اسم الموديل غير متاح. افتح الإعدادات واختر موديلًا آخر من القائمة (جرّب الخيار الأول الموصى به).";
  if(m.indexOf("quota")>=0||m.indexOf("rate")>=0||m.indexOf("429")>=0||m.indexOf("exceed")>=0||m.indexOf("billing")>=0||m.indexOf("insufficient")>=0)
    return "تجاوزت الحدّ المجاني أو الرصيد. انتظر قليلًا، أو جرّب Gemini المجاني، أو موديلًا أخفّ من الإعدادات.";
  return (msg||"حدث خطأ غير متوقع")+" — راجع المفتاح والموديل في الإعدادات.";
}
async function callAI(prompt, system, wantJSON){
  const cfg=loadSettings(); const provider=cfg.provider||"gemini"; const key=(cfg.keys&&cfg.keys[provider])||"";
  if(!key) throw new Error("أضف مفتاح "+PROVIDERS[provider].name+" المجاني في الإعدادات أولًا (حسابي ← إعدادات الذكاء الاصطناعي)");
  const sys=system+(wantJSON?" أعِد الرد بصيغة JSON صحيحة فقط دون أي شرح أو علامات Markdown.":"");
  let text="";
  try{
    if(provider==="claude"){
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":key,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:cfg.models.claude,max_tokens:2000,system:sys,messages:[{role:"user",content:prompt}]})});
      const d=await res.json(); if(d.error) throw new Error(d.error.message||"خطأ");
      text=(d.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("\n");
    } else if(provider==="openai"){
      const res=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json","authorization":"Bearer "+key},body:JSON.stringify({model:cfg.models.openai,messages:[{role:"system",content:sys},{role:"user",content:prompt}]})});
      const d=await res.json(); if(d.error) throw new Error((d.error&&d.error.message)||"خطأ");
      text=(d.choices&&d.choices[0]&&d.choices[0].message&&d.choices[0].message.content)||"";
    } else {
      const m=cfg.models.gemini;
      const res=await fetch("https://generativelanguage.googleapis.com/v1beta/models/"+m+":generateContent?key="+encodeURIComponent(key),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({systemInstruction:{parts:[{text:sys}]},contents:[{role:"user",parts:[{text:prompt}]}],generationConfig:{temperature:0.8,maxOutputTokens:2048}})});
      const d=await res.json(); if(d.error) throw new Error((d.error&&d.error.message)||"خطأ");
      const cand=d.candidates&&d.candidates[0]; text=((cand&&cand.content&&cand.content.parts)||[]).map(p=>p.text||"").join("\n");
    }
  }catch(e){ throw new Error(arabicErr(provider, e.message)); }
  text=(text||"").trim();
  if(!text) throw new Error("لم يصل ردّ من المحرّك. جرّب مرة أخرى أو غيّر الموديل من الإعدادات.");
  if(wantJSON){ let cc=text.replace(/```json/gi,"").replace(/```/g,"").trim(); const a=cc.indexOf("{"),b=cc.lastIndexOf("}"),a2=cc.indexOf("["),b2=cc.lastIndexOf("]"); try{ return JSON.parse(cc); }catch(e){ try{ if(a>=0&&b>a) return JSON.parse(cc.slice(a,b+1)); if(a2>=0&&b2>a2) return JSON.parse(cc.slice(a2,b2+1)); }catch(e2){} return null; } }
  return text;
}

const SB_SQL='create table if not exists app_backups (\n  id text primary key,\n  data jsonb,\n  updated_at timestamptz default now()\n);\nalter table app_backups enable row level security;\ncreate policy "personal access" on app_backups\n  for all using (true) with check (true);';
function getSB(cfg){ if(cfg.supabaseUrl&&cfg.supabaseKey&&window.supabase){ try{ return window.supabase.createClient(cfg.supabaseUrl,cfg.supabaseKey); }catch(e){ return null; } } return null; }
async function backupCloud(state){ const cfg=loadSettings(); const sb=getSB(cfg); if(!sb) throw new Error("أضف رابط ومفتاح Supabase في الإعدادات أولًا"); const r=await sb.from("app_backups").upsert({id:"main",data:state,updated_at:new Date().toISOString()}); if(r.error) throw new Error(r.error.message); }
async function restoreCloud(){ const cfg=loadSettings(); const sb=getSB(cfg); if(!sb) throw new Error("أضف رابط ومفتاح Supabase في الإعدادات أولًا"); const r=await sb.from("app_backups").select("data").eq("id","main").maybeSingle(); if(r.error) throw new Error(r.error.message); if(!r.data) throw new Error("لا توجد نسخة محفوظة في السحابة بعد"); return r.data.data; }
function cloudErrMissing(msg){ const m=(msg||"").toLowerCase(); return m.indexOf("does not exist")>=0||m.indexOf("could not find")>=0||m.indexOf("relation")>=0||m.indexOf("schema cache")>=0||m.indexOf("404")>=0||m.indexOf("not exist")>=0; }
async function cloudGet(){ const cfg=loadSettings(); const sb=getSB(cfg); if(!sb) return {ok:false}; try{ const r=await sb.from("app_backups").select("data,updated_at").eq("id","main").maybeSingle(); if(r.error) return {ok:false,err:r.error.message,missing:cloudErrMissing(r.error.message)}; return {ok:true,data:r.data&&r.data.data,updatedAt:r.data&&r.data.updated_at}; }catch(e){ return {ok:false,err:e.message}; } }
async function cloudPut(state,iso){ const cfg=loadSettings(); const sb=getSB(cfg); if(!sb) return {ok:false}; try{ const r=await sb.from("app_backups").upsert({id:"main",data:state,updated_at:iso||new Date().toISOString()}); if(r.error) return {ok:false,err:r.error.message,missing:cloudErrMissing(r.error.message)}; return {ok:true}; }catch(e){ return {ok:false,err:e.message}; } }

const todayISO=()=>new Date().toISOString();
const fmtDate=(iso)=>new Date(iso).toLocaleDateString("ar-EG",{day:"numeric",month:"long"});
const fmtDateTime=(iso)=>new Date(iso).toLocaleDateString("ar-EG",{day:"numeric",month:"long"})+" · "+new Date(iso).toLocaleTimeString("ar-EG",{hour:"2-digit",minute:"2-digit"});
const fmtFull=(iso)=>new Date(iso).toLocaleDateString("ar-EG",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
const daysBetween=(a,b)=>Math.round((new Date(b)-new Date(a))/86400000);
const toInputDate=(iso)=>{ const d=new Date(iso); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); };
function levelLabel(v){ if(v>=85)return{t:"ممتاز",c:C.green}; if(v>=70)return{t:"جيد جدًا",c:C.greenLt}; if(v>=55)return{t:"جيد",c:C.gold}; if(v>=40)return{t:"مقبول",c:C.amber}; return{t:"يحتاج دعم",c:C.danger}; }
function subjProgress(s){ if(!s.lessons.length)return 0; return Math.round((s.lessons.filter(l=>l.prepared).length/s.lessons.length)*100); }
function resizeImage(file){ return new Promise((resolve)=>{ const reader=new FileReader(); reader.onload=(e)=>{ const img=new Image(); img.onload=()=>{ const max=220,scale=Math.min(1,max/Math.max(img.width,img.height)); const cv=document.createElement("canvas"); cv.width=img.width*scale; cv.height=img.height*scale; cv.getContext("2d").drawImage(img,0,0,cv.width,cv.height); resolve(cv.toDataURL("image/jpeg",0.8)); }; img.src=e.target.result; }; reader.readAsDataURL(file); }); }
function shareText(title,text,notify){ if(navigator.share){ navigator.share({title:title,text:text}).catch(()=>{}); } else { try{ navigator.clipboard.writeText(text); notify&&notify("تم نسخ النص — الصقه في واتساب"); }catch(e){ notify&&notify("انسخ النص يدويًا"); } } }
function waShare(text){ window.open("https://wa.me/?text="+encodeURIComponent(text),"_blank"); }

function Ring({ value, size=84, stroke=9, color=C.green }){
  const r=(size-stroke)/2, cir=2*Math.PI*r, off=cir-(value/100)*cir;
  return h("svg",{width:size,height:size,style:{transform:"rotate(-90deg)"}},[
    h("circle",{key:"bg",cx:size/2,cy:size/2,r:r,fill:"none",stroke:C.bg2,strokeWidth:stroke}),
    h("circle",{key:"fg",cx:size/2,cy:size/2,r:r,fill:"none",stroke:color,strokeWidth:stroke,strokeLinecap:"round",strokeDasharray:cir,strokeDashoffset:off,style:{transition:"stroke-dashoffset 1s cubic-bezier(.2,.8,.2,1)"}}),
  ]);
}
function Btn({ children, onClick, variant="primary", icon, full, disabled, size="md" }){
  const st={primary:{bg:C.green,fg:"#fff"},gold:{bg:C.gold,fg:"#3a2d00"},blue:{bg:C.blue,fg:"#fff"},soft:{bg:C.bg2,fg:C.ink},ghost:{bg:"transparent",fg:C.green},danger:{bg:"#fff0ef",fg:C.danger},danger2:{bg:C.danger,fg:"#fff"}}[variant];
  const pad=size==="sm"?"8px 13px":"12px 18px";
  return html`<button className="mq-btn" onClick=${onClick} disabled=${disabled} style=${{background:st.bg,color:st.fg,padding:pad,width:full?"100%":"auto",opacity:disabled?0.5:1,fontSize:size==="sm"?13:15,fontWeight:700,border:variant==="ghost"?"1.5px solid "+C.line:"none"}}>
    ${icon&&html`<${Icon} n=${icon} s=${size==="sm"?15:18}/>`}${children}
  <//>`;
}
function Field({ value, onChange, placeholder, label, area, rows=4, icon, type }){
  return html`<label style=${{display:"block",width:"100%"}}>
    ${label&&html`<span style=${{fontSize:13,fontWeight:700,color:C.sub,marginBottom:6,display:"block"}}>${label}<//>`}
    <div style=${{position:"relative"}}>
      ${icon&&html`<div style=${{position:"absolute",right:13,top:13}}><${Icon} n=${icon} s=${17} c=${C.sub}/><//>`}
      ${area
        ?html`<textarea className="mq-input" rows=${rows} value=${value} placeholder=${placeholder} onChange=${e=>onChange(e.target.value)} style=${{paddingRight:icon?38:14,resize:"vertical",lineHeight:1.7}}/>`
        :html`<input className="mq-input" type=${type||"text"} value=${value} placeholder=${placeholder} onChange=${e=>onChange(e.target.value)} style=${{paddingRight:icon?38:14}}/>`}
    <//>
  <//>`;
}
function Slider({ value, onChange, color }){
  return html`<input type="range" min="0" max="100" value=${value} onChange=${e=>onChange(+e.target.value)} className="mq-range" style=${{background:"linear-gradient(to left, "+color+" "+value+"%, "+C.bg2+" "+value+"%)"}}/>`;
}
function Modal({ open, onClose, title, children }){
  if(!open) return null;
  return html`<div className="mq-overlay" onClick=${onClose}>
    <div className="mq-sheet" onClick=${e=>e.stopPropagation()}>
      <div style=${{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <h3 style=${{margin:0,fontSize:18,color:C.ink,fontFamily:"Cairo"}}>${title}<//>
        <button className="mq-x" onClick=${onClose}><${Icon} n="x" s=${18}/><//>
      <//>
      ${children}
    <//>
  <//>`;
}
function Loading({ text="جارٍ التنفيذ بالذكاء الاصطناعي…" }){
  return html`<div style=${{display:"flex",gap:10,alignItems:"center",color:C.green,fontWeight:700,fontSize:14,padding:"14px 0"}}>
    <span className="mq-spin" style=${{display:"flex"}}><${Icon} n="loader" s=${18} c=${C.green}/><//>${text}
  <//>`;
}
function AIBadge(){
  return html`<span style=${{display:"inline-flex",alignItems:"center",gap:4,background:"rgba(14,124,102,.1)",color:C.green,fontSize:10,fontWeight:800,padding:"3px 8px",borderRadius:20}}><${Icon} n="spark" s=${10} c=${C.green}/> ذكاء اصطناعي<//>`;
}
function Empty({ icon, text, sub }){
  return html`<div style=${{textAlign:"center",padding:"40px 20px"}}>
    <div className="mq-empty-ic"><${Icon} n=${icon} s=${30} c=${C.sub}/><//>
    <b style=${{fontFamily:"Cairo",fontSize:16,color:C.ink,display:"block",marginTop:14}}>${text}<//>
    <p style=${{fontSize:13,color:C.sub,margin:"6px 0 0",lineHeight:1.6}}>${sub}<//>
  <//>`;
}
function Spark({ data, color }){
  if(!data||data.length<2) return null;
  const w=320,hh=120,pad=16;
  const xs=i=>pad+i*(w-2*pad)/(data.length-1);
  const ys=v=>hh-pad-(v/100)*(hh-2*pad);
  const pts=data.map((d,i)=>xs(i)+","+ys(d.val)).join(" ");
  const dots=data.map((d,i)=>h("circle",{key:i,cx:xs(i),cy:ys(d.val),r:4,fill:color}));
  return h("svg",{viewBox:"0 0 "+w+" "+hh,width:"100%",height:150,dir:"ltr"},[h("polyline",{key:"p",points:pts,fill:"none",stroke:color,strokeWidth:3,strokeLinecap:"round",strokeLinejoin:"round"}),...dots]);
}
function Confirm({ open, onClose, onConfirm, title, message, confirmText, danger }){
  if(!open) return null;
  return html`<div className="mq-overlay" onClick=${onClose}>
    <div className="mq-sheet" onClick=${e=>e.stopPropagation()} style=${{maxWidth:400}}>
      <div style=${{textAlign:"center"}}>
        <div className="mq-empty-ic" style=${{background:danger?"#fff0ef":C.bg2,margin:"0 auto"}}><${Icon} n=${danger?"trash":"bell"} s=${28} c=${danger?C.danger:C.gold}/><//>
        <h3 style=${{fontFamily:"Cairo",fontSize:18,margin:"14px 0 6px",color:C.ink}}>${title}<//>
        <p style=${{fontSize:13.5,color:C.sub,lineHeight:1.7,margin:"0 0 18px"}}>${message}<//>
      <//>
      <div style=${{display:"flex",gap:10}}>
        <${Btn} full=${true} variant="soft" onClick=${onClose}>إلغاء<//>
        <${Btn} full=${true} variant=${danger?"danger2":"primary"} onClick=${onConfirm}>${confirmText||"تأكيد"}<//>
      <//>
    <//>
  <//>`;
}
function ToolBtn({ icon, color, label, onClick, disabled }){
  return html`<button className="mq-ai-btn" onClick=${onClick} disabled=${disabled} style=${{borderColor:color}}><${Icon} n=${icon} s=${19} c=${color}/><span>${label}<//><//>`;
}
const TREE_PAL=[C.green,C.blue,C.gold,C.greenLt,C.blueDp,C.amber];
function TreeNode({ node, depth }){
  if(!node) return null;
  const color=TREE_PAL[depth%TREE_PAL.length]; const root=depth===0;
  return html`<div style=${{marginBottom:6}}>
    <div style=${{display:"inline-block",background:root?color:"#fff",color:root?"#fff":C.ink,border:"1.5px solid "+color,borderRadius:12,padding:root?"9px 16px":"7px 12px",fontFamily:"Cairo",fontWeight:root?800:700,fontSize:root?15:13.5}}>${node.title}<//>
    ${node.children&&node.children.length?html`<div style=${{marginRight:13,borderRight:"2px solid "+color,paddingRight:13,marginTop:7,display:"grid",gap:6}}>
      ${node.children.map((c,i)=>html`<${TreeNode} key=${i} node=${c} depth=${depth+1}/>`)}
    <//>`:null}
  <//>`;
}
const SEG_COLORS={open:C.green,review:C.blueLt,explain:C.blue,activity:C.greenLt,break:C.gold,quiz:C.blueDp,free:C.amber};
const SEG_LABEL={open:"افتتاح",review:"مراجعة",explain:"شرح",activity:"نشاط",break:"استراحة",quiz:"تقويم",free:"وقت حر"};
const SEG_ICON={open:"play",review:"list",explain:"book",activity:"spark",break:"clock",quiz:"target",free:"award"};
const SEG_TYPES=["open","review","explain","activity","break","quiz","free"];
const DEFAULT_SCHEDULE=[
  {title:"الافتتاح والترحيب والدعاء",minutes:10,type:"open"},
  {title:"مراجعة الدرس السابق",minutes:10,type:"review"},
  {title:"عرض الدرس الجديد — الجزء الأول",minutes:20,type:"explain"},
  {title:"نشاط تفاعلي أو لعبة تعليمية",minutes:15,type:"activity"},
  {title:"استراحة قصيرة",minutes:10,type:"break"},
  {title:"عرض الدرس — الجزء الثاني والتطبيق",minutes:20,type:"explain"},
  {title:"تسميع وأسئلة وتقويم",minutes:15,type:"quiz"},
  {title:"الخاتمة والتكليف ووقت حر",minutes:10,type:"free"},
];

function FsEditor({ open, value, onChange, onClose, title }){
  const [read,setRead]=useState(false);
  if(!open) return null;
  return html`<div className="mq-fs">
    <div className="mq-fs-bar">
      <button className="mq-x" onClick=${onClose}><${Icon} n="x" s=${18}/><//>
      <b style=${{fontFamily:"Cairo",fontSize:16,color:C.ink,flex:1,textAlign:"center"}}>${title||"محتوى الدرس"}<//>
      <button className="mq-link-btn" onClick=${()=>setRead(!read)}>${read?"تحرير":"قراءة"}<//>
    <//>
    <div className="mq-fs-body">
      ${read
        ?html`<div style=${{fontSize:17,lineHeight:2.1,color:C.ink,whiteSpace:"pre-wrap"}}>${value||"لا يوجد محتوى بعد."}<//>`
        :html`<textarea autoFocus className="mq-fs-ta" value=${value} onChange=${e=>onChange(e.target.value)} placeholder="اكتب محتوى الدرس بحرّية هنا بمساحة كاملة…"/>`}
    <//>
  <//>`;
}

function Login({ onLogin }){
  const [name,setName]=useState(""); const [pass,setPass]=useState("");
  return html`<div className="mq-login">
    <div className="mq-blob b1"/><div className="mq-blob b2"/><div className="mq-blob b3"/>
    <div className="mq-login-card">
      <div className="mq-logo"><${Icon} n="cap" s=${34} c="#fff"/><//>
      <h1 style=${{fontFamily:"Cairo",fontSize:27,margin:"16px 0 4px",color:C.ink}}>مُعلّمي<//>
      <p style=${{color:C.sub,margin:"0 0 22px",fontSize:14}}>مساعدك الذكي في تحضير وتنظيم حلقات الأطفال<//>
      <button className="mq-google" onClick=${()=>onLogin({name:"المعلّم",email:"teacher@gmail.com"})}>
        <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.5 5.4 2.5 13.3l7.8 6c1.9-5.6 7.2-9.8 13.7-9.8z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.5 3-2.2 5.5-4.7 7.2l7.4 5.7c4.3-4 6.8-9.9 6.8-17.4z"/><path fill="#FBBC05" d="M10.3 28.3c-.5-1.4-.7-2.9-.7-4.3s.3-2.9.7-4.3l-7.8-6C.9 16.9 0 20.3 0 24s.9 7.1 2.5 10.3z"/><path fill="#34A853" d="M24 48c6.2 0 11.6-2.1 15.4-5.6l-7.4-5.7c-2.1 1.4-4.8 2.2-8 2.2-6.5 0-11.8-4.2-13.7-9.8l-7.8 6C6.5 42.6 14.6 48 24 48z"/></svg>
        المتابعة باستخدام جوجل
      </button>
      <div className="mq-or"><span>أو<//><//>
      <div style=${{display:"grid",gap:11}}>
        <${Field} value=${name} onChange=${setName} placeholder="اسم المعلّم" icon="user"/>
        <${Field} value=${pass} onChange=${setPass} placeholder="كلمة المرور" type="password" icon="gear"/>
        <${Btn} full=${true} icon="play" onClick=${()=>onLogin({name:name||"المعلّم",email:"teacher@gmail.com"})}>دخول وبدء العمل<//>
      <//>
      <p style=${{fontSize:11,color:C.sub,marginTop:16}}>يُحفظ محتواك تلقائيًا على جهازك ويبقى معك في كل مرة<//>
    <//>
  <//>`;
}
function Header({ title, onBack, sub, right }){
  return html`<div style=${{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
    ${onBack&&html`<button className="mq-back" onClick=${onBack}><${Icon} n="chevR" s=${22}/><//>`}
    <div style=${{flex:1}}>
      <h2 style=${{fontFamily:"Cairo",fontSize:22,margin:0,color:C.ink}}>${title}<//>
      ${sub&&html`<p style=${{margin:"2px 0 0",color:C.sub,fontSize:13}}>${sub}<//>`}
    <//>
    ${right||null}
  <//>`;
}

function HomeScreen({ state, openSubject, openSeason, setTab, notify }){
  const { teacher, subjects, season }=state;
  const all=subjects.flatMap(s=>s.lessons);
  const overall=all.length?Math.round((all.filter(l=>l.prepared).length/all.length)*100):0;
  const chartData=subjects.map(s=>({name:s.name.replace("الكريم","").replace("النبوية","").trim(),val:subjProgress(s),fill:s.color}));
  const flat=resFlat();
  let si=null;
  if(season){ const total=Math.max(1,daysBetween(season.startDate,season.endDate)); const passed=Math.max(0,daysBetween(season.startDate,todayISO())); si={pct:Math.min(100,Math.round((passed/total)*100)),left:daysBetween(todayISO(),season.endDate)}; }
  return html`<div className="mq-screen">
    <div style=${{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
      <div>
        <p style=${{color:C.sub,margin:0,fontSize:13}}>${new Date().toLocaleDateString("ar-EG",{weekday:"long",day:"numeric",month:"long"})}<//>
        <h2 style=${{fontFamily:"Cairo",fontSize:23,margin:"2px 0 0",color:C.ink}}>أهلاً، ${teacher.name} 👋<//>
      <//>
      <button className="mq-bell" onClick=${()=>notify("لديك دروس بانتظار التحضير قبل بداية الموسم")}><${Icon} n="bell" s=${19}/><span className="mq-dot"/><//>
    <//>
    ${season?html`<div className="mq-card" style=${{background:"linear-gradient(135deg,"+C.green+","+C.greenLt+")",color:"#fff",marginBottom:16}}>
      <div style=${{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <span style=${{fontSize:12,opacity:.85,fontWeight:700}}>الموسم الحالي<//>
          <h3 style=${{fontFamily:"Cairo",margin:"3px 0 2px",fontSize:19}}>${season.name}<//>
          <p style=${{margin:0,fontSize:12.5,opacity:.9}}>${season.children} طفل · ${season.sessions} لقاء${season.trip?" · رحلة مُقررة":""}<//>
        <//>
        <${Icon} n="cal" s=${30} c="#fff"/>
      <//>
      <div style=${{marginTop:10,fontSize:11.5,opacity:.92}}>من ${fmtDate(season.startDate)} إلى ${fmtDate(season.endDate)}<//>
      <div style=${{marginTop:10}}>
        <div style=${{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:6}}><span>${si.left>0?"تبقّى "+si.left+" يوم":"انتهى الموسم"}<//><span>${si.pct}%<//><//>
        <div className="mq-bar-bg" style=${{background:"rgba(255,255,255,.25)"}}><div className="mq-bar-fill" style=${{width:si.pct+"%",background:C.yellow}}/><//>
      <//>
    <//>`:html`<button className="mq-card mq-season-empty" onClick=${openSeason}>
      <div style=${{display:"flex",alignItems:"center",gap:12}}>
        <div className="mq-mini-ic" style=${{background:C.green}}><${Icon} n="plus" s=${20} c="#fff"/><//>
        <div style=${{textAlign:"right"}}>
          <h3 style=${{fontFamily:"Cairo",margin:0,fontSize:17,color:C.ink}}>ابدأ موسمًا جديدًا<//>
          <p style=${{margin:"2px 0 0",fontSize:13,color:C.sub}}>حدّد المادة وتاريخ البداية والنهاية<//>
        <//>
      <//>
      <${Icon} n="chevL" s=${20} c=${C.sub}/>
    <//>`}
    <div className="mq-card" style=${{marginBottom:16}}>
      <div style=${{display:"flex",alignItems:"center",gap:16}}>
        <div style=${{position:"relative"}}>
          <${Ring} value=${overall} size=${92} color=${C.green}/>
          <div className="mq-ring-center"><b style=${{fontSize:22,fontFamily:"Cairo",color:C.ink}}>${overall}%<//><//>
        <//>
        <div style=${{flex:1}}>
          <h3 style=${{fontFamily:"Cairo",margin:0,fontSize:17,color:C.ink}}>نسبة التحضير العامة<//>
          <p style=${{margin:"4px 0 0",fontSize:13,color:C.sub,lineHeight:1.6}}>عبر ${subjects.length} مواد · ${all.filter(l=>l.prepared).length} درس جاهز من ${all.length}<//>
        <//>
      <//>
      <div style=${{height:1,background:C.line,margin:"14px 0"}}/>
      <div style=${{display:"grid",gap:9}}>
        ${chartData.map((e,i)=>html`<div key=${i} style=${{display:"flex",alignItems:"center",gap:10}}>
          <span style=${{fontSize:12,color:C.sub,width:74,textAlign:"left",flexShrink:0}}>${e.name}<//>
          <div className="mq-bar-bg" style=${{flex:1}}><div className="mq-bar-fill" style=${{width:e.val+"%",background:e.fill}}/><//>
          <b style=${{fontSize:12,color:e.fill,width:34}}>${e.val}%<//>
        <//>`)}
      <//>
    <//>
    <div style=${{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
      <h3 style=${{fontFamily:"Cairo",fontSize:18,margin:0,color:C.ink}}>المواد الدراسية<//>
      <button className="mq-link-btn" onClick=${()=>setTab("subjects")}>عرض الكل<//>
    <//>
    <div className="mq-grid">
      ${subjects.slice(0,6).map(s=>{const p=subjProgress(s);return html`<button key=${s.id} className="mq-subj" onClick=${()=>openSubject(s.id)}>
        <div style=${{position:"relative",marginBottom:8}}>
          <${Ring} value=${p} size=${62} stroke=${7} color=${s.color}/>
          <div className="mq-ring-center" style=${{fontSize:22}}>${s.emoji}<//>
        <//>
        <b style=${{fontSize:12.5,color:C.ink,fontFamily:"Cairo",textAlign:"center",lineHeight:1.3}}>${s.name}<//>
        <span style=${{fontSize:11,color:s.color,fontWeight:800,marginTop:3}}>${p}%<//>
      <//>`;})}
    <//>
    <div style=${{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"20px 0 12px"}}>
      <h3 style=${{fontFamily:"Cairo",fontSize:18,margin:0,color:C.ink}}>أحدث طرق التعليم<//>
      <button className="mq-link-btn" onClick=${()=>setTab("resources")}>المزيد<//>
    <//>
    <div style=${{display:"flex",gap:12,overflowX:"auto",padding:"0 4px 6px"}}>
      ${flat.slice(0,5).map((r,i)=>html`<div key=${i} className="mq-res-mini" onClick=${()=>setTab("resources")}>
        <span style=${{background:r.color,color:"#fff",fontSize:10,fontWeight:800,padding:"3px 8px",borderRadius:20,alignSelf:"flex-start"}}>${r.cat}<//>
        <b style=${{fontSize:13.5,color:C.ink,fontFamily:"Cairo",lineHeight:1.4,marginTop:8}}>${r.t}<//>
        <span style=${{fontSize:11,color:C.sub,marginTop:"auto"}}>اقرأ المزيد<//>
      <//>`)}
    <//>
  <//>`;
}

function SubjectsList({ state, openSubject, onAdd }){
  const [q,setQ]=useState(""); const [open,setOpen]=useState(false);
  const [name,setName]=useState(""); const [emoji,setEmoji]=useState(SUBJ_EMOJIS[0]); const [color,setColor]=useState(SUBJ_COLORS[0]); const [obj,setObj]=useState("");
  const list=state.subjects.filter(s=>s.name.includes(q));
  const add=()=>{ if(!name.trim())return; onAdd({id:rid(),name:name.trim(),emoji:emoji,color:color,objectives:obj.split("\n").map(x=>x.trim()).filter(Boolean),lessons:[]}); setName(""); setObj(""); setOpen(false); };
  return html`<div className="mq-screen">
    <${Header} title="المواد الدراسية" sub=${state.subjects.length+" مواد · تحضير ذكي لكل درس"}/>
    <div style=${{display:"flex",gap:8,marginBottom:16}}>
      <div style=${{position:"relative",flex:1}}>
        <div style=${{position:"absolute",right:13,top:13}}><${Icon} n="search" s=${17} c=${C.sub}/><//>
        <input className="mq-input" placeholder="ابحث عن مادة…" value=${q} onChange=${e=>setQ(e.target.value)} style=${{paddingRight:38}}/>
      <//>
      <${Btn} icon="plus" onClick=${()=>setOpen(true)}>مادة<//>
    <//>
    <div style=${{display:"grid",gap:11}}>
      ${list.map(s=>{const p=subjProgress(s),done=s.lessons.filter(l=>l.prepared).length;return html`<button key=${s.id} className="mq-card mq-row" onClick=${()=>openSubject(s.id)}>
        <div className="mq-mini-ic" style=${{background:s.color}}>${s.emoji}<//>
        <div style=${{flex:1,textAlign:"right"}}>
          <b style=${{fontSize:15.5,color:C.ink,fontFamily:"Cairo"}}>${s.name}<//>
          <p style=${{margin:"3px 0 0",fontSize:12.5,color:C.sub}}>${done} من ${s.lessons.length} دروس جاهزة<//>
          <div className="mq-bar-bg" style=${{marginTop:7}}><div className="mq-bar-fill" style=${{width:p+"%",background:s.color}}/><//>
        <//>
        <b style=${{fontSize:18,color:s.color,fontFamily:"Cairo"}}>${p}%<//>
      <//>`;})}
    <//>
    <${Modal} open=${open} onClose=${()=>setOpen(false)} title="إضافة مادة جديدة">
      <div style=${{display:"grid",gap:14}}>
        <${Field} value=${name} onChange=${setName} placeholder="مثال: التجويد المتقدّم" label="اسم المادة" icon="book"/>
        <div>
          <span style=${{fontSize:13,fontWeight:700,color:C.sub,marginBottom:6,display:"block"}}>الأيقونة<//>
          <div style=${{display:"flex",gap:7,flexWrap:"wrap"}}>${SUBJ_EMOJIS.map(e=>html`<button key=${e} onClick=${()=>setEmoji(e)} style=${{width:40,height:40,borderRadius:12,border:emoji===e?"2px solid "+C.green:"1.5px solid "+C.line,background:emoji===e?"rgba(14,124,102,.08)":"#fff",fontSize:20,cursor:"pointer"}}>${e}<//>`)}<//>
        <//>
        <div>
          <span style=${{fontSize:13,fontWeight:700,color:C.sub,marginBottom:6,display:"block"}}>اللون<//>
          <div style=${{display:"flex",gap:9}}>${SUBJ_COLORS.map(c=>html`<button key=${c} onClick=${()=>setColor(c)} style=${{width:34,height:34,borderRadius:"50%",background:c,border:color===c?"3px solid "+C.ink:"3px solid transparent",cursor:"pointer"}}/>`)}<//>
        <//>
        <${Field} area=${true} rows=${3} value=${obj} onChange=${setObj} placeholder="هدف في كل سطر (اختياري)…" label="أهداف المادة"/>
        <${Btn} full=${true} icon="plus" onClick=${add}>إضافة المادة<//>
      <//>
    <//>
  <//>`;
}

function SubjectScreen({ subject, onBack, openLesson, update, onDelete, notify }){
  const [editObj,setEditObj]=useState(false);
  const [objText,setObjText]=useState(subject.objectives.join("\n"));
  const [newLesson,setNewLesson]=useState("");
  const [addOpen,setAddOpen]=useState(false);
  const [aiObj,setAiObj]=useState(false);
  const [delOpen,setDelOpen]=useState(false);
  const p=subjProgress(subject);
  const toggle=(lid)=>update(Object.assign({},subject,{lessons:subject.lessons.map(l=>l.id===lid?Object.assign({},l,{prepared:!l.prepared}):l)}));
  const addLesson=()=>{ if(!newLesson.trim())return; update(Object.assign({},subject,{lessons:[...subject.lessons,L(newLesson.trim(),0)]})); setNewLesson(""); setAddOpen(false); };
  const delLesson=(lid)=>update(Object.assign({},subject,{lessons:subject.lessons.filter(l=>l.id!==lid)}));
  const saveObj=()=>{ update(Object.assign({},subject,{objectives:objText.split("\n").filter(x=>x.trim())})); setEditObj(false); };
  const suggestObjectives=async()=>{ setAiObj(true); try{ const r=await callAI('اقترح 4 أهداف تعليمية واضحة وقابلة للقياس لمادة "'+subject.name+'" تُدرّس لأطفال 6-13 سنة في حلقة تربية إسلامية. الصيغة: مصفوفة نصوص JSON.',"أنت خبير مناهج تربية إسلامية للأطفال.",true); if(Array.isArray(r)){ setObjText(r.join("\n")); update(Object.assign({},subject,{objectives:r})); setEditObj(true); } else notify("تعذّر توليد الأهداف، حاول مرة أخرى"); }catch(e){ notify(e.message); } setAiObj(false); };
  return html`<div className="mq-screen">
    <${Header} title=${subject.name} onBack=${onBack} right=${html`<button className="mq-icon-sm" onClick=${()=>setDelOpen(true)}><${Icon} n="trash" s=${16} c=${C.danger}/><//>`}/>
    <div className="mq-card" style=${{background:"linear-gradient(135deg,"+subject.color+","+subject.color+"cc)",color:"#fff",marginBottom:16}}>
      <div style=${{display:"flex",alignItems:"center",gap:14}}>
        <div className="mq-mini-ic" style=${{background:"rgba(255,255,255,.2)",fontSize:24}}>${subject.emoji}<//>
        <div style=${{flex:1}}>
          <p style=${{margin:0,fontSize:12.5,opacity:.9}}>التقدّم في التحضير<//>
          <b style=${{fontSize:26,fontFamily:"Cairo"}}>${p}%<//>
        <//>
        <div style=${{textAlign:"left",fontSize:12.5,opacity:.92}}>
          <div>${subject.lessons.filter(l=>l.prepared).length} جاهز<//>
          <div>${subject.lessons.filter(l=>!l.prepared).length} متبقٍ<//>
        <//>
      <//>
    <//>
    <div className="mq-card" style=${{marginBottom:16}}>
      <div style=${{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <div style=${{display:"flex",alignItems:"center",gap:8}}><${Icon} n="target" s=${18} c=${subject.color}/><h3 style=${{fontFamily:"Cairo",margin:0,fontSize:16,color:C.ink}}>أهداف المادة<//><//>
        <div style=${{display:"flex",gap:6}}>
          <button className="mq-icon-sm" onClick=${suggestObjectives}><${Icon} n="spark" s=${15} c=${C.green}/><//>
          <button className="mq-icon-sm" onClick=${()=>setEditObj(!editObj)}><${Icon} n="edit" s=${15} c=${C.sub}/><//>
        <//>
      <//>
      ${aiObj&&html`<${Loading} text="جارٍ اقتراح الأهداف…"/>`}
      ${editObj?html`<div style=${{display:"grid",gap:10}}>
        <${Field} area=${true} rows=${5} value=${objText} onChange=${setObjText} placeholder="هدف في كل سطر…"/>
        <div style=${{display:"flex",gap:8}}><${Btn} size="sm" icon="check" onClick=${saveObj}>حفظ<//><${Btn} size="sm" variant="soft" onClick=${()=>setEditObj(false)}>إلغاء<//><//>
      <//>`:(subject.objectives.length?html`<ul style=${{margin:0,paddingRight:18,display:"grid",gap:7}}>${subject.objectives.map((o,i)=>html`<li key=${i} style=${{fontSize:13.5,color:C.ink,lineHeight:1.6}}>${o}<//>`)}<//>`:html`<p style=${{fontSize:13,color:C.sub,margin:0}}>لا أهداف بعد — اضغط ✦ للاقتراح أو ✎ للإضافة.<//>`)}
    <//>
    <div style=${{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
      <h3 style=${{fontFamily:"Cairo",fontSize:17,margin:0,color:C.ink}}>الدروس (${subject.lessons.length})<//>
      <${Btn} size="sm" icon="plus" onClick=${()=>setAddOpen(true)}>إضافة درس<//>
    <//>
    <div style=${{display:"grid",gap:10}}>
      ${subject.lessons.map((l,i)=>html`<div key=${l.id} className="mq-card mq-lesson">
        <button className="mq-check" onClick=${()=>toggle(l.id)}><${Icon} n=${l.prepared?"checkc":"circle"} s=${26} c=${l.prepared?C.green:C.line}/><//>
        <button onClick=${()=>openLesson(l.id)} style=${{flex:1,textAlign:"right",background:"none",border:"none",cursor:"pointer",padding:0}}>
          <b style=${{fontSize:14.5,color:C.ink,fontFamily:"Cairo",display:"block"}}>${i+1}. ${l.title}<//>
          <span style=${{fontSize:12,color:l.prepared?C.green:C.amber,fontWeight:700}}>${l.prepared?"✓ تم التحضير":"بانتظار التحضير"}${l.content?" · يحتوي محتوى":""}<//>
        <//>
        <button className="mq-icon-sm" onClick=${()=>openLesson(l.id)}><${Icon} n="chevL" s=${18} c=${C.sub}/><//>
        <button className="mq-icon-sm" onClick=${()=>delLesson(l.id)}><${Icon} n="trash" s=${15} c=${C.danger}/><//>
      <//>`)}
      ${subject.lessons.length===0&&html`<${Empty} icon="book" text="لا دروس بعد" sub="أضف أول درس بالزر بالأعلى"/>`}
    <//>
    <${Modal} open=${addOpen} onClose=${()=>setAddOpen(false)} title="إضافة درس جديد">
      <div style=${{display:"grid",gap:12}}>
        <${Field} value=${newLesson} onChange=${setNewLesson} placeholder="عنوان الدرس…" label="عنوان الدرس"/>
        <${Btn} full=${true} icon="plus" onClick=${addLesson}>إضافة الدرس<//>
      <//>
    <//>
    <${Confirm} open=${delOpen} onClose=${()=>setDelOpen(false)} danger=${true} title="حذف المادة؟" message=${"سيتم حذف مادة «"+subject.name+"» وكل دروسها. لا يمكن التراجع."} confirmText="حذف المادة" onConfirm=${()=>{setDelOpen(false);onDelete();}}/>
  <//>`;
}

function DevBlock({ title, items, icon, color }){
  if(!items||!items.length) return null;
  return html`<div style=${{marginBottom:14}}>
    <div style=${{display:"flex",alignItems:"center",gap:7,marginBottom:7}}><${Icon} n=${icon} s=${15} c=${color}/><b style=${{fontSize:13.5,color:color,fontFamily:"Cairo"}}>${title}<//><//>
    <div style=${{display:"grid",gap:6}}>${items.map((it,i)=>html`<div key=${i} style=${{fontSize:13,color:C.ink,lineHeight:1.6,background:C.bg2,padding:"9px 12px",borderRadius:12}}>${it}<//>`)}<//>
  <//>`;
}
function ScheduleEditor({ schedule, onChange }){
  const upd=(i,patch)=>onChange(schedule.map((s,j)=>j===i?Object.assign({},s,patch):s));
  const cycleType=(i)=>{ const idx=SEG_TYPES.indexOf(schedule[i].type); upd(i,{type:SEG_TYPES[(idx+1)%SEG_TYPES.length]}); };
  const move=(i,d)=>{ const j=i+d; if(j<0||j>=schedule.length)return; const arr=schedule.slice(); const t=arr[i];arr[i]=arr[j];arr[j]=t; onChange(arr); };
  const del=(i)=>onChange(schedule.filter((_,j)=>j!==i));
  const add=()=>onChange([...schedule,{title:"مرحلة جديدة",minutes:10,type:"explain"}]);
  return html`<div style=${{display:"grid",gap:8}}>
    ${schedule.map((seg,i)=>{const col=SEG_COLORS[seg.type]||C.green;return html`<div key=${i} style=${{border:"1px solid "+C.line,borderRadius:14,padding:10}}>
      <div style=${{display:"flex",alignItems:"center",gap:7,marginBottom:8,flexWrap:"wrap"}}>
        <button onClick=${()=>cycleType(i)} style=${{display:"flex",alignItems:"center",gap:5,background:col+"22",color:col,border:"none",borderRadius:10,padding:"6px 10px",fontFamily:"Tajawal",fontWeight:800,fontSize:11.5,cursor:"pointer"}}><${Icon} n=${SEG_ICON[seg.type]} s=${14} c=${col}/> ${SEG_LABEL[seg.type]}<//>
        <input value=${seg.minutes} type="number" onChange=${e=>upd(i,{minutes:+e.target.value||0})} style=${{width:58,padding:"7px",textAlign:"center",border:"1.5px solid "+C.line,borderRadius:10,fontFamily:"Tajawal",fontSize:13}}/>
        <span style=${{fontSize:11,color:C.sub}}>د<//>
        <div style=${{flex:1}}/>
        <button className="mq-icon-sm" onClick=${()=>move(i,-1)}><${Icon} n="chevU" s=${15} c=${C.sub}/><//>
        <button className="mq-icon-sm" onClick=${()=>move(i,1)}><${Icon} n="chevD" s=${15} c=${C.sub}/><//>
        <button className="mq-icon-sm" onClick=${()=>del(i)}><${Icon} n="trash" s=${14} c=${C.danger}/><//>
      <//>
      <input value=${seg.title} onChange=${e=>upd(i,{title:e.target.value})} placeholder="عنوان المرحلة" style=${{width:"100%",padding:"9px 11px",border:"1.5px solid "+C.line,borderRadius:11,fontFamily:"Tajawal",fontSize:13.5,color:C.ink}}/>
      <div style=${{display:"flex",alignItems:"flex-start",gap:6,marginTop:7}}>
        <${Icon} n="bulb" s=${14} c=${C.gold}/>
        <textarea value=${seg.note||""} onChange=${e=>upd(i,{note:e.target.value})} rows=${2} placeholder="نصيحة لتقديم هذه المرحلة (اختياري)…" style=${{flex:1,padding:"7px 9px",border:"1px dashed "+C.line,borderRadius:10,fontFamily:"Tajawal",fontSize:12.5,color:C.sub,resize:"vertical",lineHeight:1.6,background:"#fffdf7"}}/>
      <//>
    <//>`;})}
    <${Btn} full=${true} variant="soft" icon="plus" onClick=${add}>أضف مرحلة<//>
  <//>`;
}

function LessonScreen({ subject, lesson, onBack, update, notify, openLive }){
  const [content,setContent]=useState(lesson.content||"");
  const [summary,setSummary]=useState(lesson.summary||"");
  const [dev,setDev]=useState(lesson.dev||null);
  const [tree,setTree]=useState(lesson.tree||null);
  const [schedule,setSchedule]=useState(lesson.schedule||null);
  const [schedTips,setSchedTips]=useState(lesson.scheduleTips||[]);
  const [checklist,setChecklist]=useState(lesson.checklist||[]);
  const [exams,setExams]=useState(lesson.exams||null);
  const [busy,setBusy]=useState("");
  const [importOpen,setImportOpen]=useState(false); const [imp,setImp]=useState("");
  const [sel,setSel]=useState(""); const [improve,setImprove]=useState(null);
  const [newChk,setNewChk]=useState("");
  const [liveOn,setLiveOn]=useState(true); const [sugg,setSugg]=useState(null); const [suggBusy,setSuggBusy]=useState(false);
  const [fsOpen,setFsOpen]=useState(false);
  const taRef=useRef(null); const lastRef=useRef("");
  const persist=(patch)=>update(Object.assign({},lesson,{content,summary,dev,tree,schedule,scheduleTips:schedTips,checklist,exams},patch));
  const hasKey=()=>{ const c=loadSettings(); return !!(c.keys&&c.keys[c.provider]); };

  useEffect(()=>{
    if(!liveOn||!hasKey()) return;
    const txt=content.trim();
    if(txt.length<45||txt===lastRef.current) return;
    const t=setTimeout(async()=>{
      lastRef.current=txt;
      const paras=txt.split(/\n\s*\n/); const last=(paras[paras.length-1]||"").trim();
      if(last.length<20) return;
      try{ setSuggBusy(true); const r=await callAI('اقترح صياغة محسّنة وأكثر تشويقًا لهذه الفقرة من درس للأطفال (أعد الفقرة المحسّنة فقط دون مقدمات):\n"'+last+'"',"أنت مساعد كتابة تربوي للأطفال. حسّن الوضوح والتشويق بإيجاز."); if(r) setSugg({target:last,text:r}); }catch(e){} setSuggBusy(false);
    },3200);
    return ()=>clearTimeout(t);
  },[content,liveOn]);
  const acceptSugg=()=>{ if(!sugg)return; const nc=content.indexOf(sugg.target)>=0?content.replace(sugg.target,sugg.text):content+"\n\n"+sugg.text; setContent(nc); persist({content:nc}); setSugg(null); };
  const otherSugg=async()=>{ if(!sugg)return; setSuggBusy(true); try{ const r=await callAI('اقترح صياغة بديلة محسّنة لهذه الفقرة من درس للأطفال (أعد الفقرة فقط):\n"'+sugg.target+'"',"أنت مساعد كتابة تربوي للأطفال. قدّم بديلًا مختلفًا."); if(r) setSugg({target:sugg.target,text:r}); }catch(e){ notify(e.message); } setSuggBusy(false); };

  const doSuggest=async()=>{ setBusy("suggest"); try{ const r=await callAI('جهّز درسًا متكاملًا بعنوان "'+lesson.title+'" في مادة '+subject.name+' لأطفال 6-13 سنة، مستندًا إلى أمهات الكتب المعتمدة وبأسلوب مبسّط ومحبّب. نظّمه: تمهيد، الفكرة الأساسية، شرح مبسّط بأمثلة من واقع الطفل، خاتمة وتطبيق عملي.',"أنت معلّم تربية إسلامية خبير. اعتمد على المصادر الموثوقة وبسّطها للأطفال."); setContent(r); persist({content:r}); notify("تم تجهيز مسودة الدرس ✓"); }catch(e){ notify(e.message); } setBusy(""); };
  const doSummary=async()=>{ if(!content.trim())return notify("اكتب محتوى الدرس أولًا"); setBusy("summary"); try{ const r=await callAI("لخّص هذا الدرس في 4-6 نقاط واضحة تصلح كمخطط للمعلّم:\n\n"+content,"أنت معلّم خبير في تبسيط الدروس للأطفال."); setSummary(r); persist({summary:r}); }catch(e){ notify(e.message); } setBusy(""); };
  const doDevelop=async()=>{ if(!content.trim())return notify("اكتب محتوى الدرس أولًا"); setBusy("dev"); try{ const r=await callAI('حلّل درس "'+lesson.title+'" لأطفال 6-13. المحتوى:\n'+content+'\n\nأعد JSON: {"activities":["نشاط"],"coloring":["تلوين"],"drawing":["رسم/تصوير"],"methods":["طريقة حديثة"],"questions":["سؤال"]} كل قائمة 3 عناصر.',"أنت خبير أحدث طرق تعليم الأطفال.",true); if(r){ setDev(r); persist({dev:r}); } else notify("تعذّر التطوير"); }catch(e){ notify(e.message); } setBusy(""); };
  const doTree=async()=>{ setBusy("tree"); try{ const r=await callAI('حوّل درس "'+lesson.title+'" إلى تشجير بصري هرمي (خريطة ذهنية). أعد JSON: {"title":"الفكرة المركزية","children":[{"title":"فرع","children":[{"title":"نقطة"}]}]} بحد أقصى 4 فروع وتحت كل فرع 2-4 نقاط. المحتوى:\n'+(content||lesson.title),"أنت خبير تنظيم المحتوى التعليمي بصريًا.",true); if(r&&r.title){ setTree(r); persist({tree:r}); notify("تم إنشاء التشجير ✓"); } else notify("تعذّر التشجير، حاول مرة أخرى"); }catch(e){ notify(e.message); } setBusy(""); };
  const doSchedule=async()=>{ setBusy("sched"); try{ const body=(content&&content.trim().length>40)?content.slice(0,4000):(summary||lesson.title); const r=await callAI('أنت خبير إدارة حلقات الأطفال وفق أحدث طرق إدارة المحتوى التعليمي. اقرأ محتوى الدرس التالي وحوّله إلى «خريطة رحلة زمنية» للحلقة: قسّم المحتوى نفسه إلى مراحل صغيرة مترابطة مبنية على فقراته وأفكاره الفعلية، وأدرج الاستراحات والانتقالات الحركية في أماكنها المناسبة لتلائم تركيز أطفال 6-13 سنة. لكل مرحلة: عنوان مرتبط بجزء فعلي من المحتوى، الزمن بالدقائق، النوع، و«note» نصيحة عملية موجزة لكيفية تقديم هذه المرحلة. المدة الكلية 90-120 دقيقة وتشمل افتتاحًا ومراجعة وشرحًا مجزّأً وأنشطة واستراحة وتقويمًا وخاتمة.\n\nمحتوى الدرس:\n'+body+'\n\nأعد JSON فقط: {"segments":[{"title":"...","minutes":10,"type":"open|review|explain|activity|break|quiz|free","note":"نصيحة"}],"tips":["نصيحة عامة لإدارة الحلقة"]} مع 3-4 نصائح عامة في tips.',"أنت خبير تربوي في إدارة حلقات الأطفال وتقسيم المحتوى التعليمي.",true); const segs=(r&&r.segments&&r.segments.length)?r.segments:DEFAULT_SCHEDULE; const tips=(r&&Array.isArray(r.tips))?r.tips:[]; setSchedule(segs); setSchedTips(tips); persist({schedule:segs,scheduleTips:tips}); notify("تم تحليل الدرس وبناء خريطة الرحلة — يمكنك تعديلها ✓"); }catch(e){ if(!schedule){ setSchedule(DEFAULT_SCHEDULE); persist({schedule:DEFAULT_SCHEDULE}); } notify(e.message); } setBusy(""); };
  const doChecklist=async()=>{ setBusy("chk"); try{ const r=await callAI('استخرج قائمة تحقق من 5-8 بنود لما يجب إنجازه أثناء شرح درس "'+lesson.title+'" للأطفال. أعد مصفوفة نصوص JSON قصيرة.',"أنت معلّم منظّم.",true); if(Array.isArray(r)){ const cl=r.map(t=>({id:rid(),text:t,done:false})); setChecklist(cl); persist({checklist:cl}); notify("تم إنشاء قائمة التحقق ✓"); } else notify("تعذّر الإنشاء"); }catch(e){ notify(e.message); } setBusy(""); };
  const doExams=async()=>{ setBusy("exam"); try{ const r=await callAI('أنشئ خطة أسبوعية من الأسئلة والتمارين تخدم درس "'+lesson.title+'" للأطفال 6-13، بافتراض أن يوم المحاضرة هو الجمعة. الجمعة=أسئلة تفاعلية أثناء الحلقة، وباقي الأيام مراجعة/واجب بسيط ومرح. أعد JSON: {"week":[{"day":"الجمعة","focus":"...","items":["سؤال/نشاط"]}]} سبعة أيام.',"أنت خبير تقويم تربوي للأطفال.",true); if(r&&r.week){ setExams(r); persist({exams:r}); notify("تم إنشاء الأسئلة الأسبوعية ✓"); } else notify("تعذّر الإنشاء"); }catch(e){ notify(e.message); } setBusy(""); };
  const doImport=()=>{ if(!imp.trim())return; const nc=(content?content+"\n":"")+imp.trim(); setContent(nc); persist({content:nc}); setImp(""); setImportOpen(false); notify("تم استيراد المحتوى ✓"); };

  const captureSel=()=>{ const ta=taRef.current; if(!ta)return; const s=content.substring(ta.selectionStart,ta.selectionEnd).trim(); setSel(s.length>3?s:""); };
  const improveSel=async()=>{ if(!sel)return; setBusy("improve"); try{ const r=await callAI('طوّر هذه الفقرة لتكون أوضح وأكثر تشويقًا مع مثال محسوس:\n"'+sel+'"',"أنت محرّر محتوى تربوي للأطفال."); setImprove(r); }catch(e){ notify(e.message); } setBusy(""); };
  const applyImprove=()=>{ const nc=content.replace(sel,improve); setContent(nc); persist({content:nc}); setImprove(null); setSel(""); };
  const toggleChk=(id)=>{ const cl=checklist.map(c=>c.id===id?Object.assign({},c,{done:!c.done}):c); setChecklist(cl); persist({checklist:cl}); };
  const addChk=()=>{ if(!newChk.trim())return; const cl=[...checklist,{id:rid(),text:newChk.trim(),done:false}]; setChecklist(cl); persist({checklist:cl}); setNewChk(""); };
  const delChk=(id)=>{ const cl=checklist.filter(c=>c.id!==id); setChecklist(cl); persist({checklist:cl}); };
  const setSchedAndSave=(s)=>{ setSchedule(s); persist({schedule:s}); };
  const startLive=()=>{ const segs=schedule||DEFAULT_SCHEDULE; if(!schedule){ setSchedule(segs); persist({schedule:segs}); } openLive(); };
  const setContentSave=(v)=>{ setContent(v); };

  return html`<div className="mq-screen">
    <${Header} title=${lesson.title} onBack=${onBack} sub=${subject.name}/>
    ${!lesson.prepared&&html`<button className="mq-mark-done" onClick=${()=>{update(Object.assign({},lesson,{prepared:true,content,summary,dev,tree,schedule,scheduleTips:schedTips,checklist,exams}));notify("تم تعليم الدرس كجاهز ✓");}}><${Icon} n="check" s=${17} c=${C.green}/> وضع علامة "تم التحضير"<//>`}

    <button className="mq-card" onClick=${startLive} style=${{display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer",width:"100%",background:"linear-gradient(135deg,"+C.blueDp+","+C.blue+")",color:"#fff",border:"none",marginBottom:14}}>
      <div style=${{display:"flex",alignItems:"center",gap:12}}>
        <div className="mq-mini-ic" style=${{background:"rgba(255,255,255,.22)"}}><${Icon} n="play" s=${22} c="#fff"/><//>
        <div style=${{textAlign:"right"}}><b style=${{fontFamily:"Cairo",fontSize:16}}>بدء وقت المحاضرة<//><p style=${{margin:"2px 0 0",fontSize:12.5,opacity:.9}}>رحلة زمنية موجّهة عبر مراحل الحلقة<//><//>
      <//>
      <${Icon} n="chevL" s=${20} c="#fff"/>
    <//>

    <div className="mq-card" style=${{marginBottom:14}}>
      <div style=${{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><${Icon} n="bot" s=${18} c=${C.green}/><h3 style=${{fontFamily:"Cairo",margin:0,fontSize:16,color:C.ink}}>أدوات الذكاء الاصطناعي<//><//>
      <div className="mq-ai-actions">
        <${ToolBtn} icon="spark" color=${C.green} label="تجهيز الدرس من أمهات الكتب" onClick=${doSuggest} disabled=${!!busy}/>
        <${ToolBtn} icon="list" color=${C.blue} label="تلخيص المحتوى" onClick=${doSummary} disabled=${!!busy}/>
        <${ToolBtn} icon="bulb" color=${C.gold} label="أنشطة وأفكار بصرية" onClick=${doDevelop} disabled=${!!busy}/>
        <${ToolBtn} icon="target" color=${C.greenLt} label="تشجير بصري للمحتوى" onClick=${doTree} disabled=${!!busy}/>
        <${ToolBtn} icon="clock" color=${C.blueDp} label="جدول زمني بتحليل الدرس" onClick=${doSchedule} disabled=${!!busy}/>
        <${ToolBtn} icon="checkc" color=${C.leaf} label="قائمة تحقق أثناء الشرح" onClick=${doChecklist} disabled=${!!busy}/>
        <${ToolBtn} icon="award" color=${C.amber} label="أسئلة وامتحان أسبوعي" onClick=${doExams} disabled=${!!busy}/>
        <${ToolBtn} icon="link" color=${C.blueLt} label="استيراد محتوى" onClick=${()=>setImportOpen(true)} disabled=${!!busy}/>
      <//>
      ${busy&&busy!=="improve"&&html`<${Loading} text="جارٍ التنفيذ بالذكاء الاصطناعي…"/>`}
    <//>

    <div className="mq-card" style=${{marginBottom:14}}>
      <div style=${{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,flexWrap:"wrap",gap:8}}>
        <div style=${{display:"flex",alignItems:"center",gap:8}}><${Icon} n="edit" s=${18} c=${C.ink}/><h3 style=${{fontFamily:"Cairo",margin:0,fontSize:16,color:C.ink}}>محتوى الدرس<//><//>
        <div style=${{display:"flex",gap:7}}>
          <button className="mq-link-btn" onClick=${()=>setFsOpen(true)}><${Icon} n="expand" s=${13} c=${C.green}/> ملء الشاشة<//>
          <button className="mq-toggle-mini" onClick=${()=>setLiveOn(!liveOn)} style=${{display:"flex",alignItems:"center",gap:6,background:liveOn?"rgba(14,124,102,.1)":C.bg2,color:liveOn?C.green:C.sub,border:"none",borderRadius:20,padding:"6px 11px",fontFamily:"Tajawal",fontWeight:700,fontSize:11.5,cursor:"pointer"}}><${Icon} n="spark" s=${13} c=${liveOn?C.green:C.sub}/> المساعد ${liveOn?"مفعّل":"متوقف"}<//>
        <//>
      <//>
      <textarea ref=${taRef} className="mq-input" rows=${13} value=${content} onChange=${e=>setContent(e.target.value)} onBlur=${()=>persist({content})} onMouseUp=${captureSel} onTouchEnd=${captureSel} placeholder="اكتب محتوى الدرس هنا، أو استخدم «تجهيز الدرس» أعلاه. للمساحة الأكبر اضغط «ملء الشاشة». المساعد يقترح تحسينات أثناء كتابتك." style=${{resize:"vertical",lineHeight:2,fontSize:15.5,minHeight:280}}/>
      ${sel&&html`<div style=${{marginTop:8}}><${Btn} size="sm" icon="spark" variant="soft" onClick=${improveSel}>طوّر الجزء المحدّد<//><//>`}
      ${busy==="improve"&&html`<${Loading} text="جارٍ تطوير الجزء المحدّد…"/>`}
      ${improve&&html`<div className="mq-improve-box">
        <span style=${{fontSize:11,fontWeight:800,color:C.green}}>اقتراح مطوّر:<//>
        <p style=${{fontSize:13.5,color:C.ink,lineHeight:1.7,margin:"6px 0 10px"}}>${improve}<//>
        <div style=${{display:"flex",gap:8}}><${Btn} size="sm" icon="check" onClick=${applyImprove}>استبدال<//><${Btn} size="sm" variant="soft" onClick=${()=>setImprove(null)}>تجاهل<//><//>
      <//>`}
      ${suggBusy&&!sugg&&html`<div style=${{display:"flex",gap:8,alignItems:"center",color:C.sub,fontSize:12,marginTop:10}}><span className="mq-spin" style=${{display:"flex"}}><${Icon} n="loader" s=${14} c=${C.sub}/><//> المساعد يفكّر…<//>`}
      ${sugg&&html`<div className="mq-improve-box" style=${{borderColor:"rgba(46,134,193,.3)",background:"rgba(46,134,193,.06)"}}>
        <div style=${{display:"flex",alignItems:"center",gap:6,marginBottom:6}}><${Icon} n="spark" s=${13} c=${C.blue}/><span style=${{fontSize:11,fontWeight:800,color:C.blue}}>اقتراح المساعد لتطوير آخر فقرة:<//><//>
        <p style=${{fontSize:13.5,color:C.ink,lineHeight:1.7,margin:"0 0 10px"}}>${sugg.text}<//>
        <div style=${{display:"flex",gap:8,flexWrap:"wrap"}}>
          <${Btn} size="sm" icon="check" onClick=${acceptSugg}>مناسب — أدرجه<//>
          <${Btn} size="sm" variant="soft" icon="spark" onClick=${otherSugg} disabled=${suggBusy}>اقترح غيره<//>
          <${Btn} size="sm" variant="ghost" onClick=${()=>setSugg(null)}>تجاهل<//>
        <//>
      <//>`}
    <//>

    ${tree&&html`<div className="mq-card" style=${{marginBottom:14,borderRight:"4px solid "+C.green}}>
      <div style=${{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div style=${{display:"flex",alignItems:"center",gap:8}}><${Icon} n="target" s=${17} c=${C.green}/><b style=${{fontFamily:"Cairo",fontSize:15,color:C.ink}}>التشجير البصري<//><${AIBadge}/><//>
        <button className="mq-icon-sm" onClick=${()=>{setTree(null);persist({tree:null});}}><${Icon} n="trash" s=${15} c=${C.danger}/><//>
      <//>
      <div style=${{overflowX:"auto"}}><${TreeNode} node=${tree} depth=${0}/><//>
    <//>`}

    ${summary&&html`<div className="mq-card" style=${{marginBottom:14,borderRight:"4px solid "+C.blue}}>
      <div style=${{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><${Icon} n="list" s=${17} c=${C.blue}/><b style=${{fontFamily:"Cairo",fontSize:15,color:C.ink}}>ملخّص الدرس<//><${AIBadge}/><//>
      <div style=${{fontSize:14,color:C.ink,lineHeight:1.9,whiteSpace:"pre-wrap"}}>${summary}<//>
    <//>`}

    ${dev&&html`<div className="mq-card" style=${{marginBottom:14,borderRight:"4px solid "+C.gold}}>
      <div style=${{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><${Icon} n="bulb" s=${17} c=${C.gold}/><b style=${{fontFamily:"Cairo",fontSize:15,color:C.ink}}>أفكار وأنشطة مقترحة<//><${AIBadge}/><//>
      <${DevBlock} title="أنشطة تفاعلية" items=${dev.activities} icon="play" color=${C.green}/>
      <${DevBlock} title="أفكار تلوين" items=${dev.coloring} icon="palette" color=${C.gold}/>
      <${DevBlock} title="رسم وتصوير" items=${dev.drawing} icon="cam" color=${C.blue}/>
      <${DevBlock} title="طرق تدريس حديثة" items=${dev.methods} icon="pulse" color=${C.greenLt}/>
      <${DevBlock} title="أسئلة تفاعلية" items=${dev.questions} icon="msg" color=${C.blueDp}/>
    <//>`}

    ${schedule&&html`<div className="mq-card" style=${{marginBottom:14,borderRight:"4px solid "+C.blueDp}}>
      <div style=${{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div style=${{display:"flex",alignItems:"center",gap:8}}><${Icon} n="clock" s=${17} c=${C.blueDp}/><b style=${{fontFamily:"Cairo",fontSize:15,color:C.ink}}>جدول المحاضرة (قابل للتعديل)<//><//>
        <span style=${{fontSize:12,color:C.sub,fontWeight:700}}>${schedule.reduce((s,x)=>s+(+x.minutes||0),0)} دقيقة<//>
      <//>
      <${ScheduleEditor} schedule=${schedule} onChange=${setSchedAndSave}/>
      ${schedTips&&schedTips.length>0&&html`<div style=${{marginTop:12,background:"rgba(224,169,46,.08)",border:"1px solid rgba(224,169,46,.3)",borderRadius:14,padding:"12px 13px"}}>
        <div style=${{display:"flex",alignItems:"center",gap:7,marginBottom:8}}><${Icon} n="bulb" s=${16} c=${C.gold}/><b style=${{fontFamily:"Cairo",fontSize:13.5,color:"#8a6d00"}}>نصائح إدارة الحلقة<//><//>
        <ul style=${{margin:0,paddingRight:17,display:"grid",gap:6}}>${schedTips.map((t,i)=>html`<li key=${i} style=${{fontSize:12.5,color:C.ink,lineHeight:1.7}}>${t}<//>`)}<//>
      <//>`}
      <div style=${{marginTop:12}}><${Btn} full=${true} icon="play" onClick=${startLive}>ابدأ المحاضرة الآن<//><//>
    <//>`}

    ${checklist.length>0&&html`<div className="mq-card" style=${{marginBottom:14,borderRight:"4px solid "+C.leaf}}>
      <div style=${{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><${Icon} n="checkc" s=${17} c=${C.leaf}/><b style=${{fontFamily:"Cairo",fontSize:15,color:C.ink}}>قائمة التحقق أثناء الشرح<//><//>
      <div style=${{display:"grid",gap:8}}>
        ${checklist.map(c=>html`<div key=${c.id} style=${{display:"flex",alignItems:"center",gap:10}}>
          <button onClick=${()=>toggleChk(c.id)} style=${{background:"none",border:"none",cursor:"pointer",padding:0,display:"flex"}}><${Icon} n=${c.done?"checkc":"circle"} s=${22} c=${c.done?C.green:C.line}/><//>
          <span style=${{flex:1,fontSize:13.5,color:c.done?C.sub:C.ink,textDecoration:c.done?"line-through":"none"}}>${c.text}<//>
          <button className="mq-icon-sm" onClick=${()=>delChk(c.id)}><${Icon} n="x" s=${14} c=${C.danger}/><//>
        <//>`)}
      <//>
      <div style=${{display:"flex",gap:8,marginTop:10}}>
        <input className="mq-input" value=${newChk} onChange=${e=>setNewChk(e.target.value)} placeholder="أضف بندًا…" style=${{flex:1}}/>
        <${Btn} size="sm" icon="plus" onClick=${addChk}>إضافة<//>
      <//>
    <//>`}

    ${exams&&exams.week&&html`<div className="mq-card" style=${{marginBottom:14,borderRight:"4px solid "+C.amber}}>
      <div style=${{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><${Icon} n="award" s=${17} c=${C.amber}/><b style=${{fontFamily:"Cairo",fontSize:15,color:C.ink}}>الأسئلة والامتحان الأسبوعي<//><${AIBadge}/><//>
      <div style=${{display:"grid",gap:10}}>
        ${exams.week.map((d,i)=>{const isFri=d.day&&d.day.indexOf("جمعة")>=0;return html`<div key=${i} style=${{background:isFri?"rgba(224,169,46,.1)":C.bg2,border:isFri?"1.5px solid "+C.amber:"none",borderRadius:14,padding:"11px 13px"}}>
          <div style=${{display:"flex",alignItems:"center",gap:7,marginBottom:6}}><b style=${{fontFamily:"Cairo",fontSize:14,color:isFri?C.amber:C.ink}}>${d.day}<//>${isFri&&html`<span style=${{fontSize:10,fontWeight:800,color:"#fff",background:C.amber,padding:"2px 7px",borderRadius:10}}>يوم المحاضرة<//>`}<//>
          ${d.focus&&html`<p style=${{fontSize:11.5,color:C.sub,margin:"0 0 6px"}}>${d.focus}<//>`}
          <ul style=${{margin:0,paddingRight:16,display:"grid",gap:4}}>${(d.items||[]).map((it,j)=>html`<li key=${j} style=${{fontSize:12.5,color:C.ink,lineHeight:1.6}}>${it}<//>`)}<//>
        <//>`;})}
      <//>
    <//>`}

    <${Modal} open=${importOpen} onClose=${()=>setImportOpen(false)} title="استيراد محتوى الدرس">
      <p style=${{fontSize:13,color:C.sub,lineHeight:1.7,marginTop:0}}>الصق رابطًا أو نصًا من أي مصدر (Notion، GitHub، واتساب).<//>
      <div style=${{display:"grid",gap:10}}><${Field} area=${true} rows=${4} value=${imp} onChange=${setImp} placeholder="الصق هنا…"/><${Btn} full=${true} icon="send" onClick=${doImport}>استيراد<//><//>
    <//>
    <${FsEditor} open=${fsOpen} value=${content} onChange=${setContentSave} onClose=${()=>{persist({content});setFsOpen(false);}} title=${lesson.title}/>
  <//>`;
}

function LiveSession({ subject, lesson, onBack, update, notify }){
  const segs=(lesson.schedule&&lesson.schedule.length)?lesson.schedule:DEFAULT_SCHEDULE;
  const tips=lesson.scheduleTips||[];
  const [idx,setIdx]=useState(0);
  const [secs,setSecs]=useState((+segs[0].minutes||10)*60);
  const [running,setRunning]=useState(false);
  const [checklist,setChecklist]=useState(lesson.checklist||[]);
  useEffect(()=>{ setSecs((+segs[idx].minutes||10)*60); setRunning(false); },[idx]);
  useEffect(()=>{ if(!running) return; const t=setInterval(()=>setSecs(s=>s>0?s-1:0),1000); return ()=>clearInterval(t); },[running]);
  const toggleChk=(id)=>{ const cl=checklist.map(c=>c.id===id?Object.assign({},c,{done:!c.done}):c); setChecklist(cl); update(Object.assign({},lesson,{checklist:cl})); };
  const mm=String(Math.floor(secs/60)).padStart(2,"0"), ss=String(secs%60).padStart(2,"0");
  const totalMin=segs.reduce((s,x)=>s+(+x.minutes||0),0);
  const cur=segs[idx]; const color=SEG_COLORS[cur.type]||C.green;
  const pct=Math.round(((idx)/segs.length)*100); const last=idx>=segs.length-1;
  const doneChk=checklist.filter(c=>c.done).length;
  return html`<div className="mq-screen">
    <${Header} title="وقت المحاضرة" onBack=${onBack} sub=${lesson.title+" · "+totalMin+" دقيقة"}/>
    <div style=${{marginBottom:14}}>
      <div style=${{display:"flex",justifyContent:"space-between",fontSize:12,color:C.sub,marginBottom:6}}><span>المرحلة ${idx+1} من ${segs.length}<//><span>${pct}% من الرحلة<//><//>
      <div className="mq-bar-bg"><div className="mq-bar-fill" style=${{width:pct+"%",background:C.green}}/><//>
    <//>
    <div className="mq-card" style=${{background:"linear-gradient(135deg,"+color+","+color+"cc)",color:"#fff",marginBottom:14,textAlign:"center"}}>
      <span style=${{fontSize:12,opacity:.9,fontWeight:700}}>${SEG_LABEL[cur.type]||""} · المرحلة ${idx+1}<//>
      <h3 style=${{fontFamily:"Cairo",fontSize:19,margin:"6px 0 10px"}}>${cur.title}<//>
      <div style=${{fontFamily:"Cairo",fontSize:46,fontWeight:800,letterSpacing:2,direction:"ltr"}}>${mm}:${ss}<//>
      <div style=${{display:"flex",gap:10,justifyContent:"center",marginTop:14}}>
        <button onClick=${()=>setRunning(!running)} style=${{background:"#fff",color:color,border:"none",borderRadius:14,padding:"11px 22px",fontFamily:"Tajawal",fontWeight:800,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",gap:7}}><${Icon} n=${running?"clock":"play"} s=${17} c=${color}/> ${running?"إيقاف مؤقت":"تشغيل المؤقّت"}<//>
        <button onClick=${()=>{setSecs((+cur.minutes||10)*60);setRunning(false);}} style=${{background:"rgba(255,255,255,.22)",color:"#fff",border:"none",borderRadius:14,padding:"11px 16px",fontFamily:"Tajawal",fontWeight:700,fontSize:14,cursor:"pointer"}}>تصفير<//>
      <//>
    <//>
    <div style=${{display:"flex",gap:10,marginBottom:16}}>
      <${Btn} full=${true} variant="soft" icon="chevR" onClick=${()=>setIdx(Math.max(0,idx-1))} disabled=${idx===0}>السابق<//>
      ${last?html`<${Btn} full=${true} icon="check" onClick=${()=>{notify("أحسنت! انتهت المحاضرة 🎉");onBack();}}>إنهاء المحاضرة<//>`:html`<${Btn} full=${true} icon="chevL" onClick=${()=>setIdx(Math.min(segs.length-1,idx+1))}>المرحلة التالية<//>`}
    <//>
    ${cur.note&&html`<div className="mq-card" style=${{marginBottom:14,borderRight:"4px solid "+C.gold,display:"flex",gap:10,alignItems:"flex-start"}}>
      <${Icon} n="bulb" s=${18} c=${C.gold}/>
      <div><b style=${{fontFamily:"Cairo",fontSize:13.5,color:C.gold,display:"block",marginBottom:3}}>نصيحة لهذه المرحلة<//><p style=${{fontSize:13.5,color:C.ink,lineHeight:1.8,margin:0}}>${cur.note}<//><//>
    <//>`}
    <div className="mq-card" style=${{marginBottom:14}}>
      <b style=${{fontFamily:"Cairo",fontSize:15,color:C.ink,display:"block",marginBottom:12}}>خريطة الرحلة<//>
      <div style=${{display:"grid",gap:2}}>
        ${segs.map((seg,i)=>{const sc=SEG_COLORS[seg.type]||C.green;const stt=i<idx?"past":i===idx?"now":"next";return html`<button key=${i} onClick=${()=>setIdx(i)} style=${{display:"flex",alignItems:"center",gap:11,background:i===idx?sc+"14":"none",border:"none",borderRadius:12,padding:"9px 8px",cursor:"pointer",textAlign:"right",width:"100%"}}>
          <div style=${{width:26,height:26,borderRadius:"50%",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",background:stt==="past"?C.green:stt==="now"?sc:"#fff",border:"2px solid "+(stt==="next"?C.line:stt==="now"?sc:C.green)}}>${stt==="past"?html`<${Icon} n="check" s=${14} c="#fff"/>`:html`<span style=${{fontSize:11,fontWeight:800,color:stt==="now"?"#fff":C.sub}}>${i+1}<//>`}<//>
          <div style=${{flex:1}}><b style=${{fontSize:13,color:stt==="next"?C.sub:C.ink,fontFamily:"Cairo"}}>${seg.title}<//>${seg.note&&i===idx?html`<p style=${{margin:"2px 0 0",fontSize:11,color:C.sub,lineHeight:1.5}}>${seg.note}<//>`:""}<//>
          <span style=${{fontSize:11.5,color:C.sub,fontWeight:700}}>${seg.minutes} د<//>
        <//>`;})}
      <//>
    <//>
    ${tips.length>0&&html`<div className="mq-card" style=${{marginBottom:14,borderRight:"4px solid "+C.gold}}>
      <div style=${{display:"flex",alignItems:"center",gap:7,marginBottom:10}}><${Icon} n="bulb" s=${17} c=${C.gold}/><b style=${{fontFamily:"Cairo",fontSize:15,color:C.ink}}>نصائح إدارة الحلقة<//><//>
      <ul style=${{margin:0,paddingRight:17,display:"grid",gap:7}}>${tips.map((t,i)=>html`<li key=${i} style=${{fontSize:13,color:C.ink,lineHeight:1.7}}>${t}<//>`)}<//>
    <//>`}
    ${checklist.length>0&&html`<div className="mq-card">
      <div style=${{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><div style=${{display:"flex",alignItems:"center",gap:8}}><${Icon} n="checkc" s=${17} c=${C.leaf}/><b style=${{fontFamily:"Cairo",fontSize:15,color:C.ink}}>قائمة الإنجاز<//><//><span style=${{fontSize:12,color:C.green,fontWeight:800}}>${doneChk}/${checklist.length}<//><//>
      <div style=${{display:"grid",gap:8}}>${checklist.map(c=>html`<button key=${c.id} onClick=${()=>toggleChk(c.id)} style=${{display:"flex",alignItems:"center",gap:10,background:"none",border:"none",cursor:"pointer",padding:0,textAlign:"right",width:"100%"}}><${Icon} n=${c.done?"checkc":"circle"} s=${22} c=${c.done?C.green:C.line}/><span style=${{flex:1,fontSize:13.5,color:c.done?C.sub:C.ink,textDecoration:c.done?"line-through":"none"}}>${c.text}<//><//>`)}<//>
    <//>`}
  <//>`;
}

function NewStudent({ onBack, onSave }){
  const [name,setName]=useState(""); const [age,setAge]=useState("8"); const [photo,setPhoto]=useState(null);
  const pick=async(e)=>{ const f=e.target.files&&e.target.files[0]; if(f) setPhoto(await resizeImage(f)); };
  return html`<div className="mq-screen">
    <${Header} title="إضافة طفل" onBack=${onBack}/>
    <div className="mq-card" style=${{display:"grid",gap:14}}>
      <div style=${{display:"flex",justifyContent:"center"}}><label className="mq-photo-pick">${photo?html`<img src=${photo}/>`:html`<${Icon} n="cam" s=${26} c=${C.sub}/>`}<input type="file" accept="image/*" onChange=${pick} style=${{display:"none"}}/><//><//>
      <${Field} value=${name} onChange=${setName} placeholder="اسم الطفل" label="الاسم" icon="user"/>
      <div>
        <span style=${{fontSize:13,fontWeight:700,color:C.sub,marginBottom:6,display:"block"}}>العمر<//>
        <div style=${{display:"flex",gap:7,flexWrap:"wrap"}}>${[6,7,8,9,10,11,12,13].map(a=>html`<button key=${a} className="mq-age" onClick=${()=>setAge(String(a))} style=${{background:age===String(a)?C.green:C.bg2,color:age===String(a)?"#fff":C.ink}}>${a}<//>`)}<//>
      <//>
      <${Btn} full=${true} icon="check" onClick=${()=>name.trim()&&onSave({id:rid(),name:name.trim(),age,photo,assessments:[]})}>حفظ الطفل<//>
    <//>
  <//>`;
}
function EditStudent({ student, onBack, onSave }){
  const [name,setName]=useState(student.name); const [age,setAge]=useState(student.age); const [photo,setPhoto]=useState(student.photo||null);
  const pick=async(e)=>{ const f=e.target.files&&e.target.files[0]; if(f) setPhoto(await resizeImage(f)); };
  return html`<div className="mq-screen">
    <${Header} title="تعديل بيانات الطفل" onBack=${onBack}/>
    <div className="mq-card" style=${{display:"grid",gap:14}}>
      <div style=${{display:"flex",justifyContent:"center"}}><label className="mq-photo-pick">${photo?html`<img src=${photo}/>`:html`<${Icon} n="cam" s=${26} c=${C.sub}/>`}<input type="file" accept="image/*" onChange=${pick} style=${{display:"none"}}/><//><//>
      <${Field} value=${name} onChange=${setName} placeholder="اسم الطفل" label="الاسم" icon="user"/>
      <div>
        <span style=${{fontSize:13,fontWeight:700,color:C.sub,marginBottom:6,display:"block"}}>العمر<//>
        <div style=${{display:"flex",gap:7,flexWrap:"wrap"}}>${[6,7,8,9,10,11,12,13].map(a=>html`<button key=${a} className="mq-age" onClick=${()=>setAge(String(a))} style=${{background:age===String(a)?C.green:C.bg2,color:age===String(a)?"#fff":C.ink}}>${a}<//>`)}<//>
      <//>
      <${Btn} full=${true} icon="check" onClick=${()=>name.trim()&&onSave(Object.assign({},student,{name:name.trim(),age,photo}))}>حفظ التعديلات<//>
    <//>
  <//>`;
}
function oneOverall(a){ return Math.round(METRICS.reduce((s,m)=>s+(a[m.key]||0),0)/METRICS.length); }
function AssessDetail({ student, a, onBack, onDelete }){
  const ov=oneOverall(a); const lv=levelLabel(ov); const [del,setDel]=useState(false);
  return html`<div className="mq-screen">
    <${Header} title="تقييم مفصّل" onBack=${onBack} sub=${fmtDateTime(a.date)}/>
    <div className="mq-card" style=${{textAlign:"center",marginBottom:14}}>
      <div style=${{position:"relative",display:"inline-block"}}>
        <${Ring} value=${ov} size=${108} stroke=${11} color=${lv.c}/>
        <div className="mq-ring-center"><b style=${{fontSize:28,fontFamily:"Cairo",color:C.ink}}>${ov}<//><span style=${{fontSize:11,color:lv.c,fontWeight:800}}>${lv.t}<//><//>
      <//>
      <p style=${{margin:"8px 0 0",fontSize:12.5,color:C.sub}}>${student.name} · ${fmtDateTime(a.date)}<//>
    <//>
    <div className="mq-card" style=${{marginBottom:14}}>
      <b style=${{fontFamily:"Cairo",fontSize:15,color:C.ink,display:"block",marginBottom:12}}>المستويات في هذا التقييم<//>
      ${METRICS.map(m=>{const v=a[m.key]||0;const ml=levelLabel(v);return html`<div key=${m.key} style=${{marginBottom:13}}>
        <div style=${{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style=${{fontSize:13.5,color:C.ink,fontWeight:700}}>${m.label}<//><span style=${{fontSize:12.5,color:m.color,fontWeight:800}}>${v}% · ${ml.t}<//><//>
        <div className="mq-bar-bg"><div className="mq-bar-fill" style=${{width:v+"%",background:m.color}}/><//>
      <//>`;})}
    <//>
    ${a.note&&html`<div className="mq-card" style=${{marginBottom:14}}><b style=${{fontFamily:"Cairo",fontSize:14,color:C.ink,display:"block",marginBottom:6}}>ملاحظات<//><p style=${{fontSize:13.5,color:C.ink,lineHeight:1.8,margin:0}}>${a.note}<//><//>`}
    <${Btn} full=${true} variant="danger" icon="trash" onClick=${()=>setDel(true)}>حذف هذا التقييم<//>
    <${Confirm} open=${del} onClose=${()=>setDel(false)} danger=${true} title="حذف التقييم؟" message="سيُحذف هذا التقييم فقط، وتبقى باقي التقييمات كما هي." confirmText="حذف" onConfirm=${()=>{setDel(false);onDelete();}}/>
  <//>`;
}
function StudentReport({ student, onBack, onAssess, onEdit, onDelete, onDeleteAssessment }){
  const [tab,setTab]=useState("season");
  const [assessOpen,setAssessOpen]=useState(false);
  const [vals,setVals]=useState(()=>{const o={};METRICS.forEach(m=>o[m.key]=60);return o;});
  const [note,setNote]=useState("");
  const [ai,setAi]=useState(""); const [aiBusy,setAiBusy]=useState(false);
  const [openA,setOpenA]=useState(null);
  const now=Date.now();
  const wd={daily:1,weekly:7,monthly:30,season:99999}[tab];
  const sorted=student.assessments.slice().sort((a,b)=>new Date(b.date)-new Date(a.date));
  const inWin=(a,lo,hi)=>{const d=(now-new Date(a.date))/86400000;return d>lo&&d<=hi;};
  const winList=sorted.filter(a=>(now-new Date(a.date))/86400000<=wd);
  const avgOf=(list,k)=>list.length?Math.round(list.reduce((s,a)=>s+(a[k]||0),0)/list.length):0;
  const averages=METRICS.map(m=>Object.assign({},m,{value:avgOf(winList,m.key)}));
  const overall=winList.length?Math.round(averages.reduce((s,m)=>s+m.value,0)/METRICS.length):0;
  const lv=levelLabel(overall);
  const prevList=tab==="season"?[]:sorted.filter(a=>inWin(a,wd,wd*2));
  const prevOverall=prevList.length?Math.round(METRICS.reduce((s,m)=>s+avgOf(prevList,m.key),0)/METRICS.length):null;
  const delta=(prevOverall!=null&&winList.length)?overall-prevOverall:null;
  const ranked=winList.length?averages.slice().sort((a,b)=>b.value-a.value):[];
  const best=ranked[0], weak=ranked[ranked.length-1];
  const trend=sorted.slice().reverse().slice(-8).map(a=>({val:oneOverall(a)}));
  const save=()=>{ onAssess(Object.assign({id:rid(),date:todayISO(),note},vals)); setAssessOpen(false); setNote(""); const o={};METRICS.forEach(m=>o[m.key]=60);setVals(o); };
  const analyze=async()=>{ setAiBusy(true); try{ const r=await callAI("طفل اسمه "+student.name+" عمره "+student.age+" سنة في حلقة تربية إسلامية. متوسط مستوياته خلال الفترة: "+averages.map(m=>m.label+" "+m.value+"%").join("، ")+(delta!=null?(". التغيّر عن الفترة السابقة: "+(delta>=0?"+":"")+delta+" نقطة"):"")+". اكتب تقريرًا قصيرًا (3-4 جمل) عن حالته مع توصيتين عمليتين بأسلوب تربوي إيجابي.","أنت مرشد تربوي خبير في تقييم الأطفال."); setAi(r); }catch(e){ setAi(e.message); } setAiBusy(false); };
  const deltaColor=delta>0?C.green:delta<0?C.danger:C.sub;
  const deltaTxt=delta==null?"":(delta>0?"▲ +"+delta:delta<0?"▼ "+delta:"= ثابت")+" عن الفترة السابقة";
  const winLabel={daily:"اليوم",weekly:"هذا الأسبوع",monthly:"هذا الشهر",season:"الموسم كله"}[tab];

  if(openA){ const a=student.assessments.find(x=>x===openA)||openA; return html`<${AssessDetail} student=${student} a=${a} onBack=${()=>setOpenA(null)} onDelete=${()=>{onDeleteAssessment(a);setOpenA(null);}}/>`; }
  return html`<div className="mq-screen">
    <${Header} title=${student.name} onBack=${onBack} sub=${student.age+" سنة · "+student.assessments.length+" تقييم"}/>
    <div style=${{display:"flex",gap:8,marginBottom:14}}>
      <${Btn} full=${true} icon="plus" onClick=${()=>setAssessOpen(true)}>تقييم جديد<//>
      <${Btn} variant="soft" icon="edit" onClick=${onEdit}>تعديل<//>
      <${Btn} variant="danger" icon="trash" onClick=${onDelete}>حذف<//>
    <//>
    ${student.assessments.length===0?html`<${Empty} icon="award" text="لا توجد تقييمات بعد" sub="أضف أول تقييم لرؤية التقارير اليومية والأسبوعية والشهرية"/>`:html`<${React.Fragment}>
      <div className="mq-segment">${[["daily","يومي"],["weekly","أسبوعي"],["monthly","شهري"],["season","الموسم"]].map(it=>html`<button key=${it[0]} onClick=${()=>setTab(it[0])} className=${tab===it[0]?"mq-seg-on":""}>${it[1]}<//>`)}<//>

      <div className="mq-card" style=${{marginBottom:14,textAlign:"center"}}>
        <span style=${{fontSize:12,color:C.sub,fontWeight:700}}>النتيجة المجمّعة · ${winLabel}<//>
        <div style=${{position:"relative",display:"inline-block",marginTop:6}}>
          <${Ring} value=${overall} size=${118} stroke=${12} color=${lv.c}/>
          <div className="mq-ring-center"><b style=${{fontSize:30,fontFamily:"Cairo",color:C.ink}}>${overall}<//><span style=${{fontSize:11,color:lv.c,fontWeight:800}}>${lv.t}<//><//>
        <//>
        <p style=${{margin:"8px 0 0",fontSize:12.5,color:C.sub}}>${winList.length} تقييم في الفترة<//>
        ${delta!=null&&html`<p style=${{margin:"4px 0 0",fontSize:12.5,color:deltaColor,fontWeight:800}}>${deltaTxt}<//>`}
        ${best&&best.value>0&&html`<div style=${{display:"flex",gap:8,justifyContent:"center",marginTop:12,flexWrap:"wrap"}}><span style=${{fontSize:11.5,fontWeight:700,color:C.green,background:"rgba(14,124,102,.1)",padding:"5px 11px",borderRadius:20}}>أقوى: ${best.label}<//><span style=${{fontSize:11.5,fontWeight:700,color:C.gold,background:"rgba(224,169,46,.12)",padding:"5px 11px",borderRadius:20}}>يحتاج تطويرًا: ${weak.label}<//><//>`}
      <//>

      ${winList.length>0&&html`<div className="mq-card" style=${{marginBottom:14}}>
        <b style=${{fontFamily:"Cairo",fontSize:15,color:C.ink,display:"block",marginBottom:12}}>متوسط المستويات<//>
        ${averages.map(m=>{const ml=levelLabel(m.value);const pv=prevList.length?avgOf(prevList,m.key):null;const dd=pv!=null?m.value-pv:null;return html`<div key=${m.key} style=${{marginBottom:13}}>
          <div style=${{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style=${{fontSize:13.5,color:C.ink,fontWeight:700}}>${m.label} ${dd!=null&&dd!==0?html`<span style=${{fontSize:11,color:dd>0?C.green:C.danger}}>${dd>0?"▲":"▼"}${Math.abs(dd)}<//>`:""}<//><span style=${{fontSize:12.5,color:m.color,fontWeight:800}}>${m.value}%<//><//>
          <div className="mq-bar-bg"><div className="mq-bar-fill" style=${{width:m.value+"%",background:m.color}}/><//>
        <//>`;})}
      <//>`}

      <div className="mq-card" style=${{marginBottom:14}}>
        <div style=${{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><b style=${{fontFamily:"Cairo",fontSize:15,color:C.ink}}>التقييمات المنفصلة<//><span style=${{fontSize:12,color:C.sub}}>${winList.length} تقييم<//><//>
        ${winList.length===0?html`<p style=${{fontSize:13,color:C.sub,margin:0}}>لا تقييمات في هذه الفترة. غيّر الفترة أو أضف تقييمًا.<//>`:html`<div style=${{display:"grid",gap:8}}>
          ${winList.map((a,i)=>{const ov=oneOverall(a);const ml=levelLabel(ov);return html`<button key=${a.id||i} onClick=${()=>setOpenA(a)} style=${{display:"flex",alignItems:"center",gap:11,background:C.bg2,border:"none",borderRadius:14,padding:"11px 13px",cursor:"pointer",textAlign:"right",width:"100%"}}>
            <div style=${{width:42,height:42,borderRadius:12,background:ml.c+"22",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><b style=${{fontFamily:"Cairo",fontSize:16,color:ml.c}}>${ov}<//><//>
            <div style=${{flex:1}}><b style=${{fontSize:13.5,color:C.ink,fontFamily:"Cairo"}}>${fmtDateTime(a.date)}<//><p style=${{margin:"2px 0 0",fontSize:11.5,color:ml.c,fontWeight:700}}>${ml.t}${a.note?" · يحتوي ملاحظة":""}<//><//>
            <${Icon} n="chevL" s=${17} c=${C.sub}/>
          <//>`;})}
        <//>`}
      <//>

      ${trend.length>1&&html`<div className="mq-card" style=${{marginBottom:14}}><b style=${{fontFamily:"Cairo",fontSize:15,color:C.ink,display:"block",marginBottom:10}}>تطوّر المستوى العام<//><${Spark} data=${trend} color=${C.green}/><//>`}

      <div className="mq-card">
        <div style=${{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><div style=${{display:"flex",alignItems:"center",gap:8}}><${Icon} n="pulse" s=${17} c=${C.green}/><b style=${{fontFamily:"Cairo",fontSize:15,color:C.ink}}>تحليل تربوي ذكي<//><//><${Btn} size="sm" icon="spark" onClick=${analyze} disabled=${aiBusy}>تحليل<//><//>
        ${aiBusy&&html`<${Loading} text="جارٍ التحليل…"/>`}
        ${ai&&html`<p style=${{fontSize:14,color:C.ink,lineHeight:1.9,margin:0,background:C.bg2,padding:14,borderRadius:14}}>${ai}<//>`}
        ${!ai&&!aiBusy&&html`<p style=${{fontSize:13,color:C.sub,margin:0}}>اضغط «تحليل» لتقرير وتوصيات مبنية على المستويات أعلاه.<//>`}
      <//>
    <//>`}
    <${Modal} open=${assessOpen} onClose=${()=>setAssessOpen(false)} title=${"تقييم "+student.name}>
      <p style=${{fontSize:12,color:C.sub,margin:"0 0 12px",lineHeight:1.6}}>كل تقييم يُحفظ منفصلًا ولا يلغي السابق. ✦ ${fmtDate(todayISO())}<//>
      <div style=${{display:"grid",gap:16,maxHeight:"56vh",overflowY:"auto",paddingLeft:4}}>
        ${METRICS.map(m=>html`<div key=${m.key}>
          <div style=${{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}><span style=${{fontSize:14,fontWeight:700,color:C.ink}}>${m.label}<//><span style=${{fontSize:13,fontWeight:800,color:m.color}}>${vals[m.key]}%<//><//>
          <p style=${{fontSize:11,color:C.sub,margin:"0 0 6px"}}>${m.hint}<//>
          <${Slider} value=${vals[m.key]} onChange=${(v)=>setVals(Object.assign({},vals,{[m.key]:v}))} color=${m.color}/>
        <//>`)}
        <${Field} area=${true} rows=${3} value=${note} onChange=${setNote} placeholder="ملاحظات (اختياري)…" label="ملاحظات"/>
        <${Btn} full=${true} icon="check" onClick=${save}>حفظ التقييم<//>
      <//>
    <//>
  <//>`;
}
function AssessmentScreen({ state, update, notify }){
  const [view,setView]=useState("list"); const [active,setActive]=useState(null);
  const students=state.students;
  const addStudent=(st)=>update(Object.assign({},state,{students:[...students,st]}));
  const delStudent=(id)=>update(Object.assign({},state,{students:students.filter(s=>s.id!==id)}));
  const editStudent=(st)=>update(Object.assign({},state,{students:students.map(s=>s.id===st.id?st:s)}));
  const addAssessment=(id,a)=>update(Object.assign({},state,{students:students.map(s=>s.id===id?Object.assign({},s,{assessments:[...s.assessments,a]}):s)}));
  const delAssessment=(id,a)=>update(Object.assign({},state,{students:students.map(s=>s.id===id?Object.assign({},s,{assessments:s.assessments.filter(x=>(a.id?x.id!==a.id:x!==a))}):s)}));
  if(view==="new") return html`<${NewStudent} onBack=${()=>setView("list")} onSave=${(s)=>{addStudent(s);setView("list");notify("تمت إضافة الطفل ✓");}}/>`;
  const st=students.find(s=>s.id===active);
  if(view==="edit"&&st) return html`<${EditStudent} student=${st} onBack=${()=>setView("report")} onSave=${(s)=>{editStudent(s);setView("report");notify("تم تعديل البيانات ✓");}}/>`;
  if(view==="report"&&st) return html`<${StudentReport} student=${st} onBack=${()=>setView("list")} onAssess=${(a)=>{addAssessment(active,a);notify("تم حفظ التقييم ✓");}} onEdit=${()=>setView("edit")} onDelete=${()=>{delStudent(active);setView("list");notify("تم حذف الطفل");}} onDeleteAssessment=${(a)=>{delAssessment(active,a);notify("تم حذف التقييم");}}/>`;
  const avg=(s)=>{ if(!s.assessments.length)return 0; const last=s.assessments[s.assessments.length-1]; return Math.round(METRICS.reduce((t,m)=>t+(last[m.key]||0),0)/METRICS.length); };
  return html`<div className="mq-screen">
    <${Header} title="تقييم الأطفال" sub="متابعة مستوى كل طفل بتقارير دورية"/>
    <${Btn} full=${true} icon="plus" onClick=${()=>setView("new")}>إضافة طفل جديد<//>
    <div style=${{height:16}}/>
    ${students.length===0?html`<${Empty} icon="users" text="لم تُضِف أطفالًا بعد" sub="أضف أطفال الحلقة لبدء تقييمهم ومتابعة تطوّرهم"/>`:html`<div style=${{display:"grid",gap:11}}>
      ${students.map(s=>{const a=avg(s),lv=levelLabel(a);return html`<div key=${s.id} className="mq-card mq-row">
        <div className="mq-avatar">${s.photo?html`<img src=${s.photo}/>`:html`<span>${s.name[0]}<//>`}<//>
        <button onClick=${()=>{setActive(s.id);setView("report");}} style=${{flex:1,textAlign:"right",background:"none",border:"none",cursor:"pointer",padding:0}}>
          <b style=${{fontSize:15.5,color:C.ink,fontFamily:"Cairo"}}>${s.name}<//>
          <p style=${{margin:"3px 0 0",fontSize:12.5,color:C.sub}}>${s.assessments.length} تقييم · ${s.age} سنة<//>
        <//>
        ${s.assessments.length>0&&html`<div style=${{textAlign:"center"}}><b style=${{fontSize:18,color:lv.c,fontFamily:"Cairo"}}>${a}<//><div style=${{fontSize:10,color:lv.c,fontWeight:700}}>${lv.t}<//><//>`}
        <${Icon} n="chevL" s=${18} c=${C.line}/>
      <//>`;})}
    <//>`}
  <//>`;
}

function ResourcesScreen({ notify }){
  const [cat,setCat]=useState(RES_CATS[0].id);
  const [extra,setExtra]=useState({}); const [busy,setBusy]=useState(false);
  const active=RES_CATS.find(c=>c.id===cat);
  const more=async()=>{ setBusy(true); try{ const r=await callAI('اقترح 4 نصائح عملية جديدة ومختصرة لمعلّمي الأطفال في مجال "'+active.name+'" (تربية إسلامية، 6-13 سنة). أعد JSON: [{"t":"عنوان","b":"شرح جملتين"}].',"أنت خبير تربية وتعليم الأطفال.",true); if(Array.isArray(r)){ setExtra(Object.assign({},extra,{[cat]:[...(extra[cat]||[]),...r]})); notify("تمت إضافة نصائح جديدة ✓"); } else notify("تعذّر التوليد"); }catch(e){ notify(e.message); } setBusy(false); };
  const items=[...(extra[cat]||[]),...active.items];
  return html`<div className="mq-screen">
    <${Header} title="الموارد التعليمية" sub="نصائح وأبحاث متجددة لتعليم الأطفال"/>
    <div style=${{display:"flex",gap:8,overflowX:"auto",padding:"0 4px 12px"}}>
      ${RES_CATS.map(c=>html`<button key=${c.id} className="mq-tag-chip" onClick=${()=>setCat(c.id)} style=${{background:cat===c.id?c.color:"#fff",color:cat===c.id?"#fff":C.sub,borderColor:cat===c.id?c.color:C.line}}>${c.emoji} ${c.name}<//>`)}
    <//>
    <button className="mq-card" onClick=${more} disabled=${busy} style=${{width:"100%",border:"1.5px dashed "+active.color,background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:14,cursor:"pointer",color:active.color,fontFamily:"Cairo",fontWeight:800,fontSize:14}}>
      <${Icon} n="spark" s=${17} c=${active.color}/> ${busy?"جارٍ التوليد…":"اقترح نصائح جديدة بالذكاء الاصطناعي"}
    <//>
    <div style=${{display:"grid",gap:11}}>
      ${items.map((it,i)=>html`<div key=${i} className="mq-card" style=${{borderRight:"4px solid "+active.color}}>
        <div style=${{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><div style=${{width:26,height:26,borderRadius:8,background:active.color+"22",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><b style=${{fontSize:12,color:active.color,fontFamily:"Cairo"}}>${i+1}<//><//><b style=${{fontSize:15,color:C.ink,fontFamily:"Cairo",lineHeight:1.4}}>${it.t}<//><//>
        <p style=${{fontSize:13.5,color:C.sub,lineHeight:1.8,margin:0}}>${it.b}<//>
      <//>`)}
    <//>
  <//>`;
}

function SettingsScreen({ settings, setSettings, state, applyState, notify, cloudState, onBack }){
  const [sbBusy,setSbBusy]=useState("");
  const p=settings.provider;
  const up=(patch)=>setSettings(Object.assign({},settings,patch));
  const setKey=(v)=>up({keys:Object.assign({},settings.keys,{[p]:v})});
  const setModel=(v)=>up({models:Object.assign({},settings.models,{[p]:v})});
  const copySQL=()=>{ try{ navigator.clipboard.writeText(SB_SQL); notify("تم نسخ كود SQL ✓"); }catch(e){ notify("انسخ الكود يدويًا"); } };
  const doBackup=async()=>{ setSbBusy("up"); try{ await backupCloud(state); notify("تم رفع نسخة احتياطية ✓"); }catch(e){ notify(e.message); } setSbBusy(""); };
  const doRestore=async()=>{ setSbBusy("down"); try{ const d=await restoreCloud(); if(d){ applyState(d); notify("تم الاسترجاع من السحابة ✓"); } }catch(e){ notify(e.message); } setSbBusy(""); };
  const customModel=!MODELS[p].find(m=>m.id===settings.models[p]);
  return html`<div className="mq-screen">
    <${Header} title="الإعدادات" onBack=${onBack}/>
    <div className="mq-card" style=${{marginBottom:16}}>
      <div style=${{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><${Icon} n="bot" s=${18} c=${C.green}/><h3 style=${{fontFamily:"Cairo",margin:0,fontSize:16,color:C.ink}}>محرّك الذكاء الاصطناعي<//><//>
      <div style=${{background:"rgba(14,124,102,.07)",borderRadius:12,padding:"10px 12px",marginBottom:12,fontSize:12.5,color:C.green,lineHeight:1.7,fontWeight:600}}>💡 Gemini مجاني فعلًا — أنشئ مفتاحًا من جوجل بدون بطاقة، والصقه هنا، وكل الأدوات تشتغل. ChatGPT وClaude مدفوعان.<//>
      <div style=${{display:"grid",gap:9,marginBottom:14}}>
        ${Object.keys(PROVIDERS).map(k=>{const pr=PROVIDERS[k];const on=p===k;const has=!!(settings.keys&&settings.keys[k]);return html`<button key=${k} className=${"mq-prov"+(on?" on":"")} onClick=${()=>up({provider:k})}>
          <div className="mq-radio"/>
          <span style=${{fontSize:20}}>${pr.emoji}<//>
          <div style=${{flex:1}}><b style=${{fontSize:14.5,color:C.ink,fontFamily:"Cairo"}}>${pr.name}<//> <span style=${{fontSize:11,color:C.sub}}>· ${pr.by}<//><div style=${{fontSize:11,color:pr.free?C.green:C.sub,fontWeight:pr.free?700:400}}>${pr.hint}<//><//>
          ${pr.free&&html`<span style=${{fontSize:9.5,fontWeight:800,color:"#fff",background:C.green,padding:"3px 7px",borderRadius:10}}>مجاني<//>`}
          ${has?html`<span style=${{fontSize:10,fontWeight:800,color:C.green,background:"rgba(14,124,102,.1)",padding:"3px 8px",borderRadius:10}}>مفعّل<//>`:html`<span style=${{fontSize:10,fontWeight:700,color:C.amber,background:"rgba(224,169,46,.12)",padding:"3px 8px",borderRadius:10}}>بلا مفتاح<//>`}
        <//>`;})}
      <//>
      <div style=${{display:"grid",gap:11}}>
        <${Field} value=${settings.keys[p]} onChange=${setKey} placeholder=${"مفتاح API الخاص بـ "+PROVIDERS[p].name} label=${"مفتاح "+PROVIDERS[p].name} icon="gear"/>
        <div>
          <span style=${{fontSize:13,fontWeight:700,color:C.sub,marginBottom:6,display:"block"}}>الموديل<//>
          <div className="mq-select"><select value=${settings.models[p]} onChange=${e=>setModel(e.target.value)}>${MODELS[p].map(m=>html`<option key=${m.id} value=${m.id}>${m.label}<//>`)}${customModel&&html`<option value=${settings.models[p]}>${settings.models[p]} (مخصّص)<//>`}<//><${Icon} n="chevD" s=${17} c=${C.sub}/><//>
        <//>
        <a href=${PROVIDERS[p].keyUrl} target="_blank" rel="noopener" style=${{fontSize:12.5,color:C.blue,fontWeight:700,textDecoration:"none"}}>↗ احصل على مفتاح ${PROVIDERS[p].name} من هنا<//>
      <//>
    <//>
    <div className="mq-card" style=${{marginBottom:16}}>
      <div style=${{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><${Icon} n="cloud" s=${18} c=${C.blue}/><h3 style=${{fontFamily:"Cairo",margin:0,fontSize:16,color:C.ink}}>المزامنة السحابية<//>${cloudState==="ok"&&html`<span style=${{fontSize:10,fontWeight:800,color:C.green,background:"rgba(14,124,102,.1)",padding:"3px 8px",borderRadius:10}}>متزامن ✓<//>`}${cloudState==="sync"&&html`<span style=${{fontSize:10,fontWeight:800,color:C.blue,background:"rgba(46,134,193,.1)",padding:"3px 8px",borderRadius:10}}>جارٍ المزامنة…<//>`}<//>
      <p style=${{fontSize:12.5,color:C.sub,lineHeight:1.7,margin:"0 0 12px"}}>بياناتك تُحفظ على جهازك وتُرفع للسحابة تلقائيًا، وتُسترجع عند فتح التطبيق على أي جهاز أو رابط جديد.<//>
      ${cloudState==="missing"&&html`<div style=${{background:"rgba(224,169,46,.12)",border:"1.5px solid "+C.amber,borderRadius:14,padding:"12px 13px",marginBottom:12}}>
        <b style=${{fontFamily:"Cairo",fontSize:13.5,color:"#8a6d00",display:"block",marginBottom:6}}>⚙️ خطوة واحدة فقط لتفعيل المزامنة (مرة واحدة للأبد)<//>
        <p style=${{fontSize:12,color:"#7a6200",lineHeight:1.7,margin:"0 0 10px"}}>افتح محرّر SQL في مشروعك، الصق الكود، واضغط Run.<//>
        <div style=${{display:"grid",gap:8}}>
          ${sbRef(settings.supabaseUrl)&&html`<a href=${"https://supabase.com/dashboard/project/"+sbRef(settings.supabaseUrl)+"/sql/new"} target="_blank" rel="noopener" className="mq-btn" style=${{background:C.gold,color:"#3a2d00",textDecoration:"none",justifyContent:"center"}}><${Icon} n="link" s=${17} c="#3a2d00"/> افتح محرّر SQL في مشروعك<//>`}
          <${Btn} full=${true} variant="soft" icon="list" onClick=${copySQL}>نسخ كود SQL<//>
        <//>
      <//>`}
      <div style=${{display:"grid",gap:11}}>
        <${Field} value=${settings.supabaseUrl} onChange=${(v)=>up({supabaseUrl:v})} placeholder="https://xxxx.supabase.co" label="رابط المشروع (Project URL)" icon="link"/>
        <${Field} value=${settings.supabaseKey} onChange=${(v)=>up({supabaseKey:v})} placeholder="anon / publishable key" label="المفتاح (anon key)" icon="gear"/>
        ${cloudState!=="missing"&&html`<${Btn} full=${true} variant="soft" icon="list" onClick=${copySQL}>نسخ كود SQL لإنشاء الجدول<//>`}
        <div style=${{display:"flex",gap:8}}>
          <${Btn} full=${true} icon="cloudUp" onClick=${doBackup} disabled=${sbBusy==="up"}>${sbBusy==="up"?"جارٍ الرفع…":"رفع الآن"}<//>
          <${Btn} full=${true} variant="blue" icon="cloud" onClick=${doRestore} disabled=${sbBusy==="down"}>${sbBusy==="down"?"جارٍ الجلب…":"استرجاع"}<//>
        <//>
      <//>
    <//>
    <p style=${{textAlign:"center",fontSize:11,color:C.sub,lineHeight:1.7}}>تطبيق «مُعلّمي» · كل بياناتك محفوظة على هذا الجهاز<//>
  <//>`;
}

function TeamScreen({ team, onChange, onBack }){
  const [name,setName]=useState(""); const [role,setRole]=useState("معلّم مساعد");
  const add=()=>{ if(!name.trim())return; onChange([...team,{id:rid(),name:name.trim(),role:role}]); setName(""); };
  const del=(id)=>onChange(team.filter(t=>t.id!==id));
  const roles=["معلّم","معلّم مساعد","مشرف","متطوّع"];
  return html`<div className="mq-screen">
    <${Header} title="إدارة الفريق" onBack=${onBack} sub="أعضاء الفريق المشاركون في الحلقة"/>
    <div className="mq-card" style=${{marginBottom:16,display:"grid",gap:12}}>
      <${Field} value=${name} onChange=${setName} placeholder="اسم العضو" label="إضافة عضو" icon="user"/>
      <div style=${{display:"flex",gap:7,flexWrap:"wrap"}}>${roles.map(r=>html`<button key=${r} onClick=${()=>setRole(r)} className="mq-tag-chip" style=${{background:role===r?C.green:"#fff",color:role===r?"#fff":C.sub,borderColor:role===r?C.green:C.line,fontSize:12}}>${r}<//>`)}<//>
      <${Btn} full=${true} icon="plus" onClick=${add}>إضافة للفريق<//>
    <//>
    ${team.length===0?html`<${Empty} icon="team" text="لا أعضاء بعد" sub="أضف أعضاء فريقك لتنظيم العمل في الحلقة"/>`:html`<div style=${{display:"grid",gap:10}}>
      ${team.map(t=>html`<div key=${t.id} className="mq-card mq-row">
        <div className="mq-avatar"><span>${t.name[0]}<//><//>
        <div style=${{flex:1,textAlign:"right"}}><b style=${{fontSize:15,color:C.ink,fontFamily:"Cairo"}}>${t.name}<//><p style=${{margin:"2px 0 0",fontSize:12.5,color:C.sub}}>${t.role}<//><//>
        <button className="mq-icon-sm" onClick=${()=>del(t.id)}><${Icon} n="trash" s=${15} c=${C.danger}/><//>
      <//>`)}
    <//>`}
  <//>`;
}

function NotesScreen({ notes, onChange, onBack, notify }){
  const [open,setOpen]=useState(false); const [title,setTitle]=useState(""); const [body,setBody]=useState("");
  const add=()=>{ if(!title.trim()&&!body.trim())return; onChange([{id:rid(),title:title.trim()||"ملاحظة",body:body.trim(),date:todayISO()},...notes]); setTitle("");setBody("");setOpen(false); notify("تم حفظ الملاحظة ✓"); };
  const del=(id)=>onChange(notes.filter(n=>n.id!==id));
  return html`<div className="mq-screen">
    <${Header} title="دفتر الملاحظات والمصادر" onBack=${onBack} sub="احفظ أفكارك وروابطك ومصادرك" right=${html`<button className="mq-icon-sm" onClick=${()=>setOpen(true)}><${Icon} n="plus" s=${18} c=${C.green}/><//>`}/>
    ${notes.length===0?html`<${Empty} icon="note" text="لا ملاحظات بعد" sub="أضف ملاحظة أو الصق رابطًا/مصدرًا من واتساب أو Notion هنا"/>`:html`<div style=${{display:"grid",gap:11}}>
      ${notes.map(n=>html`<div key=${n.id} className="mq-card">
        <div style=${{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
          <div style=${{flex:1}}><b style=${{fontSize:15,color:C.ink,fontFamily:"Cairo"}}>${n.title}<//><p style=${{margin:"2px 0 0",fontSize:11,color:C.sub}}>${fmtDate(n.date)}<//><//>
          <div style=${{display:"flex",gap:4}}>
            <button className="mq-icon-sm" onClick=${()=>shareText(n.title,n.title+"\n\n"+n.body,notify)}><${Icon} n="share" s=${14} c=${C.blue}/><//>
            <button className="mq-icon-sm" onClick=${()=>del(n.id)}><${Icon} n="trash" s=${14} c=${C.danger}/><//>
          <//>
        <//>
        ${n.body&&html`<p style=${{fontSize:13.5,color:C.ink,lineHeight:1.8,margin:"8px 0 0",whiteSpace:"pre-wrap"}}>${n.body}<//>`}
      <//>`)}
    <//>`}
    <${Modal} open=${open} onClose=${()=>setOpen(false)} title="ملاحظة جديدة">
      <div style=${{display:"grid",gap:12}}>
        <${Field} value=${title} onChange=${setTitle} placeholder="عنوان الملاحظة" label="العنوان"/>
        <${Field} area=${true} rows=${5} value=${body} onChange=${setBody} placeholder="اكتب الملاحظة أو الصق الرابط/المصدر…" label="المحتوى"/>
        <${Btn} full=${true} icon="check" onClick=${add}>حفظ<//>
      <//>
    <//>
  <//>`;
}

function ProfileScreen({ state, openSettings, openTeam, openNotes, onShare, onDeleteSeason, onLogout }){
  const [delOpen,setDelOpen]=useState(false);
  const all=state.subjects.flatMap(s=>s.lessons);
  const archive=state.archive||[];
  const stats=[
    {ic:"book",c:C.green,n:state.subjects.length,l:"مادة"},
    {ic:"checkc",c:C.blue,n:all.filter(l=>l.prepared).length,l:"درس جاهز"},
    {ic:"users",c:C.gold,n:state.students.length,l:"طفل"},
    {ic:"award",c:C.greenLt,n:state.students.reduce((s,st)=>s+st.assessments.length,0),l:"تقييم"},
  ];
  return html`<div className="mq-screen">
    <${Header} title="حسابي"/>
    <div className="mq-card" style=${{textAlign:"center",marginBottom:16}}>
      <div className="mq-profile-av"><${Icon} n="cap" s=${32} c="#fff"/><//>
      <h2 style=${{fontFamily:"Cairo",fontSize:20,margin:"12px 0 2px",color:C.ink}}>${state.teacher.name}<//>
      <p style=${{fontSize:13,color:C.sub,margin:0}}>${state.teacher.email}<//>
      <span className="mq-role-chip">معلّم تربية إسلامية<//>
    <//>
    <div className="mq-stats">${stats.map((s,i)=>html`<div key=${i} className="mq-stat"><${Icon} n=${s.ic} s=${20} c=${s.c}/><b style=${{fontSize:22,fontFamily:"Cairo",color:C.ink,marginTop:4}}>${s.n}<//><span style=${{fontSize:11.5,color:C.sub}}>${s.l}<//><//>`)}<//>
    <div className="mq-card" style=${{marginTop:16,display:"flex",alignItems:"center",gap:14}}>
      <div className="mq-mini-ic" style=${{background:C.blueDp}}><${Icon} n="cal" s=${22} c="#fff"/><//>
      <div style=${{flex:1}}><b style=${{fontFamily:"Cairo",fontSize:16,color:C.ink}}>المواسم<//><p style=${{margin:"2px 0 0",fontSize:12.5,color:C.sub}}>${archive.length} موسم مكتمل · ${state.season?("الحالي: "+state.season.name):"لا يوجد موسم حالي"}<//><//>
      <b style=${{fontFamily:"Cairo",fontSize:24,color:C.blueDp}}>${archive.length+(state.season?1:0)}<//>
    <//>
    ${archive.length>0&&html`<div className="mq-card" style=${{marginTop:14}}>
      <b style=${{fontFamily:"Cairo",fontSize:15,color:C.ink,display:"block",marginBottom:10}}>سجلّ المواسم السابقة<//>
      <div style=${{display:"grid",gap:9}}>${archive.slice().reverse().map((a,i)=>html`<div key=${i} style=${{display:"flex",alignItems:"center",gap:10,background:C.bg2,borderRadius:14,padding:"10px 12px"}}><div style=${{flex:1}}><b style=${{fontSize:13.5,color:C.ink,fontFamily:"Cairo"}}>${a.name}<//><p style=${{margin:"2px 0 0",fontSize:11.5,color:C.sub}}>${a.studentsCount} طفل · تحضير ${a.prepPct}% · متوسط ${a.avgLevel}<//><//><span style=${{fontSize:11,color:C.sub}}>${fmtDate(a.endedAt)}<//><//>`)}<//>
    <//>`}
    <div className="mq-card" style=${{marginTop:16}}>
      <b style=${{fontFamily:"Cairo",fontSize:15,color:C.ink,display:"block",marginBottom:6}}>الأدوات والإعدادات<//>
      <button className="mq-setting-row" onClick=${openSettings}><div className="mq-mini-ic2"><${Icon} n="bot" s=${17} c=${C.green}/><//><div style=${{flex:1}}><b style=${{fontSize:14,color:C.ink,display:"block"}}>إعدادات الذكاء الاصطناعي<//><span style=${{fontSize:12,color:C.sub}}>Gemini مجاني · ChatGPT · Claude + نسخ سحابي<//><//><${Icon} n="chevL" s=${18} c=${C.line}/><//>
      <button className="mq-setting-row" onClick=${openTeam}><div className="mq-mini-ic2"><${Icon} n="team" s=${17} c=${C.green}/><//><div style=${{flex:1}}><b style=${{fontSize:14,color:C.ink,display:"block"}}>إدارة الفريق<//><span style=${{fontSize:12,color:C.sub}}>${(state.team||[]).length} عضو<//><//><${Icon} n="chevL" s=${18} c=${C.line}/><//>
      <button className="mq-setting-row" onClick=${openNotes}><div className="mq-mini-ic2"><${Icon} n="note" s=${17} c=${C.green}/><//><div style=${{flex:1}}><b style=${{fontSize:14,color:C.ink,display:"block"}}>دفتر الملاحظات والمصادر<//><span style=${{fontSize:12,color:C.sub}}>${(state.notes||[]).length} ملاحظة · استيراد من واتساب/Notion<//><//><${Icon} n="chevL" s=${18} c=${C.line}/><//>
      <button className="mq-setting-row" onClick=${onShare}><div className="mq-mini-ic2"><${Icon} n="share" s=${17} c=${C.green}/><//><div style=${{flex:1}}><b style=${{fontSize:14,color:C.ink,display:"block"}}>مشاركة ملخّص الحلقة<//><span style=${{fontSize:12,color:C.sub}}>عبر واتساب أو أي تطبيق<//><//><${Icon} n="chevL" s=${18} c=${C.line}/><//>
    <//>
    <div style=${{display:"grid",gap:10,marginTop:16}}>
      ${state.season&&html`<${Btn} full=${true} variant="danger" icon="trash" onClick=${()=>setDelOpen(true)}>حذف الموسم الحالي وكل بياناته<//>`}
      <${Btn} full=${true} variant="soft" onClick=${onLogout}>تسجيل الخروج<//>
    <//>
    <p style=${{textAlign:"center",fontSize:11,color:C.sub,marginTop:20,lineHeight:1.7}}>تطبيق «مُعلّمي» · يُحفظ المحتوى تلقائيًا على جهازك<//>
    <${Confirm} open=${delOpen} onClose=${()=>setDelOpen(false)} danger=${true} title="حذف الموسم الحالي؟" message="سيتم حذف كل مدخلات الموسم الحالي نهائيًا: تحضير الدروس، الأطفال، والتقييمات. لا يمكن التراجع." confirmText="نعم، احذف الموسم" onConfirm=${()=>{setDelOpen(false);onDeleteSeason();}}/>
  <//>`;
}

function SeasonWizard({ open, onClose, onCreate, subjects, hasActive }){
  const [name,setName]=useState(""); const [subject,setSubject]=useState((subjects[0]&&subjects[0].id)||"");
  const [sessions,setSessions]=useState("12"); const [children,setChildren]=useState("15");
  const [trip,setTrip]=useState(false);
  const today=new Date(); const plus=new Date(); plus.setDate(plus.getDate()+84);
  const [start,setStart]=useState(toInputDate(today.toISOString()));
  const [end,setEnd]=useState(toInputDate(plus.toISOString()));
  const dur=Math.max(0,daysBetween(start,end));
  const create=()=>{ const subjName=(subjects.find(s=>s.id===subject)||{}).name||""; onCreate({id:rid(),name:name||"الموسم الدراسي",subjectFocus:subjName,sessions:parseInt(sessions)||12,children:parseInt(children)||0,trip,startDate:new Date(start).toISOString(),endDate:new Date(end).toISOString()}); setName(""); };
  return html`<${Modal} open=${open} onClose=${onClose} title="بدء موسم جديد">
    ${hasActive&&html`<div style=${{background:"rgba(224,169,46,.12)",borderRadius:12,padding:"10px 12px",marginBottom:12,fontSize:12.5,color:"#8a6d00",lineHeight:1.6}}>تنبيه: سيتم أرشفة الموسم الحالي (يبقى في السجلّ) وبدء موسم جديد فارغ.<//>`}
    <div style=${{display:"grid",gap:14}}>
      <${Field} value=${name} onChange=${setName} placeholder="مثال: الترم الأول 1447" label="اسم الموسم" icon="cal"/>
      <div>
        <span style=${{fontSize:13,fontWeight:700,color:C.sub,marginBottom:6,display:"block"}}>المادة الأساسية<//>
        <div className="mq-select"><select value=${subject} onChange=${e=>setSubject(e.target.value)}>${subjects.map(s=>html`<option key=${s.id} value=${s.id}>${s.name}<//>`)}<//><${Icon} n="chevD" s=${17} c=${C.sub}/><//>
      <//>
      <div style=${{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <div><span style=${{fontSize:13,fontWeight:700,color:C.sub,marginBottom:6,display:"block"}}>تاريخ البداية<//><input type="date" className="mq-input" value=${start} onChange=${e=>setStart(e.target.value)}/><//>
        <div><span style=${{fontSize:13,fontWeight:700,color:C.sub,marginBottom:6,display:"block"}}>تاريخ النهاية<//><input type="date" className="mq-input" value=${end} onChange=${e=>setEnd(e.target.value)}/><//>
      <//>
      <div style=${{background:C.bg2,borderRadius:12,padding:"10px 13px",fontSize:12.5,color:C.ink,lineHeight:1.7}}>📅 يبدأ <b>${fmtFull(new Date(start).toISOString())}<//> وينتهي <b>${fmtFull(new Date(end).toISOString())}<//> — المدة <b>${dur} يومًا<//> (≈ ${Math.round(dur/7)} أسبوع).<//>
      <div style=${{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <${Field} value=${sessions} onChange=${setSessions} placeholder="12" label="عدد اللقاءات" type="number"/>
        <${Field} value=${children} onChange=${setChildren} placeholder="15" label="عدد الأطفال" type="number"/>
      <//>
      <button className="mq-toggle-row" onClick=${()=>setTrip(!trip)}>
        <div style=${{display:"flex",alignItems:"center",gap:10}}><${Icon} n="map" s=${18} c=${C.gold}/><span style=${{fontSize:14,fontWeight:700,color:C.ink}}>يتضمن الموسم رحلة<//><//>
        <div className=${"mq-switch"+(trip?" on":"")}><div/><//>
      <//>
      <${Btn} full=${true} icon="play" onClick=${create}>إنشاء الموسم وبدء التحضير<//>
    <//>
  <//>`;
}

function TabBar({ active, onChange }){
  const tabs=[["home","home","الرئيسية"],["subjects","book","المواد"],["assess","users","التقييم"],["resources","bulb","الموارد"],["profile","user","حسابي"]];
  return html`<div className="mq-tabbar">${tabs.map(t=>html`<button key=${t[0]} onClick=${()=>onChange(t[0])} className=${"mq-tab"+(active===t[0]?" on":"")}><${Icon} n=${t[1]} s=${21}/><span>${t[2]}<//><//>`)}<//>`;
}

function freshSubjects(){ return SUBJECT_SEED.map(s=>({id:s.id,name:s.name,emoji:s.emoji,color:s.color,objectives:s.objectives.slice(),lessons:s.lessons.map(l=>({id:rid(),title:l.title,prepared:false,content:"",summary:"",dev:null}))})); }
function newStateForLogin(teacher){ return {teacher:teacher,subjects:freshSubjects(),students:[],season:null,archive:[],team:[],notes:[]}; }

function App(){
  const [state,setState]=useState(()=>loadState());
  const [settings,setSettings]=useState(()=>loadSettings());
  const [tab,setTab]=useState("home"); const [route,setRoute]=useState(null);
  const [seasonOpen,setSeasonOpen]=useState(false);
  const [toast,setToast]=useState(""); const toastT=useRef(null);
  const [cloudState,setCloudState]=useState("idle");
  const syncedRef=useRef(false); const pushT=useRef(null); const sessionMode=useRef("auto"); const skipPush=useRef(false);
  const initialT=useRef(+(localStorage.getItem("muallim_t")||0));
  useEffect(()=>{ const sp=document.getElementById("splash"); if(sp) sp.style.display="none"; },[]);
  const notify=(m)=>{ setToast(m); clearTimeout(toastT.current); toastT.current=setTimeout(()=>setToast(""),3500); };
  useEffect(()=>{ if(!state) return; saveState(state); const t=Date.now(); localStorage.setItem("muallim_t",String(t)); if(!syncedRef.current) return; if(skipPush.current){ skipPush.current=false; return; } if(!getSB(loadSettings())) return; clearTimeout(pushT.current); pushT.current=setTimeout(async()=>{ setCloudState("sync"); const r=await cloudPut(state,new Date(t).toISOString()); setCloudState(r.ok?"ok":(r.missing?"missing":"err")); },1400); },[state]);
  useEffect(()=>{ saveSettings(settings); },[settings]);
  useEffect(()=>{ if(!state||syncedRef.current) return; if(!getSB(loadSettings())){ syncedRef.current=true; return; } syncedRef.current=true; (async()=>{ setCloudState("sync"); const r=await cloudGet(); if(!r.ok){ setCloudState(r.missing?"missing":"err"); if(r.missing) notify("لتفعيل المزامنة جهّز جدول السحابة مرة واحدة من الإعدادات ⚙️"); sessionMode.current="auto"; return; } const localT=initialT.current; if(r.data&&r.data.teacher){ const cloudT=Date.parse(r.updatedAt)||0; if(sessionMode.current==="pull"||cloudT>localT){ skipPush.current=true; setState(Object.assign({team:[],notes:[],archive:[]},r.data)); localStorage.setItem("muallim_t",String(cloudT||Date.now())); sessionMode.current="auto"; setCloudState("ok"); notify("تم استرجاع بياناتك من السحابة ☁️✓"); return; } } sessionMode.current="auto"; const pr=await cloudPut(state,new Date().toISOString()); setCloudState(pr.ok?"ok":(pr.missing?"missing":"err")); })(); },[state]);
  const login=(t)=>{ sessionMode.current="pull"; localStorage.setItem("muallim_t","0"); initialT.current=0; syncedRef.current=false; setState(newStateForLogin(t)); setTab("home"); setRoute(null); };
  const logout=()=>{ setState(null); setTab("home"); setRoute(null); };
  const updateSubject=(subj)=>setState(prev=>Object.assign({},prev,{subjects:prev.subjects.map(s=>s.id===subj.id?subj:s)}));
  const updateLesson=(sid,lesson)=>setState(prev=>Object.assign({},prev,{subjects:prev.subjects.map(s=>s.id===sid?Object.assign({},s,{lessons:s.lessons.map(l=>l.id===lesson.id?lesson:l)}):s)}));
  const addSubject=(subj)=>setState(prev=>Object.assign({},prev,{subjects:[...prev.subjects,subj]}));
  const deleteSubject=(sid)=>{ setState(prev=>Object.assign({},prev,{subjects:prev.subjects.filter(s=>s.id!==sid)})); setRoute(null); notify("تم حذف المادة"); };
  const createSeason=(meta)=>{ setState(prev=>{ let archive=(prev.archive||[]).slice(); if(prev.season){ const all=prev.subjects.flatMap(s=>s.lessons); const prepPct=all.length?Math.round(all.filter(l=>l.prepared).length/all.length*100):0; const ls=prev.students.filter(s=>s.assessments.length); const avgLevel=ls.length?Math.round(ls.reduce((t,s)=>{const last=s.assessments[s.assessments.length-1];return t+METRICS.reduce((x,m)=>x+(last[m.key]||0),0)/METRICS.length;},0)/ls.length):0; archive.push({id:prev.season.id,name:prev.season.name,subject:prev.season.subjectFocus||"",startDate:prev.season.startDate,endDate:prev.season.endDate,studentsCount:prev.students.length,prepPct:prepPct,avgLevel:avgLevel,endedAt:todayISO()}); } return Object.assign({},prev,{season:meta,subjects:freshSubjects(),students:[],archive:archive}); }); setSeasonOpen(false); notify("تم إنشاء الموسم ✓"); };
  const deleteSeason=()=>{ setState(prev=>Object.assign({},prev,{season:null,subjects:freshSubjects(),students:[]})); setTab("home"); setRoute(null); notify("تم حذف الموسم وبياناته"); };
  const setTeam=(team)=>setState(prev=>Object.assign({},prev,{team:team}));
  const setNotes=(notes)=>setState(prev=>Object.assign({},prev,{notes:notes}));
  const applyState=(d)=>{ if(d&&d.teacher){ setState(Object.assign({team:[],notes:[],archive:[]},d)); setTab("home"); setRoute(null); } };
  const shareSummary=()=>{ const all=state.subjects.flatMap(s=>s.lessons); const prep=all.length?Math.round(all.filter(l=>l.prepared).length/all.length*100):0; const txt="📘 حلقة: "+(state.season?state.season.name:"مُعلّمي")+"\nنسبة التحضير: "+prep+"%\nعدد الأطفال: "+state.students.length+"\nعدد المواد: "+state.subjects.length+"\n— عبر تطبيق مُعلّمي"; shareText("ملخّص الحلقة",txt,notify); };

  if(!state) return html`<div className="mq-root"><${Login} onLogin=${login}/><//>`;

  let screen;
  if(route&&route.type==="subject"){ const subj=state.subjects.find(s=>s.id===route.subjectId); screen=subj?html`<${SubjectScreen} subject=${subj} onBack=${()=>setRoute(null)} openLesson=${(lid)=>setRoute({type:"lesson",subjectId:subj.id,lessonId:lid})} update=${updateSubject} onDelete=${()=>deleteSubject(subj.id)} notify=${notify}/>`:html`<div/>`; }
  else if(route&&route.type==="lesson"){ const subj=state.subjects.find(s=>s.id===route.subjectId); const lesson=subj&&subj.lessons.find(l=>l.id===route.lessonId); screen=lesson?html`<${LessonScreen} subject=${subj} lesson=${lesson} onBack=${()=>setRoute({type:"subject",subjectId:subj.id})} update=${(l)=>updateLesson(subj.id,l)} notify=${notify} openLive=${()=>setRoute({type:"live",subjectId:subj.id,lessonId:lesson.id})}/>`:html`<div/>`; }
  else if(route&&route.type==="live"){ const subj=state.subjects.find(s=>s.id===route.subjectId); const lesson=subj&&subj.lessons.find(l=>l.id===route.lessonId); screen=lesson?html`<${LiveSession} subject=${subj} lesson=${lesson} onBack=${()=>setRoute({type:"lesson",subjectId:subj.id,lessonId:lesson.id})} update=${(l)=>updateLesson(subj.id,l)} notify=${notify}/>`:html`<div/>`; }
  else if(route&&route.type==="settings"){ screen=html`<${SettingsScreen} settings=${settings} setSettings=${setSettings} state=${state} applyState=${applyState} notify=${notify} cloudState=${cloudState} onBack=${()=>setRoute(null)}/>`; }
  else if(route&&route.type==="team"){ screen=html`<${TeamScreen} team=${state.team||[]} onChange=${setTeam} onBack=${()=>setRoute(null)}/>`; }
  else if(route&&route.type==="notes"){ screen=html`<${NotesScreen} notes=${state.notes||[]} onChange=${setNotes} onBack=${()=>setRoute(null)} notify=${notify}/>`; }
  else if(tab==="home"){ screen=html`<${HomeScreen} state=${state} setTab=${setTab} notify=${notify} openSubject=${(id)=>setRoute({type:"subject",subjectId:id})} openSeason=${()=>setSeasonOpen(true)}/>`; }
  else if(tab==="subjects"){ screen=html`<${SubjectsList} state=${state} openSubject=${(id)=>setRoute({type:"subject",subjectId:id})} onAdd=${addSubject}/>`; }
  else if(tab==="assess"){ screen=html`<${AssessmentScreen} state=${state} update=${setState} notify=${notify}/>`; }
  else if(tab==="resources"){ screen=html`<${ResourcesScreen} notify=${notify}/>`; }
  else { screen=html`<${ProfileScreen} state=${state} openSettings=${()=>setRoute({type:"settings"})} openTeam=${()=>setRoute({type:"team"})} openNotes=${()=>setRoute({type:"notes"})} onShare=${shareSummary} onDeleteSeason=${deleteSeason} onLogout=${logout}/>`; }

  return html`<div className="mq-root" dir="rtl">
    <div className="mq-app">
      <div className="mq-content" key=${(route&&route.type||tab)+((route&&route.lessonId)||(route&&route.subjectId)||"")}>${screen}<//>
      ${!route&&html`<${TabBar} active=${tab} onChange=${(t)=>{setTab(t);setRoute(null);}}/>`}
    <//>
    ${toast&&html`<div className="mq-toast">${toast}<//>`}
    <${SeasonWizard} open=${seasonOpen} onClose=${()=>setSeasonOpen(false)} subjects=${state.subjects} hasActive=${!!state.season} onCreate=${createSeason}/>
  <//>`;
}

ReactDOM.createRoot(document.getElementById("root")).render(html`<${App}/>`);
