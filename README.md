# Guia Eleitoral RJ 2026 — V12 Web/PWA

Pacote estático pronto para hospedagem por HTTPS (GitHub Pages, Cloudflare Pages, Netlify, Vercel ou servidor web comum).

## Arquivos
- `index.html`: aplicação com a base local embutida.
- `manifest.webmanifest`: instalação como PWA.
- `service-worker.js`: cache do aplicativo para abertura resiliente/offline.
- `icons/`: ícones de instalação, inclusive Apple Touch Icon.
- `.nojekyll`: facilita publicação direta no GitHub Pages.

## Publicação rápida no GitHub Pages
1. Crie um repositório.
2. Envie **o conteúdo desta pasta** para a raiz do repositório.
3. Em Settings > Pages, escolha Deploy from a branch e selecione a branch principal, pasta `/ (root)`.
4. Abra a URL HTTPS fornecida pelo GitHub Pages.

## iPhone / iPad
Abra a URL no navegador e use Compartilhar > Adicionar à Tela de Início. A aplicação possui manifesto, Apple Touch Icon e modo standalone.

## Android
Abra a URL em Chrome/Edge/Samsung Internet. Quando disponível, use “Instalar aplicativo”; a própria página também expõe um botão de instalação quando o navegador oferece o prompt.

## Compartilhamento
Os filtros são serializados na query string. Exemplo: `?partido=PT&area=Saúde`.
A ficha individual usa `?candidato=5077-PSOL` e pode ser compartilhada pelo botão “Compartilhar ficha”.

## Observação sobre dados externos
A base básica permanece embutida no `index.html`. Consultas externas ao TSE e à Câmara são enriquecimento opcional. Se um endpoint bloquear CORS ou estiver indisponível, a aplicação continua abrindo e pesquisando a base local.


## V12 — seleção de fichas, áreas e propostas
- Cada card pode ser selecionado; até 4 fichas podem ser abertas na mesma tela como blocos independentes, sem ranking ou nota.
- A ficha individual traz uma seção destacada de áreas associadas à trajetória e, quando existente, atuação parlamentar documentada.
- A seção **Propostas e prioridades declaradas** lê o arquivo `propostas.json`. Só devem ser incluídos itens com fonte primária identificável.
- Estrutura de `propostas.json`: chave `NUMERO|PARTIDO` (ou SQ_CANDIDATO), com `proposals`, `sources` e `updated`.

Exemplo:
```json
{
  "0000|PARTIDO": {
    "proposals": [
      {"title":"Tema", "text":"Descrição factual", "source":"https://fonte-oficial.exemplo"}
    ],
    "sources": ["https://fonte-oficial.exemplo"],
    "updated": "2026-09-29"
  }
}
```


## V12
A área completa de busca e filtros é retrátil e inicia recolhida, deixando mais espaço para os cards dos candidatos em telas de celular.
