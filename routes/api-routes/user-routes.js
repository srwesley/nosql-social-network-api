// Imports the necessary dependencies and controllers
const router = require("express").Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    addFriend,
    removeFriend,
    // checkFriendRemoved
} = require("../../controllers/user-controller");

// GET and POST all users
router.route("/").get(getAllUsers).post(createUser);

// GET user id, PUT update user by id, and DELETE user by id
router.route("/:userId").get(getUserById).put(updateUserById).delete(deleteUserById);

// POST add friend and DELETE remove friend
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

// Exports the router
module.exports = router;