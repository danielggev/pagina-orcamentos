/* ============================================
   GRUDADO EM VOCÊ — rastreio.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rastreio-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const pedido = form.pedido.value.trim();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const msg = `Olá! Gostaria de rastrear meu pedido:\n\n`
      + `*E-mail:* ${email}\n`
      + `*Número do pedido:* ${pedido}`;

    window.open(`https://wa.me/5521991909015?text=${encodeURIComponent(msg)}`, '_blank');
  });
});
