const socket = io();
const name = prompt("Enter name to enter");
socket.on("connect", () => {
  console.log(socket.id);
});
const chatMonitor = document.getElementById("chat-m-box");
const messageInput = document.getElementById("message-input");

const append = (name, message, side) => {
  //side = server or client response
  const messageElement = document.createElement("div");
  messageElement.classList.add(`${side}-message`);
  messageElement.innerHTML = `
            <div class="chat-user-id">
                <h4>${name}</h4>
            </div>
            ${message}
            `;
  console.log(name, message, side);
  chatMonitor.append(messageElement);
};

socket.emit("new-user-joined", name);
socket.on("user-joined", (name) => {
  console.log(name);
  append(name, `${name} is joined the chat.`, "friend");
});

let sendMessageBtn = document.getElementById("send-message-btn");
sendMessageBtn.addEventListener("click", (event) => {
  const D = new Date();
  const clientMessage = messageInput.value;
  socket.emit("send-message", clientMessage);
  append(`Me`, clientMessage, "client");
  messageInput.value = "";
});

socket.on("receive", (data) => {
  append(data.name, data.message, "friend");
});
socket.on("user-disconnected", (data) => {
  append(data.name, `${data.name} has been disconnected`, "friend");
});
