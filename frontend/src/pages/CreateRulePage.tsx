import { useState } from "react";
import {
  TextField,
  Container,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  InputLabel,
  Button,
  Switch,
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import http from "../api/http";

interface CreateRulePageProps {
  products?: { id: string; name: string }[];
  selectedProduct?: string;
  onClose?: () => void;
  onSave?: () => void;
}

// each condition row has a field, operator, and value
type Condition = {
  field: string;
  operator: string;
  value: string;
};

const fieldOptions: Record<string, { value: string; label: string }[]> = {
  country: [
    { value: "ireland", label: "Ireland" },
    { value: "uk", label: "United Kingdom" },
    { value: "usa", label: "United States" },
  ],
  occupation: [
    { value: "teacher", label: "Teacher" },
    { value: "doctor", label: "Doctor" },
    { value: "pilot", label: "Pilot" },
    { value: "engineer", label: "Engineer" },
    { value: "student", label: "Student" },
    { value: "other", label: "Other" },
  ],
  phoneMake: [
    { value: "Apple", label: "Apple" },
    { value: "Samsung", label: "Samsung" },
    { value: "Google", label: "Google" },
  ],
  phoneModel: [
    { value: "iPhone 16", label: "iPhone 16" },
    { value: "iPhone 15", label: "iPhone 15" },
    { value: "iPhone 14", label: "iPhone 14" },
    { value: "iPhone 13", label: "iPhone 13" },
    { value: "Galaxy S24", label: "Galaxy S24" },
    { value: "Galaxy S23", label: "Galaxy S23" },
    { value: "Galaxy S22", label: "Galaxy S22" },
    { value: "Galaxy Note 7", label: "Galaxy Note 7" },
    { value: "Pixel 9", label: "Pixel 9" },
    { value: "Pixel 8", label: "Pixel 8" },
    { value: "Pixel 7", label: "Pixel 7" },
    { value: "Pixel 6", label: "Pixel 6" },
  ],
  phoneCondition: [
    { value: "brand new", label: "Brand New" },
    { value: "lightly used", label: "Lightly Used" },
    { value: "good", label: "Good" },
    { value: "heavily used", label: "Heavily Used" },
    { value: "damaged", label: "Damaged" },
  ],
  phoneAge: [
    { value: "less than 1 year", label: "Less than 1 year" },
    { value: "1 year", label: "1 year" },
    { value: "2 years", label: "2 years" },
    { value: "3 years", label: "3 years" },
    { value: "4+ years", label: "4+ years" },
  ],
};

const CreateRulePage = ({
  products = [],
  selectedProduct = "",
  onClose,
  onSave,
}: CreateRulePageProps) => {
  const [product, setProduct] = useState(selectedProduct);
  const [ruleName, setRuleName] = useState("");
  const [ruleDescription, setRuleDescription] = useState("");
  const [conditionLogic, setConditionLogic] = useState("all");
  const [outcome, setOutcome] = useState("");
  const [declineReason, setDeclineReason] = useState("");
  const [premiumOutcome, setPremiumOutcome] = useState("override");
  const [overrideValue, setOverrideValue] = useState("");
  const [deltaValue, setDeltaValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [earlyExit, setEarlyExit] = useState(false);

  // start with one empty condition by default
  const [conditions, setConditions] = useState<Condition[]>([
    { field: "", operator: "", value: "" },
  ]);

  // tracks per-condition errors
  const [conditionErrors, setConditionErrors] = useState<boolean[]>([false]);

  const [errors, setErrors] = useState({
    ruleName: "",
    ruleDescription: "",
    product: "",
    outcome: "",
    overrideValue: "",
    deltaValue: "",
  });

  // adds a new condition row
  const addCondition = () => {
    setConditions((prev) => [...prev, { field: "", operator: "", value: "" }]);
    setConditionErrors((prev) => [...prev, false]);
  };

  // removes a condition row - only allowed if more than one condition exists
  const removeCondition = (index: number) => {
    setConditions((prev) => prev.filter((_, i) => i !== index));
    setConditionErrors((prev) => prev.filter((_, i) => i !== index));
  };

  // updates a specific field in a specific condition row
  const updateCondition = (index: number, key: keyof Condition, value: string) => {
    setConditions((prev) =>
      prev.map((condition, i) => (i === index ? { ...condition, [key]: value } : condition))
    );
    // clear error for this condition when user updates it
    setConditionErrors((prev) => prev.map((err, i) => (i === index ? false : err)));
  };

  const validateForm = () => {
    const newErrors = {
      ruleName: "",
      ruleDescription: "",
      product: "",
      outcome: "",
      overrideValue: "",
      deltaValue: "",
    };

    if (!ruleName) newErrors.ruleName = "Required";
    if (!ruleDescription) newErrors.ruleDescription = "Required";
    if (!product) newErrors.product = "Required";
    if (!outcome) newErrors.outcome = "Required";
    // only validate the value field for whichever premium option is selected
    if (outcome === "accept" && premiumOutcome === "override" && !overrideValue)
      newErrors.overrideValue = "Required";
    if (outcome === "accept" && premiumOutcome === "delta" && !deltaValue)
      newErrors.deltaValue = "Required";

    // validate each condition row has all fields filled
    const newConditionErrors = conditions.map(
      (condition) => !condition.field || !condition.operator || !condition.value
    );
    setConditionErrors(newConditionErrors);

    setErrors(newErrors);

    const allValid = Object.values(newErrors).every((error) => error === ""); // checks if every error string is empty
    const allConditionsValid = newConditionErrors.every((err) => !err);
    return allValid && allConditionsValid;
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const payload = {
        product,
        name: ruleName,
        description: ruleDescription,
        reason: declineReason,
        active: true,
        ruleConfig: {
          when: {
            match: conditionLogic,
            conditions: conditions.map((c) => ({
              field: c.field,
              operator: c.operator.toUpperCase(),
              value: c.value,
            })),
          },
          then: {
            decision: outcome.toUpperCase(),
            premiumOverride:
              outcome === "accept" && premiumOutcome === "override" && overrideValue
                ? parseFloat(overrideValue)
                : null,
            premiumDelta:
              outcome === "accept" && premiumOutcome === "delta" && deltaValue
                ? parseFloat(deltaValue) / 100
                : null,
            stop: earlyExit,
          },
        },
      };

      await http.post("/backoffice/rules", payload);
      onSave?.();
      onClose?.();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ p: { xs: 2, sm: 4, md: 6 } }}>
        <Container maxWidth="md" sx={{ p: 3, borderRadius: 2, bgcolor: "background.paper" }}>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}
          >
            <Typography
              variant="h4"
              sx={{ color: "text.primary", fontSize: { xs: "1.5rem", md: "2.125rem" } }}
            >
              Create New Rule
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
            <Typography
              variant="body1"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "text.primary" }}
            >
              Product *
            </Typography>
            <FormControl fullWidth disabled={isLoading} sx={{ mb: errors.product ? 0 : 3 }}>
              <InputLabel>Select Product</InputLabel>
              <Select
                value={product}
                label="Select Product"
                onChange={(e) => {
                  setProduct(e.target.value);
                  setErrors((prev) => ({ ...prev, product: "" }));
                }}
                sx={{ textAlign: "left" }}
                error={!!errors.product}
              >
                <MenuItem value="">Select product</MenuItem>
                {products.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errors.product && (
              <div
                style={{
                  color: "#d32f2f",
                  fontSize: "12px",
                  marginTop: "4px",
                  marginBottom: "24px",
                }}
              >
                {errors.product}
              </div>
            )}

            <Typography
              variant="body1"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "text.primary" }}
            >
              Rule Name *
            </Typography>
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
              sx={{ mb: 3 }}
            />

            <Typography
              variant="body1"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "text.primary" }}
            >
              Rule Description *
            </Typography>
            <TextField
              fullWidth
              placeholder="e.g., Checks if the applicant meets the age requirement"
              value={ruleDescription}
              onChange={(e) => {
                setRuleDescription(e.target.value);
                setErrors((prev) => ({ ...prev, ruleDescription: "" }));
              }}
              error={!!errors.ruleDescription}
              helperText={errors.ruleDescription}
              disabled={isLoading}
              sx={{ mb: 3 }}
            />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}
            >
              <Typography variant="body1" fontWeight="bold" sx={{ color: "text.primary" }}>
                Conditions *
              </Typography>
              <Typography
                onClick={addCondition}
                sx={{
                  cursor: "pointer",
                  color: "primary.main",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                + Add Condition
              </Typography>
            </Box>

            {/* loop through conditions and render a row for each one */}
            {conditions.map((condition, index) => (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  bgcolor: conditionErrors[index] ? "#fff5f5" : "background.default",
                  p: 2,
                  borderRadius: 2,
                  mb: 2,
                  border: conditionErrors[index] ? "1px solid #d32f2f" : "none",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "flex-start",
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      flex: 1,
                      width: "100%",
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ mb: 0.5, color: "text.secondary" }}>
                        Field
                      </Typography>
                      <FormControl fullWidth disabled={isLoading}>
                        <Select
                          value={condition.field}
                          displayEmpty
                          onChange={(e) => {
                            updateCondition(index, "field", e.target.value);
                            updateCondition(index, "value", "");
                            updateCondition(index, "operator", "");
                          }}
                          sx={{ textAlign: "left" }}
                        >
                          <MenuItem value="">Select field</MenuItem>
                          <MenuItem value="country">Country</MenuItem>
                          <MenuItem value="occupation">Occupation</MenuItem>
                          <MenuItem value="phoneMake">Phone Make</MenuItem>
                          <MenuItem value="phoneModel">Phone Model</MenuItem>
                          <MenuItem value="phoneCondition">Phone Condition</MenuItem>
                          <MenuItem value="phoneAge">Phone Age</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ mb: 0.5, color: "text.secondary" }}>
                        Operator
                      </Typography>
                      <FormControl fullWidth disabled={isLoading}>
                        <Select
                          value={condition.operator}
                          displayEmpty
                          onChange={(e) => updateCondition(index, "operator", e.target.value)}
                          sx={{ textAlign: "left" }}
                        >
                          <MenuItem value="">Select operator</MenuItem>
                          <MenuItem value="equals">Equals</MenuItem>
                          <MenuItem value="not_equals">Not Equals</MenuItem>
                          <MenuItem value="greater_than">Greater Than</MenuItem>
                          <MenuItem value="less_than">Less Than</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ mb: 0.5, color: "text.secondary" }}>
                        Value
                      </Typography>
                      {fieldOptions[condition.field] ? (
                        <FormControl fullWidth disabled={isLoading}>
                          <Select
                            value={condition.value}
                            displayEmpty
                            onChange={(e) => updateCondition(index, "value", e.target.value)}
                            sx={{ textAlign: "left" }}
                          >
                            <MenuItem value="">Select value</MenuItem>
                            {fieldOptions[condition.field].map((opt) => (
                              <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : (
                        <TextField
                          fullWidth
                          placeholder="Value"
                          value={condition.value}
                          onChange={(e) => updateCondition(index, "value", e.target.value)}
                          disabled={isLoading}
                        />
                      )}
                    </Box>

                    {/* only show remove button if there is more than one condition */}
                    {conditions.length > 1 && (
                      <Typography
                        onClick={() => removeCondition(index)}
                        sx={{
                          cursor: "pointer",
                          color: "error.main",
                          fontSize: "20px",
                          flexShrink: 0,
                          mt: { xs: 0, sm: 3.5 },
                          alignSelf: { xs: "flex-end", sm: "auto" },
                        }}
                      >
                        ✕
                      </Typography>
                    )}
                  </Box>
                </Box>
                {conditionErrors[index] && (
                  <Typography variant="body2" sx={{ color: "#d32f2f", mt: 1, fontSize: "12px" }}>
                    All fields in this condition are required
                  </Typography>
                )}
              </Paper>
            ))}

            <Typography
              variant="body1"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "text.primary", mt: 2 }}
            >
              Condition Logic
            </Typography>
            <RadioGroup
              row
              value={conditionLogic}
              onChange={(e) => setConditionLogic(e.target.value)}
              sx={{ mb: 3 }}
            >
              <FormControlLabel
                value="ALL"
                control={<Radio />}
                label="All conditions must be true"
              />
              <FormControlLabel
                value="ANY"
                control={<Radio />}
                label="At least one condition must be true"
              />
            </RadioGroup>

            <Typography
              variant="body1"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "text.primary" }}
            >
              Decision *
            </Typography>
            <FormControl fullWidth disabled={isLoading} sx={{ mb: errors.outcome ? 0 : 3 }}>
              <InputLabel>Accept or Decline</InputLabel>
              <Select
                value={outcome}
                label="Accept or Decline"
                onChange={(e) => {
                  setOutcome(e.target.value);
                  setErrors((prev) => ({ ...prev, outcome: "", declineReason: "" }));
                }}
                sx={{ textAlign: "left" }}
                error={!!errors.outcome}
              >
                <MenuItem value="">Select outcome</MenuItem>
                <MenuItem value="accept">Accept</MenuItem>
                <MenuItem value="decline">Decline</MenuItem>
              </Select>
            </FormControl>
            {errors.outcome && (
              <div
                style={{
                  color: "#d32f2f",
                  fontSize: "12px",
                  marginTop: "4px",
                  marginBottom: "24px",
                }}
              >
                {errors.outcome}
              </div>
            )}

            {/* only show decline reason if decline is selected */}
            {outcome === "decline" && (
              <>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ color: "text.primary" }}
                >
                  Reason for Decline
                </Typography>
                <TextField
                  fullWidth
                  placeholder="e.g., Unfortunately we are unable to insure this device"
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                  disabled={isLoading}
                  sx={{ mb: 3 }}
                />
              </>
            )}

            {/* only show premium outcome if accept is selected */}
            {outcome === "accept" && (
              <>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ color: "text.primary" }}
                >
                  Premium
                </Typography>
                <RadioGroup
                  row
                  value={premiumOutcome}
                  onChange={(e) => {
                    setPremiumOutcome(e.target.value);
                    setOverrideValue("");
                    setDeltaValue("");
                    setErrors((prev) => ({ ...prev, overrideValue: "", deltaValue: "" }));
                  }}
                  sx={{ mb: 2 }}
                >
                  <FormControlLabel value="override" control={<Radio />} label="Override" />
                  <FormControlLabel value="delta" control={<Radio />} label="Delta" />
                </RadioGroup>

                {premiumOutcome === "override" && (
                  <TextField
                    fullWidth
                    placeholder="e.g., 29.99"
                    label="Override Price (€)"
                    type="number"
                    value={overrideValue}
                    onChange={(e) => {
                      setOverrideValue(e.target.value);
                      setErrors((prev) => ({ ...prev, overrideValue: "" }));
                    }}
                    error={!!errors.overrideValue}
                    helperText={errors.overrideValue}
                    disabled={isLoading}
                    sx={{ mb: 3 }}
                  />
                )}

                {premiumOutcome === "delta" && (
                  <TextField
                    fullWidth
                    placeholder="e.g., 10"
                    label="Delta Percentage (%)"
                    type="number"
                    value={deltaValue}
                    onChange={(e) => {
                      setDeltaValue(e.target.value);
                      setErrors((prev) => ({ ...prev, deltaValue: "" }));
                    }}
                    error={!!errors.deltaValue}
                    helperText={errors.deltaValue}
                    disabled={isLoading}
                    sx={{ mb: 3 }}
                  />
                )}
              </>
            )}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 3,
                p: 2,
                bgcolor: "background.default",
                borderRadius: 2,
              }}
            >
              <Box>
                <Typography variant="body1" fontWeight="bold" sx={{ color: "text.primary" }}>
                  Early Exit
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Stop evaluating further rules if this rule matches
                </Typography>
              </Box>
              <Switch
                checked={earlyExit}
                onChange={(e) => setEarlyExit(e.target.checked)}
                disabled={isLoading}
              />
            </Box>
            <hr
              style={{
                borderColor: "#d0d0d0f9",
                borderTop: "1px solid",
                margin: "0 -24px 16px -24px",
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button variant="text" disabled={isLoading} onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                startIcon={<SaveOutlinedIcon />}
                sx={{ backgroundColor: "#0167b2" }}
              >
                {isLoading ? "Creating..." : "Create Rule"}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CreateRulePage;
