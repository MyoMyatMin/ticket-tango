"use client";

import { useSearchParams } from "next/navigation"; // App Router's useSearchParams
import MoviePoster from "@/components/MoviePoster";
import Theatre from "@/components/Theatre";
import TimeSlot from "@/components/TimeSlot";
import {
  Box,
  Divider,
  Typography,
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { getSeats } from "@/lib/helpers/getSeats";
import { useEffect, useState } from "react";

const TheatrePage = () => {
  const [movie, setMovie] = useState(null);
  const seats = getSeats();
  const [availableTimes, setAvailableTimes] = useState([]);
  const searchParams = useSearchParams();
  const movieid = searchParams.get("movieid");
  const time = searchParams.get("time");

  useEffect(() => {
    async function fetchMovieData(movieID) {
      try {
        const response = await fetch(`/api/movies/${movieID}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const movieData = await response.json();
        setMovie(movieData);

        // Set available times only after fetching the movie data
        setAvailableTimes(
          movieData.showtimes.map((showtime) => new Date(showtime.startTime))
        );
      } catch (error) {
        console.error("Failed to fetch movie data:", error);
      }
    }

    if (movieid) {
      fetchMovieData(movieid);
    }
  }, [movieid]);
  console.log(availableTimes);

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
    "12:00 PM",
  ];

  if (!movie) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 5 }}>
          <Typography variant="h4" component="h2" textAlign="center">
            Loading...
          </Typography>
        </Box>
      </Container>
    );
  }

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
          {movie.title} {/* Display the selected movie */}
        </Typography>

        <Grid container spacing={2} sx={{ ml: 4, mb: 4 }}>
          <Grid item xs={12} md={4}>
            <MoviePoster imageUrl={movie.posterUrl} />
          </Grid>

          <Grid item xs={12} md={8} offset={0.4}>
            <br />
            <Typography variant="h6" gutterBottom>
              Details
            </Typography>
            <Table sx={{ width: "60%" }}>
              <TableBody>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ border: "none", color: "#fff" }}
                  >
                    Casts
                  </TableCell>
                  <TableCell sx={{ border: "none", color: "#fff" }}>
                    {movie.cast}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ border: "none", color: "#fff" }}
                  >
                    Genre
                  </TableCell>
                  <TableCell sx={{ border: "none", color: "#fff" }}>
                    {movie.genre}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ border: "none", color: "#fff" }}
                  >
                    Duration
                  </TableCell>
                  <TableCell sx={{ border: "none", color: "#fff" }}>
                    {movie.duration} mins
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ border: "none", color: "#fff" }}
                  >
                    Selected Showtime
                  </TableCell>
                  <TableCell sx={{ border: "none", color: "#fff" }}>
                    {time ? time : "No time selected"}
                  </TableCell>{" "}
                </TableRow>
              </TableBody>
            </Table>

            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Synopsis
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ maxWidth: "550px", color: "#ffff" }}
            >
              In a world where technology has advanced beyond imagination, a
              group of elite heroes must band together to protect humanity from
              an ancient threat.
            </Typography>
          </Grid>
        </Grid>

        <TimeSlot
          availableDates={availableTimes}
          timeSlots={timeSlots}
          selectedTime={time}
        />
        <Divider sx={{ borderColor: "primary.main", my: 4 }} />

        <Grid container spacing={2} sx={{ ml: 4, mb: 4 }}>
          <Grid size={7}>
            <Theatre isadmin={false} seats={seats} />
          </Grid>

          <Grid size={3} sx={{ ml: 4, mb: 8 }}>
            <Table>
              <TableBody sx={{ border: "2px solid #FF6B6B" }}>
                <TableRow>
                  <TableCell sx={{ border: "none" }}>
                    <Typography>Total Seats:</Typography>
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    <Typography>3</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: "none" }}>
                    <Typography>Selected Seats:</Typography>
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    <Typography>P6, P7, P8</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: "none" }}>
                    <Typography>Price:</Typography>
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    <Typography>$25</Typography>
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
