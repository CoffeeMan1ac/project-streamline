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
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

const coverageOptions = [
  "Accidental Damage",
  "Liquid Damage",
  "Extended Warranty",
  "Data Recovery",
  "Theft",
  "Screen Damage",
  "Worldwide Coverage",
  "Battery Replacement",
];

const exclusionOptions = [
  "Accidental Damage",
  "Liquid Damage",
  "Extended Warranty",
  "Data Recovery",
  "Theft",
  "Screen Damage",
  "Worldwide Coverage",
  "Battery Replacement",
];

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

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState({
    productName: "",
    status: "",
    description: "",
    monthlyPrice: "",
    startDate: "",
    coverages: "",
    exclusions: "",
    tags: "",
  });

  useEffect(() => {
    if (!id) return;

    fetch(`/api/admin/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProductName(data.productName ?? "");
        setStatus(data.status ?? "");
        setDescription(data.description ?? "");
        setMonthlyPrice(data.monthlyPrice ?? "");
        setStartDate(data.startDate ?? "");
        setEndDate(data.endDate ?? "");
        setSelectedCoverages(data.selectedCoverages ?? []);
        setSelectedExclusions(data.selectedExclusions ?? []);
        setSelectedTags(data.selectedTags ?? []);
      })
      .catch((err) => console.error("Failed to fetch product:", err));
  }, [id]);

  const toggleCoverage = (coverage: string) => {
    if (selectedExclusions.includes(coverage)) return;
    setSelectedCoverages((prev) =>
      prev.includes(coverage) ? prev.filter((c) => c !== coverage) : [...prev, coverage]
    );
    setErrors((prev) => ({ ...prev, coverages: "" }));
  };

  const toggleExclusion = (exclusion: string) => {
    if (selectedCoverages.includes(exclusion)) return;
    setSelectedExclusions((prev) =>
      prev.includes(exclusion) ? prev.filter((e) => e !== exclusion) : [...prev, exclusion]
    );
    setErrors((prev) => ({ ...prev, exclusions: "" }));
  };

  const toggleTag = (tag: string) => {
    setErrors((prev) => ({ ...prev, tags: "" }));
    if (tag === "None") {
      setSelectedTags((prev) => (prev.includes("None") ? [] : ["None"]));
    } else {
      setSelectedTags((prev) => {
        const without = prev.filter((t) => t !== "None");
        return without.includes(tag) ? without.filter((t) => t !== tag) : [...without, tag];
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      productName: "",
      status: "",
      description: "",
      monthlyPrice: "",
      startDate: "",
      coverages: "",
      exclusions: "",
      tags: "",
    };

    if (!productName) newErrors.productName = "Required";
    if (!status) newErrors.status = "Required";
    if (!description) newErrors.description = "Required";
    if (!monthlyPrice) newErrors.monthlyPrice = "Required";
    if (!startDate) newErrors.startDate = "Required";
    if (selectedCoverages.length === 0) newErrors.coverages = "Please select at least one coverage";
    if (selectedExclusions.length === 0)
      newErrors.exclusions = "Please select at least one exclusion";
    if (selectedTags.length === 0) newErrors.tags = "Please select at least one tag";

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
        selectedCoverages,
        selectedExclusions,
        selectedTags,
      };

      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save product");
      onSave?.();
      onClose?.();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const tagConfig = [
    {
      key: "None",
      label: "None",
      subtitle: "Standard product display.",
      icon: <LocalOfferIcon sx={{ fontSize: 16 }} />,
      selectedColor: "#616161",
      selectedBorder: "#616161",
      selectedBg: "#f0f0f0",
    },
    {
      key: "Green",
      label: "Green",
      subtitle: "Renders with green styling and sustainability features.",
      icon: <SpaOutlinedIcon sx={{ fontSize: 16 }} />,
      selectedColor: "#2e7d32",
      selectedBorder: "#2e7d32",
      selectedBg: "#f0faf0",
    },
    {
      key: "Popular",
      label: "Popular",
      subtitle: "Renders with thicker border to highlight popularity.",
      icon: <LocalOfferIcon sx={{ fontSize: 16 }} />,
      selectedColor: "#0167b2",
      selectedBorder: "#0167b2",
      selectedBg: "#e8f1fb",
    },
  ];

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
              Select coverages to include in this product. These will be displayed on the product
              cards.
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
                  const selected = selectedCoverages.includes(coverage);
                  const disabled = selectedExclusions.includes(coverage);
                  return (
                    <Box
                      key={coverage}
                      onClick={() => toggleCoverage(coverage)}
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
                        {coverage}
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

            <Box
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                p: 2,
                mb: errors.exclusions ? 0.5 : 3,
              }}
            >
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
                {exclusionOptions.map((exclusion) => {
                  const selected = selectedExclusions.includes(exclusion);
                  const disabled = selectedCoverages.includes(exclusion);
                  return (
                    <Box
                      key={exclusion}
                      onClick={() => toggleExclusion(exclusion)}
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
                        {exclusion}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>

            {errors.exclusions && (
              <div
                style={{
                  color: "#d32f2f",
                  fontSize: "12px",
                  marginTop: "4px",
                  marginBottom: "24px",
                }}
              >
                {errors.exclusions}
              </div>
            )}

            <Typography variant="h6" fontWeight="bold" sx={{ color: "text.primary", mb: 1, mt: 1 }}>
              Product Tags
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
              Tags affect how the product is displayed on the website.
            </Typography>

            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: errors.tags ? 0.5 : 3 }}
            >
              {tagConfig.map((tag) => {
                const selected = selectedTags.includes(tag.key);
                return (
                  <Box
                    key={tag.key}
                    onClick={() => toggleTag(tag.key)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 2,
                      borderRadius: 1.5,
                      border: selected
                        ? `1.5px solid ${tag.selectedBorder}`
                        : "1.5px solid #e0e0e0",
                      bgcolor: selected ? tag.selectedBg : "background.paper",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      "&:hover": {
                        bgcolor: selected ? tag.selectedBg : "action.hover",
                      },
                    }}
                  >
                    {selected ? (
                      <CheckBoxIcon sx={{ color: tag.selectedColor, fontSize: 22 }} />
                    ) : (
                      <CheckBoxOutlineBlankIcon sx={{ color: "#c0c0c0", fontSize: 22 }} />
                    )}
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box
                          sx={{
                            color: selected ? tag.selectedColor : "#c0c0c0",
                            display: "flex",
                            alignItems: "center",
                            mt: "3px",
                          }}
                        >
                          {tag.icon}
                        </Box>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          sx={{ color: selected ? tag.selectedColor : "#6e6d6d" }}
                        >
                          {tag.label}
                        </Typography>
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{ color: selected ? tag.selectedColor : "#9e9e9e", display: "block" }}
                      >
                        {tag.subtitle}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            {errors.tags && (
              <div
                style={{
                  color: "#d32f2f",
                  fontSize: "12px",
                  marginTop: "4px",
                  marginBottom: "24px",
                }}
              >
                {errors.tags}
              </div>
            )}

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
