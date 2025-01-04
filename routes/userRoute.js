import express from 'express'
import { getUser, loginUser, postUser } from '../controllers/userController.js';
import { validateUserFields } from '../middleware/validateUserFields.js';
const userRouter = express.Router()

userRouter.post("/",validateUserFields,postUser)
userRouter.post("/login",loginUser)
userRouter.get("/",getUser)

export default userRouter;

