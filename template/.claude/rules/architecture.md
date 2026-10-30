---
paths:
  - "src/**"
  - "app/**"
---

# Arquitetura

- Rotas e handlers finos: validam, chamam o domínio, devolvem. A lógica vive em módulos sem dependência do framework.
- Pastas por funcionalidade (`features/<nome>/`), não por tipo técnico. Sem importações circulares.
- Antes de criar abstração: regra dos três usos. Um pouco de duplicação é melhor que a abstração errada.
- Antes de adicionar dependência: stdlib, funcionalidade nativa da plataforma, dependência já instalada. Só depois uma nova, com justificação.
- Env validado no arranque com schema; falhar cedo. Sem números mágicos.
- Cada integração externa (pagamentos, email, IA) fica atrás de um módulo único, com tempo limite, repetição segura (idempotência) e erro tratado.
- Tipos gerados da base de dados (`supabase gen types`), nunca copiados à mão. Sem `any` sem comentário. Sem `@ts-ignore` sem motivo.
- Estados em toda a interface de dados: carregamento, vazio, erro, sucesso.
