import React from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutFunc } from '../services/adminServices';

const Sidebar = ({ setView }) => {
  return (
    <Box sx={{ height: "100vh", whiteSpace: 'nowrap', display: 'flex', flexDirection: 'column' }}>
      
      {/* 👇 logout at top */}
      <List>
        <ListItem>
          <ListItemButton onClick={logoutFunc}>
            <LogoutIcon sx={{ mr: 1 }} fontSize="small" />
            <ListItemText>Logout</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>

      <List sx={{ flexGrow: 1 }}>
        <ListItem>
          <ListItemButton onClick={() => setView("view")}>
            <ListItemText>View Blog</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton onClick={() => setView("create")}>
            <ListItemText>Create Blog</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>

    </Box>
  )
}

export default Sidebar