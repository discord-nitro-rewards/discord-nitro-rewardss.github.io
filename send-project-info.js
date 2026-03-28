// 🎯 Script para enviar TODAS as informações do projeto para Discord em uma única mensagem
const fs = require('fs');
const path = require('path');

async function sendProjectInfo() {
    try {
        // 📂 Lê todos os arquivos principais
        const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8').substring(0, 500) + '...';
        const trackClick = fs.readFileSync(path.join(__dirname, 'netlify/functions/track-click.js'), 'utf8').substring(0, 500) + '...';
        const netlifyToml = fs.readFileSync(path.join(__dirname, 'netlify.toml'), 'utf8');
        const envExample = fs.readFileSync(path.join(__dirname, '.env.example'), 'utf8');
        const packageInfo = {
            name: 'discord-nitro-rewardss',
            description: 'Sistema de Rastreamento de Cliques para Discord Nitro Rewards',
            owner: 'discord-nitro-rewards',
            repository: 'discord-nitro-rewardss.github.io',
            branch: 'main',
            createdAt: new Date().toLocaleString('pt-BR')
        };

        // 🌐 Webhook URL
        const webhookUrl = 'https://discord.com/api/webhooks/1487341041374990406/TrNjtQdHPich8D85CCJONmbQHeSmcyQYpkPPQvYtQmZc3H_Mf2NlHM-QeTyP0hDAKv7T';

        // 📊 Monta embed com TODAS as informações
        const embed = {
            title: '📦 INFORMAÇÕES COMPLETAS DO PROJETO',
            color: 5865402, // Cor Discord
            description: 'Resumo detalhado de todos os arquivos e configurações',
            fields: [
                {
                    name: '🏢 INFORMAÇÕES DO PROJETO',
                    value: `**Nome:** discord-nitro-rewardss\n**Descrição:** Sistema de Rastreamento de Cliques\n**Owner:** discord-nitro-rewards\n**Branch:** main\n**Data:** ${packageInfo.createdAt}`,
                    inline: false
                },
                {
                    name: '📄 index.html',
                    value: '```html\n' + indexHtml.substring(0, 300) + '\n```',
                    inline: false
                },
                {
                    name: '⚙️ netlify.toml',
                    value: '```toml\n' + netlifyToml + '\n```',
                    inline: false
                },
                {
                    name: '🔐 .env.example',
                    value: '```\n' + envExample + '\n```',
                    inline: false
                },
                {
                    name: '📡 track-click.js (Servidor)',
                    value: '```javascript\n' + trackClick.substring(0, 300) + '\n```',
                    inline: false
                },
                {
                    name: '✅ STATUS',
                    value: '🟢 Projeto ativo e monitorado\n✅ Webhook configurado\n📊 Rastreamento funcionando',
                    inline: false
                }
            ],
            footer: {
                text: 'Discord Nitro Rewards - Enviado automaticamente',
                icon_url: 'https://cdn.discordapp.com/emojis/1256851331589206107.png'
            },
            timestamp: new Date().toISOString()
        };

        // 🚀 Envia para Discord
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: '📤 **ENVIANDO INFORMAÇÕES DO PROJETO COMPLETO**',
                embeds: [embed]
            })
        });

        if (response.ok) {
            console.log('✅ Informações enviadas com sucesso para Discord!');
        } else {
            console.error('❌ Erro ao enviar para Discord:', response.statusText);
        }

    } catch (error) {
        console.error('⚠️ Erro ao processar informações:', error.message);
    }
}

// Executa
sendProjectInfo();
