import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { CircularProgress, Alert } from "@mui/material";
import http from "../api/http";

const QuotesManagementPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuotations = async () => {
    try {
      setLoading(true);
      setError(null);
      await http.get("/backoffice/quotations");
    } catch {
      setError("Failed to load quotations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

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

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {loading && (
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default QuotesManagementPage;
