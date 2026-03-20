import { Box, Typography, Paper } from "@mui/material";

const QuotePersonalDetails = () => {
  return (
    <Box>
      <Paper
        sx={{
          p: 2,
          borderRadius: 2,
          border: 1,
          borderColor: "divider",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h6">Personal Details</Typography>
        </Box>

        <Box>
          <Typography variant="h6">FULL NAME</Typography>
          <Box>
            <Typography variant="h6">John Smith</Typography>
          </Box>
        </Box>

        <Box>
          <Typography variant="h6">EMAIL</Typography>
          <Box>
            <Typography variant="h6">john.smith@email.com</Typography>
          </Box>
        </Box>

        <Box>
          <Typography variant="h6">PHONE</Typography>
          <Box>
            <Typography variant="h6">+353 XXX XXXXX</Typography>
          </Box>
        </Box>

        <Box>
          <Typography variant="h6">DATE OF BIRTH</Typography>
          <Box>
            <Typography variant="h6">John Smith</Typography>
          </Box>
        </Box>

        <Box>
          <Typography variant="h6">ADDRESS</Typography>
          <Box>
            <Typography variant="h6">John Smith</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default QuotePersonalDetails;
