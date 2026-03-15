import { useState, useEffect, useRef } from "react";
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
  InputAdornment,
  Alert,
  CircularProgress,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { productService, type CoverageOption, type TagOption } from "../services/productService";

interface EditProductPageProps {
  id?: string | null;
  onClose?: () => void;
  onSave?: () => void;
}

const EditProductPage = ({ id, onClose, onSave }: EditProductPageProps) => {
  const [productName, setProductName] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [monthlyPrice, setMonthlyPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCoverages, setSelectedCoverages] = useState<string[]>([]);
  const [selectedExclusions, setSelectedExclusions] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [coverageOptions, setCoverageOptions] = useState<CoverageOption[]>([]);
  const [tagOptions, setTagOptions] = useState<TagOption[]>([]);

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState({
    productName: "",
    status: "",
    description: "",
    monthlyPrice: "",
    startDate: "",
    coverages: "",
    tags: "",
  });

  useEffect(() => {
    const fetchAll = async () => {
      if (!id) return;
      try {
        const [productRes, coveragesRes, tagsRes] = await Promise.all([
          productService.getProduct(id),
          productService.getCoverages(),
          productService.getTags(),
        ]);

        const p = productRes.data;
        setProductName(p.name);
        setStatus(p.active ? "active" : "inactive");
        setDescription(p.description);
        setMonthlyPrice(p.baseRate.toString());
        setStartDate(p.startDate ? p.startDate.split("T")[0] : "");
        setEndDate(p.endDate ? p.endDate.split("T")[0] : "");
        setSelectedCoverages(p.coverages.map((c) => c.id));
        setSelectedExclusions(p.exclusions.map((e) => e.id));
        setSelectedTags(p.tags.map((t) => t.id));

        setCoverageOptions(coveragesRes.data);
        setTagOptions(tagsRes.data);
      } catch {
        setSubmitError("Failed to load product. Please try again.");
      } finally {
        setIsFetching(false);
      }
    };
    fetchAll();
  }, [id]);

  const toggleCoverage = (id: string) => {
    if (selectedExclusions.includes(id)) return;
    setSelectedCoverages((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
    setErrors((prev) => ({ ...prev, coverages: "" }));
  };

  const toggleExclusion = (id: string) => {
    if (selectedCoverages.includes(id)) return;
    setSelectedExclusions((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const toggleTag = (id: string) => {
    setSelectedTags((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
    setErrors((prev) => ({ ...prev, tags: "" }));
  };

  const validateForm = () => {
    const newErrors = {
      productName: !productName ? "Required" : "",
      status: !status ? "Required" : "",
      description: !description ? "Required" : "",
      monthlyPrice: !monthlyPrice ? "Required" : "",
      startDate: !startDate ? "Required" : "",
      coverages: selectedCoverages.length === 0 ? "Please select at least one coverage" : "",
      tags: "",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === "");
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!validateForm() || !id) return;

    setIsLoading(true);
    setSubmitError(null);

    try {
      await productService.updateProduct(id, {
        name: productName,
        description,
        baseRate: parseFloat(monthlyPrice),
        startDate: new Date(startDate).toISOString(),
        endDate: endDate ? new Date(endDate).toISOString() : null,
        coverages: selectedCoverages,
        exclusions: selectedExclusions,
        tags: selectedTags,
      });
      onSave?.();
      onClose?.();
    } catch {
      setSubmitError("Failed to save product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ p: 6 }}>
        <Container maxWidth="md" sx={{ p: 3, borderRadius: 2, bgcolor: "background.paper" }}>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}
          >
            <Typography variant="h4" sx={{ color: "text.primary" }}>
              Edit Product
            </Typography>
            <Typography
              onClick={onClose}
              sx={{ cursor: "pointer", color: "text.secondary", fontSize: "20px" }}
            >
              ✕
            </Typography>
          </Box>
          <hr
            style={{
              borderColor: "#d0d0d0f9",
              borderTop: "1px solid",
              margin: "0 -24px 16px -24px",
            }}
          />

          {submitError && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setSubmitError(null)}>
              {submitError}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" fontWeight="bold" sx={{ color: "text.primary", mb: 2 }}>
              Basic Information
            </Typography>

            <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" gutterBottom sx={{ color: "text.primary" }}>
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
                <Typography variant="body1" gutterBottom sx={{ color: "text.primary" }}>
                  Status *
                </Typography>
                <FormControl
                  fullWidth
                  disabled={isLoading}
                  sx={{ mb: errors.status ? 0 : 3 }}
                  error={!!errors.status}
                >
                  <InputLabel>Select Status</InputLabel>
                  <Select
                    value={status}
                    label="Select Status"
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

            <Typography variant="body1" gutterBottom sx={{ color: "text.primary" }}>
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
            <Typography variant="body1" gutterBottom sx={{ color: "text.primary" }}>
              Monthly Price *
            </Typography>
            <TextField
              placeholder="e.g., 14.99"
              value={monthlyPrice}
              onChange={(e) => {
                setMonthlyPrice(e.target.value);
                setErrors((prev) => ({ ...prev, monthlyPrice: "" }));
              }}
              error={!!errors.monthlyPrice}
              helperText={errors.monthlyPrice}
              disabled={isLoading}
              sx={{ mb: 3, width: "50%" }}
              InputProps={{ startAdornment: <InputAdornment position="start">€</InputAdornment> }}
            />

            <Typography variant="h6" fontWeight="bold" sx={{ color: "text.primary", mb: 2, mt: 1 }}>
              Validity Period
            </Typography>
            <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" gutterBottom sx={{ color: "text.primary" }}>
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
                  inputRef={startDateRef}
                  slotProps={{
                    htmlInput: { max: endDate || undefined },
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarTodayOutlinedIcon
                            onClick={() => startDateRef.current?.showPicker?.()}
                            sx={{ fontSize: 18, color: "text.primary", cursor: "pointer" }}
                          />
                        </InputAdornment>
                      ),
                      sx: {
                        "& input[type='date']::-webkit-calendar-picker-indicator": {
                          display: "none",
                        },
                      },
                    },
                  }}
                  sx={{ mb: 3 }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" gutterBottom sx={{ color: "text.primary" }}>
                  End Date
                </Typography>
                <TextField
                  fullWidth
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  disabled={isLoading}
                  helperText="Optional - leave blank for no expiration"
                  inputRef={endDateRef}
                  slotProps={{
                    htmlInput: { min: startDate || undefined },
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarTodayOutlinedIcon
                            onClick={() => endDateRef.current?.showPicker?.()}
                            sx={{ fontSize: 18, color: "text.primary", cursor: "pointer" }}
                          />
                        </InputAdornment>
                      ),
                      sx: {
                        "& input[type='date']::-webkit-calendar-picker-indicator": {
                          display: "none",
                        },
                      },
                    },
                  }}
                  sx={{ mb: 3 }}
                />
              </Box>
            </Box>

            <Typography variant="h6" fontWeight="bold" sx={{ color: "text.primary", mb: 1, mt: 1 }}>
              Coverage Details
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
              Select coverages to include in this product.
            </Typography>
            <Box
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                p: 2,
                mb: errors.coverages ? 0.5 : 3,
              }}
            >
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
                {coverageOptions.map((coverage) => {
                  const selected = selectedCoverages.includes(coverage.id);
                  const disabled = selectedExclusions.includes(coverage.id);
                  return (
                    <Box
                      key={coverage.id}
                      onClick={() => toggleCoverage(coverage.id)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        p: 1.5,
                        borderRadius: 1.5,
                        border: selected ? "1.5px solid #0167b2" : "1.5px solid #e0e0e0",
                        bgcolor: disabled
                          ? "action.disabledBackground"
                          : selected
                            ? "#e8f1fb"
                            : "background.paper",
                        cursor: disabled ? "not-allowed" : "pointer",
                        opacity: disabled ? 0.5 : 1,
                        transition: "all 0.15s ease",
                        "&:hover": {
                          bgcolor: disabled
                            ? "action.disabledBackground"
                            : selected
                              ? "#e8f1fb"
                              : "action.hover",
                        },
                      }}
                    >
                      {selected ? (
                        <CheckCircleOutlineIcon sx={{ color: "#0167b2", fontSize: 22 }} />
                      ) : (
                        <CloseIcon sx={{ color: "#c0c0c0", fontSize: 22 }} />
                      )}
                      <Typography
                        variant="body2"
                        sx={{ color: selected ? "text.primary" : "#6e6d6d" }}
                      >
                        {coverage.label}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
            {errors.coverages && (
              <div
                style={{
                  color: "#d32f2f",
                  fontSize: "12px",
                  marginTop: "4px",
                  marginBottom: "24px",
                }}
              >
                {errors.coverages}
              </div>
            )}

            <Typography variant="h6" fontWeight="bold" sx={{ color: "text.primary", mb: 1, mt: 1 }}>
              Exclusion Details
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
              Select exclusions to apply to this product. These items will NOT be covered.
            </Typography>
            <Box sx={{ border: "1px solid #e0e0e0", borderRadius: 2, p: 2, mb: 3 }}>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
                {coverageOptions.map((exclusion) => {
                  const selected = selectedExclusions.includes(exclusion.id);
                  const disabled = selectedCoverages.includes(exclusion.id);
                  return (
                    <Box
                      key={exclusion.id}
                      onClick={() => toggleExclusion(exclusion.id)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        p: 1.5,
                        borderRadius: 1.5,
                        border: selected ? "1.5px solid #d32f2f" : "1.5px solid #e0e0e0",
                        bgcolor: disabled
                          ? "action.disabledBackground"
                          : selected
                            ? "#fdf1f1"
                            : "background.paper",
                        cursor: disabled ? "not-allowed" : "pointer",
                        opacity: disabled ? 0.5 : 1,
                        transition: "all 0.15s ease",
                        "&:hover": {
                          bgcolor: disabled
                            ? "action.disabledBackground"
                            : selected
                              ? "#fdf1f1"
                              : "action.hover",
                        },
                      }}
                    >
                      <RemoveIcon sx={{ color: selected ? "#d32f2f" : "#c0c0c0", fontSize: 22 }} />
                      <Typography
                        variant="body2"
                        sx={{ color: selected ? "text.primary" : "#6e6d6d" }}
                      >
                        {exclusion.label}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>

            <Typography variant="h6" fontWeight="bold" sx={{ color: "text.primary", mb: 1, mt: 1 }}>
              Product Tags
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
              Tags affect how the product is displayed on the website. Optional — leave unselected
              for standard display.
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 3 }}>
              {tagOptions.map((tag) => {
                const selected = selectedTags.includes(tag.id);
                const isGreen = tag.code === "GREEN";
                const selectedColor = isGreen ? "#2e7d32" : "#0167b2";
                const selectedBg = isGreen ? "#f0faf0" : "#e8f1fb";
                return (
                  <Box
                    key={tag.id}
                    onClick={() => toggleTag(tag.id)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 2,
                      borderRadius: 1.5,
                      border: selected ? `1.5px solid ${selectedColor}` : "1.5px solid #e0e0e0",
                      bgcolor: selected ? selectedBg : "background.paper",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      "&:hover": { bgcolor: selected ? selectedBg : "action.hover" },
                    }}
                  >
                    {selected ? (
                      <CheckBoxIcon sx={{ color: selectedColor, fontSize: 22 }} />
                    ) : (
                      <CheckBoxOutlineBlankIcon sx={{ color: "#c0c0c0", fontSize: 22 }} />
                    )}
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        sx={{ color: selected ? selectedColor : "#6e6d6d" }}
                      >
                        {tag.label}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            <hr
              style={{
                borderColor: "#d0d0d0f9",
                borderTop: "1px solid",
                margin: "0 -24px 16px -24px",
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button
                variant="outlined"
                disabled={isLoading}
                onClick={onClose}
                sx={{
                  borderColor: "#d0d0d0",
                  color: "#424242",
                  fontWeight: "bold",
                  "&:hover": { borderColor: "#bdbdbd", bgcolor: "transparent" },
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                startIcon={<SaveOutlinedIcon />}
                sx={{ backgroundColor: "#0167b2" }}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default EditProductPage;
