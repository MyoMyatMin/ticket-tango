import Movies from "@/components/Movies";
import QuickSearch from "@/components/QuickSearch";
import { Box, Divider } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "background.default",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Box sx={{ maxWidth: "600px", margin: "auto", width: "100%" }}>
        <QuickSearch />
      </Box>

      <Divider sx={{ borderColor: "primary.main", marginX: 2 }} />

      <Movies />
    </Box>
  );
}
