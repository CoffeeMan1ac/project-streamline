import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Typography, Box } from "@mui/material";
import checkmark from "../assets/checkmark.png";

const AcceptPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const quoteResult = location.state;
  const premium = quoteResult?.premium ?? 0.0;

  const [purchaseIsLoading, setPurchaseIsLoading] = useState(false);

  const handleProceed = async () => {
    setPurchaseIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPurchaseIsLoading(false);
  };

  const handleBack = async () => {
    navigate("/");
  };

  return (
    <>
      <Box sx={{ bgcolor: "background.default", p: 3 }}>
        <Container maxWidth="sm" sx={{ mt: 4, maxWidth: 700 }}>
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
                {"Back to Home"}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AcceptPage;
