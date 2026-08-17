import { supabase } from "../lib/supabase";

export const DEFAULT_CONTACT_SETTINGS = {
  contact_label: "Get In Touch",
  contact_heading: "Let's Build Something Amazing",
  contact_description:
    "Have a project idea? Get in touch and let's discuss it.",

  contact_info_description:
    "Whether you have a specific requirement, need technical guidance, or want to collaborate on a custom web app or AI solution, feel free to reach out anytime.",

  email: "shyameee242007@gmail.com",
  phone: "+91 91504 47533",
  location: "India (Remote Worldwide)",

  github_url: "https://github.com/shyamganesh242007-lang",
  linkedin_url:
    "https://www.linkedin.com/in/shyamganesh-s-8a804341a",
  instagram_url:
    "https://www.instagram.com/unheardvibez/",
};

// Get Contact settings
export async function getContactSettings() {
  const { data, error } = await supabase
    .from("contact_settings")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

// Save Contact settings
export async function updateContactSettings(settings) {
  const payload = {
    contact_label: settings.contact_label,
    contact_heading: settings.contact_heading,
    contact_description: settings.contact_description,

    contact_info_description:
      settings.contact_info_description,

    email: settings.email,
    phone: settings.phone,
    location: settings.location,

    github_url: settings.github_url,
    linkedin_url: settings.linkedin_url,
    instagram_url: settings.instagram_url,

    updated_at: new Date().toISOString(),
  };

  const { data: existing, error: fetchError } = await supabase
    .from("contact_settings")
    .select("id")
    .limit(1)
    .maybeSingle();

  if (fetchError) {
    throw fetchError;
  }

  let result;

  if (existing?.id) {
    result = await supabase
      .from("contact_settings")
      .update(payload)
      .eq("id", existing.id)
      .select()
      .single();
  } else {
    result = await supabase
      .from("contact_settings")
      .insert([payload])
      .select()
      .single();
  }

  if (result.error) {
    throw result.error;
  }

  return result.data;
}