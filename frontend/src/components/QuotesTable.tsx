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
  id: string;
  reference: string;
  customerName: string;
  customerEmail: string;
  product: string;
  status: "accepted" | "rejected";
  premium: string | null;
  date: string;
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
                <TableCell>DATE</TableCell>
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quotations.map((quotation) => (
                <QuotationRow
                  key={quotation.id}
                  reference={quotation.reference}
                  customerName={quotation.customerName}
                  customerEmail={quotation.customerEmail}
                  product={quotation.product}
                  status={quotation.status}
                  premium={quotation.premium}
                  date={quotation.date}
                  onViewDetails={() => onViewDetails(quotation.id)}
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
