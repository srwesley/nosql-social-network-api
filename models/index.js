// Imports the User and Thought models from the respective files
const User = require("./User");
const Thought = require("./Thought");

// Exports the User and Thought models as a single module for easy access in other parts of the application
module.exports = { Thought, User };