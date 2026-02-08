import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0156a7", // blue
      light: "#0167b2", // light blue for backgrounds and accents
    },
    secondary: {
      main: "#9c27b0", // purple
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export default theme;
