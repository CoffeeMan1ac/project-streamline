import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import {
  Dialog,
  FormControl,
  Select,
  MenuItem,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import InputAdornment from "@mui/material/InputAdornment";
import EditProductPage from "./EditProductPage";
import CreateProductPage from "./CreateProductPage";
import ProductTable from "../components/ProductTable";
import { productService, type ProductDto } from "../services/productService";
import { useMediaQuery, useTheme } from "@mui/material";
import http from "../api/http";

const ProductManagementPage = () => {
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [createProductOpen, setCreateProductOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await productService.getProducts();
      setProducts(data);
    } catch {
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleToggleProductActive = async (id: string) => {
    try {
      await productService.toggleProductActive(id);
      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));
    } catch {
      setError("Failed to update product. Please try again.");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await http.delete(`/backoffice/products/${id}`);
      fetchProducts();
    } catch {
      setError("Failed to delete product. Please try again.");
    }
  };

  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((p) => {
      if (statusFilter === "all") return true;
      if (statusFilter === "active") return p.active;
      if (statusFilter === "inactive") return !p.active;
      return true;
    })
    .map((p) => ({
      id: p.id,
      productName: p.name,
      modifiedBy: "-",
      status: p.active ? "active" : "inactive",
      active: p.active,
      price: `€${p.baseRate.toFixed(2)}/mo`,
      coverageSummary: p.description,
      tags: p.tags.map((t) => t.label),
    }));

  return (
    <>
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
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <TextField
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
            <TuneIcon
              sx={{
                color: "text.secondary",
                cursor: "pointer",
                display: { xs: "none", sm: "block" },
              }}
            />
            <FormControl size="small" sx={{ flex: 1, minWidth: { xs: "100%", sm: 120 } }}>
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
              sx={{
                whiteSpace: "nowrap",
                borderRadius: 2,
                px: 2,
                py: 1,
                width: { xs: "100%", sm: "auto" },
              }}
            >
              Create Product
            </Button>
          </Paper>
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
          <ProductTable
            products={filteredProducts}
            onEditProduct={(id) => setEditProductId(id)}
            onToggleProductActive={handleToggleProductActive}
            onDeleteProduct={handleDeleteProduct}
          />
        )}
      </Box>

      <Dialog open={createProductOpen} maxWidth="md" fullWidth fullScreen={isMobile}>
        <CreateProductPage
          onClose={() => {
            setCreateProductOpen(false);
          }}
        />
      </Dialog>

      <Dialog
        open={editProductId !== null}
        onClose={() => setEditProductId(null)}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
      >
        <EditProductPage
          id={editProductId}
          onClose={() => {
            setEditProductId(null);
            fetchProducts();
          }}
        />
      </Dialog>
    </>
  );
};

export default ProductManagementPage;
