import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

interface LayoutProps {
  mode: "light" | "dark";
  toggleTheme: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const ProtectedLayout = ({ mode, toggleTheme, sidebarOpen, setSidebarOpen }: LayoutProps) => (
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
        p: 3,
        transition: "margin 0.3s ease",
      }}
    >
      <Outlet />
    </Box>
  </Box>
);

export default ProtectedLayout;
