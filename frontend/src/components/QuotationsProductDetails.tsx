import { Box, Typography, Paper } from "@mui/material";
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';

const QuotationsProductDetails = () => {
  return (
    <Box width="40%">
      <Paper
        sx={{
          p: 3,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <ArchiveOutlinedIcon color="primary" />
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 600,
              lineHeight: 1,
              fontStyle: "bold",
            }}
          >
                Product Details
            </Typography>
        </Box>
          <Typography
            sx={{
              fontSize: 11,
              color: "text.secondary",
              fontWeight: 600,
              letterSpacing: 0.5,
              mb: 0.5,
            }}
          >
            Product
        </Typography>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Premium Shield
        </Typography>
      </Paper>
    </Box>
  );
};

export default QuotationsProductDetails;