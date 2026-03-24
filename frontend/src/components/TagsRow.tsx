import React from "react";
import { TableRow, TableCell, Typography, Box, IconButton } from "@mui/material";
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface TagsRowProps {
  tagName: string;
  tagKey: string;
  lastModified: string;
  modifiedBy: string;
  onEdit: () => void;
  onDelete: () => void;
}

const TagsRow: React.FC<TagsRowProps> = ({
  tagName,
  tagKey,
  lastModified,
  modifiedBy,
  onEdit,
  onDelete,
}) => {
  return (
    <TableRow>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocalOfferOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
          <Typography variant="body2" color="primary" sx={{ fontWeight: 500, cursor: "pointer" }}>
            {tagName}
          </Typography>
        </Box>
      </TableCell>

      <TableCell>
        <Typography variant="body2" fontWeight={700}>
          {tagKey}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2">{lastModified}</Typography>
        <Typography variant="body2" color="text.secondary">
          by: {modifiedBy}
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
