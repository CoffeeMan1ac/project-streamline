import { ThemeProvider, CssBaseline, Container, Typography } from "@mui/material";
import theme from "./theme/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* resets browser styling */}
      <Container>
        <Typography variant="h4" sx={{ mt: 4 }}>
          Hello World
        </Typography>
      </Container>
    </ThemeProvider>
  );
};

export default App;
