import { Box, Typography, TextField, Button } from "@mui/material";

const AuthCard = () => {
  return (
    <Box
      sx={{ border: 1, borderColor: "divider", borderRadius: 2, width: "100%", maxWidth: 400 }}
      bgcolor={"background.paper"}
      p={4}
      display="flex"
      flexDirection="column"
      gap={3}
      alignItems="center"
    >
      <Box width="100%">
        <Typography fontSize="small" sx={{ color: "text.secondary" }}>
          Email / Username
        </Typography>
        <TextField
          fullWidth
          id="outlined-basic"
          placeholder="admin@phoneshield.com"
          variant="outlined"
        />
      </Box>
      <Box width="100%">
        <Typography fontSize="small" sx={{ color: "text.secondary" }}>
          Password
        </Typography>
        <TextField
          fullWidth
          id="outlined-password"
          placeholder="Enter your password"
          variant="outlined"
          type="password"
        />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Forgot password?
      </Typography>
      <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
        Login
      </Button>
    </Box>
  );
};

export default AuthCard;
