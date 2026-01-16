import express from "express";
import cors from "cors";
import boardRoutes from "./routes/board.js";
import cardRoutes from "./routes/cards.js";

const app = express();

app.use(cors({
  origin: "https://scaler-ai-labs-assignment.vercel.app"
}));

app.use(express.json());

app.use("/board", boardRoutes);
app.use("/cards", cardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Backend running on", PORT);
});
