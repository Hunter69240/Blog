import { Navigate, Outlet } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { api } from "./admin/api/adminApi"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"

export default function ProtectedRoute() {
    const { isLoading, isError } = useQuery({
        queryKey: ["authCheck"],
        queryFn: () => api.get("/auth-check").then(res => res.data),
        retry: false,
        staleTime: 5 * 60 * 1000
    })

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
            </Box>
        )
    }

    if (isError) {
        return <Navigate to="/admin/login" />
    }

    return <Outlet />
}