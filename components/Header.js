import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Logo from "@/public/ticket-tango.svg";
import Image from "next/image";
import Link from "next/link";
import { Box } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="sticky" color="primary" elevation={3}>
      <Toolbar sx={{ paddingX: 3 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Image src={Logo} alt="Ticket Tango" width={50} height={50} />
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} href="/">
            Home
          </Button>
          <Button color="inherit" component={Link} href="/theatre">
            Theatre
          </Button>
          <Button color="inherit" component={Link} href="/ticket">
            Ticket
          </Button>
          <Button color="inherit" component={Link} href="/admin/showtime">
            Admin/ShowTime
          </Button>
          <Button color="inherit" component={Link} href="/admin/movie">
            Admin/Movie
          </Button>
          <Button color="inherit" component={Link} href="/admin/theatre">
            Admin/Theatre
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
