import React from "react";
import { TableRow, TableCell, Chip, IconButton, Typography, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";

interface CoverageRowProps {
  coverageName: string;
  description: string;
  category: string;
  usedInProducts: number;
  onEdit: () => void;
  onDelete: () => void;
}

const categoryConfig: Record<string, { color: string; bg: string }> = {
  Damage: { color: "#c62828", bg: "#fdecea" },
  Warranty: { color: "#1565c0", bg: "#e3f2fd" },
  Theft: { color: "#e65100", bg: "#fff3e0" },
  Other: { color: "#4a148c", bg: "#f3e5f5" },
};

const CoverageRow: React.FC<CoverageRowProps> = ({
  coverageName,
  description,
  category,
  usedInProducts,
  onEdit,
  onDelete,
}) => {
  const config = categoryConfig[category] ?? { color: "#616161", bg: "#f5f5f5" };

  return (
    <TableRow>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: 2,
              bgcolor: "primary.50",
              backgroundColor: "#e3f2fd",
            }}
          >
            <ShieldOutlinedIcon sx={{ color: "primary.main", fontSize: 20 }} />
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {coverageName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {description}
            </Typography>
          </Box>
        </Box>
      </TableCell>

      <TableCell>
        <Chip
          label={category}
          size="small"
          sx={{
            backgroundColor: config.bg,
            color: config.color,
            fontWeight: 500,
          }}
        />
      </TableCell>

      <TableCell>
        <Typography variant="body2">
          <strong>{usedInProducts}</strong> {usedInProducts === 1 ? "product" : "products"}
        </Typography>
      </TableCell>

      <TableCell>
        <IconButton size="small" color="primary" onClick={onEdit} data-testid="edit-button">
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" color="error" onClick={onDelete} data-testid="delete-button">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CoverageRow;
