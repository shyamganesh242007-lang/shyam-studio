import { useNavigate } from "react-router-dom";

function DashboardCard({ title, description, icon, link }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => link && navigate(link)}
      className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/40 p-6 rounded-2xl transition-all duration-200 cursor-pointer shadow-lg group flex flex-col justify-between"
    >
      <div>
        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-2xl mb-4 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-200">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-6 flex items-center text-xs font-medium text-indigo-400 group-hover:translate-x-1 transition-transform">
        <span>Manage section</span>
        <span className="ml-1">→</span>
      </div>
    </div>
  );
}

export default DashboardCard;   