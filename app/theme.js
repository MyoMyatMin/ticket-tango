"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF6B6B",
    },
    secondary: {
      main: "#4ECDC4",
    },
    background: {
      default: "#1A1A2E",
      paper: "#1A1A2E",
    },
    text: {
      primary: "#FFD93D",
      secondary: "#e8e3e3",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#2196f3",
    },
    success: {
      main: "#4caf50",
    },
    disabled: {
      main: "#000000",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FF6B6B",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4ECDC4",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "red",
          },
        },
      },
    },
  },
});

export default theme;
