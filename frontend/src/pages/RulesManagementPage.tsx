import Button from "@mui/material/Button";
import RuleTable from "../components/RuleTable";
import SelectProduct from "../components/SelectProduct";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const testRules: {
  order: number;
  ruleName: string;
  active: boolean;
  numberOfConditions: number;
  decision: string;
  premium: string;
}[] = [
  {
    order: 1,
    ruleName: "Age Limit Check",
    active: true,
    numberOfConditions: 1,
    decision: "accept",
    premium: "+10%",
  },
  {
    order: 2,
    ruleName: "Device Age Validation",
    active: true,
    numberOfConditions: 1,
    decision: "accept",
    premium: "+5%",
  },
  {
    order: 3,
    ruleName: "Premium Adjustment",
    active: false,
    numberOfConditions: 1,
    decision: "accept",
    premium: "+15%",
  },
];

const RulesManagementPage = () => {
  const [selectedProduct, setSelectedProduct] = useState("");

  return (
    <>
      <Box sx={{ mx: 20, my: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Rules Management
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Manage underwriting rules per product
            </Typography>
          </Box>
          <Box>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              + Create New Rule
            </Button>
          </Box>
        </Box>
        <Box sx={{ my: 4 }}>
          <SelectProduct selectedProduct={selectedProduct} onProductChange={setSelectedProduct} />
        </Box>
        <RuleTable rules={testRules} activeProductName={selectedProduct || undefined} />
      </Box>
    </>
  );
};

export default RulesManagementPage;
