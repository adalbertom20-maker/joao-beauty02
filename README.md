# João Beauty — Mini E-commerce Premium

Site institucional/catálogo da **João Beauty**, loja independente especializada em consultoria e revenda de produtos originais **Caudalie**. Toda a conversão acontece via **WhatsApp** (+55 62 99340-3763) — não há checkout/pagamento no site.

## Aviso importante

Este site **não é o site oficial da Caudalie**. A João Beauty é uma revendedora independente. Isso está deixado claro em:
- Trust bar (topo de todas as páginas)
- Rodapé (disclaimer fixo em todas as páginas)
- Página "Sobre" (seção dedicada com aviso destacado)
- Página de Produtos (aviso acima do catálogo)

## Estrutura

```
/
├── index.html          → Home institucional
├── produtos.html        → Catálogo com filtros, busca e ordenação
├── sobre.html           → Institucional + disclaimer sobre a marca Caudalie
├── contato.html         → Canais de contato, formulário (envia via WhatsApp) e FAQ
├── robots.txt
├── sitemap.xml
├── css/
│   └── style.css        → Todo o design system (cores, tipografia, componentes)
├── js/
│   ├── app.js            → Header, menu mobile, carrossel, scroll reveal, dark mode
│   ├── cart.js            → Carrinho completo (localStorage)
│   ├── products.js        → Renderização de produtos, modal de detalhe, favoritos
│   └── search.js          → Busca instantânea
├── data/
│   └── products.json     → 12 produtos (dados completos)
└── assets/
    ├── logo/, products/, icons/, banners/  → pastas prontas para imagens reais
```

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub (ex: `joao-beauty`)
2. Faça upload de todos os arquivos mantendo a estrutura de pastas
3. Vá em **Settings → Pages**
4. Em "Source", selecione a branch `main` e pasta `/ (root)`
5. Salve — o site ficará disponível em `https://seu-usuario.github.io/joao-beauty/`

## Substituindo imagens placeholder

Atualmente os produtos usam **ícones SVG ilustrativos** como placeholder visual (não fotos). Para usar fotos reais:

1. Adicione as imagens em `assets/products/` com os nomes already referenciados no `data/products.json` (campo `imagem`)
2. Em `js/products.js`, na função `renderProductCard`, troque o bloco `<div class="product-img-placeholder">` por uma tag `<img>` apontando para `produto.imagem`
3. Mesmo processo no `openModal()` para a imagem grande do modal

## Editando produtos

Todo o catálogo vive em `data/products.json`. Cada produto aceita os campos: `id`, `nome`, `categoria`, `descricao_curta`, `descricao_completa`, `imagem`, `preco`, `parcelamento`, `beneficios`, `ingredientes`, `volume`, `modo_uso`, `tags`, `destaque`, `novo`.

## Ativando Analytics (opcional)

No `<head>` do `index.html` há comentários prontos para Google Analytics, GTM, Meta Pixel e TikTok Pixel — basta descomentar e inserir os IDs reais.

## Funcionalidades implementadas

- Header transparente → sólido ao rolar, com menu responsivo
- Catálogo dinâmico via JSON com filtros por categoria, ordenação e busca instantânea
- Carrinho lateral completo com localStorage (adicionar, remover, atualizar quantidade)
- Checkout 100% via WhatsApp com mensagem auto-gerada (itens + total)
- Modal de detalhe do produto com informações completas
- Favoritos (localStorage)
- Carrossel de depoimentos com autoplay, swipe e dots
- Scroll reveal (animações ao rolar)
- Dark mode opcional (persistido)
- SEO: meta tags, Open Graph, Schema.org (Organization + ItemList), robots.txt, sitemap.xml
- Totalmente responsivo (mobile, tablet, desktop, ultra-wide)
