import React from "react";
import { TableRow, TableCell, Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

interface RuleRowProps {
  order: number;
  ruleName: string;
  active: boolean;
  numberOfConditions: number;
  decision: string;
  premium: string;
  onToggleActive: () => void;
}

const RuleRow: React.FC<RuleRowProps> = ({
  order,
  ruleName,
  active,
  numberOfConditions,
  decision,
  premium,
  onToggleActive,
}) => {
  return (
    <TableRow>
      <TableCell>
        <IconButton size="small" color="default">
          <DragIndicatorIcon />
        </IconButton>
      </TableCell>
      <TableCell>{order}</TableCell>

      <TableCell>{ruleName}</TableCell>

      <TableCell>
        <Chip
          label={active ? "active" : "inactive"}
          size="small"
          sx={
            active
              ? {
                  backgroundColor: "success.light",
                  color: "success.dark",
                  fontWeight: 500,
                }
              : undefined
          }
        />
      </TableCell>

      <TableCell>
        {numberOfConditions} condition{numberOfConditions !== 1 ? "s" : ""}
      </TableCell>

      <TableCell>{decision}</TableCell>
      <TableCell>{premium}</TableCell>

      <TableCell>
        <IconButton size="small" color={active ? "success" : "inherit"} onClick={onToggleActive}>
          <PowerSettingsNewIcon fontSize="small" />
        </IconButton>

        <IconButton size="small" color="primary">
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
