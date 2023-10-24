// Importing the required dependencies from the mongoose library and the other schema file Reaction.js
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// Defining the Thought schema with the required fields and their respective data types
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => new Date(timestamp).toLocaleString(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true, // Enables virtual properties to be displayed when a user document is transformed into a JSON format
        },
        id: false,
    }
);

// Defines a virtual property "reactionCount" which returns the number of counted reactions in the reactions array
thoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
});

// Creates the Thought model from the thoughtSchema
const Thought = model("Thought", thoughtSchema);

// Exports the Thought model as a module
model.exports = Thought;