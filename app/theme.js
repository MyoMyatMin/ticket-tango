"use client";  
import { createTheme } from "@mui/material/styles";  

const theme = createTheme({  
  palette: {  
    primary: {  
      main: "#3F51B5", 
    },  
    secondary: {  
      main: "#E97171", 
    },  
    background: {  
      default: "#f4f6f8",  
      paper: "#ffffff", 
    },  
    text: {  
      primary: "#333333", 
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