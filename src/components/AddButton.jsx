export default function AddButton({ label, small }) {
  return (
    <button
      className={`text-left w-full rounded-md px-2 py-1 
      hover:bg-slate-300 transition
      ${small ? "text-sm" : "text-base"}`}
    >
      + {label}
    </button>
  );
}
