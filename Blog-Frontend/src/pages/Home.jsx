import Header from "../components/Header";
import Hero from "../components/Hero";
import Articles from "../components/Articles";
const Home = ({ mode, setMode }) => {
  return (
    <>
      <Header mode={mode} setMode={setMode} />
     

      <Hero />

      <Articles/>

     
    </>
  );
};

export default Home;