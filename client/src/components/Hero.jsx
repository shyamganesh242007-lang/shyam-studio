import { useState, useEffect } from "react";
import heroFallbackImage from "../assets/hero.png";
import {
  getHeroSettings,
  DEFAULT_HERO_SETTINGS,
} from "../services/siteSettingsService";

function Hero() {
  const [heroSettings, setHeroSettings] = useState(null);
  const [heroImage, setHeroImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHero() {
      try {
        const data = await getHeroSettings();

        const settings = data || DEFAULT_HERO_SETTINGS;

        setHeroSettings(settings);

        const imageUrl = settings.hero_image;

        if (imageUrl) {
          const image = new Image();

          image.onload = () => {
            setHeroImage(imageUrl);
            setLoading(false);
          };

          image.onerror = () => {
            setHeroImage(heroFallbackImage);
            setLoading(false);
          };

          image.src = imageUrl;
        } else {
          setHeroImage(heroFallbackImage);
          setLoading(false);
        }
      } catch (err) {
        console.warn(
          "Could not load dynamic hero settings, using default:",
          err
        );

        setHeroSettings(DEFAULT_HERO_SETTINGS);
        setHeroImage(heroFallbackImage);
        setLoading(false);
      }
    }

    loadHero();
  }, []);

  if (loading || !heroSettings || !heroImage) {
    return (
      <section
        id="home"
        className="relative min-h-[85vh] flex items-center justify-center bg-slate-950 text-white overflow-hidden py-16 px-6"
      >
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <div className="h-16 w-3/4 bg-slate-900 rounded-lg animate-pulse mx-auto lg:mx-0" />

            <div className="h-6 w-full max-w-xl bg-slate-900 rounded animate-pulse mx-auto lg:mx-0" />

            <div className="flex gap-4 justify-center lg:justify-start">
              <div className="h-12 w-32 bg-slate-900 rounded-xl animate-pulse" />
              <div className="h-12 w-28 bg-slate-900 rounded-xl animate-pulse" />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-md aspect-square rounded-3xl bg-slate-900 animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  const heading =
    heroSettings.hero_heading ||
    DEFAULT_HERO_SETTINGS.hero_heading;

  const description =
    heroSettings.hero_description ||
    DEFAULT_HERO_SETTINGS.hero_description;

  const primaryText =
    heroSettings.hero_primary_button_text ||
    DEFAULT_HERO_SETTINGS.hero_primary_button_text;

  const primaryLink =
    heroSettings.hero_primary_button_link ||
    DEFAULT_HERO_SETTINGS.hero_primary_button_link;

  const secondaryText =
    heroSettings.hero_secondary_button_text ||
    DEFAULT_HERO_SETTINGS.hero_secondary_button_text;

  const secondaryLink =
    heroSettings.hero_secondary_button_link ||
    DEFAULT_HERO_SETTINGS.hero_secondary_button_link;

  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex items-center justify-center bg-slate-950 text-white overflow-hidden py-16 px-6"
    >
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Hero Text Content */}
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            {heading}
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
            <a
              href={primaryLink}
              className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-150 transform hover:-translate-y-0.5"
            >
              {primaryText}
            </a>

            <a
              href={secondaryLink}
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-medium rounded-xl transition-all duration-150 transform hover:-translate-y-0.5"
            >
              {secondaryText}
            </a>
          </div>
        </div>

        {/* Hero Image Presentation */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden bg-slate-900 border border-slate-800/80 shadow-2xl shadow-indigo-950/40 group">
            <img
              src={heroImage}
              alt="Hero Showcase"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;