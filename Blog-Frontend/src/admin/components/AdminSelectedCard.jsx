import React, { useMemo } from 'react'
import { useParams } from "react-router-dom";
import { getBlog } from '../services/adminServices';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import TableOfContent from '../../components/TableOfContent';
import extractHeadings from "../../utils/extractHeadings"
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { format } from "date-fns";
import { MuiMarkdown } from 'mui-markdown';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

const AdminSelectedCard = () => {
    const navigate = useNavigate()
    const { slug } = useParams()
    const theme = useTheme()
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"))
    const { data, error, isLoading } = useQuery({
        queryKey: ["blog", slug],
        queryFn: () => getBlog(slug),
        staleTime: 600000
    })

    const headings = useMemo(() => extractHeadings(data?.blog?.content), [data?.blog?.content])

    const handleClick = () => navigate("/admin")

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Alert severity="error">Error fetching Blog</Alert>
            </Box>
        )
    }

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        )
    }

    if (!data?.blog) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Alert severity="warning">Blog not found</Alert>
            </Box>
        )
    }

    const { title = "", tag = "", content = "", createdAt, coverImage } = data.blog

    return (
        <Stack direction="row" sx={{ px: { xs: 1, md: 4 }, py: 4 }}>

            <TableOfContent isDesktop={isDesktop} headings={headings} />

            <Box
                sx={(theme) => ({
                    bgcolor: theme.palette.mode === "dark" ? "#0B1120" : "#ffffff",
                    width: "100%",
                    maxWidth: "1000px",
                    mx: "auto",
                    borderRadius: 3,
                    overflow: "hidden",
                    px: 2,
                    pt: 4,
                    pb: 5,
                    border: theme.palette.mode === "light"
                        ? `1px solid ${theme.palette.divider}`
                        : "none",
                    boxShadow: theme.palette.mode === "light"
                        ? "0 4px 20px rgba(0,0,0,0.04)"
                        : "none",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                })}
            >
                <Stack spacing={5}>
                    <Button sx={{ justifyContent: "flex-start" }} onClick={handleClick}>
                        ← Back to Articles
                    </Button>

                    <Typography sx={{ color: "primary.main", fontWeight: 600 }}>
                        Tag: [ {tag} ]
                    </Typography>

                    <Typography variant="h2" sx={{ fontWeight: 700 }}>
                        {title}
                    </Typography>

                    <Typography sx={{ opacity: 0.6, fontSize: "14px" }}>
                        {createdAt && format(new Date(createdAt), "dd MMM yyyy • hh:mm a")}
                    </Typography>

                    <Box
                        component="img"
                        src={coverImage}
                        alt={title}
                        sx={{ width: "100%", borderRadius: 3 }}
                    />

                    <Box
                        sx={{
                            mt: 2,
                            "& h1": { fontSize: "36px", mt: 4, mb: 2 },
                            "& h2": { fontSize: "28px", fontWeight: 700, mt: 5, mb: 2 },
                            "& h3": { fontSize: "22px", mt: 3, mb: 1.5 },
                            "& p": { fontSize: "18px", lineHeight: 1.9, color: "text.primary" },
                            "& ul": { pl: 3 },
                            "& li": { mb: 1 },
                            "& pre": {
    backgroundColor: "#0f172a",
    padding: 2,
    borderRadius: 2,
    overflowX: "auto",
    color: "#e2e8f0",        // ← add this
},
"& pre *": {                 // ← targets ALL children inside pre
    color: "#e2e8f0 !important",
    backgroundColor: "transparent !important",
},
"& code": {
    fontFamily: "monospace",
    color: "#e2e8f0",
},
                        }}
                    >
                        <MuiMarkdown>{content}</MuiMarkdown>
                    </Box>
                </Stack>
            </Box>
        </Stack>
    )
}

export default AdminSelectedCard