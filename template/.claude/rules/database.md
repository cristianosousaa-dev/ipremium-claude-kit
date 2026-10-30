---
paths:
  - "supabase/**"
  - "**/*.sql"
---

# Base de dados (Supabase / Postgres)

- **RLS ligada em todas as tabelas expostas**, políticas por utilizador, negar por defeito. `service_role` nunca no cliente.
- Funções `SECURITY DEFINER` com `search_path` fixo e o mínimo de privilégios.
- Alterações só por ficheiro em `supabase/migrations/`, revistas em PR (agente `db-guard`). Nunca `db reset` nem `db push` contra produção pela shell.
- Cada migração é reversível, ou está marcada "irreversível" com o plano de restauro.
- Depois de DDL: correr os advisors de segurança e de performance (MCP em leitura) e resolver os avisos novos.
- Índices em colunas usadas em filtros, junções e políticas.
- Invariantes na base de dados (constraints, triggers, `check`), não só na aplicação.
- `docs/SCHEMA.md` atualizado na mesma PR que a migração.
- Testar RLS como o utilizador errado: ler, escrever e apagar linhas de outro deve falhar.
- Escrita com `.select()` quando importa saber se aconteceu: UPDATE com 0 linhas afetadas não dá erro.
