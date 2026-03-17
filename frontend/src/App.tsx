import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import QuotesPage from "./pages/QuotesPage";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import OutcomePage from "./pages/OutcomePage";
import RulesManagementPage from "./pages/RulesManagementPage";
import { ThemeProvider, CssBaseline, Box, useMediaQuery } from "@mui/material";
import { lightTheme, darkTheme } from "./theme/theme";
import React from "react";
import BackOfficeLoginPage from "./pages/BackOfficeLoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/AuthProvider";
import Sandbox from "./dev/Sandbox";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./context/AuthContext";
import ProductManagementPage from "./pages/ProductManagementPage";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

function AppContent() {
  const { user } = useAuth();
  const location = useLocation();
  const [mode, setMode] = React.useState<"light" | "dark">(() => {
    return (localStorage.getItem("themeMode") as "light" | "dark") || "light";
  });

  const theme = mode === "light" ? lightTheme : darkTheme;
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Sync sidebarOpen when screen size changes
  React.useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const toggleTheme = () =>
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", next);
      return next;
    });

  const isBackOffice = ["/rules", "/products-management"].some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
        {isBackOffice && !!user && (
          <Sidebar
            toggleSidebar={() => setSidebarOpen((prev) => !prev)}
            open={sidebarOpen}
            toggleTheme={toggleTheme}
            mode={mode}
          />
        )}
        {isBackOffice && !!user && isMobile && !sidebarOpen && (
          <IconButton
            onClick={() => setSidebarOpen(true)}
            sx={{
              position: "fixed",
              top: 12,
              left: 12,
              zIndex: 1200,
              bgcolor: "background.paper",
              boxShadow: 2,
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            minWidth: 0,
            width: 0,
          }}
        >
          {!isBackOffice && (
            <Navbar
              mode={mode}
              toggleTheme={toggleTheme}
              toggleSidebar={() => setSidebarOpen((prev) => !prev)}
              admin={isBackOffice}
            />
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quote" element={<QuotesPage />} />
            <Route path="/outcome" element={<OutcomePage />} />
            <Route path="/login" element={<BackOfficeLoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/rules" element={<RulesManagementPage />} />
              <Route path="/products-management" element={<ProductManagementPage />} />
            </Route>
            <Route path="/sandbox" element={<Sandbox />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          {!isBackOffice && <Footer />}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
