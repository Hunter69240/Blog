import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardInfo from "./Card";
import Stack from "@mui/material/Stack";
import Socials from "./Socials";
import Grid from "@mui/material/Grid";
import { getBlogs } from "../services/blogService";
import { useQuery } from '@tanstack/react-query'
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const Hero = () => {

  const {data,error,isLoading}=useQuery({
    queryKey:["blog",1,1],
    queryFn:()=>getBlogs(1,1),
    staleTime:Infinity,
    keepPreviousData : true
  })

    if (isLoading) {
      return (
          <Box sx={{ display: 'flex' }}>
              <CircularProgress />
          </Box>
      )
    }
    
    if(error){
      return (
          <Box sx={{ display: 'flex' }}>
              <Alert severity="error">Error fetching Blogs</Alert>
          </Box>
      )
    }
   
  return (
    <Grid
      container
      spacing={{ xs: 4, md: 6 }}
      sx={{
        pt: { xs: 4, md: 7 },
        px: { xs: 2, md: 6 },
        alignItems: "center",
      }}
    >
     
      <Grid size={{ xs: 12, md: 6 }}>
        <Stack spacing={4} sx={{ maxWidth: 600 }}>
         
          <Box
            sx={(theme) => ({
              bgcolor:
                theme.palette.mode === "dark"
                  ? "#0F1E3A"
                  : "rgba(37, 99, 235, 0.08)",
              color: "primary.main",
              px: 2,
              py: 1,
              borderRadius: 2,
              width: "fit-content",
            })}
          >
            <Typography fontWeight={600}>
              Welcome to my Tech Journey
            </Typography>
          </Box>

          
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: {
                xs: "32px",
                sm: "40px",
                md: "50px",
              },
              lineHeight: 1.2,
            }}
          >
            Engineering Systems.
            Exploring Performance.
            Solving Hard Problems.
          </Typography>

         
          <Typography
            sx={{
              fontSize: { xs: "18px", md: "22px" },
              color: "text.secondary",
              lineHeight: 1.6,
            }}
          >
            I document my journey across backend systems,
            CUDA programming, algorithms, and frontend engineering.
          </Typography>

         
          <Stack direction="row" spacing={{ xs: 2, md: 3 }}>
            <Socials
              media="github"
              url="https://github.com/Hunter69240"
            />
            <Socials
              media="linkedin"
              url=""
            />
            <Socials
              media="portfolio"
              url=""
            />
          </Stack>
        </Stack>
      </Grid>

      
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: { xs: 4, md: 0 },
        }}
      >
      {console.log("Hero",data?.blogs[0])}
      <CardInfo blog={data?.blogs[0]} />
        
      </Grid>
    </Grid>
  );
};

export default Hero;