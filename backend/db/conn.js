import dotenv from "dotenv"
dotenv.config({path:"./config.env"})
import express from "express";
import mongoose from "mongoose"

mongoose.connect(process.env.DB).then(()=>{
    console.log("mongoose connection success")
}).catch((error)=>{
    console.log("mongoose connection problem ",error )
})