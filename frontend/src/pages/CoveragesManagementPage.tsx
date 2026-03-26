import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { CircularProgress, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CoveragesTable from "../components/CoveragesTable";
import CoveragesSearchBar from "../components/CoveragesSearchBar";
import http from "../api/http";

interface CoverageDto {
  id: string;
  coverageName: string;
  description: string;
  category: string;
  usedInProducts: number;
}

const CoveragesManagementPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [coverages, setCoverages] = useState<CoverageDto[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const navigate = useNavigate();

  const fetchCoverages = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await http.get<CoverageDto[]>("/backoffice/coverages");
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

  const handleDeleteCoverage = async (id: string) => {
    try {
      await http.delete(`/backoffice/coverages/${id}`);
      setCoverages((prev) => prev.filter((c) => c.id !== id));
    } catch {
      setError("Failed to delete coverage. Please try again.");
    }
  };

  const filteredCoverages = coverages.filter((coverage) => {
    const matchesSearch =
      coverage.coverageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coverage.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || coverage.category === categoryFilter;
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
        <CoveragesTable
          coverages={filteredCoverages}
          onEdit={handleEditCoverage}
          onDelete={handleDeleteCoverage}
        />
      )}
    </Box>
  );
};

export default CoveragesManagementPage;
