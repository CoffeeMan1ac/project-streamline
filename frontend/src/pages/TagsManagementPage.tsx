import { Box, Typography } from "@mui/material";
import TagsToolBar from "../components/TagsToolBar";

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
        </Box>
    );
};

export default TagsManagementPage;
