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
} from "@mui/material";

interface RuleTableProps {
  rules: {
    order: number;
    ruleName: string;
    status: "active" | "inactive";
    numberOfConditions: number;
    outcome: string;
  }[];
}

const RuleTable: React.FC<RuleTableProps> = ({ rules }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order</TableCell>
            <TableCell>Rule Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Conditions</TableCell>
            <TableCell>Outcome</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rules.map((rule, idx) => (
            <RuleRow
              key={idx}
              order={rule.order}
              ruleName={rule.ruleName}
              status={rule.status}
              numberOfConditions={rule.numberOfConditions}
              outcome={rule.outcome}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RuleTable;
