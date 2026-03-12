import React from 'react'
import Header from '../components/Header'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'
import Socials from "../components/Socials"

const About = ({ mode, setMode }) => {
  const isDark = mode === 'dark'
  const navigate = useNavigate()

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header mode={mode} setMode={setMode} />

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>

        
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Back to Home
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 4, mb: 8 }}>
          <Avatar
            src="/Avatar.png"
            alt="Aadish D Somayaji"
            sx={{
              width: 110,
              height: 110,
              flexShrink: 0,
              boxShadow: 4,
            }}
          />
          <Box>
            <Typography
              variant="h3"
              fontWeight={700}
              sx={{ letterSpacing: '-0.03em', lineHeight: 1.1, mb: 1, fontSize: { xs: '1.6rem', md: '3rem' } }}
            >
              Hey, I'm Aadish D Somayaji 👋
            </Typography>
            <Typography variant="h6" color="text.secondary" fontWeight={400}>
              Developer · Writer · Lifelong Learner
            </Typography>
          </Box>
        </Box>

        
        <Box sx={{ mb: 7 }}>
          <Typography
            variant="overline"
            color="primary"
            fontWeight={700}
            letterSpacing={3}
            display="block"
            mb={1.5}
          >
            About Me
          </Typography>
          <Typography variant="body1" color="text.primary" sx={{ fontSize: '1.1rem', lineHeight: 1.9 }}>
            I'm a Full Stack Developer / Frontend Developer based in Bangalore, passionate about web
            development which includes frontend and backend development. I spend most of my time building
            things for the web, exploring new technologies, and writing about what I learn along the way.
            When I'm not at a keyboard, you'll find me playing outdoor sports or games on my laptop.
          </Typography>
        </Box>

        <Divider sx={{ mb: 7, opacity: 0.15 }} />

        
        <Box sx={{ mb: 7 }}>
          <Typography
            variant="overline"
            color="primary"
            fontWeight={700}
            letterSpacing={3}
            display="block"
            mb={1.5}
          >
            Why This Blog
          </Typography>
          <Typography variant="body1" color="text.primary" sx={{ fontSize: '1.1rem', lineHeight: 1.9, mb: 2 }}>
            This blog is my little corner of the internet — a place where I document what I'm learning,
            share opinions on things that excite me, and hopefully make someone else's journey a little
            easier. I believe in learning in public, and writing is how I think clearly.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.05rem', lineHeight: 1.9 }}>
            Expect posts on frontend technologies, backend technologies, and the occasional tangent into
            CUDA. No fluff — just honest takes and things I actually found useful.
          </Typography>
        </Box>

        <Divider sx={{ mb: 7, opacity: 0.15 }} />

       
        <Box sx={{ mb: 7 }}>
          <Typography
            variant="overline"
            color="primary"
            fontWeight={700}
            letterSpacing={3}
            display="block"
            mb={2}
          >
            What I Write About
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {['Web Development', 'React', 'UI/UX', 'Career', 'Productivity', 'Open Source', 'CUDA'].map((tag) => (
              <Chip
                key={tag}
                label={tag}
                variant="outlined"
                color="primary"
                sx={{ borderRadius: 2, fontWeight: 500 }}
              />
            ))}
          </Box>
        </Box>

        <Divider sx={{ mb: 7, opacity: 0.15 }} />

       
        <Box
          sx={{
            p: 4,
            borderRadius: 3,
            bgcolor: isDark ? 'grey.900' : 'grey.50',
            border: '1px solid',
            borderColor: isDark ? 'grey.800' : 'grey.200',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" fontWeight={600} mb={1}>
            Let's connect
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Have a question, a topic suggestion, or just want to say hi?{' '}
            <Typography
              component="a"
              href="mailto:aadishds@gmail.com"
              variant="body2"
              color="primary"
              sx={{ fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              Reach out anytime.
            </Typography>
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Socials media="github" url="https://github.com/Hunter69240" />
            <Socials media="linkedin" url="https://www.linkedin.com/in/aadish-d-somayaji-787b952a8/" />
            <Socials media="portfolio" url="https://www.aadishds.me/" />
          </Box>
        </Box>

      </Container>
    </Box>
  )
}

export default About