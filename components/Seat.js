// components/Seat.js
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import ChairIcon from "@mui/icons-material/Chair";

const Seat = ({ seatNumber, isAvailable, onSelect, color }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    if (isAvailable) {
      setSelected(!selected);
      onSelect(seatNumber);
    }
  };

  return (
    // <Tooltip title={`Row ${row} Seat ${seatNumber} `}>
      <span>
        <IconButton
          onClick={handleClick}
          disabled={!isAvailable}
          color={selected ? "success" : color}
        >
          <ChairIcon />
        </IconButton>
      </span>
    // </Tooltip>
  );
};

export default Seat;
