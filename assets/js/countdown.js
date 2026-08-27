/* ============================================
   GRUDADO EM VOCÊ — countdown.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- CONTAGEM REGRESSIVA ---------- */
  const elDays = document.getElementById('cd-days');
  const elHours = document.getElementById('cd-hours');
  const elMinutes = document.getElementById('cd-minutes');
  const elSeconds = document.getElementById('cd-seconds');

  if (elDays && elHours && elMinutes && elSeconds) {
    const target = new Date(2026, 10, 1, 0, 0, 0); // 01/11/2026 00:00

    const pad = (n) => String(n).padStart(2, '0');

    function tick() {
      const diff = Math.max(0, target.getTime() - Date.now());

      elDays.textContent = pad(Math.floor(diff / 86400000));
      elHours.textContent = pad(Math.floor((diff / 3600000) % 24));
      elMinutes.textContent = pad(Math.floor((diff / 60000) % 60));
      elSeconds.textContent = pad(Math.floor((diff / 1000) % 60));
    }

    tick();
    setInterval(tick, 1000);
  }

  /* ---------- FORMULÁRIO ---------- */
  const WHATSAPP = '5521991909015';

  const form = document.getElementById('cd-form');
  const status = document.getElementById('cd-status');
  const celular = document.getElementById('cd-celular');

  /* Máscara (99) 99999-9999 — reescreve a partir dos dígitos, então
     apagar no meio do campo não deixa parênteses ou traço órfãos. */
  function maskPhone(value) {
    const d = value.replace(/\D/g, '').slice(0, 11);

    if (d.length <= 2) return d;
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  }

  if (celular) {
    celular.addEventListener('input', () => {
      celular.value = maskPhone(celular.value);

      // Fixo tem 10 dígitos, móvel tem 11 — os dois passam
      const digits = celular.value.replace(/\D/g, '').length;
      celular.setCustomValidity(
        digits === 0 || digits >= 10 ? '' : 'Informe o DDD e o número completo.'
      );
    });
  }

  function showStatus(message, ok) {
    if (!status) return;
    status.textContent = message;
    status.hidden = false;
    status.style.color = ok ? 'var(--gv-verde)' : 'var(--gv-rosa)';
    status.style.background = ok ? 'var(--gv-verde-10)' : 'var(--gv-rosa-10)';
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const nome = form.nome.value.trim();
      const email = form.email.value.trim();
      const tel = form.celular.value.trim();

      const msg = 'Olá! Quero entrar para a Lista VIP da Black Friday da Grudado em Você:\n\n'
        + `*Nome:* ${nome}\n`
        + `*E-mail:* ${email}\n`
        + `*Celular:* ${tel}`;

      const win = window.open(
        `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,
        '_blank',
        'noopener'
      );

      if (!win) {
        showStatus('Libere os pop-ups do navegador para concluir seu cadastro.', false);
        return;
      }

      form.hidden = true;
      showStatus('Prontinho! Você já está na nossa Lista VIP. 🎉', true);
    });
  }

});
