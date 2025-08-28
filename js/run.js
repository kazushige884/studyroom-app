import { $, fmt2 } from './utils.js';
import { loadName } from './storage.js';

export function initRunView(){
  $('#runRoomTitle').textContent = loadName();
  $('#btnBackFromRun').onclick = ()=> backToMain();
  $('#dateText').textContent = dateStr(new Date());
  $('#timeText').textContent = timeStr(new Date());
  setInterval(()=>{ const d=new Date(); $('#timeText').textContent = timeStr(d); }, 30000);
  // TODO: 既存の座席レンダリング/操作を移植
}
function backToMain(){
  // TODO: パスワード確認→戻る（既存ロジック移植）
  window.gotoMain();
}
const dateStr = d => `${d.getFullYear()}/${fmt2(d.getMonth()+1)}/${fmt2(d.getDate())}`;
const timeStr = d => `${fmt2(d.getHours())}:${fmt2(d.getMinutes())}`;