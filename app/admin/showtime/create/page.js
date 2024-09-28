"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid2";
import { Button, InputAdornment, OutlinedInput, Stack } from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SampleTheatre from "@/components/SampleTheatre";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/hooks/useAuthGuard";

const ShowTime = () => {
  useAuthGuard();
  const router = useRouter();

  const [numberOfSeats, setNumberOfSeats] = useState();
  const [movie, setMovie] = useState("");
  const [theatre, setTheatre] = useState("");
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [standardPrice, setStandardPrice] = useState("");
  const [premiumPrice, setPremiumPrice] = useState("");
  const [vipPrice, setVipPrice] = useState("");
  const [showtimeId, setShowtimeId] = useState(null); // Store the showtime ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resMovies = await fetch("/api/movies");
        const moviesData = await resMovies.json();
        setMovies(moviesData);
  
        const resTheatres = await fetch("/api/theatres");
        const theatresData = await resTheatres.json();
        setTheatres(theatresData);
  
        const { searchParams } = new URL(window.location);
        const id = searchParams.get("showtimeId"); // Change to "showtimeId" as per your query param
        if (id) {
          setShowtimeId(id); // Set the showtime ID
          // Fetch the showtime details
          const showtimeRes = await fetch(`/api/showtimes/${id}`);
          const showtimeData = await showtimeRes.json();
          if (showtimeRes.ok) {
            // Populate form fields with the fetched data
            setMovie(showtimeData.movie._id);
            setTheatre(showtimeData.theatre._id);
            setDate(dayjs(showtimeData.date));
            setStartTime(dayjs(showtimeData.startTime));
            setEndTime(dayjs(showtimeData.endTime));
            setStandardPrice(showtimeData.price.standard);
            setPremiumPrice(showtimeData.price.premium);
            setVipPrice(showtimeData.price.vip);
          } else {
            console.error("Failed to fetch showtime data");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  const handleMovie = (event) => {
    setMovie(event.target.value);
  };

  const handleTheatre = (event) => {
    setTheatre(event.target.value);
    setNumberOfSeats(
      theatres.find((theatre) => theatre._id == event.target.value)
        .numberOfSeats
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const showtimeData = {
      movie,
      theatre,
      startTime,
      endTime,
      date,
      price: {
        standard: parseFloat(standardPrice),
        premium: parseFloat(premiumPrice),
        vip: parseFloat(vipPrice),
      },
    };

    try {
      const res = showtimeId
        ? await fetch(`/api/showtimes/${showtimeId}`, {
            method: "PUT", // Use PUT for updates
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(showtimeData),
          })
        : await fetch("/api/showtimes", {
            method: "POST", // Use POST for new showtime
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(showtimeData),
          });

      if (!res.ok) {
        throw new Error(showtimeId ? "Failed to update showtime" : "Failed to add showtime");
      }

      await res.json();

      // Reset the form
      setMovie("");
      setTheatre("");
      setDate(null);
      setStartTime(null);
      setEndTime(null);
      setStandardPrice("");
      setPremiumPrice("");
      setVipPrice("");
      setNumberOfSeats(null);

      // Redirect after successful creation/update
      router.push("/admin/showtime"); // Redirect to showtimes list or appropriate page
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker", "DatePicker"]}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Stack spacing={2}>
                <FormControl fullWidth required>
                  <InputLabel id="movie-select-label">Movie</InputLabel>
                  <Select
                    labelId="movie-select-label"
                    id="movie-select"
                    value={movie}
                    label="Movie"
                    onChange={handleMovie}
                    sx={{
                      "& .MuiSelect-icon": {
                        color: "#FF6B6B",
                      },
                    }}
                  >
                    {movies.map((movie) => (
                      <MenuItem key={movie._id} value={movie._id}>
                        {movie.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <DatePicker
                    label="Date"
                    value={date}
                    onChange={(newValue) => setDate(dayjs(newValue))}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        color: "#FF6B6B",
                        fontSize: "1.1rem",
                      },
                    }}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <TimePicker
                    label="Start Time"
                    value={startTime}
                    onChange={(newValue) => setStartTime(dayjs(newValue))}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        color: "#FF6B6B",
                        fontSize: "1.1rem",
                      },
                    }}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <TimePicker
                    label="End Time"
                    value={endTime}
                    onChange={(newValue) => setEndTime(dayjs(newValue))}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        color: "#FF6B6B",
                        fontSize: "1.1rem",
                      },
                    }}
                  />
                </FormControl>
              </Stack>
            </Grid>

            <Grid size={6}>
              <Stack spacing={2}>
                <FormControl fullWidth required>
                  <InputLabel id="theatre-select-label">Theatre</InputLabel>
                  <Select
                    labelId="theatre-select-label"
                    id="theatre-select"
                    value={theatre}
                    label="Theatre"
                    onChange={handleTheatre}
                    sx={{
                      "& .MuiSelect-icon": {
                        color: "#FF6B6B",
                      },
                    }}
                  >
                    {theatres.map((theatre) => (
                      <MenuItem key={theatre._id} value={theatre._id}>
                        {theatre.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-amount-standard">
                    Standard
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount-standard"
                    value={standardPrice}
                    onChange={(e) => setStandardPrice(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Amount"
                  />
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-amount-premium">
                    Premium
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount-premium"
                    value={premiumPrice}
                    onChange={(e) => setPremiumPrice(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Amount"
                  />
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-amount-vip">
                    VIP
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount-vip"
                    value={vipPrice}
                    onChange={(e) => setVipPrice(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Amount"
                  />
                </FormControl>

                <Button variant="contained" onClick={handleSubmit}>
                  {showtimeId ? "Update ShowTime" : "Add ShowTime"}
                </Button>
              </Stack>
            </Grid>

            <Grid size={12}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <SampleTheatre numberOfSeats={numberOfSeats} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default ShowTime;
