"use client";

import MoviePoster from "@/components/MoviePoster";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  Paper,
  TableRow,
  TableContainer,
  Typography,
  Box,
  Button,
  TextField,
  Stack,
  Snackbar,
  Alert,
  Container,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

export default function TicketPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [user, setUser] = useState("");
  const [theatre, setTheatre] = useState("");
  const [movieUrl, setMovieUrl] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [timeslot, setTimeslot] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const seatNumber = searchParams.get("seatNumber");
  const selectedSeats = searchParams.get("selectedSeats");
  const total = searchParams.get("total");
  const showtimeid = searchParams.get("showtimeid");

  useEffect(() => {
    const fetchShowtime = async () => {
      try {
        const response = await fetch(`/api/showtimes/${showtimeid}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const showtime = await response.json();
        setTheatre(showtime.theatre.name);
        setMovieTitle(showtime.movie.title);
        setMovieUrl(showtime.movie.posterUrl);

        const time = formatDateTime(showtime.startTime, showtime.date);
        setTimeslot(time);
      } catch (error) {
        console.error("Failed to fetch movie data:", error);
      }
    };
    fetchShowtime();
  }, [showtimeid]);

  const handlePaySubmit = async () => {
    const payload = {
      seats: Array.isArray(selectedSeats)
        ? selectedSeats
        : selectedSeats.split(","),
      price: parseFloat(total),
      username: user,
    };

    try {
      const response = await fetch(`/api/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to send booking");
      }

      const data = await response.json();

      setPaymentSuccess(true);
      setSnackbarOpen(true);

      const ticketContent = `
      Movie: ${movieTitle}
      Theatre: ${theatre}
      Seats: ${seatNumber}
      Total: $${total}
      User: ${user}
      Showtime: ${timeslot}
      `;

      const blob = new Blob([ticketContent], { type: "text/plain" });
      const downloadUrl = URL.createObjectURL(blob);
      setDownloadUrl(downloadUrl);

      setTimeout(() => {
        const downloadLink = document.createElement("a");
        downloadLink.href = downloadUrl;
        downloadLink.download = "ticket.txt";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }, 2000);

      setTimeout(() => {
        router.back();
      }, 2000);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setUser(value);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const formatDateTime = (time, date) => {
    return `${formatDate(date)} ${formatTime(time)}`;
  };

  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={4}
        marginTop={4}
        justifyContent="center"
        alignItems="center"
      >
        <Grid xs={12} md={4}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <MoviePoster imageUrl={movieUrl} />
          </Box>
        </Grid>
        <Grid xs={12} md={8}>
          <Stack spacing={4}>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ border: "none" }}>
                      <Typography variant="h6">Title:</Typography>
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      <Typography variant="h6">{movieTitle}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: "none" }}>
                      <Typography variant="h6">Theatre Name:</Typography>
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      <Typography variant="h6">{theatre}</Typography>
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
                      <Typography variant="h6">{timeslot}</Typography>
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
            <Button variant="contained" onClick={handlePaySubmit}>
              Pay
            </Button>
            {paymentSuccess && (
              <Typography variant="h6" color="success.main" sx={{ mt: 2 }}>
                Payment successful! Your ticket will be downloaded shortly.
              </Typography>
            )}
          </Stack>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={10000}
        onClose={handleSnackbarClose}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Payment successful! Your ticket is being prepared for download.
        </Alert>
      </Snackbar>
    </Container>
  );
}

function TicketPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TicketPage />
    </Suspense>
  );
}
