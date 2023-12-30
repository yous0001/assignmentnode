import { Router } from "express";
import * as usercontroller from "./user.controller.js"
import expressAsyncHandler from "express-async-handler";
import { auth } from "../../middlewares/auth.middleware.js";
import { validationmddleware } from "../../middlewares/validation.middleware.js";
import { signupschema } from "./user.validationschemas.js";
import { multermiddleware } from "../../middlewares/multer.middleware.js";

const router=Router()
router.post('/signup',validationmddleware(signupschema),expressAsyncHandler(usercontroller.signup))
router.post('/signin',expressAsyncHandler(usercontroller.signin))
//router.get('/',auth(),expressAsyncHandler(usercontroller.getuserdata))
router.put('/',auth(),expressAsyncHandler(usercontroller.updateuser))
router.put('/changepassword',auth(),expressAsyncHandler(usercontroller.changepassword))
router.delete('/',auth(),expressAsyncHandler(usercontroller.updateuser))


router.post('/upload',multermiddleware().single('profilePicture'),expressAsyncHandler(usercontroller.imgupload))
export default router;