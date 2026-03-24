import { Box, Typography } from "@mui/material";
import TagsToolBar from "../components/TagsToolBar";
const TagsManagementPage = () => {
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
            <TagsToolBar />
        </Box>
    );
};

export default TagsManagementPage;
