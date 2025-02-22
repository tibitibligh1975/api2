// Corrigir problema de CORS no servidor
import axios from "axios";
import express from "express";
import cors from "cors";

const app = express();

// Configuração do CORS para permitir qualquer domínio
app.use(
  cors({
    origin: "*", // Permite requisições de qualquer origem
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
  })
);

app.use(express.json());

const API_URL = "https://www.checkoutinho.com/api";
const AUTH_TOKEN = "10f1f50864cb7732b542f3513351d6ee";
const AUTH_TOKEN2 = "25913bfa8d2d05fe261656a0a70bb99f";
const AUTH_TOKEN3 = "95786ca07a623f67305d339aa69ab44b";
const AUTH_TOKEN4 = "1a8a431fc55d98279d4e2e6eaaab24eb";

// Rota para gerar PIX
app.post("/g", async (req, res) => {
  try {
    const { amount, item, utm, customer, description } = req.body;

    if (!amount || !item || !utm || !customer || !description) {
      return res.status(400).json({
        error:
          "Todos os campos obrigatórios devem ser preenchidos: amount, item, utm, customer, description.",
      });
    }

    const body = {
      amount,
      description,
      customer: {
        name: customer.name,
        document: customer.document,
        phone: customer.phone,
        email: customer.email,
      },
      item: {
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      },
      utm,
    };

    const response = await axios.post(`${API_URL}/payment`, body, {
      headers: {
        "Content-Type": "application/json",
        "x-client-secret": AUTH_TOKEN,
      },
    });

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Erro ao gerar PIX:", error.message);
    if (error.response) {
      return res.status(error.response.status).json({
        error: error.response.data || "Erro da API Exattus",
      });
    }
    return res.status(500).json({ error: "Erro interno ao processar o PIX" });
  }
});

// Rota para verificar pagamento
app.post("/verify", async (req, res) => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      console.log("PaymentId não fornecido");
      return res
        .status(400)
        .json({ error: "O campo paymentId é obrigatório." });
    }

    console.log("Verificando pagamento:", paymentId);

    const response = await axios.post(
      `${API_URL}/payment/verify-payment`,
      { paymentId },
      {
        headers: {
          "Content-Type": "application/json",
          "x-client-secret": AUTH_TOKEN,
        },
      }
    );

    console.log("Resposta da verificação:", response.data);

    // Verifica se o pagamento está completo
    const isPaid = response.data?.payment?.status === "completed";

    return res.status(response.status).json({
      ok: isPaid,
      status: response.data?.payment?.status,
      data: response.data,
    });
  } catch (error) {
    console.error("Erro detalhado ao verificar pagamento:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    if (error.response) {
      return res.status(error.response.status).json({
        error: error.response.data || "Erro da API externa",
        details: error.message,
      });
    }
    return res.status(500).json({
      error: "Erro interno ao verificar o pagamento",
      details: error.message,
    });
  }
});

// Rota para gerar PIX 2
app.post("/g2", async (req, res) => {
  try {
    const { amount, item, utm, customer, description } = req.body;

    if (!amount || !item || !utm || !customer || !description) {
      return res.status(400).json({
        error:
          "Todos os campos obrigatórios devem ser preenchidos: amount, item, utm, customer, description.",
      });
    }

    const body = {
      amount,
      description,
      customer: {
        name: customer.name,
        document: customer.document,
        phone: customer.phone,
        email: customer.email,
      },
      item: {
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      },
      utm,
    };

    const response = await axios.post(`${API_URL}/payment`, body, {
      headers: {
        "Content-Type": "application/json",
        "x-client-secret": AUTH_TOKEN2,
      },
    });

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Erro ao gerar PIX:", error.message);
    if (error.response) {
      return res.status(error.response.status).json({
        error: error.response.data || "Erro da API Exattus",
      });
    }
    return res.status(500).json({ error: "Erro interno ao processar o PIX" });
  }
});

// Rota para verificar pagamento 2
app.post("/verify2", async (req, res) => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      console.log("PaymentId não fornecido");
      return res
        .status(400)
        .json({ error: "O campo paymentId é obrigatório." });
    }

    console.log("Verificando pagamento:", paymentId);

    const response = await axios.post(
      `${API_URL}/payment/verify-payment`,
      { paymentId },
      {
        headers: {
          "Content-Type": "application/json",
          "x-client-secret": AUTH_TOKEN2,
        },
      }
    );

    console.log("Resposta da verificação:", response.data);

    // Verifica se o pagamento está completo
    const isPaid = response.data?.payment?.status === "completed";

    return res.status(response.status).json({
      ok: isPaid,
      status: response.data?.payment?.status,
      data: response.data,
    });
  } catch (error) {
    console.error("Erro detalhado ao verificar pagamento:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    if (error.response) {
      return res.status(error.response.status).json({
        error: error.response.data || "Erro da API externa",
        details: error.message,
      });
    }
    return res.status(500).json({
      error: "Erro interno ao verificar o pagamento",
      details: error.message,
    });
  }
});

