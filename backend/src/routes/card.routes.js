const router = require("express").Router();
const pool = require("../db");

router.put("/move", async (req, res) => {
  const { cardId, toListId, newPosition } = req.body;

  try {
    await pool.query(
      "UPDATE cards SET list_id = $1, position = $2 WHERE id = $3",
      [toListId, newPosition, cardId]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
