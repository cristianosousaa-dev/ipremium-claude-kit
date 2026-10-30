---
name: kickoff
description: Planeamento obrigatório e igual em todos os projetos, antes de escrever código - perguntas estruturadas, stack, UI/UX, arquitetura e dados, segurança e privacidade, testes e qualidade, funcionalidades, automações e integrações, entrega e operações, revisão por agentes e aprovação. Usar sempre que o utilizador descreve um projeto, pede um site, app ou automação, ou diz "vamos começar".
---

# Kickoff: a mesma metodologia em todos os projetos

Objetivo: aplicações e sites sólidos à primeira. Tudo o que costuma ser corrigido à mão depois (stack errada, ecrãs esquecidos, segurança remendada, testes em falta, integrações que não cabem, âmbito a crescer) decide-se **uma vez**, por escrito, antes de existir código. Um prompt à sorte custa mais do que uma pergunta bem feita.

A sequência é sempre esta, sem saltos: **Plano aprovado, depois fatias** (cada fatia: `tdd`, `definition-of-done`, revisores, `release`).

Resultado deste passo: `docs/plan/` completo e aprovado. Enquanto `docs/plan/APPROVED.md` não existir, o hook `plan-gate` bloqueia escrita fora de `docs/`, `.claude/` e ficheiros `.md` na raiz. Nunca contornar o portão: terminar o plano.

## 1. Recolha (sem perguntar ainda)
Ler o que o utilizador disse e o que já existe na pasta (`PRODUCT.md`, `CLAUDE.md`, repositório, site atual). Escrever para si a lista: **sabido**, **assumido** (com o valor por defeito), **desconhecido**. Não perguntar o que já foi dito.

## 2. Uma ronda de perguntas (uma só mensagem, no máximo 12)
Cada pergunta traz a **resposta recomendada**; o utilizador pode aceitar tudo com "ok". Usar a ferramenta de perguntas com opções quando existir. Cobrir só o que falta, por grupos:
1. **Negócio:** que problema resolve, para quem, como se mede o sucesso, o que fica de fora.
2. **Utilizadores:** quem usa, em que dispositivo e contexto, que papéis e permissões.
3. **Marca e conteúdo:** identidade existente, referências que gosta e que detesta, quem fornece textos e imagens, idiomas (PT-PT por defeito).
4. **Funcionalidades:** obrigatórias agora, desejáveis, **depois** (v2). O que não entra.
5. **Dados e risco:** dados pessoais ou de saúde, pagamentos, menores, requisitos legais (RGPD).
6. **Integrações e automações:** pagamentos, e-mail, CRM, calendário, n8n, webhooks, IA; o que dispara o quê e o que acontece quando falha.
7. **Stack e alojamento:** referência (Next, Supabase, Vercel, Cloudflare, Sentry, Resend) ou restrições do cliente.
8. **Qualidade esperada:** desempenho, acessibilidade, SEO, disponibilidade, quem testa e valida.
9. **Prazos, orçamento e custos recorrentes:** quem paga o quê.
10. **Decisão:** quem aprova o plano e a entrega.

Esperar as respostas. Dúvida que bloqueia o plano: perguntar outra vez, curto; o resto fica como "a confirmar" com dono.

## 3. Escrever o plano em `docs/plan/` (por esta ordem, cada ficheiro curto)
Usar os esqueletos que já lá estão. Só factos; o que não se sabe fica `A confirmar: <dono>`.

