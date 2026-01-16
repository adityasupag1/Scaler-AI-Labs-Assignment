
import { useState } from "react";

const COLORS = ["green", "yellow", "red", "blue"];
const MEMBERS = [
  { id: 1, name: "Aditya" },
  { id: 2, name: "Alex" },
  { id: 3, name: "Sam" }
];

function CardModal({ card, onClose }) {
  const [labels, setLabels] = useState(card.labels || []);
  const [dueDate, setDueDate] = useState(card.dueDate || "");
  const [checklist, setChecklist] = useState(card.checklist || []);
  const [newItem, setNewItem] = useState("");
  const [members, setMembers] = useState(card.members || []);

  const toggleLabel = (color) => {
    setLabels(
      labels.includes(color)
        ? labels.filter(l => l !== color)
        : [...labels, color]
    );
  };

  const addItem = () => {
    if (!newItem.trim()) return;
    setChecklist([...checklist, { id: Date.now(), text: newItem, completed: false }]);
    setNewItem("");
  };

  const toggleItem = (id) => {
    setChecklist(
      checklist.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const toggleMember = (member) => {
    setMembers(
      members.find(m => m.id === member.id)
        ? members.filter(m => m.id !== member.id)
        : [...members, member]
    );
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          padding: 20,
          width: 520,
          borderRadius: 6
        }}
      >
        <h3>{card.title}</h3>

        <h4>Labels</h4>
        <div style={{ display: "flex", gap: 8 }}>
          {COLORS.map(color => (
            <div
              key={color}
              onClick={() => toggleLabel(color)}
              style={{
                width: 24,
                height: 24,
                background: color,
                opacity: labels.includes(color) ? 1 : 0.3,
                cursor: "pointer"
              }}
            />
          ))}
        </div>

        <h4>Due Date</h4>
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />

        <h4>Checklist</h4>
        <input value={newItem} onChange={e => setNewItem(e.target.value)} />
        <button onClick={addItem}>Add</button>

        {checklist.map(item => (
          <div key={item.id}>
            <input type="checkbox" checked={item.completed} onChange={() => toggleItem(item.id)} />
            {item.text}
          </div>
        ))}

        <h4>Members</h4>
        <div style={{ display: "flex", gap: 8 }}>
          {MEMBERS.map(member => (
            <div
              key={member.id}
              onClick={() => toggleMember(member)}
              style={{
                padding: "4px 8px",
                borderRadius: 4,
                background: members.find(m => m.id === member.id) ? "#4f46e5" : "#e5e7eb",
                color: members.find(m => m.id === member.id) ? "#fff" : "#000",
                cursor: "pointer"
              }}
            >
              {member.name}
            </div>
          ))}
        </div>

        <button style={{ marginTop: 16 }} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default CardModal;
