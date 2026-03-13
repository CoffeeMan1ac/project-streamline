import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import QuotesPage from "./pages/QuotesPage";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AcceptPage from "./pages/AcceptPage";
import DeclinePage from "./pages/DeclinePage";
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

function AppContent() {
  const { user } = useAuth();
  const location = useLocation();
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleTheme = () => setMode((prev) => (prev === "light" ? "dark" : "light"));
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const theme = mode === "light" ? lightTheme : darkTheme;
  const isBackOffice = ["/rules", "/login"].some((path) => location.pathname.startsWith(path));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        <Navbar
          mode={mode}
          toggleTheme={toggleTheme}
          toggleSidebar={toggleSidebar}
          admin={isBackOffice}
        />
        {isBackOffice && !!user && sidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quote" element={<QuotesPage />} />
          <Route path="/accepted" element={<AcceptPage />} />
          <Route path="/declined" element={<DeclinePage />} />
          <Route path="/login" element={<BackOfficeLoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/rules" element={<RulesManagementPage />} />
          </Route>
          <Route path="/sandbox" element={<Sandbox />} />
        </Routes>
        <Footer />
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
