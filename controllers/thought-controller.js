// Define methods for CRUD operations on thoughts and reactions
const { User, Thought } = require("../models");

// Defines and exports the ThoughtController object, which contains methods for handling various API requests related to thoughts
module.exports = {
    // Gets all Thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughtData = await Thought.find()
                .select("-__v");
            res.json(thoughtData);
        } catch (err) {
            // console.log(err);
            return res.status(500).json(err);
        }
    },

    // Gets single Thought by _id
    async getThoughtsById(req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: req.params.thoughtId })
                .select("-__v");
            if (!thoughtData) {
                return res.status(404).json({ message: "No Thought found by that ID!" });
            }
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Creates a Thought
    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body);
            const userData = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thoughtData._id } },
                { runValidators: true, new: true }
            );
            return res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Updates Thought by Id
    async updateThoughtById(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thoughtData) {
                return res.status(404).json({ message: "No Thought found with that ID!" });
            }
            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Deletes Thought by Id
    async deleteThoughtById(req, res) {
        try {
            const thoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thoughtData) {
                return res.status(404).json({ message: "No Thought found with that ID!" })
            }
            res.json({ message: "The Thought has been deleted successfully!" });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Adds Reaction to Thought
    async createReaction(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            if (!thoughtData) {
                return res.status(404).json({ message: "No Thought found with that ID!" });
            }
            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Removes Reaction from Thought
    async deleteReaction(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );
            if (!thoughtData) {
                return res.status(404).json({ message: "No Thought found with that ID!" });
            }
            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};