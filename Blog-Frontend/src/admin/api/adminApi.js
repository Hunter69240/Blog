import axios from "axios"

export const api = axios.create({
    baseURL: import.meta.env.VITE_ADMIN_API_URL,
    withCredentials: true  // 👈 sends cookies automatically
})

// 👇 remove entire request interceptor (no more localStorage)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401 && !error.config.url.includes("/login")) {
            window.location.href = "/admin/login"  // 👈 removed localStorage.removeItem
        }
        return Promise.reject(error)
    }
)

export const imageApi = async (formData) => {
    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_IMAGE_CLOUD_NAME}/image/upload`,
        {
            method: "POST",
            body: formData
        }
    )
    return res.json()
}