"use client";  

import { useState } from "react";  
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
import Theatre from "@/components/Theatre";  
import { getSeats } from "@/lib/helpers/getSeats";  

const ShowTime = () => {  
  const seats = getSeats();  
  const [movie, setMovie] = useState("");  
  const [theatre, setTheatre] = useState("");  

  const handleMovie = (event) => {  
    setMovie(event.target.value);  
  };  

  const handleTheatre = (event) => {  
    setTheatre(event.target.value);  
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
                    <MenuItem value={10}>Ten</MenuItem>  
                    <MenuItem value={20}>Twenty</MenuItem>  
                    <MenuItem value={30}>Thirty</MenuItem>  
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
                    <MenuItem value={10}>Ten</MenuItem>  
                    <MenuItem value={20}>Twenty</MenuItem>  
                    <MenuItem value={30}>Thirty</MenuItem>  
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
                <Theatre isadmin={true} seats={seats} />  
              </Box>  
            </Grid>  
          </Grid>  
        </Box>  
      </DemoContainer>  
    </LocalizationProvider>  
  );  
};  

export default ShowTime;