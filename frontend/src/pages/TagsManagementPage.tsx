import { Box, Typography, Stack } from "@mui/material";
import TagsToolBar from "../components/TagsToolBar";
import TagsTable from "../components/TagsTable";

const TagsManagementPage = () => {
  const totalTags = 4;
  const showingTags = 4;

  return (
    <Box sx={{ mx: { xs: 2, sm: 3, md: 4, lg: 8, xl: 20 }, my: 4 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Tags Management
          </Typography>
          <Typography variant="body1" gutterBottom color="text.secondary">
            Manage product tags that determine how products are rendered
          </Typography>
        </Box>
        <TagsToolBar totalTags={totalTags} showingTags={showingTags} />
        <TagsTable
          tags={[
            { id: "1", tagName: "Best Value", tagKey: "best-value" },
            { id: "2", tagName: "Green", tagKey: "green" },
            { id: "3", tagName: "Popular", tagKey: "popular" },
            { id: "4", tagName: "Promotion", tagKey: "promotion" },
          ]}
          onEditTag={(id) => console.log("Edit tag", id)}
          onDeleteTag={(id) => console.log("Delete tag", id)}
        />
      </Stack>
    </Box>
  );
};

export default TagsManagementPage;
