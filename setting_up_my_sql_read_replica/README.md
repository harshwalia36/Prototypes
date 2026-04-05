
# 🚀 MySQL Read Replica + API Read/Write Split (Prototype)

## 📌 Overview

This project demonstrates how to set up a **MySQL primary-replica architecture locally using Docker** and integrate it with a Node.js API to perform **read/write splitting**.

* Writes → Primary DB
* Reads → Replica DB
* Replication → Asynchronous (eventual consistency)

---

## 🧭 Architecture

```
Client → API Server (Node.js)
          ├── Write → MySQL Primary (port 3306)
          └── Read  → MySQL Replica (port 3307)

Primary → (binary log replication) → Replica
```
---

## 🧠 Key Concepts Learned

### Read Replica
A read replica is a copy of the primary database used to handle **read-heavy traffic**, reducing load on the primary and improving scalability.

### Asynchronous Replication
* Data is replicated via binary logs
* Replica may lag behind primary
* System is **eventually consistent**

### Read/Write Splitting
* API routes writes to primary
* API routes reads to replica
* Improves performance and scalability

---

## ⚙️ Setup Instructions

### Step 1: Create Docker Network
```bash
docker network create mysql-replication-net
```

### Step 2: Start Primary MySQL
```bash
docker run -d \
  --name mysql-primary \
  --network mysql-replication-net \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=testdb \
  mysql:8 \
  --server-id=1 \
  --log-bin=mysql-bin
```

### Step 3: Start Replica MySQL
```bash
docker run -d \
  --name mysql-replica \
  --network mysql-replication-net \
  -p 3307:3306 \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=testdb \
  mysql:8 \
  --server-id=2
```

### Step 4: Configure Replication

**Create replication user (on Primary):**
```sql
CREATE USER 'replica'@'%' IDENTIFIED BY 'replica_pass';
GRANT REPLICATION SLAVE ON *.* TO 'replica'@'%';
FLUSH PRIVILEGES;
```

**Get binary log position:**
```sql
SHOW BINARY LOG STATUS;
```
This will show the source log file and Log starting position, which you can put in below command.

**Configure Replica:**
```sql
CHANGE REPLICATION SOURCE TO
  SOURCE_HOST='mysql-primary',
  SOURCE_USER='replica',
  SOURCE_PASSWORD='replica_pass',
  SOURCE_LOG_FILE='Log file',
  SOURCE_LOG_POS='Log starting position',
  GET_SOURCE_PUBLIC_KEY=1;

START REPLICA;
```

**Verify replication:**
```sql
SHOW REPLICA STATUS\G
```

---

## 🌐 API Integration (Node.js)

**Write to Primary:**
```js
await primary.query('INSERT INTO test_replication (name) VALUES (?)', [name]);
```

**Read from Replica:**
```js
await replica.query('SELECT * FROM test_replication');
```

---

## 🧪 Testing

**Insert (Write):**
```bash
curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{"name": "Alice"}'
```

**Fetch (Read):**
```bash
curl http://localhost:3000/users
```

---

## ⚠️ Important Notes

* **Replica Lag:** Data may not appear immediately after write (eventual consistency)
* **Debug:** Add logs to confirm routing between primary and replica

---

## 🚀 Future Improvements

* Multiple replicas (load balancing)
* Failover (promote replica to primary)
* Combine with sharding
* Add caching layer
