import Header from "../components/Header";
import Hero from "../components/Hero";
import Articles from "../components/Articles";
import Typography from "@mui/material/Typography";
import { Helmet } from 'react-helmet-async';

const Home = ({ mode, setMode }) => {
 
  return (
    <>
      <Helmet>
        <title>DevBlog · Software Development Blog</title>
        <meta name="description" content="Articles on software development, web tech, and building things — written by Aadish." />
        <link rel="canonical" href="https://blog.aadishds.live/" />
        <meta property="og:title" content="DevBlog" />
        <meta property="og:description" content="Articles on software development, web tech, and building things." />
        <meta property="og:url" content="https://blog.aadishds.live/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Header mode={mode} setMode={setMode} />
     

      <Hero />

      <Typography variant="h4" align="center" sx={{
        pb:5
      }}>
        Articles 
      </Typography>

      
      <Articles/>

     
    </>
  );
};

export default Home;