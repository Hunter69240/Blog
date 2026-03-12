import {api,imageApi} from "../api/adminApi"

export const LoginFunc = async (email,password)=>{
    const payload={
        email:email,
        password:password
    }
    const res=await api.post(`/login`, payload)
    return res.data
}

export const getAdminBlogs = async(page,limit) =>{
    const res=await api.get(`/blogs?page=${page}&limit=${limit}`)
    return res.data
}

export const publishBlogs = async(id)=>{
    const res=await api.patch(`/blogs/${id}/publish`)
    return res.data
}

export const unPublishBlogs = async(id)=>{
    const res=await api.patch(`/blogs/${id}/unpublish`)
    return res.data
}

export const createBlog = async (payload)=>{
    const res=await api.post(`/blogs`, payload)
    return res.data
}

export const uploadImage = async (file) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", import.meta.env.VITE_IMAGE_UPLOAD_PRESET)
    const data = await imageApi(formData)
    return data.secure_url
}

export const updateBlog = async (id, payload) => {
    const res = await api.patch(`/blogs/${id}`, payload)
    return res.data
}

export const getBlog = async (slug)=>{
    const res=await api.get(`/blogs/${slug}`)
    return res.data
}
export const logoutFunc = async () => {
    await api.post("/logout")
    window.location.href = "/admin/login"
}
