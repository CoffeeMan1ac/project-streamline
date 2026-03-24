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

interface TagsTableProps {
  tags: {
    id: string;
    tagName: string;
    tagKey: string;
    lastModified: string;
    modifiedBy: string;
  }[];
  onEditTag: (id: string) => void;
  onDeleteTag: (id: string) => void;
}

const TagsTable: React.FC<TagsTableProps> = ({ tags, onEditTag, onDeleteTag }) => {
  return (
    <Box border={1} borderColor="divider" borderRadius={2} bgcolor={"background.paper"}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "background.default" }}>
              <TableCell>Tag Name</TableCell>
              <TableCell>Tag Key</TableCell>
              <TableCell>Last Modified</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tags.map((tag) => (
              <TagsRow
                key={tag.id}
                tagName={tag.tagName}
                tagKey={tag.tagKey}
                lastModified={tag.lastModified}
                modifiedBy={tag.modifiedBy}
                onEdit={() => onEditTag(tag.id)}
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
