import { Box, Typography, MenuItem, InputLabel, Select, FormControl } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";

type ProductOption = {
  id: string;
  name: string;
};

interface SelectProductProps {
  products: ProductOption[];
  selectedProduct: string;
  onProductChange: (product: string) => void;
}

const SelectProduct = ({ products, selectedProduct, onProductChange }: SelectProductProps) => {
  const handleChange = (e: SelectChangeEvent<string>) => {
    onProductChange(e.target.value);
  };

  return (
    <Box border={1} borderColor="divider" borderRadius={2} bgcolor={"background.paper"} p={2}>
      <Typography>Select Product</Typography>

      <Box sx={{ width: "50%" }}>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="product-label">Product</InputLabel>

          <Select
            labelId="product-label"
            id="product"
            value={selectedProduct}
            label="Product"
            onChange={handleChange}
            sx={{ textAlign: "left" }}
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default SelectProduct;
