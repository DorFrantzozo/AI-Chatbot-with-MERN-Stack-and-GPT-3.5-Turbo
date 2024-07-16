import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const block = message.split("```");
    return block;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();

  return role === "assistant" ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        p: 2,
        bgcolor: "#004d5612",
        my: 2,
        gap: 2,
        alignItems: "center",
      }}
    >
      <Avatar sx={{ ml: "0", mb: { xs: 1, sm: 0 } }}>
        <img src="openaiLogo.png" alt="openAi" width={"30px"} />
      </Avatar>
      <Box sx={{ width: "100%" }}>
        {!messageBlocks && (
          <Typography sx={{ fontSize: { xs: "16px", sm: "20px" } }}>
            {content}
          </Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block, index) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                key={index}
                style={coldarkDark}
                language="javascript"
                // customStyle={{ fontSize: { xs: "12px", sm: "14px" } }}
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography
                key={index}
                sx={{ fontSize: { xs: "16px", sm: "20px" } }}
              >
                {block}
              </Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row-reverse" },
        p: 2,
        bgcolor: "#04d56",
        my: 2,
        gap: 2,
        alignItems: "center",
      }}
    >
      <Avatar
        sx={{ ml: "0", mb: { xs: 1, sm: 0 }, bgcolor: "white", color: "black" }}
      >
        {auth?.user?.name[0].toUpperCase()}
        {auth?.user?.name[1] && auth?.user?.name.split(" ")[1][0].toUpperCase()}
      </Avatar>
      <Box sx={{ width: "100%" }}>
        {!messageBlocks && (
          <Typography sx={{ fontSize: { xs: "16px", sm: "20px" } }}>
            {content}
          </Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block, index) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                key={index}
                style={coldarkDark}
                language="javascript"
                // customStyle={{ fontSize: { xs: "12px", sm: "14px" } }}
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography
                key={index}
                sx={{ fontSize: { xs: "16px", sm: "20px" } }}
              >
                {block}
              </Typography>
            )
          )}
      </Box>
    </Box>
  );
};

export default ChatItem;
