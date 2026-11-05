'use strict';
const $=id=>document.getElementById(id);
const [tray,specimen,forceps,feedback,pull,reveal,under]=['tray','specimen','forceps','feedback','pull','reveal','under'].map($);
const storeKey='bio106-fish-lab-v1';
const total=stages.reduce((n,s)=>n+s.targets.length,0);
const key=(s,t)=>s+':'+t;
let found=new Set(), opened=new Set([0]), stage=0, target=0, point=null, dragging=null;
try {
  const saved=JSON.parse(localStorage.getItem(storeKey)||'null');
  if(saved){found=new Set(saved.found.filter(k=>stages.some((s,i)=>s.targets.some((_,j)=>key(i,j)===k))));opened=new Set([0,...saved.opened.filter(i=>Number.isInteger(i)&&i>0&&i<stages.length)]);stage=Math.max(0,Math.min(saved.stage||0,unlocked()));}
}catch{}
function save(){try{localStorage.setItem(storeKey,JSON.stringify({found:[...found],opened:[...opened],stage}));}catch{}}
function done(i){return stages[i].targets.every((_,j)=>found.has(key(i,j)));}
function unlocked(){let i=0;while(i<stages.length-1&&done(i))i++;return i;}
function tell(message,kind=''){feedback.className=kind;feedback.textContent=message;}
function button(label,fn){const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',fn);return b;}
function select(i,focus=false){
  if(i>unlocked())return;
  stage=i;const s=stages[i];target=s.targets.findIndex((_,j)=>!found.has(key(i,j)));if(target<0)target=0;
  point=null;forceps.hidden=true;
  const covered=!!s.pull&&!opened.has(i);
  specimen.src=covered?stages[i-1].image:s.image;
  specimen.width=s.width;specimen.height=s.height;
  specimen.style.aspectRatio=s.width+' / '+s.height;
  specimen.alt=s.alt;
  reveal.hidden=!covered;
  if(covered)under.src=s.image;else under.removeAttribute('src');
  pull.value=0;updatePull();
  $('opening').hidden=!covered;
  $('pull-label').textContent=s.pull||'';
  $('stage-kicker').textContent='STATION '+String(i+1).padStart(2,'0')+' / '+String(stages.length).padStart(2,'0');
  $('stage-title').textContent=s.title;$('stage-desc').textContent=s.desc;
  $('caption').textContent=s.credit;
  tell(covered?'Pull the layer back to begin checking structures.':'Position the tip of the forceps on the requested structure.');
  render();save();if(focus)$('stage-title').focus();
}
function updatePull(){const n=Number(pull.value);$('amount').value=n+'%';reveal.style.clipPath='inset(0 '+(100-n)+'% 0 0)';}
function openLayer(){if(opened.has(stage))return;opened.add(stage);specimen.src=stages[stage].image;reveal.hidden=true;under.removeAttribute('src');$('opening').hidden=true;tell('Layer revealed. Find the highlighted checklist target.');render();save();tray.focus();}
pull.addEventListener('input',updatePull);
pull.addEventListener('change',()=>{if(Number(pull.value)===100)openLayer();});
$('open-all').addEventListener('click',openLayer);
function available(){return !stages[stage].pull||opened.has(stage);}
function choose(j){target=j;point=null;forceps.hidden=true;tell(found.has(key(stage,j))?explain(stages[stage].targets[j]):'Place the forceps on this structure, or use a hint.',found.has(key(stage,j))?'good':'');render();}
function explain(t){return 'Correct. '+t[6]+' Fetal pig: '+t[7];}
function check(ok){
  if(!available()){tell('Reveal the layer before checking an identification.');return;}
  const t=stages[stage].targets[target];
  if(ok){found.add(key(stage,target));tell(explain(t),'good');render();save();}
  else tell('Incorrect. The forceps or description did not match '+t[0].toLowerCase()+'. '+t[5],'bad');
}
function place(x,y){
  point=[Math.max(0,Math.min(100,x)),Math.max(0,Math.min(100,y))];
  forceps.hidden=false;forceps.style.left=point[0]+'%';forceps.style.top=point[1]+'%';
}
function hit(){const [,x,y,rx,ry]=stages[stage].targets[target];if(point)check(((point[0]-x)/rx)**2+((point[1]-y)/ry)**2<=1);}
function fromPointer(e){const r=tray.getBoundingClientRect();return [(e.clientX-r.left)/r.width*100,(e.clientY-r.top)/r.height*100];}
tray.addEventListener('pointerdown',e=>{if(!available()||e.button!==0||!e.isPrimary)return;dragging=e.pointerId;tray.setPointerCapture(e.pointerId);place(...fromPointer(e));});
tray.addEventListener('pointermove',e=>{if(available()&&(e.pointerType==='mouse'||dragging===e.pointerId))place(...fromPointer(e));});
tray.addEventListener('pointerup',e=>{if(dragging!==e.pointerId)return;dragging=null;const [x,y]=fromPointer(e);if(x>=0&&x<=100&&y>=0&&y<=100){place(x,y);hit();}});
tray.addEventListener('pointercancel',()=>{dragging=null;});
tray.addEventListener('keydown',e=>{
  if(!available())return;
  const delta={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];
  if(delta){e.preventDefault();const [x,y]=point||[50,50];const step=e.shiftKey?0.5:2;place(x+delta[0]*step,y+delta[1]*step);}
  if(e.key==='Enter'||e.key===' '){e.preventDefault();if(!point)place(50,50);hit();}
});
function makeChoices(s){
  const wanted=s.targets[target];
  const pool=s.targets.filter(t=>t!==wanted);
  for(const t of stages.flatMap(st=>st.targets))if(pool.length<3&&t!==wanted&&!pool.some(p=>p[5]===t[5]))pool.push(t);
  const options=pool.slice(0,3);options.splice((stage*3+target+1)%4,0,wanted);
  $('choices').replaceChildren(...options.map(t=>button(t[5],()=>{check(t===wanted);if(t===wanted)$('next-target').disabled?$('next-stage').focus():$('next-target').focus();})));
}
function render(){
  const s=stages[stage], was=document.activeElement;
  const checklistFocus=was?.closest?.('#checklist button')?.dataset.target;
  $('count').textContent=found.size+' of '+total+' structures identified';
  $('progress').max=total;$('progress').value=found.size;
  $('stages').replaceChildren(...stages.map((st,i)=>{
    const b=button((done(i)?'✓ ':'')+(i+1)+'. '+st.short,()=>select(i,true));
    b.disabled=i>unlocked();if(i===stage)b.setAttribute('aria-current','step');return b;
  }));
  $('target-label').textContent=s.targets[target][0];
  $('checklist').replaceChildren(...s.targets.map((t,j)=>{
    const li=document.createElement('li');const b=button((found.has(key(stage,j))?'✓ ':'○ ')+t[0],()=>choose(j));
    b.dataset.target=j;b.setAttribute('aria-pressed',String(j===target));li.append(b);return li;
  }));
  if(checklistFocus!==undefined)$('checklist').querySelector('[data-target="'+checklistFocus+'"]').focus();
  $('markers').replaceChildren(...s.targets.flatMap((t,j)=>{
    if(!available()||!found.has(key(stage,j)))return [];
    const p=document.createElement('span');p.className='pin';p.textContent='✓';p.style.left=t[1]+'%';p.style.top=t[2]+'%';return [p];
  }));
  $('hint').disabled=!available();$('next-target').disabled=done(stage)||!available();
  $('text-mode').hidden=!available();makeChoices(s);
  $('next-stage').disabled=!done(stage);
  $('next-stage').textContent=stages[stage+1]?.action||'Go to lab debrief';
  const left=s.targets.filter((_,j)=>!found.has(key(stage,j))).length;
  $('unlock').textContent=left?'Identify '+left+' more to finish this station.':'Station complete. You can return to any unlocked station.';
  $('summary').textContent=summary();
}
function summary(){return 'BIO 106 fish dissection: '+found.size+'/'+total+' structures identified; '+stages.filter((_,i)=>done(i)).length+'/'+stages.length+' stations complete.';}
$('hint').addEventListener('click',()=>tell('Hint: '+stages[stage].targets[target][5]));
$('next-target').addEventListener('click',()=>{
  const ts=stages[stage].targets;
  for(let k=1;k<=ts.length;k++){const j=(target+k)%ts.length;if(!found.has(key(stage,j))){choose(j);break;}}
});
$('next-stage').addEventListener('click',()=>{
  if(!done(stage))return;
  if(stage+1<stages.length)select(stage+1,true);else $('debrief-title').focus();
});
$('copy').addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(summary());$('copy-status').textContent='Progress summary copied.';}
  catch{$('copy-status').textContent='Select and copy the progress summary above.';}
});
$('reset').addEventListener('click',()=>{if(confirm('Clear your checklist and return to the intact specimen?')){found=new Set();opened=new Set([0]);$('copy-status').textContent='';select(0,true);}});
select(stage);
