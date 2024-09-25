import { Typography, Stack, Box, IconButton } from "@mui/material";
import Screen from "@/components/Screen";
import Grid from "@mui/material/Grid2";
import ChairIcon from "@mui/icons-material/Chair";

const SampleTheatre = ({ numberOfSeats }) => {
  return (
    <Box
      sx={{
        maxWidth: "600px",
      }}
    >
      <Screen />

      <Grid container direction="column" justifyContent="center" marginTop={3}>
        <Grid
          container
          display="flex"
          justifyContent="center"
          spacing={2}
          marginBottom={2}
        >
          {Array.from({ length: numberOfSeats?.standard }).map((_, index) => (
            <IconButton key={`standard-${index}`} color="primary">
              <ChairIcon />
            </IconButton>
          ))}
        </Grid>

        <Grid
          container
          display="flex"
          justifyContent="center"
          spacing={2}
          marginBottom={2}
        >
          {Array.from({ length: numberOfSeats?.premium }).map((_, index) => (
            <IconButton key={`premium-${index}`} color="secondary">
              <ChairIcon />
            </IconButton>
          ))}
        </Grid>

        <Grid
          container
          display="flex"
          justifyContent="center"
          spacing={2}
          marginBottom={2}
        >
          {Array.from({ length: numberOfSeats?.vip }).map((_, index) => (
            <IconButton key={`vip-${index}`} color="info">
              <ChairIcon />
            </IconButton>
          ))}
        </Grid>
      </Grid>

      <Box mt={4} display="flex" justifyContent="center">
        <Stack direction="row" spacing={4} alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <ChairIcon sx={{ color: "primary.main" }} />
            <Typography>Standard</Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <ChairIcon sx={{ color: "secondary.main" }} />
            <Typography>Premium</Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <ChairIcon sx={{ color: "info.main" }} />
            <Typography>VIP</Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default SampleTheatre;
