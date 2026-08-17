import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getAboutSettings,
  updateAboutSettings,
  DEFAULT_ABOUT_SETTINGS,
} from "../../services/aboutSettingsService";

function AboutForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState(
    DEFAULT_ABOUT_SETTINGS
  );

  useEffect(() => {
    async function loadAboutSettings() {
      try {
        setLoading(true);

        const data = await getAboutSettings();

        if (data) {
          setFormData({
            about_label:
              data.about_label ||
              DEFAULT_ABOUT_SETTINGS.about_label,

            about_heading:
              data.about_heading ||
              DEFAULT_ABOUT_SETTINGS.about_heading,

            about_description:
              data.about_description ||
              DEFAULT_ABOUT_SETTINGS.about_description,

            feature_1_title:
              data.feature_1_title ||
              DEFAULT_ABOUT_SETTINGS.feature_1_title,

            feature_1_description:
              data.feature_1_description ||
              DEFAULT_ABOUT_SETTINGS.feature_1_description,

            feature_2_title:
              data.feature_2_title ||
              DEFAULT_ABOUT_SETTINGS.feature_2_title,

            feature_2_description:
              data.feature_2_description ||
              DEFAULT_ABOUT_SETTINGS.feature_2_description,

            feature_3_title:
              data.feature_3_title ||
              DEFAULT_ABOUT_SETTINGS.feature_3_title,

            feature_3_description:
              data.feature_3_description ||
              DEFAULT_ABOUT_SETTINGS.feature_3_description,

            stat_1_number:
              data.stat_1_number ||
              DEFAULT_ABOUT_SETTINGS.stat_1_number,

            stat_1_label:
              data.stat_1_label ||
              DEFAULT_ABOUT_SETTINGS.stat_1_label,

            stat_2_number:
              data.stat_2_number ||
              DEFAULT_ABOUT_SETTINGS.stat_2_number,

            stat_2_label:
              data.stat_2_label ||
              DEFAULT_ABOUT_SETTINGS.stat_2_label,

            stat_3_number:
              data.stat_3_number ||
              DEFAULT_ABOUT_SETTINGS.stat_3_number,

            stat_3_label:
              data.stat_3_label ||
              DEFAULT_ABOUT_SETTINGS.stat_3_label,
          });
        }
      } catch (error) {
        console.error("Failed to load About settings:", error);
        toast.error("Failed to load About settings.");
      } finally {
        setLoading(false);
      }
    }

    loadAboutSettings();
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

      await updateAboutSettings(formData);

      toast.success("About section updated successfully.");
    } catch (error) {
      console.error("Failed to save About settings:", error);

      toast.error(
        error.message || "Failed to save About settings."
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
          Loading About settings...
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* ABOUT CONTENT */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
        <h2 className="text-lg font-semibold text-white">
          ✍️ About Content
        </h2>

        {/* Label */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            About Label
          </label>

          <input
            type="text"
            name="about_label"
            value={formData.about_label}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        {/* Heading */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            About Heading
          </label>

          <input
            type="text"
            name="about_heading"
            value={formData.about_heading}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            About Description
          </label>

          <textarea
            name="about_description"
            value={formData.about_description}
            onChange={handleChange}
            rows={5}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white resize-none focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
      </div>

      {/* FEATURES */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <h2 className="text-lg font-semibold text-white">
          💡 Feature Cards
        </h2>

        {/* Feature 1 */}
        <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
          <h3 className="text-white font-semibold">
            Feature 1
          </h3>

          <input
            type="text"
            name="feature_1_title"
            value={formData.feature_1_title}
            onChange={handleChange}
            placeholder="Feature title"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
            required
          />

          <textarea
            name="feature_1_description"
            value={formData.feature_1_description}
            onChange={handleChange}
            rows={3}
            placeholder="Feature description"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white resize-none focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        {/* Feature 2 */}
        <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
          <h3 className="text-white font-semibold">
            Feature 2
          </h3>

          <input
            type="text"
            name="feature_2_title"
            value={formData.feature_2_title}
            onChange={handleChange}
            placeholder="Feature title"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
            required
          />

          <textarea
            name="feature_2_description"
            value={formData.feature_2_description}
            onChange={handleChange}
            rows={3}
            placeholder="Feature description"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white resize-none focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        {/* Feature 3 */}
        <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
          <h3 className="text-white font-semibold">
            Feature 3
          </h3>

          <input
            type="text"
            name="feature_3_title"
            value={formData.feature_3_title}
            onChange={handleChange}
            placeholder="Feature title"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
            required
          />

          <textarea
            name="feature_3_description"
            value={formData.feature_3_description}
            onChange={handleChange}
            rows={3}
            placeholder="Feature description"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white resize-none focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
      </div>

      {/* STATISTICS */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <h2 className="text-lg font-semibold text-white">
          📊 Statistics
        </h2>

        {/* Stat 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Stat 1 Number
            </label>

            <input
              type="text"
              name="stat_1_number"
              value={formData.stat_1_number}
              onChange={handleChange}
              placeholder="10+"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Stat 1 Label
            </label>

            <input
              type="text"
              name="stat_1_label"
              value={formData.stat_1_label}
              onChange={handleChange}
              placeholder="Projects Completed"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
        </div>

        {/* Stat 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Stat 2 Number
            </label>

            <input
              type="text"
              name="stat_2_number"
              value={formData.stat_2_number}
              onChange={handleChange}
              placeholder="2+"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Stat 2 Label
            </label>

            <input
              type="text"
              name="stat_2_label"
              value={formData.stat_2_label}
              onChange={handleChange}
              placeholder="Years Learning"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
        </div>

        {/* Stat 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Stat 3 Number
            </label>

            <input
              type="text"
              name="stat_3_number"
              value={formData.stat_3_number}
              onChange={handleChange}
              placeholder="100%"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Stat 3 Label
            </label>

            <input
              type="text"
              name="stat_3_label"
              value={formData.stat_3_label}
              onChange={handleChange}
              placeholder="Passion & Dedication"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
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

export default AboutForm;