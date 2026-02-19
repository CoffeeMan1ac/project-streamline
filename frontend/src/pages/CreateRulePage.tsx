import { useState } from "react";
import {
  TextField,
  Container,
  Typography,
  Box,
} from "@mui/material";

const CreateRulePage = () => {
  const [ruleName, setRuleName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    ruleName: "",
  });

  const validateForm = () => {
    const newErrors = {
      ruleName: "",
    };

    if (!ruleName) newErrors.ruleName = "Required";

    setErrors(newErrors);

    const allValid = Object.values(newErrors).every((error) => error === ""); // checks if every error string is empty
    return allValid;
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
        const payload = {
            ruleName,
        };
    } catch (err: any) {
        console.error(err);
    } finally {
        setIsLoading(false);
    }
};

  return (
    <>
      <Box sx={{ p: 6 }}>
        <Container maxWidth="md" sx={{ p: 3, borderRadius: 2, bgcolor: "background.paper" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h4" sx={{ color: "text.primary" }}>
                Create New Rule
            </Typography>
            <Typography sx={{ cursor: "pointer", color: "text.secondary", fontSize: "20px" }}>✕</Typography>
          </Box>
          <hr style={{ borderColor: "#d0d0d0f1", borderTop: "1px solid", margin: "0 -24px 16px -24px" }} />
          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom sx={{ color: "text.primary" }}>
              Rule Name *
            </Typography>
            <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
              <TextField
                fullWidth
                placeholder="e.g., Age Limit Check"
                value={ruleName}
                slotProps={{ htmlInput: { "data-testid": "rule-name-input" } }}
                onChange={(e) => {
                    // required and red box go away after user enters something
                    setRuleName(e.target.value);
                    setErrors((prev) => ({ ...prev, ruleName: "" }));
                }}
                error={!!errors.ruleName}
                helperText={errors.ruleName}
                disabled={isLoading}
              />
            </div>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CreateRulePage;