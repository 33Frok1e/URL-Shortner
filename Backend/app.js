import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDB from "./src/config/mongoo.config.js"
import short_url from './src/routes/short_url.route.js'
import { errorHandler } from "./src/utils/errorHandler.js"
import { redirectFromShortUrl } from "./src/controllers/short_url.controller.js"
import user_routes from "./src/routes/user.route.js"
import auth_routes from "./src/routes/auth.route.js"
import { attachUser } from "./src/utils/attachUser.js";

dotenv.config('./.env')
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // your React app
    credentials: true // 👈 this allows cookies to be sent
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(attachUser)

app.use('/api/create', short_url)
app.get('/:id', redirectFromShortUrl)
app.use("/api/auth", auth_routes)
app.use("/api/user", user_routes)

app.use(errorHandler)

app.listen(3000, () => {
    connectDB();
    console.log("Server is running on port 3000");
});
