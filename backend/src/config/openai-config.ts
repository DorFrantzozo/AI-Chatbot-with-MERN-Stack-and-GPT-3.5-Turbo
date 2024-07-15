import { Configuration, OpenAIApi } from "openai";

export const configurationOpenAI = () => {
  const config = new Configuration({
    apiKey: process.env.OPEN_AI_SECRET,
  });
  return config;
};
