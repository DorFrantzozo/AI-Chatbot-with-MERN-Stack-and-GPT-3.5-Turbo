import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import red from "@mui/material/colors/red";
import ChatItem from "../components/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Footer from "../components/shared/Footer";

type Message = {
  role: "user" | "assistent";
  content: string;
};

const Chat = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);

    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deleteChats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Chats Deleted", { id: "deleteChats" });
    } catch (error) {
      console.log(error);
      toast.error("Error Deleting Chats", { id: "deleteChats" });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(32, 32, 32)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: "600",
            }}
          >
            {auth?.user?.name[0].toUpperCase()}
            {auth?.user?.name[1] &&
              auth?.user?.name.split(" ")[1][0].toUpperCase()}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "monospace" }}>
            Welcome {auth?.user?.name.toUpperCase()}
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "monospace", my: 4, p: 3 }}>
            Ask anything that comes to your mind
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "600",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[500],
              ":hover": {
                bgcolor: red.A100,
              },
            }}
          >
            Clear Chat
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, sm: 1, xs: 1 },
          flexDirection: "column",
          px: { md: 3, xs: 2 },
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: { md: "40px", sm: "30px", xs: "20px" },
            color: "white",
            mb: 2,
            mx: "auto",
          }}
        >
          Model -GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: { md: "60vh", xs: "50vh" },
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
            mt: 3,
          }}
        >
          {chatMessages.map((chat, index) => (
            //@ts-ignore
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <Box
          sx={{
            marginTop: "80px",
            width: "95%",
            padding: "10px",
            borderRadius: "26px",
            border: "1px solid white",
            display: "flex",
            flexDirection: "row",
            mb: "40px",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            style={{
              backgroundColor: "transparent",
              padding: "10px",
              border: "none",
              outline: "none",
              fontSize: "20px",
              color: "white",
              width: "100%",
            }}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{ ml: "auto", color: "white" }}
          >
            <IoMdSend />
          </IconButton>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Chat;
