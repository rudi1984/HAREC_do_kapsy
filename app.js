"use strict";
const $=id=>document.getElementById(id);
const KEY='harec-ham-A-v07'; // Do not change: v0.7 progress remains readable.
let db=[],pool=[],index=0,answered=false,score=0,attempted=0,currentChoices=[],sessionWrong=[];
let state={total:0,correct:0,wrong:[]};
try{const saved=JSON.parse(localStorage.getItem(KEY));if(saved&&Array.isArray(saved.wrong))state={total:Number(saved.total)||0,correct:Number(saved.correct)||0,wrong:saved.wrong}}catch{}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch{}}
function shuffle(items){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function show(view){for(const id of ['home','setup','session','done','more'])$(id).hidden=id!==view;window.scrollTo(0,0)}
function stat(){let old=null;try{old=JSON.parse(localStorage.getItem('harec-v1'))}catch{};$('homeNumber').innerHTML='';$('homeNumber').append(document.createTextNode(String(state.total)+' '));let x=document.createElement('span');x.textContent='odpovědí';$('homeNumber').append(x);$('homeStats').textContent=`${state.correct} správně · ${state.wrong.length} otázek k opakování`;$('progress-info').textContent=`Nová databáze: ${state.total} vyhodnocených odpovědí, ${state.correct} správných, ${state.wrong.length} různých chybných otázek. ${old?'Dřívější kvíz: '+(old.total||0)+' odpovědí (archiv).':''} Starší data zůstávají nedotčená.`}
function setupFilters(){for(const g of [...new Set(db.map(q=>q.group))])$('group').append(new Option(g,g));updateTopics()}
function updateTopics(){const g=$('group').value,t=$('topic');t.replaceChildren(new Option('Všechna podtémata',''));for(const n of [...new Set(db.filter(q=>!g||q.group===g).map(q=>q.topic))])t.append(new Option(n,n));updateCount()}
function filtered(){const g=$('group').value,t=$('topic').value,m=$('mode').value;return db.filter(q=>(!g||q.group===g)&&(!t||q.topic===t)&&(m!=='wrong'||state.wrong.includes(q.id)))}
function updateCount(){const n=filtered().length;$('available').textContent=`Dostupných otázek: ${n}`;$('start').disabled=!n;$('setupError').textContent=n?'':'Pro tento výběr nejsou dostupné otázky.'}
function startWith(questions,mode,limit){pool=shuffle(questions);if(limit>0)pool=pool.slice(0,limit);if(!pool.length){show('setup');$('setupError').textContent='Pro tento výběr nejsou dostupné otázky.';return} $('mode').value=mode;index=0;answered=false;score=0;attempted=0;sessionWrong=[];show('session');render()}
function start(){startWith(filtered(),$('mode').value,Number($('limit').value))}
function render(){if(index>=pool.length){finish();return}answered=false;const q=pool[index];$('position').textContent=`Otázka ${index+1} z ${pool.length}`;$('session-score').textContent=`Správně ${score}/${attempted}`;$('progress').max=pool.length;$('progress').value=index;$('category').textContent=`${q.group} · ${q.topic} · kód ${q.code}`;$('question').textContent=q.question;$('feedback').textContent='';$('answers').replaceChildren();$('next').hidden=true;$('skip').hidden=false;$('learn-grade').hidden=true;$('reveal').hidden=true;const learn=$('mode').value==='learn';currentChoices=shuffle(q.options.map((txt,i)=>({txt,original:i})));if(learn){$('reveal').hidden=false}else{currentChoices.forEach((choice,j)=>{const b=document.createElement('button');b.type='button';b.className='answer';const letter=document.createElement('strong');letter.textContent=['A','B','C'][j];b.append(letter,document.createTextNode(choice.txt));b.addEventListener('click',()=>choose(j));$('answers').append(b)})}const u=new URL('https://github.com/rudi1984/Radioamat-rsk-zkou-ky-/issues/new');u.searchParams.set('title',`Otázka ${q.code} (${q.id}) – chyba`);u.searchParams.set('body',`Téma: ${q.topic}\nOtázka: ${q.question}\nPoznámka: `);$('report').href=u.toString();$('question').focus({preventScroll:true})}
function record(ok,q){attempted++;state.total++;if(ok){score++;state.correct++;state.wrong=state.wrong.filter(x=>x!==q.id)}else{if(!state.wrong.includes(q.id))state.wrong.push(q.id);if(!sessionWrong.includes(q.id))sessionWrong.push(q.id)}save();stat()}
function choose(i){if(answered)return;answered=true;const q=pool[index],ok=currentChoices[i].original===q.correct;record(ok,q);for(let j=0;j<currentChoices.length;j++){const b=$('answers').children[j];b.disabled=true;if(currentChoices[j].original===q.correct)b.classList.add('correct');else if(j===i)b.classList.add('incorrect')}$('feedback').textContent=ok?'Správně!':'Nesprávně. Správná odpověď: '+q.options[q.correct];$('next').hidden=false;$('skip').hidden=true;$('session-score').textContent=`Správně ${score}/${attempted}`}
function grade(ok){if(answered)return;answered=true;record(ok,pool[index]);$('learn-grade').hidden=true;$('next').hidden=false;$('skip').hidden=true}
function finish(){show('done');const pct=attempted?Math.round(score/attempted*100):0;$('resultNumber').textContent=`${score} / ${attempted}`;$('result').textContent=`${pct} % správných z vyhodnocených odpovědí. Přeskočeno: ${pool.length-attempted}.`;$('resultProgress').value=pct;$('retryWrong').hidden=sessionWrong.length===0;stat()}
function quit(){if(!window.confirm('Opravdu ukončit rozpracovanou sérii? Dosavadní odpovědi zůstanou v pokroku.'))return;show('home')}
$('quickStart').onclick=()=>startWith(db,'quiz',10);
$('openCustom').onclick=()=>{updateCount();show('setup')};$('setupBack').onclick=()=>show('home');
$('startLearn').onclick=()=>startWith(db,'learn',10);
$('startWrong').onclick=()=>{if(!state.wrong.length){show('setup');$('mode').value='wrong';updateCount();return}startWith(db.filter(q=>state.wrong.includes(q.id)),'wrong',0)};
$('openMore').onclick=()=>show('more');$('moreBack').onclick=()=>show('home');document.querySelector('.notice a').onclick=event=>{event.preventDefault();show('more');$('sources').open=true};
$('start').onclick=start;$('next').onclick=()=>{index++;render()};$('skip').onclick=()=>{index++;render()};$('quit').onclick=quit;
$('again').onclick=()=>{updateCount();show('setup')};$('doneHome').onclick=()=>show('home');
$('retryWrong').onclick=()=>startWith(db.filter(q=>sessionWrong.includes(q.id)),'wrong',0);
$('reveal').onclick=()=>{const q=pool[index];$('feedback').textContent='Správná odpověď: '+q.options[q.correct];$('reveal').hidden=true;$('learn-grade').hidden=false};$('easy').onclick=()=>grade(true);$('hard').onclick=()=>grade(false);
$('group').onchange=updateTopics;$('topic').onchange=updateCount;$('mode').onchange=updateCount;
$('export').onclick=()=>{const legacy={};for(const key of ['harec-v1','harec-bank-2025']){try{legacy[key]=JSON.parse(localStorage.getItem(key))}catch{legacy[key]=null}}const file={application:'HAREC do kapsy',version:'0.8-beta',exportedAt:new Date().toISOString(),state,legacy};const url=URL.createObjectURL(new Blob([JSON.stringify(file,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='harec-zaloha-v08.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000)};
fetch('./questions.json').then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.json()}).then(data=>{db=data.questions;if(!Array.isArray(db)||db.length!==584||db.some(q=>!Array.isArray(q.options)||q.options.length!==3||!Number.isInteger(q.correct)||q.correct<0||q.correct>2))throw Error('Neočekávaná databáze');setupFilters();stat();$('count').textContent=`${db.length} otázek`;$('quickStart').disabled=false;$('startLearn').disabled=false;$('startWrong').disabled=false}).catch(err=>{$('count').textContent='Databáze nedostupná';$('homeStats').textContent='Načtení se nezdařilo. Otevři aplikaci online a zkontroluj questions.json. '+err.message;stat()});
// Version update prompt. Do not clear storage or unconditionally reload while studying.
if('serviceWorker'in navigator&&location.protocol==='https:'){
 let waiting=null;
 const display=worker=>{waiting=worker;$('updateNotice').hidden=false};
 navigator.serviceWorker.register('./sw.js').then(reg=>{
  if(reg.waiting&&navigator.serviceWorker.controller)display(reg.waiting);
  reg.addEventListener('updatefound',()=>{const worker=reg.installing;if(worker)worker.addEventListener('statechange',()=>{if(worker.state==='installed'&&navigator.serviceWorker.controller)display(worker)})});
  reg.update().catch(()=>{});
 }).catch(()=>{});
 $('updateNow').onclick=()=>{if(!waiting)return;if(!$('session').hidden&&!window.confirm('Běží rozpracovaný test. Aktualizovat aplikaci a ukončit tuto sérii? Dosavadní odpovědi zůstanou uložené.'))return;waiting.postMessage({type:'SKIP_WAITING'})};
 let reloading=false;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(!reloading){reloading=true;location.reload()}});
}
