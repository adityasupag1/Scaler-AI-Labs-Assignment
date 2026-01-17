import { supabase } from "../lib/supabase";

/**
 * Create a new list
 */
export async function createList({ title, board_id, order_index }) {
  const { data, error } = await supabase
    .from("lists")
    .insert({
      title,
      board_id,
      order_index
    })
    .select()
    .single();

  if (error) {
    console.error("Create list error:", error);
    throw error;
  }

  return data;
}

/**
 * Rename / update list title
 */
export async function updateListTitle(listId, title) {
  const { error } = await supabase
    .from("lists")
    .update({ title })
    .eq("id", listId);

  if (error) {
    console.error("Update list title error:", error);
    throw error;
  }
}

/**
 * Delete a list
 */
export async function deleteList(listId) {
  const { error } = await supabase
    .from("lists")
    .delete()
    .eq("id", listId);

  if (error) {
    console.error("Delete list error:", error);
    throw error;
  }
}

/**
 * Update list order (drag & drop)
 */
export async function updateListOrder(listId, order_index) {
  const { error } = await supabase
    .from("lists")
    .update({ order_index })
    .eq("id", listId);

  if (error) {
    console.error("Update list order error:", error);
    throw error;
  }
}

