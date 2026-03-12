import api from "../api/api"

export const  getBlogs = async (page=1,limit=4)=>{
    const res=await api.get(`/blogs?page=${page}&limit=${limit}`)
    return res.data
}

export const getSelectedBlog = async(slug)=>{
    const res=await api.get(`/blogs/${slug}`)
    return res.data
}