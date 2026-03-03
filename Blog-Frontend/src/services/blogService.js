import api from "../api/api"

export const  getBlogs = async (page=1,limit=4)=>{
    try {
      const res=await api.get(`/blogs?page=${page}&limit=${limit}`)
      return res.data
      } catch (error) {
        console.log("error",error)
        throw error
      }
}


export const getSelectedBlog = async(slug)=>{
    try {
            const res=await api.get(`/blogs/${slug}`)
            return res.data
        } catch (error) {
            console.log("Selected article",error)
            throw (error)
        }
}