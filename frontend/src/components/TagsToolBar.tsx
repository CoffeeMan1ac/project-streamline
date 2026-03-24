import { Box, Typography } from "@mui/material";

const TagsToolBar = () => {
  return (
    <Box>  
        {/* Tool bar portion */}
        <Box display="flex" flexDirection="column">

        </Box>

        {/* Summary portion */}
        <Box display="flex" flexDirection="column">
            <Typography variant="h6">Total Tags: 4</Typography>
            <Typography variant="body1">Showing: 4</Typography>
        </Box>
    </Box>
  );
};

export default TagsToolBar;
