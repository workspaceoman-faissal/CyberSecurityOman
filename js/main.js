// ── MATRIX BACKGROUND ──
(function(){
  const bg = document.getElementById('matrix-bg');
  if(!bg)return;
  const chars = '01アイウエオカキクケコ!@#$%';
  for(let i=0;i<20;i++){
    const col = document.createElement('div');
    col.className='matrix-col';
    col.style.left = (Math.random()*100)+'%';
    col.style.animationDuration = (8+Math.random()*12)+'s';
    col.style.animationDelay = -(Math.random()*12)+'s';
    let text='';
    for(let j=0;j<30;j++) text+=chars[Math.floor(Math.random()*chars.length)]+'\n';
    col.textContent=text;
    bg.appendChild(col);
  }
})();

// ── PARTICLES ──
(function(){
  const colors=['rgba(0,255,136,0.5)','rgba(0,212,255,0.4)','rgba(168,85,247,0.4)','rgba(255,107,53,0.4)'];
  for(let i=0;i<18;i++){
    const p=document.createElement('div');
    p.className='particle';
    const size=3+Math.random()*6;
    p.style.cssText=`width:${size}px;height:${size}px;left:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*colors.length)]};animation-duration:${10+Math.random()*15}s;animation-delay:${-Math.random()*10}s`;
    document.body.appendChild(p);
  }
})();

// ── COUNTER ANIMATION ──
function animateCounters(){
  document.querySelectorAll('[data-target]').forEach(el=>{
    const target=+el.dataset.target;
    let current=0;
    const step=target/40;
    const timer=setInterval(()=>{
      current+=step;
      if(current>=target){current=target;clearInterval(timer);}
      el.textContent=Math.floor(current);
    },40);
  });
}
if(document.querySelector('[data-target]')) setTimeout(animateCounters,600);

// ── FADE IN ON SCROLL ──
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:0.1});
document.querySelectorAll('.fade-in').forEach(el=>obs.observe(el));

// ── MOBILE NAV TOGGLE ──
(function(){
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if(!toggle || !links) return;
  toggle.addEventListener('click', function(){
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=> links.classList.remove('open'));
  });
})();

// ── SMOOTH SCROLL FOR NAV ──
document.querySelectorAll('nav a[href^=\"#\"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── VIDEO MODAL ──
// ── VIDEO MODAL ──
function openVideo(title, emoji, desc, url) {
  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");
  const modalTitle = document.getElementById("modalTitle");

  let videoId = url.split("v=")[1];
  if (videoId && videoId.includes("&")) videoId = videoId.split("&")[0];

  if (modalTitle) modalTitle.textContent = emoji + " " + title;
  frame.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeVideo() {
  document.getElementById("videoFrame").src = "";
  document.getElementById("videoModal").classList.remove("active");
  document.body.style.overflow = "";
}

function handleModalClick(e) {
  if (e.target.id === "videoModal") closeVideo();
}

// ══════════════════════════════════════
// ── AWARENESS GALLERY (قسم التوعية) ──
// ══════════════════════════════════════
const awarenessItems=[
  {n:1, title:'لا تنخدع بالرسائل الاحتيالية', cat:'phishing', catLabel:'🎣 التصيد الاحتيالي'},
  {n:2, title:'الاستخدام الآمن لتطبيقات الذكاء الاصطناعي', cat:'ai', catLabel:'🤖 الذكاء الاصطناعي'},
  {n:3, title:'الحماية من التزييف العميق وانتحال الهوية', cat:'ai', catLabel:'🤖 الذكاء الاصطناعي'},
  {n:4, title:'البيانات الشخصية أمانة ومسؤولية', cat:'privacy', catLabel:'🗂️ خصوصية البيانات'},
  {n:5, title:'كلمة المرور القوية خط الدفاع الأول', cat:'password', catLabel:'🔑 كلمات المرور'},
  {n:6, title:'عزز أمان حساباتك الرقمية', cat:'password', catLabel:'🔑 كلمات المرور'},
  {n:7, title:'احمِ جهازك لتحمي بياناتك', cat:'device', catLabel:'📱 الأجهزة المحمولة'},
  {n:8, title:'الهندسة الاجتماعية واستغلال الثقة', cat:'engineering', catLabel:'🎭 الهندسة الاجتماعية'},
  {n:9, title:'خصوصيتك اليوم أمانك غداً', cat:'social', catLabel:'📲 التواصل الاجتماعي'},
  {n:10, title:'تحقق أولًا ثم تفاعل مع الروابط', cat:'links', catLabel:'🔗 الروابط المشبوهة'},
  {n:11, title:'مسؤوليتك اليوم تحمي بيانات الغد', cat:'remote', catLabel:'💻 العمل عن بُعد'},
  {n:12, title:'حماية بياناتك في السحابة مسؤولية الجميع', cat:'cloud', catLabel:'☁️ الحوسبة السحابية'},
  {n:13, title:'سرعة الإبلاغ تُقلل الأضرار', cat:'report', catLabel:'🚨 الإبلاغ عن الحوادث'},
];
let awCurrent=0;

function awFullSrc(n){return '../assets/awareness/full/awareness_'+n+'.jpg';}

function openAware(index){
  awCurrent=index;
  renderAwareModal();
  document.getElementById('awareModal').classList.add('active');
  document.body.style.overflow='hidden';
}
function closeAware(){
  document.getElementById('awareModal').classList.remove('active');
  document.body.style.overflow='';
}
function handleAwareModalClick(e){
  if(e.target.id==='awareModal') closeAware();
}
function awareNext(){ awCurrent=(awCurrent+1)%awarenessItems.length; renderAwareModal(); }
function awarePrev(){ awCurrent=(awCurrent-1+awarenessItems.length)%awarenessItems.length; renderAwareModal(); }

function renderAwareModal(){
  const item=awarenessItems[awCurrent];
  const img=document.getElementById('awareImg');
  img.src=awFullSrc(item.n);
  img.alt=item.title;
  img.style.animation='none';
  void img.offsetWidth;
  img.style.animation='awZoomIn .35s ease';
  document.getElementById('awareTitle').textContent=item.title;
  const tag=document.getElementById('awareTag');
  tag.textContent=item.catLabel;
  tag.className='aw-modal-tag aw-c-'+item.cat;
  document.getElementById('awareCounter').textContent=(awCurrent+1)+' / '+awarenessItems.length;
  document.getElementById('awareDownload').href=awFullSrc(item.n);
  document.getElementById('awareDownload').setAttribute('download','ملصق-توعوي-'+item.n+'.jpg');
}

document.addEventListener('keydown', function(e){
  const modal=document.getElementById('awareModal');
  if(!modal || !modal.classList.contains('active')) return;
  if(e.key==='Escape') closeAware();
  if(e.key==='ArrowLeft') awareNext();   // RTL: left = next
  if(e.key==='ArrowRight') awarePrev();  // RTL: right = prev
});

function filterAware(cat, btn){
  document.querySelectorAll('.aw-chip').forEach(c=>c.classList.remove('active'));
  if(btn) btn.classList.add('active');
  document.querySelectorAll('.aw-card').forEach(card=>{
    const match = (cat==='all' || card.dataset.category===cat);
    card.classList.toggle('hidden', !match);
  });
}

// staggered reveal for awareness cards
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('.aw-card').forEach((card,i)=>{
    card.style.transitionDelay=(i%6*0.07)+'s';
  });
});

