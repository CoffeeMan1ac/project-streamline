import { Box, Drawer, Typography, IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

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
          <Button>Dashboard</Button>
          <Button>Rules Management</Button>
          <Button>Dashboard</Button>
          <Button>Dashboard</Button>
        </Box>

        {/* footer */}
        <Box borderTop={1} borderColor="divider" mt="auto" pt={2}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
            <Typography variant="h6">Admin User</Typography>
            <Typography variant="body2">Underwriter</Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
