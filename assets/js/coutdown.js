/* ============================================
   GRUDADO EM VOCÊ — coutdown.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- CONTAGEM REGRESSIVA ---------- */
  const target = new Date(2026, 9, 30, 0, 0, 0); // 30/10/2026 00:00

  const elDays = document.getElementById('cd-days');
  const elHours = document.getElementById('cd-hours');
  const elMinutes = document.getElementById('cd-minutes');
  const elSeconds = document.getElementById('cd-seconds');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const diff = target.getTime() - Date.now();

    if (diff <= 0) {
      elDays.textContent = '00';
      elHours.textContent = '00';
      elMinutes.textContent = '00';
      elSeconds.textContent = '00';
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff / 3600000) % 24);
    const minutes = Math.floor((diff / 60000) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    elDays.textContent = pad(days);
    elHours.textContent = pad(hours);
    elMinutes.textContent = pad(minutes);
    elSeconds.textContent = pad(seconds);
  }

  tick();
  setInterval(tick, 1000);

  /* ---------- FORMULÁRIO ---------- */
  const form = document.getElementById('cd-form');
  const success = document.getElementById('cd-success');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const nome = form.nome.value.trim();
      const email = form.email.value.trim();
      const whatsapp = form.whatsapp.value.trim();

      const msg = `Olá! Quero entrar para a Lista VIP da Black Friday da Grudado em Você:\n\n`
        + `*Nome:* ${nome}\n`
        + `*E-mail:* ${email}\n`
        + `*WhatsApp:* ${whatsapp}`;

      window.open(`https://wa.me/5521991909015?text=${encodeURIComponent(msg)}`, '_blank');

      form.hidden = true;
      if (success) success.hidden = false;
    });
  }

});