// ── QUIZ DATA & LOGIC ──
const questions=[
  {q:'ما معنى كلمة \"Phishing\"؟',e:'🎣',opts:['التصيد الاحتيالي','برنامج خبيث','جدار الحماية','التشفير'],a:0,fb:'التصيد الاحتيالي هو محاولة خداعك للكشف عن بيانات سرية عبر رسائل مزيفة.'},
  {q:'ما الهدف الرئيسي من كلمة المرور القوية؟',e:'🔑',opts:['سهولة الحفظ','منع الوصول غير المصرح','تسريع الجهاز','تحسين الشبكة'],a:1,fb:'كلمة المرور القوية تمنع المخترقين من الوصول إلى حساباتك.'},
  {q:'ماذا تعني HTTPS في عنوان الموقع؟',e:'🌐',opts:['الموقع سريع','الموقع مشفور وآمن','الموقع رسمي فقط','الموقع مجاني'],a:1,fb:'HTTPS تعني أن الاتصال بين جهازك والموقع مشفر وآمن.'},
  {q:'ما هو الـ Firewall؟',e:'🔥',opts:['برنامج للألعاب','جدار حماية للشبكة','نوع من الفيروسات','بريد إلكتروني'],a:1,fb:'الـ Firewall هو جدار الحماية الذي يراقب ويتحكم في حركة البيانات.'},
  {q:'ما أفضل تصرف عند تلقي رسالة مشبوهة؟',e:'📨',opts:['فتحها فوراً','مشاركتها مع الأصدقاء','حذفها والإبلاغ عنها','الرد عليها'],a:2,fb:'الحذف والإبلاغ هو التصرف الصحيح لحماية نفسك وحماية الآخرين.'},
  {q:'ما هي المصادقة الثنائية (2FA)؟',e:'🔐',opts:['كلمة مرور فقط','خطوتان للتحقق من الهوية','رمز PIN للموبايل','سؤال سري'],a:1,fb:'المصادقة الثنائية تضيف طبقة أمان إضافية تجعل اختراق حسابك أصعب بكثير.'},
  {q:'ما هو الـ Malware؟',e:'🦠',opts:['موقع إلكتروني','برنامج خبيث','شبكة واي فاي','نسخ احتياطي'],a:1,fb:'Malware هو مصطلح يشمل كل البرمجيات الخبيثة كالفيروسات وبرامج التجسس.'},
  {q:'ما خطر استخدام شبكة Wi-Fi عامة غير آمنة؟',e:'📶',opts:['بطء الإنترنت فقط','اختراق بياناتك وسرقتها','انقطاع الشبكة','ارتفاع الفاتورة'],a:1,fb:'الشبكات العامة غير الآمنة قد تتيح للمخترقين رؤية بياناتك وكلمات مرورك.'},
  {q:'ما معنى التشفير في الأمن السيبراني؟',e:'🔒',opts:['حذف الملفات','تحويل البيانات لصيغة غير مقروءة','إخفاء الجهاز','تحديث النظام'],a:1,fb:'التشفير يحول البيانات إلى صيغة لا يمكن قراءتها إلا بمفتاح خاص.'},
  {q:'ما الخطوة الأولى عند التعرض للابتزاز الإلكتروني؟',e:'🚨',opts:['دفع المبلغ المطلوب','حذف الأدلة','التبليغ للجهات المختصة','مشاركة الموضوع مع الأصدقاء'],a:2,fb:'الإبلاغ الفوري للجهات المختصة هو الخطوة الصحيحة والأهم عند التعرض للابتزاز.'},
];
let currentQ=0,score=0,answered=false;
function loadQ(){
  const q=questions[currentQ];
  document.getElementById('qCounter').textContent=`السؤال ${currentQ+1} من ${questions.length}`;
  document.getElementById('quizBar').style.width=((currentQ+1)/questions.length*100)+'%';
  document.getElementById('qEmoji').textContent=q.e;
  document.getElementById('qText').textContent=q.q;
  const opts=document.getElementById('qOptions');
  opts.innerHTML='';
  q.opts.forEach((opt,i)=>{
    const btn=document.createElement('button');
    btn.className='quiz-opt';
    btn.innerHTML=`<span>${['أ','ب','ج','د'][i]}</span> ${opt}`;
    btn.onclick=()=>selectOpt(i,btn);
    opts.appendChild(btn);
  });
  document.getElementById('qFeedback').className='quiz-feedback';
  document.getElementById('qFeedback').textContent='';
  document.getElementById('nextBtn').style.display='none';
  answered=false;
}
function selectOpt(i,btn){
  if(answered)return;answered=true;
  const q=questions[currentQ];
  const opts=document.querySelectorAll('.quiz-opt');
  opts.forEach(b=>b.disabled=true);
  if(i===q.a){score++;btn.classList.add('correct');}
  else{btn.classList.add('wrong');opts[q.a].classList.add('correct');}
  const fb=document.getElementById('qFeedback');
  fb.textContent=(i===q.a?'✅ إجابة صحيحة! ':' ❌ إجابة خاطئة. ')+q.fb;
  fb.className='quiz-feedback show '+(i===q.a?'ok':'bad');
  document.getElementById('nextBtn').style.display='block';
}
function nextQuestion(){
  currentQ++;
  if(currentQ>=questions.length){showScore();}
  else{loadQ();}
}
function showScore(){
  document.getElementById('quizArea').style.display='none';
  const box=document.getElementById('quizScore');box.classList.add('show');
  document.getElementById('scoreNum').textContent=score;
  document.getElementById('scoreTot').textContent='من '+questions.length;
  const pct=score/questions.length;
  let msg,sub;
  if(pct>=.9){msg='🏆 ممتاز جداً!';sub='أنت خبير في الأمن السيبراني، رائع!';}
  else if(pct>=.7){msg='⭐ جيد جداً!';sub='نتيجة جيدة، واصل التعلم.';}
  else if(pct>=.5){msg='💪 جيد!';sub='راجع الفيديوهات وحاول مرة أخرى.';}
  else{msg='📚 تحتاج مراجعة';sub='شاهد الفيديوهات التعليمية أولاً.';}
  document.getElementById('scoreMsg').textContent=msg;
  document.getElementById('scoreSub').textContent=sub;
}
function restartQuiz(){
  currentQ=0;score=0;answered=false;
  document.getElementById('quizScore').classList.remove('show');
  document.getElementById('quizArea').style.display='block';
  loadQ();
}
document.addEventListener('DOMContentLoaded',function(){
  const quizArea = document.getElementById('quizArea');
  if(quizArea) loadQ();
});

