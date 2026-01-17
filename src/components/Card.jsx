import { Draggable } from "@hello-pangea/dnd";

export default function Card({ card, index }) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-md p-2 shadow-sm hover:bg-slate-50 cursor-pointer"
        >
          <p className="text-sm">{card.title}</p>
        </div>
      )}
    </Draggable>
  );
}
