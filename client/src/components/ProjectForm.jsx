import ImageUploader from "./ImageUploader";

function ProjectForm({ formData, editingId, setFormData, onChange, onSubmit }) {
  function handleImageUploaded(imageUrl) {
    setFormData((prev) => ({
      ...prev,
      image: imageUrl,
    }));
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Project Title"
        value={formData.title}
        onChange={onChange}
        className="w-full p-3 rounded bg-slate-800"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={onChange}
        className="w-full p-3 rounded bg-slate-800"
      />

      <ImageUploader
        image={formData.image}
        onImageUploaded={handleImageUploaded}
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={onChange}
        className="w-full p-3 rounded bg-slate-800"
      />

      <input
        type="text"
        name="technologies"
        placeholder="React, Tailwind, Supabase"
        value={formData.technologies}
        onChange={onChange}
        className="w-full p-3 rounded bg-slate-800"
      />

      <input
        type="text"
        name="github"
        placeholder="GitHub Link"
        value={formData.github}
        onChange={onChange}
        className="w-full p-3 rounded bg-slate-800"
      />

      <input
        type="text"
        name="liveDemo"
        placeholder="Live Demo Link"
        value={formData.liveDemo}
        onChange={onChange}
        className="w-full p-3 rounded bg-slate-800"
      />

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          name="featured"
          checked={formData.featured}
          onChange={onChange}
        />
        Featured Project
      </label>

      <button
        type="submit"
        className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-700"
      >
        {editingId ? "Update Project" : "Add Project"}
      </button>
    </form>
  );
}

export default ProjectForm;