// ── GAMES ──
const matchData=[
  {term:'Phishing',def:'محاولة خداعك للكشف عن بيانات سرية'},
  {term:'Firewall',def:'جدار حماية يتحكم في حركة البيانات'},
  {term:'Malware',def:'برنامج خبيث يضر بجهازك'},
  {term:'Encryption',def:'تحويل البيانات إلى صيغة غير مقروءة'},
  {term:'2FA',def:'التحقق من الهوية بخطوتين'},
];
let selectedTerm=null,selectedDef=null,matchCount=0;
function startGame(type){
  const gameMenu = document.getElementById('gameMenu');
  if(gameMenu) gameMenu.style.display='none';
  if(type==='match'){
    const game = document.getElementById('matchGame');
    if(!game) return;
    selectedTerm=null;selectedDef=null;matchCount=0;
    game.classList.add('active');
    const terms=document.getElementById('matchTerms');
    const defs=document.getElementById('matchDefs');
    if(terms && defs){
      terms.innerHTML='';defs.innerHTML='';
      document.getElementById('matchCount').textContent=0;
      document.getElementById('matchTotal').textContent=matchData.length;
      const shuffledTerms=[...matchData].sort(()=>Math.random()-.5);
      const shuffledDefs=[...matchData].sort(()=>Math.random()-.5);
      shuffledTerms.forEach(item=>{
        const el=document.createElement('div');
        el.className='match-item';el.textContent=item.term;el.dataset.key=item.term;
        el.onclick=()=>selectMatch('term',el);
        terms.appendChild(el);
      });
      shuffledDefs.forEach(item=>{
        const el=document.createElement('div');
        el.className='match-item';el.textContent=item.def;el.dataset.key=item.term;
        el.onclick=()=>selectMatch('def',el);
        defs.appendChild(el);
      });
    }
  }
}
function selectMatch(type,el){
  if(el.classList.contains('matched'))return;
  if(type==='term'){
    document.querySelectorAll('#matchTerms .match-item').forEach(i=>i.classList.remove('selected'));
    el.classList.add('selected');selectedTerm=el;
  }else{
    document.querySelectorAll('#matchDefs .match-item').forEach(i=>i.classList.remove('selected'));
    el.classList.add('selected');selectedDef=el;
  }
  if(selectedTerm&&selectedDef){
    if(selectedTerm.dataset.key===selectedDef.dataset.key){
      selectedTerm.classList.remove('selected');selectedTerm.classList.add('matched');
      selectedDef.classList.remove('selected');selectedDef.classList.add('matched');
      matchCount++;document.getElementById('matchCount').textContent=matchCount;
      if(matchCount===matchData.length)setTimeout(()=>alert('🎉 أحسنت! طابقت جميع المصطلحات بنجاح!'),200);
    }else{
      selectedTerm.classList.add('wrong-flash');selectedDef.classList.add('wrong-flash');
      setTimeout(()=>{selectedTerm.classList.remove('wrong-flash','selected');selectedDef.classList.remove('wrong-flash','selected');},400);
    }
    selectedTerm=null;selectedDef=null;
  }
}

// TRUE/FALSE GAME
const tfData=[
  {q:'كلمة المرور القصيرة أكثر أماناً لأنها تُنسى بصعوبة',a:false,fb:'خطأ! كلمة المرور الطويلة والمعقدة هي الأكثر أماناً.'},
  {q:'يجب الإبلاغ عن الابتزاز الإلكتروني فوراً للجهات المختصة',a:true,fb:'صحيح! الإبلاغ الفوري هو الخطوة الأهم لحمايتك.'},
  {q:'يمكن الوثوق بأي موقع يحتوي على HTTPS',a:false,fb:'خطأ! HTTPS تعني التشفير فقط، لكن المحتوى قد يكون ضاراً.'},
  {q:'المصادقة الثنائية تزيد من أمان حساباتك',a:true,fb:'صحيح تماماً! إنها إحدى أفضل طرق حماية الحسابات.'},
  {q:'يمكن فتح المرفقات من رسائل مجهولة المصدر',a:false,fb:'خطأ خطير! المرفقات المشبوهة قد تحتوي فيروسات.'},
  {q:'تحديث البرامج بانتظام يساعد في حماية جهازك',a:true,fb:'صحيح! التحديثات تسد الثغرات الأمنية المكتشفة.'},
];
let tfIndex=0,tfScoreCount=0;
function startTrueFalse(){
  startTfGame();
}
function startTfGame(){
  const gameMenu = document.getElementById('gameMenu');
  if(gameMenu) gameMenu.style.display='none';
  const game = document.getElementById('tfGame');
  if(!game) return;
  tfIndex=0;tfScoreCount=0;
  game.classList.add('active');
  document.getElementById('tfScore').textContent=0;
  loadTF();
}
function loadTF(){
  if(tfIndex>=tfData.length){alert(`🎉 انتهت اللعبة! نقاطك: ${tfScoreCount} من ${tfData.length}`);closeGame('tfGame');return;}
  const item=tfData[tfIndex];
  document.getElementById('tfCounter').textContent=`السؤال ${tfIndex+1} من ${tfData.length}`;
  document.getElementById('tfEmoji').textContent=['🤔','💭','🧐','🔍','💡','⚡'][tfIndex];
  document.getElementById('tfText').textContent=item.q;
  document.getElementById('tfFeedback').className='quiz-feedback';
  document.getElementById('tfFeedback').textContent='';
  document.getElementById('tfNext').style.display='none';
  document.getElementById('tfTrue').disabled=false;document.getElementById('tfFalse').disabled=false;
}
function answerTF(ans){
  const item=tfData[tfIndex];
  document.getElementById('tfTrue').disabled=true;document.getElementById('tfFalse').disabled=true;
  const fb=document.getElementById('tfFeedback');
  if(ans===item.a){tfScoreCount++;document.getElementById('tfScore').textContent=tfScoreCount;fb.textContent='✅ صحيح! '+item.fb;fb.className='quiz-feedback show ok';}
  else{fb.textContent='❌ خطأ. '+item.fb;fb.className='quiz-feedback show bad';}
  document.getElementById('tfNext').style.display='block';
}
function nextTF(){tfIndex++;loadTF();}

