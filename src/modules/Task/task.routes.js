import { Router } from "express";
import * as taskcontroller from './task.controller.js';
import expressAsyncHandler from "express-async-handler";
import { auth } from "../../middlewares/auth.middleware.js";
const router=Router()

router.post('/addtask',auth(),expressAsyncHandler(taskcontroller.addtask))
router.post('/updatetask',auth(),expressAsyncHandler(taskcontroller.updatetask))
router.delete('/deletetask',auth(),expressAsyncHandler(taskcontroller.deletetask))
router.get('/gettasks',auth(),expressAsyncHandler(taskcontroller.listUserTasks))


export default router