import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

type AuthCardProps = {
  onSubmit: (email: string, password: string) => Promise<void> | void;
};

const AuthCard = ({ onSubmit }: AuthCardProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(email, password);
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ border: 1, borderColor: "divider", borderRadius: 2, width: "100%", maxWidth: 400 }}
      bgcolor={"background.paper"}
      p={4}
      display="flex"
      flexDirection="column"
      gap={3}
      alignItems="center"
    >
      <Box width="100%">
        <Typography fontSize="small" sx={{ color: "text.secondary" }} mb={1}>
          Email / Username
        </Typography>
        <TextField
          fullWidth
          id="outlined-basic"
          placeholder="admin@phone-shield.com"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>
      <Box width="100%">
        <Typography fontSize="small" sx={{ color: "text.secondary" }} mb={1}>
          Password
        </Typography>
        <TextField
          fullWidth
          id="outlined-password"
          placeholder="Enter your password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box width="100%" display="flex" justifyContent="flex-end">
        <Link href="" variant="body2" underline="none">
          Forgot password?
        </Link>
      </Box>
      <Button fullWidth variant="contained" color="primary" type="submit">
        Login
      </Button>
      <Box borderTop={1} borderColor="divider" pt={2}>
        <Typography fontSize="small" sx={{ color: "text.secondary" }}>
          Demo credentials: admin@phone-shield.com / phone-shield-sweng
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthCard;
