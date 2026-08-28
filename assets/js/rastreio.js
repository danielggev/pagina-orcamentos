/* ============================================
   GRUDADO EM VOCÊ — rastreio.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rastreio-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    button.textContent = 'Consulta simulada no ambiente de testes';
    button.disabled = true;
  });
});
