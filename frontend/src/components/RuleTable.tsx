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
    status: "active" | "inactive";
    numberOfConditions: number;
    outcome: string;
  }[];
}

const RuleTable: React.FC<RuleTableProps> = ({ rules }) => {
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
          Rules for Standard Shield
        </Typography>

        <Typography variant="body2" color="text.secondary">
          2 active, 1 inactive
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Drag</TableCell>
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
    </Box>
  );
};

export default RuleTable;
