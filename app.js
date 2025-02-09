// Importando as dependências
import axios from 'axios';
import express from 'express';
import cors from 'cors';

const app = express();

// Configuração do CORS para permitir qualquer domínio
app.use(cors({
  origin: '*', // Permite requisições de qualquer origem
  methods: ['GET', 'POST', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));

// Permitir JSON no body
app.use(express.json());

// Sua secret key fornecida
const SECRET_KEY = '1345025f-70bb-4e3e-946a-5200f04a5f04';
const BASE_URL = 'https://pay.exattus.com/api/v1';

// Rota para gerar um pagamento via PIX
app.post('/g', async (req, res) => {
  try {
    const { name, email, cpf, phone, amount, items } = req.body;

    // Verificação de campos obrigatórios
    if (!name || !email || !cpf || !phone || !amount || !items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Os campos obrigatórios são: name, email, cpf, phone, amount e items (array).' });
    }

    // Enviando requisição para a API Exattus
    const response = await axios.post(
      `${BASE_URL}/transaction.purchase`,
      {
        name,
        email,
        cpf,
        phone,
        paymentMethod: 'PIX',
        amount,
        traceable: true,
        items,
      },
      {
        headers: {
          'Authorization': SECRET_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    // Retorna a resposta da API para o cliente
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

// Rota para verificar o status de um pagamento
app.post('/verify', async (req, res) => {
  try {
    const { paymentId } = req.body;

    // Verificação de campo obrigatório
    if (!paymentId) {
      return res.status(400).json({ error: 'O campo paymentId é obrigatório.' });
    }

    // Enviando requisição para verificar pagamento
    const response = await axios.get(
      `${BASE_URL}/transaction.getPayment?id=${paymentId}`,
      {
        headers: {
          'Authorization': SECRET_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    // Retorna a resposta da API para o cliente
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Erro ao verificar pagamento:', error.message);
    if (error.response) {
      return res.status(error.response.status).json({
        error: error.response.data || 'Erro da API Exattus',
      });
    }
    return res.status(500).json({ error: 'Erro interno ao verificar o pagamento' });
  }
});

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
