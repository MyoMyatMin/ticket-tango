"use client"; 
import MoviePoster from "@/components/MoviePoster";
import React, { useState } from "react";
import { Table, TableBody, TableCell, Paper, TableRow, TableContainer, Typography, Box, Button, TextField, Stack } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useSearchParams } from "next/navigation";

const TicketPage = () => {
  const searchParams = useSearchParams();
  const seatNumber = searchParams.get("seatNumber");
  const selectedSeats = searchParams.get("selectedSeats");
  const total = searchParams.get("total");
  const [user, setUser] = useState('');

  const handlePaySubmit = async () => {
    const payload = {
      seats: Array.isArray(selectedSeats) ? selectedSeats : selectedSeats.split(','),
      price: parseFloat(total), 
      username: user,
    };

    // console.log(payload)

    try {
      const response = await fetch(`/api/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to send booking');
      }

      const data = await response.json();
      console.log('Booking successful:', data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  const handleChange = (e) => {
    const { value } = e.target
    setUser(value)
  }

  return (
      <Grid container spacing={4}>
        <Grid sx={{ paddingLeft:5, paddingRight: 4 }} size={4}>
        <br/>
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
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ border: "none" }}>
                      <Typography variant="h6">Title:</Typography>
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      <Typography variant="h6">Sample Movie</Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ border: "none" }}>
                      <Typography variant="h6">Theatre Name:</Typography>
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      <Typography variant="h6">Sample Theatre</Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ border: "none" }}>
                      <Typography variant="h6">Selected Seat:</Typography>
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      <Typography variant="h6">{seatNumber}</Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ border: "none" }}>
                      <Typography variant="h6">Date Time:</Typography>
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      <Typography variant="h6">12th Sept, 7:00 PM</Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ border: "none" }}>
                      <Typography variant="h6">Total:</Typography>
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      <Typography variant="h6">${total}</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <TextField 
              label="User"
              required
              fullWidth
              onChange={handleChange}
              />

            <Button variant="contained" onClick={handlePaySubmit}>Pay</Button> 
          </Stack>
        </Grid>
      </Grid>
  );
};

export default TicketPage;
