import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// GET cards of a board
router.get("/", async (req, res) => {
  try {
    const { board_id } = req.query;
    const result = await pool.query(
      "SELECT * FROM cards WHERE board_id = $1 ORDER BY position ASC",
      [board_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// CREATE card
router.post("/", async (req, res) => {
  try {
    const { board_id, title, position } = req.body;
    const result = await pool.query(
      `INSERT INTO cards (board_id, title, position)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [board_id, title, position]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
