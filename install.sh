#!/usr/bin/env bash
# Instala o kit iPremium numa maquina nova (Mac ou Linux; no Windows usar Git Bash).
# Requer: Claude Code (`claude`), Node (`npx`) e acesso ao repo privado (gh auth login).
# Uso: bash install.sh [org/repo]
set -euo pipefail

REPO="${1:-cristianosousaa-dev/ipremium-claude-kit}"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

command -v claude >/dev/null || { echo "claude nao encontrado: instalar o Claude Code primeiro."; exit 1; }

echo "1/4  Plugin iPremium (skills, agentes, hook de seguranca)"
claude plugin marketplace add "$REPO"
claude plugin install ipremium-kit@ipremium

echo "2/4  Plugins oficiais e de comunidade"
# Nomes e marketplaces vem das fontes citadas no README; se algum falhar, instalar a mao com /plugin.
for p in security-guidance@claude-plugins-official context7@claude-plugins-official; do
  claude plugin install "$p" || echo "AVISO: $p nao instalou (confirmar o nome com /plugin)"
done

echo "3/4  Skills de terceiros (grupo base)"
bash "$HERE/install-skills.sh" base

echo "4/4  Regras globais"
if [ -f "$HOME/.claude/CLAUDE.md" ]; then
  echo "~/.claude/CLAUDE.md ja existe: nao foi alterado. Comparar com user/CLAUDE.md."
else
  mkdir -p "$HOME/.claude" && cp "$HERE/user/CLAUDE.md" "$HOME/.claude/CLAUDE.md"
  echo "Copiado user/CLAUDE.md para ~/.claude/CLAUDE.md"
fi

echo "Feito. Novo projeto: bash $HERE/new-project.sh ../nome-do-projeto"
