// Visitas: GoatCounter (sem cookie, sempre ligado).
// Pixel da Meta: só depois do "Aceitar" no aviso de cookies (LGPD).
(function () {
  var PIXEL_ID = ''; // ID do Pixel da Meta (Gerenciador de Eventos). Vazio = sem pixel e sem aviso.

  var gc = document.createElement('script');
  gc.async = true;
  gc.src = 'https://gc.zgo.at/count.js';
  gc.dataset.goatcounter = 'https://oluan.goatcounter.com/count';
  document.head.appendChild(gc);

  // clique no WhatsApp vira evento nos dois
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href*="wa.me"]');
    if (!a) return;
    if (window.goatcounter && goatcounter.count) goatcounter.count({ path: 'clique-whatsapp', title: location.pathname, event: true });
    if (window.fbq) fbq('track', 'Contact');
  });

  if (!PIXEL_ID) return;

  function pixel() {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', PIXEL_ID);
    fbq('track', 'PageView');
  }

  var KEY = 'oluan-cookies', v = null;
  try { v = localStorage.getItem(KEY); } catch (e) {}
  if (v === 'sim') return pixel();
  if (v === 'nao') return;

  var box = document.createElement('div');
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-label', 'Aviso de cookies');
  box.style.cssText = 'position:fixed;z-index:60;right:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));max-width:min(380px,calc(100vw - 32px));' +
    'background:var(--bg2,#0d0d10);color:var(--ink,#f2f1ee);border:1px solid var(--line,rgba(255,255,255,.08));border-radius:16px;padding:18px;' +
    'font:14px/1.5 Inter,system-ui,sans-serif;box-shadow:0 12px 40px rgba(0,0,0,.5)';
  box.innerHTML = '<p style="margin:0 0 14px;color:var(--ink2,#a4a39e)">Uso cookies da Meta para medir se os anúncios trazem gente até aqui. Nada é vendido.</p>' +
    '<div style="display:flex;gap:8px;justify-content:flex-end">' +
    '<button data-v="nao" style="min-height:40px;padding:8px 16px;border-radius:999px;border:1px solid var(--line,rgba(255,255,255,.15));background:transparent;color:inherit;font:600 13px Inter,sans-serif;cursor:pointer">Recusar</button>' +
    '<button data-v="sim" style="min-height:40px;padding:8px 16px;border-radius:999px;border:0;background:var(--acc,#c8ff2e);color:var(--acc-ink,#0a0a0a);font:600 13px Inter,sans-serif;cursor:pointer">Aceitar</button></div>';
  box.addEventListener('click', function (e) {
    var r = e.target.getAttribute && e.target.getAttribute('data-v');
    if (!r) return;
    try { localStorage.setItem(KEY, r); } catch (err) {}
    box.remove();
    if (r === 'sim') pixel();
  });
  document.body.appendChild(box);
})();
