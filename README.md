# Trello Clone – Full Stack Assignment (Scaler)

A Trello-like task management board built using **React**, **Tailwind CSS**, and **Supabase (PostgreSQL)**.
The application supports full CRUD operations, drag-and-drop for lists and cards, and persistent storage.

---

## 🚀 Features

### Board & Lists
- Create new lists
- Rename list titles
- Delete lists (with cascading card deletion)
- Drag & drop lists (order persists after refresh)

### Cards
- Create cards inside lists
- Edit card details via modal
- Delete cards
- Drag & drop cards within and across lists
- Card order persists after refresh

### Persistence
- All data stored in **Supabase (PostgreSQL)**
- Uses `order_index` to maintain list and card ordering
- Data remains consistent after page refresh

---

## 🛠 Tech Stack

**Frontend**
- React
- Tailwind CSS
- @hello-pangea/dnd

**Backend**
- Supabase
- PostgreSQL

**Architecture**
- Component-based UI
- Service layer for database operations
- Clean separation of concerns (UI vs DB logic)

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
4. Add policies for SELECT, INSERT, UPDATE, DELETE

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
