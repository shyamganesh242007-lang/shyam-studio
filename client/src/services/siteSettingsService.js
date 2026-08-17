import { supabase } from "../lib/supabase";

export const DEFAULT_HERO_SETTINGS = {
  hero_image: "",
  hero_heading: "Build. Deploy. Grow.",
  hero_description: "I build modern web applications and AI solutions.",
  hero_primary_button_text: "View Projects",
  hero_primary_button_link: "#projects",
  hero_secondary_button_text: "Hire Me",
  hero_secondary_button_link: "#contact",
};

// Get Hero settings
export async function getHeroSettings() {
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

// Save Hero settings
export async function updateHeroSettings(settings) {
  const {
    hero_image,
    hero_heading,
    hero_description,
    hero_primary_button_text,
    hero_primary_button_link,
    hero_secondary_button_text,
    hero_secondary_button_link,
  } = settings;

  const { data: existing, error: fetchError } = await supabase
    .from("site_settings")
    .select("id")
    .limit(1)
    .maybeSingle();

  if (fetchError) {
    throw fetchError;
  }

  const payload = {
    hero_image,
    hero_heading,
    hero_description,
    hero_primary_button_text,
    hero_primary_button_link,
    hero_secondary_button_text,
    hero_secondary_button_link,
    updated_at: new Date().toISOString(),
  };

  let result;

  if (existing?.id) {
    result = await supabase
      .from("site_settings")
      .update(payload)
      .eq("id", existing.id)
      .select()
      .single();
  } else {
    result = await supabase
      .from("site_settings")
      .insert([payload])
      .select()
      .single();
  }

  if (result.error) {
    throw result.error;
  }

  return result.data;
}