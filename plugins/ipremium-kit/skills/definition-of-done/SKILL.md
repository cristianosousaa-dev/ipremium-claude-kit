---
name: definition-of-done
description: Verificar se uma alteracao esta realmente pronta antes de a dar como feita ou abrir PR. Usar ao terminar uma funcionalidade ou correcao.
---

# Definition of done

Correr e mostrar o resultado (nao assumir). Dizer em cada linha se foi **corrido**, **reproduzido** ou apenas **raciocinado**.

- [ ] `npm run verify` (lint, typecheck, testes, build) passa.
- [ ] Correcao de bug: o teste falhou antes e passa depois.
- [ ] Logica nova (ramo, ciclo, dinheiro, seguranca) deixa pelo menos uma verificacao executavel.
- [ ] Interface: vista no browser a 360, 768 e 1280 px, claro e escuro; consola sem erros; navegavel so com teclado; estados de carregamento, vazio e erro.
- [ ] Base de dados: migracao nova revista (agente `db-guard`), advisors do Supabase sem avisos novos, RLS testada como o utilizador errado.
- [ ] Escritas e chamadas externas: o erro e verificado (bibliotecas que devolvem `{ error }` em vez de lancar; UPDATE que afeta 0 linhas nao e erro).
- [ ] Nenhum segredo no diff. Nada alem do pedido no diff.
- [ ] `HANDOFF.md` atualizado (estado atual, curto) e um ADR se houve decisao dificil de desfazer.

Se algo falha, mostrar a falha tal como esta. Nao declarar concluido.
