import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedProjects } from "../services/projectService";

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedProjects() {
      try {
        const data = await getFeaturedProjects();
        setProjects(data || []);
      } catch (error) {
        console.error(error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProjects();
  }, []);

  return (
    <section
      id="projects"
      className="py-20 lg:py-28 bg-slate-950 text-white relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 lg:mb-20">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            Portfolio
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
            Featured{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <p className="text-slate-400">
            Explore some of the software products built by Shyam Studio.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800"
              >
                <div className="w-full h-52 bg-slate-800 animate-pulse" />

                <div className="p-6 space-y-4">
                  <div className="h-6 w-3/4 bg-slate-800 rounded animate-pulse" />

                  <div className="space-y-2">
                    <div className="h-4 w-full bg-slate-800 rounded animate-pulse" />
                    <div className="h-4 w-5/6 bg-slate-800 rounded animate-pulse" />
                  </div>

                  <div className="h-6 w-24 bg-slate-800 rounded-full animate-pulse" />

                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-slate-800 rounded animate-pulse" />
                    <div className="h-6 w-20 bg-slate-800 rounded animate-pulse" />
                    <div className="h-6 w-14 bg-slate-800 rounded animate-pulse" />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <div className="h-10 flex-1 bg-slate-800 rounded-lg animate-pulse" />
                    <div className="h-10 flex-1 bg-slate-800 rounded-lg animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : projects.length > 0 ? (
          /* Projects */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project) => (
              <div
                key={project.id}
                className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-indigo-500 transition duration-300"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-52 object-cover"
                />

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 text-sm mb-4">
                    {project.description}
                  </p>

                  <span className="inline-block bg-indigo-500/10 text-indigo-300 text-xs px-3 py-1 rounded-full mb-4">
                    {project.category}
                  </span>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies
                      ?.split(",")
                      .map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-slate-800 rounded text-xs"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={project.live_demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg text-sm font-semibold"
                    >
                      Live Demo
                    </a>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center border border-slate-700 hover:bg-slate-800 py-2 rounded-lg text-sm font-semibold"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-center">
            No featured projects found.
          </p>
        )}

        {/* View All Projects */}
        <div className="flex justify-center mt-14">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
          >
            View All Projects
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;