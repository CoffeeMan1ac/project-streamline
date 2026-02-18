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
                <Box component="li" sx={{ mb: 1 }}>
                  • Device is older than our coverage eligibility criteria
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  • Pre-existing damage detected on the device
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  • Device model not currently covered under our policies
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  • Information provided could not be verified
                </Box>
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
                  startIcon={<PhoneOutlinedIcon sx={{ color: "inherit" }} />}
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
                  startIcon={<EmailOutlinedIcon sx={{ color: "inherit" }} />}
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
              {"Back to Home"}
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default DeclinePage;
