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
  TextField,
  Box,
  Typography,
} from "@mui/material";

export default function QuickSearch() {
  const [theater, setTheater] = useState("");
  const [movie, setMovie] = useState("");
  const [date, setDate] = useState(null);

  const handleReset = () => {
    setTheater("");
    setMovie("");
    setDate(null);
  };

  const handleSubmit = () => {
    console.log("Booking:", { theater, movie, date });
  };

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