// Rota para gerar PIX3
app.post("/g3", async (req, res) => {
  try {
    const { amount, item, utm, customer, description } = req.body;

    if (!amount || !item || !utm || !customer || !description) {
      return res.status(400).json({
        error:
          "Todos os campos obrigatórios devem ser preenchidos: amount, item, utm, customer, description.",
      });
    }

    const body = {
      amount,
      description,
      customer: {
        name: customer.name,
        document: customer.document,
        phone: customer.phone,
        email: customer.email,
      },
      item: {
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      },
      utm,
    };

    const response = await axios.post(`${API_URL}/payment`, body, {
      headers: {
        "Content-Type": "application/json",
        "x-client-secret": AUTH_TOKEN3,
      },
    });

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Erro ao gerar PIX:", error.message);
    if (error.response) {
      return res.status(error.response.status).json({
        error: error.response.data || "Erro da API Exattus",
      });
    }
    return res.status(500).json({ error: "Erro interno ao processar o PIX" });
  }
});

// Rota para verificar pagamento3
app.post("/verify3", async (req, res) => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      console.log("PaymentId não fornecido");
      return res
        .status(400)
        .json({ error: "O campo paymentId é obrigatório." });
    }

    console.log("Verificando pagamento:", paymentId);

    const response = await axios.post(
      `${API_URL}/payment/verify-payment`,
      { paymentId },
      {
        headers: {
          "Content-Type": "application/json",
          "x-client-secret": AUTH_TOKEN3,
        },
      }
    );

    console.log("Resposta da verificação:", response.data);

    // Verifica se o pagamento está completo
    const isPaid = response.data?.payment?.status === "completed";

    return res.status(response.status).json({
      ok: isPaid,
      status: response.data?.payment?.status,
      data: response.data,
    });
  } catch (error) {
    console.error("Erro detalhado ao verificar pagamento:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    if (error.response) {
      return res.status(error.response.status).json({
        error: error.response.data || "Erro da API externa",
        details: error.message,
      });
    }
    return res.status(500).json({
      error: "Erro interno ao verificar o pagamento",
      details: error.message,
    });
  }
});

// Rota para gerar PIX4
app.post("/g4", async (req, res) => {
  try {
    const { amount, item, utm, customer, description } = req.body;

    if (!amount || !item || !utm || !customer || !description) {
      return res.status(400).json({
        error:
          "Todos os campos obrigatórios devem ser preenchidos: amount, item, utm, customer, description.",
      });
    }

    const body = {
      amount,
      description,
      customer: {
        name: customer.name,
        document: customer.document,
        phone: customer.phone,
        email: customer.email,
      },
      item: {
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      },
      utm,
    };

    const response = await axios.post(`${API_URL}/payment`, body, {
      headers: {
        "Content-Type": "application/json",
        "x-client-secret": AUTH_TOKEN4,
      },
    });

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Erro ao gerar PIX:", error.message);
    if (error.response) {
      return res.status(error.response.status).json({
        error: error.response.data || "Erro da API Exattus",
      });
    }
    return res.status(500).json({ error: "Erro interno ao processar o PIX" });
  }
});

// Rota para verificar pagamento4
app.post("/verify4", async (req, res) => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      console.log("PaymentId não fornecido");
      return res
        .status(400)
        .json({ error: "O campo paymentId é obrigatório." });
    }

    console.log("Verificando pagamento:", paymentId);

    const response = await axios.post(
      `${API_URL}/payment/verify-payment`,
      { paymentId },
      {
        headers: {
          "Content-Type": "application/json",
          "x-client-secret": AUTH_TOKEN4,
        },
      }
    );

    console.log("Resposta da verificação:", response.data);

    // Verifica se o pagamento está completo
    const isPaid = response.data?.payment?.status === "completed";

    return res.status(response.status).json({
      ok: isPaid,
      status: response.data?.payment?.status,
      data: response.data,
    });
  } catch (error) {
    console.error("Erro detalhado ao verificar pagamento:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    if (error.response) {
      return res.status(error.response.status).json({
        error: error.response.data || "Erro da API externa",
        details: error.message,
      });
    }
    return res.status(500).json({
      error: "Erro interno ao verificar o pagamento",
      details: error.message,
    });
  }
});

// Inicia o servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
