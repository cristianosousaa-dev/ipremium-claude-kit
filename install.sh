#!/usr/bin/env bash
# Instala o kit iPremium numa maquina nova (Mac ou Linux; no Windows usar Git Bash).
# Requer: Claude Code (`claude`), Node (`npx`) e acesso ao repo privado (gh auth login).
# Uso: bash install.sh [org/repo] [packs...]      ex.: bash install.sh cristianosousaa-dev/ipremium-claude-kit web data
# Por defeito instala: kit web design data workflows. Opcionais: languages engineering ops product growth ai mobile commerce integrations automation.
set -euo pipefail

REPO="${1:-cristianosousaa-dev/ipremium-claude-kit}"; shift || true
PACKS=("$@"); [ ${#PACKS[@]} -eq 0 ] && PACKS=(kit web design data workflows)
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

command -v claude >/dev/null || { echo "claude nao encontrado: instalar o Claude Code primeiro."; exit 1; }

echo "1/4  Marketplace iPremium"
claude plugin marketplace add "$REPO"

echo "2/4  Packs: ${PACKS[*]}"
for p in "${PACKS[@]}"; do claude plugin install "ipremium-$p@ipremium"; done

echo "3/4  Plugins oficiais e de comunidade"
# Plugins do diretorio oficial (marketplace embutido). Testado: instalam-se pelo nome simples.
for p in security-guidance context7 typescript-lsp; do
  claude plugin install "$p" || echo "AVISO: $p nao instalou (confirmar o nome com /plugin)"
done

echo "4/4  Regras globais"
if [ -f "$HOME/.claude/CLAUDE.md" ]; then
  echo "~/.claude/CLAUDE.md ja existe: nao foi alterado. Comparar com user/CLAUDE.md."
else
  mkdir -p "$HOME/.claude" && cp "$HERE/user/CLAUDE.md" "$HOME/.claude/CLAUDE.md"
  echo "Copiado user/CLAUDE.md para ~/.claude/CLAUDE.md"
fi

echo "Navegacao de codigo (LSP): instalar o servidor com  npm i -g typescript typescript-language-server"
echo "Feito. Seguranca extra (Trail of Bits, Semgrep): bash $HERE/install-skills.sh"
echo "Novo projeto: bash $HERE/new-project.sh ../nome-do-projeto"
