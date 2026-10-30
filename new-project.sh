#!/usr/bin/env bash
# Cria um projeto novo a partir do template (cabeca, tronco e membros).
# Uso: bash new-project.sh ../cliente-projeto
set -euo pipefail
DEST="${1:?uso: new-project.sh <pasta-destino>}"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ -e "$DEST" ] && [ -n "$(ls -A "$DEST" 2>/dev/null)" ]; then
  echo "Recusado: $DEST ja existe e nao esta vazio."; exit 1
fi
mkdir -p "$DEST"
cp -R "$HERE/plugins/ipremium-kit/template/." "$DEST/"
git -C "$DEST" init -q -b main
echo "Projeto criado em $DEST."
echo "Proximo passo: abrir o Claude Code la dentro e pedir a skill new-project (preenche CLAUDE.md, PRODUCT.md e ADR 0001)."
grep -rn --include='*' -l '<[A-Za-z_]*>' "$DEST" 2>/dev/null | sed "s|$DEST/||" | grep -v '^\.git/' | head -20 | sed 's/^/  marcadores por preencher: /'
