import { supabase } from "../lib/supabase";

export async function fetchListsWithCards() {
  const { data, error } = await supabase
    .from("lists")
    .select(`
      id,
      title,
      board_id,
      order_index,
      cards (
        id,
        title,
        description,
        due_date,
        labels,
        order_index,
        list_id
      )
    `)
    .order("order_index", { ascending: true })
    .order("order_index", {
      foreignTable: "cards",
      ascending: true
    });

  if (error) {
    console.error("Fetch board error:", error);
    throw error;
  }

  return data;
}
