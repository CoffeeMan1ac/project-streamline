import { Box, Drawer, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = () => {
  return (
    <Drawer variant="permanent" anchor="left">
      <Box p={2}>
        {/* header */}
        <Box pb={1} borderBottom={1} borderColor="divider">
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              component="img"
              src={"shield_logo.png"}
              alt="Phone Shield logo"
              sx={{ height: 60 }}
            />

            <Box>
              <Typography variant="h6" color="textPrimary">
                Phone
              </Typography>
              <Typography variant="h6" color="textPrimary">
                Shield
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Admin Portal
              </Typography>
            </Box>

            <IconButton>
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
