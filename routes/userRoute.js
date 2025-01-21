import express from 'express'
import { getUser, loginUser, postUser, sendSampleEmail } from '../controllers/userController.js';
import { validateUserFields } from '../middleware/validateUserFields.js';
const userRouter = express.Router()

userRouter.post("/",validateUserFields,postUser)
userRouter.post("/login",loginUser)
userRouter.get("/",getUser)
userRouter.post("/email",sendSampleEmail)
export default userRouter;

