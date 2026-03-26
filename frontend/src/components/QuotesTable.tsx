import React from "react";
import QuotationRow from "./QuotesRow";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Box,
  Typography,
} from "@mui/material";

interface Quotation {
  reference: string;
  customerName: string | null;
  customerEmail: string | null;
  product: string | null;
  status: "ACCEPTED" | "DECLINED" | "REFER";
  premium: string | null;
  createdAt: string;
  reason: string | null;
}

interface QuotationTableProps {
  quotations: Quotation[];
  onViewDetails: (id: string) => void;
}

const QuotationTable: React.FC<QuotationTableProps> = ({ quotations, onViewDetails }) => {
  return (
    <>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Showing {quotations.length} of {quotations.length} quotations
      </Typography>
      <Box
        border={1}
        borderColor="divider"
        borderRadius={2}
        bgcolor="background.paper"
        sx={{ overflowX: "auto" }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "background.default" }}>
                <TableCell>REFERENCE</TableCell>
                <TableCell>CUSTOMER</TableCell>
                <TableCell>PRODUCT</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell>PREMIUM</TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>DATE</TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quotations.map((quotation) => (
                <QuotationRow
                  key={quotation.reference}
                  reference={quotation.reference}
                  customerName={quotation.customerName ?? "—"}
                  customerEmail={quotation.customerEmail ?? "—"}
                  product={quotation.product ?? "—"}
                  status={quotation.status}
                  premium={quotation.premium !== null ? `€${quotation.premium}` : null}
                  date={new Date(quotation.createdAt).toLocaleDateString()}
                  onViewDetails={() => onViewDetails(quotation.reference)}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default QuotationTable;
