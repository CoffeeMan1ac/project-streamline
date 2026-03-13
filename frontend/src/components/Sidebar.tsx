import { Box, Drawer, Typography, IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 260,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 260,
          boxSizing: "border-box",
          borderRight: "1px solid #e0e0e0",
        },
      }}
    >
      <Box p={2} display="flex" flexDirection="column" height="100%">
        {/* header */}
        <Box pb={2} borderBottom="1px solid #e0e0e0">
          <Box display="flex" alignItems="center">
            <Box component="img" src={"shield_logo.png"} alt="logo" sx={{ height: 70, mr: 1 }} />

            <Box flexGrow={1}>
              <Typography fontWeight={600} fontSize={16} color="primary.main">
                Phone
              </Typography>
              <Typography fontWeight={600} fontSize={16} color="primary.main">
                Shield
              </Typography>
              <Typography fontSize={12} color="text.secondary">
                Admin Portal
              </Typography>
            </Box>

            <IconButton size="small">
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>

        {/* buttons */}
        <Box mt={2} display="flex" gap={2} flexDirection="column">
          <Button
            fullWidth
            sx={{ justifyContent: "flex-start", color: "grey" }}
            startIcon={<DashboardIcon />}
          >
            Dashboard
          </Button>

          <Button
            fullWidth
            sx={{ justifyContent: "flex-start", color: "grey" }}
            startIcon={<FeedOutlinedIcon />}
          >
            Rules Management
          </Button>

          <Button
            fullWidth
            sx={{ justifyContent: "flex-start", color: "grey" }}
            startIcon={<ViewInArOutlinedIcon />}
          >
            Products Management
          </Button>

          <Button
            fullWidth
            sx={{ justifyContent: "flex-start", color: "grey" }}
            startIcon={<SettingsIcon />}
          >
            Settings
          </Button>
        </Box>

        {/* footer */}
      <Box
        mt="auto"
        pt={2}
        borderTop={1}
        borderColor="divider">
          <Box display="flex" alignItems="center" gap={1} px={1}>

          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              color: "white",
            }}
          >
            A
          </Box>
            <Typography fontWeight={600} fontSize={14}>Admin User</Typography>
            <Typography fontSize={12} color="text.secondary">Underwriter</Typography>
          </Box>
        </Box>
          <Box display="flex" justifyContent="space-between" mt={2} px={1}>
            <Button startIcon={<LogoutOutlinedIcon />} color="error">
              Logout
            </Button>
          </Box>
        </Box>
    </Drawer>
  );
};

export default Sidebar;
