import Header from "../components/Header";

const Home = ({ mode, setMode }) => {
  return (
    <>
      <Header mode={mode} setMode={setMode} />
    </>
  );
};

export default Home;