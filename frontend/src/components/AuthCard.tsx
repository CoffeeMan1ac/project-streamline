import { Box, Typography, TextField, Button, Link} from "@mui/material";

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
        <Box width="100%" display="flex" justifyContent="flex-end">
        <Link href="" variant="body2" underline="none">
            Forgot password?
        </Link>
        </Box>
      <Button fullWidth variant="contained" color="primary">
        Login
      </Button>
      <Box borderTop={1} borderColor="divider" pt={2} >
        <Typography fontSize="small" sx={{ color: "text.secondary" }}>
            Demo credentials: admin@phoneshield / admin123
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthCard;
