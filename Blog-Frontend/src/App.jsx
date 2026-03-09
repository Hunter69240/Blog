import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import SelectedArticle from "./components/SelectedArticle";
import Admin from "./admin/pages/Admin";
import Login from "./admin/pages/Login";
import ProtectedRoute from "./ProtectedRoute"
function App({ mode, setMode }) {
  return (
    <Routes>
      <Route path="/" element={<Home mode={mode} setMode={setMode} />} />
      <Route path="/blog/:slug" element={<SelectedArticle/>}/>

      <Route path="/admin/login" element={<Login/>}/>
      
      <Route element={<ProtectedRoute/>}>
        <Route path="/admin" element={<Admin mode={mode} setMode={setMode}/>}/>
      </Route>
      
    </Routes>
  );
}

export default App;