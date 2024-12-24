import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        trim:true,

    },
    email:{
        type:String,
        trim:true,
        unique:true,

    },
    password:{
        type:String,
        trim:true,
    },
    userType:{
        type:String,
        trim:true,
    }
})

const User=mongoose.model("User",userSchema);
export default User;