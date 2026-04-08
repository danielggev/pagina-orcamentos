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

    // Determinar faixa (>= 5m² = 15% off, >= 10m² = 25% off)
    let precoPorM2 = tabela[tabela.length - 1].preco; // fallback maior faixa
    for (const faixa of tabela) {
      if (faixa.ate === undefined || m2Total < faixa.ate) {
        precoPorM2 = faixa.preco;
        break;
      }
    }

    const total = m2Total * precoPorM2;
    const precoPorUnidade = total / quantidade;

    return {
      m2Total,
      precoPorM2,
      total,
      precoPorUnidade,
      quantidade,
      material,
      faixa: m2Total < tabela[0].ate
        ? 'normal'
        : m2Total < tabela[1].ate
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

    const { m2Total, precoPorM2, total, precoPorUnidade, quantidade, faixa, material } = resultado;
    const tabela = TABELA[material] || [];

    // Calcular qtd necessária para atingir cada faixa de desconto
    const m2PorUnidade = m2Total / quantidade;
    const qtdPara15 = m2PorUnidade > 0 ? Math.ceil(tabela[0].ate / m2PorUnidade) : null;
    const qtdPara25 = m2PorUnidade > 0 ? Math.ceil(tabela[1].ate / m2PorUnidade) : null;

    let descontoHints = '';
    if (faixa === 'normal' && qtdPara15) {
      descontoHints = `
        <div class="preco-desconto-hints">
          <span class="preco-hint-desconto">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            Com <strong>${qtdPara15} unid.</strong> você ganha <strong>15% de desconto</strong>
          </span>
          <span class="preco-hint-desconto">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            Com <strong>${qtdPara25} unid.</strong> você ganha <strong>25% de desconto</strong>
          </span>
        </div>`;
    } else if (faixa === 'desconto-15' && qtdPara25) {
      descontoHints = `
        <div class="preco-desconto-hints">
          <span class="preco-hint-desconto preco-hint-desconto--ativo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            15% de desconto aplicado
          </span>
          <span class="preco-hint-desconto">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            Com <strong>${qtdPara25} unid.</strong> você ganha <strong>25% de desconto</strong>
          </span>
        </div>`;
    } else if (faixa === 'desconto-25') {
      descontoHints = `
        <div class="preco-desconto-hints">
          <span class="preco-hint-desconto preco-hint-desconto--ativo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Melhor preço — 25% de desconto aplicado!
          </span>
        </div>`;
    }

    el.innerHTML = `
      <div class="preco-total">
        <span class="preco-label">Total estimado</span>
        <div class="preco-total__valores">
          <span class="preco-valor">${formatar(total)}</span>
          <span class="preco-unidade">${formatar(precoPorUnidade)} / unid.</span>
        </div>
      </div>
      ${descontoHints}
    `;
  }

  /* ---------- API PÚBLICA ---------- */
  return { calcular, formatar, renderPreco, MINIMO };

})();
