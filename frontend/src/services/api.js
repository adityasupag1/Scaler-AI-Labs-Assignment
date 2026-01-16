export const getBoard = async () => {
  const res = await fetch("/api/board");

  if (!res.ok) {
    throw new Error("Failed to fetch boards");
  }

  return res.json();
};
