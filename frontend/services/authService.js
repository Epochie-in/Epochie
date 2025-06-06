import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://epochie.duckdns.org:5000/api"

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData)

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password })

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem("user")
}

// Get user profile
const getUserProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(`${API_URL}/auth/profile`, config)
  return response.data
}

// Update user profile
const updateUserProfile = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(`${API_URL}/auth/profile`, userData, config)

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }

  return response.data
}

const authService = {
  register,
  login,
  logout,
  getUserProfile,
  updateUserProfile,
}

export default authService
