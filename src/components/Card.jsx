import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { MdOutlineDeleteForever } from "react-icons/md";
import CardModal from "./CardModal";

export default function Card({ card, index, onDelete, onUpdate }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Draggable Card */}
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="
              bg-white rounded-lg p-3
              shadow-sm hover:shadow-md
              cursor-pointer
            "
          >
            {/* Labels */}
            {card.labels?.length > 0 && (
              <div className="flex gap-1 mb-1">
                {card.labels.map((color) => (
                  <span
                    key={color}
                    className="w-6 h-2 rounded"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            )}

            {/* Title + Delete */}
            <div className="flex justify-between items-start gap-2">
              <p
                className="text-sm font-medium leading-snug"
                onClick={() => setOpen(true)}
              >
                {card.title}
              </p>

              <button
                onClick={onDelete}
                className="text-red-500 hover:text-red-600"
                title="Delete card"
              >
                <MdOutlineDeleteForever className="w-5 h-5" />
              </button>
            </div>

            {/* Due Date */}
            {card.due_date && (
              <div className="mt-1 text-xs text-red-600">
                Due: {card.due_date}
              </div>
            )}
          </div>
        )}
      </Draggable>

      {/* Card Edit Modal */}
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
