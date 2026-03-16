import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import QuotesPage from "./pages/QuotesPage";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import OutcomePage from "./pages/OutcomePage";
import RulesManagementPage from "./pages/RulesManagementPage";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { lightTheme, darkTheme } from "./theme/theme";
import React from "react";
import BackOfficeLoginPage from "./pages/BackOfficeLoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/AuthProvider";
import Sandbox from "./dev/Sandbox";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./context/AuthContext";
import ProductManagementPage from "./pages/ProductManagementPage";

function AppContent() {
  const { user } = useAuth();
  const location = useLocation();
  const [mode, setMode] = React.useState<"light" | "dark">(() => {
    return (localStorage.getItem("themeMode") as "light" | "dark") || "light";
  });
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const toggleTheme = () =>
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", next);
      return next;
    });
  const theme = mode === "light" ? lightTheme : darkTheme;
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            minWidth: 0,
            transition: "margin-left 0.3s ease",
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
