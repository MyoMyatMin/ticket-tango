"use client";
import React from "react";
import MovieCard from "./MovieCard";
import { Container, Box } from "@mui/material";
import { Typography } from "@mui/material";

const Movies = ({ movies }) => {
  // const movies = [
  //   {
  //     title: "Inception",
  //     genre: "Sci-Fi",
  //     cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
  //     duration: "148 min",
  //     image: "https://example.com/inception.jpg",
  //     description: "A mind-bending thriller by Christopher Nolan.",
  //     onClick: () => console.log("Inception clicked"),
  //   },
  //   {
  //     title: "The Matrix",
  //     genre: "Action",
  //     cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
  //     duration: "136 min",
  //     image: "https://example.com/matrix.jpg",
  //     description: "A sci-fi classic with a unique story.",
  //     onClick: () => console.log("The Matrix clicked"),
  //   },
  //   {
  //     title: "The Godfather",
  //     genre: "Crime",
  //     cast: ["Marlon Brando", "Al Pacino", "James Caan"],
  //     duration: "175 min",
  //     image: "https://example.com/godfather.jpg",
  //     description: "A timeless saga of a powerful mafia family.",
  //     onClick: () => console.log("The Godfather clicked"),
  //   },
  //   {
  //     title: "The Shawshank Redemption",
  //     genre: "Drama",
  //     cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
  //     duration: "142 min",
  //     image: "https://example.com/shawshank.jpg",
  //     description:
  //       "A powerful drama about hope and resilience within prison walls.",
  //     onClick: () => console.log("The Shawshank Redemption clicked"),
  //   },
  //   {
  //     title: "Pulp Fiction",
  //     genre: "Crime",
  //     cast: ["John Travolta", "Samuel L. Jackson", "Uma Thurman"],
  //     duration: "154 min",
  //     image: "https://example.com/pulpfiction.jpg",
  //     description: "A neo-noir masterpiece with a non-linear narrative.",
  //     onClick: () => console.log("Pulp Fiction clicked"),
  //   },
  //   {
  //     title: "Spirited Away",
  //     genre: "Animation, Fantasy",
  //     cast: ["Rumi Hiiragi", "Yō Oizumi", "Mari Natsuki"],
  //     duration: "125 min",
  //     image: "https://example.com/spiritedaway.jpg",
  //     description:
  //       "A captivating coming-of-age story in a magical spirit world.",
  //     onClick: () => console.log("Spirited Away clicked"),
  //   },
  //   {
  //     title: "The Lord of the Rings: The Fellowship of the Ring",
  //     genre: "Fantasy, Adventure",
  //     cast: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"],
  //     duration: "178 min",
  //     image: "https://example.com/lotr1.jpg",
  //     description:
  //       "The epic beginning of an adventure into a fantastical world.",
  //     onClick: () => console.log("The Lord of the Rings clicked"),
  //   },
  //   {
  //     title: "The Dark Knight",
  //     genre: "Action, Superhero",
  //     cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
  //     duration: "152 min",
  //     image: "https://example.com/darknight.jpg",
  //     description: "A complex and thrilling exploration of good vs. evil.",
  //     onClick: () => console.log("The Dark Knight clicked"),
  //   },
  //   {
  //     title: "Schindler's List",
  //     genre: "Historical Drama",
  //     cast: ["Liam Neeson", "Ralph Fiennes", "Ben Kingsley"],
  //     duration: "195 min",
  //     image: "https://example.com/schindlerslist.jpg",
  //     description: "A harrowing and important story about the Holocaust.",
  //     onClick: () => console.log("Schindler's List clicked"),
  //   },
  //   {
  //     title: "12 Angry Men",
  //     genre: "Drama",
  //     cast: ["Henry Fonda", "Lee J. Cobb", "Martin Balsam"],
  //     duration: "96 min",
  //     image: "https://example.com/12angrymen.jpg",
  //     description: "A thought-provoking examination of the justice system.",
  //     onClick: () => console.log("12 Angry Men clicked"),
  //   },
  // ];

  return (
    <Container
      maxWidth="lg"
      sx={{ paddingY: 4, backgroundColor: "background.default" }}
    >
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 600, color: "text.primary" }}
      >
        Current Movies
      </Typography>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          paddingY: 2,
          gap: 2,
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {movies.map((movie, index) => (
          <MovieCard key={index} {...movie} />
        ))}
      </Box>

      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 600, marginTop: 4, color: "text.primary" }}
      >
        Coming Soon
      </Typography>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          paddingY: 2,
          gap: 2,
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {movies.map((movie, index) => (
          <MovieCard key={index} {...movie} />
        ))}
      </Box>
    </Container>
  );
};

export default Movies;
