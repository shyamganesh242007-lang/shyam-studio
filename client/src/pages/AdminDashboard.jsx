import DashboardCard from "../components/admin/DashboardCard";

function AdminDashboard() {
  const cards = [
    {
      title: "Projects",
      description: "Manage your portfolio projects.",
      icon: "📁",
      link: "/admin/projects",
    },
    {
      title: "Hero",
      description: "Manage your hero section.",
      icon: "🖼",
      link: "/admin/hero",
    },
    {
      title: "About",
      description: "Manage your profile and about information.",
      icon: "👤",
      link: "/admin/about",
    },
    {
      title: "Contact",
      description: "Manage your contact and social links.",
      icon: "📞",
      link: "/admin/contact",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-slate-400 mt-2 text-base">
          Manage your portfolio content from one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <DashboardCard
            key={card.title}
            title={card.title}
            description={card.description}
            icon={card.icon}
            link={card.link}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;