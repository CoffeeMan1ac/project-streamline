import { Box } from "@mui/material";
import QuotationDetails from "../components/QuotationDetails";
import QuotationsPricingBreakdown from "../components/QuotationsPricingBreakdown";
import QuotationsProductDetails from "../components/QuotationsProductDetails";
import QuotePersonalDetails from "../components/QuotePersonalDetails";

const QuoteDetailsPage = () => {
  return (
    <Box width="70%" sx={{ p: 3 }}>
      <QuotationDetails quotationId="123" timeStamp="today" status="ACCEPTED"/>

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
  );
};

export default QuoteDetailsPage;
