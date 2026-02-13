import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";


const Navbar = () => {
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

        {/* Right: Navigation */}
        <Box>
          <Button color="inherit" sx={{ mr: 2 }}>
            Home
          </Button>
          <Button color="inherit">
            Get a Quote
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;