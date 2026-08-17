import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getContactSettings,
  updateContactSettings,
  DEFAULT_CONTACT_SETTINGS,
} from "../../services/contactSettingsService";

function ContactForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState(
    DEFAULT_CONTACT_SETTINGS
  );

  useEffect(() => {
    async function loadContactSettings() {
      try {
        setLoading(true);

        const data = await getContactSettings();

        if (data) {
          setFormData({
            ...DEFAULT_CONTACT_SETTINGS,
            ...data,
          });
        }
      } catch (error) {
        console.error("Failed to load Contact settings:", error);
        toast.error("Failed to load Contact settings.");
      } finally {
        setLoading(false);
      }
    }

    loadContactSettings();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (saving) return;

    try {
      setSaving(true);

      await updateContactSettings(formData);

      toast.success("Contact section updated successfully.");
    } catch (error) {
      console.error("Failed to save Contact settings:", error);

      toast.error(
        error.message || "Failed to save Contact settings."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
        <div className="inline-block w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-2" />

        <p className="text-sm">
          Loading Contact settings...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* CONTACT HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
        <h2 className="text-lg font-semibold text-white">
          ✍️ Contact Header
        </h2>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Contact Label
          </label>

          <input
            type="text"
            name="contact_label"
            value={formData.contact_label}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Contact Heading
          </label>

          <input
            type="text"
            name="contact_heading"
            value={formData.contact_heading}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Contact Description
          </label>

          <textarea
            name="contact_description"
            value={formData.contact_description}
            onChange={handleChange}
            rows={4}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white resize-none focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
      </div>

      {/* CONTACT INFORMATION */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
        <h2 className="text-lg font-semibold text-white">
          📞 Contact Information
        </h2>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Phone
          </label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Location
          </label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="India (Remote Worldwide)"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Contact Information Description
          </label>

          <textarea
            name="contact_info_description"
            value={formData.contact_info_description}
            onChange={handleChange}
            rows={4}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white resize-none focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
      </div>

      {/* SOCIAL LINKS */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
        <h2 className="text-lg font-semibold text-white">
          🔗 Connect with Me
        </h2>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            GitHub URL
          </label>

          <input
            type="url"
            name="github_url"
            value={formData.github_url}
            onChange={handleChange}
            placeholder="https://github.com/username"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            LinkedIn URL
          </label>

          <input
            type="url"
            name="linkedin_url"
            value={formData.linkedin_url}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Instagram URL
          </label>

          <input
            type="url"
            name="instagram_url"
            value={formData.instagram_url}
            onChange={handleChange}
            placeholder="https://instagram.com/username"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* SAVE */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900 disabled:cursor-not-allowed text-white font-medium rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <span>Save Changes</span>
          )}
        </button>
      </div>
    </form>
  );
}

export default ContactForm;