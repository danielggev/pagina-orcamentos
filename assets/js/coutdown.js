/* ============================================
   GRUDADO EM VOCÊ — coutdown.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- SELETOR DE COR DO PROTÓTIPO ---------- */
  const themePicker = document.getElementById('cd-theme-picker');
  const themeTrigger = document.getElementById('cd-theme-trigger');
  const themeSwatches = document.querySelectorAll('.cd-theme-picker__swatch');

  if (themePicker && themeTrigger && themeSwatches.length) {
    const setPickerOpen = (open) => {
      themePicker.classList.toggle('is-open', open);
      themeTrigger.setAttribute('aria-expanded', String(open));
      themeTrigger.setAttribute(
        'aria-label',
        open ? 'Fechar seletor de cores' : 'Abrir seletor de cores'
      );
    };

    themeTrigger.addEventListener('click', () => {
      setPickerOpen(!themePicker.classList.contains('is-open'));
    });

    themeSwatches.forEach((swatch) => {
      swatch.addEventListener('click', () => {
        document.documentElement.style.setProperty('--cd-accent', swatch.dataset.themeColor);
        document.documentElement.style.setProperty('--cd-accent-rgb', swatch.dataset.themeRgb);
        document.documentElement.style.setProperty('--cd-submit-text', swatch.dataset.themeText);

        themeSwatches.forEach((item) => {
          const active = item === swatch;
          item.classList.toggle('is-active', active);
          item.setAttribute('aria-pressed', String(active));
        });

        setPickerOpen(false);
      });
    });

    document.addEventListener('click', (event) => {
      if (!themePicker.contains(event.target)) setPickerOpen(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        setPickerOpen(false);
        themeTrigger.focus();
      }
    });
  }

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
