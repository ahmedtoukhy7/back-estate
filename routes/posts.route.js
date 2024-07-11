
import express from 'express'
import { addPosts,deletePost, getPost, getPosts } from '../controller/post.controller.js'
import { verifyToken } from '../middleware/protectedRoute.js'


const router =express.Router()

router.post('/',verifyToken,addPosts)
router.get('/',verifyToken,getPosts)
router.get('/:id',verifyToken,getPost)
router.put('/',verifyToken,verifyToken)
router.delete('/:id',verifyToken,deletePost)

export default router