import { useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import List from "./List";
import AddButton from "./AddButton";
import { reorder } from "../utils/dragUtils";

export default function Board() {
  const [lists, setLists] = useState([
    {
      id: "list-1",
      title: "Todo",
      cards: []
    },
    {
      id: "list-2",
      title: "Doing",
      cards: []
    }
  ]);

  function addList() {
    const newList = {
      id: `list-${Date.now()}`,
      title: "New List",
      cards: []
    };
    setLists([...lists, newList]);
  }

  function deleteList(listId) {
    setLists(lists.filter((l) => l.id !== listId));
  }

  function onDragEnd(result) {
    const { source, destination, type } = result;
    if (!destination) return;

    if (type === "LIST") {
      setLists(reorder(lists, source.index, destination.index));
      return;
    }

    const sourceIndex = lists.findIndex(l => l.id === source.droppableId);
    const destIndex = lists.findIndex(l => l.id === destination.droppableId);

    const sourceList = lists[sourceIndex];
    const destList = lists[destIndex];

    const sourceCards = Array.from(sourceList.cards);
    const [moved] = sourceCards.splice(source.index, 1);

    if (sourceIndex === destIndex) {
      sourceCards.splice(destination.index, 0, moved);
      const updated = [...lists];
      updated[sourceIndex] = { ...sourceList, cards: sourceCards };
      setLists(updated);
    } else {
      const destCards = Array.from(destList.cards);
      destCards.splice(destination.index, 0, moved);

      const updated = [...lists];
      updated[sourceIndex] = { ...sourceList, cards: sourceCards };
      updated[destIndex] = { ...destList, cards: destCards };
      setLists(updated);
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="LIST">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex gap-4 overflow-x-auto pb-6"
          >
            {lists.map((list, index) => (
              <List
                key={list.id}
                list={list}
                index={index}
                onDelete={deleteList}
                setLists={setLists}
                lists={lists}
              />
            ))}
            {provided.placeholder}

            <button
              onClick={addList}
              className="w-72 h-fit rounded-xl bg-white/60 hover:bg-white p-3 text-left"
            >
              + Add List
            </button>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
