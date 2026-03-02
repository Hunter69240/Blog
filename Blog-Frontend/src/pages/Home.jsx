import Header from "../components/Header";
import Hero from "../components/Hero";
import Articles from "../components/Articles";
import Typography from "@mui/material/Typography";

const Home = ({ mode, setMode }) => {
 
  return (
    <>
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