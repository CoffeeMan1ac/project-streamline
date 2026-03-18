import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface LayoutProps {
  mode: "light" | "dark";
  toggleTheme: () => void;
}

const PublicLayout = ({ mode, toggleTheme }: LayoutProps) => (
  <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <Navbar mode={mode} toggleTheme={toggleTheme} />
    <Box component="main" sx={{ flexGrow: 1 }}>
      <Outlet />
    </Box>
    <Footer />
  </Box>
);

export default PublicLayout;
