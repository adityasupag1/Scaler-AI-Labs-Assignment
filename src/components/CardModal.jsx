import { useState } from "react";
import { updateCard } from "../services/cardService";

export default function CardModal({ card, onClose, onUpdate }) {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || "");

  async function handleSave() {
    await updateCard(card.id, {
      title,
      description
    });

    onUpdate({
      ...card,
      title,
      description
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl w-full max-w-lg mx-4 shadow-2xl p-5 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-semibold w-full outline-none border-b border-transparent focus:border-slate-300"
          />

          <button
            onClick={onClose}
            className="ml-3 text-slate-500 hover:text-slate-800 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Description */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-1">Description</h3>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[100px] border border-slate-200 rounded-md p-2 text-sm"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm hover:bg-slate-200"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-slate-800 text-white text-sm hover:bg-slate-900"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
