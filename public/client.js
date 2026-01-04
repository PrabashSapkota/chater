const socket = io();
let username = "";

function joinChat() {
  username = document.getElementById("usernameInput").value.trim();
  if (!username) return;

  document.getElementById("usernameBox").classList.add("hidden");
  document.getElementById("chatBox").classList.remove("hidden");

  socket.emit("join", username);
}

function sendMessage() {
  const input = document.getElementById("messageInput");
  if (input.value.trim()) {
    socket.emit("message", input.value);
    input.value = "";
  }
}

socket.on("message", data => {
  const div = document.createElement("div");
  div.className = "msg";
  div.innerHTML = `<span style="color:${data.color}">${data.username}</span>: ${data.text}`;
  document.getElementById("messages").appendChild(div);
});

socket.on("system", text => {
  const div = document.createElement("div");
  div.className = "system";
  div.innerText = text;
  document.getElementById("messages").appendChild(div);
});
