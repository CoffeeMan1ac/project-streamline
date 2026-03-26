import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  Paper,
  InputAdornment,
  Button,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

interface CoveragesSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (category: string) => void;
  totalCoverages: number;
  showingCoverages: number;
  onCreateCoverage: () => void;
}

const CoveragesSearchBar = ({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
  totalCoverages,
  showingCoverages,
  onCreateCoverage,
}: CoveragesSearchBarProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <TextField
            placeholder="Search coverages..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            size="small"
            sx={{ flex: 3, minWidth: { xs: "100%", sm: 0 } }}
            slotProps={{
              input: {
                sx: { borderRadius: 2 },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "text.secondary" }} data-testid="SearchIcon" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <FormControl size="small" sx={{ flex: 1, minWidth: { xs: "100%", sm: 150 } }}>
            <Select
              value={categoryFilter}
              onChange={(e) => onCategoryFilterChange(e.target.value)}
              displayEmpty
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="Damage">Damage</MenuItem>
              <MenuItem value="Warranty">Warranty</MenuItem>
              <MenuItem value="Theft">Theft</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<AddIcon />}
            onClick={onCreateCoverage}
            sx={{
              whiteSpace: "nowrap",
              borderRadius: 2,
              px: 2,
              py: 1,
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Create Coverage
          </Button>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ px: 3, py: 1.5, display: "flex", justifyContent: "flex-start" }}>
        <Typography variant="body2" color="text.secondary">
          Total Coverages: <strong>{totalCoverages}</strong> &nbsp; Showing:{" "}
          <strong>{showingCoverages}</strong>
        </Typography>
      </Box>
    </Paper>
  );
};

export default CoveragesSearchBar;
