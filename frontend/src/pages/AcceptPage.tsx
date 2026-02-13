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
      <div style={{ backgroundColor: "#f7fbfc", minHeight: "100vh", padding: "20px" }}>
        <Container maxWidth="sm" style={{ marginTop: "30px", maxWidth: "700px" }}>
          <Box
            sx={{
              boxShadow: 3,
              p: 4,
              bgcolor: "white",
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <img src={checkmark} alt="Checkmark" style={{ width: 140, height: 120 }} />

            <Typography variant="h4" gutterBottom style={{ color: "black", fontWeight: "bold" }}>
              Accepted!
            </Typography>
            <Typography variant="body1" style={{ color: "#4a4a4a" }}>
              Your quote has been approved with a
            </Typography>
            <Typography variant="body1" style={{ color: "#4a4a4a", marginBottom: 27 }}>
              premium of{" "}
              <span style={{ fontSize: "1.5rem", color: "#0167b2", fontWeight: "bold" }}>
                €{premium.toFixed(2)}
              </span>{" "}
              per month.
            </Typography>

            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button
                variant="contained"
                disableElevation
                disabled={purchaseIsLoading}
                onClick={handleProceed}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#0167b2",
                  color: "white",
                  textTransform: "none",
                  fontWeight: "bold",
                  width: "200px",
                  height: "45px",
                }}
              >
                {purchaseIsLoading ? "Proceeding..." : "Proceed to Purchase"}
              </Button>
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
                  width: "160px",
                  height: "45px",
                }}
              >
                {"Back to Home"}
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default AcceptPage;
