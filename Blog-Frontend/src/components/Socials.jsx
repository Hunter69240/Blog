import React from "react";
import Box from "@mui/material/Box";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CodeIcon from "@mui/icons-material/Code";
import Button from "@mui/material/Button";

const Socials = ({ media, url }) => {
  const socials = {
    github: {
      name: "GitHub",
      icon: GitHubIcon,
    },
    linkedin: {
      name: "LinkedIn",
      icon: LinkedInIcon,
    },
    portfolio: {
      name: "Portfolio",
      icon: CodeIcon,
    },
  };

  const IconComponent = socials[media]?.icon;

  if (!IconComponent) return null;


  return (
    <Box
      sx={{
        borderRadius: "50%",
      }}
    >
      <Button
        component="a"
        href={url}
        target="_blank"
        sx={(theme) => ({
          minWidth: 40,
          width: 40,
          height: 40,
          borderRadius: "50%",
          bgcolor:
            theme.palette.mode === "dark"
              ? "#1e2939"
              : "#f3f4f6",
          color:
            theme.palette.mode === "dark"
              ? "white"
              : "black",
          "&:hover": {
            opacity: 0.85,
          },
        })}
      >
        <IconComponent fontSize="small" />
        
      </Button>
    </Box>
  );
};

export default Socials;