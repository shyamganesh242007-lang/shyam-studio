import HeroForm from "../components/admin/HeroForm";

function HeroAdmin() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Hero Management
        </h1>
        <p className="text-slate-400 mt-2 text-base">
          Manage your hero section content, image, and action buttons.
        </p>
      </div>

      <HeroForm />
    </div>
  );
}

export default HeroAdmin;