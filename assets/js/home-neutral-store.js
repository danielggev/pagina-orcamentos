/* Conteúdo da home de testes inspirado na vitrine atual da loja oficial. */
document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('store-home-content');
  const footer = document.getElementById('store-home-footer');
  if (!content || !footer) return;

  const storeUrl = '#';
  const imagePath = 'assets/images/home-store/';

  const homeOrganization = [
    ['normal-kit-organizacao-branco.webp', 'Kit Organização Branco', 'Etiquetas versáteis para organizar mantimentos, armários e escritório.', 'De R$ 42,90', '3x R$ 14,30', '6 reviews', 'kit-organizacao-branco'],
    ['normal-etiqueta-organizacao.webp', 'Etiqueta Organização', 'Organização com estilo, texto livre e muita personalidade.', 'De R$ 24,90', '3x R$ 8,30', '54 reviews', 'etiqueta-organizacao'],
    ['normal-organizacao-de-brinquedos.webp', 'Organização de Brinquedos', 'Identifique caixas e gavetas com elegância e clareza.', 'R$ 17,90', '3x R$ 5,97', '2 reviews', 'organizacao-de-brinquedos'],
    ['normal-organizador.webp', 'Organizador', 'Organização que a criança entende.', 'De R$ 65,90', '3x R$ 21,97', '4 reviews', 'organizador'],
    ['normal-saco-organizador.webp', 'Saco Organizador', 'Organize trocas, looks ou a mala — simples assim.', 'R$ 61,90', '3x R$ 20,63', '100 reviews', 'saco-organizador'],
    ['normal-organizador-vai-e-volta.webp', 'Organizador Vai e Volta', 'Separe roupas limpas e sujas com praticidade e mantenha tudo organizado onde estiver!', 'R$ 76,90', '3x R$ 25,63', '', 'organizador-vai-e-volta', 'Novo'],
    ['normal-saco-organizador-com-foto.webp', 'Saco Organizador com Foto', 'Organize trocas, looks ou a mala — simples assim.', 'R$ 61,90', '3x R$ 20,63', '6 reviews', 'saco-organizador-com-foto'],
    ['normal-congelados-color.webp', 'Congelados Color', 'Controle datas e tipos de alimentos congelados com praticidade.', 'De R$ 38,90', '3x R$ 12,97', '125 reviews', 'congelados-color'],
    ['normal-organizacao-fininha.webp', 'Organização Fininha', 'Sua casa mais prática e organizada.', 'R$ 24,90', '3x R$ 8,30', '5 reviews', 'organizacao-fininha'],
    ['normal-organizacao-quadrada.webp', 'Organização Quadrada', 'Personalize cada etiqueta e mantenha tudo em seu lugar.', 'R$ 25,90', '3x R$ 8,63', '3 reviews', 'organizacao-quadrada']
  ];

  const travelEssentials = [
    ['normal-pulseira-de-id-reutilizavel.webp', 'Pulseira de ID Reutilizável', 'Feita em tecido macio e com trava tripla de segurança.', 'R$ 61,90', '3x R$ 20,63', '474 reviews', 'pulseira-de-id-reutilizavel'],
    ['normal-tag-bagagem.webp', 'Tag Bagagem', 'Personalize com os seus dados contato. Prático e seguro.', 'R$ 50,90', '3x R$ 16,97', '54 reviews', 'tag-bagagem'],
    ['normal-saco-com-visor.webp', 'Saco com Visor', 'Veja por fora, organize por dentro!', 'R$ 54,90', '3x R$ 18,30', '22 reviews', 'saco-com-visor'],
    ['normal-saco-personalizado.webp', 'Saco Personalizado', 'Organização prática pro leva e traz dos pequenos!', 'De R$ 51,90', '3x R$ 17,30', '219 reviews', 'saco-personalizado'],
    ['normal-saco-organizador.webp', 'Saco Organizador', 'Organize trocas, looks ou a mala — simples assim.', 'R$ 61,90', '3x R$ 20,63', '100 reviews', 'saco-organizador'],
    ['normal-super-necessaire.webp', 'Super Nécessaire', 'A nécessaire que cabe a sua vida.', 'R$ 153,90', '3x R$ 51,30', '', 'super-necessaire'],
    ['normal-sacola-de-roupa-suja.webp', 'Sacola de Roupa Suja', 'Viagem organizada: roupa suja no lugar certo!', 'R$ 87,90', '3x R$ 29,30', '3 reviews', 'sacola-de-roupa-suja']
  ];

  const kits = [
    ['normal-etiquetas-kit-super-fofo.webp', 'Etiquetas Kit Super Fofo', "Etiquetas em vinil à prova d'água com muita personalidade.", 'De R$ 98,90', '3x R$ 32,97', '367 reviews', 'etiquetas-kit-super-fofo', 'Mais Vendidos'],
    ['normal-kit-de-etiquetas-transparentes-com-contorno-personalizadas.webp', 'Kits de Etiquetas Transparentes com Contorno Personalizadas', '(falta mini-desc)', 'R$ 43,90', '3x R$ 14,63', '2 reviews', 'kit-de-etiquetas-transparentes-com-contorno-personalizadas'],
    ['normal-kit-enxuto.webp', 'Kit Enxuto', 'Kit compacto, prático e perfeito pra começar a identificar.', 'R$ 42,90', '3x R$ 14,30', '104 reviews', 'kit-enxuto'],
    ['normal-etiquetas-kit-teen.webp', 'Etiquetas Kit Teen', 'Contém etiquetas grandes, médias e super minis. Super prático.', 'De R$ 50,90', '3x R$ 16,97', '372 reviews', 'etiquetas-kit-teen', 'Mais Vendidos'],
    ['normal-kit-completo.webp', 'Kit Completo', 'Contém etiquetas para roupas, sapatos, objetos e tags para mochila.', 'De R$ 153,90', '3x R$ 51,30', '208 reviews', 'kit-completo', 'Mais Vendidos'],
    ['normal-kit-colorido-mix.webp', 'Kit Colorido Mix', 'Identifique objetos com seu nome e uma arte divertida.', 'De R$ 82,90', '3x R$ 27,63', '631 reviews', 'kit-colorido-mix', 'Mais Vendidos'],
    ['normal-kit-colorido-mix-copa-do-mundo-2026.webp', 'Kit Colorido Mix Futebol', 'Identifique objetos com seu nome e uma arte divertida.', 'De R$ 82,90', '3x R$ 27,63', '', 'kit-colorido-mix-copa-do-mundo-2026', 'Mais Vendidos'],
    ['normal-kit-organizacao-transparente.webp', 'Kit Organização Transparente', 'Crie etiquetas sob medida para sua casa.', 'De R$ 42,90', '3x R$ 14,30', '15 reviews', 'kit-organizacao-transparente'],
    ['normal-kit-pre-escolar.webp', 'Kit Pré-Escolar', 'Identifique objetos, roupas e sapatos com praticidade.', 'R$ 119,90', '3x R$ 39,97', '102 reviews', 'kit-pre-escolar'],
    ['normal-mini-kit.webp', 'Mini Kit', 'Mini kit, máximo impacto: descubra nossa qualidade!', 'R$ 54,90', '3x R$ 18,30', '74 reviews', 'mini-kit']
  ];

  const icon = (name) => ({
    truck: '<rect x="2" y="7" width="11" height="8" rx="1"/><path d="M13 11h4l3 4"/><circle cx="7.5" cy="17.5" r="2"/><circle cx="16.5" cy="17.5" r="2"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h3m2 0h5"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.5 2.5 4.5-4.5"/>'
  })[name];

  const benefits = () => `
    <section class="gv-benefits-premium" aria-label="Benefícios da loja">
      <div class="gv-benefits-premium__container"><div class="gv-benefits-premium__card"><div class="gv-benefits-premium__track" role="list">
        ${[
          ['truck', 'Frete Grátis', 'acima de R$ 150*', '#ff6846', '#fff1ed'],
          ['shield', 'Compra Segura', 'ambiente protegido', '#24394a', '#edf1f4'],
          ['card', 'Pague em até 3x', 'sem juros no site*', '#ef3f73', '#fdebf1'],
          ['check', 'Qualidade Garantida', '15+ anos de experiência', '#18b8c8', '#e8f9fb']
        ].map(item => `
          <div class="gv-benefits-premium__item" role="listitem"><div class="gv-benefits-premium__item-content"><span class="gv-benefits-premium__icon" style="--gv-icon-color: ${item[3]}; --gv-icon-bg: ${item[4]}" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icon(item[0])}</svg></span><span class="gv-benefits-premium__texts"><strong class="gv-benefits-premium__title">${item[1]}</strong><small class="gv-benefits-premium__subtitle">${item[2]}</small></span></div></div>`).join('')}
      </div></div></div>
    </section>`;

  const quickLinks = () => {
    const links = [
      ['mais-vendidos', '🔥', 'Mais Vendidos', 'Os favoritos de quem já comprou', 'Bestseller', '#ff6846', '#fff1ed', '#ffffff'],
      ['costura', '🎁', 'Presentes personalizados', 'Personalizados para surpreender', 'Presente', '#8b5cf6', '#f1ecfe', '#ffffff'],
      ['creche-e-escola', '✏️', 'Creche e Escola', 'Nada mais some na mochila', 'Escolar', '#ef3f73', '#fdebf1', '#ffffff'],
      ['casa-e-escritorio', '🏠', 'Casa e Escritório', 'Da cozinha à mesa de trabalho', 'Dia a dia', '#f2b705', '#fff8d8', '#24394a'],
      ['viagens-e-passeios', '✈️', 'Viagens e Passeios', 'Pra quem ama a estrada', 'Férias', '#18b8c8', '#e8f9fb', '#ffffff']
    ];

    return `
      <section id="GVQuickLinks-template--22371282616572__gv_quicklinks_premium_Myggxi" class="gv-quick-links">
        <div class="gv-quick-links__container">
          <header class="gv-quick-links__header"><div class="gv-quick-links__heading-group"><p class="gv-quick-links__eyebrow">Explore a loja</p><h2 class="gv-quick-links__heading">Encontre mais rápido</h2></div></header>
          <div class="gv-quick-links__track" role="list" aria-label="Atalhos para categorias e destaques">
            ${links.map(item => `<div class="gv-quick-links__item" role="listitem"><a href="${storeUrl}/collections/${item[0]}" class="gv-quick-links__card" style="--gv-ql-accent: ${item[5]}; --gv-ql-icon-bg: ${item[6]}; --gv-ql-badge-text: ${item[7]}" aria-label="${item[2]}"><div class="gv-quick-links__top"><span class="gv-quick-links__icon" aria-hidden="true"><span class="gv-quick-links__icon-text">${item[1]}</span></span><span class="gv-quick-links__badge">${item[4]}</span></div><div class="gv-quick-links__content"><strong class="gv-quick-links__title">${item[2]}</strong><span class="gv-quick-links__subtitle">${item[3]}</span></div><span class="gv-quick-links__arrow" aria-hidden="true">→</span></a></div>`).join('')}
          </div>
        </div>
      </section>`;
  };

  const productUrl = (slug) => slug === 'etiqueta-super-mini' ? 'produtos/etiqueta-super-mini.html' : `${storeUrl}/products/${slug}`;

  const productCard = ([image, title, description, price, installment, reviews, slug, badge]) => `
    <article class="store-product"><a href="${productUrl(slug)}">
      <div class="store-product__media">${badge ? `<span class="store-badge${badge === 'Novo' ? ' store-badge--new' : ''}">${badge}</span>` : ''}<button class="store-wishlist" type="button" aria-label="Adicionar ${title} aos favoritos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg></button><img src="${imagePath}${image}" alt="${title}" loading="lazy"></div>
      <div class="store-product__body"><span class="store-stars${reviews ? '' : ' store-stars--empty'}">${reviews ? `★★★★★ <small>${reviews.replace('reviews', 'avaliações')}</small>` : 'Sem avaliações'}</span><h3>${title}</h3><p>${description}</p><strong class="store-price">${price}<small>${installment}</small></strong><span class="store-shipping">Pronto para envio sexta-feira, 28/08</span><span class="store-buy">Personalizar</span></div>
    </a></article>`;

  const productSection = (title, products, collection, eyebrow, tinted = false) => `
    <section class="store-products${tinted ? ' store-products--tint' : ''}" aria-label="${title}"><div class="store-shell">
      <header class="store-section-title"><p>${eyebrow}</p><h2>${title}</h2></header><div class="store-products__carousel${products.length > 5 ? ' store-products__carousel--scrollable' : ''}"><button class="store-carousel-arrow store-carousel-arrow--prev" type="button" aria-label="Produtos anteriores"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg></button><div class="store-product-grid" style="--store-product-count: ${products.length}">${products.map(productCard).join('')}</div><button class="store-carousel-arrow store-carousel-arrow--next" type="button" aria-label="Próximos produtos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg></button></div>
      <a class="store-view-all" href="${storeUrl}/collections/${collection}">Ver Todos</a>
    </div></section>`;

  const categories = [
    ['normal-category-roupas.jpg', 'Etiquetas para roupas', 'Identifique uniformes, meias e peças do dia a dia.', 'identificacao-de-roupas', 'Mais vendida', 'Organização', 'Personalizar agora'],
    ['normal-category-tags.jpg', 'Tags personalizadas', 'Mais praticidade para escola e viagens.', 'tags', 'Prático', 'Mochilas e malas', 'Ver opções'],
    ['normal-category-kits.jpg', 'Kits completos', 'Etiquetas para cadernos, garrafas e acessórios.', 'kit-de-etiquetas', 'Kit completo', 'Material escolar', 'Montar meu kit'],
    ['normal-category-sacos.webp', 'Sacos e organizadores', 'Organização para lanches, roupas e objetos.', 'bolsas', 'Organize', 'Rotina escolar', 'Explorar'],
    ['normal-category-pulseiras.webp', 'Pulseiras de identificação', 'Identificação prática para passeios e eventos.', 'pulseiras', 'Essencial', 'Segurança', 'Conhecer']
  ];

  const blog = [
    ['normal-blog-cuidar-coisas.webp', '27 de ago. de 2026', 'Como ensinar a criança a cuidar das próprias coisas', 'Toda tarde, a mesma coisa se repete: o brinquedo fica largado no meio da sala, a mochila cai perto da porta...', 'como-ensinar-a-crianca-a-cuidar-das-proprias-coisas'],
    ['normal-blog-mochila-creche.png', '25 de ago. de 2026', 'O que colocar na mochila da creche: checklist completo', 'Antes de qualquer item específico, vale entender uma coisa: a mochila da creche não funciona como a mochila de uma criança maior...', 'o-que-colocar-na-mochila-da-creche-checklist-completo'],
    ['normal-blog-disquesia.png', '20 de ago. de 2026', 'Vamos falar sobre a diferença de disquesia do lactente e cólica em bebês', 'A disquesia do lactente é algo comum em bebês recém-nascidos e geralmente se mostra nas primeiras semanas de vida...', 'vamos-falar-sobre-a-diferenca-de-disquesia-do-lactente-e-colica-em-bebes']
  ];

  content.innerHTML = `
    <section class="store-kicker"><h1>Etiquetas Personalizadas e Adesivos</h1></section>
    ${benefits()}
    ${quickLinks()}
    ${productSection('Para Organizar a Casa', homeOrganization, 'organizacao-da-casa', 'Feitos para o dia a dia')}
    <section class="store-categories" aria-label="Categorias em destaque"><div class="store-shell"><header class="store-section-title"><p>Escolha por categoria</p><h2>Encontre o produto ideal</h2></header><div class="store-category-track">${categories.map(item => `<article class="store-category-card"><a href="${storeUrl}/collections/${item[3]}"><div class="store-category-card__media"><img src="${imagePath}${item[0]}" alt="${item[1]}" loading="lazy"><span class="store-category-card__badge">${item[4]} →</span><div class="store-category-card__overlay"></div></div><div class="store-category-card__content"><small>${item[5]}</small><h3>${item[1]}</h3><p>${item[2]}</p><strong>${item[6]} →</strong></div></a></article>`).join('')}</div></div></section>
    ${productSection('Essenciais para sua Viagem', travelEssentials, 'viagens-e-passeios', 'Viaje com mais praticidade', true)}
    ${productSection('Kits de Etiquetas', kits, 'kit-de-etiquetas', 'Todo mundo ama')}
    <section class="store-blog"><div class="store-shell"><header class="store-section-title"><h2>Últimas do Nosso Blog</h2></header><div class="store-blog__grid">${blog.map(item => `<article><a href="${storeUrl}/blogs/news/${item[4]}"><img src="${imagePath}${item[0]}" alt="${item[2]}" loading="lazy"><time>${item[1]}</time><h3>${item[2]}</h3><p>${item[3]}</p></a></article>`).join('')}</div><a class="store-view-all" href="${storeUrl}/blogs/news">Ver Todos</a></div></section>
    <a class="store-instagram" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg><strong>Seu pedido ficou lindo? Queremos ver!</strong><span>@grudadoemvoce</span></a>
    <section class="store-about"><div class="store-shell store-about__content"><h2>Grudado em Você – Etiquetas e Adesivos Personalizados com Criatividade</h2><p>Bem-vindo à Grudado em Você, a loja online referência em etiquetas personalizadas, adesivos escolares e kits criativos para transformar a rotina de crianças, pais, professores e organizadores. Nossa missão é oferecer produtos de alta qualidade que facilitam a vida e encantam pelo visual.</p><details><summary>Ver mais</summary><p>Trabalhamos com etiquetas para roupas, calçados, lancheiras, brinquedos, livros e materiais escolares. Tudo é personalizável, produzido com materiais resistentes e enviado para todo o Brasil com carinho e rastreamento.</p><h3>Motivos para comprar na Grudado em Você</h3><ul><li>Variedade de modelos e temas criativos</li><li>Materiais de alta qualidade e durabilidade</li><li>Personalização fácil direto no site</li><li>Produção rápida e envio para todo o Brasil</li></ul></details></div></section>
    <a class="store-affiliate" href="#"><span>★</span> Conheça o nosso programa de afiliados. <strong>Saiba mais →</strong></a>`;

  footer.className = 'store-footer';
  footer.innerHTML = `
    <div class="store-benefits store-benefits--footer"><div class="store-shell store-benefits__track">${[['✓','Frete Grátis','acima de R$150*'],['✓','Compra Segura','Site protegido'],['3x','Pague em até 3x','sem juros em todo site*'],['★','Qualidade Garantida','15+ anos de qualidade']].map(item => `<article class="store-benefit"><span class="store-benefit__icon">${item[0]}</span><span><strong>${item[1]}</strong><small>${item[2]}</small></span></article>`).join('')}</div></div>
    <div class="store-shell store-footer__grid">
      <div><img class="store-footer__logo" src="assets/images/logo-2-white.png" alt="Grudado em Você"><p>A solução para identificação e organização. Produtos feitos à mão e embalados com carinho.</p><div class="store-footer__social"><a href="#">Instagram</a><a href="#">Facebook</a></div></div>
      <nav aria-label="Ajuda"><h2>Ajuda</h2><a href="#">Perguntas Frequentes</a><a href="#">Blog</a><a href="#">Quem Somos</a><a href="#">Política de Privacidade e Cookies</a><a href="#">Programa de Afiliados</a></nav>
      <div><h2>Fale conosco</h2><p>Atendimento de:<br><strong>Segunda à Sexta-feira<br>Das 09:00h às 18:00h</strong></p><p>E-mail:<br><a href="#">contato@grudadoemvoce.com.br</a></p><p>Telefones:<br>(21) 2018-2074 ou (11) 3181-6202</p></div>
      <form class="store-newsletter" onsubmit="return false"><h2>Novidades</h2><p>Inscreva-se em nossa newsletter para receber ofertas exclusivas.</p><label for="newsletter-email">E-mail</label><div><input id="newsletter-email" type="email" placeholder="Seu e-mail"><button type="submit">Assinar</button></div></form>
    </div><div class="store-footer__bottom"><div class="store-shell"><span>GRUDADO EM VOCÊ ETIQUETAS LTDA | CNPJ 12.863.194/0001-38</span><span>Brasil (BRL R$)</span></div></div>`;

  content.querySelectorAll('.store-products__carousel').forEach((carousel) => {
    const track = carousel.querySelector('.store-product-grid');
    carousel.querySelector('.store-carousel-arrow--prev').addEventListener('click', () => track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' }));
    carousel.querySelector('.store-carousel-arrow--next').addEventListener('click', () => track.scrollBy({ left: track.clientWidth, behavior: 'smooth' }));
  });

  content.querySelectorAll('.store-wishlist').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      button.classList.toggle('is-active');
      button.querySelector('svg').setAttribute('fill', button.classList.contains('is-active') ? 'currentColor' : 'none');
    });
  });
});
