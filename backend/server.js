const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('../backend/db');

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse JSON request bodies

app.get('/', (req, res) => {
    res.send('Welcome to Shop Backend');
});

app.listen(3003, () => {
    console.log('Server is running on port 3003');
});
