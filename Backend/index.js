const conn = require("./connection");
const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());


app.listen(8000, function () {
    console.log("Server running!!");
});

app.get("/", async (req, res) => {
    res.send("Server is working fine ");
});

app.get("/getdata", async (req, res) => {
    try {
        const db = conn.connection.db;
        const collection = db.collection("sectors");
        const data = await collection.find().toArray();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/data', async (req, res) => {
    try {
        const db = conn.connection.db;
        const collection = db.collection('sectors');
        const data = await collection.find().toArray();
        res.json(data);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
