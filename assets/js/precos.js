/* ============================================
   GRUDADO EM VOCÊ — precos.js
   Lógica de precificação por m²
   ============================================ */

const Precos = (() => {

  /* ---------- TABELA DE PREÇOS ----------
     Faixas em m² total do produto (largura × altura × quantidade)
     faixas: [ { ate: m², preco: R$/m² }, ... ]
     O último item não tem "ate" (acima de tudo)
  ----------------------------------------- */
  const TABELA = {
    'vinil-branco': [
      { ate: 5,   preco: 238 },
      { ate: 10,  preco: 202 },
      {           preco: 179 },
    ],
    'vinil-transparente': [
      { ate: 5,   preco: 165 },
      { ate: 10,  preco: 140 },
      {           preco: 124 },
    ],
    'dtf': [
      { ate: 5,   preco: 210 },
      { ate: 10,  preco: 179 },
      {           preco: 159 },
    ],
  };

  const MINIMO = 60;

  /* ---------- CALCULAR ---------- */

  function calcular({ material, larguraCm, alturaCm, quantidade }) {
    const tabela = TABELA[material];
    if (!tabela) return null;

    const largM = larguraCm / 100;
    const altM  = alturaCm  / 100;
    const m2Total = largM * altM * quantidade;

    if (m2Total <= 0 || isNaN(m2Total)) return null;

    // Determinar faixa
    let precoPorM2 = tabela[tabela.length - 1].preco; // fallback maior faixa
    for (const faixa of tabela) {
      if (faixa.ate === undefined || m2Total <= faixa.ate) {
        precoPorM2 = faixa.preco;
        break;
      }
    }

    let total = m2Total * precoPorM2;
    const aplicouMinimo = total < MINIMO;
    if (aplicouMinimo) total = MINIMO;

    return {
      m2Total: m2Total,
      precoPorM2,
      total,
      aplicouMinimo,
      faixa: m2Total <= (tabela[0].ate || 0)
        ? 'normal'
        : m2Total <= (tabela[1]?.ate || 0)
          ? 'desconto-15'
          : 'desconto-25',
    };
  }

  /* ---------- FORMATAR ---------- */

  function formatar(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  /* ---------- RENDER DISPLAY ---------- */

  function renderPreco(resultado) {
    const el = document.getElementById('preco-display');
    if (!el) return;

    if (!resultado) {
      el.innerHTML = `<span class="preco-hint">Preencha tamanho e quantidade para ver o preço</span>`;
      return;
    }

    const { m2Total, precoPorM2, total, aplicouMinimo, faixa } = resultado;

    let badgeHTML = '';
    if (faixa === 'desconto-15') {
      badgeHTML = `<span class="preco-badge preco-badge--desconto">15% off acima de 5m²</span>`;
    } else if (faixa === 'desconto-25') {
      badgeHTML = `<span class="preco-badge preco-badge--desconto">25% off acima de 10m²</span>`;
    }

    const minimoHTML = aplicouMinimo
      ? `<span class="preco-minimo">* Valor mínimo de pedido aplicado</span>`
      : '';

    el.innerHTML = `
      <div class="preco-total">
        <span class="preco-label">Total estimado</span>
        <span class="preco-valor">${formatar(total)}</span>
      </div>
      <div class="preco-detalhes">
        <span>${m2Total.toFixed(4)} m² × ${formatar(precoPorM2)}/m²</span>
        ${badgeHTML}
      </div>
      ${minimoHTML}
    `;
  }

  /* ---------- API PÚBLICA ---------- */
  return { calcular, formatar, renderPreco, MINIMO };

})();
