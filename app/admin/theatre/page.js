// "use client";

// import {
//   Box,
//   Button,
//   FormControl,
//   Stack,
//   TextField,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import Grid from "@mui/material/Grid2";
// import Theatre from "@/components/Theatre";
// import { getSeats } from "@/lib/helpers/getSeats";
// import { useState } from "react";

// const TheatrePage = () => {
//   const initialSeats = [];
//   const [Seats, setSeats] = useState(initialSeats);
//   const [standardSeats, setStandardSeats] = useState(0);
//   const [premiumSeats, setPremiumSeats] = useState(0);
//   const [vipSeats, setVipSeats] = useState(0);

//   // Theatre State
//   const [theatres, setTheatres] = useState([]);
//   const [selectedTheatre, setSelectedTheatre] = useState({
//     id: null,
//     name: "",
//     standardSeats: 0,
//     premiumSeats: 0,
//     vipSeats: 0,
//   });

//   const handleClick = () => {
//     // Before adding a theatre, check if it's an update or a new addition
//     if (selectedTheatre.id) {
//       // Update existing theatre
//       const updatedTheatres = theatres.map((theatre) =>
//         theatre.id === selectedTheatre.id
//           ? { ...selectedTheatre, standardSeats, premiumSeats, vipSeats }
//           : theatre
//       );
//       setTheatres(updatedTheatres);
//     } else {
//       const newTheatre = {
//         id: theatres.length + 1,
//         name: selectedTheatre.name,
//         standardSeats,
//         premiumSeats,
//         vipSeats,
//       };
//       setTheatres([...theatres, newTheatre]);
//     }

//     resetForm();
//   };

//   const showTheatre = () => {
//     const newSeats = [
//       ...Array.from({ length: standardSeats }, (_, index) => ({
//         name: `Standard Seat ${Seats.length + index + 1}`,
//         type: "Standard",
//         isAvailable: true,
//       })),
//       ...Array.from({ length: premiumSeats }, (_, index) => ({
//         name: `Premium Seat ${Seats.length + index + 1}`,
//         type: "Premium",
//         isAvailable: true,
//       })),
//       ...Array.from({ length: vipSeats }, (_, index) => ({
//         name: `VIP Seat ${Seats.length + index + 1}`,
//         type: "VIP",
//         isAvailable: true,
//       })),
//     ];

//     // Add new seats to existing seats
//     setSeats([...newSeats]);
//   };

//   const updateTheatre = (id) => {
//     const theatreToUpdate = theatres.find((theatre) => theatre.id === id);
//     if (theatreToUpdate) {
//       setSelectedTheatre(theatreToUpdate);
//       setStandardSeats(theatreToUpdate.standardSeats);
//       setPremiumSeats(theatreToUpdate.premiumSeats);
//       setVipSeats(theatreToUpdate.vipSeats);
//     }
//   };

//   const deleteTheatre = (id) => {
//     setTheatres(theatres.filter((theatre) => theatre.id !== id));
//   };

//   const resetForm = () => {
//     setStandardSeats(0);
//     setPremiumSeats(0);
//     setVipSeats(0);
//     setSelectedTheatre({
//       id: null,
//       name: "",
//       standardSeats: 0,
//       premiumSeats: 0,
//       vipSeats: 0,
//     });
//   };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <Grid container spacing={2}>
//         <Grid size={6}>
//           <Stack spacing={2}>
//             <Typography variant="h6" gutterBottom>
//               Theatre Form
//             </Typography>
//             <FormControl fullWidth required>
//               <TextField
//                 required
//                 id="outlined-required"
//                 label="Theatre Name"
//                 value={selectedTheatre.name}
//                 onChange={(e) =>
//                   setSelectedTheatre({
//                     ...selectedTheatre,
//                     name: e.target.value,
//                   })
//                 }
//               />
//             </FormControl>

//             <FormControl fullWidth required>
//               <TextField
//                 id="standard-seats"
//                 label="Number of Standard Seats"
//                 type="number"
//                 value={standardSeats}
//                 onChange={(e) => setStandardSeats(Number(e.target.value))}
//               />
//             </FormControl>

//             <FormControl fullWidth required>
//               <TextField
//                 id="premium-seats"
//                 label="Number of Premium Seats"
//                 type="number"
//                 value={premiumSeats}
//                 onChange={(e) => setPremiumSeats(Number(e.target.value))}
//               />
//             </FormControl>

//             <FormControl fullWidth required>
//               <TextField
//                 id="vip-seats"
//                 label="Number of VIP Seats"
//                 type="number"
//                 value={vipSeats}
//                 onChange={(e) => setVipSeats(Number(e.target.value))}
//               />
//             </FormControl>

//             <Button variant="contained" onClick={showTheatre}>
//               Sample Theatre
//             </Button>
//             <Button variant="contained" onClick={handleClick}>
//               {selectedTheatre.id ? "Update" : "Add"}
//             </Button>
//           </Stack>

