import { userLogIn, userSignIn, refreshRefreshToken, userLogOut, getCurrentUser, getAllUsers } from "../controllers/user.controllers.js";
import { Router } from "express";

const userRouter = Router()

userRouter.route('/register/').post(userSignIn)
userRouter.route('/login/').post(userLogIn)
userRouter.route('/refresh-token/').post(refreshRefreshToken)
userRouter.route('/logout/').post(userLogOut)
userRouter.route('/getuser/').post(getCurrentUser)
userRouter.route('/getusers/').get(getAllUsers)

export {userRouter};