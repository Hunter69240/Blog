import React,{useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate,useParams } from 'react-router-dom';
import { MuiMarkdown } from 'mui-markdown';
import { format } from "date-fns";
import { getSelectedBlog } from '../services/blogService';


const SelectedArticle = () => {
    const navigate=useNavigate()
    const {slug}=useParams()
    const [error,setError]=useState("")
    const [blog,setBlog]=useState(null)
    
    useEffect(() => {
     window.scrollTo(0, 0)
    const fetchBlog = async ()=>{
        try {
            const res=await getSelectedBlog(slug)
            setBlog(res.blog)
        } catch (error) {
            setError(error)
        }
    }
    fetchBlog()
    }, [slug])

    const handleClick = ()=>{
        navigate("/")
    }
    if (error){
        return <Typography align="center">Error loading article</Typography>
    }
    if (!blog){
        return <Typography align="center">Loading...</Typography>
    }
    const {id,title,tag,content,cover_image,created_at}= blog
  return (
    <Box
    sx={(theme) => ({
        bgcolor:
          theme.palette.mode === "dark" ? "#0B1120" : "#ffffff",
        width: "100%",
        maxWidth: "1000px",
        mx:"auto",
       
        borderRadius: 3,
        overflow: "hidden",
       
        px:2,
        pt:4,
        pb:5,
        border:
          theme.palette.mode === "light"
            ? `1px solid ${theme.palette.divider}`
            : "none",

       
        boxShadow:
          theme.palette.mode === "light"
            ? "0 4px 20px rgba(0,0,0,0.04)"
            : "none",

        transition: "transform 0.3s ease, box-shadow 0.3s ease",

        
      })}
    >
        <Stack spacing={5}>
            <Button sx={{
                justifyContent:"flex-start"
            }}
            onClick={handleClick}>
                ← Back to Articles
            </Button>

            <Typography
            sx={{
            color: "primary.main",
            fontWeight: 600,
          }}
            >
              Tag: [ {tag} ]
            </Typography>

            <Typography variant="h2" sx={{ fontWeight: 700 }}>
               {title}
            </Typography>

            <Typography
            sx={{
                opacity:0.6,
                fontSize:"14px"
            }}
            >
                {created_at && format(new Date(created_at), "dd MMM yyyy • hh:mm a")}
            </Typography>

            <Box
            component="img"
            src="/Warframe0000.jpg"
            alt={title}
            sx={{
                width: "100%",
                borderRadius: 3,
            }}
            />

            <Box
            sx={{
                mt:2,
                "& h1": { fontSize: "36px", mt: 4, mb: 2 },
                "& h2": {
                    fontSize: "28px",
                    fontWeight: 700,
                    mt: 5,
                    mb: 2,
                    },
                "& h3": { fontSize: "22px", mt: 3, mb: 1.5 },
               "& p": {
                    fontSize: "18px",
                    lineHeight: 1.9,
                    color: "text.primary",
                    
                    },
                "& ul": { pl: 3 },
                "& li": { mb: 1 },
                "& pre": {
                    backgroundColor: "#0f172a",
                    padding: 2,
                    borderRadius: 2,
                    overflowX: "auto",
                    },
                    "& code": {
                    fontFamily: "monospace",
                    },
                }}
                >
                <MuiMarkdown>
                    {content}
                </MuiMarkdown>
            </Box>
        </Stack>
    </Box>
  )
}

export default SelectedArticle