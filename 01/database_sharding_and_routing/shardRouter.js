const { shard1, shard2 } = require('./dbConnections');

const shards = [shard1, shard2];

// Hash function (string → number)
function hash(userID) {
  let hash = 0;

  for (let i = 0; i < userID.length; i++) {
    hash = (hash * 31 + userID.charCodeAt(i)) % 1000000007;
  }

  return hash;
}

// Get shard
function getShard(userID) {
  const shardIndex = hash(userID) % shards.length;
  console.log("Shard index:", shardIndex);
  return shards[shardIndex];
}

module.exports = {
  getShard,
};