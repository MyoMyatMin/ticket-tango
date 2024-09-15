"use client";

import { Box, Button, FormControl, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const Movie = () => {
  return (
    <Box sx={{ flexGrow: 1}}>
      <Grid container spacing={2}>

        <Grid size={6}>
          <Stack spacing={2}>
            <FormControl fullWidth>
              <TextField
                required
                id="movie-title"
                label="Title"
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                required
                id="movie-genre"
                label="Genre"
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                required
                id="movie-duration"
                label="Duration"
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                required
                id="movie-casts"
                label="Casts"
              />
            </FormControl>

            <Button variant="contained" sx={{ backgroundColor: '#f05a5a' }}>
              Add
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Movie;
