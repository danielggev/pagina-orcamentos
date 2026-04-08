/* ============================================
   GRUDADO EM VOCÊ — produto.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Galeria: troca foto principal --- */
  window.trocarFoto = function(btn, src) {
    document.getElementById('galeria-principal').src = src;
    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
  };

  /* --- Upload de arquivo --- */
  const uploadArea = document.getElementById('upload-area');
  const inputArquivo = document.getElementById('arquivo');
  const nomeArquivo = document.getElementById('arquivo-nome');

  uploadArea.addEventListener('click', () => inputArquivo.click());

  uploadArea.addEventListener('dragover', e => {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
  });
  uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('drag-over'));
  uploadArea.addEventListener('drop', e => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) mostrarArquivo(file);
  });

  inputArquivo.addEventListener('change', () => {
    if (inputArquivo.files[0]) mostrarArquivo(inputArquivo.files[0]);
  });

  function mostrarArquivo(file) {
    nomeArquivo.textContent = '✓ ' + file.name;
  }

  /* --- Tamanho personalizado --- */
  document.querySelectorAll('input[name="tamanho"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const custom = document.getElementById('tamanho-custom');
      if (radio.value === 'personalizado') {
        custom.classList.add('visivel');
      } else {
        custom.classList.remove('visivel');
      }
    });
  });

  /* --- Quantidade "outra" --- */
  document.querySelectorAll('input[name="quantidade"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const custom = document.getElementById('quantidade-custom');
      if (radio.value === 'outro') {
        custom.classList.add('visivel');
      } else {
        custom.classList.remove('visivel');
      }
    });
  });

  /* --- Enviar via WhatsApp --- */
  const form = document.getElementById('orcamento-form');
  form.addEventListener('submit', e => {
    e.preventDefault();

    const tamanhoSelecionado = document.querySelector('input[name="tamanho"]:checked')?.value;
    let tamanho = tamanhoSelecionado;
    if (tamanhoSelecionado === 'personalizado') {
      const l = document.getElementById('largura').value;
      const a = document.getElementById('altura').value;
      tamanho = l && a ? `${l}cm × ${a}cm` : 'Personalizado (sem medidas)';
    }

    const qtdSelecionada = document.querySelector('input[name="quantidade"]:checked')?.value;
    let quantidade = qtdSelecionada;
    if (qtdSelecionada === 'outro') {
      quantidade = document.getElementById('qtd-outro').value || 'Não informado';
    }

    const acabamento = document.querySelector('input[name="acabamento"]:checked')?.value || 'Não informado';
    const obs = document.getElementById('obs').value;
    const arquivo = inputArquivo.files[0]?.name || 'Não enviado';
    const produto = document.querySelector('.produto-info__titulo')?.textContent || 'Produto';

    let msg = `Olá! Gostaria de um orçamento:\n\n`;
    msg += `*Produto:* ${produto}\n`;
    msg += `*Tamanho:* ${tamanho}\n`;
    msg += `*Quantidade:* ${quantidade} unidades\n`;
    msg += `*Acabamento:* ${acabamento}\n`;
    msg += `*Arquivo:* ${arquivo}\n`;
    if (obs) msg += `*Obs:* ${obs}\n`;

    const url = `https://wa.me/5521991909015?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  });

});
