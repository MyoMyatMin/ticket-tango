// components/Seat.js
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import ChairIcon from "@mui/icons-material/Chair";

const Seat = ({ row, seatNumber, isAvailable, onSelect }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    if (isAvailable) {
      setSelected(!selected);
      onSelect(row, seatNumber);
    }
  };

  return (
    <Tooltip title={`Row ${row} Seat ${seatNumber} `}>
      <span>
        <IconButton
          onClick={handleClick}
          disabled={!isAvailable}
          color={selected ? "secondary" : "primary"}
        >
          <ChairIcon />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default Seat;
