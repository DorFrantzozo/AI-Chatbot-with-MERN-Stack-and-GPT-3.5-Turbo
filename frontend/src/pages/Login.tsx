import { Button, Typography, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import CustomizedInput from "../components/shared/CustomizedInput";
import { IoIosLogIn } from "react-icons/io";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import image from "../../public/loginBg.jpg";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signed In Successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "login" });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth, navigate]);

  return (
    <Box
      width={"100%"}
      height={"100vh"}
      display={"flex"}
      flexDirection="column-reverse"
      flex={1}
      sx={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        flex={1}
        alignItems={"center"}
        padding={isMobile ? 1 : 2}
        mb={isMobile ? "100px" : "380px"}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: isMobile ? "20px" : "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#201C1C",
            width: isMobile ? "90%" : "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant={isMobile ? "h5" : "h4"}
              textAlign={"center"}
              padding={2}
              fontWeight={600}
            >
              Login
            </Typography>
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: isMobile ? "100%" : "450px",
                borderRadius: 2,
                bgcolor: "black",
                color: "white",
                ":hover": { bgcolor: "white", color: "black" },
              }}
              endIcon={<IoIosLogIn />}
            >
              LogIn
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
