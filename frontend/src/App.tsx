import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Sandbox from "./dev/sandbox";

function App() {
  // state to manage theme:
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  // determine which theme to use based on state:
  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <AuthProvider>
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
          <BrowserRouter>
            <Navbar mode={mode} toggleTheme={toggleTheme} />
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
          </BrowserRouter>
        </Box>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
