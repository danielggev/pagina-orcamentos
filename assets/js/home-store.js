/* Conteúdo da home de testes inspirado na vitrine atual da loja oficial. */
document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('store-home-content');
  const footer = document.getElementById('store-home-footer');
  if (!content || !footer) return;

  const storeUrl = 'https://www.grudadoemvoce.com.br';
  const imagePath = 'assets/images/home-store/';
  const badgeValues = ['40% OFF', '35% OFF', '30% OFF'];
  const randomBadge = () => badgeValues[Math.floor(Math.random() * badgeValues.length)];

  const bestSellers = [
    ['bestseller-termocolante.webp', 'Etiqueta Termocolante Personalizada', 'Identifique roupas e uniformes. Aplique com ferro quente.', 'De R$ 42,90', '3x R$ 14,30', '1058 reviews', 'etiqueta-para-roupas-termocolante-personalizada', '40% OFF'],
    ['bestseller-mini.webp', 'Etiqueta Mini', 'Compactas, práticas e resistentes para itens pequenos.', 'De R$ 32,90', '3x R$ 10,97', '328 reviews', 'etiqueta-mini-personalizada', '35% OFF'],
    ['bestseller-super-mini.webp', 'Etiqueta Super Mini', 'Tamanho mini e utilidade máxima. Ideal para lápis e canetas.', 'De R$ 24,90', '3x R$ 8,30', '385 reviews', 'etiqueta-super-mini', '50% OFF'],
    ['bestseller-pulseira.webp', 'Pulseira de ID Reutilizável', 'Tecido macio e trava tripla de segurança.', 'R$ 61,90', '3x R$ 20,63', '474 reviews', 'pulseira-de-id-reutilizavel', '35% OFF'],
    ['bestseller-fininha.webp', 'Etiqueta Retangular Fininha', 'Versátil e discreta para identificar objetos.', 'De R$ 24,90', '3x R$ 8,30', '308 reviews', 'etiqueta-retangular-fininha-personalizada', '40% OFF']
  ];

  const news = [
    ['new-craque.webp', 'Combo Meu Craque', 'Seu pequeno craque em sua própria figurinha!', 'R$ 54,90', '3x R$ 18,30', '', 'combo-meu-craque', '50% OFF'],
    ['new-flamengo.webp', 'Combo Meu Craque Flamengo', 'A paixão pelo Mengão em adesivos para personalizar tudo!', 'R$ 54,90', '3x R$ 18,30', '', 'combo-meu-craque-flamengo-pesonalizado', '40% OFF'],
    ['new-corinthians.webp', 'Combo Meu Craque Corinthians', 'Para os pequenos que carregam o Timão no coração.', 'R$ 54,90', '3x R$ 18,30', '', 'combo-meu-craque-corinthians-personalizado', '35% OFF'],
    ['kit-contorno.webp', 'Kit Transparente com Contorno', 'Personalização delicada e resistente à água.', 'R$ 43,90', '3x R$ 14,63', '2 reviews', 'kit-de-etiquetas-transparentes-com-contorno-personalizadas', '40% OFF'],
    ['kit-fofo.webp', 'Etiquetas Kit Super Fofo', "Etiquetas à prova d'água com muita personalidade.", 'De R$ 98,90', '3x R$ 32,97', '367 reviews', 'etiquetas-kit-super-fofo', '50% OFF']
  ];

  const kits = [
    ['kit-fofo.webp', 'Etiquetas Kit Super Fofo', "Etiquetas em vinil à prova d'água com muita personalidade.", 'De R$ 98,90', '3x R$ 32,97', '367 reviews', 'etiquetas-kit-super-fofo', '35% OFF'],
    ['kit-contorno.webp', 'Etiquetas Transparentes com Contorno', 'Acabamento discreto para diferentes objetos.', 'R$ 43,90', '3x R$ 14,63', '2 reviews', 'kit-de-etiquetas-transparentes-com-contorno-personalizadas', '40% OFF'],
    ['kit-enxuto.webp', 'Kit Enxuto', 'Kit compacto, prático e perfeito para começar.', 'R$ 42,90', '3x R$ 14,30', '103 reviews', 'kit-enxuto', '50% OFF'],
    ['kit-teen.webp', 'Etiquetas Kit Teen', 'Etiquetas grandes, médias e super minis.', 'De R$ 50,90', '3x R$ 16,97', '372 reviews', 'etiquetas-kit-teen', '40% OFF'],
    ['kit-completo.webp', 'Kit Completo', 'Para roupas, sapatos, objetos e tags de mochila.', 'De R$ 153,90', '3x R$ 51,30', '208 reviews', 'kit-completo', '35% OFF']
  ];

  const icon = (name) => ({
    truck: '<rect x="2" y="7" width="11" height="8" rx="1"/><path d="M13 11h4l3 4"/><circle cx="7.5" cy="17.5" r="2"/><circle cx="16.5" cy="17.5" r="2"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h3m2 0h5"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.5 2.5 4.5-4.5"/>'
  })[name];

  const benefits = () => `
    <section class="store-benefits" aria-label="Benefícios da loja"><div class="store-shell store-benefits__track">
      ${[['truck','Frete Grátis','acima de R$150*'],['shield','Compra Segura','Site protegido'],['card','Pague em até 3x','sem juros em todo site*'],['check','Qualidade Garantida','15+ anos de qualidade']].map(item => `
        <article class="store-benefit"><span class="store-benefit__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${icon(item[0])}</svg></span><span><strong>${item[1]}</strong><small>${item[2]}</small></span></article>`).join('')}
    </div></section>`;

  const productCard = ([image, title, description, price, installment, reviews, slug]) => `
    <article class="store-product"><a href="${storeUrl}/products/${slug}">
      <div class="store-product__media"><span class="store-badge">${randomBadge()}</span><button class="store-wishlist" type="button" aria-label="Adicionar ${title} aos favoritos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg></button><img src="${imagePath}${image}" alt="${title}" loading="lazy"></div>
      <div class="store-product__body"><span class="store-stars${reviews ? '' : ' store-stars--empty'}">${reviews ? `★★★★★ <small>${reviews.replace('reviews', 'avaliações')}</small>` : 'Sem avaliações'}</span><h3>${title}</h3><p>${description}</p><strong class="store-price">${price}<small>${installment}</small></strong><span class="store-shipping">Pronto para envio sexta-feira, 14/08</span><span class="store-buy">Comprar</span></div>
    </a></article>`;

  const productSection = (title, products, collection, tinted = false) => `
    <section class="store-products${tinted ? ' store-products--tint' : ''}" aria-label="${title}"><div class="store-shell">
      <header class="store-section-title"><h2>${title}</h2></header><div class="store-products__carousel"><button class="store-carousel-arrow store-carousel-arrow--prev" type="button" aria-label="Produtos anteriores"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg></button><div class="store-product-grid">${products.map(productCard).join('')}</div><button class="store-carousel-arrow store-carousel-arrow--next" type="button" aria-label="Próximos produtos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg></button></div>
      <a class="store-view-all" href="${storeUrl}/collections/${collection}">Ver Todos</a>
    </div></section>`;

  const categories = [
    ['category-kits.jpg', 'Kits de Etiquetas', 'kit'],
    ['category-avulsas.jpg', 'Etiquetas Avulsas', 'etiquetas-avulsas'],
    ['category-termocolantes.jpg', 'Etiquetas Termocolantes', 'termocolante'],
    ['category-tags.jpg', 'Tags', 'tags'],
    ['category-futebol.webp', 'Coleção Futebol', '../pages/futebol']
  ];

  const blog = [
    ['blog-mochila.png', '11 de ago. de 2026', 'Como organizar a mochila escolar para a criança encontrar tudo sozinha', 'Com menos itens à vista, as crianças brincam por mais tempo e com mais criatividade.', 'como-organizar-a-mochila-escolar-para-a-crianca-encontrar-tudo-sozinha'],
    ['blog-tea.png', '27 de jul. de 2026', 'Como etiquetar itens escolares para portadores de TEA e TDAH', 'Entenda o papel da identificação visual dentro da escola e da rotina infantil.', 'como-etiquetar-itens-escolares-para-portadores-de-tea-e-tdah'],
    ['blog-organizacao.jpg', '27 de jul. de 2026', 'Como fazer meu filho parar de esquecer seus pertences e ser mais organizado', 'Estratégias simples para desenvolver autonomia e uma rotina mais organizada.', 'como-fazer-meu-filho-parar-de-esquecer-seus-pertences-e-ser-mais-organizado']
  ];

  content.innerHTML = `
    <section class="store-kicker"><h1>Etiquetas Personalizadas e Adesivos</h1></section>
    ${benefits()}
    ${productSection('Mais Vendidos', bestSellers, 'mais-vendidos')}
    <section class="store-categories" aria-label="Categorias em destaque"><div class="store-category-track">${categories.map(item => `<a href="${storeUrl}/collections/${item[2]}"><img src="${imagePath}${item[0]}" alt="${item[1]}" loading="lazy"></a>`).join('')}</div></section>
    ${productSection('Novidades', news, 'novidades', true)}
    ${productSection('Kits de Etiquetas', kits, 'kit')}
    <section class="store-blog"><div class="store-shell"><header class="store-section-title"><h2>Últimas do Nosso Blog</h2></header><div class="store-blog__grid">${blog.map(item => `<article><a href="${storeUrl}/blogs/news/${item[4]}"><img src="${imagePath}${item[0]}" alt="${item[2]}" loading="lazy"><time>${item[1]}</time><h3>${item[2]}</h3><p>${item[3]}</p></a></article>`).join('')}</div><a class="store-view-all" href="${storeUrl}/blogs/news">Ver Todos</a></div></section>
    <a class="store-instagram" href="https://www.instagram.com/grudadoemvoce/" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg><strong>Seu pedido ficou lindo? Queremos ver!</strong><span>@grudadoemvoce</span></a>
    <section class="store-about"><div class="store-shell store-about__content"><h2>Grudado em Você – Etiquetas e Adesivos Personalizados com Criatividade</h2><p>Bem-vindo à Grudado em Você, a loja online referência em etiquetas personalizadas, adesivos escolares e kits criativos para transformar a rotina de crianças, pais, professores e organizadores. Nossa missão é oferecer produtos de alta qualidade que facilitam a vida e encantam pelo visual.</p><details><summary>Ver mais</summary><p>Trabalhamos com etiquetas para roupas, calçados, lancheiras, brinquedos, livros e materiais escolares. Tudo é personalizável, produzido com materiais resistentes e enviado para todo o Brasil com carinho e rastreamento.</p><h3>Motivos para comprar na Grudado em Você</h3><ul><li>Variedade de modelos e temas criativos</li><li>Materiais de alta qualidade e durabilidade</li><li>Personalização fácil direto no site</li><li>Produção rápida e envio para todo o Brasil</li></ul></details></div></section>
    <a class="store-affiliate" href="https://parceria.grudadoemvoce.com.br/" target="_blank" rel="noopener"><span>★</span> Conheça o nosso programa de afiliados. <strong>Saiba mais →</strong></a>`;

  footer.className = 'store-footer';
  footer.innerHTML = `
    <div class="store-footer__accent" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="store-shell store-footer__content">
      <a class="store-footer__blog" href="${storeUrl}/blogs/news">
        <span class="store-footer__blog-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg></span>
        <span class="store-footer__blog-copy"><strong>Fique por dentro das novidades</strong><small>Receba dicas, lançamentos e ofertas especiais.</small></span>
        <span class="store-footer__blog-button">Conhecer o blog <b>→</b></span>
      </a>

      <div class="store-footer__grid">
        <section><h2>Sobre a Grudado em Você</h2><p>A solução para todos os seus problemas de Identificação e Organização.<br>Aqui você encontra Etiquetas Personalizadas pra Escola, Etiquetas Organizadoras para Casa, Quadros de Incentivo, Bolsinhas Personalizadas e outros mimos. Tudo feito à mão e embalado com muito carinho.</p></section>
        <nav aria-label="Ajuda"><h2>Ajuda</h2></nav>
        <section><h2>Fale Conosco</h2><p>Atendimento de:<br>Segunda à Sexta-feira<br>Das 09:00h às 18:00h<br>E-mail:<br><a href="mailto:contato@grudadoemvoce.com.br">contato@grudadoemvoce.com.br</a><br>Telefones:<br><strong>(21) 2018-2074</strong> ou <strong>(11) 3181-6202</strong></p></section>
        <form class="store-newsletter" onsubmit="return false"><h2>Novidades</h2><p>Inscreva-se para receber ofertas, novidades e dicas.</p><div><input id="newsletter-email" type="email" placeholder="Seu melhor e-mail" aria-label="Seu melhor e-mail"><button type="submit">Assinar <b>→</b></button></div><small>Ao cadastrar seu e-mail, você concorda com nossa política de privacidade.</small></form>
      </div>

      <div class="store-footer__social-title">Siga a Grudado em Você</div>
      <div class="store-footer__bottom"><span><strong>GRUDADO EM VOCÊ ETIQUETAS LTDA</strong>&nbsp;&nbsp; CNPJ 12.863.194/0001-38</span></div>
    </div>`;

  content.querySelectorAll('.store-products__carousel').forEach((carousel) => {
    const track = carousel.querySelector('.store-product-grid');
    carousel.querySelector('.store-carousel-arrow--prev').addEventListener('click', () => track.scrollBy({ left: -track.clientWidth * 0.8, behavior: 'smooth' }));
    carousel.querySelector('.store-carousel-arrow--next').addEventListener('click', () => track.scrollBy({ left: track.clientWidth * 0.8, behavior: 'smooth' }));
  });

  content.querySelectorAll('.store-wishlist').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      button.classList.toggle('is-active');
      button.querySelector('svg').setAttribute('fill', button.classList.contains('is-active') ? 'currentColor' : 'none');
    });
  });
});
