import { Box, Toolbar, Drawer } from "@mui/material";
const Sidebar = () => {
  return (
    <Drawer variant="permanent" anchor="left" sx={{ position: "fixed" }}>
      <Toolbar>
        <Box>''</Box>
        <Box></Box>

        <Box></Box>
      </Toolbar>
    </Drawer>
  );
};

export default Sidebar;
