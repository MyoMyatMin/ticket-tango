import MoviePoster from "@/components/MoviePoster";
import Theatre from "@/components/Theatre";
import TimeSlot from "@/components/TimeSlot";
import { Box, Divider, Typography, Container } from "@mui/material";

const TheatrePage = () => {
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const timeSlots = [
    "10:00 AM",
    "12:30 PM",
    "3:00 PM",
    "5:30 PM",
    "8:00 PM",
    "10:30 PM",
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 5 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          textAlign="start"
          ml={4}
          mb={4}
        >
          Movie Name
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            ml: 4,
            mb: 4,
          }}
        >
          <MoviePoster imageUrl="https://image.tmdb.org/t/p/w500/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg" />
        </Box>

        <TimeSlot availableDates={availableDates} timeSlots={timeSlots} />
        <Divider sx={{ borderColor: "primary.main", my: 4 }} />
        <Box display="flex" justifyContent="center" alignItems="center">
          <Theatre />
        </Box>
      </Box>
    </Container>
  );
};

export default TheatrePage;
