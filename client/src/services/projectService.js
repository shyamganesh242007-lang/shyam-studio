import { supabase } from "../lib/supabase";

export async function addProject(project) {
  const { data, error } = await supabase
    .from("projects")
    .insert([project]);

  if (error) {
    throw error;
  }

  return data;
}

export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function getFeaturedProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteProject(id) {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}

export async function updateProject(id, project) {
  const { data, error } = await supabase
    .from("projects")
    .update(project)
    .eq("id", id);

  if (error) {
    throw error;
  }

  return data;
}

export async function uploadProjectImage(file) {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("project-images")
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("project-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function deleteProjectImage(imageUrl) {
  if (!imageUrl) return;

  const marker = "/project-images/";

  const index = imageUrl.indexOf(marker);

  if (index === -1) return;

  const filePath = decodeURIComponent(
    imageUrl.substring(index + marker.length)
  );

  const { error } = await supabase.storage
    .from("project-images")
    .remove([filePath]);

  if (error) {
    throw error;
  }
}