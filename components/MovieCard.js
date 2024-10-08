import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";

const MovieCard = ({
  title,
  genre,
  duration,
  description,
  _id,
  posterUrl,
  isOngoing,
}) => {
  const router = useRouter();
  
  const handleSubmit = () => {
    router.push(`/booking?movieid=${encodeURIComponent(_id)}`);
  };

  return (
    <Card
      sx={{
        width: 220,
        minWidth: 220,
        borderRadius: 2,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        backgroundColor: "background.paper",
        border: 1,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0px 6px 30px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <CardMedia
        sx={{ height: 200, borderRadius: "3px 3px 0 0" }}
        image={posterUrl}
        title={title}
      />
      <CardContent
        sx={{ padding: 2, display: "flex", flexDirection: "column", flex: 1 }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 600,
            fontSize: "1rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            marginBottom: 1,
            color: "text.primary",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 0.5 }}
        >
          <strong>Genre:</strong> {genre}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 0.5 }}
        >
          <strong>Duration:</strong> {duration}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: "0.875rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {description}
        </Typography>
      </CardContent>

      <CardActions sx={{ padding: 2, paddingTop: 0 }}>
        {isOngoing ? (
          <Button
            size="small"
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "primary.main",
              color: "#fff",
              textTransform: "none",
              "&:hover": { backgroundColor: "primary.main" },
            }}
          >
            BUY TICKETS
          </Button>
        ) : (
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontStyle: "italic" }}
          >
            Coming ...
          </Typography>
        )}
      </CardActions>
    </Card>
  );
};

export default MovieCard;
