import AuthCard from "../components/AuthCard";
import Box from "@mui/material/Box";
import { Typography, Button } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const BackOfficeLoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const from = location.state?.from?.pathname || "/rules";
  const handleLogin = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(from, { replace: true });
    } catch {
      setError("Invalid email or password.");
    }
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        my={5}
      >
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            src="shield_logo.png"
            alt="Logo"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transform: "translateY(2px)",
            }}
          />
        </Box>
        <Typography variant="h4" component="h1" style={{ fontWeight: "bold" }} gutterBottom>
          Phone Shield
        </Typography>
        <Typography gutterBottom mb={5} sx={{ color: "text.secondary" }}>
          Back Office Portal Login
        </Typography>
        <AuthCard onSubmit={handleLogin} error={error} />
        <Button
          onClick={() => navigate("/")}
          variant="text"
          size="small"
          sx={{ color: "text.secondary", mt: 3 }}
        >
          <NavigateBeforeIcon />
          Back to Home
        </Button>
      </Box>
    </>
  );
};

export default BackOfficeLoginPage;
