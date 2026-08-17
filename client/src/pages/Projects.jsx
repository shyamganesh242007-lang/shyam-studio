import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../services/projectService";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data || []);
      } catch (error) {
        console.error(error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const categories = [
    "All",
    ...new Set(
      projects
        .map((project) => project.category)
        .filter(Boolean)
    ),
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title?.toLowerCase().includes(search.toLowerCase()) ||
      project.description
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      project.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">

        {/* Back to Home */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold">
            Our Portfolio
          </h1>

          <p className="text-gray-400 mt-4">
            Explore all software solutions built by Shyam Studio.
          </p>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-indigo-500"
        />

        {/* Categories */}
        {!loading && (
          <div className="flex gap-3 mt-6 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded transition ${
                  selectedCategory === category
                    ? "bg-blue-600"
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-slate-900 rounded-xl p-5 animate-pulse"
              >
                <div className="w-full h-44 bg-slate-800 rounded-lg" />

                <div className="h-6 bg-slate-800 rounded mt-4 w-3/4" />

                <div className="h-4 bg-slate-800 rounded mt-3 w-full" />
                <div className="h-4 bg-slate-800 rounded mt-2 w-5/6" />

                <div className="h-4 bg-slate-800 rounded mt-3 w-24" />

                <div className="flex gap-3 mt-4">
                  <div className="h-5 bg-slate-800 rounded w-16" />
                  <div className="h-5 bg-slate-800 rounded w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Projects */}
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-slate-900 rounded-xl p-5"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-44 object-cover rounded-lg"
                  />

                  <h2 className="text-xl font-bold mt-4">
                    {project.title}
                  </h2>

                  <p className="text-gray-400 mt-2">
                    {project.description}
                  </p>

                  <p className="text-blue-400 mt-3">
                    {project.category}
                  </p>

                  <div className="flex gap-3 mt-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 hover:text-blue-400"
                      >
                        GitHub
                      </a>
                    )}

                    {project.live_demo && (
                      <a
                        href={project.live_demo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-500 hover:text-green-400"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredProjects.length === 0 && (
              <p className="text-slate-400 text-center mt-12">
                No projects found.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Projects;