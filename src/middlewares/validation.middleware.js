

const reqkeys=['body','params','query','headers']

export const validationmddleware=(schema)=>{
    return (req,res,next)=>{
        let errorsarr=[]
        for(const key of reqkeys){
            const validationResult=schema[key]?.validate(req[key], {aboutEarly:false})
            if(validationResult?.error){
                errorsarr.push(...validationResult.error.details)
            }
        
        }
        if(errorsarr.length){
        return res.json({
            errors:errorsarr.map((ele)=>ele.message)
        })   
        }
        next()
    }
}