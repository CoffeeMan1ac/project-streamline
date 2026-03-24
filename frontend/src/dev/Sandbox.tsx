import { useState } from "react";
import EditTag from "../components/EditTag";
import { Button, Box } from "@mui/material";

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
      <h1>Sandbox for viewing components</h1>

      <Button variant="contained" onClick={() => setOpen(true)}>
        Open EditTag
      </Button>

      <EditTag
        open={open}
        onClose={handleClose}
        onUpdate={handleUpdate}
        initialValues={{
          name: "Priority",
          key: "priority",
          color: "blue",
        }}
      />
    </Box>
  );
};

export default Sandbox;
