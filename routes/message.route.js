import { getMessages, addMessage } from "../controller/message.controller.js"
import express from 'express'
import { verifyToken } from "../middleware/protectedRoute.js"
const router =express.Router()

router.get('/',getMessages)

router.post('/:chatId',verifyToken,addMessage)


export default router