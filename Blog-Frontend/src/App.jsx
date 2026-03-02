import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import SelectedArticle from "./components/SelectedArticle";
function App({ mode, setMode }) {
  return (
    <Routes>
      <Route path="/" element={<Home mode={mode} setMode={setMode} />} />
      <Route path="/blog/:slug" element={<SelectedArticle/>}/>
    </Routes>
  );
}

export default App;