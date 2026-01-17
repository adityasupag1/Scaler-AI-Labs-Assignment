import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import List from "./List";

import { fetchListsWithCards } from "../services/boardService";
import { createList, updateListOrder } from "../services/listService";
import { updateCardOrder } from "../services/cardService";

export default function Board() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const BOARD_ID = "1689f918-3823-4e87-8522-4bed14dc8c27"; // Supabase board id

  // =========================
  // Update card in UI after modal save
  // =========================
  function updateCardInBoard(updatedCard) {
    setLists((prevLists) =>
      prevLists.map((list) => ({
        ...list,
        cards: list.cards.map((card) =>
          card.id === updatedCard.id ? updatedCard : card
        )
      }))
    );
  }

  // =========================
  // Add new list (DB + UI)
  // =========================
  async function addList() {
    const newList = await createList({
      title: "New List",
      board_id: BOARD_ID,
      order_index: lists.length
    });

    setLists((prev) => [...prev, { ...newList, cards: [] }]);
  }

  // =========================
  // Load board from Supabase
  // =========================
  useEffect(() => {
    async function loadData() {
      const data = await fetchListsWithCards();
      setLists(data);
      setLoading(false);
    }

    loadData();
  }, []);

  if (loading) {
    return <p className="text-slate-600">Loading board...</p>;
  }

  // =========================
  // SEARCH (DERIVED STATE)
  // =========================
  const filteredLists =
  search.trim() === ""
    ? lists
    : lists
        .map((list) => ({
          ...list,
          cards: list.cards.filter((card) =>
            card.title
              .toLowerCase()
              .includes(search.toLowerCase())
          )
        }))
        .filter((list) => list.cards.length > 0);


  // =========================
  // DRAG & DROP
  // =========================
  async function onDragEnd(result) {
    const { source, destination, type } = result;
    if (!destination) return;

    // ---------- LIST DRAG ----------
    if (type === "LIST") {
      const reordered = Array.from(lists);
      const [moved] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, moved);

      setLists(reordered);

      await Promise.all(
        reordered.map((list, index) =>
          updateListOrder(list.id, index)
        )
      );
      return;
    }

    // ---------- CARD DRAG ----------
    const sourceListIndex = lists.findIndex(
      (l) => l.id === source.droppableId
    );
    const destListIndex = lists.findIndex(
      (l) => l.id === destination.droppableId
    );

    const sourceList = lists[sourceListIndex];
    const destList = lists[destListIndex];

    const sourceCards = [...sourceList.cards];
    const [movedCard] = sourceCards.splice(source.index, 1);

    // Same list reorder
    if (sourceListIndex === destListIndex) {
      sourceCards.splice(destination.index, 0, movedCard);

      const updatedLists = [...lists];
      updatedLists[sourceListIndex] = {
        ...sourceList,
        cards: sourceCards
      };

      setLists(updatedLists);

      await Promise.all(
        sourceCards.map((card, index) =>
          updateCardOrder(card.id, sourceList.id, index)
        )
      );
    }
    // Move to another list
    else {
      const destCards = [...destList.cards];
      destCards.splice(destination.index, 0, movedCard);

      const updatedLists = [...lists];
      updatedLists[sourceListIndex] = {
        ...sourceList,
        cards: sourceCards
      };
      updatedLists[destListIndex] = {
        ...destList,
        cards: destCards
      };

      setLists(updatedLists);

      await Promise.all([
        ...sourceCards.map((card, index) =>
          updateCardOrder(card.id, sourceList.id, index)
        ),
        ...destCards.map((card, index) =>
          updateCardOrder(card.id, destList.id, index)
        )
      ]);
    }
  }

  // =========================
  // RENDER
  // =========================
  return (
    <div>
      {/* Search Bar */}
     <div className="mb-6 flex justify-center">
  <input
    type="text"
    placeholder="Search cards..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="
      w-full max-w-md
      px-4 py-2
      border rounded-lg
      outline-none
      focus:ring-2 focus:ring-slate-300
    "
  />
</div>


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
              className="flex gap-4 overflow-x-auto pb-6 flex-wrap justify-center"
            >
              {filteredLists.map((list, index) => (
                <List
                  key={list.id}
                  list={list}
                  index={index}
                  lists={lists}
                  setLists={setLists}
                  onCardUpdate={updateCardInBoard}
                />
              ))}

              {provided.placeholder}

              {/* Add List Button */}
              <button
                onClick={addList}
                className="
                  w-72 min-h-[40px]
                  rounded-xl bg-white/70
                  hover:bg-white
                  text-left px-4 py-3
                  font-medium text-slate-700
                  shadow-sm
                "
              >
                + Add another list
              </button>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
