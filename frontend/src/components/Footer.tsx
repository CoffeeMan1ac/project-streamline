import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#111827", // dark gray/near-black
        color: "grey.300", // light gray text
        textAlign: "center",
        py: 3,
        mt: "auto",
      }}
    >
      <Typography variant="body2">
        © 2026 Phone Shield. Underwritten by leading global insurers.
      </Typography>
    </Box>
  );
};

export default Footer;
