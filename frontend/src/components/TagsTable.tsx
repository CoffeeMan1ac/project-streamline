import React from "react";
import TagsRow from "./TagsRow";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Box,
} from "@mui/material";

interface Tag {
  id: string;
  tagName: string;
  tagKey: string;
  color?: string;
}

interface TagsTableProps {
  tags: Tag[];
  onEditTag: (id: string, label: string, key: string, color: string) => void;
  onDeleteTag: (id: string) => void;
}

const TagsTable: React.FC<TagsTableProps> = ({ tags, onEditTag, onDeleteTag }) => {
  return (
    <Box border={1} borderColor="divider" borderRadius={2} bgcolor="background.paper">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "background.default" }}>
              <TableCell>Tag Name</TableCell>
              <TableCell>Tag Key</TableCell>
              <TableCell>Colour</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tags.map((tag) => (
              <TagsRow
                key={tag.id}
                id={tag.id}
                tagName={tag.tagName}
                tagKey={tag.tagKey}
                color={tag.color}
                onEdit={(label, key, color) => onEditTag(tag.id, label, key, color)}
                onDelete={() => onDeleteTag(tag.id)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TagsTable;
