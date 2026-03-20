import { Box, Drawer, Typography, IconButton, Button, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { useTheme, useMediaQuery } from "@mui/material";

const EXPANDED_WIDTH = 260;
const COLLAPSED_WIDTH = 64;

type SidebarProps = {
  toggleSidebar: () => void;
  open: boolean;
  toggleTheme: () => void;
  mode: "light" | "dark";
};

const Sidebar = ({ toggleSidebar, open, toggleTheme, mode }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const getActiveFromPath = (path: string) => {
    if (path.startsWith("/rules")) return "rules";
    if (path.startsWith("/products")) return "products";
    if (path.startsWith("/quotes")) return "quotes";
    return "rules";
  };

  const active = getActiveFromPath(location.pathname);

  const getButtonStyle = (name: string) => ({
    justifyContent: open ? "flex-start" : "center",
    textTransform: "none",
    minWidth: 0,
    px: open ? 2 : 0,
    color: active === name ? "primary.contrastText" : "text.secondary",
    backgroundColor: active === name ? "primary.main" : "transparent",
    "&:hover": {
      backgroundColor: active === name ? "primary.dark" : "action.hover",
    },
  });

  const navItems = [
    {
      key: "rules",
      label: "Rules Management",
      icon: <FeedOutlinedIcon />,
      path: "/rules",
    },
    {
      key: "products",
      label: "Products Management",
      icon: <ViewInArOutlinedIcon />,
      path: "/products",
    },
    {
      key: "quotes",
      label: "Quotations",
      icon: <SearchOutlinedIcon />,
      path: "/quotes",
    },
  ];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? open : true}
      onClose={toggleSidebar}
      anchor="left"
      sx={{
        width: isMobile ? 0 : open ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
        flexShrink: 0,
        transition: "width 0.3s ease",
        "& .MuiDrawer-paper": {
          width: isMobile ? EXPANDED_WIDTH : open ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
          boxSizing: "border-box",
          borderRight: "1px solid #e0e0e0",
          overflowX: "hidden",
          transition: "width 0.3s ease",
        },
      }}
    >
      <Box p={open ? 2 : 1} display="flex" flexDirection="column" height="100%">
        {/* header */}
        <Box pb={2} borderBottom={1} borderColor="divider">
          <Box
            display="flex"
            alignItems="center"
            justifyContent={open ? "space-between" : "center"}
          >
            {open && (
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    flexShrink: 0,
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
                <Box>
                  <Typography fontWeight={600} fontSize={14} color="text.primary">
                    Phone Shield
                  </Typography>
                  <Typography fontSize={11} color="text.secondary">
                    Backoffice Portal
                  </Typography>
                </Box>
              </Box>
            )}
            <IconButton size="small" onClick={toggleSidebar}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>

        {/* nav buttons */}
        <Box mt={2} display="flex" gap={1} flexDirection="column">
          {navItems.map((item) =>
            open ? (
              <Button
                key={item.key}
                fullWidth
                sx={getButtonStyle(item.key)}
                startIcon={item.icon}
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) toggleSidebar();
                }}
              >
                {item.label}
              </Button>
            ) : (
              <Tooltip key={item.key} title={item.label} placement="right">
                <IconButton
                  onClick={() => {
                    navigate(item.path);
                    if (isMobile) toggleSidebar();
                  }}
                  sx={{
                    borderRadius: 1,
                    color: active === item.key ? "primary.contrastText" : "text.secondary",
                    backgroundColor: active === item.key ? "primary.main" : "transparent",
                    "&:hover": {
                      backgroundColor: active === item.key ? "primary.dark" : "action.hover",
                    },
                  }}
                >
                  {item.icon}
                </IconButton>
              </Tooltip>
            )
          )}
        </Box>

        {/* footer */}
        <Box mt="auto" pt={2} borderTop={1} borderColor="divider">
          {open ? (
            <Box display="flex" alignItems="center" gap={1} px={1} mb={2}>
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
                  flexShrink: 0,
                }}
              >
                {user?.email?.[0]?.toUpperCase() ?? "A"}
              </Box>
              <Box display="flex" flexDirection="column">
                <Typography fontWeight={600} fontSize={14}>
                  {user?.email ?? "Admin User"}
                </Typography>
                <Typography fontSize={12} color="text.secondary">
                  Underwriter
                </Typography>
              </Box>
            </Box>
          ) : null}

          {open ? (
            <Box px={1} display="flex" alignItems="center" justifyContent="space-between">
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
              <Tooltip title={mode === "dark" ? "Light mode" : "Dark mode"}>
                <IconButton onClick={toggleTheme} size="small">
                  {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
              <Tooltip title="Logout" placement="right">
                <IconButton
                  color="error"
                  onClick={async () => {
                    await signOut(auth);
                    navigate("/login");
                  }}
                >
                  <LogoutOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={mode === "dark" ? "Light mode" : "Dark mode"} placement="right">
                <IconButton onClick={toggleTheme} size="small">
                  {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
