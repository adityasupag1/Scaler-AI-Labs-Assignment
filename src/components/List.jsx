import { Draggable, Droppable } from "@hello-pangea/dnd";
import Card from "./Card";
import AddButton from "./AddButton";

export default function List({ list, index }) {
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="bg-slate-200 rounded-lg p-3 w-72 flex-shrink-0"
        >
          <h2
            {...provided.dragHandleProps}
            className="font-semibold mb-3 cursor-grab"
          >
            {list.title}
          </h2>

          <Droppable droppableId={list.id} type="CARD">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-2 min-h-[20px]"
              >
                {list.cards.map((card, index) => (
                  <Card
                    key={card.id}
                    card={card}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <AddButton label="Add Card" small />
        </div>
      )}
    </Draggable>
  );
}
