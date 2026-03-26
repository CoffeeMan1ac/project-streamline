import React from "react";
import { TableRow, TableCell, Chip, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface RuleRowProps {
  id: string;
  order: number;
  ruleName: string;
  active: boolean;
  numberOfConditions: number;
  decision: string;
  premium: string;
  earlyExit?: boolean;
  onToggleActive: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const RuleRow: React.FC<RuleRowProps> = ({
  id,
  order,
  ruleName,
  active,
  numberOfConditions,
  decision,
  premium,
  earlyExit,
  onToggleActive,
  onEdit,
  onDelete,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell>
        <IconButton size="small" {...attributes} {...listeners} sx={{ touchAction: "none" }}>
          <DragIndicatorIcon />
        </IconButton>
      </TableCell>
      <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>{order}</TableCell>

      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {ruleName}
          {earlyExit && (
            <Chip
              label="Early Exit"
              size="small"
              sx={{ backgroundColor: "#EEF2FF", color: "#6366F1", fontWeight: 500 }}
            />
          )}
        </Box>
      </TableCell>

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

      <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
        {numberOfConditions} condition{numberOfConditions !== 1 ? "s" : ""}
      </TableCell>

      <TableCell sx={{ p: { xs: 0, sm: 1 } }}>{decision}</TableCell>
      <TableCell sx={{ p: { xs: 0, sm: 1 } }}>{premium}</TableCell>

      <TableCell>
        <IconButton size="small" color={active ? "success" : "inherit"} onClick={onToggleActive}>
          <PowerSettingsNewIcon fontSize="small" />
        </IconButton>

        <IconButton size="small" color="primary" onClick={onEdit}>
          <EditIcon fontSize="small" />
        </IconButton>

        <IconButton size="small" color="error" onClick={onDelete}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default RuleRow;
