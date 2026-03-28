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
} from "@mui/material";
import http from "../api/http";

interface CoverageCategory {
  id: string;
  code: string;
  label: string;
}

interface CreateCoveragePageProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

const PHONE_INSURANCE_TYPE_ID = "9333558f-9a40-4ad6-b20b-7f45246c70ea";

const CreateCoveragePage = ({ open, onClose, onSave }: CreateCoveragePageProps) => {
  const [code, setCode] = useState("");
  const [label, setLabel] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<CoverageCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ code: "", label: "", categoryId: "" });

  useEffect(() => {
    if (!open) return;
    const fetchCategories = async () => {
      try {
        const { data } = await http.get<CoverageCategory[]>(
          "/backoffice/products/coverage-categories"
        );
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, [open]);

  const resetForm = () => {
    setCode("");
    setLabel("");
    setCategoryId("");
    setErrors({ code: "", label: "", categoryId: "" });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validateForm = () => {
    const newErrors = { code: "", label: "", categoryId: "" };
    if (!code) newErrors.code = "Required";
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
      await http.post("/backoffice/products/coverages", {
        code,
        label,
        categoryId,
        typeId: PHONE_INSURANCE_TYPE_ID,
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
            Create New Coverage
          </Typography>
          <Typography
            onClick={handleClose}
            sx={{ cursor: "pointer", color: "text.secondary", fontSize: "20px" }}
          >
            ✕
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="body1" fontWeight="bold" gutterBottom>
            Code *
          </Typography>
          <TextField
            fullWidth
            placeholder="e.g., ACCIDENTAL_DAMAGE"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setErrors((prev) => ({ ...prev, code: "" }));
            }}
            error={!!errors.code}
            helperText={errors.code}
            disabled={isLoading}
            sx={{ mb: 3 }}
          />

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
              {isLoading ? "Creating..." : "Create Coverage"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCoveragePage;
