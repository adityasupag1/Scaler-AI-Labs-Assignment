import { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Board from "../components/Board";
import CardModal from "../components/CardModal";
import { getBoard } from "../services/api";

export default function Home() {
  const [lists, setLists] = useState([]);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    getBoard().then(data => {
      if (!data || !data.lists) return;

      const grouped = data.lists.map(l => ({
        ...l,
        cards: data.cards.filter(c => c.list_id === l.id)
      }));

      setLists(grouped);
    });
  }, []);

  // ✅ DEFINE FUNCTION HERE (NOT INSIDE JSX)
  const onDragEnd = (result) => {
    const { source, destination, type } = result;
    if (!destination) return;

    // LIST drag
    if (type === "LIST") {
      const items = Array.from(lists);
      const [moved] = items.splice(source.index, 1);
      items.splice(destination.index, 0, moved);
      setLists(items);
      return;
    }

    // CARD drag
    fetch("http://localhost:5000/cards/move", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    cardId: movedCard.id,
    toListId: destList.id,
    newPosition: destination.index + 1
  })
});

    const sourceList = lists.find(
      l => l.id.toString() === source.droppableId
    );
    const destList = lists.find(
      l => l.id.toString() === destination.droppableId
    );

    const sourceCards = Array.from(sourceList.cards);
    const [movedCard] = sourceCards.splice(source.index, 1);

    if (sourceList === destList) {
      sourceCards.splice(destination.index, 0, movedCard);
      sourceList.cards = sourceCards;
    } else {
      const destCards = Array.from(destList.cards);
      destCards.splice(destination.index, 0, movedCard);
      sourceList.cards = sourceCards;
      destList.cards = destCards;
    }

    setLists([...lists]);
  };

  // ✅ JSX ONLY USES THE FUNCTION
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Board lists={lists} onCardClick={setActiveCard} />
      {activeCard && (
        <CardModal
          card={activeCard}
          onClose={() => setActiveCard(null)}
        />
      )}
    </DragDropContext>
  );
}
