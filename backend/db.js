import { pool } from "./db.js";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { board_id } = req.query;

      const result = await pool.query(
        "SELECT * FROM cards WHERE board_id = $1 ORDER BY position ASC",
        [board_id]
      );

      return res.status(200).json(result.rows);
    }

    if (req.method === "POST") {
      const { board_id, title, position } = req.body;

      const result = await pool.query(
        `INSERT INTO cards (board_id, title, position)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [board_id, title, position]
      );

      return res.status(201).json(result.rows[0]);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Database error" });
  }
}
