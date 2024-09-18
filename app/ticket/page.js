"use client"; 
import MoviePoster from "@/components/MoviePoster";
import React from "react";
import { Divider, Typography, Box, Button, TextField, Stack } from "@mui/material";
import Grid from '@mui/material/Grid2';

const TicketPage = () => {
  return (
      <Grid container spacing={4}>
        <Grid sx={{ paddingLeft:5, paddingRight: 4 }} size={4}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            ml: 4,
            mb: 4,
          }}
        >
          <MoviePoster imageUrl="https://image.tmdb.org/t/p/w500/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg" />
        </Box>
        </Grid>

        <Grid sx={{ paddingLeft: 2 }} size={5}>
          <br />
          <Stack spacing={4}>
            <Typography variant="h6">
              Title: Sample Movie
            </Typography>
            <Typography variant="h6">
              Theatre Name: Sample Theatre
            </Typography>
            <Typography variant="h6">
              Selected Seat: A1, A2
            </Typography>
            <Typography variant="h6">
              Date Time: 12th Sept, 7:00 PM
            </Typography>
            <Typography variant="h6">
              Total: $25
            </Typography>
            <Divider sx={{ borderColor: "secondary.main", marginX: 2, marginY: 2 }} />
            <TextField label="User" required fullWidth />
            <Button variant="contained">  
              Pay  
            </Button> 
          </Stack>
        </Grid>
      </Grid>
  );
};

export default TicketPage;
