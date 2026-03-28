exports.handler = async (event) => {
    // Valida se é POST
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
                body: JSON.stringify({ error: 'Webhook não configurado' })
            };
        }

        const data = JSON.parse(event.body);
        const now = new Date();
        const timeString = now.toLocaleString('pt-BR');

        // Envia mensagem ao Discord
        const discordResponse = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                embeds: [{
                    title: '🎯 Novo Clique Registrado!',
                    color: 5865402, // Cor do Discord
                    fields: [
                        {
                            name: '⏰ Data/Hora',
                            value: timeString,
                            inline: true
                        },
                        {
                            name: '🌐 Navegador',
                            value: data.browser || 'Desconhecido',
                            inline: true
                        },
                        {
                            name: '📱 Dispositivo',
                            value: data.device || 'Desconhecido',
                            inline: true
                        },
                        {
                            name: '🌍 Idioma',
                            value: data.language || 'Desconhecido',
                            inline: true
                        },
                        {
                            name: '📊 Página',
                            value: data.page || 'Desconhecido',
                            inline: false
                        }
                    ],
                    footer: {
                        text: 'Discord Nitro Rewards Tracker'
                    },
                    timestamp: new Date().toISOString()
                }]
            })
        });

        if (!discordResponse.ok) {
            console.error('Erro ao enviar para Discord:', discordResponse.statusText);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Clique registrado!' })
        };

    } catch (error) {
        console.error('Erro:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Erro ao processar requisição' })
        };
    }
};
