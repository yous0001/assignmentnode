import User from "../../../DB/models/user.model.js"
import bcrypt from "bcryptjs"
import  jwt  from "jsonwebtoken"
export const signup=async(req,res,next)=>{
    const {username,email,password,age,gender,phone}=req.body
    //email check
    const isEmailexists=await User.findOne({email})
    if(isEmailexists){
        return res.status(409).json({
            message:"email is already exists"
        })
    }
    const hashpass =bcrypt.hashSync(password,+process.env.saltrounds)
    const newUser=await User.create({username,email,password:hashpass,age,gender,phone})
    return res.status(201).json({
        message:"user created successfully"
        ,newUser
    })
}


export const signin=async(req,res,next)=>{
    const {email,password}=req.body
    //email check
    const isEmailexists=await User.findOne({email})
    if(!isEmailexists){
        return res.status(404).json({
            message:"invalid login credentials1"
        })
    }

    const ispasswordmatches = bcrypt.compareSync(password,isEmailexists.password)
    if(!ispasswordmatches){
        return res.status(404).json({
            message:"invalid login credentials2"
        })
    }
    const token = jwt.sign(
        {id:isEmailexists._id,userEmail:isEmailexists.email},
        process.env.LOGIN_SIGNATURE,
        {expiresIn:10000}
        )
    return res.status(200).json({
        message:"login success",
        token
        
    })
}

export const getuserdata=async(req,res,next)=>{
    return res.status(200).json({
        message:"success",
        user: req.authUser
    })
}

export const updateuser=async(req,res,next)=>{
    const {username,age}=req.body
    const {_id}=req.authUser
    
    const updateduser= await User.findByIdAndUpdate(_id,{
        username,age
    },{new:true})
    if(!updateduser)return next(new Error('update failed'))
    res.status(200).json({
        message:"update done",
        updateduser
    })
}

export const changepassword=async(req,res,next)=>{
    const {password}=req.body
    const {_id}=req.authUser
    const hashpassword=bcrypt.hashSync(password,+process.env.saltrounds)
    const updateduser= await User.findByIdAndUpdate(_id,{
        password:hashpassword
    },{new:true})
    if(!updateduser)return next(new Error('change failed'))
    res.status(200).json({
        message:"password changed",
        updateduser
    })
}

export const deleteuser=async(req,res,next)=>{
    const {_id}=req.authUser
    
    const deleteduser= await User.findByIdAndDelete(_id)

    if(!deleteduser)return next(new Error('delete failed'))
    res.status(200).json({
        message:"delete done"
    })
}


export const imgupload=(req,res,next)=>{
    res.status(200).json({
        message:"success",
        
    })
}