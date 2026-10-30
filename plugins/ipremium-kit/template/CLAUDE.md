# <Projeto>

> Cabeça (porquê e princípios), tronco (arquitetura e stack), membros (como se faz).
> Mantém-se abaixo de 200 linhas. O pormenor vive em `.claude/rules/` (carrega só quando se mexe nesses ficheiros), em skills e em `docs/`.

## CABEÇA — identidade e princípios

**O que é:** <uma frase: produto, cliente, público, tom>. Detalhe em `PRODUCT.md`.
**Sucesso é:** <métrica que o cliente reconhece>. **Fora de âmbito:** <o que não se faz>.

Princípios, por ordem de prioridade:
1. **Verificar, não adivinhar.** Ler o código, correr o comando, abrir o browser. Dizer se **corri**, **reproduzi** ou **raciocinei**.
2. **Mudança mínima.** Só o que o pedido exige. Sem abstrações nem ficheiros "para depois".
3. **Seguro por defeito.** Assume um atacante e uma falha às 3 da manhã. Segurança, acessibilidade e tratamento de erros nunca se "simplificam".
4. **Provar antes de dar como feito.** Vermelho, depois verde, e visto no sistema real.
5. **Perguntar antes de construir** quando há ambiguidade real. Uma pergunta curta.

## TRONCO — arquitetura e stack

- **Stack:** Next.js (App Router) + TypeScript `strict` + Tailwind · Supabase (Postgres, Auth, RLS, Storage) · Vercel · Cloudflare (DNS) · Sentry · Resend. <Desvios e versões que importam.>
- **Dados:** autorização na base de dados (RLS), não na interface. Esquema em `docs/SCHEMA.md`. Alterações só por migração em `supabase/migrations/`.
- **Estrutura:** pastas por funcionalidade; rotas e handlers finos; lógica de domínio fora do framework; env validado no arranque.
- **Decisões:** o porquê está em `docs/adr/`. Ler o ADR da área antes de a alterar. Decisão difícil de desfazer (esquema, URLs, auth, fornecedor) = novo ADR.
- **Ambientes:** local, preview (por PR), produção. Produção só muda por PR com CI verde.

### Navegação de código (poupar contexto)
- **Localizar antes de ler.** Definições e referências pelo LSP (plugin `typescript-lsp`); se existir `graphify-out/`, `graphify explain|path|affected "<símbolo>"`; senão Grep com padrão preciso. Só depois abrir ficheiros.
- **Ler o intervalo de linhas necessário**, não o ficheiro inteiro. Não reler o que já está no contexto.
- **Perguntas largas** ("onde acontece X?") vão para um subagente (`code-explorer`): devolve um resumo e o contexto principal fica limpo.
- **Antes de renomear, apagar ou refatorar:** listar as referências (LSP ou `graphify affected`), nunca assumir.
- Grafo desatualizado: `graphify update .` (local, sem custo). Para o ligar neste projeto: `graphify claude install`.

### Comandos
| Para | Comando |
|---|---|
| Desenvolver | `npm run dev` |
| Tudo o que o CI corre | `npm run verify` (lint, typecheck, test, build) |
| E2E | `npm run test:e2e` |
| Segredos no repo | `node scripts/scan-secrets.mjs` |

## MEMBROS — como se trabalha

Packs ligados (`.claude/settings.json`): `kit` (sempre: agentes e skills base), `workflows` (comandos `/plan`, `/feature-dev`, `/code-review`...), `web`, `design`, `data`. Ligar só quando o projeto precisa, porque cada skill, agente e comando ligado custa contexto: `languages` (Python, Go, Rust, Java...), `engineering`, `ops`, `product`, `growth`, `ai`, `mobile`, `commerce`, `integrations`, `automation`.

| Quando | Usar |
|---|---|
| Projeto ou funcionalidade nova | skills `brainstorming`/`to-spec`, depois `new-project` |
| Decisão de arquitetura | skills `codebase-design` e `architecture-decision-records` (ADR em `docs/adr/`) |
| Antes de escrever código | `search-first` (já existe no projeto ou numa biblioteca instalada?) |
| Bug | `systematic-debugging`: causa raiz antes da correção |
| Lógica nova | `tdd` |
| Interface | skill `design` + `web-design-guidelines`; agentes `qa-browser`, `a11y-architect`, `performance-optimizer`, `seo-specialist` (páginas públicas) |
| Base de dados | skills `supabase`, `postgres-patterns`; agentes `database-reviewer` e `db-guard` em toda a migração |
| Antes de dar como feito | `definition-of-done`; revisores: `code-reviewer`, `typescript-reviewer`, `react-reviewer`, `silent-failure-hunter` |
| Segurança (auth, input, dinheiro, uploads, PII) | agente `security-reviewer` + `security-review` + plugin `security-guidance` |
| Publicar | skill `release` |
| Contexto a crescer | `/compact` entre tarefas; sessões curtas; uma tarefa de cada vez |

Regras detalhadas, carregadas só quando relevantes: `.claude/rules/` (arquitetura, segurança, base de dados, interface, testes).

## Inegociável
- Nunca ler, escrever ou colar segredos. Nunca commitar `.env*`. Chave de serviço nunca no cliente nem com prefixo `NEXT_PUBLIC_`.
- Preços, planos, permissões e quantias vêm de constantes do servidor, nunca do pedido.
- Sem `force push`, `reset --hard`, `--no-verify` nem SQL destrutivo na shell (o hook do plugin bloqueia).
- Commits só quando pedido, num ramo, nunca em `main`. Mensagens em inglês, a explicar o porquê.
- Texto de interface em PT-PT formal. Sem emojis. Sem conteúdo inventado apresentado como real.
- Cada escrita ou chamada externa tem o erro verificado (`{ error }`, 0 linhas afetadas, `catch` vazio).

## Gotchas
<Armadilhas reais do ambiente e do projeto. Cada linha nasce de uma falha observada, não de uma lista de boas intenções.>

## Segurança e contactos
<Modelo de autenticação, endpoints de webhook (verificar assinatura), nomes dos segredos (sem valores).> Incidentes: `docs/runbook-incidentes.md`. Reporte: `SECURITY.md`.
