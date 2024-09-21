import React, { useState, useEffect } from "react";
import { Button, Typography, Box, Container, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function TimeSlot({
  availableDates,
  selectedTime,
  onTimeSlotChange,
}) {
  const [uniqueDatesWithTimeSlots, setUniqueDatesWithTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };
  console.log(availableDates);

  const groupDatesWithTimeSlots = (dates) => {
    const grouped = {};

    dates.forEach((entry) => {
      const day = new Date(entry.date).toDateString();
      const time = new Date(entry.time).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      if (!grouped[day]) {
        grouped[day] = {
          date: new Date(entry.date),
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
      console.log("groupedDates", groupedDates);
      if (selectedTime !== null && groupedDates.length > 0) {
        const selectedDateFromTime = new Date(selectedTime);
        const formattedSelectedTime = selectedDateFromTime.toLocaleTimeString(
          "en-US",
          {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }
        );

        const selectedDateEntry = groupedDates.find(
          (entry) =>
            entry.date.toDateString() === selectedDateFromTime.toDateString()
        );

        if (selectedDateEntry) {
          setSelectedDate(selectedDateEntry.date);
          const matchingTimeSlot = selectedDateEntry.timeSlots.find(
            (time) => time === formattedSelectedTime
          );

          if (matchingTimeSlot) {
            setSelectedTimeSlot(matchingTimeSlot);
            onTimeSlotChange({
              time: matchingTimeSlot,
              date: selectedDateEntry.date,
            });
          } else {
            setSelectedTimeSlot(null);
          }
        }
      }
    }
  }, [availableDates, selectedTime]);

  useEffect(() => {
    if (selectedDate && uniqueDatesWithTimeSlots.length > 0) {
      const selectedDateEntry = uniqueDatesWithTimeSlots.find(
        (entry) => entry.date.toDateString() === selectedDate.toDateString()
      );

      if (selectedDateEntry) {
        const formattedSelectedTime = selectedTime
          ? new Date(selectedTime).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })
          : selectedTimeSlot;

        const matchingTimeSlot = selectedDateEntry.timeSlots.find(
          (time) => time === formattedSelectedTime
        );

        if (matchingTimeSlot) {
          setSelectedTimeSlot(matchingTimeSlot);
          onTimeSlotChange({ time: matchingTimeSlot, date: selectedDate });
        }
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
                      onClick={() => {
                        setSelectedTimeSlot(time);
                        onTimeSlotChange({ time, date: selectedDate }); // Pass both time and date
                      }}
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
