# Página de Orçamentos — Grudado em Você

Sistema completo de orçamentos personalizados para a loja [Grudado em Você](https://grudadoemvoce.com.br), desenvolvido com HTML5, CSS3 e JavaScript puro. A solução cobre toda a jornada do cliente: apresentação dos materiais, configuração de produtos, carrinho de compras e envio do pedido via WhatsApp — sem nenhum backend.

**Demo ao vivo:** [pagina-orcamentos.vercel.app](https://pagina-orcamentos.vercel.app)

---

## Visão geral do projeto

A **Grudado em Você** é uma loja especializada em etiquetas e adesivos personalizados. Esta página de orçamentos funciona como um funil de alta conversão: o cliente escolhe o material, configura o produto (dimensões, quantidade, acabamento e arquivo de arte), vê o preço em tempo real e finaliza o pedido diretamente pelo WhatsApp — sem precisar de cadastro ou checkout tradicional.

---

## Funcionalidades

### Para o cliente

- **Seletor de materiais** — Vinil Branco, Vinil Transparente e DTF, com cards explicativos
- **Configuração completa do produto**
  - Upload de arte por clique ou drag & drop (PNG, JPG, PDF, SVG)
  - Tamanhos fixos pré-configurados ou dimensões personalizadas
  - Quantidades padrão (25, 50, 100, 250, 500 un.) ou quantidade customizada
  - Opções de acabamento (borda branca / sem borda)
  - Campo de observações
- **Cálculo de preço em tempo real** com base em dimensões e quantidade
- **Carrinho de compras** com drawer lateral, persistência via LocalStorage e validação de pedido mínimo (R$ 60,00)
- **Finalização via WhatsApp** — mensagem pré-formatada com todos os detalhes do pedido
- **Cupom de primeira compra** (`PRIMEIRA10`) e frete grátis acima de R$ 150,00
- **Vídeo tutorial** ("Como Funciona") com controle de som embutido

### Para o negócio

- Zero dependência de backend — 100% client-side
- Deploy automático via GitHub → Vercel
- Estrutura de páginas por template, fácil de escalar
- Integração direta com WhatsApp como CRM de pedidos

---

## Stack tecnológico

| Camada | Tecnologia |
|---|---|
| Markup | HTML5 semântico |
| Estilos | CSS3 com custom properties (design tokens) |
| Comportamento | JavaScript vanilla (ES6+) |
| Fontes | Hurme Geometric Sans 1 (WOFF2, self-hosted, 12 variações) |
| Persistência | LocalStorage (carrinho) |
| Integração | WhatsApp Web API (`wa.me` deep links) |
| Hospedagem | Vercel (CI/CD via GitHub) |

---

## Arquitetura do projeto

```
/
├── index.html                        # Home: banner slider, materiais, mais vendidos, avaliações
├── carrinho.html                     # Página de carrinho
├── checkout.html                     # Página de checkout
│
├── colecoes/                         # Páginas de coleção por material
│   ├── vinil-branco.html
│   ├── vinil-transparente.html
│   ├── dtf.html
│   └── super-rapido.html
│
├── produtos/                         # Páginas individuais de produto
│   ├── adesivo-quadrado.html
│   ├── adesivo-redondo-branco.html
│   ├── adesivo-redondo-transparente.html
│   ├── adesivo-oval.html
│   ├── adesivo-retangular.html
│   ├── corte-personalizado.html
│   ├── dtf-camiseta.html
│   └── kit-super-rapido.html
│
└── assets/
    ├── css/
    │   ├── tokens.css                # Design tokens: paleta, tipografia, espaçamentos, sombras
    │   ├── style.css                 # Estilos globais: header, footer, home, animações
    │   ├── colecao.css               # Estilos das páginas de coleção
    │   ├── produto.css               # Estilos das páginas de produto e formulário
    │   └── carrinho.css              # Estilos do drawer de carrinho
    ├── js/
    │   ├── script.js                 # Banner slider, nav mobile, scroll animations, marquee
    │   ├── carrinho.js               # Módulo de carrinho (IIFE, LocalStorage, drawer, WhatsApp)
    │   ├── produto.js                # Upload de arte, formulário, precificação em tempo real
    │   └── precos.js                 # Tabela de preços dinâmica por material/dimensão/quantidade
    ├── fonts/                        # Hurme Geometric Sans 1 (12 arquivos WOFF2)
    └── images/
        ├── logo.svg
        ├── banners/                  # Banners responsivos (desktop e mobile)
        ├── cards/                    # Cards de material da home
        ├── collection-banners/       # Banners das páginas de coleção
        ├── produtos/                 # Fotos dos produtos
        ├── promo-banners/            # Banners promocionais
        └── videos/
            └── GrudadoTutorial.mp4
```

---

## Design system

O projeto utiliza um sistema de design tokens (`tokens.css`) baseado na identidade visual oficial da Grudado em Você:

**Paleta de cores**

| Nome | Hex |
|---|---|
| Amarelo | `#F9E547` |
| Verde | `#8EDD65` |
| Pink / Magenta | `#EF426F` |
| Azul Ciano | `#05C3DE` |
| Laranja | `#FF6A39` |
| Azul Marinho | `#253746` |

**Tipografia:** Hurme Geometric Sans 1 — self-hosted em WOFF2 nos pesos Thin, Light, Regular, Semibold, Bold e Black (com variantes oblíquas).

**Grid de espaçamento:** base 4px com escala harmônica até 64px.

---

## Motion design e interações

- **Marquee animado** na barra de anúncios (scroll infinito em CSS)
- **Banner slider** com avanço automático a cada 5 segundos e navegação por dots
- **Scroll animations** via `IntersectionObserver` — fade-in e scale ao entrar na viewport
- **Drawer do carrinho** com slide-in lateral e backdrop blur
- **Efeitos de hover** em cards e botões (elevação + expansão de sombra)
- **Header sticky** com sombra progressiva após 60px de scroll
- **Suporte a `prefers-reduced-motion`** para acessibilidade

---

## Responsividade

Design adaptativo com breakpoints em 1024px (tablet), 768px (mobile) e 480px (mobile pequeno):

- Banner slider com imagens diferentes por dispositivo (`data-desktop` / `data-mobile`)
- Header e navegação colapsam para scroll horizontal no mobile
- Grid de produtos adapta de 5 colunas (desktop) até scroll automático no mobile
- Tipografia fluida com `clamp()` para scaling proporcional
- Tap targets dimensionados para touch (mínimo 44px)

---

## Acessibilidade

- HTML semântico (`header`, `main`, `footer`, `nav`, `section`, `article`)
- Labels e roles ARIA nos elementos interativos
- Ícones SVG com `aria-hidden="true"`
- Navegação por teclado (ESC fecha drawers, Tab navega elementos)
- Contraste alto pela paleta de cores

---

## Como atualizar o conteúdo

### Trocar um banner
Substitua o arquivo em `assets/images/banners/` mantendo o mesmo nome e atualize os atributos `data-desktop` / `data-mobile` no `index.html`.

### Adicionar produto ao "Mais Vendidos"
Em `index.html`, dentro de `.produtos-grid`, copie um bloco `.produto-card` e ajuste imagem, nome e link.

### Criar nova página de produto
Duplique qualquer arquivo em `produtos/`, ajuste título, imagem, descrição e especificações. O formulário já monta a mensagem e abre o WhatsApp automaticamente.

### Adicionar produto a uma coleção
Nos arquivos em `colecoes/`, dentro de `.produtos-colecao-grid`, copie um bloco `.produto-colecao-card` e ajuste o conteúdo.

### Deploy
Qualquer `git push` para a branch `main` atualiza o site na Vercel automaticamente.

```bash
git add .
git commit -m "descrição da alteração"
git push
```

---

## Desenvolvido por

[Daniel Gomes](https://github.com/danielggev) — projeto criado para a loja [Grudado em Você](https://grudadoemvoce.com.br).
