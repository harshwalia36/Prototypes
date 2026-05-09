# 🚀 Server-Sent Events (SSE) Prototype

## 📌 Overview

This project demonstrates a real-time data streaming system using **Server-Sent Events (SSE)** with Node.js and Express.

It enables a server to push updates to multiple connected clients over a single HTTP connection.

---

## 🧠 What is SSE?

Server-Sent Events (SSE) is a unidirectional communication protocol where:

* Server → Client (continuous stream)
* Uses standard HTTP
* Keeps connection open
* Automatically reconnects on failure

---

## ⚙️ Features Implemented

* Persistent SSE connection (`/events`)
* Multiple client handling
* Real-time event broadcasting
* Manual trigger endpoint (`/notify`)
* Client disconnect handling

---

## 🏗️ Architecture

```
Client (Browser)
   ↓ (EventSource)
Node.js Server (SSE)
   ↓
In-memory client store
   ↓
Broadcast events
```

---

## 📡 API Endpoints

### 1. SSE Stream

```
GET /events
```

* Establishes a persistent connection
* Streams real-time updates

---

### 2. Notify Clients

```
POST /notify
```

**Body:**

```json
{
  "message": "Hello World"
}
```

* Sends message to all connected clients

---

## 🔑 Key Concepts Learned

### 1. Streaming vs Request-Response

* Traditional HTTP closes connection
* SSE keeps connection alive

---

### 2. `text/event-stream`

* Required for SSE protocol
* Enables continuous event parsing

---

### 3. `res.write()` vs `res.send()`

* `res.write()` → stream data
* `res.send()` → closes connection

---

### 4. Event Format

```
data: <payload>

```

* Double newline indicates end of event

---

### 5. Client Management

* Store `res` objects
* Remove clients on disconnect
* Prevent memory leaks

---

## ⚠️ Limitations

* In-memory storage (not scalable)
* Single server only
* No event persistence
* No authentication

---

## 🚀 Future Improvements (Advanced)

### 🔹 1. Scaling with Redis Pub/Sub

* Share events across multiple servers
* Enable horizontal scaling

---

### 🔹 2. Event Persistence

* Use Kafka / DB
* Replay missed events

---

### 🔹 3. Authentication

* Secure SSE endpoints
* Token-based access

---

### 🔹 4. React / Next.js Integration

* Build real-time dashboards
* Use EventSource in frontend

---

### 🔹 5. Backpressure Handling

* Handle slow clients
* Buffer or drop events

---

### 🔹 6. Named Events & Channels

* Multiple event types
* Custom listeners

---

## 🧪 How to Run

```bash
npm install
node server.js
```

Open browser:

```
http://localhost:3000/events
```

---

## 🎯 Conclusion

This prototype demonstrates how to build a real-time push-based system using SSE, and lays the foundation for scalable event-driven architectures.

---
