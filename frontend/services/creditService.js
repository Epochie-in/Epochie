import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Get user credits
const getCredits = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(`${API_URL}/credits`, config)
  return response.data
}

// Use a credit
const useCredit = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(`${API_URL}/credits/use`, {}, config)
  return response.data
}

// Create a payment order
const createOrder = async (plan, amount, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(`${API_URL}/credits/create-order`, { plan, amount }, config)
  return response.data
}

// Verify payment
const verifyPayment = async (paymentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(`${API_URL}/credits/verify-payment`, paymentData, config)
  return response.data
}

// Get payment history
const getPaymentHistory = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(`${API_URL}/credits/payment-history`, config)
  return response.data
}

const creditService = {
  getCredits,
  useCredit,
  createOrder,
  verifyPayment,
  getPaymentHistory,
}

export default creditService
