"use client";

import React, { useState } from "react";
import { Button, Typography, Box, Container, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function Component({ availableDates, timeSlots }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Select Date and Time
        </Typography>

        <Paper elevation={3} sx={{ my: 2, p: 2 }}>
          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              paddingY: 2,
              gap: 2,
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {availableDates.map((date) => (
              <Button
                key={date.toISOString()}
                variant={
                  selectedDate?.toDateString() === date.toDateString()
                    ? "contained"
                    : "outlined"
                }
                sx={{ minWidth: "100px", mx: 1 }}
                onClick={() => setSelectedDate(date)}
              >
                {formatDate(date)}
              </Button>
            ))}
          </Box>
        </Paper>

        {selectedDate && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Available Times for {formatDate(selectedDate)}
            </Typography>
            <Grid container spacing={2}>
              {timeSlots.map((time) => (
                <Grid item xs={6} sm={4} key={time}>
                  <Button variant="outlined" fullWidth>
                    {time}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
}
