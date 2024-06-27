const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require('./db');

// Middleware to parse JSON request bodies
app.use(express.json());

// Import routes
const userRoutes = require('./models/user');
app.use('/api', userRoutes);

const startServer = async () => {
    try {
        await mongoDB();
        console.log("Connected to MongoDB");

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
};

startServer();
