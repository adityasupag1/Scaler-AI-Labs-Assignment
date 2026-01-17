import { useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import Card from "./Card";
import {
	createCard,
	deleteCard as deleteCardFromDB,
} from "../services/cardService";
import { deleteList } from "../services/listService";

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

	async function handleDeleteCard(cardId) {
		// 1. Delete from database
		await deleteCard(cardId);

		// 2. Update UI state
		const updatedLists = lists.map((l) =>
			l.id === list.id
				? {
						...l,
						cards: l.cards.filter(
							(c) => c.id !== cardId,
						),
					}
				: l,
		);

		setLists(updatedLists);
	}

	async function handleDeleteList() {
		const confirmDelete = confirm(
			"Delete this list and all its cards?",
		);
		if (!confirmDelete) return;

		// 1. Delete from Supabase
		await deleteList(list.id);

		// 2. Update UI state
		const updatedLists = lists.filter((l) => l.id !== list.id);

		setLists(updatedLists);
	}

	async function addCard() {
		const newCard = await createCard({
			title: "New Card",
			list_id: list.id,
			order_index: list.cards.length,
		});

		const updatedLists = lists.map((l) =>
			l.id === list.id
				? { ...l, cards: [...l.cards, newCard] }
				: l,
		);

		setLists(updatedLists);
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
					className="bg-white/80 rounded-xl p-3 w-72 shadow-md "
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
							onClick={
								handleDeleteList
							}
							className="text-slate-500 hover:text-red-600 ml-2"
							title="Delete list"
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
