import { IconButton } from "@mui/material";
import { useState } from "react";
import ChairIcon from "@mui/icons-material/Chair";

const Seat = ({ seatNumber, isAvailable, onSelect, color }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    if (isAvailable) {
      if (onSelect) {
        setSelected(!selected);
        onSelect(seatNumber);
      }
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
