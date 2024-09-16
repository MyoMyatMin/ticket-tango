import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const MoviePoster = ({ imageUrl }) => {
  const styles = {
    root: {
      width: 300,
    },
    media: {
      height: 450,
    },
  };

  return (
    <Card style={styles.root}>
      <CardMedia style={styles.media} image={imageUrl} title="Movie Poster" />
    </Card>
  );
};

export default MoviePoster;
