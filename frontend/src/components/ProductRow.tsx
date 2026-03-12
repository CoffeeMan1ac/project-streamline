import React from "react";
import { TableRow, TableCell, Chip, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface ProductRowProps {
  productName: string;
  modifiedBy: string;
  status: string;
  price: string;
  coverageSummary: string;
  onEdit: () => void;
}

const ProductRow: React.FC<ProductRowProps> = ({
  productName,
  modifiedBy,
  status,
  price,
  coverageSummary,
  onEdit,
}) => {
  return (
    <TableRow>
      <TableCell>
        <Typography variant="body2" fontWeight="bold">
          {productName}
        </Typography>
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
        <IconButton size="small" color="primary" onClick={onEdit} data-testid="edit-button">
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
