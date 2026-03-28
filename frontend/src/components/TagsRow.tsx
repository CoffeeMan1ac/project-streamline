import React, { useState } from "react";
import { TableRow, TableCell, Typography, Box, IconButton } from "@mui/material";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTag from "./EditTag";

const colorOptions: Record<string, { borderColor: string; backgroundColor: string }> = {
  green: { borderColor: "#34C759", backgroundColor: "#C7F0D4" },
  blue: { borderColor: "#3B82F6", backgroundColor: "#CFE3FF" },
  orange: { borderColor: "#F59E0B", backgroundColor: "#FFE2B8" },
  purple: { borderColor: "#A855F7", backgroundColor: "#E5CCFF" },
  red: { borderColor: "#EF4444", backgroundColor: "#FFD1D1" },
};

interface TagsRowProps {
  id: string;
  tagName: string;
  tagKey: string;
  color?: string;
  onEdit: (label: string, key: string, color: string) => void;
  onDelete: () => void;
}

const TagsRow: React.FC<TagsRowProps> = ({
  tagName,
  tagKey,
  color = "green",
  onEdit,
  onDelete,
}) => {
  const [editOpen, setEditOpen] = useState(false);
  const resolvedColor = colorOptions[color] ?? colorOptions.green;

  const handleUpdate = (data: { name: string; key: string; color: string }) => {
    onEdit(data.name, data.key, data.color);
    setEditOpen(false);
  };

  return (
    <>
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
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
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

        {/* Colour swatch column */}
        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                border: `2px solid ${resolvedColor.borderColor}`,
                backgroundColor: resolvedColor.backgroundColor,
              }}
            />
            <Typography
              variant="body2"
              sx={{ textTransform: "capitalize", color: "text.secondary" }}
            >
              {color}
            </Typography>
          </Box>
        </TableCell>

        <TableCell>
          <IconButton size="small" color="primary" onClick={() => setEditOpen(true)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" onClick={onDelete}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>

      <EditTag
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onUpdate={handleUpdate}
        initialValues={{ name: tagName, key: tagKey, color }}
      />
    </>
  );
};

export default TagsRow;
