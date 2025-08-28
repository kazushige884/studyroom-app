export const $ = (sel, root=document) => root.querySelector(sel);
export const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
export const escapeHtml = s => String(s||'').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
export const fmt2 = n => String(n).padStart(2,'0');
export const fmtDate = iso => {
  try{ if(!iso) return '—'; const d=new Date(iso); if(isNaN(d)) return '—';
    return `${d.getFullYear()}-${fmt2(d.getMonth()+1)}-${fmt2(d.getDate())} ${fmt2(d.getHours())}:${fmt2(d.getMinutes())}`;
  }catch{return '—'}
};
export const fmtSize = n => {
  const v=Number(n); if(!isFinite(v)||v<=0) return '—';
  if(v>=1024*1024*1024) return (v/1024/1024/1024).toFixed(2)+' GB';
  if(v>=1024*1024) return (v/1024/1024).toFixed(1)+' MB';
  if(v>=1024) return Math.round(v/1024)+' KB';
  return v+' B';
};