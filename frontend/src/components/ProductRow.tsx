import React from "react";
import { TableRow, TableCell, Chip, IconButton, Typography, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";

interface ProductRowProps {
  productName: string;
  modifiedBy: string;
  status: string;
  active: boolean;
  price: string;
  coverageSummary: string;
  tags?: string[];
  onToggleActive: () => void;
  onEdit: () => void;
}

const tagConfig: Record<
  string,
  { label: string; color: string; bg: string; icon: React.ReactNode }
> = {
  Green: {
    label: "Green",
    color: "#2e7d32",
    bg: "#f0faf0",
    icon: <SpaOutlinedIcon sx={{ fontSize: 12 }} />,
  },
  Retired: {
    label: "Retired",
    color: "#616161",
    bg: "#f0f0f0",
    icon: <ArchiveOutlinedIcon sx={{ fontSize: 12 }} />,
  },
};

const ProductRow: React.FC<ProductRowProps> = ({
  productName,
  modifiedBy,
  status,
  active,
  price,
  coverageSummary,
  tags = [],
  onToggleActive,
  onEdit,
}) => {
  return (
    <TableRow>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
          <Typography variant="body2" fontWeight="bold">
            {productName}
          </Typography>
          {tags.map((tag) => {
            const config = tagConfig[tag];
            if (!config) return null;
            return (
              <Box
                key={tag}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  px: 1,
                  py: 0.25,
                  borderRadius: 10,
                  bgcolor: config.bg,
                  color: config.color,
                }}
              >
                {config.icon}
                <Typography variant="caption" sx={{ color: config.color, fontWeight: 500 }}>
                  {config.label}
                </Typography>
              </Box>
            );
          })}
        </Box>
        <Typography variant="caption" color="text.secondary">
          Modified by {modifiedBy}
        </Typography>
      </TableCell>

      <TableCell>
        <Chip
          label={status}
          size="small"
          sx={
            status === "active"
              ? { backgroundColor: "success.light", color: "success.dark", fontWeight: 500 }
              : undefined
          }
        />
      </TableCell>

      <TableCell>
        <Typography variant="body2" fontWeight="bold">
          {price}
        </Typography>
      </TableCell>

      <TableCell>{coverageSummary}</TableCell>

      <TableCell>
        <IconButton
          size="small"
          color={active ? "success" : "inherit"}
          onClick={onToggleActive}
          data-testid="toggle-button"
        >
          <PowerSettingsNewIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" color="inherit" onClick={onEdit} data-testid="edit-button">
          <EditIcon fontSize="small" />
        </IconButton>

        <IconButton size="small" color="error">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;
