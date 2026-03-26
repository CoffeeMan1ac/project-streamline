import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CoveragesManagementPage = () => {
  return (
    <Box sx={{ mx: { xs: 2, sm: 3, md: 4, lg: 8, xl: 20 }, my: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Coverages Management
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Manage insurance coverage types and descriptions
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CoveragesManagementPage;