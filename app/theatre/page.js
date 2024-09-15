import Theatre from "@/components/Theatre";
import { Box, Divider } from "@mui/material";
const TheatrePage = () => {
  return (
    <div>
      <h1>Movie Poster</h1>
      <h2>Time slot</h2>
      <Divider sx={{ borderColor: "primary.main", marginX: 2, marginY: 2 }} />


      <Box display="flex" justifyContent="center" alignItems="center">
        <Theatre />
      </Box>
    </div>
  );
};

export default TheatrePage;
