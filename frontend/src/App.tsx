import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import theme from "./theme/theme";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Container sx={{ mt: 4 }}>
          <AppRoutes />
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
