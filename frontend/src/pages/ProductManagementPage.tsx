import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Dialog, FormControl, Select, MenuItem, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import InputAdornment from "@mui/material/InputAdornment";
import EditProductPage from "./EditProductPage";
import CreateProductPage from "./CreateProductPage";
import ProductTable from "../components/ProductTable";

const MOCK_PRODUCTS = [
  {
    id: "1",
    productName: "Basic Health Cover",
    modifiedBy: "admin@example.com",
    status: "active",
    active: true,
    price: "€49.99/mo",
    coverageSummary: "GP visits, prescriptions, outpatient",
    tags: ["health", "basic"],
  },
  {
    id: "2",
    productName: "Comprehensive Life Insurance",
    modifiedBy: "admin@example.com",
    status: "retired",
    active: true,
    price: "€89.99/mo",
    coverageSummary: "Life cover up to €500k, critical illness",
    tags: ["life", "premium"],
  },
  {
    id: "3",
    productName: "Travel Insurance Plus",
    modifiedBy: "ops@example.com",
    status: "inactive",
    active: false,
    price: "€12.99/mo",
    coverageSummary: "Worldwide cover, cancellation, medical",
    tags: ["travel"],
  },
];

const ProductManagementPage = () => {
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [createProductOpen, setCreateProductOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = product.productName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || product.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleToggleProductActive = (id: string) => {
    // TODO: wire up to API
    console.log("Toggle active for product", id);
  };

  return (
    <>
      <Box sx={{ mx: 20, my: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Products Management
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Configure and manage insurance products
            </Typography>
          </Box>
        </Box>
        <Box sx={{ my: 4 }}>
          <Paper
            elevation={0}
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 3,
              p: 3,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <TextField
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              sx={{ flex: 3 }}
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
            <TuneIcon sx={{ color: "text.secondary", cursor: "pointer" }} />
            <FormControl size="small" sx={{ flex: 1 }}>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                displayEmpty
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">All Products</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="retired">Retired</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setCreateProductOpen(true)}
              sx={{ whiteSpace: "nowrap", borderRadius: 2, px: 2, py: 1 }}
            >
              Create Product
            </Button>
          </Paper>
        </Box>

        <ProductTable
          products={filteredProducts}
          onEditProduct={(id) => setEditProductId(id)}
          onToggleProductActive={handleToggleProductActive}
        />
      </Box>

      <Dialog
        open={createProductOpen}
        onClose={() => setCreateProductOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <CreateProductPage onClose={() => setCreateProductOpen(false)} />
      </Dialog>

      <Dialog
        open={editProductId !== null}
        onClose={() => setEditProductId(null)}
        maxWidth="md"
        fullWidth
      >
        <EditProductPage id={editProductId} onClose={() => setEditProductId(null)} />
      </Dialog>
    </>
  );
};

export default ProductManagementPage;
