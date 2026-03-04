import AuthCard from "../components/AuthCard";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
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
        <Typography variant="h4" component="h1" style={{ fontWeight: "bold" }} gutterBottom>
          Phone Shield
        </Typography>
        <Typography gutterBottom mb={5} sx={{ color: "text.secondary" }}>
          Back Office Portal Login
        </Typography>
        <AuthCard />
      </Box>
    </>
  );
};

export default BackOfficeLoginPage;
