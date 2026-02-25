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

function App() {
  // state to manage theme:
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  // determine which theme to use based on state:
  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = mode === "light" ? lightTheme : darkTheme;

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
        <BrowserRouter>
          <Navbar mode={mode} toggleTheme={toggleTheme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quote" element={<QuotesPage />} />
            <Route path="/rules-management" element={<RulesManagementPage />} />
            <Route path="/accepted" element={<AcceptPage />} />
            <Route path="/declined" element={<DeclinePage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
