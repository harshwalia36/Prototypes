const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

let latestMessage = "No updates yet..";
let waitingClients = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Handle data fetching for both short and long polling
app.get("/data/:type", (req, res) => {
    const { type } = req.params;

    if (type === "shortpolling") {
        // Short polling: Respond immediately with the latest message
        const data = {
            time: new Date().toLocaleTimeString(),
            value: latestMessage
        };
        res.json(data);
    } else if (type === "longpolling") {
        // Long polling: Wait for updates or timeout after 20 seconds
        console.log("Client connected for long polling");

        const clientId = Date.now();
        const timeoutId = setTimeout(() => {
            console.log(`Timeout for client ${clientId}`);
            waitingClients = waitingClients.filter(client => client.id !== clientId);
            res.json({
                message: "No new updates",
                time: new Date().toLocaleTimeString()
            });
        }, 20000); // 20-second timeout

        waitingClients.push({ id: clientId, res, timeoutId });
    } else {
        res.status(400).json({ error: "Invalid communication type" });
    }
});

// Handle notifications for both short and long polling
app.post("/notify/:type", (req, res) => {
    const { type } = req.params;
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    latestMessage = message;

    if (type === "shortpolling") {
        // Short polling: No special handling needed, just update the message
        res.json({ status: "Message updated for short polling" });
    } else if (type === "longpolling") {
        // Long polling: Notify all waiting clients
        waitingClients.forEach(client => {
            clearTimeout(client.timeoutId);
            client.res.json({
                message: latestMessage,
                time: new Date().toLocaleTimeString()
            });
        });
        waitingClients = [];
        res.json({ status: "Message sent to all long polling clients" });
    } else {
        res.status(400).json({ error: "Invalid communication type" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});