import mongoose from "mongoose";
import validator from "validator";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
        
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        default:"Buyer"
    }

},{ timestamps: true });

const User=mongoose.model("User",userSchema);

export default  User;