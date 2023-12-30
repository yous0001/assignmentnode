export const globalResponce = (err,req,res,next)=>{
    if(err){
        return res.status(500).json({
            message:"Catch error",
            errorMsg:err.message,
            errLocation:err.stack
        })
    }
}