//           <br />
//           <Typography variant="h6" gutterBottom>
//             Theatre List
//           </Typography>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Theatre Name</TableCell>
//                   <TableCell>Standard Seats</TableCell>
//                   <TableCell>Premium Seats</TableCell>
//                   <TableCell>VIP Seats</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {theatres.map((theatre) => (
//                   <TableRow key={theatre.id}>
//                     <TableCell>{theatre.name}</TableCell>
//                     <TableCell>{theatre.standardSeats}</TableCell>
//                     <TableCell>{theatre.premiumSeats}</TableCell>
//                     <TableCell>{theatre.vipSeats}</TableCell>
//                     <TableCell>
//                       <Button
//                         variant="outlined"
//                         color="primary"
//                         onClick={() => updateTheatre(theatre.id)}
//                       >
//                         Update
//                       </Button>
//                       <Button
//                         variant="outlined"
//                         color="secondary"
//                         onClick={() => deleteTheatre(theatre.id)}
//                       >
//                         Delete
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Grid>

//         <Grid item xs={5} offset={1}>
//           <Theatre isadmin={true} seats={Seats} />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default TheatrePage;
"use client";

import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Theatre from "@/components/Theatre";

export default function TheatrePage() {
  const [theatres, setTheatres] = useState([]);
  const [selectedTheatre, setSelectedTheatre] = useState({
    id: 0,
    name: "",
    standardSeats: 0,
    premiumSeats: 0,
    vipSeats: 0,
    seats: [],
  });
  const [sampleSeats, setSampleSeats] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedTheatre((prev) => ({
      ...prev,
      [name]: name === "name" ? value : Number(value),
    }));
  };

  const generateSeats = (standard, premium, vip) => {
    return [
      ...Array.from({ length: standard }, (_, index) => ({
        name: `Standard Seat ${index + 1}`,
        type: "Standard",
        isAvailable: true,
      })),
      ...Array.from({ length: premium }, (_, index) => ({
        name: `Premium Seat ${index + 1}`,
        type: "Premium",
        isAvailable: true,
      })),
      ...Array.from({ length: vip }, (_, index) => ({
        name: `VIP Seat ${index + 1}`,
        type: "VIP",
        isAvailable: true,
      })),
    ];
  };

  const handleShowSample = () => {
    const seats = generateSeats(
      selectedTheatre.standardSeats,
      selectedTheatre.premiumSeats,
      selectedTheatre.vipSeats
    );
    setSampleSeats(seats);
  };

  const handleSubmit = () => {
    const seats = generateSeats(
      selectedTheatre.standardSeats,
      selectedTheatre.premiumSeats,
      selectedTheatre.vipSeats
    );

    if (selectedTheatre.id) {
      setTheatres((prev) =>
        prev.map((theatre) =>
          theatre.id === selectedTheatre.id
            ? { ...selectedTheatre, seats }
            : theatre
        )
      );
    } else {
      const newTheatre = {
        ...selectedTheatre,
        id: Date.now(),
        seats,
      };
      setTheatres((prev) => [...prev, newTheatre]);
    }

    resetForm();
  };

  const updateTheatre = (id) => {
    const theatreToUpdate = theatres.find((theatre) => theatre.id === id);
    if (theatreToUpdate) {
      setSelectedTheatre(theatreToUpdate);
      setSampleSeats(theatreToUpdate.seats);
    }
  };

  const deleteTheatre = (id) => {
    setTheatres((prev) => prev.filter((theatre) => theatre.id !== id));
  };

  const resetForm = () => {
    setSelectedTheatre({
      id: 0,
      name: "",
      standardSeats: 0,
      premiumSeats: 0,
      vipSeats: 0,
      seats: [],
    });
    setSampleSeats([]);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Stack spacing={2}>
            <Typography variant="h6" gutterBottom>
              Theatre Form
            </Typography>
            <FormControl fullWidth required>
              <TextField
                required
                name="name"
                label="Theatre Name"
                value={selectedTheatre.name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl fullWidth required>
              <TextField
                name="standardSeats"
                label="Number of Standard Seats"
                type="number"
                value={selectedTheatre.standardSeats}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl fullWidth required>
              <TextField
                name="premiumSeats"
                label="Number of Premium Seats"
                type="number"
                value={selectedTheatre.premiumSeats}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl fullWidth required>
              <TextField
                name="vipSeats"
                label="Number of VIP Seats"
                type="number"
                value={selectedTheatre.vipSeats}
                onChange={handleInputChange}
              />
            </FormControl>
            <Button variant="outlined" onClick={handleShowSample}>
              Show Sample
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              {selectedTheatre.id ? "Update" : "Add"} Theatre
            </Button>
          </Stack>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Theatre List
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Theatre Name</TableCell>
                  <TableCell>Standard Seats</TableCell>
                  <TableCell>Premium Seats</TableCell>
                  <TableCell>VIP Seats</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {theatres.map((theatre) => (
                  <TableRow key={theatre.id}>
                    <TableCell>{theatre.name}</TableCell>
                    <TableCell>{theatre.standardSeats}</TableCell>
                    <TableCell>{theatre.premiumSeats}</TableCell>
                    <TableCell>{theatre.vipSeats}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => updateTheatre(theatre.id)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => deleteTheatre(theatre.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={5} offset={1}>
          <Theatre isadmin={true} seats={sampleSeats} />
        </Grid>
      </Grid>
    </Box>
  );
}
