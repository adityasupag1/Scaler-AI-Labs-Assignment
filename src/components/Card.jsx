export default function Card({ title }) {
  return (
    <div className="bg-white rounded-md p-2 shadow-sm hover:bg-slate-50 cursor-pointer">
      <p className="text-sm">{title}</p>
    </div>
  );
}
