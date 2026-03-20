import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { CircularProgress, Alert } from "@mui/material";
import http from "../api/http";
import QuotesSearchBar from "../components/QuotesSearchBar";
import QuotesTable from "../components/QuotesTable";

type QuotationStatus = "accepted" | "rejected";

type QuotationResponseDto = {
  id: string;
  reference: string;
  customerName: string;
  customerEmail: string;
  product: string;
  status: QuotationStatus;
  premium: string | null;
  date: string;
};

const QuotesManagementPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quotations, setQuotations] = useState<QuotationResponseDto[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchQuotations = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await http.get<QuotationResponseDto[]>("/backoffice/quotations");
      setQuotations(data);
    } catch {
      setError("Failed to load quotations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  const filteredQuotations = quotations
    .filter((q) => {
      const query = searchQuery.toLowerCase();
      return (
        q.reference.toLowerCase().includes(query) ||
        q.customerName.toLowerCase().includes(query) ||
        q.customerEmail.toLowerCase().includes(query) ||
        q.product.toLowerCase().includes(query)
      );
    })
    .filter((q) => {
      if (statusFilter === "all") return true;
      return q.status === statusFilter;
    });

  const handleViewDetails = (id: string) => {
    console.log("View details for quotation:", id);
  };

  return (
    <Box sx={{ mx: { xs: 2, sm: 3, md: 4, lg: 8, xl: 20 }, my: 4 }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Quotations Management
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Search and review quote applications
        </Typography>
      </Box>

      <Box sx={{ my: 4 }}>
        <QuotesSearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress />
        </Box>
      ) : (
        <QuotesTable quotations={filteredQuotations} onViewDetails={handleViewDetails} />
      )}
    </Box>
  );
};

export default QuotesManagementPage;
