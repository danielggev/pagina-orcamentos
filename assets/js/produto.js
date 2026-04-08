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
  const uploadArea  = document.getElementById('upload-area');
  const inputArquivo = document.getElementById('arquivo');
  const nomeArquivo  = document.getElementById('arquivo-nome');

  uploadArea.addEventListener('click', () => inputArquivo.click());
  uploadArea.addEventListener('dragover', e => { e.preventDefault(); uploadArea.classList.add('drag-over'); });
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
      document.getElementById('tamanho-custom').classList.toggle('visivel', radio.value === 'personalizado');
      atualizarPreco();
    });
  });

  /* --- Quantidade "outra" --- */
  document.querySelectorAll('input[name="quantidade"]').forEach(radio => {
    radio.addEventListener('change', () => {
      document.getElementById('quantidade-custom').classList.toggle('visivel', radio.value === 'outro');
      atualizarPreco();
    });
  });

  /* --- Inputs de tamanho personalizado --- */
  document.getElementById('largura')?.addEventListener('input', atualizarPreco);
  document.getElementById('altura')?.addEventListener('input', atualizarPreco);
  document.getElementById('qtd-outro')?.addEventListener('input', atualizarPreco);

  /* --- LÓGICA DE PREÇO --- */

  const form     = document.getElementById('orcamento-form');
  const material = form?.dataset.material || null;

  function getDimensoes() {
    const tamanhoVal = document.querySelector('input[name="tamanho"]:checked')?.value;
    if (!tamanhoVal) return null;

    if (tamanhoVal === 'personalizado') {
      const l = parseFloat(document.getElementById('largura')?.value);
      const a = parseFloat(document.getElementById('altura')?.value);
      if (!l || !a || l <= 0 || a <= 0) return null;
      return { largura: l, altura: a };
    }

    // Parsear "5x5cm", "3x5cm", "6x4cm", etc.
    const match = tamanhoVal.match(/^(\d+(?:\.\d+)?)x(\d+(?:\.\d+)?)cm$/i);
    if (!match) return null;
    return { largura: parseFloat(match[1]), altura: parseFloat(match[2]) };
  }

  function getQuantidade() {
    const qtdVal = document.querySelector('input[name="quantidade"]:checked')?.value;
    if (!qtdVal) return null;
    if (qtdVal === 'outro') {
      const n = parseInt(document.getElementById('qtd-outro')?.value);
      return n > 0 ? n : null;
    }
    return parseInt(qtdVal);
  }

  function atualizarPreco() {
    if (!material || typeof Precos === 'undefined') return;

    const dim = getDimensoes();
    const qtd = getQuantidade();

    if (!dim || !qtd) {
      Precos.renderPreco(null);
      return;
    }

    const resultado = Precos.calcular({
      material,
      larguraCm: dim.largura,
      alturaCm:  dim.altura,
      quantidade: qtd,
    });

    Precos.renderPreco(resultado);
  }

  // Calcular preço na carga inicial
  atualizarPreco();

  /* --- Adicionar ao carrinho --- */
  const btnAdicionar = form?.querySelector('.btn-adicionar-carrinho');

  form?.addEventListener('submit', e => {
    e.preventDefault();

    const tamanhoSelecionado = document.querySelector('input[name="tamanho"]:checked')?.value;
    let tamanho = tamanhoSelecionado || 'Não informado';
    if (tamanhoSelecionado === 'personalizado') {
      const l = document.getElementById('largura').value;
      const a = document.getElementById('altura').value;
      tamanho = l && a ? `${l}cm × ${a}cm` : 'Personalizado (sem medidas)';
    }

    const qtdSelecionada = document.querySelector('input[name="quantidade"]:checked')?.value;
    let quantidade = qtdSelecionada || '50';
    if (qtdSelecionada === 'outro') {
      quantidade = document.getElementById('qtd-outro').value || 'Não informado';
    }

    const acabamento = document.querySelector('input[name="acabamento"]:checked')?.value || 'Não informado';
    const obs        = document.getElementById('obs').value.trim();
    const arquivo    = inputArquivo.files[0]?.name || null;
    const nome       = document.querySelector('.produto-info__titulo')?.textContent?.trim() || 'Produto';
    const colecao    = document.querySelector('.produto-info__colecao')?.textContent?.trim() || '';
    const imgEl      = document.getElementById('galeria-principal');
    const imagem     = imgEl ? imgEl.src : null;

    // Calcular preço para salvar no carrinho
    let preco = null;
    const dim = getDimensoes();
    const qtd = getQuantidade();
    if (material && dim && qtd && typeof Precos !== 'undefined') {
      const resultado = Precos.calcular({ material, larguraCm: dim.largura, alturaCm: dim.altura, quantidade: qtd });
      if (resultado) preco = resultado.total;
    }

    const item = { nome, colecao, tamanho, quantidade, acabamento, obs, arquivo, imagem, preco, material };

    if (typeof Carrinho !== 'undefined') {
      Carrinho.adicionar(item);
    }

    // Feedback no botão
    if (btnAdicionar) {
      const textoOriginal = btnAdicionar.innerHTML;
      btnAdicionar.classList.add('adicionado');
      btnAdicionar.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        Adicionado!
      `;
      setTimeout(() => {
        btnAdicionar.classList.remove('adicionado');
        btnAdicionar.innerHTML = textoOriginal;
      }, 2000);
    }
  });

});
