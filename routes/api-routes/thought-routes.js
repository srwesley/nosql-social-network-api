// Imports the necessary dependencies and controllers
const router = require("express").Router();
const {
    getAllThoughts,
    getThoughtsById,
    createThought,
    deleteThoughtById,
    updateThoughtById,
    createReaction,
    deleteReaction,
} = require("../../controllers/thought-controller");

// Defines the routes for GET and POST all thoughts
router.route("/").get(getAllThoughts).post(createThought);

// Defines the routes for GET, PUT, and DELETE thoughts
router.route("/:thoughtId").get(getThoughtsById).put(updateThoughtById).delete(deleteThoughtById);

// Defines the route for POST reaction to a thought
router.route("/:thoughtId/reactions").post(createReaction);

// Defines the route for DELETE reaction to a thought
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

// Exports the router
module.exports = router;