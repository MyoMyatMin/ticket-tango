"use client";

import React, { useState } from "react";
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

export default function QuickSearch() {
  const [theater, setTheater] = useState("");
  const [movie, setMovie] = useState("");
  const [dateTime, setDateTime] = useState("");

  const [availableTimes, setAvailableTimes] = useState([
    { id: 1, time: "Sun, 15 Sep 2024 10:00 AM" },
    { id: 2, time: "Sun, 15 Sep 2024 1:00 PM" },
    { id: 3, time: "Sun, 15 Sep 2024 4:00 PM" },
    { id: 4, time: "Sun, 15 Sep 2024 7:00 PM" },
    { id: 5, time: "Mon, 16 Sep 2024 10:00 AM" },
    { id: 6, time: "Mon, 16 Sep 2024 1:00 PM" },
    { id: 7, time: "Tue, 17 Sep 2024 4:00 PM" },
    { id: 8, time: "Tue, 17 Sep 2024 7:00 PM" },
  ]);

  const handleReset = () => {
    setTheater("");
    setMovie("");
    setDateTime("");
  };

  const handleSubmit = () => {
    console.log("Booking:", { theater, movie, dateTime });
  };

  const groupTimesByDate = () => {
    const groupedTimes = availableTimes.reduce((acc, current) => {
      const datePart = current.time.split(" ").slice(0, 4).join(" ");
      if (!acc[datePart]) {
        acc[datePart] = [];
      }
      acc[datePart].push(current);
      return acc;
    }, {});

    return groupedTimes;
  };

  const groupedTimes = groupTimesByDate();

  return (
    <>
      <Typography variant="h5" component="div" gutterBottom>
        Quick Search
      </Typography>
      <Card sx={{ maxWidth: 400, margin: "auto", mt: 5, mb: 5 }}>
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="theater-label">Theater</InputLabel>
              <Select
                labelId="theater-label"
                value={theater}
                label="Theater"
                onChange={(e) => setTheater(e.target.value)}
              >
                <MenuItem value="theater1">Theater 1</MenuItem>
                <MenuItem value="theater2">Theater 2</MenuItem>
                <MenuItem value="theater3">Theater 3</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="movie-label">Movie</InputLabel>
              <Select
                labelId="movie-label"
                value={movie}
                label="Movie"
                onChange={(e) => setMovie(e.target.value)}
              >
                <MenuItem value="movie1">Movie 1</MenuItem>
                <MenuItem value="movie2">Movie 2</MenuItem>
                <MenuItem value="movie3">Movie 3</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="dateTime-label">Date and Time</InputLabel>
              <Select
                native
                labelId="dateTime-label"
                value={dateTime}
                label="Date & Time"
                onChange={(e) => setDateTime(e.target.value)}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                      overflow: "auto",
                    },
                  },
                }}
              >
                <option aria-label="None" value="" />
                {Object.keys(groupedTimes).map((date) => (
                  <optgroup key={date} label={date}>
                    {groupedTimes[date].map((time) => (
                      <option key={time.id} value={time.id}>
                        {time.time}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </Select>
            </FormControl>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
          <Button onClick={handleReset} variant="outlined">
            Reset
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            Go
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
