"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid2";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function Component() {
  useAuthGuard();

  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    id: null,
    title: "",
    genre: "",
    duration: "",
    cast: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("/api/booking");
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const previewUrl = URL.createObjectURL(selectedImage);
      setImage(selectedImage);
      setImagePreview(previewUrl);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const addOrUpdateMovie = async () => {
    if (
      newMovie.title &&
      newMovie.genre &&
      newMovie.duration &&
      newMovie.cast
    ) {
      setLoading(true);
      let posterUrl = null;

      if (image) {
        try {
          posterUrl = await convertImageToBase64(image);
        } catch (error) {
          console.error("Error converting image to Base64:", error);
          setLoading(false);
          return;
        }
      }

      const movieData = {
        ...newMovie,
        posterUrl,
      };

      try {
        const response = await fetch(`/api/movies/${newMovie.id || ""}`, {
          method: newMovie.id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(movieData),
        });

        const result = await response.json();

        if (response.ok) {
          if (newMovie.id) {
            let newResult = result;
            let findShowtimes = movies.find(
              (movie) => movie._id === newMovie.id
            );
            if (findShowtimes) {
              newResult.showtimes = findShowtimes.showtimes;
            }

            setMovies((prevMovies) =>
              prevMovies.map((movie) =>
                movie._id === newResult._id ? newResult : movie
              )
            );
          } else {
            setMovies((prevMovies) => [...prevMovies, result]);
          }
          resetForm();
        } else {
          console.error("Error adding/updating movie:", result.error);
        }
      } catch (error) {
        console.error("Error adding/updating movie:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  const deleteMovie = async (id) => {
    try {
      const response = await fetch(`/api/movies/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const result = await response.json();
        setMovies((prevMovies) => {
          const updatedMovies = prevMovies.filter((movie) => movie._id !== id);
          return updatedMovies;
        });
      } else {
        const errorResult = await response.json();
        console.error("Failed to delete movie:", errorResult.error);
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const updateMovie = (id) => {
    const movieToUpdate = movies.find((movie) => movie._id === id);
    setNewMovie({
      id: movieToUpdate._id,
      title: movieToUpdate.title,
      genre: movieToUpdate.genre,
      duration: movieToUpdate.duration,
      cast: movieToUpdate.cast,
    });
    setImagePreview(movieToUpdate.posterUrl);
  };

  const resetForm = () => {
    setNewMovie({ id: null, title: "", genre: "", duration: "", cast: "" });
    setImage(null);
    setImagePreview(null);
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
            <FormControl fullWidth>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </FormControl>
            {imagePreview && (
              <Box sx={{ mb: 2, position: "relative" }}>
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  style={{ width: "100%", height: "auto" }}
                />
                <IconButton
                  onClick={removeImage}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: "white",
                    backgroundColor: "red",
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
            <Button variant="contained" onClick={addOrUpdateMovie}>
              {loading
                ? "is Loading...."
                : newMovie.id
                ? "Update Movie"
                : "Add Movie"}
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
                    <TableCell sx={{ width: '300px' }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => updateMovie(movie._id)}
                        sx={{
                          marginRight: 1,
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => deleteMovie(movie._id)}
                        disabled={movie.showtimes && movie.showtimes.length > 0}
                        sx={{
                          backgroundColor:
                            movie.showtimes && movie.showtimes.length > 0
                              ? "secondary.main"
                              : undefined,
                          color: "white",
                          "&.Mui-disabled": {
                            backgroundColor: "secondary.main",
                            color: "white",
                            opacity: 0.8,
                          },
                        }}
                      >
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
}
