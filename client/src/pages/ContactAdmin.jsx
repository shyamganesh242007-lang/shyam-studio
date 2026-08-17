import ContactForm from "../components/admin/ContactForm";

function ContactAdmin() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Contact Management
        </h1>
        <p className="text-slate-400 mt-2 text-base">
          Manage your contact and social links.
        </p>
      </div>

      <ContactForm />
    </div>
  );
}

export default ContactAdmin;