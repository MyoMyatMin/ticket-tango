"use client";
import { useSearchParams } from "next/navigation";
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
import { useEffect, useState, Suspense } from "react";

const TheatrePage = () => {
  const [movie, setMovie] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [filterSelectedTime, setFilterSelectedTime] = useState(null);
  const [theatreName, setTheatreName] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [seats, setSeats] = useState([]);
  const [price, setPrice] = useState(null);
  const [showtimeid, setShowtimeid] = useState(null);
  const searchParams = useSearchParams();
  const movieid = searchParams.get("movieid");
  const time = searchParams.get("time");

  useEffect(() => {
    async function fetchMovieData(movieID) {
      try {
        const response = await fetch(`/api/booking/${movieID}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const movieData = await response.json();

        setMovie(movieData);

        setAvailableTimes(
          movieData.showtimes.map((showtime) => ({
            date: showtime.date,
            time: showtime.startTime,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch movie data:", error);
      }
    }

    if (movieid) {
      fetchMovieData(movieid);
    }
  }, [movieid]);

  function filterAvailableDates(availableDates, targetDate, targetTime) {
    const targetDateString = new Date(targetDate).toISOString().split("T")[0];

    const timeParts = targetTime.match(/(\d+):(\d+)\s?(AM|PM)/i);
    if (!timeParts) {
      throw new Error("Invalid time format. Please use format like '3:00 AM'.");
    }

    let hours = parseInt(timeParts[1], 10);
    const minutes = parseInt(timeParts[2], 10);
    const period = timeParts[3].toUpperCase();

    if (period === "PM" && hours < 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    const targetTimeDate = new Date(targetDate);
    targetTimeDate.setHours(hours);
    targetTimeDate.setMinutes(minutes);
    targetTimeDate.setSeconds(0);

    const targetTimeString = targetTimeDate.toISOString().split("T")[1];

    return availableDates.filter((dateObj) => {
      const availableDate = new Date(dateObj.date).toISOString().split("T")[0];
      const availableTime = new Date(dateObj.time).toISOString().split("T")[1];

      return (
        availableDate === targetDateString && availableTime === targetTimeString
      );
    });
  }
  function filterMovieByShowtime(movie, filter) {
    return movie.showtimes.filter((showtime) => {
      const showtimeDate = new Date(showtime.date).toISOString();
      const showtimeStartTime = new Date(showtime.startTime).toISOString();

      return (
        showtimeDate === new Date(filter.date).toISOString() &&
        showtimeStartTime === new Date(filter.time).toISOString()
      );
    });
  }

  const handleTimeSlotChange = ({ time, date }) => {
    const filteredDates = filterAvailableDates(availableTimes, date, time);

    if (filteredDates.length > 0) {
      const selectedFilter = filteredDates[0];
      setSelectedTimeSlot(selectedFilter.date);
      setFilterSelectedTime(selectedFilter);

      // console.log("Selected time slot:", selectedFilter);

      const filteredShowtimes = filterMovieByShowtime(movie, selectedFilter);

      if (filteredShowtimes.length > 0) {
        // console.log("Matching showtimes found:", filteredShowtimes[0].theatre);

        // console.log(filteredShowtimes[0].price)
        setPrice(filteredShowtimes[0].price);
        setTheatreName(filteredShowtimes[0].theatre);
        setSeats(filteredShowtimes[0].seats);
        setShowtimeid(filteredShowtimes[0]._id);

        // console.log("Seats:", filteredShowtimes[0].seats);
      } else {
        // console.log("No matching showtimes found.");
        setTheatreName(null);
      }
    } else {
      console.error("No matching dates or times found.");
      setSelectedTimeSlot(null);
      setFilterSelectedTime(null);
      setTheatreName(null);
    }
  };

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
      <Box
        sx={{
          py: 5,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          textAlign={"center"}
          mb={4}
        >
          {movie.title}
        </Typography>

        <Grid container spacing={10} sx={{ mb: 4, justifyContent: "center" }}>
          <Grid xs={12} md={4}>
            <MoviePoster imageUrl={movie.posterUrl} />
          </Grid>

          <Grid xs={12} md={8}>
            <br />
            <Typography variant="h6" gutterBottom>
              Details
            </Typography>
            <Table sx={{ width: "100%" }}>
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
                    {selectedTimeSlot || "No time selected"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ border: "none", color: "#fff" }}
                  >
                    Selected Theatre
                  </TableCell>
                  <TableCell sx={{ border: "none", color: "#fff" }}>
                    {theatreName?.name || "No theatre selected"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Divider sx={{ my: 2 }} />
          </Grid>
        </Grid>

        <TimeSlot
          availableDates={availableTimes}
          selectedTime={time || null}
          onTimeSlotChange={handleTimeSlotChange}
        />
        <Divider sx={{ borderColor: "primary.main", my: 4 }} />

        <Theatre
          price={price}
          seats={seats}
          movieid={movieid}
          showtimeid={showtimeid}
        />
      </Box>
    </Container>
  );
};

const TheatrePageWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TheatrePage />
    </Suspense>
  );
};

export default TheatrePageWithSuspense;
