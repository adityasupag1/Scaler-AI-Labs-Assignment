# Trello Clone – Full Stack Assignment (Scaler)

A Trello-inspired task management application built using **React**, **Tailwind CSS**, and **Supabase (PostgreSQL)**.  
The project demonstrates full-stack development skills including CRUD operations, drag-and-drop interactions, persistent storage, and clean component architecture.

---

## 🚀 Features

### Board & Lists
- Create new lists
- Rename list titles
- Delete lists (cards are deleted via cascade)
- Drag & drop lists with persistent ordering

### Cards
- Create cards inside lists
- Edit card title and description via modal
- Add **due dates** to cards
- Add and remove **colored labels**
- Delete cards
- Drag & drop cards within and across lists
- Card order persists after refresh

### Search
- Search cards by title
- Case-insensitive search
- Only lists containing matching cards are shown during search

### Persistence
- All data stored in **Supabase (PostgreSQL)**
- Uses `order_index` to maintain list and card order
- State is fully restored after page refresh

---

## 🛠 Tech Stack

### Frontend
- React
- Tailwind CSS
- @hello-pangea/dnd (Drag & Drop)

### Backend
- Supabase
- PostgreSQL

### Architecture
- Component-based UI
- Service layer for database operations
- Clear separation between UI logic and persistence logic
- Derived state for search and filtering

---

## 📂 Project Structure


```
trello-clone/
│
├── index.html
├── package.json
├── .env
│
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    │
    ├── lib/
    │   └── supabase.js
    │
    ├── pages/
    │   └── BoardPage.jsx
    │
    ├── components/
    │   ├── Board.jsx
    │   ├── List.jsx
    │   ├── Card.jsx
    │   ├── CardModal.jsx
    │   └── AddButton.jsx
    │
    ├── services/
    │   ├── boardService.js
    │   ├── listService.js
    │   └── cardService.js
    │
    └── utils/
        └── dragUtils.js
```

---

## ⚙️ Supabase Setup

1. Create a project on **Supabase**
2. Create tables:
   - `boards`
   - `lists`
   - `cards`
3. Enable **Row Level Security (RLS)**
4. Add policies for:
   - SELECT
   - INSERT
   - UPDATE
   - DELETE
Example (for assignment/demo):

```sql
CREATE POLICY "Allow all"
ON lists
FOR ALL
USING (true)
WITH CHECK (true);
```

(Similar policies applied to `cards`)

---

## 🔑 Environment Variables

Create a `.env` file in the root:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## ▶️ How to Run Locally

```
npm install
npm run dev
```

Open: http://localhost:5173

---

## 🧠 Key Learnings

- Implemented persistent drag-and-drop using `order_index`
- Managed complex nested state updates in React
- Worked with Supabase RLS policies
- Built a real-world CRUD-based full-stack application

---

## 👤 Author

**Aditya Raj**  
B.Tech CSE | Full-Stack Developer

---

## ✅ Status

✔ Assignment Complete  
✔ Ready for Review  
✔ Ready for Submission
