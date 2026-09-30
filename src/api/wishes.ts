import { supabase } from "../lib/supabase";

export async function getWishes(sortQuery?: "asc" | "desc") {
  let query = supabase.from("wishes").select("*");

  if (sortQuery) {
    query = query.order("completed", { ascending: sortQuery === "asc" });
  }

  const { data, error } = await query;

  return { data, error };
}

export async function createWish(wishData: {
  wish: string;
  description?: string;
  img?: string;
  editDate: string;
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: new Error("Пользователь не авторизован") };
  }

  const { data, error } = await supabase
    .from("wishes")
    .insert({
      wish: wishData.wish,
      description: wishData.description,
      img: wishData.img,
      edit_date: wishData.editDate,
      user_id: user.id,
      completed: false,
    })
    .select()
    .single();

  return { data, error };
}
