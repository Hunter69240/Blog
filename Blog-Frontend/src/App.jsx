import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

function App({ mode, setMode }) {
  return (
    <Routes>
      <Route path="/" element={<Home mode={mode} setMode={setMode} />} />
    </Routes>
  );
}

export default App;