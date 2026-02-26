import React from "react";
import RuleRow from "./RuleRow";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Box,
  Typography,
} from "@mui/material";

interface RuleTableProps {
  rules: {
    order: number;
    ruleName: string;
    active: boolean;
    numberOfConditions: number;
    decision: string;
    premium: string;
  }[];
  activeProductName?: string;
  numberOfActiveRules?: number;
  numberOfInactiveRules?: number;
}

const RuleTable: React.FC<RuleTableProps> = ({ rules, activeProductName, numberOfActiveRules, numberOfInactiveRules }) => {
  return (
    <Box border={1} borderColor="divider" borderRadius={2} bgcolor={"background.paper"}>
      <Box
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Rules for {activeProductName || "Standard Shield"}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {numberOfActiveRules || 0} active, {numberOfInactiveRules || 0} inactive
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "background.default" }}>
              <TableCell>Drag</TableCell>
              <TableCell>Order</TableCell>
              <TableCell>Rule Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Conditions</TableCell>
              <TableCell>Decision</TableCell>
              <TableCell>Premium</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rules.map((rule, idx) => (
              <RuleRow
                key={idx}
                order={rule.order}
                ruleName={rule.ruleName}
                active={rule.active}
                numberOfConditions={rule.numberOfConditions}
                decision={rule.decision}
                premium={rule.premium}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RuleTable;
