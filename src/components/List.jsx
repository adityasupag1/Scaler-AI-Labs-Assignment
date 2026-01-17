import { useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import Card from "./Card";
import { updateListTitle } from "../services/listService";

import {
  createCard,
  deleteCard as deleteCardFromDB
} from "../services/cardService";
import { deleteList } from "../services/listService";

export default function List({ list, index, lists, setLists, onCardUpdate }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(list.title);

  // =========================
  // Save list title (UI only)
  // =========================
async function saveTitle() {
  // 1. Save to Supabase
  await updateListTitle(list.id, title);

  // 2. Update React state
  const updatedLists = lists.map((l) =>
    l.id === list.id ? { ...l, title } : l
  );

  setLists(updatedLists);
  setEditing(false);
}


  // =========================
  // ADD CARD (DB + UI)
  // =========================
  async function addCard() {
    const newCard = await createCard({
      title: "New Card",
      list_id: list.id,
      order_index: list.cards.length
    });

    const updatedLists = lists.map((l) =>
      l.id === list.id
        ? { ...l, cards: [...l.cards, newCard] }
        : l
    );

    setLists(updatedLists);
  }

  // =========================
  // DELETE CARD (DB + UI)
  // =========================
  async function handleDeleteCard(cardId) {
    // 1. Delete from Supabase
    await deleteCardFromDB(cardId);

    // 2. Update UI
    const updatedLists = lists.map((l) =>
      l.id === list.id
        ? {
            ...l,
            cards: l.cards.filter((c) => c.id !== cardId)
          }
        : l
    );

    setLists(updatedLists);
  }

  // =========================
  // DELETE LIST (DB + UI)
  // =========================
  async function handleDeleteList() {
    const confirmDelete = window.confirm(
      "Delete this list and all its cards?"
    );
    if (!confirmDelete) return;

    // 1. Delete from Supabase
    await deleteList(list.id);

    // 2. Update UI
    const updatedLists = lists.filter((l) => l.id !== list.id);
    setLists(updatedLists);
  }

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="bg-white/80 rounded-xl p-3 w-72 shadow-md"
        >
          {/* Header */}
          <div
            {...provided.dragHandleProps}
            className="flex justify-between items-center mb-3"
          >
            {editing ? (
              <input
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={saveTitle}
                onKeyDown={(e) =>
                  e.key === "Enter" && saveTitle()
                }
                className="font-semibold w-full bg-transparent outline-none border-b border-slate-300"
              />
            ) : (
              <h2
                onClick={() => setEditing(true)}
                className="font-semibold cursor-pointer hover:underline"
              >
                {list.title}
              </h2>
            )}

            <button
              onClick={handleDeleteList}
              className="text-slate-500 hover:text-red-600 ml-2"
              title="Delete list"
            >
              ✕
            </button>
          </div>

          {/* Cards */}
          <Droppable droppableId={list.id} type="CARD">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-2 min-h-[20px]"
              >
                {list.cards.map((card, i) => (
                  <Card
                    key={card.id}
                    card={card}
                    index={i}
                    onDelete={() =>
                      handleDeleteCard(card.id)
                    }
                    onUpdate={onCardUpdate}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Add Card */}
          <button
            onClick={addCard}
            className="mt-3 text-sm text-slate-600 hover:text-slate-900"
          >
            + Add Card
          </button>
        </div>
      )}
    </Draggable>
  );
}
