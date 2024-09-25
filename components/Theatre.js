"use client";
import Seat from "@/components/Seat";
import { useState, useEffect } from "react";
import {
  Typography,
  Stack,
  Box,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableFooter,
} from "@mui/material";
import Screen from "@/components/Screen";
import Grid from "@mui/material/Grid2";
import ChairIcon from "@mui/icons-material/Chair";
import { getSeats } from "@/lib/helpers/getSeats";
import { useRouter } from "next/navigation";

const Theatre = ({ seats, price, movieid }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  // console.log(seats)

  useEffect(() => {
    setTotal(0);
    setSelectedSeats([]);
    // This code will run whenever the `seats` prop changes
    // console.log("Seats updated:", seats);
    // Update any internal state or perform actions based on new seats
  }, [seats]);

  const handleSeatSelect = (seatNumber) => {
    // console.log(seatNumber)

    const seat = seatNumber;

    const seatType = seatNumber.name.charAt(0);
    let seatPrice = 0;

    if (seatType === "S") {
      seatPrice = price.standard;
    } else if (seatType === "P") {
      seatPrice = price.premium;
    } else if (seatType === "V") {
      seatPrice = price.vip;
    }

    if (selectedSeats.includes(seat)) {
      setSelectedSeats((prev) => prev.filter((s) => s !== seat));
      setTotal((prevTotal) => prevTotal - seatPrice);
    } else {
      setSelectedSeats((prev) => [...prev, seat]);
      setTotal((prevTotal) => prevTotal + seatPrice);
    }
  };

  const handleBookNow = () => {
    router.push(
      `/ticket?selectedSeats=${selectedSeats
        .map((s) => s._id)
        .join(",")}&seatNumber=${selectedSeats
        .map((s) => s.name)
        .join(",")}&total=${total}`
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid size={7}>
        <Box
          sx={{
            maxWidth: "600px",
          }}
        >
          <Screen />

          <Grid>
            <Grid
              container
              spacing={4}
              direction="column"
              justifyContent="center"
            >
              <Grid>
                <Grid
                  container
                  display="flex"
                  justifyContent="center"
                  spacing={2}
                >
                  {seats
                    .filter((seat) => seat.type === "standard")
                    .map((seat, index) => (
                      <Grid xs={6} key={index}>
                        <Seat
                          seatNumber={seat}
                          isAvailable={seat.isAvailable}
                          price={seat.price}
                          color={"primary"}
                          onSelect={handleSeatSelect}
                        />
                      </Grid>
                    ))}
                </Grid>
              </Grid>

              <Grid>
                <Grid
                  container
                  display="flex"
                  justifyContent="center"
                  spacing={2}
                >
                  {seats
                    .filter((seat) => seat.type === "premium")
                    .map((seat, index) => (
                      <Grid xs={2} key={index}>
                        <Seat
                          seatNumber={seat}
                          isAvailable={seat.isAvailable}
                          price={seat.price}
                          color={"secondary"}
                          onSelect={handleSeatSelect}
                        />
                      </Grid>
                    ))}
                </Grid>
              </Grid>

              <Grid>
                <Grid
                  container
                  display="flex"
                  justifyContent="center"
                  spacing={2}
                >
                  {seats
                    .filter((seat) => seat.type === "vip")
                    .map((seat, index) => (
                      <Grid xs={2} key={index}>
                        <Seat
                          seatNumber={seat}
                          isAvailable={seat.isAvailable}
                          price={seat.price}
                          color={"info"}
                          onSelect={handleSeatSelect}
                        />
                      </Grid>
                    ))}
                </Grid>
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
                <Stack direction="row" spacing={1} alignItems="center">
                  <ChairIcon sx={{ color: "disabled.main" }} />
                  <Typography>Unavailable</Typography>
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Box>
      </Grid>

      <Grid size={4} offset={1}>
        <TableContainer>
          <Table>
            <TableBody sx={{ border: "2px solid #FF6B6B" }}>
              <TableRow>
                <TableCell sx={{ border: "none" }}>
                  <Typography>Total Seats:</Typography>
                </TableCell>
                <TableCell sx={{ border: "none" }}>
                  <Typography>{selectedSeats.length}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: "none" }}>
                  <Typography>Selected Seats:</Typography>
                </TableCell>
                <TableCell sx={{ maxWidth: "200px", border: "none" }}>
                  <Typography>
                    {" "}
                    {selectedSeats.length > 0
                      ? selectedSeats.map((s) => s.name).join(", ")
                      : "No seats selected"}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ borderColor: "primary.main" }}>
                  <Typography>Price:</Typography>
                </TableCell>
                <TableCell sx={{ borderColor: "primary.main" }}>
                  <Typography>{total}</Typography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleBookNow}
                  >
                    Book Now
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Theatre;
