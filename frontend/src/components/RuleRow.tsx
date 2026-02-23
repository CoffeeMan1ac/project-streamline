import React from "react";
import { TableRow, TableCell, Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

interface RuleRowProps {
  order: number;
  ruleName: string;
  status: "active" | "inactive";
  numberOfConditions: number;
  outcome: string;
}

const RuleRow: React.FC<RuleRowProps> = ({
  order,
  ruleName,
  status,
  numberOfConditions,
  outcome,
}) => {
  return (
    <TableRow>
      <TableCell>{order}</TableCell>

      <TableCell>{ruleName}</TableCell>

      <TableCell>
        <Chip label={status} size="small" color={status === "active" ? "success" : "default"} />
      </TableCell>

      <TableCell>{numberOfConditions} condition(s)</TableCell>

      <TableCell>{outcome}</TableCell>

      <TableCell>
        <IconButton size="small">
          <PowerSettingsNewIcon fontSize="small" />
        </IconButton>

        <IconButton size="small">
          <EditIcon fontSize="small" />
        </IconButton>

        <IconButton size="small" color="error">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default RuleRow;
