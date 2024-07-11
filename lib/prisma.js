import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// async function createPost() {
//     try {
//       const newPost = await prisma.post.create({
//         data: {
//           title: 'My First Post',
//           price:3000,
//           user: {
//             connect: { email: 'ahmed@gmail.com' },
//           },
//         },
//       });
  
//       console.log('New post created:', newPost);
//     } catch (error) {
//       console.error('Error creating post:', error);
//     } finally {
//       await prisma.$disconnect();
//     }
//   }

//   createPost()

export default prisma;