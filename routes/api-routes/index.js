// Creates a router instance
const router = require("express").Router();

// Imports user and thought routes
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

// Defines endpoints for user and thought routes
router.use("/user", userRoutes);
router.use("/thought", thoughtRoutes);

// Exports the router
module.exports = router;