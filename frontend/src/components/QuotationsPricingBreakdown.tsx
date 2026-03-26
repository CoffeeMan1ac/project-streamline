import { Box, Typography, Paper } from "@mui/material";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import RuleApplied from "./RuleApplied";

type Rule = {
  ruleName: string;
  ruleDescription: string;
  ruleAmount: string;
  isOverride: boolean;
  type: "neutral" | "positive" | "negative";
};

type QuotationsPricingBreakdownProps = {
  basePrice: string;
  premiumName: string;
  finalPremium: string;
  rules: Rule[];
};

const QuotationsPricingBreakdown = ({
  basePrice,
  premiumName,
  finalPremium,
  rules,
}: QuotationsPricingBreakdownProps) => {
  return (
    <Box>
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
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
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
              Starting premium for {premiumName}
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {basePrice}
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
            borderTop: "1px solid",
            borderColor: "divider",
            pt: 2,
          }}
        >
          RULES APPLIED
        </Typography>

        {/* loop through rules*/}
        {(() => {
          const overrideIndex = rules.findIndex((r) => r.isOverride);
          return rules.map((rule, index) => (
            <RuleApplied
              key={index}
              ruleName={rule.ruleName}
              ruleDescription={rule.ruleDescription}
              ruleAmount={rule.ruleAmount}
              type={rule.type}
              isOverride={rule.isOverride}
              isSuperseded={overrideIndex !== -1 && index < overrideIndex}
            />
          ));
        })()}
        <Box height={16} />

        {/* Final Premium */}
        <Box
          sx={{
            borderTop: "1px solid",
            borderColor: "divider",
            pt: 2,
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
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
              {finalPremium}
            </Typography>
          </Box>

          <Box
            sx={{
              mt: 2,
              p: 2,
              borderRadius: 2,
              backgroundColor: "background.paper",
            }}
          >
            {/* Base price */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
              <Typography sx={{ fontSize: 12, color: "text.secondary" }}>Base Price</Typography>

              <Typography sx={{ fontSize: 12 }}>{basePrice}</Typography>
            </Box>

            {/* Rules that change price */}
            {(() => {
              const overrideIndex = rules.findIndex((r) => r.isOverride);
              return rules
                .filter((rule) => rule.type !== "neutral")
                .map((rule, index) => {
                  const isSuperseded = overrideIndex !== -1 && index < overrideIndex;
                  return (
                    <Box
                      key={index}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={0.5}
                    >
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: isSuperseded ? "text.disabled" : "text.secondary",
                          textDecoration: isSuperseded ? "line-through" : "none",
                        }}
                      >
                        {rule.ruleName}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: isSuperseded
                            ? "text.disabled"
                            : rule.type === "negative"
                              ? "error.main"
                              : rule.type === "positive"
                                ? "success.main"
                                : "text.primary",
                          textDecoration: isSuperseded ? "line-through" : "none",
                        }}
                      >
                        {rule.ruleAmount}
                      </Typography>
                    </Box>
                  );
                });
            })()}

            {/* Show override row clearly */}
            {rules.some((r) => r.isOverride) && (
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                <Typography sx={{ fontSize: 12, color: "warning.dark", fontWeight: 600 }}>
                  ⚡ Override applied
                </Typography>
                <Typography sx={{ fontSize: 12, color: "warning.dark", fontWeight: 600 }}>
                  {rules.find((r) => r.isOverride)?.ruleAmount}
                </Typography>
              </Box>
            )}

            {/* Divider */}
            <Box
              sx={{
                borderTop: "1px solid",
                borderColor: "divider",
                mt: 1,
                pt: 1,
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  Total
                </Typography>

                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {finalPremium}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default QuotationsPricingBreakdown;
