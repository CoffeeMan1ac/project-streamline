import QuotePersonalDetails from "../components/QuotePersonalDetails";
import { Box } from "@mui/material";

const Sandbox = () => {
  return (
    <>
      <Box width="80%">
        <h1>Sandbox for viewing components</h1>
        <QuotePersonalDetails
          fullName="Daniel Byrd"
          email="john.smith@email.com"
          phone="+353 87 123 4567"
          dateOfBirth="15 May 1992"
          address="123 Main Street, Dublin 2, Ireland"
        />
      </Box>
    </>
  );
};

export default Sandbox;
