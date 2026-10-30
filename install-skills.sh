#!/usr/bin/env bash
# Skills que NAO vao copiadas para o repo porque a licenca nao o permite ou nao e clara.
# As restantes ja vem dentro dos plugins (ver plugins/*/THIRD_PARTY.md).
# Cada uma e codigo de terceiros: ler o SKILL.md antes de instalar na maquina de trabalho.
# Uso: bash install-skills.sh [seguranca|documentos|wordpress|candidatas]   (sem argumento = seguranca)
set -euo pipefail
add() { npx -y skills add "$1" -g -y </dev/null; }

seguranca() {
  # Trail of Bits (empresa de auditoria de seguranca). Licenca CC BY-SA 4.0: instalar da fonte, nao copiar.
  add trailofbits/skills@differential-review          # revisao de diffs com olhar de atacante
  add trailofbits/skills@sharp-edges                  # APIs e configuracoes que convidam ao erro
  add trailofbits/skills@supply-chain-risk-auditor    # dependencias de risco
  add trailofbits/skills@fp-check                     # filtra falsos positivos
  add trailofbits/skills@variant-analysis             # procura a mesma falha noutros sitios
  # Semgrep: licenca propria (Semgrep Rules License), nao redistribuivel.
  add semgrep/skills@semgrep
}

documentos() {
  # Skills da Anthropic para Word, PDF, PowerPoint e Excel: licenca proprietaria, so instalar da fonte.
  add anthropics/skills@docx
  add anthropics/skills@pdf
  add anthropics/skills@pptx
  add anthropics/skills@xlsx
}

wordpress() {
  # Licenca GPL (WordPress): instalar da fonte, nao copiar para o kit.
  add wordpress/agent-skills@wordpress-router
  add wordpress/agent-skills@wp-block-development
  add wordpress/agent-skills@wp-block-themes
  add wordpress/agent-skills@wp-plugin-development
  add wordpress/agent-skills@wp-rest-api
  add wordpress/agent-skills@wp-performance
  add wordpress/agent-skills@wp-wpcli-and-ops
}

candidatas() {
  # Populares mas NAO ativar por defeito: sao direccao de design e competem com a skill `design`.
  add pbakaus/impeccable@impeccable
  add pbakaus/impeccable@audit
  add leonxlnx/taste-skill@design-taste-frontend
  add vercel-labs/agent-browser@agent-browser
}

"${1:-seguranca}"
