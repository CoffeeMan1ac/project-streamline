import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CoveragesRow from "../components/CoveragesRow";
import { Table, TableBody, TableContainer, Paper } from "@mui/material";

const testCoverages = [
  {
    id: "1",
    coverageName: "Accidental Damage",
    description: "Coverage for unintentional physical damage to the device",
    category: "Damage",
    usedInProducts: 5,
  },
];

const CoveragesManagementPage = () => {
  return (
    <Box sx={{ mx: { xs: 2, sm: 3, md: 4, lg: 8, xl: 20 }, my: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Coverages Management
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Manage insurance coverage types and descriptions
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {testCoverages.map((c) => (
                <CoveragesRow
                  key={c.id}
                  coverageName={c.coverageName}
                  description={c.description}
                  category={c.category}
                  usedInProducts={c.usedInProducts}
                  onEdit={() => console.log("edit", c.id)}
                  onDelete={() => console.log("delete", c.id)}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default CoveragesManagementPage;
