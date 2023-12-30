import jwt from 'jsonwebtoken'
import User from '../../DB/models/user.model.js'
export const auth= ()=>{

    return async(req,res,next)=>{
        try {
            const {accesstoken}=req.headers
            console.log(accesstoken)
            if(!accesstoken)return next(new Error('please login first',{cause:400}))
            if(!accesstoken.startsWith(process.env.TOKEN_PEFIX))return next(new Error('invalid token prefix',{cause:400}))

            const token=accesstoken.split(process.env.TOKEN_PEFIX)[1]

            const decodeddata=jwt.verify(token, process.env.LOGIN_SIGNATURE)
            if(!decodeddata.id) return next(new Error('invalid token payload',{cause:400}))
            const finduser=await User.findById(decodeddata.id,'username email')
            if(!finduser) return next(new Error('please signup first',{cause:404}))
            req.authUser=finduser

            console.log(finduser);
            next()
        } catch (error) {
            next(new Error('catch error in auth middleware',{cause:500}))
        }
    }
}