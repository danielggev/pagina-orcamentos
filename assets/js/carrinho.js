/* ============================================
   GRUDADO EM VOCÊ — carrinho.js
   Carrinho com localStorage + drawer lateral
   ============================================ */

const Carrinho = (() => {

  const STORAGE_KEY = 'gev_carrinho';

  /* ---------- DADOS ---------- */

  function getItens() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function salvar(itens) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(itens));
  }

  function adicionar(item) {
    const itens = getItens();
    item.id = Date.now() + Math.random().toString(36).slice(2);
    itens.push(item);
    salvar(itens);
    atualizarBadge();
    renderDrawer();
    abrirDrawer();
  }

  function remover(id) {
    const itens = getItens().filter(i => i.id !== id);
    salvar(itens);
    atualizarBadge();
    renderDrawer();
  }

  function limpar() {
    salvar([]);
    atualizarBadge();
    renderDrawer();
  }

  function total() {
    return getItens().length;
  }

  /* ---------- BADGE ---------- */

  function atualizarBadge() {
    const qtd = total();
    document.querySelectorAll('.carrinho-badge').forEach(el => {
      el.textContent = qtd;
      el.style.display = qtd > 0 ? 'flex' : 'none';
    });
  }

  /* ---------- INJETAR BADGE NO HEADER ---------- */

  function injetarBadge() {
    const btnCarrinho = document.querySelector('.header-icon-btn--dark');
    if (!btnCarrinho) return;
    // Wrap em posição relativa para o badge
    btnCarrinho.style.position = 'relative';
    if (!btnCarrinho.querySelector('.carrinho-badge')) {
      const badge = document.createElement('span');
      badge.className = 'carrinho-badge';
      badge.setAttribute('aria-label', 'itens no carrinho');
      badge.style.display = 'none';
      btnCarrinho.appendChild(badge);
    }
    btnCarrinho.addEventListener('click', e => {
      e.preventDefault();
      toggleDrawer();
    });
  }

  /* ---------- DRAWER ---------- */

  function criarDrawer() {
    if (document.getElementById('carrinho-drawer')) return;

    const overlay = document.createElement('div');
    overlay.id = 'carrinho-overlay';
    overlay.addEventListener('click', fecharDrawer);

    const drawer = document.createElement('aside');
    drawer.id = 'carrinho-drawer';
    drawer.setAttribute('aria-label', 'Carrinho');
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'true');
    drawer.innerHTML = `
      <div class="drawer-header">
        <h2 class="drawer-titulo">Carrinho</h2>
        <button class="drawer-fechar" id="drawer-fechar" aria-label="Fechar carrinho">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="drawer-body" id="drawer-body"></div>
      <div class="drawer-footer" id="drawer-footer"></div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    document.getElementById('drawer-fechar').addEventListener('click', fecharDrawer);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') fecharDrawer();
    });
  }

  function renderDrawer() {
    const body = document.getElementById('drawer-body');
    const footer = document.getElementById('drawer-footer');
    if (!body || !footer) return;

    const itens = getItens();
    const titulo = document.querySelector('.drawer-titulo');
    if (titulo) {
      titulo.textContent = itens.length === 0
        ? 'Carrinho'
        : `Carrinho (${itens.length} ${itens.length === 1 ? 'item' : 'itens'})`;
    }

    if (itens.length === 0) {
      body.innerHTML = `
        <div class="drawer-vazio">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <p>Seu carrinho está vazio</p>
          <span>Adicione produtos para continuar</span>
        </div>`;
      footer.innerHTML = '';
      return;
    }

    body.innerHTML = itens.map(item => `
      <div class="drawer-item" data-id="${item.id}">
        <div class="drawer-item__img">
          ${item.imagem
            ? `<img src="${item.imagem}" alt="${item.nome}" loading="lazy">`
            : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`
          }
        </div>
        <div class="drawer-item__info">
          <p class="drawer-item__colecao">${item.colecao}</p>
          <p class="drawer-item__nome">${item.nome}</p>
          <ul class="drawer-item__specs">
            <li><span>Tamanho</span>${item.tamanho}</li>
            <li><span>Quantidade</span>${item.quantidade} un.</li>
            <li><span>Acabamento</span>${item.acabamento}</li>
            ${item.arquivo ? `<li><span>Arquivo</span>${item.arquivo}</li>` : ''}
            ${item.obs ? `<li><span>Obs</span>${item.obs}</li>` : ''}
          </ul>
        </div>
        <button class="drawer-item__remover" data-id="${item.id}" aria-label="Remover item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `).join('');

    // Eventos de remoção
    body.querySelectorAll('.drawer-item__remover').forEach(btn => {
      btn.addEventListener('click', () => remover(btn.dataset.id));
    });

    // Determinar prefixo de caminho (raiz ou subpasta)
    const depth = window.location.pathname.split('/').filter(Boolean).length;
    const isSubpage = window.location.pathname.includes('/produtos/') || window.location.pathname.includes('/colecoes/');
    const carrinhoHref = isSubpage ? '../carrinho.html' : 'carrinho.html';

    footer.innerHTML = `
      <div class="drawer-footer__info">
        <span>${itens.length} ${itens.length === 1 ? 'produto' : 'produtos'} no pedido</span>
      </div>
      <a href="${carrinhoHref}" class="drawer-btn-ver">Ver Carrinho</a>
      <button class="drawer-btn-whatsapp" id="drawer-btn-wpp">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.857L.057 23.868a.5.5 0 0 0 .612.612l6.01-1.476A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.797 9.797 0 0 1-5.003-1.374l-.36-.214-3.724.914.933-3.608-.234-.372A9.797 9.797 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
        Solicitar Orçamento
      </button>
    `;

    document.getElementById('drawer-btn-wpp').addEventListener('click', enviarWhatsApp);
  }

  function abrirDrawer() {
    const drawer = document.getElementById('carrinho-drawer');
    const overlay = document.getElementById('carrinho-overlay');
    if (!drawer) return;
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    document.body.classList.add('drawer-is-open');
    drawer.querySelector('#drawer-fechar').focus();
  }

  function fecharDrawer() {
    const drawer = document.getElementById('carrinho-drawer');
    const overlay = document.getElementById('carrinho-overlay');
    if (!drawer) return;
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.classList.remove('drawer-is-open');
  }

  function toggleDrawer() {
    const drawer = document.getElementById('carrinho-drawer');
    if (!drawer) return;
    drawer.classList.contains('is-open') ? fecharDrawer() : abrirDrawer();
  }

  /* ---------- WHATSAPP ---------- */

  function enviarWhatsApp() {
    const itens = getItens();
    if (itens.length === 0) return;

    let msg = `Olá! Gostaria de solicitar orçamento:\n\n`;
    itens.forEach((item, i) => {
      msg += `*${i + 1}. ${item.nome}*\n`;
      msg += `   Tamanho: ${item.tamanho}\n`;
      msg += `   Quantidade: ${item.quantidade} unidades\n`;
      msg += `   Acabamento: ${item.acabamento}\n`;
      if (item.arquivo && item.arquivo !== 'Não enviado') msg += `   Arquivo: ${item.arquivo}\n`;
      if (item.obs) msg += `   Obs: ${item.obs}\n`;
      msg += `\n`;
    });
    msg += `Os arquivos serão enviados em seguida.`;

    window.open(`https://wa.me/5521991909015?text=${encodeURIComponent(msg)}`, '_blank');
  }

  /* ---------- INIT ---------- */

  function init() {
    criarDrawer();
    injetarBadge();
    atualizarBadge();
    renderDrawer();
  }

  /* ---------- API PÚBLICA ---------- */

  return { init, adicionar, remover, limpar, getItens, enviarWhatsApp, abrirDrawer };

})();

document.addEventListener('DOMContentLoaded', () => Carrinho.init());
