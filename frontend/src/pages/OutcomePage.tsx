import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Typography, Box, Paper } from "@mui/material";
import { PhoneOutlined, EmailOutlined } from "@mui/icons-material";
import checkmark from "../assets/checkmark.png";
import decline from "../assets/decline.png";

const OutcomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const quoteResult = location.state;
  const decision = quoteResult?.decision?.toLowerCase();
  const premium = quoteResult?.premium ?? 0.0;

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
              <Box
                component="img"
                src={checkmark}
                alt="Checkmark"
                sx={{ width: 140, height: 120, mx: "auto" }}
              />
              <Typography
                variant="h4"
                gutterBottom
                sx={{ color: "text.primary", fontWeight: "bold" }}
              >
                Accepted!
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Your quote has been approved with a
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
                premium of{" "}
                <Box
                  component="span"
                  sx={{ fontSize: "1.5rem", color: "primary.main", fontWeight: "bold" }}
                >
                  €{premium.toFixed(2)}
                </Box>{" "}
                per month.
              </Typography>
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
                    bgcolor: "background.default",
                    color: "text.primary",
                  }}
                >
                  Back to Home
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box
                component="img"
                src={decline}
                alt="Decline"
                sx={{ width: 100, height: 100, mb: 2 }}
              />
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
                <Typography variant="h6" sx={{ color: "text.primary", fontWeight: "bold", mb: 2 }}>
                  Common reasons for decline:
                </Typography>
                <Box
                  component="ul"
                  sx={{ color: "text.secondary", listStyleType: "none", p: 0, m: 0 }}
                >
                  {[
                    "Device is older than our coverage eligibility criteria",
                    "Pre-existing damage detected on the device",
                    "Device model not currently covered under our policies",
                    "Information provided could not be verified",
                  ].map((reason) => (
                    <Box component="li" key={reason} sx={{ mb: 1 }}>
                      • {reason}
                    </Box>
                  ))}
                </Box>
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
                    startIcon={<PhoneOutlined />}
                    sx={{
                      px: 3,
                      py: 1,
                      textTransform: "none",
                      fontWeight: "bold",
                      width: 125,
                      height: 40,
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
                    startIcon={<EmailOutlined />}
                    sx={{
                      px: 3,
                      py: 1,
                      textTransform: "none",
                      fontWeight: "bold",
                      width: 175,
                      height: 40,
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
                  bgcolor: "background.default",
                  color: "text.primary",
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
