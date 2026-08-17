import { supabase } from "../lib/supabase";

export const DEFAULT_ABOUT_SETTINGS = {
  about_label: "About Me",
  about_heading: "Turning Ideas into Digital Experiences",
  about_description:
    "At Shyam Studio, I specialize in crafting clean, scalable web applications and intelligent AI solutions. My goal is to build digital products that combine stunning aesthetics with seamless performance to help businesses grow.",

  feature_1_title: "Web Development",
  feature_1_description:
    "Crafting responsive, high-performance web applications using modern React and Vite frameworks.",

  feature_2_title: "AI Solutions",
  feature_2_description:
    "Integrating intelligent features and modern AI capabilities into web platforms for seamless automation.",

  feature_3_title: "UI/UX Design",
  feature_3_description:
    "Designing intuitive, high-converting interfaces with a focus on modern typography, motion, and accessibility.",

  stat_1_number: "10+",
  stat_1_label: "Projects Completed",

  stat_2_number: "2+",
  stat_2_label: "Years Learning",

  stat_3_number: "100%",
  stat_3_label: "Passion & Dedication",
};

// Get About settings
export async function getAboutSettings() {
  const { data, error } = await supabase
    .from("about_settings")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

// Save About settings
export async function updateAboutSettings(settings) {
  const payload = {
    about_label: settings.about_label,
    about_heading: settings.about_heading,
    about_description: settings.about_description,

    feature_1_title: settings.feature_1_title,
    feature_1_description: settings.feature_1_description,

    feature_2_title: settings.feature_2_title,
    feature_2_description: settings.feature_2_description,

    feature_3_title: settings.feature_3_title,
    feature_3_description: settings.feature_3_description,

    stat_1_number: settings.stat_1_number,
    stat_1_label: settings.stat_1_label,

    stat_2_number: settings.stat_2_number,
    stat_2_label: settings.stat_2_label,

    stat_3_number: settings.stat_3_number,
    stat_3_label: settings.stat_3_label,

    updated_at: new Date().toISOString(),
  };

  const { data: existing, error: fetchError } = await supabase
    .from("about_settings")
    .select("id")
    .limit(1)
    .maybeSingle();

  if (fetchError) {
    throw fetchError;
  }

  let result;

  if (existing?.id) {
    result = await supabase
      .from("about_settings")
      .update(payload)
      .eq("id", existing.id)
      .select()
      .single();
  } else {
    result = await supabase
      .from("about_settings")
      .insert([payload])
      .select()
      .single();
  }

  if (result.error) {
    throw result.error;
  }

  return result.data;
}