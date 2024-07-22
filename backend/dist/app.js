// import express from "express";
// import { config } from "dotenv";
// import appRouter from "./routes/index.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// config();
// const app = express();
// // app.options("*", cors());
// const allowedOrigins = [
//   "https://ai-chatbot-client-three.vercel.app",
//   "https://ai-chatbot-client-l9cgsmubm-dors-projects-2f5d6a31.vercel.app",
//   "https://ai-chatbot-client-3f1f1rcbt-dors-projects-2f5d6a31.vercel.app",
//   "https://ai-chatbot-client-git-main-dors-projects-2f5d6a31.vercel.app/",
// ];
// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use("/api/v1/", appRouter);
// export default app;
import express from "express";
import { config } from "dotenv";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config();
const app = express();
// Define allowed origins
const allowedOrigins = [
    "https://ai-chatbot-client-three.vercel.app",
    "https://ai-chatbot-client-l9cgsmubm-dors-projects-2f5d6a31.vercel.app",
    "https://ai-chatbot-client-3f1f1rcbt-dors-projects-2f5d6a31.vercel.app",
    "https://ai-chatbot-client-git-main-dors-projects-2f5d6a31.vercel.app",
];
// Configure CORS middleware
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
// Use the appRouter
app.use("/api/v1/", appRouter);
export default app;
//# sourceMappingURL=app.js.map