import { Box, Typography, MenuItem, InputLabel, Select, FormControl } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";

interface SelectProductProps {
  selectedProduct: string;
  onProductChange: (product: string) => void;
}

const SelectProduct = ({ selectedProduct, onProductChange }: SelectProductProps) => {
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
            <MenuItem value="Standard Shield Green">Standard Shield Green</MenuItem>
            <MenuItem value="Standard Shield">Standard Shield</MenuItem>
            <MenuItem value="Premium Shield Green">Premium Shield Green</MenuItem>
            <MenuItem value="Premium Shield">Premium Shield</MenuItem>
            <MenuItem value="Global Shield Green">Global Shield Green</MenuItem>
            <MenuItem value="Global Shield">Global Shield</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default SelectProduct;
