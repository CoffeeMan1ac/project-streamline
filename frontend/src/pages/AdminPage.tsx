import RuleTable from "../components/RuleTable";
import Box from "@mui/material/Box";
const testRules: {
  order: number;
  ruleName: string;
  status: "active" | "inactive";
  numberOfConditions: number;
  outcome: string;
}[] = [
  {
    order: 1,
    ruleName: "Age Limit Check",
    status: "active",
    numberOfConditions: 1,
    outcome: "Decision: accept",
  },
  {
    order: 2,
    ruleName: "Device Age Validation",
    status: "active",
    numberOfConditions: 1,
    outcome: "Decision: accept",
  },
  {
    order: 3,
    ruleName: "Premium Adjustment",
    status: "inactive",
    numberOfConditions: 1,
    outcome: "Delta: +€2.00",
  },
];

const AdminPage = () => {
  return (
    <>
      <Box sx={{ mx: 20, my: 4 }}>
        <RuleTable rules={testRules} />
      </Box>
    </>
  );
};

export default AdminPage;