| Ficheiro | Conteúdo | Apoio |
|---|---|---|
| `00-brief.md` | problema, utilizadores, métricas, âmbito, fora de âmbito, restrições | `brainstorming`, `to-spec` |
| `01-stack.md` | stack e porquê; **versões e preços verificados na documentação atual**, nunca de memória; custos recorrentes; alternativas rejeitadas | `documentation-lookup`, `docs-lookup` |
| `02-ux-ui.md` | fluxos, inventário de ecrãs, estados, direção visual, tokens, acessibilidade, textos-chave PT-PT | skill `design`, `web-design-guidelines` |
| `03-arquitetura-dados.md` | componentes, entidades, relações, papéis, RLS, APIs e integrações | `codebase-design`, `supabase`, `api-design` |
| `04-seguranca-privacidade.md` | ativos, modelo de ameaças, autenticação, autorização, entradas, segredos, cabeçalhos, dependências, RGPD, IA, incidentes | `security-review`, `owasp-security`, `stride-analysis-patterns`, `gdpr-data-handling` |
| `05-testes-qualidade.md` | pirâmide de testes, fluxos críticos, casos infelizes, RLS, acessibilidade, orçamentos de desempenho, portões do CI | `tdd`, `playwright-best-practices`, `e2e-testing` |
| `06-funcionalidades.md` | lista priorizada com **critérios de aceitação testáveis**, em fatias verticais; o que fica para depois | `planning-and-task-breakdown`, `user-stories` |
| `07-automacoes.md` | cada fluxo: gatilho, passos, dados, repetição segura, caminho de falha, onde vive | `n8n-workflow-patterns` |
| `08-entrega-operacoes.md` | fatias com a verificação de cada uma, ambientes, monitorização, backups e restauro, reverter, custos, pré-mortem | `deployment-patterns`, `observability-and-instrumentation` |

Os packs de apoio podem estar desligados: se uma skill não existir, continuar sem ela e dizê-lo. Para cada decisão difícil de desfazer, rascunhar um ADR (`architecture-decision-records`).

## 4. Revisão em paralelo
Lançar em paralelo, cada um só com o plano (sem código): `architect` (stack e arquitetura), `security-reviewer` (segurança e privacidade, dados, pagamentos, segredos), `a11y-architect` (UI), `database-reviewer` e `db-guard` (modelo de dados e RLS), `tdd-guide` (estratégia de testes), `performance-optimizer` (orçamentos), `seo-specialist` (se for público). Recolher os achados em `docs/plan/09-revisao.md`: cada um **aceite** (e onde se alterou o plano) ou **recusado** (e porquê).

Depois, com a skill `grill-me`, testar as 3 suposições mais arriscadas do plano.

## 5. Portão de aprovação
Apresentar uma página: decisões de stack, âmbito e fora de âmbito, primeira fatia, segurança e testes em resumo, custos recorrentes, riscos, o que ainda é "a confirmar". Pedir aprovação **explícita**. Só com um "aprovo" claro do utilizador:
1. criar `docs/plan/APPROVED.md` com data e a lista dos ficheiros aprovados;
2. escrever os ADRs (`docs/adr/`);
3. preencher `CLAUDE.md` (stack, comandos) e `HANDOFF.md` com a fatia 1 e a verificação de cada passo.
Nunca criar `APPROVED.md` por iniciativa própria nem por um "ok" a outra coisa.

## 6. Depois de aprovado: o mesmo ciclo por fatia
1. Escrever primeiro os testes da fatia (`tdd`), incluindo os casos infelizes de `05-testes-qualidade.md`.
2. Implementar o mínimo que os faz passar.
3. `definition-of-done`: verify, browser a 360 / 768 / 1280 px, advisors, segredos.
4. Revisores do que foi tocado (`code-reviewer`, `security-reviewer`, `database-reviewer`, `react-reviewer`, `silent-failure-hunter`).
5. PR com CI verde; `release` para produção.

**Mudança de âmbito, custo, stack ou modelo de segurança** volta ao plano: atualizar o ficheiro, registar em `docs/plan/CHANGES.md` (data, o quê, porquê, impacto) e pedir nova aprovação.

## Regras
- Planear não é escrever código: nenhum exemplo de código, nenhum scaffold, nenhuma dependência instalada até haver aprovação.
- Um plano que o utilizador não consegue ler em 15 minutos é demasiado longo: cortar. Segurança e testes entram sempre, nem que seja em meia página.
- Sem invenção: sem preços, versões ou prazos de memória; sem clientes, métricas ou referências inventadas.
- Perguntar uma vez, bem, em vez de iterar às cegas.
