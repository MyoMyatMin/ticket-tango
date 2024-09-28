"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Component() {
  useAuthGuard();

  const [showtimes, setShowtimes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const response = await fetch("/api/showtimes");
        const data = await response.json();
        console.log(data)
        setShowtimes(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchShowtimes();
  }, []);

  const deleteShowtime = async (id) => {
    try {
      const response = await fetch(`/api/showtimes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const result = await response.json();
        setShowtimes((prevShowtimes) => {
          const updatedShowtime = prevShowtimes.filter((showtime) => showtime._id !== id);
          return updatedShowtime;
        });
      } else {
        const errorResult = await response.json();
        console.error("Failed to delete showtimes:", errorResult.error);
      }
    } catch (error) {
      console.error("Error deleting showtimes:", error);
    }
  };

  const updateShowtime = (showtime_id) => {
    router.push(`/admin/showtime/create?showtimeId=${showtime_id}`)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };


  return (
    <Box>
      <Grid>
        <Stack spacing={2} direction={"row"} sx={{ marginBottom: 3}}>
          <Typography variant="h6" gutterBottom>
            Showtime List
          </Typography>
          <Button
            component={Link}
            href="/admin/showtime/create"
            variant="outlined"
            color="success"
            >
            Create Showtime
          </Button>
        </Stack>
        <Grid>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>StartTime</TableCell>
                  <TableCell>EndTime</TableCell>
                  <TableCell>Theatre</TableCell>
                  <TableCell>Movie Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {showtimes.map((showtime) => (
                  <TableRow key={showtime._id}>
                    <TableCell>{formatDate(showtime.date)}</TableCell>
                    <TableCell>{formatTime(showtime.startTime)}</TableCell>
                    <TableCell>{formatTime(showtime.endTime)}</TableCell>
                    <TableCell>{showtime.theatre?.name}</TableCell>
                    <TableCell>{showtime.movie?.title}</TableCell>
                    <TableCell>
                      <Stack spacing={1} direction={"row"} sx={{
                      }}>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => updateShowtime(showtime._id)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => deleteShowtime(showtime._id)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
