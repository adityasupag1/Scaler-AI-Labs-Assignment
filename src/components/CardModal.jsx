import { useState } from "react";
import { updateCard } from "../services/cardService";

const LABEL_COLORS = [
  "red",
  "green",
  "blue",
  "yellow",
  "purple",
  "orange"
];

export default function CardModal({ card, onClose, onUpdate }) {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || "");
  const [dueDate, setDueDate] = useState(card.due_date || "");
  const [labels, setLabels] = useState(card.labels || []);

  // =========================
  // Toggle label on/off
  // =========================
  function toggleLabel(color) {
    setLabels((prev) =>
      prev.includes(color)
        ? prev.filter((c) => c !== color)
        : [...prev, color]
    );
  }

  // =========================
  // Save card (DB + UI)
  // =========================
  async function handleSave() {
    await updateCard(card.id, {
      title,
      description,
      due_date: dueDate || null,
      labels
    });

    onUpdate({
      ...card,
      title,
      description,
      due_date: dueDate || null,
      labels
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
      <div className="relative bg-white rounded-xl w-full max-w-lg mx-4 shadow-2xl p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="
              text-lg font-semibold w-full
              outline-none border-b border-transparent
              focus:border-slate-300
            "
          />

          <button
            onClick={onClose}
            className="ml-3 text-slate-500 hover:text-slate-800 text-xl"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Description */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-1">
            Description
          </h3>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a more detailed description..."
            className="
              w-full min-h-[100px]
              border border-slate-200 rounded-md
              p-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-slate-300
            "
          />
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-1">
            Due Date
          </h3>
          <input
            type="date"
            value={dueDate || ""}
            onChange={(e) => setDueDate(e.target.value)}
            className="
              border border-slate-200 rounded-md
              px-2 py-1 text-sm
            "
          />
        </div>

        {/* Labels */}
        <div className="mb-5">
          <h3 className="text-sm font-semibold mb-2">
            Labels
          </h3>
          <div className="flex gap-2 flex-wrap">
            {LABEL_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => toggleLabel(color)}
                className={`
                  w-7 h-7 rounded
                  ${labels.includes(color)
                    ? "ring-2 ring-black"
                    : ""}
                `}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              px-4 py-2 rounded-md
              text-sm text-slate-700
              hover:bg-slate-200
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="
              px-4 py-2 rounded-md
              bg-slate-800 text-white
              text-sm font-medium
              hover:bg-slate-900
            "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
