import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography, Box, Paper } from "@mui/material";
import decline from "../assets/decline.png";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const DeclinePage = () => {
  const navigate = useNavigate();

  const [callIsLoading, setCallIsLoading] = useState(false);
  const [emailIsLoading, setEmailIsLoading] = useState(false);

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

  const handleBack = async () => {
    navigate("/");
  };

  return (
    <>
      <div style={{ backgroundColor: "#f7fbfc", minHeight: "100vh", padding: "20px" }}>
        <Container maxWidth="sm" style={{ marginTop: "40px", maxWidth: "700px" }}>
          <Box
            sx={{
              boxShadow: 3,
              p: 4,
              bgcolor: "white",
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <img
              src={decline}
              alt="Decline"
              style={{ width: 100, height: 100, marginBottom: 16 }}
            />

            <Typography variant="h4" gutterBottom style={{ color: "black", fontWeight: "bold" }}>
              Application Declined
            </Typography>
            <Typography variant="body1" style={{ color: "#4a4a4a", marginBottom: 24 }}>
              Unfortunately, we are unable to provide coverage at this time.
            </Typography>

            <Paper
              elevation={0}
              sx={{ bgcolor: "#f8fbfc", p: 3, borderRadius: 2, mb: 3, textAlign: "left" }}
            >
              <Typography
                variant="h6"
                style={{ color: "black", fontWeight: "bold", marginBottom: 16 }}
              >
                Common reasons for decline:
              </Typography>
              <Box component="ul" sx={{ color: "#4a4a4a", listStyleType: "none", p: 0, m: 0 }}>
                <li style={{ marginBottom: 8 }}>
                  • Device is older than our coverage eligibility criteria
                </li>
                <li style={{ marginBottom: 8 }}>• Pre-existing damage detected on the device</li>
                <li style={{ marginBottom: 8 }}>
                  • Device model not currently covered under our policies
                </li>
                <li style={{ marginBottom: 8 }}>• Information provided could not be verified</li>
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{ bgcolor: "#f0f6ff", p: 3, borderRadius: 2, mb: 3, border: "1px solid #eaedf8" }}
            >
              <Typography
                variant="h6"
                style={{ color: "black", fontWeight: "bold", marginBottom: 8 }}
              >
                Need help or have questions?
              </Typography>
              <Typography variant="body1" style={{ color: "#4a4a4a", marginBottom: 16 }}>
                Our team is here to help you understand your options
              </Typography>

              <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                <Button
                  variant="contained"
                  disableElevation
                  disabled={callIsLoading}
                  onClick={handleCall}
                  startIcon={<PhoneOutlinedIcon sx={{ color: "white" }} />}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#0167b2",
                    color: "white",
                    textTransform: "none",
                    fontWeight: "bold",
                    width: "125px",
                    height: "40px",
                  }}
                >
                  {callIsLoading ? "Calling..." : "Call Us"}
                </Button>
                <Button
                  variant="contained"
                  disableElevation
                  disabled={emailIsLoading}
                  onClick={handleEmail}
                  startIcon={<EmailOutlinedIcon sx={{ color: "white" }} />}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#0167b2",
                    color: "white",
                    textTransform: "none",
                    fontWeight: "bold",
                    width: "175px",
                    height: "40px",
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
              style={{
                padding: "12px 24px",
                backgroundColor: "#e6e7eb",
                color: "#3b444b",
                textTransform: "none",
                fontWeight: "bold",
                width: "150px",
              }}
            >
              {"Back to Home"}
            </Button>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default DeclinePage;
