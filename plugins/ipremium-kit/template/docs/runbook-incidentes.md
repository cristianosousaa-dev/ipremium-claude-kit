# Runbook de incidentes

## Gravidade
| Nível | Exemplos | Resposta |
|---|---|---|
| S1 crítico | Site em baixo; dados de um cliente visíveis a outro; pagamento errado | Agir já. Reverter primeiro, diagnosticar depois. Avisar o cliente em até 1 h |
| S2 grave | Emails ou notificações não saem; uma área falha; tarefa automática parada | Corrigir no mesmo dia |
| S3 menor | Erro visual, texto errado | Próxima publicação |

## Primeiros 15 minutos
1. Confirmar com os próprios olhos (site, Sentry, logs da Vercel e do Supabase).
2. Conter: reverter o deploy (Vercel, Deployments, anterior em READY, Instant Rollback) ou desligar o interruptor da funcionalidade.
3. Registar com hora o que se viu e o que se fez.

## Reverter
| O quê | Como |
|---|---|
| Código | Vercel Instant Rollback; ramo `backup/main-<sha>-before-<tema>` |
| Migração | <passo de reversão ou "irreversível, restaurar backup de AAAA-MM-DD"> |
| Segredo exposto | Rodar a chave no fornecedor, atualizar na Vercel, redeploy |

## Contactos
Dono do projeto: <nome, telefone>. Cliente: <nome, canal>. Fornecedores: <links de estado>.
