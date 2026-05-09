# Polling Example: Short Polling and Long Polling

This project demonstrates two server-client communication techniques: **Short Polling** and **Long Polling**. These techniques are commonly used to fetch updates from the server in real-time or near real-time scenarios.

---

## What is Polling?

Polling is a technique where the client periodically communicates with the server to check for updates. It is widely used in applications where real-time updates are required, such as chat applications, notifications, or live dashboards.

### 1. Short Polling
Short polling is a method where the client sends requests to the server at regular intervals (e.g., every 2 seconds) to check for updates. The server responds immediately with the latest data, even if there are no updates.

#### Characteristics:
- Simple to implement.
- Can result in unnecessary requests if there are no updates.
- Higher server load due to frequent requests.

### 2. Long Polling
Long polling is a method where the client sends a request to the server and waits for the server to respond when there is an update. If no update is available, the server holds the request until an update occurs or a timeout happens.

#### Characteristics:
- Reduces unnecessary requests compared to short polling.
- More efficient in terms of server load.
- Slightly more complex to implement.

---

## Project Overview

This project implements both **Short Polling** and **Long Polling** using a Node.js server and a simple HTML/JavaScript frontend. The user can interact with the UI to start and stop polling, as well as send notifications to the server.

### Features:
1. **Short Polling:**
   - Sends requests to the server every 2 seconds.
   - Displays the latest data received from the server.
   - Allows the user to stop polling at any time.

2. **Long Polling:**
   - Sends a request to the server and waits for a response.
   - Displays the latest data received from the server.
   - Allows the user to stop polling at any time.

3. **Send Notifications:**
   - Users can send a message to the server.
   - The message is broadcast to both short polling and long polling clients.

---

## Endpoints Explanation

### `/data/{type}` Endpoint
The `/data/{type}` endpoint is used by the client to fetch updates from the server. The `{type}` parameter specifies whether the client is using **short polling** or **long polling**.

- **Short Polling (`/data/shortpolling`):**
  - The client sends a request to this endpoint at regular intervals (e.g., every 2 seconds).
  - The server responds immediately with the latest data, even if there are no updates.

- **Long Polling (`/data/longpolling`):**
  - The client sends a request to this endpoint and waits for the server to respond.
  - If there is an update, the server responds immediately with the new data.
  - If there is no update, the server holds the request until an update occurs or a timeout happens (e.g., 10 seconds).

### `/notify/{type}` Endpoint
The `/notify/{type}` endpoint is used by the client to send notifications (messages) to the server. The `{type}` parameter specifies whether the notification is intended for **short polling** or **long polling** clients.

- **Short Polling (`/notify/shortpolling`):**
  - The server updates the latest message, which will be sent to clients during their next short polling request.

- **Long Polling (`/notify/longpolling`):**
  - The server immediately notifies all connected long polling clients with the new message.
  - Any long polling requests waiting for updates are resolved with the new data.

---

## How It Works

### Server-Side:
- The server exposes two main endpoints:
  1. `/data/{type}`: Handles both short polling and long polling requests.
  2. `/notify/{type}`: Allows the client to send notifications to the server.
- The server maintains a list of connected clients for long polling and notifies them when an update is available.

### Client-Side:
- The frontend provides buttons to start and stop short polling and long polling.
- Users can send notifications to the server using an input box.

---
