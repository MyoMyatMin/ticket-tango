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
import Theatre from "@/components/Theatre";

export default function TheatrePage() {
  const [theatres, setTheatres] = useState([]);
  const [selectedTheatre, setSelectedTheatre] = useState({
    id: 0,
    name: "",
    standardSeats: 0,
    premiumSeats: 0,
    vipSeats: 0,
    seats: [],
  });
  const [sampleSeats, setSampleSeats] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch theatres from the API on component mount
  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const response = await fetch("/api/theatres"); // Use relative path for better portability
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const formattedTheatres = data.map((theatre) => ({
          id: theatre._id, // use _id as id
          name: theatre.name,
          standardSeats: theatre.numberOfSeats.standard,
          premiumSeats: theatre.numberOfSeats.premium,
          vipSeats: theatre.numberOfSeats.vip,
          seats: generateSeats(
            theatre.numberOfSeats.standard,
            theatre.numberOfSeats.premium,
            theatre.numberOfSeats.vip
          ),
        }));

        setTheatres(formattedTheatres);
      } catch (error) {
        console.error("Failed to fetch theatres:", error);
      }
    };

    fetchTheatres();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedTheatre((prev) => ({
      ...prev,
      [name]: name === "name" ? value : Number(value),
    }));
  };

  const generateSeats = (standard, premium, vip) => {
    return [
      ...Array.from({ length: standard }, (_, index) => ({
        name: `Standard Seat ${index + 1}`,
        type: "Standard",
        isAvailable: true,
      })),
      ...Array.from({ length: premium }, (_, index) => ({
        name: `Premium Seat ${index + 1}`,
        type: "Premium",
        isAvailable: true,
      })),
      ...Array.from({ length: vip }, (_, index) => ({
        name: `VIP Seat ${index + 1}`,
        type: "VIP",
        isAvailable: true,
      })),
    ];
  };

  const handleShowSample = () => {
    const seats = generateSeats(
      selectedTheatre.standardSeats,
      selectedTheatre.premiumSeats,
      selectedTheatre.vipSeats
    );
    setSampleSeats(seats);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const seats = generateSeats(
      selectedTheatre.standardSeats,
      selectedTheatre.premiumSeats,
      selectedTheatre.vipSeats
    );

    try {
      if (selectedTheatre.id) {
        const response = await fetch(`/api/theatres/${selectedTheatre.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: selectedTheatre.name,
            numberOfSeats: {
              standard: selectedTheatre.standardSeats,
              premium: selectedTheatre.premiumSeats,
              vip: selectedTheatre.vipSeats,
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to update theatre: ${response.statusText}`);
        }

        const updatedTheatre = await response.json();
        setTheatres((prev) =>
          prev.map((theatre) =>
            theatre.id === updatedTheatre._id
              ? {
                  ...theatre,
                  name: updatedTheatre.name,
                  standardSeats: updatedTheatre.numberOfSeats.standard,
                  premiumSeats: updatedTheatre.numberOfSeats.premium,
                  vipSeats: updatedTheatre.numberOfSeats.vip,
                  seats: generateSeats(
                    updatedTheatre.numberOfSeats.standard,
                    updatedTheatre.numberOfSeats.premium,
                    updatedTheatre.numberOfSeats.vip
                  ),
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
            numberOfSeats: {
              standard: selectedTheatre.standardSeats,
              premium: selectedTheatre.premiumSeats,
              vip: selectedTheatre.vipSeats,
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to add theatre: ${response.statusText}`);
        }

        const newTheatre = await response.json();

        setTheatres((prev) => [
          ...prev,
          {
            id: newTheatre._id,
            name: newTheatre.name,
            standardSeats: newTheatre.numberOfSeats.standard,
            premiumSeats: newTheatre.numberOfSeats.premium,
            vipSeats: newTheatre.numberOfSeats.vip,
            seats: generateSeats(
              newTheatre.numberOfSeats.standard,
              newTheatre.numberOfSeats.premium,
              newTheatre.numberOfSeats.vip
            ),
          },
        ]);
      }
      resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateTheatre = (id) => {
    const theatreToUpdate = theatres.find((theatre) => theatre.id === id);
    if (theatreToUpdate) {
      setSelectedTheatre(theatreToUpdate);
      setSampleSeats(theatreToUpdate.seats);
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

      setTheatres((prev) => prev.filter((theatre) => theatre.id !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedTheatre({
      id: 0,
      name: "",
      standardSeats: 0,
      premiumSeats: 0,
      vipSeats: 0,
      seats: [],
    });
    setSampleSeats([]);
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
              <TableRow key={theatre.id}>
                <TableCell>{theatre.name}</TableCell>
                <TableCell>{theatre.standardSeats}</TableCell>
                <TableCell>{theatre.premiumSeats}</TableCell>
                <TableCell>{theatre.vipSeats}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => updateTheatre(theatre.id)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => deleteTheatre(theatre.id)}
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
                name="standardSeats"
                label="Number of Standard Seats"
                type="number"
                value={selectedTheatre.standardSeats}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl fullWidth required>
              <TextField
                name="premiumSeats"
                label="Number of Premium Seats"
                type="number"
                value={selectedTheatre.premiumSeats}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl fullWidth required>
              <TextField
                name="vipSeats"
                label="Number of VIP Seats"
                type="number"
                value={selectedTheatre.vipSeats}
                onChange={handleInputChange}
              />
            </FormControl>
            <Button variant="outlined" onClick={handleShowSample}>
              Show Sample
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              {selectedTheatre.id ? "Update" : "Add"} Theatre
            </Button>
          </Stack>
        </Grid>

        <Grid size={6} offset={1}>
          <Theatre isadmin={true} seats={sampleSeats} />
        </Grid>
      </Grid>
    </Box>
  );
}
