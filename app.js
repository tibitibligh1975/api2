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
const AUTH_TOKEN_3 = 'd637a3f5-e16e-4c67-89db-09ad6b229d12';
const UTMIFY_API_TOKEN = 'DZ8jfAR4t4TwHInTB8XUWRrMounDDEMoZqZe';
const UTMIFY_API_TOKEN2 = 'rVwvRvaqyWR0c9oMBNzykniehOr7ocO2mGVo';
const UTMIFY_API_TOKEN3 = 'xk9YX17RGwdWrmPB5iEdcz84eM7PA5i9w9mC';

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

// Rota para gerar PIX (terceira chave)
app.post('/g3', async (req, res) => {
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
        'Authorization': AUTH_TOKEN_3
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

// Rota para verificar pagamento (terceira chave)
app.post('/verify3', async (req, res) => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({ error: 'O campo paymentId é obrigatório.' });
    }

    const response = await axios.get(`${API_URL}/transaction.getPayment?id=${paymentId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': AUTH_TOKEN_3
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

// Webhook para primeira chave
app.post('/webhook', async (req, res) => {
    const payment = req.body;
    
    function getStatusPaymentUtmify(status) {
      const mapMethodPaymentUtmify = {
        PENDING: "waiting_payment",
        APPROVED: "paid",
        CANCELED: "refused",
        CHARGEBACK: "chargedback",
        REFUNDED: "refunded",
        REJECTED: "refused",
      };
      return mapMethodPaymentUtmify[status];
    }

    function parseUTM(utmString) {
      let modifiedString = utmString.replace(/\+\+/g, " ").replace(/—/g, " ");
      modifiedString = modifiedString.replace(/\s{2,}/g, " ");
  
      return modifiedString.split("&").reduce((acc, pair) => {
        const [key, value] = pair.split("=");
        if (key && value) {
          acc[key] = value.replace(/\+/g, " ").replace(/\s{2,}/g, " ");
        }
        return acc;
      }, {});
    }

    function getMethodPaymentNemu(method) {
      const mapMethodPaymentNemu = {
        BILLET: "billet",
        CREDIT_CARD: "credit_card",
        PIX: "pix",
      };
  
      return mapMethodPaymentNemu[method];
    }

    const utmData = parseUTM(payment.utm);

    const utmFields = {
      utm_campaign: utmData.utm_campaign ? utmData.utm_campaign : " ",
      utm_content: utmData.utm_content ? utmData.utm_content : " ",
      utm_medium: utmData.utm_medium ? utmData.utm_medium : " ",
      utm_source: utmData.utm_source ? utmData.utm_source : " ",
      utm_term: utmData.utm_term ? utmData.utm_term : " ",
    };

    const bodyUtmify = {
      orderId: payment.paymentId,
      platform: 'Pix',
      paymentMethod: getMethodPaymentNemu(payment.paymentMethod),
      status: getStatusPaymentUtmify(payment.status),
      createdAt: new Date().toISOString(),
      approvedDate: payment.approvedAt,
      refundedAt: null,
      customer: {
        name: payment.customer.name,
        email: payment.customer.email,
        phone: `+55${payment.customer.phone}`,
        document: payment.customer.cpf,
      },
      trackingParameters: {
        sck: "",
        src: "",
        ...utmFields,
      },
      product: {
        id: "Null",
        name: "Null",
        planId: '',
        planName: '',
        quantity: 1,
        priceInCents: payment.totalValue,
      },
      commission: {
        totalPriceInCents: payment.netValue,
        gatewayFeeInCents: 0,
        userCommissionInCents: 0,
      },
    };

    const response = await axios.post("https://api.utmify.com.br/api-credentials/orders", bodyUtmify, {
      headers: {
        "x-api-token": UTMIFY_API_TOKEN,
      },
      timeout: 5000,
    });
    console.log(response.data);

    return res.status(200).json({ message: 'Webhook processed successfully' });

});

// Webhook para segunda chave
app.post('/webhook2', async (req, res) => {
    const payment = req.body;
    
    function getStatusPaymentUtmify(status) {
      const mapMethodPaymentUtmify = {
        PENDING: "waiting_payment",
        APPROVED: "paid",
        CANCELED: "refused",
        CHARGEBACK: "chargedback",
        REFUNDED: "refunded",
        REJECTED: "refused",
      };
      return mapMethodPaymentUtmify[status];
    }

    function parseUTM(utmString) {
      let modifiedString = utmString.replace(/\+\+/g, " ").replace(/—/g, " ");
      modifiedString = modifiedString.replace(/\s{2,}/g, " ");
  
      return modifiedString.split("&").reduce((acc, pair) => {
        const [key, value] = pair.split("=");
        if (key && value) {
          acc[key] = value.replace(/\+/g, " ").replace(/\s{2,}/g, " ");
        }
        return acc;
      }, {});
    }

    function getMethodPaymentNemu(method) {
      const mapMethodPaymentNemu = {
        BILLET: "billet",
        CREDIT_CARD: "credit_card",
        PIX: "pix",
      };
  
      return mapMethodPaymentNemu[method];
    }

    const utmData = parseUTM(payment.utm);

    const utmFields = {
      utm_campaign: utmData.utm_campaign ? utmData.utm_campaign : " ",
      utm_content: utmData.utm_content ? utmData.utm_content : " ",
      utm_medium: utmData.utm_medium ? utmData.utm_medium : " ",
      utm_source: utmData.utm_source ? utmData.utm_source : " ",
      utm_term: utmData.utm_term ? utmData.utm_term : " ",
    };

    const bodyUtmify = {
      orderId: payment.paymentId,
      platform: 'Pix',
      paymentMethod: getMethodPaymentNemu(payment.paymentMethod),
      status: getStatusPaymentUtmify(payment.status),
      createdAt: new Date().toISOString(),
      approvedDate: payment.approvedAt,
      refundedAt: null,
      customer: {
        name: payment.customer.name,
        email: payment.customer.email,
        phone: `+55${payment.customer.phone}`,
        document: payment.customer.cpf,
      },
      trackingParameters: {
        sck: "",
        src: "",
        ...utmFields,
      },
      product: {
        id: "Null",
        name: "Null",
        planId: '',
        planName: '',
        quantity: 1,
        priceInCents: payment.totalValue,
      },
      commission: {
        totalPriceInCents: payment.netValue,
        gatewayFeeInCents: 0,
        userCommissionInCents: 0,
      },
    };

    const response = await axios.post("https://api.utmify.com.br/api-credentials/orders", bodyUtmify, {
      headers: {
        "x-api-token": UTMIFY_API_TOKEN2,
      },
      timeout: 5000,
    });
    console.log(response.data);

    return res.status(200).json({ message: 'Webhook processed successfully' });

});

// Webhook para terceira chave
app.post('/webhook3', async (req, res) => {
    const payment = req.body;
    
    function getStatusPaymentUtmify(status) {
      const mapMethodPaymentUtmify = {
        PENDING: "waiting_payment",
        APPROVED: "paid",
        CANCELED: "refused",
        CHARGEBACK: "chargedback",
        REFUNDED: "refunded",
        REJECTED: "refused",
      };
      return mapMethodPaymentUtmify[status];
    }

    function parseUTM(utmString) {
      let modifiedString = utmString.replace(/\+\+/g, " ").replace(/—/g, " ");
      modifiedString = modifiedString.replace(/\s{2,}/g, " ");
  
      return modifiedString.split("&").reduce((acc, pair) => {
        const [key, value] = pair.split("=");
        if (key && value) {
          acc[key] = value.replace(/\+/g, " ").replace(/\s{2,}/g, " ");
        }
        return acc;
      }, {});
    }

    function getMethodPaymentNemu(method) {
      const mapMethodPaymentNemu = {
        BILLET: "billet",
        CREDIT_CARD: "credit_card",
        PIX: "pix",
      };
  
      return mapMethodPaymentNemu[method];
    }

    const utmData = parseUTM(payment.utm);

    const utmFields = {
      utm_campaign: utmData.utm_campaign ? utmData.utm_campaign : " ",
      utm_content: utmData.utm_content ? utmData.utm_content : " ",
      utm_medium: utmData.utm_medium ? utmData.utm_medium : " ",
      utm_source: utmData.utm_source ? utmData.utm_source : " ",
      utm_term: utmData.utm_term ? utmData.utm_term : " ",
    };

    const bodyUtmify = {
      orderId: payment.paymentId,
      platform: 'Pix',
      paymentMethod: getMethodPaymentNemu(payment.paymentMethod),
      status: getStatusPaymentUtmify(payment.status),
      createdAt: new Date().toISOString(),
      approvedDate: payment.approvedAt,
      refundedAt: null,
      customer: {
        name: payment.customer.name,
        email: payment.customer.email,
        phone: `+55${payment.customer.phone}`,
        document: payment.customer.cpf,
      },
      trackingParameters: {
        sck: "",
        src: "",
        ...utmFields,
      },
      product: {
        id: "Null",
        name: "Null",
        planId: '',
        planName: '',
        quantity: 1,
        priceInCents: payment.totalValue,
      },
      commission: {
        totalPriceInCents: payment.netValue,
        gatewayFeeInCents: 0,
        userCommissionInCents: 0,
      },
    };

    const response = await axios.post("https://api.utmify.com.br/api-credentials/orders", bodyUtmify, {
      headers: {
        "x-api-token": UTMIFY_API_TOKEN3,
      },
      timeout: 5000,
    });
    console.log(response.data);

    return res.status(200).json({ message: 'Webhook processed successfully' });

});

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});