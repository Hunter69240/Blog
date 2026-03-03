import  { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardInfo from './Card';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';

import { getBlogs } from '../services/blogService';
const Articles = () => {

  const [page,setPage]=useState(1)
  const [blogs,setBlogs]=useState([])  
  const [error,setError]=useState("")
  const [totalPages,setTotalPages]=useState(1)
  const [loading, setLoading] = useState(false);
  const handlePageChange=(event,value)=>{
    setPage(value)
  }

  useEffect(()=>{
    const fetchBlogs = async() =>{
        try {
            setLoading(true)
            const res=await getBlogs(page,4)
            
            setTotalPages(res.totalPages)
            setBlogs(res.data)
        } catch (error) {
            console.log("Articles",error)
            setError(error)
        }finally{
            setLoading(false)
        }
    }
    fetchBlogs()
  },[page])

  if (error) {
    return <Typography align="center">Failed to fetch blogs</Typography>
  }

  if (loading) {
    return <Typography align="center">Loading...</Typography>
  }
  return (
    <Box sx={{ maxWidth: { xs: "100%", sm: 900, md: 1200 }, mx: "auto", pt: 4 }}>
       
        <Grid container spacing={4} sx={{
            pt:4
        }}>
            {blogs.map((blog)=>(
                <Grid size={{xs:12, md:6}} 
                sx={{
                    display:"flex", justifyContent:'center'
                }}
                key={blog.slug}
                > 
                    <CardInfo blog={blog}/>
                </Grid>
            ))}
           
        </Grid>
            

        <Pagination count={totalPages} size="large" page={page} onChange={handlePageChange} sx={{
            display:'flex',
            justifyContent:'center',
            pt:7,
            pb:5
        }}/>
    </Box>
  )
}

export default Articles