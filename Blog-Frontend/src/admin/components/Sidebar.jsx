import React from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const Sidebar = ({setView}) => {
  return (
    <Box sx={{ height: "100vh", whiteSpace: 'nowrap' }}>
      <List>
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