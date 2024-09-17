import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import ChairIcon from "@mui/icons-material/Chair";

const Seat = ({ seatNumber, isAvailable, onSelect, color }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    if (isAvailable) {
      if (onSelect) {
        // Toggle selection and call onSelect if it is provided
        setSelected(!selected);
        onSelect(seatNumber);
      }
      // If onSelect is not provided, do nothing or handle as needed
    }
  };

  return (
    <span>
      <IconButton
        onClick={handleClick}
        disabled={!isAvailable}
        color={selected ? "success" : color}
      >
        <ChairIcon />
      </IconButton>
    </span>
  );
};

export default Seat;
