document.addEventListener('DOMContentLoaded', () => {
  const images = [
    'assets/images/produtos/super-mini/super-mini-01.webp',
    'assets/images/produtos/super-mini/super-mini-02.webp',
    'assets/images/produtos/super-mini/super-mini-03.webp',
    'assets/images/produtos/super-mini/super-mini-04.webp',
    'assets/images/produtos/super-mini/super-mini-05.webp',
    'assets/images/produtos/super-mini/super-mini-06.webp',
    'assets/images/produtos/super-mini/super-mini-07.webp',
    'assets/images/produtos/super-mini/super-mini-08.webp',
    'assets/images/produtos/super-mini/super-mini-09.webp',
    'assets/images/produtos/super-mini/super-mini-10.webp',
    'assets/images/produtos/super-mini/super-mini-11.webp',
    'assets/images/produtos/super-mini/super-mini-12.webp',
    'assets/images/produtos/super-mini/super-mini-13.webp',
    'assets/images/produtos/super-mini/super-mini-14.webp',
    'assets/images/produtos/super-mini/super-mini-15.webp',
    'assets/images/produtos/super-mini/super-mini-16.webp',
    'assets/images/produtos/super-mini/super-mini-17.webp',
    'assets/images/produtos/super-mini/super-mini-18.webp',
    'assets/images/produtos/super-mini/super-mini-19.webp',
    'assets/images/produtos/super-mini/super-mini-20.webp',
    'assets/images/produtos/super-mini/super-mini-21.webp',
  ];

  const stage = document.querySelector('.super-mini-gallery__stage');
  const mainImage = document.getElementById('super-mini-main-image');
  const thumbs = [...document.querySelectorAll('.super-mini-thumb')];
  const counter = document.querySelector('.super-mini-gallery__counter');
  let currentImage = 0;

  const showImage = (index) => {
    currentImage = (index + images.length) % images.length;
    stage.classList.add('is-changing');
    window.setTimeout(() => {
      mainImage.src = images[currentImage];
      mainImage.alt = `Etiqueta Super Mini — foto ${currentImage + 1}`;
      counter.textContent = `${currentImage + 1} / ${images.length}`;
      thumbs.forEach((thumb, thumbIndex) => thumb.classList.toggle('is-active', thumbIndex === currentImage));
      stage.classList.remove('is-changing');
    }, 120);
  };

  thumbs.forEach((thumb, index) => thumb.addEventListener('click', () => showImage(index)));
  document.querySelector('.super-mini-gallery__arrow--prev').addEventListener('click', () => showImage(currentImage - 1));
  document.querySelector('.super-mini-gallery__arrow--next').addEventListener('click', () => showImage(currentImage + 1));

  const prices = {
    60: { price: 'R$ 24,90', installment: '3x R$ 8,30', value: 24.90 },
    120: { price: 'R$ 42,90', installment: '3x R$ 14,30', value: 42.90 },
  };
  const price = document.getElementById('super-mini-price');
  const installment = document.getElementById('super-mini-installment');
  document.querySelectorAll('input[name="super-mini-quantity"]').forEach((input) => {
    input.addEventListener('change', () => {
      const selected = prices[input.value];
      price.textContent = selected.price;
      installment.textContent = selected.installment;
    });
  });

  const nameInput = document.getElementById('super-mini-name');
  const labelPreview = document.getElementById('super-mini-label-preview');
  nameInput.addEventListener('input', () => {
    labelPreview.textContent = nameInput.value.trim() || 'Miguel';
  });

  document.querySelectorAll('.super-mini-color').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.super-mini-color').forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');
      labelPreview.style.background = button.dataset.color;
    });
  });

  const shippingInput = document.getElementById('super-mini-cep');
  const shippingButton = document.querySelector('.super-mini-shipping__form button');
  const shippingResult = document.querySelector('.super-mini-shipping__result');
  shippingInput.addEventListener('input', () => {
    const digits = shippingInput.value.replace(/\D/g, '').slice(0, 8);
    shippingInput.value = digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
  });
  const calculateShipping = () => {
    const valid = /^\d{5}-?\d{3}$/.test(shippingInput.value);
    shippingResult.textContent = valid
      ? 'Frete e prazo serão apresentados no checkout desta demonstração.'
      : 'Digite um CEP válido para consultar.';
  };
  shippingButton.addEventListener('click', calculateShipping);
  shippingInput.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    calculateShipping();
  });

  const productForm = document.getElementById('super-mini-product-form');
  const buyButton = document.querySelector('.super-mini-buy');
  productForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const quantity = document.querySelector('input[name="super-mini-quantity"]:checked').value;
    const selected = prices[quantity];
    const item = {
      nome: 'Etiqueta Super Mini',
      colecao: 'Identificação de Objetos',
      tamanho: '2,5 × 1 cm',
      quantidade: `${quantity} etiquetas`,
      acabamento: `Vinil fosco — ${document.querySelector('.super-mini-color.is-active').title}`,
      obs: nameInput.value.trim() ? `Nome: ${nameInput.value.trim()}` : '',
      imagem: mainImage.src,
      preco: selected.value,
      material: 'vinil-fosco',
    };

    if (typeof Carrinho !== 'undefined') Carrinho.adicionar(item);

    const original = buyButton.innerHTML;
    buyButton.classList.add('is-added');
    buyButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m5 12 4 4L19 6"/></svg>Adicionado!';
    window.setTimeout(() => {
      buyButton.classList.remove('is-added');
      buyButton.innerHTML = original;
    }, 1800);
  });
});
