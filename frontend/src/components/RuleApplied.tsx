import { Box, Typography, Paper, Chip } from "@mui/material";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import HorizontalRuleOutlinedIcon from "@mui/icons-material/HorizontalRuleOutlined";
import FlashOnOutlinedIcon from "@mui/icons-material/FlashOnOutlined";

type RuleAppliedProps = {
  ruleName: string;
  ruleDescription: string;
  ruleAmount: string;
  type: "neutral" | "positive" | "negative";
  isOverride?: boolean;
  isSuperseded?: boolean;
};

const RuleApplied = ({
  ruleName,
  ruleDescription,
  ruleAmount,
  type,
  isOverride = false,
  isSuperseded = false,
}: RuleAppliedProps) => {
  let icon;
  let color;

  if (isSuperseded) {
    icon = <HorizontalRuleOutlinedIcon sx={{ fontSize: 16, color: "text.disabled", mt: "2px" }} />;
    color = "text.disabled";
  } else if (isOverride) {
    icon = <FlashOnOutlinedIcon sx={{ fontSize: 16, color: "warning.main", mt: "2px" }} />;
    color = "warning.main";
  } else if (type === "negative") {
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
        borderColor: isOverride ? "warning.light" : isSuperseded ? "divider" : "divider",
        bgcolor: isOverride ? "warning.50" : isSuperseded ? "action.hover" : "background.paper",
        mb: 1.5,
        opacity: isSuperseded ? 0.7 : 1,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box display="flex" alignItems="flex-start" gap={1}>
          {icon}
          <Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: isSuperseded ? "line-through" : "none",
                  color: isSuperseded ? "text.disabled" : "text.primary",
                }}
              >
                {ruleName}
              </Typography>
              {isOverride && (
                <Chip
                  label="Override"
                  size="small"
                  sx={{
                    bgcolor: "#FEF3C7",
                    color: "#B45309",
                    fontWeight: 600,
                    height: 18,
                    fontSize: 10,
                  }}
                />
              )}
            </Box>
            <Typography
              sx={{
                fontSize: 12,
                color: isSuperseded ? "text.disabled" : "text.secondary",
                mt: 0.5,
                textDecoration: isSuperseded ? "line-through" : "none",
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
            textDecoration: isSuperseded ? "line-through" : "none",
          }}
        >
          {ruleAmount}
        </Typography>
      </Box>
    </Paper>
  );
};

export default RuleApplied;
