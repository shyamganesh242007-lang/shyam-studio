import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  const navItems = [
    { label: "Dashboard", icon: "📊", path: "/admin" },
    { label: "Hero", icon: "🖼", path: "/admin/hero" },
    { label: "Projects", icon: "📁", path: "/admin/projects" },
    { label: "About", icon: "👤", path: "/admin/about" },
    { label: "Contact", icon: "📞", path: "/admin/contact" },
  ];

  return (
    <>
      {/* Mobile Header Toggle */}
      <div className="md:hidden flex items-center justify-between bg-slate-900 border-b border-slate-800 p-4 text-white">
        <span className="font-bold text-lg text-indigo-400">Admin Control</span>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside
        className={`${
          mobileOpen ? "block" : "hidden"
        } md:flex w-full md:w-64 bg-slate-900 border-r border-slate-800 flex-col justify-between shrink-0 min-h-screen p-4`}
      >
        <div>
          <div className="hidden md:block px-4 py-6 border-b border-slate-800 mb-6">
            <h2 className="text-xl font-bold text-white tracking-wide">
              Portfolio <span className="text-indigo-400">Admin</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">Management Panel</p>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800 mt-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors duration-150 border border-red-900/20"
          >
            <span className="text-lg">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;