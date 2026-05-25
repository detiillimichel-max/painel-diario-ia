// Este arquivo roda no servidor (Vercel)
const { MercadoPagoConfig, Preference } = require('mercadopago');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    try {
        // A chave ACCESS_TOKEN deve estar nas Variáveis de Ambiente da Vercel
        const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
        const preference = new Preference(client);

        const response = await preference.create({
            body: {
                items: [
                    {
                        title: 'Produto do Assistente',
                        quantity: 1,
                        unit_price: Number(req.body.price),
                    }
                ],
            }
        });

        res.status(200).json({ id: response.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
