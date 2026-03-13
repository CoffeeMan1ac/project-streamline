import React from "react";
import ProductRow from "./ProductRow";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Box,
} from "@mui/material";

interface ProductTableProps {
  products: {
    id: string;
    productName: string;
    modifiedBy: string;
    status: string;
    active: boolean;
    price: string;
    coverageSummary: string;
    tags?: string[];
  }[];
  onEditProduct: (id: string) => void;
  onToggleProductActive: (id: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEditProduct,
  onToggleProductActive,
}) => {
  return (
    <Box border={1} borderColor="divider" borderRadius={2} bgcolor={"background.paper"}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "background.default" }}>
              <TableCell>PRODUCT NAME</TableCell>
              <TableCell>STATUS</TableCell>
              <TableCell>PRICE</TableCell>
              <TableCell>COVERAGE SUMMARY</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <ProductRow
                key={product.id}
                productName={product.productName}
                modifiedBy={product.modifiedBy}
                status={product.status}
                active={product.active}
                price={product.price}
                coverageSummary={product.coverageSummary}
                tags={product.tags}
                onToggleActive={() => onToggleProductActive(product.id)}
                onEdit={() => onEditProduct(product.id)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductTable;
