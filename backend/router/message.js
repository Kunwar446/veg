import express from "express";
import { createMessage } from "../controller/message.js";
const messageRouter=express.Router();


messageRouter.post("/create",createMessage);


export default messageRouter;