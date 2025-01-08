const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.send(JSON.stringify({ type: "info", message: "Connected to signaling server" }));
});

console.log("WebSocket server is running on ws://localhost:8080");
