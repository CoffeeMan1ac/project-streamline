import { Box, Typography } from "@mui/material";
import TagsToolBar from "../components/TagsToolBar";
import TagsTable from "../components/TagsTable";

const TagsManagementPage = () => {
    const totalTags = 4;
    const showingTags = 4;

    return (
        <Box>
            {/* Header portion */}
            <Box>
                <Typography variant="h4" gutterBottom>
                    Tags Management
                </Typography>

                <Typography variant="body1" gutterBottom>
                    Manage product tags that determine how products are rendered
                </Typography>
            </Box>
            <TagsToolBar totalTags={totalTags} showingTags={showingTags} />
            <TagsTable
                tags={[
                    { id: "1", tagName: "Best Value", tagKey: "best-value", lastModified: "2024-06-01", modifiedBy: "Emma Thompson" },
                    { id: "2", tagName: "Green", tagKey: "green", lastModified: "2024-06-02", modifiedBy: "Sarah Mitchell" },
                    { id: "3", tagName: "Popular", tagKey: "popular", lastModified: "2024-06-03", modifiedBy: "Sarah Mitchell" },
                    { id: "4", tagName: "Promotion", tagKey: "promotion", lastModified: "2024-06-04", modifiedBy: "Michael Brown" },
                ]}
                onEditTag={(id) => console.log("Edit tag", id)}
                onDeleteTag={(id) => console.log("Delete tag", id)}
            />
        </Box>
    );
};

export default TagsManagementPage;
