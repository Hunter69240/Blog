import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import SelectedArticle from "./components/SelectedArticle";
import Admin from "./admin/pages/Admin";
function App({ mode, setMode }) {
  return (
    <Routes>
      <Route path="/" element={<Home mode={mode} setMode={setMode} />} />
      <Route path="/blog/:slug" element={<SelectedArticle/>}/>
      <Route path="/admin" element={<Admin/>}/>
    </Routes>
  );
}

export default App;