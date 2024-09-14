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
      paper: "#ffffff", 
    },  
    text: {  
      primary: "#FFD93D", 
      secondary: "#666666", 
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
  },  
});  

export default theme;