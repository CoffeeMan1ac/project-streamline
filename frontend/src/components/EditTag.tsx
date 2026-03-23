import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EditTag = () => {
  return (
    <Dialog open maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold" }}>
        Edit Tag
        <IconButton
          sx={{ position: "absolute", right: 12, top: 12 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {/* Tag Name */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ mb: 1, fontWeight: 600 }}>
            Tag Name *
          </Typography>

          <TextField fullWidth value="Green" />
        </Box>

        {/* Tag Key */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ mb: 1, fontWeight: 600 }}>
            Tag Key *
          </Typography>

          <TextField
            fullWidth
            value="green"
            helperText="Used internally for identification (lowercase, hyphen-separated)"
          />
        </Box>

        {/* Colors */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ mb: 2, fontWeight: 600 }}>
            Color *
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Box
              sx={{
                width: 120,
                height: 140,
                borderRadius: 2,
                border: "2px solid #6EDC8C",
                backgroundColor: "#DFF3E5",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "4px solid #6EDC8C",
                  backgroundColor: "#EAF8EE",
                  mb: 1,
                }}
              />
              <Typography>Green</Typography>
            </Box>

            <Box
              sx={{
                width: 120,
                height: 140,
                borderRadius: 2,
                border: "2px solid #ddd",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "4px solid #8BBBF1",
                  backgroundColor: "#EEF5FD",
                  mb: 1,
                }}
              />
              <Typography>Blue</Typography>
            </Box>

            <Box
              sx={{
                width: 120,
                height: 140,
                borderRadius: 2,
                border: "2px solid #ddd",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "4px solid #F0AE5E",
                  backgroundColor: "#FFF4E8",
                  mb: 1,
                }}
              />
              <Typography>Orange</Typography>
            </Box>

            <Box
              sx={{
                width: 120,
                height: 140,
                borderRadius: 2,
                border: "2px solid #ddd",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "4px solid #C49AE9",
                  backgroundColor: "#F5EFFC",
                  mb: 1,
                }}
              />
              <Typography>Purple</Typography>
            </Box>

            <Box
              sx={{
                width: 120,
                height: 140,
                borderRadius: 2,
                border: "2px solid #ddd",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "4px solid #EF9AA6",
                  backgroundColor: "#FDEFF1",
                  mb: 1,
                }}
              />
              <Typography>Red</Typography>
            </Box>
          </Box>
        </Box>

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            mt: 4,
          }}
        >
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained">Update Tag</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EditTag;