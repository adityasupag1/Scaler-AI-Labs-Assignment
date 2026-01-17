import { useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import List from "./List";
import AddButton from "./AddButton";
import { reorder } from "../utils/dragUtils";

const initialLists = [
  {
    id: "list-1",
    title: "Todo",
    cards: [
      { id: "card-1", title: "Sample Task 1" },
      { id: "card-2", title: "Sample Task 2" }
    ]
  },
  {
    id: "list-2",
    title: "Doing",
    cards: [{ id: "card-3", title: "Work in progress" }]
  },
  {
    id: "list-3",
    title: "Done",
    cards: [{ id: "card-4", title: "Completed task" }]
  }
];

export default function Board() {
  const [lists, setLists] = useState(initialLists);

  function onDragEnd(result) {
    const { source, destination, type } = result;
    if (!destination) return;

    // LIST DRAG
    if (type === "LIST") {
      const reordered = reorder(lists, source.index, destination.index);
      setLists(reordered);
      return;
    }

    // CARD DRAG
    const sourceListIndex = lists.findIndex(
      (list) => list.id === source.droppableId
    );
    const destListIndex = lists.findIndex(
      (list) => list.id === destination.droppableId
    );

    const sourceList = lists[sourceListIndex];
    const destList = lists[destListIndex];

    const sourceCards = Array.from(sourceList.cards);
    const [movedCard] = sourceCards.splice(source.index, 1);

    if (sourceListIndex === destListIndex) {
      // Same list reorder
      sourceCards.splice(destination.index, 0, movedCard);
      const newLists = [...lists];
      newLists[sourceListIndex] = {
        ...sourceList,
        cards: sourceCards
      };
      setLists(newLists);
    } else {
      // Move card to another list
      const destCards = Array.from(destList.cards);
      destCards.splice(destination.index, 0, movedCard);

      const newLists = [...lists];
      newLists[sourceListIndex] = {
        ...sourceList,
        cards: sourceCards
      };
      newLists[destListIndex] = {
        ...destList,
        cards: destCards
      };
      setLists(newLists);
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="board"
        direction="horizontal"
        type="LIST"
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex gap-4 overflow-x-auto pb-4"
          >
            {lists.map((list, index) => (
              <List key={list.id} list={list} index={index} />
            ))}
            {provided.placeholder}
            <AddButton label="Add List" />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
