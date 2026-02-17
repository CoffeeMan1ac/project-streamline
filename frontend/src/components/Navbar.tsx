import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useState } from "react";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navigate = useNavigate();
  return (
    <AppBar position="static" color="primary" elevation={0} sx={{ bgcolor: "#0167b2" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo and Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            component="img"
            src={"shield_logo.png"}
            alt="Phone Shield logo"
            sx={{ height: 80 }}
          />
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            Phone Shield
          </Typography>
        </Box>

        {/* Right: Navigation and Theme Toggle */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button color="inherit" sx={{ mr: 2 }} onClick={() => navigate("/")}>
            Home
          </Button>
          <Button color="inherit" sx={{ mr: 2 }} onClick={() => navigate("/quote")}>
            Get a Quote
          </Button>
          <IconButton color="inherit" onClick={handleThemeToggle} sx={{ p: 1 }}>
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
