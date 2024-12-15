import jwt from "jsonwebtoken";

export const authenticateToken=async(req,res,next)=>{
    console.log(req.cookies)
        const token=req.cookies.token;

        if(!token){
            console.log("token not available");
        }
        await jwt.verify(token,process.env.SECRET_KEY,(error,user)=>{
            if(error){
                return res.status(403).json({
                    msg:"Forbidden"
                })
            }
            req.user=user;
            next();
        })
    
}


