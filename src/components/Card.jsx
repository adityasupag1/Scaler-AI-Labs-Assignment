// React hook to manage local component state
import { useState } from "react";

// Draggable component from drag-and-drop library
import { Draggable } from "@hello-pangea/dnd";

// Modal used to edit card details
import CardModal from "./CardModal";

// Delete icon from react-icons
import { MdOutlineDeleteForever } from "react-icons/md";

// Card component receives data and handlers as props
export default function Card({ card, index, onDelete, onUpdate }) {
  
  // State to control whether edit modal is open or closed
  const [open, setOpen] = useState(false);

  /*
    NOTE:
    handleDeleteCard is written here but NOT used.
    Also, deleteCard, lists, list, setLists are NOT defined in this component.
    
    Best practice:
    👉 Deletion logic should stay in parent (Board/List),
    👉 Card should only CALL onDelete().
  */

  async function handleDeleteCard(cardId) {
    // ❌ This function should NOT be here (kept only for reference)

    // 1. Delete card from database
    await deleteCard(cardId);

    // 2. Remove card from UI state
    const updatedLists = lists.map((l) =>
      l.id === list.id
        ? {
            ...l,
            cards: l.cards.filter((c) => c.id !== cardId)
          }
        : l
    );

    setLists(updatedLists);
  }

  return (
    <>
      {/* Draggable wrapper for drag-and-drop */}
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <div
            // Required ref for drag-and-drop to work
            ref={provided.innerRef}

            // Props required by DnD library
            {...provided.draggableProps}
            {...provided.dragHandleProps}

            // Card UI styling
            className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md"
          >
            <div className="flex justify-between items-center">
              
              {/* Card title - clicking opens edit modal */}
              <p
                className="text-sm font-medium cursor-pointer"
                onClick={() => setOpen(true)}
              >
                {card.title}
              </p>

              {/* Delete button */}
              <button
                // Calls delete handler passed from parent
                onClick={onDelete}
                className="text-xs text-red-500 hover:text-red-600 cursor-pointer"
              >
                {/* Delete icon */}
                <MdOutlineDeleteForever className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </Draggable>

      {/* Edit card modal */}
      {open && (
        <CardModal
          // Pass current card data to modal
          card={card}

          // Close modal handler
          onClose={() => setOpen(false)}

          // Update handler passed from parent
          onUpdate={onUpdate}
        />
      )}
    </>
  );
}
