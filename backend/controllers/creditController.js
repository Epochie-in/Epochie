import User from "../models/User.js"
import { asyncHandler } from "../middleware/asyncHandler.js"
import Razorpay from "razorpay"
import crypto from "crypto"
import dotenv from "dotenv"
dotenv.config()

console.log("KEY_ID:", process.env.RAZORPAY_KEY_ID)
console.log("KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET)
// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_xsO2YXEJiNnEMm",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "9J9PefPnO728tws6vwZYs9Fs",
})

// @desc    Get user credits
// @route   GET /api/credits
// @access  Private
export const getUserCredits = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(404)
    throw new Error("User not found")
  }

  res.json({ credits: user.credits })
})

// @desc    Use a credit
// @route   POST /api/credits/use
// @access  Private
export const useCredit = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(404)
    throw new Error("User not found")
  }

  if (user.credits <= 0) {
    res.status(400)
    throw new Error("Insufficient credits. Please purchase more credits to continue.")
  }

  user.credits -= 1
  await user.save()

  res.json({ credits: user.credits, message: "Credit used successfully" })
})

// @desc    Create Razorpay order
// @route   POST /api/credits/create-order
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  const { plan, amount } = req.body
    console.log("Creating order with plan:", plan, "and amount:", amount)
  if (!plan || !amount) {
    res.status(400)
    throw new Error("Please provide plan and amount")
  }

  const options = {
    amount: amount * 100, // Razorpay expects amount in paise
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
    payment_capture: 1, // Auto capture
  }

  try {
    const order = await razorpay.orders.create(options)
    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error) {
    console.error("Razorpay Error:", error)
    res.status(500)
    throw new Error("Failed to create payment order")
  }
})

// @desc    Verify Razorpay payment
// @route   POST /api/credits/verify-payment
// @access  Private
export const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = req.body

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !plan) {
    res.status(400)
    throw new Error("Missing payment verification parameters")
  }

  // Verify signature
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex")

  if (generatedSignature !== razorpay_signature) {
    res.status(400)
    throw new Error("Invalid payment signature")
  }

  // Get plan details
  let creditsToAdd = 0
  let planName = ""
  let planAmount = 0

  switch (plan) {
    case "basic":
      creditsToAdd = 2000
      planName = "Basic Plan"
      planAmount = 999
      break
    case "pro":
      creditsToAdd = 3000
      planName = "Pro Plan"
      planAmount = 1999
      break
    case "enterprise":
      creditsToAdd = 5000
      planName = "Enterprise Plan"
      planAmount = 4999
      break
    default:
      res.status(400)
      throw new Error("Invalid plan selected")
  }

  // Update user credits
  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(404)
    throw new Error("User not found")
  }

  user.credits += creditsToAdd
  user.paymentHistory.push({
    orderId: razorpay_order_id,
    amount: planAmount,
    plan: planName,
    creditsAdded: creditsToAdd,
  })

  await user.save()

  res.json({
    success: true,
    message: `Payment successful! ${creditsToAdd} credits added to your account.`,
    credits: user.credits,
  })
})

// @desc    Get payment history
// @route   GET /api/credits/payment-history
// @access  Private
export const getPaymentHistory = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(404)
    throw new Error("User not found")
  }

  res.json({ paymentHistory: user.paymentHistory })
})
