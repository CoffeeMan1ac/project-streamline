import QuotationDetails from "../components/QuotationDetails";
import Box from "@mui/material/Box";
const Sandbox = () => {
  return (
    <>
      <h1>Sandbox for viewing components</h1>
      <Box width="80%">
        <QuotationDetails
          quotationId="PS-2024-001234"
          timeStamp="2024-03-15 14:30"
          status="ACCEPTED"
        />
      </Box>
    </>
  );
};

export default Sandbox;
