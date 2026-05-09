const express = require("express");
const app = express();


const PORT = 3000;

// Store connected clients
let clients = [];

app.use(express.json()); 

app.get("/", (req, res) => {
    res.send("Hello SSE!");
});

// application/json = static response
// text/event-stream = live stream of events
// We use text/event-stream because SSE is not just about data format (like JSON),
//  it’s about a streaming protocol over HTTP.
app.get("/events", (req, res) => {
    // Set headers for SSE
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.flushHeaders();

    // 2. Create client
    const clientId = Date.now();

    const newClient = {
        id: clientId,
        res
    };

    clients.push(newClient);

    console.log(`Client connected: ${clientId}`);

    // 3. Remove client on disconnect
    req.on("close", () => {
        console.log(`Client disconnected: ${clientId}`);
        clients = clients.filter(client => client.id !== clientId);
    });
});

// 4. ONE global event producer
setInterval(() => {
    const data = {
      time: new Date().toLocaleTimeString(),
      value: Math.random()
    };
  
    // 5. Broadcast to all clients
    clients.forEach(client => {
      client.res.write(`data: ${JSON.stringify(data)}\n\n`);
    });
  
  }, 2000);


app.post("/notify", (req, res) => {
    const message = req.body.message || "No message provided";

    const data = {
        message,
        time: new Date().toLocaleTimeString()
      };

      console.log("Clients count:", clients.length);

    // Broadcast to all clients
    clients.forEach(client => {
        client.res.write(`data: ${JSON.stringify(data)}\n\n`);
      });
    
    res.json({ status: "Message sent to all clients" });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

