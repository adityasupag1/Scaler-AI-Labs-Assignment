const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://scaler-ai-labs-assignment.up.railway.app";

export const getBoard = async () =>
  (await fetch(`${API_URL}/board`, { credentials: "include" })).json();
