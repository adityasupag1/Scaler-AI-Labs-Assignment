const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://scaler-ai-labs-assignment-eh5l.vercel.app/";

export const getBoard = async () =>
  (await fetch(`${API_URL}/board`, { credentials: "include" })).json();
