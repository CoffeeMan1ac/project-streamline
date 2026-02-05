import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        
        {/* Left: Brand */}
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          Phone Shield
        </Typography>

        {/* Right: Navigation */}
        <Box>
          <Button color="inherit" sx={{ mr: 2 }}>
            Home
          </Button>
          <Button variant="outlined" color="inherit">
            Get a Quote
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;