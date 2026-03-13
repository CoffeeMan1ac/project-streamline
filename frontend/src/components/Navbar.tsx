import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

type NavbarProps = {
  mode: "light" | "dark";
  toggleTheme: () => void;
};

const Navbar = ({ mode, toggleTheme }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleGetQuoteClick = () => {
    if (location.pathname === "/" && location.hash === "#quotes") {
      document.getElementById("quotes")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    navigate({ pathname: "/", hash: "#quotes" });
  };

  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      sx={{ bgcolor: "primary.light", color: "primary.contrastText" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo and Title */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 2, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
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
          <Button color="inherit" sx={{ mr: 2 }} onClick={handleGetQuoteClick}>
            Get a Quote
          </Button>
          {!user ? (
            <IconButton color="inherit" onClick={() => navigate("/login")} sx={{ p: 2 }}>
              <LoginIcon />
            </IconButton>
          ) : (
            <IconButton color="inherit" onClick={handleLogout} sx={{ p: 2 }}>
              <LogoutIcon />
            </IconButton>
          )}
          <IconButton color="inherit" onClick={toggleTheme} sx={{ p: 2 }}>
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
