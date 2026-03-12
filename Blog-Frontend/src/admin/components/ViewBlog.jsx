import React,{useState} from 'react'
import Box from "@mui/material/Box";
import AdminCard from "./AdminCard"
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

import {getAdminBlogs} from "../services/adminServices"
import {keepPreviousData, useQuery } from "@tanstack/react-query";
const ViewBlog = () => {

  const [page, setPage] = useState(1);
  
  const handlePageChange = (event, value) => {
      setPage(value);
  };

  const {
      data,
      error,
      isLoading,
      isFetching,
    } = useQuery({
      queryKey: ["adminArticles", page, 4],
      queryFn: () => getAdminBlogs(page, 4),
      staleTime: Infinity,
      placeholderData:keepPreviousData,

    });

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Alert severity="error">Error fetching blogs</Alert>
      </Box>
    );
  }

  
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", sm: 900, md: 1200 },
        mx: "auto",
        pt: 4,
      }}
    >
     
      {isFetching && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}

      <Grid container spacing={4} sx={{ pt: 4 }}>
        {data?.data?.map((blog) => (
          <Grid
            key={blog.slug}
            size={{ xs: 12, md: 6 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <AdminCard blog={blog} />
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={data?.totalPages}
        size="large"
        page={page}
        onChange={handlePageChange}
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: 7,
          pb: 5,
        }}
      />
    </Box>
  )
}

export default ViewBlog