import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import CardModal from "./CardModal";

export default function Card({ card, index }) {
  const [open, setOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onMouseDown={() => setIsDragging(false)}
            onMouseMove={() => setIsDragging(true)}
            onMouseUp={() => {
              if (!isDragging) setOpen(true);
            }}
            className={`
              bg-white rounded-lg p-3
              border border-slate-200
              cursor-pointer
              transition-all duration-200
              ${snapshot.isDragging ? "shadow-lg rotate-1" : "shadow-sm hover:shadow-md"}
            `}
          >
            <p className="text-sm font-medium">{card.title}</p>
          </div>
        )}
      </Draggable>

      {open && (
        <CardModal card={card} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
