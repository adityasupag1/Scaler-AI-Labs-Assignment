import { supabase } from "../lib/supabase";

export async function fetchListsWithCards() {
  const { data, error } = await supabase
    .from("lists")
    .select(`
      id,
      title,
      order_index,
      board_id,
      cards (
        id,
        title,
        description,
        order_index,
        list_id
      )
    `)
    .order("order_index", { ascending: true })
    .order("order_index", { foreignTable: "cards", ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  // 🔥 NORMALIZE cards
  return data.map((list) => ({
    ...list,
    cards: list.cards ?? []   // <<< THIS FIXES DRAG
  }));
}

