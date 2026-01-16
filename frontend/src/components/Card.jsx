
export default function Card({ card, onClick }) {
  return (
    <div onClick={() => onClick(card)} style={{ background: "#fff", padding: 8, marginBottom: 6 }}>
      {card.title}
    </div>
  );
}
