import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import CardModal from "./CardModal";

export default function Card({ card, index, onDelete, onUpdate }) {
  const [open, setOpen] = useState(false);

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
