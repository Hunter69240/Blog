import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import { format } from "date-fns";




const CardInfo = ({blog}) => {
  const navigate = useNavigate();
  
  if (!blog) return null
  const {id,title,slug,coverImage,createdAt,tag,description}=blog
  

  const handleClick = ()=>{
   
    navigate(`/blog/${slug}`)
  }
  return (
    <Box
      id={id}
      sx={(theme) => ({
        bgcolor:
          theme.palette.mode === "dark" ? "#0B1120" : "#ffffff",
        width: "100%",
        maxWidth: 480,
        p: 4,
        borderRadius: 3,
        overflow: "hidden",
        cursor: "pointer",

       
        border:
          theme.palette.mode === "light"
            ? `1px solid ${theme.palette.divider}`
            : "none",

       
        boxShadow:
          theme.palette.mode === "light"
            ? "0 4px 20px rgba(0,0,0,0.04)"
            : "none",

        transition: "transform 0.3s ease, box-shadow 0.3s ease",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow:
            theme.palette.mode === "light"
              ? "0 12px 30px rgba(0,0,0,0.08)"
              : "0 12px 30px rgba(0,0,0,0.4)",
        },
      })}
    >
      <Stack spacing={2} alignItems="flex-start">
       
        <Typography
          sx={{
            color: "primary.main",
            fontWeight: 600,
          }}
        >
          {tag}
        </Typography>

     
        <Box
          sx={{
            width: "100%",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={coverImage}
            alt="Card image"
            sx={{
              width: "100%",
              display: "block",
              transition: "transform 0.4s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
        </Box>

       
        <Typography
          variant="h5"
          fontWeight={600}
          sx={{
            transition: "color 0.3s ease",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          {title}
        </Typography>

      
        <Typography sx={{ color: "text.secondary" }}>
          {description}
        </Typography>

      
        <Typography variant="caption" sx={{ opacity: 0.7 }}>
          {createdAt && format(new Date(createdAt), "dd MMM yyyy • hh:mm a")}
        </Typography>

       
        <Button
          variant="outlined"
          onClick={()=>handleClick()}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            borderColor: "primary.main",
            color: "primary.main",
            transition: "all 0.3s ease",

            "&:hover": {
              borderColor: "primary.light",
              backgroundColor: "transparent",
              transform: "translateX(4px)",
            },
          }}
        >
          → Read Article
        </Button>
      </Stack>
    </Box>
  );
};

export default CardInfo;