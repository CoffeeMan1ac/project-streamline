import { Box, Container, Typography, Grid } from "@mui/material";
import PricingCard from "./PricingCard";
import type { PricingPlan } from "./PricingCard";

const plans: PricingPlan[] = [
  {
    name: "Standard Shield",
    price: "€9.99",
    popular: false,
    features: [
      { label: "Accidental damage cover", included: true },
      { label: "Cracked screen protection", included: true },
      { label: "Liquid damage cover", included: true },
      { label: "UK-based claims support", included: true },
      { label: "24-hour replacement service", included: true },
      { label: "Theft protection", included: false },
      { label: "Loss coverage", included: false },
      { label: "Global coverage", included: false },
    ],
  },
  {
    name: "Premium Shield",
    price: "€14.99",
    popular: true,
    features: [
      { label: "Accidental damage cover", included: true },
      { label: "Cracked screen protection", included: true },
      { label: "Liquid damage cover", included: true },
      { label: "Theft protection", included: true },
      { label: "Loss coverage", included: true },
      { label: "Worldwide emergency support", included: true },
      { label: "Next-day replacement", included: true },
      { label: "No excess on first claim", included: true },
      { label: "Global coverage", included: false },
    ],
  },
  {
    name: "Global Shield",
    price: "€19.99",
    popular: false,
    features: [
      { label: "Accidental damage cover", included: true },
      { label: "Cracked screen protection", included: true },
      { label: "Liquid damage cover", included: true },
      { label: "Theft protection", included: true },
      { label: "Loss coverage", included: true },
      { label: "Global coverage in 150+ countries", included: true },
      { label: "International theft protection", included: true },
      { label: "24/7 multilingual support", included: true },
      { label: "Same-day replacement worldwide", included: true },
      { label: "Travel insurance included", included: true },
    ],
  },
];

const PricingSection = () => {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        
        {/* Section Header */}
        <Box textAlign="center" mb={5}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Choose Your Protection Plan
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Select the coverage that best fits your lifestyle.
            All plans include fast claims processing and expert support.
          </Typography>
        </Box>

        {/* Pricing Cards */}
        <Grid container spacing={4} justifyContent="center">
          {plans.map((plan) => (
            <Grid size={{ xs: 12, md: 4 }} key={plan.name}>
              <PricingCard plan={plan} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default PricingSection;