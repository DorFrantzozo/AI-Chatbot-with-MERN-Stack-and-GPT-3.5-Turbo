import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configurationOpenAI } from "../config/openai-config.js";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";
export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwt.id);
    if (!user) {
      return res.status(401).json("User not Register or Token Expired");
    }
    //grab chats of user

    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];
    chats.push({ role: "user", content: message });
    user.chats.push({ role: "user", content: message });

    //send all chats with new one with API
    //get response
    const config = configurationOpenAI();
    const openai = new OpenAIApi(config);
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });
    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwt.id);
    if (!user) {
      return res.status(401).send("User not Register or Token Expired");
    }

    if (user._id.toString() !== res.locals.jwt.id) {
      return res.status(401).send("Premission didnt match");
    }
    return res
      .status(200)
      .json({ message: "Login success", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error",
      cause: error.message,
    });
  }
};

export const deleteChatToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwt.id);
    if (!user) {
      return res.status(401).send("User not Register or Token Expired");
    }

    if (user._id.toString() !== res.locals.jwt.id) {
      return res.status(401).send("Premission didnt match");
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "Chats deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error",
      cause: error.message,
    });
  }
};
