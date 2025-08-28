import { $, $$ } from './utils.js';
import { loadSsSettings, saveSsSettings, loadSsMedia, saveSsMedia } from './storage.js';
import { openBgmPicker } from './bgm-picker.js';

let ssTimer=null, ssIdleMs=600000;
let ssEnabled=false;
let ssFilesArr=[];
let ssBgmUrl='', ssBgmTitle='';
let ssAudio=null;
let ssIndex=0, ssShowingA=true, ssRunning=false;
const overlay = $('#ssOverlay'), layerA=$('#ssLayerA'), layerB=$('#ssLayerB');

export function initSlideshowUI(){
  const s = loadSsSettings();
  ssEnabled = !!s.enabled;
  ssIdleMs = Math.max(1000, (s.idleMin||10)*60000);
  window.__ssDurationSec = Math.max(3, s.durationSec||10);
  ssBgmUrl = s.bgmUrl||'';
  ssBgmTitle = s.bgmTitle||'';
  ssFilesArr = loadSsMedia();

  $('#ssEnabled').checked = ssEnabled;
  $('#ssIdleMin').value = Math.round(ssIdleMs/60000);
  $('#ssDuration').value = window.__ssDurationSec;
  updateBgmNow();

  $('#btnSsBack').onclick = ()=> window.gotoMain();
  $('#btnSsSave').onclick = ()=>{ saveSettingsFromUI(); alert('保存しました'); resetIdleTimer(); };
  $('#btnSsTest').onclick = ()=>{ saveSettingsFromUI(); startSlideShow(); };
  $('#ssFiles').addEventListener('change', onPickMedia);
  $('#clearMedia').onclick = ()=>{
    ssFilesArr=[]; saveSsMedia(ssFilesArr); $('#ssFiles').value='';
  };
  $('#btnPickBgm').onclick = ()=> openBgmPicker(({url, title})=>{
    ssBgmUrl=url; ssBgmTitle=title||''; saveSettingsFromUI();
  });
  $('#clearBgm').onclick = ()=>{ ssBgmUrl=''; ssBgmTitle=''; saveSettingsFromUI(); };
  startIdleWatch();
}

function updateBgmNow(){
  $('#bgmNow').textContent = ssBgmUrl ? `選択中：${ssBgmTitle||'(タイトルなし)'}` : '（未選択）';
}
function saveSettingsFromUI(){
  ssEnabled = $('#ssEnabled').checked;
  ssIdleMs  = Math.max(1000, Number($('#ssIdleMin').value||10)*60000);
  window.__ssDurationSec = Math.max(3, Number($('#ssDuration').value||10));
  saveSsSettings({ enabled:ssEnabled, idleMin: Math.round(ssIdleMs/60000), durationSec: window.__ssDurationSec, bgmUrl:ssBgmUrl, bgmTitle:ssBgmTitle });
  updateBgmNow();
}
async function onPickMedia(e){
  const files = Array.from(e.target.files||[]);
  const list = [];
  for (const f of files){
    if (!/^image\/|^video\//.test(f.type)) continue;
    const url = URL.createObjectURL(f);
    list.push({type: f.type.startsWith('image/') ? 'image':'video', url});
  }
  ssFilesArr = list; saveSsMedia(ssFilesArr);
}

function startIdleWatch(){
  ['mousemove','mousedown','touchstart','keydown','pointerdown'].forEach(ev=>{
    window.addEventListener(ev, resetIdleTimer, {passive:true});
  });
  resetIdleTimer();
}
function resetIdleTimer(){
  if (ssTimer) clearTimeout(ssTimer);
  const s = loadSsSettings();
  if (!s.enabled || loadSsMedia().length===0){ stopSlideShow(); return; }
  ssTimer = setTimeout(startSlideShow, Math.max(1000, (s.idleMin||10)*60000));
}
function startSlideShow(){
  if (!ssEnabled || ssFilesArr.length===0) return;
  ssRunning = true; ssIndex = 0; ssShowingA = true;
  overlay.style.display='flex';
  if (ssBgmUrl){
    try{ ssAudio?.pause(); }catch{}
    ssAudio = new Audio(ssBgmUrl); ssAudio.loop = true; ssAudio.crossOrigin='anonymous';
    ssAudio.play().catch(()=>{});
  }
  showNext();
}
function stopSlideShow(){
  if (!ssRunning) return;
  ssRunning=false; overlay.style.display='none';
  layerA.innerHTML=''; layerB.innerHTML=''; try{ ssAudio?.pause(); }catch{}
}
overlay.addEventListener('click', ()=>{ stopSlideShow(); resetIdleTimer(); });

function showNext(){
  if (!ssRunning) return;
  const item = ssFilesArr[ssIndex % ssFilesArr.length];
  const dur = Math.max(3, window.__ssDurationSec||10);
  const layer = ssShowingA ? layerB : layerA;
  layer.innerHTML='';
  if (item.type==='image'){
    const img=document.createElement('img'); img.src=item.url; img.className='ssImg';
    layer.appendChild(img); placeAndKenBurns(img); crossfade();
    setTimeout(()=>{ ssIndex++; showNext(); }, dur*1000);
  }else{
    const vd=document.createElement('video'); vd.src=item.url; vd.className='ssVid'; vd.autoplay=true; vd.loop=false; vd.muted=true; vd.playsInline=true;
    vd.addEventListener('ended', ()=>{ ssIndex++; showNext(); }, {once:true});
    vd.addEventListener('loadeddata', ()=>{ crossfade(); vd.play().catch(()=>{}); });
    layer.appendChild(vd);
  }
}
function crossfade(){
  const show = ssShowingA ? layerB : layerA;
  const hide = ssShowingA ? layerA : layerB;
  show.classList.add('show'); hide.classList.remove('show'); ssShowingA = !ssShowingA;
}
function placeAndKenBurns(img){
  const startScale = 1.05, endScale = 1.15;
  const dx = (Math.random()<0.5? -1:1) * 20;
  const dy = (Math.random()<0.5? -1:1) * 12;
  img.style.transformOrigin='center center';
  img.style.transform='translate(-50%,-50%) scale(1)';
  img.animate([
    { transform:`translate(-50%,-50%) scale(${startScale}) translate(0px,0px)` },
    { transform:`translate(-50%,-50%) scale(${endScale}) translate(${dx}px,${dy}px)` }
  ], { duration: Math.max(3000, (window.__ssDurationSec||10)*1000), easing:'ease-in-out', fill:'forwards' });
}