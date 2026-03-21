import { Box, Typography, Paper } from "@mui/material";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingDownOutlinedIcon from '@mui/icons-material/TrendingDownOutlined';
import HorizontalRuleOutlinedIcon from '@mui/icons-material/HorizontalRuleOutlined';

type RuleAppliedProps = {
  ruleName: string;
  ruleDescription: string;
  ruleAmount: string;
  type : "neutral" | "positive" | "negative";
};

const RuleApplied = ({
  ruleName,
  ruleDescription,
  ruleAmount,
  type,
}: RuleAppliedProps) => {

  let icon;
  let color;

  if (type === "negative") {
    icon = <TrendingUpOutlinedIcon sx={{ fontSize: 16, color: "error.main", mt: "2px" }} />;
    color = "error.main";
  } else if (type === "positive") {
    icon = <TrendingDownOutlinedIcon sx={{ fontSize: 16, color: "success.main", mt: "2px" }} />;
    color = "success.main";
  } else {
    icon = <HorizontalRuleOutlinedIcon sx={{ fontSize: 16, color: "text.secondary", mt: "2px" }} />;
    color = "text.secondary";
  }
  
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
          {icon}
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
            color: color,
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