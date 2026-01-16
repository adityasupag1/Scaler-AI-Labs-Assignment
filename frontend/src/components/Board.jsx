
import { Droppable, Draggable } from "@hello-pangea/dnd";
import List from "./List";

export default function Board({ lists, onCardClick }) {
  return (
    <Droppable droppableId="board" direction="horizontal" type="LIST">
      {(p) => (
        <div ref={p.innerRef} {...p.droppableProps} style={{ display: "flex", gap: 16 }}>
          {lists.map((l, i) => (
            <Draggable draggableId={l.id.toString()} index={i} key={l.id}>
              {(p) => (
                <div ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps}>
                  <List list={l} onCardClick={onCardClick} />
                </div>
              )}
            </Draggable>
          ))}
          {p.placeholder}
        </div>
      )}
    </Droppable>
  );
}
