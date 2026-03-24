import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

const TOCContent = ({ headings, onClose, maxHeight }) => (
    <Box sx={{ p: 2, minWidth: 220, display: 'flex', flexDirection: 'column', maxHeight: maxHeight ?? 'none' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, flexShrink: 0 }}>
            <Typography variant="overline" fontWeight={700} color="text.secondary">
                Table of Contents
            </Typography>
            {onClose && (
                <IconButton size="small" onClick={onClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            )}
        </Box>

        {!headings || headings.length === 0 ? (
            <Typography variant="body2" color="text.disabled">No headings found</Typography>
        ) : (
            <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
                <List dense disablePadding>
                    {headings.map((h) => (
                        <ListItemButton
                            key={h.id}
                            sx={{
                                pl: h.level === 1 ? 1 : h.level === 2 ? 2.5 : 4,
                                borderRadius: 1,
                                py: 0.5
                            }}
                            onClick={() => {
                                document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' })
                                onClose?.()
                            }}
                        >
                            <ListItemText
                                primary={h.text}
                                slotProps={{
                                  primary:{
                                    fontSize: h.level === 1 ? '14px' : '13px',
                                    fontWeight: h.level === 1 ? 600 : 400,
                                    color: h.level === 1 ? 'text.primary' : 'text.secondary',
                                }
                                }}
                                
                            />
                        </ListItemButton>
                    ))}
                </List>
            </Box>
        )}
    </Box>
)

const TableOfContent = ({ isDesktop, headings = [] }) => {
    const [drawerOpen, setDrawerOpen] = useState(false)

    if (isDesktop) {
        return (
            <Box
                sx={{
                    position: 'sticky',
                    top: 80,
                    alignSelf: 'flex-start',
                    width: 240,
                    flexShrink: 0,
                    mr: 3,
                    display: { xs: 'none', md: 'block' },
                    // Cap height so it scrolls independently of the page
                    maxHeight: 'calc(100vh - 100px)',
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'column',
                }}
            >
                <TOCContent headings={headings} maxHeight="calc(100vh - 100px)" />
            </Box>
        )
    }

    return (
        <>
            <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    zIndex: 1200,
                    bgcolor: 'primary.main',
                    color: 'white',
                    boxShadow: 3,
                    '&:hover': { bgcolor: 'primary.dark' },
                }}
            >
                <MenuIcon />
            </IconButton>

            <Drawer
                anchor="bottom"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                    sx: {
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        maxHeight: '60vh',
                        display: 'flex',
                        flexDirection: 'column',
                    }
                }}
            >
                <TOCContent
                    headings={headings}
                    onClose={() => setDrawerOpen(false)}
                    maxHeight="60vh"
                />
            </Drawer>
        </>
    )
}

export default TableOfContent