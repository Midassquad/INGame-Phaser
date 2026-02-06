const BASE_URL = "34.135.16.205";

const getTasks = async (username: string) => {
  try {
    const response = await fetch(
      `${location.hostname === "localhost" ? "http" : "https"}://${BASE_URL}/api/initdata?username=${username}&boardId=697316f0b7593088c7655a28`,
    );

    // Error handling for bad HTTP statuses (e.g., 404 Not Found, 500 Server Error)
    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }

    // Second await: pauses until the response body has been parsed (e.g., as a JSON object)
    const data = await response.json();
    const { cards } = data.boards[0];
    return cards;
  } catch (error) {
    console.log("Error fetching quests", error);
  }
};

export { getTasks };
