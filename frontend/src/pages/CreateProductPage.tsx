import { 
    Box, 
    Typography, 
    Button 
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

const CreateProductPage = () => {
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <Box sx={{ p: 6 }}>
      <Box sx={{ maxWidth: "md", mx: "auto", p: 3, borderRadius: 2, bgcolor: "background.paper" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h4" sx={{ color: "text.primary" }}>
            Create New Product
          </Typography>
        </Box>
        <hr style={{ borderColor: "#d0d0d0f9", borderTop: "1px solid", margin: "0 -24px 16px -24px" }} />

        <Box component="form" onSubmit={handleSubmit}>


          <hr style={{ borderColor: "#d0d0d0f9", borderTop: "1px solid", margin: "0 -24px 16px -24px" }} />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="text">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveOutlinedIcon />}
              sx={{ backgroundColor: "#0167b2" }}
            >
              Create Product
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateProductPage;