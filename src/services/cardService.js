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
