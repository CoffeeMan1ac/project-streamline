import { Box, Drawer, Typography, IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';

const Sidebar = () => {
  return (
    <Drawer variant="permanent" anchor="left">
      <Box p={2} display="flex" flexDirection="column" height="100%">
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

        {/* buttons */}
        <Box mt={2} display="flex" alignItems="center" gap={2} flexDirection="column">
          <Button startIcon={<DashboardIcon />}>Dashboard</Button>
          <Button startIcon={<FeedOutlinedIcon />}>Rules Management</Button>
          <Button startIcon={<ViewInArOutlinedIcon />}>Products Management</Button>
          <Button startIcon={<SettingsIcon />}>Settings</Button>
        </Box>

        {/* footer */}
        <Box borderTop={1} borderColor="divider" mt="auto" pt={2}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
            <Typography variant="h6">Admin User</Typography>
            <Typography variant="body2">Underwriter</Typography>
          </Box>

          <Box display="flex" justifyContent="center" mt={2}>
            <Button>Theme</Button>
            <Button color="error">Logout</Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
