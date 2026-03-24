import {
  Box,
  Button,
  Divider,
  FormControl,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import type { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

interface TagsToolBarProps {
  totalTags: number;
  showingTags: number;
}

const TagsToolBar = ({ totalTags, showingTags }: TagsToolBarProps) => {
  const [filter, setFilter] = useState<string>("all");

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
        bgcolor: "background.paper",
        overflow: "hidden",
      }}
    >
      <Box sx={{ px: { xs: 2, md: 2.5 }, py: { xs: 2, md: 2.75 } }}>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={1.75}
          alignItems={{ xs: "stretch", lg: "center" }}
        >
          <TextField
            placeholder="Search tags..."
            size="small"
            fullWidth
            sx={{
              flex: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "background.paper",
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <FormControl
            size="small"
            sx={{
              minWidth: { xs: "100%", sm: 180 },
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "background.paper",
              },
            }}
          >
            <Select value={filter} onChange={handleChange}>
              <MenuItem value="all">Name (A-Z)</MenuItem>
              <MenuItem value="active">Newest first</MenuItem>
              <MenuItem value="inactive">Oldest first</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{
              minWidth: 138,
              minHeight: 40,
              borderRadius: 2,
              px: 2.25,
              boxShadow: "none",
              fontWeight: 600,
              whiteSpace: "nowrap",
              "&:hover": {
                boxShadow: "none",
              },
            }}
          >
            Create Tag
          </Button>
        </Stack>
      </Box>

      <Divider />

      <Stack
        direction="row"
        spacing={4}
        sx={{
          px: { xs: 2, md: 2.5 },
          py: 1.5,
          color: "text.secondary",
          flexWrap: "wrap",
          rowGap: 1,
        }}
      >
        <Typography variant="body2">
          Total Tags: <Box component="span" sx={{ color: "text.primary", fontWeight: 700 }}>{totalTags}</Box>
        </Typography>
        <Typography variant="body2">
          Showing: <Box component="span" sx={{ color: "text.primary", fontWeight: 700 }}>{showingTags}</Box>
        </Typography>
      </Stack>
    </Paper>
  );
};

export default TagsToolBar;
