import { asyncHandler } from "../middleware/asyncHandler.js"
import fetch from "node-fetch"
import User from "../models/User.js"

// @desc    Generate a response from Grok AI
// @route   POST /api/grok/chat
// @access  Private
export const generateGrokResponse = asyncHandler(async (req, res) => {
  const { prompt } = req.body

  if (!prompt) {
    res.status(400)
    throw new Error("Please provide a prompt")
  }

  // Check if user has enough credits
  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(404)
    throw new Error("User not found")
  }

  if (user.credits <= 0) {
    res.status(403)
    throw new Error("Insufficient credits. Please purchase more credits to continue.")
  }

  try {
    const response = await fetch("https://api.x.ai/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROK_API_KEY}`,
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: prompt }],
        model: "grok-3",
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to generate response from Grok")
    }

    const data = await response.json()

    // Deduct a credit for successful generation
    user.credits -= 1
    await user.save()

    res.json({
      ...data,
      credits: user.credits,
    })
  } catch (error) {
    console.error("Grok API Error:", error)
    res.status(500)
    throw new Error("Failed to generate response from Grok: " + error.message)
  }
})

// @desc    Save chat history
// @route   POST /api/grok/history
// @access  Private
export const saveChatHistory = asyncHandler(async (req, res) => {
  const { userId, messages } = req.body

  // Here you would typically save the chat history to your database
  // This is a placeholder for demonstration purposes

  res.status(200).json({ success: true, message: "Chat history saved successfully" })
})

// @desc    Get chat history
// @route   GET /api/grok/history
// @access  Private
export const getChatHistory = asyncHandler(async (req, res) => {
  const userId = req.user._id

  // Here you would typically fetch the chat history from your database
  // This is a placeholder for demonstration purposes

  res.status(200).json({
    success: true,
    history: [
      { id: "1", title: "Previous Chat 1", timestamp: new Date() },
      { id: "2", title: "Previous Chat 2", timestamp: new Date() },
    ],
  })
})
