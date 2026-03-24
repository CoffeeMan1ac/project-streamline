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
    borderColor: "#34C759",
    backgroundColor: "#C7F0D4",
  },
  {
    key: "blue",
    label: "Blue",
    borderColor: "#3B82F6",
    backgroundColor: "#CFE3FF",
  },
  {
    key: "orange",
    label: "Orange",
    borderColor: "#F59E0B",
    backgroundColor: "#FFE2B8",
  },
  {
    key: "purple",
    label: "Purple",
    borderColor: "#A855F7",
    backgroundColor: "#E5CCFF",
  },
  {
    key: "red",
    label: "Red",
    borderColor: "#EF4444",
    backgroundColor: "#FFD1D1",
  },
];

type CreateTagProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (data: { name: string; key: string; color: string }) => void;
};

const CreateTag = ({ open, onClose, onCreate }: CreateTagProps) => {
  const [tagName, setTagName] = useState("");
  const [tagKey, setTagKey] = useState("");
  const [selectedColor, setSelectedColor] = useState("green");
  const [errors, setErrors] = useState<{ name?: string; key?: string }>({});

  const validate = () => {
    const nextErrors: { name?: string; key?: string } = {};

    if (!tagName.trim()) {
      nextErrors.name = "Tag name is required";
    }

    if (!tagKey.trim()) {
      nextErrors.key = "Tag key is required";
    } else if (!/^[a-z0-9-]+$/.test(tagKey)) {
      nextErrors.key = "Use lowercase letters, numbers, and hyphens only";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    onCreate({
      name: tagName.trim(),
      key: tagKey.trim(),
      color: selectedColor,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold" }}>
        Create New Tag
        <IconButton
          aria-label="Close dialog"
          sx={{ position: "absolute", right: 12, top: 12 }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box component="form" onSubmit={handleSubmit}>
          {/* Tag Name */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1, fontWeight: 600 }}>Tag Name *</Typography>

            <TextField
              fullWidth
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Box>

          {/* Tag Key */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1, fontWeight: 600 }}>Tag Key *</Typography>

            <TextField
              fullWidth
              value={tagKey}
              onChange={(e) => setTagKey(e.target.value)}
              error={!!errors.key}
              helperText={
                errors.key || "Used internally for identification (lowercase, hyphen-separated)"
              }
            />
          </Box>

          {/* Colors */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 2, fontWeight: 600 }}>Color *</Typography>

            <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
              {colorOptions.map((color) => (
                <Box
                  key={color.key}
                  onClick={() => setSelectedColor(color.key)}
                  sx={{
                    flex: 1,
                    borderRadius: 4,
                    borderWidth: 3,
                    borderStyle: "solid",
                    borderColor: selectedColor === color.key ? color.borderColor : "divider",
                    backgroundColor:
                      selectedColor === color.key ? color.backgroundColor : "transparent",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    py: 3,
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
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Create Tag
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTag;
