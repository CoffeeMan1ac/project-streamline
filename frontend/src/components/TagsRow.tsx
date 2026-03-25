import React from "react";
import { TableRow, TableCell, Typography, Box, IconButton } from "@mui/material";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface TagsRowProps {
  tagName: string;
  tagKey: string;
  onEdit: () => void;
  onDelete: () => void;
}

const TagsRow: React.FC<TagsRowProps> = ({ tagName, tagKey, onEdit, onDelete }) => {
  return (
    <TableRow>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              bgcolor: "background.default",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 0.5,
              borderRadius: 1,
            }}
          >
            <LocalOfferOutlinedIcon sx={{ fontSize: 20, color: "primary.main" }} />
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 500, cursor: "pointer" }}>
            {tagName}
          </Typography>
        </Box>
      </TableCell>

      <TableCell>
        <Typography
          variant="body2"
          fontWeight={700}
          sx={{
            color: "text.secondary",
            bgcolor: "background.default",
            p: 0.5,
            borderRadius: 1,
            display: "inline-block",
          }}
        >
          {tagKey}
        </Typography>
      </TableCell>

      <TableCell>
        <IconButton size="small" color="primary" onClick={onEdit}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" color="error" onClick={onDelete}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default TagsRow;
