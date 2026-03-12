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

import { LoginFunc } from "../services/adminServices";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPwd, setViewPwd] = useState(false);
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const { mutate, isPending, data } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => LoginFunc(email, password),
    onSuccess: (data) => {
      setLoginError("");
      localStorage.setItem("token",data.token)
      navigate('/admin')
    },
    onError: (err) => {
      setLoginError(err.response.data.message|| "Login failed. Please try again.");
    },
});

  const handleSubmit = () => {
    let newErrors = {
      email: "",
      password: "",
    };

    if (!email) {
      newErrors.email = "Email is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setError(newErrors);

    if (newErrors.email || newErrors.password) return;
    
    mutate();
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

        {loginError && (
          <Typography color="error" variant="body2">
            {loginError}
          </Typography>
        )}

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
        <Button onClick={handleSubmit} variant="outlined" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </Stack>
    </Box>
  );
};

export default Login;