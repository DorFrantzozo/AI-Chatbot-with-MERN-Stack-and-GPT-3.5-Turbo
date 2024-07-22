import express from "express";
import { config } from "dotenv";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config();
const app = express();
const allowedOrigins = [
    "https://ai-chatbot-client-three.vercel.app",
    "https://ai-chatbot-client-l9cgsmubm-dors-projects-2f5d6a31.vercel.app",
];
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/api/v1/", appRouter);
export default app;
//# sourceMappingURL=app.js.map