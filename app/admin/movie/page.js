"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, Stack, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({ id: null, title: "", genre: "", duration: "", cast: "" });

  // Fetch movies from the API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/movies");
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const addOrUpdateMovie = async () => {
    if (newMovie.title && newMovie.genre && newMovie.duration && newMovie.cast) {
      if (newMovie.id) {
        // Update movie in the API
        try {
          const response = await fetch(`http://localhost:3000/api/movies/${newMovie.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newMovie),
          });
          const updatedMovie = await response.json();
          setMovies(movies.map(movie => (movie._id === updatedMovie._id ? updatedMovie : movie)));
          resetForm(); // Reset form after update
        } catch (error) {
          console.error("Error updating movie:", error);
        }
      } else {
        // Add new movie to the API
        try {
          const response = await fetch("http://localhost:3000/api/movies", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newMovie),
          });
          const newAddedMovie = await response.json();
          setMovies([...movies, newAddedMovie]);
          resetForm(); // Reset form after adding new movie
        } catch (error) {
          console.error("Error adding movie:", error);
        }
      }
    }
  };

  const deleteMovie = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/movies/${id}`, {
        method: "DELETE",
      });
      setMovies(movies.filter(movie => movie._id !== id));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const updateMovie = (id) => {
    const movieToUpdate = movies.find(movie => movie._id === id);
    setNewMovie({
      id: movieToUpdate._id,
      title: movieToUpdate.title,
      genre: movieToUpdate.genre,
      duration: movieToUpdate.duration,
      cast: movieToUpdate.cast,
    });
  };

  const resetForm = () => {
    setNewMovie({ id: null, title: "", genre: "", duration: "", cast: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={4}>
          <Typography variant="h6" gutterBottom>
            Movie Form
          </Typography>
          <Stack spacing={2}>
            <FormControl fullWidth>
              <TextField
                required
                id="movie-title"
                label="Title"
                name="title"
                value={newMovie.title}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                required
                id="movie-genre"
                label="Genre"
                name="genre"
                value={newMovie.genre}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                required
                id="movie-duration"
                label="Duration"
                name="duration"
                value={newMovie.duration}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                required
                id="movie-cast"
                label="Casts"
                name="cast"
                value={newMovie.cast}
                onChange={handleChange}
              />
            </FormControl>

            <Button variant="contained" onClick={addOrUpdateMovie}>
              {newMovie.id ? "Update" : "Add"} Movie
            </Button>
          </Stack>
        </Grid>

        <Grid size={7} offset={0.5}>
          <Typography variant="h6" gutterBottom>
            Movie List
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Genre</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Casts</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movies.map((movie) => (
                  <TableRow key={movie._id}>
                    <TableCell>{movie.title}</TableCell>
                    <TableCell>{movie.genre}</TableCell>
                    <TableCell>{movie.duration}</TableCell>
                    <TableCell>{movie.cast}</TableCell>
                    <TableCell>
                      <Button variant="outlined" color="primary" onClick={() => updateMovie(movie._id)}>
                        Update
                      </Button>
                      <Button variant="outlined" color="secondary" onClick={() => deleteMovie(movie._id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Movie;
