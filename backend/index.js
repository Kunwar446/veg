import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import helmet from "helmet"
import "./db/conn.js"
import dotenv from "dotenv"
dotenv.config({path:"./config.env"})
import authRouter from "./router/auth.js";
import userRouter from "./router/user.js";
import cloudinary from "cloudinary";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import messageRouter from "./router/message.js";
import pesticideRouter from "./router/pesticide.js";



const app=express();


app.use(cors({
    origin:process.env.ORIGIN,
    credentials:true
}))

// app.use(cors({
//     origin:"http://localhost:3000",
//     credentials:true
// }
// ))


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
import vegetableOrderRouter from "./router/vegetableOrder.js"
import pesticideOrderRouter from "./router/pesticideOrder.js"
import vegetableRouter from "./router/vegetable.js";
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))



// importing router
app.use("/auth",authRouter);
app.use("/user",userRouter);
app.use("/vegetable", vegetableRouter);
app.use("/pesticide", pesticideRouter);
app.use("/message",messageRouter);
app.use("/orders/vegetable",vegetableOrderRouter);
app.use("/orders/pesticide",pesticideOrderRouter);


// cloudinary
cloudinary.v2.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})



// exception hadleing
app.use((err,req,res,next)=>{
    const errorStatus=err.staus||500;
    const errorMessage=err.message||"something went wrong";

    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
    })

})



app.listen(process.env.PORT,(req,res)=>{
    console.log("express connection success")
})