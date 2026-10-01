import { supabase } from "@/lib/supabase";
import type { Wish } from "@/types/wish";

function mapWishFromDb(row: Record<string, unknown>): Wish {
  const { edit_date, ...rest } = row;
  return { ...rest, editDate: edit_date } as Wish;
}

export async function getWishes(sortQuery?: "asc" | "desc") {
  let query = supabase.from("wishes").select("*");

  if (sortQuery) {
    query = query.order("completed", { ascending: sortQuery === "asc" });
  }

  const { data, error } = await query;

  return {
    data: data ? data.map(mapWishFromDb) : null,
    error,
  };
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

  return {
    data: data ? mapWishFromDb(data) : null,
    error,
  };
}

export async function getWishById(id: string) {
  const { data, error } = await supabase.from("wishes").select("*").eq("id", id).single();
  return { data: data ? mapWishFromDb(data) : null, error };
}

export async function deleteWish(id: string) {
  const { error } = await supabase.from("wishes").delete().eq("id", id);
  return { error };
}

export async function updateWish(id: string, updates: Partial<Wish>) {
  const { editDate, ...rest } = updates;

  const { data, error } = await supabase
    .from("wishes")
    .update({ ...rest, ...(editDate ? { edit_date: editDate } : {}) })
    .eq("id", id)
    .select()
    .single();

  return { data: data ? mapWishFromDb(data) : null, error };
}
