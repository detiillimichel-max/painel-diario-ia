<!DOCTYPE html>
<html lang="pt-PT">
<head>
    <meta charset="UTF-8">
    <title>Documentação do Projeto</title>
    <style>
        body {
            background-color: #0d111c;
            color: #e2e8f0;
            font-family: sans-serif;
            padding: 40px;
            line-height: 1.6;
        }
        .container {
            background: rgba(255, 255, 255, 0.04);
            backdrop-filter: blur(24px);
            padding: 30px;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            max-width: 800px;
            margin: auto;
        }
        h1 { color: #ffffff; margin-bottom: 20px; }
        h2 { color: #7f9cf5; margin-top: 30px; }
        code { background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px; color: #f6ad55; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Assistente Pessoal Inteligente</h1>
        <p>Um assistente modular focado em produtividade com integração financeira segura.</p>

        <h2>Funcionalidades</h2>
        <ul>
            <li>Interface moderna com <em>Glassmorphism</em>.</li>
            <li>Persistência de histórico via <code>localStorage</code>.</li>
            <li>Sistema de navegação flutuante.</li>
            <li>Arquitetura preparada para integração com Mercado Pago.</li>
        </ul>

        <h2>Configuração de Deploy (Vercel)</h2>
        <p>O projeto está configurado para Vercel utilizando um arquivo <code>vercel.json</code> na raiz para garantir o roteamento correto das páginas.</p>

        <h2>Integração Mercado Pago</h2>
        <p>Por questões de segurança, a integração financeira é realizada via <em>Serverless Functions</em> (pasta <code>/api</code>). As credenciais devem ser configuradas exclusivamente nas <strong>Variáveis de Ambiente</strong> da Vercel.</p>

        <h2>Como contribuir</h2>
        <p>Ao realizar alterações, certifique-se de não expor chaves de API nos arquivos HTML ou JS da pasta pública.</p>
    </div>
</body>
</html>
