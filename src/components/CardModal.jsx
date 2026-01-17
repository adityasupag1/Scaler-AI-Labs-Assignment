import { useState } from "react";

export default function CardModal({ card, onClose }) {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || "");

  function handleSave() {
    // Later: update Supabase here
    console.log("Updated Card:", {
      title,
      description
    });

    onClose(); // close modal after save
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="
        relative bg-white rounded-xl
        w-full max-w-lg mx-4
        shadow-2xl p-5
        animate-fadeIn
      ">
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
            className="
              ml-3 text-slate-500
              hover:text-slate-800
              text-xl
            "
            aria-label="Close modal"
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

        {/* Extra Info (UI Only) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {/* Labels */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Labels</h3>
            <div className="flex gap-2">
              <span className="w-6 h-6 rounded bg-red-400" />
              <span className="w-6 h-6 rounded bg-green-400" />
              <span className="w-6 h-6 rounded bg-blue-400" />
              <button className="text-sm text-slate-500">+</button>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Due Date</h3>
            <input
              type="date"
              className="
                border border-slate-200 rounded-md
                px-2 py-1 text-sm
              "
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              px-4 py-2 rounded-md
              text-sm text-slate-700
              hover:bg-slate-200
              transition
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
              transition
            "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
