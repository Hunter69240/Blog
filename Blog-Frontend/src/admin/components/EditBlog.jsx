import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Header from './Header';
import { Box, Typography, Button, Stack, TextField, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import { uploadImage, updateBlog } from '../services/adminServices';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const EditBlog = ({ mode, setMode }) => {
    const location = useLocation();
    const blog = location.state
    const { id } = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState(blog?.title || "")
    const [description, setDescription] = useState(blog?.description || "")
    const [content, setContent] = useState(blog?.content || "")
    const [coverImage, setCoverImage] = useState(blog?.coverImage || "")
    const [tag, setTag] = useState(blog?.tag || "")
    const [uploading, setUploading] = useState(false)
    const queryClient = useQueryClient()
    const [serverError, setServerError] = useState("");
    const [success, setSuccess] = useState("");

    const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    try {
        setUploading(true)
        const url = await uploadImage(file)
        setCoverImage(`${url}?t=${Date.now()}`)
    } catch {
        setServerError("Image upload failed. Please try again.")
    } finally {
        setUploading(false)
    }
}

    const { mutate: saveChanges, isPending  } = useMutation({
        mutationKey: ["updated"],
        mutationFn: (payload) => updateBlog(id, payload),
        onSuccess: () => {
            setSuccess("Blog updated successfully!")
            queryClient.invalidateQueries(["blogs"])
            setTimeout(() => navigate(-1), 1500)
        },
        onError: (error) => {
            setServerError(error.response?.data?.message ||"Failed to update blog. Please try again.")
        }
    })

    const handleSave = () => {
        if (!title.trim() || !description.trim() || !content.trim() || !tag.trim()) return
        const payload = {
            title,
            description,
            content,
            cover_image: coverImage.split('?')[0],  
            tag
        }
        saveChanges(payload)
    }

    return (
        <Box>
            <Header mode={mode} setMode={setMode} />

            <Box sx={{ maxWidth: 700, margin: "40px auto", padding: "0 20px" }}>

                <Stack direction="row" alignItems="center" spacing={1} mb={3}>
                    <EditIcon color="primary" />
                    <Typography variant="h5" fontWeight={600}>Edit Blog</Typography>
                </Stack>

                <Stack direction="column" spacing={3}>

                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter blog title"
                    />

                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={2}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter short description"
                    />

                    <TextField
                        label="Content"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={6}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your blog content here"
                    />

                    <Box>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                            Cover Image
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={coverImage}
                                placeholder="Image URL will appear here"
                                size="small"
                                InputProps={{ readOnly: true }}
                            />
                            <Button
                                variant="contained"
                                component="label"
                                startIcon={<CloudUploadIcon />}
                                disabled={uploading}
                                sx={{ whiteSpace: "nowrap", minWidth: "130px" }}
                            >
                                {uploading ? "Uploading..." : "Upload"}
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleImageUpload}
                                />
                            </Button>
                        </Stack>

                        {coverImage && (
                            <Box mt={2}>
                                <img
                                    src={coverImage}
                                    alt="Cover Preview"
                                    style={{
                                        width: "100%",
                                        maxHeight: "200px",
                                        objectFit: "cover",
                                        borderRadius: "8px"
                                    }}
                                />
                            </Box>
                        )}
                    </Box>

                    <TextField
                        label="Tag"
                        variant="outlined"
                        fullWidth
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        placeholder="e.g. technology, travel"
                    />

                    {serverError && <Chip label={serverError} color="error" />}
                    {success && <Chip label={success} color="success" />}

                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        disabled={isPending || uploading}
                        sx={{ alignSelf: "flex-end", px: 4 }}
                    >
                        {isPending ? "Saving..." : "Save Changes"}
                    </Button>

                </Stack>
            </Box>
        </Box>
    )
}

export default EditBlog