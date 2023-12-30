import { Schema, model } from "mongoose";



const taskschema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    userID:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        default:"toDo",
        enum:["toDo","Doing","Done"]
    },
    assignto:{
        type:Array
    },
    deadline:{
        type:String
    }
},{
timestamps:true
})

const tasks =model('Task',taskschema)
export default tasks