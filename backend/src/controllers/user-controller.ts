import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      message: "ok",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error",
      cause: error.message,
    });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        message: "User already exists",
      });
    }
    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // create token
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "https://ai-chatbot-client-three.vercel.app",
      signed: true,
      path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "https://ai-chatbot-client-three.vercel.app",
      expires: expires,
      httpOnly: true,
      signed: true,
    }); // chane later!!!!!1

    return res.status(201).json({
      message: "User created",
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error",
      cause: error.message,
    });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debugger;
  try {
    //userLogin
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not exist");
    }
    const isPasswordCorrenct = await compare(password, user.password);
    if (!isPasswordCorrenct) {
      return res.status(403).send("One of the details is wrong");
    }

    // create tokens

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "https://ai-chatbot-client-three.vercel.app",
      secure: false,
      signed: true,
      path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "https://ai-chatbot-client-three.vercel.app",
      expires: expires,
      httpOnly: true,
      signed: true,
    }); // chane domain later!!!!!1

    return res
      .status(200)
      .json({ message: "Login success", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error",
      cause: error.message,
    });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(res.locals);
    //userVerify
    const user = await User.findById(res.locals.jwt.id);
    if (!user) {
      return res.status(401).send("User not Register or Token Expired");
    }
    console.log(user._id.toString(), res.locals.jwt.id);
    if (user._id.toString() !== res.locals.jwt.id) {
      return res.status(401).send("Premission didnt match");
    }
    return res
      .status(200)
      .json({ message: "Login success", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error",
      cause: error.message,
    });
  }
};

export const userLogOut = async (
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

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "https://ai-chatbot-client-three.vercel.app",
      signed: true,
      path: "/",
    });

    return res
      .status(200)
      .json({ message: "Login success", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error",
      cause: error.message,
    });
  }
};
