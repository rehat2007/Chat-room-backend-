import { Router } from "express";
import { protactedRoute } from "../middleware/editprofile.middleware.js";
import { getStreamToken } from "../controller/chat.controller.js";

const chatRouter = Router()

chatRouter.route("/token").get(protactedRoute,getStreamToken)

export default chatRouter