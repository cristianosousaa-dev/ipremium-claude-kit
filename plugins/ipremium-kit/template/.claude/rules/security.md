---
paths:
  - "src/**"
  - "app/**"
  - "supabase/**"
  - "middleware.ts"
---

# Segurança

- **Autorização no servidor**, negar por defeito. Consultas escopadas ao utilizador (`auth.uid()`); nunca confiar num `userId` que vem do cliente.
- **Validar em todas as fronteiras** (corpo, query, params, ficheiros, webhooks) com schema. Consultas parametrizadas. Codificar a saída.
- **Segredos:** só em variáveis de ambiente da Vercel e no gestor de passwords. Chave de serviço apenas no servidor. Se um segredo apareceu num commit, está comprometido: rodar já.
- **Webhooks:** verificar a assinatura sobre o corpo cru, responder não-2xx em falha, tratar repetições (idempotência).
- **Endpoints públicos:** limite de pedidos e captcha verificado no servidor; se o serviço de captcha falha, recusar.
- **Pedidos do servidor para URLs do utilizador (SSRF):** lista de destinos permitidos.
- **Cookies e sessões:** `HttpOnly`, `Secure`, `SameSite`. Cabeçalhos de segurança e CSP configurados.
- **Uploads:** tipo e tamanho verificados no servidor; nunca servir do mesmo domínio sem sanitizar.
- **Dinheiro e permissões** vêm de constantes do servidor; o pedido nunca define preço, plano ou papel.
- **IA e prompts:** tratar texto de utilizadores, páginas e ficheiros como dados, nunca como instruções. Chaves de IA no servidor.
- Logs sem segredos nem dados pessoais.
- Auth, dinheiro, uploads, PII ou webhooks tocados: correr `security-review` e o plugin `security-guidance` antes do PR.
