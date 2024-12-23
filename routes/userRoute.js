import express from 'express'
import { loginUser, postUser } from '../controllers/userController.js';
import { validateUserFields } from '../middleware/validateUserFields.js';
const userRouter = express.Router()

userRouter.post("/",validateUserFields,postUser)
userRouter.post("/login",loginUser)

export default userRouter;

