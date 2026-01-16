
const express = require("express");
const cors = require("cors");
const boardRoutes = require("./routes/board.routes");
const cardRoutes = require("./routes/card.routes");

const app = express();
app.use(cors({
  origin: [
    "https://scaler-ai-labs-assignment.vercel.app",
    "http://localhost:5175"
  ],
  credentials: true
}));


app.use(express.json());
app.use("/board", boardRoutes);
app.use("/cards", cardRoutes);

app.listen(5000, () => console.log("Backend running on 5000"));
