import { $, $$ } from './utils.js';
import { LS } from './config.js';
import { initSlideshowUI } from './slideshow.js';
import { initLayoutView } from './layout.js';
import { initRunView } from './run.js';
import { openScan } from './scan.js';

window.gotoMain  = ()=> show('view-main');
window.gotoTitle = ()=> show('view-title');
window.gotoSS    = ()=> show('view-ss');
window.gotoLayout= ()=> show('view-layout');
window.openScan  = openScan;

function show(id){
  document.querySelectorAll('section.container').forEach(s=>s.classList.add('hidden'));
  $(id).classList.remove('hidden');
}

// タイトル
$('#btnTitleLogin').onclick = ()=>{
  const rid = ($('#roomIdTop').value||'').trim();
  if(!rid || rid.length<3){ alert('教室ID（先頭3桁以上）を入力してください'); return; }
  localStorage.setItem(LS.ROOM_PREFIX, rid);
  gotoMain();
};

// メインメニュー
$('#btnGoSs').onclick = ()=>{ initSlideshowUI(); gotoSS(); };
$('#btnGoLayout').onclick = ()=>{ initLayoutView(); gotoLayout(); };
$('#btnGoRun').onclick = ()=>{ initRunView(); show('view-run'); };
$('#btnOpenEnter').onclick = ()=> openScan('enter');
$('#btnOpenLeave').onclick = ()=> openScan('leave');

// 初期表示
gotoTitle();