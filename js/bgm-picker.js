import { BGM_API_BASE } from './config.js';
import { $, escapeHtml, fmtDate, fmtSize } from './utils.js';

async function getPlayableUrlFromBgmApp(id){
  try{
    const r = await fetch(`${BGM_API_BASE}/geturl?id=${encodeURIComponent(id)}`, { mode:'cors', credentials:'omit' });
    if(r.ok){
      const js = await r.json().catch(()=>null);
      if(js && js.ok && js.url) return js.url;
    }
  }catch{}
  return `${BGM_API_BASE}/download?id=${encodeURIComponent(id)}`;
}

export function openBgmPicker(onPicked){
  const dlg = $('#bgmPicker');
  const tbody = $('#bgmTbody');
  const msg = $('#bgmPickMsg');
  const preview = $('#bgmPreview');

  let picked = null;

  async function loadList(){
    tbody.innerHTML = `<tr><td colspan="4" class="center muted">読み込み中…</td></tr>`;
    try{
      const r = await fetch(`${BGM_API_BASE}/list`, { mode:'cors', credentials:'omit' });
      const js = await r.json();
      if(!(js && js.ok && Array.isArray(js.items))) throw new Error('一覧が取得できません');
      if(js.items.length===0){
        tbody.innerHTML = `<tr><td colspan="4" class="center muted">ファイルはありません（BGM管理アプリでアップロードしてください）</td></tr>`;
        return;
      }
      const frag = document.createDocumentFragment();
      js.items.forEach(it=>{
        const tr = document.createElement('tr');
        tr.className = 'pick-row';
        tr.innerHTML = `
          <td class="title">${escapeHtml(it.title || it.key || it.id || '')}</td>
          <td>${fmtDate(it.date)}</td>
          <td class="right">${fmtSize(it.size)}</td>
          <td class="center">
            <button class="btn btn-preview" data-id="${it.id}" data-title="${escapeHtml(it.title || '')}">試聴</button>
          </td>
        `;
        tr.addEventListener('dblclick', async ()=>{
          await previewAndPick(it);
        });
        frag.appendChild(tr);
      });
      tbody.innerHTML='';
      tbody.appendChild(frag);
    }catch(err){
      tbody.innerHTML = `<tr><td colspan="4" class="center" style="color:#ff6b6b">取得失敗：${escapeHtml(err?.message||String(err))}</td></tr>`;
    }
  }

  async function previewAndPick(it){
    try{
      msg.textContent = 'URL 取得中…';
      const url = await getPlayableUrlFromBgmApp(it.id);
      const bust = (url.includes('?')?'&':'?')+'v='+Date.now();
      preview.pause(); preview.src = url + bust;
      await preview.play().catch(()=>{});
      picked = { id: it.id, title: it.title || '', url };
      msg.textContent = `選択中：${it.title || '(タイトルなし)'}`;
    }catch{ msg.textContent = '再生に失敗しました'; }
  }

  dlg.style.display='flex';
  loadList();

  document.addEventListener('click', clickHandler);
  function clickHandler(ev){
    const tgt = ev.target;
    if (tgt.id === 'bgmCancel'){
      cleanup(); dlg.style.display='none';
    } else if (tgt.id === 'bgmOk'){
      if(!picked){ alert('BGMを選択してください'); return; }
      onPicked && onPicked(picked);
      cleanup(); dlg.style.display='none';
    } else if (tgt.id === 'bgmReload'){
      loadList();
    } else if (tgt.closest && tgt.closest('#bgmPicker .btn-preview')){
      const btn = tgt.closest('#bgmPicker .btn-preview');
      const id = btn.dataset.id;
      const title = btn.dataset.title || '';
      previewAndPick({ id, title });
    }
  }
  function cleanup(){
    document.removeEventListener('click', clickHandler);
    try{ preview.pause(); }catch{}
  }
}