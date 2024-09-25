import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import Header from "../components/Header";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import theme from "./theme";
import { Shortcut } from "@mui/icons-material";

export const metadata = {
  title: "My Next.js App",
  description: "This is a Next.js app",
  icons:{
    icon:[
      '/favicon.co',
    ],
    apple:[
       '/apple-touch-icon.png',
    ],
    shortcut:[
      '/apple-touch-icon.png',
    ]
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Box
              component="main"
              sx={{
                padding: 4,
                // backgroundColor: "background.default",
                // minHeight: "100vh",
              }}
            >
              {children}
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
