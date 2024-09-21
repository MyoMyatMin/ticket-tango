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

const ShowTime = () => {  
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

  useEffect(() => {
    // Fetch movies from /api/movies
    const fetchMovies = async () => {
      const res = await fetch("/api/movies");
      const data = await res.json();
      setMovies(data);
    };

    // Fetch theatres from /api/theatre
    const fetchTheatres = async () => {
      const res = await fetch("/api/theatres");
      const data = await res.json();
      setTheatres(data);
    };

    fetchMovies();
    fetchTheatres();
  }, []);

  const handleMovie = (event) => {  
    setMovie(event.target.value);  
  };  

  const handleTheatre = (event) => {  
    setTheatre(event.target.value);
    setNumberOfSeats(theatres.find(theatre => theatre._id == event.target.value ).numberOfSeats);
  };  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const showtimeData = {
      movie,
      theatre,
      startTime: startTime, 
      endTime: endTime,
      date: date,
      price: {
        standard: parseFloat(standardPrice),
        premium: parseFloat(premiumPrice),
        vip: parseFloat(vipPrice),
      },
    };

    try {
      const res = await fetch("/api/showtimes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(showtimeData),
      });

      if (!res.ok) {
        throw new Error("Failed to add showtime");
      }

      await res.json();

      setMovie("");
      setTheatre("");
      setDate(null);
      setStartTime(null);
      setEndTime(null);
      setStandardPrice("");
      setPremiumPrice("");
      setVipPrice("");

    } catch (error) {
      console.error("Error adding showtime:", error);
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
                      '& .MuiSelect-icon': {  
                        color: '#FF6B6B', 
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
                      '& .MuiSvgIcon-root': {
                        color: '#FF6B6B', 
                        fontSize: '1.1rem',
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
                      '& .MuiSvgIcon-root': {
                        color: '#FF6B6B', 
                        fontSize: '1.1rem',
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
                      '& .MuiSvgIcon-root': {
                        color: '#FF6B6B', 
                        fontSize: '1.1rem',
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
                      '& .MuiSelect-icon': {  
                        color: '#FF6B6B', 
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
                  <InputLabel htmlFor="outlined-adornment-amount-standard">Standard</InputLabel>  
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
                  <InputLabel htmlFor="outlined-adornment-amount-premium">Premium</InputLabel>  
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
                  <InputLabel htmlFor="outlined-adornment-amount-vip">VIP</InputLabel>  
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
                  Add ShowTime
                </Button>
              </Stack>  
            </Grid>  

            <Grid size={12}>  
              <Box display="flex" justifyContent="center" alignItems="center">  
                {/* <Theatre isadmin={true} seats={seats} />   */}
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