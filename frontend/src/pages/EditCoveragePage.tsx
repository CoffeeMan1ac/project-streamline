import { useState, useEffect } from "react";
import {
  TextField,
  Container,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  Button,
  Paper,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import http from "../api/http";

interface EditCoveragePageProps {
  id?: string | null;
  onClose?: () => void;
  onSave?: () => void;
}

const EditCoveragePage = ({ id, onClose, onSave }: EditCoveragePageProps) => {
  const [coverageName, setCoverageName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [usedInProducts, setUsedInProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    coverageName: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    if (!id) return;

    const fetchCoverage = async () => {
      try {
        const { data } = await http.get(`/backoffice/coverages/${id}`);
        setCoverageName(data.coverageName);
        setDescription(data.description);
        setCategory(data.category);
        setUsedInProducts(data.usedInProducts);
      } catch (err) {
        console.error("Failed to fetch coverage:", err);
      }
    };
    fetchCoverage();
  }, [id]);

  const validateForm = () => {
    const newErrors = {
      coverageName: "",
      description: "",
      category: "",
    };

    if (!coverageName) newErrors.coverageName = "Required";
    if (!description) newErrors.description = "Required";
    if (!category) newErrors.category = "Required";

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const payload = {
        coverageName,
        description,
        category,
      };

      await http.patch(`/backoffice/coverages/${id}`, payload);
      onSave?.();
      onClose?.();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 4, md: 6 } }}>
      <Container maxWidth="sm" sx={{ p: 3, borderRadius: 2, bgcolor: "background.paper" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography
            variant="h4"
            sx={{ color: "text.primary", fontSize: { xs: "1.5rem", md: "2.125rem" } }}
          >
            Edit Coverage
          </Typography>
          <Typography
            onClick={onClose}
            sx={{ cursor: "pointer", color: "text.secondary", fontSize: "20px" }}
          >
            ✕
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ color: "text.primary" }}>
            Coverage Name *
          </Typography>
          <TextField
            fullWidth
            placeholder="e.g., Accidental Damage"
            value={coverageName}
            onChange={(e) => {
              setCoverageName(e.target.value);
              setErrors((prev) => ({ ...prev, coverageName: "" }));
            }}
            error={!!errors.coverageName}
            helperText={errors.coverageName}
            disabled={isLoading}
            sx={{ mb: 3 }}
          />

          <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ color: "text.primary" }}>
            Description *
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="e.g., Coverage for unintentional physical damage to the device"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors((prev) => ({ ...prev, description: "" }));
            }}
            error={!!errors.description}
            helperText={errors.description}
            disabled={isLoading}
            sx={{ mb: 3 }}
          />

          <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ color: "text.primary" }}>
            Category *
          </Typography>
          <FormControl fullWidth disabled={isLoading} sx={{ mb: errors.category ? 0 : 3 }}>
            <Select
              value={category}
              displayEmpty
              onChange={(e) => {
                setCategory(e.target.value);
                setErrors((prev) => ({ ...prev, category: "" }));
              }}
              error={!!errors.category}
              sx={{ textAlign: "left" }}
            >
              <MenuItem value="">Select category</MenuItem>
              <MenuItem value="Damage">Damage</MenuItem>
              <MenuItem value="Warranty">Warranty</MenuItem>
              <MenuItem value="Theft">Theft</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          {errors.category && (
            <div
              style={{
                color: "#d32f2f",
                fontSize: "12px",
                marginTop: "4px",
                marginBottom: "24px",
              }}
            >
              {errors.category}
            </div>
          )}

          <Paper
            elevation={0}
            sx={{
              border: 1,
              borderColor: "rgba(25, 118, 210, 0.3)",
              borderRadius: 2,
              bgcolor: "rgba(25, 118, 210, 0.04)",
              p: 2,
              mb: 3,
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
            }}
          >
            <CheckCircleOutlineIcon
              sx={{ color: "rgba(25, 118, 210, 0.7)", fontSize: 20, mt: 0.5 }}
            />
            <Box>
              <Typography variant="body2" fontWeight="bold" sx={{ color: "text.primary" }}>
                This coverage is currently used in {usedInProducts} product
                {usedInProducts !== 1 ? "s" : ""}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Changes will affect all products using this coverage
              </Typography>
            </Box>
          </Paper>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
            <Button variant="text" disabled={isLoading} onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{ backgroundColor: "#0167b2" }}
            >
              {isLoading ? "Saving..." : "Update Coverage"}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default EditCoveragePage;
