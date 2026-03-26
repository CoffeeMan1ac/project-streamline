import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import CoveragesTable from "../components/CoveragesTable";
import CoveragesSearchBar from "../components/CoveragesSearchBar";

const testCoverages = [
  {
    id: "1",
    coverageName: "Accidental Damage",
    description: "Coverage for unintentional physical damage to the device",
    category: "Damage",
    usedInProducts: 5,
  },
  {
    id: "2",
    coverageName: "Battery Replacement",
    description: "Coverage for battery degradation and replacement",
    category: "Warranty",
    usedInProducts: 0,
  },
  {
    id: "3",
    coverageName: "Data Recovery",
    description: "Service to recover lost or corrupted data",
    category: "Other",
    usedInProducts: 1,
  },
  {
    id: "4",
    coverageName: "Extended Warranty",
    description: "Extended manufacturer warranty coverage",
    category: "Warranty",
    usedInProducts: 4,
  },
  {
    id: "5",
    coverageName: "Liquid Damage",
    description: "Coverage for damage caused by liquids",
    category: "Damage",
    usedInProducts: 3,
  },
  {
    id: "6",
    coverageName: "Screen Damage",
    description: "Specific coverage for screen cracks and breaks",
    category: "Damage",
    usedInProducts: 2,
  },
  {
    id: "7",
    coverageName: "Theft",
    description: "Protection against theft or robbery of the device",
    category: "Theft",
    usedInProducts: 6,
  },
  {
    id: "8",
    coverageName: "Worldwide Coverage",
    description: "Protection coverage that works internationally",
    category: "Other",
    usedInProducts: 2,
  },
];

const CoveragesManagementPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredCoverages = testCoverages.filter((coverage) => {
    const matchesSearch =
      coverage.coverageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coverage.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || coverage.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleCreateCoverage = () => {
    console.log("create coverage");
  };

  return (
    <Box sx={{ mx: { xs: 2, sm: 3, md: 4, lg: 8, xl: 20 }, my: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
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

      <CoveragesSearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        totalCoverages={testCoverages.length}
        showingCoverages={filteredCoverages.length}
        onCreateCoverage={handleCreateCoverage}
      />

      <Box sx={{ mt: 4 }}>
        <CoveragesTable
          coverages={filteredCoverages}
          onEdit={(id) => console.log("edit", id)}
          onDelete={(id) => console.log("delete", id)}
        />
      </Box>
    </Box>
  );
};

export default CoveragesManagementPage;
