// Corrigir problema de CORS no servidor
import axios from 'axios';
import express from 'express';
import cors from 'cors';

const app = express();

// Configuração do CORS para permitir qualquer domínio
app.use(cors({
  origin: '*', // Permite requisições de qualquer origem
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));

app.use(express.json());

const API_URL = 'https://pay.exattus.com/api/v1';
const AUTH_TOKEN = '1345025f-70bb-4e3e-946a-5200f04a5f04';
const AUTH_TOKEN_2 = '45878961-d4f2-49a8-a59a-e1328a398484';

// Rota para gerar PIX
app.post('/g', async (req, res) => {
  try {
    const { name, cpf, email, phone, amount, items } = req.body;

    if (!name || !cpf || !email || !phone || !amount || !items) {
      return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos: name, cpf, email, phone, amount, items.' });
    }

    const response = await axios.post(`${API_URL}/transaction.purchase`, {
      name,
      email,
      cpf,
      phone,
      paymentMethod: 'PIX',
      amount,
      traceable: true,
      items
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': AUTH_TOKEN
      }
    });

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
      return res.status(400).json({ error: 'O campo paymentId é obrigatório.' });
    }

    const response = await axios.get(`${API_URL}/transaction.getPayment?id=${paymentId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': AUTH_TOKEN
      }
    });

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

// Rota para gerar PIX (segunda chave)
app.post('/g2', async (req, res) => {
  try {
    const { name, cpf, email, phone, amount, items } = req.body;

    if (!name || !cpf || !email || !phone || !amount || !items) {
      return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos: name, cpf, email, phone, amount, items.' });
    }

    const response = await axios.post(`${API_URL}/transaction.purchase`, {
      name,
      email,
      cpf,
      phone,
      paymentMethod: 'PIX',
      amount,
      traceable: true,
      items
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': AUTH_TOKEN_2
      }
    });

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

// Rota para verificar pagamento (segunda chave)
app.post('/verify2', async (req, res) => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({ error: 'O campo paymentId é obrigatório.' });
    }

    const response = await axios.get(`${API_URL}/transaction.getPayment?id=${paymentId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': AUTH_TOKEN_2
      }
    });

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