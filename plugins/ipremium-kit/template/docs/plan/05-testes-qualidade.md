# 05 Testes e qualidade

- **Pirâmide:** <unitários (lógica), integração (dados e RLS), E2E (fluxos críticos); quantos e onde>
- **Fluxos críticos para E2E:** <lista; cada um com o caso feliz e o infeliz>
- **Casos infelizes obrigatórios:** <utilizador errado, entrada inválida, duplicado, dependência em falha, repetição de webhook, fuso horário>
- **Testes de RLS:** <um caso por política, como o utilizador errado>
- **Acessibilidade:** <WCAG 2.2 AA; teclado; verificação automática e manual>
- **Orçamentos de desempenho:** LCP até 2,5 s, INP até 200 ms, CLS até 0,1, Lighthouse 90 ou mais
- **Dados de teste e fixtures:** <como se criam, como se limpam, nunca dados reais>
- **Portões no CI:** secret scan, audit, lint, typecheck, testes, build, e2e de fumo; smoke de produção
- **Verificação visual:** 360 / 768 / 1280 px, claro e escuro, consola limpa
- **Definição de pronto:** skill definition-of-done
