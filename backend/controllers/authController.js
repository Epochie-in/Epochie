import User from "../models/User.js"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { asyncHandler } from "../middleware/asyncHandler.js"

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      credits: user.credits,
      preferences: user.preferences,
      surveyCompleted: user.surveyCompleted,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email }).select("+password")

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      credits: user.credits,
      preferences: user.preferences,
      surveyCompleted: user.surveyCompleted,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      credits: user.credits,
      preferences: user.preferences,
      surveyCompleted: user.surveyCompleted,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if (req.body.password) {
      user.password = req.body.password
    }

    // Update preferences if provided
    if (req.body.preferences) {
      user.preferences = {
        ...user.preferences,
        ...req.body.preferences,
      }
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      credits: updatedUser.credits,
      preferences: updatedUser.preferences,
      surveyCompleted: updatedUser.surveyCompleted,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc    Update user preferences
// @route   PUT /api/auth/preferences
// @access  Private
export const updateUserPreferences = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    // Update preferences
    user.preferences = {
      ...user.preferences,
      ...req.body,
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      preferences: updatedUser.preferences,
      message: "Preferences updated successfully",
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc    Submit user survey
// @route   POST /api/auth/survey
// @access  Private
export const submitSurvey = asyncHandler(async (req, res) => {
  const { source, age, occupation, useCase, additionalInfo } = req.body

  const user = await User.findById(req.user._id)

  if (user) {
    user.surveyCompleted = true
    user.surveyData = {
      source,
      age,
      occupation,
      useCase,
      additionalInfo,
    }

    await user.save()

    res.json({
      success: true,
      message: "Survey submitted successfully",
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    res.status(404)
    throw new Error("No user found with that email")
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(20).toString("hex")

  // Hash token and set to resetPasswordToken field
  user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

  // Set expire (1 hour)
  user.resetPasswordExpire = Date.now() + 60 * 60 * 1000

  await user.save()

  // In a real application, you would send an email with the reset link
  // For this demo, we'll just return the token
  const resetUrl = `${req.protocol}://${req.get("host")}/reset-password/${resetToken}`

  // Simulate sending email
  console.log(`Password reset link: ${resetUrl}`)

  res.json({
    success: true,
    message: "Password reset email sent",
    // Only for development - in production you would not return the token
    resetToken,
    resetUrl,
  })
})

// @desc    Reset password
// @route   POST /api/auth/reset-password/:resetToken
// @access  Public
export const resetPassword = asyncHandler(async (req, res) => {
  // Get hashed token
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex")

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })

  if (!user) {
    res.status(400)
    throw new Error("Invalid or expired token")
  }

  // Set new password
  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined

  await user.save()

  res.json({
    success: true,
    message: "Password reset successful",
  })
})
