exports.handler = async (event) => {
    // Apenas POST é permitido
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Método não permitido' })
        };
    }

    try {
        const webhookUrl = process.env.DISCORD_WEBHOOK;
        
        if (!webhookUrl) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Webhook não configurado no servidor' })
            };
        }

        const data = JSON.parse(event.body);
        const now = new Date();
        const timeString = now.toLocaleString('pt-BR');

        // 🚀 Monta o embed completo com info do projeto
        const embed = {
            title: '✅ INFORMAÇÕES COMPLETAS DO PROJETO',
            color: 5865402,
            description: '📦 Resumo detalhado de todos os arquivos e configurações',
            fields: [
                {
                    name: '🏢 DADOS DO PROJETO',
                    value: `**Nome:** ${data.projectName}\n**Repositório:** ${data.repository}\n**Owner:** ${data.owner}\n**Branch:** ${data.branch}\n**Criado em:** ${timeString}`,
                    inline: false
                },
                {
                    name: '📂 ESTRUTURA DE ARQUIVOS',
                    value: data.fileInfo || 'Informações dos arquivos não disponíveis',
                    inline: false
                },
                {
                    name: '🌐 INFORMAÇÕES DO NAVEGADOR',
                    value: `**Navegador:** ${data.userAgent || 'Desconhecido'}\n**Linguagem:** ${data.language || 'Desconhecida'}\n**Plataforma:** ${data.platform || 'Desconhecida'}`,
                    inline: false
                },
                {
                    name: '✨ FUNCIONALIDADES',
                    value: '🎯 Rastreamento de cliques em tempo real\n📊 Webhook do Discord integrado\n📱 Responsivo (Mobile, Tablet, Desktop)\n⚡ Serverless com Netlify\n🔐 Variáveis de ambiente seguras',
                    inline: false
                },
                {
                    name: '📈 STATUS',
                    value: '🟢 Projeto Ativo\n✅ Webhook Configurado\n✅ Rastreamento Funcionando\n✅ Build Pronto\n✅ Deploy Ativo',
                    inline: false
                }
            ],
            footer: {
                text: '🤖 Enviado automaticamente'
            },
            timestamp: new Date().toISOString()
        };

        // 📤 Envia para Discord
        const discordResponse = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: '🎉 **INFORMAÇÕES DO PROJETO DISCORD NITRO REWARDS**',
                embeds: [embed]
            })
        });

        if (!discordResponse.ok) {
            console.error('Erro ao enviar para Discord:', discordResponse.statusText);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Erro ao enviar para Discord: ' + discordResponse.statusText })
            };
        }

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                success: true, 
                message: '✅ Informações enviadas com sucesso para o Discord!' 
            })
        };

    } catch (error) {
        console.error('Erro:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Erro ao processar requisição: ' + error.message })
        };
    }
};
