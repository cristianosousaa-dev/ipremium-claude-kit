#!/usr/bin/env bash
# Skills de terceiros do kit iPremium, escolhidas por disciplina.
# Fonte: `npx skills find` (skills.sh), 2026-10-30. Instalacoes = ordem de grandeza, nao garantia de qualidade.
# Cada skill e codigo de terceiros: ler o SKILL.md antes de instalar na maquina de trabalho.
# As skills proprias (design, new-project, definition-of-done, release) vem do plugin ipremium-kit.
# Uso: bash install-skills.sh [base|n8n|candidatas]   (sem argumento = base)
set -euo pipefail
add() { npx -y skills add "$1" -g -y </dev/null; }

base() {
  # Planeamento e arquitetura
  add mattpocock/skills@to-spec                          # brief -> especificacao (745K)
  add mattpocock/skills@codebase-design                  # desenho de modulos e fronteiras (884K)
  add addyosmani/agent-skills@planning-and-task-breakdown # tarefas pequenas com verificacao (67K)
  add affaan-m/ecc@architecture-decision-records         # ADRs (MIT)
  add affaan-m/ecc@api-design
  add affaan-m/ecc@backend-patterns
  add affaan-m/ecc@frontend-patterns
  add affaan-m/ecc@error-handling

  # Code review, debugging, testes
  add mattpocock/skills@code-review                      # (823K)
  add mattpocock/skills@diagnosing-bugs                  # (866K)
  add obra/superpowers@systematic-debugging              # causa raiz antes da correcao (314K)
  add mattpocock/skills@tdd                              # (1,2M)
  add affaan-m/ecc@verification-loop
  add affaan-m/ecc@click-path-audit                      # percorre fluxos de UI a procura de caminhos mortos

  # Seguranca
  add affaan-m/ecc@security-review
  add agamm/claude-code-owasp@owasp-security             # (2,5K: autor pequeno, ler antes)

  # Base de dados (Supabase/Postgres)
  add supabase/agent-skills@supabase                     # oficial (351K)
  add supabase/agent-skills@supabase-postgres-best-practices # oficial (467K)
  add affaan-m/ecc@postgres-patterns
  add affaan-m/ecc@database-migrations

  # Next, React e performance
  add vercel-labs/agent-skills@vercel-react-best-practices # oficial Vercel (855K)
  add affaan-m/ecc@react-performance

  # UI/UX: direccao vem da skill `design` do plugin. Estas sao auditorias, nao estilo.
  add vercel-labs/agent-skills@web-design-guidelines     # checklist de interface e a11y (804K)
  add affaan-m/ecc@frontend-a11y
  add affaan-m/ecc@accessibility

  # Browser e E2E
  add anthropics/skills@webapp-testing                   # oficial Anthropic (193K)
  add currents-dev/playwright-best-practices-skill@playwright-best-practices # (100K)
  add affaan-m/ecc@e2e-testing

  # SEO e visibilidade em IA
  add coreyhaines31/marketingskills@seo-audit            # (242K)
  add coreyhaines31/marketingskills@ai-seo               # AEO/GEO (155K)

  # Entrega e operacao
  add addyosmani/agent-skills@git-workflow-and-versioning # (62K)
  add affaan-m/ecc@deployment-patterns
  add affaan-m/ecc@production-audit

  # Poupar tokens e contexto (as skills dedicadas a "token saving" tem <500 instalacoes: nao entram)
  add affaan-m/ecc@context-budget                        # mede quanto contexto as skills ocupam
  add affaan-m/ecc@strategic-compact                     # quando compactar
  add affaan-m/ecc@search-first                          # procurar antes de escrever
  add affaan-m/ecc@documentation-lookup                  # docs atuais via Context7
}

n8n() {
  # So na conta iPremium, com o MCP do n8n ligado. Do autor do n8n-mcp.
  add czlonkowski/n8n-skills@n8n-workflow-patterns       # (12K)
  add czlonkowski/n8n-skills@n8n-mcp-tools-expert        # (8K)
  add czlonkowski/n8n-skills@n8n-node-configuration
  add czlonkowski/n8n-skills@n8n-validation-expert
  add czlonkowski/n8n-skills@n8n-expression-syntax
  add czlonkowski/n8n-skills@n8n-code-javascript
}

candidatas() {
  # Populares mas NAO ativar por defeito: sao direccao de design e competem com a skill `design`.
  # Testar num projeto de cada vez e comparar.
  add pbakaus/impeccable@impeccable                      # (373K)
  add pbakaus/impeccable@audit                           # (82K) critica de UI
  add leonxlnx/taste-skill@design-taste-frontend         # (704K)
  add vercel-labs/agent-browser@agent-browser            # (1,2M) browser para agentes
}

"${1:-base}"
