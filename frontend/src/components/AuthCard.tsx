import { Box, Typography, TextField, Button } from "@mui/material";

const AuthCard = () => {
  return (
    <Box>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Email / Username
        </Typography>
        <TextField id="outlined-basic" label="Email / Username" variant="outlined" />
      </Box>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Password
        </Typography>
        <TextField id="outlined-password" label="Password" variant="outlined" />
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
