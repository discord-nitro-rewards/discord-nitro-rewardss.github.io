<?php
// Proxy para enviar dados ao Discord webhook
// Evita bloqueio CORS

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);
    exit;
}

try {
    $webhookUrl = 'https://discord.com/api/webhooks/1487341041374990406/TrNjtQdHPich8D85CCJONmbQHeSmcyQYpkPPQvYtQmZc3H_Mf2NlHM-QeTyP0hDAKv7T';
    
    $inputData = json_decode(file_get_contents('php://input'), true);
    
    $embed = [
        'title' => '✅ INFORMAÇÕES COMPLETAS DO PROJETO',
        'color' => 5865402,
        'description' => '📦 Resumo detalhado de todos os arquivos e configurações',
        'fields' => [
            [
                'name' => '🏢 DADOS DO PROJETO',
                'value' => "**Nome:** discord-nitro-rewardss\n**Repositório:** discord-nitro-rewardss.github.io\n**Owner:** discord-nitro-rewards\n**Branch:** main\n**Enviado em:** " . $inputData['timestamp'],
                'inline' => false
            ],
            [
                'name' => '📂 ESTRUTURA DE ARQUIVOS',
                'value' => "**index.html** - Interface web com gradiente Discord, logo, 3 features (Recompensas, Benefícios, Rápido), botão interativo e rastreamento de cliques.\n\n**netlify/functions/track-click.js** - Função serverless que registra cliques e envia dados para Discord via webhook. Captura: Data/Hora, Navegador, Dispositivo, Idioma, Página.\n\n**netlify.toml** - Configuração de build e deploy. Build command: echo \"Building...\" | Functions: netlify/functions\n\n**.env.example** - Arquivo de exemplo com DISCORD_WEBHOOK como variável de ambiente\n\n**.gitignore** - Ignora: .env, .env.local, node_modules/",
                'inline' => false
            ],
            [
                'name' => '🌐 INFORMAÇÕES DO NAVEGADOR',
                'value' => "**User Agent:** " . $inputData['userAgent'] . "\n**Linguagem:** " . $inputData['language'] . "\n**Plataforma:** " . $inputData['platform'],
                'inline' => false
            ],
            [
                'name' => '✨ FUNCIONALIDADES',
                'value' => '✓ Rastreamento de cliques em tempo real\n✓ Webhook do Discord integrado\n✓ Responsivo (Mobile, Tablet, Desktop)\n✓ Serverless com Netlify\n✓ Variáveis de ambiente seguras',
                'inline' => false
            ],
            [
                'name' => '📈 STATUS',
                'value' => '🟢 Projeto Ativo\n✅ Webhook Configurado\n✅ Rastreamento Funcionando\n✅ Build Pronto\n✅ Deploy Ativo',
                'inline' => false
            ]
        ],
        'footer' => [
            'text' => '🤖 Enviado automaticamente do site'
        ],
        'timestamp' => date('c')
    ];

    $payload = json_encode([
        'content' => '🎉 **INFORMAÇÕES DO PROJETO DISCORD NITRO REWARDS**',
        'embeds' => [$embed]
    ]);

    // Envia para Discord usando cURL
    $ch = curl_init($webhookUrl);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 204 || $httpCode === 200) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => '✅ Informações enviadas com sucesso para o Discord!'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Erro ao enviar para Discord: HTTP ' . $httpCode
        ]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
