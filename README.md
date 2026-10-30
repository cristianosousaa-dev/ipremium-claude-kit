# iPremium Claude kit

Base para começar qualquer projeto com Claude Code: plugin (skills, agentes, hook de segurança), template de projeto
(`CLAUDE.md` + regras + docs + CI) e instalador de skills de terceiros.

## Instalar

**Pelo Claude Code (plugin)**
```
/plugin marketplace add cristianosousaa-dev/ipremium-claude-kit
/plugin install ipremium-kit@ipremium   (e ipremium-web, ipremium-design, ipremium-data, ...)
```

**Pela linha de comandos, tudo de uma vez** (plugin, plugins oficiais, skills de terceiros, regras globais)
```bash
git clone https://github.com/cristianosousaa-dev/ipremium-claude-kit && bash ipremium-claude-kit/install.sh
```

Repo privado: ter `gh auth login` feito. Ao mudar para a organização da empresa, passar o novo `org/repo` ao `install.sh`
e a `extraKnownMarketplaces` em `plugins/ipremium-kit/template/.claude/settings.json`.

## Projeto novo
```bash
bash new-project.sh ../cliente-projeto
```
Abrir o Claude Code na pasta e pedir a skill `new-project`.

## O que há

Marketplace com 13 plugins. Cada projeto liga só os que usa (cada skill ligada carrega a descrição no contexto). Por defeito: `kit`, `web`, `design`, `data`.

| Plugin | Skills | Para quê |
|---|---|---|
| `ipremium-kit` (sempre) | 24 | processo iPremium (`new-project`, `definition-of-done`, `release`), agentes `code-reviewer`, `db-guard`, `qa-browser`, hook anti-destruição; planeamento, debugging, TDD, code review, segurança, segredos, ADRs, contexto |
| `ipremium-web` | 25 | Next/React, Tailwind, shadcn, TanStack Query, Zod, SEO e AEO, performance, Playwright |
| `ipremium-design` | 12 | skill `design` (a tua barra de qualidade), a11y, tipografia, microinterações, crítica de UI, UX copy |
| `ipremium-data` | 9 | Supabase, Postgres, migrações, API, backend Node, OpenAPI |
| `ipremium-engineering` | 16 | spec-driven, implementação incremental, hardening, RGPD, STRIDE, arquitetura limpa, DDD, legado |
| `ipremium-ops` | 12 | CI/CD, Docker, observabilidade, runbooks, incidentes, postmortems, deploy checklist |
| `ipremium-product` | 22 | PRD, user stories, discovery, proposta de cliente, specs, documentação técnica |
| `ipremium-growth` | 22 | CRO, analytics, preço, vendas, copy, conteúdo, lançamento |
| `ipremium-integrations` | 11 | Stripe, Resend e react-email, Sentry, Cloudflare, Vercel |
| `ipremium-ai` | 6 | Claude API, MCP, skills, prompts, RAG |
| `ipremium-mobile` | 13 | Expo, React Native, EAS |
| `ipremium-commerce` | 7 | Shopify |
| `ipremium-automation` | 7 | n8n |

Também: `plugins/ipremium-kit/template/` (CLAUDE.md cabeça-tronco-membros, `.claude/rules/`, permissões, CI, runbooks), `user/CLAUDE.md` (global) e `install-skills.sh` (o que a licença não deixa copiar: Trail of Bits, Semgrep, documentos Office da Anthropic, WordPress).

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
