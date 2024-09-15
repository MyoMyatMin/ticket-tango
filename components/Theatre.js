"use client";
import Seat from "@/components/Seat";
import { useState } from "react";
import { Typography, Stack, Box, Button } from "@mui/material";
import Screen from "@/components/Screen";
import Grid from '@mui/material/Grid2';

const seats =  [
  {
    "_id": "66e52846692f74b51e943f07",
    "name": "Standard Seat 1",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f08",
    "name": "Standard Seat 2",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f09",
    "name": "Standard Seat 3",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f0a",
    "name": "Standard Seat 4",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f0b",
    "name": "Standard Seat 5",
    "type": "Standard",
    "isAvailable": false,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f0c",
    "name": "Standard Seat 6",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f0d",
    "name": "Standard Seat 7",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f0e",
    "name": "Standard Seat 8",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f0f",
    "name": "Standard Seat 9",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f10",
    "name": "Standard Seat 10",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f11",
    "name": "Standard Seat 11",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f12",
    "name": "Standard Seat 12",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f13",
    "name": "Standard Seat 13",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f14",
    "name": "Standard Seat 14",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f15",
    "name": "Standard Seat 15",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f16",
    "name": "Standard Seat 16",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f17",
    "name": "Standard Seat 17",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f18",
    "name": "Standard Seat 18",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f19",
    "name": "Standard Seat 19",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f1a",
    "name": "Standard Seat 20",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f1b",
    "name": "Standard Seat 21",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f1c",
    "name": "Standard Seat 22",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f1d",
    "name": "Standard Seat 23",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f1e",
    "name": "Standard Seat 24",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f1f",
    "name": "Standard Seat 25",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f20",
    "name": "Standard Seat 26",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f21",
    "name": "Standard Seat 27",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f22",
    "name": "Standard Seat 28",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f23",
    "name": "Standard Seat 29",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f24",
    "name": "Standard Seat 30",
    "type": "Standard",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f25",
    "name": "Premium Seat 1",
    "type": "Premium",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f26",
    "name": "Premium Seat 2",
    "type": "Premium",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f27",
    "name": "Premium Seat 3",
    "type": "Premium",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f28",
    "name": "Premium Seat 4",
    "type": "Premium",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f29",
    "name": "Premium Seat 5",
    "type": "Premium",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f2a",
    "name": "Premium Seat 6",
    "type": "Premium",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f2b",
    "name": "Premium Seat 7",
    "type": "Premium",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f2c",
    "name": "Premium Seat 8",
    "type": "Premium",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f2d",
    "name": "Premium Seat 9",
    "type": "Premium",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f2e",
    "name": "Premium Seat 10",
    "type": "Premium",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f2f",
    "name": "Premium Seat 11",
    "type": "Premium",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f30",
    "name": "Premium Seat 12",
    "type": "Premium",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f31",
    "name": "Premium Seat 13",
    "type": "Premium",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f32",
    "name": "Premium Seat 14",
    "type": "Premium",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f33",
    "name": "Premium Seat 15",
    "type": "Premium",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f34",
    "name": "Premium Seat 16",
    "type": "Premium",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f35",
    "name": "Premium Seat 17",
    "type": "Premium",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f36",
    "name": "Premium Seat 18",
    "type": "Premium",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f37",
    "name": "Premium Seat 19",
    "type": "Premium",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f38",
    "name": "Premium Seat 20",
    "type": "Premium",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f39",
    "name": "VIP Seat 1",
    "type": "VIP",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f3a",
    "name": "VIP Seat 2",
    "type": "VIP",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f3b",
    "name": "VIP Seat 3",
    "type": "VIP",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f3c",
    "name": "VIP Seat 4",
    "type": "VIP",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f3d",
    "name": "VIP Seat 5",
    "type": "VIP",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f3e",
    "name": "VIP Seat 6",
    "type": "VIP",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f3f",
    "name": "VIP Seat 7",
    "type": "VIP",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f40",
    "name": "VIP Seat 8",
    "type": "VIP",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f41",
    "name": "VIP Seat 9",
    "type": "VIP",
    "isAvailable": true,
    "__v": 0
  },
  {
    "_id": "66e52846692f74b51e943f42",
    "name": "VIP Seat 10",
    "type": "VIP",
    "isAvailable": true,
    "__v": 0
  }
]

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelect = (seatNumber) => {
    const seat = `${seatNumber}`;

    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  return (
    <Box sx={{
      maxWidth: '600px'
    }}>
      <Screen />

      <Grid container spacing={4} justifyContent="center">
        <Grid item>
          <Grid container display="flex" justifyContent="center" spacing={2}>
            {seats
              .filter(seat => seat.type === 'Standard')
              .map((seat, index) => (
                <Grid item xs={6} key={index}>
                  <Seat
                    seatNumber={seat.name}
                    isAvailable={seat.isAvailable}
                    price={seat.price}
                    color={"primary"}
                    onSelect={handleSeatSelect}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>

        <Grid item>
          <Grid container display="flex" justifyContent="center" spacing={2}>
            {seats
              .filter(seat => seat.type === 'Premium')
              .map((seat, index) => (
                <Grid item xs={2} key={index}>
                  <Seat
                    seatNumber={seat.name}
                    isAvailable={seat.isAvailable}
                    price={seat.price}
                    color={"secondary"}
                    onSelect={handleSeatSelect}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>

        <Grid item>
          <Grid container display="flex" justifyContent="center" spacing={2}>
            {seats
              .filter(seat => seat.type === 'VIP')
              .map((seat, index) => (
                <Grid item xs={2} key={index}>
                  <Seat
                    seatNumber={seat.name}
                    isAvailable={seat.isAvailable}
                    price={seat.price}
                    color={"info"}
                    onSelect={handleSeatSelect}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
        
      </Grid>

      {/* <Typography align="center" sx={{ marginTop: 2 }}>
        Selected Seats: {selectedSeats.join(", ")}
      </Typography> */}
    </Box>
  );
};

export default SeatSelection;
