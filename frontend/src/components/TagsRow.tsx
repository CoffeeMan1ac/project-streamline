import React from "react";
import { TableRow, TableCell, Chip, Typography, Box, Button } from "@mui/material";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

interface TagsRowProps {
  reference: string;
  customerName: string;
  customerEmail: string;
  product: string;
  status: "accepted" | "rejected";
  premium: string | null;
  date: string;
  onViewDetails: () => void;
}

const TagsRow: React.FC<TagsRowProps> = ({
  reference,
  customerName,
  customerEmail,
  product,
  status,
  premium,
  date,
  onViewDetails,
}) => {
  const statusConfig = {
    accepted: {
      label: "accepted",
      icon: <CheckCircleOutlineIcon sx={{ fontSize: 18, color: "success.main" }} />,
      chipSx: { backgroundColor: "success.light", color: "success.dark", fontWeight: 500 },
    },
    rejected: {
      label: "rejected",
      icon: <CancelOutlinedIcon sx={{ fontSize: 18, color: "error.main" }} />,
      chipSx: { backgroundColor: "rgba(211, 47, 47, 0.16)", color: "error.dark", fontWeight: 500 },
    },
  };

  const config = statusConfig[status];

  return (
    <TableRow>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ArticleOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
          <Typography variant="body2" color="primary" sx={{ fontWeight: 500, cursor: "pointer" }}>
            {reference}
          </Typography>
        </Box>
      </TableCell>

      <TableCell>
        <Typography variant="body2" fontWeight={700}>
          {customerName}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {customerEmail}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2">{product}</Typography>
      </TableCell>

      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {config.icon}
          <Chip
            label={config.label}
            size="small"
            sx={config.chipSx}
            data-testid={`status-chip-${status}`}
          />
        </Box>
      </TableCell>

      <TableCell>
        <Typography variant="body2" fontWeight={700}>
          {premium ?? "—"}
        </Typography>
      </TableCell>

      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CalendarTodayOutlinedIcon sx={{ fontSize: 14, color: "text.secondary" }} />
          <Typography variant="body2">{date}</Typography>
        </Box>
      </TableCell>

      <TableCell>
        <Button
          size="small"
          color="primary"
          onClick={onViewDetails}
          data-testid="view-details-button"
          sx={{ textTransform: "none", fontWeight: 500 }}
        >
          View Details
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TagsRow;
