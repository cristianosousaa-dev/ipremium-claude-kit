---
name: new-project
description: Arrancar um projeto novo da iPremium a partir do template. Usar quando o utilizador pede um site, app ou automacao novos para um cliente, ou diz "novo projeto".
---

# Novo projeto iPremium

1. **Perguntar so o que falta** (uma mensagem): cliente, o que e, publico, tom, prazo, dados pessoais ou dinheiro envolvidos?
2. **Copiar o template** que vem dentro deste plugin: `TPL=$(find "$HOME/.claude/plugins" -type d -path "*ipremium-kit*/template" | head -1)` e `cp -R "$TPL/." <pasta-do-projeto>` (ou `bash new-project.sh <pasta>` no clone do repo `ipremium-claude-kit`). Substituir os marcadores `<...>` (nome, ORG do GitHub, PROJECT_REF).
3. **Preencher `PRODUCT.md`** (negocio, publico, tom) e `CLAUDE.md` (stack, comandos). So fatos verificados; o que nao se sabe fica como pergunta.
4. **`package.json`**: garantir os scripts `lint`, `typecheck`, `test`, `build` e `verify` (`npm run lint && npm run typecheck && npm test && npm run build`).
5. **Contas do cliente** (checklist, o humano cria): repo na organizacao GitHub da empresa, projeto Vercel, projeto Supabase (regiao UE), dominio no Cloudflare, Sentry, Resend. MFA em todos. Segredos so em variaveis de ambiente da Vercel e no gestor de passwords, nunca no repo nem no chat.
6. **ADRs** das decisoes dificeis de desfazer saem do `kickoff` (copiar `docs/adr/0000-template.md`).
7. **Primeiro commit** num ramo, PR, CI verde. Protecao do ramo `main` no GitHub.
8. Se houver dados pessoais ou dinheiro: criar `docs/modelo-ameacas.md` antes de escrever funcionalidades.


**Passo final obrigatório:** correr a skill `kickoff`. O template traz `.claude/plan-gate`, por isso o hook bloqueia código até haver `docs/plan/APPROVED.md`. Não instalar dependências nem criar ficheiros de código antes disso.
