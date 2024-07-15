import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import {
  deleteChatToUser,
  generateChatCompletion,
  sendChatToUser,
} from "../controllers/chat-controllers.js";

const chatRoutes = Router();
//protected API
chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);
chatRoutes.get("/all-chats", verifyToken, sendChatToUser);
chatRoutes.delete("/delete", verifyToken, deleteChatToUser);

export default chatRoutes;
