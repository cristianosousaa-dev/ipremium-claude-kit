# iPremium Claude kit

Base para começar qualquer projeto com Claude Code: plugin (skills, agentes, hook de segurança), template de projeto
(`CLAUDE.md` + regras + docs + CI) e instalador de skills de terceiros.

## Instalar

**Pelo Claude Code (plugin)**
```
/plugin marketplace add cristianosousaa-dev/ipremium-claude-kit
/plugin install ipremium-kit@ipremium   (e ipremium-web, ipremium-data, ...)
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

Marketplace com 5 plugins (cada projeto liga só os que usa; cada skill carrega a sua descrição no contexto):

| Plugin | Quando | Conteúdo |
|---|---|---|
| `ipremium-kit` | sempre | processo iPremium (`new-project`, `definition-of-done`, `release`), agentes `code-reviewer`, `db-guard`, `qa-browser`, hook que bloqueia force push, `reset --hard`, `rm -rf`, SQL destrutivo e `--no-verify`; planeamento, debugging, TDD, code review, segurança, segredos, ADRs, contexto |
| `ipremium-web` | sites e apps | skill `design`, Next/React, Tailwind, shadcn, a11y, SEO/AEO, performance, Playwright |
| `ipremium-data` | com base de dados | Supabase, Postgres, migrações, desenho de API |
| `ipremium-integrations` | quando usa | Stripe, Resend e react-email, Sentry, Cloudflare, Vercel |
| `ipremium-automation` | conta iPremium | n8n |

Também: `template/` (CLAUDE.md cabeça-tronco-membros, `.claude/rules/`, permissões, CI, runbooks), `user/CLAUDE.md` (global), `install-skills.sh` (segurança extra de licença restritiva: Trail of Bits, Semgrep).

## Skills de terceiros

As skills copiadas para os packs vêm de repositórios com licença permissiva (MIT, Apache-2.0), fixadas num commit (`skills.lock.json`). Origem, commit e licença de cada uma: `plugins/*/THIRD_PARTY.md` e `plugins/*/licenses/`.
Atualizar ou acrescentar: editar `skills.manifest.json`, depois `node scripts/vendor.mjs check` e `node scripts/vendor.mjs vendor` (`--update` para avançar os commits). Uma skill sem licença clara é recusada.
Código de terceiros: rever o diff de cada atualização antes de fazer commit.

## Fontes e critérios

Marketplace, plugins, hooks, regras e memória: documentação oficial do Claude Code
([marketplaces](https://code.claude.com/docs/en/plugin-marketplaces), [plugins](https://code.claude.com/docs/en/plugins-reference),
[memória e `.claude/rules`](https://code.claude.com/docs/en/memory)). Skills: ranking de instalações em
[skills.sh](https://skills.sh/) e listas da comunidade; contagens são ordem de grandeza, não garantia. Skills de terceiros são
código: ler antes de instalar na máquina de trabalho.

Validado com `claude plugin validate` e com uma instalação real do repo privado numa configuração isolada (marketplace, plugin, skills, agentes, hook). Por testar numa máquina limpa: `install.sh` completo e os plugins `security-guidance` e `context7`.
