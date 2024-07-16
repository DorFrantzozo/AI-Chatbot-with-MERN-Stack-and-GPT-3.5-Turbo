import { Box, Button, Typography } from "@mui/material";
import TypingAnimation from "../components/typer/TypingAnimation";
import Footer from "../components/shared/Footer";
import Orb from "../components/orb/Orb";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Full viewport height
        justifyContent: "space-between", // Distribute space between elements
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box>
          <TypingAnimation />
        </Box>
        <Typography
          sx={{
            textAlign: "center",
            display: "flex",
            width: { xs: "90%", sm: "70%", md: "50%" }, // Responsive width
            fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" }, // Responsive font size
          }}
        >
          Engage in intelligent conversations with AI-powered chat bot for
          instant assistance and seamless communication. Join us and experience
          the future of AI
        </Typography>
        <Button
          onClick={() => navigate("/login")}
          sx={{
            mt: 2,
            color: "black",
            bgcolor: "white",
            ":hover": {
              bgcolor: "white",
              transform: "scale(1.2)",
              transition: "transform .2s",
            },
          }}
        >
          Try Now
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: { xs: 5, md: "340px" },
          mt: { xs: 5, md: 0, lg: "170Px" },
        }}
      >
        <Orb />
      </Box>
      <Box sx={{ mb: 5 }}>
        <Footer />
      </Box>
    </Box>
  );
}

export default Home;
