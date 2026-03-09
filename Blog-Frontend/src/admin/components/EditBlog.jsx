import React,{useState} from 'react'
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Header from './Header';
import { Box, Typography } from '@mui/material';
import {Stack} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
const EditBlog = ({mode,setMode}) => {
    const location = useLocation();
    const blog=location.state
    const {id}=useParams()

    const [content, setContent] = useState(blog?.content || "")
    const [coverImage, setCoverImage] = useState(blog?.coverImage || "")
    const [description, setDescription] = useState(blog?.description || "")
    const [tag, setTag] = useState(blog?.tag || "")
    const [title, setTitle] = useState(blog?.title || "")

    const [edit,setEdit]=useState("")
  return (
    <Box>
        <Header mode={mode} setMode={setMode}/>
    <Stack>
        <Box>
            <Typography>Title</Typography>
        </Box>

        <Box>
            <Typography>Description</Typography>
        </Box>

        <Box>
            <Typography>Content</Typography>
        </Box>

        <Box>
            <Typography>Cover Image</Typography>
        </Box>

        <Box>
            <Typography>Tag</Typography>
        </Box>
    </Stack>
    </Box>
  )
}

export default EditBlog