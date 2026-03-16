import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Typography, Box, Paper } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Tooltip } from "@mui/material";

const ReferenceCard = ({
  color,
  bgColor,
  referenceText,
  subText,
}: {
  color: string;
  bgColor: string;
  referenceText: string;
  subText: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referenceText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Paper
      elevation={0}
      sx={{ bgcolor: bgColor, p: 3, borderRadius: 2, mb: 3, textAlign: "center" }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 1 }}>
        <ArticleOutlinedIcon sx={{ color, fontSize: 20 }} />
        <Typography variant="body1" fontWeight="bold" sx={{ color: "text.primary" }}>
          Decision Reference
        </Typography>
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 0.5 }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ color, letterSpacing: 1 }}>
          {referenceText}
        </Typography>
        <Tooltip title={copied ? "Copied!" : "Copy"} placement="top">
          <ContentCopyIcon
            onClick={handleCopy}
            sx={{
              fontSize: 16,
              color: copied ? "success.main" : color,
              cursor: "pointer",
              "&:hover": { opacity: 0.7 },
            }}
          />
        </Tooltip>
      </Box>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {subText}
      </Typography>
    </Paper>
  );
};

const OutcomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const quoteResult = location.state;
  const decision = quoteResult?.decision?.toLowerCase();
  const premium = quoteResult?.premium ?? 0.0;
  const reference = quoteResult?.reference;
  const reason = quoteResult?.reason;

  const [callIsLoading, setCallIsLoading] = useState(false);
  const [emailIsLoading, setEmailIsLoading] = useState(false);
  const [purchaseIsLoading, setPurchaseIsLoading] = useState(false);

  const handleCall = async () => {
    setCallIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCallIsLoading(false);
  };

  const handleEmail = async () => {
    setEmailIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setEmailIsLoading(false);
  };

  const handleProceed = async () => {
    setPurchaseIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPurchaseIsLoading(false);
  };

  const handleBack = () => navigate("/");

  const isAccepted = decision === "accept";
  const isReferred = decision === "refer";

  return (
    <Box sx={{ bgcolor: "background.default", p: 3 }}>
      <Container maxWidth="sm" sx={{ mt: 5, maxWidth: 700 }}>
        <Box
          sx={{
            boxShadow: 3,
            p: 4,
            bgcolor: "background.paper",
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          {isAccepted ? (
            <>
              <CheckCircleOutlineIcon sx={{ fontSize: 80, color: "#2e7d32", mb: 1 }} />
              <Typography
                variant="h4"
                gutterBottom
                sx={{ color: "text.primary", fontWeight: "bold" }}
              >
                Accepted!
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
                Your quote has been approved with a premium of{" "}
                <Box
                  component="span"
                  sx={{ fontSize: "1.5rem", color: "primary.main", fontWeight: "bold" }}
                >
                  €{premium.toFixed(2)}
                </Box>{" "}
                per month.
              </Typography>

              {reference && (
                <ReferenceCard
                  color="#2e7d32"
                  bgColor="#f0faf0"
                  referenceText={reference}
                  subText="Please save this reference for your records"
                />
              )}

              <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                <Button
                  variant="contained"
                  disableElevation
                  disabled={purchaseIsLoading}
                  onClick={handleProceed}
                  color="primary"
                  sx={{
                    px: 3,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: "bold",
                    width: 200,
                    height: 45,
                    borderRadius: 2,
                  }}
                >
                  {purchaseIsLoading ? "Proceeding..." : "Proceed to Purchase"}
                </Button>
                <Button
                  variant="contained"
                  disableElevation
                  onClick={handleBack}
                  sx={{
                    px: 3,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: "bold",
                    width: 160,
                    height: 45,
                    borderRadius: 2,
                    bgcolor: "#e0e0e0",
                    color: "text.primary",
                    "&:hover": { bgcolor: "#d0d0d0" },
                  }}
                >
                  Back to Home
                </Button>
              </Box>
            </>
          ) : isReferred ? (
            <>
              <ErrorOutlineIcon sx={{ fontSize: 80, color: "#e65100", mb: 1 }} />
              <Typography
                variant="h4"
                gutterBottom
                sx={{ color: "text.primary", fontWeight: "bold" }}
              >
                Application Referred
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
                Your application requires additional review by our underwriting team.
              </Typography>

              {reference && (
                <ReferenceCard
                  color="#e65100"
                  bgColor="#fff8f0"
                  referenceText={reference}
                  subText="Please save this reference for your records"
                />
              )}

              <Paper
                elevation={0}
                sx={{
                  bgcolor: "background.default",
                  p: 3,
                  borderRadius: 2,
                  mb: 3,
                  textAlign: "left",
                }}
              >
                <Typography variant="body1" fontWeight="bold" sx={{ color: "text.primary", mb: 2 }}>
                  What happens next?
                </Typography>
                {[
                  {
                    icon: (
                      <AccessTimeIcon sx={{ fontSize: 20, color: "text.secondary", mt: 0.3 }} />
                    ),
                    text: (
                      <>
                        Our underwriting team will review your application within{" "}
                        <strong>2-3 business days</strong>
                      </>
                    ),
                  },
                  {
                    icon: (
                      <EmailOutlinedIcon sx={{ fontSize: 20, color: "text.secondary", mt: 0.3 }} />
                    ),
                    text: <>You will receive an email with our decision</>,
                  },
                  {
                    icon: (
                      <PhoneOutlinedIcon sx={{ fontSize: 20, color: "text.secondary", mt: 0.3 }} />
                    ),
                    text: <>We may contact you if additional information is needed</>,
                  },
                ].map((item, i) => (
                  <Box
                    key={i}
                    sx={{ display: "flex", gap: 1.5, mb: 1.5, alignItems: "flex-start" }}
                  >
                    {item.icon}
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {item.text}
                    </Typography>
                  </Box>
                ))}
              </Paper>

              <Paper
                elevation={0}
                sx={{ bgcolor: "#f0f4f8", p: 3, borderRadius: 2, mb: 3, textAlign: "left" }}
              >
                <Typography variant="body1" fontWeight="bold" sx={{ color: "text.primary", mb: 1 }}>
                  Why was my application referred?
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
                  Applications are referred for manual review when:
                </Typography>
                {[
                  "Additional verification of information is required",
                  "Your application falls outside standard underwriting criteria",
                  "The device or coverage selected requires specialist assessment",
                  "A manual review may result in a better outcome for your application",
                ].map((item) => (
                  <Box key={item} sx={{ display: "flex", gap: 1, mb: 1, alignItems: "flex-start" }}>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor: "primary.main",
                        mt: 0.8,
                        flexShrink: 0,
                      }}
                    />
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  bgcolor: "background.default",
                  p: 3,
                  borderRadius: 2,
                  mb: 3,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography variant="h6" sx={{ color: "text.primary", fontWeight: "bold", mb: 1 }}>
                  Need to speak with us?
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
                  Our customer service team is available to answer any questions
                </Typography>
                <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    disabled={callIsLoading}
                    onClick={handleCall}
                    startIcon={<PhoneOutlinedIcon />}
                    sx={{
                      px: 3,
                      py: 1,
                      textTransform: "none",
                      fontWeight: "bold",
                      borderRadius: 2,
                    }}
                  >
                    {callIsLoading ? "Calling..." : "Call Us"}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    disabled={emailIsLoading}
                    onClick={handleEmail}
                    startIcon={<EmailOutlinedIcon />}
                    sx={{
                      px: 3,
                      py: 1,
                      textTransform: "none",
                      fontWeight: "bold",
                      borderRadius: 2,
                    }}
                  >
                    {emailIsLoading ? "Sending..." : "Email Support"}
                  </Button>
                </Box>
              </Paper>

              <Button
                variant="contained"
                disableElevation
                onClick={handleBack}
                sx={{
                  px: 3,
                  py: 1,
                  textTransform: "none",
                  fontWeight: "bold",
                  width: 150,
                  borderRadius: 2,
                  bgcolor: "#e0e0e0",
                  color: "text.primary",
                  "&:hover": { bgcolor: "#d0d0d0" },
                }}
              >
                Back to Home
              </Button>
            </>
          ) : (
            <>
              <CancelOutlinedIcon sx={{ fontSize: 80, color: "#c62828", mb: 1 }} />
              <Typography
                variant="h4"
                gutterBottom
                sx={{ color: "text.primary", fontWeight: "bold" }}
              >
                Application Declined
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
                Unfortunately, we are unable to provide coverage at this time.
              </Typography>

              {reference && (
                <ReferenceCard
                  color="#c62828"
                  bgColor="#fff5f5"
                  referenceText={reference}
                  subText="Please quote this reference when contacting support"
                />
              )}

              {reason ? (
                <Paper
                  elevation={0}
                  sx={{ bgcolor: "#fff5f5", p: 3, borderRadius: 2, mb: 3, textAlign: "left" }}
                >
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{ color: "text.primary", mb: 1 }}
                  >
                    Reason for decline:
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {reason}
                  </Typography>
                </Paper>
              ) : (
                <Paper
                  elevation={0}
                  sx={{
                    bgcolor: "background.default",
                    p: 3,
                    borderRadius: 2,
                    mb: 3,
                    textAlign: "left",
                  }}
                >
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{ color: "text.primary", mb: 2 }}
                  >
                    Common reasons for decline:
                  </Typography>
                  {[
                    "Device is older than our coverage eligibility criteria",
                    "Pre-existing damage detected on the device",
                    "Device model not currently covered under our policies",
                    "Information provided could not be verified",
                  ].map((item) => (
                    <Box
                      key={item}
                      sx={{ display: "flex", gap: 1, mb: 1, alignItems: "flex-start" }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          bgcolor: "primary.main",
                          mt: 0.8,
                          flexShrink: 0,
                        }}
                      />
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Paper>
              )}

              <Paper
                elevation={0}
                sx={{
                  bgcolor: "background.default",
                  p: 3,
                  borderRadius: 2,
                  mb: 3,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography variant="h6" sx={{ color: "text.primary", fontWeight: "bold", mb: 1 }}>
                  Need help or have questions?
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
                  Our team is here to help you understand your options
                </Typography>
                <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    disabled={callIsLoading}
                    onClick={handleCall}
                    startIcon={<PhoneOutlinedIcon />}
                    sx={{
                      px: 3,
                      py: 1,
                      textTransform: "none",
                      fontWeight: "bold",
                      borderRadius: 2,
                    }}
                  >
                    {callIsLoading ? "Calling..." : "Call Us"}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    disabled={emailIsLoading}
                    onClick={handleEmail}
                    startIcon={<EmailOutlinedIcon />}
                    sx={{
                      px: 3,
                      py: 1,
                      textTransform: "none",
                      fontWeight: "bold",
                      borderRadius: 2,
                    }}
                  >
                    {emailIsLoading ? "Sending..." : "Email Support"}
                  </Button>
                </Box>
              </Paper>

              <Button
                variant="contained"
                disableElevation
                onClick={handleBack}
                sx={{
                  px: 3,
                  py: 1,
                  textTransform: "none",
                  fontWeight: "bold",
                  width: 150,
                  borderRadius: 2,
                  bgcolor: "#e0e0e0",
                  color: "text.primary",
                  "&:hover": { bgcolor: "#d0d0d0" },
                }}
              >
                Back to Home
              </Button>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default OutcomePage;
