"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SampleTheatre from "@/components/SampleTheatre";

export default function TheatrePage() {
  const [theatres, setTheatres] = useState([]);
  const [selectedTheatre, setSelectedTheatre] = useState({
    _id: 0,
    name: "",
    numberOfSeats: {
      standard: 0,
      premium: 0,
      vip: 0,
    },
  });
  const [loading, setLoading] = useState(false);

  // Fetch theatres from the API on component mount
  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const response = await fetch("/api/theatres");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        setTheatres(data);
      } catch (error) {
        console.error("Failed to fetch theatres:", error);
      }
    };

    fetchTheatres();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value)

    setSelectedTheatre((prev) => {
      if (name === "name") {
        return { ...prev, [name]: value };
      } else {
        return {
          ...prev,
          numberOfSeats: {
            ...prev.numberOfSeats,
            [name]: parseInt(value) || 0,
          },
        };
      }
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (selectedTheatre._id) {
        const response = await fetch(`/api/theatres/${selectedTheatre._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: selectedTheatre.name,
            numberOfSeats: selectedTheatre.numberOfSeats,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to update theatre: ${response.statusText}`);
        }

        const updatedTheatre = await response.json();

        setTheatres((prev) =>
          prev.map((theatre) =>
            theatre._id === updatedTheatre._id
              ? {
                  ...theatre,
                  ...updatedTheatre,
                }
              : theatre
          )
        );
      } else {
        const response = await fetch("/api/theatres", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: selectedTheatre.name,
            numberOfSeats: selectedTheatre.numberOfSeats,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to add theatre: ${response.statusText}`);
        }

        const newTheatre = await response.json();

        setTheatres((prev) => [...prev, newTheatre]);
      }
      resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateTheatre = (id) => {
    const theatreToUpdate = theatres.find((theatre) => theatre._id === id);
    if (theatreToUpdate) {
      setSelectedTheatre(theatreToUpdate);
    }
  };

  const deleteTheatre = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/theatres/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete theatre: ${response.statusText}`);
      }

      setTheatres((prev) => {
        const updatedTheatres = prev.filter((theatre) => theatre._id !== id);
        console.log(updatedTheatres);
        return updatedTheatres;
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedTheatre({
      _id: 0,
      name: "",
      numberOfSeats: {
        standard: 0,
        premium: 0,
        vip: 0,
      },
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
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
              <TableRow key={theatre._id}>
                <TableCell>{theatre.name}</TableCell>
                <TableCell>{theatre.numberOfSeats.standard}</TableCell>
                <TableCell>{theatre.numberOfSeats.premium}</TableCell>
                <TableCell>{theatre.numberOfSeats.vip}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => updateTheatre(theatre._id)}
                    disabled={theatre.showtimes && theatre.showtimes.length > 0}
                    sx={{
                      backgroundColor:
                        theatre.showtimes && theatre.showtimes.length > 0
                          ? "primary.main"
                          : undefined,
                      color: "white",
                      "&.Mui-disabled": {
                        backgroundColor: "primary.main",
                        color: "white",
                        opacity: 0.8,
                      },
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => deleteTheatre(theatre._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ m: "30px" }} />

      <Grid container spacing={2}>
        <Grid size={4}>
          <Stack spacing={2}>
            <Typography variant="h6" gutterBottom>
              Theatre Form
            </Typography>
            <FormControl fullWidth required>
              <TextField
                required
                name="name"
                label="Theatre Name"
                value={selectedTheatre.name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl fullWidth required>
              <TextField
                name="standard"
                label="Number of Standard Seats"
                type="number"
                value={selectedTheatre.numberOfSeats.standard}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl fullWidth required>
              <TextField
                name="premium"
                label="Number of Premium Seats"
                type="number"
                value={selectedTheatre.numberOfSeats.premium}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl fullWidth required>
              <TextField
                name="vip"
                label="Number of VIP Seats"
                type="number"
                value={selectedTheatre.numberOfSeats.vip}
                onChange={handleInputChange}
              />
            </FormControl>
            <Button variant="contained" onClick={handleSubmit}>
              {selectedTheatre._id ? "Update" : "Add"} Theatre
            </Button>
          </Stack>
        </Grid>

        <Grid size={6} offset={1}>
          <SampleTheatre numberOfSeats={selectedTheatre.numberOfSeats} />
        </Grid>
      </Grid>
    </Box>
  );
}
