import { Router } from "express";
import { message, getMessages } from "../controllers/message.controllers.js";

const messageRouter = Router()

messageRouter.route('/message').post(message)
messageRouter.route('/retrieveMessages').post(getMessages)

export { messageRouter }