import { Box, Typography, Paper } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

type QuotePersonalDetailsProps = {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
};

const QuotePersonalDetails = ({
  fullName,
  email,
  phone,
  dateOfBirth,
  address,
}: QuotePersonalDetailsProps) => {
  return (
    <Box>
      <Paper
        sx={{
          p: 3,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        {/* Personal Details Section */}
        <Box display="flex" alignItems="center" gap={1} mb={2.5}>
          <PersonOutlineOutlinedIcon color="primary" sx={{ fontSize: 22 }} />
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 600,
              lineHeight: 1,
            }}
          >
            Personal Details
          </Typography>
        </Box>

        {/* Name */}
        <Box mb={1.5}>
          <Typography
            sx={{
              fontSize: 11,
              color: "text.secondary",
              fontWeight: 600,
              letterSpacing: 0.5,
            }}
          >
            FULL NAME
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {fullName}
          </Typography>
        </Box>

        {/* Email */}

        <Box mb={1.5}>
          <Box display="flex" alignItems="center" gap={1}>
            <EmailOutlinedIcon sx={{ color: "text.secondary", fontSize: 13 }} />
            <Typography
              sx={{
                fontSize: 11,
                color: "text.secondary",
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
            >
              EMAIL
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {email}
          </Typography>
        </Box>

        {/* Phone */}
        <Box mb={1.5}>
          <Box display="flex" alignItems="center" gap={1}>
            <LocalPhoneOutlinedIcon sx={{ color: "text.secondary", fontSize: 13 }} />
            <Typography
              sx={{
                fontSize: 11,
                color: "text.secondary",
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
            >
              PHONE
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {phone}
          </Typography>
        </Box>

        {/* Date of Birth */}
        <Box mb={1.5}>
          <Box display="flex" alignItems="center" gap={1}>
            <CalendarTodayOutlinedIcon sx={{ color: "text.secondary", fontSize: 13 }} />
            <Typography
              sx={{
                fontSize: 11,
                color: "text.secondary",
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
            >
              DATE OF BIRTH
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {dateOfBirth}
          </Typography>
        </Box>

        {/* Address */}
        <Box>
          <Box display="flex" alignItems="center" gap={1}>
            <LocationOnOutlinedIcon sx={{ color: "text.secondary", fontSize: 13 }} />
            <Typography
              sx={{
                fontSize: 11,
                color: "text.secondary",
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
            >
              ADDRESS
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {address}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default QuotePersonalDetails;
