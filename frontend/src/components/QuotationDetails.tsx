import { Box, Typography, Chip, Paper } from "@mui/material";

const QuotationDetails = () => {
  return (
    <Box>
      <Paper
        elevation={1}
        sx={{
          p: 2,
          borderRadius: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography fontWeight={600} fontSize={18}>
            PS-2024-001234
          </Typography>

          <Typography variant="body2" color="text.secondary">
            2024-03-15 14:30
          </Typography>
        </Box>

        <Chip
          label="ACCEPTED"
          color="success"
          variant="outlined"
          sx={{
            fontWeight: 600,
            bgcolor: "success.light",
            px: 1,
          }}
        />
      </Paper>
    </Box>
  );
};

export default QuotationDetails;
