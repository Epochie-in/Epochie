import express from "express"
import {
  getUserCredits,
  useCredit,
  createOrder,
  verifyPayment,
  getPaymentHistory,
} from "../controllers/creditController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", protect, getUserCredits)
router.post("/use", protect, useCredit)
router.post("/create-order", protect, createOrder)
router.post("/verify-payment", protect, verifyPayment)
router.get("/payment-history", protect, getPaymentHistory)

export default router
