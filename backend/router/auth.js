import express from "express";
import { login, logout, register } from "../controller/auth.js";
import { authenticateToken } from "../authenticate.js";

const authRouter=express.Router();

authRouter.post("/register",register)
authRouter.post("/login",login);
authRouter.get("/logout",authenticateToken,logout)

export default authRouter;