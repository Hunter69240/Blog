import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPwd, setViewPwd] = useState(false);
  const [error,setError]=useState({
    email:"",
    password:""
  })
  const handleSubmit = () => {

    let newErrors = {
      email: "",
      password: ""
    };

    if (!email) {
      newErrors.email = "Email is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setError(newErrors);

   
    if (newErrors.email || newErrors.password) return;

    console.log(email, password);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h3">Login</Typography>
            <TextField
                placeholder="Enter email"
                value={email}
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(error.email)}
                helperText={error.email}
            />
            <TextField
                    placeholder="Enter password"
                    type={viewPwd ? "text" : "password"}
                    value={password}
                    label="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setViewPwd(!viewPwd)}>
                            {viewPwd ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        ),
                    }}
                    error={Boolean(error.password)}
                helperText={error.password}
                    />
            <Button onClick={handleSubmit} variant="outlined">
            Login
            </Button>
      </Stack>
    </Box>
  );
};

export default Login;