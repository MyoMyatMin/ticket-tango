"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // App Router's navigation
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";

export default function QuickSearch({ movies }) {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (selectedMovie) {
      const movie = movies.find((m) => m._id === selectedMovie);
      if (movie && movie.showtimes.length > 0) {
        setAvailableTimes(
          movie.showtimes.map((showtime) => ({
            id: showtime._id,
            date: new Date(showtime.date).toLocaleDateString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
            time: new Date(showtime.startTime).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }),
          }))
        );
      } else {
        setAvailableTimes([]);
      }
    } else {
      setAvailableTimes([]);
    }
  }, [selectedMovie, movies]);

  const handleReset = () => {
    setSelectedMovie("");
    setDateTime("");
  };

  const handleSubmit = () => {
    if (selectedMovie && dateTime) {
      const selectedTime = availableTimes.find((time) => time.id === dateTime);

      router.push(
        `/booking?movieid=${encodeURIComponent(
          selectedMovie
        )}&time=${encodeURIComponent(
          selectedTime.date + " " + selectedTime.time
        )}`
      );
    }
  };

  return (
    <>
      <Typography variant="h5" component="div" gutterBottom>
        Quick Search
      </Typography>
      <Card
        sx={{
          maxWidth: 400,
          margin: "auto",
          mt: 5,
          mb: 5,
          borderRadius: 2,
          boxShadow: 3,
          padding: 2,
          border: 1,
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="movie-label">Movie</InputLabel>
              <Select
                labelId="movie-label"
                value={selectedMovie}
                label="Movie"
                onChange={(e) => setSelectedMovie(e.target.value)} // Set movie _id
                sx={{ "& .MuiSelect-icon": { color: "#FF6B6B" } }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {movies.map((movie) => (
                  <MenuItem key={movie._id} value={movie._id}>
                    {" "}
                    {/* Use movie._id */}
                    {movie.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth disabled={!selectedMovie}>
              <InputLabel id="dateTime-label">Date and Time</InputLabel>
              <Select
                labelId="dateTime-label"
                value={dateTime}
                label="Date & Time"
                onChange={(e) => setDateTime(e.target.value)}
                sx={{ "& .MuiSelect-icon": { color: "#FF6B6B" } }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {availableTimes.length > 0 ? (
                  availableTimes.map((time) => (
                    <MenuItem key={time.id} value={time.id}>
                      {time.date} {time.time}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No times available</MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
          <Button onClick={handleReset} variant="outlined">
            Reset
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={!dateTime}
          >
            Go
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
