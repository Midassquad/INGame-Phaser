const BASE_URL = "34.173.4.135.nip.io";
// 443 -> wss
// 80 -> ws
const WEBSOCKET_URL = `wss://${BASE_URL}:443/ingame-websocket`;
const WS_SUB_URL = "/topic/greetings";

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

const talkAI = async (data: { message: string }, userId: string) => {
  try {
    const response = await fetch(
      `${location.hostname === "localhost" ? "http" : "https"}://${BASE_URL}/api/chat/${userId}`,
      {
        method: "POST", // *Method*
        headers: {
          "Content-Type": "application/json", // *Specify the content type*
        },
        body: JSON.stringify(data), // *Convert the JavaScript object to a JSON string*
      },
    );

    const responseJson = await response.json();
    return responseJson.answer;
  } catch (error) {
    console.log("Error talking AI", error);
  }
};

const coachAI = async (userId: string) => {
  try {
    const response = await fetch(
      `${location.hostname === "localhost" ? "http" : "https"}://${BASE_URL}/api/chat/pet/${userId}`,
      {
        method: "POST", // *Method*
        headers: {
          "Content-Type": "application/json", // *Specify the content type*
        },
      },
    );

    const responseJson = await response.json();
    return responseJson.answer;
  } catch (error) {
    console.log("Error coaching AI", error);
  }
};
export { getTasks, talkAI, coachAI, WEBSOCKET_URL, WS_SUB_URL };
