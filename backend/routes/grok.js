import express from "express"
import { generateGrokResponse, saveChatHistory, getChatHistory } from "../controllers/grokController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/chat", protect, generateGrokResponse)
router.post("/history", protect, saveChatHistory)
router.get("/history", protect, getChatHistory)

export default router