// WORD GAME
const wordData=[
  {word:'VIRUS',hints:'• يصيب الملفات ويتكاثر\n• اسمه بالعربية: فيروس\n• يضر بجهازك الحاسوب\n• أول حرف: V'},
  {word:'HACKER',hints:'• شخص يخترق الأنظمة\n• يبحث عن الثغرات الأمنية\n• بعضهم يعمل لصالح الشركات\n• أول حرفين: HA'},
  {word:'SPAM',hints:'• رسائل غير مرغوب فيها\n• تملأ صندوق بريدك\n• قد تحتوي روابط خطرة\n• 4 أحرف فقط'},
  {word:'BACKUP',hints:'• نسخة احتياطية من بياناتك\n• يحميك من ضياع الملفات\n• يُستحسن عمله بانتظام\n• أول حرف: B'},
  {word:'COOKIE',hints:'• ملف صغير يحفظه المتصفح\n• يتذكر تفضيلاتك على المواقع\n• اسمه يعني حلوى بالإنجليزية\n• 6 أحرف'},
];
let wgIndex=0,wgScoreCount=0;
function startWordGame(){
  startWgGame();
}
function startWgGame(){
  const gameMenu = document.getElementById('gameMenu');
  if(gameMenu) gameMenu.style.display='none';
  const game = document.getElementById('wordGame');
  if(!game) return;
  wgIndex=0;wgScoreCount=0;
  game.classList.add('active');
  document.getElementById('wgScore').textContent=0;
  loadWG();
}
function loadWG(){
  if(wgIndex>=wordData.length){alert(`🎉 أحسنت! اكتشفت كل الكلمات المشفرة! نقاطك: ${wgScoreCount}`);closeGame('wordGame');return;}
  const item=wordData[wgIndex];
  document.getElementById('wgRound').textContent=`الجولة ${wgIndex+1} من ${wordData.length}`;
  document.getElementById('wgHint').textContent=item.hints;
  document.getElementById('wgInput').value='';
  document.getElementById('wgFeedback').textContent='';
  document.getElementById('wgReveal').textContent='_ '.repeat(item.word.length);
  document.getElementById('wgInput').focus();
}
function checkWord(){
  const val=document.getElementById('wgInput').value.trim().toUpperCase();
  const item=wordData[wgIndex];
  const fb=document.getElementById('wgFeedback');
  if(val===item.word){wgScoreCount+=20;document.getElementById('wgScore').textContent=wgScoreCount;fb.textContent='🎉 صحيح! +20 نقطة';fb.style.color='var(--green)';document.getElementById('wgReveal').textContent=item.word;setTimeout(()=>{wgIndex++;loadWG();},1200);}
  else{fb.textContent='❌ حاول مرة أخرى...';fb.style.color='var(--red)';}
}

// THREAT SORT GAME
const sortItems=[
  {name:'رسالة مزيفة من البنك',cat:'تصيد احتيالي'},
  {name:'فيروس في ملف مرفق',cat:'برمجيات خبيثة'},
  {name:'اختراق شبكة Wi-Fi',cat:'هجوم شبكي'},
  {name:'برنامج يطالب بفدية',cat:'برمجيات خبيثة'},
  {name:'سرقة كلمة مرور',cat:'تصيد احتيالي'},
  {name:'هجوم على الخادم',cat:'هجوم شبكي'},
];
const sortCats=['تصيد احتيالي','برمجيات خبيثة','هجوم شبكي'];
const catColors={'تصيد احتيالي':'var(--orange)','برمجيات خبيثة':'var(--red)','هجوم شبكي':'var(--cyan)'};
let sortScoreCount=0;
function startThreatSort(){
  startSortGame();
}
function startSortGame(){
  const gameMenu = document.getElementById('gameMenu');
  if(gameMenu) gameMenu.style.display='none';
  sortScoreCount=0;document.getElementById('sortScore').textContent=0;
  const game = document.getElementById('sortGame');
  if(!game) return;
  game.classList.add('active');
  const itemsDiv=document.getElementById('sortItems');
  const binsDiv=document.getElementById('sortBins');
  if(itemsDiv && binsDiv){
    itemsDiv.innerHTML='';binsDiv.innerHTML='';
    [...sortItems].sort(()=>Math.random()-.5).forEach((item,i)=>{
      const el=document.createElement('div');
      el.style.cssText=`background:rgba(255,255,255,0.07);border:1.5px solid rgba(255,255,255,0.15);border-radius:10px;padding:9px 16px;font-size:.85rem;cursor:pointer;transition:.2s`;
      el.textContent=item.name;el.dataset.cat=item.cat;
      el.onclick=function(){
        const active=document.querySelector('.sort-active');
        if(active)active.classList.remove('sort-active');
        this.style.borderColor='var(--yellow)';this.style.background='rgba(255,215,0,0.1)';
        this.classList.add('sort-active');
      };
      itemsDiv.appendChild(el);
    });
    sortCats.forEach(cat=>{
      const bin=document.createElement('div');
      bin.style.cssText=`border:2px dashed rgba(255,255,255,0.15);border-radius:12px;padding:16px;min-height:100px;text-align:center;cursor:pointer;transition:.2s`;
      bin.innerHTML=`<div style="font-weight:700;margin-bottom:10px;color:${catColors[cat]}">${cat}</div>`;
      bin.onclick=function(){
        const active=document.querySelector('.sort-active');
        if(!active)return;
        if(active.dataset.cat===cat){sortScoreCount+=10;document.getElementById('sortScore').textContent=sortScoreCount;const badge=document.createElement('div');badge.style.cssText=`background:rgba(0,255,136,0.1);border:1px solid rgba(0,255,136,0.3);color:var(--green);border-radius:6px;padding:4px 10px;font-size:.8rem;margin:4px auto;display:inline-block`;badge.textContent='✅ '+active.textContent;bin.appendChild(badge);active.remove();}
        else{active.style.borderColor='var(--red)';active.style.background='rgba(255,71,87,0.1)';setTimeout(()=>{active.style.borderColor='rgba(255,215,0,0.6)';active.style.background='rgba(255,215,0,0.1)';},400);}
      };
      binsDiv.appendChild(bin);
    });
  }
}

function closeGame(id){
  const game = document.getElementById(id);
  if(game) game.classList.remove('active');
  const gameMenu = document.getElementById('gameMenu');
  if(gameMenu) gameMenu.style.display='grid';
}

// ── EXERCISES ──
function toggleEx(id){
  const el=document.getElementById(id);if(el) el.classList.toggle('open');
}

