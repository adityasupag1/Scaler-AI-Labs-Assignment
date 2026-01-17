import { supabase } from "../lib/supabase";

// ✅ NAMED EXPORT
export async function updateCard(cardId, updates) {
  const { error } = await supabase
    .from("cards")
    .update(updates)
    .eq("id", cardId);

  if (error) {
    console.error("Update card error:", error);
    throw error;
  }
}

export async function updateCardOrder(cardId, list_id, order_index) {
  const { error } = await supabase
    .from("cards")
    .update({ list_id, order_index })
    .eq("id", cardId);

  if (error) {
    console.error("Update card order error:", error);
    throw error;
  }
}



export async function deleteCard(cardId) {
  const { error } = await supabase
    .from("cards")
    .delete()
    .eq("id", cardId);

  if (error) {
    console.error("Delete card error:", error);
    throw error;
  }
}

export async function createCard({ title, list_id, order_index }) {
  const { data, error } = await supabase
    .from("cards")
    .insert({
      title,
      list_id,
      order_index
    })
    .select()
    .single();

  if (error) {
    console.error("Create card error:", error);
    throw error;
  }

  return data;
}