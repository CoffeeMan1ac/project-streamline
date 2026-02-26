import Button from "@mui/material/Button";
import RuleTable from "../components/RuleTable";
import SelectProduct from "../components/SelectProduct";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const testRules: {
  order: number;
  ruleName: string;
  status: "active" | "inactive";
  numberOfConditions: number;
  decision: string;
  premium: string;
}[] = [
  {
    order: 1,
    ruleName: "Age Limit Check",
    status: "active",
    numberOfConditions: 1,
    decision: "accept",
    premium: "+10%",
  },
  {
    order: 2,
    ruleName: "Device Age Validation",
    status: "active",
    numberOfConditions: 1,
    decision: "accept",
    premium: "+5%",
  },
  {
    order: 3,
    ruleName: "Premium Adjustment",
    status: "inactive",
    numberOfConditions: 1,
    decision: "accept",
    premium: "+15%",
  },
];

const RulesManagementPage = () => {
  return (
    <>
      <Box sx={{ mx: 20, my: 4 }}>
        <Box>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Rules Management
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Manage underwriting rules per product
            </Typography>
          </Box>
          <Box>
            <Button>+ Create New Rule</Button>
          </Box>
        </Box>
        <Box sx={{ my: 4 }}>
          <SelectProduct />
        </Box>
        <RuleTable rules={testRules} />
      </Box>
    </>
  );
};

export default RulesManagementPage;
