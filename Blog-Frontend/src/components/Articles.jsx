import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardInfo from './Card';
import Grid from '@mui/material/Grid';

const Articles = () => {
  return (
    <Box sx={{ maxWidth: { xs: "100%", sm: 900, md: 1200 }, mx: "auto", pt: 4 }}>
        <Typography variant="h4" align="center">
            Articles
        </Typography>

        <Grid container spacing={4} sx={{
            pt:4
        }}>
            <Grid  size={{xs:12, md:6}} 
                sx={{
                    display:"flex", justifyContent:'center'
                }}
            >
                <CardInfo />
            </Grid>
            <Grid  size={{xs:12, md:6}}
            sx={{
                display:"flex", justifyContent:'center'
            }}
            >
                <CardInfo />
            </Grid>

            <Grid  size={{xs:12, md:6, }}
            sx={{
                display:"flex", justifyContent:'center'
            }}
            >
                <CardInfo />
            </Grid>

            <Grid  size={{xs:12,md:6 }}
            sx={{
                display:"flex", justifyContent:'center'
            }}  
            >
                <CardInfo />
            </Grid>
        </Grid>

        
    </Box>
  )
}

export default Articles