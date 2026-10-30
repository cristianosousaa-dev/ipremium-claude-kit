---
paths:
  - "**/*.tsx"
  - "**/*.css"
  - "**/*.html"
---

# Interface

- Antes de desenhar: skill `design` (barra de qualidade e estrutura). Cor, tipografia e forma vêm da marca do cliente em `PRODUCT.md`, não de um modelo genérico.
- Tokens de design num só sítio (variáveis CSS ou tema Tailwind). Sem valores soltos nos componentes.
- Todo o ecrã de dados tem estados de carregamento, vazio, erro e sucesso.
- Formulários: `label` real, erro junto ao campo, foco visível, `autocomplete` correto.
- Acessibilidade WCAG 2.2 AA: contraste, teclado em todo o fluxo, ordem de foco, `alt`, regiões e cabeçalhos corretos, `prefers-reduced-motion`.
- Movimento com propósito (estado, hierarquia, feedback). Só `transform` e `opacity`. Sem animação que bloqueie a leitura.
- Verificar a 360, 768 e 1280 px, em claro e escuro, com consola limpa (agente `qa-browser`).
- Orçamento: LCP até 2,5 s, INP até 200 ms, CLS até 0,1, Lighthouse a 90 ou mais. Imagens com dimensões, `next/image`, fontes com `display: swap`.
- Páginas públicas: título e descrição únicos, dados estruturados válidos, `robots` e `sitemap`, contraste e marcação semântica.
