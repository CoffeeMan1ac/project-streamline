import QuotationsPricingBreakdown from "../components/QuotationsPricingBreakdown";

const Sandbox = () => {
  return (
    <>
      <h1>Sandbox for viewing components</h1>

      <QuotationsPricingBreakdown
        basePrice="€10.00"
        premiumName="Premium Shield"
        finalPremium="€12.50"
        rules={[
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
          {
            ruleName: "Age Limit Check",
            ruleDescription: "Customer age within acceptable range",
            ruleAmount: "€0.00",
            type: "neutral",
          },
        ]}
      />
    </>
  );
};

export default Sandbox;