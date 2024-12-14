import mongoose, { mongo } from "mongoose"

const applicationSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    coverLetter:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    resume:{
        publicId:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    applicantId:{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            enum:["Job Seeker"],
            required:true
        }
    },

    employerId:{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            enum:["Employer"],
            required:true
        }
    },
    
});

const Application=mongoose.model("Application",applicationSchema);

export default Application