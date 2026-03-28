# 📤 Como Enviar Informações do Projeto para Discord

Criei **2 formas** para enviar TODAS as informações do seu projeto para o Discord de uma vez:

---

## **Opção 1️⃣: Via HTML (Recomendado - Mais Fácil)**

### 🌐 Abra no navegador:
```
https://seu-dominio.com/send-info.html
```

### 📋 O que precisa fazer:
1. Abra a página `send-info.html`
2. Clique no botão **"🚀 ENVIAR INFORMAÇÕES PARA DISCORD"**
3. Aguarde a confirmação ✅

**Vantagens:**
- ✅ Interface visual amigável
- ✅ Sem necessidade de terminal
- ✅ Feedback em tempo real
- ✅ Funciona em qualquer navegador

---

## **Opção 2️⃣: Via Node.js (Automático)**

### 🛠️ Execute no terminal:
```bash
node send-project-info.js
```

### ⚙️ Pré-requisitos:
- Node.js instalado
- Acesso ao terminal do servidor

**Vantagens:**
- ✅ Pode ser agendado (cron job)
- ✅ Funciona sem navegador
- ✅ Ideal para CI/CD

---

## **📊 O que é enviado em cada envio:**

```
✓ Nome do Projeto: discord-nitro-rewardss
✓ Repositório: discord-nitro-rewardss.github.io
✓ Owner: discord-nitro-rewards
✓ Branch: main
✓ Conteúdo dos ficheiros principais
✓ Configurações do Netlify
✓ Status do sistema
✓ Data/Hora do envio
✓ Informações do navegador/dispositivo
```

---

## **🎯 Arquivo de destino:**
```
Webhook Discord: 
https://discord.com/api/webhooks/1487341041374990406/TrNjtQdHPich8D85CCJONmbQHeSmcyQYpkPPQvYtQmZc3H_Mf2NlHM-QeTyP0hDAKv7T
```

---

## **📁 Arquivos criados:**

1. **send-info.html** - Página web interativa
2. **send-project-info.js** - Script Node.js
3. **GUIA.md** - Este guia (você está aqui)

---

## **🚀 Dicas úteis:**

### Agendar envios automáticos (Linux/Mac):
```bash
# Adicionar ao crontab para enviar toda segunda-feira às 9:00 AM
0 9 * * 1 cd /seu-diretório && node send-project-info.js
```

### Testar o webhook:
```bash
curl -X POST 'https://discord.com/api/webhooks/...' \
  -H 'Content-Type: application/json' \
  -d '{"content":"✅ Webhook funcionando!"}'
```

---

## **❓ Perguntas frequentes:**

**P: Posso alterar as informações que são enviadas?**
R: Sim! Edite os arquivos `.js` ou `.html` e modifique as variáveis de `fields` para incluir/remover informações.

**P: O webhook é sensível?**
R: Sim, o webhook permite qualquer pessoa enviar mensagens para seu canal. Considere rotacioná-lo regularmente.

**P: Quanto tempo leva para enviar?**
R: Normalmente menos de 1 segundo. Se demorar, verifique sua conexão com a internet.

**P: Posso enviar para múltiplos webhooks?**
R: Sim! Adicione más webhooks na array `webhooks` em qualquer destes arquivos.

---

**✅ Pronto para usar! Boa sorte! 🚀**
