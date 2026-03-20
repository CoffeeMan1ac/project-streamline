import { Box, Typography, Paper } from "@mui/material";

const QuotePersonalDetails = () => {
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
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 600,
            mb: 2,
          }}
        >
          Personal Details
        </Typography>

        <Box mb={1.5}>
          <Typography
            sx={{
              fontSize: 11,
              color: "text.secondary",
              fontWeight: 600,
              letterSpacing: 0.5,
            }}
          >
            FULL NAME
          </Typography>

          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            John Smith
          </Typography>
        </Box>

        <Box mb={1.5}>
          <Typography
            sx={{
              fontSize: 11,
              color: "text.secondary",
              fontWeight: 600,
              letterSpacing: 0.5,
            }}
          >
            EMAIL
          </Typography>

          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            john.smith@email.com
          </Typography>
        </Box>

        <Box mb={1.5}>
          <Typography
            sx={{
              fontSize: 11,
              color: "text.secondary",
              fontWeight: 600,
              letterSpacing: 0.5,
            }}
          >
            PHONE
          </Typography>

          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            +353 87 123 4567
          </Typography>
        </Box>

        <Box mb={1.5}>
          <Typography
            sx={{
              fontSize: 11,
              color: "text.secondary",
              fontWeight: 600,
              letterSpacing: 0.5,
            }}
          >
            DATE OF BIRTH
          </Typography>

          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            15 May 1992
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: 11,
              color: "text.secondary",
              fontWeight: 600,
              letterSpacing: 0.5,
            }}
          >
            ADDRESS
          </Typography>

          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            123 Main Street, Dublin 2, Ireland
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default QuotePersonalDetails;
