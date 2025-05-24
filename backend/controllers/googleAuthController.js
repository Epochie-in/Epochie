import User from "../models/User.js"
import jwt from "jsonwebtoken"
import { OAuth2Client } from "google-auth-library"
import { asyncHandler } from "../middleware/asyncHandler.js"

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

// @desc    Auth with Google
// @route   POST /api/auth/google
// @access  Public
export const googleAuth = asyncHandler(async (req, res) => {
  const { token } = req.body

  if (!token) {
    res.status(400)
    throw new Error("No token provided")
  }

  try {
    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    const { sub: googleId, email, name, picture } = payload

    // Check if user exists
    let user = await User.findOne({ googleId })

    if (!user) {
      // Check if user exists with the same email
      user = await User.findOne({ email })

      if (user) {
        // Link Google account to existing user
        user.googleId = googleId
        user.picture = picture || user.picture
        await user.save()
      } else {
        // Create new user
        user = await User.create({
          name,
          email,
          googleId,
          picture,
        })
      }
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      role: user.role,
      credits: user.credits,
      surveyCompleted: user.surveyCompleted,
      preferences: user.preferences,
      token: generateToken(user._id),
    })
  } catch (error) {
    console.error("Google Auth Error:", error)
    res.status(401)
    throw new Error("Invalid Google token")
  }
})