// Init scenario for exercises page
const scenarios=[
  {q:'تلقيت رسالة على هاتفك تقول: \"مبروك! ربحت 500 ريال، انقر هنا لاستلام جائزتك\". ماذا تفعل؟',opts:['أنقر على الرابط فوراً للحصول على الجائزة','أحذف الرسالة وأبلغ عنها كبريد مزعج','أرسل الرسالة لأصدقائي لمشاركة الجائزة','أرد على الرسالة وأسأل عن التفاصيل'],correct:1,fb:'صحيح! هذا مثال كلاسيكي على التصيد الاحتيالي. الحذف والإبلاغ هو التصرف الصحيح دائماً.'},
];
document.addEventListener('DOMContentLoaded', function(){
  const scenarioContent = document.getElementById('scenarioContent');
  if(scenarioContent){
    const sc=scenarios[0];
    let html=`<div style="background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.2);border-radius:12px;padding:18px;margin-bottom:16px;font-size:.95rem;line-height:1.7">📱 ${sc.q}</div><div style="display:flex;flex-direction:column;gap:10px">`;
    sc.opts.forEach((opt,i)=>{
      html+=`<button onclick="answerScenario(${i})" style="background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,255,255,0.1);color:var(--text);border-radius:10px;padding:12px 16px;font-family:'Tajawal',sans-serif;font-size:.9rem;cursor:pointer;text-align:right;transition:.2s" id="sc${i}">${['أ','ب','ج','د'][i]}. ${opt}</button>`;
    });
    html+=`</div><div id="scResult" style="display:none;margin-top:14px;padding:12px;border-radius:10px;font-size:.9rem;font-weight:600"></div>`;
    scenarioContent.innerHTML=html;
  }
});
function answerScenario(i){
  const sc=scenarios[0];
  for(let j=0;j<sc.opts.length;j++){
    const btn=document.getElementById('sc'+j);if(btn){btn.disabled=true;
      if(j===sc.correct)btn.style.cssText+='border-color:var(--green);background:rgba(0,255,136,0.1);color:var(--green)';
      else if(j===i&&i!==sc.correct)btn.style.cssText+='border-color:var(--red);background:rgba(255,71,87,0.1);color:var(--red)';
    }
  }
  const res=document.getElementById('scResult');
  if(res){
    res.style.display='block';
    if(i===sc.correct){res.textContent='✅ إجابة ممتازة! '+sc.fb;res.style.cssText+='background:rgba(0,255,136,0.1);color:var(--green);border:1px solid rgba(0,255,136,0.3)';}
    else{res.textContent='❌ ليست الإجابة الصحيحة. '+sc.fb;res.style.cssText+='background:rgba(255,71,87,0.1);color:var(--red);border:1px solid rgba(255,71,87,0.3)';}
  }
}

// DRAG & DROP EXERCISE (mouse + touch via pointer events, plus tap-to-place)
(function(){
  let sel=null, drag=null;
  const bank=()=>document.getElementById('dragItems1');
  const HINT='<span class="slot-hint" style="color:var(--text2)">أفلت هنا</span>';
  function clearMarks(){
    document.querySelectorAll('#ex1 .drop-zone').forEach(z=>z.classList.remove('correct-drop','wrong-drop','drag-over'));
    const r=document.getElementById('exResult1');
    if(r){r.className='exercise-result';r.textContent='';}
  }
  function deselect(){ if(sel){sel.classList.remove('selected');sel=null;} }
  function tidySlot(slot){
    if(!slot||!slot.classList.contains('drop-slot'))return;
    if(!slot.querySelector('.drag-item')){ if(!slot.querySelector('.slot-hint')) slot.innerHTML=HINT; }
    else{ const h=slot.querySelector('.slot-hint'); if(h)h.remove(); }
  }
  function toBank(item){
    const from=item.parentElement;
    bank().appendChild(item);
    tidySlot(from);
  }
  function place(item,zone){
    clearMarks();
    const slot=zone.querySelector('.drop-slot');
    const from=item.parentElement;
    const prev=slot.querySelector('.drag-item');
    if(prev&&prev!==item){
      if(from.classList&&from.classList.contains('drop-slot')) from.appendChild(prev); else bank().appendChild(prev);
    }
    slot.appendChild(item);
    tidySlot(slot); tidySlot(from);
    item.classList.remove('selected','dragging');
    deselect();
  }
  function zoneAt(x,y){
    const el=document.elementFromPoint(x,y);
    return el?el.closest('#ex1 .drop-zone'):null;
  }
  function endDrag(){
    if(!drag)return;
    if(drag.ghost)drag.ghost.remove();
    drag.item.classList.remove('dragging');
    document.querySelectorAll('#ex1 .drop-zone.drag-over').forEach(z=>z.classList.remove('drag-over'));
    drag=null;
  }
  document.addEventListener('pointerdown',e=>{
    const item=e.target.closest&&e.target.closest('#ex1 .drag-item');
    if(!item||(e.pointerType==='mouse'&&e.button!==0))return;
    drag={item:item,id:e.pointerId,sx:e.clientX,sy:e.clientY,moved:false,ghost:null,ox:0,oy:0};
  });
  document.addEventListener('pointermove',e=>{
    if(!drag||e.pointerId!==drag.id)return;
    if(!drag.moved){
      if(Math.hypot(e.clientX-drag.sx,e.clientY-drag.sy)<8)return;
      drag.moved=true;
      const r=drag.item.getBoundingClientRect();
      const g=drag.item.cloneNode(true);
      g.classList.remove('selected','dragging');
      g.classList.add('drag-ghost');
      g.style.width=r.width+'px';
      document.body.appendChild(g);
      drag.ghost=g; drag.ox=drag.sx-r.left; drag.oy=drag.sy-r.top;
      drag.item.classList.add('dragging');
    }
    e.preventDefault();
    drag.ghost.style.left=(e.clientX-drag.ox)+'px';
    drag.ghost.style.top=(e.clientY-drag.oy)+'px';
    const z=zoneAt(e.clientX,e.clientY);
    document.querySelectorAll('#ex1 .drop-zone').forEach(zz=>zz.classList.toggle('drag-over',zz===z));
  },{passive:false});
  document.addEventListener('pointerup',e=>{
    if(!drag||e.pointerId!==drag.id)return;
    const item=drag.item;
    if(drag.moved){
      const z=zoneAt(e.clientX,e.clientY);
      endDrag();
      if(z) place(item,z);
      else if(item.parentElement!==bank()){ clearMarks(); toBank(item); }
    }else{
      endDrag();
      // tap behaviour
      const inSlot=item.parentElement.classList.contains('drop-slot');
      if(inSlot){
        if(sel&&sel!==item) place(sel,item.closest('.drop-zone'));
        else { clearMarks(); toBank(item); deselect(); }
      }else{
        if(sel===item) deselect();
        else { deselect(); sel=item; item.classList.add('selected'); }
      }
    }
  });
  document.addEventListener('pointercancel',e=>{ if(drag&&e.pointerId===drag.id) endDrag(); });
  document.addEventListener('click',e=>{
    const zone=e.target.closest&&e.target.closest('#ex1 .drop-zone');
    if(!zone||e.target.closest('.drag-item')||!sel)return;
    place(sel,zone);
  });
  document.addEventListener('dragstart',e=>{ if(e.target.closest&&e.target.closest('#ex1'))e.preventDefault(); });

  window.resetDrag=function(){
    clearMarks(); deselect();
    document.querySelectorAll('#ex1 .drag-item').forEach(it=>{ bank().appendChild(it); });
    document.querySelectorAll('#ex1 .drop-slot').forEach(sl=>{ sl.innerHTML=HINT; });
  };
})();
function checkDrag(){
  const zones=document.querySelectorAll('#ex1 .drop-zone');
  let correct=0, filled=0;
  zones.forEach(zone=>{
    zone.classList.remove('correct-drop','wrong-drop');
    const item=zone.querySelector('.drop-slot .drag-item');
    if(item)filled++;
    if(item&&item.dataset.id===zone.dataset.correct){correct++;zone.classList.add('correct-drop');}
    else{zone.classList.add('wrong-drop');}
  });
  const res=document.getElementById('exResult1');
  if(res){
    if(filled<zones.length){res.className='exercise-result show bad';res.textContent='رتّب جميع الخطوات الأربع أولاً ثم اضغط تحقق.';return;}
    if(correct===4){res.className='exercise-result show ok';res.textContent='🎉 ممتاز! رتّبت جميع الخطوات بشكل صحيح!';}
    else{res.className='exercise-result show bad';res.textContent=`أصبت في ${correct} من 4. حاول مرة أخرى!`;}
  }
}
function checkFillBlanks(){
  const answers={blank1:['spyware','سبايوير'],blank2:['تشفير','https','بروتوكول تشفير'],blank3:['خطوتين','خطوتان','2','اثنتين'],blank4:['phishing','فيشينج','التصيد']};
  let correct=0,total=4;
  Object.keys(answers).forEach(id=>{
    const inp=document.getElementById(id);
    if(inp){
      const val=inp.value.trim().toLowerCase();
      const valid=answers[id].some(a=>val.includes(a.toLowerCase()));
      if(valid){inp.className='blank-input correct';correct++;}
      else{inp.className='blank-input wrong';}
    }
  });
  const res=document.getElementById('exResult2');if(res){
    res.classList.add('show');
    if(correct===total){res.className='exercise-result show ok';res.textContent='🎉 ممتاز! أجبت على جميع الفراغات بشكل صحيح!';}
    else{res.className='exercise-result show bad';res.textContent=`أصبت في ${correct} من ${total} فراغات.`;}
  }
}

