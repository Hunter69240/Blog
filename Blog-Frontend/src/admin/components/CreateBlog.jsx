import React, { useState, useRef } from 'react'
import { Box, Stack, Typography, Button } from '@mui/material'
import TextField from '@mui/material/TextField';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { uploadImage } from '../services/adminServices';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBlog } from '../services/adminServices';

const CreateBlog = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tag, setTag] = useState("")
  const [description, setDescription] = useState("")
  const [coverImage, setCoverImage] = useState(null)
  const [coverImageUrl, setCoverImageUrl] = useState("")
  const [uploading, setUploading] = useState(false)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState("")
  const [success, setSuccess] = useState("");
  const fileRef = useRef()

  const queryClient = useQueryClient()

  const resetForm = () => {
    setTitle("")
    setContent("")
    setTag("")
    setDescription("")
    setCoverImage(null)
    setCoverImageUrl("")
    setErrors({})
    setServerError("")
    fileRef.current.value = ""
  }

  const validate = () => {
    const newErrors = {}
    if (!title.trim()) newErrors.title = "Title is required"
    if (!description.trim()) newErrors.description = "Description is required"
    if (!tag.trim()) newErrors.tag = "Tag is required"
    if (!content.trim()) newErrors.content = "Content is required"
    if (!coverImageUrl) newErrors.coverImage = "Please upload a cover image"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSelectFile = (e) => {
    setCoverImage(e.target.files[0])
    setCoverImageUrl("")
    setErrors((prev) => ({ ...prev, coverImage: "" }))
  }

  const { mutate: newBlog, isPending } = useMutation({
    mutationKey: ["created"],
    mutationFn: (payload) => createBlog(payload),
    onSuccess: () => {
      console.log("Blog created")
      resetForm()
      queryClient.invalidateQueries(["adminArticles"])
      setSuccess("Successfully uploaded blog")
      setTimeout(() => setSuccess(""), 3000)
    },
    onError: (error) => {
      console.log("CreateBlog", error)
      setServerError(error.response?.data?.message || "Something went wrong")
    }
  })

  const handleUpload = async () => {
    try {
      setUploading(true)
      const url = await uploadImage(coverImage)
      setCoverImageUrl(url)
      setErrors((prev) => ({ ...prev, coverImage: "" }))
      console.log("Image url", url)
    } catch (error) {
      console.log("Upload failed", error)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async () => {
    if (!validate()) return
    const payload = {
      title,
      content,
      tag,
      description,
      cover_image: coverImageUrl
    }
    newBlog(payload)
  }

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    }}>
      <Box sx={{  p: 4, borderRadius: 2, boxShadow: 1, width: 400 }}>
        {success && <Typography color="success.main" sx={{ mb: 1 }}>{success}</Typography>}
        {serverError && <Typography color="error" sx={{ mb: 1 }}>{serverError}</Typography>}
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Create Blog</Typography>

        <Stack spacing={2.5}>
          <TextField
            fullWidth size="small" label="Title" variant="outlined"
            value={title}
            error={!!errors.title}
            helperText={errors.title}
            onChange={(e) => { setTitle(e.target.value); setErrors((prev) => ({ ...prev, title: "" })) }}
          />
          <TextField
            fullWidth size="small" label="Description" variant="outlined"
            value={description}
            error={!!errors.description}
            helperText={errors.description}
            onChange={(e) => { setDescription(e.target.value); setErrors((prev) => ({ ...prev, description: "" })) }}
          />
          <TextField
            fullWidth size="small" label="Tag" variant="outlined"
            value={tag}
            error={!!errors.tag}
            helperText={errors.tag}
            onChange={(e) => { setTag(e.target.value); setErrors((prev) => ({ ...prev, tag: "" })) }}
          />
          <TextField
            fullWidth size="small" label="Content" variant="outlined" multiline rows={4}
            value={content}
            error={!!errors.content}
            helperText={errors.content}
            onChange={(e) => { setContent(e.target.value); setErrors((prev) => ({ ...prev, content: "" })) }}
          />

          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>Cover Image</Typography>
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={handleSelectFile} />
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined" size="small"
                startIcon={<AttachFileIcon />}
                onClick={() => fileRef.current.click()}
                fullWidth
              >
                Select File
              </Button>
              <Button
                variant="contained" size="small"
                startIcon={<CloudUploadIcon />}
                onClick={handleUpload}
                disabled={!coverImage || uploading || !!coverImageUrl}
                disableElevation fullWidth
              >
                {uploading ? "Uploading..." : coverImageUrl ? "Uploaded ✓" : "Upload"}
              </Button>
            </Stack>
            {coverImage && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.8, display: 'block' }}>
                📄 {coverImage.name}
              </Typography>
            )}
            {errors.coverImage && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                {errors.coverImage}
              </Typography>
            )}
          </Box>

          <Button
            variant="contained" disableElevation fullWidth
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default CreateBlog 