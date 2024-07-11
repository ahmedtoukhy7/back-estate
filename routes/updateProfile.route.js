import express from 'express'
import { getUsers, getsavedPost, savedPost, upateProfile } from '../controller/profileController.js'
import { verifyToken } from '../middleware/protectedRoute.js'

const router =express.Router()

router.put('/:id',verifyToken,upateProfile )
router.get('/',verifyToken,getUsers )

router.post('/save',verifyToken, savedPost)
router.get('/save',verifyToken, getsavedPost)



export default router