
import prisma from './../lib/prisma.js';

export const getPosts = async (req,res)=>{
    const query =req.query
    const userId=req.userId
  
    try {
        const posts = await prisma.post.findMany({
            where:{
                userId:userId,

                city: query.city || undefined,
                type: query.type || undefined,
                property: query.property || undefined,
                bedroom: parseInt(query.bedroom) || undefined,
                price:{
                    gte:Number(query.minPrice)  || undefined ,
                    lte: Number(query.maxPrice) || undefined,
                }

            }
        })
        res.status(200).json({message:'success', data:posts})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'no posts'})
    }
}
export const getPost = async (req,res)=>{
    try {
        const id =req.params.id
        const post = await prisma.post.findUnique({where:{id},
            include:{
                postDetail:true,
                 user:{select:{
                        username:true,
                         avatar:true
            }}
            }
        })
        res.status(200).json(post)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'no post'})
    }
}

export const deletePost=async (req,res)=>{
    try {
        const id =req.params.id
        const posts= await prisma.post.delete({where:{id}})
        res.status(200).json({message:'post deleted successufully',data:posts})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'not deleted'})
    }
}

export const addPosts = async(req,res)=>{
    
    const body = req.body
    
   
    
   
    try {

    const post = await prisma.post.create({
        data:{  
            
            title:body.postData.title,
            price:body.postData.price,
            images:body.postData.images,
            address:body.postData.address,
             bedroom:body.postData.bedroom,
             bathroom:body.postData.bathroom,
            latitude:body.postData.latitude,
            city:body.postData.city,
             longitude:body.postData.longitude,
             type:body.postData.type,
             property:body.postData.property,
          
            user: {
                connect:{
                    id:body.postData.userId
                }
            },
            postDetail:{
                create:{
                    desc    :   body.postDetail.desc,
                     utilities :  body.postDetail.utilities,
                    pet   :      body.postDetail.pet,
                    income  :    body.postDetail.income,
                    size     :   body.postDetail.size,
                    school  :   body.postDetail.school,
                    bus  :   body.postDetail.bus,
                    restaurant:  body.postDetail.restaurant,
                }
            }
           
        }
    })
    res.status(200).json(post)
    
    
    
   } catch (error) {
       console.log(error)
       res.status(500).json({message:"error no post"})
   }
}