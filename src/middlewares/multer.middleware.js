import multer from "multer"
import { nanoid } from "nanoid"


export const multermiddleware=()=>{
    const storage = multer.diskStorage({
        //request file callback
        destination: function (req, file, cb) {
            cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
            console.log(file)
            const uniquefilename = nanoid(5)+'-'+file.originalname
            cb(null, uniquefilename)
        }
        })

        const file=multer({storage})
        return file
}