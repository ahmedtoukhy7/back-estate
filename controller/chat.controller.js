import prisma from "../lib/prisma.js"

export const getChats= async (req,res)=>{
    const tokenUserId = req.userId;
    // console.log(tokenUserId)
try {

    const chats= await prisma.chat.findMany({
        where:{
            userIDs:{
                hasSome:[tokenUserId]
            }
        }
    })

    for(const chat of chats){
        const recivId = chat.userIDs.find((id)=>id != tokenUserId)

        const userRecev = await prisma.user.findUnique({
            where:{
                id:recivId
            },
            select:{
                id:true,
                username:true,
                avatar:true
            }
        })
        chat.userRecev=userRecev
    }
    res.status(200).json({message:chats})
    
} catch (error) {
    console.log(error)
    res.status(500).json({message:'Failed to get chats'})
    
}

}
export const getChat= async (req,res)=>{

    const id =req.params.id

    try {
        const chat = await prisma.chat.findUnique({
            where:{id:id}
            ,
            include:{
                messages:{
                    orderBy:
                    {
                        createdAt:'asc'
                    }
                }
            }
        })

        if(chat){
            return res.status(200).json({message:chat})
        }
        
    } catch (error) {
        console.log(err);
        res.status(500).json({ message: "Failed to get chat!" });
    }

}
export const addChat= async (req,res)=>{
    const tokenUserId = req.userId;
    try {
        const newChat = await prisma.chat.create({
            data:{
                userIDs:[tokenUserId,req.body.receiverId]
            }
        })

        res.status(200).json({message:newChat})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'no chat '})
    }

}
