import { Schema, model } from "mongoose";


const userschema=new Schema({
    username:{
        type:String,
        unique:true,
        reqired:true,
        lowercase:true
    },
    email:{
        type:String,
        unique:true,
        reqired:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        reqired:true
    },
    iscomfirmed:{
        type:Boolean,
        default:false
    },
    age:{
        type:Number,
        min:15,
        max:100
    },
    phone:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        default:"male",
        enum:["male","female"]
    }
    

},{timestamps:true})

const User =model('User',userschema)

export default User
