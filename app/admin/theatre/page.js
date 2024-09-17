"use client";

import { Box, Button, FormControl, Stack, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Theatre from "@/components/Theatre";
import { getSeats } from "@/lib/helpers/getSeats";
import { useState } from "react";

const TheatrePage = () => {
  const initialSeats = getSeats();
  const [Seats, setSeats] = useState(initialSeats);
  const [standardSeats, setStandardSeats] = useState(0);
  const [premiumSeats, setPremiumSeats] = useState(0);
  const [vipSeats, setVipSeats] = useState(0);

  const handleClick = () => {
    const newSeats = [
      ...Array.from({ length: standardSeats }, (_, index) => ({
        name: `Standard Seat ${Seats.length + index + 1}`,
        type: "Standard",
        isAvailable: true,
      })),
      ...Array.from({ length: premiumSeats }, (_, index) => ({
        name: `Premium Seat ${Seats.length + index + 1}`,
        type: "Premium",
        isAvailable: true,
      })),
      ...Array.from({ length: vipSeats }, (_, index) => ({
        name: `VIP Seat ${Seats.length + index + 1}`,
        type: "VIP",
        isAvailable: true,
      })),
    ];

    // Add new seats to existing seats
    setSeats([...newSeats]);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={4}>
          <Stack spacing={2}>
            <FormControl fullWidth required>
              <TextField required id="outlined-required" label="Theatre Name" />
            </FormControl>

            <FormControl fullWidth required>
              <TextField
                id="standard-seats"
                label="Number of Standard Seats"
                type="number"
                value={standardSeats}
                onChange={(e) => setStandardSeats(Number(e.target.value))}
              />
            </FormControl>

            <FormControl fullWidth required>
              <TextField
                id="premium-seats"
                label="Number of Premium Seats"
                type="number"
                value={premiumSeats}
                onChange={(e) => setPremiumSeats(Number(e.target.value))}
              />
            </FormControl>

            <FormControl fullWidth required>
              <TextField
                id="vip-seats"
                label="Number of VIP Seats"
                type="number"
                value={vipSeats}
                onChange={(e) => setVipSeats(Number(e.target.value))}
              />
            </FormControl>

            <Button variant="contained" onClick={handleClick}>
              Add
            </Button>
          </Stack>
        </Grid>

        <Grid size={6} offset={1}>
          <Theatre isadmin={true} seats={Seats} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TheatrePage;
