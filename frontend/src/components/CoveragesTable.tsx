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

interface CoverageOptionDto {
  id: string;
  code: string;
  label: string;
  categoryLabel: string;
}

interface CoveragesTableProps {
  coverages: CoverageOptionDto[];
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
      sx={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "background.default" }}>
              <TableCell>COVERAGE</TableCell>
              <TableCell sx={{ width: 150 }}>CATEGORY</TableCell>
              <TableCell sx={{ width: 100 }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coverages.map((coverage) => (
              <CoverageRow
                key={coverage.id}
                code={coverage.code}
                label={coverage.label}
                categoryLabel={coverage.categoryLabel}
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
