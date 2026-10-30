---
name: handover
description: Preparar a documentação de entrega de um projeto ao cliente ou a outra pessoa (contas, acessos, como publicar, reverter, recuperar, custos). Usar ao fechar um projeto, antes da publicação final ou quando alguém vai assumir a manutenção.
---

# Entrega e continuidade

Saída: `docs/entrega.md` no repositório, mais atualização de `HANDOFF.md`. Objetivo: alguém competente, que nunca viu o projeto, publica, reverte e recupera sem perguntar a ninguém.

## Conteúdo
1. **O que é e onde vive:** URLs de produção e de teste, repositório, projeto Vercel, projeto Supabase (região), domínio e DNS, Sentry, Resend. Para cada conta: **quem é o titular** (cliente ou iPremium) e onde está o acesso.
2. **Acessos:** onde vivem as credenciais (gestor de passwords, variáveis da Vercel) e quem as pode ver. **Nunca escrever valores de segredos no documento.** Variáveis de ambiente: só os nomes e para que servem.
3. **Arquitetura em uma página:** componentes, fluxo dos dados, integrações externas, decisões difíceis de desfazer (apontar para `docs/adr/`).
4. **Como correr, testar e publicar:** comandos exatos, o CI e o que ele garante.
5. **Como reverter:** Instant Rollback da Vercel, migrações (reversíveis ou não), ramo `backup/`. Testado, não suposto.
6. **Backups e recuperação:** o que é guardado, onde, com que frequência, **e quando foi testado o restauro**. Se não foi testado, escrever "não testado".
7. **Monitorização:** o que alerta, para quem, o que fazer (`docs/runbook-incidentes.md`).
8. **Custos recorrentes:** serviço, plano, valor atual (consultar o fornecedor, não a memória), quem paga.
9. **Manutenção:** o que o contrato inclui, o que se cobra à parte, tempos de resposta combinados.
10. **Limitações conhecidas e pendentes:** o que ficou por fazer ou frágil, com gravidade.
11. **Saída do cliente:** como exportar dados e código, e o que acontece às contas.
12. **Contactos:** responsável técnico, responsável do cliente, suporte dos fornecedores.

## Verificar antes de entregar
- Um comando de cada secção foi corrido de facto (build, rollback numa pré-visualização, restauro numa cópia).
- `scan-secrets` limpo e nenhum `.env` no histórico.
- O cliente consegue, sozinho, entrar em todas as contas de que é titular, com MFA.
- Lista dos itens que **não** foi possível verificar, no fim do documento.
