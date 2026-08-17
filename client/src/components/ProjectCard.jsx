import { Eye, Github, ExternalLink } from "lucide-react";

function ProjectCard({
  title,
  description,
  image,
  technologies,
  github,
  liveDemo,
}) {
  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-blue-500 transition-all duration-300">

      <img
        src={image}
        alt={title}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">

        <h3 className="text-xl font-semibold text-white">
          {title}
        </h3>

        <p className="text-gray-400 mt-3 text-sm">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {technologies?.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-xs"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">

          <button className="text-gray-300 hover:text-white">
            <Eye size={22} />
          </button>

          <div className="flex gap-4">

            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-white"
            >
              <Github size={22} />
            </a>

            <a
              href={liveDemo}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              <ExternalLink size={22} />
            </a>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProjectCard;