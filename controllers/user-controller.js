const { User, Thought } = require("../models");

// Defines and exports the UserController object, which contains methods for handling various API requests related to users
module.exports = {
    // Gets all Users
    async getAllUsers(req, res) {
        try {
            const userData = await User.find()
                .select("-__v");
            res.json(userData);
        } catch (err) {
            // console.log(err);
            return res.status(500).json(err);
        }
    },

    // Gets single User by _id
    async getUserById(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.userId })
                .select("-__v")
                .populate("friends")
                .populate("thoughts");
            if (!userData) {
                return res.status(404).json({ message: "No User found with that ID!" });
            }
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Creates a User
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Updates a User by Id
    async updateUserById(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!userData) {
                return res.status(404).json({ message: "No User found with that ID!" });
            }
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Deletes a User by Id
    async deleteUserById(req, res) {
        try {
            const userData = await User.findOneAndDelete({ _id: req.params.userId });
            if (!userData) {
                return res.status(404).json({ message: "No User found with that ID!" });
            }
            // Deletes any Thought that has the ID that comes from userData = user that we found one and deleted
            await Thought.deleteMany({ _id: { $in: userData.thoughts } });
            // console.log(userData);
            res.json({ message: "User and associated Thoughts have been deleted successfully!" });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Adds a Friend to User's friend list
    async addFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (!userData) {
                return res.status(404).json({ message: "No User found with that ID!" });
            }
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Removes a Friend from the User's friend list
    async deleteFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (!userData) {
                return res.status(404).json({ message: "No User found with that ID!" });
            }
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};