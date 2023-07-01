import express from "express";
import { WebSocketServer} from "ws";

const app = express();
const server = app.listen(5000, () => {
    console.log("Server started on port 5000");
});

// Create a WebSocket server
const wss = new WebSocketServer({ server });

// WebSocket connection handler
wss.on("connection", (ws) => {
    console.log("New client connected");

    // Send current time to the client every second
    const interval = setInterval(() => {
        const currentTime = new Date().toLocaleTimeString();
        ws.send(currentTime);
    }, 1000);

    // Handle WebSocket close event
    ws.on("close", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});
