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

// ── SMOOTH SCROLL FOR NAV ──
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
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

// ── MOBILE NAV TOGGLE ──
document.addEventListener('DOMContentLoaded', function(){
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if(!toggle || !links) return;

  toggle.addEventListener('click', function(e){
    e.stopPropagation();
    const isOpen = links.classList.toggle('open');
    toggle.textContent = isOpen ? '✕' : '☰';
  });

  // إغلاق عند الضغط على رابط
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.textContent = '☰';
    });
  });

  // إغلاق عند الضغط خارج القائمة
  document.addEventListener('click', function(e){
    if(!toggle.contains(e.target) && !links.contains(e.target)){
      links.classList.remove('open');
      toggle.textContent = '☰';
    }
  });
});

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

// ── QUIZ DATA & LOGIC ──
const questions=[
  {q:'ما معنى كلمة "Phishing"؟',e:'🎣',opts:['التصيد الاحتيالي','برنامج خبيث','جدار الحماية','التشفير'],a:0,fb:'التصيد الاحتيالي هو محاولة خداعك للكشف عن بيانات سرية عبر رسائل مزيفة.'},
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
function startTrueFalse(){startTfGame();}
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
function startWordGame(){startWgGame();}
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
function startThreatSort(){startSortGame();}
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
    [...sortItems].sort(()=>Math.random()-.5).forEach((item)=>{
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
        if(active.dataset.cat===cat){
          sortScoreCount+=10;document.getElementById('sortScore').textContent=sortScoreCount;
          const badge=document.createElement('div');
          badge.style.cssText=`background:rgba(0,255,136,0.1);border:1px solid rgba(0,255,136,0.3);color:var(--green);border-radius:6px;padding:4px 10px;font-size:.8rem;margin:4px auto;display:inline-block`;
          badge.textContent='✅ '+active.textContent;bin.appendChild(badge);active.remove();
        }else{
          active.style.borderColor='var(--red)';active.style.background='rgba(255,71,87,0.1)';
          setTimeout(()=>{active.style.borderColor='rgba(255,215,0,0.6)';active.style.background='rgba(255,215,0,0.1)';},400);
        }
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
const scenarios=[
  {q:'تلقيت رسالة على هاتفك تقول: "مبروك! ربحت 500 ريال، انقر هنا لاستلام جائزتك". ماذا تفعل؟',opts:['أنقر على الرابط فوراً للحصول على الجائزة','أحذف الرسالة وأبلغ عنها كبريد مزعج','أرسل الرسالة لأصدقائي لمشاركة الجائزة','أرد على الرسالة وأسأل عن التفاصيل'],correct:1,fb:'صحيح! هذا مثال كلاسيكي على التصيد الاحتيالي. الحذف والإبلاغ هو التصرف الصحيح دائماً.'},
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

// DRAG & DROP
let draggedItem=null;
document.addEventListener('dragstart',e=>{if(e.target.classList.contains('drag-item')){draggedItem=e.target;e.target.classList.add('dragging');}});
document.addEventListener('dragend',e=>{if(e.target.classList.contains('drag-item'))e.target.classList.remove('dragging');});
function dropItem(e,slotId){
  e.preventDefault();
  if(!draggedItem)return;
  const slot=document.getElementById(slotId);
  if(slot){
    slot.innerHTML='';
    const clone=draggedItem.cloneNode(true);clone.removeAttribute('draggable');clone.style.cursor='default';
    slot.appendChild(clone);
    draggedItem.style.opacity='.3';draggedItem.style.pointerEvents='none';
  }
  draggedItem=null;
}
function checkDrag(){
  const zones=document.querySelectorAll('#ex1 .drop-zone');
  let correct=0;
  const slotIds=['zone1a','zone1b','zone1c','zone1d'];
  zones.forEach((zone,i)=>{
    const slot=document.getElementById(slotIds[i]);
    const item=slot?slot.querySelector('.drag-item'):null;
    if(item&&item.dataset.id===zone.dataset.correct){correct++;zone.classList.add('correct-drop');}
    else{zone.classList.add('wrong-drop');}
  });
  const res=document.getElementById('exResult1');if(res){
    res.classList.add('show');
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
  if(preview){preview.classList.add('show');preview.scrollIntoView({behavior:'smooth',block:'center'});}
}
function printCert(){
  const nameEl=document.getElementById('certNameDisplay');
  const gradeEl=document.getElementById('certGradeDisplay');
  const topicEl=document.getElementById('certTopicDisplay');
  const dateEl=document.getElementById('certDate');
  if(!nameEl||!gradeEl||!topicEl||!dateEl)return;
  const name=nameEl.textContent;
  const grade=gradeEl.textContent;
  const topic=topicEl.textContent;
  const date=dateEl.textContent;
  const printContent=`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>شهادة — ${name}</title></head><body><p>شهادة تقدير — ${name} — ${grade} — ${topic} — ${date}</p><script>window.print();<\/script></body></html>`;
  const w=window.open('','_blank','width=1100,height=800');
  w.document.write(printContent);
  w.document.close();
}
