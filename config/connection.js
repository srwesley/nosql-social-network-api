// Imports the mongoose library
const { connect, connection } = require("mongoose");

// Node will look for this environment variable and if it exists, it will use it. Otherwise, it will assume you're running this app locally
const connectionString =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialDB";

    connect(connectionString);

module.exports = connection;