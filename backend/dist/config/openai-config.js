import { Configuration } from "openai";
export const configurationOpenAI = () => {
    const config = new Configuration({
        apiKey: process.env.OPEN_AI_SECRET,
    });
    return config;
};
//# sourceMappingURL=openai-config.js.map