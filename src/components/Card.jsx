import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import CardModal from "./CardModal";

export default function Card({ card, index, onDelete, onUpdate }) {
  const [open, setOpen] = useState(false);

  async function handleDeleteCard(cardId) {
  // 1. Delete from database
  await deleteCard(cardId);

  // 2. Update UI state
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

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md"
          >
            <div className="flex justify-between items-center">
              <p
                className="text-sm font-medium cursor-pointer"
                onClick={() => setOpen(true)}
              >
                {card.title}
              </p>

              <button
                onClick={onDelete}
                className="text-xs text-slate-400 hover:text-red-600"
              >
                🗑
              </button>
            </div>
          </div>
        )}
      </Draggable>

      {open && (
        <CardModal
          card={card}
          onClose={() => setOpen(false)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
}
