import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";
import { CircularProgress, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CoveragesTable from "../components/CoveragesTable";
import CoveragesSearchBar from "../components/CoveragesSearchBar";
import http from "../api/http";

interface CoverageOptionDto {
  id: string;
  code: string;
  label: string;
  categoryCode: string;
  categoryLabel: string;
}

const CoveragesManagementPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [coverages, setCoverages] = useState<CoverageOptionDto[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const navigate = useNavigate();

  const fetchCoverages = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await http.get<CoverageOptionDto[]>("/backoffice/products/coverages");
      setCoverages(data);
    } catch {
      setError("Failed to load coverages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoverages();
  }, []);

  const categories = useMemo(() => {
    const seen = new Map<string, string>();
    coverages.forEach((c) => {
      if (!seen.has(c.categoryCode)) {
        seen.set(c.categoryCode, c.categoryLabel);
      }
    });
    return Array.from(seen, ([code, label]) => ({ code, label }));
  }, [coverages]);

  const filteredCoverages = coverages.filter((coverage) => {
    const matchesSearch =
      coverage.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coverage.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || coverage.categoryCode === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleCreateCoverage = () => {
    navigate("/coverages/create");
  };

  const handleEditCoverage = (id: string) => {
    navigate(`/coverages/${id}`);
  };

  return (
    <Box sx={{ mx: { xs: 2, sm: 3, md: 4, lg: 8, xl: 20 }, my: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Coverages Management
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Manage insurance coverage types and descriptions
          </Typography>
        </Box>
      </Box>

      <Box sx={{ my: 4 }}>
        <CoveragesSearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          categories={categories}
          totalCoverages={coverages.length}
          showingCoverages={filteredCoverages.length}
          onCreateCoverage={handleCreateCoverage}
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
        <CoveragesTable coverages={filteredCoverages} onEdit={handleEditCoverage} />
      )}
    </Box>
  );
};

export default CoveragesManagementPage;
