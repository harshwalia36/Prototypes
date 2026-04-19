const express = require('express');
const router = express.Router();

const primary = require('../db/db_primary');
const replica = require('../db/db_replica');

// CREATE USER → PRIMARY
router.post('/users', async (req, res) => {
    try {
        const {name} = req.body;
        const [result] = await primary.query('INSERT INTO test_replication (name) VALUES (?)', [name]);
        console.log("Writing to PRIMARY");
        res.json({ id: result.insertId, name });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error inserting user');
    }
});

// GET USERS → REPLICA
router.get('/users', async (req, res) => {
    try {
        const [rows] = await replica.query('SELECT * FROM test_replication');
        console.log("Reading from REPLICA");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching users');
    }
});

module.exports = router;
