import { useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import Card from "./Card";

export default function List({ list, index, lists, setLists, onCardUpdate }) {
	const [editing, setEditing] = useState(false);
	const [title, setTitle] = useState(list.title);

	function saveTitle() {
		const updated = lists.map((l) =>
			l.id === list.id ? { ...l, title } : l,
		);
		setLists(updated);
		setEditing(false);
	}

	function addCard() {
		const newCard = {
			id: `card-${Date.now()}`,
			title: "New Card",
		};

		const updated = lists.map((l) =>
			l.id === list.id
				? { ...l, cards: [...l.cards, newCard] }
				: l,
		);

		setLists(updated);
	}

	function deleteCard(cardId) {
		const updated = lists.map((l) =>
			l.id === list.id
				? {
						...l,
						cards: l.cards.filter(
							(c) => c.id !== cardId,
						),
					}
				: l,
		);

		setLists(updated);
	}

	return (
		<Draggable draggableId={list.id} index={index}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					className="bg-white/80 rounded-xl p-3 w-72 shadow-md"
				>
					{/* Header */}
					<div
						{...provided.dragHandleProps}
						className="flex justify-between items-center mb-3"
					>
						{editing ? (
							<input
								autoFocus
								value={title}
								onChange={(e) =>
									setTitle(
										e
											.target
											.value,
									)
								}
								onBlur={
									saveTitle
								}
								onKeyDown={(
									e,
								) =>
									e.key ===
										"Enter" &&
									saveTitle()
								}
								className="
                  font-semibold w-full
                  bg-transparent outline-none
                  border-b border-slate-300
                "
							/>
						) : (
							<h2
								onClick={() =>
									setEditing(
										true,
									)
								}
								className="font-semibold cursor-pointer hover:underline"
							>
								{list.title}
							</h2>
						)}

						<button
							onClick={() =>
								onDelete(
									list.id,
								)
							}
							className="text-slate-500 hover:text-red-600 ml-2"
						>
							✕
						</button>
					</div>

					{/* Cards */}
					<Droppable
						droppableId={list.id}
						type="CARD"
					>
						{(provided) => (
							<div
								ref={
									provided.innerRef
								}
								{...provided.droppableProps}
								className="space-y-2 min-h-[20px]"
							>
								{list.cards.map(
									(
										card,
										i,
									) => (
										<Card
											key={
												card.id
											}
											card={
												card
											}
											index={
												i
											}
											onDelete={() =>
												deleteCard(
													card.id,
												)
											}
											onUpdate={
												onCardUpdate
											}
										/>
									),
								)}
								{
									provided.placeholder
								}
							</div>
						)}
					</Droppable>

					{/* Add Card */}
					<button
						onClick={addCard}
						className="mt-3 text-sm text-slate-600 hover:text-slate-900"
					>
						+ Add Card
					</button>
				</div>
			)}
		</Draggable>
	);
}
