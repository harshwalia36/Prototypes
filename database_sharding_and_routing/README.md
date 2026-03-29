# Database Sharding and Routing

## Overview
This prototype demonstrates database sharding and routing strategies for distributing data across multiple database instances.

## Purpose
- Explore horizontal scaling techniques for databases
- Implement shard key selection and data distribution logic
- Demonstrate routing mechanisms for query execution across shards
- Evaluate performance benefits and trade-offs

## Key Components
- **Shard Management**: Logic for determining shard placement
- **Routing Layer**: Query routing based on shard keys
- **Data Distribution**: Strategies for even data distribution

## Implementation Details
This prototype demonstrates routing and sharding by:
- Implementing a hash-based shard key algorithm to distribute data across multiple database instances
- Creating a routing layer that intercepts queries and directs them to the appropriate shard based on the shard key
- Simulating multiple database connections to represent distributed shards

## Final Architecture
Client → Express API → Shard Router → PostgreSQL Shards

## Links
* psql: https://www.freecodecamp.org/news/how-to-get-started-with-postgresql-9d3bc1dd1b11/
