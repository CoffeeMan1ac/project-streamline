import { Box, Typography, Chip, Paper } from "@mui/material";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

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
          <Box display="flex" alignItems="center" gap={1}>
            <DescriptionOutlinedIcon color="primary" sx={{ fontSize: 25, mr: 0.5 }} />
            <Typography fontWeight={600} fontSize={25}>
                PS-2024-001234
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mt={0.5}>
            <CalendarTodayOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
                2024-03-15 14:30
            </Typography>
          </Box>
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
