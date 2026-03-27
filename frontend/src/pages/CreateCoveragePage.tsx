import { useState } from "react";
import { TextField, Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateCoveragePage = () => {
  const navigate = useNavigate();
  const [coverageName, setCoverageName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    coverageName: "",
  });

  const validateForm = () => {
    const newErrors = {
      coverageName: "",
    };

    if (!coverageName) newErrors.coverageName = "Required";

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      console.log({ coverageName });
      navigate("/coverages");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    navigate("/coverages");
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 4, md: 6 } }}>
      <Container maxWidth="md" sx={{ p: 3, borderRadius: 2, bgcolor: "background.paper" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography
            variant="h4"
            sx={{ color: "text.primary", fontSize: { xs: "1.5rem", md: "2.125rem" } }}
          >
            Create New Coverage
          </Typography>
          <Typography
            onClick={handleClose}
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

          <hr
            style={{
              borderColor: "#d0d0d0f9",
              borderTop: "1px solid",
              margin: "0 -24px 16px -24px",
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
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
      </Container>
    </Box>
  );
};

export default CreateCoveragePage;
