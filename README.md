# iPremium Claude kit

Base para começar qualquer projeto com Claude Code: plugin (skills, agentes, hook de segurança), template de projeto
(`CLAUDE.md` + regras + docs + CI) e instalador de skills de terceiros.

## Instalar

**Pelo Claude Code (plugin)**
```
/plugin marketplace add cristianosousaa-dev/ipremium-claude-kit
/plugin install ipremium-kit@ipremium
```

**Pela linha de comandos, tudo de uma vez** (plugin, plugins oficiais, skills de terceiros, regras globais)
```bash
git clone https://github.com/cristianosousaa-dev/ipremium-claude-kit && bash ipremium-claude-kit/install.sh
```

Repo privado: ter `gh auth login` feito. Ao mudar para a organização da empresa, passar o novo `org/repo` ao `install.sh`
e a `extraKnownMarketplaces` em `template/.claude/settings.json`.

## Projeto novo
```bash
bash new-project.sh ../cliente-projeto
```
Abrir o Claude Code na pasta e pedir a skill `new-project`.

## O que há

| Pasta | Conteúdo |
|---|---|
| `plugins/ipremium-kit/` | skills `design`, `new-project`, `definition-of-done`, `release`; agentes `code-reviewer`, `db-guard`, `qa-browser`; hook que bloqueia force push, `reset --hard`, `rm -rf`, SQL destrutivo, `--no-verify` |
| `template/` | `CLAUDE.md` (cabeça, tronco, membros), `.claude/rules/` (arquitetura, segurança, base de dados, interface, testes; só carregam quando se mexe nesses ficheiros), permissões, `.mcp.json`, docs, CI, smoke de produção, dependabot, PR template |
| `user/CLAUDE.md` | regras globais para `~/.claude/CLAUDE.md` |
| `install-skills.sh` | skills de terceiros por disciplina: `base`, `n8n` (conta iPremium), `candidatas` |

## Fontes e critérios

Marketplace, plugins, hooks, regras e memória: documentação oficial do Claude Code
([marketplaces](https://code.claude.com/docs/en/plugin-marketplaces), [plugins](https://code.claude.com/docs/en/plugins-reference),
[memória e `.claude/rules`](https://code.claude.com/docs/en/memory)). Skills: ranking de instalações em
[skills.sh](https://skills.sh/) e listas da comunidade; contagens são ordem de grandeza, não garantia. Skills de terceiros são
código: ler antes de instalar na máquina de trabalho.

Validado com `claude plugin validate` e com uma instalação real do repo privado numa configuração isolada (marketplace, plugin, skills, agentes, hook). Por testar numa máquina limpa: `install.sh` completo e os plugins `security-guidance` e `context7`.
