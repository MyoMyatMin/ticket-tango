"use client";
import { Box, TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
    const [passcode, setPasscode] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

  const handleSubmit = async () => {
    const res = await fetch("/api/validate-passcode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ passcode }),
    });

    const data = await res.json();
    if (data.success) {
      setError("");
      localStorage.setItem("authenticated", "true");
      router.push("/admin/showtime");
    } else {
      setError("Invalid passcode");
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "background.default",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        maxWidth: 600,
        margin: "0 auto",
      }}
    >
      <h1>Enter Passcode</h1>
      <TextField
        type="password"
        label="Passcode"
        value={passcode}
        onChange={(e) => setPasscode(e.target.value)}
        error={!!error}
        helperText={error}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
}
