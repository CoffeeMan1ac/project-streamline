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
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

// each condition row has a field, operator, and value
type Condition = {
  field: string;
  operator: string;
  value: string;
};

const CreateRulePage = () => {
  const [ruleName, setRuleName] = useState("");
  const [ruleDescription, setRuleDescription] = useState("");
  const [conditionLogic, setConditionLogic] = useState("all");
  const [outcome, setOutcome] = useState("");
  const [declineReason, setDeclineReason] = useState("");
  const [premiumOutcome, setPremiumOutcome] = useState("override");
  const [overrideValue, setOverrideValue] = useState("");
  const [deltaValue, setDeltaValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // start with two empty conditions by default
  const [conditions, setConditions] = useState<Condition[]>([
    { field: "", operator: "", value: "" },
    { field: "", operator: "", value: "" },
  ]);

  const [errors, setErrors] = useState({
    ruleName: "",
    ruleDescription: "",
    outcome: "",
    declineReason: "",
    overrideValue: "",
    deltaValue: "",
  });

  // adds a new condition row
  const addCondition = () => {
    setConditions((prev) => [...prev, { field: "", operator: "", value: "" }]);
  };

  // removes a condition row
  const removeCondition = (index: number) => {
    setConditions((prev) => prev.filter((_, i) => i !== index));
  };

  // updates a specific field in a specific condition row
  const updateCondition = (index: number, key: keyof Condition, value: string) => {
    setConditions((prev) =>
      prev.map((condition, i) => (i === index ? { ...condition, [key]: value } : condition))
    );
  };

  const validateForm = () => {
    const newErrors = {
      ruleName: "",
      ruleDescription: "",
      outcome: "",
      declineReason: "",
      overrideValue: "",
      deltaValue: "",
    };

    if (!ruleName) newErrors.ruleName = "Required";
    if (!ruleDescription) newErrors.ruleDescription = "Required";
    if (!outcome) newErrors.outcome = "Required";
    if (outcome === "decline" && !declineReason) newErrors.declineReason = "Required";
    // only validate the value field for whichever premium option is selected
    if (premiumOutcome === "override" && !overrideValue) newErrors.overrideValue = "Required";
    if (premiumOutcome === "delta" && !deltaValue) newErrors.deltaValue = "Required";

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
        ruleDescription,
        conditions,
        conditionLogic,
        outcome,
        declineReason,
        premiumOutcome,
        overrideValue,
        deltaValue,
      };
      console.log(payload);
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
          <Box
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}
          >
            <Typography variant="h4" sx={{ color: "text.primary" }}>
              Create New Rule
            </Typography>
            <Typography sx={{ cursor: "pointer", color: "text.secondary", fontSize: "20px" }}>
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
                sx={{ bgcolor: "background.default", p: 2, borderRadius: 2, mb: 2 }}
              >
                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ mb: 0.5, color: "text.secondary" }}>
                      Field
                    </Typography>
                    <FormControl fullWidth disabled={isLoading}>
                      <Select
                        value={condition.field}
                        displayEmpty
                        onChange={(e) => updateCondition(index, "field", e.target.value)}
                        sx={{ textAlign: "left" }}
                      >
                        <MenuItem value="">Select field</MenuItem>
                        <MenuItem value="age">Age</MenuItem>
                        <MenuItem value="phoneMake">Phone Make</MenuItem>
                        <MenuItem value="phoneModel">Phone Model</MenuItem>
                        <MenuItem value="phoneCondition">Phone Condition</MenuItem>
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
                        <MenuItem value="notEquals">Not Equals</MenuItem>
                        <MenuItem value="greaterThan">Greater Than</MenuItem>
                        <MenuItem value="lessThan">Less Than</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ mb: 0.5, color: "text.secondary" }}>
                      Value
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Value"
                      value={condition.value}
                      onChange={(e) => updateCondition(index, "value", e.target.value)}
                      disabled={isLoading}
                    />
                  </Box>

                  <Typography
                    onClick={() => removeCondition(index)}
                    sx={{
                      cursor: "pointer",
                      color: "error.main",
                      fontSize: "20px",
                      flexShrink: 0,
                      mt: 3.5,
                    }}
                  >
                    ✕
                  </Typography>
                </Box>
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
                value="all"
                control={<Radio />}
                label="All conditions must be true"
              />
              <FormControlLabel
                value="any"
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
              Outcome *
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
                  Customer Facing Reason for Decline *
                </Typography>
                <TextField
                  fullWidth
                  placeholder="e.g., Unfortunately we are unable to insure this device"
                  value={declineReason}
                  onChange={(e) => {
                    setDeclineReason(e.target.value);
                    setErrors((prev) => ({ ...prev, declineReason: "" }));
                  }}
                  error={!!errors.declineReason}
                  helperText={errors.declineReason}
                  disabled={isLoading}
                  sx={{ mb: 3 }}
                />
              </>
            )}

            <Typography
              variant="body1"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "text.primary" }}
            >
              Premium Outcome
            </Typography>
            {/* horizontal radio buttons, value field pops up below when one is selected */}
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
              <FormControlLabel value="override" control={<Radio />} label="Premium Override" />
              <FormControlLabel value="delta" control={<Radio />} label="Premium Delta" />
            </RadioGroup>

            {/* show price field if override is selected */}
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

            {/* show percentage field if delta is selected */}
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
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CreateRulePage;
