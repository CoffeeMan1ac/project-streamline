import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#0156a7", // blue
      light: "#0167b2", // light blue for backgrounds and accents
    },
    secondary: {
      main: "#9c27b0", // purple
    },
    background: {
      default: "#f9fafc", // light background
      paper: "#ffffff", // slightly lighter for cards and surfaces
    },
    success: {
      main: "#00a73d",
      light: "#dbfdea",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#02335e",
      light: "#003b68",
    },
    secondary: {
      main: "#9c27b0", // purple
    },

    background: {
      default: "#111727", // dark background
      paper: "#1d2937", // slightly lighter for cards and surfaces
    },
    success: {
      main: "#4CAF50",
      light: "#dbfdea",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});
