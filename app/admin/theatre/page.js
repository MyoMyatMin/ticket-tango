"use client";

import { Box, Button, FormControl, Stack, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Theatre from "@/components/Theatre";
import { getSeats } from "@/lib/helpers/getSeats";

const TheatrePage = () => {
  const seats = getSeats();

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
                id="outlined-number"
                label="Number of Standard Seats"
                type="number"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </FormControl>

            <FormControl fullWidth required>
              <TextField
                id="outlined-number"
                label="Number of Premium Seats"
                type="number"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </FormControl>

            <FormControl fullWidth required>
              <TextField
                id="outlined-number"
                label="Number of VIP Seats"
                type="number"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </FormControl>

            <Button variant="contained">Add</Button>
          </Stack>
        </Grid>

        <Grid size={6} offset={1}>
          <Theatre isadmin={true} seats={seats} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TheatrePage;
