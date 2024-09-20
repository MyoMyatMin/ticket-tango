"use client";  

import { useEffect, useState } from "react";  
import Box from "@mui/material/Box";  
import InputLabel from "@mui/material/InputLabel";  
import MenuItem from "@mui/material/MenuItem";  
import FormControl from "@mui/material/FormControl";  
import Select from "@mui/material/Select";  
import Grid from "@mui/material/Grid2";  
import { InputAdornment, OutlinedInput, Stack } from "@mui/material";  
import {  
  DatePicker,  
  LocalizationProvider,  
  TimePicker,  
} from "@mui/x-date-pickers";  
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";  
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";  
import SampleTheatre from "@/components/SampleTheatre";

const ShowTime = () => {  
  const [numberOfSeats, setNumberOfSeats] = useState();
  const [movie, setMovie] = useState("");  
  const [theatre, setTheatre] = useState(""); 
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);

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
                    startAdornment={  
                      <InputAdornment position="start">$</InputAdornment>  
                    }  
                    label="Amount"  
                  />  
                </FormControl>  
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