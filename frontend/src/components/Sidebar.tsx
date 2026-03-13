import { Box, Drawer, Typography, IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

type SidebarProps = {
  toggleSidebar: () => void;
};

const Sidebar = ({ toggleSidebar }: SidebarProps) => {
  const [active, setActive] = useState("dashboard");
  const navigate = useNavigate();

  const getButtonStyle = (name: string) => ({
    justifyContent: "flex-start",
    textTransform: "none",
    color: active === name ? "primary.contrastText" : "text.secondary",
    backgroundColor: active === name ? "primary.main" : "transparent",

    "&:hover": {
      backgroundColor: active === name ? "primary.dark" : "action.hover",
    },
  });
  if (!open) return null;
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 260,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 260,
          boxSizing: "border-box",
          borderRight: "1px solid #e0e0e0",
        },
      }}
    >
      <Box p={2} display="flex" flexDirection="column" height="100%">
        {/* header */}
        <Box pb={2} borderBottom={1} borderColor="divider">
          <Box display="flex" alignItems="center" gap={2}>
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
                  transform: "translateY(2px)",
                }}
              />
            </Box>

            <Box flexGrow={1}>
              <Typography fontWeight={600} fontSize={16} color="primary.main">
                Phone Shield
              </Typography>
              <Typography fontSize={12} color="text.secondary">
                Backoffice Portal
              </Typography>
            </Box>

            <IconButton size="small" onClick={toggleSidebar}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>

        {/* buttons */}
        <Box mt={2} display="flex" gap={2} flexDirection="column">
          <Button
            fullWidth
            sx={getButtonStyle("dashboard")}
            startIcon={<DashboardIcon />}
            onClick={() => {
              setActive("rules");
              navigate("/rules");
            }}
          >
            Dashboard
          </Button>

          <Button
            fullWidth
            sx={getButtonStyle("rules")}
            startIcon={<FeedOutlinedIcon />}
            onClick={() => {
              setActive("rules");
              navigate("/rules");
            }}
          >
            Rules Management
          </Button>

          <Button
            fullWidth
            sx={getButtonStyle("products")}
            startIcon={<ViewInArOutlinedIcon />}
            onClick={() => {
              setActive("products");
            }}
          >
            Products Management
          </Button>

          <Button
            fullWidth
            sx={getButtonStyle("settings")}
            startIcon={<SettingsIcon />}
            onClick={() => setActive("settings")}
          >
            Settings
          </Button>
        </Box>

        {/* footer */}
        <Box mt="auto" pt={2} borderTop={1} borderColor="divider">
          <Box display="flex" alignItems="center" gap={1} px={1}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                backgroundColor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                color: "white",
              }}
            >
              A
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography fontWeight={600} fontSize={14}>
                Admin User
              </Typography>
              <Typography fontSize={12} color="text.secondary">
                Underwriter
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={2} px={1}>
          <Button
            startIcon={<LogoutOutlinedIcon />}
            color="error"
            onClick={async () => {
              await signOut(auth);
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
