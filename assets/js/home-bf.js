document.addEventListener('DOMContentLoaded', () => {
  const countdown = document.querySelector('.bf-countdown');
  if (countdown) {
    // 01/11/2026, 00h em Brasília (UTC−3).
    const targetTime = Date.parse('2026-11-01T00:00:00-03:00');
    const units = {
      days: document.getElementById('bf-days'),
      hours: document.getElementById('bf-hours'),
      minutes: document.getElementById('bf-minutes'),
      seconds: document.getElementById('bf-seconds')
    };
    const status = document.getElementById('bf-countdown-status');
    let interval;

    const updateCountdown = () => {
      const remaining = Math.max(0, targetTime - Date.now());
      const totalSeconds = Math.floor(remaining / 1000);
      const values = {
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60
      };

      Object.entries(values).forEach(([unit, value]) => {
        units[unit].textContent = String(value).padStart(2, '0');
      });

      if (remaining === 0) {
        status.textContent = 'As ofertas começaram!';
        countdown.setAttribute('aria-label', 'A contagem regressiva terminou');
        window.clearInterval(interval);
      }
    };

    updateCountdown();
    if (Date.now() < targetTime) interval = window.setInterval(updateCountdown, 1000);
  }

  const form = document.getElementById('bf-signup-form');
  if (!form) return;

  const phone = document.getElementById('bf-signup-phone');
  const name = document.getElementById('bf-signup-name');
  const status = document.getElementById('bf-signup-status');
  const submit = form.querySelector('button[type="submit"]');

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const validatePhone = () => {
    const length = phone.value.replace(/\D/g, '').length;
    phone.setCustomValidity(length === 0 || length === 10 || length === 11 ? '' : 'Informe o DDD e um telefone válido.');
  };

  const showStatus = (message, success = false) => {
    status.textContent = message;
    status.hidden = false;
    status.classList.toggle('is-success', success);
  };

  phone.addEventListener('input', () => {
    phone.value = formatPhone(phone.value);
    validatePhone();
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    name.value = name.value.trim();
    validatePhone();
    status.hidden = true;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Conectar o serviço de captação em data-endpoint quando estiver disponível.
    const endpoint = form.dataset.endpoint;
    if (!endpoint) {
      showStatus('O cadastro ainda não está disponível. Tente novamente em breve.');
      return;
    }

    submit.disabled = true;
    submit.textContent = 'Enviando...';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.value,
          email: form.elements.email.value.trim(),
          phone: phone.value.replace(/\D/g, ''),
          consent: true
        })
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      form.reset();
      showStatus('Cadastro concluído! Você receberá as ofertas da Black Friday.', true);
    } catch {
      showStatus('Não foi possível concluir o cadastro. Tente novamente.');
    } finally {
      submit.disabled = false;
      submit.innerHTML = 'Entrar para a lista VIP <span aria-hidden="true">→</span>';
    }
  });
});
