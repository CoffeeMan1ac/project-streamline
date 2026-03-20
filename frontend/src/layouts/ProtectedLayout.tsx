import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";

const EXPANDED_WIDTH = 260;
const COLLAPSED_WIDTH = 64;

interface LayoutProps {
  mode: "light" | "dark";
  toggleTheme: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const ProtectedLayout = ({ mode, toggleTheme, sidebarOpen, setSidebarOpen }: LayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        open={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        toggleTheme={toggleTheme}
        mode={mode}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          overflow: "hidden",
          width: isMobile
            ? "100%"
            : `calc(100% - ${sidebarOpen ? EXPANDED_WIDTH : COLLAPSED_WIDTH}px)`,
          transition: "width 0.3s ease",
          p: { xs: 2, sm: 3 },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default ProtectedLayout;
