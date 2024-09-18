"use client";  

import React, { useState } from "react";  
import { Box, Button, FormControl, Stack, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";  
import Grid from "@mui/material/Grid";  

const initialMovies = [  
  { id: 1, title: "Inception", genre: "Sci-Fi", duration: "148 mins", casts: "Leonardo DiCaprio, Joseph Gordon-Levitt" },  
  { id: 2, title: "The Godfather", genre: "Crime", duration: "175 mins", casts: "Marlon Brando, Al Pacino" },  
];  

const Movie = () => {  
  const [movies, setMovies] = useState(initialMovies);  
  const [newMovie, setNewMovie] = useState({ id: null, title: "", genre: "", duration: "", casts: "" });  

  const addMovie = () => {  
    if (newMovie.title && newMovie.genre && newMovie.duration && newMovie.casts) {  
      if (newMovie.id) {  
        // Update existing movie  
        setMovies(movies.map(movie =>   
          movie.id === newMovie.id ? { ...newMovie } : movie  
        ));  
      } else {  
        // Add new movie  
        const newId = movies.length ? movies[movies.length - 1].id + 1 : 1; // simple ID generation  
        setMovies([...movies, { id: newId, ...newMovie }]);  
      }  
      resetForm();  
    }  
  };  

  const deleteMovie = (id) => {  
    setMovies(movies.filter(movie => movie.id !== id));  
  };  

  const updateMovie = (id) => {  
    const movieToUpdate = movies.find(movie => movie.id === id);  
    setNewMovie(movieToUpdate); // Set the movie data to the form to edit  
  };  

  const resetForm = () => {  
    setNewMovie({ id: null, title: "", genre: "", duration: "", casts: "" }); // Reset form  
  };  

  const handleChange = (e) => {  
    const { name, value } = e.target;  
    setNewMovie({ ...newMovie, [name]: value });  
  };  

  return (  
    <Box sx={{ flexGrow: 1 }}>  
      <Grid container spacing={6}>  
        <Grid item xs={12}>  
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
                id="movie-casts"  
                label="Casts"  
                name="casts"  
                value={newMovie.casts}  
                onChange={handleChange}  
              />  
            </FormControl>  

            <Button variant="contained" onClick={addMovie}>  
              {newMovie.id ? "Update" : "Add"} Movie  
            </Button>  
          </Stack>  
        </Grid>  

        <Grid item xs={12}>  
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
                  <TableRow key={movie.id}>  
                    <TableCell>{movie.title}</TableCell>  
                    <TableCell>{movie.genre}</TableCell>  
                    <TableCell>{movie.duration}</TableCell>  
                    <TableCell>{movie.casts}</TableCell>  
                    <TableCell>  
                      <Button variant="outlined" color="primary" onClick={() => updateMovie(movie.id)}>  
                        Update  
                      </Button>  
                      <Button variant="outlined" color="secondary" onClick={() => deleteMovie(movie.id)}>  
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