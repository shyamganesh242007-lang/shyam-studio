import AboutForm from "../components/admin/AboutForm";

function AboutAdmin() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          About Management
        </h1>
        <p className="text-slate-400 mt-2 text-base">
          Manage your profile and about information.
        </p>
      </div>

      <AboutForm />
    </div>
  );
}

export default AboutAdmin;