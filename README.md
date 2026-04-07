# Página de Orçamentos — Grudado em Você

Landing page de projetos personalizados para a loja [Grudado em Você](https://grudadoemvoce.com.br), com apresentação de materiais, produtos mais vendidos e avaliações de clientes.

## Acesso

[pagina-orcamentos.vercel.app](https://pagina-orcamentos.vercel.app)

## Páginas

| Arquivo | Descrição |
|---|---|
| `index.html` | Home — banner slider, cards de materiais, mais vendidos, avaliações |
| `vinil-branco.html` | Coleção Vinil Branco — grade de produtos |
| `vinil-transparente.html` | Coleção Vinil Transparente — grade de produtos |
| `dtf.html` | Coleção DTF — grade de produtos |

## Estrutura

```
├── index.html
├── vinil-branco.html
├── vinil-transparente.html
├── dtf.html
├── style.css           # Estilos globais
├── colecao.css         # Estilos das páginas de coleção
├── script.js           # Banner slider, nav mobile, animações
├── LOGO-GRUDADO.svg
└── Imagens/
    ├── DESKTOP-1.png   # Banner desktop
    ├── DESKTOP-2.png
    ├── MOBILE-1.png    # Banner mobile
    ├── MOBILE-2.png
    ├── MOBILE-3.png
    ├── CARD-1.png      # Card Vinil Branco
    ├── CARD-2.png      # Card Vinil Transparente
    ├── CARD-3.png      # Card DTF
    ├── PRODUTO-DIECUT.png
    ├── PRODUTO-REDONDO.png
    ├── PRODUTO-TERMO.png
    ├── PRODUTO-TRANSP-REDONDO.png
    └── TESTE-PRODUTOS.png
```

## Tecnologias

- HTML5, CSS3, JavaScript puro (sem frameworks)
- Google Fonts: Fira Sans + Nunito
- Hospedagem: Vercel

## Como atualizar

### Trocar imagem de um produto
Substitua o arquivo na pasta `Imagens/` mantendo o mesmo nome, ou adicione um novo arquivo e atualize o `src` no HTML correspondente.

### Adicionar produto ao "Mais Vendidos"
No `index.html`, dentro da `div.produtos-grid`, copie um bloco `.produto-card` e ajuste a imagem e o nome.

### Adicionar produto a uma coleção
Nos arquivos `vinil-branco.html`, `vinil-transparente.html` ou `dtf.html`, dentro da `div.produtos-colecao-grid`, copie um bloco `.produto-colecao-card` e ajuste o conteúdo.

### Deploy
O deploy é automático — qualquer `git push` para a branch `main` atualiza o site na Vercel.

```bash
git add .
git commit -m "descrição da alteração"
git push
```

## Contato

- WhatsApp: [wa.me/5521991909015](https://wa.me/5521991909015)
- Instagram: [@grudadoemvoce](https://instagram.com/grudadoemvoce)
