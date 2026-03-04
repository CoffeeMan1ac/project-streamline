import AuthCard from "../components/AuthCard";
import Box from "@mui/material/Box";
import { Typography, Button } from "@mui/material";

const BackOfficeLoginPage = () => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
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
                }}
            />
            </Box>
            <Typography variant="h4" component="h1" style={{ fontWeight: "bold" }} gutterBottom>
            Phone Shield
            </Typography>
            <Typography gutterBottom mb={5} sx={{ color: "text.secondary" }}>
            Back Office Portal Login
            </Typography>
            <AuthCard />
            <Button variant="text" size="small" sx={{ color: "text.secondary", mt: 3 }}>
            Back to Home
            </Button>
      </Box>
    </>
  );
};

export default BackOfficeLoginPage;
