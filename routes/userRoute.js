import express from 'express'
import { getAllUsers, loginUser, postUser, verifyUserEmail} from '../controllers/userController.js';
import { validateUserFields } from '../middleware/validateUserFields.js';
const userRouter = express.Router()

userRouter.post("/",validateUserFields,postUser)
userRouter.post("/login",loginUser)
userRouter.get("/",getAllUsers)
userRouter.post("/verify-email", verifyUserEmail)
export default userRouter;