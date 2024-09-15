import React from "react";
import { Box, Typography } from "@mui/material";

export default function CinemaScreen({
  width = 600,
  height = 50,
  color = "currentColor",
  className = "",
}) {
  const middleX = width / 2;
  const bottomY = height;

  const controlX = middleX;
  const controlY = -height * 0.8;

  return (
    <Box
      className={className}
      sx={{
        width: "100%",
        maxWidth: `${width}px`,
        mx: "auto",
      }}
    >
      <Typography
        variant="h5"
        color="text.secondary.main"
        align="center"
        sx={{ mt: 1 }}
      >
        Screen
      </Typography>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMax meet"
      >
        <path
          d={`M 0 ${bottomY} Q ${controlX} ${controlY} ${width} ${bottomY}`}
          fill="none"
          stroke={color}
          strokeWidth="4"
        />
      </svg>
      
    </Box>
  );
}
