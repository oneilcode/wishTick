import { supabase } from "@/lib/supabase";

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { error, alreadyExists: false };
  }

  if (data?.user?.identities?.length === 0) {
    return {
      error: { message: "Этот email уже зарегистрирован" },
      alreadyExists: true,
    };
  }

  return { error: null, alreadyExists: false };
}

export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  return error;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  return error;
}
