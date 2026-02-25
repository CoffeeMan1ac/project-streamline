import RuleTable from "../components/RuleTable";
import SelectProduct from "../components/SelectProduct";
import Box from "@mui/material/Box";
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
        <SelectProduct />
        <RuleTable rules={testRules} />
      </Box>
    </>
  );
};

export default RulesManagementPage;
