import { Box, Typography, Paper } from "@mui/material";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";

type RuleAppliedProps = {
  ruleName: string;
  ruleDescription: string;
  ruleAmount: string;
};

const RuleApplied = ({
  ruleName,
  ruleDescription,
  ruleAmount,
}: RuleAppliedProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        mb: 1.5,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box display="flex" alignItems="flex-start" gap={1}>
          <TrendingUpOutlinedIcon
            sx={{
              fontSize: 16,
              color: "error.main",
              mt: "2px",
            }}
          />

          <Box>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {ruleName}
            </Typography>

            <Typography
              sx={{
                fontSize: 12,
                color: "text.secondary",
                mt: 0.5,
              }}
            >
              {ruleDescription}
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 600,
            color: "error.main",
            ml: 2,
            whiteSpace: "nowrap",
          }}
        >
          {ruleAmount}
        </Typography>
      </Box>
    </Paper>
  );
};

export default RuleApplied;