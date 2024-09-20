"use client";

import React, { useState, useEffect } from "react";
import { Button, Typography, Box, Container, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function Component({ availableDates, selectedTime }) {
  const [uniqueDatesWithTimeSlots, setUniqueDatesWithTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const groupDatesWithTimeSlots = (dates) => {
    const grouped = {};

    dates.forEach((date) => {
      const day = date.toDateString();
      const time = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      if (!grouped[day]) {
        grouped[day] = {
          date: date,
          timeSlots: [time],
        };
      } else {
        grouped[day].timeSlots.push(time);
      }
    });

    return Object.values(grouped);
  };

  useEffect(() => {
    if (availableDates && availableDates.length > 0) {
      const groupedDates = groupDatesWithTimeSlots(availableDates);
      setUniqueDatesWithTimeSlots(groupedDates);

      if (!selectedDate && groupedDates.length > 0) {
        setSelectedDate(groupedDates[0].date);
      }
    }
  }, [availableDates]);

  useEffect(() => {
    if (selectedDate && uniqueDatesWithTimeSlots.length > 0) {
      const formattedSelectedTime = new Date(selectedTime).toLocaleTimeString(
        "en-US",
        { hour: "numeric", minute: "numeric", hour12: true }
      );

      const selectedDateEntry = uniqueDatesWithTimeSlots.find(
        (entry) => entry.date.toDateString() === selectedDate.toDateString()
      );

      if (selectedDateEntry) {
        const matchingTimeSlot = selectedDateEntry.timeSlots.find(
          (time) => time === formattedSelectedTime
        );
        setSelectedTimeSlot(matchingTimeSlot || selectedDateEntry.timeSlots[0]);
      }
    }
  }, [selectedDate, uniqueDatesWithTimeSlots, selectedTime]);

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
            {uniqueDatesWithTimeSlots.map((entry) => (
              <Button
                key={entry.date.toISOString()}
                variant={
                  selectedDate?.toDateString() === entry.date.toDateString()
                    ? "contained"
                    : "outlined"
                }
                sx={{ minWidth: "100px", mx: 1 }}
                onClick={() => setSelectedDate(entry.date)}
              >
                {formatDate(entry.date)}
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
              {uniqueDatesWithTimeSlots
                .find(
                  (entry) =>
                    entry.date.toDateString() === selectedDate.toDateString()
                )
                .timeSlots.map((time) => (
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
