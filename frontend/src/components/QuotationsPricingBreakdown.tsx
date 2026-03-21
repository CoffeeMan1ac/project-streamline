import { Box, Typography, Paper } from "@mui/material";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";

const QuotationsPricingBreakdown = () => {
  return (
    <Box width="60%">
      <Paper
        sx={{
          p: 3,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        {/* Header */}
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <AttachMoneyOutlinedIcon color="primary" />
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Pricing Breakdown
          </Typography>
        </Box>

        {/* Base Price */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Base Price
            </Typography>

            <Typography
              sx={{
                fontSize: 12,
                color: "text.secondary",
              }}
            >
              Starting premium for Premium Shield
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            €10.00
          </Typography>
        </Box>

        {/* Rules Applied */}
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 600,
            color: "text.secondary",
            letterSpacing: 0.5,
            mb: 1,
          }}
        >
          RULES APPLIED
        </Typography>

        {/* RULES COMPONENT WILL GO HERE */}

        <Box height={16} />

        {/* Final Premium */}
        <Box
          sx={{
            borderTop: "1px solid",
            borderColor: "divider",
            pt: 2,
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Final Premium
              </Typography>

              <Typography
                sx={{
                  fontSize: 12,
                  color: "text.secondary",
                }}
              >
                Monthly payment
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 700,
                color: "primary.main",
              }}
            >
              €12.50
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default QuotationsPricingBreakdown;