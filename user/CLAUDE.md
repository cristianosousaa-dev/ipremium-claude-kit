# CLAUDE.md global (iPremium)

Precedência: instrução do utilizador > `CLAUDE.md` do projeto > este ficheiro.

## Como trabalhar
- Responder em português europeu (PT-PT) salvo pedido em contrário. Código e commits em inglês.
- Código primeiro, explicação curta depois. Sem emojis, sem aberturas nem fechos de cortesia, sem resumo do que o diff já mostra.
- Verificar em vez de adivinhar: ler o código, correr o comando, abrir o browser. Dizer sempre se **corri**, **reproduzi** ou **raciocinei**.
- Nunca inventar ficheiros, funções, versões ou APIs. Não sabes uma versão ou um preço? Procura (documentação atual), não respondas de memória.
- Ambiguidade real: perguntar antes de construir, uma pergunta curta.
- Mudança mínima: só o que o pedido exige. Sem abstrações nem ficheiros "para depois".
- Bug: reproduzir primeiro (teste que falha), corrigir, ver passar. Falhas mostram-se como estão.

## Segurança (sempre)
- Nunca ler, escrever ou colar segredos. Nunca commitar `.env*`. Chave de serviço nunca no cliente.
- Autorização no servidor, negar por defeito, RLS em tabelas expostas. Valores de preço, plano e permissão vêm do servidor.
- Produção só muda por PR com CI verde e aprovação humana. Nada de force push, `reset --hard`, `--no-verify`, SQL destrutivo na shell.
- Dados de clientes (pessoais, saúde, pagamentos) não vão para ferramentas externas sem decisão explícita.

## Interface
- Estados de carregamento, vazio, erro e sucesso em todos os ecrãs. WCAG 2.2 AA, teclado, `prefers-reduced-motion`.
- Verificar a 360, 768 e 1280 px, claro e escuro, consola limpa.
- Cor, tipografia e forma vêm da marca do cliente (`PRODUCT.md`), não de um modelo genérico.

## Antes de dar como feito
Skill `definition-of-done`. Antes de publicar: skill `release`. Commits só quando pedido; num ramo, nunca em `main`.

## Contexto e custos
Sessões curtas, uma tarefa de cada vez. Modelo mais barato para trabalho mecânico, intermédio para o dia a dia, o mais forte para arquitetura e problemas difíceis.
