const router = require("express").Router();
const pool = require("../db");

 router.get("/", async (req, res) => {
  try {
    const lists = await pool.query(
      "SELECT * FROM lists ORDER BY position"
    );
    const cards = await pool.query(
      "SELECT * FROM cards ORDER BY position"
    );

    res.json({
      lists: lists.rows,
      cards: cards.rows
    });
  } catch (error) {
    console.error("Board API error:", error.message);
    res.status(500).json({ error: "Database error" });
  }
});
// router.get("/", (req, res) => {
//   res.json({
//     lists: [
//       { id: 1, title: "Todo", position: 1 },
//       { id: 2, title: "In Progress", position: 2 }
//     ],
//     cards: [
//       { id: 1, list_id: 1, title: "Sample Card", position: 1 }
//     ]
//   });
// });

module.exports = router;
