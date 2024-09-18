"use client"; 
import React from "react";
import { Divider, Typography, Box, Button, TextField, Stack } from "@mui/material";
import Grid from '@mui/material/Grid2';

const TicketPage = () => {
  return (
      <Grid container spacing={4}>
        <Grid sx={{ paddingLeft:5, paddingRight: 4 }} size={4}>
          <Box
            component="img"
            src="https://via.placeholder.com/150" 
            alt="Movie Poster"
            sx={{
              width: "100%",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          />
        </Grid>

        <Grid sx={{ paddingLeft: 2 }} size={5}>
          <br />
          <Stack spacing={4}>
            <Typography>
              Title: Sample Movie
            </Typography>
            <Typography>
              Theatre Name: Sample Theatre
            </Typography>
            <Typography>
              Selected Seat: A1, A2
            </Typography>
            <Typography>
              Date Time: 12th Sept, 7:00 PM
            </Typography>
            <Typography>
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
