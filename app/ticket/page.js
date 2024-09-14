"use client"; // Mark this component as a client component

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

const Ticket = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchTicket = async () => {
      try {
        const res = await fetch(`/api/tickets/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch ticket");
        }
        const data = await res.json();
        setTicket(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!ticket) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">No ticket found</Typography>
      </Box>
    );
  }

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 5, mb: 5, padding: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Ticket Information
        </Typography>
        <Typography variant="body1">
          <strong>Movie:</strong> {ticket.showtime.movie.title}
        </Typography>
        <Typography variant="body1">
          <strong>Theater:</strong> {ticket.showtime.theatre.name}
        </Typography>
        <Typography variant="body1">
          <strong>Seat:</strong> {ticket.seat.name} ({ticket.seat.type})
        </Typography>
        <Typography variant="body1">
          <strong>Showtime:</strong> {new Date(ticket.showtime.time).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Ticket;
