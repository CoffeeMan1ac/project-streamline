import { Box, Typography, TextField, Select, MenuItem, Button } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';

const TagsToolBar = () => {

  const [filter, setFilter] = useState<string>("all");

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  return (
    <Box>  
        {/* Tool bar portion */}
        <Box display="flex" flexDirection="row">
          <TextField
            label="Search tags..."
            variant="outlined"
            size="small"
          />

        <Select
          value={filter}
          onChange={handleChange}
          size="small"
        >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
        </Select>

        <Button variant="contained" color="primary" startIcon={<AddIcon />}>
          Create Tag
        </Button>

        </Box>

        {/* Summary portion */}
        <Box display="flex" flexDirection="row">
            <Typography>Total Tags: 4</Typography>
            <Typography>Showing: 4</Typography>
        </Box>
    </Box>
  );
};

export default TagsToolBar;
