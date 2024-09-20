import MoviePoster from "@/components/MoviePoster";
import Theatre from "@/components/Theatre";
import TimeSlot from "@/components/TimeSlot";
import { Box, Divider, Typography, Container, Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { getSeats } from "@/lib/helpers/getSeats";

const TheatrePage = () => {
  const seats = getSeats();
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const timeSlots = [
    "10:00 AM",
    "12:30 PM",
    "3:00 PM",
    "5:30 PM",
    "8:00 PM",
    "10:30 PM",
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 5 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          textAlign="start"
          ml={4}
          mb={4}
        >
          Movie Name
        </Typography>

        <Grid container spacing={2} sx={{ ml: 4, mb: 4 }}>
          <Grid item xs={12} md={4}>
            <MoviePoster imageUrl="https://image.tmdb.org/t/p/w500/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg" />
          </Grid>

          <Grid item xs={12} md={8} offset={0.4}>
            <br/>
            <Typography variant="h6" gutterBottom>
              Details
            </Typography>
            <Table sx={{ width:"60%" }}>
              <TableBody >
                <TableRow>
                  <TableCell component="th" scope="row"  sx={{border:"none", color: '#fff'}}>Casts</TableCell>
                  <TableCell  sx={{border:"none", color: '#fff'}}>James, Jason, Jhon, Jone</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" sx={{border:"none", color: '#fff'}}>Genre</TableCell>
                  <TableCell sx={{border:"none", color: '#fff'}}>Action, Adventure, Sci-Fi</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" sx={{border:"none", color: '#fff'}}>Release Date</TableCell>
                  <TableCell sx={{border:"none", color: '#fff'}}>2021-10-01</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" sx={{border:"none", color: '#fff'}}>Duration</TableCell>
                  <TableCell sx={{border:"none", color: '#fff'}}>120 minutes</TableCell>
                </TableRow>
              </TableBody>
            </Table>


            <Divider sx={{my: 2 }}/>

            <Typography variant="h6" gutterBottom>
              Synopsis
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ maxWidth: '550px', color: "#ffff"}}>
              In a world where technology has advanced beyond imagination, a group of elite heroes
              must band together to protect humanity from an ancient threat. As the fate of the 
              universe hangs in the balance.
            </Typography>
          </Grid>
        </Grid>

        <TimeSlot availableDates={availableDates} timeSlots={timeSlots} />

        <Divider sx={{ borderColor: "primary.main", my: 4 }} />

        <Grid container spacing={2} sx={{ ml: 4, mb: 4 }}>
          <Grid size={7}>
            <Theatre isadmin={false} seats={seats} />
          </Grid>

          <Grid size={3} sx={{ml: 4, mb: 8}}>
            <Table>
              <TableBody sx={{ border: "2px solid #FF6B6B" }}>
                <TableRow>
                  <TableCell sx={{ border: "none" }}>
                    <Typography >Total Seats:</Typography>
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    <Typography >3</Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ border: "none" }}>
                    <Typography >Selected Seats:</Typography>
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    <Typography >P6, P7, P8</Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ border: "none" }}>
                    <Typography >Price:</Typography>
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    <Typography >$25</Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ border: "none" }}>
                    <Button variant="contained" color="secondary">
                      Book Now
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>

        </Grid>
      </Box>
    </Container>
  );
};

export default TheatrePage;
