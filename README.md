# Página de Orçamentos — Grudado em Você

Landing page de projetos personalizados para a loja [Grudado em Você](https://grudadoemvoce.com.br), com apresentação de materiais, produtos mais vendidos, avaliações de clientes e formulário de orçamento via WhatsApp.

## Acesso

[pagina-orcamentos.vercel.app](https://pagina-orcamentos.vercel.app)

## Estrutura

```
/
├── index.html                        # Home — banner, materiais, mais vendidos, avaliações
├── README.md
│
├── colecoes/                         # Páginas de coleção por material
│   ├── vinil-branco.html
│   ├── vinil-transparente.html
│   └── dtf.html
│
├── produtos/                         # Páginas individuais de produto com formulário
│   ├── corte-personalizado.html
│   ├── adesivo-quadrado.html
│   ├── adesivo-redondo-branco.html
│   ├── adesivo-redondo-transparente.html
│   └── dtf-camiseta.html
│
└── assets/
    ├── css/
    │   ├── style.css                 # Estilos globais (header, footer, home)
    │   ├── colecao.css               # Estilos das páginas de coleção
    │   └── produto.css               # Estilos das páginas de produto
    ├── js/
    │   ├── script.js                 # Banner slider, nav mobile, animações, marquee
    │   └── produto.js                # Upload, formulário e envio via WhatsApp
    └── images/
        ├── logo.svg
        ├── banners/                  # DESKTOP-1/2, MOBILE-1/2/3
        ├── cards/                    # CARD-1/2/3 (cards de material da home)
        └── produtos/                 # Fotos dos produtos
```

## Tecnologias

- HTML5, CSS3, JavaScript puro (sem frameworks)
- Google Fonts: Fira Sans + Nunito
- Hospedagem: Vercel (deploy automático via GitHub)

## Como atualizar

### Trocar imagem de banner
Substitua o arquivo em `assets/images/banners/` mantendo o mesmo nome.

### Adicionar produto ao "Mais Vendidos"
Em `index.html`, dentro de `div.produtos-grid`, copie um bloco `.produto-card` e ajuste imagem, nome e link.

### Adicionar produto a uma coleção
Nos arquivos em `colecoes/`, dentro de `div.produtos-colecao-grid`, copie um bloco `.produto-colecao-card` e ajuste o conteúdo.

### Criar nova página de produto
Duplique qualquer arquivo em `produtos/`, ajuste título, imagem, descrição e especificações. O formulário já está configurado para montar a mensagem e abrir o WhatsApp automaticamente.

### Deploy
Qualquer `git push` para a branch `main` atualiza o site na Vercel automaticamente.

```bash
git add .
git commit -m "descrição da alteração"
git push
```
