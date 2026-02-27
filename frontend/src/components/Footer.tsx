import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#030712", // Dark background for footer
        color: "grey.300", // light gray text
        textAlign: "center",
        py: 3,
        mt: "auto",
      }}
    >
      <Typography variant="body2">THIS HAS BEEN AUTODEPLOYED</Typography>
    </Box>
  );
};

export default Footer;
