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

## Planeamento obrigatório

Cada projeto criado com `new-project.sh` traz um portão: o hook `plan-gate` não deixa escrever código enquanto não existir `docs/plan/APPROVED.md`. A skill `kickoff` conduz o planeamento (uma ronda de perguntas com respostas recomendadas, plano em 9 ficheiros (inclui segurança e privacidade, e testes e qualidade), revisão por agentes em paralelo, aprovação explícita). Só projetos com o ficheiro `.claude/plan-gate` ficam sujeitos; apagá-lo desliga o portão.

## Guia para a direção

`docs/iPremium_Guia_Direcao_IA.pdf` (14 páginas): método, ferramentas, garantias, escolha do modelo de IA por tipo de projeto e referências de preço. Origem em `docs/guia/` (`node docs/guia/build.mjs` regenera o PDF; logótipos em `docs/guia/logos/`, Simple Icons, CC0).

## Projeto novo
```bash
bash new-project.sh ../cliente-projeto
```
Abrir o Claude Code na pasta e pedir a skill `new-project`.

## O que há

Marketplace com 15 plugins. Cada projeto liga só os que usa (cada skill, agente e comando ligado carrega a descrição no contexto). Por defeito: `kit`, `web`, `design`, `data`, `workflows` (cerca de 11 000 tokens de descrições).

| Plugin | Conteúdo |
|---|---|
| `ipremium-kit` (sempre) | **27 agentes do ECC** (security-reviewer, code-reviewer, database-reviewer, react-reviewer, typescript-reviewer, silent-failure-hunter, a11y-architect, seo-specialist, performance-optimizer, e2e-runner, architect, planner, tdd-guide, build resolvers...), mais `db-guard` e `qa-browser` próprios; 35 skills (processo iPremium, planeamento, debugging, TDD, code review, segurança, segredos, ADRs, contexto); hook anti-destruição |
| `ipremium-workflows` | 31 comandos do ECC: `/plan`, `/feature-dev`, `/code-review`, `/build-fix`, `/security-scan`, `/orch-*`, `/prp-*`, `/pr`, `/checkpoint`... |
| `ipremium-web` | Next/React/Vite, Tailwind, shadcn, TanStack Query, Zod, SEO e AEO, performance, Playwright |
| `ipremium-design` | skill `design`, a11y, tipografia, motion, microinterações, crítica de UI, UX copy |
| `ipremium-data` | Supabase, Postgres, migrações, API, Prisma, Redis, backend Node, OpenAPI |
| `ipremium-languages` | 23 agentes e 28 skills do ECC: Python, FastAPI, Django, Go, Rust, Java/Spring, Kotlin, Swift, PHP/Laravel, Ruby, C#, C++, Flutter, Vue, NestJS |
| `ipremium-engineering` | spec-driven, hardening, RGPD, STRIDE, arquitetura limpa/hexagonal, DDD, legado, council |
| `ipremium-ops` | CI/CD, Docker, Kubernetes, observabilidade, runbooks, incidentes, postmortems, canary, production-audit |
| `ipremium-product` | PRD, user stories, discovery, **proposta** e **handover** próprias, specs, documentação |
| `ipremium-growth` | CRO, analytics, preço, vendas, copy, conteúdo, lançamento |
| `ipremium-integrations` | Stripe, Resend e react-email, Sentry, Cloudflare, Vercel |
| `ipremium-ai` | Claude API, MCP, skills, prompts, RAG, avaliação, custo de LLM |
| `ipremium-mobile` | Expo, React Native, EAS |
| `ipremium-commerce` | Shopify |
| `ipremium-automation` | n8n |

Também: `plugins/ipremium-kit/template/` (CLAUDE.md cabeça-tronco-membros, `.claude/rules/`, permissões, CI, runbooks), `user/CLAUDE.md` (global) e `install-skills.sh` (o que a licença não deixa copiar: Trail of Bits, Semgrep, documentos Office da Anthropic, WordPress).

O ECC (Everything Claude Code, MIT) é a fonte de quase todos os agentes e comandos. Não foram copiados os seus hooks, nem os comandos que dependem dos seus scripts (`/quality-gate`, `/update-docs`, `/project-init`...).

## Poupar contexto

O template manda localizar antes de ler (LSP, `graphify` quando há grafo, Grep preciso), ler só intervalos de linhas e delegar pesquisas largas ao `code-explorer`. O plugin oficial `typescript-lsp` precisa do servidor: `npm i -g typescript typescript-language-server`. Poupança real **não medida**: testar num repo concreto antes de a prometer.

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
