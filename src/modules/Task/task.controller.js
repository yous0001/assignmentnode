import tasks from "../../../DB/models/task.model.js"

import User from "../../../DB/models/user.model.js"
 
export const addtask = async (req,res,next)=>{
    const {title,description,deadline} = req.body
    const {_id}=req.authUser
    
    
    const createdtask = await tasks.create({title,userID:_id,description,deadline})
    if(!createdtask){
        return res.status(400).json({
            message:"creation failed"
        })
    }
    return res.status(201).json({
        message:"create success"
    })
}

export const updatetask = async (req,res,next)=>{
    const {title,description,status} = req.body
    const {_id}=req.authUser
    const {taskid}=req.headers
    
    
    const updatedtask = await tasks.findOneAndUpdate({_id:taskid,userID:_id},{title,description,status},{new:true})
    if(!updatedtask){
        return res.status(400).json({
            message:"updated failed"
        })
    }
    return res.status(201).json({
        message:"updated success"
    })
}

export const deletetask = async (req,res,next)=>{
    const {_id}=req.authUser
    const {taskid}=req.headers
    
    
    const deletedtask = await tasks.findOneAndDelete({_id:taskid,userID:_id})
    if(!deletedtask){
        return res.status(400).json({
            message:"delete failed"
        })
    }
    return res.status(201).json({
        message:"delete success"
    })
}


export const listUserTasks=async(req,res,next)=>{
    const {_id}=req.authUser


    const thetasks=await tasks.find({userID:_id}).sort({createdAt:-1})
    if(!thetasks){
        return res.status(200).json({
            message:"no tasks"
            
        })
    }
    return res.status(200).json({
        message:"your tasks"
        ,thetasks
    })

} 