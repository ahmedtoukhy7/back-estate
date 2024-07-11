
import prisma from './../lib/prisma.js';

export const upateProfile = async (req,res)=>{

    const tokenUserId = req.userId;
    

    const id = req.params.id

    const user= await prisma.user.update({where : {id:id},data: req.body})

    if(user){
        res.status(200).json({message:'success', data:user})
    }


}

export const getUsers = async (req,res)=>{
    try {
      const allUsers= await prisma.user.findMany()
      console.log(allUsers)
      res.status(200).json(allUsers)
      
    } catch (error) {
      res.json({message:'error'})
    }
  }

  export const  savedPost =async (req,res)=>{

    const body=req.body
    const userId = req.userId;

    try {
      const savepost= await prisma.savedPost.findUnique({
        where:{
          userId_postId:{
            userId:userId,
            postId:body.postId
          }
          
        }

      })

      //res.status(200).json(savepost)

      console.log(savepost)

      if(savepost){
        await prisma.savedPost.delete({
          where:{
            id:savepost.id
          }
        })
        res.status(200).json({ message: "Post removed from saved list" });
        
      }
      else{

        let savepost=await prisma.savedPost.create({
          data:{
            userId:body.userId,
            postId:body.postId

          }
        })
       
        res.status(200).json({ message: "Post saved" ,data:savepost });
      }
      
    } catch (error) {

      console.log(error)
      
    }




  }

  export const getsavedPost = async(req,res)=>{
    const userId=req.userId
   
   try {
    const allSaved = await prisma.savedPost.findMany({
      where:{
        userId:userId
      },
      include:{
        post:true
      }
    }) 
    res.status(200).json({ message: "Post saved" , data:allSaved});

   } catch (error) {
    res.status(500).json({ message: "no Post saved" });
   }

  }


  // export const profilePosts = async (req,res)=>{
  //   const userId= req.params.userId
  //  try {
  //   const userPosts = await prisma.post.findMany({
  //     where:{
  //       userId:userId
  //     }
  //   })
  //   res.status(200).json({message:'success',data:userPosts})
  //  } catch (error) {
  //   console.log(error)
  //   res.status(500).json({message:'no posts'})
  //  }

  // }