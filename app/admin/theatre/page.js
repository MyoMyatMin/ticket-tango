"use client";  

import { Box, Button, FormControl, Stack, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";  
import Grid from "@mui/material/Grid2";  
import Theatre from "@/components/Theatre";  
import { getSeats } from "@/lib/helpers/getSeats";  
import { useState } from "react";  

const TheatrePage = () => {  
  const initialSeats = getSeats();  
  const [Seats, setSeats] = useState(initialSeats);  
  const [standardSeats, setStandardSeats] = useState(0);  
  const [premiumSeats, setPremiumSeats] = useState(0);  
  const [vipSeats, setVipSeats] = useState(0);  

  // Theatre State  
  const [theatres, setTheatres] = useState([]);  
  const [selectedTheatre, setSelectedTheatre] = useState({ id: null, name: "", standardSeats: 0, premiumSeats: 0, vipSeats: 0 });  

  const handleClick = () => {  
    // Before adding a theatre, check if it's an update or a new addition  
    if (selectedTheatre.id) {  
      // Update existing theatre  
      const updatedTheatres = theatres.map(theatre =>   
        theatre.id === selectedTheatre.id   
          ? { ...selectedTheatre, standardSeats, premiumSeats, vipSeats }   
          : theatre  
      );  
      setTheatres(updatedTheatres);  
    } else {  
      const newTheatre = {   
        id: theatres.length + 1,   
        name: selectedTheatre.name,   
        standardSeats,  
        premiumSeats,   
        vipSeats   
      };  
      setTheatres([...theatres, newTheatre]);  
    }  

    resetForm();  
  };  

  const updateTheatre = (id) => {  
    const theatreToUpdate = theatres.find(theatre => theatre.id === id);  
    if (theatreToUpdate) {  
      setSelectedTheatre(theatreToUpdate);  
      setStandardSeats(theatreToUpdate.standardSeats);  
      setPremiumSeats(theatreToUpdate.premiumSeats);  
      setVipSeats(theatreToUpdate.vipSeats);  
    }  
  };  

  const deleteTheatre = (id) => {  
    setTheatres(theatres.filter(theatre => theatre.id !== id));  
  };  

  const resetForm = () => {  
    setStandardSeats(0);  
    setPremiumSeats(0);  
    setVipSeats(0);  
    setSelectedTheatre({ id: null, name: "", standardSeats: 0, premiumSeats: 0, vipSeats: 0 });  
  };  

  return (  
    <Box sx={{ flexGrow: 1 }}>  
      <Grid container spacing={2}>  
        <Grid size={6}>  
          <Stack spacing={2}>  
            <Typography variant="h6" gutterBottom>  
              Theatre Form  
            </Typography>  
            <FormControl fullWidth required>  
              <TextField   
                required   
                id="outlined-required"   
                label="Theatre Name"   
                value={selectedTheatre.name}   
                onChange={(e) => setSelectedTheatre({ ...selectedTheatre, name: e.target.value })}   
              />  
            </FormControl>  

            <FormControl fullWidth required>  
              <TextField  
                id="standard-seats"  
                label="Number of Standard Seats"  
                type="number"  
                value={standardSeats}  
                onChange={(e) => setStandardSeats(Number(e.target.value))}  
              />  
            </FormControl>  

            <FormControl fullWidth required>  
              <TextField  
                id="premium-seats"  
                label="Number of Premium Seats"  
                type="number"  
                value={premiumSeats}  
                onChange={(e) => setPremiumSeats(Number(e.target.value))}  
              />  
            </FormControl>  

            <FormControl fullWidth required>  
              <TextField  
                id="vip-seats"  
                label="Number of VIP Seats"  
                type="number"  
                value={vipSeats}  
                onChange={(e) => setVipSeats(Number(e.target.value))}  
              />  
            </FormControl>  

            <Button variant="contained" onClick={handleClick}>  
              {selectedTheatre.id ? 'Update' : 'Add'}  
            </Button>  
          </Stack>  

          <br />  
          <Typography variant="h6" gutterBottom>  
            Theatre List  
          </Typography>  
          <TableContainer component={Paper}>  
            <Table>  
              <TableHead>  
                <TableRow>  
                  <TableCell>Theatre Name</TableCell>  
                  <TableCell>Standard Seats</TableCell>  
                  <TableCell>Premium Seats</TableCell>  
                  <TableCell>VIP Seats</TableCell>  
                  <TableCell>Actions</TableCell>  
                </TableRow>  
              </TableHead>  
              <TableBody>  
                {theatres.map((theatre) => (  
                  <TableRow key={theatre.id}>  
                    <TableCell>{theatre.name}</TableCell>  
                    <TableCell>{theatre.standardSeats}</TableCell>  
                    <TableCell>{theatre.premiumSeats}</TableCell>  
                    <TableCell>{theatre.vipSeats}</TableCell>  
                    <TableCell>  
                      <Button variant="outlined" color="primary" onClick={() => updateTheatre(theatre.id)}>  
                        Update  
                      </Button>  
                      <Button variant="outlined" color="secondary" onClick={() => deleteTheatre(theatre.id)}>  
                        Delete  
                      </Button>  
                    </TableCell>  
                  </TableRow>  
                ))}  
              </TableBody>  
            </Table>  
          </TableContainer>  
        </Grid>  

        <Grid item xs={5} offset={1}>  
          <Theatre isadmin={true} seats={Seats} />  
        </Grid>  
      </Grid>  
    </Box>  
  );  
};  

export default TheatrePage;
