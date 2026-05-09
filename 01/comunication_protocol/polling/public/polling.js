let shortPollingInterval = null; // Variable to store the interval ID for short polling
let longPollingActive = false; // Flag to control long polling loop

// Start Short Polling
function startShortPolling() {
    if (shortPollingInterval) {
        alert("Short polling is already running!");
        return;
    }
    shortPollingInterval = setInterval(async () => {
        const response = await fetch("/data/shortpolling");
        const data = await response.json();
        document.getElementById("shortPollingData").innerText = `Short Polling: ${data.value} at ${data.time}`;
    }, 2000); // Poll every 2 seconds
}

// Stop Short Polling
function stopShortPolling() {
    if (shortPollingInterval) {
        clearInterval(shortPollingInterval);
        shortPollingInterval = null;
        document.getElementById("shortPollingData").innerText = "Short Polling stopped.";
    } else {
        alert("Short polling is not running!");
    }
}

// Start Long Polling
async function startLongPolling() {
    if (longPollingActive) {
        alert("Long polling is already running!");
        return;
    }
    longPollingActive = true;
    while (longPollingActive) {
        const response = await fetch("/data/longpolling");
        const data = await response.json();
        document.getElementById("longPollingData").innerText = `Long Polling: ${data.message} at ${data.time}`;
    }
}

// Stop Long Polling
function stopLongPolling() {
    if (longPollingActive) {
        longPollingActive = false;
        document.getElementById("longPollingData").innerText = "Long Polling stopped.";
    } else {
        alert("Long polling is not running!");
    }
}

// Notify server with a new message
async function notifyServer(type) {
    const message = document.getElementById("messageInput").value;
    if (!message) {
        alert("Please enter a message before notifying!");
        return;
    }
    const response = await fetch(`/notify/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
    });
    if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
    }
    const result = await response.json();
    // alert(result.status || result.error);
}