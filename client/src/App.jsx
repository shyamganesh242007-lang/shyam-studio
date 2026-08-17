import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Login from "./pages/Login";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import HeroAdmin from "./pages/HeroAdmin";
import ProjectAdmin from "./pages/ProjectAdmin";
import AboutAdmin from "./pages/AboutAdmin";
import ContactAdmin from "./pages/ContactAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Section */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="hero" element={<HeroAdmin />} />
          <Route path="projects" element={<ProjectAdmin />} />
          <Route path="about" element={<AboutAdmin />} />
          <Route path="contact" element={<ContactAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;