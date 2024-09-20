"use client";

import React, { useState, useEffect } from "react";
import { Button, Typography, Box, Container, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function Component({ availableDates, timeSlots, selectedTime }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  // Automatically select the first available date or use the provided selectedTime to choose a date
  useEffect(() => {
    if (availableDates && availableDates.length > 0) {
      // Check if the selectedTime has a valid date in availableDates
      const selectedDateFromTime = availableDates.find(
        (date) => formatDate(date) === formatDate(new Date(selectedTime))
      );
      setSelectedDate(selectedDateFromTime || availableDates[0]);
    }
  }, [availableDates, selectedTime]);

  // Automatically select the provided selectedTime or the first available time slot
  useEffect(() => {
    if (selectedDate && timeSlots && timeSlots.length > 0) {
      const formattedSelectedTime = new Date(selectedTime).toLocaleTimeString(
        "en-US",
        { hour: "numeric", minute: "numeric", hour12: true }
      );

      // Check if the provided selectedTime is a valid time slot
      const matchingTimeSlot = timeSlots.find(
        (time) => time === formattedSelectedTime
      );
      setSelectedTimeSlot(matchingTimeSlot || timeSlots[0]);
    }
  }, [selectedDate, timeSlots, selectedTime]);

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
                  <Button
                    variant={
                      selectedTimeSlot === time ? "contained" : "outlined"
                    }
                    fullWidth
                    onClick={() => setSelectedTimeSlot(time)}
                  >
                    {time}
                  </Button>
                </Grid>
              ))}
            </Grid>

            {selectedTimeSlot && (
              <Typography
                variant="subtitle1"
                sx={{ mt: 2, fontWeight: "bold", color: "green" }}
              >
                Selected Time Slot: {selectedTimeSlot}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
}
