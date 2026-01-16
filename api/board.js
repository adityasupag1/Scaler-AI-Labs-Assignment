import { pool } from "./db.js";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const result = await pool.query(
        "SELECT * FROM boards ORDER BY id ASC"
      );
      return res.status(200).json(result.rows);
    }

    if (req.method === "POST") {
      const { title } = req.body;

      const result = await pool.query(
        "INSERT INTO boards (title) VALUES ($1) RETURNING *",
        [title]
      );

      return res.status(201).json(result.rows[0]);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Database error" });
  }
}
