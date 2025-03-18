"use server";

import { createServerSupabaseClient } from "utils/supabase/server";

function handleError(error) {
  if (error) {
    console.log(">> handleError ", error);
    throw error;
  }
}

export async function uploadeFile(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const file = formData.get("file") as File;
  const saveFileName = Date.now() + "-" + file.lastModified.toString();
  // console.log(">> saveFileName", saveFileName);
  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET as string)
    .upload(saveFileName, file, { upsert: false });

  handleError(error);
  // console.log("uploadeFile : ", data);
  return data;
}

export async function searchFiles(search: string = "") {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET as string)
    .list("", { search });

  handleError(error);
  return data;
}

export async function deleteFile(fileName: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET as string)
    .remove([fileName]);

  handleError(error);

  return data;
}
