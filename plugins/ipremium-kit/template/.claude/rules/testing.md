---
paths:
  - "**/*.test.*"
  - "**/*.spec.*"
  - "e2e/**"
  - "supabase/tests/**"
---

# Testes

- Correção de bug: primeiro um teste que falha, depois a correção, depois ver passar.
- Lógica nova (ramo, ciclo, parser, dinheiro, segurança) deixa pelo menos uma verificação executável.
- Cobrir o caminho infeliz: utilizador errado, entrada inválida, duplicado, dependência em falha, repetição de webhook, fuso horário e meia-noite.
- Um teste que passa sempre não prova nada. Saber dizer em que caso falharia. Verificar que o teste executou (sem `skip` silencioso) e que estava vermelho antes.
- Testes que dependem de estado partilhado fixam esse estado no início da corrida.
- E2E (Playwright): percorrem fluxos reais; esperas por condição, nunca por tempo fixo.
- Testes de RLS em SQL em `supabase/tests/`: um caso por política, como utilizador errado.
- Se o CI não correu um teste, o resumo da execução diz-o por palavras; um visto verde que "não olhou" é mentira.
