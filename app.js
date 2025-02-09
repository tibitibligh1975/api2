// Importando as dependências
import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

// Configuração mais detalhada do CORS
const corsOptions = {
    origin: true, // Permite qualquer origem
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
};

// Aplicando CORS como primeiro middleware
app.use(cors(corsOptions));

// Middleware para preflight requests
app.options('*', cors(corsOptions));

// Parse JSON payloads
app.use(express.json());

// Middleware para logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
});

// Rota para gerar PIX
app.post('/g', async (req, res) => {
    try {
        const { name, email, cpf, phone, amount } = req.body;

        if (!name || !email || !cpf || !phone || !amount) {
            return res.status(400).json({
                error: 'Os campos obrigatorios sao: name, email, cpf, phone, amount'
            });
        }

        const payload = {
            name,
            email,
            cpf,
            phone,
            amount,
            items: [
                {
                    unitPrice: amount,
                    title: "Opcao Mais",
                    quantity: 1,
                    tangible: false
                }
            ]
        };

        const response = await axios.post(
            'https://pay.exattus.com/api/v1/transaction.purchase',
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': '1345025f-70bb-4e3e-946a-5200f04a5f04'
                }
            }
        );

        return res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Erro ao gerar PIX:', error.message);
        if (error.response) {
            return res.status(error.response.status).json({
                error: error.response.data || 'Erro da API Exattus',
            });
        }
        return res.status(500).json({ error: 'Erro interno ao processar o PIX' });
    }
});

// Rota para verificar pagamento
app.post('/verify', async (req, res) => {
    try {
        const { paymentId } = req.body;

        if (!paymentId) {
            return res.status(400).json({ error: 'paymentId e obrigatorio' });
        }

        const response = await axios.get(
            `https://pay.exattus.com/api/v1/transaction/${paymentId}`,
            {
                headers: {
                    'Authorization': '1345025f-70bb-4e3e-946a-5200f04a5f04'
                }
            }
        );

        return res.status(200).json(response.data);
    } catch (error) {
        console.error('Erro ao verificar pagamento:', error.message);
        if (error.response) {
            return res.status(error.response.status).json({
                error: error.response.data || 'Erro da API Exattus'
            });
        }
        return res.status(500).json({ error: 'Erro interno ao verificar pagamento' });
    }
});

// Rota de teste para verificar se o servidor está funcionando
app.get('/', (req, res) => {
    res.json({ message: 'Servidor funcionando!' });
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
