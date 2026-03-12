import React from "react";
import { TableRow, TableCell, Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface ProductRowProps {
  productName: string;
  status: string;
  price: string;
  coverageSummary: string;
  onEdit: () => void;
}

const ProductRow: React.FC<ProductRowProps> = ({
  productName,
  status,
  price,
  coverageSummary,
  onEdit,
}) => {
  return (
    <TableRow>
      <TableCell>{productName}</TableCell>

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

      <TableCell>{price}</TableCell>

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