// ── CERTIFICATE ──
function generateCert(){
  const name=document.getElementById('certName');
  if(!name || !name.value.trim()){alert('يرجى إدخال اسمك الكامل');return;}
  const grade=document.getElementById('certGrade').value;
  const topic=document.getElementById('certTopic').value;
  document.getElementById('certNameDisplay').textContent=name.value.trim();
  document.getElementById('certGradeDisplay').textContent=grade;
  document.getElementById('certTopicDisplay').textContent=topic;
  const now=new Date();
  const months=['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
  document.getElementById('certDate').textContent=`${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}م`;
  const preview=document.getElementById('certPreview');
  if(preview) {
    preview.classList.add('show');
    preview.scrollIntoView({behavior:'smooth',block:'center'});
  }
}
function printCert(){
  const nameEl = document.getElementById('certNameDisplay');
  const gradeEl = document.getElementById('certGradeDisplay');
  const topicEl = document.getElementById('certTopicDisplay');
  const dateEl = document.getElementById('certDate');
  
  if(!nameEl || !gradeEl || !topicEl || !dateEl) return;
  
  const name = nameEl.textContent;
  const grade = gradeEl.textContent;
  const topic = topicEl.textContent;
  const date = dateEl.textContent;

  const printContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>شهادة إتمام — ${name}</title>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html, body {
    width: 297mm; height: 210mm;
    font-family: 'Tajawal', sans-serif;
    direction: rtl;
    background: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    color-adjust: exact;
  }

  @page {
    size: A4 landscape;
    margin: 0;
  }

  @media print {
    html, body { width: 297mm; height: 210mm; }
    .no-print { display: none !important; }
  }

  .cert-page {
    width: 297mm;
    height: 210mm;
    position: relative;
    overflow: hidden;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* ── خلفية زخرفية ── */
  .cert-bg-pattern {
    position: absolute; inset: 0; z-index: 0;
    background:
      radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,180,100,0.04) 0%, transparent 70%),
      radial-gradient(ellipse 40% 50% at 10% 10%, rgba(0,100,200,0.05) 0%, transparent 50%),
      radial-gradient(ellipse 40% 50% at 90% 90%, rgba(180,100,0,0.05) 0%, transparent 50%);
  }

  /* ── إطار خارجي ── */
  .cert-outer-border {
    position: absolute; inset: 8mm;
    border: 3px solid #c8a84b;
    border-radius: 4px;
    z-index: 1;
    pointer-events: none;
  }
  .cert-inner-border {
    position: absolute; inset: 11mm;
    border: 1px solid rgba(200,168,75,0.5);
    border-radius: 3px;
    z-index: 1;
    pointer-events: none;
  }

  /* ── زوايا زخرفية ── */
  .corner {
    position: absolute; z-index: 2;
    width: 20mm; height: 20mm;
    pointer-events: none;
  }
  .corner svg { width: 100%; height: 100%; }
  .corner-tl { top: 6mm; right: 6mm; }
  .corner-tr { top: 6mm; left: 6mm; transform: scaleX(-1); }
  .corner-bl { bottom: 6mm; right: 6mm; transform: scaleY(-1); }
  .corner-br { bottom: 6mm; left: 6mm; transform: scale(-1); }

  /* ── الشريط العلوي ── */
  .cert-top-bar {
    position: absolute; top: 0; left: 0; right: 0;
    height: 14mm;
    background: linear-gradient(135deg, #0a2240 0%, #1a3a60 50%, #0a2240 100%);
    z-index: 3;
    display: flex; align-items: center; justify-content: center; gap: 12px;
  }
  .cert-top-bar .bar-text {
    font-family: 'Cairo', sans-serif;
    font-weight: 700; font-size: 9pt;
    color: rgba(255,255,255,0.85);
    letter-spacing: 1px;
  }
  .cert-top-bar .bar-dot {
    width: 4px; height: 4px; border-radius: 50%;
    background: #c8a84b;
  }

  /* ── الشريط السفلي ── */
  .cert-bottom-bar {
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 10mm;
    background: linear-gradient(135deg, #0a2240 0%, #1a3a60 50%, #0a2240 100%);
    z-index: 3;
    display: flex; align-items: center; justify-content: center; gap: 6px;
  }
  .cert-bottom-bar span {
    font-size: 7pt; color: rgba(255,255,255,0.6);
    font-family: 'Cairo', sans-serif;
  }
  .cert-bottom-bar .gold { color: #c8a84b; font-weight: 700; }

  /* ── المحتوى الرئيسي ── */
  .cert-content {
    position: relative; z-index: 4;
    width: 100%; height: 100%;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 16mm 20mm 14mm;
    text-align: center;
  }

  /* ── الشعار + اسم الجهة ── */
  .cert-header-row {
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 4mm;
  }
  .cert-shield {
    width: 16mm; height: 16mm;
    background: linear-gradient(135deg, #0a2240, #1a5080);
    border-radius: 40% 40% 50% 50%;
    border: 2px solid #c8a84b;
    display: flex; align-items: center; justify-content: center;
    font-size: 16pt;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    flex-shrink: 0;
  }
  .cert-institution {
    text-align: center;
  }
  .cert-ministry {
    font-family: 'Cairo', sans-serif; font-weight: 700;
    font-size: 8pt; color: #4a6080; margin-bottom: 1mm;
    letter-spacing: 0.5px;
  }
  .cert-school {
    font-family: 'Cairo', sans-serif; font-weight: 900;
    font-size: 11pt; color: #0a2240;
  }
  .cert-subject-line {
    font-size: 7.5pt; color: #6080a0; margin-top: 1mm;
    font-family: 'Tajawal', sans-serif;
  }

  /* ── الخط الفاصل الذهبي ── */
  .gold-divider {
    width: 160mm; height: 2px;
    background: linear-gradient(90deg, transparent, #c8a84b 20%, #e8c870 50%, #c8a84b 80%, transparent);
    margin: 3mm auto;
    position: relative;
  }
  .gold-divider::before {
    content: '❖';
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    background: #fff; padding: 0 6px;
    color: #c8a84b; font-size: 10pt;
  }

  /* ── عنوان الشهادة ── */
  .cert-main-heading {
    font-family: 'Cairo', sans-serif; font-weight: 900;
    font-size: 28pt; color: #0a2240;
    letter-spacing: 2px;
    text-shadow: 1px 1px 0 rgba(200,168,75,0.3);
    margin: 1mm 0;
    line-height: 1.2;
  }
  .cert-presented-label {
    font-size: 10pt; color: #607090;
    font-family: 'Cairo', sans-serif; font-weight: 600;
    margin-bottom: 2mm;
  }

  /* ── اسم الطالب ── */
  .cert-student-name {
    font-family: 'Cairo', sans-serif; font-weight: 900;
    font-size: 22pt;
    background: linear-gradient(135deg, #0a2240 0%, #1a5080 50%, #0a2240 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    border-bottom: 2px solid #c8a84b;
    padding-bottom: 1mm; margin-bottom: 1mm;
    min-width: 120mm; text-align: center;
  }
  .cert-student-grade-txt {
    font-size: 9pt; color: #607090;
    font-family: 'Tajawal', sans-serif; font-weight: 500;
    margin-bottom: 3mm;
  }

  /* ── النص التمهيدي ── */
  .cert-body {
    font-size: 10pt; color: #405060;
    font-family: 'Cairo', sans-serif; font-weight: 600;
    line-height: 1.8; margin-bottom: 2mm;
  }

  /* ── موضوع الشهادة ── */
  .cert-topic-box {
    display: inline-block;
    background: linear-gradient(135deg, #f0f8ff, #e8f4ff);
    border: 2px solid #c8a84b;
    border-radius: 6px;
    padding: 3mm 12mm;
    font-family: 'Cairo', sans-serif; font-weight: 900;
    font-size: 13pt; color: #0a2240;
    margin-bottom: 4mm;
    box-shadow: 0 2px 8px rgba(200,168,75,0.2);
  }

  /* ── بادجات الأنشطة ── */
  .cert-activities {
    display: flex; gap: 5mm; justify-content: center;
    flex-wrap: wrap; margin-bottom: 5mm;
  }
  .cert-activity-badge {
    background: #f5f8fc;
    border: 1px solid #c8d8e8;
    border-radius: 4px;
    padding: 1.5mm 5mm;
    font-size: 7.5pt; color: #405070;
    font-family: 'Tajawal', sans-serif; font-weight: 600;
    display: flex; align-items: center; gap: 4px;
  }
  .cert-activity-badge .dot {
    width: 5px; height: 5px; border-radius: 50%;
    flex-shrink: 0;
  }

  /* ── الفوتر: توقيع + ختم + تاريخ ── */
  .cert-footer-row {
    display: flex; justify-content: space-between;
    align-items: flex-end;
    width: 100%; margin-top: auto;
    border-top: 1px solid rgba(200,168,75,0.4);
    padding-top: 3mm;
  }
  .cert-footer-col {
    text-align: center; min-width: 55mm;
  }
  .footer-label {
    font-size: 7pt; color: #8090a0;
    font-family: 'Tajawal', sans-serif;
    margin-bottom: 4mm;
  }
  .footer-value {
    font-family: 'Cairo', sans-serif; font-weight: 700;
    font-size: 9pt; color: #0a2240;
  }
  .footer-sub {
    font-size: 7pt; color: #607090;
    font-family: 'Tajawal', sans-serif;
    margin-top: 1mm;
  }
  .signature-line {
    width: 45mm; height: 1px;
    background: #c8a84b;
    margin: 0 auto 2mm;
  }

  /* ── الختم ── */
  .cert-stamp {
    width: 20mm; height: 20mm;
    border-radius: 50%;
    border: 2.5px solid #c8a84b;
    background: radial-gradient(circle, #f8f4e8, #fff);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    margin: 0 auto;
    box-shadow: 0 0 0 1px rgba(200,168,75,0.3), inset 0 0 8px rgba(200,168,75,0.1);
    font-size: 11pt;
  }
  .cert-stamp-text {
    font-size: 5.5pt; color: #c8a84b;
    font-family: 'Cairo', sans-serif; font-weight: 700;
    margin-top: 1px;
    letter-spacing: 0.3px;
  }

  /* ── رقم الشهادة ── */
  .cert-id {
    position: absolute; bottom: 12mm; left: 50%;
    transform: translateX(-50%);
    z-index: 5; font-size: 6pt; color: #a0b0c0;
    font-family: monospace;
  }

  /* ── زر الطباعة (لا يظهر عند الطباعة) ── */
  .print-actions {
    position: fixed; bottom: 20px; left: 50%;
    transform: translateX(-50%);
    display: flex; gap: 12px; z-index: 100;
  }
  .btn-print {
    background: linear-gradient(135deg, #0a2240, #1a4060);
    color: #fff; border: none; padding: 12px 28px;
    border-radius: 8px; font-family: 'Cairo', sans-serif;
    font-weight: 700; font-size: 14px; cursor: pointer;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    transition: .2s;
  }
  .btn-print:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.4); }
  .btn-close {
    background: #fff; color: #405060;
    border: 1.5px solid #c8d8e8; padding: 12px 20px;
    border-radius: 8px; font-family: 'Cairo', sans-serif;
    font-weight: 600; font-size: 13px; cursor: pointer;
  }

  @media print {
    .print-actions { display: none !important; }
    body { background: #fff; }
  }
</style>
</head>
<body>

<div class="cert-page">

  <!-- خلفية -->
  <div class="cert-bg-pattern"></div>

  <!-- إطارات -->
  <div class="cert-outer-border"></div>
  <div class="cert-inner-border"></div>

  <!-- زوايا زخرفية -->
  <div class="corner corner-tl">
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 80 L0 10 Q0 0 10 0 L80 0" stroke="#c8a84b" stroke-width="2.5" fill="none"/>
      <path d="M8 80 L8 16 Q8 8 16 8 L80 8" stroke="rgba(200,168,75,0.35)" stroke-width="1" fill="none"/>
      <circle cx="10" cy="10" r="4" fill="#c8a84b"/>
      <path d="M0 30 L12 18" stroke="#c8a84b" stroke-width="1.5" opacity="0.5"/>
      <path d="M30 0 L18 12" stroke="#c8a84b" stroke-width="1.5" opacity="0.5"/>
    </svg>
  </div>
  <div class="corner corner-tr">
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 80 L0 10 Q0 0 10 0 L80 0" stroke="#c8a84b" stroke-width="2.5" fill="none"/>
      <path d="M8 80 L8 16 Q8 8 16 8 L80 8" stroke="rgba(200,168,75,0.35)" stroke-width="1" fill="none"/>
      <circle cx="10" cy="10" r="4" fill="#c8a84b"/>
      <path d="M0 30 L12 18" stroke="#c8a84b" stroke-width="1.5" opacity="0.5"/>
      <path d="M30 0 L18 12" stroke="#c8a84b" stroke-width="1.5" opacity="0.5"/>
    </svg>
  </div>
  <div class="corner corner-bl">
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 80 L0 10 Q0 0 10 0 L80 0" stroke="#c8a84b" stroke-width="2.5" fill="none"/>
      <path d="M8 80 L8 16 Q8 8 16 8 L80 8" stroke="rgba(200,168,75,0.35)" stroke-width="1" fill="none"/>
      <circle cx="10" cy="10" r="4" fill="#c8a84b"/>
    </svg>
  </div>
  <div class="corner corner-br">
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 80 L0 10 Q0 0 10 0 L80 0" stroke="#c8a84b" stroke-width="2.5" fill="none"/>
      <path d="M8 80 L8 16 Q8 8 16 8 L80 8" stroke="rgba(200,168,75,0.35)" stroke-width="1" fill="none"/>
      <circle cx="10" cy="10" r="4" fill="#c8a84b"/>
    </svg>
  </div>

  <!-- الشريط العلوي -->
  <div class="cert-top-bar">
    <span class="bar-text">سلطنة عُمان</span>
    <span class="bar-dot"></span>
    <span class="bar-text">وزارة التعليم</span>
    <span class="bar-dot"></span>
    <span class="bar-text"> مدرسة جابر بن حيان (9-12)</span>
  </div>

  <!-- المحتوى الرئيسي -->
  <div class="cert-content">

    <div class="cert-header-row">
      <div class="cert-shield">🛡️</div>
      <div class="cert-institution">
        <div class="cert-ministry">وزارة التعليم — سلطنة عُمان</div>
        <div class="cert-school">مدرسة جابر بن حيان (9-12)</div>
        <div class="cert-subject-line">قسم تقنية المعلومات</div>
      </div>
      <div class="cert-shield">🏅</div>
    </div>

    <div class="gold-divider"></div>

    <div class="cert-main-heading">شـهـادة تـقـديـر</div>

    <div class="cert-presented-label">تُمنح هذه الشهادة إلى الطالب </div>

    <div class="cert-student-name">${name}</div>
    <div class="cert-student-grade-txt">${grade}</div>

    <div class="cert-body">
      تقديراً واعترافاً بإتمامه بنجاح جميع أنشطة وفعاليات
    </div>

    <div class="cert-topic-box">🛡️ ${topic}</div>

    <div class="cert-activities">
      <div class="cert-activity-badge"><span class="dot" style="background:#2a8a50"></span>الفيديوهات التعليمية</div>
      <div class="cert-activity-badge"><span class="dot" style="background:#1a70c0"></span>الاختبار التفاعلي</div>
      <div class="cert-activity-badge"><span class="dot" style="background:#c07020"></span>الألعاب التعليمية</div>
      <div class="cert-activity-badge"><span class="dot" style="background:#7030b0"></span>التمارين التطبيقية</div>
    </div>

    <div class="cert-footer-row">
      <div class="cert-footer-col">
        <div class="footer-label">توقيع المعلم</div>
        <div class="signature-line"></div>
        <div class="footer-value">الأستاذ فيصل العريبي</div>
        <div class="footer-sub">معلم تقنية المعلومات</div>
      </div>

      <div class="cert-footer-col">
        <div class="cert-stamp">
          🏫
          <div class="cert-stamp-text">موثّقة</div>
        </div>
        <div style="margin-top:2mm;font-size:6.5pt;color:#a0b0c0;font-family:'Cairo',sans-serif">مدرسة جابر بن حيان (9-12)</div>
      </div>

      <div class="cert-footer-col">
        <div class="footer-label">تاريخ الإصدار</div>
        <div class="signature-line"></div>
        <div class="footer-value">${date}</div>
        <div class="footer-sub">1447 هـ</div>
      </div>
    </div>

  </div>

  <!-- الشريط السفلي -->
  <div class="cert-bottom-bar">
    <span>هذه الشهادة صادرة عن</span>
    <span class="gold">مدرسة جابر بن حيان (9-12)</span>
    <span>—</span>
    <span>قسم تقنية المعلومات</span>
    <span>—</span>
    <span>أسبوع الأمن السيبراني 2026</span>
  </div>

</div>

<!-- أزرار الطباعة -->
<div class="print-actions no-print">
  <button class="btn-print" onclick="window.print()">🖨️ طباعة الشهادة</button>
  <button class="btn-close" onclick="window.close()">✕ إغلاق</button>
</div>

<script>
  // تأخير بسيط ثم عرض معالج الطباعة
  window.onload = function() {
    document.fonts.ready.then(function() {
      // الشهادة جاهزة
    });
  };
<\/script>
</body>
</html>`;

  const w = window.open('', '_blank', 'width=1100,height=800');
  w.document.write(printContent);
  w.document.close();
}

// ── MOBILE NAV TOGGLE ──
let navOpen = false;
document.addEventListener('click', function(e) {
  if (e.target.matches('.nav-hamburger')) {
    const links = document.querySelector('.nav-links');
    navOpen = !navOpen;
    if (navOpen) {
      links.style.display = 'flex';
    } else {
      links.style.display = 'none';
    }
  }
});

