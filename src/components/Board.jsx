import List from "./List";
import AddButton from "./AddButton";

export default function Board() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      <List title="Todo" />
      <List title="Doing" />
      <List title="Done" />
      <AddButton label="Add List" />
    </div>
  );
}
