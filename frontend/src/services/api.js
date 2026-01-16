
const API_URL = "http://localhost:5000";
export const getBoard = async () => (await fetch(`${API_URL}/board`)).json();
