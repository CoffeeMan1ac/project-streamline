import { useState } from "react";
import {
  TextField,
  Container,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

const CreateProductPage = () => {
  const [productName, setProductName] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [monthlyPrice, setMonthlyPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    productName: "",
    status: "",
    description: "",
    monthlyPrice: "",
    startDate: "",
  });

  const validateForm = () => {
    const newErrors = {
      productName: "",
      status: "",
      description: "",
      monthlyPrice: "",
      startDate: "",
    };

    if (!productName) newErrors.productName = "Required";
    if (!status) newErrors.status = "Required";
    if (!description) newErrors.description = "Required";
    if (!monthlyPrice) newErrors.monthlyPrice = "Required";
    if (!startDate) newErrors.startDate = "Required";

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const payload = {
        productName,
        status,
        description,
        monthlyPrice,
        startDate,
        endDate,
      };
      console.log(payload);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ p: 6 }}>
        <Container maxWidth="md" sx={{ p: 3, borderRadius: 2, bgcolor: "background.paper" }}>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}
          >
            <Typography variant="h4" sx={{ color: "text.primary" }}>
              Create New Product
            </Typography>
          </Box>
          <hr
            style={{
              borderColor: "#d0d0d0f9",
              borderTop: "1px solid",
              margin: "0 -24px 16px -24px",
            }}
          />
          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" fontWeight="bold" sx={{ color: "text.primary", mb: 2 }}>
              Basic Information
            </Typography>

            <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ color: "text.primary" }}
                >
                  Product Name *
                </Typography>
                <TextField
                  fullWidth
                  placeholder="e.g., Premium Shield"
                  value={productName}
                  onChange={(e) => {
                    setProductName(e.target.value);
                    setErrors((prev) => ({ ...prev, productName: "" }));
                  }}
                  error={!!errors.productName}
                  helperText={errors.productName}
                  disabled={isLoading}
                  sx={{ mb: 3 }}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ color: "text.primary" }}
                >
                  Status *
                </Typography>
                <FormControl
                  fullWidth
                  disabled={isLoading}
                  sx={{ mb: errors.status ? 0 : 3 }}
                  error={!!errors.status}
                >
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={status}
                    label="Status"
                    onChange={(e) => {
                      setStatus(e.target.value);
                      setErrors((prev) => ({ ...prev, status: "" }));
                    }}
                    sx={{ textAlign: "left" }}
                  >
                    <MenuItem value="">Select Status</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
                {errors.status && (
                  <div
                    style={{
                      color: "#d32f2f",
                      fontSize: "12px",
                      marginTop: "4px",
                      marginBottom: "24px",
                    }}
                  >
                    {errors.status}
                  </div>
                )}
              </Box>
            </Box>

            <Typography
              variant="body1"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "text.primary" }}
            >
              Description *
            </Typography>
            <TextField
              fullWidth
              placeholder="Describe the product..."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrors((prev) => ({ ...prev, description: "" }));
              }}
              error={!!errors.description}
              helperText={errors.description}
              disabled={isLoading}
              multiline
              rows={4}
              sx={{ mb: 3 }}
            />

            <Typography variant="h6" fontWeight="bold" sx={{ color: "text.primary", mb: 1 }}>
              Pricing
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
              Base monthly price. Final price will be calculated based on rules.
            </Typography>

            <Typography
              variant="body1"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "text.primary" }}
            >
              Monthly Price *
            </Typography>
            <TextField
              placeholder="e.g., €14.99/month"
              value={monthlyPrice}
              onChange={(e) => {
                setMonthlyPrice(e.target.value);
                setErrors((prev) => ({ ...prev, monthlyPrice: "" }));
              }}
              error={!!errors.monthlyPrice}
              helperText={errors.monthlyPrice}
              disabled={isLoading}
              sx={{ mb: 3, width: "50%" }}
            />

            <Typography variant="h6" fontWeight="bold" sx={{ color: "text.primary", mb: 2, mt: 1 }}>
              Validity Period
            </Typography>

            <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ color: "text.primary" }}
                >
                  Start Date *
                </Typography>
                <TextField
                  fullWidth
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setErrors((prev) => ({ ...prev, startDate: "" }));
                  }}
                  error={!!errors.startDate}
                  helperText={errors.startDate}
                  disabled={isLoading}
                  slotProps={{ htmlInput: { max: endDate || undefined } }}
                  sx={{ mb: 3 }}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ color: "text.primary" }}
                >
                  End Date
                </Typography>
                <TextField
                  fullWidth
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  disabled={isLoading}
                  helperText="Optional - leave blank for no expiration"
                  slotProps={{ htmlInput: { min: startDate || undefined } }}
                  sx={{ mb: 3 }}
                />
              </Box>
            </Box>

            <hr
              style={{
                borderColor: "#d0d0d0f9",
                borderTop: "1px solid",
                margin: "0 -24px 16px -24px",
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button variant="text" disabled={isLoading}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                startIcon={<SaveOutlinedIcon />}
                sx={{ backgroundColor: "#0167b2" }}
              >
                {isLoading ? "Creating..." : "Create Product"}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CreateProductPage;