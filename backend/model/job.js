import mongoose from "mongoose";

const jobSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    salary:{
        type:String,
        required:true
    },
    expired:{
        type:Boolean,
        required:true,
        default:false
    },
    jobPostedOn:{
        type:Date,
        default:Date.now,
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    }




},{timestamps:true});

const Job=mongoose.model("Job",jobSchema);
export default Job;