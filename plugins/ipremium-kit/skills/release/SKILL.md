---
name: release
description: Preparar e verificar uma publicacao em producao (deploy). Usar antes de promover para producao ou quando o utilizador diz "publicar", "deploy" ou "release".
---

# Release

Producao muda-se por PR e CI verde. O Claude nunca promove sem o OK explicito do humano nessa mensagem.

1. **Pre-deploy:** CI verde no commit exato; migracoes pendentes listadas e revistas; variaveis de ambiente novas existem na Vercel; `HANDOFF.md` atualizado.
2. **Rollback escrito antes de publicar:** deploy anterior na Vercel (Instant Rollback), ramo `backup/main-<sha>-before-<tema>` criado, e para migracoes o passo de reversao ou a nota "irreversivel".
3. **Publicar** (humano confirma): merge do PR; esperar o deploy ficar READY.
4. **Smoke:** as URLs criticas respondem com o esperado (copiar `smoke.yml` do template); erros novos no Sentry; logs da Vercel sem 5xx.
5. **Reportar:** commit publicado, estado do CI, resultado do smoke, e o que ficou por verificar. Se o smoke falha: reverter primeiro, diagnosticar depois.
