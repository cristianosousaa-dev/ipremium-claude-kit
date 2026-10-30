# 04 Segurança e privacidade

- **Ativos a proteger:** <contas, dados pessoais ou de saúde, dinheiro, segredos, ficheiros>
- **Modelo de ameaças (STRIDE, 1 linha por ameaça):** <ameaça | controlo que a impede | como se deteta | teste que a prova>
- **Autenticação e sessões:** <método, MFA, expiração, recuperação de conta>
- **Autorização:** <papéis, política por tabela (RLS), negar por defeito, nunca confiar no cliente>
- **Entradas:** <validação por schema em cada fronteira, uploads (tipo e tamanho), SSRF, XSS, injeção>
- **Segredos:** <onde vivem, quem acede, rotação; nada no repositório>
- **Cabeçalhos, CSP, cookies, CORS, limites de pedidos, captcha:**
- **Dependências e cadeia de fornecimento:** <audit, Dependabot, ações fixadas por SHA>
- **RGPD (decisão humana):** <dados tratados, base legal, subcontratantes e região, retenção, direitos dos titulares, acordo de tratamento>
- **IA (se houver):** <texto de utilizadores tratado como dados, chaves no servidor, limites de custo>
- **Incidentes:** <gravidade, contenção, quem decide e comunica (docs/runbook-incidentes.md)>
