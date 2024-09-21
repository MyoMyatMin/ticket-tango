"use client";
import Seat from "@/components/Seat";
import { useState, useEffect } from "react";
import { Typography, Stack, Box, Button } from "@mui/material";
import Screen from "@/components/Screen";
import Grid from "@mui/material/Grid2";
import ChairIcon from "@mui/icons-material/Chair";
import { getSeats } from "@/lib/helpers/getSeats";

const Theatre = ({ isadmin, seats }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    // This code will run whenever the `seats` prop changes
    console.log("Seats updated:", seats);
    // Update any internal state or perform actions based on new seats
  }, [seats]);
  const handleSeatSelect = (seatNumber) => {
    const seat = `${seatNumber}`;

    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  return (
    <Box
      sx={{
        maxWidth: "600px",
      }}
    >
      <Screen />

      <Grid container spacing={4} direction="column" justifyContent="center">
        <Grid>
          <Grid container display="flex" justifyContent="center" spacing={2}>
            {seats
              .filter((seat) => seat.type === "standard")
              .map((seat, index) => (
                <Grid xs={6} key={index}>
                  <Seat
                    seatNumber={seat.name}
                    isAvailable={seat.isAvailable}
                    price={seat.price}
                    color={"primary"}
                    {...(!isadmin && { onSelect: handleSeatSelect })}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>

        <Grid>
          <Grid container display="flex" justifyContent="center" spacing={2}>
            {seats
              .filter((seat) => seat.type === "premium")
              .map((seat, index) => (
                <Grid xs={2} key={index}>
                  <Seat
                    seatNumber={seat.name}
                    isAvailable={seat.isAvailable}
                    price={seat.price}
                    color={"secondary"}
                    {...(!isadmin && { onSelect: handleSeatSelect })}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>

        <Grid>
          <Grid container display="flex" justifyContent="center" spacing={2}>
            {seats
              .filter((seat) => seat.type === "vip")
              .map((seat, index) => (
                <Grid xs={2} key={index}>
                  <Seat
                    seatNumber={seat.name}
                    isAvailable={seat.isAvailable}
                    price={seat.price}
                    color={"info"}
                    {...(!isadmin && { onSelect: handleSeatSelect })}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>

      <Box mt={4} display="flex" justifyContent="center">
        <Stack direction="row" spacing={4} alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <ChairIcon sx={{ color: "primary.main" }} />
            <Typography>Standard</Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <ChairIcon sx={{ color: "secondary.main" }} />
            <Typography>Premium</Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <ChairIcon sx={{ color: "info.main" }} />
            <Typography>VIP</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <ChairIcon sx={{ color: "disabled.main" }} />
            <Typography>Unavailable</Typography>
          </Stack>
        </Stack>
      </Box>
      {/* <Typography align="center" sx={{ marginTop: 2 }}>
        Selected Seats: {selectedSeats.join(", ")}
      </Typography> */}
    </Box>
  );
};

export default Theatre;
