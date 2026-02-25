import { Box, Typography, MenuItem, InputLabel, Select, FormControl } from "@mui/material";
import { useState } from "react";

const SelectProduct = () => {
  const [product, setProduct] = useState("");
  const [, setErrors] = useState({ product: "" });

  return (
    <Box border={1} borderColor="divider" borderRadius={2} bgcolor={"background.paper"} p={2}>
      <Typography>Select Product</Typography>

      <Box sx={{ width: "50%" }}>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="product-label">Product</InputLabel>

          <Select
            labelId="product-label"
            id="product"
            value={product}
            label="Product"
            onChange={(e) => {
              setProduct(e.target.value);
              setErrors((prev) => ({ ...prev, product: "" }));
            }}
            sx={{ textAlign: "left" }}
          >
            <MenuItem value="">Select product</MenuItem>
            <MenuItem value="standard-shield-green">Standard Shield Green</MenuItem>
            <MenuItem value="standard-shield">Standard Shield</MenuItem>
            <MenuItem value="premium-shield-green">Premium Shield Green</MenuItem>
            <MenuItem value="premium-shield">Premium Shield</MenuItem>
            <MenuItem value="global-shield-green">Global Shield Green</MenuItem>
            <MenuItem value="global-shield">Global Shield</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default SelectProduct;
