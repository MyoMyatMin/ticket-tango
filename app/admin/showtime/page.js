"use client";

import { useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid2';
import { InputAdornment, OutlinedInput, Stack, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SeatSelection from '@/components/Theatre';


const ShowTime = () => {
  const [movie, setMovie] = useState('');
  const [theatre, setTheatre] = useState('');

  const handleMovie = (event) => {
    setMovie(event.target.value);
  };

  const handleTheatre = (event) => {
    setTheatre(event.target.value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker', 'DatePicker']}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Stack spacing={2}>
                <FormControl fullWidth required>
                  <InputLabel id="demo-simple-select-label">Movie</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={movie}
                    label="Movie"
                    onChange={handleMovie}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <DatePicker label="Date" />
                </FormControl>

                <FormControl fullWidth >
                  <TimePicker label="Start Time" />
                </FormControl>

                <FormControl fullWidth>
                  <TimePicker label="End Time" />
                </FormControl>
              </Stack>
            </Grid>

            <Grid size={6}>
              <Stack spacing={2}>
                <FormControl fullWidth required>
                  <InputLabel id="demo-simple-select-label">Theatre</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={theatre}
                    label="Theatre"
                    onChange={handleTheatre}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-amount">Standard</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="Amount"
                  />
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-amount">Premium</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="Amount"
                  />
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-amount">VIP</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="Amount"
                  />
                </FormControl>
              </Stack>
            </Grid>
           
            <Grid size={12} >
              <SeatSelection />
            </Grid>
          </Grid>
        </Box>

      </DemoContainer>
    </LocalizationProvider>
  );
  ;
  };
  
export default ShowTime;