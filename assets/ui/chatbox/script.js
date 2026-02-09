const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const form = document.getElementById("messageForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = messageInput.value;

  if (!message) return;

  const parentElement = document.getElementById("chatBox");

  const outerChatCont = document.createElement("div");
  outerChatCont.className = "user chat-outercont";

  const chatCont = document.createElement("div");
  chatCont.className = "chat-container";

  const chatThumb = document.createElement("div");
  chatThumb.className = "chat-thumb";

  const chatOuterMsg = document.createElement("div");
  chatOuterMsg.className = "chat-outer-msg";

  const chatMsg = document.createElement("div");
  chatMsg.className = "chat-msg";

  const newElement = document.createElement("p");
  newElement.textContent = message;

  chatMsg.append(newElement);
  chatOuterMsg.append(chatMsg);
  chatCont.append(chatThumb, chatOuterMsg);
  outerChatCont.append(chatCont);
  parentElement.append(outerChatCont);

  messageInput.value = "";

  chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
});
