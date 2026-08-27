document.addEventListener('DOMContentLoaded', () => {
  const catalogCollections = {
    'mais-vendidos': {
      title: 'Mais Vendidos',
      description: 'Os produtos preferidos para identificar e organizar a rotina.',
      products: [
        {
          title: 'Etiqueta Mini',
          category: 'Para objetos',
          description: 'Compacta e resistente para os pequenos objetos do dia a dia.',
          image: '../assets/images/home-store/bestseller-mini.webp',
          price: 'R$ 32,90',
          installment: '3x R$ 10,97',
          reviews: '328',
        },
        {
          title: 'Etiqueta Super Mini',
          category: 'Lápis e canetas',
          description: 'O menor formato para identificar sem atrapalhar o uso.',
          image: '../assets/images/home-store/bestseller-super-mini.webp',
          price: 'R$ 24,90',
          installment: '3x R$ 8,30',
          reviews: '385',
        },
        {
          title: 'Pulseira de ID',
          category: 'Passeios e eventos',
          description: 'Conforto e identificação segura para momentos fora de casa.',
          image: '../assets/images/home-store/bestseller-pulseira.webp',
          price: 'R$ 61,90',
          installment: '3x R$ 20,63',
          reviews: '474',
        },
        {
          title: 'Etiqueta Fininha',
          category: 'Formato discreto',
          description: 'Delicada e versátil para objetos com pouco espaço disponível.',
          image: '../assets/images/home-store/bestseller-fininha.webp',
          price: 'R$ 24,90',
          installment: '3x R$ 8,30',
          reviews: '308',
        },
      ],
    },
    viagem: {
      title: 'Essenciais para Viagem',
      description: 'Itens práticos para viajar com tudo identificado, protegido e organizado.',
      products: [
        {
          title: 'Pulseira de ID Reutilizável',
          category: 'Identificação e segurança',
          description: 'Identificação confortável e segura para passeios e locais movimentados.',
          image: 'https://cdn.shopify.com/s/files/1/0733/0011/5708/files/Pulseira-de-ID-Reutilizavel.webp?v=1757341242',
          price: 'R$ 61,90',
          installment: '3x R$ 20,63',
        },
        {
          title: 'Tag Bagagem',
          category: 'Malas e mochilas',
          description: 'Facilita a identificação de malas, mochilas e bolsas durante a viagem.',
          image: 'https://cdn.shopify.com/s/files/1/0733/0011/5708/files/Tag_bagagem_1-convertido-de-png.webp?v=1787323822',
          price: 'R$ 50,90',
          installment: '3x R$ 16,97',
        },
        {
          title: 'Saco com Visor',
          category: 'Organização de roupas',
          description: 'O visor transparente permite encontrar cada item sem abrir o saco.',
          image: 'https://cdn.shopify.com/s/files/1/0733/0011/5708/files/Saco-com-Visor.webp?v=1757339800',
          price: 'R$ 54,90',
          installment: '3x R$ 18,30',
        },
        {
          title: 'Saco Personalizado',
          category: 'Organização da mala',
          description: 'Separa roupas e pertences com praticidade durante viagens e passeios.',
          image: 'https://cdn.shopify.com/s/files/1/0733/0011/5708/files/9db47375-a9de-45c2-830b-03bac30a4109-convertido-de-png.webp?v=1778591552',
          price: 'R$ 54,90',
          installment: '3x R$ 18,30',
        },
      ],
    },
    roupas: {
      title: 'Para Roupas',
      description: 'Soluções duráveis para uniformes, peças do dia a dia e roupas pequenas.',
      products: [
        {
          title: 'Etiqueta Termocolante Personalizada',
          category: 'Uniformes e roupas',
          description: 'Fixação permanente com aplicação simples usando ferro de passar.',
          image: 'https://cdn.shopify.com/s/files/1/0733/0011/5708/files/Etiqueta-Termocolante.webp?v=1757341423',
          price: 'R$ 42,90',
          installment: '3x R$ 14,30',
        },
        {
          title: 'Etiqueta Termocolante Colorida',
          category: 'Identificação colorida',
          description: 'Mais cor e diversão para identificar uniformes e roupas escolares.',
          image: 'https://cdn.shopify.com/s/files/1/0733/0011/5708/files/Etiqueta-Termocolante-Colorida.webp?v=1757341340',
          price: 'R$ 42,90',
          installment: '3x R$ 14,30',
        },
        {
          title: 'Etiqueta Mini Termocolante',
          category: 'Peças pequenas',
          description: 'Formato discreto para identificar meias, roupas íntimas e peças menores.',
          image: 'https://cdn.shopify.com/s/files/1/0733/0011/5708/files/Etiqueta-Mini-Termocolante.webp?v=1757341411',
          price: 'R$ 63,90',
          installment: '3x R$ 21,30',
        },
        {
          title: 'Kit Completo',
          category: 'Objetos, roupas e sapatos',
          description: 'Uma seleção completa de formatos para identificar toda a rotina.',
          image: 'https://cdn.shopify.com/s/files/1/0733/0011/5708/files/Screenshotconvertido-de-png.webp?v=1787248238',
          price: 'R$ 153,90',
          installment: '3x R$ 51,30',
        },
      ],
    },
    necessaires: {
      title: 'Nécessaires e Estojos',
      description: 'Organização funcional para higiene, acessórios e materiais do dia a dia.',
      products: [
        {
          title: 'Kit Higiene',
          category: 'Higiene pessoal',
          description: 'Organiza escova, pasta, fio dental e outros itens com ventilação interna.',
          image: 'https://cdn.shopify.com/s/files/1/0733/0011/5708/files/Kit-Higiene_b8d9c641-cdc0-48a3-9eaf-35e6d6a19050.webp?v=1757341048',
          price: 'R$ 50,90',
          installment: '3x R$ 16,97',
        },
        {
          title: 'Nécessaire Clear',
          category: 'Organização transparente',
          description: 'Mantém os itens visíveis e organizados para escola, clube e viagens.',
          image: 'https://cdn.shopify.com/s/files/1/0733/0011/5708/files/Necessaire-Clear_9e10d0b8-07fd-4e63-89ea-b850e61b60bc.webp?v=1757340834',
          price: 'R$ 65,90',
          installment: '3x R$ 21,97',
        },
        {
          title: 'Kit Higiene Fino Personalizado',
          category: 'Formato compacto',
          description: 'Cabe em bolsas e mochilas e também organiza talheres e canudos.',
          image: 'https://cdn.shopify.com/s/files/1/0733/0011/5708/files/Grudado_629.webp?v=1762442412',
          price: 'R$ 64,90',
          installment: '3x R$ 21,63',
        },
        {
          title: 'Combo Passeio Personalizado',
          category: 'Passeios e viagens',
          description: 'Três organizadores personalizados para diferentes momentos da rotina.',
          image: 'https://cdn.shopify.com/s/files/1/0733/0011/5708/files/Grudado_1352.webp?v=1762442115',
          price: 'R$ 153,90',
          installment: '3x R$ 51,30',
        },
      ],
    },
    casa: {
      title: 'Para Casa e Escritório',
      description: 'Produtos versáteis para proteger, separar e manter cada espaço organizado.',
      products: [
        {
          title: 'Saco Impermeável',
          category: 'Proteção contra umidade',
          description: 'Ajuda a separar roupas úmidas em passeios, viagens, praia e piscina.',
          image: 'https://cdn.shopify.com/s/files/1/0733/0011/5708/files/Saco-Impermeavel.webp?v=1757340951',
          price: 'R$ 52,90',
          installment: '3x R$ 17,63',
        },
        {
          title: 'Bolsa Álbum',
          category: 'Coleções protegidas',
          description: 'Protege o álbum e mantém as figurinhas organizadas em um só lugar.',
          image: 'https://cdn.shopify.com/s/files/1/0733/0011/5708/files/Bolsa_transparente_com_album_da_Copa-convertido-de-png.webp?v=1775768416',
          price: 'R$ 50,90',
          installment: '3x R$ 16,97',
        },
        {
          title: 'Kit Higiene',
          category: 'Organização diária',
          description: 'Armazena itens de higiene com praticidade, ventilação e fácil visualização.',
          image: 'https://cdn.shopify.com/s/files/1/0733/0011/5708/files/Kit-Higiene_b8d9c641-cdc0-48a3-9eaf-35e6d6a19050.webp?v=1757341048',
          price: 'R$ 50,90',
          installment: '3x R$ 16,97',
        },
        {
          title: 'Nécessaire Clear',
          category: 'Itens sempre visíveis',
          description: 'Uma solução transparente e resistente para organizar acessórios.',
          image: 'https://cdn.shopify.com/s/files/1/0733/0011/5708/files/Necessaire-Clear_9e10d0b8-07fd-4e63-89ea-b850e61b60bc.webp?v=1757340834',
          price: 'R$ 65,90',
          installment: '3x R$ 21,97',
        },
      ],
    },
  };

  document.querySelectorAll('[data-lab-type]').forEach((labType) => {
    const navigation = labType.querySelector('[data-model-navigation]');
    const models = [...labType.querySelectorAll(':scope > .lab-model')];
    const modelTitle = navigation?.querySelector('[data-current-model-title]');
    const modelTabs = navigation?.querySelector('[data-model-tabs]');
    const previousModel = navigation?.querySelector('[data-model-previous]');
    const nextModel = navigation?.querySelector('[data-model-next]');
    let activeModel = 0;

    if (!models.length || !modelTitle || !modelTabs || !previousModel || !nextModel) return;

    const tabs = models.map((model, index) => {
      const tab = document.createElement('button');
      tab.type = 'button';
      tab.textContent = index + 1;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', model.id);
      tab.setAttribute('aria-label', `Ver ${model.dataset.modelTitle || `MODELO ${index + 1}`}`);
      modelTabs.appendChild(tab);
      return tab;
    });

    const showModel = (index, updateHash = true) => {
      activeModel = Math.max(0, Math.min(index, models.length - 1));
      models.forEach((model, modelIndex) => {
        const isActive = modelIndex === activeModel;
        model.hidden = !isActive;
        model.classList.toggle('is-active', isActive);
        tabs[modelIndex].classList.toggle('is-active', isActive);
        tabs[modelIndex].setAttribute('aria-selected', String(isActive));
        tabs[modelIndex].tabIndex = isActive ? 0 : -1;
      });
      modelTitle.textContent = models[activeModel].dataset.modelTitle || `MODELO ${activeModel + 1}`;
      previousModel.disabled = activeModel === 0;
      nextModel.disabled = activeModel === models.length - 1;
      if (updateHash) window.history.replaceState(null, '', `#${models[activeModel].id}`);
    };

    previousModel.addEventListener('click', () => showModel(activeModel - 1));
    nextModel.addEventListener('click', () => showModel(activeModel + 1));
    tabs.forEach((tab, index) => tab.addEventListener('click', () => showModel(index)));
    const hashModel = models.findIndex((model) => `#${model.id}` === window.location.hash);
    showModel(hashModel >= 0 ? hashModel : 0, false);
    if (hashModel >= 0) window.requestAnimationFrame(() => window.scrollTo(0, 0));
  });

  document.querySelectorAll('.collection-nav__carousel').forEach((carousel) => {
    const track = carousel.querySelector('.collection-nav__track');
    const previousButton = carousel.querySelector('.collection-nav__arrow--prev');
    const nextButton = carousel.querySelector('.collection-nav__arrow--next');
    let scrollFrame;

    const updateArrows = () => {
      const maxScrollLeft = Math.max(0, track.scrollWidth - track.clientWidth);
      previousButton.disabled = track.scrollLeft <= 2;
      nextButton.disabled = track.scrollLeft >= maxScrollLeft - 2;
    };

    previousButton.addEventListener('click', () => track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' }));
    nextButton.addEventListener('click', () => track.scrollBy({ left: track.clientWidth, behavior: 'smooth' }));
    track.addEventListener('scroll', () => {
      window.cancelAnimationFrame(scrollFrame);
      scrollFrame = window.requestAnimationFrame(updateArrows);
    }, { passive: true });
    window.addEventListener('resize', updateArrows);
    updateArrows();
  });

  const catalogCardMarkup = (product) => `
    <article class="catalog-card">
      <div class="catalog-card__media">
        <img src="${product.image}" alt="${product.title}" loading="lazy">
        <button type="button" aria-label="Adicionar ${product.title} aos favoritos">♡</button>
      </div>
      <div class="catalog-card__body">
        <span class="catalog-card__category">${product.category}</span>
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        ${product.reviews ? `<div class="catalog-card__rating"><span aria-hidden="true">★★★★★</span><small>${product.reviews}</small></div>` : ''}
        <div class="catalog-card__footer">
          <div><small>A partir de</small><strong>${product.price}</strong><span>${product.installment}</span></div>
          <button class="catalog-card__action" type="button">Personalizar</button>
        </div>
      </div>
    </article>`;

  document.querySelectorAll('[data-catalog-collections]').forEach((catalog) => {
    const title = catalog.querySelector('[data-catalog-title]');
    const description = catalog.querySelector('[data-catalog-description]');
    const grid = catalog.querySelector('.catalog-v2__grid');
    const seeAll = catalog.querySelector('[data-catalog-see-all]');
    const tabs = [...catalog.querySelectorAll('[data-catalog-collection]')];

    const showCollection = (key) => {
      const collection = catalogCollections[key];
      if (!collection) return;
      title.textContent = collection.title;
      description.textContent = collection.description;
      seeAll.textContent = `Ver tudo em ${collection.title}`;
      grid.innerHTML = collection.products.map(catalogCardMarkup).join('');
      grid.scrollTo({ left: 0, behavior: 'auto' });
      tabs.forEach((tab) => {
        const active = tab.dataset.catalogCollection === key;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-selected', String(active));
      });
    };

    tabs.forEach((tab) => tab.addEventListener('click', () => showCollection(tab.dataset.catalogCollection)));
    catalog.addEventListener('click', (event) => {
      const favorite = event.target.closest('.catalog-card__media > button');
      if (!favorite) return;
      const active = favorite.classList.toggle('is-active');
      favorite.textContent = active ? '♥' : '♡';
    });
    const requestedCollection = new URLSearchParams(window.location.search).get('collection');
    showCollection(catalogCollections[requestedCollection] ? requestedCollection : 'mais-vendidos');
  });

  document.querySelectorAll('.catalog-v2__carousel').forEach((carousel) => {
    const track = carousel.querySelector('.catalog-v2__grid');
    const scrollDistance = () => (track.querySelector('.catalog-card')?.getBoundingClientRect().width || 0) + 13;
    carousel.querySelector('.catalog-v2__arrow--previous').addEventListener('click', () => track.scrollBy({ left: -scrollDistance(), behavior: 'smooth' }));
    carousel.querySelector('.catalog-v2__arrow--next').addEventListener('click', () => track.scrollBy({ left: scrollDistance(), behavior: 'smooth' }));
  });

  document.querySelectorAll('.featured-collection__products').forEach((carousel) => {
    const track = carousel.querySelector('.featured-product-grid');
    const cards = [...track.querySelectorAll('.featured-product')];
    const dots = [...carousel.querySelectorAll('.featured-dots button')];

    const currentProduct = () => cards.reduce((closest, card, index) => (
      Math.abs(card.offsetLeft - track.scrollLeft) < Math.abs(cards[closest].offsetLeft - track.scrollLeft) ? index : closest
    ), 0);

    const goToProduct = (index) => {
      const safeIndex = Math.max(0, Math.min(index, cards.length - 1));
      track.scrollTo({ left: cards[safeIndex].offsetLeft, behavior: 'smooth' });
      dots.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === safeIndex));
    };

    carousel.querySelector('.featured-arrow--prev').addEventListener('click', () => goToProduct(currentProduct() - 1));
    carousel.querySelector('.featured-arrow--next').addEventListener('click', () => goToProduct(currentProduct() + 1));
    dots.forEach((dot, index) => dot.addEventListener('click', () => goToProduct(index)));
    track.addEventListener('scroll', () => {
      window.requestAnimationFrame(() => {
        const index = currentProduct();
        dots.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === index));
      });
    }, { passive: true });
  });
});
