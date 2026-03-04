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
      <Box>
        <Typography>Email / Username</Typography>
        <TextField fullWidth id="outlined-basic" label="Email / Username" variant="outlined" />
      </Box>
      <Box>
        <Typography>Password</Typography>
        <TextField
          fullWidth
          id="outlined-password"
          label="Password"
          variant="outlined"
          type="password"
        />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Forgot password?
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Log In
      </Button>
    </Box>
  );
};

export default AuthCard;
