import TextField from "@mui/material/TextField";
import { FormControl, Select, MenuItem, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

interface QuotationsSearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

const QuotationsSearchBar = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: QuotationsSearchBarProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
        p: 3,
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <TextField
        placeholder="Search by reference, customer name, email, or product..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        size="small"
        sx={{ flex: 3, minWidth: { xs: "100%", sm: 0 } }}
        slotProps={{
          input: {
            sx: { borderRadius: 2 },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
          },
        }}
      />
      <FormControl size="small" sx={{ flex: 1, minWidth: { xs: "100%", sm: 150 } }}>
        <Select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          displayEmpty
          sx={{ borderRadius: 2 }}
        >
          <MenuItem value="all">All Quotations</MenuItem>
          <MenuItem value="accepted">Accepted</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
};

export default QuotationsSearchBar;
