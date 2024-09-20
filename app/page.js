"use client"
import Movies from "@/components/Movies";
import QuickSearch from "@/components/QuickSearch";
import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movies from the API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("/api/movies");
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <Typography>Loading movies...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "background.default",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Box sx={{ maxWidth: "600px", margin: "auto", width: "100%" }}>
        <QuickSearch movies={movies} />
      </Box>

      <Divider sx={{ borderColor: "primary.main", marginX: 2 }} />

      <Movies movies={movies} />
    </Box>
  );
}
