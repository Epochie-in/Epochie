import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Generate a response from Grok
const generateResponse = async (prompt, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(`${API_URL}/grok/chat`, { prompt }, config)
  return response.data
}

// Save chat history
const saveChatHistory = async (messages, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(`${API_URL}/grok/history`, { messages }, config)
  return response.data
}

// Get chat history
const getChatHistory = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(`${API_URL}/grok/history`, config)
  return response.data
}

const grokService = {
  generateResponse,
  saveChatHistory,
  getChatHistory,
}

export default grokService
