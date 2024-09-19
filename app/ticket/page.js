"use client"; 
import MoviePoster from "@/components/MoviePoster";
import React from "react";
import { Table, TableBody, TableCell, Paper, TableRow, TableContainer, Typography, Box, Button, TextField, Stack } from "@mui/material";
import Grid from '@mui/material/Grid2';

const TicketPage = () => {
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
                      <Typography variant="h6">A1, A2</Typography>
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
                      <Typography variant="h6">$25</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <TextField label="User" required fullWidth />

            <Button variant="contained">Pay</Button> 
          </Stack>
        </Grid>
      </Grid>
  );
};

export default TicketPage;
