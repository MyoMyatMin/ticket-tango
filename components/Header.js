"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Logo from "@/public/ticket-tango.svg";
import Image from "next/image";
import Link from "next/link";
import { Box } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "@/app/contexts/auth-context";

export default function Header() {
  const { isAuthenticated, handleLogout } = useContext(AuthContext);

  return (
    <AppBar position="sticky" color="primary" elevation={3}>
      <Toolbar sx={{ paddingX: 3 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, marginTop: "5px" }}
        >
          <Image src={Logo} alt="Ticket Tango" width={37} height={37} />
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} href="/">
            Home
          </Button>
          {!isAuthenticated && (
            <Button color="inherit" component={Link} href="/admin">
              Admin
            </Button>
          )}

          {isAuthenticated && (
            <>
              <Button color="inherit" component={Link} href="/admin/showtime">
                ShowTime
              </Button>
              <Button color="inherit" component={Link} href="/admin/movie">
                Movie
              </Button>
              <Button color="inherit" component={Link} href="/admin/theatre">
                Theatre
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
