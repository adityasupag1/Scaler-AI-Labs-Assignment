
import { Droppable, Draggable } from "@hello-pangea/dnd";
import Card from "./Card";

export default function List({ list, onCardClick }) {
  return (
    <div style={{ background: "#eee", width: 260, padding: 10 }}>
      <h4>{list.title}</h4>
      <Droppable droppableId={list.id.toString()} type="CARD">
        {(p) => (
          <div ref={p.innerRef} {...p.droppableProps}>
            {list.cards.map((c, i) => (
              <Draggable draggableId={c.id.toString()} index={i} key={c.id}>
                {(p) => (
                  <div ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps}>
                    <Card card={c} onClick={onCardClick} />
                  </div>
                )}
              </Draggable>
            ))}
            {p.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
