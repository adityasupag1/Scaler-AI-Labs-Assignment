import Card from "./Card";
import AddButton from "./AddButton";

export default function List({ title }) {
  return (
    <div className="bg-slate-200 rounded-lg p-3 w-72 flex-shrink-0">
      <h2 className="font-semibold mb-3">{title}</h2>

      <div className="space-y-2 mb-3">
        <Card title="Sample Task 1" />
        <Card title="Sample Task 2" />
      </div>

      <AddButton label="Add Card" small />
    </div>
  );
}
