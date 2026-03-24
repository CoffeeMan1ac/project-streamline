import { useState } from "react";
import EditTag from "../components/EditTag";
import { Button, Box, Typography } from "@mui/material";

const initialValues = {
  name: "Priority",
  key: "priority",
  color: "blue",
};

const Sandbox = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = (data: { name: string; key: string; color: string }) => {
    console.log("Updated tag:", data);
    setOpen(false);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Sandbox for viewing components
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)}>
        Open EditTag
      </Button>

      <EditTag
        key={initialValues.key}
        open={open}
        onClose={handleClose}
        onUpdate={handleUpdate}
        initialValues={initialValues}
      />
    </Box>
  );
};

export default Sandbox;
