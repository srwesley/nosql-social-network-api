// Imports required packages and files
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

// Sets up environment variables
const PORT = process.env.PORT || 3001;
const app = express();

// Uses middleware to parse incoming data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Uses routes defined in routes.js
app.use(routes);

// Connects to the MongoDB database and starts the server
db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`API server listening on port ${PORT}!`);
    });
});