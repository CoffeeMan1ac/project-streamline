import { Box, Button } from "@mui/material";
import QuotationDetails from "../components/QuotationDetails";
import QuotationsPricingBreakdown from "../components/QuotationsPricingBreakdown";
import QuotationsProductDetails from "../components/QuotationsProductDetails";
import QuotePersonalDetails from "../components/QuotePersonalDetails";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";

const QuoteDetailsPage = () => {
  const navigate = useNavigate();
  return (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{ p: 3 }}>
      <Box width="100%" maxWidth="1200px">
        <Button
          onClick={() => navigate("/quotes")}
          variant="text"
          size="small"
          sx={{ color: "text.secondary", mb: 2 }}
        >
          <NavigateBeforeIcon />
          Back to Quotations
        </Button>
      </Box>

      <Box width="100%">
        <QuotationDetails
          quotationId="PS-2024-001234"
          timeStamp="2024-03-15 14:30"
          status="ACCEPTED"
        />

        <Box
          sx={{
            display: "flex",
            gap: 3,
            mt: 3,
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: "40%",
            }}
          >
            <QuotePersonalDetails
              fullName="John Smith"
              email="john.smith@email.com"
              phone="+353 87 123 4567"
              dateOfBirth="15 May 1992"
              address="123 Main Street, Dublin 2, Ireland"
            />

            <QuotationsProductDetails productName="Premium Shield" />
          </Box>

          <Box sx={{ width: "60%" }}>
            <QuotationsPricingBreakdown
              basePrice="€10.00"
              premiumName="Premium Shield"
              finalPremium="€12.50"
              rules={[
                {
                  ruleName: "Age Limit Check",
                  ruleDescription: "Customer age 32 within acceptable range",
                  ruleAmount: "€0.00",
                  type: "neutral",
                },
                {
                  ruleName: "Device Age Validation",
                  ruleDescription: "Device age 18 months - premium loading applied",
                  ruleAmount: "+€1.50",
                  type: "negative",
                },
                {
                  ruleName: "Loyalty Discount",
                  ruleDescription: "Returning customer discount applied",
                  ruleAmount: "-€1.00",
                  type: "positive",
                },
              ]}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default QuoteDetailsPage;
