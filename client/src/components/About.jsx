import { useEffect, useState } from "react";
import {
  getAboutSettings,
  DEFAULT_ABOUT_SETTINGS,
} from "../services/aboutSettingsService";

const About = () => {
  const [aboutSettings, setAboutSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAbout() {
      try {
        const data = await getAboutSettings();

        setAboutSettings({
          ...DEFAULT_ABOUT_SETTINGS,
          ...(data || {}),
        });
      } catch (error) {
        console.warn(
          "Could not load dynamic About settings, using defaults:",
          error
        );

        setAboutSettings(DEFAULT_ABOUT_SETTINGS);
      } finally {
        setLoading(false);
      }
    }

    loadAbout();
  }, []);

  if (loading || !aboutSettings) {
    return (
      <section className="py-20 lg:py-28 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="h-6 w-24 bg-slate-900 rounded-full animate-pulse" />

                <div className="h-12 w-3/4 bg-slate-900 rounded-lg animate-pulse" />

                <div className="space-y-2">
                  <div className="h-4 w-full bg-slate-900 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-slate-900 rounded animate-pulse" />
                  <div className="h-4 w-4/6 bg-slate-900 rounded animate-pulse" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="h-24 w-full bg-slate-900 rounded-2xl animate-pulse" />
                <div className="h-24 w-full bg-slate-900 rounded-2xl animate-pulse" />
                <div className="h-24 w-full bg-slate-900 rounded-2xl animate-pulse" />
              </div>
            </div>

            <div>
              <div className="h-[500px] w-full bg-slate-900 rounded-3xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  const features = [
    {
      title: aboutSettings.feature_1_title,
      description: aboutSettings.feature_1_description,
      icon: (
        <svg
          className="w-6 h-6 text-indigo-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
    },
    {
      title: aboutSettings.feature_2_title,
      description: aboutSettings.feature_2_description,
      icon: (
        <svg
          className="w-6 h-6 text-cyan-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: aboutSettings.feature_3_title,
      description: aboutSettings.feature_3_description,
      icon: (
        <svg
          className="w-6 h-6 text-teal-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      ),
    },
  ];

  const stats = [
    {
      number: aboutSettings.stat_1_number,
      label: aboutSettings.stat_1_label,
      gradient: "from-indigo-400 to-cyan-400",
    },
    {
      number: aboutSettings.stat_2_number,
      label: aboutSettings.stat_2_label,
      gradient: "from-cyan-400 to-teal-300",
    },
    {
      number: aboutSettings.stat_3_number,
      label: aboutSettings.stat_3_label,
      gradient: "from-indigo-400 to-teal-300",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 lg:py-28 bg-slate-950 text-white relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column */}
          <div className="space-y-8">
            <div className="space-y-4">

              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                {aboutSettings.about_label}
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                {aboutSettings.about_heading}
              </h2>

              <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                {aboutSettings.about_description}
              </p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-4 pt-2">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-colors duration-200 flex items-start space-x-4 group"
                >
                  <div className="p-3 rounded-xl bg-slate-800/80 group-hover:bg-slate-800 transition-colors flex-shrink-0">
                    {feature.icon}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="relative">
            <div className="relative z-10 space-y-6">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl space-y-8 relative overflow-hidden">

                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-teal-300" />

                <div className="border-b border-slate-800/80 pb-4">
                  <h3 className="text-xl font-bold text-white">
                    Track Record & Metrics
                  </h3>

                  <p className="text-xs text-slate-400 mt-1">
                    Key highlights of my ongoing journey
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/60 flex flex-col justify-center items-start relative group hover:border-slate-700 transition-colors"
                    >
                      <span
                        className={`text-4xl sm:text-5xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                      >
                        {stat.number}
                      </span>

                      <span className="text-sm font-semibold text-slate-300 mt-2">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;