function ProjectList({ projects, onEdit, onDelete }) {
  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold mb-6">
        Existing Projects
      </h2>

      <div className="space-y-5">
        {projects.length === 0 ? (
          <p className="text-slate-400">
            No projects found.
          </p>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">
                  {project.title}
                </h3>

                <p className="text-slate-400 mt-1">
                  {project.category}
                </p>

                <p className="mt-2">
                  Featured :
                  <span
                    className={`ml-2 font-semibold ${
                      project.featured
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {project.featured ? "Yes" : "No"}
                  </span>
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => onEdit(project)}
                  className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(project.id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProjectList;