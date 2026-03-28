import { useState, useEffect } from "react";
import {
  TextField,
  Typography,
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import http from "../api/http";

interface CoverageCategory {
  id: string;
  code: string;
  label: string;
}

interface CoverageOptionDto {
  id: string;
  code: string;
  label: string;
  categoryCode: string;
  categoryLabel: string;
}

interface EditCoveragePageProps {
  open: boolean;
  coverageId: string | null;
  onClose: () => void;
  onSave: () => void;
}

const EditCoveragePage = ({ open, coverageId, onClose, onSave }: EditCoveragePageProps) => {
  const [code, setCode] = useState("");
  const [label, setLabel] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<CoverageCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [errors, setErrors] = useState({ label: "", categoryId: "" });

  useEffect(() => {
    if (!open) return;

    const fetchData = async () => {
      setIsFetching(true);
      try {
        const [categoriesRes, coveragesRes] = await Promise.all([
          http.get<CoverageCategory[]>("/backoffice/products/coverage-categories"),
          http.get<CoverageOptionDto[]>("/backoffice/products/coverages"),
        ]);

        setCategories(categoriesRes.data);

        const coverage = coveragesRes.data.find((c) => c.id === coverageId);
        if (coverage) {
          setCode(coverage.code);
          setLabel(coverage.label);
          const matchedCategory = categoriesRes.data.find(
            (cat) => cat.code === coverage.categoryCode
          );
          if (matchedCategory) {
            setCategoryId(matchedCategory.id);
          }
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [open, coverageId]);

  const resetForm = () => {
    setCode("");
    setLabel("");
    setCategoryId("");
    setErrors({ label: "", categoryId: "" });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validateForm = () => {
    const newErrors = { label: "", categoryId: "" };
    if (!label) newErrors.label = "Required";
    if (!categoryId) newErrors.categoryId = "Required";
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === "");
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await http.put(`/backoffice/products/coverages/${coverageId}`, {
        label,
        categoryId,
      });
      onSave();
      handleClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogContent sx={{ p: { xs: 2, sm: 4 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            Edit Coverage
          </Typography>
          <Typography
            onClick={handleClose}
            sx={{ cursor: "pointer", color: "text.secondary", fontSize: "20px" }}
          >
            ✕
          </Typography>
        </Box>

        {isFetching ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="body1" fontWeight="bold" gutterBottom>
              Code
            </Typography>
            <TextField fullWidth value={code} disabled sx={{ mb: 3 }} />

            <Typography variant="body1" fontWeight="bold" gutterBottom>
              Label *
            </Typography>
            <TextField
              fullWidth
              placeholder="e.g., Accidental Damage"
              value={label}
              onChange={(e) => {
                setLabel(e.target.value);
                setErrors((prev) => ({ ...prev, label: "" }));
              }}
              error={!!errors.label}
              helperText={errors.label}
              disabled={isLoading}
              sx={{ mb: 3 }}
            />

            <Typography variant="body1" fontWeight="bold" gutterBottom>
              Category *
            </Typography>
            <FormControl fullWidth disabled={isLoading} sx={{ mb: errors.categoryId ? 0 : 3 }}>
              <Select
                value={categoryId}
                displayEmpty
                onChange={(e) => {
                  setCategoryId(e.target.value);
                  setErrors((prev) => ({ ...prev, categoryId: "" }));
                }}
                error={!!errors.categoryId}
                sx={{ textAlign: "left" }}
              >
                <MenuItem value="">Select category</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errors.categoryId && (
              <div
                style={{
                  color: "#d32f2f",
                  fontSize: "12px",
                  marginTop: "4px",
                  marginBottom: "24px",
                }}
              >
                {errors.categoryId}
              </div>
            )}

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
              <Button variant="text" disabled={isLoading} onClick={handleClose}>
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
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditCoveragePage;
