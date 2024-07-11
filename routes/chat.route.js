import { addChat, getChat, getChats } from "../controller/chat.controller.js"
import express from 'express'
import { verifyToken } from "../middleware/protectedRoute.js"
const router =express.Router()

router.get('/',verifyToken,getChats)
router.get('/:id',verifyToken,getChat)
router.post('/',verifyToken,addChat)


export default router