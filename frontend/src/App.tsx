import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme/theme";
import { AuthProvider } from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicLayout from "./layouts/PublicLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import Home from "./pages/Home";
import QuotesPage from "./pages/QuotesPage";
import RulesManagementPage from "./pages/RulesManagementPage";
import ProductManagementPage from "./pages/ProductManagementPage";
import BackOfficeLoginPage from "./pages/BackOfficeLoginPage";
import Sandbox from "./dev/Sandbox";
import OutcomePage from "./pages/OutcomePage";
import QuotesManagementPage from "./pages/QuotesManagementPage";
import QuoteDetailsPage from "./pages/QuoteDetailsPage";
import TagsManagementPage from "./pages/TagsManagementPage";
import CoveragesManagementPage from "./pages/CoveragesManagementPage";

function AppContent() {
  const [mode, setMode] = useState<"light" | "dark">(
    () => (localStorage.getItem("themeMode") as "light" | "dark") || "light"
  );

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", next);
      return next;
    });
  };

  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route element={<PublicLayout mode={mode} toggleTheme={toggleTheme} />}>
          <Route path="/" element={<Home />} />
          <Route path="/quote" element={<QuotesPage />} />
          <Route path="/outcome" element={<OutcomePage />} />
          <Route path="/login" element={<BackOfficeLoginPage />} />
          <Route path="/sandbox" element={<Sandbox />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            element={
              <ProtectedLayout
                mode={mode}
                toggleTheme={toggleTheme}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
            }
          >
            <Route path="/rules" element={<RulesManagementPage />} />
            <Route path="/products" element={<ProductManagementPage />} />
            <Route path="/quotes" element={<QuotesManagementPage />} />
            <Route path="/quotations/:id" element={<QuoteDetailsPage />} />
            <Route path="/tags" element={<TagsManagementPage />} />
            <Route path="/coverages" element={<CoveragesManagementPage />} />

          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
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
