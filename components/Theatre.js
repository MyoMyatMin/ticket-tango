"use client";
import Seat from "@/components/Seat";
import { useState } from "react";
import { Typography, Grid, Box } from "@mui/material";
import Screen from "@/components/Screen";

const seats = [
  {
    row: "M",
    seats: [
      { isAvailable: true },
      { isAvailable: false },
      { isAvailable: true },
      { isAvailable: true },
      { isAvailable: true },
      { isAvailable: true },
    ],
  },
  {
    row: "L",
    seats: [
      { isAvailable: true },
      { isAvailable: true },
      { isAvailable: false },
      { isAvailable: true },
      { isAvailable: true },
      { isAvailable: true },
    ],
  },
  {
    row: "K",
    seats: [
      { isAvailable: true },
      { isAvailable: true },
      { isAvailable: false },
      { isAvailable: true },
      { isAvailable: false },
      { isAvailable: true },
    ],
  },
  {
    row: "J",
    seats: [
      { isAvailable: true },
      { isAvailable: true },
      { isAvailable: true },
      { isAvailable: true },
      { isAvailable: true },
      { isAvailable: true },
    ],
  },
];

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelect = (row, seatNumber) => {
    const seat = `${row}${seatNumber}`;

    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  return (
    <Box>
      <Typography variant="h4" align="center">
        Select your seats
      </Typography>
      <Screen />

      <Grid container justifyContent="center" spacing={2} sx={{ marginTop: 2 }}>
        {seats.map((row, index) => (
          <Grid
            item
            key={index}
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid
              item
              container
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item>
                <Typography
                  variant="body1"
                  sx={{ minWidth: "30px", textAlign: "center" }}
                >
                  {row.row}
                </Typography>
              </Grid>

              {row.seats.map((seat, i) => (
                <Seat
                  key={i}
                  row={row.row}
                  seatNumber={i + 1}
                  isAvailable={seat.isAvailable}
                  isAccessible={seat.accessible}
                  price={seat.price}
                  onSelect={handleSeatSelect}
                />
              ))}

              <Grid item>
                <Typography
                  variant="body1"
                  sx={{ minWidth: "30px", textAlign: "center" }}
                >
                  {row.row}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>

      <Typography align="center" sx={{ marginTop: 2 }}>
        Selected Seats: {selectedSeats.join(", ")}
      </Typography>
    </Box>
  );
};

export default SeatSelection;
