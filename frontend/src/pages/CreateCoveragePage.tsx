import Box from "@mui/material/Box";
import { Container } from "@mui/material";

const CreateCoveragePage = () => {
  return (
    <Box sx={{ p: { xs: 2, sm: 4, md: 6 } }}>
      <Container
        maxWidth="md"
        sx={{ p: 3, borderRadius: 2, bgcolor: "background.paper" }}
      ></Container>
    </Box>
  );
};

export default CreateCoveragePage;
