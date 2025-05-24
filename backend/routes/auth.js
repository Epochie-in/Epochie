import express from "express"
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  updateUserPreferences,
  submitSurvey,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js"
import { googleAuth } from "../controllers/googleAuthController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/google", googleAuth)
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile)
router.put("/preferences", protect, updateUserPreferences)
router.post("/survey", protect, submitSurvey)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:resetToken", resetPassword)

export default router
