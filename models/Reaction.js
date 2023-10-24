// Importing the required dependencies from the mongoose library
const { Schema, Types } = require("mongoose");

// Defining the Reaction schema with the required fields and their respective data types
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => new Date(timestamp).toLocaleDateString()
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// Exports the Thought model as a module
module.exports = reactionSchema;