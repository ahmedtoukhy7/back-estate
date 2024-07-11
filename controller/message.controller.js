import prisma from "../lib/prisma.js"



export const getMessages= async (req,res)=>{
    
}

export const addMessage= async (req,res)=>{
    const userId=req.userId
    const chatId=req.params.chatId
    const text=req.body.text
    try {
        const addMessage = await prisma.message.create({
            data:{
                text:text,
                userId:userId,
                chatId:chatId
            }
        })
        res.status(200).json({message:addMessage})
    } catch (error) {
        res.status(500).json({message:'failed to add'})
        console.log(error)
    }

}
