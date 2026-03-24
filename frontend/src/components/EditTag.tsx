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
import { useState } from "react";

const colorOptions = [
  {
    key: "green",
    label: "Green",
    borderColor: "#6EDC8C",
    backgroundColor: "#DFF3E5",
  },
  {
    key: "blue",
    label: "Blue",
    borderColor: "#8BBBF1",
    backgroundColor: "#E3F0FC",
  },
  {
    key: "orange",
    label: "Orange",
    borderColor: "#F0AE5E",
    backgroundColor: "#FFF4E8",
  },
  {
    key: "purple",
    label: "Purple",
    borderColor: "#C49AE9",
    backgroundColor: "#F5EFFC",
  },
  {
    key: "red",
    label: "Red",
    borderColor: "#EF9AA6",
    backgroundColor: "#FDEFF1",
  },
];

const EditTag = () => {
  const [open, setOpen] = useState(true);
  const [selectedColor, setSelectedColor] = useState("green");

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold" }}>
        Edit Tag
        <IconButton
          sx={{ position: "absolute", right: 12, top: 12 }}
          onClick={handleClose}
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

          <TextField fullWidth />
        </Box>

        {/* Tag Key */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ mb: 1, fontWeight: 600 }}>
            Tag Key *
          </Typography>

          <TextField
            fullWidth
            helperText="Used internally for identification (lowercase, hyphen-separated)"
          />
        </Box>

        {/* Colors */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ mb: 2, fontWeight: 600 }}>
            Color *
          </Typography>

          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            {colorOptions.map((color) => (
              <Box
                key={color.key}
                onClick={() => setSelectedColor(color.key)}
                sx={{
                  flex: 1,
                  height: 140,
                  borderRadius: 4,
                  border:
                    selectedColor === color.key
                      ? `3px solid ${color.borderColor}`
                      : "3px solid #ddd",
                  backgroundColor:
                    selectedColor === color.key
                      ? color.backgroundColor
                      : "transparent",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: `3px solid ${color.borderColor}`,
                    backgroundColor: color.backgroundColor,
                    mb: 1,
                  }}
                />
                <Typography>{color.label}</Typography>
              </Box>
            ))}
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
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleUpdate}>
            Update Tag
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EditTag;