import { useEffect, useState } from "react";
import {
  addProject,
  getProjects,
  deleteProject,
  updateProject,
} from "../services/projectService";
import ProjectForm from "../components/ProjectForm";
import ProjectList from "../components/ProjectList";

const INITIAL_FORM_DATA = {
  title: "",
  description: "",
  image: "",
  category: "",
  technologies: "",
  github: "",
  liveDemo: "",
  featured: false,
};

function ProjectAdmin() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const data = await getProjects();
      setProjects(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleEdit(project) {
    setEditingId(project.id);

    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      category: project.category,
      technologies: project.technologies,
      github: project.github,
      liveDemo: project.live_demo,
      featured: project.featured,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProject(id);
      await loadProjects();

      alert("Project deleted successfully!");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      title: formData.title,
      description: formData.description,
      image: formData.image,
      category: formData.category,
      technologies: formData.technologies,
      github: formData.github,
      live_demo: formData.liveDemo,
      featured: formData.featured,
    };

    try {
      if (editingId) {
        await updateProject(editingId, payload);
        alert("Project Updated Successfully!");
      } else {
        await addProject(payload);
        alert("Project Added Successfully!");
      }

      await loadProjects();
      setEditingId(null);
      setFormData(INITIAL_FORM_DATA);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
          {editingId ? "Edit Project" : "Add New Project"}
        </h1>
        <p className="text-slate-400 text-sm">
          Manage, create, and update your portfolio projects showcase.
        </p>
      </div>

      <ProjectForm
        formData={formData}
        editingId={editingId}
        setFormData={setFormData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      {loading ? (
        <div className="text-slate-400 text-sm py-4">Loading projects...</div>
      ) : (
        <ProjectList
          projects={projects}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default ProjectAdmin;