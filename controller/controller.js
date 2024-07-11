import bcrypt from 'bcrypt'
  import prisma from '../lib/prisma.js'
  import jwt from 'jsonwebtoken'

export const register =async(req,res)=>{

  
    const {username,email,password}=req.body

    try {

        const hashpassword = await bcrypt.hash(password,10)
        console.log(hashpassword)

        const newUser = await prisma.user.create({
            data: {
              username,
              email,
              password: hashpassword,
            },
          });
        console.log(newUser)
        res.status(201).json({message:'success'})

        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to create user!"})
    }
    
}
export const login =async(req,res)=>{

  const {email,username,password}=req.body

 try {
  const user=await prisma.user.findUnique({where:{email:email}})

  if(!user){
    return res.status(400).json({message:'user not found'})
  }

  const match =await bcrypt.compare(password,user.password)

  if(!match){
    return res.status(400).json({message:'user not found'})

  }

  //token
  const age = 1000 * 60 * 60 * 24 * 7;

  const token =  jwt.sign({
    id:user.id,
    email:user.email , username:user.username
  },process.env.JWT_SECRET ,  { expiresIn: age })

  user.token =token

  //cookie

  res.cookie('token',token,{httpOnly:true, maxAge: age}).status(200).json({message:'success' , data:user})
  
 } catch (error) {
  console.log(error)
  return res.status(500).json({message:'user not found'})
 }


}
