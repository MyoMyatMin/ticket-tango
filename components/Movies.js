"use client";
import React from "react";
import MovieCard from "./MovieCard";
import { Container, Box } from "@mui/material";
import { Typography } from "@mui/material";

const Movies = ({ movies }) => {
  // console.log(movies)

  return (
    <Container
      maxWidth="lg"
      sx={{ paddingY: 4, backgroundColor: "background.default" }}
    >
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 600, color: "text.primary" }}
      >
        Current Movies
      </Typography>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          paddingY: 2,
          gap: 2,
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {movies
        .filter(movie => movie.isOngoing)
        .map((movie, index) => (
          <MovieCard key={index} {...movie} />
        ))}
      </Box>

      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 600, marginTop: 4, color: "text.primary" }}
      >
        Coming Soon
      </Typography>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          paddingY: 2,
          gap: 2,
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {movies
        .filter(movie => movie.isOngoing == false)
        .map((movie, index) => (
          <MovieCard key={index} {...movie} isOngoing={movie.isOngoing} />
        ))}
      </Box>
    </Container>
  );
};

export default Movies;
