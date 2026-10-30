---
name: proposal
description: Redigir uma proposta técnica e comercial para um cliente da iPremium (site, app, automação, solução de IA) a partir de um brief, notas de reunião ou pedido do cliente. Usar quando se fala em proposta, orçamento, âmbito, estimativa ou "o cliente pediu".
---

# Proposta iPremium

Entrada: brief, transcrição, e-mail ou notas. Saída: `docs/propostas/AAAA-MM-<cliente>.md` (PT-PT formal), pronta para a direção rever. Quem aprova preço e âmbito é a direção; a proposta nunca os fixa sozinha.

## Antes de escrever
1. Resumir em 5 linhas o que o cliente pediu, nas palavras dele, e **o problema de negócio** por trás. Se não é claro, listar as perguntas em falta e parar: não preencher lacunas com suposições.
2. Verificar o que já existe (site atual, sistemas, dados, contas, domínio) antes de propor construir de raiz.

## Estrutura
1. **Contexto e objetivo**: o problema e a métrica de sucesso que o cliente reconhece.
2. **Âmbito**: o que está incluído e, com igual peso, **o que não está**.
3. **Entregáveis e critérios de aceitação**: objetivos, testáveis. "Formulário envia e o cliente recebe e-mail em menos de 1 minuto", não "formulário a funcionar".
4. **Solução e stack**: a referência (Next, Supabase, Vercel, Cloudflare, Sentry, Resend) e desvios justificados.
5. **Método**: as 4 fases (planeamento técnico, desenvolvimento controlado, testes e aprovação, publicação e acompanhamento) e o que o cliente tem de fazer em cada uma.
6. **Premissas e dependências do cliente**: conteúdos, acessos, decisores, prazos de resposta.
7. **Riscos** (3 a 5) com mitigação.
8. **Cronograma** em fases e esforço, não em promessas de data. Dar intervalo e o nível de confiança.
9. **Os 3 custos, separados**: implementação (única); serviços recorrentes (alojamento, base de dados, domínios, e-mail, IA, monitorização); manutenção (correções, atualizações, suporte, evolução contratada). Quem suporta cada um e como é faturado.
10. **Propriedade**: quem detém o código, os domínios e as contas; condições de saída do cliente.
11. **Alterações de âmbito**: avaliadas e aprovadas antes de executar.
12. **Dados pessoais**: se houver, indicar subcontratantes, região dos dados e a necessidade de acordo de tratamento (RGPD). A decisão jurídica é humana.

## Regras
- **Nada inventado:** sem preços de fornecedores de memória (consultar o plano atual de cada um), sem clientes, referências ou números de mercado.
- **Preços e margens:** deixar `<a definir pela direção>`. Dar o esforço e os custos recorrentes reais; a margem não é decisão desta skill.
- Estimativas com intervalo, confiança e desconhecidos explícitos. Um número sem incerteza declarada é pior que nenhum.
- Linguagem do cliente: sem jargão não explicado, sem promessas de resultados que dependem dele.
- Terminar com a lista "decisões necessárias antes de enviar", cada uma com o seu dono.
