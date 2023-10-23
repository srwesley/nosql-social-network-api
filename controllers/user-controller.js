const { User } = require("../models");

const UserController = {
    // Gets all users
    getAllUsers(req, res) {
        User.find({})
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err));
    },

    // Gets one user by ID
    getUserById(req, res) {
        User.findById(req.params.userId)
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err));
    },

    // Creates a user
    createUser(req, res) {
        User.create(req.body)
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err));
    },

    // Updates user by ID
    updateUserById(req, res) {
        User.findOneAndUpdate(req.params.id, req.body, { new: true })
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: "User not found." });
                }
                res.json(userData);
            })
            .catch(err => res.status(500).json(err));
    },

    // Deletes a user
    deleteUserById(req, res) {
        User.findOneAndDelete(req.params.id)
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: "User not found." });
                }
                res.json({ message: "User deleted successfully!" });
            })
            .catch(err => res.status(500).json(err));
    },

    // Adds friend to user's friend list
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body.friendId || req.params.friendId } },
            { new: true }
        )
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: "User not found." });
                }
                res.json(userData);
            })
            .catch(err => res.status(500).json(err));
    },

    // Removes friend from user's friend list
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then((dbUserData) => {
                if (dbUserData) {
                    return res.status(404).json({ message: "No user found with this id!" });
                }
                // Checks if friend was removed
                const removed = !dbUserData.friends.includes(params.friendId);
                // Return response with appropriate message
                if (removed) {
                    res.json({ message: "Friend removed successfully!", dbUserData });
                } else {
                    console.log(err);
                    res.json(dbUserData);
                }
            })
            .catch((err) => res.status(400).json(err));
    },
};

// Exports UserController
module.exports = UserController;