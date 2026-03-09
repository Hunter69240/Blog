import {api,imageApi} from "../api/adminApi"

export const LoginFunc = async (email,password)=>{
    try{
        
        const payload={
            email:email,
            password:password
        }
       
        const res=await api.post(`/login`,
            payload
        )
        return res.data
    }catch(error){
        console.log("adminServices line 15",error)
        throw error
    }
}

export const getAdminBlogs = async(page,limit) =>{
    try {
        const res=await api.get(`/blogs?page=${page}&limit=${limit}`)
        console.log("getAdminBlogs",res.data)
        return res.data
    } catch (error) {
        console.log("error getAdminBlogs",error)
        throw error
    }
}

export const publishBlogs = async(id)=>{
    try{
        const res=await api.patch(`/blogs/${id}/publish`)
        return res.data
    }catch(error){
        console.log("PublishError",error)
        throw error
    }
}

export const unPublishBlogs = async(id)=>{
    try{
        const res=await api.patch(`/blogs/${id}/unpublish`)
        return res.data
    }catch(error){
        console.log("Un-PublishError",error)
        throw error
    }
}


export const uploadImage = async (file) => {
    try {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", import.meta.env.VITE_IMAGE_UPLOAD_PRESET)

        const data = await imageApi(formData)
        return data.secure_url 

    } catch (error) {
        console.log("uploadImage", error)
        throw error
    }
}

export const createBlog = async (payload)=>{
    try{
        const res=await api.post(`/blogs`, payload)
        return res.data
    }catch(error){
        console.log("createBlog",error)
        throw error
    }
}