import { supabase } from "@/lib/supabase";

export async function signUp(email: string, password: string) {
  const { error } = await supabase.auth.signUp({ email, password });

  return error;
}

export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  return error;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  return error;
}
