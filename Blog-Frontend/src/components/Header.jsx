import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = ({ mode, setMode }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const isAbout = location.pathname === '/about'

  const toggleMode = () => {
    setMode(prev => prev === "light" ? "dark" : "light");
  };

  const handleClick = () => navigate("/about")

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          color: "text.primary",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 4,
          py: 1.5,
          position: "sticky",
          zIndex: 1100,
          top: 0,
          borderBottom: 1,
          borderColor: "divider"
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            component="img"
            src="/logo-blog.svg"
            alt="DevBlog logo"
            sx={{ height: 40 }}
          />
          <Typography variant="h5" sx={{ color: "primary.main", fontWeight: 600 }}>
            DevBlog
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Button
            onClick={handleClick}
            variant={isAbout ? "contained" : "text"}
            color="primary"
            sx={{
              cursor: "pointer",
              textTransform: 'none',
              fontWeight: isAbout ? 700 : 400,
              borderRadius: 2,
            }}
          >
            About
          </Button>

          <Button onClick={toggleMode} color="inherit">
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Header;