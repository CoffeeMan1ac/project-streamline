import React from "react";
import { Box, Container, Typography } from "@mui/material";

const HeroSection: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "common.white",
        py: { xs: 6, md: 10 },
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">

        {/* Circle / Icon Placeholder */}
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.8)",
            mx: "auto",
            mb: 3,
          }}
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