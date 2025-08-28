:root{
  --bg:#000; --text:#eaeaea; --panel:#111; --border:#2a2a2a;
  --blue:#4fc3f7; --navy:#0b2a6b; --pink:#ffc0cb; --red:#ff2d55;
  --gap:4px; --cell:42px;
}
html,body{height:100%;margin:0;background:var(--bg);color:var(--text);
  font-family:system-ui,-apple-system,"Segoe UI",Roboto,"Noto Sans JP",sans-serif}
.hidden{display:none !important}
.container{min-height:100%;padding:16px;box-sizing:border-box}
.title{font-weight:800}
.btn{border:1px solid var(--border);border-radius:10px;padding:8px 12px;cursor:pointer}
.btn.primary{background:#fff;color:#000}
.btn.ghost{background:#1b1b1b;color:#fff;border:1px solid var(--border)}
.login-inline{margin:0 auto;display:flex;flex-direction:column;gap:18px;background:#111;border:1px solid var(--border);border-radius:14px;padding:16px 20px;width:min(92vw,900px)}
.inline-row{display:grid;grid-template-columns:260px 1fr;gap:16px;align-items:center}
.inline-input{font-size:40px;padding:12px 14px;border-radius:10px;border:1px solid var(--border);background:#0f0f0f;color:#fff;outline:none;width:100%;box-sizing:border-box}
.file-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.note{color:#9aa0a6}
.card{background:#111;border:1px solid var(--border);border-radius:14px;padding:16px}
.grid{width:fit-content;margin:0 auto;background:#1b1b1b;border:1px solid #2a2a2a;padding:12px;border-radius:14px}
.cells{display:grid;gap:var(--gap);grid-template-columns:repeat(10,var(--cell));grid-template-rows:repeat(10,var(--cell))}
.live-wrap{height:calc(100vh - 220px);background:#111;border:1px solid var(--border);border-radius:14px;padding:12px;display:flex;align-items:center;justify-content:center}
.live-grid{display:grid;gap:var(--gap)}
.clock{width:100%;height:20vh;display:flex;flex-direction:column;align-items:center;justify-content:center;border:1px solid var(--border);border-radius:14px;background:#0f0f0f;font-weight:700;letter-spacing:.05em}
.btn-big{border:none;border-radius:14px;cursor:pointer;font-weight:800;padding:18px 40px;box-shadow:0 8px 24px rgba(0,0,0,.25)}
.btn-enter{background:var(--blue);color:var(--navy);font-size:36pt}
.btn-leave{background:var(--pink);color:var(--red);font-size:36pt}
#ssOverlay{position:fixed;inset:0;background:#000;display:none;align-items:center;justify-content:center;z-index:9999;cursor:none}
#ssStage{position:relative;width:100vw;height:100vh;overflow:hidden;background:#000}
.ssLayer{position:absolute;inset:0;opacity:0;transition:opacity 1200ms ease}
.ssLayer.show{opacity:1}
.ssImg,.ssVid{position:absolute;top:50%;left:50%;transform-origin:center center}
.ssVid{max-width:100vw;max-height:100vh;transform:translate(-50%,-50%)}