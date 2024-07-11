import path from "path";
import express from 'express'
import cors from 'cors'
import routerAuth from './routes/routes.js'
import routerProfile from './routes/updateProfile.route.js'
import routerPosts from './routes/posts.route.js'
import routerChats from './routes/chat.route.js'
import routerMessages from './routes/message.route.js'
import cookieParser from 'cookie-parser'
const app=express()

const __dirname = path.resolve();


app.use(express.json())
app.use(cors({origin:'http://localhost:5173',credentials:true}))
app.use("/api/auth",routerAuth)
app.use("/api/posts",routerPosts)
app.use("/api/users",routerProfile)
app.use("/api/chats",routerChats)
app.use("/api/messages",routerMessages)

app.use(cookieParser())
 console.log('aliiioo')

 

 
	app.use(express.static(path.join(__dirname, "/client/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});



app.listen(8800, () => {
    console.log("Server is running!");
  });

  