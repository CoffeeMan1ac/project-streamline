
import { Box, Container, Typography, } from "@mui/material";
import ShieldLogo from "../assets/ShieldLogo.png";

const HeroSection = () => {
  return (
    <Box
      sx={{
        bgcolor: "#0057a7",
        color: "common.white",
        py: { xs: 6, md: 10 },
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">

        {/* Logo */}
        <Box
          component="img"
          src={ShieldLogo}
          alt="Phone Shield logo"
          sx={{height: 80 }}
        />

        {/* Main Heading */}
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Protect Your Phone, Protect Your World
        </Typography>

        {/* Subtitle */}
        <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
          Comprehensive phone insurance coverage tailored to your needs.
          From accidental damage to global protection.
        </Typography>

      </Container>
    </Box>
  );
};

export default HeroSection;