"use client";
import Seat from "@/components/Seat";
import { useState } from "react";
import { Typography, Stack, Box } from "@mui/material";
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

      <Stack spacing={2} sx={{ marginTop: 2 }} alignItems="center">
        {seats.map((row, index) => (
          <Stack key={index} spacing={1} direction="row" alignItems="center">
            <Typography
              variant="body1"
              sx={{ minWidth: "30px", textAlign: "center" }}
            >
              {row.row}
            </Typography>

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

            <Typography
              variant="body1"
              sx={{ minWidth: "30px", textAlign: "center" }}
            >
              {row.row}
            </Typography>
          </Stack>
        ))}
      </Stack>

      <Typography align="center" sx={{ marginTop: 2 }}>
        Selected Seats: {selectedSeats.join(", ")}
      </Typography>
    </Box>
  );
};

export default SeatSelection;
