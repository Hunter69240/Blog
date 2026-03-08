import React,{useState} from 'react'
import Header from '../components/Header'
import CreateBlog from '../components/CreateBlog'
import ViewBlog from '../components/ViewBlog'
import Sidebar from '../components/Sidebar'
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const Admin = ({mode,setMode}) => {
  const [view,setView]=useState("view")
  return (
    <div>
      
      <Header mode={mode} setMode={setMode}/>
      <Box
      sx={{
        display:"flex",
        minHeight:"100vh"
      }}
      >
           <Sidebar view={view} setView={setView}/>
           <Divider orientation='vertical' flexItem/>
          {view == "view" && <ViewBlog/>}
          {view == "create" && <CreateBlog/>}
      </Box>
     
    </div>
  )
}

export default Admin