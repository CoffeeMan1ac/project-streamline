import React from "react";
import CoverageRow from "./CoveragesRow";
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

interface Coverage {
  id: string;
  coverageName: string;
  description: string;
  category: string;
  usedInProducts: number;
}

interface CoveragesTableProps {
  coverages: Coverage[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const CoveragesTable: React.FC<CoveragesTableProps> = ({ coverages, onEdit, onDelete }) => {
  return (
    <Box
      border={1}
      borderColor="divider"
      borderRadius={2}
      bgcolor="background.paper"
      sx={{ overflowX: "auto" }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: { xs: "unset", sm: 400 } }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "background.default" }}>
              <TableCell>COVERAGE NAME</TableCell>
              <TableCell>CATEGORY</TableCell>
              <TableCell>USED IN PRODUCTS</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coverages.map((coverage) => (
              <CoverageRow
                key={coverage.id}
                coverageName={coverage.coverageName}
                description={coverage.description}
                category={coverage.category}
                usedInProducts={coverage.usedInProducts}
                onEdit={() => onEdit(coverage.id)}
                onDelete={() => onDelete(coverage.id)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CoveragesTable;
