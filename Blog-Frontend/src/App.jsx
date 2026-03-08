import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import SelectedArticle from "./components/SelectedArticle";
import Admin from "./admin/pages/Admin";
import Login from "./admin/pages/Login";
function App({ mode, setMode }) {
  return (
    <Routes>
      <Route path="/" element={<Home mode={mode} setMode={setMode} />} />
      <Route path="/blog/:slug" element={<SelectedArticle/>}/>
      <Route path="/admin/login" element={<Login/>}/>
      <Route path="/admin" element={<Admin mode={mode} setMode={setMode}/>}/>
    </Routes>
  );
}

export default App;