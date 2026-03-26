import { Box, Typography, Chip, Paper } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

type QuotationDetailsProps = {
  quotationId: string;
  timeStamp: string;
  status: "ACCEPTED" | "PENDING" | "REJECTED";
};

const statusConfig = {
  ACCEPTED: {
    label: "ACCEPTED",
    color: "success" as const,
    icon: CheckCircleOutlinedIcon,
  },
  PENDING: {
    label: "PENDING",
    color: "warning" as const,
    icon: AccessTimeOutlinedIcon,
  },
  REJECTED: {
    label: "REJECTED",
    color: "error" as const,
    icon: CancelOutlinedIcon,
  },
};

const QuotationDetails = ({ quotationId, timeStamp, status }: QuotationDetailsProps) => {
  const StatusIcon = statusConfig[status].icon;
  const statusColor = statusConfig[status].color;
  const statusLabel = statusConfig[status].label;
  return (
    <Box>
      <Paper
        sx={{
          p: 2,
          borderRadius: 2,
          border: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Box>
          <Box display="flex" alignItems="center" gap={1}>
            <DescriptionOutlinedIcon color="primary" sx={{ fontSize: 25, mr: 0.5 }} />
            <Typography fontWeight={600} fontSize={25}>
              {quotationId}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mt={0.5}>
            <CalendarTodayOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              {timeStamp}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" gap={1} sx={{ flexShrink: 0 }}>
          <StatusIcon sx={{ fontSize: 25, color: `${statusColor}.main` }} />
          <Chip
            label={statusLabel}
            size="medium"
            sx={{
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 0.5,
              px: 1,
              bgcolor: `${statusColor}.light`,
              color: "text.primary",
              border: "1px solid",
              borderColor: `${statusColor}.main`,
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default QuotationDetails;
