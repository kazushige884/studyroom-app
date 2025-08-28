import { $, $$ } from './utils.js';
import { SIZE } from './config.js';
import { loadLayout, saveLayout, loadName, saveName } from './storage.js';

export function initLayoutView(){
  $('#btnBackFromLayout').onclick = ()=> window.gotoMain();
  $('#roomName').value = loadName();
  $('#roomName').addEventListener('input', e=> saveName(e.target.value.trim()));
  renderEditor();
  $('#allWall').onclick = ()=>{ /* TODO: 既存ロジック移植 */ };
  $('#allHall').onclick = ()=>{ /* TODO */ };
  $('#saveBtn').onclick  = ()=>{ /* TODO: JSON保存 */ };
  $('#openBtn').onclick  = ()=> $('#fileOpen').click();
  $('#fileOpen').addEventListener('change', ()=>{ /* TODO: JSON読み込み */ });
}
function renderEditor(){
  const cells = $('#cells'); cells.innerHTML='';
  // TODO: 既存の 10x10 描画＋クリック/長押し処理を移植
  for(let i=0;i<SIZE*SIZE;i++){
    const d=document.createElement('div'); d.className='cell'; cells.appendChild(d);
  }
}