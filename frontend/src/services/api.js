
const API_URL = "scaler-ai-labs-assignment.railway.internal" ||  "http://localhost:5000" ;
export const getBoard = async () => (await fetch(`${API_URL}/board`)).json();
